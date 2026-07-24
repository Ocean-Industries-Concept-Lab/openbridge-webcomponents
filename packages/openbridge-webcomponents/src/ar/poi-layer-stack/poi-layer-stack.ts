import {LitElement, html, unsafeCSS} from 'lit';
import {property} from 'lit/decorators.js';
import {customElement} from '../../decorator.js';
import componentStyle from './poi-layer-stack.css?inline';

import '../poi-layer/poi-layer.js';
import '../poi-group/poi-group.js';
import '../poi/poi-data.js';
import '../building-blocks/poi-header/poi-header.js';

import type {ObcPoiLayer} from '../poi-layer/poi-layer.js';
import type {ObcPoiGroup} from '../poi-group/poi-group.js';
import {PoiDataValue} from '../poi/poi-data.js';
import {Poi, isPoi, POI_ATTR} from '../poi/poi.js';
import {
  clearTargetGroupingAttributes,
  clearTargetGroupingStyles,
} from '../poi/poi-grouping-attrs.js';

export enum PoiLayerSelectionMode {
  None = 'none',
  Single = 'single',
  Multi = 'multi',
}

/**
 * Tracking record for a selected target. The stack never re-parents targets;
 * it renders selection by projecting the target's button (and, for targets
 * authored inside the selected layer, its pointer) between layers via CSS
 * custom properties.
 */
type SelectionRecord = {
  /** The layer that owns the target in the DOM. Never modified by the stack. */
  homeLayer: ObcPoiLayer;
  /**
   * The logical origin layer: equal to `homeLayer` for normal targets;
   * inferred for targets authored directly inside the selected layer.
   */
  originLayer: ObcPoiLayer;
};

/**
 * `<obc-poi-layer-stack>` coordinates multiple POI layers and manages
 * selection behavior across stacked layers.
 *
 * Use `selection-mode` to control whether targets can be selected across the
 * stack (`none`, `single`, or `multi`).
 *
 * ### Required Setup
 * 1. Place the stack in `obc-poi-controller`'s `slot="stack"`, or manage the
 *    stack's height and media geometry yourself.
 * 2. Give exactly one child `obc-poi-layer` the `is-selected` attribute — the
 *    stack projects selected targets' buttons into it and resets all
 *    selection state if no selected layer exists.
 * 3. Mark the background/default layer with
 *    `data-controller-layer="background"` when the stack is used inside
 *    `obc-poi-controller`.
 * 4. Set `--obc-poi-layer-min-height` on layers that can start empty, so they
 *    do not collapse to 0px height.
 *
 * ### DOM Ownership
 * The stack never moves, creates, or removes consumer-owned DOM. Selection is
 * rendered by projecting the target's button into the selected layer via CSS
 * custom properties (`--obc-poi-button-projection-y` /
 * `--obc-poi-target-projection-y`); the target element stays where the
 * consumer put it. Declarative renderers (React, Vue, Lit) can manage POI
 * children as ordinary framework-owned elements.
 *
 * ### Selection API
 * Selection state is fully reachable without DOM inspection:
 * - `selectedTargets` — the currently selected POI targets.
 * - `selectTarget(target, {selectionId?})` — select programmatically;
 *   `selectionId` presets the stack-managed badge id.
 * - `deselectTarget(target)` / `clearSelection()` — deselect one/all.
 * - `selection-change` event — fired on every selection mutation
 *   (user click, programmatic call, or bootstrap seeding) with
 *   `{selected, added, removed}` in `detail`.
 *
 * ### Slots
 * - Default slot for `obc-poi-layer` elements that participate in the stack.
 *
 * ### Example
 * ```html
 * <obc-poi-layer-stack selection-mode="single">
 *   <obc-poi-layer label="Radar" .isSelected=${true}></obc-poi-layer>
 *   <obc-poi-layer label="AIS"></obc-poi-layer>
 * </obc-poi-layer-stack>
 * ```
 *
 * @slot - Layers participating in the stack.
 * @fires selection-change {CustomEvent<{selected: Poi[]; added: Poi | null; removed: Poi | null}>} Fired whenever the selection set changes. Bubbles, composed.
 * @experimental
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
  private handleLayerSelectionChanged = () => this.schedulePlacement();
  private selectionMap = new Map<Poi, SelectionRecord>();
  /**
   * Deselected targets that live in one layer but render in another (targets
   * authored inside the selected layer whose logical origin is a different
   * layer). Their projections are refreshed on every placement pass so layer
   * resizes do not leave stale pixel offsets.
   */
  private displacedTargets = new Map<Poi, SelectionRecord>();
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
    this.addEventListener(
      'layer-selection-changed',
      this.handleLayerSelectionChanged
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
    this.removeEventListener(
      'layer-selection-changed',
      this.handleLayerSelectionChanged
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
    this.displacedTargets.forEach((_, target) => {
      this.clearTargetProjectionStyles(target);
      this.requestPoiRender(target);
    });
    this.displacedTargets.clear();
    this.selectionCounter = 0;
  }

  private onStackClick(event: Event) {
    if (this.selectionMode === PoiLayerSelectionMode.None) return;
    const target = this.getPoiTargetFromEvent(event);
    if (!target) return;
    if (target.hasAttribute(ObcPoiLayerStack.STACK_RETURNING_ATTR)) return;

    this.cleanupSelection();
    const existing = this.selectionMap.get(target);
    if (existing) {
      this.resetSelectionForTarget(target, existing);
      return;
    }
    this.performSelection(target);
  }

  /** Currently selected POI targets. */
  get selectedTargets(): Poi[] {
    this.cleanupSelection();
    return Array.from(this.selectionMap.keys());
  }

  /**
   * Programmatically select a target, following the same flow as a user
   * click. `options.selectionId` presets the badge id shown in the
   * stack-managed header; without it the id auto-increments. Returns
   * `false` when selection is disabled, the target is mid-transition or
   * already selected, or no layer can host the selection.
   */
  selectTarget(target: Poi, options?: {selectionId?: string}): boolean {
    if (this.selectionMode === PoiLayerSelectionMode.None) return false;
    if (target.hasAttribute(ObcPoiLayerStack.STACK_RETURNING_ATTR)) {
      return false;
    }
    this.cleanupSelection();
    if (this.selectionMap.has(target)) return false;
    return this.performSelection(target, options?.selectionId);
  }

  /**
   * Programmatically deselect a target. Returns `false` when it is not
   * selected.
   */
  deselectTarget(target: Poi): boolean {
    const record = this.selectionMap.get(target);
    if (!record) return false;
    this.resetSelectionForTarget(target, record);
    return true;
  }

  /** Deselect all targets. */
  clearSelection(): void {
    Array.from(this.selectionMap.entries()).forEach(([target, record]) => {
      this.resetSelectionForTarget(target, record);
    });
  }

  private performSelection(target: Poi, selectionId?: string): boolean {
    const homeLayer = this.getTargetLayer(target);
    if (!homeLayer) return false;

    const selectedLayer = this.getLayer('selected') ?? this.getLayer('top');
    if (!selectedLayer) return false;

    if (this.selectionMode === PoiLayerSelectionMode.Single) {
      this.clearOtherTopSelections(target);
      this.clearSelectionMapExcept(target);
    }

    const displaced = this.displacedTargets.get(target);
    this.displacedTargets.delete(target);
    const originLayer =
      displaced?.originLayer ??
      (homeLayer === selectedLayer
        ? this.inferBootstrapOriginLayer(target, selectedLayer)
        : homeLayer);

    if (selectionId) {
      target.setAttribute('data-stack-selection-id', selectionId);
    }
    const record: SelectionRecord = {homeLayer, originLayer};
    this.selectionMap.set(target, record);
    this.activateTrackedTarget(target, record, selectedLayer);
    this.schedulePlacement();
    this.dispatchSelectionChange(target, null);
    return true;
  }

  private dispatchSelectionChange(added: Poi | null, removed: Poi | null) {
    this.dispatchEvent(
      new CustomEvent('selection-change', {
        detail: {selected: this.selectedTargets, added, removed},
        bubbles: true,
        composed: true,
      })
    );
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
    return layer.isSelected === true;
  }

  private cleanupSelection() {
    this.selectionMap.forEach((_, target) => {
      if (!target.isConnected) {
        this.selectionMap.delete(target);
      }
    });
    this.displacedTargets.forEach((_, target) => {
      if (!target.isConnected) {
        this.displacedTargets.delete(target);
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
      if (this.displacedTargets.has(other)) return;
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

  private getInlineVarPx(target: Poi, name: string): number {
    const raw = target.style.getPropertyValue(name);
    const parsed = Number.parseFloat(raw);
    return Number.isFinite(parsed) ? parsed : 0;
  }

  /** Pixel delta between two layers' bottom edges (`to.bottom - from.bottom`). */
  private layerBottomDelta(from: ObcPoiLayer, to: ObcPoiLayer): number {
    if (from === to) {
      return 0;
    }
    return (
      to.getBoundingClientRect().bottom - from.getBoundingClientRect().bottom
    );
  }

  private setProjectionVar(target: Poi, name: string, valuePx: number) {
    if (Math.abs(valuePx) < 0.5) {
      target.style.removeProperty(name);
    } else {
      target.style.setProperty(name, `${valuePx}px`);
    }
  }

  /**
   * Render the target at the given projection offsets without touching its
   * DOM position. When `animate` is set and an offset actually changes, the
   * jump is FLIP-animated via the Web Animations API.
   */
  private async applyTargetProjection(
    target: Poi,
    buttonOffsetPx: number,
    targetOffsetPx: number,
    animate: boolean
  ) {
    const currentButton = this.getInlineVarPx(
      target,
      '--obc-poi-button-projection-y'
    );
    const currentTarget = this.getInlineVarPx(
      target,
      '--obc-poi-target-projection-y'
    );
    const changed =
      Math.abs(buttonOffsetPx - currentButton) >= 0.5 ||
      Math.abs(targetOffsetPx - currentTarget) >= 0.5;

    if (!changed) {
      this.setProjectionVar(
        target,
        '--obc-poi-button-projection-y',
        buttonOffsetPx
      );
      this.setProjectionVar(
        target,
        '--obc-poi-target-projection-y',
        targetOffsetPx
      );
      this.requestPoiRender(target);
      this.refreshTargetProjectionLayout(target);
      return;
    }

    const {button, line} = this.getAnimationElements(target);
    const beforeButtonRect = animate
      ? (button?.getBoundingClientRect() ?? null)
      : null;
    const beforeLineRect = animate
      ? (line?.getBoundingClientRect() ?? null)
      : null;

    this.setProjectionVar(
      target,
      '--obc-poi-button-projection-y',
      buttonOffsetPx
    );
    this.setProjectionVar(
      target,
      '--obc-poi-target-projection-y',
      targetOffsetPx
    );
    this.requestPoiRender(target);
    this.refreshTargetProjectionLayout(target);
    if (!animate) {
      return;
    }
    await this.waitForPoiRender(target);
    await this.animateLayerJump(target, beforeButtonRect, beforeLineRect);
  }

  /**
   * The group a target currently belongs to — a light-DOM parent for
   * consumer-managed groups, or the shadow group whose member slot the
   * target is assigned to for layer-created auto groups.
   */
  private getContainingGroup(target: Poi): ObcPoiGroup | null {
    if (target.parentElement?.tagName.toLowerCase() === 'obc-poi-group') {
      return target.parentElement as ObcPoiGroup;
    }
    const slotParent = target.assignedSlot?.parentElement;
    if (slotParent?.tagName.toLowerCase() === 'obc-poi-group') {
      return slotParent as ObcPoiGroup;
    }
    return null;
  }

  private detachTargetFromCurrentGroup(target: Poi): ObcPoiLayer | null {
    const currentLayer = this.getTargetLayer(target);
    const sourceGroup = this.getContainingGroup(target);

    if (!sourceGroup) {
      return currentLayer;
    }

    // Yank target out immediately — don't await group collapse.
    // Clean up group-owned state (mirrors releaseTargetToParent in poi-group).
    target.setRuntimeHorizontalOffsets?.(0, 0);
    if (!target.setRuntimeHorizontalOffsets) {
      target.buttonOffsetX = 0;
      target.targetOffsetX = 0;
    }
    clearTargetGroupingStyles(target);

    // Collapse the group independently — it handles its own cleanup.
    // Set collapsing BEFORE expand=false so updateGrouping (which may
    // fire via mutation observer before the group's updated() runs)
    // sees collapsing=true and returns early instead of disbanding.
    if (sourceGroup.expand) {
      sourceGroup.collapsing = true;
      sourceGroup.expand = false;
    }

    // Hide the wrapper immediately so it doesn't flash for one frame
    // while updateGrouping catches up.
    sourceGroup.removeAttribute('data-visible');

    return currentLayer;
  }

  private applySelectedTargetProjectionState(target: Poi) {
    // NOTE: do NOT set animatePosition = true here.
    // That removes the no-motion class, enabling CSS transitions on the
    // wrapper/button/line. The group's frame-by-frame expand/collapse
    // animation conflicts with CSS transitions, causing X wiggle.
    // The FLIP jump animation uses Web Animations API (fill:'forwards')
    // which overrides CSS anyway — it doesn't need CSS transitions.
    target.style.setProperty(
      '--obc-poi-forced-target-transition-duration',
      '0ms'
    );
    target.style.setProperty('--obc-poi-layer-inactive-opacity', '1');
    target.style.setProperty('z-index', '3');
  }

  private clearTargetProjectionStyles(target: Poi) {
    target.style.removeProperty('--obc-poi-button-projection-y');
    target.style.removeProperty('--obc-poi-target-projection-y');
    target.style.removeProperty('--obc-poi-forced-target-transition-duration');
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

  private async animateTargetReturnToOrigin(
    target: Poi,
    record: SelectionRecord
  ) {
    target.setAttribute(ObcPoiLayerStack.STACK_RETURNING_ATTR, 'true');

    try {
      const sourceGroupLayer = this.detachTargetFromCurrentGroup(target);

      // Clear grouping attributes immediately so the target doesn't render
      // in the origin position with data-grouped (which sets opacity:0).
      clearTargetGroupingAttributes(target);

      // Project the whole target (button and pointer) to its logical origin
      // layer; for normal targets that is its own layer, so both offsets
      // resolve to 0 and the inline variables are removed.
      const originOffset = this.layerBottomDelta(
        record.homeLayer,
        record.originLayer
      );
      await this.applyTargetProjection(
        target,
        originOffset,
        originOffset,
        true
      );

      this.setSelectedTargetInteractivity(target, false);
      clearTargetGroupingAttributes(target);
      this.clearTargetSelectedId(target);
      if (record.homeLayer === record.originLayer) {
        this.clearTargetProjectionStyles(target);
      } else {
        // The target stays displaced into its origin layer — keep the
        // projection variables and track it so layer resizes refresh them.
        target.style.removeProperty(
          '--obc-poi-forced-target-transition-duration'
        );
        target.style.removeProperty('--obc-poi-layer-inactive-opacity');
        target.style.removeProperty('z-index');
        this.displacedTargets.set(target, record);
      }
      this.requestPoiRender(target);
      if (sourceGroupLayer && sourceGroupLayer !== record.homeLayer) {
        sourceGroupLayer.requestGroupingUpdate();
      }
      record.homeLayer.requestGroupingUpdate();
      this.schedulePlacement();
    } finally {
      target.removeAttribute(ObcPoiLayerStack.STACK_RETURNING_ATTR);
      target.removeAttribute('data-stack-selected');
    }
  }

  private setSelectedTargetInteractivity(target: Poi, selected: boolean) {
    const isInAutoGroup =
      target.hasAttribute('data-grouped') ||
      this.getContainingGroup(target) !== null;

    target.selected = selected;
    if (selected) {
      target.style.setProperty('--obc-poi-overlap-pointer-events', 'auto');
      if (!isInAutoGroup && target.value !== PoiDataValue.Overlapped) {
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

  private activateTrackedTarget(
    target: Poi,
    record: SelectionRecord,
    selectedLayer: ObcPoiLayer,
    animateProjection = true
  ) {
    if (record.homeLayer !== selectedLayer) {
      // Cross-layer selection: the target stays a DOM child of its home
      // layer; `data-stack-selected` excludes it from that layer's grouping
      // and its button is projected into the selected layer. The pointer
      // stays anchored at the origin position.
      const sourceGroupLayer = this.detachTargetFromCurrentGroup(target);
      clearTargetGroupingAttributes(target);
      const firstActivation = !target.hasAttribute('data-stack-selected');
      target.setAttribute('data-stack-selected', 'true');
      const buttonOffset = this.layerBottomDelta(
        record.homeLayer,
        selectedLayer
      );
      const targetOffset = this.layerBottomDelta(
        record.homeLayer,
        record.originLayer
      );
      void this.applyTargetProjection(
        target,
        buttonOffset,
        targetOffset,
        animateProjection
      );
      if (firstActivation) {
        if (sourceGroupLayer && sourceGroupLayer !== record.homeLayer) {
          sourceGroupLayer.requestGroupingUpdate();
        }
        record.homeLayer.requestGroupingUpdate();
      }
    } else {
      // Target authored inside the selected layer: it remains a normal
      // resident there (grouped and measured as before); only its pointer
      // projects down to the inferred origin layer.
      const targetOffset = this.layerBottomDelta(
        selectedLayer,
        record.originLayer
      );
      void this.applyTargetProjection(
        target,
        0,
        targetOffset,
        animateProjection
      );
    }
    this.setSelectedTargetInteractivity(target, true);
    this.setTargetSelectedId(target);
    this.applySelectedTargetProjectionState(target);
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
      if (this.displacedTargets.has(target)) {
        continue;
      }
      if (
        this.selectionMode === PoiLayerSelectionMode.Single &&
        this.selectionMap.size > 0
      ) {
        break;
      }

      const originLayer = this.inferBootstrapOriginLayer(target, selectedLayer);
      this.selectionMap.set(target, {homeLayer: selectedLayer, originLayer});
      seededTargets.add(target);
      this.dispatchSelectionChange(target, null);
    }
    return seededTargets;
  }

  private resetSelectionForTarget(target: Poi, record?: SelectionRecord) {
    if (record) {
      this.selectionMap.delete(target);
      void this.animateTargetReturnToOrigin(target, record);
      this.dispatchSelectionChange(null, target);
      return;
    }
    target.removeAttribute('data-stack-selected');
    this.setSelectedTargetInteractivity(target, false);
    clearTargetGroupingAttributes(target);
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
          if (mutation.attributeName === POI_ATTR) {
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
      attributeFilter: [POI_ATTR],
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
      this.refreshDisplacedTargets();
      return;
    }

    const seededTargets = this.seedSelectedLayerSelections(selectedLayer);

    this.selectionMap.forEach((record, target) => {
      if (!target.isConnected) {
        this.selectionMap.delete(target);
        return;
      }
      if (target.hasAttribute(ObcPoiLayerStack.STACK_RETURNING_ATTR)) {
        return;
      }
      this.activateTrackedTarget(
        target,
        record,
        selectedLayer,
        !seededTargets.has(target)
      );
    });
    this.refreshDisplacedTargets();
  }

  /**
   * Keep deselected targets that render outside their DOM layer (targets
   * authored in the selected layer whose logical origin is another layer)
   * projected at up-to-date offsets across layer resizes.
   */
  private refreshDisplacedTargets() {
    this.displacedTargets.forEach((record, target) => {
      if (!target.isConnected) {
        this.displacedTargets.delete(target);
        return;
      }
      if (target.hasAttribute(ObcPoiLayerStack.STACK_RETURNING_ATTR)) {
        return;
      }
      const originOffset = this.layerBottomDelta(
        record.homeLayer,
        record.originLayer
      );
      void this.applyTargetProjection(
        target,
        originOffset,
        originOffset,
        false
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
