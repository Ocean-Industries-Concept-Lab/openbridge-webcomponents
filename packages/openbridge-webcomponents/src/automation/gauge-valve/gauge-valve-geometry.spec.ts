import {describe, it, expect} from 'vitest';
import {
  CENTER,
  TRACK_INNER_RADIUS,
  TRACK_OUTER_RADIUS,
  TRACK_CORNER_RADIUS,
  TRACK_HALF_SPANS,
  clampPercent,
  inletPercent,
  polarToCartesian,
  arcPath,
  radialLinePath,
  annularSectorPath,
  scaleAngle,
} from './gauge-valve-geometry.js';

function pathPoints(d: string): {x: number; y: number}[] {
  const points: {x: number; y: number}[] = [];
  const commandRe = /([MLA])\s+([^MLAZ]+)/g;
  let match;
  while ((match = commandRe.exec(d)) !== null) {
    const nums = match[2]
      .trim()
      .split(/[\s,]+/)
      .map(Number);
    const [x, y] = nums.slice(-2);
    points.push({x, y});
  }
  return points;
}

function radiusOf(p: {x: number; y: number}): number {
  return Math.hypot(p.x - CENTER, p.y - CENTER);
}

describe('clampPercent', () => {
  it('clamps below 0 and above 100', () => {
    expect(clampPercent(-5)).toBe(0);
    expect(clampPercent(150)).toBe(100);
    expect(clampPercent(42)).toBe(42);
  });
  it('treats non-finite as 0', () => {
    expect(clampPercent(NaN)).toBe(0);
    expect(clampPercent(Infinity)).toBe(100);
  });
});

describe('inletPercent', () => {
  it('sums outlet flows, capped at 100', () => {
    expect(inletPercent(75, 25)).toBe(100);
    expect(inletPercent(80, 60)).toBe(100);
    expect(inletPercent(10, 20)).toBe(30);
  });
  it('clamps each input first', () => {
    expect(inletPercent(-10, 20)).toBe(20);
  });
});

describe('polarToCartesian', () => {
  it("0 deg is 12 o'clock", () => {
    const p = polarToCartesian(100, 0);
    expect(p.x).toBeCloseTo(256);
    expect(p.y).toBeCloseTo(156);
  });
  it("90 deg is 3 o'clock", () => {
    const p = polarToCartesian(100, 90);
    expect(p.x).toBeCloseTo(356);
    expect(p.y).toBeCloseTo(256);
  });
});

describe('arcPath', () => {
  it('starts at start angle and ends at end angle', () => {
    const d = arcPath(141, 60, 120);
    const start = polarToCartesian(141, 60);
    const end = polarToCartesian(141, 120);
    expect(d.startsWith(`M ${start.x} ${start.y}`)).toBe(true);
    expect(d.endsWith(`${end.x} ${end.y}`)).toBe(true);
  });
  it('uses large-arc flag 0 for spans under 180 deg', () => {
    expect(arcPath(141, 60, 120)).toContain(' 0 0 1 ');
  });
});

describe('radialLinePath', () => {
  it('runs from inner to outer radius along one angle', () => {
    const d = radialLinePath(120, 162, 90);
    expect(d.startsWith('M 376 256')).toBe(true);
    expect(d.endsWith('L 418 256')).toBe(true);
  });
});

describe('TRACK_HALF_SPANS', () => {
  it('gives two-way tracks a 45 deg half-span', () => {
    expect(TRACK_HALF_SPANS.twoWay).toBe(45);
  });
  it('gives three-way tracks a 30 deg half-span', () => {
    expect(TRACK_HALF_SPANS.threeWay).toBe(30);
  });
  it('bar and cap share the span so the pill stays flush with the bar end', () => {
    for (const half of [TRACK_HALF_SPANS.twoWay, TRACK_HALF_SPANS.threeWay]) {
      expect((half * 75) / 100).toBeCloseTo(half * 0.75);
    }
  });
});

describe('annularSectorPath', () => {
  const d = annularSectorPath(
    TRACK_INNER_RADIUS,
    TRACK_OUTER_RADIUS,
    90 - 41.2,
    90 + 41.2,
    10
  );

  it('is a closed path starting on the outer radius', () => {
    expect(d.startsWith('M ')).toBe(true);
    expect(d.endsWith('Z')).toBe(true);
    expect(radiusOf(pathPoints(d)[0])).toBeCloseTo(TRACK_OUTER_RADIUS, 2);
  });

  it('outer arc ends on the outer radius, inner arc on the inner radius', () => {
    const points = pathPoints(d);
    expect(radiusOf(points[1])).toBeCloseTo(TRACK_OUTER_RADIUS, 2);
    expect(radiusOf(points[4])).toBeCloseTo(TRACK_INNER_RADIUS, 2);
    expect(radiusOf(points[5])).toBeCloseTo(TRACK_INNER_RADIUS, 2);
  });

  it('keeps every vertex within the annular band', () => {
    for (const p of pathPoints(d)) {
      const r = radiusOf(p);
      expect(r).toBeGreaterThanOrEqual(TRACK_INNER_RADIUS - 0.01);
      expect(r).toBeLessThanOrEqual(TRACK_OUTER_RADIUS + 0.01);
    }
  });

  it('places the radial end cuts at the start and end angles', () => {
    const points = pathPoints(d);
    const endCut = points[3];
    const endAngle =
      (Math.atan2(endCut.x - CENTER, CENTER - endCut.y) * 180) / Math.PI;
    expect(endAngle).toBeCloseTo(90 + 41.2, 2);
    const startCut = points[7];
    const startAngle =
      (Math.atan2(startCut.x - CENTER, CENTER - startCut.y) * 180) / Math.PI;
    expect(startAngle).toBeCloseTo(90 - 41.2, 2);
  });

  it('clamps the corner radius for tiny spans instead of degenerating', () => {
    const tiny = annularSectorPath(
      TRACK_INNER_RADIUS,
      TRACK_OUTER_RADIUS,
      89.9,
      90.1,
      10
    );
    expect(tiny.startsWith('M ')).toBe(true);
    expect(tiny.endsWith('Z')).toBe(true);
    for (const p of pathPoints(tiny)) {
      expect(Number.isFinite(p.x)).toBe(true);
      expect(Number.isFinite(p.y)).toBe(true);
    }
  });

  it('returns an empty path for a non-positive span', () => {
    expect(annularSectorPath(118, 164, 90, 90, 10)).toBe('');
  });

  it('uses a 5px corner radius for track and bar sectors', () => {
    expect(TRACK_CORNER_RADIUS).toBe(5);
  });

  it('spans the full cap sweep for the two-way track container', () => {
    const track = annularSectorPath(
      TRACK_INNER_RADIUS,
      TRACK_OUTER_RADIUS,
      90 - TRACK_HALF_SPANS.twoWay,
      90 + TRACK_HALF_SPANS.twoWay,
      TRACK_CORNER_RADIUS
    );
    const points = pathPoints(track);
    const endCut = points[3];
    const endAngle =
      (Math.atan2(endCut.x - CENTER, CENTER - endCut.y) * 180) / Math.PI;
    expect(endAngle).toBeCloseTo(135, 2);
    const startCut = points[7];
    const startAngle =
      (Math.atan2(startCut.x - CENTER, CENTER - startCut.y) * 180) / Math.PI;
    expect(startAngle).toBeCloseTo(45, 2);
    for (const p of points) {
      const r = radiusOf(p);
      expect(r).toBeGreaterThanOrEqual(TRACK_INNER_RADIUS - 0.01);
      expect(r).toBeLessThanOrEqual(TRACK_OUTER_RADIUS + 0.01);
    }
  });

  it('spans the full cap sweep for the three-way track container', () => {
    const track = annularSectorPath(
      TRACK_INNER_RADIUS,
      TRACK_OUTER_RADIUS,
      90 - TRACK_HALF_SPANS.threeWay,
      90 + TRACK_HALF_SPANS.threeWay,
      TRACK_CORNER_RADIUS
    );
    const points = pathPoints(track);
    const endCut = points[3];
    const endAngle =
      (Math.atan2(endCut.x - CENTER, CENTER - endCut.y) * 180) / Math.PI;
    expect(endAngle).toBeCloseTo(120, 2);
    const startCut = points[7];
    const startAngle =
      (Math.atan2(startCut.x - CENTER, CENTER - startCut.y) * 180) / Math.PI;
    expect(startAngle).toBeCloseTo(60, 2);
  });
});

describe('scaleAngle', () => {
  it('maps 0/50/100 to -30/0/30', () => {
    expect(scaleAngle(0)).toBe(-30);
    expect(scaleAngle(50)).toBe(0);
    expect(scaleAngle(100)).toBe(30);
  });
});
