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
import {
  PoiDataValue,
  PoiDataVisualRectPreference,
} from '../poi-data/poi-data.js';
import {Poi, isPoi, POI_ATTR} from '../building-blocks/poi/poi.js';

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
 *   <obc-poi-layer label="Radar" is-selected></obc-poi-layer>
 *   <obc-poi-layer label="AIS"></obc-poi-layer>
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
    Poi,
    {originLayer: ObcPoiLayer; originLineLength: number}
  >();
  private selectionCounter = 0;
  private selectionIds = new WeakMap<Poi, string>();
  private movingTargets = new Set<Poi>();
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
    requestAnimationFrame(() => {
      this.schedulePlacement();
      requestAnimationFrame(() => this.schedulePlacement());
    });
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
    this.selectionIds = new WeakMap<Poi, string>();
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

  private getPoiTargetFromEvent(event: Event): Poi | null {
    const path = event.composedPath?.() ?? [];
    for (const item of path) {
      if (item instanceof HTMLElement && isPoi(item)) {
        return item;
      }
    }
    const direct = event.target instanceof HTMLElement ? event.target : null;
    if (!direct) return null;
    const closest = direct.closest(`[${POI_ATTR}]`);
    return closest && isPoi(closest) ? closest : null;
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
      if (!target.isConnected) this.selectionMap.delete(target);
    });
    this.movingTargets.forEach((target) => {
      if (!target.isConnected) this.movingTargets.delete(target);
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
    const fallbackLayer =
      this.getLayer('default') ??
      (activeLayer === topLayer ? this.getLayer('secondTop') : null);
    const topTargets = this.getLayerTargets(activeLayer);
    topTargets.forEach((other) => {
      if (other === target) return;
      const record = this.selectionMap.get(other);
      this.resetSelectionForTarget(other, record, fallbackLayer);
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

    const existing = this.selectionIds.get(target);
    const selectedId = existing ?? String(++this.selectionCounter);
    if (!existing) {
      this.selectionIds.set(target, selectedId);
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

  private moveTargetToLayer(
    target: Poi,
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
      target.buttonOffsetX = 0;
      target.targetOffsetX = 0;
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
      nextLayer.requestGroupingUpdate();
      finalizeMove();
      return;
    }
    const hasVisualDelta =
      Number.isFinite(dx) &&
      Number.isFinite(dy) &&
      (Math.abs(dx) >= 0.5 || Math.abs(dy) >= 0.5);
    const hasLineDelta = Number.isFinite(lineDy) && Math.abs(lineDy) >= 0.5;

    if (!hasVisualDelta && !hasLineDelta) {
      nextLayer.requestGroupingUpdate();
      finalizeMove();
      return;
    }

    requestAnimationFrame((frameNow) => {
      if (hasLineDelta) {
        this.adjustTargetLineLengthByOffset(target, lineDy, true, frameNow);
      }
      if (!hasVisualDelta) {
        nextLayer.requestGroupingUpdate();
        finalizeMove();
        return;
      }

      const baseTransform = getComputedStyle(target).transform;
      const duration = JUMP_DURATION_MS;
      const [x1, y1, x2, y2] = JUMP_BEZIER;
      const easing = `cubic-bezier(${x1}, ${y1}, ${x2}, ${y2})`;
      target.style.willChange = 'transform';
      const animation = target.animate(
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
        nextLayer.requestGroupingUpdate();
        finalizeMove();
      };
      animation.addEventListener('finish', completeMove, {once: true});
      animation.addEventListener('cancel', completeMove, {once: true});
    });
  }

  private getRectBottomCenter(rect: DOMRect): {x: number; y: number} {
    return {x: rect.left + rect.width / 2, y: rect.bottom};
  }

  private getTargetVisualAnchor(target: Poi): {
    x: number;
    y: number;
  } {
    const rect = target.getVisualRect(PoiDataVisualRectPreference.Anchor);
    return this.getRectBottomCenter(rect);
  }

  private getTargetPointAnchor(target: Poi): {x: number; y: number} {
    const pointer = target.getPointerElement();
    if (pointer) {
      return this.getRectBottomCenter(pointer.getBoundingClientRect());
    }
    return this.getTargetVisualAnchor(target);
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
    this.updateLayerInactiveState(selectedLayer);
    const allTargets = this.getAllLayers().flatMap((layer) =>
      this.getLayerTargets(layer)
    );

    if (!selectedLayer) {
      allTargets.forEach((target) => {
        if (this.movingTargets.has(target)) {
          return;
        }
        this.setSelectedTargetInteractivity(target, false);
        this.clearTargetSelectedId(target);
        this.selectionMap.delete(target);
      });
      return;
    }

    allTargets.forEach((target) => {
      if (this.movingTargets.has(target)) {
        return;
      }

      const currentLayer = this.getTargetLayer(target);
      const isInSelectedLayer = currentLayer === selectedLayer;

      if (!isInSelectedLayer) {
        this.setSelectedTargetInteractivity(target, false);
        this.clearTargetSelectedId(target);
        this.selectionMap.delete(target);
        return;
      }

      this.setTargetSelectedId(target);
      this.setSelectedTargetInteractivity(target, true);

      if (this.selectionMode === PoiLayerSelectionMode.None) {
        return;
      }

      if (this.selectionMap.has(target)) return;
      if (
        this.selectionMode === PoiLayerSelectionMode.Single &&
        this.selectionMap.size > 0
      ) {
        return;
      }
      const fallbackOrigin = this.getLayer('default');
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
      this.syncInitialSelectedTargetLineCompensation(
        target,
        originLayer,
        selectedLayer
      );
    });
  }

  private syncInitialSelectedTargetLineCompensation(
    target: Poi,
    originLayer: ObcPoiLayer,
    selectedLayer: ObcPoiLayer
  ) {
    if (originLayer === selectedLayer) {
      return;
    }

    const originRect = originLayer.getBoundingClientRect();
    const selectedRect = selectedLayer.getBoundingClientRect();
    const layerBottomDelta = originRect.bottom - selectedRect.bottom;
    if (
      !Number.isFinite(layerBottomDelta) ||
      Math.abs(layerBottomDelta) < 0.5
    ) {
      return;
    }

    const expectedCompensation = target.fixedTarget
      ? -layerBottomDelta
      : layerBottomDelta;
    const currentCompensation = this.getTargetLineCompensation(target);
    if (Math.abs(expectedCompensation - currentCompensation) < 0.5) {
      return;
    }

    this.animateTargetLineCompensation(target, expectedCompensation, false);
  }

  private getTargetLineCompensation(target: Poi): number {
    const compensation = target.lineCompensationY;
    return Number.isFinite(compensation) ? compensation : 0;
  }

  private animateTargetLineCompensation(
    target: Poi,
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
        const eased = this.evaluateCubicBezier(x1, y1, x2, y2, progress);
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
    target: Poi,
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

  private evaluateCubicBezier(
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
