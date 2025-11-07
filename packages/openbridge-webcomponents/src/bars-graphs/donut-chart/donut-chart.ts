import {LitElement, PropertyValues, html, unsafeCSS} from 'lit';
import {property, query, state} from 'lit/decorators.js';
import componentStyle from './donut-chart.css?inline';
import chartDebugStyle from '../../charthelpers/chart-debug.css?inline';
import {customElement} from '../../decorator.js';
import {Chart, DoughnutController, ArcElement, Tooltip, Legend} from 'chart.js';
import type {Plugin, ChartOptions, ChartDataset} from 'chart.js';
import {
  CHART_SECTOR_DEFAULT_COLORS,
  CHART_DIMENSIONS,
  OUTER_LABEL_CONFIG,
  CENTER_READOUT_CONFIG,
  getCssVariableValue,
  getChartColorsOrDefault,
  observeThemeChanges,
  calculateSumTotal,
  formatNumericValue,
  createArcOuterLabelPlugin,
  calculateFixedHeightChartLayout,
} from '../../charthelpers/index.js';

// Register Chart.js components
Chart.register(DoughnutController, ArcElement, Tooltip, Legend);

// Donut-specific dimension constants (extends shared CHART_DIMENSIONS)
const DONUT_DIMENSIONS = {
  ...CHART_DIMENSIONS,
  GAP_WIDTH: 0,
  GAP_AND_BORDER_COLOR: '--container-section-color',
  REMAINING_COLOR: '--border-outline-color',
  get HALF_ASPECT_RATIO() {
    return (
      (this.CHART_WIDTH + this.CANVAS_PADDING * 2) /
      (this.CHART_WIDTH / 2 + this.CANVAS_PADDING * 2)
    ); // 320 / 192 = 1.666666667
  },
  FULL_ASPECT_RATIO: 1, // square
  BORDER_RADIUS: 4,
} as const;

const DONUT_RECREATE_PROP_NAMES = [
  'half',
  'showOuterLabels',
  'showUnit',
  'outerLabelUnit',
  'outerLabelMaxLength',
  'outerLabelDecimalPlaces',
  'showDebugOverlay',
  'fixedHeight',
] as const;

const DONUT_WATCHED_PROP_NAMES = [
  'data',
  'colors',
  'half',
  'thickness',
  'max',
  'showOuterLabels',
  'showUnit',
  'centerReadoutLabel',
  'outerLabelUnit',
  'outerLabelMaxLength',
  'outerLabelDecimalPlaces',
  'showDebugOverlay',
  'fixedHeight',
] as const;

/**
 * `<obc-donut-chart>` – A customizable donut chart component for visualizing proportional data with a center total readout.
 *
 * This component renders an interactive donut chart powered by Chart.js, displaying data segments as arcs with optional outer labels and a centered total value. It supports both full-circle (360°) and half-circle (180°) layouts, making it versatile for dashboards, analytics, and data visualization interfaces.
 *
 * The chart automatically calculates percentages, handles remaining/unfilled capacity, and adapts its layout based on available space. Labels and center readouts are hidden when the chart is too small (< 192px height), ensuring visual clarity at all sizes.
 *
 * ## Features
 * - **Fixed Height ⇒ Fixed Circumference:** The chart's circumference is determined by the `fixedHeight` property (default: 320px). This ensures the donut's circumference remains consistent and matches other radial instruments, regardless of the available browser or container width. The chart does not scale to fill the width; instead, it always uses the specified fixed height to define its size and circumference.
 * - **Layout Modes:**
 *   - `Full Circle` (default): Complete 360° donut chart.
 *   - `Half Circle`: Semicircular 180° layout, useful for gauges or space-constrained displays.
 * - **Center Readout:**
 *   - Displays the sum total of all data values with a customizable label (e.g., "Total", "Power", "Usage").
 * - **Outer Labels:**
 *   - Optional labels positioned outside the chart showing segment names and values.
 *   - Supports percentage or custom units (e.g., "kW", "kg", "MB").
 *   - Configurable decimal places and maximum label length (with trimming).
 * - **Capacity Visualization:**
 *   - Optionally show remaining/unfilled capacity when `max` is set higher than the total.
 *   - Remaining sector uses a distinct color to indicate available space.
 * - **Customization:**
 *   - Custom segment colors (with automatic fallback to theme palette).
 *   - Adjustable ring thickness (default 24px).
 * - **Responsive Behavior:**
 *   - Automatically hides labels and center readout when height < 192px.
 *   - Maintains aspect ratio and adjusts padding for optimal label positioning.
 * - **Theme Integration:**
 *   - Colors update automatically when the `data-obc-theme` attribute changes on the `<html>` element.
 *   - Example:
 *     ```
 *     <html lang="en" data-obc-theme="day"></html>
 *     ```
 *
 * ## Example
 *
 * **Basic Usage (Full Circle)**
 * ```html
 * <obc-donut-chart></obc-donut-chart>
 * <script>
 *   document.querySelector('obc-donut-chart').data = [
 *     {label: 'CPU', value: 45},
 *     {label: 'Memory', value: 30},
 *     {label: 'Storage', value: 15}
 *   ];
 * </script>
 * ```
 *
 * **Half Circle with Custom Units**
 * ```html
 * <obc-donut-chart
 *   data-half
 *   data-outer-label-unit="kW"
 *   data-outer-label-decimal-places="1"
 *   data-max="150"
 *   data-center-label="Power"
 *   data-thickness="32"
 * ></obc-donut-chart>
 * <script>
 *   document.querySelector('obc-donut-chart').data = [
 *     {label: 'Engine', value: 75.5},
 *     {label: 'HVAC', value: 42.3},
 *     {label: 'Lights', value: 12.8}
 *   ];
 * </script>
 * ```
 *
 * **Custom Colors**
 * ```html
 * <obc-donut-chart></obc-donut-chart>
 * <script>
 *   const chart = document.querySelector('obc-donut-chart');
 *   chart.data = [
 *     {label: 'Critical', value: 20},
 *     {label: 'Warning', value: 35},
 *     {label: 'Normal', value: 45}
 *   ];
 *   chart.colors = ['#e74c3c', '#f39c12', '#2ecc71'];
 * </script>
 * ```
 *
 * @property {Array<{label: string, value: number}>} data - Chart data segments (set via JavaScript)
 * @property {string[]} colors - Custom segment colors (set via JavaScript) with fallback to theme palette
 * @property {boolean} half - Whether to display as half-circle (180°) or full circle (360°), default: false
 * @property {boolean} showOuterLabels - Show outer labels, default: true
 * @property {boolean} showUnit - Whether to show unit in labels, default: true
 * @property {string} outerLabelUnit - Unit string to append to outer labels, default: "%"
 * @property {number} outerLabelMaxLength - Maximum character length for labels before trim (0 = no limit), default: 0
 * @property {number} outerLabelDecimalPlaces - Number of decimal places in labels, default: 0
 * @property {string} centerReadoutLabel - Text label shown below the center total value, default: "Total"
 * @property {string} centerReadoutUnit - Unit string shown inline after the label in the center readout, default: "%"
 * @property {number} max - Maximum value for calculating remaining empty sector, default: 100
 * @property {number} thickness - Donut ring thickness in pixels, default: 24
 * @property {boolean} showDebugOverlay - Show debug overlay for development, default: false
 * @property {number} fixedHeight - Fixed height of the chart in pixels (mandatory, determines chart circumference), default: 320. The chart's circumference is always based on this fixed height to match other radial instruments.
 */
@customElement('obc-donut-chart')
export class ObcDonutChart extends LitElement {
  @property({attribute: false})
  data: {label: string; value: number}[] = [];

  @property({attribute: false})
  colors: string[] = [];

  @property({type: Boolean, reflect: true, attribute: 'data-half'})
  half = false;

  @property({type: Boolean, reflect: true, attribute: 'data-show-outer-labels'})
  showOuterLabels = true;

  @property({type: Boolean, reflect: true, attribute: 'data-show-unit'})
  showUnit = true;

  @property({type: String, reflect: true, attribute: 'data-outer-label-unit'})
  outerLabelUnit = '%';

  @property({
    type: Number,
    reflect: true,
    attribute: 'data-max-outer-label-length',
  })
  outerLabelMaxLength = 0;

  @property({
    type: Number,
    reflect: true,
    attribute: 'data-outer-label-decimal-places',
  })
  outerLabelDecimalPlaces = 0;

  @property({type: String, reflect: true, attribute: 'data-center-label'})
  centerReadoutLabel = 'Total';

  /**
   * Unit string shown inline after the label in the center readout (styled separately)
   * @type {string}
   */
  @property({type: String, reflect: true, attribute: 'data-center-unit'})
  centerReadoutUnit = '%';

  @property({type: Number, reflect: true, attribute: 'data-max'})
  max = 100;

  @property({type: Number, reflect: true, attribute: 'data-thickness'})
  thickness = 24;

  @property({type: Boolean, reflect: true, attribute: 'data-debug'})
  showDebugOverlay = false;

  @property({type: Number, reflect: true, attribute: 'data-fixed-height'})
  fixedHeight = 320;

  /** @internal */
  @state() private total = 0;

  /** @internal - Pre-formatted labels for outer label rendering */
  @state() private formattedLabels: string[] = [];

  /** @internal */
  @query('canvas') private canvasEl?: HTMLCanvasElement;

  /** @internal */
  private chart?: Chart;

  /** @internal */
  private themeObserver?: MutationObserver;

  /** @internal - ResizeObserver for tracking width threshold crossings (e.g. MIN_WIDTH_WITH_LABELS = 192px) */
  private resizeObserver?: ResizeObserver;

  /** @internal - Track previous state to detect threshold crossing */
  private wasAboveThreshold = true;

  private hasAnyChanged(
    changed: PropertyValues,
    props: readonly (keyof ObcDonutChart)[]
  ): boolean {
    return props.some((prop) => changed.has(prop));
  }

  /**
   * Get layout configuration for canvas calculation
   */
  private getLayoutConfig() {
    // Denominator: use max if set, otherwise total, with minimum of 1
    const denominator =
      this.max > 0 ? this.max : this.total > 0 ? this.total : 1;

    return {
      unit: this.outerLabelUnit,
      showUnit: this.showUnit,
      outerLabelMaxLength: this.outerLabelMaxLength,
      decimalPlaces: this.outerLabelDecimalPlaces,
      data: this.data,
      denominator,
    };
  }

  // Calculate derived state BEFORE render
  override willUpdate(changed: PropertyValues) {
    if (changed.has('data')) {
      this.total = calculateSumTotal(this.data);
    }

    // Layout calculation moved to getChartOptions() and setupResizeObserver()
    // No need to calculate here - updated() will trigger chart recreation/update
    // which will recalculate layout in getChartOptions()
  }

  // Update external library AFTER render
  override updated(changed: PropertyValues) {
    super.updated(changed);

    // Keep centerReadoutUnit in sync with outerLabelUnit unless explicitly set
    if (changed.has('outerLabelUnit')) {
      // Only update centerReadoutUnit if it was not explicitly set to something else in the same update
      if (
        !changed.has('centerReadoutUnit') ||
        this.centerReadoutUnit === changed.get('outerLabelUnit')
      ) {
        this.centerReadoutUnit = this.outerLabelUnit;
      }
    }

    if (this.hasAnyChanged(changed, DONUT_WATCHED_PROP_NAMES)) {
      // Recreate chart when major layout properties change or when plugin configuration changes
      // These properties affect aspect ratio calculation, plugin registration, or outer label rendering
      const needsRecreation = this.hasAnyChanged(
        changed,
        DONUT_RECREATE_PROP_NAMES
      );

      if (needsRecreation) {
        this.chart?.destroy();
        this.createChart();
      } else {
        this.updateChart();
      }
    }
  }

  override firstUpdated() {
    this.createChart();
    this.themeObserver = observeThemeChanges(() => this.updateChartColors());
    this.setupResizeObserver();
  }

  override disconnectedCallback() {
    super.disconnectedCallback();
    this.chart?.destroy();
    this.themeObserver?.disconnect();
    this.resizeObserver?.disconnect();
  }

  /**
   * Setup resize observer to detect width threshold crossings
   * Recreates chart when crossing MIN_WIDTH_WITH_LABELS (192px) to show/hide labels
   */
  /**
   * Setup resize observer to detect when fixedHeight property changes programmatically
   * (e.g., via Storybook controls or user code)
   */
  private setupResizeObserver() {
    if (!this.canvasEl) return;

    this.resizeObserver = new ResizeObserver(() => {
      if (!this.chart) return;

      const height = this.canvasEl?.clientHeight ?? 0;
      const isAboveThreshold =
        height >= CHART_DIMENSIONS.MIN_HEIGHT_WITH_LABELS;

      // Only recreate chart if we crossed the threshold
      if (isAboveThreshold !== this.wasAboveThreshold) {
        this.wasAboveThreshold = isAboveThreshold;
        this.chart.destroy();
        this.createChart();
      } else {
        // Height changed but didn't cross threshold - just update
        this.updateChart();
      }
    });

    this.resizeObserver.observe(this.canvasEl);

    // Initialize threshold state
    const height = this.canvasEl.clientHeight;
    this.wasAboveThreshold = height >= CHART_DIMENSIONS.MIN_HEIGHT_WITH_LABELS;
  }

  private prepareChartData() {
    const values = this.data.map((d) => d.value);
    const labels = this.data.map((d) => d.label);
    const remaining = Math.max(0, this.max - this.total);
    const chartColors = getChartColorsOrDefault(
      this,
      this.colors,
      CHART_SECTOR_DEFAULT_COLORS
    );
    const segmentColors = values.map(
      (_, index) =>
        chartColors[index % chartColors.length] ??
        getCssVariableValue(this, DONUT_DIMENSIONS.REMAINING_COLOR)
    );

    return {
      values: [...values, remaining],
      labels: [...labels, 'Remaining'],
      colors: [
        ...segmentColors,
        getCssVariableValue(this, DONUT_DIMENSIONS.REMAINING_COLOR),
      ],
    };
  }

  /**
   * Build a dataset configuration object shared by both createChart and updateChart
   */
  private createDatasetConfig(
    values: number[],
    colors: (string | CanvasGradient | CanvasPattern)[]
  ): ChartDataset<'doughnut', number[]> {
    return {
      data: values,
      backgroundColor: colors,
      borderWidth: 1,
      borderColor: getCssVariableValue(
        this,
        DONUT_DIMENSIONS.GAP_AND_BORDER_COLOR
      ),
      borderRadius: this.getBorderRadius(values),
      spacing: DONUT_DIMENSIONS.GAP_WIDTH,
    };
  }

  /**
   * Get Chart.js options using centralized fixed height layout calculation
   */
  private getChartOptions(): ChartOptions<'doughnut'> {
    // Use centralized layout calculation helper
    const dimensions = calculateFixedHeightChartLayout({
      fixedHeight: this.fixedHeight,
      isHalfMode: this.half,
      showOuterLabels: this.showOuterLabels,
      canvasEl: this.canvasEl,
      layoutConfig: this.getLayoutConfig(),
      host: this,
    });

    // Store formatted labels for use in plugins
    this.formattedLabels = dimensions.formattedLabels;

    // Set CSS variables for wrapper and canvas sizing
    this.style.setProperty('--chart-width', `${dimensions.calculatedWidth}px`);
    this.style.setProperty('--chart-height', `${dimensions.actualHeight}px`);

    // Calculate dynamic padding for Chart.js layout
    const dynamicPadding = dimensions.isTooSmall
      ? {top: 0, right: 0, bottom: 0, left: 0}
      : {
          top: dimensions.topPadding,
          right: dimensions.rightPadding,
          bottom: dimensions.bottomPadding,
          left: dimensions.leftPadding,
        };

    return {
      responsive: true,
      maintainAspectRatio: true,
      aspectRatio: dimensions.aspectRatio,
      rotation: this.half ? -90 : 0,
      circumference: this.half ? 180 : 360,
      cutout: `${((DONUT_DIMENSIONS.CHART_WIDTH - this.thickness * 2) / DONUT_DIMENSIONS.CHART_WIDTH) * 100}%`,
      layout: {
        padding: dynamicPadding ?? DONUT_DIMENSIONS.CANVAS_PADDING,
      },
      plugins: {
        legend: {display: false},
        tooltip: {
          enabled: !dimensions.isTooSmall,
          filter: (tooltipItem) => tooltipItem.label !== 'Remaining',
          callbacks: {
            label: (context) => {
              const value = context.parsed;
              // Denominator: use max if set, otherwise total, with minimum of 1
              const denominator =
                this.max > 0 ? this.max : this.total > 0 ? this.total : 1;
              // Calculate percentage if unit is "%", otherwise use raw value
              const isPercentage = this.outerLabelUnit === '%';
              const numericValue = formatNumericValue(
                value,
                denominator,
                isPercentage,
                this.outerLabelDecimalPlaces
              );
              // Add unit if showUnit is true
              const formattedValue =
                this.showUnit && this.outerLabelUnit
                  ? `${numericValue}${this.outerLabelUnit}`
                  : numericValue;
              return ` ${formattedValue}`;
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

  private createOuterLabelDonutPlugin(): Plugin<'doughnut'> {
    const basePlugin = createArcOuterLabelPlugin(this, {
      formattedLabels: this.formattedLabels,
    }) as Plugin<'doughnut'>;

    // Wrap the afterDatasetsDraw to check height first
    const originalAfterDatasetsDraw = basePlugin.afterDatasetsDraw;
    if (originalAfterDatasetsDraw) {
      basePlugin.afterDatasetsDraw = (chart, args, pluginOptions, options) => {
        // Check height before drawing labels
        const canvasHeight = this.canvasEl?.clientHeight ?? 0;
        if (canvasHeight < CHART_DIMENSIONS.MIN_HEIGHT_WITH_LABELS) {
          return;
        }
        originalAfterDatasetsDraw(chart, args, pluginOptions, options);
      };
    }

    return basePlugin;
  }

  private createCenterReadoutDonutPlugin(): Plugin<'doughnut'> {
    return {
      id: 'centerText',
      beforeDraw: (chart) => {
        const {ctx, chartArea} = chart;
        const {width, height, left, top} = chartArea;

        // Hide center text if canvas is too small
        const canvasHeight = this.canvasEl?.clientHeight ?? 0;
        if (canvasHeight < CHART_DIMENSIONS.MIN_HEIGHT_WITH_LABELS) {
          return;
        }

        ctx.save();
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        const centerX = left + width / 2;
        const fontFamily = getCssVariableValue(
          this,
          OUTER_LABEL_CONFIG.fontFamily
        );
        const lineGap = 4;

        // Setup and measure centered readout value text
        const valueFontWeight = getCssVariableValue(
          this,
          CENTER_READOUT_CONFIG.value.fontWeightVar
        );
        const valueFontSize = getCssVariableValue(
          this,
          CENTER_READOUT_CONFIG.value.fontSizeVar
        );
        const valueColor = getCssVariableValue(
          this,
          CENTER_READOUT_CONFIG.value.fontColorVar
        );
        ctx.font = `${valueFontWeight} ${valueFontSize} ${fontFamily}`;
        // Center readout always shows raw total value without decimal places
        const centerValueText = this.total.toFixed(0);
        const valueMetrics = ctx.measureText(centerValueText);
        const valueHeight =
          valueMetrics.actualBoundingBoxAscent +
          valueMetrics.actualBoundingBoxDescent;

        // Setup and measure centered readout label and unit text (inline, different styles)
        const labelFontWeight = getCssVariableValue(
          this,
          CENTER_READOUT_CONFIG.label.fontWeightVar
        );
        const labelFontSize = getCssVariableValue(
          this,
          CENTER_READOUT_CONFIG.label.fontSizeVar
        );
        const labelColor = getCssVariableValue(
          this,
          CENTER_READOUT_CONFIG.label.fontColorVar
        );
        const unitFontWeight = getCssVariableValue(
          this,
          CENTER_READOUT_CONFIG.unit.fontWeightVar
        );
        const unitFontSize = getCssVariableValue(
          this,
          CENTER_READOUT_CONFIG.unit.fontSizeVar
        );
        const unitColor = getCssVariableValue(
          this,
          CENTER_READOUT_CONFIG.unit.fontColorVar
        );
        const centerReadoutLabelText = this.centerReadoutLabel;
        const centerReadoutUnitText = this.centerReadoutUnit;
        const space = centerReadoutUnitText ? ' ' : '';
        ctx.font = `${labelFontWeight} ${labelFontSize} ${fontFamily}`;
        const labelMetrics = ctx.measureText(centerReadoutLabelText);
        const spaceMetrics = ctx.measureText(space);
        ctx.font = `${unitFontWeight} ${unitFontSize} ${fontFamily}`;
        const unitMetrics = ctx.measureText(centerReadoutUnitText);
        // Height is max of label and unit
        const labelHeight = Math.max(
          labelMetrics.actualBoundingBoxAscent +
            labelMetrics.actualBoundingBoxDescent,
          unitMetrics.actualBoundingBoxAscent +
            unitMetrics.actualBoundingBoxDescent
        );

        // Calculate Y positions
        let valueY: number;
        let labelY: number;

        if (this.half) {
          // For half donut: Get the actual arc center Y position from the chart metadata
          const meta = chart.getDatasetMeta(0);
          const arcCenterY = meta.data[0]
            ? (meta.data[0] as ArcElement).y
            : top + height;
          labelY =
            arcCenterY -
            Math.max(
              labelMetrics.actualBoundingBoxDescent,
              unitMetrics.actualBoundingBoxDescent
            );
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
            Math.max(
              labelMetrics.actualBoundingBoxAscent,
              unitMetrics.actualBoundingBoxAscent
            );
        }

        // Draw centered readout value
        ctx.font = `${valueFontWeight} ${valueFontSize} ${fontFamily}`;
        ctx.fillStyle = valueColor;
        ctx.fillText(centerValueText, centerX, valueY);

        // Draw centered readout label and unit inline, with different styles
        // Measure total width for centering
        ctx.font = `${labelFontWeight} ${labelFontSize} ${fontFamily}`;
        const labelWidth = labelMetrics.width;
        const spaceWidth = spaceMetrics.width;
        ctx.font = `${unitFontWeight} ${unitFontSize} ${fontFamily}`;
        const unitWidth = unitMetrics.width;
        const totalWidth =
          labelWidth + (centerReadoutUnitText ? spaceWidth + unitWidth : 0);
        // Draw label
        ctx.font = `${labelFontWeight} ${labelFontSize} ${fontFamily}`;
        ctx.fillStyle = labelColor;
        ctx.fillText(
          centerReadoutLabelText,
          centerX - totalWidth / 2 + labelWidth / 2,
          labelY
        );
        // Draw space and unit (if present)
        if (centerReadoutUnitText) {
          // Draw space (in label font)
          ctx.font = `${labelFontWeight} ${labelFontSize} ${fontFamily}`;
          ctx.fillStyle = labelColor;
          ctx.fillText(
            space,
            centerX - totalWidth / 2 + labelWidth + spaceWidth / 2,
            labelY
          );
          // Draw unit (in unit font)
          ctx.font = `${unitFontWeight} ${unitFontSize} ${fontFamily}`;
          ctx.fillStyle = unitColor;
          ctx.fillText(
            centerReadoutUnitText,
            centerX + totalWidth / 2 - unitWidth / 2,
            labelY
          );
        }

        ctx.restore();
      },
    };
  }

  private getBorderRadius(values: number[]) {
    // Full donuts don't need border radius
    if (!this.half) {
      return undefined;
    }

    // For half donuts, apply different radius to first and last segments (detail from Figma)
    const remaining = Math.max(0, this.max - this.total);
    const hasRemainingSegment = remaining > 0;

    return values.map((_value, index) => {
      // First segment gets left-side radius
      if (index === 0) {
        return {
          outerStart: DONUT_DIMENSIONS.BORDER_RADIUS,
          outerEnd: 0,
          innerStart: DONUT_DIMENSIONS.BORDER_RADIUS,
          innerEnd: 0,
        };
      }

      // Last visible segment gets right-side radius
      // If there's a remaining segment, it's always last; otherwise the last data segment is last
      const isLastVisibleSegment = hasRemainingSegment
        ? index === values.length - 1
        : index === values.length - 2;

      if (isLastVisibleSegment) {
        return {
          outerStart: 0,
          outerEnd: DONUT_DIMENSIONS.BORDER_RADIUS,
          innerStart: 0,
          innerEnd: DONUT_DIMENSIONS.BORDER_RADIUS,
        };
      }

      // Middle segments don't need radius
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
        datasets: [this.createDatasetConfig(values, colors)],
      },
      options: this.getChartOptions(),
      plugins: [
        // Always include plugins; they check height internally during rendering
        ...(this.showOuterLabels ? [this.createOuterLabelDonutPlugin()] : []),
        this.createCenterReadoutDonutPlugin(),
      ],
    });
  }

  private updateChart() {
    if (!this.chart) return;

    const {values, labels, colors} = this.prepareChartData();

    this.chart.data.labels = labels;
    this.chart.data.datasets = [this.createDatasetConfig(values, colors)];

    const latestOptions = this.getChartOptions();
    if (this.chart.options) {
      Object.assign(this.chart.options, latestOptions);
    }

    this.chart.update();
  }

  /**
   * Update only chart colors without recalculating layout
   * Used by theme observer for efficient theme changes
   */
  private updateChartColors() {
    if (!this.chart) return;

    const {colors} = this.prepareChartData();

    // Update dataset colors
    if (this.chart.data.datasets[0]) {
      this.chart.data.datasets[0].backgroundColor = colors;
      this.chart.data.datasets[0].borderColor = getCssVariableValue(
        this,
        DONUT_DIMENSIONS.GAP_AND_BORDER_COLOR
      );
    }

    // Update without animation for instant theme change
    this.chart.update('none');
  }

  override render() {
    return html`
      <div class="wrapper">
        <canvas></canvas>
      </div>
    `;
  }

  static override styles = [
    unsafeCSS(componentStyle),
    unsafeCSS(chartDebugStyle),
  ];
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-donut-chart': ObcDonutChart;
  }
}
