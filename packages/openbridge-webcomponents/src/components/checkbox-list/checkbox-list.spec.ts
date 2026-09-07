import {afterEach, describe, expect, it} from 'vitest';
import './checkbox-list.js';
import '../checkbox-item/checkbox-item.js';
import type {ObcCheckboxItem} from '../checkbox-item/checkbox-item.js';
import {ObcCheckboxItemHoverStyle} from '../checkbox-item/checkbox-item.js';

const nextTick = () => new Promise((resolve) => setTimeout(resolve, 0));

function item(level: number, expandable = false, expanded = false) {
  const el = document.createElement('obc-checkbox-item');
  el.label = `Level ${level}`;
  el.level = level;
  el.expandable = expandable;
  el.expanded = expanded;
  return el;
}

async function mount(items: ObcCheckboxItem[]) {
  const list = document.createElement('obc-checkbox-list');
  items.forEach((i) => list.appendChild(i));
  document.body.appendChild(list);
  await list.updateComplete;
  await nextTick();
  return list;
}

afterEach(() => {
  document.body.innerHTML = '';
});

describe('obc-checkbox-list', () => {
  it('hides rows under a collapsed parent', async () => {
    const rows = [item(1, true, false), item(2), item(1)];
    await mount(rows);
    expect(rows.map((r) => r.hidden)).toEqual([false, true, false]);
  });

  it('applies expand-toggle to the item and recomputes', async () => {
    const rows = [item(1, true, false), item(2)];
    await mount(rows);
    rows[0]
      .shadowRoot!.querySelector<HTMLButtonElement>('.chevron-button')!
      .click();
    await rows[0].updateComplete;
    await nextTick();
    expect(rows[0].expanded).toBe(true);
    expect(rows[1].hidden).toBe(false);
  });

  it('recomputes when expanded is changed from outside', async () => {
    const rows = [item(1, true, true), item(2)];
    await mount(rows);
    rows[0].expanded = false;
    await rows[0].updateComplete;
    await nextTick();
    expect(rows[1].hidden).toBe(true);
  });

  it('forwards hoverStyle to every item, including late ones', async () => {
    const rows = [item(0), item(0)];
    const list = await mount(rows);
    list.hoverStyle = ObcCheckboxItemHoverStyle.visualTarget;
    await list.updateComplete;
    expect(rows.map((r) => r.hoverStyle)).toEqual([
      'visual-target',
      'visual-target',
    ]);
    const late = item(0);
    list.appendChild(late);
    await nextTick();
    expect(late.hoverStyle).toBe('visual-target');
  });

  it('renders a group role', async () => {
    const list = await mount([]);
    expect(list.shadowRoot!.querySelector('[role="group"]')).not.toBeNull();
  });
});
