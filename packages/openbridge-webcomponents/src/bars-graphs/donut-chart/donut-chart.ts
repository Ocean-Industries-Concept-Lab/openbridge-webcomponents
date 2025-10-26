import {LitElement, PropertyValues, html, unsafeCSS} from 'lit';
import {property, query, state} from 'lit/decorators.js';
import componentStyle from './donut-chart.css?inline';
import {customElement} from '../../decorator.js';
import {Chart, DoughnutController, ArcElement, Tooltip, Legend} from 'chart.js';
import type {Plugin, ChartOptions, ChartDataset} from 'chart.js';

// Register Chart.js components
Chart.register(DoughnutController, ArcElement, Tooltip, Legend);

const CANVAS_PADDING = 32;
const DEFAULT_COLORS = [
  // '--base-blue-600',
  '--base-blue-500',
  '--base-blue-400',
  '--base-blue-300',
  '--base-blue-200',
  '--base-blue-100',
  // '--base-blue-050',
] as const;

// NOTE: Fallback hex values guarantee the chart keeps its palette if the CSS variables aren’t defined (e.g., when the component renders outside the design system). Without them, missing vars resolve to empty strings and segments render invisibly.
const COLOR_FALLBACKS: Record<string, string> = {
  // '--base-blue-600': '#5271BD',
  '--base-blue-500': '#6B84C7',
  '--base-blue-400': '#8497D1',
  '--base-blue-300': '#9DAADB',
  '--base-blue-200': '#B6BDE5',
  '--base-blue-100': '#CFD0EF',
  // '--base-blue-050': '#E8E3F9',
};

const OUTER_LABEL_CONFIG = {
  offset: 8, // NOTE: 8px comes from Figma, confirmed
  padding: 6, // TODO double-check
  fontSizeVar: '--global-typography-ui-label-font-size',
  fontWeightVar: '--global-typography-ui-label-font-weight',
} as const;

const CENTER_TEXT_CONFIG = {
  value: {
    fontSizeVar: '--global-typography-instrument-value-large-font-size',
    fontSizeFallback: '34px',
    fontWeightVar:
      '--global-typography-instrument-value-regular-font-weight-active',
    fontWeightFallback: '570',
    offsetY: -8, // TODO double-check
    colorVar: '--element-neutral-color',
    colorFallback: 'rgb(83, 83, 83)',
  },
  label: {
    fontSizeVar: '--global-typography-instrument-unit-font-size',
    fontSizeFallback: '16px',
    fontWeightVar: '--global-typography-instrument-unit-font-weight',
    fontWeightFallback: '570',
    offsetY: 16, // TODO double-check
    colorVar: '--instrument-regular-secondary-color',
    colorFallback: 'rgb(83, 83, 83)',
  },
} as const;

/**
 * `<obc-donut-chart>` – A customizable donut chart component powered by Chart.js.
 *
 * This component renders an interactive donut chart with support for full and half-circle layouts,
 * customizable colors, gap spacing, and percentage labels. It displays a center total value and
 * outer segment labels.
 *
 * @property {Array<{label: string, value: number}>} data - Chart data segments (e.g. `[{"label": "Sector A", "value": 33}, …]`)
 * @property {string[]} colors - Custom segment colors (uses theme palette when empty, e.g. `["#e74c3c", "#3498db", "#2ecc71", "#f39c12", "#9b59b6"]`)
 * @property {boolean} half - Whether to display as half-circle (180°) or full circle (360°)
 * @property {number} thickness - Donut ring thickness in pixels
 * @property {number} gap - Gap between segments in degrees. NOTE: in Chart.js is applied per arc but gets clamped to the arc’s own circumference. Small slices don’t have enough angular room, so their spacing collapses while larger slices keep the full value—hence wider-looking gaps. If you need equal gaps everywhere, either lower gap so it’s within every slice’s limit, or replace spacing with something custom (e.g. a plugin that trims start/end angles uniformly or a constant borderWidth matching the background).
 * @property {boolean} showOuterLabels - Show outer labels
 * @property {number} max - Maximum value (for calculating remaining empty sector, the default is 100)
 */
@customElement('obc-donut-chart')
export class ObcDonutChart extends LitElement {
  @property({attribute: false})
  data: {label: string; value: number}[] = [];

  @property({attribute: false}) colors: string[] = [];
  @property({type: Boolean, reflect: true}) half = false;
  /** @internal */
  private readonly size = 256;
  @property({type: Number}) thickness = 24;
  @property({type: Number}) gap = 1;
  @property({type: Boolean}) showOuterLabels = false;
  @property({type: Number}) max = 100;

  /** @internal */
  @state() private total = 0;

  /** @internal */
  @query('canvas') private canvasEl!: HTMLCanvasElement;

  /** @internal */
  private chart?: Chart;

  override willUpdate(changed: PropertyValues) {
    if (changed.has('data')) {
      this.total = this.calculateTotal();
    }
  }

  override updated(changed: PropertyValues) {
    super.updated(changed);

    if (this.shouldUpdateChart(changed)) {
      this.updateChart();
    }
  }

  override firstUpdated() {
    this.createChart();
  }

  override disconnectedCallback() {
    super.disconnectedCallback();
    this.chart?.destroy();
  }

  private calculateTotal(): number {
    return (this.data ?? []).reduce((sum, d) => sum + Number(d.value || 0), 0);
  }

  private shouldUpdateChart(changed: PropertyValues): boolean {
    const watchedProps = [
      'data',
      'colors',
      'half',
      'thickness',
      'gap',
      'max',
      'showOuterLabels',
    ];
    return watchedProps.some((prop) => changed.has(prop));
  }

  private getCSSVariable(name: string, fallback: string): string {
    return getComputedStyle(this).getPropertyValue(name).trim() || fallback;
  }

  private getDefaultColors(): string[] {
    return DEFAULT_COLORS.map((colorVar) =>
      this.getCSSVariable(colorVar, COLOR_FALLBACKS[colorVar])
    );
  }

  private getChartColors(): string[] {
    return this.colors.length > 0 ? this.colors : this.getDefaultColors();
  }

  private prepareChartData() {
    const values = this.data.map((d) => d.value);
    const labels = this.data.map((d) => d.label);
    const remaining = Math.max(0, this.max - this.total);
    const chartColors = this.getChartColors();
    const segmentColors = values.map(
      (_, index) => chartColors[index % chartColors.length] ?? '#dddddd'
    );

    return {
      values: [...values, remaining],
      labels: [...labels, 'Remaining'],
      colors: [...segmentColors, '#dddddd'],
    };
  }

  private getLayoutPadding():
    | number
    | Partial<Record<'top' | 'right' | 'bottom' | 'left', number>> {
    if (!this.half) {
      return CANVAS_PADDING;
    }
    return {
      top: CANVAS_PADDING,
      right: CANVAS_PADDING,
      bottom: CANVAS_PADDING + this.size / 2,
      left: CANVAS_PADDING,
    };
  }

  private getChartOptions(): ChartOptions<'doughnut'> {
    return {
      responsive: true,
      maintainAspectRatio: true,
      rotation: this.half ? -90 : 0,
      circumference: this.half ? 180 : 360,
      cutout: `${((this.size - this.thickness * 2) / this.size) * 100}%`,
      layout: {
        padding: this.getLayoutPadding(),
      },
      plugins: {
        legend: {display: false},
        tooltip: {
          enabled: true,
          filter: (tooltipItem) => tooltipItem.label !== 'Remaining',
          callbacks: {
            label: (context) => {
              const label = context.label || '';
              const value = context.parsed;
              const percentage = ((value / this.max) * 100).toFixed(1);
              return `${label}: ${value} (${percentage}%)`;
            },
          },
        },
      },
      animation: {
        animateRotate: true,
        animateScale: false,
      },
    };
  }

  private formatLabelValue(value: number): string {
    if (!this.showOuterLabels) {
      return value.toString();
    }
    const denominator =
      this.max > 0 ? this.max : this.total > 0 ? this.total : 1;
    const percentage = Math.round((value / denominator) * 100);
    return `${percentage}%`;
  }

  private createOuterLabelPlugin(): Plugin<'doughnut'> {
    return {
      id: 'outerLabels',
      afterDatasetsDraw: (chart) => {
        if (!this.showOuterLabels) return;

        const dataset = chart.data.datasets?.[0];
        const labels = chart.data.labels ?? [];
        if (!dataset) return;

        const meta = chart.getDatasetMeta(0);
        if (!meta?.data.length) return;

        const ctx = chart.ctx;
        const fontFamily = this.getCSSVariable(
          '--font-family-main',
          '"Noto Sans", sans-serif'
        );
        const fontWeight = this.getCSSVariable(
          OUTER_LABEL_CONFIG.fontWeightVar,
          '370'
        );
        const fontSize = this.getCSSVariable(
          OUTER_LABEL_CONFIG.fontSizeVar,
          '12px'
        );
        const fontColor = this.getCSSVariable(
          '--element-neutral-color',
          'rgb(83, 83, 83)'
        );

        ctx.save();
        ctx.font = `${fontWeight} ${fontSize} ${fontFamily}`;
        ctx.fillStyle = fontColor;
        ctx.textBaseline = 'middle';

        const values = (Array.isArray(dataset.data) ? dataset.data : []) as (
          | number
          | null
          | undefined
        )[];

        meta.data.forEach((element, index) => {
          const arc = element as ArcElement;
          const label = labels[index];

          if (!arc || label === 'Remaining') return;

          const rawValue = Number(values[index] ?? 0);
          if (!Number.isFinite(rawValue) || rawValue <= 0) return;

          const middleAngle = (arc.startAngle + arc.endAngle) / 2;
          const radius = arc.outerRadius + OUTER_LABEL_CONFIG.offset;
          const x = arc.x + Math.cos(middleAngle) * radius;
          const y = arc.y + Math.sin(middleAngle) * radius;
          const alignLeft = Math.cos(middleAngle) >= 0;

          ctx.textAlign = alignLeft ? 'left' : 'right';
          const textX = alignLeft
            ? x + OUTER_LABEL_CONFIG.padding
            : x - OUTER_LABEL_CONFIG.padding;
          const valueText = this.formatLabelValue(rawValue);

          ctx.fillText(valueText, textX, y);
        });

        ctx.restore();
      },
    };
  }

  private drawCenterText(
    ctx: CanvasRenderingContext2D,
    text: string,
    x: number,
    y: number,
    config: typeof CENTER_TEXT_CONFIG.value | typeof CENTER_TEXT_CONFIG.label
  ) {
    const fontFamily = this.getCSSVariable(
      '--font-family-main',
      '"Noto Sans", sans-serif'
    );
    const fontWeight = this.getCSSVariable(
      config.fontWeightVar,
      config.fontWeightFallback
    );
    const fontSize = this.getCSSVariable(
      config.fontSizeVar,
      config.fontSizeFallback
    );
    const color = this.getCSSVariable(config.colorVar, config.colorFallback);

    ctx.font = `${fontWeight} ${fontSize} ${fontFamily}`;
    ctx.fillStyle = color;
    ctx.fillText(text, x, y + config.offsetY);
  }

  private createCenterTextPlugin(): Plugin<'doughnut'> {
    return {
      id: 'centerText',
      beforeDraw: (chart) => {
        const {ctx, chartArea} = chart;
        const {width, height, left, top} = chartArea;

        ctx.save();
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        const centerX = left + width / 2;
        const baseY = this.half ? height : top + height / 2;

        this.drawCenterText(
          ctx,
          this.total.toString(),
          centerX,
          baseY,
          CENTER_TEXT_CONFIG.value
        );
        this.drawCenterText(
          ctx,
          'Total %',
          centerX,
          baseY,
          CENTER_TEXT_CONFIG.label
        );

        ctx.restore();
      },
    };
  }

  private getBorderRadius(values: number[]) {
    if (!this.half) {
      return undefined;
    }

    // For half donuts, apply different radius to first and last segments
    const remaining = Math.max(0, this.max - this.total);
    const hasRemainingSegment = remaining > 0;

    return values.map((_value, index) => {
      const isFirstSegment = index === 0;
      // If there's a remaining segment, it's always last; otherwise the last data segment is last
      const isLastVisibleSegment = hasRemainingSegment
        ? index === values.length - 1
        : index === values.length - 2;

      if (isFirstSegment) {
        return {
          outerStart: 4,
          outerEnd: 0,
          innerStart: 4,
          innerEnd: 0,
        };
      } else if (isLastVisibleSegment) {
        return {
          outerStart: 0,
          outerEnd: 4,
          innerStart: 0,
          innerEnd: 4,
        };
      }
      return 0;
    });
  }

  private createChart() {
    const ctx = this.canvasEl?.getContext('2d');
    if (!ctx) return;

    const {values, labels, colors} = this.prepareChartData();

    this.chart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels,
        datasets: [
          {
            data: values,
            backgroundColor: colors,
            borderWidth: 0,
            borderRadius: this.getBorderRadius(values),
            spacing: this.gap * 2,
          },
        ],
      },
      options: this.getChartOptions(),
      plugins: [this.createOuterLabelPlugin(), this.createCenterTextPlugin()],
    });
  }

  private updateChart() {
    if (!this.chart) return;

    const {values, labels, colors} = this.prepareChartData();

    this.chart.data.labels = labels;
    const dataset = this.chart.data.datasets[0] as ChartDataset<
      'doughnut',
      number[]
    > & {
      spacing?: number;
      borderRadius?:
        | number
        | {
            outerStart: number;
            outerEnd: number;
            innerStart: number;
            innerEnd: number;
          }
        | Array<
            | number
            | {
                outerStart: number;
                outerEnd: number;
                innerStart: number;
                innerEnd: number;
              }
          >;
    };
    dataset.data = values;
    dataset.backgroundColor = colors;
    dataset.borderRadius = this.getBorderRadius(values);
    dataset.spacing = this.gap * 2;

    if (this.chart.options) {
      const options = this.chart.options as ChartOptions<'doughnut'>;
      options.circumference = this.half ? 180 : 360;
      options.rotation = this.half ? -90 : 0;
      options.cutout = `${((this.size - this.thickness * 2) / this.size) * 100}%`;
      options.layout = {
        ...(options.layout ?? {}),
        padding: this.getLayoutPadding(),
      };
    }

    this.chart.update();
  }

  override render() {
    return html`
      <div class="wrapper">
        <canvas></canvas>
      </div>
    `;
  }

  static override styles = unsafeCSS(componentStyle);
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-donut-chart': ObcDonutChart;
  }
}
