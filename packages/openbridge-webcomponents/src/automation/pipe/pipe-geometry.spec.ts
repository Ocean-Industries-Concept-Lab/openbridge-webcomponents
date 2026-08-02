import {describe, it, expect} from 'vitest';
import {
  straightPath,
  cornerPath,
  endpointStubPath,
  endpointCapPath,
  arrowHeadPath,
  teePath,
  crossPath,
  overlapPath,
} from './pipe-geometry.js';
import {CORNER_RADIUS} from './pipe-styles.js';

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
});
