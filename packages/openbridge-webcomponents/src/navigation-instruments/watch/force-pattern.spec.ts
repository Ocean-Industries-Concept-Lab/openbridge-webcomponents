import {describe, it, expect} from 'vitest';
import type {SVGTemplateResult} from 'lit';
import {
  renderWindForcePattern,
  renderCurrentForcePattern,
} from './force-pattern.js';

/**
 * Flatten a Lit SVGTemplateResult (recursing into nested templates) into a
 * single string so geometry and color interpolations can be asserted without
 * a DOM — same no-render approach as tickmark.spec.ts.
 */
function flatten(result: SVGTemplateResult): string {
  let out = '';
  result.strings.forEach((part, i) => {
    out += part;
    const value: unknown = result.values[i];
    if (value == null) return;
    if (typeof value === 'object' && 'strings' in (value as object)) {
      out += flatten(value as SVGTemplateResult);
    } else if (typeof value !== 'object') {
      out += String(value);
    }
  });
  return out;
}

describe('renderWindForcePattern', () => {
  it('is design-neutral at the tile-native direction 315°', () => {
    const flat = flatten(
      renderWindForcePattern({
        fromDirectionDeg: 315,
        radius: 112,
        patternScale: 0.875,
      })
    );
    expect(flat).toContain('rotate(0)');
  });

  it('rotates by fromDirection − 315 and scales the 24-unit tile', () => {
    const flat = flatten(
      renderWindForcePattern({
        fromDirectionDeg: 100,
        radius: 160,
        patternScale: 1.28125,
      })
    );
    expect(flat).toContain('rotate(-215)');
    expect(flat).toContain(String(24 * 1.28125));
    expect(flat).toContain('r=');
    expect(flat).toContain('160');
  });

  it('defaults to the regular tertiary color and honors an override', () => {
    const base = flatten(
      renderWindForcePattern({
        fromDirectionDeg: 0,
        radius: 112,
        patternScale: 0.875,
      })
    );
    expect(base).toContain('--instrument-regular-tertiary-color');
    const enhanced = flatten(
      renderWindForcePattern({
        fromDirectionDeg: 0,
        radius: 112,
        patternScale: 0.875,
        color: 'var(--instrument-enhanced-tertiary-color)',
      })
    );
    expect(enhanced).toContain('--instrument-enhanced-tertiary-color');
  });
});

describe('renderCurrentForcePattern', () => {
  it('rotates by fromDirection and scales the 48-unit tile', () => {
    const flat = flatten(
      renderCurrentForcePattern({
        fromDirectionDeg: 330,
        radius: 160,
        patternScale: 2.0,
      })
    );
    expect(flat).toContain('rotate(330)');
    expect(flat).toContain(String(48 * 2.0));
    expect(flat).toContain('160');
  });

  it('keeps the Figma band phase offset (104 × patternScale)', () => {
    const flat = flatten(
      renderCurrentForcePattern({
        fromDirectionDeg: 0,
        radius: 112,
        patternScale: 1.39,
      })
    );
    expect(flat).toContain(String(-(256 * 1.39) / 2 + 104 * 1.39));
  });

  it('honors wave tuning: length scales the tile, height caps opacity, speed drifts', () => {
    const flat = flatten(
      renderCurrentForcePattern({
        fromDirectionDeg: 0,
        radius: 112,
        patternScale: 2.0,
        waveLength: 0.75,
        waveHeight: 0.6,
        waveSpeed: 0.4,
      })
    );
    expect(flat).toContain(`width=${48 * 2.0 * 0.75}`);
    expect(flat).toContain('stop-opacity=0.6');
    expect(flat).toContain('animateTransform');
    expect(flat).toContain('dur="2.5s"');
  });

  it('is static at full intensity without wave options', () => {
    const flat = flatten(
      renderCurrentForcePattern({
        fromDirectionDeg: 0,
        radius: 112,
        patternScale: 1.39,
      })
    );
    expect(flat).not.toContain('animateTransform');
    expect(flat).toContain('stop-opacity=1');
  });

  it('falls back to full intensity for a non-finite waveHeight', () => {
    const flat = flatten(
      renderCurrentForcePattern({
        fromDirectionDeg: 0,
        radius: 112,
        patternScale: 1.39,
        waveHeight: Number.NaN,
      })
    );
    expect(flat).toContain('stop-opacity=1');
    expect(flat).not.toContain('NaN');
  });
});
