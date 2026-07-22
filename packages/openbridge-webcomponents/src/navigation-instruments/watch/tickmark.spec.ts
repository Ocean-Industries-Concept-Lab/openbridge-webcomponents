import {describe, it, expect} from 'vitest';
import type {SVGTemplateResult} from 'lit';
import {tickmark, TickmarkType, TickmarkStyle} from './tickmark.js';

/**
 * Collect every numeric interpolated value from a `tickmark()` result without
 * rendering it. `tickmark()` returns Lit `SVGTemplateResult`s (or an array of
 * them); the interpolated `x`/`y`/coordinate values live on `.values`. This
 * lets us assert the geometry is finite in a plain Node environment — no DOM.
 */
function numericValues(
  result: SVGTemplateResult | SVGTemplateResult[]
): number[] {
  const templates = Array.isArray(result) ? result : [result];
  const numbers: number[] = [];
  for (const template of templates) {
    for (const value of template.values) {
      if (typeof value === 'number') {
        numbers.push(value);
      }
    }
  }
  return numbers;
}

describe('tickmark label positioning', () => {
  // On first paint the element is not laid out yet, so obc-watch computes a
  // scale of 0. A `textOnly` tick still renders a <text>, and dividing by a
  // zero scale used to yield x/y of ±Infinity — which the browser rejects with
  // `<text> attribute x: Expected length, "-Infinity"` (issue #1032).
  it('keeps the zero-value textOnly label finite when the scale is 0', () => {
    const result = tickmark(-90, {
      size: TickmarkType.textOnly,
      style: TickmarkStyle.regular,
      scale: 0,
      text: '0',
      inside: false,
      textRadius: 184,
      maxDigits: 1,
    });

    for (const value of numericValues(result)) {
      expect(Number.isFinite(value)).toBe(true);
    }
  });

  it('keeps labelled ticks finite for a zero scale (inside and outside)', () => {
    for (const inside of [false, true]) {
      const result = tickmark(45, {
        size: TickmarkType.primary,
        style: TickmarkStyle.regular,
        scale: 0,
        text: '50',
        inside,
        textRadius: 184,
        maxDigits: 2,
      });

      for (const value of numericValues(result)) {
        expect(Number.isFinite(value)).toBe(true);
      }
    }
  });

  it('keeps rotated labels finite for a zero scale', () => {
    const result = tickmark(120, {
      size: TickmarkType.primary,
      style: TickmarkStyle.regular,
      scale: 0,
      text: '12',
      inside: false,
      textRadius: 184,
      rotation: 120,
      maxDigits: 2,
    });

    for (const value of numericValues(result)) {
      expect(Number.isFinite(value)).toBe(true);
    }
  });

  it('does not distort geometry for a valid scale', () => {
    // A settled scale must be untouched: the outside zero tick at -90° sits on
    // the negative-x axis, so its x is finite and negative and y is ~0.
    const result = tickmark(-90, {
      size: TickmarkType.textOnly,
      style: TickmarkStyle.regular,
      scale: 1,
      text: '0',
      inside: false,
      textRadius: 184,
      maxDigits: 1,
    });

    const numbers = numericValues(result);
    expect(numbers.every(Number.isFinite)).toBe(true);
    expect(numbers.some((n) => n < -100)).toBe(true);
  });
});
