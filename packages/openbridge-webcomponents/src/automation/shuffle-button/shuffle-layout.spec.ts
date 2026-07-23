import {describe, expect, it} from 'vitest';
import {
  clampPosition,
  shuffleSlotCount,
  shuffleWindowOffset,
} from './shuffle-layout.js';

describe('shuffleSlotCount', () => {
  it('is 2n-1 so the selected thumb can sit center with all options on one side', () => {
    expect(shuffleSlotCount(1)).toBe(1);
    expect(shuffleSlotCount(2)).toBe(3);
    expect(shuffleSlotCount(3)).toBe(5);
  });
});

describe('clampPosition', () => {
  it('passes through valid positions', () => {
    expect(clampPosition(3, 0)).toBe(0);
    expect(clampPosition(3, 2)).toBe(2);
  });
  it('clamps out-of-range and rounds non-integers', () => {
    expect(clampPosition(3, -1)).toBe(0);
    expect(clampPosition(3, 7)).toBe(2);
    expect(clampPosition(3, 1.4)).toBe(1);
  });
});

describe('shuffleWindowOffset', () => {
  it('offsets the window so the selected thumb lands in the center slot', () => {
    expect(shuffleWindowOffset(3, 0)).toBe(2);
    expect(shuffleWindowOffset(3, 1)).toBe(1);
    expect(shuffleWindowOffset(3, 2)).toBe(0);
    expect(shuffleWindowOffset(2, 0)).toBe(1);
    expect(shuffleWindowOffset(2, 1)).toBe(0);
    expect(shuffleWindowOffset(1, 0)).toBe(0);
  });
  it('clamps invalid selections', () => {
    expect(shuffleWindowOffset(3, 9)).toBe(0);
    expect(shuffleWindowOffset(3, -4)).toBe(2);
  });
});
