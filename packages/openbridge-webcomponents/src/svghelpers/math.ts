/**
 * Numeric helpers shared by the SVG instruments and the components that draw
 * with them: range clamping, angle wrapping and degree/radian conversion.
 *
 * Keep the operand order as written. `(deg * Math.PI) / 180` and
 * `deg * (Math.PI / 180)` differ in the last bit, and the instrument
 * snapshots pin the former.
 */

/**
 * `value` limited to `[min, max]`.
 *
 * @param value - Any number. NaN passes through as NaN, as with `Math.min` / `Math.max`.
 * @param min - Lower bound, inclusive.
 * @param max - Upper bound, inclusive; it wins when `min > max`.
 * @returns The bounded value.
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

/**
 * A percentage limited to `[0, 100]`.
 *
 * @param value - Any number. NaN counts as 0, so a missing reading draws empty; ±Infinity clamp to the bounds.
 * @returns The bounded percentage.
 */
export function clampPercent(value: number): number {
  if (Number.isNaN(value)) return 0;
  return clamp(value, 0, 100);
}

/**
 * Degrees wrapped into `[0, 360)`.
 *
 * @param deg - Any finite angle, negative and over-turned included; a non-finite angle yields NaN.
 * @returns The same direction in `[0, 360)`, never negative zero.
 */
export function normalizeAngle(deg: number): number {
  return ((deg % 360) + 360) % 360;
}

/**
 * @param deg - Angle in degrees.
 * @returns The angle in radians, as `(deg * Math.PI) / 180`.
 */
export function degToRad(deg: number): number {
  return (deg * Math.PI) / 180;
}

/**
 * @param rad - Angle in radians.
 * @returns The angle in degrees, as `(rad * 180) / Math.PI`.
 */
export function radToDeg(rad: number): number {
  return (rad * 180) / Math.PI;
}
