import {describe, expect, it} from 'vitest';
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
import {deepActiveElement} from '../../internal/_keyboard-test-utils.js';

const options: ContextMenuOption[] = [
  {value: 'one', label: 'One'},
  {value: 'two', label: 'Two'},
  {value: 'three', label: 'Three'},
];

/**
 * Keyboard model of `<obc-context-menu-input>`, against the APG menu pattern.
 *
 * https://www.w3.org/WAI/ARIA/apg/patterns/menu/
 *
 * The button before the menu gives keyboard entry a starting point outside it.
 * `main.css` has to be loaded: the component skips items with no client rects,
 * so an unstyled menu offers nothing to move between.
 */
async function setup(selectedValues: string[] = []) {
  const screen = render(
    html`<button id="outside">Outside</button>
      <obc-context-menu-input
        .type=${ContextMenuType.Regular}
        .options=${options}
        .selectedValues=${selectedValues}
      ></obc-context-menu-input>`
  );
  const el = screen.container.querySelector(
    'obc-context-menu-input'
  ) as ObcContextMenuInput;
  await el.updateComplete;
  await Promise.all(
    Array.from(el.shadowRoot!.querySelectorAll('obc-navigation-item')).map(
      (item) => item.updateComplete
    )
  );
  return {
    el,
    outside: screen.container.querySelector('#outside') as HTMLElement,
  };
}

/**
 * Value of the menu item holding focus.
 *
 * Each item focuses a control inside its own shadow root, so the focused node
 * is never the item itself; the walk up through the hosts recovers which one.
 */
function focusedValue(): string | null {
  let node: Node | null = deepActiveElement();
  while (node) {
    if (node instanceof HTMLElement && node.hasAttribute('data-menu-value')) {
      return node.getAttribute('data-menu-value');
    }
    const root = node.getRootNode();
    node =
      root instanceof ShadowRoot
        ? root.host
        : (node as HTMLElement).parentElement;
  }
  return null;
}

describe('obc-context-menu-input keyboard', () => {
  it('opens on the selected item, and on the first one when nothing is selected', async () => {
    const {el} = await setup(['two']);
    el.focusSelectedItem();
    expect(focusedValue()).toBe('two');

    const empty = await setup();
    empty.el.focusSelectedItem();
    expect(focusedValue()).toBe('one');
  });

  it('moves focus to the next item on ArrowDown and to the previous one on ArrowUp', async () => {
    const {el} = await setup();
    el.focusFirstItem();

    await userEvent.keyboard('{ArrowDown}');
    expect(focusedValue()).toBe('two');
    await userEvent.keyboard('{ArrowDown}');
    expect(focusedValue()).toBe('three');
    await userEvent.keyboard('{ArrowUp}');
    expect(focusedValue()).toBe('two');
  });

  it('holds focus at the ends of the list instead of wrapping', async () => {
    const {el} = await setup();
    el.focusLastItem();

    await userEvent.keyboard('{ArrowDown}');
    expect(focusedValue()).toBe('three');

    el.focusFirstItem();
    await userEvent.keyboard('{ArrowUp}');
    expect(focusedValue()).toBe('one');
  });

  it('enters the list from the menu itself on ArrowDown and from its end on ArrowUp', async () => {
    const {el} = await setup();
    const menu = el.shadowRoot!.querySelector('.context-menu') as HTMLElement;

    menu.focus();
    await userEvent.keyboard('{ArrowDown}');
    expect(focusedValue()).toBe('one');

    menu.focus();
    await userEvent.keyboard('{ArrowUp}');
    expect(focusedValue()).toBe('three');
  });

  it('moves focus to the first item on Home and the last one on End', async () => {
    const {el} = await setup();
    el.focusFirstItem();

    await userEvent.keyboard('{End}');
    expect(focusedValue()).toBe('three');
    await userEvent.keyboard('{Home}');
    expect(focusedValue()).toBe('one');
  });

  it('selects the focused item on Enter and on Space', async () => {
    const {el} = await setup();
    el.focusFirstItem();

    await userEvent.keyboard('{Enter}');
    expect(el.selectedValues).toEqual(['one']);

    await userEvent.keyboard('{ArrowDown}');
    await userEvent.keyboard(' ');
    expect(el.selectedValues).toEqual(['two']);
  });

  it('fires close on Escape', async () => {
    const {el} = await setup();
    let closes = 0;
    el.addEventListener('close', () => closes++);
    el.focusFirstItem();

    await userEvent.keyboard('{Escape}');

    expect(closes).toBe(1);
  });

  it('keeps the focus ring on the item the arrow keys move to', async () => {
    const {outside} = await setup();
    outside.focus();

    await userEvent.tab();
    expect((deepActiveElement() as HTMLElement).matches(':focus-visible')).toBe(
      true
    );

    await userEvent.keyboard('{ArrowDown}');
    expect(focusedValue()).toBe('two');
    expect((deepActiveElement() as HTMLElement).matches(':focus-visible')).toBe(
      true
    );
  });
});
