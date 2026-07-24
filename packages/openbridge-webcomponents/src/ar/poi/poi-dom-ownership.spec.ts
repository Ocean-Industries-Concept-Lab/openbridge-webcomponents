import {afterEach, describe, expect, it} from 'vitest';
import './poi.js';
import './poi-data.js';
import '../poi-layer/poi-layer.js';
import '../poi-layer-stack/poi-layer-stack.js';
import '../building-blocks/poi-header/poi-header.js';
import type {ObcPoi} from './poi.js';
import type {ObcPoiData} from './poi-data.js';
import type {ObcPoiLayer} from '../poi-layer/poi-layer.js';
import type {ObcPoiLayerStack} from '../poi-layer-stack/poi-layer-stack.js';

/**
 * DOM-ownership contract: POI components must never move, create, or remove
 * nodes in the consumer's light DOM. These tests pin the header slot
 * forwarding chain (and, via the layer/stack specs, grouping and selection)
 * to slot assignment instead of physical re-parenting.
 */

const nextFrame = () =>
  new Promise<void>((resolve) => requestAnimationFrame(() => resolve()));

async function settle(...elements: Array<{updateComplete: Promise<unknown>}>) {
  for (const el of elements) {
    await el.updateComplete;
  }
  await nextFrame();
  await nextFrame();
  for (const el of elements) {
    await el.updateComplete;
  }
}

function mount(html: string): HTMLElement {
  const host = document.createElement('div');
  host.innerHTML = html;
  document.body.appendChild(host);
  return host;
}

afterEach(() => {
  document.body.innerHTML = '';
});

describe('obc-poi header ownership', () => {
  it('keeps a slotted header in the consumer light DOM', async () => {
    const host = mount(`
      <obc-poi has-header>
        <obc-poi-header slot="header" content="1" state="selected"></obc-poi-header>
        <span>icon</span>
      </obc-poi>
    `);
    const poi = host.querySelector('obc-poi') as ObcPoi;
    const header = host.querySelector('obc-poi-header') as HTMLElement;
    await settle(poi);

    expect(header.parentElement).toBe(poi);
    expect(header.assignedSlot).not.toBeNull();
  });

  it('renders the header through the slot chain into the button shadow', async () => {
    const host = mount(`
      <obc-poi has-header>
        <obc-poi-header slot="header" content="1" state="selected"></obc-poi-header>
      </obc-poi>
    `);
    const poi = host.querySelector('obc-poi') as ObcPoi;
    const header = host.querySelector('obc-poi-header') as HTMLElement;
    await settle(poi);

    const button = poi.shadowRoot?.querySelector('obc-poi-button');
    expect(button).not.toBeNull();
    const headerSlot = button?.shadowRoot?.querySelector(
      'slot[name="header"]'
    ) as HTMLSlotElement | null;
    expect(headerSlot).not.toBeNull();
    const flattened = headerSlot?.assignedElements({flatten: true}) ?? [];
    expect(flattened).toContain(header);
  });

  it('syncs header state from the button without moving the node', async () => {
    const host = mount(`
      <obc-poi has-header>
        <obc-poi-header slot="header" content="1"></obc-poi-header>
      </obc-poi>
    `);
    const poi = host.querySelector('obc-poi') as ObcPoi;
    const header = host.querySelector('obc-poi-header') as HTMLElement;
    await settle(poi);

    expect(header.getAttribute('state')).toBe('selected');
    expect(header.parentElement).toBe(poi);
  });
});

describe('obc-poi-data header ownership', () => {
  it('keeps a slotted header in the consumer light DOM and renders it', async () => {
    const host = mount(`
      <obc-poi-data x="100" y="96">
        <obc-poi-header slot="header" content="7"></obc-poi-header>
      </obc-poi-data>
    `);
    const target = host.querySelector('obc-poi-data') as ObcPoiData;
    const header = host.querySelector('obc-poi-header') as HTMLElement;
    await settle(target);

    expect(header.parentElement).toBe(target);
    expect(target.hasHeader).toBe(true);

    const innerButton = target.shadowRoot?.querySelector(
      'obc-poi-button-data'
    ) as HTMLElement | null;
    expect(innerButton).not.toBeNull();
    const headerSlot = innerButton?.shadowRoot?.querySelector(
      'slot[name="header"]'
    ) as HTMLSlotElement | null;
    expect(headerSlot).not.toBeNull();
    const flattened = headerSlot?.assignedElements({flatten: true}) ?? [];
    expect(flattened).toContain(header);
  });

  it('selection never re-parents targets between layers', async () => {
    const host = mount(`
      <obc-poi-layer-stack selection-mode="single" style="width: 640px">
        <obc-poi-layer id="sel" is-selected style="--obc-poi-layer-min-height: 96px"></obc-poi-layer>
        <obc-poi-layer id="vessels" style="--obc-poi-layer-min-height: 96px">
          <obc-poi-data id="v1" x="120" y="90"></obc-poi-data>
          <obc-poi-data id="v2" x="320" y="110"></obc-poi-data>
        </obc-poi-layer>
      </obc-poi-layer-stack>
    `);
    const stack = host.querySelector('obc-poi-layer-stack') as ObcPoiLayerStack;
    const vesselsLayer = host.querySelector('#vessels') as HTMLElement;
    const v1 = host.querySelector('#v1') as ObcPoiData;
    await settle(stack, v1);
    await new Promise((r) => setTimeout(r, 250));

    const selected = stack.selectTarget(v1, {selectionId: '3'});
    expect(selected).toBe(true);
    await new Promise((r) => setTimeout(r, 400));

    expect(v1.parentElement).toBe(vesselsLayer);
    expect(v1.hasAttribute('data-stack-selected')).toBe(true);
    expect(v1.style.getPropertyValue('--obc-poi-button-projection-y')).not.toBe(
      ''
    );
    expect(stack.selectedTargets).toContain(v1);

    const deselected = stack.deselectTarget(v1);
    expect(deselected).toBe(true);
    await new Promise((r) => setTimeout(r, 400));

    expect(v1.parentElement).toBe(vesselsLayer);
    expect(v1.hasAttribute('data-stack-selected')).toBe(false);
    expect(v1.style.getPropertyValue('--obc-poi-button-projection-y')).toBe('');
    expect(stack.selectedTargets).not.toContain(v1);
  });

  it('bootstrap targets authored in the selected layer stay there', async () => {
    const host = mount(`
      <obc-poi-layer-stack selection-mode="single" style="width: 640px">
        <obc-poi-layer id="sel" is-selected style="--obc-poi-layer-min-height: 96px">
          <obc-poi-data id="seeded" x="220" y="90"></obc-poi-data>
        </obc-poi-layer>
        <obc-poi-layer id="others" style="--obc-poi-layer-min-height: 96px">
          <obc-poi-data x="120" y="110"></obc-poi-data>
        </obc-poi-layer>
      </obc-poi-layer-stack>
    `);
    const stack = host.querySelector('obc-poi-layer-stack') as ObcPoiLayerStack;
    const selLayer = host.querySelector('#sel') as HTMLElement;
    const seeded = host.querySelector('#seeded') as ObcPoiData;
    await settle(stack, seeded);
    await new Promise((r) => setTimeout(r, 400));

    expect(stack.selectedTargets).toContain(seeded);
    expect(seeded.parentElement).toBe(selLayer);

    stack.deselectTarget(seeded);
    await new Promise((r) => setTimeout(r, 400));
    expect(seeded.parentElement).toBe(selLayer);
    expect(stack.selectedTargets).not.toContain(seeded);
  });

  it('auto-grouping never touches consumer light DOM', async () => {
    const host = mount(`
      <obc-poi-layer style="width: 640px; --obc-poi-layer-min-height: 96px">
        <obc-poi-data id="g1" x="100" y="90"></obc-poi-data>
        <obc-poi-data id="g2" x="104" y="110"></obc-poi-data>
        <obc-poi-data id="solo" x="440" y="100"></obc-poi-data>
      </obc-poi-layer>
    `);
    const layer = host.querySelector('obc-poi-layer') as ObcPoiLayer;
    const g1 = host.querySelector('#g1') as ObcPoiData;
    const g2 = host.querySelector('#g2') as ObcPoiData;
    await settle(layer, g1, g2);
    await new Promise((r) => setTimeout(r, 400));

    // Light DOM untouched: targets remain direct children of the layer and
    // no group element is injected next to them.
    expect(g1.parentElement).toBe(layer);
    expect(g2.parentElement).toBe(layer);
    expect(layer.querySelector('obc-poi-group')).toBeNull();

    // The auto group is shadow chrome; members are slot-assigned into it.
    const shadowGroup = layer.shadowRoot?.querySelector(
      'obc-poi-group[data-auto-group]'
    );
    expect(shadowGroup).not.toBeNull();
    expect(g1.assignedSlot?.parentElement).toBe(shadowGroup);
    expect(g2.assignedSlot?.parentElement).toBe(shadowGroup);
    expect(g1.hasAttribute('data-grouped')).toBe(true);

    // Separating the targets disbands the group, again without any light
    // DOM mutation.
    g2.x = 560;
    await new Promise((r) => setTimeout(r, 900));
    expect(g1.parentElement).toBe(layer);
    expect(g2.parentElement).toBe(layer);
    expect(layer.querySelector('obc-poi-group')).toBeNull();
    expect(
      layer.shadowRoot?.querySelector('obc-poi-group[data-auto-group]')
    ).toBeNull();
    expect(g1.hasAttribute('data-grouped')).toBe(false);
    expect(g2.hasAttribute('data-grouped')).toBe(false);
  });

  it('framework re-renders can replace and reorder grouped targets', async () => {
    const host = mount(`
      <obc-poi-layer style="width: 640px; --obc-poi-layer-min-height: 96px">
        <obc-poi-data id="g1" x="100" y="90"></obc-poi-data>
        <obc-poi-data id="g2" x="104" y="110"></obc-poi-data>
        <obc-poi-data id="solo" x="440" y="100"></obc-poi-data>
      </obc-poi-layer>
    `);
    const layer = host.querySelector('obc-poi-layer') as ObcPoiLayer;
    const g1 = host.querySelector('#g1') as ObcPoiData;
    const g2 = host.querySelector('#g2') as ObcPoiData;
    const solo = host.querySelector('#solo') as ObcPoiData;
    await settle(layer, g1, g2);
    await new Promise((r) => setTimeout(r, 400));
    expect(g1.hasAttribute('data-grouped')).toBe(true);

    // Reconciliation-style reorder of an ungrouped sibling.
    layer.insertBefore(solo, g1);
    // Replace a grouped member with a fresh node, as a keyed re-render does.
    const replacement = document.createElement('obc-poi-data') as ObcPoiData;
    replacement.setAttribute('x', '104');
    replacement.setAttribute('y', '110');
    layer.replaceChild(replacement, g2);
    await new Promise((r) => setTimeout(r, 900));

    expect(replacement.parentElement).toBe(layer);
    expect(g2.isConnected).toBe(false);
    const shadowGroup = layer.shadowRoot?.querySelector(
      'obc-poi-group[data-auto-group][data-visible]'
    );
    expect(shadowGroup).not.toBeNull();
    expect(g1.assignedSlot?.parentElement).toBe(shadowGroup);
    expect(replacement.assignedSlot?.parentElement).toBe(shadowGroup);
    expect(layer.querySelector('obc-poi-group')).toBeNull();
  });

  it('framework re-renders can replace the header node without breakage', async () => {
    const host = mount(`
      <obc-poi-data x="100" y="96">
        <obc-poi-header slot="header" content="7"></obc-poi-header>
      </obc-poi-data>
    `);
    const target = host.querySelector('obc-poi-data') as ObcPoiData;
    const oldHeader = host.querySelector('obc-poi-header') as HTMLElement;
    await settle(target);

    // Simulate a declarative renderer swapping the node it owns.
    const newHeader = document.createElement('obc-poi-header');
    newHeader.setAttribute('slot', 'header');
    newHeader.setAttribute('content', '8');
    target.replaceChild(newHeader, oldHeader);
    await settle(target);

    expect(newHeader.parentElement).toBe(target);
    expect(oldHeader.parentElement).toBeNull();

    const innerButton = target.shadowRoot?.querySelector(
      'obc-poi-button-data'
    ) as HTMLElement | null;
    const headerSlot = innerButton?.shadowRoot?.querySelector(
      'slot[name="header"]'
    ) as HTMLSlotElement | null;
    const flattened = headerSlot?.assignedElements({flatten: true}) ?? [];
    expect(flattened).toContain(newHeader);
  });
});
