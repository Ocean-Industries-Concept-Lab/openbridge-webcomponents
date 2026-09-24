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

const frame = () => new Promise((r) => requestAnimationFrame(() => r(null)));

/**
 * Whether the panel transitions at all. Under `prefers-reduced-motion: reduce`
 * the track snaps, so there is no mid-slide moment to observe — the focus half
 * of that test still has to hold in both modes.
 */
const animates = () =>
  !window.matchMedia('(prefers-reduced-motion: reduce)').matches;

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
    expect(panel(el).hasAttribute('inert')).toBe(true);
    const inner = el.querySelector<HTMLButtonElement>('#inner')!;
    inner.focus();
    expect(document.activeElement).not.toBe(inner);
  });

  it('drops keyboard access as soon as it starts closing', async () => {
    const el = await mount((e) => (e.expanded = true));
    await frame();
    await frame();
    const inner = el.querySelector<HTMLButtonElement>('#inner')!;

    el.expanded = false;
    await el.updateComplete;
    await frame();

    if (animates()) {
      expect(getComputedStyle(panel(el)).gridTemplateRows).not.toBe('0px');
    }
    inner.focus();
    expect(document.activeElement).not.toBe(inner);
  });

  it('reveals the panel when expanded', async () => {
    const el = await mount((e) => (e.expanded = true));
    expect(panel(el).hasAttribute('inert')).toBe(false);
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

  it('returns focus to the header when it closes with focus inside', async () => {
    const el = await mount((e) => (e.expanded = true));
    const inner = el.querySelector<HTMLButtonElement>('#inner')!;
    inner.focus();
    expect(document.activeElement).toBe(inner);

    el.expanded = false;
    await el.updateComplete;
    await frame();
    await frame();

    const header = sr(el).querySelector<HTMLButtonElement>('.content-button')!;
    expect(sr(el).activeElement).toBe(header);
    expect(document.activeElement).not.toBe(document.body);
  });

  it('leaves focus alone when it closes from the header', async () => {
    const el = await mount((e) => (e.expanded = true));
    const header = sr(el).querySelector<HTMLButtonElement>('.content-button')!;
    header.focus();

    header.click();
    await el.updateComplete;
    await frame();
    await frame();

    expect(sr(el).activeElement).toBe(header);
  });

  it('falls back to the wrapper when the header is disabled', async () => {
    const el = await mount((e) => {
      e.expanded = true;
      e.disabled = true;
    });
    const inner = el.querySelector<HTMLButtonElement>('#inner')!;
    inner.focus();
    expect(document.activeElement).toBe(inner);

    el.expanded = false;
    await el.updateComplete;
    await frame();
    await frame();

    // The disabled header cannot take focus, so the wrapper holds the place
    // rather than letting it fall to <body>.
    expect(sr(el).activeElement).toBe(sr(el).querySelector('.wrapper'));
    expect(document.activeElement).not.toBe(document.body);
  });

  it('keeps the wrapper out of the tab order', async () => {
    const el = await mount();
    expect(sr(el).querySelector('.wrapper')!.getAttribute('tabindex')).toBe(
      '-1'
    );
  });
});
