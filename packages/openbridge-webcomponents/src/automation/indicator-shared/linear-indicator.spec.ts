import {describe, it, expect} from 'vitest';
import {
  clampPercent,
  expandRect,
  fillHeight,
  trendPolylinePoints,
  roundedLeftRectPath,
} from './linear-indicator';

describe('clampPercent', () => {
  it('clamps below 0 to 0', () => {
    expect(clampPercent(-5)).toBe(0);
  });

  it('clamps above 100 to 100', () => {
    expect(clampPercent(140)).toBe(100);
  });

  it('maps NaN to 0', () => {
    expect(clampPercent(Number.NaN)).toBe(0);
  });

  it('passes through in-range values', () => {
    expect(clampPercent(39.29)).toBeCloseTo(39.29);
  });
});

describe('expandRect', () => {
  it('grows the rect by the amount on every side', () => {
    expect(expandRect({x: 9, y: 11, width: 30, height: 26}, 1)).toEqual({
      x: 8,
      y: 10,
      width: 32,
      height: 28,
    });
  });
});

describe('fillHeight', () => {
  const rect = {x: 8, y: 10, width: 32, height: 28};

  it('is 0 at level 0', () => {
    expect(fillHeight(rect, 0)).toBe(0);
  });

  it('is full height at 100', () => {
    expect(fillHeight(rect, 100)).toBe(28);
  });

  it('scales linearly', () => {
    expect(fillHeight(rect, 50)).toBeCloseTo(14);
  });
});

describe('trendPolylinePoints', () => {
  const rect = {x: 10, y: 8, width: 28, height: 32};

  it('returns empty string for fewer than 2 points', () => {
    expect(trendPolylinePoints(rect, [], 23)).toBe('');
    expect(trendPolylinePoints(rect, [50], 23)).toBe('');
  });

  it('spans graphWidth and maps values top-down', () => {
    const points = trendPolylinePoints(rect, [0, 100], 23).split(' ');
    expect(points[0]).toBe('10,40');
    expect(points[1]).toBe('33,8');
  });

  it('clamps out-of-range data', () => {
    const points = trendPolylinePoints(rect, [-20, 150], 23).split(' ');
    expect(points[0]).toBe('10,40');
    expect(points[1]).toBe('33,8');
  });
});

describe('roundedLeftRectPath', () => {
  const rect = {x: 10, y: 8, width: 28, height: 32};

  it('rounds only the two left corners', () => {
    const d = roundedLeftRectPath(rect, 23, 2);
    expect(d.startsWith('M 12 8')).toBe(true);
    expect((d.match(/A/g) ?? []).length).toBe(2);
  });

  it('spans the given width with square right corners', () => {
    const d = roundedLeftRectPath(rect, 23, 2);
    expect(d).toContain('H 33');
    expect(d.endsWith('Z')).toBe(true);
  });
});
