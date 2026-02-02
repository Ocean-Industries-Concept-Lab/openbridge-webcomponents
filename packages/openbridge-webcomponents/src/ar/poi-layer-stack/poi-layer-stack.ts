import {LitElement, html, unsafeCSS} from 'lit';
import {property} from 'lit/decorators.js';
import {customElement} from '../../decorator.js';
import componentStyle from './poi-layer-stack.css?inline';
import {ObcPoiLayer, PoiLayerRole} from '../poi-layer/poi-layer.js';
import {ObcPoiTargetButtonGroup} from '../poi-target-button-group/poi-target-button-group.js';
import {ObcPoiTarget, PoiTargetVisualState} from '../poi-target/poi-target.js';

const SUPPORTS_TRANSLATE =
  typeof document !== 'undefined' &&
  'translate' in document.createElement('div').style;

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
 *   <obc-poi-layer label="Radar" layerIndex="1"></obc-poi-layer>
 *   <obc-poi-layer label="AIS" layerIndex="2"></obc-poi-layer>
 * </obc-poi-layer-stack>
 * ```
 *
 * @slot - Layers participating in the stack.
 */
@customElement('obc-poi-layer-stack')
export class ObcPoiLayerStack extends LitElement {
  @property({type: String, attribute: 'selection-mode'})
  selectionMode: PoiLayerSelectionMode = PoiLayerSelectionMode.None;

  private handleStackClick = (event: Event) => this.onStackClick(event);
  private handleSlotChange = () => this.schedulePlacement();
  private selectionMap = new Map<
    HTMLElement,
    {originLayer: ObcPoiLayer; originIndex: number; originHeight: number}
  >();
  private selectionCounter = 0;
  private selectionIds = new WeakMap<HTMLElement, string>();
  private placementRaf = 0;
  private mutationObserver?: MutationObserver;

  override connectedCallback() {
    super.connectedCallback();
    this.addEventListener('click', this.handleStackClick);
  }

  override firstUpdated() {
    const slot = this.shadowRoot?.querySelector('slot');
    slot?.addEventListener('slotchange', this.handleSlotChange);
    this.setupMutationObserver();
    this.schedulePlacement();
  }

  override updated(_changed: Map<string, unknown>) {}

  override disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener('click', this.handleStackClick);
    const slot = this.shadowRoot?.querySelector('slot');
    slot?.removeEventListener('slotchange', this.handleSlotChange);
    this.mutationObserver?.disconnect();
    this.mutationObserver = undefined;
    if (this.placementRaf) {
      cancelAnimationFrame(this.placementRaf);
      this.placementRaf = 0;
    }
    this.selectionMap.clear();
    this.selectionCounter = 0;
    this.selectionIds = new WeakMap<HTMLElement, string>();
  }

  override render() {
    return html`
      <div class="wrapper">
        <slot></slot>
      </div>
    `;
  }

  private onStackClick(event: Event) {
    if (this.selectionMode === PoiLayerSelectionMode.None) return;
    const target = this.getPoiTargetFromEvent(event) as ObcPoiTarget | null;
    if (!target) return;

    this.cleanupSelection();
    const originLayer = target.closest('obc-poi-layer') as ObcPoiLayer | null;
    if (!originLayer) return;

    const selectedLayer = this.getSelectedLayer() ?? this.getTopLayer();
    if (!selectedLayer) return;

    const existing = this.selectionMap.get(target);
    if (existing) {
      this.setSelectedTargetInteractivity(target, false);
      this.clearTargetGroupingAttributes(target);
      this.restoreTargetHeight(target, existing.originHeight);
      this.moveTargetToLayer(target, existing.originLayer, true);
      this.selectionMap.delete(target);
      this.clearTargetSelectedId(target);
      this.schedulePlacement();
      return;
    }

    if (this.selectionMode === PoiLayerSelectionMode.Single) {
      this.clearOtherTopSelections(target);
      this.clearSelectionMapExcept(target);
    }

    const originHeight = this.getTargetHeight(target);
    this.selectionMap.set(target, {
      originLayer,
      originIndex: originLayer.layerIndex,
      originHeight,
    });
    this.setTargetSelectedId(target);
    this.clearTargetGroupingAttributes(target);
    this.setSelectedTargetInteractivity(target, true);
    if (selectedLayer !== originLayer) {
      this.moveTargetToLayer(target, selectedLayer);
    }
    this.schedulePlacement();
  }

  private getPoiTargetFromEvent(event: Event): HTMLElement | null {
    const path = event.composedPath?.() ?? [];
    for (const item of path) {
      if (
        item instanceof HTMLElement &&
        item.tagName.toLowerCase() === 'obc-poi-target'
      ) {
        return item;
      }
    }
    const direct = event.target instanceof HTMLElement ? event.target : null;
    return direct?.closest('obc-poi-target') as HTMLElement | null;
  }

  private cleanupSelection() {
    this.selectionMap.forEach((_, target) => {
      if (!target.isConnected) this.selectionMap.delete(target);
    });
  }

  private getTopLayer(): ObcPoiLayer | null {
    const layers = Array.from(
      this.querySelectorAll('obc-poi-layer')
    ) as ObcPoiLayer[];
    if (layers.length === 0) return null;
    return layers[layers.length - 1] ?? null;
  }

  private getSelectedLayer(): ObcPoiLayer | null {
    const selectedLayers = this.getLayersByRole(PoiLayerRole.Selected);
    return selectedLayers[0] ?? null;
  }

  private getDefaultLayer(): ObcPoiLayer | null {
    const defaultLayers = this.getLayersByRole(PoiLayerRole.Default);
    return defaultLayers[defaultLayers.length - 1] ?? null;
  }

  private getSecondTopLayer(): ObcPoiLayer | null {
    const layers = Array.from(
      this.querySelectorAll('obc-poi-layer')
    ) as ObcPoiLayer[];
    if (layers.length < 2) return null;
    return layers[layers.length - 2] ?? null;
  }

  private clearOtherTopSelections(target: HTMLElement) {
    const activeLayer = this.getSelectedLayer() ?? this.getTopLayer();
    if (!activeLayer) return;
    const fallbackLayer =
      this.getDefaultLayer() ??
      (activeLayer === this.getTopLayer() ? this.getSecondTopLayer() : null);
    const topTargets = Array.from(
      activeLayer.querySelectorAll('obc-poi-target')
    ) as HTMLElement[];
    topTargets.forEach((other) => {
      if (other === target) return;
      const record = this.selectionMap.get(other);
      this.resetSelectionForTarget(
        other as ObcPoiTarget,
        record,
        fallbackLayer
      );
    });
  }

  private setTargetSelectedId(target: ObcPoiTarget) {
    const existing = this.selectionIds.get(target);
    if (existing) {
      target.selectedId = existing;
      return;
    }
    this.selectionCounter += 1;
    const nextId = String(this.selectionCounter);
    this.selectionIds.set(target, nextId);
    target.selectedId = nextId;
  }

  private clearTargetSelectedId(target: ObcPoiTarget) {
    target.selectedId = null;
  }

  private clearTargetGroupingAttributes(target: HTMLElement) {
    target.removeAttribute('data-grouped');
    target.removeAttribute('data-pregrouped');
    target.removeAttribute('data-behind');
    target.removeAttribute('data-front');
    target.removeAttribute('data-front-exit');
    target.removeAttribute('data-exiting');
    target.removeAttribute('data-exit-lock');
  }

  private setSelectedTargetInteractivity(
    target: ObcPoiTarget,
    selected: boolean
  ) {
    if (selected) {
      target.visualState = PoiTargetVisualState.Normal;
      target.style.setProperty('--obc-poi-overlap-pointer-events', 'auto');
      target.removeAttribute('data-behind');
      target.setAttribute('data-front', 'true');
    } else {
      target.style.removeProperty('--obc-poi-overlap-pointer-events');
      target.removeAttribute('data-front');
    }
  }

  private resetSelectionForTarget(
    target: ObcPoiTarget,
    record?: {
      originLayer: ObcPoiLayer;
      originIndex: number;
      originHeight: number;
    },
    fallbackLayer?: ObcPoiLayer | null
  ) {
    this.setSelectedTargetInteractivity(target, false);
    this.clearTargetGroupingAttributes(target);
    this.clearTargetSelectedId(target);
    if (record) {
      this.restoreTargetHeight(target, record.originHeight);
      if (record.originLayer !== target.closest('obc-poi-layer')) {
        this.moveTargetToLayer(target, record.originLayer, true);
      }
      this.selectionMap.delete(target);
      return;
    }
    if (fallbackLayer && fallbackLayer !== target.closest('obc-poi-layer')) {
      this.moveTargetToLayer(target, fallbackLayer, true);
    }
  }

  private clearSelectionMapExcept(target: ObcPoiTarget) {
    const entries = Array.from(this.selectionMap.entries());
    entries.forEach(([other, record]) => {
      if (other === target) return;
      this.resetSelectionForTarget(other as ObcPoiTarget, record);
    });
  }

  private setupMutationObserver() {
    this.mutationObserver?.disconnect();
    this.mutationObserver = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        for (const node of Array.from(mutation.addedNodes)) {
          if (!(node instanceof HTMLElement)) continue;
          if (
            node.tagName.toLowerCase() === 'obc-poi-target' ||
            node.querySelector?.('obc-poi-target')
          ) {
            this.schedulePlacement();
            return;
          }
        }
      }
    });
    this.mutationObserver.observe(this, {childList: true, subtree: true});
  }

  private moveTargetToLayer(
    target: HTMLElement,
    nextLayer: HTMLElement,
    skipHeightAdjust = false
  ) {
    const currentParent = target.parentElement;
    if (!currentParent || currentParent === nextLayer) return;
    const reduceMotion =
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    const wasInGroup =
      currentParent.tagName.toLowerCase() === 'obc-poi-target-button-group';
    const firstRect = this.getTargetVisualRect(target);
    nextLayer.appendChild(target);
    if (wasInGroup) {
      const group = currentParent as ObcPoiTargetButtonGroup;
      const groupLayer = group.closest('obc-poi-layer');
      if (groupLayer && groupLayer !== nextLayer) {
        group.expand = false;
      }
      target.style.removeProperty('position');
      target.style.removeProperty('width');
      target.style.removeProperty('min-width');
      target.style.removeProperty('height');
      target.style.removeProperty('transform');
    }
    if (reduceMotion) {
      if (!skipHeightAdjust) {
        this.adjustTargetHeightForLayerMove(target as ObcPoiTarget, firstRect);
      }
      this.requestLayerGrouping(nextLayer);
      return;
    }
    const lastRect = this.getTargetVisualRect(target);
    const dx = firstRect.left - lastRect.left;
    const dy = firstRect.top - lastRect.top;

    if (!skipHeightAdjust) {
      this.adjustTargetHeightByOffset(target as ObcPoiTarget, dy);
    }
    if (!Number.isFinite(dx) || !Number.isFinite(dy)) return;
    if (Math.abs(dx) < 0.5 && Math.abs(dy) < 0.5) return;
    const baseTransform = getComputedStyle(target).transform;
    target.style.willChange = 'transform';
    const animation = SUPPORTS_TRANSLATE
      ? target.animate(
          [{translate: `${dx}px ${dy}px`}, {translate: '0px 0px'}],
          {duration: 240, easing: 'cubic-bezier(0.2, 0, 0, 1)'}
        )
      : target.animate(
          [
            {
              transform:
                baseTransform === 'none'
                  ? `translate(${dx}px, ${dy}px)`
                  : `translate(${dx}px, ${dy}px) ${baseTransform}`,
            },
            {transform: baseTransform === 'none' ? 'none' : baseTransform},
          ],
          {duration: 240, easing: 'cubic-bezier(0.2, 0, 0, 1)'}
        );
    animation.addEventListener('finish', () => {
      target.style.willChange = '';
      this.requestLayerGrouping(nextLayer);
    });
  }

  private getTargetVisualRect(target: HTMLElement): DOMRect {
    if (target.tagName.toLowerCase() !== 'obc-poi-target') {
      return target.getBoundingClientRect();
    }
    const targetShadow = target.shadowRoot;
    const button = targetShadow?.querySelector('obc-poi-target-button') as
      | HTMLElement
      | undefined;
    const buttonShadow = button?.shadowRoot;
    const wrapper = buttonShadow?.querySelector(
      '.wrapper'
    ) as HTMLElement | null;
    return (
      wrapper?.getBoundingClientRect() ??
      button?.getBoundingClientRect() ??
      target.getBoundingClientRect()
    );
  }

  private requestLayerGrouping(layer: HTMLElement) {
    const targets = Array.from(
      layer.querySelectorAll('obc-poi-target')
    ) as HTMLElement[];
    targets.forEach((target) => {
      const marker = target.style.getPropertyValue(
        '--obc-poi-layer-stack-reflow'
      );
      target.style.setProperty(
        '--obc-poi-layer-stack-reflow',
        marker === '1' ? '0' : '1'
      );
    });
  }

  private schedulePlacement() {
    if (this.placementRaf) return;
    this.placementRaf = requestAnimationFrame(() => {
      this.placementRaf = 0;
      this.updateLayerOrders();
      this.syncSelectedLayerTargets();
      this.placeFilteredTargets();
    });
  }

  private updateLayerOrders() {
    const layers = Array.from(
      this.querySelectorAll('obc-poi-layer')
    ) as ObcPoiLayer[];
    if (layers.length <= 1) return;
    layers.forEach((layer, index) => {
      layer.style.order = String(index);
    });
  }

  private getLayersByRole(role: PoiLayerRole): ObcPoiLayer[] {
    return Array.from(this.querySelectorAll('obc-poi-layer')).filter(
      (layer) => (layer as ObcPoiLayer).role === role
    ) as ObcPoiLayer[];
  }

  private syncSelectedLayerTargets() {
    const selectedLayer = this.getSelectedLayer();
    if (!selectedLayer) return;

    this.selectionMap.forEach((_record, target) => {
      if (!target.isConnected) {
        this.selectionMap.delete(target);
        return;
      }
      const currentLayer = target.closest('obc-poi-layer');
      if (currentLayer !== selectedLayer) {
        this.setSelectedTargetInteractivity(target as ObcPoiTarget, false);
        this.clearTargetSelectedId(target as ObcPoiTarget);
        this.selectionMap.delete(target);
      }
    });

    const targets = Array.from(
      selectedLayer.querySelectorAll('obc-poi-target')
    ) as ObcPoiTarget[];
    targets.forEach((target) => {
      if (this.selectionMap.has(target)) return;
      if (
        this.selectionMode === PoiLayerSelectionMode.Single &&
        this.selectionMap.size > 0
      ) {
        return;
      }
      const currentLayer = target.closest(
        'obc-poi-layer'
      ) as ObcPoiLayer | null;
      const fallbackOrigin = this.getDefaultLayer();
      const originLayer =
        fallbackOrigin && fallbackOrigin !== selectedLayer
          ? fallbackOrigin
          : currentLayer;
      if (!originLayer) return;
      const originHeight = this.getTargetHeight(target);
      this.selectionMap.set(target, {
        originLayer,
        originIndex: originLayer.layerIndex,
        originHeight,
      });
      this.setTargetSelectedId(target);
      this.setSelectedTargetInteractivity(target, true);
    });
  }

  private parseTypeFilter(typeFilter: string): string[] {
    return typeFilter
      .split(/\s+/)
      .map((value) => value.trim())
      .filter(Boolean);
  }

  private placeFilteredTargets() {
    const filteredLayers = this.getLayersByRole(PoiLayerRole.Filtered);
    if (filteredLayers.length === 0) return;

    const targets = this.getAllTargets();
    const assigned = new Set<ObcPoiTarget>();

    filteredLayers.forEach((layer) => {
      const filters = this.parseTypeFilter(layer.typeFilter);
      if (filters.length === 0) return;
      targets.forEach((target) => {
        if (this.selectionMap.has(target) || assigned.has(target)) return;
        const type = target.type ?? '';
        if (!filters.includes(type)) return;
        if (target.closest('obc-poi-layer') !== layer) {
          this.moveTargetToLayer(target, layer);
        }
        assigned.add(target);
      });
    });
  }

  private getAllTargets(): ObcPoiTarget[] {
    return Array.from(
      this.querySelectorAll('obc-poi-target')
    ) as ObcPoiTarget[];
  }

  private getTargetHeight(target: ObcPoiTarget): number {
    return target.y ?? 0;
  }

  private setTargetHeight(target: ObcPoiTarget, height: number) {
    target.y = height;
  }

  private adjustTargetHeightByOffset(
    target: ObcPoiTarget,
    offset: number,
    animate = true
  ) {
    if (!Number.isFinite(offset) || Math.abs(offset) < 0.5) return;
    const currentHeight = this.getTargetHeight(target);
    const targetHeight = currentHeight + offset;

    if (!animate) {
      this.setTargetHeight(target, targetHeight);
      return;
    }

    const duration = 240;
    const startTime = performance.now();
    const startHeight = currentHeight;

    const animateHeight = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = this.cubicBezier(0.2, 0, 0, 1, progress);
      const newHeight = startHeight + (targetHeight - startHeight) * eased;
      this.setTargetHeight(target, newHeight);

      if (progress < 1) {
        requestAnimationFrame(animateHeight);
      }
    };

    requestAnimationFrame(animateHeight);
  }

  /**
   * Evaluates a cubic Bezier easing function at time t.
   * Uses Newton-Raphson to solve for the y-value given x (time).
   * Matches CSS cubic-bezier() for synchronizing JS animations with CSS.
   *
   * @param x1 - First control point x (0-1)
   * @param y1 - First control point y
   * @param x2 - Second control point x (0-1)
   * @param y2 - Second control point y
   * @param t - Time progress (0-1)
   * @returns Eased value
   */
  private cubicBezier(
    x1: number,
    y1: number,
    x2: number,
    y2: number,
    t: number
  ): number {
    const cx = 3 * x1;
    const bx = 3 * (x2 - x1) - cx;
    const ax = 1 - cx - bx;

    let tParam = t;
    for (let i = 0; i < 4; i++) {
      const x = ((ax * tParam + bx) * tParam + cx) * tParam;
      const dx = (3 * ax * tParam + 2 * bx) * tParam + cx;
      if (Math.abs(dx) < 1e-6) break;
      tParam -= (x - t) / dx;
    }

    const cy = 3 * y1;
    const by = 3 * (y2 - y1) - cy;
    const ay = 1 - cy - by;
    return ((ay * tParam + by) * tParam + cy) * tParam;
  }

  private adjustTargetHeightForLayerMove(
    target: ObcPoiTarget,
    firstRect: DOMRect
  ) {
    const lastRect = this.getTargetVisualRect(target);
    const dy = firstRect.top - lastRect.top;
    this.adjustTargetHeightByOffset(target, dy, false);
  }

  private restoreTargetHeight(target: ObcPoiTarget, originHeight: number) {
    const currentHeight = this.getTargetHeight(target);
    const offset = originHeight - currentHeight;
    this.adjustTargetHeightByOffset(target, offset, true);
  }

  static override styles = unsafeCSS(componentStyle);
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-poi-layer-stack': ObcPoiLayerStack;
  }
}
