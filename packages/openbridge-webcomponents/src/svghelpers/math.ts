/**
 * Numeric helpers shared by the SVG instruments and the components that draw
 * with them: range clamping, angle wrapping and degree/radian conversion.
 *
 * Keep the operand order as written. `(deg * Math.PI) / 180` and
 * `deg * (Math.PI / 180)` differ in the last bit, and the instrument
 * snapshots pin the former.
 */

/** `value` limited to `[min, max]`. NaN stays NaN, as with `Math.min`/`Math.max`. */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

/** A percentage limited to `[0, 100]`; NaN counts as 0, so a missing reading draws empty. */
export function clampPercent(value: number): number {
  if (Number.isNaN(value)) return 0;
  return clamp(value, 0, 100);
}

/** Degrees wrapped into `[0, 360)`, negative and over-turned angles included. */
export function normalizeAngle(deg: number): number {
  return ((deg % 360) + 360) % 360;
}

export function degToRad(deg: number): number {
  return (deg * Math.PI) / 180;
}

export function radToDeg(rad: number): number {
  return (rad * 180) / Math.PI;
}
