/**
 * Stroke-aware coordinate helpers for SVG rendering
 *
 * These helpers account for the fact that strokes with `vector-effect="non-scaling-stroke"`
 * are centered on their path/line, extending ±strokeWidth/2 from the center position.
 *
 * When elements are positioned at viewBox boundaries, half of the stroke gets clipped,
 * causing visual artifacts and dimension mismatches.
 *
 * ## The Problem
 *
 * For a 1px stroke centered at position x=0:
 * - The stroke extends from x=-0.5 to x=0.5
 * - If viewBox starts at x=0, the left half (-0.5 to 0) is clipped
 * - Visual result: only 0.5px visible instead of 1px
 *
 * Similarly for vertical coordinates:
 * - A 256px logical height with strokes at top/bottom becomes 257px visual (0.5 + 256 + 0.5)
 * - To achieve 256px visual, we need 255px logical + stroke adjustments
 *
 * ## The Solution
 *
 * 1. **Dimension Adjustment**: Reduce logical dimensions to account for stroke bleed
 * 2. **Coordinate Adjustment**: Shift boundary positions inward by half-stroke width
 * 3. **Value Mapping**: Use adjusted dimensions when converting data values to coordinates
 *
 * ## Example
 *
 * ViewBox boundary (y = -128)
 *    ↓
 * ----+---- ← stroke center at y=-128
 *     |       Top 0.5px gets clipped
 * ====|==== ← visible stroke (only bottom half)
 *     |
 *   (256px content area)
 *     |
 * ====|==== ← visible stroke (only top half)
 *     |       Bottom 0.5px gets clipped
 * ----+---- ← stroke center at y=128
 *     ↑
 * ViewBox boundary (y = 128)
 *
 * Result: Visual height = 0.5 + 256 + 0.5 = 257px
 */

/**
 * Adjust a dimension to account for strokes at both boundaries.
 *
 * Use this when you want a specific visual size but have strokes at the edges
 * that would otherwise extend beyond the intended boundaries.
 *
 * @param desiredVisualSize - The target visual dimension (e.g., 256px to match chart)
 * @param strokeWidth - Width of strokes at boundaries (default: 1px)
 * @returns Adjusted logical dimension for calculations
 *
 * @example
 * // To get 256px visual height with 1px strokes at top/bottom:
 * const logicalHeight = adjustDimensionForStroke(256, 1); // Returns 255
 * // With strokes: 0.5px (top) + 255px (content) + 0.5px (bottom) = 256px visual ✓
 */
export function adjustDimensionForStroke(
  desiredVisualSize: number,
  strokeWidth: number = 1
): number {
  return desiredVisualSize - strokeWidth;
}

/**
 * Adjust a coordinate position to keep stroke fully visible within viewBox bounds.
 *
 * Centered strokes extend ±strokeWidth/2 from their center position. At viewBox
 * boundaries, this causes clipping. This function shifts positions inward to
 * ensure the full stroke remains visible.
 *
 * @param value - The calculated coordinate value
 * @param viewBoxMin - Minimum boundary of viewBox in this dimension
 * @param viewBoxMax - Maximum boundary of viewBox in this dimension
 * @param strokeWidth - Width of the stroke (default: 1px)
 * @returns Adjusted coordinate that keeps stroke fully visible
 *
 * @example
 * // For a vertical bar with viewBox Y from -128 to 128:
 * const topY = adjustCoordinateForStroke(-128, -128, 128); // Returns -127.5
 * const bottomY = adjustCoordinateForStroke(128, -128, 128); // Returns 127.5
 * // Visual height: 127.5 - (-127.5) + 1px (stroke) = 256px ✓
 */
export function adjustCoordinateForStroke(
  value: number,
  viewBoxMin: number,
  viewBoxMax: number,
  strokeWidth: number = 1
): number {
  const halfStroke = strokeWidth / 2;

  // At minimum boundary: shift inward
  if (value === viewBoxMin) {
    return value + halfStroke;
  }

  // At maximum boundary: shift inward
  if (value === viewBoxMax) {
    return value - halfStroke;
  }

  // Interior position: no adjustment needed
  return value;
}

/**
 * Convert a data value to Y-coordinate position, accounting for stroke clipping.
 *
 * This is the stroke-aware version of the standard value-to-coordinate mapping.
 * It uses an adjusted height internally to ensure the visual output matches
 * the desired dimensions even with strokes at top/bottom boundaries.
 *
 * @param value - The data value to convert
 * @param minValue - Minimum data value
 * @param maxValue - Maximum data value
 * @param height - Desired visual height
 * @param strokeWidth - Width of strokes at boundaries (default: 1px)
 * @returns Y-coordinate (negative is up, positive is down in centered viewBox)
 *
 * @example
 * // For a scale from 0-100 with 256px visual height:
 * const y0 = valueToY(0, 0, 100, 256);   // Bottom of scale
 * const y100 = valueToY(100, 0, 100, 256); // Top of scale
 * // Visual distance: |y100 - y0| = 256px (accounting for strokes)
 */
export function valueToY(
  value: number,
  minValue: number,
  maxValue: number,
  height: number,
  strokeWidth: number = 1
): number {
  // Use adjusted height to account for strokes at top/bottom
  const adjustedHeight = adjustDimensionForStroke(height, strokeWidth);
  const range = maxValue - minValue;

  // Calculate position in adjusted space
  // Formula: inverted Y-axis (negative = up) centered at 0
  const y = ((-value + minValue) * adjustedHeight) / range + adjustedHeight / 2;

  // Shift to center the content accounting for stroke bleed
  return y + strokeWidth / 2;
}

/**
 * Convert a data value to X-coordinate position, accounting for stroke clipping.
 *
 * Similar to valueToY but for horizontal positioning. Useful for horizontal
 * bars, charts, or any element that needs stroke-aware X positioning.
 *
 * @param value - The data value to convert
 * @param minValue - Minimum data value
 * @param maxValue - Maximum data value
 * @param width - Desired visual width
 * @param strokeWidth - Width of strokes at boundaries (default: 1px)
 * @returns X-coordinate (left to right in standard SVG)
 *
 * @example
 * // For a horizontal scale from 0-100 with 256px visual width:
 * const x0 = valueToX(0, 0, 100, 256);   // Left edge
 * const x100 = valueToX(100, 0, 100, 256); // Right edge
 * // Visual distance: |x100 - x0| = 256px (accounting for strokes)
 */
export function valueToX(
  value: number,
  minValue: number,
  maxValue: number,
  width: number,
  strokeWidth: number = 1
): number {
  // Use adjusted width to account for strokes at left/right
  const adjustedWidth = adjustDimensionForStroke(width, strokeWidth);
  const range = maxValue - minValue;

  // Calculate position in adjusted space
  // Formula: standard X-axis (positive = right) starting from left edge
  const x = ((value - minValue) * adjustedWidth) / range;

  // Shift to account for stroke bleed on left edge
  return x + strokeWidth / 2;
}

/**
 * Adjust a rect's X position and width to account for stroke at viewBox edges.
 *
 * When a rect with a stroke is positioned at viewBox boundaries, the stroke
 * can get clipped or extend beyond the viewBox. This helper adjusts both
 * position and dimensions to ensure pixel-perfect rendering.
 *
 * @param rectX - Original rect X position
 * @param rectWidth - Original rect width
 * @param viewBoxMinX - Minimum X boundary of viewBox
 * @param viewBoxMaxX - Maximum X boundary of viewBox
 * @param strokeWidth - Width of the rect's stroke (default: 1px)
 * @returns Adjusted {x, width} for pixel-perfect rendering
 *
 * @example
 * // Right-side bar at x=0 with width=24, viewBox from 0 to 108:
 * const adjusted = adjustRectForStroke(0, 24, 0, 108);
 * // Returns: {x: 0.5, width: 23} to account for left edge stroke
 */
export function adjustRectForStroke(
  rectX: number,
  rectWidth: number,
  viewBoxMinX: number,
  viewBoxMaxX: number,
  strokeWidth: number = 1
): {x: number; width: number} {
  const halfStroke = strokeWidth / 2;
  let adjustedX = rectX;
  let adjustedWidth = rectWidth;

  // If rect starts at viewBox left edge
  if (rectX === viewBoxMinX) {
    adjustedX = rectX + halfStroke;
    adjustedWidth = rectWidth - halfStroke;
  }

  // If rect ends at viewBox right edge
  if (rectX + rectWidth === viewBoxMaxX) {
    adjustedWidth = adjustedWidth - halfStroke;
  }

  return {x: adjustedX, width: adjustedWidth};
}

/**
 * Adjust a rect's Y position and height to account for stroke at viewBox edges.
 *
 * Similar to adjustRectForStroke but for vertical dimensions. Ensures rects
 * with strokes render pixel-perfectly when positioned at viewBox top/bottom.
 *
 * @param rectY - Original rect Y position
 * @param rectHeight - Original rect height
 * @param viewBoxMinY - Minimum Y boundary of viewBox
 * @param viewBoxMaxY - Maximum Y boundary of viewBox
 * @param strokeWidth - Width of the rect's stroke (default: 1px)
 * @returns Adjusted {y, height} for pixel-perfect rendering
 *
 * @example
 * // Bar container spanning full height, viewBox from -128 to 128:
 * const adjusted = adjustRectHeightForStroke(-128, 256, -128, 128);
 * // Returns: {y: -127.5, height: 255} to account for top/bottom strokes
 */
export function adjustRectHeightForStroke(
  rectY: number,
  rectHeight: number,
  viewBoxMinY: number,
  viewBoxMaxY: number,
  strokeWidth: number = 1
): {y: number; height: number} {
  const halfStroke = strokeWidth / 2;
  let adjustedY = rectY;
  let adjustedHeight = rectHeight;

  // If rect starts at viewBox top edge
  if (rectY === viewBoxMinY) {
    adjustedY = rectY + halfStroke;
    adjustedHeight = rectHeight - halfStroke;
  }

  // If rect ends at viewBox bottom edge
  if (rectY + rectHeight === viewBoxMaxY) {
    adjustedHeight = adjustedHeight - halfStroke;
  }

  return {y: adjustedY, height: adjustedHeight};
}
