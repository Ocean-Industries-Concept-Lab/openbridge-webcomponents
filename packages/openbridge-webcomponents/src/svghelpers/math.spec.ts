import {describe, it, expect} from 'vitest';
import {
  clamp,
  clampPercent,
  degToRad,
  normalizeAngle,
  radToDeg,
} from './math.js';

describe('clamp', () => {
  it('passes through in-range values', () => {
    expect(clamp(5, 0, 10)).toBe(5);
  });

  it('clamps below min and above max', () => {
    expect(clamp(-1, 0, 10)).toBe(0);
    expect(clamp(11, 0, 10)).toBe(10);
  });

  it('is identical to the min/max idiom it replaces, NaN included', () => {
    for (const v of [-1, 0, 0.5, 3, 10, 10.0001, Infinity, -Infinity, NaN]) {
      expect(clamp(v, 0, 10)).toBe(Math.max(0, Math.min(10, v)));
    }
  });
});

describe('clampPercent', () => {
  it('clamps below 0 and above 100', () => {
    expect(clampPercent(-5)).toBe(0);
    expect(clampPercent(140)).toBe(100);
    expect(clampPercent(42)).toBe(42);
  });

  it('passes through in-range values', () => {
    expect(clampPercent(39.29)).toBeCloseTo(39.29);
  });

  it('treats NaN as 0 and clamps infinite values', () => {
    expect(clampPercent(Number.NaN)).toBe(0);
    expect(clampPercent(Infinity)).toBe(100);
    expect(clampPercent(-Infinity)).toBe(0);
  });
});

describe('normalizeAngle', () => {
  it('wraps into [0, 360)', () => {
    expect(normalizeAngle(0)).toBe(0);
    expect(normalizeAngle(360)).toBe(0);
    expect(normalizeAngle(-360)).toBe(0);
    expect(normalizeAngle(-90)).toBe(270);
    expect(normalizeAngle(450)).toBe(90);
    expect(normalizeAngle(359.5)).toBe(359.5);
  });

  it('never returns negative zero', () => {
    expect(Object.is(normalizeAngle(-0), 0)).toBe(true);
  });

  it('is identical to the modulo idiom it replaces', () => {
    for (const v of [-720.5, -1, 0, 12.34, 360, 719, 1e6, NaN]) {
      expect(normalizeAngle(v)).toBe(((v % 360) + 360) % 360);
    }
  });
});

describe('degToRad / radToDeg', () => {
  it('converts the cardinal angles', () => {
    expect(degToRad(180)).toBe(Math.PI);
    expect(degToRad(90)).toBe(Math.PI / 2);
    expect(degToRad(0)).toBe(0);
    expect(radToDeg(Math.PI)).toBe(180);
  });

  it('is bit-identical to the inline expressions it replaces', () => {
    for (const deg of [-33.7, 0.1, 33.7, 123.456, 359.999]) {
      expect(degToRad(deg)).toBe((deg * Math.PI) / 180);
    }
    for (const rad of [-1.2, 0.001, 0.75, 2.5]) {
      expect(radToDeg(rad)).toBe((rad * 180) / Math.PI);
    }
  });

  it('round-trips', () => {
    expect(radToDeg(degToRad(47.5))).toBeCloseTo(47.5, 12);
  });
});
