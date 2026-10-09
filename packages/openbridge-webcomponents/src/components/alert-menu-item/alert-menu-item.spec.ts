import {describe, expect, it} from 'vitest';
import './alert-menu-item.js';
import {ObcAlertMenuItem, ObcAlertMenuItemStatus} from './alert-menu-item.js';
import type {ObcMessageMenuItem} from '../message-menu-item/message-menu-item.js';

async function renderItem(configure: (item: ObcAlertMenuItem) => void) {
  const item = document.createElement('obc-alert-menu-item');
  configure(item);
  document.body.append(item);
  await item.updateComplete;
  const message = item.shadowRoot!.querySelector(
    'obc-message-menu-item'
  ) as ObcMessageMenuItem;
  return {item, message};
}

describe('obc-alert-menu-item', () => {
  it.each([
    [ObcAlertMenuItemStatus.Unacknowledged, 'ACK'],
    [ObcAlertMenuItemStatus.RectifiedUnacknowledged, 'ACK'],
    [ObcAlertMenuItemStatus.Acknowledged, ''],
    [ObcAlertMenuItemStatus.Rectified, ''],
    [ObcAlertMenuItemStatus.NoAckAlarm, ''],
  ])('status %s shows the ACK action %j', async (status, label) => {
    const {item, message} = await renderItem((el) => (el.status = status));
    expect(message.primaryActionLabel).toBe(label);
    expect(message.hasTrailingIcon).toBe(label === '');
    item.remove();
  });

  it('reflects blocked, for menus that list blocked alerts apart', async () => {
    const {item} = await renderItem((el) => (el.blocked = true));
    expect(item.hasAttribute('blocked')).toBe(true);
    item.blocked = false;
    await item.updateComplete;
    expect(item.hasAttribute('blocked')).toBe(false);
    item.remove();
  });
});
