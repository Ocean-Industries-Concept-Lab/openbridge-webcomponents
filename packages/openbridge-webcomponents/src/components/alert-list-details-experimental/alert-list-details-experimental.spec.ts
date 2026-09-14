import {describe, it, expect} from 'vitest';
import {
  AlertListMode,
  alertListCellSlotName,
  getAlertRows,
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

const rowIds = (alerts: Alert[], mode = AlertListMode.ALL) =>
  getAlertRows(alerts, mode).map((row) => row.rowId);

describe('getAlertRows', () => {
  it('gives an ungrouped alert its encoded id as row id', () => {
    const rows = getAlertRows([alert('a/b')], AlertListMode.ALL);
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
      AlertListMode.ALL
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

  it('makes a member a root when the mode filters its group out', () => {
    const alerts = [
      alert('group', {active: {rectifiedTime: new Date()}}),
      alert('member', {memberOf: ['group']}),
    ];
    expect(rowIds(alerts, AlertListMode.ALL)).toEqual(['member']);
    expect(rowIds(alerts, AlertListMode.RECTIFIED)).toEqual(['group']);
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

describe('alertListCellSlotName', () => {
  it('namespaces the column key and row id', () => {
    expect(alertListCellSlotName('ack', 'gyro/power')).toBe(
      'cell-ack-gyro/power'
    );
  });
});
