import {describe, expect, it} from 'vitest';
import {
  computeAtSetpoint,
  deriveRadialSetpointConfig,
  SetpointVisualState,
} from './setpoint.js';
import {
  deriveSetpointVisualState,
  type ExternalScaleConfig,
} from '../building-blocks/external-scale/external-scale.js';
import {InstrumentState, Priority} from '../navigation-instruments/types.js';

const auto = {
  touching: false,
  auto: true,
  deadband: 1,
  atSetpointManual: false,
};

describe('computeAtSetpoint — automatic detection', () => {
  it('is at setpoint within the deadband', () => {
    expect(computeAtSetpoint({...auto, value: 51, setpoint: 50})).toBe(true);
  });
  it('is at setpoint exactly on the deadband boundary', () => {
    expect(
      computeAtSetpoint({...auto, value: 55, setpoint: 50, deadband: 5})
    ).toBe(true);
  });
  it('is away once the distance exceeds the deadband', () => {
    expect(computeAtSetpoint({...auto, value: 52, setpoint: 50})).toBe(false);
  });
  it('a wide deadband accepts a large distance, a tight one rejects a small one', () => {
    expect(
      computeAtSetpoint({...auto, value: 45, setpoint: 50, deadband: 10})
    ).toBe(true);
    expect(
      computeAtSetpoint({...auto, value: 50.5, setpoint: 50, deadband: 0.1})
    ).toBe(false);
  });
  it('touching always reports away', () => {
    expect(
      computeAtSetpoint({...auto, value: 50, setpoint: 50, touching: true})
    ).toBe(false);
  });
  it('is away when value or setpoint is missing', () => {
    expect(computeAtSetpoint({...auto, value: undefined, setpoint: 50})).toBe(
      false
    );
    expect(computeAtSetpoint({...auto, value: 50, setpoint: undefined})).toBe(
      false
    );
  });
});

describe('computeAtSetpoint — manual mode', () => {
  it('returns the manual flag and ignores value, setpoint and deadband', () => {
    expect(
      computeAtSetpoint({
        ...auto,
        auto: false,
        atSetpointManual: true,
        value: 30,
        setpoint: 70,
      })
    ).toBe(true);
    expect(
      computeAtSetpoint({
        ...auto,
        auto: false,
        atSetpointManual: false,
        value: 70,
        setpoint: 70,
      })
    ).toBe(false);
  });
});

describe('zero snap — linear scale', () => {
  const at = (setpoint: number, setpointAtZeroDeadband: number) =>
    deriveSetpointVisualState({
      setpoint,
      setpointAtZeroDeadband,
      value: setpoint,
      touching: false,
      atSetpoint: true,
      autoAtSetpoint: false,
      state: InstrumentState.active,
      priority: Priority.regular,
    } as unknown as ExternalScaleConfig);
  it('snaps a setpoint inside the zero deadband to the zero state', () => {
    expect(at(0.3, 0.5)).toBe(SetpointVisualState.equalZero);
    expect(at(-0.4, 0.5)).toBe(SetpointVisualState.equalZero);
    expect(at(0, 0.5)).toBe(SetpointVisualState.equalZero);
  });
  it('does not snap outside the zero deadband', () => {
    expect(at(0.3, 0.2)).toBe(SetpointVisualState.equal);
    expect(at(0.6, 0.5)).toBe(SetpointVisualState.equal);
  });
});

describe('zero snap — radial', () => {
  const at = (angleSetpoint: number, setpointAtZeroDeadband: number) =>
    deriveRadialSetpointConfig({
      state: InstrumentState.active,
      priority: Priority.regular,
      atSetpoint: true,
      angleSetpoint,
      setpointAtZeroDeadband,
    }).visualState;
  it('mirrors the linear rule', () => {
    expect(at(0.3, 0.5)).toBe(SetpointVisualState.equalZero);
    expect(at(0.6, 0.5)).toBe(SetpointVisualState.equal);
  });
});
