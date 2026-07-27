import {describe, expect, it} from 'vitest';
import {
  SpeedDirectionsType,
  SpeedDirectionsFrameStyle,
  speedSteps,
  barLengthUnits,
  chevronCell,
  BAR_MAX_LENGTH,
} from './speed-directions-geometry.js';

describe('speedSteps', () => {
  it('maps knots to 0-3 chevrons via ceil(|v|/step)', () => {
    expect(speedSteps(0, 3)).toBe(0);
    expect(speedSteps(0.1, 3)).toBe(1);
    expect(speedSteps(3, 3)).toBe(1);
    expect(speedSteps(3.1, 3)).toBe(2);
    expect(speedSteps(-7, 3)).toBe(3);
    expect(speedSteps(99, 3)).toBe(3);
  });
  it('guards invalid input', () => {
    expect(speedSteps(NaN, 3)).toBe(0);
    expect(speedSteps(5, 0)).toBe(0);
    expect(speedSteps(5, -1)).toBe(0);
    expect(speedSteps(Infinity, 3)).toBe(0);
  });
});

describe('barLengthUnits', () => {
  it('is proportional and clamped', () => {
    expect(barLengthUnits(0, 9)).toBe(0);
    expect(barLengthUnits(4.5, 9)).toBeCloseTo(BAR_MAX_LENGTH / 2);
    expect(barLengthUnits(-9, 9)).toBe(BAR_MAX_LENGTH);
    expect(barLengthUnits(20, 9)).toBe(BAR_MAX_LENGTH);
  });
  it('guards invalid input', () => {
    expect(barLengthUnits(NaN, 9)).toBe(0);
    expect(barLengthUnits(5, 0)).toBe(0);
  });
});

describe('chevronCell', () => {
  const {alongAthwartArrows, longLatArrows} = SpeedDirectionsType;
  const {standalone, framed, compass} = SpeedDirectionsFrameStyle;
  it('is symmetric fore/aft and stbd/port', () => {
    const fore = chevronCell(alongAthwartArrows, standalone, 'along', true);
    const aft = chevronCell(alongAthwartArrows, standalone, 'along', false);
    expect(fore.cy).toBe(-aft.cy);
    expect(fore.rotationDeg).toBe(0);
    expect(aft.rotationDeg).toBe(180);
    const stbd = chevronCell(alongAthwartArrows, framed, 'athwartBow', true);
    const port = chevronCell(alongAthwartArrows, framed, 'athwartBow', false);
    expect(stbd.cx).toBe(-port.cx);
    expect(stbd.rotationDeg).toBe(90);
    expect(port.rotationDeg).toBe(270);
  });
  it('framed and compass share cells', () => {
    expect(chevronCell(longLatArrows, framed, 'along', true)).toEqual(
      chevronCell(longLatArrows, compass, 'along', true)
    );
  });
  it('matches Figma extractions', () => {
    expect(
      chevronCell(alongAthwartArrows, standalone, 'athwartBow', true)
    ).toEqual({cx: 76, cy: -108, size: 64, rotationDeg: 90});
    expect(chevronCell(alongAthwartArrows, framed, 'along', true)).toEqual({
      cx: 0,
      cy: -96,
      size: 48,
      rotationDeg: 0,
    });
    expect(chevronCell(longLatArrows, framed, 'athwartMid', true)).toEqual({
      cx: 72,
      cy: 0,
      size: 96,
      rotationDeg: 90,
    });
    expect(chevronCell(longLatArrows, standalone, 'along', true)).toEqual({
      cx: 0,
      cy: -80,
      size: 64,
      rotationDeg: 0,
    });
  });
});
