import {afterEach, describe, expect, it} from 'vitest';
import './checkbox-item.js';
import type {ObcCheckboxItem} from './checkbox-item.js';

async function mount(setup: (el: ObcCheckboxItem) => void = () => {}) {
  const el = document.createElement('obc-checkbox-item');
  el.label = 'Label';
  setup(el);
  document.body.appendChild(el);
  await el.updateComplete;
  return el;
}

const sr = (el: ObcCheckboxItem) => el.shadowRoot!;

afterEach(() => {
  document.body.innerHTML = '';
});

describe('obc-checkbox-item level', () => {
  it('level 0 renders neither chevron slot nor spacer', async () => {
    const el = await mount();
    expect(sr(el).querySelector('.chevron-container')).toBeNull();
    expect(sr(el).querySelector('.nested-spacer')).toBeNull();
  });

  it('level 1 reserves the chevron slot without a button', async () => {
    const el = await mount((e) => (e.level = 1));
    expect(sr(el).querySelector('.chevron-container')).not.toBeNull();
    expect(sr(el).querySelector('.chevron-button')).toBeNull();
    expect(sr(el).querySelector('.nested-spacer')).toBeNull();
  });

  it('level 3 exposes depth 2 to CSS through the spacer', async () => {
    const el = await mount((e) => (e.level = 3));
    const spacer = sr(el).querySelector<HTMLElement>('.nested-spacer')!;
    expect(spacer.style.getPropertyValue('--checkbox-item-depth')).toBe('2');
  });

  it('reflects level, expandable and expanded as attributes', async () => {
    const el = await mount((e) => {
      e.level = 2;
      e.expandable = true;
      e.expanded = true;
    });
    expect(el.getAttribute('level')).toBe('2');
    expect(el.hasAttribute('expandable')).toBe(true);
    expect(el.hasAttribute('expanded')).toBe(true);
  });
});

describe('obc-checkbox-item expandable', () => {
  it('renders a chevron button with aria-expanded', async () => {
    const el = await mount((e) => {
      e.level = 1;
      e.expandable = true;
    });
    const btn = sr(el).querySelector<HTMLButtonElement>('.chevron-button')!;
    expect(btn).not.toBeNull();
    expect(btn.getAttribute('aria-expanded')).toBe('false');
    expect(sr(el).querySelector('obi-chevron-right-google')).not.toBeNull();
    el.expanded = true;
    await el.updateComplete;
    expect(btn.getAttribute('aria-expanded')).toBe('true');
    expect(sr(el).querySelector('obi-chevron-down-google')).not.toBeNull();
  });

  it('expandable at level 0 still renders the chevron slot', async () => {
    const el = await mount((e) => (e.expandable = true));
    expect(sr(el).querySelector('.chevron-button')).not.toBeNull();
  });

  it('chevron click fires expand-toggle with the next value and no change', async () => {
    const el = await mount((e) => {
      e.level = 1;
      e.expandable = true;
    });
    const toggles: boolean[] = [];
    let changes = 0;
    el.addEventListener('expand-toggle', (e) =>
      toggles.push((e as CustomEvent<boolean>).detail)
    );
    el.addEventListener('change', () => changes++);
    sr(el).querySelector<HTMLButtonElement>('.chevron-button')!.click();
    expect(toggles).toEqual([true]);
    expect(changes).toBe(0);
    expect(el.expanded).toBe(false);
    expect(el.status).toBe('unchecked');
  });

  it('row click still toggles the checkbox', async () => {
    const el = await mount((e) => {
      e.level = 1;
      e.expandable = true;
    });
    let changes = 0;
    el.addEventListener('change', () => changes++);
    sr(el).querySelector<HTMLElement>('.checkbox-label')!.click();
    expect(changes).toBe(1);
    expect(el.status).toBe('checked');
  });
});

describe('obc-checkbox-item description', () => {
  it('renders the description only when non-empty', async () => {
    const el = await mount();
    expect(sr(el).querySelector('.checkbox-description')).toBeNull();
    el.description = 'More detail';
    await el.updateComplete;
    expect(sr(el).querySelector('.checkbox-description')!.textContent).toBe(
      'More detail'
    );
  });
});
