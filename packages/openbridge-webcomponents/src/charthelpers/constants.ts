/**
 * Default sector colors used across chart components
 */
export const CHART_SECTOR_DEFAULT_COLORS = [
  '--base-gray-500',
  '--base-gray-400',
  '--base-gray-300',
  '--base-gray-200',
  '--base-gray-100',
] as const;

export const CHART_SECTOR_ENHANCED_COLORS = [
  '--base-blue-500',
  '--base-blue-400',
  '--base-blue-300',
  '--base-blue-200',
  '--base-blue-100',
] as const;

/**
 * Chart dimension constants
 *
 * These dimensions are based on the Figma design system
 * where the chart area is 320x320px including the 32px padding for optional outer labels.
 */
export const CHART_DIMENSIONS = {
  CANVAS_PADDING: 32,
  CHART_WIDTH: 256,
  MIN_CHART_WIDTH: 48,
  /** Minimum height for displaying labels and readouts - below 192px, labels are hidden */
  MIN_HEIGHT_WITH_LABELS: 192,
} as const;

/**
 * Configuration for outer label rendering
 */
export const OUTER_LABEL_CONFIG = {
  labelGap: 8, // Gap between chart edge and label text (in pixels)
  fontFamily: '--font-family-main',
  fontSizeVar: '--global-typography-ui-label-font-size',
  fontWeightVar: '--global-typography-ui-label-font-weight',
  fontColorVar: '--instrument-tick-mark-label-secondary-color',
} as const;

/**
 * Configuration for center readout rendering
 */
export const CENTER_READOUT_CONFIG = {
  value: {
    fontSizeVar: '--global-typography-instrument-value-large-font-size',
    fontWeightVar:
      '--global-typography-instrument-value-regular-font-weight-active',
    fontColorVar: '--element-neutral-color',
  },
  label: {
    fontSizeVar: '--global-typography-instrument-label-font-size',
    fontWeightVar: '--global-typography-instrument-label-font-weight',
    fontColorVar: '--instrument-regular-secondary-color',
  },
  unit: {
    fontSizeVar: '--global-typography-instrument-unit-font-size',
    fontWeightVar: '--global-typography-instrument-unit-font-weight',
    fontColorVar: '--instrument-regular-secondary-color',
  },
} as const;

/**
 * Tooltip styling configuration
 */
export const TOOLTIP_CONFIG = {
  bgColorVar: '--container-global-color',
  borderColorVar: '--normal-enabled-border-color',
  BORDER_RADIUS: 6,
  fontColorVar: '--element-neutral-color',
  label: {
    fontSizeVar: '--global-typography-instrument-label-font-size',
    fontWeightVar: '--global-typography-instrument-label-font-weight',
    fontColorVar: '--instrument-regular-secondary-color',
  },
  unit: {
    fontSizeVar: '--global-typography-instrument-unit-font-size',
    fontWeightVar: '--global-typography-instrument-unit-font-weight',
    fontColorVar: '--instrument-regular-secondary-color',
  },
} as const;

/**
 * Configuration for line graph axis labels
 */
export const LINE_GRAPH_LABEL_CONFIG = {
  fontFamily: '--font-family-main',
  fontSizeVar: '--global-typography-ui-label-font-size',
  fontWeightVar: '--global-typography-ui-label-font-weight',
  fontColorVar: '--instrument-tick-mark-label-secondary-color',
} as const;

/**
 * Configuration for line graph grid and ticks
 */
export const LINE_GRAPH_GRID_CONFIG = {
  gridColorVar: '--instrument-tick-mark-tertiary-color',
  tickColorVar: '--border-outline-color',
  thresholdLowColorVar: '--base-red-500',
  thresholdHighColorVar: '--base-blue-500',
  stackedDividerColorVar: '--overlay-border-silhouette-color',
} as const;

/**
 * Chart area background color for instrument mode
 * Used in gauge-trend and similar composite instruments
 */
export const CHART_AREA_BACKGROUND_COLOR_VAR =
  '--instrument-frame-primary-color' as const;

/**
 * Dimensions for rectangular charts (line, bar, etc.)
 */
export const RECTANGULAR_CHART_DIMENSIONS = {
  DEFAULT_ASPECT_RATIO: 1.5, // width:height for line graphs
  MIN_HEIGHT_WITH_LABELS: 192, // Threshold for showing labels/ticks
} as const;
