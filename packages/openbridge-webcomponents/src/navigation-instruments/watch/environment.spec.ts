import {describe, it, expect} from 'vitest';
import type {SVGTemplateResult} from 'lit';
import {renderCurrentCentered} from './environment.js';

/**
 * Flatten a Lit SVGTemplateResult (recursing into nested templates) into a
 * single string so geometry interpolations can be asserted without a DOM —
 * same no-render approach as tickmark.spec.ts.
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

describe('renderCurrentCentered', () => {
  it('centers the icon, rotates 180+direction, applies the scale', () => {
    const flat = flatten(
      renderCurrentCentered({current: 3, fromDirectionDeg: 330, scale: 7})
    );
    expect(flat).toContain('rotate(510)');
    expect(flat).toContain('scale(7)');
    expect(flat).toContain('translate(-12 -12)');
  });

  it('renders nothing for an unknown chevron bucket', () => {
    const flat = flatten(
      renderCurrentCentered({current: 9, fromDirectionDeg: 0, scale: 7})
    );
    expect(flat.trim()).toBe('');
  });
});
