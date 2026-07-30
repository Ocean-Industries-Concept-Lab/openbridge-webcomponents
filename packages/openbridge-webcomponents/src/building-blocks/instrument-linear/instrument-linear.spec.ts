import {describe, it, expect} from 'vitest';
import {linearTickInterval} from './instrument-linear.js';

describe('linearTickInterval', () => {
  // The default minSpacing of 16 is load-bearing: it is chosen so the helper
  // independently reproduces the intervals `obc-heave` hard-codes at its
  // natural 336-unit height, while giving the shorter 184-unit gauge inside
  // `obc-pitch-roll-heave` the sparser ladder the design calls for.
  it('reproduces the obc-heave secondary intervals at its natural height', () => {
    expect(linearTickInterval(336, 10)).toBe(1);
    expect(linearTickInterval(336, 5)).toBe(0.5);
  });

  it('thins the ladder on the compact pitch-roll-heave gauge', () => {
    expect(linearTickInterval(184, 10)).toBe(2);
    expect(linearTickInterval(184, 5)).toBe(1);
  });

  it('never returns a step whose spacing falls below minSpacing', () => {
    for (const height of [64, 92, 120, 184, 240, 336, 512]) {
      for (const range of [0.5, 1, 2, 5, 10, 25, 100]) {
        const step = linearTickInterval(height, range);
        expect(step).toBeGreaterThan(0);
        expect((step * height) / (2 * range)).toBeGreaterThanOrEqual(16);
      }
    }
  });

  it('picks the smallest qualifying step on the 1-2-5 ladder', () => {
    for (const height of [64, 184, 336]) {
      for (const range of [1, 5, 10, 60]) {
        const step = linearTickInterval(height, range);
        const smaller = step / (step.toString().startsWith('5') ? 2.5 : 2);
        expect((smaller * height) / (2 * range)).toBeLessThan(16);
      }
    }
  });

  it('returns 0 for degenerate inputs', () => {
    expect(linearTickInterval(0, 10)).toBe(0);
    expect(linearTickInterval(184, 0)).toBe(0);
    expect(linearTickInterval(Number.NaN, 10)).toBe(0);
    expect(linearTickInterval(184, Number.POSITIVE_INFINITY)).toBe(0);
  });
});
