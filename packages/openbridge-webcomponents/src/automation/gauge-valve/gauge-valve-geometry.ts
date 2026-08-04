/**
 * Geometry for `obc-gauge-valve`, expressed in the shared watch coordinate
 * space: center-origin, outer ring at r 184 (watch.ts OUTER_RING_RADIUS), the
 * space `computeRadialFrame()` builds viewBoxes for. The Figma 6.1 canvas
 * draws the same art on a 512 box whose radii are these values +4; that
 * constant offset is normalized away here so the valve shares the radial
 * instruments' coordinate conventions instead of forking them.
 */

/** Face/outline radius — the watch outer ring. */
export const SCALE_RADIUS = 184;
export const TRACK_INNER_RADIUS = 112;
export const TRACK_OUTER_RADIUS = 160;
export const TRACK_CORNER_RADIUS = 5;

/**
 * Endpoints of the cap pill's stroked centerline. The strokes use round
 * linecaps, so the 8px-wide back stroke extends 4px past each endpoint,
 * making the finished pill cover radii 112-160 — flush with the track.
 */
export const CAP_INNER_RADIUS = 116;
export const CAP_OUTER_RADIUS = 156;

/**
 * Half-span (deg) of each track sector. The light track, the fill bar and the
 * cap pills all share this span so the pill stays flush with the bar end at
 * every value.
 */
export const TRACK_HALF_SPANS: Record<'twoWay' | 'threeWay', number> = {
  twoWay: 45,
  threeWay: 30,
};

export function clampPercent(value: number): number {
  if (Number.isNaN(value)) return 0;
  return Math.min(100, Math.max(0, value));
}

export function inletPercent(value: number, bottomValue: number): number {
  return clampPercent(clampPercent(value) + clampPercent(bottomValue));
}

export function polarToCartesian(
  radius: number,
  angleDeg: number
): {x: number; y: number} {
  const rad = (angleDeg * Math.PI) / 180;
  return {
    x: Math.round(radius * Math.sin(rad) * 1000) / 1000,
    y: Math.round(-radius * Math.cos(rad) * 1000) / 1000,
  };
}

export function radialLinePath(
  innerRadius: number,
  outerRadius: number,
  angleDeg: number
): string {
  const inner = polarToCartesian(innerRadius, angleDeg);
  const outer = polarToCartesian(outerRadius, angleDeg);
  return `M ${inner.x} ${inner.y} L ${outer.x} ${outer.y}`;
}

export function scaleAngle(percent: number): number {
  return -30 + 0.6 * clampPercent(percent);
}
