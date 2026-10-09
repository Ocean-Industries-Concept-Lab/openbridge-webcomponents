import {describe, expect, it} from 'vitest';
import {render} from 'vitest-browser-lit';
import {userEvent} from '@vitest/browser/context';
import {html} from 'lit';
import '../../main.css';
import './sequence-modal.js';
import type {ObcSequenceModal} from './sequence-modal.js';
import {containsDeep, deepActiveElement} from '../../internal/_test-utils.js';

/**
 * APG modal dialog pattern, the way `obc-modal-window` implements it: the
 * component has no open state, so connection opens and disconnection closes.
 */
async function setup() {
  const events: string[] = [];
  const screen = render(
    html`<button id="opener">open</button>
      <div id="host"></div>`
  );
  (document.getElementById('opener') as HTMLElement).focus();

  const el = document.createElement('obc-sequence-modal') as ObcSequenceModal;
  el.modalTitle = 'Start pump';
  el.hasActions = true;
  el.innerHTML = `<input id="field" />
    <button id="action" slot="actions">Confirm</button>`;
  el.addEventListener('close-click', () => events.push('close-click'));
  screen.container.querySelector('#host')!.appendChild(el);
  await el.updateComplete;
  await new Promise((resolve) => setTimeout(resolve, 0));
  return {el, events};
}

describe('obc-sequence-modal keyboard', () => {
  it('is a modal dialog named by its title', async () => {
    const {el} = await setup();

    const dialog = el.shadowRoot!.querySelector('[role="dialog"]');
    expect(dialog).not.toBeNull();
    expect(dialog?.getAttribute('aria-modal')).toBe('true');
    expect(dialog?.getAttribute('aria-label')).toBe('Start pump');
  });

  it('moves focus into the dialog when it appears and keeps Tab inside it', async () => {
    const {el} = await setup();
    expect(containsDeep(el, deepActiveElement())).toBe(true);

    for (let press = 0; press < 5; press++) {
      await userEvent.tab();
      expect(containsDeep(el, deepActiveElement())).toBe(true);
    }
    await userEvent.tab({shift: true});
    expect(containsDeep(el, deepActiveElement())).toBe(true);
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

  it('carries no empty name when modalTitle is unset', async () => {
    const screen = render(html`<div id="bare"></div>`);
    const el = document.createElement('obc-sequence-modal') as ObcSequenceModal;
    screen.container.querySelector('#bare')!.appendChild(el);
    await el.updateComplete;

    const dialog = el.shadowRoot!.querySelector('[role="dialog"]');
    expect(dialog?.hasAttribute('aria-label')).toBe(false);
  });
});
