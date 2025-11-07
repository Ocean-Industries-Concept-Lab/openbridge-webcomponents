/**
 * Get a CSS custom property value from an element's computed styles
 *
 * This is specifically designed for Chart.js canvas rendering, where CSS variables
 * must be resolved to actual color values before being passed to the canvas context.
 * Unlike DOM elements, canvas doesn't inherit CSS properties, so we must read
 * computed values from the host element.
 *
 * @param element - The HTML element to read CSS variables from (typically the chart component)
 * @param name - The CSS custom property name (e.g., '--base-blue-500')
 * @returns The resolved CSS value as a string (trimmed)
 *
 * @example
 * const color = getCssVariableValue(this, '--element-neutral-color');
 * // Returns: "rgb(83, 83, 83)"
 */
export function getCssVariableValue(
  element: HTMLElement,
  name: string
): string {
  return getComputedStyle(element).getPropertyValue(name).trim();
}

/**
 * Get chart colors: use custom colors if provided, otherwise fall back to CSS theme variables
 * @param element - The HTML element to read CSS variables from
 * @param customColors - User-provided color array (hex, rgb, etc.)
 * @param defaultColorVars - CSS custom property names to use as fallback (e.g., ['--base-blue-500', '--base-blue-400'])
 * @returns Array of resolved color strings
 */
export function getChartColorsOrDefault(
  element: HTMLElement,
  customColors: string[],
  defaultColorVars: readonly string[]
): string[] {
  if (customColors.length > 0) {
    return customColors;
  }
  return defaultColorVars.map((colorVar) =>
    getCssVariableValue(element, colorVar)
  );
}
