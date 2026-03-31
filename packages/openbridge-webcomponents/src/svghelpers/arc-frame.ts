import type {WatchArea} from '../navigation-instruments/watch/watch.js';

export interface ArcViewBox {
  x: number;
  y: number;
  width: number;
  height: number;
  viewBox: string;
}

/**
 * Compute a tight square viewBox that frames the visible arc(s) of a watch,
 * including the centre point (inner content is always visible).
 *
 * The result is a square box (equal width/height) expanded by `margin`
 * expressed as a fraction of the computed extent (0 = no margin, 0.06 ≈ 6%).
 *
 * Angles follow the SVG-watch convention:
 *   0° = 12 o'clock (−Y axis), clockwise.
 *
 * @param areas - Visible arc segments (same array passed to `<obc-watch>`).
 * @param outerRadius - Outer edge radius of the arcs (default `OUTER_RING_RADIUS`).
 * @param extension - Extra radial room beyond `outerRadius` for tickmarks/labels.
 * @param margin - Fraction of the computed extent added as padding (default 0.06).
 */
export function computeArcViewBox(
  areas: WatchArea[],
  outerRadius: number,
  extension: number = 0,
  margin: number = 0.06
): ArcViewBox {
  if (areas.length === 0) {
    const side = (outerRadius + extension) * 2;
    return {
      x: -side / 2,
      y: -side / 2,
      width: side,
      height: side,
      viewBox: `${-side / 2} ${-side / 2} ${side} ${side}`,
    };
  }

  const R = outerRadius + extension;

  let minX = 0;
  let maxX = 0;
  let minY = 0;
  let maxY = 0;

  const expand = (x: number, y: number) => {
    if (x < minX) minX = x;
    if (x > maxX) maxX = x;
    if (y < minY) minY = y;
    if (y > maxY) maxY = y;
  };

  for (const area of areas) {
    const startRad = ((area.startAngle - 90) * Math.PI) / 180;
    const endRad = ((area.endAngle - 90) * Math.PI) / 180;

    expand(R * Math.cos(startRad), R * Math.sin(startRad));
    expand(R * Math.cos(endRad), R * Math.sin(endRad));

    const startDeg = ((area.startAngle % 360) + 360) % 360;
    const endDeg = ((area.endAngle % 360) + 360) % 360;

    const axes = [0, 90, 180, 270];
    for (const axis of axes) {
      if (arcContainsAngle(startDeg, endDeg, axis)) {
        const axisRad = ((axis - 90) * Math.PI) / 180;
        expand(R * Math.cos(axisRad), R * Math.sin(axisRad));
      }
    }
  }

  const rawW = maxX - minX;
  const rawH = maxY - minY;
  const side = Math.max(rawW, rawH);
  const padded = side * (1 + margin * 2);

  const cx = (minX + maxX) / 2;
  const cy = (minY + maxY) / 2;

  const x = cx - padded / 2;
  const y = cy - padded / 2;

  return {
    x: round4(x),
    y: round4(y),
    width: round4(padded),
    height: round4(padded),
    viewBox: `${round4(x)} ${round4(y)} ${round4(padded)} ${round4(padded)}`,
  };
}

function arcContainsAngle(
  startDeg: number,
  endDeg: number,
  testDeg: number
): boolean {
  const s = ((startDeg % 360) + 360) % 360;
  const e = ((endDeg % 360) + 360) % 360;
  const t = ((testDeg % 360) + 360) % 360;
  if (s <= e) {
    return t >= s && t <= e;
  }
  return t >= s || t <= e;
}

function round4(n: number): number {
  return Math.round(n * 10000) / 10000;
}
