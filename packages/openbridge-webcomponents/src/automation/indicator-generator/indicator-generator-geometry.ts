export const BUTTON_SILHOUETTE_RADIUS = 18.5;
export const DISC_RADIUS = 17.5;
export const FILLED_DISC_RADIUS = 18.5;
export const BAR_SILHOUETTE_RADIUS = 19.5;
export const BAR_SILHOUETTE_STROKE_WIDTH = 3;
export const BAR_OUTLINE_RADIUS = 16.5;
export const DOUBLE_BAR_OUTLINE_RADIUS = 17.5;
export const OUTLINE_STROKE_WIDTH = 3;
export const BAR_TRACK_RADIUS = 18;
export const BAR_TRACK_STROKE_WIDTH = 4;
export const DOUBLE_BAR_OUTER_RADIUS = 22;
export const DOUBLE_BAR_OUTER_STROKE_WIDTH = 4;
export const DOUBLE_BAR_INNER_RADIUS = 18;
export const DOUBLE_BAR_INNER_STROKE_WIDTH = 2;

export function clampPercent(value: number): number {
  if (Number.isNaN(value)) return 0;
  return Math.min(100, Math.max(0, value));
}

/** Sweep (deg) of the progress arc, clockwise from 12 o'clock. */
export function progressSweep(level: number): number {
  return (360 * clampPercent(level)) / 100;
}

/** Point on a circle; angle in degrees clockwise from 12 o'clock. */
export function polarPoint(
  cx: number,
  cy: number,
  radius: number,
  angleDeg: number
): {x: number; y: number} {
  const rad = (angleDeg * Math.PI) / 180;
  return {
    x: Math.round((cx + radius * Math.sin(rad)) * 1000) / 1000,
    y: Math.round((cy - radius * Math.cos(rad)) * 1000) / 1000,
  };
}

/**
 * Circular arc path from startAngle to endAngle (deg, clockwise from
 * 12 o'clock), meant to be stroked. Sweeps above 180° are split into two
 * arc segments; non-positive sweeps yield an empty string. Full circles
 * (sweep 360) should be drawn with a `<circle>` element instead.
 */
export function arcPath(
  cx: number,
  cy: number,
  radius: number,
  startAngleDeg: number,
  endAngleDeg: number
): string {
  const sweep = endAngleDeg - startAngleDeg;
  if (sweep <= 0) return '';
  const start = polarPoint(cx, cy, radius, startAngleDeg);
  if (sweep > 180) {
    const mid = polarPoint(cx, cy, radius, startAngleDeg + sweep / 2);
    const end = polarPoint(cx, cy, radius, endAngleDeg);
    return `M ${start.x} ${start.y} A ${radius} ${radius} 0 0 1 ${mid.x} ${mid.y} A ${radius} ${radius} 0 0 1 ${end.x} ${end.y}`;
  }
  const end = polarPoint(cx, cy, radius, endAngleDeg);
  return `M ${start.x} ${start.y} A ${radius} ${radius} 0 0 1 ${end.x} ${end.y}`;
}
