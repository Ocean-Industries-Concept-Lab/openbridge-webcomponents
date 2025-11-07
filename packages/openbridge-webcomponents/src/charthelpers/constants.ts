/**
 * Default sector colors used across chart components
 */
export const CHART_SECTOR_DEFAULT_COLORS = [
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
