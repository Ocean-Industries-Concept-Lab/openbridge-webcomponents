import {userEvent} from '@vitest/browser/context';
import {afterEach, describe, expect, it, vi} from 'vitest';
import './top-bar.js';
import type {ObcTopBar} from './top-bar.js';

const cleanup: Array<() => void> = [];
afterEach(() => {
  while (cleanup.length) cleanup.pop()!();
});

async function mount() {
  const bar = document.createElement('obc-top-bar') as ObcTopBar;
  document.body.append(bar);
  cleanup.push(() => bar.remove());
  await bar.updateComplete;
  const button = bar.shadowRoot!.querySelector<HTMLElement>(
    '.menu-button obc-icon-button'
  )!;
  const events: string[] = [];
  bar.addEventListener('menu-button-clicked', () =>
    events.push('menu-button-clicked')
  );
  const onWindowClick = () => events.push('click');
  window.addEventListener('click', onWindowClick, {capture: true});
  cleanup.push(() =>
    window.removeEventListener('click', onWindowClick, {capture: true})
  );
  return {bar, button, events};
}

describe('obc-top-bar menu button', () => {
  it('a press dispatches once, from the click rather than the release', async () => {
    const {button, events} = await mount();
    await userEvent.click(button);
    // The click is seen first; the event follows from inside it. A menu
    // opened from the release would be closed again by this click.
    expect(events).toEqual(['click', 'menu-button-clicked']);
  });

  it('a hold that started emergency brightness does not open the menu on release', async () => {
    const {bar, button, events} = await mount();
    let emergency = 0;
    bar.addEventListener('emergency-brightness-start', () => emergency++);
    // The real cursor is still over the button from the click above, and a
    // leave would cancel the hold, so park it first. Synthetic pointer
    // events then let the release wait for the hold timer.
    await userEvent.unhover(button);
    button.dispatchEvent(
      new PointerEvent('pointerdown', {bubbles: true, composed: true})
    );
    await vi.waitFor(() => expect(emergency).toBe(1), {timeout: 3000});
    button.dispatchEvent(
      new PointerEvent('pointerup', {bubbles: true, composed: true})
    );
    button.dispatchEvent(
      new MouseEvent('click', {bubbles: true, composed: true, detail: 1})
    );
    expect(events).toEqual(['click']);
  });
});
