import {describe, it, expect} from 'vitest';
import {
  FilterModes,
  ObcAlertListCellSlotsChangeEvent,
  ObcAlertListDetailsExperimental,
  alertListCellSlotName,
  getAlertRows,
  statusColumn,
} from './alert-list-details-experimental.js';
import {Alert, AlertType} from '../../types.js';

function alert(id: string, overrides: Partial<Alert> = {}): Alert {
  return {
    id,
    tagId: id,
    source: 'Source',
    text: id,
    acknowledged: false,
    active: true,
    type: AlertType.Warning,
    time: new Date('2024-01-15T14:32:15Z'),
    ...overrides,
  } as Alert;
}

const rowIds = (alerts: Alert[], filterMode = FilterModes.ACTIVE) =>
  getAlertRows(alerts, filterMode).map((row) => row.rowId);

describe('getAlertRows', () => {
  it('gives an ungrouped alert its encoded id as row id', () => {
    const rows = getAlertRows([alert('a/b')], FilterModes.ACTIVE);
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
    const rows = getAlertRows(
      [
        alert('gyro'),
        alert('sensor', {memberOf: ['gyro']}),
        alert('drift', {memberOf: ['sensor']}),
      ],
      FilterModes.ACTIVE
    );
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

  it('makes a member a root when the filter mode hides its group', () => {
    const alerts = [
      alert('group', {active: {rectifiedTime: new Date()}}),
      alert('member', {memberOf: ['group']}),
    ];
    expect(rowIds(alerts, FilterModes.ACTIVE)).toEqual(['member']);
    expect(rowIds(alerts, FilterModes.RECTIFIED)).toEqual(['group']);
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
