import {LitElement, PropertyValues, html, unsafeCSS} from 'lit';
import {property, query, state} from 'lit/decorators.js';
import componentStyle from './donut-chart.css?inline';
import {customElement} from '../../decorator.js';
import {Chart, DoughnutController, ArcElement, Tooltip, Legend} from 'chart.js';
import type {Plugin, ChartOptions, ChartDataset} from 'chart.js';

// Register Chart.js components
Chart.register(DoughnutController, ArcElement, Tooltip, Legend);

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
  CANVAS_PADDING: 32,
  CHART_WIDTH: 256,
  MIN_CHART_WIDTH: 48, // Minimum chart width (excluding padding)
  GAP_WIDTH: 0,
  GAP_COLOR: '--container-section-color',
  REMAINING_COLOR: '--border-outline-color',
  MIN_WIDTH_FOR_CENTER_TEXT: 192, // Hide center readout below this width
  MIN_WIDTH_FOR_OUTER_LABELS: 64, // Hide outer labels below this width
  get CANVAS_WIDTH_INCLUDING_PADDING() {
    return this.CHART_WIDTH + this.CANVAS_PADDING * 2; // 320
  },
  get HALF_ASPECT_RATIO() {
    return (
      this.CANVAS_WIDTH_INCLUDING_PADDING /
      (this.CHART_WIDTH / 2 + this.CANVAS_PADDING * 2)
    ); // 320 / 192 = 1.666666667
  },
  FULL_ASPECT_RATIO: 1, // square
} as const;

const OUTER_LABEL_CONFIG = {
  radiusOffset: 8, // NOTE: 8px comes from Figma, confirmed
  padding: 6, // TODO double-check
  fontSizeVar: '--global-typography-ui-label-font-size',
  fontWeightVar: '--global-typography-ui-label-font-weight',
  fontColorVar: '--element-neutral-color',
} as const;

const CENTER_READOUT_CONFIG = {
  value: {
    fontSizeVar: '--global-typography-instrument-value-large-font-size',
    fontWeightVar:
      '--global-typography-instrument-value-regular-font-weight-active',
    fontColorVar: '--element-neutral-color',
  },
  label: {
    fontSizeVar: '--global-typography-instrument-unit-font-size',
    fontWeightVar: '--global-typography-instrument-unit-font-weight',
    fontColorVar: '--instrument-regular-secondary-color',
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
 * @property {string[]} colors - Custom segment colors (e.g. `["#e74c3c", "#3498db", "#2ecc71", "#f39c12", "#9b59b6"]`) with fallback to theme palette
 * @property {boolean} half - Whether to display as half-circle (180°) or full circle (360°)
 * @property {number} thickness - Donut ring thickness in pixels
 * @property {boolean} showOuterLabels - Show outer labels
 * @property {boolean} showPercentage - Show percentage sign in labels (default: true)
 * @property {string} centerLabel - Text label shown below the center total value (default: "Total")
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
  @property({type: Boolean}) showPercentage = true;
  @property({type: String}) centerLabel = 'Total';
  @property({type: Number}) max = 100;

  /** @internal */
  @state() private total = 0;

  /** @internal */
  @query('canvas') private canvasEl!: HTMLCanvasElement;

  /** @internal */
  private chart?: Chart;

  /** @internal */
  private themeObserver?: MutationObserver;

  /** @internal */
  private resizeObserver?: ResizeObserver;

  // Calculate derived state BEFORE render
  override willUpdate(changed: PropertyValues) {
    if (changed.has('data')) {
      this.total = this.calculateTotal();
    }
  }

  // Update external library AFTER render
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
    this.observeResize();
  }

  override disconnectedCallback() {
    super.disconnectedCallback();
    this.chart?.destroy();
    this.themeObserver?.disconnect();
    this.resizeObserver?.disconnect();
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

  private observeResize() {
    if (!this.canvasEl || !this.half) return;

    this.resizeObserver = new ResizeObserver(() => {
      if (!this.chart?.options) return;

      // Recalculate aspect ratio based on current canvas width
      this.chart.options.aspectRatio = this.getAspectRatio();
      this.chart.resize();
    });

    this.resizeObserver.observe(this.canvasEl);
  }

  private calculateTotal(): number {
    return (this.data ?? []).reduce((sum, d) => sum + Number(d.value || 0), 0);
  }

  private getAspectRatio(): number {
    if (!this.half) {
      return CHART_DIMENSIONS.FULL_ASPECT_RATIO;
    }

    // For half mode, calculate aspect ratio based on actual canvas width
    const canvasWidth =
      this.canvasEl?.clientWidth ||
      CHART_DIMENSIONS.CANVAS_WIDTH_INCLUDING_PADDING;
    const chartAreaWidth = canvasWidth - CHART_DIMENSIONS.CANVAS_PADDING * 2;
    const halfChartHeight = chartAreaWidth / 2;
    const requiredCanvasHeight =
      halfChartHeight + CHART_DIMENSIONS.CANVAS_PADDING * 2;

    return canvasWidth / requiredCanvasHeight;
  }

  private shouldUpdateChart(changed: PropertyValues): boolean {
    const watchedProps = [
      'data',
      'colors',
      'half',
      'thickness',
      'max',
      'showOuterLabels',
      'showPercentage',
      'centerLabel',
    ];
    return watchedProps.some((prop) => changed.has(prop));
  }

  private getCssVariableValue(name: string): string {
    return getComputedStyle(this).getPropertyValue(name).trim();
  }

  private getDefaultColors(): string[] {
    return SECTOR_COLORS.map((colorVar) => this.getCssVariableValue(colorVar));
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
      (_, index) =>
        chartColors[index % chartColors.length] ??
        this.getCssVariableValue(CHART_DIMENSIONS.REMAINING_COLOR)
    );

    return {
      values: [...values, remaining],
      labels: [...labels, 'Remaining'],
      colors: [
        ...segmentColors,
        this.getCssVariableValue(CHART_DIMENSIONS.REMAINING_COLOR),
      ],
    };
  }

  private getChartOptions(): ChartOptions<'doughnut'> {
    return {
      responsive: true,
      maintainAspectRatio: true,
      aspectRatio: this.getAspectRatio(),
      rotation: this.half ? -90 : 0,
      circumference: this.half ? 180 : 360,
      cutout: `${((CHART_DIMENSIONS.CHART_WIDTH - this.thickness * 2) / CHART_DIMENSIONS.CHART_WIDTH) * 100}%`,
      layout: {
        padding: CHART_DIMENSIONS.CANVAS_PADDING,
      },
      plugins: {
        legend: {display: false},
        tooltip: {
          enabled: true,
          filter: (tooltipItem) => tooltipItem.label !== 'Remaining', // TODO remaining text
          callbacks: {
            label: (context) => {
              // const label = context.label || '';
              const value = context.parsed;
              if (this.showPercentage) {
                const percentage = ((value / this.max) * 100).toFixed(1);
                return ` ${percentage}%`;
              }
              return ` ${value}`;
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

    if (!this.showPercentage) {
      return value.toString(); // Show absolute value
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

        const {width} = chart.chartArea;

        // Hide outer labels if canvas is too small
        // In half mode, require double the width due to aspect ratio
        const minWidth = this.half
          ? CHART_DIMENSIONS.MIN_WIDTH_FOR_OUTER_LABELS * 2
          : CHART_DIMENSIONS.MIN_WIDTH_FOR_OUTER_LABELS;

        if (width < minWidth) {
          return;
        }

        const dataset = chart.data.datasets?.[0];
        const labels = chart.data.labels ?? [];
        if (!dataset) return;

        const meta = chart.getDatasetMeta(0);
        if (!meta?.data.length) return;

        const ctx = chart.ctx;
        const fontFamily = this.getCssVariableValue('--font-family-main');
        const fontWeight = this.getCssVariableValue(
          OUTER_LABEL_CONFIG.fontWeightVar
        );
        const fontSize = this.getCssVariableValue(
          OUTER_LABEL_CONFIG.fontSizeVar
        );
        const fontColor = this.getCssVariableValue(
          OUTER_LABEL_CONFIG.fontColorVar
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
          const radius = arc.outerRadius + OUTER_LABEL_CONFIG.radiusOffset;
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

        // Hide center text if canvas is too small
        if (width < CHART_DIMENSIONS.MIN_WIDTH_FOR_CENTER_TEXT) {
          return;
        }

        ctx.save();
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        const centerX = left + width / 2;
        const fontFamily = this.getCssVariableValue('--font-family-main');
        const lineGap = 4;

        // Setup and measure centered readout value text
        const valueFontWeight = this.getCssVariableValue(
          CENTER_READOUT_CONFIG.value.fontWeightVar
        );
        const valueFontSize = this.getCssVariableValue(
          CENTER_READOUT_CONFIG.value.fontSizeVar
        );
        const valueColor = this.getCssVariableValue(
          CENTER_READOUT_CONFIG.value.fontColorVar
        );
        ctx.font = `${valueFontWeight} ${valueFontSize} ${fontFamily}`;
        const valueMetrics = ctx.measureText(this.total.toString());
        const valueHeight =
          valueMetrics.actualBoundingBoxAscent +
          valueMetrics.actualBoundingBoxDescent;

        // Setup and measure centered readout label text
        const labelFontWeight = this.getCssVariableValue(
          CENTER_READOUT_CONFIG.label.fontWeightVar
        );
        const labelFontSize = this.getCssVariableValue(
          CENTER_READOUT_CONFIG.label.fontSizeVar
        );
        const labelColor = this.getCssVariableValue(
          CENTER_READOUT_CONFIG.label.fontColorVar
        );
        ctx.font = `${labelFontWeight} ${labelFontSize} ${fontFamily}`;
        const centerLabelText = this.showPercentage
          ? `${this.centerLabel} %`
          : this.centerLabel;
        const labelMetrics = ctx.measureText(centerLabelText);
        const labelHeight =
          labelMetrics.actualBoundingBoxAscent +
          labelMetrics.actualBoundingBoxDescent;

        // Calculate Y positions
        let valueY: number;
        let labelY: number;

        if (this.half) {
          // For half donut: Get the actual arc center Y position from the chart metadata
          // The arc center is where the diameter line is (the equator of the semicircle)
          const meta = chart.getDatasetMeta(0);
          const arcCenterY = meta.data[0]
            ? (meta.data[0] as ArcElement).y
            : top + height;

          // Align label baseline to the arc center (diameter line)
          labelY = arcCenterY - labelMetrics.actualBoundingBoxDescent;
          valueY =
            labelY -
            labelHeight -
            lineGap -
            valueHeight +
            valueMetrics.actualBoundingBoxAscent;
        } else {
          // For full donut: center both lines vertically as a unit
          const totalTextHeight = valueHeight + lineGap + labelHeight;
          const centerY = top + height / 2;
          valueY =
            centerY -
            totalTextHeight / 2 +
            valueMetrics.actualBoundingBoxAscent;
          labelY =
            valueY +
            valueMetrics.actualBoundingBoxDescent +
            lineGap +
            labelMetrics.actualBoundingBoxAscent;
        }

        // Draw centered readout value
        ctx.font = `${valueFontWeight} ${valueFontSize} ${fontFamily}`;
        ctx.fillStyle = valueColor;
        ctx.fillText(this.total.toString(), centerX, valueY);

        // Draw centered readout label
        ctx.font = `${labelFontWeight} ${labelFontSize} ${fontFamily}`;
        ctx.fillStyle = labelColor;
        ctx.fillText(centerLabelText, centerX, labelY);

        ctx.restore();
      },
    };
  }

  private getBorderRadius(values: number[]) {
    if (!this.half) {
      return undefined;
    }

    // For half donuts, apply different radius to first and last segments (detail from Figma)
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
            borderWidth: 1,
            borderColor: this.getCssVariableValue(CHART_DIMENSIONS.GAP_COLOR),
            borderRadius: this.getBorderRadius(values),
            // NOTE: old calculation for gap width: The spacing: this.gap * 2 multiplication exists because Chart.js applies the spacing value per arc edge (both start and end), effectively halving the visual gap between segments.
            // By multiplying this.gap by 2, the actual spacing matches the user's intent: if they set gap={4}, they expect a 4-degree gap, not 2 degrees.
            // This idea was abandoned in favor of a fixed gap width which is simulated via borderWidth: 1.
            spacing: CHART_DIMENSIONS.GAP_WIDTH,
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
    dataset.borderWidth = 1;
    dataset.borderColor = this.getCssVariableValue(CHART_DIMENSIONS.GAP_COLOR);

    if (this.chart.options) {
      const options = this.chart.options as ChartOptions<'doughnut'>;
      options.aspectRatio = this.getAspectRatio();
      options.circumference = this.half ? 180 : 360;
      options.rotation = this.half ? -90 : 0;
      options.cutout = `${((CHART_DIMENSIONS.CHART_WIDTH - this.thickness * 2) / CHART_DIMENSIONS.CHART_WIDTH) * 100}%`;
      options.layout = {
        ...(options.layout ?? {}),
        padding: CHART_DIMENSIONS.CANVAS_PADDING,
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
