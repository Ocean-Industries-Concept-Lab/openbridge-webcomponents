import {LitElement, html, unsafeCSS} from 'lit';
import {property} from 'lit/decorators.js';
import {customElement} from '../../decorator.js';
import componentStyle from './poi-layer-stack.css?inline';

import '../poi-layer/poi-layer.js';
import '../poi-group/poi-group.js';
import '../poi-data/poi-data.js';
import '../building-blocks/poi-header/poi-header.js';

import type {ObcPoiLayer} from '../poi-layer/poi-layer.js';
import type {ObcPoiGroup} from '../poi-group/poi-group.js';
import {PoiDataValue} from '../poi-data/poi-data.js';
import {Poi, isPoi, POI_ATTR} from '../building-blocks/poi/poi.js';

export enum PoiLayerSelectionMode {
  None = 'none',
  Single = 'single',
  Multi = 'multi',
}

/**
 * `<obc-poi-layer-stack>` coordinates multiple POI layers and manages
 * selection behavior across stacked layers.
 *
 * Use `selection-mode` to control whether targets can be selected across the
 * stack (`none`, `single`, or `multi`).
 *
 * ### Slots
 * - Default slot for `obc-poi-layer` elements that participate in the stack.
 *
 * ### Example
 * ```html
 * <obc-poi-layer-stack selection-mode="single">
 *   <obc-poi-layer label="Radar" is-selected></obc-poi-layer>
 *   <obc-poi-layer label="AIS"></obc-poi-layer>
 * </obc-poi-layer-stack>
 * ```
 *
 * @slot - Layers participating in the stack.
 */
@customElement('obc-poi-layer-stack')
export class ObcPoiLayerStack extends LitElement {
  private static readonly STACK_JUMP_DURATION_MS = 100;
  private static readonly STACK_RETURNING_ATTR = 'data-stack-returning';

  @property({type: String, attribute: 'selection-mode'})
  selectionMode: PoiLayerSelectionMode = PoiLayerSelectionMode.None;

  private handleStackClick = (event: Event) => this.onStackClick(event);
  private handleSlotChange = () => this.schedulePlacement();
  private handleTargetLayoutChange = () => this.schedulePlacement();
  private selectionMap = new Map<
    Poi,
    {
      originLayer: ObcPoiLayer;
      previousAnimatePosition: boolean;
      keepInSelectedLayer: boolean;
    }
  >();
  private selectionCounter = 0;
  private movingTargets = new Set<Poi>();
  private placementRaf = 0;
  private mutationObserver?: MutationObserver;

  override connectedCallback() {
    super.connectedCallback();
    this.addEventListener('click', this.handleStackClick);
    this.addEventListener(
      'obc-poi-data-layout-change',
      this.handleTargetLayoutChange as EventListener
    );
  }

  override firstUpdated() {
    const slot = this.shadowRoot?.querySelector('slot');
    slot?.addEventListener('slotchange', this.handleSlotChange);
    this.setupMutationObserver();
    this.schedulePlacement();
    requestAnimationFrame(() => {
      this.schedulePlacement();
      requestAnimationFrame(() => this.schedulePlacement());
    });
  }

  override disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener('click', this.handleStackClick);
    this.removeEventListener(
      'obc-poi-data-layout-change',
      this.handleTargetLayoutChange as EventListener
    );
    const slot = this.shadowRoot?.querySelector('slot');
    slot?.removeEventListener('slotchange', this.handleSlotChange);
    this.mutationObserver?.disconnect();
    this.mutationObserver = undefined;
    if (this.placementRaf) {
      cancelAnimationFrame(this.placementRaf);
      this.placementRaf = 0;
    }
    this.selectionMap.forEach((_, target) => {
      this.clearTargetProjectionStyles(target);
      this.requestPoiRender(target);
    });
    this.selectionMap.clear();
    this.movingTargets.clear();
    this.selectionCounter = 0;
  }

  private onStackClick(event: Event) {
    if (this.selectionMode === PoiLayerSelectionMode.None) return;
    const target = this.getPoiTargetFromEvent(event);
    if (!target) return;
    if (target.hasAttribute(ObcPoiLayerStack.STACK_RETURNING_ATTR)) return;

    this.cleanupSelection();
    const originLayer = this.getTargetLayer(target);
    if (!originLayer) return;

    const selectedLayer = this.getLayer('selected') ?? this.getLayer('top');
    if (!selectedLayer) return;

    const existing = this.selectionMap.get(target);
    if (existing) {
      this.resetSelectionForTarget(target, existing);
      return;
    }

    if (this.selectionMode === PoiLayerSelectionMode.Single) {
      this.clearOtherTopSelections(target);
      this.clearSelectionMapExcept(target);
    }

    const trackedOriginLayer =
      originLayer === selectedLayer
        ? this.inferBootstrapOriginLayer(target, selectedLayer)
        : originLayer;

    this.trackSelectionTarget(target, trackedOriginLayer, true);
    const record = this.selectionMap.get(target);
    if (!record) return;
    this.activateTrackedTarget(target, record, selectedLayer);
    this.schedulePlacement();
  }

  private getPoiTargetFromEvent(event: Event): Poi | null {
    const path = event.composedPath?.() ?? [];
    for (const item of path) {
      if (item instanceof HTMLElement && isPoi(item)) {
        return item as Poi;
      }
    }
    const direct = event.target instanceof HTMLElement ? event.target : null;
    if (!direct) return null;
    const closest = direct.closest(`[${POI_ATTR}]`);
    if (closest && isPoi(closest)) {
      return closest as Poi;
    }
    return null;
  }

  private getTargetLayer(target: Element): ObcPoiLayer | null {
    return target.closest('obc-poi-layer') as ObcPoiLayer | null;
  }

  private getLayerTargets(layer: ParentNode): Poi[] {
    return Array.from(layer.querySelectorAll(`[${POI_ATTR}]`)).filter(
      (el): el is Poi => isPoi(el)
    );
  }

  private getAllLayers(): ObcPoiLayer[] {
    return Array.from(this.querySelectorAll('obc-poi-layer')) as ObcPoiLayer[];
  }

  private isLayerSelected(layer: ObcPoiLayer): boolean {
    return layer.isSelected === true || layer.hasAttribute('is-selected');
  }

  private cleanupSelection() {
    this.selectionMap.forEach((_, target) => {
      if (!target.isConnected) {
        this.selectionMap.delete(target);
      }
    });
    this.movingTargets.forEach((target) => {
      if (!target.isConnected) {
        this.movingTargets.delete(target);
      }
    });
  }

  private getLayer(
    kind: 'top' | 'secondTop' | 'selected' | 'default'
  ): ObcPoiLayer | null {
    const layers = this.getAllLayers();
    switch (kind) {
      case 'top':
        return layers[layers.length - 1] ?? null;
      case 'secondTop':
        return layers.length >= 2 ? (layers[layers.length - 2] ?? null) : null;
      case 'selected':
        return layers.find((layer) => this.isLayerSelected(layer)) ?? null;
      case 'default': {
        const nonSelected = layers.filter(
          (layer) => !this.isLayerSelected(layer)
        );
        return nonSelected[nonSelected.length - 1] ?? null;
      }
    }
  }

  private clearOtherTopSelections(target: Poi) {
    const topLayer = this.getLayer('top');
    const activeLayer = this.getLayer('selected') ?? topLayer;
    if (!activeLayer) return;
    const topTargets = this.getLayerTargets(activeLayer);
    topTargets.forEach((other) => {
      if (other === target) return;
      const record = this.selectionMap.get(other);
      this.resetSelectionForTarget(other, record);
    });
  }

  private getTargetTagName(target: Poi): string {
    return target.tagName.toLowerCase();
  }

  private inferBootstrapOriginLayer(
    target: Poi,
    selectedLayer: ObcPoiLayer
  ): ObcPoiLayer {
    const targetTagName = this.getTargetTagName(target);
    const nonSelectedLayers = this.getAllLayers().filter(
      (layer) => layer !== selectedLayer
    );

    const typedOrigin = nonSelectedLayers.find((layer) =>
      this.getLayerTargets(layer).some(
        (candidate) => this.getTargetTagName(candidate) === targetTagName
      )
    );
    if (typedOrigin) {
      return typedOrigin;
    }

    return this.getLayer('default') ?? selectedLayer;
  }

  private collectPoiHeaders(target: Poi): HTMLElement[] {
    const headers = new Set<HTMLElement>();

    const visit = (node: ParentNode) => {
      if (node instanceof Element && node.matches('obc-poi-header')) {
        headers.add(node as HTMLElement);
      }

      const children =
        node instanceof ShadowRoot || node instanceof Element
          ? Array.from(node.children)
          : [];

      for (const child of children) {
        if (child.matches('obc-poi-header')) {
          headers.add(child as HTMLElement);
        }
        if (child.shadowRoot) {
          visit(child.shadowRoot);
        }
        visit(child);
      }
    };

    visit(target);
    if (target.shadowRoot) {
      visit(target.shadowRoot);
    }

    return Array.from(headers);
  }

  private setTargetSelectedId(target: Poi) {
    if (target.hasHeader === undefined) return;
    const headers = this.collectPoiHeaders(target);
    const hasExternalHeader = headers.some(
      (header) => !header.hasAttribute('data-stack-header')
    );
    if (hasExternalHeader) {
      target.hasHeader = true;
      return;
    }

    let selectedId = target.getAttribute('data-stack-selection-id');
    if (!selectedId) {
      selectedId = String(++this.selectionCounter);
      target.setAttribute('data-stack-selection-id', selectedId);
    }
    if ('headerContent' in target) {
      target.headerContent = selectedId;
    }
    target.hasHeader = true;
  }

  private clearTargetSelectedId(target: Poi) {
    const headers = this.collectPoiHeaders(target);
    headers
      .filter((header) => header.hasAttribute('data-stack-header'))
      .forEach((header) => header.remove());
    if (target.hasHeader !== undefined) {
      target.hasHeader = false;
    }
    if ('headerContent' in target) {
      target.headerContent = '';
    }
  }

  private async waitForPoiRender(target: Poi) {
    const component = target as unknown as {updateComplete?: Promise<unknown>};
    await component.updateComplete;
    await new Promise<void>((resolve) =>
      requestAnimationFrame(() => resolve())
    );
  }

  private requestPoiRender(target: Poi) {
    const component = target as unknown as {requestUpdate?: () => void};
    component.requestUpdate?.();
  }

  private refreshTargetProjectionLayout(target: Poi, trackDurationMs = 0) {
    target.refreshProjectionLayout?.(trackDurationMs);
  }

  private getTargetButtonProjectionOffset(target: Poi): number {
    const raw = target.style.getPropertyValue('--obc-poi-button-projection-y');
    const parsed = Number.parseFloat(raw);
    return Number.isFinite(parsed) ? parsed : 0;
  }

  private getLayerProjectionOffset(
    originLayer: ObcPoiLayer,
    destinationLayer: ObcPoiLayer | null
  ): number {
    if (!destinationLayer || destinationLayer === originLayer) {
      return 0;
    }

    const originRect = originLayer.getBoundingClientRect();
    const destinationRect = destinationLayer.getBoundingClientRect();
    return destinationRect.bottom - originRect.bottom;
  }

  private getTargetProjectionOffset(
    originLayer: ObcPoiLayer,
    selectedLayer: ObcPoiLayer | null
  ): number {
    if (!selectedLayer || selectedLayer === originLayer) {
      return 0;
    }

    const originRect = originLayer.getBoundingClientRect();
    const selectedRect = selectedLayer.getBoundingClientRect();
    return originRect.bottom - selectedRect.bottom;
  }

  private async detachTargetFromCurrentGroup(
    target: Poi
  ): Promise<ObcPoiLayer | null> {
    const currentLayer = this.getTargetLayer(target);
    const sourceGroup =
      target.parentElement?.tagName.toLowerCase() === 'obc-poi-group'
        ? (target.parentElement as ObcPoiGroup)
        : null;

    if (!sourceGroup) {
      return currentLayer;
    }

    await sourceGroup.releaseTarget(target);
    return currentLayer;
  }

  private applySelectedTargetProjectionState(target: Poi) {
    target.animatePosition = true;
    target.style.setProperty('--obc-poi-stack-projection-active', '1');
    target.style.setProperty(
      '--obc-poi-forced-target-transition-duration',
      '0ms'
    );
    target.style.setProperty(
      '--obc-poi-forced-button-transition-duration',
      `${ObcPoiLayerStack.STACK_JUMP_DURATION_MS}ms`
    );
    target.style.setProperty('--obc-poi-layer-inactive-opacity', '1');
    target.style.setProperty('z-index', '3');
  }

  private clearTargetProjectionStyles(
    target: Poi,
    previousAnimatePosition?: boolean
  ) {
    if (previousAnimatePosition !== undefined) {
      target.animatePosition = previousAnimatePosition;
    }
    target.style.removeProperty('--obc-poi-stack-projection-active');
    target.style.removeProperty('--obc-poi-button-projection-y');
    target.style.removeProperty('--obc-poi-target-projection-y');
    target.style.removeProperty('--obc-poi-forced-target-transition-duration');
    target.style.removeProperty('--obc-poi-forced-button-transition-duration');
    target.style.removeProperty('--obc-poi-layer-inactive-opacity');
    target.style.removeProperty('z-index');
  }

  /**
   * Find the button and line elements inside the POI's shadow DOM.
   */
  private getAnimationElements(target: Poi): {
    button: HTMLElement | null;
    line: HTMLElement | null;
  } {
    const host = target as HTMLElement;
    const innerPoi = host.shadowRoot?.querySelector('obc-poi');
    const poiShadow = innerPoi?.shadowRoot;

    // Button is slotted — find via slot.assignedElements
    let button: HTMLElement | null = null;
    const buttonSlot = poiShadow?.querySelector(
      'slot[name="button"]'
    ) as HTMLSlotElement | null;
    if (buttonSlot) {
      const assigned = buttonSlot.assignedElements({flatten: true});
      button = (assigned[0] as HTMLElement) ?? null;
    }

    const line = poiShadow?.querySelector('.line') as HTMLElement | null;
    return {button, line};
  }

  /**
   * Animate a layer jump using Web Animations API.
   * fill:'forwards' overrides ALL CSS/Lit styles during animation.
   * After cancel(), Lit's final-state styles take over.
   */
  private async animateLayerJump(
    target: Poi,
    beforeButtonRect: DOMRect | null,
    beforeLineRect: DOMRect | null
  ): Promise<void> {
    const {button, line} = this.getAnimationElements(target);

    const afterButtonRect = button?.getBoundingClientRect();
    const afterLineRect = line?.getBoundingClientRect();

    const duration = ObcPoiLayerStack.STACK_JUMP_DURATION_MS;
    const easing = 'ease-out';
    const animations: Animation[] = [];

    // Button: animate translateY from old position to new
    if (button && beforeButtonRect && afterButtonRect) {
      const deltaY = beforeButtonRect.top - afterButtonRect.top;
      if (Math.abs(deltaY) >= 0.5) {
        // Read the current (final) computed transform to use as end state
        const finalTransform = getComputedStyle(button).transform;
        const startTransform =
          finalTransform === 'none'
            ? `translateY(${deltaY}px)`
            : `${finalTransform} translateY(${deltaY}px)`;

        animations.push(
          button.animate(
            [{transform: startTransform}, {transform: finalTransform}],
            {duration, easing, fill: 'forwards'}
          )
        );
      }
    }

    // Line: animate both position (translateY matching button) and
    // height (scaleY). Web Animations don't affect layout, so the line's
    // CSS top:100% stays at the final position — we must translate it
    // by the same delta as the button.
    if (line && button && beforeButtonRect && afterButtonRect) {
      const buttonDeltaY = beforeButtonRect.top - afterButtonRect.top;
      // Line height: before vs after
      const beforeH = beforeLineRect?.height ?? 0;
      const afterH = afterLineRect?.height ?? (beforeH || 1);
      const scaleRatio = afterH > 0 ? beforeH / afterH : 1;

      if (Math.abs(buttonDeltaY) >= 0.5 || Math.abs(scaleRatio - 1) > 0.01) {
        animations.push(
          line.animate(
            [
              {
                transform: `translateX(-50%) translateY(${buttonDeltaY}px) scaleY(${scaleRatio})`,
                transformOrigin: 'top center',
              },
              {
                transform: 'translateX(-50%) translateY(0px) scaleY(1)',
                transformOrigin: 'top center',
              },
            ],
            {duration, easing, fill: 'forwards'}
          )
        );
      }
    }

    if (animations.length > 0) {
      await Promise.all(animations.map((a) => a.finished));
      animations.forEach((a) => a.cancel());
    }
  }

  private async moveTargetIntoSelectedLayer(
    target: Poi,
    _originLayer: ObcPoiLayer,
    selectedLayer: ObcPoiLayer,
    animate = true
  ) {
    this.movingTargets.add(target);
    try {
      const {button, line} = this.getAnimationElements(target);
      const beforeButtonRect = button?.getBoundingClientRect() ?? null;
      const beforeLineRect = line?.getBoundingClientRect() ?? null;

      if (this.getTargetLayer(target) !== selectedLayer) {
        selectedLayer.appendChild(target);
      }

      target.setAttribute(ObcPoiLayerStack.STACK_RETURNING_ATTR, 'true');

      this.requestPoiRender(target);
      this.refreshTargetProjectionLayout(target);
      await this.waitForPoiRender(target);

      if (!animate) {
        return;
      }

      await this.animateLayerJump(target, beforeButtonRect, beforeLineRect);
    } finally {
      target.removeAttribute(ObcPoiLayerStack.STACK_RETURNING_ATTR);
      this.movingTargets.delete(target);
    }
  }

  private async moveTrackedTargetToSelectedLayer(
    target: Poi,
    record: {
      originLayer: ObcPoiLayer;
      previousAnimatePosition: boolean;
      keepInSelectedLayer: boolean;
    },
    selectedLayer: ObcPoiLayer,
    animateProjection: boolean
  ) {
    const currentLayer =
      (await this.detachTargetFromCurrentGroup(target)) ??
      this.getTargetLayer(target) ??
      record.originLayer;

    this.clearTargetGroupingAttributes(target);
    await this.moveTargetIntoSelectedLayer(
      target,
      record.originLayer,
      selectedLayer,
      animateProjection
    );

    if (currentLayer !== selectedLayer) {
      currentLayer.requestGroupingUpdate();
    }
    selectedLayer.requestGroupingUpdate();
  }

  private async syncTargetProjection(
    target: Poi,
    originLayer: ObcPoiLayer,
    selectedLayer: ObcPoiLayer | null,
    animate = true
  ) {
    const nextProjectionOffset = this.getLayerProjectionOffset(
      originLayer,
      selectedLayer
    );
    const currentProjectionOffset =
      this.getTargetButtonProjectionOffset(target);

    if (Math.abs(nextProjectionOffset - currentProjectionOffset) < 0.5) {
      if (Math.abs(nextProjectionOffset) < 0.5) {
        target.style.removeProperty('--obc-poi-button-projection-y');
      } else {
        target.style.setProperty(
          '--obc-poi-button-projection-y',
          `${nextProjectionOffset}px`
        );
      }
      this.requestPoiRender(target);
      this.refreshTargetProjectionLayout(target);
      return;
    }

    if (Math.abs(nextProjectionOffset) < 0.5) {
      target.style.removeProperty('--obc-poi-button-projection-y');
    } else {
      target.style.setProperty(
        '--obc-poi-button-projection-y',
        `${nextProjectionOffset}px`
      );
    }
    this.requestPoiRender(target);
    if (animate) {
      this.refreshTargetProjectionLayout(
        target,
        ObcPoiLayerStack.STACK_JUMP_DURATION_MS
      );
      await this.waitForPoiRender(target);
      return;
    }
    this.refreshTargetProjectionLayout(target);
  }

  private async animateTargetReturnToOrigin(
    target: Poi,
    record: {
      originLayer: ObcPoiLayer;
      previousAnimatePosition: boolean;
      keepInSelectedLayer: boolean;
    }
  ) {
    this.movingTargets.add(target);
    target.setAttribute(ObcPoiLayerStack.STACK_RETURNING_ATTR, 'true');

    try {
      const currentLayer =
        (await this.detachTargetFromCurrentGroup(target)) ??
        this.getTargetLayer(target);

      // BEFORE: measure button and line
      const {button: beforeBtn, line: beforeLine} =
        this.getAnimationElements(target);
      const beforeButtonRect = beforeBtn?.getBoundingClientRect() ?? null;
      const beforeLineRect = beforeLine?.getBoundingClientRect() ?? null;

      // Clear projections, move to origin layer, render at final state
      target.style.removeProperty('--obc-poi-target-projection-y');
      target.style.removeProperty('--obc-poi-button-projection-y');
      if (target.parentElement !== record.originLayer) {
        record.originLayer.appendChild(target);
      }
      this.requestPoiRender(target);
      this.refreshTargetProjectionLayout(target);
      await this.waitForPoiRender(target);

      // AFTER: animate from old positions to new
      await this.animateLayerJump(target, beforeButtonRect, beforeLineRect);
      this.setSelectedTargetInteractivity(target, false);
      this.clearTargetGroupingAttributes(target);
      this.clearTargetSelectedId(target);
      this.clearTargetProjectionStyles(target, record.previousAnimatePosition);
      this.requestPoiRender(target);
      if (currentLayer && currentLayer !== record.originLayer) {
        currentLayer.requestGroupingUpdate();
      }
      record.originLayer.requestGroupingUpdate();
      this.schedulePlacement();
    } finally {
      target.removeAttribute(ObcPoiLayerStack.STACK_RETURNING_ATTR);
      this.movingTargets.delete(target);
    }
  }

  private clearTargetGroupingAttributes(target: Poi) {
    target.removeAttribute('data-grouped');
    target.removeAttribute('data-pregrouped');
    target.removeAttribute('data-behind');
    target.removeAttribute('data-front');
    target.removeAttribute('data-front-exit');
    target.removeAttribute('data-exiting');
    target.removeAttribute('data-exit-lock');
  }

  private setSelectedTargetInteractivity(target: Poi, selected: boolean) {
    const isInAutoGroup =
      target.hasAttribute('data-grouped') ||
      target.closest('obc-poi-group') !== null;

    target.selected = selected;
    if (selected) {
      target.style.setProperty('--obc-poi-overlap-pointer-events', 'auto');
      if (!isInAutoGroup) {
        target.value = PoiDataValue.Checked;
        target.removeAttribute('data-behind');
        target.setAttribute('data-front', 'true');
      }
    } else {
      target.value = PoiDataValue.Unchecked;
      target.style.removeProperty('--obc-poi-overlap-pointer-events');
      target.removeAttribute('data-front');
    }
  }

  private trackSelectionTarget(
    target: Poi,
    originLayer: ObcPoiLayer,
    keepInSelectedLayer = true
  ) {
    this.selectionMap.set(target, {
      originLayer,
      previousAnimatePosition: target.animatePosition ?? false,
      keepInSelectedLayer,
    });
    target.removeAttribute('data-stack-selected');
  }

  private activateTrackedTarget(
    target: Poi,
    record: {
      originLayer: ObcPoiLayer;
      previousAnimatePosition: boolean;
      keepInSelectedLayer: boolean;
    },
    selectedLayer: ObcPoiLayer,
    animateProjection = true
  ) {
    if (record.keepInSelectedLayer) {
      target.removeAttribute('data-stack-selected');
      const needsMove = this.getTargetLayer(target) !== selectedLayer;
      if (needsMove) {
        void this.moveTrackedTargetToSelectedLayer(
          target,
          record,
          selectedLayer,
          animateProjection
        );
      } else {
        const targetProjectionOffset = this.getTargetProjectionOffset(
          record.originLayer,
          selectedLayer
        );
        if (Math.abs(targetProjectionOffset) < 0.5) {
          target.style.removeProperty('--obc-poi-target-projection-y');
        } else {
          target.style.setProperty(
            '--obc-poi-target-projection-y',
            `${targetProjectionOffset}px`
          );
        }
        target.style.removeProperty('--obc-poi-button-projection-y');
        this.requestPoiRender(target);
        this.refreshTargetProjectionLayout(target);
      }
    } else {
      this.clearTargetGroupingAttributes(target);
      target.setAttribute('data-stack-selected', 'true');
      void this.syncTargetProjection(
        target,
        record.originLayer,
        selectedLayer,
        animateProjection
      );
    }
    this.setSelectedTargetInteractivity(target, true);
    this.setTargetSelectedId(target);
    this.applySelectedTargetProjectionState(target);
    if (record.keepInSelectedLayer) {
      selectedLayer.requestGroupingUpdate();
    }
  }

  private seedSelectedLayerSelections(selectedLayer: ObcPoiLayer): Set<Poi> {
    const seededTargets = new Set<Poi>();
    if (this.selectionMode === PoiLayerSelectionMode.None) {
      return seededTargets;
    }

    const selectedTargets = this.getLayerTargets(selectedLayer);
    for (const target of selectedTargets) {
      if (target.hasAttribute(ObcPoiLayerStack.STACK_RETURNING_ATTR)) {
        continue;
      }
      if (this.selectionMap.has(target)) {
        continue;
      }
      if (
        this.selectionMode === PoiLayerSelectionMode.Single &&
        this.selectionMap.size > 0
      ) {
        break;
      }

      const originLayer = this.inferBootstrapOriginLayer(target, selectedLayer);
      this.selectionMap.set(target, {
        originLayer,
        previousAnimatePosition: target.animatePosition ?? false,
        keepInSelectedLayer: true,
      });
      target.removeAttribute('data-stack-selected');
      seededTargets.add(target);
    }
    return seededTargets;
  }

  private resetSelectionForTarget(
    target: Poi,
    record?: {
      originLayer: ObcPoiLayer;
      previousAnimatePosition: boolean;
      keepInSelectedLayer: boolean;
    }
  ) {
    target.removeAttribute('data-stack-selected');
    if (record) {
      this.selectionMap.delete(target);
      void this.animateTargetReturnToOrigin(target, record);
      return;
    }
    this.setSelectedTargetInteractivity(target, false);
    this.clearTargetGroupingAttributes(target);
    this.clearTargetSelectedId(target);
    this.clearTargetProjectionStyles(target);
  }

  private clearSelectionMapExcept(target: Poi) {
    const entries = Array.from(this.selectionMap.entries());
    entries.forEach(([other, record]) => {
      if (other === target) return;
      this.resetSelectionForTarget(other, record);
    });
  }

  private setupMutationObserver() {
    this.mutationObserver?.disconnect();
    this.mutationObserver = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (
          mutation.type === 'attributes' &&
          mutation.target instanceof HTMLElement
        ) {
          if (
            mutation.target.tagName.toLowerCase() === 'obc-poi-layer' ||
            mutation.attributeName === POI_ATTR
          ) {
            this.schedulePlacement();
            return;
          }
        }
        for (const node of Array.from(mutation.addedNodes)) {
          if (!(node instanceof HTMLElement)) continue;
          if (isPoi(node) || node.querySelector?.(`[${POI_ATTR}]`)) {
            this.schedulePlacement();
            return;
          }
        }
      }
    });
    this.mutationObserver.observe(this, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['is-selected', POI_ATTR],
    });
  }

  private schedulePlacement() {
    if (this.placementRaf) return;
    this.placementRaf = requestAnimationFrame(() => {
      this.placementRaf = 0;
      this.updateLayerOrders();
      this.syncSelectedLayerTargets();
    });
  }

  private updateLayerInactiveState(selectedLayer: ObcPoiLayer | null) {
    const layers = this.getAllLayers();
    layers.forEach((layer) => {
      if (selectedLayer && layer !== selectedLayer) {
        layer.setAttribute('data-stack-inactive', 'true');
      } else {
        layer.removeAttribute('data-stack-inactive');
      }
    });
  }

  private updateLayerOrders() {
    const layers = this.getAllLayers();
    layers.forEach((layer, index) => {
      layer.style.order = String(index);
    });

    const selectedLayer = this.getLayer('selected');
    this.updateLayerInactiveState(selectedLayer);
  }

  private syncSelectedLayerTargets() {
    const selectedLayer = this.getLayer('selected');

    if (!selectedLayer) {
      this.selectionMap.forEach((record, target) => {
        this.resetSelectionForTarget(target, record);
      });
      return;
    }

    const seededTargets = this.seedSelectedLayerSelections(selectedLayer);

    this.selectionMap.forEach((record, target) => {
      if (!target.isConnected) {
        this.selectionMap.delete(target);
        return;
      }
      if (this.movingTargets.has(target)) {
        return;
      }
      if (target.hasAttribute(ObcPoiLayerStack.STACK_RETURNING_ATTR)) {
        return;
      }
      if (
        !record.keepInSelectedLayer &&
        !target.hasAttribute('data-stack-selected')
      ) {
        target.setAttribute('data-stack-selected', 'true');
      }
      this.activateTrackedTarget(
        target,
        record,
        selectedLayer,
        !seededTargets.has(target)
      );
    });
  }

  override render() {
    return html`
      <div class="wrapper">
        <slot></slot>
      </div>
    `;
  }

  static override styles = unsafeCSS(componentStyle);
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-poi-layer-stack': ObcPoiLayerStack;
  }
}
