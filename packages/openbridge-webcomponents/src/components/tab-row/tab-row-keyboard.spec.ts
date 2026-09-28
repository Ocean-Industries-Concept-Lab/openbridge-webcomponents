import {describe, expect, it} from 'vitest';
import {render} from 'vitest-browser-lit';
import {userEvent} from '@vitest/browser/context';
import {html} from 'lit';
import '../../main.css';
import './tab-row.js';
import type {ObcTabRow, TabData} from './tab-row.js';
import {containsDeep, deepActiveElement} from '../../internal/_test-utils.js';

/**
 * APG Tabs pattern with manual activation:
 * https://www.w3.org/WAI/ARIA/apg/patterns/tabs/ — one tab stop, arrows move
 * focus only, Enter or Space selects.
 */
const tabs: TabData[] = [
  {id: 'one', title: 'One'},
  {id: 'two', title: 'Two'},
  {id: 'three', title: 'Three', disabled: true},
  {id: 'four', title: 'Four'},
];

/** Tabs a user can close, none disabled. */
const closable: TabData[] = [
  {id: 'a', title: 'A'},
  {id: 'b', title: 'B'},
  {id: 'c', title: 'C'},
];

async function setup(
  selectedTabId = 'two',
  hasAddNewTab = false,
  {hasClose = false, data = tabs}: {hasClose?: boolean; data?: TabData[]} = {}
) {
  const selected: string[] = [];
  const closed: string[] = [];
  const screen = render(
    html`<button id="before">before</button>
      <obc-tab-row
        .tabs=${[...data]}
        .selectedTabId=${selectedTabId}
        .hasAddNewTab=${hasAddNewTab}
        .hasClose=${hasClose}
        @tab-selected=${(event: CustomEvent<{id: string}>) =>
          selected.push(event.detail.id)}
        @tab-closed=${(event: CustomEvent<{id: string}>) =>
          closed.push(event.detail.id)}
      ></obc-tab-row>
      <button id="after">after</button>`
  );
  const el = screen.container.querySelector('obc-tab-row') as ObcTabRow;
  await settle(el);
  return {el, selected, closed};
}

/** Waits for the row, its tabs and their close buttons to render. */
async function settle(el: ObcTabRow) {
  await el.updateComplete;
  const pending = (root: ParentNode) =>
    Array.from(
      root.querySelectorAll('obc-tab-item, obc-icon-button'),
      (child) =>
        (child as unknown as {updateComplete: Promise<unknown>}).updateComplete
    );
  await Promise.all(pending(el.shadowRoot!));
  await Promise.all(
    Array.from(el.shadowRoot!.querySelectorAll('obc-tab-item'), (item) =>
      Promise.all(pending(item.shadowRoot!))
    )
  );
}

/** The native button inside a tab's close control. */
function closeButtonOf(item: HTMLElement): HTMLButtonElement {
  const control = item.shadowRoot!.querySelector('.close-button')!;
  return control.shadowRoot!.querySelector('button')!;
}

function items(el: ObcTabRow): HTMLElement[] {
  return Array.from(el.shadowRoot!.querySelectorAll('obc-tab-item'));
}

/** Title of the tab whose control holds focus. */
function focusedTab(el: ObcTabRow): string | undefined {
  return items(el).find((item) => containsDeep(item, deepActiveElement()))
    ?.title;
}

describe('obc-tab-row keyboard', () => {
  it('is one tab stop, entered on the selected tab and left on the next Tab', async () => {
    const {el} = await setup();
    (document.getElementById('before') as HTMLElement).focus();

    await userEvent.tab();
    expect(focusedTab(el)).toBe('Two');
    await userEvent.tab();
    expect(deepActiveElement()?.id).toBe('after');
  });

  it('moves focus with ArrowRight and ArrowLeft, skipping a disabled tab, without selecting', async () => {
    const {el, selected} = await setup();
    (document.getElementById('before') as HTMLElement).focus();
    await userEvent.tab();

    await userEvent.keyboard('{ArrowRight}');
    expect(focusedTab(el)).toBe('Four');
    await userEvent.keyboard('{ArrowLeft}');
    expect(focusedTab(el)).toBe('Two');

    expect(selected).toEqual([]);
    expect(el.selectedTabId).toBe('two');
  });

  it('wraps from the last tab to the first', async () => {
    const {el} = await setup('four');
    (document.getElementById('before') as HTMLElement).focus();
    await userEvent.tab();

    await userEvent.keyboard('{ArrowRight}');

    expect(focusedTab(el)).toBe('One');
  });

  it('moves to the first and last tab on Home and End', async () => {
    const {el} = await setup();
    (document.getElementById('before') as HTMLElement).focus();
    await userEvent.tab();

    await userEvent.keyboard('{End}');
    expect(focusedTab(el)).toBe('Four');
    await userEvent.keyboard('{Home}');
    expect(focusedTab(el)).toBe('One');
  });

  it('selects the focused tab on Enter and on Space', async () => {
    const {el, selected} = await setup();
    (document.getElementById('before') as HTMLElement).focus();
    await userEvent.tab();

    await userEvent.keyboard('{ArrowLeft}');
    await userEvent.keyboard('{Enter}');
    expect(el.selectedTabId).toBe('one');
    await userEvent.keyboard('{ArrowRight}');
    await userEvent.keyboard(' ');
    expect(el.selectedTabId).toBe('two');

    expect(selected).toEqual(['one', 'two']);
  });

  it('exposes selection and disabled state on the tabs', async () => {
    const {el} = await setup();

    const tabRoles = items(el).map((item) =>
      item.shadowRoot!.querySelector('[role="tab"]')
    );
    expect(tabRoles.map((tab) => tab?.getAttribute('aria-selected'))).toEqual([
      'false',
      'true',
      'false',
      'false',
    ]);
    expect(tabRoles[2]?.getAttribute('aria-disabled')).toBe('true');
  });

  it('keeps the add-new-tab button as its own tab stop after the tabs', async () => {
    const {el} = await setup('two', true);
    (document.getElementById('before') as HTMLElement).focus();

    await userEvent.tab();
    expect(focusedTab(el)).toBe('Two');
    await userEvent.tab();
    expect(
      containsDeep(
        el.shadowRoot!.querySelector('.add-new-tab') as HTMLElement,
        deepActiveElement()
      )
    ).toBe(true);
  });
  it('stays one tab stop when the tabs have close buttons', async () => {
    const {el} = await setup('two', false, {hasClose: true});
    (document.getElementById('before') as HTMLElement).focus();

    await userEvent.tab();
    expect(focusedTab(el)).toBe('Two');
    await userEvent.tab();
    expect(deepActiveElement()?.id).toBe('after');
  });

  it('closes the focused tab on Delete and focuses the one after it', async () => {
    const {el, closed} = await setup('b', false, {
      hasClose: true,
      data: closable,
    });
    (document.getElementById('before') as HTMLElement).focus();
    await userEvent.tab();

    await userEvent.keyboard('{Delete}');
    await settle(el);
    expect(closed).toEqual(['b']);
    expect(focusedTab(el)).toBe('C');
  });

  it('focuses the tab before it when Delete closes the last tab', async () => {
    const {el, closed} = await setup('c', false, {
      hasClose: true,
      data: closable,
    });
    (document.getElementById('before') as HTMLElement).focus();
    await userEvent.tab();

    await userEvent.keyboard('{Delete}');
    await settle(el);
    expect(closed).toEqual(['c']);
    expect(focusedTab(el)).toBe('B');
  });

  it('ignores Delete on tabs without a close button', async () => {
    const {el, closed} = await setup('b', false, {data: closable});
    (document.getElementById('before') as HTMLElement).focus();
    await userEvent.tab();

    await userEvent.keyboard('{Delete}');
    await settle(el);
    expect(closed).toEqual([]);
    expect(items(el)).toHaveLength(3);
  });

  it('closes the tab, without selecting it, on Enter and Space from its close button', async () => {
    for (const key of ['{Enter}', ' ']) {
      const {el, selected, closed} = await setup('a', false, {
        hasClose: true,
        data: closable,
      });
      closeButtonOf(items(el)[1]).focus();

      await userEvent.keyboard(key);
      await settle(el);
      expect(closed).toEqual(['b']);
      expect(selected).toEqual([]);
    }
  });

  it('names the tab list', async () => {
    const {el} = await setup();
    const tablist = el.shadowRoot!.querySelector('[role="tablist"]')!;
    expect(tablist.getAttribute('aria-label')).toBe('Tabs');

    el.label = 'Documents';
    await el.updateComplete;
    expect(tablist.getAttribute('aria-label')).toBe('Documents');
  });

  it('keeps the add-new-tab button outside the tab list', async () => {
    const {el} = await setup('two', true);
    const tablist = el.shadowRoot!.querySelector('[role="tablist"]')!;
    expect(el.shadowRoot!.querySelector('.add-new-tab')).not.toBeNull();
    expect(tablist.querySelector('.add-new-tab')).toBeNull();
  });
});
