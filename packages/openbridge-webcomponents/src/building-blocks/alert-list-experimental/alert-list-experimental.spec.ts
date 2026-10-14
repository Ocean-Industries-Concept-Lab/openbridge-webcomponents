import {afterEach, beforeEach, describe, expect, it} from 'vitest';
import './alert-list-experimental.js';
import {ObcAlertListExperimental} from './alert-list-experimental.js';
import '../../components/alert-menu-item-experimental/alert-menu-item-experimental.js';
import type {ObcAlertMenuItemExperimental} from '../../components/alert-menu-item-experimental/alert-menu-item-experimental.js';
import {setAlertStandard} from '../../alert-system/configured-alert-standard.js';
import {isa182AlertStandard} from '../../alert-system/isa-18-2-alert-standard.js';

const ISA_18_2_ITEMS: [id: string, criticality: string, state: string][] = [
  ['unacknowledged', 'high', 'unacknowledged'],
  ['acknowledged', 'high', 'acknowledged'],
  ['returned-to-normal', 'high', 'returned-to-normal-unacknowledged'],
  ['normal', 'high', 'normal'],
  ['diagnostic', 'diagnostic', 'active'],
  ['shelved', 'medium', 'shelved'],
  ['suppressed', 'critical', 'suppressed-by-design'],
  ['not-defined', 'diagnostic', 'shelved'],
];

let list: ObcAlertListExperimental;

async function renderList(
  configure: (el: ObcAlertListExperimental) => void,
  items = ISA_18_2_ITEMS
) {
  list = document.createElement('obc-alert-list-experimental');
  configure(list);
  for (const [id, criticality, state] of items) {
    const item = document.createElement('obc-alert-menu-item-experimental');
    item.id = id;
    item.criticality = criticality;
    item.state = state;
    list.append(item);
  }
  document.body.append(list);
  await list.updateComplete;
  await Promise.all(
    [...list.querySelectorAll('obc-alert-menu-item-experimental')].map(
      (item) => item.updateComplete
    )
  );
  return list;
}

const shownIds = (el: HTMLElement) =>
  [...el.querySelectorAll('obc-alert-menu-item-experimental')]
    .filter((item) => !item.hidden)
    .map((item) => item.id);

beforeEach(() => setAlertStandard(isa182AlertStandard));

afterEach(() => {
  list?.remove();
  setAlertStandard(undefined);
});

describe('obc-alert-list-experimental', () => {
  it.each([
    [undefined, ISA_18_2_ITEMS.map(([id]) => id)],
    ['active', ['unacknowledged', 'acknowledged', 'diagnostic']],
    ['unacked', ['unacknowledged', 'returned-to-normal']],
    ['shelved', ['shelved']],
    ['suppressed-by-design', ['suppressed']],
    ['not-declared', []],
  ])('filter %s shows %j and hides the rest', async (filterId, expected) => {
    const el = await renderList((l) => (l.filterId = filterId));
    expect(shownIds(el)).toEqual(expected);
  });

  it('follows a filter change', async () => {
    const el = await renderList((l) => (l.filterId = 'shelved'));
    el.filterId = 'suppressed-by-design';
    await el.updateComplete;
    expect(shownIds(el)).toEqual(['suppressed']);
  });

  it('hides an item once its state leaves the filter', async () => {
    const el = await renderList((l) => (l.filterId = 'active'));
    const item =
      el.querySelector<ObcAlertMenuItemExperimental>('#acknowledged')!;
    item.state = 'shelved';
    await item.updateComplete;
    await new Promise((resolve) => setTimeout(resolve));
    expect(shownIds(el)).toEqual(['unacknowledged', 'diagnostic']);
  });

  it('narrows the filter with the custom predicate', async () => {
    const el = await renderList((l) => {
      l.filterId = 'active';
      l.customFilter = (item) => item.id !== 'diagnostic';
    });
    expect(shownIds(el)).toEqual(['unacknowledged', 'acknowledged']);
  });

  it('shows the empty state its standard gives the filter', async () => {
    const el = await renderList(
      (l) => (l.filterId = 'shelved'),
      [['acknowledged', 'high', 'acknowledged']]
    );
    const title = el.shadowRoot!.querySelector('slot[name="empty-title"]');
    expect(title?.textContent?.trim()).toBe('No shelved alerts');
  });

  it('shows no item while no standard is set, and says so', async () => {
    setAlertStandard(undefined);
    const el = await renderList((l) => (l.filterId = undefined));
    const title = el.shadowRoot!.querySelector('slot[name="empty-title"]');
    expect([shownIds(el), title?.textContent?.trim()]).toEqual([
      [],
      'No alert standard is set',
    ]);
  });

  it('filters again once a standard is set', async () => {
    setAlertStandard(undefined);
    const el = await renderList((l) => (l.filterId = 'shelved'));
    setAlertStandard(isa182AlertStandard);
    await el.updateComplete;
    expect(shownIds(el)).toEqual(['shelved']);
  });
});
