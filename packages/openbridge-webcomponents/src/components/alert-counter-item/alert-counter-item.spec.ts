import {describe, expect, it} from 'vitest';
import {render} from 'vitest-browser-lit';
import {html} from 'lit';
import './alert-counter-item.js';
import {
  ObcAlertCounterItem,
  ObcAlertCounterItemType,
} from './alert-counter-item.js';
import type {ObcBadge} from '../badge/badge.js';
import type {AlertCounts} from '../../types.js';

async function setup(
  counts: AlertCounts,
  options: {type?: ObcAlertCounterItemType; shelvedCount?: number} = {}
) {
  const screen = render(
    html`<obc-alert-counter-item
      .counts=${counts}
      .type=${options.type ?? ObcAlertCounterItemType.Badges}
      .shelvedCount=${options.shelvedCount ?? 0}
    ></obc-alert-counter-item>`
  );
  const el = screen.container.querySelector(
    'obc-alert-counter-item'
  ) as ObcAlertCounterItem;
  await el.updateComplete;
  return el;
}

function badges(el: ObcAlertCounterItem): ObcBadge[] {
  return [...el.shadowRoot!.querySelectorAll<ObcBadge>('obc-badge')];
}

function lastBadge(el: ObcAlertCounterItem): ObcBadge {
  const all = badges(el);
  return all[all.length - 1];
}

describe('obc-alert-counter-item', () => {
  it('renders one filled badge per positive count, most severe first', async () => {
    const el = await setup({countCaution: 6, countAlarm: 2, countWarning: 0});

    expect(
      badges(el).map((b) => [b.type, b.number, b.variant, b.showIcon])
    ).toEqual([
      ['alarm', 2, 'default', false],
      ['caution', 6, 'default', false],
    ]);
  });

  it('draws flat badges with glyphs in the alert-level type', async () => {
    const el = await setup(
      {countWarning: 4},
      {type: ObcAlertCounterItemType.AlertLevel}
    );

    expect(badges(el).map((b) => [b.type, b.variant, b.showIcon])).toEqual([
      ['warning', 'flat', true],
    ]);
  });

  it('adds the shelved count last', async () => {
    const filled = await setup({countAlarm: 2}, {shelvedCount: 9});
    expect([lastBadge(filled).type, lastBadge(filled).number]).toEqual([
      'regular',
      9,
    ]);

    const level = await setup(
      {countAlarm: 2},
      {type: ObcAlertCounterItemType.AlertLevel, shelvedCount: 9}
    );
    expect(lastBadge(level).querySelector('obi-alerts-shelf')).not.toBeNull();
  });

  it('renders nothing when nothing is counted', async () => {
    const el = await setup({countAlarm: 0});

    expect(el.shadowRoot!.querySelector('.row')).toBeNull();
  });

  it('labels the row with the counts', async () => {
    const el = await setup({countWarning: 4, countAlarm: 2}, {shelvedCount: 1});
    const row = el.shadowRoot!.querySelector('.row')!;

    expect(row.getAttribute('role')).toBe('img');
    expect(row.getAttribute('aria-label')).toBe(
      '2 Alarm, 4 Warning, 1 Shelved'
    );
  });
});
