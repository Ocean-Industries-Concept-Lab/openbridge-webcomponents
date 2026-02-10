import {LitElement, html, unsafeCSS} from 'lit';
import {property} from 'lit/decorators.js';
import {customElement} from '../../decorator.js';
import componentStyle from './poi-layer-stack.css?inline';
import {ObcPoiLayer, PoiLayerRole} from '../poi-layer/poi-layer.js';
import {ObcPoiGroup} from '../poi-group/poi-group.js';
import {ObcPoiData, PoiDataValue} from '../poi-data/poi-data.js';

const SUPPORTS_TRANSLATE =
  typeof document !== 'undefined' &&
  'translate' in document.createElement('div').style;
const JUMP_DURATION_MS = 100;
const JUMP_BEZIER = [0.2, 0, 0, 1] as const;

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
    ObcPoiData,
    {originLayer: ObcPoiLayer; originLineLength: number}
  >();
  private selectionCounter = 0;
  private selectionIds = new WeakMap<ObcPoiData, string>();
  private movingTargets = new Set<ObcPoiData>();
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
    this.movingTargets.clear();
    this.selectionCounter = 0;
    this.selectionIds = new WeakMap<ObcPoiData, string>();
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
    const target = this.getPoiTargetFromEvent(event);
    if (!target) return;

    this.cleanupSelection();
    const originLayer = this.getTargetLayer(target);
    if (!originLayer) return;

    const selectedLayer = this.getSelectedLayer() ?? this.getTopLayer();
    if (!selectedLayer) return;

    const existing = this.selectionMap.get(target);
    if (existing) {
      this.setSelectedTargetInteractivity(target, false);
      this.clearTargetGroupingAttributes(target);
      const currentLayer = this.getTargetLayer(target);
      if (existing.originLayer !== currentLayer) {
        this.clearTargetSelectedId(target);
        this.moveTargetToLayer(target, existing.originLayer, () => {
          this.animateTargetLineCompensation(target, 0, false);
        });
      } else {
        this.animateTargetLineCompensation(target, 0, true);
        this.clearTargetSelectedId(target);
      }
      this.selectionMap.delete(target);
      this.schedulePlacement();
      return;
    }

    if (this.selectionMode === PoiLayerSelectionMode.Single) {
      this.clearOtherTopSelections(target);
      this.clearSelectionMapExcept(target);
    }

    const originLineLength = Number.isFinite(target.y) ? target.y : 0;
    this.selectionMap.set(target, {
      originLayer,
      originLineLength,
    });
    this.clearTargetGroupingAttributes(target);
    this.setSelectedTargetInteractivity(target, true);
    if (selectedLayer !== originLayer) {
      this.setTargetSelectedId(target);
      this.moveTargetToLayer(target, selectedLayer);
    } else {
      this.setTargetSelectedId(target);
    }
    this.schedulePlacement();
  }

  private getPoiTargetFromEvent(event: Event): ObcPoiData | null {
    const path = event.composedPath?.() ?? [];
    for (const item of path) {
      if (
        item instanceof HTMLElement &&
        item.tagName.toLowerCase() === 'obc-poi-data'
      ) {
        return item as ObcPoiData;
      }
    }
    const direct = event.target instanceof HTMLElement ? event.target : null;
    return direct?.closest('obc-poi-data') as ObcPoiData | null;
  }

  private getTargetLayer(target: Element): ObcPoiLayer | null {
    return target.closest('obc-poi-layer') as ObcPoiLayer | null;
  }

  private getLayerTargets(layer: ParentNode): ObcPoiData[] {
    return Array.from(layer.querySelectorAll('obc-poi-data')) as ObcPoiData[];
  }

  private getAllLayers(): ObcPoiLayer[] {
    return Array.from(this.querySelectorAll('obc-poi-layer')) as ObcPoiLayer[];
  }

  private cleanupSelection() {
    this.selectionMap.forEach((_, target) => {
      if (!target.isConnected) this.selectionMap.delete(target);
    });
    this.movingTargets.forEach((target) => {
      if (!target.isConnected) this.movingTargets.delete(target);
    });
  }

  private getTopLayer(): ObcPoiLayer | null {
    const layers = this.getAllLayers();
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
    const layers = this.getAllLayers();
    if (layers.length < 2) return null;
    return layers[layers.length - 2] ?? null;
  }

  private clearOtherTopSelections(target: ObcPoiData) {
    const activeLayer = this.getSelectedLayer() ?? this.getTopLayer();
    if (!activeLayer) return;
    const fallbackLayer =
      this.getDefaultLayer() ??
      (activeLayer === this.getTopLayer() ? this.getSecondTopLayer() : null);
    const topTargets = this.getLayerTargets(activeLayer);
    topTargets.forEach((other) => {
      if (other === target) return;
      const record = this.selectionMap.get(other);
      this.resetSelectionForTarget(other, record, fallbackLayer);
    });
  }

  private setTargetSelectedId(target: ObcPoiData) {
    const existing = this.selectionIds.get(target);
    if (existing) {
      target.header = {content: existing};
      return;
    }
    this.selectionCounter += 1;
    const nextId = String(this.selectionCounter);
    this.selectionIds.set(target, nextId);
    target.header = {content: nextId};
  }

  private clearTargetSelectedId(target: ObcPoiData) {
    target.header = null;
  }

  private clearTargetGroupingAttributes(target: ObcPoiData) {
    target.removeAttribute('data-grouped');
    target.removeAttribute('data-pregrouped');
    target.removeAttribute('data-behind');
    target.removeAttribute('data-front');
    target.removeAttribute('data-front-exit');
    target.removeAttribute('data-exiting');
    target.removeAttribute('data-exit-lock');
  }

  private setSelectedTargetInteractivity(
    target: ObcPoiData,
    selected: boolean
  ) {
    if (selected) {
      target.value = PoiDataValue.Unchecked;
      target.style.setProperty('--obc-poi-overlap-pointer-events', 'auto');
      target.removeAttribute('data-behind');
      target.setAttribute('data-front', 'true');
    } else {
      target.style.removeProperty('--obc-poi-overlap-pointer-events');
      target.removeAttribute('data-front');
    }
  }

  private resetSelectionForTarget(
    target: ObcPoiData,
    record?: {
      originLayer: ObcPoiLayer;
      originLineLength: number;
    },
    fallbackLayer?: ObcPoiLayer | null
  ) {
    this.setSelectedTargetInteractivity(target, false);
    this.clearTargetGroupingAttributes(target);
    const currentLayer = this.getTargetLayer(target);
    if (record) {
      if (record.originLayer !== currentLayer) {
        this.clearTargetSelectedId(target);
        this.moveTargetToLayer(target, record.originLayer, () => {
          this.animateTargetLineCompensation(target, 0, false);
        });
      } else {
        this.animateTargetLineCompensation(target, 0, true);
        this.clearTargetSelectedId(target);
      }
      this.selectionMap.delete(target);
      return;
    }
    if (fallbackLayer && fallbackLayer !== currentLayer) {
      this.clearTargetSelectedId(target);
      this.moveTargetToLayer(target, fallbackLayer);
      return;
    }
    this.clearTargetSelectedId(target);
  }

  private clearSelectionMapExcept(target: ObcPoiData) {
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
        for (const node of Array.from(mutation.addedNodes)) {
          if (!(node instanceof HTMLElement)) continue;
          if (
            node.tagName.toLowerCase() === 'obc-poi-data' ||
            node.querySelector?.('obc-poi-data')
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
    target: ObcPoiData,
    nextLayer: ObcPoiLayer,
    afterMove?: () => void
  ) {
    const currentParent = target.parentElement;
    if (!currentParent || currentParent === nextLayer) {
      afterMove?.();
      return;
    }
    this.movingTargets.add(target);
    const finalizeMove = () => {
      this.movingTargets.delete(target);
      afterMove?.();
    };
    const reduceMotion =
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    const wasInGroup = currentParent.tagName.toLowerCase() === 'obc-poi-group';
    const firstVisualAnchor = this.getTargetVisualAnchor(target);
    const firstTargetAnchor = this.getTargetPointAnchor(target);
    nextLayer.appendChild(target);
    if (wasInGroup) {
      const group = currentParent as ObcPoiGroup;
      const groupLayer = group.closest('obc-poi-layer');
      if (groupLayer && groupLayer !== nextLayer) {
        group.expand = false;
      }
      target.topOffset = 0;
      target.buttonOffsetX = 0;
      target.offset = 0;
      target.style.removeProperty('position');
      target.style.removeProperty('width');
      target.style.removeProperty('min-width');
      target.style.removeProperty('height');
      target.style.removeProperty('transform');
    }
    const lastVisualAnchor = this.getTargetVisualAnchor(target);
    const lastTargetAnchor = this.getTargetPointAnchor(target);
    const dx = firstVisualAnchor.x - lastVisualAnchor.x;
    const dy = firstVisualAnchor.y - lastVisualAnchor.y;
    const lineDy = firstTargetAnchor.y - lastTargetAnchor.y;
    if (reduceMotion) {
      this.adjustTargetLineLengthByOffset(target, lineDy, false);
      this.requestLayerGrouping(nextLayer);
      finalizeMove();
      return;
    }
    const hasVisualDelta =
      Number.isFinite(dx) &&
      Number.isFinite(dy) &&
      (Math.abs(dx) >= 0.5 || Math.abs(dy) >= 0.5);
    const hasLineDelta = Number.isFinite(lineDy) && Math.abs(lineDy) >= 0.5;

    if (!hasVisualDelta && !hasLineDelta) {
      this.requestLayerGrouping(nextLayer);
      finalizeMove();
      return;
    }

    requestAnimationFrame((frameNow) => {
      if (hasLineDelta) {
        this.adjustTargetLineLengthByOffset(target, lineDy, true, frameNow);
      }
      if (!hasVisualDelta) {
        this.requestLayerGrouping(nextLayer);
        finalizeMove();
        return;
      }

      const baseTransform = getComputedStyle(target).transform;
      const duration = JUMP_DURATION_MS;
      const [x1, y1, x2, y2] = JUMP_BEZIER;
      const easing = `cubic-bezier(${x1}, ${y1}, ${x2}, ${y2})`;
      target.style.willChange = 'transform';
      const animation = SUPPORTS_TRANSLATE
        ? target.animate(
            [{translate: `${dx}px ${dy}px`}, {translate: '0px 0px'}],
            {duration, easing}
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
            {duration, easing}
          );
      const completeMove = () => {
        target.style.willChange = '';
        this.requestLayerGrouping(nextLayer);
        finalizeMove();
      };
      animation.addEventListener('finish', completeMove, {once: true});
      animation.addEventListener('cancel', completeMove, {once: true});
    });
  }

  private getRectBottomCenter(rect: DOMRect): {x: number; y: number} {
    return {x: rect.left + rect.width / 2, y: rect.bottom};
  }

  private getTargetVisualAnchor(target: ObcPoiData): {x: number; y: number} {
    const targetShadow = target.shadowRoot;
    const poi = targetShadow?.querySelector('obc-poi') as
      | HTMLElement
      | undefined;
    const poiButton = poi?.shadowRoot?.querySelector('obc-poi-button') as
      | HTMLElement
      | undefined;
    const dataButton = targetShadow?.querySelector('obc-poi-button-data') as
      | HTMLElement
      | undefined;
    const button = poiButton ?? dataButton;
    const buttonShadow = button?.shadowRoot;
    const buttonWrapper = buttonShadow?.querySelector(
      '.button-wrapper'
    ) as HTMLElement | null;
    const wrapper = buttonShadow?.querySelector(
      '.wrapper'
    ) as HTMLElement | null;
    const rect =
      // Anchor math must ignore header mount/unmount, so prefer the fixed
      // button wrapper over the overall wrapper that grows/shrinks with labels.
      buttonWrapper?.getBoundingClientRect() ??
      button?.getBoundingClientRect() ??
      wrapper?.getBoundingClientRect() ??
      poi?.getBoundingClientRect() ??
      target.getBoundingClientRect();
    return this.getRectBottomCenter(rect);
  }

  private getTargetPointAnchor(target: ObcPoiData): {x: number; y: number} {
    const targetShadow = target.shadowRoot;
    const poi = targetShadow?.querySelector('obc-poi') as
      | HTMLElement
      | undefined;
    const pointer = poi?.shadowRoot?.querySelector(
      'obc-poi-pointer.pointer'
    ) as HTMLElement | null;
    if (pointer) {
      return this.getRectBottomCenter(pointer.getBoundingClientRect());
    }
    return this.getTargetVisualAnchor(target);
  }

  private requestLayerGrouping(layer: ObcPoiLayer) {
    const targets = Array.from(
      layer.querySelectorAll('obc-poi-data')
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
    const layers = this.getAllLayers();
    if (layers.length <= 1) return;
    layers.forEach((layer, index) => {
      const rawIndex = Number.isFinite(layer.layerIndex) ? layer.layerIndex : 0;
      const clampedIndex = Math.max(0, rawIndex);
      if (clampedIndex !== layer.layerIndex) {
        layer.layerIndex = clampedIndex;
      }
      layer.style.order = String(index);
    });
  }

  private getLayersByRole(role: PoiLayerRole): ObcPoiLayer[] {
    const layers = this.getAllLayers();
    return layers.filter((layer) => layer.role === role);
  }

  private syncSelectedLayerTargets() {
    const selectedLayer = this.getSelectedLayer();
    if (!selectedLayer) return;

    this.selectionMap.forEach((_record, target) => {
      if (!target.isConnected) {
        this.selectionMap.delete(target);
        return;
      }
      const currentLayer = this.getTargetLayer(target);
      if (currentLayer !== selectedLayer) {
        this.setSelectedTargetInteractivity(target, false);
        this.clearTargetSelectedId(target);
        this.selectionMap.delete(target);
      }
    });

    const targets = this.getLayerTargets(selectedLayer);
    targets.forEach((target) => {
      if (this.movingTargets.has(target)) {
        return;
      }
      this.setTargetSelectedId(target);

      if (this.selectionMode === PoiLayerSelectionMode.None) {
        this.setSelectedTargetInteractivity(target, false);
        return;
      }

      if (this.selectionMap.has(target)) return;
      if (
        this.selectionMode === PoiLayerSelectionMode.Single &&
        this.selectionMap.size > 0
      ) {
        return;
      }
      const currentLayer = this.getTargetLayer(target);
      const fallbackOrigin = this.getDefaultLayer();
      const originLayer =
        fallbackOrigin && fallbackOrigin !== selectedLayer
          ? fallbackOrigin
          : currentLayer;
      if (!originLayer) return;
      const originLineLength = Number.isFinite(target.y) ? target.y : 0;
      this.selectionMap.set(target, {
        originLayer,
        originLineLength,
      });
      this.setSelectedTargetInteractivity(target, true);
    });
  }

  private placeFilteredTargets() {
    const filteredLayers = this.getLayersByRole(PoiLayerRole.Filtered);
    if (filteredLayers.length === 0) return;

    const targets = this.getLayerTargets(this);
    const assigned = new Set<ObcPoiData>();

    filteredLayers.forEach((layer) => {
      const filters = layer.typeFilter
        .split(/\s+/)
        .map((value) => value.trim())
        .filter(Boolean);
      if (filters.length === 0) return;
      targets.forEach((target) => {
        if (this.selectionMap.has(target) || assigned.has(target)) return;
        const type = target.type ?? '';
        if (!filters.includes(type)) return;
        if (this.getTargetLayer(target) !== layer) {
          this.moveTargetToLayer(target, layer);
        }
        assigned.add(target);
      });
    });
  }

  private getTargetLineCompensation(target: ObcPoiData): number {
    const compensation = target.lineCompensationY;
    return Number.isFinite(compensation) ? compensation : 0;
  }

  private animateTargetLineCompensation(
    target: ObcPoiData,
    targetCompensation: number,
    animate: boolean,
    startTimeOverride?: number
  ) {
    if (!animate) {
      target.lineCompensationY = targetCompensation;
      return;
    }

    const duration = JUMP_DURATION_MS;
    const [x1, y1, x2, y2] = JUMP_BEZIER;
    const startTime = startTimeOverride ?? performance.now();
    const startCompensation = this.getTargetLineCompensation(target);

    const animateLineLength = (now: number) => {
      try {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = this.cubicBezier(x1, y1, x2, y2, progress);
        const nextCompensation =
          startCompensation + (targetCompensation - startCompensation) * eased;
        target.lineCompensationY = nextCompensation;

        if (progress < 1) {
          requestAnimationFrame(animateLineLength);
        }
      } catch (error) {
        console.error(
          '[poi-layer-stack] Error in line length animation:',
          error
        );
      }
    };

    requestAnimationFrame(animateLineLength);
  }

  private adjustTargetLineLengthByOffset(
    target: ObcPoiData,
    offset: number,
    animate = true,
    startTimeOverride?: number
  ) {
    if (!Number.isFinite(offset) || Math.abs(offset) < 0.5) return;
    const currentCompensation = this.getTargetLineCompensation(target);
    const targetCompensation = target.fixedTarget
      ? currentCompensation - offset
      : currentCompensation + offset;
    this.animateTargetLineCompensation(
      target,
      targetCompensation,
      animate,
      startTimeOverride
    );
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

  static override styles = unsafeCSS(componentStyle);
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-poi-layer-stack': ObcPoiLayerStack;
  }
}
