/**
 * Generate HTML markup for a chart legend given legend items.
 * @param legendItems - Array of legend item objects with fillStyle, label, value, and unit
 * @returns HTML string for the legend
 */
export function generateLegendHTML(
  legendItems: Array<{
    fillStyle: string;
    label: string;
    value: string;
    unit: string;
  }>
): string {
  return legendItems
    .map(
      (item) => `
        <div class="legend-item">
          <span class="legend-group legend-group--label">
            <span class="legend-color" style="background-color: ${item.fillStyle};"></span>
            <span class="legend-label">${item.label}</span>
          </span>
          <span class="legend-group legend-group--value-unit">
            <span class="legend-value">${item.value}</span>
            <span class="legend-unit">${item.unit}</span>
          </span>
        </div>
      `
    )
    .join('');
}
