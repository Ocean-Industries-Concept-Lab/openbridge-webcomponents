import {describe, it, expect} from 'vitest';
import {render} from 'lit';
import {
  formatLinearLabel,
  linearTickInterval,
  watchfaceLinear,
} from './instrument-linear.js';
import {Priority} from '../../navigation-instruments/types.js';

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

describe('watchfaceLinear labels', () => {
  const gauge = (labels: boolean, labelFormatter?: (v: number) => string) =>
    watchfaceLinear(
      {height: 280, width: 72, scaleWidth: 24, minValue: -100, maxValue: 0},
      [],
      undefined,
      {container: 'white'},
      {hideContainer: true, off: false, priority: Priority.regular},
      {
        primaryTickmarkInterval: 25,
        secondaryTickmarkInterval: 5,
        labels,
        labelFormatter,
      },
      []
    );

  const texts = (parts: ReturnType<typeof watchfaceLinear>) => {
    const host = document.createElement('div');
    render(parts, host);
    return [...host.querySelectorAll('text.linear-label')].map((t) => ({
      text: t.textContent?.trim(),
      x: Number(t.getAttribute('x')),
      y: Number(t.getAttribute('y')),
    }));
  };

  it('rounds the floating-point noise of an accumulated ladder away by default', () => {
    expect(formatLinearLabel(0.1 + 0.1 + 0.1)).toBe('0.3');
    expect(formatLinearLabel(-0.30000000000000004)).toBe('-0.3');
    expect(formatLinearLabel(1000)).toBe('1000');
    const parts = watchfaceLinear(
      {height: 280, width: 72, scaleWidth: 24, minValue: -0.5, maxValue: 0},
      [],
      undefined,
      {container: 'white'},
      {hideContainer: true, off: false, priority: Priority.regular},
      {primaryTickmarkInterval: 0.1, labels: true},
      []
    );
    expect(texts(parts).map((l) => l.text)).toEqual([
      '0',
      '-0.1',
      '-0.2',
      '-0.3',
      '-0.4',
      '-0.5',
    ]);
  });

  it('draws nothing without the option', () => {
    expect(texts(gauge(false))).toEqual([]);
  });

  it('labels both ends and the primary ladder, top down, starting past the +x edge', () => {
    const labels = texts(gauge(true, (v) => String(-v)));
    expect(labels.map((l) => l.text)).toEqual(['0', '25', '50', '75', '100']);
    expect(labels.map((l) => l.y)).toEqual([-140, -70, 0, 70, 140]);
    expect(labels.every((l) => l.x === 72 / 2 + 4)).toBe(true);
  });
});
