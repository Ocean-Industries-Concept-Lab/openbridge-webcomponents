import {describe, it, expect} from 'vitest';
import {
  formatRangeValue,
  yRangeLabelValues,
  measureRangeLabelGutters,
  rangeLabelLineHeight,
} from './range-labels.js';

const font = {family: 'sans-serif', sizePx: 12, weight: '400'};

describe('range label values', () => {
  it('keeps integers integer and non-integers at one decimal', () => {
    expect(formatRangeValue(7, 3, 7)).toBe('7');
    expect(formatRangeValue(3.5, 3.5, 7)).toBe('3.5');
    expect(formatRangeValue(7, 3.5, 7)).toBe('7.0');
  });

  it('adds 0 only when strictly inside the range', () => {
    expect(yRangeLabelValues(-100, 100)).toEqual([-100, 0, 100]);
    expect(yRangeLabelValues(0, 100)).toEqual([0, 100]);
    expect(yRangeLabelValues(3, 7)).toEqual([3, 7]);
  });
});

describe('range label gutters', () => {
  const ctx = document.createElement('canvas').getContext('2d')!;

  it('reserves the widest y label plus the gap, and one line for x', () => {
    const g = measureRangeLabelGutters(
      ctx,
      font,
      ['3', '1000'],
      ['Jan', 'Dec']
    );
    ctx.font = '400 12px sans-serif';
    expect(g.side).toBe(Math.ceil(ctx.measureText('1000').width) + 8);
    expect(g.bottom).toBe(rangeLabelLineHeight(font) + 4);
  });

  it('reserves nothing for an axis without labels', () => {
    expect(measureRangeLabelGutters(ctx, font, [], [])).toEqual({
      side: 0,
      bottom: 0,
    });
  });
});
