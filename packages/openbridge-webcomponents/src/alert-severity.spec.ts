import {describe, expect, it} from 'vitest';
import {AlertFlashPhase, resolveFlashingSpeed} from './alert-severity.js';
import {AlertType, FlashingSpeed} from './types.js';

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
