import {describe, expect, it} from 'vitest';
import {render} from 'vitest-browser-lit';
import {userEvent} from '@vitest/browser/context';
import {html} from 'lit';
import '../../main.css';
import './keyboard-full.js';
import type {ObcKeyboardFull} from './keyboard-full.js';
import {containsDeep, deepActiveElement} from '../../internal/_test-utils.js';

/**
 * The on-screen keyboard is an overlay: § 2 of the a11y doc gives an overlay
 * one dismissal key, Escape, wherever focus sits inside it.
 */
async function setup() {
  const events: string[] = [];
  const screen = render(
    html`<button id="before">before</button>
      <obc-keyboard-full
        @close-click=${() => events.push('close-click')}
      ></obc-keyboard-full>`
  );
  const el = screen.container.querySelector(
    'obc-keyboard-full'
  ) as ObcKeyboardFull;
  await el.updateComplete;
  return {el, events};
}

describe('obc-keyboard-full keyboard', () => {
  it('fires close-click on Escape from a focused key', async () => {
    const {el, events} = await setup();
    (document.getElementById('before') as HTMLElement).focus();

    await userEvent.tab();
    expect(containsDeep(el, deepActiveElement())).toBe(true);
    await userEvent.keyboard('{Escape}');

    expect(events).toEqual(['close-click']);
  });
});
