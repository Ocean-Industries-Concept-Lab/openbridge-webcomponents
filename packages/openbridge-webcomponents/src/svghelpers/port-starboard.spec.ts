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
  PortStarboardSides,
  portStarboardTintedSides,
  portStarboardOrientationSign,
  portStarboardSourceSign,
  PortStarboardSource,
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

describe('portStarboardTintedSides', () => {
  it('paints both halves by default', () => {
    expect(portStarboardTintedSides(PortStarboardSides.both, 1)).toEqual({
      starboard: true,
      port: true,
    });
    expect(portStarboardTintedSides(PortStarboardSides.both, -1)).toEqual({
      starboard: true,
      port: true,
    });
  });

  it('paints a single fixed half regardless of the value', () => {
    expect(portStarboardTintedSides(PortStarboardSides.starboard, -1)).toEqual({
      starboard: true,
      port: false,
    });
    expect(portStarboardTintedSides(PortStarboardSides.port, 1)).toEqual({
      starboard: false,
      port: true,
    });
  });

  it('follows the value direction in active mode, both halves at neutral', () => {
    expect(portStarboardTintedSides(PortStarboardSides.active, 1)).toEqual({
      starboard: true,
      port: false,
    });
    expect(portStarboardTintedSides(PortStarboardSides.active, -1)).toEqual({
      starboard: false,
      port: true,
    });
    expect(portStarboardTintedSides(PortStarboardSides.active, 0)).toEqual({
      starboard: true,
      port: true,
    });
  });
});

describe('portStarboardOrientationSign', () => {
  it('splits the dial at fore and aft', () => {
    expect(portStarboardOrientationSign(90)).toBe(1);
    expect(portStarboardOrientationSign(270)).toBe(-1);
    expect(portStarboardOrientationSign(0)).toBe(0);
    expect(portStarboardOrientationSign(180)).toBe(0);
  });

  it('normalizes angles outside 0-360', () => {
    expect(portStarboardOrientationSign(-90)).toBe(-1);
    expect(portStarboardOrientationSign(450)).toBe(1);
    expect(portStarboardOrientationSign(-270)).toBe(1);
  });

  it('treats missing and non-finite angles as neutral', () => {
    expect(portStarboardOrientationSign(undefined)).toBe(0);
    expect(portStarboardOrientationSign(null)).toBe(0);
    expect(portStarboardOrientationSign(NaN)).toBe(0);
  });
});

describe('portStarboardSourceSign', () => {
  it('reads the magnitude alone for the value source', () => {
    expect(portStarboardSourceSign(PortStarboardSource.value, 270, 50)).toBe(1);
    expect(portStarboardSourceSign(PortStarboardSource.value, 90, -50)).toBe(
      -1
    );
    expect(portStarboardSourceSign(PortStarboardSource.value, 90, 0)).toBe(0);
  });

  it('reads the orientation alone for the orientation source', () => {
    expect(
      portStarboardSourceSign(PortStarboardSource.orientation, 90, -50)
    ).toBe(1);
    expect(
      portStarboardSourceSign(PortStarboardSource.orientation, 270, 50)
    ).toBe(-1);
    // Still starboard with no thrust at all: the pod is aimed that way.
    expect(
      portStarboardSourceSign(PortStarboardSource.orientation, 90, 0)
    ).toBe(1);
  });

  it('flips the orientation when the magnitude is astern for the resultant source', () => {
    // Aimed to starboard, pushing ahead -> pushes to starboard.
    expect(portStarboardSourceSign(PortStarboardSource.resultant, 90, 50)).toBe(
      1
    );
    // Aimed to starboard, pushing astern -> actually pushes to port.
    expect(
      portStarboardSourceSign(PortStarboardSource.resultant, 90, -50)
    ).toBe(-1);
    // Aimed to port, pushing astern -> actually pushes to starboard.
    expect(
      portStarboardSourceSign(PortStarboardSource.resultant, 270, -50)
    ).toBe(1);
  });

  it('is neutral with no magnitude for the resultant source', () => {
    expect(portStarboardSourceSign(PortStarboardSource.resultant, 90, 0)).toBe(
      0
    );
  });

  it('is neutral dead fore and aft for the resultant source', () => {
    expect(portStarboardSourceSign(PortStarboardSource.resultant, 0, 50)).toBe(
      0
    );
    expect(
      portStarboardSourceSign(PortStarboardSource.resultant, 180, 50)
    ).toBe(0);
  });
});
