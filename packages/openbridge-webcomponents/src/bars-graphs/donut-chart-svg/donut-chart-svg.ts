import {LitElement, PropertyValues, html, unsafeCSS, svg} from 'lit';
import {property, state} from 'lit/decorators.js';
import {styleMap} from 'lit/directives/style-map.js';
import componentStyle from './donut-chart-svg.css?inline';
import {customElement} from '../../decorator.js';

@customElement('obc-donut-chart-svg')
export class ObcDonutChartSvg extends LitElement {
  @property({attribute: false})
  data: {label: string; value: number}[] = [
    {label: 'Group A', value: 33},
    {label: 'Group B', value: 25},
    {label: 'Group C', value: 12},
    {label: 'Group D', value: 8},
    {label: 'Group E', value: 4},
  ];

  @property({attribute: false})
  colors: string[] = [];

  @property({type: Boolean, reflect: true}) half = false;
  @property({type: Number}) size = 220;
  @property({type: Number}) thickness = 28;
  @property({type: Number}) gap = 2;
  @property({type: Boolean}) showPercentLabels = false;
  @property({type: Number}) max = 100; // Maximum value for the chart

  @state() private total = 0;

  override willUpdate(changed: PropertyValues) {
    if (changed.has('data')) {
      this.total = (this.data ?? []).reduce(
        (s, d) => s + Number(d.value || 0),
        0
      );
    }
  }

  private getSegmentColor(i: number): string {
    // If custom colors provided, use them
    if (this.colors && this.colors.length > 0) {
      return this.colors[i % this.colors.length];
    }

    // Otherwise use default OpenBridge colors (TODO)
    const defaultColors = [
      'var(--base-blue-600)',
      'var(--base-blue-500)',
      'var(--base-blue-400)',
      'var(--base-blue-300)',
      'var(--base-blue-200)',
      'var(--base-blue-100)',
      'var(--base-blue-050)',
    ];
    return defaultColors[i % defaultColors.length];
  }

  override render() {
    const {size, thickness, gap, half, total, max} = this;
    const cx = size / 2;
    const cy = size / 2;
    const r = (size - thickness) / 2;
    const circumference = 2 * Math.PI * r;
    const usableCirc = circumference * (half ? 0.5 : 1);
    // SVG circles start at 3 o'clock by default
    // For half: rotate -90° to start at 9 o'clock (top half: 9->12->3)
    // For full: offset by -25% of circumference to start at 12 o'clock
    const startAngle = half ? -90 : 0;
    const startOffset = half
      ? (startAngle / 360) * circumference
      : -circumference * 0.25;
    const sum = Math.max(total, max); // Use max as the total if it's larger than data sum

    let cumulative = 0;

    // Build CSS custom properties for colors
    const colorStyles: Record<string, string> = {};
    this.data.forEach((_, i) => {
      colorStyles[`--segment-color-${i}`] = this.getSegmentColor(i);
    });

    return html`
      <div class="wrap" style=${styleMap(colorStyles)}>
        <svg
          width="${size}"
          height="${size}"
          viewBox="0 0 ${size} ${size}"
          xmlns="http://www.w3.org/2000/svg"
        >
          <!-- Background circle -->
          <circle
            class="background"
            cx="${cx}"
            cy="${cy}"
            r="${r}"
            fill="none"
            stroke-width="${thickness}"
            transform="rotate(${startAngle} ${cx} ${cy})"
            style="stroke-dasharray: ${usableCirc} ${circumference -
            usableCirc}; stroke-dashoffset: ${-startOffset};"
          ></circle>

          <!-- Data segments -->
          ${this.data.map((d, i) => {
            const segLen = (d.value / sum) * usableCirc - gap;
            if (segLen <= 0) {
              return null;
            }
            const dashArray = `${segLen} ${circumference - segLen}`;
            const dashOffset = -startOffset - cumulative;
            cumulative += segLen + gap;
            return svg`
              <circle
                class="segment segment-${i}"
                cx="${cx}"
                cy="${cy}"
                r="${r}"
                fill="none"
                stroke-width="${thickness}"
                transform="rotate(${startAngle} ${cx} ${cy})"
                style="stroke-dasharray: ${dashArray}; stroke-dashoffset: ${dashOffset};"
              ></circle>
            `;
            // TODO: check stroke-linecap="round"
          })}
        </svg>

        <div class="center">
          <div class="value">${total}</div>
          <div class="label">Total</div>
        </div>
      </div>
    `;
  }

  static override styles = unsafeCSS(componentStyle);
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-donut-chart-svg': ObcDonutChartSvg;
  }
}
