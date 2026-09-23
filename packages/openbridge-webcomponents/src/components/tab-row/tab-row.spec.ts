import {afterEach, describe, expect, it} from 'vitest';
import './tab-row.js';
import type {ObcTabRow, TabData} from './tab-row.js';
import type {ObcTabItem} from '../tab-item/tab-item.js';

const tabs: TabData[] = [
  {id: 'a', title: 'A'},
  {id: 'b', title: 'B'},
  {id: 'c', title: 'C'},
];

async function mount(data: TabData[], selectedTabId = data[0].id) {
  const row = document.createElement('obc-tab-row');
  row.tabs = data;
  row.selectedTabId = selectedTabId;
  document.body.appendChild(row);
  await row.updateComplete;
  return row;
}

function items(row: ObcTabRow): ObcTabItem[] {
  return Array.from(row.shadowRoot!.querySelectorAll('obc-tab-item'));
}

function tabIndexes(row: ObcTabRow): (string | null)[] {
  return items(row).map((item) =>
    item.shadowRoot!.querySelector('.wrapper')!.getAttribute('tabindex')
  );
}

async function pressKey(row: ObcTabRow, key: string) {
  row
    .shadowRoot!.querySelector('.wrapper')!
    .dispatchEvent(
      new KeyboardEvent('keydown', {key, bubbles: true, composed: true})
    );
  await row.updateComplete;
}

afterEach(() => {
  document.body.innerHTML = '';
});

describe('obc-tab-row', () => {
  it('gives the row a single tab stop, on the selected tab', async () => {
    const row = await mount(tabs, 'b');
    expect(tabIndexes(row)).toEqual(['-1', '0', '-1']);
  });

  it('moves the tab stop with Left/Right and wraps around', async () => {
    const row = await mount(tabs, 'a');
    await pressKey(row, 'ArrowRight');
    expect(tabIndexes(row)).toEqual(['-1', '0', '-1']);
    await pressKey(row, 'ArrowLeft');
    await pressKey(row, 'ArrowLeft');
    expect(tabIndexes(row)).toEqual(['-1', '-1', '0']);
  });

  it('jumps to the first and last tab with Home and End', async () => {
    const row = await mount(tabs, 'b');
    await pressKey(row, 'End');
    expect(tabIndexes(row)).toEqual(['-1', '-1', '0']);
    await pressKey(row, 'Home');
    expect(tabIndexes(row)).toEqual(['0', '-1', '-1']);
  });

  it('leaves the selection alone while focus moves', async () => {
    const row = await mount(tabs, 'a');
    await pressKey(row, 'ArrowRight');
    expect(row.selectedTabId).toBe('a');
  });

  it('selects the focused tab when automaticActivation is set', async () => {
    const row = await mount(tabs, 'a');
    row.automaticActivation = true;
    await row.updateComplete;
    await pressKey(row, 'ArrowRight');
    expect(row.selectedTabId).toBe('b');
  });

  it('skips disabled tabs', async () => {
    const row = await mount(
      [
        {id: 'a', title: 'A'},
        {id: 'b', title: 'B', disabled: true},
        {id: 'c', title: 'C'},
      ],
      'a'
    );
    await pressKey(row, 'ArrowRight');
    expect(tabIndexes(row)).toEqual(['-1', '-1', '0']);
  });

  it('exposes the selected state through aria-selected', async () => {
    const row = await mount(tabs, 'b');
    const selected = items(row).map((item) =>
      item.shadowRoot!.querySelector('.wrapper')!.getAttribute('aria-selected')
    );
    expect(selected).toEqual(['false', 'true', 'false']);
  });

  it('follows the selection when it changes from outside', async () => {
    const row = await mount(tabs, 'a');
    row.selectedTabId = 'c';
    await row.updateComplete;
    expect(tabIndexes(row)).toEqual(['-1', '-1', '0']);
  });

  it('re-points the tab stop when the tab it sat on is removed', async () => {
    const row = await mount(tabs, 'c');
    row.tabs = tabs.filter((tab) => tab.id !== 'c');
    row.selectedTabId = 'a';
    await row.updateComplete;
    expect(tabIndexes(row)).toEqual(['0', '-1']);
  });
});
