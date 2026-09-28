import {describe, it, expect} from 'vitest';
import type {SVGTemplateResult} from 'lit';
import {concentricGrid} from './concentric-grid.js';

/**
 * The `<line>` and `<circle>` fragments a grid result nests, without rendering
 * it. `concentricGrid()` returns one `SVGTemplateResult` whose `.values` hold
 * the ring array, the centre circle and the spoke array; reaching into those
 * lets the geometry be asserted in plain Node — no DOM.
 */
function fragments(result: SVGTemplateResult): SVGTemplateResult[] {
  const out: SVGTemplateResult[] = [];
  const walk = (value: unknown): void => {
    if (Array.isArray(value)) {
      value.forEach(walk);
    } else if (value && typeof value === 'object' && 'values' in value) {
      out.push(value as SVGTemplateResult);
    }
  };
  result.values.forEach(walk);
  return out;
}

/** The `x1 y1 x2 y2` numbers of every spoke, in emission order. */
function spokeCoordinates(result: SVGTemplateResult): number[][] {
  return fragments(result)
    .filter((f) => f.strings.join('').includes('<line'))
    .map((f) => f.values.filter((v): v is number => typeof v === 'number'));
}

describe('concentricGrid — spokes', () => {
  it('pairs an even count into diameters', () => {
    const spokes = spokeCoordinates(
      concentricGrid({radius: 160, spokes: 4, centerRadius: 0})
    );
    expect(spokes).toHaveLength(2);
    for (const [x1, y1, x2, y2] of spokes) {
      expect(x1).toBeCloseTo(-x2, 6);
      expect(y1).toBeCloseTo(-y2, 6);
    }
  });

  it('draws an odd count as one ray each, from the centre', () => {
    const spokes = spokeCoordinates(
      concentricGrid({radius: 160, spokes: 3, centerRadius: 0})
    );
    expect(spokes).toHaveLength(3);
    const angles = spokes.map(([x1, y1, x2, y2]) => {
      expect(x1).toBe(0);
      expect(y1).toBe(0);
      return Math.round((Math.atan2(x2, -y2) * 180) / Math.PI);
    });
    expect(angles).toEqual([0, 120, -120]);
  });

  it('draws nothing for no spokes', () => {
    expect(
      spokeCoordinates(concentricGrid({radius: 160, spokes: 0}))
    ).toHaveLength(0);
  });
});

describe('concentricGrid — rings', () => {
  it('leaves the outermost division to the band edge when asked', () => {
    const withRing = fragments(
      concentricGrid({radius: 160, divisions: 4, spokes: 0, centerRadius: 0})
    );
    const withoutRing = fragments(
      concentricGrid({
        radius: 160,
        divisions: 4,
        spokes: 0,
        centerRadius: 0,
        hasOuterRing: false,
      })
    );
    expect(withRing).toHaveLength(4);
    expect(withoutRing).toHaveLength(3);
    expect(withRing[withRing.length - 1].values).toContain(160);
    expect(withoutRing[withoutRing.length - 1].values).toContain(120);
  });
});
