import {describe, expect, it} from 'vitest';
import {render} from 'vitest-browser-lit';
import {html} from 'lit';
import './alert-menu-experimental.js';
import {
  ObcAlertMenuExperimental,
  ObcAlertMenuExperimentalAckAllVisibleClickEvent,
} from './alert-menu-experimental.js';
import '../alert-menu-item/alert-menu-item.js';
import {ObcAlertMenuItemStatus} from '../alert-menu-item/alert-menu-item.js';
import type {ObcTabbedCard} from '../tabbed-card/tabbed-card.js';
import type {ObcButton} from '../button/button.js';

/** Automation by default, whose standard offers "ACK visible". */
async function setup(hasShelved = true, standard = 'isa-18.2') {
  const screen = render(
    html`<obc-alert-menu-experimental
      canAckAll
      .hasShelved=${hasShelved}
      .standard=${standard}
      hasBlocked
    >
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
      <obc-alert-menu-item
        id="no-ack"
        status=${ObcAlertMenuItemStatus.NoAckAlarm}
      ></obc-alert-menu-item>
      <obc-alert-menu-item
        id="caution"
        status=${ObcAlertMenuItemStatus.Caution}
      ></obc-alert-menu-item>
      <obc-alert-menu-item
        id="shelved"
        status=${ObcAlertMenuItemStatus.Unacknowledged}
        shelved
      ></obc-alert-menu-item>
      <obc-alert-menu-item
        id="blocked"
        status=${ObcAlertMenuItemStatus.Unacknowledged}
        blocked
      ></obc-alert-menu-item>
    </obc-alert-menu-experimental>`
  );
  const el = screen.container.querySelector(
    'obc-alert-menu-experimental'
  ) as ObcAlertMenuExperimental;
  await el.updateComplete;
  return el;
}

function tabbedCard(el: ObcAlertMenuExperimental) {
  return el.shadowRoot!.querySelector('obc-tabbed-card') as ObcTabbedCard;
}

async function selectTab(el: ObcAlertMenuExperimental, index: number) {
  const tabs = tabbedCard(el);
  (tabs.shadowRoot!.querySelector(`#tab-${index}`) as HTMLElement).click();
  await el.updateComplete;
}

function clickAckVisible(el: ObcAlertMenuExperimental) {
  let detail:
    ObcAlertMenuExperimentalAckAllVisibleClickEvent['detail'] | undefined;
  el.addEventListener('ack-all-visible-click', (e) => {
    detail = (e as ObcAlertMenuExperimentalAckAllVisibleClickEvent).detail;
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

describe('obc-alert-menu-experimental', () => {
  it('opens on the Active tab, listing what is still active', async () => {
    const el = await setup();
    expect(clickAckVisible(el)).toEqual({
      tabName: 'active',
      ids: ['active-unacked', 'active-acked', 'no-ack', 'caution'],
    });
  });

  it('lists unacked alerts, active or rectified, in the Unacked tab', async () => {
    const el = await setup();
    await selectTab(el, 0);
    expect(clickAckVisible(el)).toEqual({
      tabName: 'unacked',
      ids: ['active-unacked', 'rectified-unacked', 'no-ack'],
    });
  });

  it('lists shelved and blocked alerts only in their own tabs', async () => {
    const el = await setup();
    await selectTab(el, 2);
    expect(clickAckVisible(el)).toEqual({tabName: 'shelved', ids: ['shelved']});
    await selectTab(el, 3);
    expect(clickAckVisible(el)).toEqual({tabName: 'blocked', ids: ['blocked']});
  });

  it('moves the Blocked tab up when there is no Shelved tab', async () => {
    const el = await setup(false);
    const titles = [
      ...tabbedCard(el).querySelectorAll('[slot^="tab-title-"]'),
    ].map((title) => title.textContent);
    expect(titles).toEqual(['Unacked', 'Active', 'Blocked']);
    await selectTab(el, 2);
    expect(clickAckVisible(el).tabName).toBe('blocked');
  });

  it('leaves out ACK visible where the standard acknowledges one alert at a time', async () => {
    const el = await setup(true, 'iec-62923');
    expect(
      el.shadowRoot!.querySelector('[data-testid="ack-all-visible-button"]')
    ).toBeNull();
  });
});
