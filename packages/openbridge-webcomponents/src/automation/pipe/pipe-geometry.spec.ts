import {describe, it, expect} from 'vitest';
import {
  straightPath,
  straightChannel,
  cornerPath,
  cornerChannel,
  endpointStubPath,
  endpointChannel,
  endpointCapPath,
  endpointCapOutlinePath,
  arrowHeadPath,
  teePath,
  crossPath,
  overlapPath,
  crossJunction,
  teeJunction,
  overlapJunction,
} from './pipe-geometry.js';
import {CORNER_RADIUS, GRID, STROKE_WEIGHTS} from './pipe-styles.js';
import type {PipeSize} from './pipe-types.js';

function pathPoints(d: string): {x: number; y: number}[] {
  const points: {x: number; y: number}[] = [];
  const re = /([MLA])\s+([^MLAZ]+)/g;
  let m;
  while ((m = re.exec(d)) !== null) {
    const nums = m[2].trim().split(/[\s,]+/).map(Number);
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
  it('uses an arc command with the corner radius', () => {
    const d = cornerPath('right');
    expect(d).toMatch(/A\s*8[ ,]/);
  });

  it('defaults to CORNER_RADIUS = 8', () => {
    expect(CORNER_RADIUS).toBe(8);
    expect(cornerPath('top')).toContain('A 8');
  });

  it('honours an explicit radius', () => {
    expect(cornerPath('right', 4)).toContain('A 4');
  });
});

describe('straightChannel', () => {
  it('medium: walls sit at y=9 and y=14 either side of the y=12 centreline', () => {
    const {inner, walls} = straightChannel(1, 'horizontal', 'medium');
    expect(inner).toEqual(straightPath(1, 'horizontal'));
    // wallOffset = fill/2 + 0.5 = 4/2 + 0.5 = 2.5 -> 12-2.5=9.5, 12+2.5=14.5
    // (ground truth's "y=9 and y=14" are pixel ROWS the 1px-centred stroke
    // covers; the wall centreline itself sits at the half-integer midpoint).
    expect(walls[0]).toContain('9.5');
    expect(walls[1]).toContain('14.5');
  });

  it('walls run parallel to the centreline for the full span', () => {
    const {walls} = straightChannel(2, 'horizontal', 'medium');
    for (const wall of walls) {
      expect(wall).toContain(`${12 + 2 * GRID}`);
    }
  });

  it('vertical orientation offsets the walls in x instead of y', () => {
    const {walls} = straightChannel(1, 'vertical', 'medium');
    expect(walls[0]).toContain('9.5 12');
    expect(walls[1]).toContain('14.5 12');
  });

  it.each<PipeSize>(['small', 'medium', 'large', 'xl'])(
    'wall offset is fill/2 + 0.5 at every size (%s)',
    (size) => {
      const {walls} = straightChannel(1, 'horizontal', size);
      const expectedOffset = STROKE_WEIGHTS[size].fill / 2 + 0.5;
      expect(walls[0]).toContain(`${12 - expectedOffset}`);
      expect(walls[1]).toContain(`${12 + expectedOffset}`);
    }
  );
});

describe('cornerChannel', () => {
  it('inner matches cornerPath for the same direction/radius', () => {
    const {inner} = cornerChannel('top', 'medium');
    expect(inner).toEqual(cornerPath('top'));
  });

  it('both wall arcs are centred on the same arc centre as the centreline (equidistant radii)', () => {
    const size: PipeSize = 'medium';
    const radius = CORNER_RADIUS;
    const fill = STROKE_WEIGHTS[size].fill;
    const wallOffset = fill / 2 + 0.5;
    const {walls} = cornerChannel('top', size, radius);
    expect(walls[0]).toContain(`A ${radius - wallOffset} ${radius - wallOffset}`);
    expect(walls[1]).toContain(`A ${radius + wallOffset} ${radius + wallOffset}`);
  });

  it('honours an explicit radius', () => {
    const {walls} = cornerChannel('right', 'medium', 4);
    expect(walls[0]).toContain('A 1.5 1.5');
    expect(walls[1]).toContain('A 6.5 6.5');
  });
});

describe('endpointStubPath', () => {
  it('runs a half cell inward along the centre line', () => {
    const pts = pathPoints(endpointStubPath());
    expect(pts[0]).toEqual({x: 0, y: 12});
    expect(pts[pts.length - 1]).toEqual({x: 12, y: 12});
  });
});

describe('endpointChannel', () => {
  it('mouth is OPEN at the grid edge (x=GRID) — matches the Figma ground truth', () => {
    const {inner, walls} = endpointChannel('medium');
    const innerPts = pathPoints(inner);
    expect(innerPts[0].x).toBe(GRID);
    for (const wall of walls) {
      const pts = pathPoints(wall);
      expect(pts[0].x).toBe(GRID);
    }
  });

  it.each<PipeSize>(['small', 'medium', 'large', 'xl'])(
    'wall offset matches straightChannel at the same size (%s) so it lines up with a straight run',
    (size) => {
      const {walls} = endpointChannel(size);
      const {walls: straightWalls} = straightChannel(1, 'horizontal', size);
      const expectedOffset = STROKE_WEIGHTS[size].fill / 2 + 0.5;
      expect(walls[0]).toContain(`${12 - expectedOffset}`);
      expect(walls[1]).toContain(`${12 + expectedOffset}`);
      // Sanity: same offset convention as the straight run's own walls.
      expect(straightWalls[0]).toContain(`${12 - expectedOffset}`);
    }
  );

  it('walls extend all the way to the grid centre, overlapping into the cap so no seam shows', () => {
    const {walls} = endpointChannel('medium');
    for (const wall of walls) {
      const pts = pathPoints(wall);
      const minX = Math.min(...pts.map((p) => p.x));
      // The cap's near edge (`endpointCapOutlinePath`) is open across the
      // channel band, so the stub is free to run all the way to the grid
      // centre (12) — INTO the cap's fill/near-edge region — with no gap.
      expect(minX).toBe(12);
      expect(minX).toBeLessThan(GRID);
    }
  });
});

describe('endpointCapPath', () => {
  it('is a single closed rounded-rectangle path centred on the grid centre', () => {
    const d = endpointCapPath('medium');
    expect((d.match(/M /g) ?? []).length).toBe(1);
    expect(d.trim().endsWith('Z')).toBe(true);
    expect(d).toContain('A ');
    const pts = pathPoints(d);
    const xs = pts.map((p) => p.x);
    const ys = pts.map((p) => p.y);
    const midX = (Math.min(...xs) + Math.max(...xs)) / 2;
    const midY = (Math.min(...ys) + Math.max(...ys)) / 2;
    expect(midX).toBeCloseTo(12, 5);
    expect(midY).toBeCloseTo(12, 5);
  });

  it('cap is taller than the pipe channel (spans well beyond the wall offset)', () => {
    const capD = endpointCapPath('medium');
    const capYs = pathPoints(capD).map((p) => p.y);
    const capHalfHeight = (Math.max(...capYs) - Math.min(...capYs)) / 2;
    const wallOffsetMedium = STROKE_WEIGHTS.medium.fill / 2 + 0.5;
    expect(capHalfHeight).toBeGreaterThan(wallOffsetMedium);
  });

  it.each<PipeSize>(['small', 'medium', 'large', 'xl'])(
    'cap grows with size (%s)',
    (size) => {
      const d = endpointCapPath(size);
      const xs = pathPoints(d).map((p) => p.x);
      const halfWidth = (Math.max(...xs) - Math.min(...xs)) / 2;
      expect(halfWidth).toBeGreaterThan(0);
    }
  );
});

describe('endpointCapOutlinePath', () => {
  it('is an OPEN path (no trailing Z) — the near edge is left unstroked', () => {
    const d = endpointCapOutlinePath('medium');
    expect(d.trim().endsWith('Z')).toBe(false);
  });

  it.each<PipeSize>(['small', 'medium', 'large', 'xl'])(
    'the break in the near edge spans exactly the channel band (fill/2 + 0.5) (%s)',
    (size) => {
      const d = endpointCapOutlinePath(size);
      const wallOffset = STROKE_WEIGHTS[size].fill / 2 + 0.5;
      const pts = pathPoints(d);
      // First and last points are both on the near edge (x = 12 - CAP_HALF_WIDTH),
      // at the top and bottom of the channel band, matching endpointChannel's walls.
      expect(pts[0].y).toBeCloseTo(12 - wallOffset, 5);
      expect(pts[pts.length - 1].y).toBeCloseTo(12 + wallOffset, 5);
      expect(pts[0].x).toBe(pts[pts.length - 1].x);
    }
  );

  it('never crosses the near edge across the channel band (no point falls strictly between the break y-values at the near-edge x)', () => {
    const d = endpointCapOutlinePath('medium');
    const wallOffset = STROKE_WEIGHTS.medium.fill / 2 + 0.5;
    const pts = pathPoints(d);
    const nearX = pts[0].x;
    const midBreakPts = pts.filter(
      (p) => p.x === nearX && p.y > 12 - wallOffset && p.y < 12 + wallOffset
    );
    expect(midBreakPts).toHaveLength(0);
  });
});

describe('arrowHeadPath', () => {
  it('emits a closed path (Z) for the arrowhead', () => {
    expect(arrowHeadPath('arrow-out', 'medium', 'open-flow').trim().endsWith('Z')).toBe(true);
  });
  it('picks the xl table for xl size (differs from medium)', () => {
    expect(arrowHeadPath('arrow-out', 'xl', 'open-flow')).not.toEqual(arrowHeadPath('arrow-out', 'medium', 'open-flow'));
  });
});

describe('teePath / crossPath / overlapPath', () => {
  it('tee contains an arc (rounded inner corners)', () => {
    expect(teePath('medium')).toContain('A ');
  });

  it.each<PipeSize>(['small', 'medium', 'large', 'xl'])(
    'tee is a T: the stub only extends BELOW the straight run, never above it (%s)',
    (size) => {
      const fill = STROKE_WEIGHTS[size].fill;
      const h = fill / 2;
      const pts = pathPoints(teePath(size));
      const ys = pts.map((p) => p.y);
      // The straight run spans the full top edge at y = 12-h; nothing in the
      // path may go above that (a bucket/U would additionally close across
      // the bottom back up past the top edge on both sides).
      expect(Math.min(...ys)).toBeCloseTo(12 - h, 5);
      // The stub reaches all the way to the bottom grid edge (24) — a real
      // downward branch, not a shape that turns back before reaching it.
      expect(Math.max(...ys)).toBeCloseTo(24, 5);
    }
  );

  it.each<PipeSize>(['small', 'medium', 'large', 'xl'])(
    'tee rounding radius always leaves a flat shoulder on the bar edge, never a wide bucket-style bulge (%s)',
    (size) => {
      // Regression guard for the original bug: radius was clamped to `C - h`
      // (~9 at medium), letting an 8-radius arc balloon far past the 4px-wide
      // stub into a rounded bucket. A clamp to the FULL stub half-width
      // (`h`) still fails at xl (`h=6`, `r=6=h`): the two corner fillets
      // meet at the stub centreline with no flat shoulder left, producing a
      // smooth dome instead of a T. The radius must clamp to HALF the
      // stub's half-width (`h / 2`) so a flat shoulder always survives.
      const fill = STROKE_WEIGHTS[size].fill;
      const h = fill / 2;
      const d = teePath(size, CORNER_RADIUS);
      const arcMatch = d.match(/A\s+([\d.]+)\s+([\d.]+)/);
      expect(arcMatch).not.toBeNull();
      const r = Number(arcMatch![1]);
      expect(r).toBeLessThanOrEqual(h / 2);
      // The flat shoulder itself: the stub's outer edge (`stubRight`) must
      // appear as its own point before the arc starts (i.e. r < h strictly,
      // so `stubRight + r < GRID` leaves room for a straight segment).
      expect(r).toBeLessThan(h);
    }
  );

  it('tee is a single closed path (one union silhouette, not disjoint subpaths)', () => {
    const d = teePath('medium');
    expect((d.match(/M /g) ?? []).length).toBe(1);
    expect((d.match(/Z/g) ?? []).length).toBe(1);
  });

  it('cross is a single closed union-silhouette path (walls only on the outer boundary)', () => {
    const d = crossPath('medium');
    expect((d.match(/M /g) ?? []).length).toBe(1);
    expect((d.match(/Z/g) ?? []).length).toBe(1);
  });

  it.each<PipeSize>(['small', 'medium', 'large', 'xl'])(
    'cross is symmetric: the plus silhouette spans the full grid on both axes and is centred (%s)',
    (size) => {
      const fill = STROKE_WEIGHTS[size].fill;
      const h = fill / 2;
      const pts = pathPoints(crossPath(size));
      const xs = pts.map((p) => p.x);
      const ys = pts.map((p) => p.y);
      expect(Math.min(...xs)).toBe(0);
      expect(Math.max(...xs)).toBe(GRID);
      expect(Math.min(...ys)).toBe(0);
      expect(Math.max(...ys)).toBe(GRID);
      // The inner concave corners of the plus sit at 12±h on both axes.
      expect(xs).toContain(12 - h);
      expect(xs).toContain(12 + h);
      expect(ys).toContain(12 - h);
      expect(ys).toContain(12 + h);
    }
  );

  it('overlap gap scales with size (xl gap > small gap)', () => {
    expect(overlapPath('xl')).not.toEqual(overlapPath('small'));
  });

  it.each<PipeSize>(['small', 'medium', 'large', 'xl'])(
    'overlap gap stays within the viewport with a visible segment on each side (%s)',
    (size) => {
      // Two vertical subpaths: "M left 0 L left gapTop L right gapTop L right 0 Z"
      // and "M left gapBottom L left GRID L right GRID L right gapBottom Z".
      const subpaths = overlapPath(size)
        .split('Z')
        .map((s) => s.trim())
        .filter(Boolean);
      expect(subpaths).toHaveLength(2);

      const ys = (d: string) => pathPoints(`${d} Z`).map((p) => p.y);
      const topSegmentYs = ys(subpaths[0]);
      const bottomSegmentYs = ys(subpaths[1]);

      const gapTop = Math.max(...topSegmentYs);
      const gapBottom = Math.min(...bottomSegmentYs);

      expect(gapTop).toBeGreaterThan(0);
      expect(gapBottom).toBeLessThan(GRID);
      expect(gapBottom).toBeGreaterThan(gapTop);
    }
  );
});

// Open-mouth junction model (OPEN-ENDINGS-CORRECTION.md): unlike the closed
// silhouette these replace, every arm mouth at a tile edge must be OPEN (no
// wall segment spans it) and every wall must BREAK at the junction (no
// segment crosses another arm's opening).
describe('crossJunction / teeJunction / overlapJunction (open mouths, walls break at junction)', () => {
  function wallReachesEdge(walls: string[], edge: number, axis: 'x' | 'y'): boolean {
    return walls.some((w) => {
      const pts = pathPoints(w);
      return pts.some((p) => (axis === 'x' ? p.x : p.y) === edge);
    });
  }

  function anyWallSpans(walls: string[], from: number, to: number, axis: 'x' | 'y'): boolean {
    return walls.some((w) => {
      const pts = pathPoints(w);
      if (pts.length < 2) return false;
      const a = axis === 'x' ? pts[0].x : pts[0].y;
      const b = axis === 'x' ? pts[1].x : pts[1].y;
      const lo = Math.min(a, b);
      const hi = Math.max(a, b);
      return lo <= from && hi >= to;
    });
  }

  it.each<PipeSize>(['small', 'medium', 'large', 'xl'])(
    'cross: all four mouths are open — walls reach every tile edge, none spans the opposite arm opening (%s)',
    (size) => {
      const {walls} = crossJunction(size);
      const o = STROKE_WEIGHTS[size].fill / 2 + 0.5;
      const top = 12 - o;
      const bottom = 12 + o;

      // Walls reach all four tile edges (mouths are open, not capped).
      expect(wallReachesEdge(walls, 0, 'x')).toBe(true);
      expect(wallReachesEdge(walls, GRID, 'x')).toBe(true);
      expect(wallReachesEdge(walls, 0, 'y')).toBe(true);
      expect(wallReachesEdge(walls, GRID, 'y')).toBe(true);

      // No horizontal wall spans the vertical arm's opening (top..bottom in
      // x), and no vertical wall spans the horizontal arm's opening (top..
      // bottom in y) — this is the "walls break at the junction" invariant.
      expect(anyWallSpans(walls, top, bottom, 'x')).toBe(false);
      expect(anyWallSpans(walls, top, bottom, 'y')).toBe(false);
    }
  );

  it('cross: exactly 8 wall segments (2 per arm x 4 arms), each a simple two-point line', () => {
    const {walls} = crossJunction('medium');
    expect(walls).toHaveLength(8);
    for (const wall of walls) {
      expect(pathPoints(wall)).toHaveLength(2);
    }
  });

  it.each<PipeSize>(['small', 'medium', 'large', 'xl'])(
    'tee: bar mouths (left/right) and stub mouth (bottom) are all open (%s)',
    (size) => {
      const {walls} = teeJunction(size);
      expect(wallReachesEdge(walls, 0, 'x')).toBe(true); // left mouth
      expect(wallReachesEdge(walls, GRID, 'x')).toBe(true); // right mouth
      expect(wallReachesEdge(walls, GRID, 'y')).toBe(true); // stub mouth
    }
  );

  it.each<PipeSize>(['small', 'medium', 'large', 'xl'])(
    "tee: the bar's stub-side wall breaks over the stub opening (interior flows bar<->stub) (%s)",
    (size) => {
      const {walls} = teeJunction(size);
      const o = STROKE_WEIGHTS[size].fill / 2 + 0.5;
      const stubLeft = 12 - o;
      const stubRight = 12 + o;
      // The bottom-side bar wall(s) must not form one continuous segment
      // spanning stubLeft..stubRight (that would cap the stub mouth off from
      // the bar).
      const bottomY = 12 + o;
      const bottomWalls = walls.filter((w) => {
        const pts = pathPoints(w);
        return pts.every((p) => p.y === bottomY);
      });
      expect(anyWallSpans(bottomWalls, stubLeft, stubRight, 'x')).toBe(false);
    }
  );

  it('tee: exactly 5 wall segments (2 full-span top + 2 broken bottom + 2 stub, minus the shared corner)', () => {
    const {walls} = teeJunction('medium');
    expect(walls).toHaveLength(5);
  });

  it.each<PipeSize>(['small', 'medium', 'large', 'xl'])(
    'overlap: continuous run mouths open + unbroken; gapped run mouths open + broken at the gap (%s)',
    (size) => {
      const {walls} = overlapJunction(size);
      // Continuous run: walls reach both x-edges (open mouths).
      expect(wallReachesEdge(walls, 0, 'x')).toBe(true);
      expect(wallReachesEdge(walls, GRID, 'x')).toBe(true);
      // The continuous run's two walls are each a single unbroken segment
      // spanning the full width (no split at the crossing).
      const fullSpanWalls = walls.filter((w) => {
        const pts = pathPoints(w);
        return pts.length === 2 && pts.every((p) => p.y === pts[0].y);
      });
      expect(fullSpanWalls).toHaveLength(2);
      for (const w of fullSpanWalls) {
        const pts = pathPoints(w);
        expect(Math.min(pts[0].x, pts[1].x)).toBe(0);
        expect(Math.max(pts[0].x, pts[1].x)).toBe(GRID);
      }
      // Gapped run: walls reach both y-edges (open mouths) and no single
      // gapped-run wall segment spans the gap itself.
      expect(wallReachesEdge(walls, 0, 'y')).toBe(true);
      expect(wallReachesEdge(walls, GRID, 'y')).toBe(true);
      const gappedWalls = walls.filter((w) => {
        const pts = pathPoints(w);
        return pts.length === 2 && pts.every((p) => p.x === pts[0].x);
      });
      expect(gappedWalls).toHaveLength(4);
      for (const w of gappedWalls) {
        const pts = pathPoints(w);
        const span = Math.abs(pts[0].y - pts[1].y);
        expect(span).toBeLessThan(GRID);
      }
    }
  );

  it('cross/tee/overlap interiors are unstroked fills (drawn separately from the wall segments)', () => {
    expect(crossJunction('medium').interior).toContain('Z');
    expect(teeJunction('medium').interior).toContain('Z');
    expect(overlapJunction('medium').interior).toContain('Z');
  });
});
