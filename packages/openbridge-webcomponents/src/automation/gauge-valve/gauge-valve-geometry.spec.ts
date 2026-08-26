import {describe, it, expect} from 'vitest';
import {
  GaugeValveScalePosition,
  SCALE_ROTATION_DEG,
  TRACK_CORNER_RADIUS,
  TRACK_HALF_SPANS,
  clampPercent,
  inletPercent,
  scaleAngle,
  valveAreas,
  valvePorts,
} from './gauge-valve-geometry.js';

describe('clampPercent', () => {
  it('clamps below 0 and above 100', () => {
    expect(clampPercent(-5)).toBe(0);
    expect(clampPercent(150)).toBe(100);
    expect(clampPercent(42)).toBe(42);
  });
  it('treats non-finite as 0', () => {
    expect(clampPercent(NaN)).toBe(0);
    expect(clampPercent(Infinity)).toBe(100);
  });
});

describe('inletPercent', () => {
  it('sums outlet flows, capped at 100', () => {
    expect(inletPercent(75, 25)).toBe(100);
    expect(inletPercent(80, 60)).toBe(100);
    expect(inletPercent(10, 20)).toBe(30);
  });
  it('clamps each input first', () => {
    expect(inletPercent(-10, 20)).toBe(20);
  });
});

describe('TRACK_HALF_SPANS', () => {
  it('gives two-way tracks a 45 deg half-span', () => {
    expect(TRACK_HALF_SPANS.twoWay).toBe(45);
  });
  it('gives three-way tracks a 30 deg half-span', () => {
    expect(TRACK_HALF_SPANS.threeWay).toBe(30);
  });
});

describe('scaleAngle', () => {
  it('maps 0/50/100 to -30/0/30', () => {
    expect(scaleAngle(0)).toBe(-30);
    expect(scaleAngle(50)).toBe(0);
    expect(scaleAngle(100)).toBe(30);
  });
  it('rotates with the layout', () => {
    expect(
      scaleAngle(50, SCALE_ROTATION_DEG[GaugeValveScalePosition.right])
    ).toBe(90);
    expect(scaleAngle(0, 180)).toBe(150);
  });
});

describe('valvePorts', () => {
  it('orders three-way ports through, bottom, inlet', () => {
    expect(valvePorts(true, 0).map((p) => p.role)).toEqual([
      'through',
      'bottom',
      'inlet',
    ]);
  });
  it('rotates every port with the layout', () => {
    expect(valvePorts(false, 90).map((p) => p.centerAngle)).toEqual([180, 360]);
  });
});

describe('valveAreas', () => {
  it('spans each port by its half-span with the valve corner treatment', () => {
    const [through] = valveAreas(false, 0);
    expect(through).toEqual({
      startAngle: 45,
      endAngle: 135,
      roundOutsideCut: true,
      roundInsideCut: true,
      roundRadius: TRACK_CORNER_RADIUS,
      outlined: true,
    });
  });
  it('rotates sectors with the layout', () => {
    const [through] = valveAreas(false, 270);
    expect(through.startAngle).toBe(315);
    expect(through.endAngle).toBe(405);
  });
});
