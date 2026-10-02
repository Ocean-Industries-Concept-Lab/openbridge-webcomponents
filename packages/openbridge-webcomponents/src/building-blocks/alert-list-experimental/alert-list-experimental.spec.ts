import {afterEach, describe, expect, it} from 'vitest';
import './alert-list-experimental.js';
import {ObcAlertListExperimental} from './alert-list-experimental.js';
import '../../components/alert-menu-item/alert-menu-item.js';
import {
  ObcAlertMenuItem,
  ObcAlertMenuItemStatus,
} from '../../components/alert-menu-item/alert-menu-item.js';
import {AlertFilterMode} from '../../alert-filter.js';

const ITEMS: [string, ObcAlertMenuItemStatus, Partial<ObcAlertMenuItem>][] = [
  ['unacked', ObcAlertMenuItemStatus.Unacknowledged, {}],
  ['acked', ObcAlertMenuItemStatus.Acknowledged, {}],
  ['unacked-rectified', ObcAlertMenuItemStatus.RectifiedUnacknowledged, {}],
  ['normal', ObcAlertMenuItemStatus.Rectified, {}],
  ['caution', ObcAlertMenuItemStatus.Caution, {}],
  ['no-ack', ObcAlertMenuItemStatus.NoAckAlarm, {}],
  ['shelved', ObcAlertMenuItemStatus.Unacknowledged, {shelved: true}],
  ['blocked', ObcAlertMenuItemStatus.Unacknowledged, {blocked: true}],
];

let list: ObcAlertListExperimental;

async function renderList(
  configure: (el: ObcAlertListExperimental) => void,
  items = ITEMS
) {
  list = document.createElement('obc-alert-list-experimental');
  configure(list);
  for (const [id, status, properties] of items) {
    const item = document.createElement('obc-alert-menu-item');
    item.id = id;
    item.status = status;
    Object.assign(item, properties);
    list.append(item);
  }
  document.body.append(list);
  await list.updateComplete;
  await Promise.all(
    [...list.querySelectorAll('obc-alert-menu-item')].map(
      (item) => item.updateComplete
    )
  );
  return list;
}

const shownIds = (el: HTMLElement) =>
  [...el.querySelectorAll('obc-alert-menu-item')]
    .filter((item) => !item.hidden)
    .map((item) => item.id);

afterEach(() => list?.remove());

describe('obc-alert-list-experimental', () => {
  it.each([
    [AlertFilterMode.All, ITEMS.map(([id]) => id)],
    [AlertFilterMode.Active, ['unacked', 'acked', 'caution', 'no-ack']],
    [AlertFilterMode.Unacked, ['unacked', 'unacked-rectified', 'no-ack']],
    [AlertFilterMode.Shelved, ['shelved']],
    [AlertFilterMode.Blocked, ['blocked']],
  ])('%s shows %j and hides the rest', async (mode, expected) => {
    const el = await renderList((l) => (l.filterMode = mode));
    expect(shownIds(el)).toEqual(expected);
  });

  it('follows a filter mode change', async () => {
    const el = await renderList(
      (l) => (l.filterMode = AlertFilterMode.Shelved)
    );
    el.filterMode = AlertFilterMode.Blocked;
    await el.updateComplete;
    expect(shownIds(el)).toEqual(['blocked']);
  });

  it('hides an item once it is blocked', async () => {
    const el = await renderList((l) => (l.filterMode = AlertFilterMode.Active));
    const item = el.querySelector<ObcAlertMenuItem>('#acked')!;
    item.blocked = true;
    await item.updateComplete;
    await new Promise((resolve) => setTimeout(resolve));
    expect(shownIds(el)).toEqual(['unacked', 'caution', 'no-ack']);
  });

  it('runs the custom predicate in custom mode', async () => {
    const el = await renderList((l) => {
      l.filterMode = AlertFilterMode.Custom;
      l.customFilter = (item) => item.id.startsWith('no');
    });
    expect(shownIds(el)).toEqual(['normal', 'no-ack']);
  });

  it("shows the filter mode's empty state when nothing matches", async () => {
    const el = await renderList(
      (l) => (l.filterMode = AlertFilterMode.Unacked),
      [['acked', ObcAlertMenuItemStatus.Acknowledged, {}]]
    );
    const title = el.shadowRoot!.querySelector('slot[name="empty-title"]');
    expect(title?.textContent?.trim()).toBe('No unacknowledged alerts');
  });
});
