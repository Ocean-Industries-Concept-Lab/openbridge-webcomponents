import {afterEach, describe, expect, it} from 'vitest';
import {render} from 'vitest-browser-lit';
import {userEvent} from '@vitest/browser/context';
import {html} from 'lit';
import '../../main.css';
import './context-menu-input.js';
import {
  ContextMenuType,
  type ContextMenuOption,
  type ObcContextMenuInput,
} from './context-menu-input.js';
import type {ObcNavigationItemGroup} from '../navigation-item-group/navigation-item-group.js';

const options: ContextMenuOption[] = [
  {value: 'one', label: 'One'},
  {
    value: 'file',
    label: 'File',
    children: [
      {value: 'new', label: 'New'},
      {value: 'open', label: 'Open'},
    ],
  },
];

let clicked: string[] = [];
afterEach(() => {
  clicked = [];
});

async function setup() {
  const screen = render(
    html`<obc-context-menu-input
      .type=${ContextMenuType.Flyout}
      .options=${options}
      @item-click=${(e: CustomEvent<{value: string}>) =>
        clicked.push(e.detail.value)}
    ></obc-context-menu-input>`
  );
  const el = screen.container.querySelector(
    'obc-context-menu-input'
  ) as ObcContextMenuInput;
  await el.updateComplete;
  const group = el.shadowRoot!.querySelector(
    'obc-navigation-item-group[data-menu-value="file"]'
  ) as ObcNavigationItemGroup;
  await group.updateComplete;
  return {el, group};
}

/** `item-click` in a flyout: one event per click, with the value of what was clicked (#1362). */
describe('obc-context-menu-input flyout item-click', () => {
  it('reports a submenu item once, with its own value', async () => {
    const {group} = await setup();
    group.open();
    await group.updateComplete;
    const item = group.querySelector(
      '[data-menu-value="new"]'
    ) as HTMLElement & {updateComplete: Promise<unknown>};
    await item.updateComplete;

    await userEvent.click(item);

    expect(clicked).toEqual(['new']);
  });

  it('still reports a click on the submenu header with the header value', async () => {
    const {group} = await setup();

    group.click();

    expect(clicked).toEqual(['file']);
  });
});
