import {describe, expect, it} from 'vitest';
import {render} from 'vitest-browser-lit';
import {userEvent} from '@vitest/browser/context';
import {html} from 'lit';
import {RovingNavigator, type RovingOptions} from './roving-navigator.js';
import {deepActiveElement} from './_keyboard-test-utils.js';

/**
 * A plain-button fixture: the navigator owns the tab stop and the arrow keys,
 * the host owns the DOM and forwards `keydown` and `focusin`.
 */
function setup(options: Partial<RovingOptions> = {}) {
  const screen = render(
    html`<button id="before">before</button>
      <div id="host">
        <button id="a">a</button>
        <button id="b" disabled>b</button>
        <button id="c">c</button>
        <button id="d">d</button>
      </div>
      <button id="after">after</button>`
  );
  const host = screen.container.querySelector('#host') as HTMLElement;
  const items = () => Array.from(host.querySelectorAll('button'));
  const navigator = new RovingNavigator(
    {
      items,
      isDisabled: (item) => item.disabled,
      preferred: () => items().find((item) => item.id === 'c'),
      setFocusable: (item, focusable) => (item.tabIndex = focusable ? 0 : -1),
    },
    {orientation: 'horizontal', ...options}
  );
  host.addEventListener('keydown', (event) => {
    if (navigator.handleKeydown(event)) event.preventDefault();
  });
  host.addEventListener('focusin', (event) => navigator.handleFocusin(event));
  navigator.refresh();
  return {host, navigator, items};
}

const ids = (elements: HTMLElement[]) => elements.map((el) => el.id);
const tabStopIds = (items: HTMLElement[]) =>
  ids(items.filter((item) => item.tabIndex === 0));

describe('RovingNavigator', () => {
  it('gives the preferred item the only tab stop', () => {
    const {items} = setup();

    expect(tabStopIds(items())).toEqual(['c']);
  });

  it('is one tab stop: Tab enters on the preferred item and leaves on the next press', async () => {
    setup();
    (document.getElementById('before') as HTMLElement).focus();

    await userEvent.tab();
    expect(deepActiveElement()?.id).toBe('c');
    await userEvent.tab();
    expect(deepActiveElement()?.id).toBe('after');
  });

  it('moves focus and the tab stop with the arrow keys, skipping disabled items', async () => {
    const {items} = setup();
    items()[2].focus();

    await userEvent.keyboard('{ArrowLeft}');
    expect(deepActiveElement()?.id).toBe('a');
    expect(tabStopIds(items())).toEqual(['a']);
    await userEvent.keyboard('{ArrowRight}');
    expect(deepActiveElement()?.id).toBe('c');
  });

  it('wraps at both ends by default and clamps when asked', async () => {
    const wrapping = setup();
    wrapping.items()[3].focus();
    await userEvent.keyboard('{ArrowRight}');
    expect(deepActiveElement()?.id).toBe('a');

    const clamping = setup({wrap: false});
    clamping.items()[3].focus();
    await userEvent.keyboard('{ArrowRight}');
    expect(deepActiveElement()?.id).toBe('d');
  });

  it('moves to the first and last item on Home and End', async () => {
    const {items} = setup();
    items()[2].focus();

    await userEvent.keyboard('{Home}');
    expect(deepActiveElement()?.id).toBe('a');
    await userEvent.keyboard('{End}');
    expect(deepActiveElement()?.id).toBe('d');
  });

  it('answers only to the keys of its orientation', async () => {
    const {items} = setup({orientation: 'vertical'});
    items()[2].focus();

    await userEvent.keyboard('{ArrowRight}');
    expect(deepActiveElement()?.id).toBe('c');
    await userEvent.keyboard('{ArrowDown}');
    expect(deepActiveElement()?.id).toBe('d');
  });

  it('hands the tab stop to an item focused by other means, such as a click', async () => {
    const {items} = setup();

    await userEvent.click(items()[0]);

    expect(tabStopIds(items())).toEqual(['a']);
  });

  it('falls back to the preferred item when the active one disappears', () => {
    const {items, navigator} = setup();
    items()[0].focus();
    expect(tabStopIds(items())).toEqual(['a']);

    items()[0].remove();
    navigator.refresh();

    expect(tabStopIds(items())).toEqual(['c']);
  });
});
