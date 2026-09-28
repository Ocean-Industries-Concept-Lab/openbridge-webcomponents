import {describe, expect, it} from 'vitest';
import {render} from 'vitest-browser-lit';
import {html} from 'lit';
import './alert-menu.js';
import '../alert-menu-item/alert-menu-item.js';
import {ObcAlertMenu, ObcAckAllVisibleClickEvent} from './alert-menu.js';
import {ObcAlertMenuItemStatus} from '../alert-menu-item/alert-menu-item.js';
import type {ObcTabbedCard} from '../tabbed-card/tabbed-card.js';
import type {ObcButton} from '../button/button.js';

async function setup() {
  const screen = render(
    html`<obc-alert-menu canAckAll>
      <obc-alert-menu-item
        id="active-unacked"
        status=${ObcAlertMenuItemStatus.Unacknowledged}
        title="Active unacked"
      ></obc-alert-menu-item>
      <obc-alert-menu-item
        id="active-acked"
        status=${ObcAlertMenuItemStatus.Acknowledged}
        title="Active acked"
      ></obc-alert-menu-item>
      <obc-alert-menu-item
        id="rectified-unacked"
        status=${ObcAlertMenuItemStatus.RectifiedUnacknowledged}
        title="Rectified unacked"
      ></obc-alert-menu-item>
      <obc-alert-menu-item
        id="rectified-acked"
        status=${ObcAlertMenuItemStatus.Rectified}
        title="Rectified acked"
      ></obc-alert-menu-item>
    </obc-alert-menu>`
  );
  const el = screen.container.querySelector('obc-alert-menu') as ObcAlertMenu;
  await el.updateComplete;
  return el;
}

function clickAckVisible(el: ObcAlertMenu) {
  let detail: ObcAckAllVisibleClickEvent['detail'] | undefined;
  el.addEventListener('ack-all-visible-click', (e) => {
    detail = (e as ObcAckAllVisibleClickEvent).detail;
  });
  const button = el.shadowRoot!.querySelector(
    '[data-testid="ack-all-visible-button"]'
  ) as ObcButton;
  button.shadowRoot!.querySelector('button')!.click();
  return detail;
}

function ids(detail: ObcAckAllVisibleClickEvent['detail'] | undefined) {
  return detail?.visibleElements.map(({element}) => element.id);
}

describe('obc-alert-menu ACK visible', () => {
  it('sends the active alerts, acked or not, from the Active tab', async () => {
    const el = await setup();

    const detail = clickAckVisible(el);

    expect(detail?.tabName).toBe('active');
    expect(ids(detail)).toEqual(['active-unacked', 'active-acked']);
  });

  it('sends the unacked alerts, active or rectified, from the Unacked tab', async () => {
    const el = await setup();
    const tabs = el.shadowRoot!.querySelector(
      'obc-tabbed-card'
    ) as ObcTabbedCard;
    (tabs.shadowRoot!.querySelector('#tab-0') as HTMLButtonElement).click();
    await el.updateComplete;

    const detail = clickAckVisible(el);

    expect(detail?.tabName).toBe('unacked');
    expect(ids(detail)).toEqual(['active-unacked', 'rectified-unacked']);
  });
});
