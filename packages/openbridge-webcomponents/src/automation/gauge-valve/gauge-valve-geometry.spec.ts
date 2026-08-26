import {describe, it, expect} from 'vitest';
import {
  SCALE_RADIUS,
  TRACK_INNER_RADIUS,
  TRACK_OUTER_RADIUS,
  TRACK_CORNER_RADIUS,
  CAP_INNER_RADIUS,
  CAP_OUTER_RADIUS,
  TRACK_HALF_SPANS,
  clampPercent,
  inletPercent,
  polarToCartesian,
  radialLinePath,
  scaleAngle,
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

describe('polarToCartesian', () => {
  it("0 deg is 12 o'clock, center-origin", () => {
    const p = polarToCartesian(100, 0);
    expect(p.x).toBeCloseTo(0);
    expect(p.y).toBeCloseTo(-100);
  });
  it("90 deg is 3 o'clock", () => {
    const p = polarToCartesian(100, 90);
    expect(p.x).toBeCloseTo(100);
    expect(p.y).toBeCloseTo(0);
  });
});

describe('radialLinePath', () => {
  it('runs from inner to outer radius along one angle', () => {
    const d = radialLinePath(120, 160, 90);
    expect(d.startsWith('M 120 0')).toBe(true);
    expect(d.endsWith('L 160 0')).toBe(true);
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

describe('radii (watch coordinate space)', () => {
  it('places the outline on the shared watch outer ring', () => {
    expect(SCALE_RADIUS).toBe(184);
  });
  it('uses a 5px corner radius for track and bar sectors', () => {
    expect(TRACK_CORNER_RADIUS).toBe(5);
  });
  it('keeps the finished cap pill flush with the track annulus', () => {
    // Round linecaps extend the 8px-wide back stroke 4 units past each
    // endpoint, so the pill covers exactly the track's radial extent.
    expect(CAP_INNER_RADIUS - 4).toBe(TRACK_INNER_RADIUS);
    expect(CAP_OUTER_RADIUS + 4).toBe(TRACK_OUTER_RADIUS);
  });
});

describe('scaleAngle', () => {
  it('maps 0/50/100 to -30/0/30', () => {
    expect(scaleAngle(0)).toBe(-30);
    expect(scaleAngle(50)).toBe(0);
    expect(scaleAngle(100)).toBe(30);
  });
});
