import {describe, it, expect} from 'vitest';
import {
  hasPortStarboardElement,
  PORT_STARBOARD_DEFAULT_ELEMENTS,
  PORT_STARBOARD_NEUTRAL_DARK_COLOR,
  portStarboardColor,
  PortStarboardElement,
  portStarboardSignOf,
  PortStarboardShade,
  resolvePortStarboardColor,
} from './port-starboard.js';

describe('portStarboardSignOf', () => {
  it('maps value polarity to a sign, treating 0 and non-values as neutral', () => {
    expect(portStarboardSignOf(42)).toBe(1);
    expect(portStarboardSignOf(-0.5)).toBe(-1);
    expect(portStarboardSignOf(0)).toBe(0);
    expect(portStarboardSignOf(undefined)).toBe(0);
    expect(portStarboardSignOf(null)).toBe(0);
    expect(portStarboardSignOf(NaN)).toBe(0);
  });
});

describe('portStarboardColor', () => {
  it('follows the shade rule: light -> secondary token, dark -> primary token', () => {
    expect(portStarboardColor(1, PortStarboardShade.light)).toBe(
      'var(--instrument-starboard-secondary-color)'
    );
    expect(portStarboardColor(1, PortStarboardShade.dark)).toBe(
      'var(--instrument-starboard-primary-color)'
    );
    expect(portStarboardColor(-1, PortStarboardShade.light)).toBe(
      'var(--instrument-port-secondary-color)'
    );
    expect(portStarboardColor(-1, PortStarboardShade.dark)).toBe(
      'var(--instrument-port-primary-color)'
    );
  });

  it('returns undefined at sign 0 so callers keep their priority color', () => {
    expect(portStarboardColor(0, PortStarboardShade.light)).toBeUndefined();
    expect(portStarboardColor(0, PortStarboardShade.dark)).toBeUndefined();
  });

  it('never emits a raw base primitive', () => {
    const all = [
      portStarboardColor(1, PortStarboardShade.light),
      portStarboardColor(1, PortStarboardShade.dark),
      portStarboardColor(-1, PortStarboardShade.light),
      portStarboardColor(-1, PortStarboardShade.dark),
    ];
    for (const color of all) {
      expect(color).not.toMatch(/--base-/);
    }
  });
});

describe('PORT_STARBOARD_DEFAULT_ELEMENTS', () => {
  it('enables every element except the setpoint', () => {
    expect(PORT_STARBOARD_DEFAULT_ELEMENTS).toEqual([
      PortStarboardElement.face,
      PortStarboardElement.bar,
      PortStarboardElement.needle,
      PortStarboardElement.zeroLine,
      PortStarboardElement.arrow,
    ]);
    expect(PORT_STARBOARD_DEFAULT_ELEMENTS).not.toContain(
      PortStarboardElement.setpoint
    );
  });
});

describe('hasPortStarboardElement', () => {
  it('is false whenever the mode is disabled', () => {
    expect(
      hasPortStarboardElement(
        false,
        PORT_STARBOARD_DEFAULT_ELEMENTS,
        PortStarboardElement.bar
      )
    ).toBe(false);
  });

  it('respects the element list when enabled', () => {
    expect(
      hasPortStarboardElement(
        true,
        [PortStarboardElement.bar],
        PortStarboardElement.bar
      )
    ).toBe(true);
    expect(
      hasPortStarboardElement(
        true,
        [PortStarboardElement.bar],
        PortStarboardElement.face
      )
    ).toBe(false);
  });

  it('falls back to the defaults when the list is not an array', () => {
    expect(
      hasPortStarboardElement(true, undefined, PortStarboardElement.bar)
    ).toBe(true);
    expect(
      hasPortStarboardElement(true, undefined, PortStarboardElement.setpoint)
    ).toBe(false);
  });
});

describe('resolvePortStarboardColor', () => {
  const base = {
    enabled: true,
    elements: PORT_STARBOARD_DEFAULT_ELEMENTS,
    element: PortStarboardElement.bar,
    shade: PortStarboardShade.dark,
  };

  it('returns undefined when the element opted out', () => {
    expect(
      resolvePortStarboardColor({
        ...base,
        element: PortStarboardElement.setpoint,
        sign: 1,
      })
    ).toBeUndefined();
  });

  it('returns the mapped token for an enabled element', () => {
    expect(resolvePortStarboardColor({...base, sign: -1})).toBe(
      'var(--instrument-port-primary-color)'
    );
  });

  it('returns neutral gray at sign 0 only for dark elements that ask for it', () => {
    expect(
      resolvePortStarboardColor({...base, sign: 0, neutralDark: true})
    ).toBe(PORT_STARBOARD_NEUTRAL_DARK_COLOR);
    expect(resolvePortStarboardColor({...base, sign: 0})).toBeUndefined();
    expect(
      resolvePortStarboardColor({
        ...base,
        shade: PortStarboardShade.light,
        sign: 0,
        neutralDark: true,
      })
    ).toBeUndefined();
  });
});
