import {describe, it, expect} from 'vitest';
import {straightPath, cornerPath} from './pipe-geometry.js';
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
