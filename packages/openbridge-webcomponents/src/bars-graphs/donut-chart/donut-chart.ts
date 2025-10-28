import {LitElement, PropertyValues, html, unsafeCSS} from 'lit';
import {property, query, state} from 'lit/decorators.js';
import componentStyle from './donut-chart.css?inline';
import {customElement} from '../../decorator.js';
import {Chart, DoughnutController, ArcElement, Tooltip, Legend} from 'chart.js';
import type {Plugin, ChartOptions, ChartDataset} from 'chart.js';

// Register Chart.js components
Chart.register(DoughnutController, ArcElement, Tooltip, Legend);

const CANVAS_PADDING = 32;
const GAP_COLOR = '--container-section-color';
const GAP_WIDTH = 0;
const SECTOR_COLORS = [
  // '--base-blue-600',
  '--base-blue-500',
  '--base-blue-400',
  '--base-blue-300',
  '--base-blue-200',
  '--base-blue-100',
  // '--base-blue-050',
] as const;

const CHART_DIMENSIONS = {
  CHART_WIDTH: 256,
  CANVAS_WIDTH_INCLUDING_PADDING: 256 + CANVAS_PADDING * 2, // 320
  get HALF_ASPECT_RATIO() {
    return (
      this.CANVAS_WIDTH_INCLUDING_PADDING /
      (this.CHART_WIDTH / 2 + CANVAS_PADDING * 2)
    ); // 320 / 192 = 1.666666667
  },
  FULL_ASPECT_RATIO: 1, // square
} as const;

const OUTER_LABEL_CONFIG = {
  offset: 8, // NOTE: 8px comes from Figma, confirmed
  padding: 6, // TODO double-check
  fontSizeVar: '--global-typography-ui-label-font-size',
  fontWeightVar: '--global-typography-ui-label-font-weight',
} as const;

const CENTER_READOUT_CONFIG = {
  value: {
    fontSizeVar: '--global-typography-instrument-value-large-font-size',
    fontWeightVar:
      '--global-typography-instrument-value-regular-font-weight-active',
    colorVar: '--element-neutral-color',
  },
  label: {
    fontSizeVar: '--global-typography-instrument-unit-font-size',
    fontWeightVar: '--global-typography-instrument-unit-font-weight',
    colorVar: '--instrument-regular-secondary-color',
  },
} as const;

/**
 * `<obc-donut-chart>` – A customizable donut chart component powered by Chart.js.
 *
 * This component renders an interactive donut chart with support for full and half-circle layouts,
 * customizable colors and percentage labels. It displays a center total value and
 * outer segment labels.
 *
 * @property {Array<{label: string, value: number}>} data - Chart data segments (e.g. `[{"label": "Sector A", "value": 33}, …]`)
 * @property {string[]} colors - Custom segment colors (uses theme palette when empty, e.g. `["#e74c3c", "#3498db", "#2ecc71", "#f39c12", "#9b59b6"]`)
 * @property {boolean} half - Whether to display as half-circle (180°) or full circle (360°)
 * @property {number} thickness - Donut ring thickness in pixels
 * @property {boolean} showOuterLabels - Show outer labels
 * @property {number} max - Maximum value (for calculating remaining empty sector, the default is 100)
 */
@customElement('obc-donut-chart')
export class ObcDonutChart extends LitElement {
  @property({attribute: false})
  data: {label: string; value: number}[] = [];

  @property({attribute: false}) colors: string[] = [];
  @property({type: Boolean, reflect: true}) half = false;
  @property({type: Number}) thickness = 24;
  @property({type: Boolean}) showOuterLabels = false;
  @property({type: Number}) max = 100;

  /** @internal */
  @state() private total = 0;

  /** @internal */
  @query('canvas') private canvasEl!: HTMLCanvasElement;

  /** @internal */
  private chart?: Chart;

  /** @internal */
  private themeObserver?: MutationObserver;

  override willUpdate(changed: PropertyValues) {
    if (changed.has('data')) {
      this.total = this.calculateTotal();
    }
  }

  override updated(changed: PropertyValues) {
    super.updated(changed);

    if (this.shouldUpdateChart(changed)) {
      // If half property changed, recreate the chart to apply new aspect ratio
      if (changed.has('half')) {
        this.chart?.destroy();
        this.createChart();
      } else {
        this.updateChart();
      }

      this.updateChart();
    }
  }

  override firstUpdated() {
    this.createChart();
    this.observeThemeChanges();
  }

  override disconnectedCallback() {
    super.disconnectedCallback();
    this.chart?.destroy();
    this.themeObserver?.disconnect();
  }

  private observeThemeChanges() {
    // Watch for theme attribute changes on the document root
    const root = document.documentElement;
    this.themeObserver = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (
          mutation.type === 'attributes' &&
          mutation.attributeName === 'data-obc-theme'
        ) {
          // Theme changed, update chart colors
          this.updateChart();
          break;
        }
      }
    });

    this.themeObserver.observe(root, {
      attributes: true,
      attributeFilter: ['data-obc-theme'],
    });
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
      'max',
      'showOuterLabels',
    ];
    return watchedProps.some((prop) => changed.has(prop));
  }

  private getCSSVariable(name: string): string {
    return getComputedStyle(this).getPropertyValue(name).trim();
  }

  private getDefaultColors(): string[] {
    return SECTOR_COLORS.map((colorVar) => this.getCSSVariable(colorVar));
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
      colors: [...segmentColors, '#dddddd'], // TODO remaining color variable
    };
  }

  private getChartOptions(): ChartOptions<'doughnut'> {
    return {
      responsive: true,
      maintainAspectRatio: true,
      aspectRatio: this.half ? CHART_DIMENSIONS.HALF_ASPECT_RATIO : 1,
      rotation: this.half ? -90 : 0,
      circumference: this.half ? 180 : 360,
      cutout: `${((CHART_DIMENSIONS.CHART_WIDTH - this.thickness * 2) / CHART_DIMENSIONS.CHART_WIDTH) * 100}%`,
      layout: {
        padding: CANVAS_PADDING,
      },
      plugins: {
        legend: {display: false},
        tooltip: {
          enabled: true,
          filter: (tooltipItem) => tooltipItem.label !== 'Remaining', // TODO remaining text
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
        animateRotate: false,
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
        const fontFamily = this.getCSSVariable('--font-family-main'); // TODO unify const vs. CSS var notion
        const fontWeight = this.getCSSVariable(
          OUTER_LABEL_CONFIG.fontWeightVar
        );
        const fontSize = this.getCSSVariable(OUTER_LABEL_CONFIG.fontSizeVar);
        const fontColor = this.getCSSVariable('--element-neutral-color');

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
        const fontFamily = this.getCSSVariable('--font-family-main');
        const lineGap = 4;

        // Setup and measure centered readout value text
        const valueFontWeight = this.getCSSVariable(CENTER_READOUT_CONFIG.value.fontWeightVar);
        const valueFontSize = this.getCSSVariable(CENTER_READOUT_CONFIG.value.fontSizeVar);
        const valueColor = this.getCSSVariable(CENTER_READOUT_CONFIG.value.colorVar);
        ctx.font = `${valueFontWeight} ${valueFontSize} ${fontFamily}`;
        const valueMetrics = ctx.measureText(this.total.toString());
        const valueHeight = valueMetrics.actualBoundingBoxAscent + valueMetrics.actualBoundingBoxDescent;

        // Setup and measure centered readout label text
        const labelFontWeight = this.getCSSVariable(CENTER_READOUT_CONFIG.label.fontWeightVar);
        const labelFontSize = this.getCSSVariable(CENTER_READOUT_CONFIG.label.fontSizeVar);
        const labelColor = this.getCSSVariable(CENTER_READOUT_CONFIG.label.colorVar);
        ctx.font = `${labelFontWeight} ${labelFontSize} ${fontFamily}`;
        const labelMetrics = ctx.measureText('Total %');
        const labelHeight = labelMetrics.actualBoundingBoxAscent + labelMetrics.actualBoundingBoxDescent;

        // Calculate Y positions
        let valueY: number;
        let labelY: number;

        if (this.half) {
          // For half donut: align the bottom of the second line to the chart bottom
          const chartBottom = top + height;
          labelY = chartBottom - labelMetrics.actualBoundingBoxDescent;
          valueY = labelY - labelHeight - lineGap - valueMetrics.actualBoundingBoxDescent;
        } else {
          // For full donut: center both lines vertically as a unit
          const totalTextHeight = valueHeight + lineGap + labelHeight;
          const centerY = top + height / 2;
          valueY = centerY - totalTextHeight / 2 + valueMetrics.actualBoundingBoxAscent;
          labelY = valueY + valueMetrics.actualBoundingBoxDescent + lineGap + labelMetrics.actualBoundingBoxAscent;
        }

        // Draw centered readout value
        ctx.font = `${valueFontWeight} ${valueFontSize} ${fontFamily}`;
        ctx.fillStyle = valueColor;
        ctx.fillText(this.total.toString(), centerX, valueY);

        // Draw centered readout label
        ctx.font = `${labelFontWeight} ${labelFontSize} ${fontFamily}`;
        ctx.fillStyle = labelColor;
        ctx.fillText('Total %', centerX, labelY);

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
            // borderWidth: 0,
            borderWidth: 1,
            borderColor: this.getCSSVariable(GAP_COLOR),
            borderRadius: this.getBorderRadius(values),
            // The spacing: this.gap * 2 multiplication exists because Chart.js applies the spacing value per arc edge (both start and end), effectively halving the visual gap between segments.
            // By multiplying this.gap by 2, the actual spacing matches the user's intent: if they set gap={4}, they expect a 4-degree gap, not 2 degrees.
            spacing: GAP_WIDTH,
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
    // dataset.spacing = GAP_WIDTH;
    dataset.borderWidth = 1;
    dataset.borderColor = this.getCSSVariable(GAP_COLOR);

    if (this.chart.options) {
      const options = this.chart.options as ChartOptions<'doughnut'>;
      options.aspectRatio = this.half ? CHART_DIMENSIONS.HALF_ASPECT_RATIO : 1;
      options.circumference = this.half ? 180 : 360;
      options.rotation = this.half ? -90 : 0;
      options.cutout = `${((CHART_DIMENSIONS.CHART_WIDTH - this.thickness * 2) / CHART_DIMENSIONS.CHART_WIDTH) * 100}%`;
      options.layout = {
        ...(options.layout ?? {}),
        padding: CANVAS_PADDING,
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
