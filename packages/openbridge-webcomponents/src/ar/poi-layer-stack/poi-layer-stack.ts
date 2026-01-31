import {LitElement, html, unsafeCSS} from 'lit';
import {property} from 'lit/decorators.js';
import {customElement} from '../../decorator.js';
import compentStyle from './poi-layer-stack.css?inline';
import {ObcPoiLayer} from '../poi-layer/poi-layer.js';
import {ObcPoiTargetButtonGroup} from '../poi-target-button-group/poi-target-button-group.js';

export enum PoiLayerSelectionMode {
  None = 'none',
  Single = 'single',
  Multi = 'multi',
}

@customElement('obc-poi-layer-stack')
export class ObcPoiLayerStack extends LitElement {
  @property({type: String, attribute: 'selection-mode'})
  selectionMode: PoiLayerSelectionMode = PoiLayerSelectionMode.None;

  @property({type: String, attribute: 'selected-type'})
  selectedType: string | null = null;

  private handleStackClick = (event: Event) => this.onStackClick(event);
  private handleSlotChange = () => this.schedulePlacement();
  private selectionMap = new Map<
    HTMLElement,
    {originLayer: ObcPoiLayer; originIndex: number; originHeight: number}
  >();
  private selectionCounter = 0;
  private selectionIds = new WeakMap<HTMLElement, string>();
  private seenTargets = new WeakSet<HTMLElement>();
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
    const originLayer = target.closest('obc-poi-layer') as ObcPoiLayer | null;
    if (!originLayer) return;

    const topLayer = this.getTopLayer();
    if (!topLayer) return;

    const existing = this.selectionMap.get(target);
    if (existing) {
      this.clearTargetGroupingAttributes(target);
      this.restoreTargetHeight(target, existing.originHeight);
      this.moveTargetToLayer(target, existing.originLayer, true);
      this.selectionMap.delete(target);
      this.clearTargetSelectedId(target);
      return;
    }

    if (this.selectionMode === PoiLayerSelectionMode.Single) {
      this.clearOtherTopSelections(target);
      this.selectionMap.forEach((record, other) => {
        this.clearTargetGroupingAttributes(other);
        this.restoreTargetHeight(other, record.originHeight);
        this.moveTargetToLayer(other, record.originLayer, true);
        this.selectionMap.delete(other);
        this.clearTargetSelectedId(other);
      });
    }

    const originHeight = this.getTargetHeight(target);
    this.selectionMap.set(target, {
      originLayer,
      originIndex: originLayer.layerIndex,
      originHeight,
    });
    this.setTargetSelectedId(target);
    this.clearTargetGroupingAttributes(target);
    if (topLayer !== originLayer) {
      this.moveTargetToLayer(target, topLayer);
    }
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
    return layers.reduce((top, layer) =>
      layer.layerIndex < top.layerIndex ? layer : top
    );
  }

  private getSecondTopLayer(): ObcPoiLayer | null {
    const layers = Array.from(
      this.querySelectorAll('obc-poi-layer')
    ) as ObcPoiLayer[];
    if (layers.length < 2) return null;
    const sorted = layers.sort((a, b) => a.layerIndex - b.layerIndex);
    return sorted[1] ?? null;
  }

  private clearOtherTopSelections(target: HTMLElement) {
    const topLayer = this.getTopLayer();
    if (!topLayer) return;
    const secondTop = this.getSecondTopLayer();
    if (!secondTop) return;
    const topTargets = Array.from(
      topLayer.querySelectorAll('obc-poi-target')
    ) as HTMLElement[];
    topTargets.forEach((other) => {
      if (other === target) return;
      const record = this.selectionMap.get(other);
      if (record) {
        this.clearTargetGroupingAttributes(other);
        this.moveTargetToLayer(other, record.originLayer);
        this.selectionMap.delete(other);
        this.clearTargetSelectedId(other);
      } else {
        this.clearTargetGroupingAttributes(other);
        this.moveTargetToLayer(other, secondTop);
      }
    });
  }

  private setTargetSelectedId(target: HTMLElement) {
    const anyTarget = target as HTMLElement & {selectedId?: string | null};
    const existing = this.selectionIds.get(target);
    if (existing) {
      anyTarget.selectedId = existing;
      return;
    }
    this.selectionCounter += 1;
    const nextId = String(this.selectionCounter);
    this.selectionIds.set(target, nextId);
    anyTarget.selectedId = nextId;
  }

  private clearTargetSelectedId(target: HTMLElement) {
    const anyTarget = target as HTMLElement & {selectedId?: string | null};
    anyTarget.selectedId = null;
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
        this.adjustTargetHeightForLayerMove(target, firstRect);
      }
      this.requestLayerGrouping(nextLayer);
      return;
    }
    const lastRect = this.getTargetVisualRect(target);
    const dx = firstRect.left - lastRect.left;
    const dy = firstRect.top - lastRect.top;

    // Adjust height to keep line bottom anchored
    if (!skipHeightAdjust) {
      this.adjustTargetHeightByOffset(target, dy);
    }
    if (!Number.isFinite(dx) || !Number.isFinite(dy)) return;
    if (Math.abs(dx) < 0.5 && Math.abs(dy) < 0.5) return;
    const supportsTranslate =
      'translate' in document.createElement('div').style;
    const baseTransform = getComputedStyle(target).transform;
    target.style.willChange = 'transform';
    const animation = supportsTranslate
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
      this.placeNewTargets();
    });
  }

  private placeNewTargets() {
    const layers = this.getSortedLayers();
    if (layers.length < 2) return;
    const top = layers[0] ?? null;
    const middle = layers.length >= 3 ? layers[1] : null;
    const bottom = layers[layers.length - 1] ?? null;
    if (!top || !bottom) return;
    const selectedType =
      this.selectedType && this.selectedType.trim().length > 0
        ? this.selectedType.trim()
        : null;
    const targets = this.getAllTargets();
    targets.forEach((target) => {
      if (this.seenTargets.has(target)) return;
      this.seenTargets.add(target);
      if (this.selectionMap.has(target)) {
        if (target.closest('obc-poi-layer') !== top) {
          this.moveTargetToLayer(target, top);
        }
        return;
      }
      const type = (target as HTMLElement & {type?: string}).type ?? '';
      if (selectedType && middle && type === selectedType) {
        if (target.closest('obc-poi-layer') !== middle) {
          this.moveTargetToLayer(target, middle);
        }
        return;
      }
      if (target.closest('obc-poi-layer') !== bottom) {
        this.moveTargetToLayer(target, bottom);
      }
    });
  }

  private getSortedLayers() {
    const layers = Array.from(
      this.querySelectorAll('obc-poi-layer')
    ) as ObcPoiLayer[];
    return layers.sort((a, b) => a.layerIndex - b.layerIndex);
  }

  private getAllTargets() {
    return Array.from(this.querySelectorAll('obc-poi-target')) as HTMLElement[];
  }

  private getTargetHeight(target: HTMLElement): number {
    const anyTarget = target as HTMLElement & {height?: number};
    return anyTarget.height ?? 0;
  }

  private setTargetHeight(target: HTMLElement, height: number) {
    const anyTarget = target as HTMLElement & {height?: number};
    anyTarget.height = height;
  }

  private adjustTargetHeightByOffset(
    target: HTMLElement,
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

    // Animate height change to match position animation (240ms)
    const duration = 240;
    const startTime = performance.now();
    const startHeight = currentHeight;

    const animateHeight = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Use same easing as position animation: cubic-bezier(0.2, 0, 0, 1)
      const eased = this.cubicBezier(0.2, 0, 0, 1, progress);
      const newHeight = startHeight + (targetHeight - startHeight) * eased;
      this.setTargetHeight(target, newHeight);

      if (progress < 1) {
        requestAnimationFrame(animateHeight);
      }
    };

    requestAnimationFrame(animateHeight);
  }

  private cubicBezier(
    x1: number,
    y1: number,
    x2: number,
    y2: number,
    t: number
  ): number {
    // Approximate cubic-bezier for animation easing
    const cx = 3 * x1;
    const bx = 3 * (x2 - x1) - cx;
    const ax = 1 - cx - bx;
    const cy = 3 * y1;
    const by = 3 * (y2 - y1) - cy;
    const ay = 1 - cy - by;

    // Solve for t given x using Newton-Raphson
    let tGuess = t;
    for (let i = 0; i < 4; i++) {
      const xGuess = ((ax * tGuess + bx) * tGuess + cx) * tGuess;
      const dxGuess = (3 * ax * tGuess + 2 * bx) * tGuess + cx;
      if (Math.abs(dxGuess) < 1e-6) break;
      tGuess -= (xGuess - t) / dxGuess;
    }

    return ((ay * tGuess + by) * tGuess + cy) * tGuess;
  }

  private adjustTargetHeightForLayerMove(
    target: HTMLElement,
    firstRect: DOMRect
  ) {
    const lastRect = this.getTargetVisualRect(target);
    const dy = firstRect.top - lastRect.top;
    this.adjustTargetHeightByOffset(target, dy, false);
  }

  private restoreTargetHeight(target: HTMLElement, originHeight: number) {
    const currentHeight = this.getTargetHeight(target);
    const offset = originHeight - currentHeight;
    this.adjustTargetHeightByOffset(target, offset, true);
  }

  static override styles = unsafeCSS(compentStyle);
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-poi-layer-stack': ObcPoiLayerStack;
  }
}
