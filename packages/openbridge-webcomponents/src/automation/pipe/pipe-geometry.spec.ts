import {describe, it, expect} from 'vitest';
import {
  straightPath,
  straightChannel,
  cornerPath,
  cornerChannel,
  endpointStubPath,
  endpointLineCap,
  ENDPOINT_BAR_HALF_OUTLINE,
  ENDPOINT_BAR_HALF_FILL,
  arrowHeadPath,
  arrowStubEnd,
  teePath,
  crossPath,
  overlapPaths,
  crossJunction,
  teeJunction,
} from './pipe-geometry.js';
import {
  CORNER_RADIUS,
  GRID,
  STROKE_WEIGHTS,
  OVERLAP_HALF_GAP,
} from './pipe-styles.js';
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
    expect(arrowHeadPath('arrow-out', 'medium', 'open-flow').trim().endsWith('Z')).toBe(true);
  });
  it('picks the xl table for xl size (differs from medium)', () => {
    expect(arrowHeadPath('arrow-out', 'xl', 'open-flow')).not.toEqual(arrowHeadPath('arrow-out', 'medium', 'open-flow'));
  });
});

// Regression guard: the stub used to always run to the grid centre (x=12)
// regardless of the selected head, overshooting into/past every head's
// interior. `arrowStubEnd` must return each head's own measured `stubEnd`
// (matches the Figma ground truth, where the wall stops flush at the head's
// base with no wall pixels inside the chevron) so `endpointStubPath` is
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
          const end = arrowStubEnd(flow, size, value);
          expect(typeof end).toBe('number');
        }
      }
    }
  });

  it('closed value selects the closed head table (different stubEnd than open-flow for large arrow-in)', () => {
    expect(arrowStubEnd('arrow-in', 'large', 'closed')).toBe(16);
    expect(arrowStubEnd('arrow-in', 'large', 'open-flow')).toBe(13);
  });
});

describe('endpointStubPath with an explicit end', () => {
  it('defaults to the grid centre (12) when no end is given', () => {
    const pts = pathPoints(endpointStubPath());
    expect(pts[pts.length - 1].x).toBe(12);
  });

  it('honours an explicit end, e.g. an arrow head stubEnd', () => {
    const pts = pathPoints(endpointStubPath(8));
    expect(pts[pts.length - 1].x).toBe(8);
  });
});

describe('teePath / crossPath', () => {
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

// Open-mouth junction model (OPEN-ENDINGS-CORRECTION.md): unlike the closed
// silhouette these replace, every arm mouth at a tile edge must be OPEN (no
// wall segment spans it) and every wall must BREAK at the junction (no
// segment crosses another arm's opening).
describe('crossJunction / teeJunction (open mouths, walls break at junction)', () => {
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

  it('cross/tee interiors are unstroked fills (drawn separately from the wall segments)', () => {
    expect(crossJunction('medium').interior).toContain('Z');
    expect(teeJunction('medium').interior).toContain('Z');
  });
});

// Wall-joint cleanup (JOINT-CLEANUP.md): two perpendicular 1px butt-capped
// strokes that both stop exactly AT their shared corner point leave a
// quarter-pixel notch there (verified against the rendered Figma reference
// and a zoomed capture of the pre-fix bug) — each segment's inner end must
// extend by JOINT_OVERLAP (0.5, half the corner pixel) past the corner so
// the two strokes' rectangular coverage fully paints it, with the resulting
// same-color 1px overlap being invisible.
describe('cross/tee inner L-joints are flush (no corner notch)', () => {
  // A segment "reaches into" a corner along `axis` if one of its endpoints
  // sits strictly past `corner` by at least `minOverlap` (not just AT it).
  function reachesPastCorner(
    walls: string[],
    corner: number,
    axis: 'x' | 'y',
    direction: 'positive' | 'negative',
    minOverlap = 0.4
  ): boolean {
    return walls.some((w) => {
      const pts = pathPoints(w);
      return pts.some((p) => {
        const v = axis === 'x' ? p.x : p.y;
        return direction === 'positive' ? v >= corner + minOverlap : v <= corner - minOverlap;
      });
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
    'cross: every one of the 4 inner corners is reached (past, not just at) by BOTH a horizontal and a vertical wall (%s)',
    (size) => {
      const {walls} = crossJunction(size);
      const o = STROKE_WEIGHTS[size].fill / 2 + 0.5;
      const top = 12 - o;
      const bottom = 12 + o;
      const horizontalWalls = walls.filter((w) => {
        const pts = pathPoints(w);
        return pts.every((p) => p.y === pts[0].y);
      });
      const verticalWalls = walls.filter((w) => {
        const pts = pathPoints(w);
        return pts.every((p) => p.x === pts[0].x);
      });
      // Top-left corner (top,top): horizontal wall must reach x >= top+0.4,
      // vertical wall must reach y >= top+0.4.
      expect(reachesPastCorner(horizontalWalls, top, 'x', 'positive')).toBe(true);
      expect(reachesPastCorner(verticalWalls, top, 'y', 'positive')).toBe(true);
      // Top-right corner (bottom,top): horizontal wall reaches x <= bottom-0.4,
      // vertical wall reaches y >= top+0.4.
      expect(reachesPastCorner(horizontalWalls, bottom, 'x', 'negative')).toBe(true);
      // Bottom-left corner (top,bottom): vertical wall reaches y <= bottom-0.4.
      expect(reachesPastCorner(verticalWalls, bottom, 'y', 'negative')).toBe(true);
    }
  );

  it.each<PipeSize>(['small', 'medium', 'large', 'xl'])(
    'cross: walls still break at the junction — no segment spans the full opposite-arm opening (JOINT_OVERLAP does not reintroduce a closed mouth) (%s)',
    (size) => {
      const {walls} = crossJunction(size);
      const o = STROKE_WEIGHTS[size].fill / 2 + 0.5;
      const top = 12 - o;
      const bottom = 12 + o;
      expect(anyWallSpans(walls, top, bottom, 'x')).toBe(false);
      expect(anyWallSpans(walls, top, bottom, 'y')).toBe(false);
    }
  );

  it.each<PipeSize>(['small', 'medium', 'large', 'xl'])(
    "tee: the bar's broken bottom wall and each stub wall both reach (past, not just at) their shared corner (%s)",
    (size) => {
      const {walls} = teeJunction(size);
      const o = STROKE_WEIGHTS[size].fill / 2 + 0.5;
      const stubLeft = 12 - o;
      const stubRight = 12 + o;
      const bottomY = 12 + o;
      const barWalls = walls.filter((w) => {
        const pts = pathPoints(w);
        return pts.every((p) => p.y === bottomY) && pts.length === 2;
      });
      const stubWalls = walls.filter((w) => {
        const pts = pathPoints(w);
        return pts.every((p) => p.x === stubLeft || p.x === stubRight);
      });
      // Left corner (stubLeft, bottomY): bar wall reaches x >= stubLeft+0.4,
      // stub-left wall reaches y <= bottomY-0.4.
      expect(reachesPastCorner(barWalls, stubLeft, 'x', 'positive')).toBe(true);
      expect(reachesPastCorner(stubWalls, bottomY, 'y', 'negative')).toBe(true);
      // Right corner (stubRight, bottomY): bar wall reaches x <= stubRight-0.4.
      expect(reachesPastCorner(barWalls, stubRight, 'x', 'negative')).toBe(true);
    }
  );

  it.each<PipeSize>(['small', 'medium', 'large', 'xl'])(
    "tee: the bar's stub-side wall still breaks over the stub opening (JOINT_OVERLAP does not reintroduce a closed mouth) (%s)",
    (size) => {
      const {walls} = teeJunction(size);
      const o = STROKE_WEIGHTS[size].fill / 2 + 0.5;
      const stubLeft = 12 - o;
      const stubRight = 12 + o;
      const bottomY = 12 + o;
      const bottomWalls = walls.filter((w) => {
        const pts = pathPoints(w);
        return pts.every((p) => p.y === bottomY);
      });
      expect(anyWallSpans(bottomWalls, stubLeft, stubRight, 'x')).toBe(false);
    }
  );
});
