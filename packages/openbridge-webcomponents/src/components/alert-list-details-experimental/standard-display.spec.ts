import {afterEach, describe, expect, it} from 'vitest';
import {setAlertStandard} from '../../alert-system/configured-alert-standard.js';
import {
  iec62923AlertStandard,
  type Iec62923Alert,
} from '../../alert-system/iec-62923-alert-standard.js';
import {
  isa182AlertStandard,
  type Isa182Alert,
} from '../../alert-system/isa-18-2-alert-standard.js';
import {
  statusColumn,
  timeColumn,
  typeColumn,
  type StandardAlertWithColumnFields,
} from './alert-list-details-experimental.js';

afterEach(() => setAlertStandard(undefined));

const cellText = (cell: unknown) => (cell as {text?: string}).text;
const cellTitle = (cell: unknown) => (cell as {title?: string}).title;

describe('the columns under IEC 62923', () => {
  const warning = (
    id: string,
    timeOfLastStateChange: string,
    overrides: Partial<Iec62923Alert> = {}
  ) =>
    ({
      id,
      criticality: 'warning',
      state: 'active-unacknowledged',
      alertTitle: 'Off track',
      alertSource: 'ECDIS',
      timeOfLastStateChange: new Date(timeOfLastStateChange),
      ...overrides,
    }) as Iec62923Alert;

  it('shows the source as label, and the alert title followed by the description text', () => {
    setAlertStandard(iec62923AlertStandard);
    const {cell} = statusColumn();
    const described = cell(
      warning('a', '2024-01-15T14:00:00Z', {alertDescriptionText: 'Take helm'})
    );
    expect([cellTitle(described), cellText(described)]).toEqual([
      'ECDIS',
      'Off track – Take helm',
    ]);
    expect(cellText(cell(warning('b', '2024-01-15T14:00:00Z')))).toBe(
      'Off track'
    );
  });

  it('puts the latest state change on top within a sorting rank', () => {
    setAlertStandard(iec62923AlertStandard);
    const {compare, sortDirection} = statusColumn();
    const older = warning('older', '2024-01-15T14:00:00Z');
    const newer = warning('newer', '2024-01-15T14:05:00Z');
    const acknowledgedAlarm = warning('alarm', '2024-01-15T14:10:00Z', {
      criticality: 'alarm',
      state: 'active-acknowledged',
    });
    expect(sortDirection).toBe('desc');
    expect(Math.sign(compare!(newer, older))).toBe(1);
    expect(Math.sign(compare!(older, acknowledgedAlarm))).toBe(1);
  });

  it('heads the time with the last change and shows it in UTC, marked as UTC', () => {
    setAlertStandard(iec62923AlertStandard);
    const column = timeColumn();
    expect(column.label).toBe('Last change');
    expect(cellText(column.cell(warning('a', '2024-01-15T14:32:15Z')))).toBe(
      '14:32:15 UTC'
    );
  });
});

describe('the columns under ISA-18.2', () => {
  const alarmFields = {
    tagName: 'PT-101',
    alarmDescription: 'Separator pressure high',
    alarmType: 'High',
  };
  const unacknowledged: Isa182Alert = {
    id: 'unacknowledged',
    criticality: 'high',
    state: 'unacknowledged',
    ...alarmFields,
    timeAlarmBecameActive: new Date('2024-01-15T14:00:00Z'),
  };
  const shelved: Isa182Alert = {
    id: 'shelved',
    criticality: 'high',
    state: 'shelved-active',
    ...alarmFields,
    timeAlarmWasShelved: new Date('2024-01-15T15:00:00Z'),
  };
  const normal: Isa182Alert = {
    id: 'normal',
    criticality: 'high',
    state: 'normal',
    ...alarmFields,
  };

  it('requires the time each state shows', () => {
    // @ts-expect-error - a shelved alarm carries the time it was shelved
    const shelvedWithoutItsTime: Isa182Alert = {
      id: 'shelved',
      criticality: 'high',
      state: 'shelved-active',
      ...alarmFields,
    };
    expect(shelvedWithoutItsTime.state).toBe('shelved-active');
  });

  it('shows the tag name as label, the description as text and the alarm type', () => {
    setAlertStandard(isa182AlertStandard);
    const status = statusColumn().cell(unacknowledged);
    expect([cellTitle(status), cellText(status)]).toEqual([
      'PT-101',
      'Separator pressure high',
    ]);
    expect(cellText(typeColumn().cell(unacknowledged))).toBe('High');
  });

  it('shows when the alarm became active, or when it was set aside', () => {
    setAlertStandard(isa182AlertStandard);
    const formatter = (time: Date) => time.toISOString();
    const {cell} = timeColumn({formatter});
    expect(
      [unacknowledged, shelved, normal].map((alarm) => cellText(cell(alarm)))
    ).toEqual([
      '2024-01-15T14:00:00.000Z',
      '2024-01-15T15:00:00.000Z',
      undefined,
    ]);
  });

  it('sorts an alarm without a time before the others', () => {
    setAlertStandard(isa182AlertStandard);
    const {compare} = timeColumn();
    expect(Math.sign(compare!(normal, unacknowledged))).toBe(-1);
    expect(Math.sign(compare!(shelved, unacknowledged))).toBe(1);
  });
});

describe('the columns under a standard that names no display fields', () => {
  const alert: StandardAlertWithColumnFields = {
    id: 'a',
    criticality: 'warning',
    state: 'active-unacknowledged',
    text: 'Own text',
    source: 'Own source',
    tagId: 'a',
    time: new Date('2024-01-15T14:32:15Z'),
  };

  it("reads the alert's own text, source and time", () => {
    setAlertStandard({...iec62923AlertStandard, display: undefined});
    const status = statusColumn().cell(alert);
    const formatter = (time: Date) => time.toISOString();
    const column = timeColumn({formatter});
    expect([
      cellTitle(status),
      cellText(status),
      column.label,
      cellText(column.cell(alert)),
    ]).toEqual([
      'Own source',
      'Own text',
      'Activated',
      '2024-01-15T14:32:15.000Z',
    ]);
  });
});
