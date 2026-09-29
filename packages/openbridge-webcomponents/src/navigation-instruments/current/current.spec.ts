import {describe, it, expect} from 'vitest';
import {clampCurrentSpeed} from './current.js';

describe('clampCurrentSpeed', () => {
  it('rounds to the nearest chevron bucket and clamps to 0–4', () => {
    expect(clampCurrentSpeed(0)).toBe(0);
    expect(clampCurrentSpeed(2.4)).toBe(2);
    expect(clampCurrentSpeed(2.5)).toBe(3);
    expect(clampCurrentSpeed(4)).toBe(4);
    expect(clampCurrentSpeed(7)).toBe(4);
    expect(clampCurrentSpeed(-1)).toBe(0);
  });

  it('passes through null and rejects non-finite values', () => {
    expect(clampCurrentSpeed(null)).toBeNull();
    expect(clampCurrentSpeed(Number.NaN)).toBeNull();
  });
});
