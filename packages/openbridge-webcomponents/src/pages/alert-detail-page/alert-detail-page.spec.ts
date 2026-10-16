import {afterEach, describe, expect, it} from 'vitest';
import './alert-detail-page.js';
import {AlertType, type Alert} from '../../types.js';

const ALERT: Alert = {
  id: 'a',
  tagId: 'a',
  source: 'Source',
  text: 'Text',
  acknowledged: false,
  active: true,
  type: AlertType.Alarm,
  time: new Date('2024-01-15T14:32:15Z'),
};

async function setup(alert: Alert) {
  const el = document.createElement('obc-alert-detail-page');
  el.alert = alert;
  document.body.append(el);
  await el.updateComplete;
  return el.shadowRoot!.querySelector('.wrapper')!.classList;
}

afterEach(() => {
  document.body.innerHTML = '';
});

describe('obc-alert-detail-page status', () => {
  it('marks a cleared alert as resolved, and an active one not', async () => {
    const active = await setup(ALERT);
    const cleared = await setup({
      ...ALERT,
      active: {rectifiedTime: new Date('2024-01-15T14:40:00Z')},
    });
    expect([
      active.contains('status-resolved'),
      cleared.contains('status-resolved'),
    ]).toEqual([false, true]);
    expect(active.contains('status-unacknowledged')).toBe(true);
  });
});
