import type {WatchArea} from '../navigation-instruments/watch/watch.js';

export interface ArcViewBox {
  x: number;
  y: number;
  width: number;
  height: number;
  viewBox: string;
}

export interface ZoomToFitArcFrame extends ArcViewBox {
  radiusOffset: number;
}

/**
 * Compute the optimal radius enlargement and square viewBox so that a
 * partial-arc watch face fills its container instead of leaving empty space.
 *
 * When `zoomToFitArc` is enabled on a clipped watch (e.g. rudder ±45°), the
 * visible arc segment is small relative to the full circle — lots of space
 * is wasted. This function finds a `radiusOffset` that, when added to every
 * radius constant, enlarges the circle so the visible band fills the target
 * viewport. Band thickness, tickmark sizes, and all decorative elements
 * remain unchanged in SVG units; only the curvature flattens because the
 * radius is larger.
 *
 * Uses binary search over `radiusOffset` so that the bounding box of the
 * annular arc (outer + extension … inner) fits within `targetSize × (1 − 2 × margin)`.
 *
 * @param options.areas       Visible arc segments (same array passed to `<obc-watch>`).
 * @param options.outerRadius Base outer ring radius (typically `OUTER_RING_RADIUS`).
 * @param options.innerRadius Base innermost visible radius (depends on `WatchCircleType`).
 * @param options.extension   Extra radial room beyond outer for tickmarks/labels.
 * @param options.targetSize  Default SVG viewport side length, e.g. `(176 + padding) * 2`.
 * @param options.margin      Fraction of computed extent used as padding (default 0.06).
 */
export function computeZoomToFitArcFrame(options: {
  areas: WatchArea[];
  outerRadius: number;
  innerRadius: number;
  extension: number;
  targetSize: number;
  margin?: number;
}): ZoomToFitArcFrame {
  const {
    areas,
    outerRadius,
    innerRadius,
    extension,
    targetSize,
    margin = 0.06,
  } = options;

  if (areas.length === 0) {
    const side = targetSize;
    return {
      radiusOffset: 0,
      x: -side / 2,
      y: -side / 2,
      width: side,
      height: side,
      viewBox: `${-side / 2} ${-side / 2} ${side} ${side}`,
    };
  }

  const available = targetSize * (1 - 2 * margin);

  const measureSize = (radiusOffset: number) => {
    const bbox = computeAnnularArcBBox(
      areas,
      outerRadius + radiusOffset,
      innerRadius + radiusOffset,
      extension
    );
    return Math.max(bbox.xMax - bbox.xMin, bbox.yMax - bbox.yMin);
  };

  // Dynamic upper bound: double until the band bbox exceeds the available space.
  let lo = 0;
  let hi = targetSize;
  for (let i = 0; i < 16 && measureSize(hi) < available; i++) {
    hi *= 2;
  }

  for (let i = 0; i < 50; i++) {
    const mid = (lo + hi) / 2;
    const size = measureSize(mid);
    if (size < available) {
      lo = mid;
    } else {
      hi = mid;
    }
  }

  const radiusOffset = Math.max(0, lo);

  // Final bbox at the computed offset
  const bbox = computeAnnularArcBBox(
    areas,
    outerRadius + radiusOffset,
    innerRadius + radiusOffset,
    extension
  );
  const rawW = bbox.xMax - bbox.xMin;
  const rawH = bbox.yMax - bbox.yMin;
  const side = Math.max(rawW, rawH);
  const padded = side * (1 + margin * 2);

  const cx = (bbox.xMin + bbox.xMax) / 2;
  const cy = (bbox.yMin + bbox.yMax) / 2;

  const x = round4(cx - padded / 2);
  const y = round4(cy - padded / 2);
  const w = round4(padded);
  const h = round4(padded);

  return {
    radiusOffset,
    x,
    y,
    width: w,
    height: h,
    viewBox: `${x} ${y} ${w} ${h}`,
  };
}

/**
 * Bounding box of an annular arc (the visible band between inner and outer radii).
 *
 * Samples arc endpoints and cardinal-axis crossings on both the outermost and
 * innermost circles. The result frames just the band, NOT the circle centre.
 */
function computeAnnularArcBBox(
  areas: WatchArea[],
  outerRadius: number,
  innerRadius: number,
  extension: number
): {xMin: number; xMax: number; yMin: number; yMax: number} {
  const R_vis = outerRadius + extension;
  const R_in = innerRadius;

  let xMin = Infinity;
  let xMax = -Infinity;
  let yMin = Infinity;
  let yMax = -Infinity;

  const expand = (x: number, y: number) => {
    if (x < xMin) xMin = x;
    if (x > xMax) xMax = x;
    if (y < yMin) yMin = y;
    if (y > yMax) yMax = y;
  };

  for (const area of areas) {
    const startRad = (area.startAngle * Math.PI) / 180;
    const endRad = (area.endAngle * Math.PI) / 180;

    for (const R of [R_vis, R_in]) {
      expand(R * Math.sin(startRad), -R * Math.cos(startRad));
      expand(R * Math.sin(endRad), -R * Math.cos(endRad));
    }

    const startNorm = ((area.startAngle % 360) + 360) % 360;
    const endNorm = ((area.endAngle % 360) + 360) % 360;
    const axes = [0, 90, 180, 270];
    for (const axis of axes) {
      if (arcContainsAngle(startNorm, endNorm, axis)) {
        const axisRad = (axis * Math.PI) / 180;
        for (const R of [R_vis, R_in]) {
          expand(R * Math.sin(axisRad), -R * Math.cos(axisRad));
        }
      }
    }
  }

  if (xMin === Infinity) {
    return {xMin: 0, xMax: 0, yMin: 0, yMax: 0};
  }

  return {xMin, xMax, yMin, yMax};
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
