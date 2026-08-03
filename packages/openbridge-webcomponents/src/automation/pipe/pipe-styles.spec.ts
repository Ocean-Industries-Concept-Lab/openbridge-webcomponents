import {describe, it, expect} from 'vitest';
import {
  resolvePipeStroke,
  STROKE_WEIGHTS,
  mediumBorderVar,
  mediumBackgroundVar,
} from './pipe-styles.js';

describe('STROKE_WEIGHTS', () => {
  it('matches the ported table', () => {
    expect(STROKE_WEIGHTS.small).toEqual({outline: 4, fill: 2});
    expect(STROKE_WEIGHTS.medium).toEqual({outline: 6, fill: 4});
    expect(STROKE_WEIGHTS.large).toEqual({outline: 10, fill: 8});
    expect(STROKE_WEIGHTS.xl).toEqual({outline: 14, fill: 12});
  });
});

describe('resolvePipeStroke', () => {
  it('open-flow → tertiary outline + primary fill at size weights', () => {
    const s = resolvePipeStroke('open-flow', 'medium');
    expect(s.outlineVar).toBe('--automation-pipe-tertiary-color');
    expect(s.fillVar).toBe('--automation-pipe-primary-color');
    expect(s.outlineWeight).toBe(6);
    expect(s.fillWeight).toBe(4);
    expect(s.dashPattern).toEqual([]);
  });

  it('open-generic resolves identically to open-flow', () => {
    expect(resolvePipeStroke('open-generic', 'large')).toEqual(
      resolvePipeStroke('open-flow', 'large')
    );
  });

  it('empty → inverted pair', () => {
    const s = resolvePipeStroke('empty', 'small');
    expect(s.outlineVar).toBe('--automation-pipe-tertiary-inverted-color');
    expect(s.fillVar).toBe('--automation-pipe-primary-inverted-color');
  });

  it('enhanced and running use their medium tokens', () => {
    expect(resolvePipeStroke('enhanced', 'medium').fillVar).toBe(
      '--automation-medium-enhanced-background'
    );
    expect(resolvePipeStroke('running', 'medium').outlineVar).toBe(
      '--automation-medium-running-border'
    );
  });

  it('closed → single mid-grey stroke at fill weight, no fill layer', () => {
    const s = resolvePipeStroke('closed', 'large');
    expect(s.outlineVar).toBe('--automation-pipe-tertiary-inverted-color');
    expect(s.outlineWeight).toBe(STROKE_WEIGHTS.large.fill);
    expect(s.fillVar).toBeNull();
    expect(s.fillWeight).toBeNull();
    expect(s.dashPattern).toEqual([]);
  });

  it('closed-dash → square dashes = fill weight on/off', () => {
    const s = resolvePipeStroke('closed-dash', 'medium');
    expect(s.dashPattern).toEqual([
      STROKE_WEIGHTS.medium.fill,
      STROKE_WEIGHTS.medium.fill,
    ]);
  });

  it('medium-flow with no color defaults to the generic Teal pair (border via indirection)', () => {
    const s = resolvePipeStroke('medium-flow', 'medium');
    // border goes through the --pipe-medium-border-<family> indirection so the
    // dusk CSS override (Task 4) can swap 600→500; background is direct.
    expect(s.outlineVar).toBe('--pipe-medium-border-teal');
    expect(s.fillVar).toBe('--base-teal-200');
  });

  it('medium-flow honours the named medium color', () => {
    const s = resolvePipeStroke('medium-flow', 'medium', 'Blue');
    expect(s.outlineVar).toBe('--pipe-medium-border-blue');
    expect(s.fillVar).toBe('--base-blue-200');
  });
});

describe('medium var helpers', () => {
  it('border returns the indirection name; background is direct; special families map', () => {
    expect(mediumBorderVar('Neutral')).toBe('--pipe-medium-border-gray');
    expect(mediumBorderVar('Teal')).toBe('--pipe-medium-border-teal');
    expect(mediumBackgroundVar('Green')).toBe('--base-running-200');
    // Enhanced has no base family: border is the automation token directly
    // (no dusk adjustment), background likewise.
    expect(mediumBorderVar('Enhanced')).toBe(
      '--automation-medium-enhanced-border'
    );
    expect(mediumBackgroundVar('Enhanced')).toBe(
      '--automation-medium-enhanced-background'
    );
  });
});
