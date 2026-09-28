import {describe, expect, it} from 'vitest';
import {render} from 'vitest-browser-lit';
import {userEvent} from '@vitest/browser/context';
import {html} from 'lit';
import '../../main.css';
import './modal-window.js';
import type {ObcModalWindow} from './modal-window.js';
import {containsDeep, deepActiveElement} from '../../internal/_test-utils.js';

/**
 * APG modal dialog pattern: https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/
 *
 * The component has no `open` state; a consumer renders it to open it and
 * removes it to close it, so "opens" is connection and "closes" is
 * disconnection.
 */
async function setup() {
  const events: string[] = [];
  const screen = render(
    html`<button id="opener">open</button>
      <div id="host"></div>`
  );
  (document.getElementById('opener') as HTMLElement).focus();

  const el = document.createElement('obc-modal-window') as ObcModalWindow;
  el.innerHTML = `<span slot="title">Settings</span>
    <div slot="content"><input id="field" /></div>`;
  el.addEventListener('close-click', () => events.push('close-click'));
  screen.container.querySelector('#host')!.appendChild(el);
  await el.updateComplete;
  await Promise.all(
    Array.from(
      el.shadowRoot!.querySelectorAll('obc-icon-button, obc-button'),
      (button) =>
        (button as unknown as {updateComplete: Promise<unknown>}).updateComplete
    )
  );
  return {el, events};
}

function wrapper(el: ObcModalWindow): HTMLElement {
  return el.shadowRoot!.querySelector('.wrapper') as HTMLElement;
}

function doneButton(el: ObcModalWindow): HTMLElement {
  return el.shadowRoot!.querySelector(
    'obc-button[variant="raised"]'
  ) as HTMLElement;
}

function closeButton(el: ObcModalWindow): HTMLElement {
  return el.shadowRoot!.querySelector('obc-icon-button') as HTMLElement;
}

describe('obc-modal-window keyboard', () => {
  it('is a modal dialog named by its title', async () => {
    const {el} = await setup();

    const dialog = wrapper(el);
    expect(dialog.getAttribute('role')).toBe('dialog');
    expect(dialog.getAttribute('aria-modal')).toBe('true');
    const labelId = dialog.getAttribute('aria-labelledby');
    expect(labelId).toBeTruthy();
    expect(
      el
        .shadowRoot!.getElementById(labelId!)
        ?.querySelector('slot[name="title"]')
    ).not.toBeNull();
  });

  it('moves focus into the dialog when it appears', async () => {
    const {el} = await setup();

    expect(containsDeep(el, deepActiveElement())).toBe(true);
  });

  it('wraps Tab from the last control to the first', async () => {
    const {el} = await setup();
    (doneButton(el).shadowRoot!.querySelector('button') as HTMLElement).focus();

    await userEvent.tab();

    expect(containsDeep(closeButton(el), deepActiveElement())).toBe(true);
  });

  it('wraps Shift+Tab from the first control to the last', async () => {
    const {el} = await setup();
    (
      closeButton(el).shadowRoot!.querySelector('button') as HTMLElement
    ).focus();

    await userEvent.tab({shift: true});

    expect(containsDeep(doneButton(el), deepActiveElement())).toBe(true);
  });

  it('fires close-click on Escape', async () => {
    const {events} = await setup();
    (document.getElementById('field') as HTMLElement).focus();

    await userEvent.keyboard('{Escape}');

    expect(events).toEqual(['close-click']);
  });

  it('returns focus to the opener when it is removed', async () => {
    const {el} = await setup();
    expect(containsDeep(el, deepActiveElement())).toBe(true);

    el.remove();

    expect(deepActiveElement()?.id).toBe('opener');
  });

  it('leaves an Escape that a nested control already handled alone', async () => {
    const {events} = await setup();
    const field = document.getElementById('field') as HTMLElement;
    field.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') event.preventDefault();
    });
    field.focus();

    await userEvent.keyboard('{Escape}');

    expect(events).toEqual([]);
  });

  it('moves focus in again when it is re-attached', async () => {
    const {el} = await setup();
    const host = el.parentElement as HTMLElement;
    el.remove();
    (document.getElementById('opener') as HTMLElement).focus();

    host.appendChild(el);
    await el.updateComplete;

    expect(containsDeep(el, deepActiveElement())).toBe(true);
  });
});
