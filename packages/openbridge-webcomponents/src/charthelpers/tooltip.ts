import {TOOLTIP_CONFIG} from './constants.js';
import {getCssVariableValue} from './colors.js';
import type {ChartOptions} from 'chart.js';

/**
 * Returns Chart.js tooltip options with styles resolved from CSS variables.
 * @param host The chart component (HTMLElement) to resolve CSS variables from
 */
export function getChartTooltipOptions(
  host: HTMLElement
): NonNullable<ChartOptions['plugins']>['tooltip'] {
  return {
    enabled: true,
    displayColors: true,
    caretSize: 0,
    boxPadding: 4, // TODO(CSS): double-check, 8px margin-right after the color square
    boxWidth: 16,
    boxHeight: 16,
    backgroundColor: getCssVariableValue(host, TOOLTIP_CONFIG.bgColorVar),
    borderColor: getCssVariableValue(host, TOOLTIP_CONFIG.borderColorVar),
    borderWidth: 1,
    cornerRadius: TOOLTIP_CONFIG.BORDER_RADIUS,
    titleColor: getCssVariableValue(host, TOOLTIP_CONFIG.fontColorVar),
    bodyColor: getCssVariableValue(host, TOOLTIP_CONFIG.fontColorVar),
    footerColor: getCssVariableValue(host, TOOLTIP_CONFIG.fontColorVar),
    // No opacity override: use CSS variable as-is
    animation: false, // Disable tooltip fade/transition
    padding: 12,
  };
}
