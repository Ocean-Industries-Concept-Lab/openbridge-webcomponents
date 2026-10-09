import {describe, expect, it} from 'vitest';
import {
  AlertFlashPhase,
  alertCountsLabel,
  alertTypeLabel,
  rankAlertCounts,
  resolveFlashingSpeed,
} from './alert-severity.js';
import {
  ALERT_SEVERITY_PRIORITY,
  AlertType,
  FlashingSpeed,
  type AlertCounts,
} from './types.js';

describe('resolveFlashingSpeed', () => {
  it.each([
    [AlertType.LevelCritical, FlashingSpeed.Fast],
    [AlertType.Alarm, FlashingSpeed.Fast],
    [AlertType.LevelHigh, FlashingSpeed.Fast],
    [AlertType.Warning, FlashingSpeed.Slow],
    [AlertType.LevelMedium, FlashingSpeed.Slow],
    [AlertType.LevelLow, FlashingSpeed.VerySlow],
    [AlertType.Caution, FlashingSpeed.Fixed],
    [AlertType.LevelDiagnostic, FlashingSpeed.Fixed],
  ])('default active %s → %s', (type, expected) => {
    expect(resolveFlashingSpeed(FlashingSpeed.Default, type)).toBe(expected);
    expect(
      resolveFlashingSpeed(FlashingSpeed.Default, type, AlertFlashPhase.Active)
    ).toBe(expected);
  });

  it.each([
    [AlertType.LevelCritical, FlashingSpeed.VerySlow],
    [AlertType.Alarm, FlashingSpeed.VerySlow],
    [AlertType.LevelHigh, FlashingSpeed.VerySlow],
    [AlertType.Warning, FlashingSpeed.VerySlow],
    [AlertType.LevelMedium, FlashingSpeed.VerySlow],
    [AlertType.LevelLow, FlashingSpeed.VerySlow],
    [AlertType.Caution, FlashingSpeed.Fixed],
    [AlertType.LevelDiagnostic, FlashingSpeed.Fixed],
  ])('default rectified %s → %s', (type, expected) => {
    expect(
      resolveFlashingSpeed(
        FlashingSpeed.Default,
        type,
        AlertFlashPhase.Rectified
      )
    ).toBe(expected);
  });

  it('returns an explicit speed unchanged', () => {
    expect(resolveFlashingSpeed(FlashingSpeed.Slow, AlertType.Alarm)).toBe(
      FlashingSpeed.Slow
    );
    expect(
      resolveFlashingSpeed(
        FlashingSpeed.Fast,
        AlertType.Caution,
        AlertFlashPhase.Rectified
      )
    ).toBe(FlashingSpeed.Fast);
    expect(resolveFlashingSpeed(FlashingSpeed.Fixed, AlertType.Alarm)).toBe(
      FlashingSpeed.Fixed
    );
  });
});

describe('rankAlertCounts', () => {
  it('keeps positive counts, most severe first', () => {
    expect(
      rankAlertCounts({
        countCaution: 6,
        countLevelDiagnostic: 1,
        countAlarm: 2,
        countWarning: 0,
        countLevelCritical: 1,
        countLevelLow: -3,
      })
    ).toEqual([
      {type: AlertType.LevelCritical, count: 1},
      {type: AlertType.Alarm, count: 2},
      {type: AlertType.Caution, count: 6},
      {type: AlertType.LevelDiagnostic, count: 1},
    ]);
  });

  it('orders every severity by ALERT_SEVERITY_PRIORITY', () => {
    const one: AlertCounts = {
      countLevelDiagnostic: 1,
      countLevelLow: 1,
      countCaution: 1,
      countLevelMedium: 1,
      countWarning: 1,
      countLevelHigh: 1,
      countAlarm: 1,
      countLevelCritical: 1,
    };
    expect(rankAlertCounts(one).map((entry) => entry.type)).toEqual(
      ALERT_SEVERITY_PRIORITY
    );
  });

  it('combines into the total typed as the most severe present', () => {
    expect(
      rankAlertCounts({countWarning: 4, countCaution: 6, countAlarm: 2}, true)
    ).toEqual([{type: AlertType.Alarm, count: 12}]);
  });

  it('returns nothing when nothing is counted', () => {
    expect(rankAlertCounts({})).toEqual([]);
    expect(rankAlertCounts({countAlarm: 0}, true)).toEqual([]);
  });
});

describe('alertTypeLabel', () => {
  it('names every severity', () => {
    for (const type of Object.values(AlertType)) {
      expect(alertTypeLabel(type)).not.toBe('');
    }
    expect(alertTypeLabel(AlertType.LevelHigh)).toBe('High');
  });
});

describe('alertCountsLabel', () => {
  it('lists the ranked counts, then the shelved count', () => {
    expect(
      alertCountsLabel({countCaution: 6, countAlarm: 2, countWarning: 4}, 9)
    ).toBe('2 Alarm, 4 Warning, 6 Caution, 9 Shelved');
  });

  it('is empty when nothing is counted', () => {
    expect(alertCountsLabel({})).toBe('');
  });
});
