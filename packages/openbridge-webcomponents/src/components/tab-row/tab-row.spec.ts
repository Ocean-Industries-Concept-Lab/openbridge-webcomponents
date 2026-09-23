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
  row.hasClose = true;
  row.hasAddNewTab = true;
  document.body.appendChild(row);
  await row.updateComplete;
  return row;
}

function items(row: ObcTabRow): ObcTabItem[] {
  return Array.from(row.shadowRoot!.querySelectorAll('obc-tab-item'));
}

function wrapperOf(item: ObcTabItem): HTMLElement {
  return item.shadowRoot!.querySelector<HTMLElement>('.wrapper')!;
}

function tabIndexes(row: ObcTabRow): (string | null)[] {
  return items(row).map((item) => wrapperOf(item).getAttribute('tabindex'));
}

/** The id of the tab the keyboard focus currently sits on. */
function focusedTabId(row: ObcTabRow): string | undefined {
  const item = row.shadowRoot!.activeElement as ObcTabItem | null;
  return item?.dataset.tabId;
}

/** Focus the row the way Tab does: on whichever tab holds the tab stop. */
async function focusRow(row: ObcTabRow) {
  const stop = items(row).find((item) => wrapperOf(item).tabIndex === 0)!;
  stop.focus();
  await row.updateComplete;
}

/** Send a key from the focused element, as a real keypress arrives. */
async function pressKey(row: ObcTabRow, key: string) {
  const target = (row.shadowRoot!.activeElement ??
    row.shadowRoot!.querySelector('.wrapper')!) as Element;
  const inner = (target as ObcTabItem).shadowRoot?.activeElement ?? target;
  inner.dispatchEvent(
    new KeyboardEvent('keydown', {key, bubbles: true, composed: true})
  );
  await row.updateComplete;
  await new Promise((resolve) => requestAnimationFrame(resolve));
}

afterEach(() => {
  document.body.innerHTML = '';
});

describe('obc-tab-row', () => {
  it('gives the row a single tab stop, on the selected tab', async () => {
    const row = await mount(tabs, 'b');
    expect(tabIndexes(row)).toEqual(['-1', '0', '-1']);
  });

  it('moves focus and the tab stop with Left/Right, wrapping around', async () => {
    const row = await mount(tabs, 'a');
    await focusRow(row);
    expect(focusedTabId(row)).toBe('a');

    await pressKey(row, 'ArrowRight');
    expect(focusedTabId(row)).toBe('b');
    expect(tabIndexes(row)).toEqual(['-1', '0', '-1']);

    await pressKey(row, 'ArrowLeft');
    await pressKey(row, 'ArrowLeft');
    expect(focusedTabId(row)).toBe('c');
    expect(tabIndexes(row)).toEqual(['-1', '-1', '0']);
  });

  it('jumps to the first and last tab with Home and End', async () => {
    const row = await mount(tabs, 'b');
    await focusRow(row);
    await pressKey(row, 'End');
    expect(focusedTabId(row)).toBe('c');
    await pressKey(row, 'Home');
    expect(focusedTabId(row)).toBe('a');
  });

  it('leaves the selection alone while focus moves', async () => {
    const row = await mount(tabs, 'a');
    await focusRow(row);
    await pressKey(row, 'ArrowRight');
    expect(row.selectedTabId).toBe('a');
  });

  it('selects the focused tab on Enter and on Space', async () => {
    const row = await mount(tabs, 'a');
    await focusRow(row);
    await pressKey(row, 'ArrowRight');
    await pressKey(row, 'Enter');
    expect(row.selectedTabId).toBe('b');

    await pressKey(row, 'ArrowRight');
    await pressKey(row, ' ');
    expect(row.selectedTabId).toBe('c');
  });

  it('selects the focused tab when automaticActivation is set', async () => {
    const row = await mount(tabs, 'a');
    row.automaticActivation = true;
    await row.updateComplete;
    await focusRow(row);
    await pressKey(row, 'ArrowRight');
    expect(row.selectedTabId).toBe('b');
    expect(focusedTabId(row)).toBe('b');
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
    await focusRow(row);
    await pressKey(row, 'ArrowRight');
    expect(focusedTabId(row)).toBe('c');
  });

  it('exposes the selected state through aria-selected', async () => {
    const row = await mount(tabs, 'b');
    const selected = items(row).map((item) =>
      wrapperOf(item).getAttribute('aria-selected')
    );
    expect(selected).toEqual(['false', 'true', 'false']);
  });

  it('follows the selection when it changes from outside', async () => {
    const row = await mount(tabs, 'a');
    row.selectedTabId = 'c';
    await row.updateComplete;
    expect(tabIndexes(row)).toEqual(['-1', '-1', '0']);
  });

  it('puts the tab stop back on the selected tab when focus leaves', async () => {
    const row = await mount(tabs, 'a');
    await focusRow(row);
    await pressKey(row, 'End');
    expect(tabIndexes(row)).toEqual(['-1', '-1', '0']);

    (row.shadowRoot!.activeElement as ObcTabItem).dispatchEvent(
      new FocusEvent('focusout', {bubbles: true, relatedTarget: document.body})
    );
    await row.updateComplete;
    expect(tabIndexes(row)).toEqual(['0', '-1', '-1']);
  });

  it('ignores navigation keys from the add-new-tab button', async () => {
    const row = await mount(tabs, 'a');
    const addButton = row.shadowRoot!.querySelector('.add-new-tab')!;
    addButton.dispatchEvent(
      new KeyboardEvent('keydown', {
        key: 'ArrowRight',
        bubbles: true,
        composed: true,
      })
    );
    await row.updateComplete;
    expect(tabIndexes(row)).toEqual(['0', '-1', '-1']);
  });

  it('re-points the tab stop when the tab it sat on is removed', async () => {
    const row = await mount(tabs, 'c');
    row.tabs = tabs.filter((tab) => tab.id !== 'c');
    row.selectedTabId = 'a';
    await row.updateComplete;
    expect(tabIndexes(row)).toEqual(['0', '-1']);
  });

  it('keeps focus in the row when the focused tab is closed', async () => {
    const row = await mount(tabs, 'b');
    await focusRow(row);
    expect(focusedTabId(row)).toBe('b');

    wrapperOf(items(row)[1])
      .querySelector<HTMLElement>('obc-icon-button')!
      .click();
    await row.updateComplete;
    await new Promise((resolve) => requestAnimationFrame(resolve));

    expect(row.tabs.map((tab) => tab.id)).toEqual(['a', 'c']);
    expect(focusedTabId(row)).toBe(row.selectedTabId);
  });
});
