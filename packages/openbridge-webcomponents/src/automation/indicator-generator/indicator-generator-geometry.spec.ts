import {describe, it, expect} from 'vitest';
import {
  arcPath,
  progressSweep,
  polarPoint,
} from './indicator-generator-geometry.js';

describe('progressSweep', () => {
  it('is 0 at level 0', () => {
    expect(progressSweep(0)).toBe(0);
  });

  it('is 360 at level 100', () => {
    expect(progressSweep(100)).toBe(360);
  });

  it('interpolates linearly', () => {
    expect(progressSweep(50)).toBeCloseTo(180);
  });

  it('clamps out-of-range levels', () => {
    expect(progressSweep(150)).toBe(360);
    expect(progressSweep(-10)).toBe(0);
  });
});

describe('polarPoint', () => {
  it('maps angle 0 to the top of the circle', () => {
    expect(polarPoint(24, 24, 18, 0)).toEqual({x: 24, y: 6});
  });

  it('maps angle 90 to the right of the circle', () => {
    expect(polarPoint(24, 24, 18, 90)).toEqual({x: 42, y: 24});
  });

  it('maps angle 180 to the bottom of the circle', () => {
    expect(polarPoint(24, 24, 18, 180)).toEqual({x: 24, y: 42});
  });
});

describe('arcPath', () => {
  it('returns empty string for zero or negative sweep', () => {
    expect(arcPath(24, 24, 18, 0, 0)).toBe('');
    expect(arcPath(24, 24, 18, 90, 45)).toBe('');
  });

  it('uses a single arc segment for sweeps up to 180', () => {
    const d = arcPath(24, 24, 18, 0, 90);
    expect(d.startsWith('M')).toBe(true);
    expect((d.match(/A/g) ?? []).length).toBe(1);
  });

  it('splits sweeps above 180 into two arc segments', () => {
    const d = arcPath(24, 24, 18, 0, 270);
    expect((d.match(/A/g) ?? []).length).toBe(2);
  });

  it('starts at the start angle', () => {
    const d = arcPath(24, 24, 18, 0, 90);
    expect(d.startsWith('M 24 6')).toBe(true);
  });
});
