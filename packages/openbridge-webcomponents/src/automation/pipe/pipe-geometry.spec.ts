import {describe, it, expect} from 'vitest';
import {
  straightPath,
  cornerPath,
  endpointStubPath,
  endpointLineCap,
  ENDPOINT_BAR_HALF_OUTLINE,
  ENDPOINT_BAR_HALF_FILL,
  arrowHeadPath,
  arrowStubEnd,
  teePath,
  crossPath,
  overlapPaths,
} from './pipe-geometry.js';
import {CORNER_RADIUS, GRID, OVERLAP_HALF_GAP} from './pipe-styles.js';
import type {PipeSize} from './pipe-types.js';

function pathPoints(d: string): {x: number; y: number}[] {
  const points: {x: number; y: number}[] = [];
  const re = /([MLA])\s+([^MLAZ]+)/g;
  let m;
  while ((m = re.exec(d)) !== null) {
    const nums = m[2]
      .trim()
      .split(/[\s,]+/)
      .map(Number);
    const [x, y] = nums.slice(-2);
    points.push({x, y});
  }
  return points;
}

describe('straightPath', () => {
  it('horizontal run starts at the grid centre and spans length*24', () => {
    const d = straightPath(2, 'horizontal');
    const pts = pathPoints(d);
    expect(pts[0]).toEqual({x: 12, y: 12});
    expect(pts[pts.length - 1]).toEqual({x: 12 + 48, y: 12});
  });

  it('vertical run spans length*24 down the grid centre', () => {
    const pts = pathPoints(straightPath(1, 'vertical'));
    expect(pts[0]).toEqual({x: 12, y: 12});
    expect(pts[pts.length - 1]).toEqual({x: 12, y: 12 + 24});
  });
});

describe('cornerPath', () => {
  it('enters at the left edge centreline and leaves at the bottom edge', () => {
    const pts = pathPoints(cornerPath());
    expect(pts[0]).toEqual({x: 0, y: 12});
    expect(pts[pts.length - 1]).toEqual({x: 12, y: 24});
  });

  it('defaults to CORNER_RADIUS = 8', () => {
    expect(CORNER_RADIUS).toBe(8);
    expect(cornerPath()).toContain('A 8');
  });

  it('honours an explicit radius', () => {
    expect(cornerPath(4)).toContain('A 4');
  });
});

// The tee and cross are size-independent CENTRELINE paths stroked twice by
// the component layer (outline-weight pass then fill-weight pass), matching
// the Figma "Connectors" vectors exactly. The subpath structure matters for
// `closed-dash`: run arms are drawn from their tile edge INWARD so the dash
// phase is anchored at the mouths.
describe('teePath / crossPath (Figma centreline model)', () => {
  it('tee is the exact Figma T-centreline: run arms edge-in, branch centre-out', () => {
    expect(teePath()).toBe('M 0 12 L 12 12 M 24 12 L 12 12 M 12 12 L 12 24');
  });

  it('cross is the exact Figma plus-centreline: horizontal arms edge-in, vertical arms centre-out', () => {
    expect(crossPath()).toBe(
      'M 0 12 L 12 12 M 24 12 L 12 12 M 12 12 L 12 0 M 12 12 L 12 24'
    );
  });

  it('every tee mouth ends flush at a tile edge (open, never capped)', () => {
    const pts = pathPoints(teePath());
    const onEdge = pts.filter(
      (p) => p.x === 0 || p.x === GRID || p.y === 0 || p.y === GRID
    );
    // Left mouth, right mouth, bottom (branch) mouth.
    expect(onEdge).toHaveLength(3);
  });

  it('every cross mouth ends flush at a tile edge (open, never capped)', () => {
    const pts = pathPoints(crossPath());
    const onEdge = pts.filter(
      (p) => p.x === 0 || p.x === GRID || p.y === 0 || p.y === GRID
    );
    expect(onEdge).toHaveLength(4);
  });
});

describe('endpointStubPath', () => {
  it('defaults to a half cell inward along the centre line (mouth at x=0, bar at x=12)', () => {
    const pts = pathPoints(endpointStubPath());
    expect(pts[0]).toEqual({x: 0, y: 12});
    expect(pts[pts.length - 1]).toEqual({x: 12, y: 12});
  });

  it('honours an explicit end, e.g. an arrow head stubEnd', () => {
    const pts = pathPoints(endpointStubPath(8));
    expect(pts[pts.length - 1].x).toBe(8);
  });
});

describe('endpoint bar geometry (Figma T-path model)', () => {
  it('outline bar is at least as long as the fill bar at every size (fill sits inside outline)', () => {
    (['small', 'medium', 'large', 'xl'] as PipeSize[]).forEach((size) => {
      expect(ENDPOINT_BAR_HALF_OUTLINE[size]).toBeGreaterThanOrEqual(
        ENDPOINT_BAR_HALF_FILL[size]
      );
    });
  });

  it('uses a round linecap only for medium; small, large & xl are butt (per Figma)', () => {
    expect(endpointLineCap('small')).toBe('butt');
    expect(endpointLineCap('large')).toBe('butt');
    expect(endpointLineCap('xl')).toBe('butt');
    expect(endpointLineCap('medium')).toBe('round');
  });

  it.each<[PipeSize, number, number]>([
    // [size, outline half, fill half] — the exact Figma-measured bar lengths.
    ['small', 9, 8],
    ['medium', 8, 8],
    ['large', 9, 8],
    ['xl', 11, 10],
  ])('bar half-lengths match the Figma vectors (%s)', (size, o, f) => {
    expect(ENDPOINT_BAR_HALF_OUTLINE[size]).toBe(o);
    expect(ENDPOINT_BAR_HALF_FILL[size]).toBe(f);
  });
});

describe('arrowHeadPath', () => {
  it('emits a closed path (Z) for the arrowhead', () => {
    expect(
      arrowHeadPath('arrow-out', 'medium', 'open-flow').trim().endsWith('Z')
    ).toBe(true);
  });
  it('picks the xl table for xl size (differs from medium)', () => {
    expect(arrowHeadPath('arrow-out', 'xl', 'open-flow')).not.toEqual(
      arrowHeadPath('arrow-out', 'medium', 'open-flow')
    );
  });
});

// Regression guard: the stub used to always run to the grid centre (x=12)
// regardless of the selected head, overshooting into/past every head's
// interior. `arrowStubEnd` must return each head's own measured `stubEnd`
// (matches the Figma ground truth, where the stub stops flush at the head's
// base with no stroke pixels inside the chevron) so `endpointStubPath` is
// built with the right length per flow/size/value combination.
describe('arrowStubEnd', () => {
  it.each<['arrow-in' | 'arrow-out', PipeSize, number]>([
    ['arrow-out', 'small', 8],
    ['arrow-out', 'medium', 8],
    ['arrow-out', 'large', 8],
    ['arrow-out', 'xl', 6],
    ['arrow-in', 'small', 10],
    ['arrow-in', 'medium', 10],
    ['arrow-in', 'xl', 13],
  ])('%s at %s size ends at x=%s', (flow, size, expected) => {
    expect(arrowStubEnd(flow, size, 'open-flow')).toBe(expected);
  });

  it('large arrow-in gets a widened stubEnd override (13, not the base table value of 10)', () => {
    expect(arrowStubEnd('arrow-in', 'large', 'open-flow')).toBe(13);
  });

  it('never returns the grid centre (12) as a blanket default — every selection is tuned per head', () => {
    const flows: ('arrow-in' | 'arrow-out')[] = ['arrow-in', 'arrow-out'];
    const sizes: PipeSize[] = ['small', 'medium', 'large', 'xl'];
    for (const flow of flows) {
      for (const size of sizes) {
        for (const value of ['open-flow', 'closed'] as const) {
          expect(arrowStubEnd(flow, size, value)).not.toBe(12);
        }
      }
    }
  });

  it('closed value selects the closed head table (different stubEnd than open-flow for large arrow-in)', () => {
    expect(arrowStubEnd('arrow-in', 'large', 'closed')).toBe(16);
    expect(arrowStubEnd('arrow-in', 'large', 'open-flow')).toBe(13);
  });
});

describe('overlapPaths (Figma two-stroke model)', () => {
  it('continuous run is a single full-height vertical line through the centre', () => {
    const {continuous} = overlapPaths('medium');
    expect((continuous.match(/M /g) ?? []).length).toBe(1);
    const pts = pathPoints(continuous);
    expect(pts.every((p) => p.x === 12)).toBe(true);
    expect(Math.min(...pts.map((p) => p.y))).toBe(0);
    expect(Math.max(...pts.map((p) => p.y))).toBe(GRID);
  });

  it.each<PipeSize>(['small', 'medium', 'large', 'xl'])(
    'gapped run is two horizontal segments with a centred gap of half-width OVERLAP_HALF_GAP (%s)',
    (size) => {
      const {gapped} = overlapPaths(size);
      // Two subpaths (each "M x 12 L x 12"): from each x-edge inward to the gap.
      expect((gapped.match(/M /g) ?? []).length).toBe(2);
      const pts = pathPoints(gapped);
      // All on the centre row.
      expect(pts.every((p) => p.y === 12)).toBe(true);
      // Mouths open at both x-edges.
      const xs = pts.map((p) => p.x);
      expect(xs).toContain(0);
      expect(xs).toContain(GRID);
      // The inner ends sit at 12 ± gap (the gap the continuous run passes over).
      const gap = OVERLAP_HALF_GAP[size];
      expect(xs).toContain(12 - gap);
      expect(xs).toContain(12 + gap);
    }
  );

  it('gap scales with size (xl gap wider than small)', () => {
    expect(OVERLAP_HALF_GAP.xl).toBeGreaterThan(OVERLAP_HALF_GAP.small);
  });
});
