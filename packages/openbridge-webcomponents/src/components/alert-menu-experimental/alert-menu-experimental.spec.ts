import {afterEach, describe, expect, it} from 'vitest';
import {render} from 'vitest-browser-lit';
import {html} from 'lit';
import './alert-menu-experimental.js';
import {
  ObcAlertMenuExperimental,
  ObcAlertMenuExperimentalAckAllVisibleClickEvent,
} from './alert-menu-experimental.js';
import '../alert-menu-item-experimental/alert-menu-item-experimental.js';
import type {ObcTabbedCard} from '../tabbed-card/tabbed-card.js';
import type {ObcButton} from '../button/button.js';
import {
  defineAlertStandard,
  type AlertStandard,
} from '../../alert-system/alert-standard.js';
import {setAlertStandard} from '../../alert-system/configured-alert-standard.js';
import {iec62923AlertStandard} from '../../alert-system/iec-62923-alert-standard.js';
import {isa182AlertStandard} from '../../alert-system/isa-18-2-alert-standard.js';

const ISA_18_2_ITEMS: [id: string, criticality: string, state: string][] = [
  ['unacknowledged', 'high', 'unacknowledged'],
  ['acknowledged', 'high', 'acknowledged'],
  ['returned-to-normal', 'high', 'returned-to-normal-unacknowledged'],
  ['low-acknowledged', 'low', 'acknowledged'],
  ['shelved', 'medium', 'shelved-not-active'],
  ['out-of-service', 'low', 'out-of-service-active'],
];

async function setup(standard: AlertStandard | undefined) {
  setAlertStandard(standard);
  const screen = render(
    html`<obc-alert-menu-experimental canAckAll>
      ${ISA_18_2_ITEMS.map(
        ([id, criticality, state]) =>
          html`<obc-alert-menu-item-experimental
            id=${id}
            criticality=${criticality}
            state=${state}
          ></obc-alert-menu-item-experimental>`
      )}
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

const tabTitles = (el: ObcAlertMenuExperimental) =>
  [...tabbedCard(el).querySelectorAll('[slot^="tab-title-"]')].map(
    (title) => title.textContent
  );

async function selectTab(el: ObcAlertMenuExperimental, index: number) {
  const tabs = tabbedCard(el);
  (tabs.shadowRoot!.querySelector(`#tab-${index}`) as HTMLElement).click();
  await el.updateComplete;
}

const ackVisibleButton = (el: ObcAlertMenuExperimental) =>
  el.shadowRoot!.querySelector<ObcButton>(
    '[data-testid="ack-all-visible-button"]'
  );

function clickAckVisible(el: ObcAlertMenuExperimental) {
  let detail:
    ObcAlertMenuExperimentalAckAllVisibleClickEvent['detail'] | undefined;
  el.addEventListener('ack-all-visible-click', (e) => {
    detail = (e as ObcAlertMenuExperimentalAckAllVisibleClickEvent).detail;
  });
  ackVisibleButton(el)!.shadowRoot!.querySelector('button')!.click();
  return {
    tabName: detail?.tabName,
    ids: detail?.visibleElements.map(({element}) => element.id),
  };
}

afterEach(() => setAlertStandard(undefined));

describe('obc-alert-menu-experimental', () => {
  it('has one tab per filter the standard declares', async () => {
    const el = await setup(isa182AlertStandard);
    expect(tabTitles(el)).toEqual([
      'Unacked',
      'Active',
      'Shelved',
      'Suppressed by design',
      'Out of service',
    ]);
  });

  it('opens on the second tab, listing the alerts its filter includes', async () => {
    const el = await setup(isa182AlertStandard);
    expect(clickAckVisible(el)).toEqual({
      tabName: 'active',
      ids: ['unacknowledged', 'acknowledged', 'low-acknowledged'],
    });
  });

  it('lists what each other filter includes in its own tab', async () => {
    const el = await setup(isa182AlertStandard);
    await selectTab(el, 0);
    expect(clickAckVisible(el)).toEqual({
      tabName: 'unacked',
      ids: ['unacknowledged', 'returned-to-normal'],
    });
    await selectTab(el, 2);
    expect(clickAckVisible(el)).toEqual({tabName: 'shelved', ids: ['shelved']});
    await selectTab(el, 4);
    expect(clickAckVisible(el)).toEqual({
      tabName: 'out-of-service',
      ids: ['out-of-service'],
    });
  });

  it('leaves out ACK visible where the standard acknowledges one alert at a time', async () => {
    const el = await setup(iec62923AlertStandard);
    expect(ackVisibleButton(el)).toBeNull();
  });

  it('has one tab saying no standard is set, until one is', async () => {
    const el = await setup(undefined);
    expect(tabTitles(el)).toEqual(['All']);
    setAlertStandard(iec62923AlertStandard);
    await el.updateComplete;
    expect(tabTitles(el)).toEqual(['Unacked', 'Active']);
  });

  it('shows one tab with every alert for a standard that declares no filter', async () => {
    const el = await setup(
      defineAlertStandard({filters: {}, actions: {}, criticalities: {}})
    );
    expect(tabTitles(el)).toEqual(['All']);
    const hiddenItems = [
      ...el.querySelectorAll('obc-alert-menu-item-experimental'),
    ].filter((item) => item.hidden);
    expect(hiddenItems).toEqual([]);
  });
});
