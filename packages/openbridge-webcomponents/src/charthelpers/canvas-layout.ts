import {CHART_DIMENSIONS, OUTER_LABEL_CONFIG} from './constants.js';
import {getCssVariableValue} from './colors.js';

/**
 * Configuration for canvas layout calculation
 */
interface ChartLayoutConfig {
  /** Chart data to generate formatted labels from */
  data: Array<{label: string; value: number}>;
  /** Denominator for percentage calculations, e.g., total or max value */
  denominator: number;
  /** Unit string to append to labels (e.g., '%', 'kW') */
  unit?: string;
  /** Whether to show the unit in labels */
  showUnit?: boolean;
  /** Maximum character length for label text */
  outerLabelMaxLength?: number;
  /** Number of decimal places in formatted values */
  decimalPlaces?: number;
}

/**
 * Result of canvas layout calculation
 */
interface ChartPaddingAndLabelsResult {
  padding: {top: number; right: number; bottom: number; left: number};
  formattedLabels: string[];
}

/**
 * Generate formatted label strings from chart data
 * @param data - Array of chart data segments
 * @param denominator - The max/total value for percentage calculation
 * @param config - Label configuration (unit, showUnit, decimalPlaces, etc.)
 * @param outerLabelMaxLength - Optional maximum character length; labels exceeding this will be truncated with '…'
 * @returns Array of formatted label strings
 */
function generateLabels(
  data: Array<{label: string; value: number}>,
  denominator: number,
  config: Pick<ChartLayoutConfig, 'unit' | 'showUnit' | 'decimalPlaces'>,
  outerLabelMaxLength = 0
): string[] {
  const formattedLabels: string[] = [];

  // If denominator is 1, treat as sector label mode (polar chart: showSectorLabels=true)
  if (denominator === 1) {
    for (const item of data) {
      let label = item.label;
      if (outerLabelMaxLength > 0 && label.length > outerLabelMaxLength) {
        label = label.substring(0, outerLabelMaxLength) + '…';
      }
      formattedLabels.push(label);
    }
    // Add a sample max-length label for width measurement
    let maxLabel = '';
    for (const item of data) {
      if (item.label.length > maxLabel.length) maxLabel = item.label;
    }
    if (outerLabelMaxLength > 0 && maxLabel.length > outerLabelMaxLength) {
      maxLabel = maxLabel.substring(0, outerLabelMaxLength) + '…';
    }
    formattedLabels.push(maxLabel);
    return formattedLabels;
  }

  // Otherwise, use value/unit formatting (donut, pie, polar angles)
  for (const item of data) {
    const formattedLabel = formatSingleLabel(item.value, denominator, {
      unit: config.unit,
      showUnit: config.showUnit,
      decimalPlaces: config.decimalPlaces,
      maxLength: outerLabelMaxLength,
    });
    formattedLabels.push(formattedLabel);
  }

  // Also add max value label for width measurement
  const maxFormattedLabel = formatSingleLabel(denominator, denominator, {
    unit: config.unit,
    showUnit: config.showUnit,
    decimalPlaces: config.decimalPlaces,
    maxLength: outerLabelMaxLength,
  });
  formattedLabels.push(maxFormattedLabel);

  return formattedLabels;
}

/**
 * Format a numeric value as either a percentage or raw number
 * Returns only the numeric string without unit suffix
 *
 * @param value - The numeric value to format
 * @param denominator - The total/max value to calculate percentage against
 * @param asPercentage - Whether to calculate as percentage (true) or use raw value (false)
 * @param decimalPlaces - Number of decimal places to show (default: 0)
 * @returns Formatted numeric string (e.g., "45.0" or "30.5")
 */
export function formatNumericValue(
  value: number,
  denominator: number,
  asPercentage: boolean,
  decimalPlaces = 0
): string {
  if (!asPercentage) {
    return value.toFixed(decimalPlaces);
  }
  const percentage = (value / denominator) * 100;
  return percentage.toFixed(decimalPlaces);
}

/**
 * Format a complete chart label with value, unit, and truncation
 *
 * @param value - The numeric value to format
 * @param denominator - The total/max value for percentage calculation
 * @param config - Label configuration
 * @returns Fully formatted label string (with unit and truncation applied)
 */
export function formatSingleLabel(
  value: number,
  denominator: number,
  config: {
    unit?: string;
    showUnit?: boolean;
    decimalPlaces?: number;
    maxLength?: number;
  }
): string {
  const isPercentage = config.unit === '%';
  const numericValue = formatNumericValue(
    value,
    denominator,
    isPercentage,
    config.decimalPlaces ?? 0
  );

  // Add unit if requested
  let label = numericValue;
  if (config.showUnit && config.unit) {
    label = `${numericValue}${config.unit}`;
  }

  // Truncate if exceeds maxLength
  if (
    config.maxLength &&
    config.maxLength > 0 &&
    label.length > config.maxLength
  ) {
    return label.substring(0, config.maxLength) + '…';
  }

  return label;
}

/**
 * Calculate canvas padding and formatted labels for charts
 *
 * @param host - The chart component element (for CSS variable access)
 * @param ctx - Canvas 2D rendering context (for text measurement)
 * @param showOuterLabels - Whether outer labels are enabled
 * @param config - Label configuration for padding calculation
 * @returns Padding values and formatted label strings
 */
export function calculateChartPaddingAndLabels(
  host: HTMLElement,
  ctx: CanvasRenderingContext2D,
  showOuterLabels: boolean,
  config: ChartLayoutConfig
): ChartPaddingAndLabelsResult {
  const topBottomPadding = CHART_DIMENSIONS.CANVAS_PADDING;
  let leftRightPadding: number = CHART_DIMENSIONS.CANVAS_PADDING;
  let formattedLabels: string[] = [];

  if (showOuterLabels) {
    const fontFamily = getCssVariableValue(host, OUTER_LABEL_CONFIG.fontFamily);
    const fontWeight = getCssVariableValue(
      host,
      OUTER_LABEL_CONFIG.fontWeightVar
    );
    const fontSize = getCssVariableValue(host, OUTER_LABEL_CONFIG.fontSizeVar);

    ctx.save();
    ctx.font = `${fontWeight} ${fontSize} ${fontFamily}`;

    const labelsToMeasure = generateLabels(
      config.data,
      config.denominator,
      {
        unit: config.unit,
        showUnit: config.showUnit,
        decimalPlaces: config.decimalPlaces,
      },
      config.outerLabelMaxLength
    );

    // Exclude the last max-value sample for actual rendering labels
    formattedLabels = labelsToMeasure.slice(0, -1);

    let maxLabelWidth = 0;
    for (const label of labelsToMeasure) {
      const w = ctx.measureText(label).width;
      if (w > maxLabelWidth) maxLabelWidth = w;
    }

    maxLabelWidth += OUTER_LABEL_CONFIG.labelGap;
    ctx.restore();
    leftRightPadding = Math.max(
      CHART_DIMENSIONS.CANVAS_PADDING,
      Math.ceil(maxLabelWidth)
    );
  }

  return {
    padding: {
      top: topBottomPadding,
      right: leftRightPadding,
      bottom: topBottomPadding,
      left: leftRightPadding,
    },
    formattedLabels,
  };
}

/**
 * Configuration for fixed height chart layout calculation
 */
export interface FixedHeightChartConfig {
  /** Fixed height in pixels (determines chart circumference, to match other circular components' circumference) */
  fixedHeight: number;
  /** Whether chart is in half mode (180° arc instead of 360°, applies to donut chart only) */
  isHalfMode: boolean;
  /** Whether to show outer labels */
  showOuterLabels: boolean;
  /** Canvas element for text measurement */
  canvasEl: HTMLCanvasElement | undefined;
  /** Chart layout configuration for label formatting */
  layoutConfig: ChartLayoutConfig;
  /** Host element for CSS variable access */
  host: HTMLElement;
}

/**
 * Result of fixed height chart layout calculation
 */
export interface FixedHeightChartDimensions {
  /** Whether chart is too small to show labels (height < MIN_HEIGHT_WITH_LABELS) */
  isTooSmall: boolean;
  /** Full circle diameter for Chart.js drawing */
  chartDiameter: number;
  /** Visible width (differs from chartDiameter in half mode) */
  visibleWidth: number;
  /** Actual rendered canvas height (differs from fixedHeight in half mode for donut chart only) */
  actualHeight: number;
  /** Calculated total canvas width including padding */
  calculatedWidth: number;
  /** Padding for left side */
  leftPadding: number;
  /** Padding for right side */
  rightPadding: number;
  /** Padding for top side */
  topPadding: number;
  /** Padding for bottom side */
  bottomPadding: number;
  /** Calculated aspect ratio (width / height) */
  aspectRatio: number;
  /** Formatted label strings for outer labels */
  formattedLabels: string[];
}

/**
 * Calculate all dimensions and layout properties for a fixed-height circular chart
 *
 * This is the centralized calculation function used by all circular charts (donut, pie, polar, radial-bar)
 * to ensure consistent behavior across chart types.
 *
 * Fixed Height Mode Calculation Flow:
 *
 * Step 1: Calculate chart diameter from fixed height
 *   - topBottomPadding = CANVAS_PADDING * 2 = 64px
 *   - For full circle: chartDiameter = fixedHeight - 64
 *   - For half circle: chartDiameter = (fixedHeight - 64) / 2 (full circle for Chart.js)
 *   - visibleWidth: For half mode = fixedHeight - 64, for full mode = chartDiameter
 *
 * Step 2: Measure label widths and calculate horizontal padding
 *   - Uses ctx.measureText() to get pixel width of formatted labels
 *   - leftRightPadding = max(CANVAS_PADDING, maxLabelWidth + labelGap)
 *
 * Step 3: Calculate total canvas width
 *   - calculatedWidth = leftPadding + visibleWidth + rightPadding
 *   - Important: Use visibleWidth (not chartDiameter) for half mode
 *
 * Step 4: Check threshold and hide labels if needed
 *   - if (fixedHeight < MIN_HEIGHT_WITH_LABELS) hide labels
 *
 * Step 5: Calculate actual rendered height and aspect ratio
 *   - For half circle: actualHeight = (fixedHeight - 64) / 2 + 64
 *     Example: fixedHeight=320 → actualHeight=192, visibleWidth=256
 *   - For full circle: actualHeight = fixedHeight
 *   - aspectRatio = calculatedWidth / actualHeight
 *
 * @param config - Configuration for the chart layout calculation
 * @returns Complete dimensions and padding for the chart
 */
export function calculateFixedHeightChartLayout(
  config: FixedHeightChartConfig
): FixedHeightChartDimensions {
  // Step 4: Check threshold
  const isTooSmall =
    config.fixedHeight < CHART_DIMENSIONS.MIN_HEIGHT_WITH_LABELS;

  // Step 1: Calculate chart diameter from fixed height
  const topBottomPadding = CHART_DIMENSIONS.CANVAS_PADDING * 2;
  const chartDiameter = config.isHalfMode
    ? (config.fixedHeight - topBottomPadding) * 2 // Full circle diameter for half mode
    : config.fixedHeight - topBottomPadding; // Full circle diameter for full mode

  // Calculate visible width (for half mode, only half the circle is visible)
  const visibleWidth = config.isHalfMode
    ? config.fixedHeight - topBottomPadding // Half circle width = original height - padding
    : chartDiameter; // Full circle width = diameter

  let leftPadding: number = CHART_DIMENSIONS.CANVAS_PADDING;
  let rightPadding: number = CHART_DIMENSIONS.CANVAS_PADDING;
  let calculatedWidth = visibleWidth + leftPadding + rightPadding;
  let formattedLabels: string[] = [];

  // Step 2 & 3: Measure labels and calculate width (only if labels should be visible)
  if (config.canvasEl && config.showOuterLabels && !isTooSmall) {
    const ctx = config.canvasEl.getContext('2d');
    if (ctx) {
      const layout = calculateChartPaddingAndLabels(
        config.host,
        ctx,
        config.showOuterLabels,
        config.layoutConfig
      );
      leftPadding = layout.padding.left;
      rightPadding = layout.padding.right;
      calculatedWidth = leftPadding + visibleWidth + rightPadding;
      formattedLabels = layout.formattedLabels;
    }
  } else if (!isTooSmall && config.canvasEl) {
    // No outer labels, but still need to update layout for other calculations
    const ctx = config.canvasEl.getContext('2d');
    if (ctx) {
      const layout = calculateChartPaddingAndLabels(
        config.host,
        ctx,
        config.showOuterLabels,
        config.layoutConfig
      );
      formattedLabels = layout.formattedLabels;
    }
  }

  // Step 5: Calculate actual rendered height (different for half mode)
  // For half mode: show only top half of the circle, so height = diameter/2 + padding
  // For full mode: height = diameter + padding
  const actualHeight = config.isHalfMode
    ? (config.fixedHeight - topBottomPadding) / 2 + topBottomPadding // (diameter/2) + padding
    : config.fixedHeight;

  // Calculate aspect ratio
  const aspectRatio = calculatedWidth / actualHeight;

  return {
    isTooSmall,
    chartDiameter,
    visibleWidth,
    actualHeight,
    calculatedWidth,
    leftPadding,
    rightPadding,
    topPadding: CHART_DIMENSIONS.CANVAS_PADDING,
    bottomPadding: CHART_DIMENSIONS.CANVAS_PADDING,
    aspectRatio,
    formattedLabels,
  };
}
