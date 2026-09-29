import {describe, expect, it} from 'vitest';
import {render} from 'vitest-browser-lit';
import {html} from 'lit';
import '../../main.css';
import './floating-item.js';
import '../alert-floating-item/alert-floating-item.js';
import '../notification-floating-item/notification-floating-item.js';
import '../advice-floating-item/advice-floating-item.js';

/**
 * A floating item appears to tell the user something, so it has to announce
 * itself: an alert interrupts (`role="alert"`), a notification or an advice
 * waits its turn (`role="status"`). The bare item carries no role, so a
 * consumer composing something else does not inherit an announcement.
 */
async function rootOf(tag: string): Promise<Element | null> {
  const screen = render(html`<div id="host"></div>`);
  const el = document.createElement(tag) as HTMLElement & {
    updateComplete: Promise<unknown>;
  };
  el.innerHTML = `<span slot="title">Title</span><span slot="message">Message</span>`;
  screen.container.querySelector('#host')!.appendChild(el);
  await el.updateComplete;
  const inner =
    tag === 'obc-floating-item'
      ? el
      : (el.shadowRoot!.querySelector('obc-floating-item') as HTMLElement & {
          updateComplete: Promise<unknown>;
        });
  await inner.updateComplete;
  return inner.shadowRoot!.querySelector('.wrapper');
}

describe('floating items announce themselves', () => {
  it('an alert interrupts', async () => {
    expect(
      (await rootOf('obc-alert-floating-item'))?.getAttribute('role')
    ).toBe('alert');
  });

  it('a notification and an advice wait their turn', async () => {
    expect(
      (await rootOf('obc-notification-floating-item'))?.getAttribute('role')
    ).toBe('status');
    expect(
      (await rootOf('obc-advice-floating-item'))?.getAttribute('role')
    ).toBe('status');
  });

  it('the bare item carries no role', async () => {
    expect((await rootOf('obc-floating-item'))?.hasAttribute('role')).toBe(
      false
    );
  });
});
