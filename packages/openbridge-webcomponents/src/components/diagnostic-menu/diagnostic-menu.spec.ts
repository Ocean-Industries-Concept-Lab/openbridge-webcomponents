import {describe, expect, it} from 'vitest';
import {render} from 'vitest-browser-lit';
import {html} from 'lit';
import './diagnostic-menu.js';
import {
  ObcDiagnosticMenu,
  ObcDiagnosticMenuAckAllVisibleClickEvent,
} from './diagnostic-menu.js';
import '../message-menu-item/message-menu-item.js';
import type {ObcButton} from '../button/button.js';

const nextTask = () => new Promise((resolve) => setTimeout(resolve, 0));

async function setup(rows = ['a', 'b', 'c'], canAckAll = true) {
  const screen = render(
    html`<obc-diagnostic-menu .canAckAll=${canAckAll}>
      ${rows.map(
        (id) =>
          html`<obc-message-menu-item
            id=${id}
            title=${id}
          ></obc-message-menu-item>`
      )}
    </obc-diagnostic-menu>`
  );
  const el = screen.container.querySelector(
    'obc-diagnostic-menu'
  ) as ObcDiagnosticMenu;
  await el.updateComplete;
  return el;
}

function shadowButton(el: ObcDiagnosticMenu, testId: string) {
  return (
    el.shadowRoot!.querySelector(`[data-testid="${testId}"]`) as ObcButton
  ).shadowRoot!.querySelector('button')!;
}

describe('obc-diagnostic-menu', () => {
  it('ack-all-visible-click carries every row', async () => {
    const el = await setup();
    let ids: string[] | undefined;
    el.addEventListener('ack-all-visible-click', (e) => {
      ids = (
        e as ObcDiagnosticMenuAckAllVisibleClickEvent
      ).detail.visibleElements.map(({element}) => element.id);
    });

    shadowButton(el, 'ack-all-visible-button').click();

    expect(ids).toEqual(['a', 'b', 'c']);
  });

  it('disables ACK all visible until canAckAll', async () => {
    const el = await setup(['a'], false);

    expect(shadowButton(el, 'ack-all-visible-button').disabled).toBe(true);
  });

  it('go-to-diagnostic-list-click fires from the list button, which showDiagnosticListButton hides', async () => {
    const el = await setup();
    let fired = 0;
    el.addEventListener('go-to-diagnostic-list-click', () => fired++);

    shadowButton(el, 'diagnostic-list-button').click();
    expect(fired).toBe(1);

    el.showDiagnosticListButton = false;
    await el.updateComplete;
    expect(
      el.shadowRoot!.querySelector('[data-testid="diagnostic-list-button"]')
    ).toBeNull();
  });

  it('titles itself Diagnostics unless menuTitle is set', async () => {
    const el = await setup();
    const title = () => el.shadowRoot!.querySelector('h3')!.textContent!.trim();

    expect(title()).toBe('Diagnostics');

    el.menuTitle = 'Health';
    await el.updateComplete;
    expect(title()).toBe('Health');
  });

  it('shows the empty state without rows', async () => {
    const el = await setup([]);
    const list = el.shadowRoot!.querySelector('obc-alert-list')!;
    await list.updateComplete;
    const titleSlot = list.shadowRoot!.querySelector<HTMLSlotElement>(
      'slot[name="empty-title"]'
    )!;

    expect(titleSlot.assignedElements()[0].textContent!.trim()).toBe(
      'No diagnostics'
    );
  });

  it('writes open back and fires close when it closes itself', async () => {
    const el = await setup();
    el.softDismiss = true;
    el.open = true;
    await el.updateComplete;
    await nextTask();
    let closed = 0;
    el.addEventListener('close', () => closed++);

    el.hidePopover();
    await el.updateComplete;
    await nextTask();

    expect([el.open, closed]).toEqual([false, 1]);
  });
});
