import {afterEach, describe, expect, it, vi} from 'vitest';
import './alert-list-page-small-experimental.js';
import {
  ObcAlertListPageSmallExperimental,
  ObcAlertListPageSmallExperimentalAckAllClickEvent,
  type ObcAlertListPageSmallExperimentalActionClickEvent,
} from './alert-list-page-small-experimental.js';
import type {ObcButton} from '../../components/button/button.js';
import type {ObcDropdownButton} from '../../components/dropdown-button/dropdown-button.js';
import type {StandardAlertWithColumnFields} from '../../components/alert-list-details-experimental/alert-list-details-experimental.js';
import {setDefaultAlertStandard} from '../../alert-system/alert-standard-registry.js';

const ACKNOWLEDGED: StandardAlertWithColumnFields = {
  standard: 'isa-18.2',
  criticality: 'high',
  state: 'acknowledged',
  id: 'acknowledged',
  tagId: 'acknowledged',
  text: 'Acknowledged',
  acknowledgedBy: 'Operator',
  time: new Date('2024-01-15T14:32:15Z'),
};

const RETURNED_TO_NORMAL_UNACKNOWLEDGED: StandardAlertWithColumnFields = {
  standard: 'isa-18.2',
  criticality: 'high',
  state: 'returned-to-normal-unacknowledged',
  id: 'returned-to-normal',
  tagId: 'returned-to-normal',
  text: 'Returned to normal, unacknowledged',
  time: new Date('2024-01-15T14:32:15Z'),
};

let page: ObcAlertListPageSmallExperimental;

afterEach(() => {
  page?.remove();
  setDefaultAlertStandard('iec-62923');
});

async function renderPage(standard: string | undefined = 'isa-18.2') {
  page = document.createElement('obc-alert-list-page-small-experimental');
  page.standard = standard;
  page.alerts = [ACKNOWLEDGED, RETURNED_TO_NORMAL_UNACKNOWLEDGED];
  page.style.height = '480px';
  page.style.display = 'block';
  document.body.append(page);
  await page.updateComplete;
  return page;
}

const dropdown = (el: ObcAlertListPageSmallExperimental) =>
  el.shadowRoot!.querySelector('obc-dropdown-button') as ObcDropdownButton;

const ackVisibleButton = (el: ObcAlertListPageSmallExperimental) =>
  el.shadowRoot!.querySelector<ObcButton>(
    '[data-testid="ack-all-visible-button"]'
  )!;

const alertList = (el: ObcAlertListPageSmallExperimental) =>
  el.shadowRoot!.querySelector('obc-alert-list-details-experimental')!;

async function chooseFilter(
  el: ObcAlertListPageSmallExperimental,
  filterId: string
) {
  dropdown(el).dispatchEvent(
    new CustomEvent('change', {detail: {value: filterId}})
  );
  await el.updateComplete;
  await alertList(el).updateComplete;
  return alertList(el);
}

describe('obc-alert-list-page-small-experimental', () => {
  it('opens on the first filter its standard declares, offering all of them', async () => {
    const el = await renderPage();
    expect(dropdown(el).value).toBe('unacked');
    expect(dropdown(el).options.map((option) => option.label)).toEqual([
      'Unacked',
      'Active',
      'Shelved',
      'Suppressed',
      'Out of service',
    ]);
  });

  it('enables ACK visible when the filter lists an alert that offers acknowledge', async () => {
    const el = await renderPage();
    await chooseFilter(el, 'active');
    expect(ackVisibleButton(el).disabled).toBe(true);

    await chooseFilter(el, 'unacked');

    expect(ackVisibleButton(el).disabled).toBe(false);
  });

  it('reports the chosen filter with ACK visible', async () => {
    const el = await renderPage();
    const list = await chooseFilter(el, 'unacked');
    // obc-table slides a new row in, and a row counts as in view once it lands.
    await vi.waitFor(() => expect(list.getVisibleAlerts()).toHaveLength(1));
    let detail:
      ObcAlertListPageSmallExperimentalAckAllClickEvent['detail'] | undefined;
    el.addEventListener('ack-all-visible-click', (e) => {
      detail = (e as ObcAlertListPageSmallExperimentalAckAllClickEvent).detail;
    });

    ackVisibleButton(el).shadowRoot!.querySelector('button')!.click();

    expect(detail?.mode).toBe('unacked');
    expect(detail?.alerts.map((alert) => alert.id)).toEqual([
      'returned-to-normal',
    ]);
  });

  it('reports a click on an action button as action-click, with the action', async () => {
    const el = await renderPage();
    const clicked: [string, string][] = [];
    el.addEventListener('action-click', (e) => {
      const {alert, actionId} = (
        e as ObcAlertListPageSmallExperimentalActionClickEvent
      ).detail;
      clicked.push([alert.id, actionId]);
    });
    for (const actionId of [undefined, 'acknowledge']) {
      alertList(el).dispatchEvent(
        new CustomEvent('cell-click', {
          detail: {
            alert: RETURNED_TO_NORMAL_UNACKNOWLEDGED,
            columnKey: 'action',
            rowId: 'x',
            actionId,
          },
        })
      );
    }
    expect(clicked).toEqual([['returned-to-normal', 'acknowledge']]);
  });

  it('leaves out ACK visible where the standard acknowledges one alert at a time', async () => {
    const iec = await renderPage('iec-62923');
    expect(ackVisibleButton(iec)).toBeNull();
    iec.remove();

    const following = await renderPage(undefined);
    expect(ackVisibleButton(following)).toBeNull();
    setDefaultAlertStandard('isa-18.2');
    await following.updateComplete;
    expect(ackVisibleButton(following)).not.toBeNull();
  });
});
