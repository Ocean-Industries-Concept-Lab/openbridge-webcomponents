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
import {defineAlertStandard} from '../../alert-system/alert-standard.js';
import {
  registerAlertStandard,
  setDefaultAlertStandard,
} from '../../alert-system/alert-standard-registry.js';

const ISA_18_2_ITEMS: [id: string, criticality: string, state: string][] = [
  ['unacknowledged', 'high', 'unacknowledged'],
  ['acknowledged', 'high', 'acknowledged'],
  ['returned-to-normal', 'high', 'returned-to-normal-unacknowledged'],
  ['diagnostic', 'diagnostic', 'active'],
  ['shelved', 'medium', 'shelved'],
  ['out-of-service', 'low', 'out-of-service'],
];

async function setup(standard: string | undefined = 'isa-18.2') {
  const screen = render(
    html`<obc-alert-menu-experimental canAckAll .standard=${standard}>
      ${ISA_18_2_ITEMS.map(
        ([id, criticality, state]) =>
          html`<obc-alert-menu-item-experimental
            id=${id}
            standard="isa-18.2"
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

afterEach(() => setDefaultAlertStandard('iec-62923'));

describe('obc-alert-menu-experimental', () => {
  it('has one tab per filter its standard declares', async () => {
    const isa = await setup('isa-18.2');
    const iec = await setup('iec-62923');
    expect([tabTitles(isa), tabTitles(iec)]).toEqual([
      ['Unacked', 'Active', 'Shelved', 'Suppressed', 'Out of service'],
      ['Unacked', 'Active'],
    ]);
  });

  it('opens on the second tab, listing the alerts its filter includes', async () => {
    const el = await setup();
    expect(clickAckVisible(el)).toEqual({
      tabName: 'active',
      ids: ['unacknowledged', 'acknowledged', 'diagnostic'],
    });
  });

  it('lists what each other filter includes in its own tab', async () => {
    const el = await setup();
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
    const el = await setup('iec-62923');
    expect(ackVisibleButton(el)).toBeNull();
  });

  it('follows the default standard unless it names its own', async () => {
    const el = await setup(undefined);
    expect(tabTitles(el)).toEqual(['Unacked', 'Active']);
    setDefaultAlertStandard('isa-18.2');
    await el.updateComplete;
    expect(tabTitles(el)).toHaveLength(5);
  });

  it('shows one tab with every alert for a standard that declares no filter', async () => {
    registerAlertStandard(
      defineAlertStandard({
        id: 'menu-spec-standard-without-filters',
        filters: {},
        actions: {},
        criticalities: {},
      })
    );
    const el = await setup('menu-spec-standard-without-filters');
    expect(tabTitles(el)).toEqual(['All']);
    const hiddenItems = [
      ...el.querySelectorAll('obc-alert-menu-item-experimental'),
    ].filter((item) => item.hidden);
    expect(hiddenItems).toEqual([]);
  });
});
