import {describe, it, expect} from 'vitest';
import {
  straightPath,
  straightChannel,
  cornerPath,
  cornerChannel,
  endpointStubPath,
  endpointCapPath,
  arrowHeadPath,
  teePath,
  crossPath,
  overlapPath,
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

describe('endpointCapPath', () => {
  it('outline cap is longer than fill cap (9 vs 8 at medium)', () => {
    const outline = endpointCapPath('medium', 'cap', 'outline');
    const fill = endpointCapPath('medium', 'cap', 'fill');
    // crude length proxy: max |y| in the cap path
    const maxAbsY = (d: string) => Math.max(...pathPoints(d).map((p) => Math.abs(p.y - 12)));
    expect(maxAbsY(outline)).toBeGreaterThan(maxAbsY(fill));
  });

  it('breakoff tilts the cap (x components become non-zero)', () => {
    const straight = endpointCapPath('medium', 'cap', 'outline');
    const tilted = endpointCapPath('medium', 'breakoff', 'outline');
    expect(tilted).not.toEqual(straight);
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
  it('cross contains two move commands (two crossing runs)', () => {
    expect((crossPath('medium').match(/M /g) ?? []).length).toBeGreaterThanOrEqual(2);
  });
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
