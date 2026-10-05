/**
 * Numeric helpers shared by the SVG instruments and the components that draw
 * with them: range clamping, angle wrapping, degree/radian conversion and
 * piecewise-linear interpolation between keyframes.
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

/**
 * Piecewise-linear interpolation through keyframes, for geometry that has to
 * match a set of drawn icons at their steps and move smoothly between them.
 *
 * @param x - Position to read; below the first or above the last keyframe it takes that keyframe's value.
 * @param frames - `[x, y]` pairs sorted by ascending `x`, at least one.
 * @returns The interpolated `y`.
 */
export function interpolate(
  x: number,
  frames: readonly (readonly [number, number])[]
): number {
  if (x <= frames[0][0]) return frames[0][1];
  for (let i = 1; i < frames.length; i++) {
    const [x1, y1] = frames[i];
    if (x <= x1) {
      const [x0, y0] = frames[i - 1];
      return y0 + ((y1 - y0) * (x - x0)) / (x1 - x0);
    }
  }
  return frames[frames.length - 1][1];
}
