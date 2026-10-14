import {afterEach, beforeEach, describe, it, expect} from 'vitest';
import {
  ObcAlertListCellClickEvent,
  ObcAlertListCellSlotsChangeEvent,
  ObcAlertListDetailsExperimental,
  actionColumn,
  alertListCellSlotName,
  getAlertRows,
  statusColumn,
  type StandardAlertWithColumnFields,
} from './alert-list-details-experimental.js';
import {ObcTableCellType} from '../table/table.js';
import type {StandardAlert} from '../../alert-system/standard-alert.js';
import {setAlertStandard} from '../../alert-system/configured-alert-standard.js';
import {iec62923AlertStandard} from '../../alert-system/iec-62923-alert-standard.js';
import {isa182AlertStandard} from '../../alert-system/isa-18-2-alert-standard.js';

const RECTIFIED_WARNING = {
  criticality: 'warning',
  state: 'rectified-unacknowledged',
} as const;

/** An unacknowledged IEC 62923 warning, unless the overrides say otherwise. */
function alert(
  id: string,
  overrides: Partial<StandardAlertWithColumnFields> = {}
): StandardAlertWithColumnFields {
  return {
    criticality: 'warning',
    state: 'active-unacknowledged',
    id,
    tagId: id,
    source: 'Source',
    text: id,
    time: new Date('2024-01-15T14:32:15Z'),
    ...overrides,
  };
}

beforeEach(() => setAlertStandard(iec62923AlertStandard));
afterEach(() => setAlertStandard(undefined));

const rowIds = (alerts: StandardAlert[], filterId?: string) =>
  getAlertRows(alerts, filterId).map((row) => row.rowId);

describe('getAlertRows', () => {
  it('gives an ungrouped alert its encoded id as row id', () => {
    const rows = getAlertRows([alert('a/b')]);
    expect(rows).toEqual([
      {
        rowId: 'a%2Fb',
        parentRowId: undefined,
        alert: expect.objectContaining({id: 'a/b'}),
        level: 0,
        expandable: false,
      },
    ]);
  });

  it('nests members under their group path', () => {
    const rows = getAlertRows([
      alert('gyro'),
      alert('sensor', {memberOf: ['gyro']}),
      alert('drift', {memberOf: ['sensor']}),
    ]);
    expect(
      rows.map(({rowId, level, expandable}) => [rowId, level, expandable])
    ).toEqual([
      ['gyro', 0, true],
      ['gyro/sensor', 1, true],
      ['gyro/sensor/drift', 2, false],
    ]);
  });

  it('gives an alert in two groups one row under each', () => {
    expect(
      rowIds([
        alert('gyro'),
        alert('radar'),
        alert('power', {memberOf: ['gyro', 'radar']}),
      ])
    ).toEqual(['gyro', 'gyro/power', 'radar', 'radar/power']);
  });

  it('makes a member a root when the filter hides its group', () => {
    const alerts = [
      alert('group', RECTIFIED_WARNING),
      alert('member', {memberOf: ['group']}),
    ];
    expect(rowIds(alerts, 'active')).toEqual(['member']);
    expect(rowIds(alerts, 'unacked')).toEqual(['group', 'group/member']);
  });

  it('narrows the filter with the custom predicate', () => {
    const alerts = [
      alert('gyro'),
      alert('radar'),
      alert('rectified', RECTIFIED_WARNING),
    ];
    expect(
      getAlertRows(alerts, 'active', (a) => a.id !== 'radar').map(
        (row) => row.rowId
      )
    ).toEqual(['gyro']);
  });

  it('recovers a membership cycle with no root', () => {
    expect(
      rowIds([
        alert('pump-a', {memberOf: ['pump-b']}),
        alert('pump-b', {memberOf: ['pump-a']}),
      ])
    ).toEqual(['pump-a', 'pump-a/pump-b']);
  });
});

describe('filterId', () => {
  it('lists every alert by default, one the standard does not define included', async () => {
    const el = document.createElement('obc-alert-list-details-experimental');
    el.alerts = [
      alert('active'),
      alert('rectified', RECTIFIED_WARNING),
      alert('unknown', {criticality: 'not-defined'}),
    ];
    document.body.append(el);
    await el.updateComplete;
    const table = el.shadowRoot!.querySelector('obc-table')!;
    expect(table.data.map((row) => row.id)).toEqual([
      'active',
      'rectified',
      'unknown',
    ]);
    el.remove();
  });

  it('re-lists the cell slots when the custom predicate changes', async () => {
    const el = document.createElement('obc-alert-list-details-experimental');
    el.columns = [statusColumn(), {key: 'ack', label: 'ACK', slot: true}];
    el.alerts = [alert('gyro'), alert('radar')];
    el.customFilter = (a) => a.id === 'gyro';
    document.body.append(el);
    await el.updateComplete;
    expect(el.cellSlots.map((slot) => slot.name)).toEqual(['cell-ack:gyro']);

    el.customFilter = (a) => a.id === 'radar';
    await el.updateComplete;
    expect(el.cellSlots.map((slot) => slot.name)).toEqual(['cell-ack:radar']);
    el.remove();
  });

  it('lists no alert while no standard is set, and says so', async () => {
    setAlertStandard(undefined);
    const el = document.createElement('obc-alert-list-details-experimental');
    el.alerts = [alert('active')];
    document.body.append(el);
    await el.updateComplete;
    expect(
      el.shadowRoot!.querySelector('.empty-title')?.textContent?.trim()
    ).toBe('No alert standard is set');

    setAlertStandard(iec62923AlertStandard);
    await el.updateComplete;
    expect(
      el.shadowRoot!.querySelector('obc-table')!.data.map((row) => row.id)
    ).toEqual(['active']);
    el.remove();
  });

  it('shows the empty state the standard gives the filter', async () => {
    setAlertStandard(isa182AlertStandard);
    const el = document.createElement('obc-alert-list-details-experimental');
    el.filterId = 'shelved';
    document.body.append(el);
    await el.updateComplete;
    expect(
      el.shadowRoot!.querySelector('.empty-title')?.textContent?.trim()
    ).toBe('No shelved alerts');
    el.remove();
  });
});

describe('statusColumn', () => {
  it('sorts the lowest sorting rank on top in its descending order', () => {
    const {compare} = statusColumn();
    const acknowledgedAlarm = alert('alarm', {
      criticality: 'alarm',
      state: 'active-acknowledged',
    });
    const unacknowledgedWarning = alert('warning');
    expect(Math.sign(compare!(unacknowledgedWarning, acknowledgedAlarm))).toBe(
      1
    );
  });
});

describe('actionColumn', () => {
  const cell = (overrides: Partial<StandardAlertWithColumnFields>) =>
    actionColumn().cell(alert('a', overrides));

  /** The first tag the cell's icon template draws. */
  const iconTag = (data: unknown) =>
    (data as {icon?: {strings: readonly string[]}}).icon?.strings[0].match(
      /<([a-z-]+)/
    )?.[1];

  it('offers the first action of the state, labelled by the standard', () => {
    const acknowledgeCell = cell(RECTIFIED_WARNING);
    setAlertStandard(isa182AlertStandard);
    const unshelveCell = cell({criticality: 'high', state: 'shelved'});
    expect([acknowledgeCell, unshelveCell]).toEqual([
      {type: ObcTableCellType.Button, text: 'ACK'},
      {type: ObcTableCellType.Button, text: 'Unshelve'},
    ]);
  });

  it('leaves the cell empty for a state that offers no action', () => {
    expect(cell({criticality: 'caution', state: 'active'})).toEqual({
      type: ObcTableCellType.Regular,
    });
  });

  it('shows the glyph of a state without actions, else who acknowledged the alert', () => {
    const acknowledged = cell({
      state: 'active-acknowledged',
      acknowledgedBy: 'John Doe',
    });
    const acknowledgeNotAllowed = cell({
      criticality: 'alarm',
      state: 'active-unacknowledged-acknowledge-not-allowed',
    });
    expect([iconTag(acknowledged), iconTag(acknowledgeNotAllowed)]).toEqual([
      'obc-user-button',
      'obi-alarm-noack-iec',
    ]);
  });

  it('reports the action of its button in cell-click', async () => {
    const el = document.createElement('obc-alert-list-details-experimental');
    el.alerts = [alert('gyro')];
    document.body.append(el);
    await el.updateComplete;
    let detail: ObcAlertListCellClickEvent['detail'] | undefined;
    el.addEventListener('cell-click', (event) => {
      detail = (event as ObcAlertListCellClickEvent).detail;
    });
    el.shadowRoot!.querySelector('obc-table')!.dispatchEvent(
      new CustomEvent('cell-button-click', {
        detail: {rowId: 'gyro', columnKey: 'column-action'},
      })
    );
    expect([detail?.columnKey, detail?.actionId, detail?.alert.id]).toEqual([
      'action',
      'acknowledge',
      'gyro',
    ]);
    el.remove();
  });
});

describe('cellSlots', () => {
  it('lists every row of each slot column and fires only when it changes', async () => {
    const el = document.createElement('obc-alert-list-details-experimental');
    const details: ObcAlertListCellSlotsChangeEvent['detail'][] = [];
    el.addEventListener('cell-slots-change', (event) =>
      details.push((event as ObcAlertListCellSlotsChangeEvent).detail)
    );
    el.columns = [statusColumn(), {key: 'ack', label: 'ACK', slot: true}];
    el.alerts = [
      alert('gyro'),
      alert('radar'),
      alert('power', {memberOf: ['gyro', 'radar']}),
    ];
    document.body.append(el);
    await el.updateComplete;

    expect(el.cellSlots.map((slot) => slot.name)).toEqual([
      'cell-ack:gyro',
      'cell-ack:gyro/power',
      'cell-ack:radar',
      'cell-ack:radar/power',
    ]);
    expect(details).toEqual([el.cellSlots]);

    el.defaultExpanded = false;
    el.alerts = [...el.alerts];
    await el.updateComplete;
    expect(details).toHaveLength(1);

    el.columns = [statusColumn()];
    await el.updateComplete;
    expect(details[details.length - 1]).toEqual([]);
    el.remove();
  });
});

describe('selectedRowId', () => {
  const groupedAlerts = () => [
    alert('gyro'),
    alert('sensor', {memberOf: ['gyro']}),
    alert('radar'),
    alert('power', {memberOf: ['gyro', 'radar']}),
  ];

  async function selectedTableRowIds(
    configure: (el: ObcAlertListDetailsExperimental) => void
  ) {
    const el = document.createElement('obc-alert-list-details-experimental');
    el.alerts = groupedAlerts();
    configure(el);
    document.body.append(el);
    await el.updateComplete;
    const table = el.shadowRoot!.querySelector('obc-table')!;
    const selected = table.data
      .filter((row) => row.selected)
      .map((row) => row.id);
    el.remove();
    return selected;
  }

  it('highlights only the selected row of an alert listed under two groups', async () => {
    expect(
      await selectedTableRowIds((el) => (el.selectedRowId = 'radar/power'))
    ).toEqual(['radar/power']);
  });

  it('highlights the group row when a collapsed group hides the selected row', async () => {
    expect(
      await selectedTableRowIds((el) => {
        el.defaultExpanded = false;
        el.selectedRowId = 'gyro/sensor';
      })
    ).toEqual(['gyro']);
  });

  it('highlights nothing when no row has the selected id', async () => {
    expect(
      await selectedTableRowIds((el) => (el.selectedRowId = 'gyro/missing'))
    ).toEqual([]);
  });
});

describe('alertListCellSlotName', () => {
  it('namespaces the column key and row id', () => {
    expect(alertListCellSlotName('ack', 'gyro/power')).toBe(
      'cell-ack:gyro/power'
    );
  });

  it('keeps names apart when a key or row id contains a dash or colon', () => {
    const [ackRowId, ackARowId] = rowIds([alert('a-b'), alert('b')]);
    expect(alertListCellSlotName('ack', ackRowId)).not.toBe(
      alertListCellSlotName('ack-a', ackARowId)
    );
    expect(alertListCellSlotName('ack:a', 'b')).not.toBe(
      alertListCellSlotName('ack', rowIds([alert('a:b')])[0])
    );
  });
});
