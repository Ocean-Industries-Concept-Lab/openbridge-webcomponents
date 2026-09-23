import {describe, expect, it} from 'vitest';
import {render} from 'vitest-browser-lit';
import {userEvent} from '@vitest/browser/context';
import {html} from 'lit';
import '../../main.css';
import './top-bar.js';
import type {ObcTopBar} from './top-bar.js';
import {
  containsDeep,
  deepActiveElement,
} from '../../internal/_keyboard-test-utils.js';

/**
 * The left-most button of the bar doubles as the emergency-brightness hold,
 * which is why it listens to pointer events rather than click. A keyboard
 * user has no hold gesture, so Enter and Space have to fire the button's event
 * directly.
 */
async function setup(settings = false) {
  const events: string[] = [];
  const screen = render(
    html`<button id="before">before</button>
      <obc-top-bar
        appTitle="App"
        pageName="Page"
        ?settings=${settings}
        @menu-button-clicked=${() => events.push('menu')}
        @close=${() => events.push('close')}
        @emergency-brightness-start=${() => events.push('brightness-start')}
        @emergency-brightness-stop=${() => events.push('brightness-stop')}
      ></obc-top-bar>`
  );
  const el = screen.container.querySelector('obc-top-bar') as ObcTopBar;
  await el.updateComplete;
  const leftButton = el.shadowRoot!.querySelector(
    '.menu-button obc-icon-button'
  ) as HTMLElement;
  await (leftButton as unknown as {updateComplete: Promise<unknown>})
    .updateComplete;
  return {el, events, leftButton};
}

describe('obc-top-bar keyboard', () => {
  it('fires menu-button-clicked on Enter and on Space', async () => {
    const {events, leftButton} = await setup();
    (document.getElementById('before') as HTMLElement).focus();

    await userEvent.tab();
    expect(containsDeep(leftButton, deepActiveElement())).toBe(true);
    await userEvent.keyboard('{Enter}');
    await userEvent.keyboard(' ');

    expect(events).toEqual(['menu', 'menu']);
  });

  it('fires close on Enter in settings mode', async () => {
    const {events, leftButton} = await setup(true);
    (document.getElementById('before') as HTMLElement).focus();

    await userEvent.tab();
    expect(containsDeep(leftButton, deepActiveElement())).toBe(true);
    await userEvent.keyboard('{Enter}');

    expect(events).toEqual(['close']);
  });

  it('fires menu-button-clicked once for a pointer click', async () => {
    const {events, leftButton} = await setup();

    await userEvent.click(leftButton);

    expect(events).toEqual(['menu']);
  });

  it('keeps the hold gesture: a long press brightens instead of opening', async () => {
    const {events, leftButton} = await setup();

    leftButton.dispatchEvent(
      new PointerEvent('pointerdown', {bubbles: true, composed: true})
    );
    await new Promise((resolve) => setTimeout(resolve, 600));
    leftButton.dispatchEvent(
      new PointerEvent('pointerup', {bubbles: true, composed: true})
    );

    expect(events).toEqual(['brightness-start', 'brightness-stop']);
  });

  it('is a navigation landmark, not a menubar', async () => {
    const {el} = await setup();

    const nav = el.shadowRoot!.querySelector('nav')!;
    expect(nav.getAttribute('role')).toBeNull();
  });
});
