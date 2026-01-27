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

  private handleStackClick = (event: Event) => this.onStackClick(event);
  private selectionMap = new Map<
    HTMLElement,
    {originLayer: ObcPoiLayer; originIndex: number}
  >();

  override connectedCallback() {
    super.connectedCallback();
    this.addEventListener('click', this.handleStackClick);
  }

  override disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener('click', this.handleStackClick);
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
      existing.originLayer.appendChild(target);
      this.selectionMap.delete(target);
      return;
    }

    if (this.selectionMode === PoiLayerSelectionMode.Single) {
      this.clearOtherTopSelections(target);
      this.selectionMap.forEach((record, other) => {
        record.originLayer.appendChild(other);
        this.selectionMap.delete(other);
      });
    }

    this.selectionMap.set(target, {
      originLayer,
      originIndex: originLayer.layerIndex,
    });
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
        record.originLayer.appendChild(other);
        this.selectionMap.delete(other);
      } else {
        secondTop.appendChild(other);
      }
    });
  }

  static override styles = unsafeCSS(compentStyle);
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-poi-layer-stack': ObcPoiLayerStack
  }
}
