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
  @property({type: String, attribute: 'selection-mode'})
  selectionMode: PoiLayerSelectionMode = PoiLayerSelectionMode.None;

  private handleStackClick = (event: Event) => this.onStackClick(event);
  private handleSlotChange = () => this.schedulePlacement();
  private selectionMap = new Map<
    Poi,
    {originLayer: ObcPoiLayer; targetViewportY: number}
  >();
  private selectionCounter = 0;
  private selectionIds = new WeakMap<Poi, string>();
  private proxyToSource = new WeakMap<Poi, Poi>();
  private sourceToProxy = new WeakMap<Poi, Poi>();
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
    this.selectionMap.forEach((_, target) => this.clearTargetProxy(target));
    this.selectionMap.clear();
    this.selectionCounter = 0;
    this.selectionIds = new WeakMap<Poi, string>();
    this.proxyToSource = new WeakMap<Poi, Poi>();
    this.sourceToProxy = new WeakMap<Poi, Poi>();
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
      } else {
        this.clearTargetSelectedId(target);
      }
      this.clearTargetProxy(target);
      this.selectionMap.delete(target);
      this.schedulePlacement();
      return;
    }

    if (this.selectionMode === PoiLayerSelectionMode.Single) {
      this.clearOtherTopSelections(target);
      this.clearSelectionMapExcept(target);
    }

    this.selectionMap.set(target, {
      originLayer,
      targetViewportY: this.getTargetViewportY(target),
    });
    this.clearTargetGroupingAttributes(target);
    this.setSelectedTargetInteractivity(target, true);
    this.setTargetSelectedId(target);
    this.suppressSourceTargetWhileProxied(target);
    this.schedulePlacement();
  }

  private getPoiTargetFromEvent(event: Event): Poi | null {
    const path = event.composedPath?.() ?? [];
    for (const item of path) {
      if (item instanceof HTMLElement && isPoi(item)) {
        const poi = item as Poi;
        return this.proxyToSource.get(poi) ?? poi;
      }
    }
    const direct = event.target instanceof HTMLElement ? event.target : null;
    if (!direct) return null;
    const closest = direct.closest(`[${POI_ATTR}]`);
    if (closest && isPoi(closest)) {
      const poi = closest as Poi;
      return this.proxyToSource.get(poi) ?? poi;
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
        this.clearTargetProxy(target);
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

  private requestPoiRender(target: Poi) {
    const component = target as unknown as {requestUpdate?: () => void};
    component.requestUpdate?.();
  }

  private cloneLightDomChildren(source: Poi, proxy: Poi) {
    while (proxy.firstChild) {
      proxy.firstChild.remove();
    }
    Array.from(source.childNodes).forEach((node) => {
      proxy.appendChild(node.cloneNode(true));
    });
  }

  private syncProxyProps(source: Poi, proxy: Poi) {
    const sourceRecord = source as unknown as Record<string, unknown>;
    const proxyRecord = proxy as unknown as Record<string, unknown>;
    const commonKeys = [
      'type',
      'value',
      'state',
      'x',
      'buttonY',
      'fixedTarget',
      'buttonOffsetX',
      'targetOffsetX',
      'buttonType',
      'overlapOpaque',
      'data',
      'hasHeader',
      'headerContent',
      'hasPointer',
      'pointerType',
      'pointerState',
      'relativeDirection',
      'boxWidth',
      'boxHeight',
      'outsideAngle',
      'animatePosition',
      'selected',
    ] as const;

    commonKeys.forEach((key) => {
      if (key in source) {
        proxyRecord[key] = sourceRecord[key];
      }
    });

    const tagName = source.tagName.toLowerCase();
    if (tagName === 'obc-poi-data') {
      ['dataStyle', 'dataState', 'dataInteractive'].forEach((key) => {
        proxyRecord[key] = sourceRecord[key];
      });
    } else if (tagName === 'obc-poi-aton') {
      ['atonType', 'atonStyle', 'atonState', 'atonInteractive'].forEach(
        (key) => {
          proxyRecord[key] = sourceRecord[key];
        }
      );
    } else if (tagName === 'obc-poi-vessel') {
      ['vesselType', 'vesselStyle', 'vesselState', 'vesselInteractive'].forEach(
        (key) => {
          proxyRecord[key] = sourceRecord[key];
        }
      );
    }
  }

  private createTargetProxy(source: Poi): Poi {
    const proxy = document.createElement(source.tagName.toLowerCase()) as Poi;
    proxy.setAttribute('data-stack-proxy', 'true');
    this.cloneLightDomChildren(source, proxy);
    this.syncProxyProps(source, proxy);
    this.proxyToSource.set(proxy, source);
    this.sourceToProxy.set(source, proxy);
    return proxy;
  }

  private getTargetViewportY(target: Poi): number {
    const poi = target.shadowRoot?.querySelector(
      'obc-poi'
    ) as HTMLElement | null;
    const targetAnchor = poi?.shadowRoot?.querySelector(
      '.target-anchor'
    ) as HTMLElement | null;
    if (targetAnchor) {
      return targetAnchor.getBoundingClientRect().top;
    }

    const pointer = target.getPointerElement();
    if (pointer) {
      return pointer.getBoundingClientRect().top;
    }

    return target.getBoundingClientRect().bottom;
  }

  private clearTargetProxy(target: Poi) {
    const proxy = this.sourceToProxy.get(target);
    if (proxy?.isConnected) {
      proxy.remove();
    }
    if (proxy) {
      this.proxyToSource.delete(proxy);
      this.sourceToProxy.delete(target);
    }
    target.style.removeProperty('display');
    target.style.removeProperty('visibility');
    target.style.removeProperty('pointer-events');
    target.style.removeProperty('opacity');
    target.style.removeProperty('--obc-poi-layer-inactive-opacity');
    target.style.removeProperty('--obc-poi-label-opacity');
    target.style.removeProperty('--obc-poi-label-visibility');
    this.requestPoiRender(target);
  }

  private suppressSourceTargetWhileProxied(target: Poi) {
    target.style.display = 'none';
    target.style.visibility = 'hidden';
    target.style.pointerEvents = 'none';
    target.style.opacity = '0';
    target.style.setProperty('--obc-poi-layer-inactive-opacity', '1');
    target.style.setProperty('--obc-poi-label-opacity', '0');
    target.style.setProperty('--obc-poi-label-visibility', 'hidden');
  }

  private syncTargetProxy(
    target: Poi,
    selectedLayer: ObcPoiLayer,
    record: {originLayer: ObcPoiLayer; targetViewportY: number}
  ) {
    if (record.originLayer === selectedLayer) {
      this.clearTargetProxy(target);
      return;
    }

    let proxy = this.sourceToProxy.get(target);
    if (!proxy) {
      proxy = this.createTargetProxy(target);
    }

    if (!proxy.isConnected || proxy.parentElement !== selectedLayer) {
      selectedLayer.appendChild(proxy);
    }

    this.syncProxyProps(target, proxy);
    proxy.selected = true;
    proxy.value = target.value;
    proxy.hasHeader = target.hasHeader ?? false;
    proxy.headerContent = target.headerContent ?? '';
    proxy.y =
      record.targetViewportY - selectedLayer.getBoundingClientRect().top;
    this.suppressSourceTargetWhileProxied(target);
    this.requestPoiRender(proxy);
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
    record?: {originLayer: ObcPoiLayer; targetViewportY: number},
    fallbackLayer?: ObcPoiLayer | null
  ) {
    this.setSelectedTargetInteractivity(target, false);
    this.clearTargetGroupingAttributes(target);
    const currentLayer = this.getTargetLayer(target);
    if (record) {
      if (record.originLayer !== currentLayer) {
        this.clearTargetSelectedId(target);
      } else {
        this.clearTargetSelectedId(target);
      }
      this.clearTargetProxy(target);
      this.selectionMap.delete(target);
      return;
    }
    if (fallbackLayer && fallbackLayer !== currentLayer) {
      this.clearTargetSelectedId(target);
      this.clearTargetProxy(target);
      return;
    }
    this.clearTargetProxy(target);
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
        this.clearTargetProxy(target);
        this.setSelectedTargetInteractivity(target, false);
        this.clearTargetSelectedId(target);
        this.selectionMap.delete(target);
      });
      return;
    }

    this.selectionMap.forEach((record, target) => {
      if (!target.isConnected) {
        this.clearTargetProxy(target);
        this.selectionMap.delete(target);
        return;
      }
      this.setTargetSelectedId(target);
      this.setSelectedTargetInteractivity(target, true);
      this.syncTargetProxy(target, selectedLayer, record);
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
