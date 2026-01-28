import {LitElement, html, unsafeCSS} from 'lit';
import {property} from 'lit/decorators.js';
import {customElement} from '../../decorator.js';
import compentStyle from './poi-layer-stack.css?inline';
import {ObcPoiLayer} from '../poi-layer/poi-layer.js';

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
    {originLayer: ObcPoiLayer; originIndex: number}
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
      this.resetTargetGroupingStateIfGrouped(target);
      existing.originLayer.appendChild(target);
      this.selectionMap.delete(target);
      this.clearTargetSelectedId(target);
      return;
    }

    if (this.selectionMode === PoiLayerSelectionMode.Single) {
      this.clearOtherTopSelections(target);
      this.selectionMap.forEach((record, other) => {
        this.resetTargetGroupingStateIfGrouped(other);
        record.originLayer.appendChild(other);
        this.selectionMap.delete(other);
        this.clearTargetSelectedId(other);
      });
    }

    this.selectionMap.set(target, {
      originLayer,
      originIndex: originLayer.layerIndex,
    });
    this.setTargetSelectedId(target);
    this.resetTargetGroupingStateIfGrouped(target);
    if (topLayer !== originLayer) {
      topLayer.appendChild(target);
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
        this.resetTargetGroupingStateIfGrouped(other);
        record.originLayer.appendChild(other);
        this.selectionMap.delete(other);
        this.clearTargetSelectedId(other);
      } else {
        this.resetTargetGroupingStateIfGrouped(other);
        secondTop.appendChild(other);
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

  private resetTargetGroupingStateIfGrouped(target: HTMLElement) {
    const parentTag = target.parentElement?.tagName.toLowerCase();
    const hasGroupAttrs =
      target.hasAttribute('data-grouped') ||
      target.hasAttribute('data-pregrouped') ||
      target.hasAttribute('data-behind') ||
      target.hasAttribute('data-front') ||
      target.hasAttribute('data-front-exit') ||
      target.hasAttribute('data-exiting') ||
      target.hasAttribute('data-exit-lock');
    const hasInlinePosition =
      target.style.position ||
      target.style.transform ||
      target.style.width ||
      target.style.minWidth ||
      target.style.height;
    if (parentTag !== 'obc-poi-target-button-group' && !hasGroupAttrs && !hasInlinePosition) {
      return;
    }
    target.removeAttribute('data-grouped');
    target.removeAttribute('data-pregrouped');
    target.removeAttribute('data-behind');
    target.removeAttribute('data-front');
    target.removeAttribute('data-front-exit');
    target.removeAttribute('data-exiting');
    target.removeAttribute('data-exit-lock');
    const anyTarget = target as HTMLElement & {overlap?: boolean; offset?: number};
    if (typeof anyTarget.overlap === 'boolean') {
      anyTarget.overlap = false;
    }
    if (typeof anyTarget.offset === 'number') {
      anyTarget.offset = 0;
    }
    target.style.removeProperty('position');
    target.style.removeProperty('width');
    target.style.removeProperty('min-width');
    target.style.removeProperty('height');
    target.style.removeProperty('transform');
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
          top.appendChild(target);
        }
        return;
      }
      const type = (target as HTMLElement & {type?: string}).type ?? '';
      if (selectedType && middle && type === selectedType) {
        if (target.closest('obc-poi-layer') !== middle) {
          middle.appendChild(target);
        }
        return;
      }
      if (target.closest('obc-poi-layer') !== bottom) {
        bottom.appendChild(target);
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
    return Array.from(
      this.querySelectorAll('obc-poi-target')
    ) as HTMLElement[];
  }

  static override styles = unsafeCSS(compentStyle);
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-poi-layer-stack': ObcPoiLayerStack
  }
}
