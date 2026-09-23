import {describe, expect, it} from 'vitest';
import {render} from 'vitest-browser-lit';
import {userEvent} from '@vitest/browser/context';
import {html} from 'lit';
import '../../main.css';
import './keyboard-numeric.js';
import type {ObcKeyboardNumeric} from './keyboard-numeric.js';
import {containsDeep, deepActiveElement} from '../../internal/_test-utils.js';

/**
 * The numeric keypad is an overlay: § 2 of the a11y doc gives an overlay one
 * dismissal key, Escape, wherever focus sits inside it — on its value field
 * and on any of its keys alike.
 */
async function setup() {
  const events: string[] = [];
  const screen = render(
    html`<obc-keyboard-numeric
      @close-click=${() => events.push('close-click')}
    ></obc-keyboard-numeric>`
  );
  const el = screen.container.querySelector(
    'obc-keyboard-numeric'
  ) as ObcKeyboardNumeric;
  await el.updateComplete;
  return {el, events};
}

function key(el: ObcKeyboardNumeric, label: string): HTMLElement {
  return Array.from(el.shadowRoot!.querySelectorAll('obc-button')).find(
    (button) => button.textContent?.trim() === label
  ) as HTMLElement;
}

describe('obc-keyboard-numeric keyboard', () => {
  it('fires close-click once on Escape from a focused key', async () => {
    const {el, events} = await setup();
    const seven = key(el, '7');
    await (seven as unknown as {updateComplete: Promise<unknown>})
      .updateComplete;
    (seven.shadowRoot!.querySelector('button') as HTMLElement).focus();
    expect(containsDeep(el, deepActiveElement())).toBe(true);

    await userEvent.keyboard('{Escape}');

    expect(events).toEqual(['close-click']);
  });

  it('fires close-click once on Escape from the value field', async () => {
    const {el, events} = await setup();
    const field = el.shadowRoot!.querySelector(
      'obc-number-input-field'
    ) as HTMLElement;
    await (field as unknown as {updateComplete: Promise<unknown>})
      .updateComplete;
    (field.shadowRoot!.querySelector('input') as HTMLElement).focus();

    await userEvent.keyboard('{Escape}');

    expect(events).toEqual(['close-click']);
  });
});
