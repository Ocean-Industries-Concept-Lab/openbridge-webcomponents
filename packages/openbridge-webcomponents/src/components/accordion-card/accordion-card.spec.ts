import {afterEach, describe, expect, it} from 'vitest';
import './accordion-card.js';
import type {ObcAccordionCard} from './accordion-card.js';

async function mount(setup: (el: ObcAccordionCard) => void = () => {}) {
  const el = document.createElement('obc-accordion-card');
  el.cardTitle = 'Title';
  const content = document.createElement('div');
  content.slot = 'expanded-content';
  content.innerHTML = '<button id="inner">Inner</button>';
  el.appendChild(content);
  setup(el);
  document.body.appendChild(el);
  await el.updateComplete;
  return el;
}

const sr = (el: ObcAccordionCard) => el.shadowRoot!;
const panel = (el: ObcAccordionCard) =>
  sr(el).querySelector<HTMLElement>('.panel')!;

afterEach(() => {
  document.body.innerHTML = '';
});

describe('obc-accordion-card expand animation', () => {
  it('keeps the panel rendered while collapsed', async () => {
    const el = await mount();
    expect(panel(el)).not.toBeNull();
    expect(
      panel(el).querySelector('slot[name="expanded-content"]')
    ).not.toBeNull();
  });

  it('collapses the panel to a zero-height grid track', async () => {
    const el = await mount();
    expect(getComputedStyle(panel(el)).gridTemplateRows).toBe('0px');
  });

  it('sizes the track to the content when open', async () => {
    const el = await mount((e) => (e.expanded = true));
    expect(getComputedStyle(panel(el)).gridTemplateRows).not.toBe('0px');
  });

  it('hides the collapsed panel from the tab order', async () => {
    const el = await mount();
    expect(getComputedStyle(panel(el)).visibility).toBe('hidden');
    const inner = el.querySelector<HTMLButtonElement>('#inner')!;
    inner.focus();
    expect(document.activeElement).not.toBe(inner);
  });

  it('reveals the panel when expanded', async () => {
    const el = await mount((e) => (e.expanded = true));
    expect(getComputedStyle(panel(el)).visibility).toBe('visible');
    const inner = el.querySelector<HTMLButtonElement>('#inner')!;
    inner.focus();
    expect(document.activeElement).toBe(inner);
  });

  it('points aria-controls at the panel', async () => {
    const el = await mount();
    const button = sr(el).querySelector<HTMLButtonElement>('.content-button')!;
    expect(button.getAttribute('aria-controls')).toBe(panel(el).id);
    expect(panel(el).id).not.toBe('');
  });

  it('rotates one chevron instead of swapping two', async () => {
    const el = await mount();
    expect(sr(el).querySelectorAll('obi-chevron-down-google')).toHaveLength(1);
    expect(sr(el).querySelector('obi-chevron-up-google')).toBeNull();
    el.expanded = true;
    await el.updateComplete;
    expect(sr(el).querySelectorAll('obi-chevron-down-google')).toHaveLength(1);
    expect(sr(el).querySelector('obi-chevron-up-google')).toBeNull();
  });

  it('still toggles and fires accordion-toggle', async () => {
    const el = await mount();
    const seen: boolean[] = [];
    el.addEventListener('accordion-toggle', (e) =>
      seen.push((e as CustomEvent<{expanded: boolean}>).detail.expanded)
    );
    sr(el).querySelector<HTMLButtonElement>('.content-button')!.click();
    expect(el.expanded).toBe(true);
    expect(seen).toEqual([true]);
  });
});
