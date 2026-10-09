import {describe, expect, it} from 'vitest';
import {
  AlertFilterMode,
  alertFilter,
  alertFilterModeData,
  alertFilterState,
  canAcknowledge,
} from './alert-filter.js';
import {
  AlertAcknowledgement,
  AlertCondition,
  AlertSetAside,
} from './alert-system/alert-system.js';
import {
  MaritimeAlertCriticality as Maritime,
  MaritimeAlertState as MaritimeState,
} from './alert-system/maritime-alert-system.js';
import {
  AutomationAlertCriticality as Automation,
  AutomationAlertState as AutomationState,
} from './alert-system/automation-alert-system.js';
import type {
  StandardAlert,
  StandardAlertFields,
} from './alert-system/standard-alert.js';

const fields = (id: string): StandardAlertFields => ({
  id,
  tagId: id,
  source: 'Source',
  text: id,
  time: new Date('2024-01-15T14:32:15Z'),
});

const maritime = (
  id: string,
  criticality: Maritime,
  state: MaritimeState,
  extra: Partial<StandardAlertFields> = {}
): StandardAlert => ({
  ...fields(id),
  standard: 'iec-62923',
  criticality,
  state,
  ...extra,
});

const automation = (
  id: string,
  criticality: Automation,
  state: AutomationState,
  extra: Partial<StandardAlertFields> = {}
): StandardAlert => ({
  ...fields(id),
  standard: 'isa-18.2',
  criticality,
  state,
  ...extra,
});

/** One alert per state the filter modes tell apart, in both standards. */
const EVERY_STATE: StandardAlert[] = [
  maritime('unacked', Maritime.Alarm, MaritimeState.ActiveUnacknowledged),
  maritime('silenced', Maritime.Alarm, MaritimeState.ActiveSilenced),
  maritime('acked', Maritime.Alarm, MaritimeState.ActiveAcknowledged),
  maritime(
    'transferred',
    Maritime.Warning,
    MaritimeState.ActiveResponsibilityTransferred
  ),
  maritime(
    'rectified',
    Maritime.Warning,
    MaritimeState.RectifiedUnacknowledged
  ),
  maritime('normal', Maritime.Alarm, MaritimeState.Normal),
  maritime('caution', Maritime.Caution, MaritimeState.Active),
  maritime('emergency', Maritime.EmergencyAlarm, MaritimeState.Active),
  maritime('no-ack', Maritime.Warning, MaritimeState.ActiveUnacknowledged, {
    noAck: true,
  }),
  maritime('shelved', Maritime.Warning, MaritimeState.ActiveUnacknowledged, {
    setAside: AlertSetAside.Shelved,
  }),
  maritime('blocked', Maritime.Alarm, MaritimeState.ActiveUnacknowledged, {
    setAside: AlertSetAside.Blocked,
  }),
  automation(
    'returned',
    Automation.Medium,
    AutomationState.ReturnedToNormalUnacknowledged
  ),
  automation(
    'latched-acked',
    Automation.High,
    AutomationState.LatchedAcknowledged
  ),
  automation('diagnostic', Automation.Diagnostic, AutomationState.Active),
  automation('suppressed', Automation.High, AutomationState.Unacknowledged, {
    setAside: AlertSetAside.Suppressed,
  }),
  automation('paused', Automation.Low, AutomationState.Unacknowledged, {
    setAside: AlertSetAside.Paused,
  }),
];

const idsIn = (
  mode: AlertFilterMode,
  customFilter?: (a: StandardAlert) => boolean
) => EVERY_STATE.filter(alertFilter(mode, customFilter)).map((a) => a.id);

describe('alertFilterState', () => {
  it('reads the condition and the acknowledgement from the standard', () => {
    const byId = (id: string) => EVERY_STATE.find((a) => a.id === id)!;
    expect(
      [
        'unacked',
        'acked',
        'rectified',
        'normal',
        'caution',
        'latched-acked',
      ].map((id) => {
        const {condition, acknowledgement} = alertFilterState(byId(id));
        return [id, condition, acknowledgement];
      })
    ).toEqual([
      ['unacked', AlertCondition.Active, AlertAcknowledgement.Unacked],
      ['acked', AlertCondition.Active, AlertAcknowledgement.Acked],
      ['rectified', AlertCondition.Cleared, AlertAcknowledgement.Unacked],
      ['normal', AlertCondition.Normal, AlertAcknowledgement.Acked],
      ['caution', AlertCondition.Active, AlertAcknowledgement.None],
      ['latched-acked', AlertCondition.Cleared, AlertAcknowledgement.Acked],
    ]);
  });
});

describe('alertFilter', () => {
  it('all lists every alert', () => {
    expect(idsIn(AlertFilterMode.All)).toEqual(EVERY_STATE.map((a) => a.id));
  });

  it('active lists present conditions that are not set aside', () => {
    expect(idsIn(AlertFilterMode.Active)).toEqual([
      'unacked',
      'silenced',
      'acked',
      'transferred',
      'caution',
      'emergency',
      'no-ack',
      'diagnostic',
    ]);
  });

  it('unacked lists what still waits for an ACK, cleared conditions included', () => {
    expect(idsIn(AlertFilterMode.Unacked)).toEqual([
      'unacked',
      'silenced',
      'transferred',
      'rectified',
      'no-ack',
      'returned',
    ]);
  });

  it('shelved lists what an operator set aside, blocked what the system did', () => {
    expect(idsIn(AlertFilterMode.Shelved)).toEqual(['shelved', 'paused']);
    expect(idsIn(AlertFilterMode.Blocked)).toEqual(['blocked', 'suppressed']);
  });

  it('custom runs the given predicate, and lists every alert without one', () => {
    expect(
      idsIn(AlertFilterMode.Custom, (a) => a.standard === 'isa-18.2')
    ).toEqual([
      'returned',
      'latched-acked',
      'diagnostic',
      'suppressed',
      'paused',
    ]);
    expect(idsIn(AlertFilterMode.Custom)).toEqual(EVERY_STATE.map((a) => a.id));
  });
});

describe('canAcknowledge', () => {
  it('holds for an unacked alert unless it is acknowledged elsewhere or handed over', () => {
    expect(
      EVERY_STATE.filter((a) => canAcknowledge(a)).map((a) => a.id)
    ).toEqual([
      'unacked',
      'silenced',
      'rectified',
      'shelved',
      'blocked',
      'returned',
      'suppressed',
      'paused',
    ]);
  });
});

describe('alertFilterModeData', () => {
  it('names every mode and its empty state', () => {
    for (const mode of Object.values(AlertFilterMode)) {
      const data = alertFilterModeData(mode);
      expect(data.mode).toBe(mode);
      expect(data.title).not.toBe('');
      expect(data.emptyTitle).not.toBe('');
    }
  });
});
