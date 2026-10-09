import {describe, expect, it} from 'vitest';
import {AlertSetAside} from './alert-system.js';
import {
  MaritimeAlertCriticality as Maritime,
  MaritimeAlertState as MaritimeState,
} from './maritime-alert-system.js';
import {
  AutomationAlertCriticality as Automation,
  AutomationAlertState as AutomationState,
} from './automation-alert-system.js';
import {compareAlerts, presentAlert, resolveAlert} from './present-alert.js';
import type {StandardAlert, StandardAlertFields} from './standard-alert.js';
import {FlashingSpeed} from '../types.js';

const fields = (id: string, minute = 30): StandardAlertFields => ({
  id,
  tagId: id,
  source: 'Source',
  text: id,
  time: new Date(`2024-01-15T14:${minute}:00Z`),
});

describe('resolveAlert', () => {
  it('reads an alert through the standard it names', () => {
    const high: StandardAlert = {
      ...fields('high'),
      standard: 'isa-18.2',
      criticality: Automation.High,
      state: AutomationState.Unacknowledged,
    };
    expect(resolveAlert(high).system.id).toBe('isa-18.2');
    expect(presentAlert(high).flash).toBe(FlashingSpeed.Fast);
  });

  it('hands setAside to the standard', () => {
    const suppressed: StandardAlert = {
      ...fields('suppressed'),
      standard: 'isa-18.2',
      criticality: Automation.High,
      state: AutomationState.Unacknowledged,
      setAside: AlertSetAside.Suppressed,
    };
    expect(presentAlert(suppressed).flash).toBe(FlashingSpeed.Fixed);
  });
});

describe('compareAlerts', () => {
  const byImportance = (alerts: StandardAlert[]) =>
    [...alerts].sort((a, b) => compareAlerts(b, a)).map((a) => a.id);

  it('puts an unacknowledged warning above an acknowledged alarm (IEC 62923-1 6.4.2.1)', () => {
    expect(
      byImportance([
        {
          ...fields('acked-alarm'),
          standard: 'iec-62923',
          criticality: Maritime.Alarm,
          state: MaritimeState.ActiveAcknowledged,
        },
        {
          ...fields('unacked-warning'),
          standard: 'iec-62923',
          criticality: Maritime.Warning,
          state: MaritimeState.ActiveUnacknowledged,
        },
      ])
    ).toEqual(['unacked-warning', 'acked-alarm']);
  });

  it('puts the newer first among alerts of the same rank', () => {
    const alarm = (id: string, minute: number): StandardAlert => ({
      ...fields(id, minute),
      standard: 'iec-62923',
      criticality: Maritime.Alarm,
      state: MaritimeState.ActiveUnacknowledged,
    });
    expect(byImportance([alarm('older', 10), alarm('newer', 20)])).toEqual([
      'newer',
      'older',
    ]);
  });
});
