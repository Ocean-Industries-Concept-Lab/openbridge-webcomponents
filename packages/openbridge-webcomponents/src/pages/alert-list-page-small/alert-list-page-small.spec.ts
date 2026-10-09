import {afterEach, describe, expect, it} from 'vitest';
import './alert-list-page-small.js';
import {
  AlertListMode,
  ObcAlertListPageAckAllClickEvent,
  ObcAlertListPageSmall,
} from './alert-list-page-small.js';
import type {ObcButton} from '../../components/button/button.js';
import {AlertType, type Alert} from '../../types.js';

const ALERTS: Alert[] = [
  {
    id: 'acked',
    tagId: 'acked',
    source: 'Source',
    text: 'Acked',
    acknowledged: {acknowledgedBy: 'Operator', acknowledgedAt: new Date()},
    active: true,
    type: AlertType.Alarm,
    time: new Date('2024-01-15T14:32:15Z'),
  },
  {
    id: 'shelved',
    tagId: 'shelved',
    source: 'Source',
    text: 'Shelved',
    acknowledged: false,
    active: true,
    type: AlertType.Warning,
    time: new Date('2024-01-15T14:33:15Z'),
    shelved: {shelvedStartTime: new Date()},
  },
];

let page: ObcAlertListPageSmall;

afterEach(() => page?.remove());

async function renderPage() {
  page = document.createElement('obc-alert-list-page-small');
  page.hasShelved = true;
  page.alerts = ALERTS;
  page.style.height = '480px';
  page.style.display = 'block';
  document.body.append(page);
  await page.updateComplete;
  return page;
}

const ackVisibleButton = (el: ObcAlertListPageSmall) =>
  el.shadowRoot!.querySelector<ObcButton>(
    '[data-testid="ack-all-visible-button"]'
  )!;

async function chooseMode(el: ObcAlertListPageSmall, mode: AlertListMode) {
  el.shadowRoot!.querySelector('obc-dropdown-button')!.dispatchEvent(
    new CustomEvent('change', {detail: {value: mode}})
  );
  await el.updateComplete;
}

describe('obc-alert-list-page-small', () => {
  it('enables ACK visible for the mode chosen in the dropdown', async () => {
    const el = await renderPage();
    expect(ackVisibleButton(el).disabled).toBe(true);

    await chooseMode(el, AlertListMode.SHELVED);

    expect(ackVisibleButton(el).disabled).toBe(false);
  });

  it('reports the mode chosen in the dropdown with ACK visible', async () => {
    const el = await renderPage();
    await chooseMode(el, AlertListMode.SHELVED);
    let mode: AlertListMode | undefined;
    el.addEventListener('ack-all-visible-click', (e) => {
      mode = (e as ObcAlertListPageAckAllClickEvent).detail.mode;
    });

    ackVisibleButton(el).shadowRoot!.querySelector('button')!.click();

    expect(mode).toBe(AlertListMode.SHELVED);
  });
});
