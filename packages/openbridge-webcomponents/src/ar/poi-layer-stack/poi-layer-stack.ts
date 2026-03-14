import {LitElement, html, unsafeCSS} from 'lit';
import {property} from 'lit/decorators.js';
import {customElement} from '../../decorator.js';
import componentStyle from './poi-layer-stack.css?inline';

import '../poi-layer/poi-layer.js';
import '../poi-group/poi-group.js';
import '../poi-data/poi-data.js';
import '../building-blocks/poi-header/poi-header.js';

import type {ObcPoiLayer} from '../poi-layer/poi-layer.js';
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
    }
  >();
  private selectionCounter = 0;
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
      this.clearTargetButtonProjection(target);
      this.requestPoiRender(target);
    });
    this.selectionMap.clear();
    this.selectionCounter = 0;
  }

  private onStackClick(event: Event) {
    if (this.selectionMode === PoiLayerSelectionMode.None) return;
    const target = this.getPoiTargetFromEvent(event);
    if (!target) return;

    this.cleanupSelection();
    const originLayer = this.getTargetLayer(target);
    if (!originLayer) return;

    const selectedLayer = this.getLayer('selected') ?? this.getLayer('top');
    if (!selectedLayer) return;

    const existing = this.selectionMap.get(target);
    if (existing) {
      this.resetSelectionForTarget(target, existing);
      this.schedulePlacement();
      return;
    }

    if (this.selectionMode === PoiLayerSelectionMode.Single) {
      this.clearOtherTopSelections(target);
      this.clearSelectionMapExcept(target);
    }

    this.selectionMap.set(target, {
      originLayer,
      previousAnimatePosition: target.animatePosition ?? false,
    });
    this.clearTargetGroupingAttributes(target);
    this.setSelectedTargetInteractivity(target, true);
    this.setTargetSelectedId(target);
    this.applySelectedTargetProjectionState(target);
    target.setAttribute('data-stack-selected', 'true');
    void this.syncTargetProjection(target, originLayer, selectedLayer);

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

  private applySelectedTargetProjectionState(target: Poi) {
    target.animatePosition = true;
    target.style.setProperty('--obc-poi-stack-projection-active', '1');
    target.style.setProperty(
      '--obc-poi-forced-button-transition-duration',
      `${ObcPoiLayerStack.STACK_JUMP_DURATION_MS}ms`
    );
    target.style.setProperty('--obc-poi-layer-inactive-opacity', '1');
    target.style.setProperty('z-index', '3');
  }

  private clearTargetButtonProjection(
    target: Poi,
    previousAnimatePosition?: boolean
  ) {
    if (previousAnimatePosition !== undefined) {
      target.animatePosition = previousAnimatePosition;
    }
    target.style.removeProperty('--obc-poi-stack-projection-active');
    target.style.removeProperty('--obc-poi-button-projection-y');
    target.style.removeProperty('--obc-poi-forced-button-transition-duration');
    target.style.removeProperty('--obc-poi-layer-inactive-opacity');
    target.style.removeProperty('z-index');
  }

  private async syncTargetProjection(
    target: Poi,
    originLayer: ObcPoiLayer,
    selectedLayer: ObcPoiLayer | null
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
    this.refreshTargetProjectionLayout(
      target,
      ObcPoiLayerStack.STACK_JUMP_DURATION_MS
    );
    await this.waitForPoiRender(target);
  }

  private async animateTargetReturnToOrigin(
    target: Poi,
    record: {
      originLayer: ObcPoiLayer;
      previousAnimatePosition: boolean;
    }
  ) {
    await this.syncTargetProjection(target, record.originLayer, null);
    this.setSelectedTargetInteractivity(target, false);
    this.clearTargetGroupingAttributes(target);
    this.clearTargetSelectedId(target);
    this.clearTargetButtonProjection(target, record.previousAnimatePosition);
    this.requestPoiRender(target);
    this.schedulePlacement();
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

  private resetSelectionForTarget(
    target: Poi,
    record?: {
      originLayer: ObcPoiLayer;
      previousAnimatePosition: boolean;
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
    this.clearTargetButtonProjection(target);
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

    this.selectionMap.forEach((record, target) => {
      if (!target.isConnected) {
        this.selectionMap.delete(target);
        return;
      }
      this.setTargetSelectedId(target);
      this.setSelectedTargetInteractivity(target, true);
      this.applySelectedTargetProjectionState(target);
      if (!target.hasAttribute('data-stack-selected')) {
        target.setAttribute('data-stack-selected', 'true');
      }
      void this.syncTargetProjection(target, record.originLayer, selectedLayer);
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
