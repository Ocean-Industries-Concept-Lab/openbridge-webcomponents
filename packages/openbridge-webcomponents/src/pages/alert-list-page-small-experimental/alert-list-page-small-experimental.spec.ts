import {afterEach, describe, expect, it, vi} from 'vitest';
import './alert-list-page-small-experimental.js';
import {
  ObcAlertListPageSmallExperimental,
  ObcAlertListPageSmallExperimentalAckAllClickEvent,
  type ObcAlertListPageSmallExperimentalAckClickEvent as ObcAckClickEvent,
} from './alert-list-page-small-experimental.js';
import type {ObcButton} from '../../components/button/button.js';
import type {ObcDropdownButton} from '../../components/dropdown-button/dropdown-button.js';
import {AlertFilterMode} from '../../alert-filter.js';
import {setDefaultAlertStandard} from '../../alert-system/alert-standard.js';
import {
  MaritimeAlertCriticality,
  MaritimeAlertState,
} from '../../alert-system/maritime-alert-system.js';
import type {StandardAlert} from '../../alert-system/standard-alert.js';

const ACKED: StandardAlert = {
  standard: 'iec-62923',
  criticality: MaritimeAlertCriticality.Alarm,
  state: MaritimeAlertState.ActiveAcknowledged,
  id: 'acked',
  tagId: 'acked',
  source: 'Source',
  text: 'Acked',
  acknowledgedBy: 'Operator',
  acknowledgedAt: new Date(),
  time: new Date('2024-01-15T14:32:15Z'),
};

const UNACKED_RECTIFIED: StandardAlert = {
  ...ACKED,
  state: MaritimeAlertState.RectifiedUnacknowledged,
  id: 'unacked-rectified',
  tagId: 'unacked-rectified',
  text: 'Rectified, unacked',
  acknowledgedBy: undefined,
  acknowledgedAt: undefined,
};

let page: ObcAlertListPageSmallExperimental;

afterEach(() => {
  page?.remove();
  setDefaultAlertStandard('iec-62923');
});

/** Automation by default, whose standard offers "ACK visible". */
async function renderPage(
  {standard}: {standard?: string} = {
    standard: 'isa-18.2',
  }
) {
  page = document.createElement('obc-alert-list-page-small-experimental');
  page.standard = standard;
  page.hasShelved = true;
  page.hasBlocked = true;
  page.alerts = [ACKED, UNACKED_RECTIFIED];
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

async function chooseMode(
  el: ObcAlertListPageSmallExperimental,
  mode: AlertFilterMode
) {
  dropdown(el).dispatchEvent(
    new CustomEvent('change', {detail: {value: mode}})
  );
  await el.updateComplete;
  const list = el.shadowRoot!.querySelector(
    'obc-alert-list-details-experimental'
  )!;
  await list.updateComplete;
  return list;
}

describe('obc-alert-list-page-small-experimental', () => {
  it('opens on Active, offering the modes it has tabs for', async () => {
    const el = await renderPage();
    expect(dropdown(el).value).toBe(AlertFilterMode.Active);
    expect(dropdown(el).options.map((option) => option.label)).toEqual([
      'Active',
      'Unacked',
      'Shelved',
      'Blocked',
    ]);
  });

  it('enables ACK visible when the mode lists an alert still to acknowledge', async () => {
    const el = await renderPage();
    expect(ackVisibleButton(el).disabled).toBe(true);

    await chooseMode(el, AlertFilterMode.Unacked);

    expect(ackVisibleButton(el).disabled).toBe(false);
  });

  it('reports the chosen mode with ACK visible', async () => {
    const el = await renderPage();
    const list = await chooseMode(el, AlertFilterMode.Unacked);
    // obc-table slides a new row in, and a row counts as in view once it lands.
    await vi.waitFor(() => expect(list.getVisibleAlerts()).toHaveLength(1));
    let detail:
      ObcAlertListPageSmallExperimentalAckAllClickEvent['detail'] | undefined;
    el.addEventListener('ack-all-visible-click', (e) => {
      detail = (e as ObcAlertListPageSmallExperimentalAckAllClickEvent).detail;
    });

    ackVisibleButton(el).shadowRoot!.querySelector('button')!.click();

    expect(detail?.mode).toBe(AlertFilterMode.Unacked);
    expect(detail?.alerts.map((alert) => alert.id)).toEqual([
      'unacked-rectified',
    ]);
  });

  it('reports a click in the ACK column as ack-click', async () => {
    const el = await renderPage();
    const acked: string[] = [];
    el.addEventListener('ack-click', (e) =>
      acked.push((e as ObcAckClickEvent).detail.alert.id)
    );
    const list = el.shadowRoot!.querySelector(
      'obc-alert-list-details-experimental'
    )!;
    for (const columnKey of ['status', 'ack']) {
      list.dispatchEvent(
        new CustomEvent('cell-click', {
          detail: {alert: UNACKED_RECTIFIED, columnKey, rowId: 'x'},
        })
      );
    }
    expect(acked).toEqual(['unacked-rectified']);
  });

  it('leaves out ACK visible where the standard acknowledges one alert at a time', async () => {
    const maritime = await renderPage({standard: 'iec-62923'});
    expect(ackVisibleButton(maritime)).toBeNull();
    maritime.remove();

    const following = await renderPage({});
    expect(ackVisibleButton(following)).toBeNull();
    setDefaultAlertStandard('isa-18.2');
    await following.updateComplete;
    expect(ackVisibleButton(following)).not.toBeNull();
  });
});
