import {CHART_DIMENSIONS, RECTANGULAR_CHART_DIMENSIONS} from './constants.js';

/**
 * Result of rectangular chart layout calculation
 */
export interface RectangularChartDimensions {
  /** Chart width calculated from height and aspect ratio */
  width: number;
  /** Chart height (same as input fixedHeight) */
  height: number;
  /** Aspect ratio (width / height) */
  aspectRatio: number;
  /** Chart.js layout padding */
  padding: {top: number; right: number; bottom: number; left: number};
  /** Whether chart is too small to show labels (height < 192px) */
  isTooSmall: boolean;
}

/**
 * Calculate dimensions and layout for rectangular charts (line, bar, etc.)
 *
 * Unlike circular charts that need complex outer label calculations,
 * rectangular charts use a simple approach:
 * - Width is calculated from height × aspect ratio
 * - Padding is either zero (below threshold) or standard canvas padding (above threshold)
 * - No outer labels or label width measurements needed
 *
 * This helper is used by line graphs and other rectangular chart types to maintain
 * consistent sizing behavior without the complexity of circular chart calculations.
 *
 * @param fixedHeight - Fixed height in pixels
 * @param aspectRatio - Width to height ratio (default: 1.5 for line graphs)
 * @returns Dimensions and padding for the chart
 *
 * @example
 * // Line graph with default 1.5:1 aspect ratio
 * const dimensions = calculateRectangularChartLayout(320);
 * // Result: width=480, height=320, aspectRatio=1.5, padding=32px all sides
 *
 * @example
 * // Wide chart with 2:1 aspect ratio
 * const dimensions = calculateRectangularChartLayout(256, 2.0);
 * // Result: width=512, height=256, aspectRatio=2.0
 *
 * @example
 * // Small chart below threshold (edge-to-edge rendering)
 * const dimensions = calculateRectangularChartLayout(48);
 * // Result: width=72, height=48, padding=0px all sides, isTooSmall=true
 */
export function calculateRectangularChartLayout(
  fixedHeight: number,
  aspectRatio: number = RECTANGULAR_CHART_DIMENSIONS.DEFAULT_ASPECT_RATIO
): RectangularChartDimensions {
  // Check if chart is too small for labels
  const isTooSmall =
    fixedHeight < RECTANGULAR_CHART_DIMENSIONS.MIN_HEIGHT_WITH_LABELS;

  // Calculate width from aspect ratio
  const width = fixedHeight * aspectRatio;

  // Simple padding logic: zero when too small, standard padding otherwise
  const padding = isTooSmall
    ? {top: 0, right: 0, bottom: 0, left: 0}
    : {
        top: CHART_DIMENSIONS.CANVAS_PADDING,
        right: CHART_DIMENSIONS.CANVAS_PADDING,
        bottom: CHART_DIMENSIONS.CANVAS_PADDING,
        left: CHART_DIMENSIONS.CANVAS_PADDING,
      };

  return {
    width,
    height: fixedHeight,
    aspectRatio,
    padding,
    isTooSmall,
  };
}
