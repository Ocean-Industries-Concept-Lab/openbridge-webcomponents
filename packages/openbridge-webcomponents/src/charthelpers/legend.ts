/** One row of a chart legend. */
export interface LegendItem {
  /** Swatch colour. A value that is not a CSS colour leaves the swatch unpainted. */
  fillStyle: string;
  label: string;
  value: string;
  unit: string;
}

function span(className: string, text = ''): HTMLSpanElement {
  const el = document.createElement('span');
  el.className = className;
  el.textContent = text;
  return el;
}

/**
 * Fills a chart's legend with one row per item, replacing what was there.
 *
 * Labels, values, units and colours come from the consumer's data, which an
 * application often takes from a backend or from what a user typed. They are
 * written as text and as a single style value, never as markup: a label
 * containing HTML shows up as that literal text.
 *
 * @param container - The legend element to fill
 * @param items - The rows, in display order; an empty list clears the legend
 */
export function renderLegend(
  container: HTMLElement,
  items: readonly LegendItem[]
): void {
  container.replaceChildren(
    ...items.map((item) => {
      const swatch = span('legend-color');
      swatch.style.backgroundColor = item.fillStyle;

      const label = span('legend-group legend-group--label');
      label.append(swatch, span('legend-label', item.label));

      const valueUnit = span('legend-group legend-group--value-unit');
      valueUnit.append(
        span('legend-value', item.value),
        span('legend-unit', item.unit)
      );

      const row = document.createElement('div');
      row.className = 'legend-item';
      row.append(label, valueUnit);
      return row;
    })
  );
}

/**
 * The legend rows as an HTML string, with every value escaped.
 *
 * @deprecated Use `renderLegend()`, which fills the legend element itself.
 * @param legendItems - The rows, in display order
 * @returns The rows' markup
 */
export function generateLegendHTML(legendItems: readonly LegendItem[]): string {
  const holder = document.createElement('div');
  renderLegend(holder, legendItems);
  // A read, not a write: serialising the nodes escapes the text they hold.
  return holder.innerHTML;
}
