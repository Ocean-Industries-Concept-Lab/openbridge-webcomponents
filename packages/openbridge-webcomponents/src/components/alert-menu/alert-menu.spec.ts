import {describe, expect, it} from 'vitest';
import {render} from 'vitest-browser-lit';
import {html} from 'lit';
import './alert-menu.js';
import {ObcAlertMenu, ObcAckAllVisibleClickEvent} from './alert-menu.js';
import '../alert-menu-item/alert-menu-item.js';
import {ObcAlertMenuItemStatus} from '../alert-menu-item/alert-menu-item.js';
import type {ObcTabbedCard} from '../tabbed-card/tabbed-card.js';
import type {ObcButton} from '../button/button.js';

async function setup() {
  const screen = render(
    html`<obc-alert-menu canAckAll>
      <obc-alert-menu-item
        id="active-unacked"
        status=${ObcAlertMenuItemStatus.Unacknowledged}
      ></obc-alert-menu-item>
      <obc-alert-menu-item
        id="active-acked"
        status=${ObcAlertMenuItemStatus.Acknowledged}
      ></obc-alert-menu-item>
      <obc-alert-menu-item
        id="rectified-unacked"
        status=${ObcAlertMenuItemStatus.RectifiedUnacknowledged}
      ></obc-alert-menu-item>
      <obc-alert-menu-item
        id="rectified-acked"
        status=${ObcAlertMenuItemStatus.Rectified}
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
  return {
    tabName: detail?.tabName,
    ids: detail?.visibleElements.map(({element}) => element.id),
  };
}

describe('obc-alert-menu', () => {
  it('keeps a rectified-unacknowledged item out of the Active tab', async () => {
    const el = await setup();
    expect(clickAckVisible(el)).toEqual({
      tabName: 'all',
      ids: ['active-unacked', 'active-acked', 'rectified-acked'],
    });
  });

  it('lists a rectified-unacknowledged item in the Unacked tab', async () => {
    const el = await setup();
    const tabs = el.shadowRoot!.querySelector(
      'obc-tabbed-card'
    ) as ObcTabbedCard;
    (tabs.shadowRoot!.querySelector('#tab-0') as HTMLElement).click();
    await el.updateComplete;
    expect(clickAckVisible(el)).toEqual({
      tabName: 'unacked',
      ids: ['active-unacked', 'rectified-unacked'],
    });
  });
});
