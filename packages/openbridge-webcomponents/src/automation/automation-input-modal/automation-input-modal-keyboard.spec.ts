import {describe, expect, it} from 'vitest';
import {render} from 'vitest-browser-lit';
import {userEvent} from '@vitest/browser/context';
import {html} from 'lit';
import '../../main.css';
import './automation-input-modal.js';
import type {ObcAutomationInputModal} from './automation-input-modal.js';
import {containsDeep, deepActiveElement} from '../../internal/_test-utils.js';

/**
 * APG modal dialog pattern, the way `obc-modal-window` implements it: the
 * component has no open state, so connection opens and disconnection closes.
 * Every control is slotted, so the cycle runs over light-DOM content.
 */
async function setup() {
  const events: string[] = [];
  const screen = render(
    html`<button id="opener">open</button>
      <div id="host"></div>`
  );
  (document.getElementById('opener') as HTMLElement).focus();

  const el = document.createElement(
    'obc-automation-input-modal'
  ) as ObcAutomationInputModal;
  el.innerHTML = `<div slot="header"><span id="title">Speed</span><button id="close">x</button></div>
    <div slot="preview"><input id="field" /></div>
    <button slot="action-primary" id="primary">Apply</button>
    <button slot="action-secondary" id="secondary">Cancel</button>`;
  el.addEventListener('close-click', () => events.push('close-click'));
  screen.container.querySelector('#host')!.appendChild(el);
  await el.updateComplete;
  return {el, events};
}

describe('obc-automation-input-modal keyboard', () => {
  it('is a modal dialog named by its header', async () => {
    const {el} = await setup();

    const dialog = el.shadowRoot!.querySelector('[role="dialog"]');
    expect(dialog?.getAttribute('aria-modal')).toBe('true');
    const labelId = dialog?.getAttribute('aria-labelledby');
    expect(
      el
        .shadowRoot!.getElementById(labelId!)
        ?.querySelector('slot[name="header"]')
    ).not.toBeNull();
  });

  it('moves focus into the dialog when it appears and cycles Tab over the slotted controls', async () => {
    const {el} = await setup();
    expect(containsDeep(el, deepActiveElement())).toBe(true);

    (document.getElementById('secondary') as HTMLElement).focus();
    await userEvent.tab();
    expect(deepActiveElement()?.id).toBe('close');
    await userEvent.tab({shift: true});
    expect(deepActiveElement()?.id).toBe('secondary');
  });

  it('fires close-click on Escape', async () => {
    const {events} = await setup();
    (document.getElementById('field') as HTMLElement).focus();

    await userEvent.keyboard('{Escape}');

    expect(events).toEqual(['close-click']);
  });

  it('returns focus to the opener when it is removed', async () => {
    const {el} = await setup();

    el.remove();

    expect(deepActiveElement()?.id).toBe('opener');
  });
});
