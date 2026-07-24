import {afterEach, describe, expect, it} from 'vitest';
import './poi.js';
import './poi-data.js';
import '../building-blocks/poi-header/poi-header.js';
import type {ObcPoi} from './poi.js';
import type {ObcPoiData} from './poi-data.js';

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
