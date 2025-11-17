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

/**
 * Apply alpha transparency to a color string.
 * Supports hex (#RGB/#RRGGBB), rgb(), rgba(), and CSS variable references.
 *
 * @param element - Host element for CSS variable resolution
 * @param color - Color string (hex, rgb, rgba, CSS var, or CSS var reference)
 * @param alpha - Alpha value (0-1)
 * @returns Color string with applied alpha as rgba()
 *
 * @example
 * // Hex color
 * applyAlphaToColor(this, '#3498db', 0.5) // returns 'rgba(52, 152, 219, 0.5)'
 *
 * // CSS variable
 * applyAlphaToColor(this, '--base-blue-500', 0.3) // returns 'rgba(r, g, b, 0.3)'
 *
 * // RGB color
 * applyAlphaToColor(this, 'rgb(52, 152, 219)', 0.7) // returns 'rgba(52, 152, 219, 0.7)'
 */
export function applyAlphaToColor(
  element: HTMLElement,
  color: string | CanvasGradient | CanvasPattern | undefined,
  alpha = 0.5
): string {
  if (!color || typeof color !== 'string') return 'rgba(0, 0, 0, 0)';

  let c = color.trim();

  // Resolve CSS variables
  if (c.startsWith('var(')) {
    const inner = c
      .replace(/^var\(/, '')
      .replace(/\)$/, '')
      .trim();
    if (inner.startsWith('--')) {
      const resolved = getCssVariableValue(element, inner);
      if (resolved) c = resolved.trim();
    }
  } else if (c.startsWith('--')) {
    const resolved = getCssVariableValue(element, c);
    if (resolved) c = resolved.trim();
  }

  // Handle hex colors
  if (c.startsWith('#')) {
    const hex = c.slice(1);
    if (hex.length === 3) {
      const r = parseInt(hex[0] + hex[0], 16);
      const g = parseInt(hex[1] + hex[1], 16);
      const b = parseInt(hex[2] + hex[2], 16);
      return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    }
    if (hex.length === 6) {
      const r = parseInt(hex.slice(0, 2), 16);
      const g = parseInt(hex.slice(2, 4), 16);
      const b = parseInt(hex.slice(4, 6), 16);
      return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    }
  }

  // Handle rgb() and rgba() - extract numeric components
  const rgbMatch = c.match(/rgba?\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/);
  if (rgbMatch) {
    const r = parseInt(rgbMatch[1], 10);
    const g = parseInt(rgbMatch[2], 10);
    const b = parseInt(rgbMatch[3], 10);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }

  // Fallback: return original color (for named colors, etc.)
  return c;
}
