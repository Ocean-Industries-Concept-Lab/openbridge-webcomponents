import {describe, expect, it} from 'vitest';
import '../../components/alert-menu-item/alert-menu-item.js';
import {ObcAlertMenuItemStatus} from '../../components/alert-menu-item/alert-menu-item.js';
import {
  alertFilterState,
  alertMenuItemState,
  alertMenuItemStatus,
} from './alert-menu-item-state.js';
import {
  AlertFilterMode,
  alertFilter,
  matchesAlertFilter,
} from '../../alert-filter.js';
import {AlertSetAside} from '../../alert-system/alert-system.js';
import {
  MaritimeAlertCriticality as Maritime,
  MaritimeAlertState as MaritimeState,
} from '../../alert-system/maritime-alert-system.js';
import {
  AutomationAlertCriticality as Automation,
  AutomationAlertState as AutomationState,
} from '../../alert-system/automation-alert-system.js';
import type {StandardAlert} from '../../alert-system/standard-alert.js';
import {alertsInEveryState} from '../../storybook-util.js';

const fields = (id: string) => ({
  id,
  tagId: id,
  source: 'Source',
  text: id,
  time: new Date('2024-01-15T14:30:00Z'),
});

/** Alerts in states the fixture does not cover. */
const MORE_STATES: StandardAlert[] = [
  {
    ...fields('silenced'),
    standard: 'iec-62923',
    criticality: Maritime.Alarm,
    state: MaritimeState.ActiveSilenced,
  },
  {
    ...fields('transferred'),
    standard: 'iec-62923',
    criticality: Maritime.Warning,
    state: MaritimeState.ActiveResponsibilityTransferred,
  },
  {
    ...fields('emergency'),
    standard: 'iec-62923',
    criticality: Maritime.EmergencyAlarm,
    state: MaritimeState.Active,
  },
  {
    ...fields('latched-acked'),
    standard: 'isa-18.2',
    criticality: Automation.High,
    state: AutomationState.LatchedAcknowledged,
  },
  {
    ...fields('latched'),
    standard: 'isa-18.2',
    criticality: Automation.High,
    state: AutomationState.LatchedUnacknowledged,
  },
  {
    ...fields('suppressed'),
    standard: 'isa-18.2',
    criticality: Automation.High,
    state: AutomationState.Unacknowledged,
    setAside: AlertSetAside.Suppressed,
  },
];

describe('alertMenuItemStatus', () => {
  it('picks the status that shows each state', () => {
    expect(
      [...alertsInEveryState(), ...MORE_STATES].map((alert) => [
        alert.id,
        alertMenuItemStatus(alert),
      ])
    ).toEqual([
      ['unacked-active', ObcAlertMenuItemStatus.Unacknowledged],
      ['acked-active', ObcAlertMenuItemStatus.Acknowledged],
      ['unacked-rectified', ObcAlertMenuItemStatus.RectifiedUnacknowledged],
      ['normal', ObcAlertMenuItemStatus.Rectified],
      ['caution', ObcAlertMenuItemStatus.Caution],
      ['no-ack', ObcAlertMenuItemStatus.NoAckWarning],
      ['shelved', ObcAlertMenuItemStatus.Unacknowledged],
      ['blocked', ObcAlertMenuItemStatus.Unacknowledged],
      ['silenced', ObcAlertMenuItemStatus.Unacknowledged],
      ['transferred', ObcAlertMenuItemStatus.NoAckWarning],
      ['emergency', ObcAlertMenuItemStatus.Caution],
      ['latched-acked', ObcAlertMenuItemStatus.Rectified],
      ['latched', ObcAlertMenuItemStatus.RectifiedUnacknowledged],
      ['suppressed', ObcAlertMenuItemStatus.Unacknowledged],
    ]);
  });

  it('gives an item the filter results of its alert', () => {
    const modes = Object.values(AlertFilterMode).filter(
      (mode) => mode !== AlertFilterMode.Custom
    );
    for (const alert of [
      ...alertsInEveryState(),
      ...alertsInEveryState('isa-18.2'),
      ...MORE_STATES,
    ]) {
      const item = document.createElement('obc-alert-menu-item');
      const {shelved, blocked} = alertFilterState(alert);
      item.status = alertMenuItemStatus(alert);
      item.shelved = shelved;
      item.blocked = blocked;
      const state = alertMenuItemState(item);
      for (const mode of modes) {
        expect([alert.id, mode, matchesAlertFilter(state, mode)]).toEqual([
          alert.id,
          mode,
          alertFilter(mode)(alert),
        ]);
      }
    }
  });
});
