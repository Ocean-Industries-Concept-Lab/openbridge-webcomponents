import {describe, expect, it} from 'vitest';
import {roundedRectPath} from './rounded-rect.js';

describe('roundedRectPath', () => {
  it('draws square corners for zero radii', () => {
    expect(
      roundedRectPath({x: 0, y: 0, width: 100, height: 50, radii: [0, 0, 0, 0]})
    ).toBe('M0 0 H100 V50 H0 V0 Z');
  });

  it('draws a clockwise arc per rounded corner', () => {
    expect(
      roundedRectPath({
        x: 1,
        y: 1,
        width: 100,
        height: 50,
        radii: [10, 10, 10, 10],
      })
    ).toBe(
      'M11 1 H91 A10 10 0 0 1 101 11 V41 A10 10 0 0 1 91 51 H11 A10 10 0 0 1 1 41 V11 A10 10 0 0 1 11 1 Z'
    );
  });

  it('keeps individual corners square', () => {
    const d = roundedRectPath({
      x: 0,
      y: 0,
      width: 100,
      height: 50,
      radii: [0, 8, 0, 8],
    });
    expect(d.startsWith('M0 0 H92 A8 8 0 0 1 100 8 V50 H8')).toBe(true);
  });

  it('clamps radii to half the shorter side', () => {
    const d = roundedRectPath({
      x: 0,
      y: 0,
      width: 100,
      height: 20,
      radii: [50, 50, 50, 50],
    });
    expect(d).toContain('A10 10 0 0 1');
    expect(d).not.toContain('A50');
  });
});
