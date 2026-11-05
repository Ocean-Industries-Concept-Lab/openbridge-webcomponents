import {describe, it, expect} from 'vitest';
import {
  getSetpointFillColor,
  SetpointColorMode,
  SetpointVisualState,
} from './setpoint.js';

describe('getSetpointFillColor with a port/starboard sign', () => {
  it('is unchanged when no sign is supplied', () => {
    expect(
      getSetpointFillColor(
        SetpointVisualState.notEqual,
        SetpointColorMode.enhanced
      )
    ).toBe('var(--instrument-enhanced-primary-color)');
    expect(
      getSetpointFillColor(
        SetpointVisualState.notEqual,
        SetpointColorMode.regular
      )
    ).toBe('var(--instrument-regular-primary-color)');
  });

  it('uses the dark port/starboard token for calm states', () => {
    expect(
      getSetpointFillColor(
        SetpointVisualState.notEqual,
        SetpointColorMode.enhanced,
        false,
        1
      )
    ).toBe('var(--instrument-starboard-primary-color)');
    expect(
      getSetpointFillColor(
        SetpointVisualState.equal,
        SetpointColorMode.regular,
        false,
        -1
      )
    ).toBe('var(--instrument-port-primary-color)');
    expect(
      getSetpointFillColor(
        SetpointVisualState.equalZero,
        SetpointColorMode.enhanced,
        false,
        -1
      )
    ).toBe('var(--instrument-port-primary-color)');
  });

  it('never recolors the focus state - interaction feedback stays blue', () => {
    expect(
      getSetpointFillColor(
        SetpointVisualState.focus,
        SetpointColorMode.enhanced,
        false,
        1
      )
    ).toBe('var(--base-blue-100)');
    expect(
      getSetpointFillColor(
        SetpointVisualState.focus,
        SetpointColorMode.regular,
        false,
        -1
      )
    ).toBe('var(--instrument-regular-tertiary-color)');
  });

  it('never overrides the disabled color', () => {
    expect(
      getSetpointFillColor(
        SetpointVisualState.notEqual,
        SetpointColorMode.enhanced,
        true,
        1
      )
    ).toBe('var(--instrument-frame-tertiary-color)');
  });

  it('keeps the priority color at sign 0', () => {
    expect(
      getSetpointFillColor(
        SetpointVisualState.notEqual,
        SetpointColorMode.enhanced,
        false,
        0
      )
    ).toBe('var(--instrument-enhanced-primary-color)');
  });
});
