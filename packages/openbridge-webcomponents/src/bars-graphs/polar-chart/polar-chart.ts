import {LitElement, PropertyValues, html, unsafeCSS} from 'lit';
import {property, query, state} from 'lit/decorators.js';
import componentStyle from './polar-chart.css?inline';
import chartCommonStyle from '../../charthelpers/chart-common.css?inline';
import chartDebugStyle from '../../charthelpers/chart-debug.css?inline';
import chartLegendStyle from '../../charthelpers/chart-legend.css?inline';
import {customElement} from '../../decorator.js';
import {
  Chart,
  PolarAreaController,
  RadialLinearScale,
  ArcElement,
  Tooltip,
} from 'chart.js';
import type {Plugin, ChartOptions, Chart as ChartInstance} from 'chart.js';
import type {RadialLinearScale as RadialLinearScaleType} from 'chart.js';
import {
  CHART_SECTOR_DEFAULT_COLORS,
  CHART_SECTOR_ENHANCED_COLORS,
  CHART_DIMENSIONS,
  getCssVariableValue,
  getChartColorsOrDefault,
  observeThemeChanges,
  createArcOuterLabelPlugin,
  calculateFixedHeightChartLayout,
  getChartTooltipOptions,
  formatNumericValue,
  generateLegendHTML,
} from '../../charthelpers/index.js';

type PolarScale = RadialLinearScaleType & {
  xCenter: number;
  yCenter: number;
  drawingArea: number;
};

// Register Chart.js components
Chart.register(PolarAreaController, RadialLinearScale, ArcElement, Tooltip);

// Polar-specific dimension constants
const POLAR_BAR_DIMENSIONS = {
  ...CHART_DIMENSIONS,
  GAP_AND_BORDER_COLOR: '--instrument-frame-tertiary-color',
} as const;

// Properties that require chart recreation (destroy and create)
const POLAR_RECREATE_PROP_NAMES = [
  'showOuterLabels',
  'outerLabelUnit',
  'outerLabelMaxLength',
  'outerLabelDecimalPlaces',
  'showSectorLabels',
  'discreteColorStops',
  'showDebugOverlay',
  'fixedHeight',
  'showUnit',
] as const;

// All properties that trigger chart updates
const POLAR_WATCHED_PROP_NAMES = [
  'legend',
  'data',
  'colors',
  'enhanced',
  'monochrome',
  'discreteColorStops',
  'showSectorLabels',
  'showOuterLabels',
  'outerLabelUnit',
  'outerLabelMaxLength',
  'outerLabelDecimalPlaces',
  'showDebugOverlay',
  'fixedHeight',
  'showUnit',
] as const;

/**
 * `<obc-polar-chart>` – A customizable polar area chart component for visualizing proportional data as sectors, with optional outer labels, angle display, and discrete color bands.
 *
 * This component renders an interactive polar area chart powered by Chart.js, displaying data segments as radial sectors with optional outer labels, angle display, and discrete color bands. It supports customizable colors, monochrome mode, and adapts its layout based on available space. Labels are hidden when the chart is too small (< 192px height), ensuring clarity at all sizes.
 *
 * ## Features
 * - **Fixed Height ⇒ Fixed Circumference:** The chart's circumference is determined by the `fixedHeight` property (default: 320px). This ensures the chart's circumference remains consistent and matches other radial instruments, regardless of the available browser or container width. The chart does not scale to fill the width; instead, it always uses the specified fixed height to define its size and circumference.
 * - **Layout:**
 *   - Full 360° polar area chart layout.
 * - **Outer Labels:**
 *   - Optional labels positioned outside the chart showing sector names or angles.
 *   - Supports percentage or custom units (e.g., "kW", "kg", "MB").
 *   - Configurable decimal places and maximum label length (with trimming).
 *   - Option to display angles (0°, 30°, etc.) instead of sector names.
 * - **Discrete Color Bands:**
 *   - Draw sectors as radial color bands from center outward using the colors array as threshold steps.
 *   - Option to trim sectors to the nearest color band boundary or show exact values with partial band fills.
 * - **Customization:**
 *   - Custom segment colors (with automatic fallback to theme palette).
 *   - Monochrome mode for single-color charts.
 *   - Adjustable outer label formatting and units.
 * - **Responsive Behavior:**
 *   - Automatically hides labels when height < 192px.
 *   - Maintains aspect ratio and adjusts padding for optimal label positioning.
 * - **Theme Integration:**
 *   - Colors update automatically when the `data-obc-theme` attribute changes on the `<html>` element.
 *   - Example:
 *     ```html
 *     <html lang="en" data-obc-theme="day"></html>
 *     ```
 *
 * ## Example
 *
 * **Basic Usage**
 * ```html
 * <obc-polar-chart></obc-polar-chart>
 * <script>
 *   document.querySelector('obc-polar-chart').data = [
 *     {label: 'Sector A', value: 33},
 *     {label: 'Sector B', value: 22},
 *     {label: 'Sector C', value: 45}
 *   ];
 * </script>
 * ```
 *
 * **With Discrete Color Bands**
 * ```html
 * <obc-polar-chart></obc-polar-chart>
 * <script>
 *   const chart = document.querySelector('obc-polar-chart');
 *   chart.discreteColorStops = true;
 *   chart.data = [
 *     {label: 'A', value: 50},
 *     {label: 'B', value: 30},
 *     {label: 'C', value: 20}
 *   ];
 * </script>
 * ```
 *
 * **Custom Colors and Angle Labels**
 * ```html
 * <obc-polar-chart></obc-polar-chart>
 * <script>
 *   const chart = document.querySelector('obc-polar-chart');
 *   chart.showSectorLabels = true;
 *   chart.outerLabelUnit = '°';
 *   chart.outerLabelDecimalPlaces = 0;
 *   chart.data = [
 *     {label: 'A', value: 20},
 *     {label: 'B', value: 35},
 *     {label: 'C', value: 45}
 *   ];
 *   chart.colors = ['#e74c3c', '#f39c12', '#2ecc71'];
 * </script>
 * ```
 *
 * @property {Array<{label: string, value: number}>} data - Chart data segments (set via JavaScript)
 * @property {string[]} colors - Custom segment colors (set via JavaScript) with fallback to theme palette
 * @property {boolean} monochrome - Use single color for all sectors (uses first color from array, default: false)
 * @property {boolean} discreteColorStops - Draw sectors as radial color bands from center outward using the colors array as threshold steps (default: false)
 * @property {boolean} trimToDiscreteStops - When true, visually trim sectors to the nearest discrete color band boundary. When false, show exact values with partial band fills (default: true)
 * @property {boolean} showSectorLabels - When true, display sector labels from data (e.g. "Sector A"). When false, display angle values (0°, 30°, etc.). Default: false
 * @property {boolean} showUnit - Whether to show unit in angle or outer labels, default: false
 * @property {boolean} showOuterLabels - Show outer labels, default: false
 * @property {string} outerLabelUnit - Unit string to append to outer labels, default: ""
 * @property {number} outerLabelMaxLength - Maximum character length for labels before trim (0 = no limit), default: 0
 * @property {number} outerLabelDecimalPlaces - Number of decimal places in labels, default: 0
 * @property {boolean} showDebugOverlay - Show debug overlay for development, default: false
 * @property {number} fixedHeight - Fixed height of the chart in pixels (mandatory, determines chart circumference), default: 320. The chart's circumference is always based on this fixed height to match other radial instruments.
 * @property {boolean} legend - Whether to display the legend below the chart, default: false
 */
@customElement('obc-polar-chart')
export class ObcPolarChart extends LitElement {
  @property({attribute: false})
  data: {label: string; value: number}[] = [];

  @property({attribute: false}) colors: string[] = [];

  /** @internal */
  private centerFirstSector = false; // When false, first sector is centered at 12 o'clock position

  @property({type: Boolean})
  enhanced = false;

  @property({type: Boolean}) monochrome = false;
  @property({type: Boolean})
  discreteColorStops = false;
  @property({type: Boolean})
  showSectorLabels = false; // Default: false (angles shown by default)
  @property({type: Boolean})
  showUnit = false;
  @property({type: Boolean})
  showOuterLabels = false;
  @property({type: String})
  outerLabelUnit = '°';
  @property({type: Number})
  outerLabelMaxLength = 0;
  @property({type: Number})
  outerLabelDecimalPlaces = 0;

  @property({type: Number, reflect: true})
  fixedHeight = 320;

  @property({type: Boolean, reflect: true})
  legend = false;

  @property({type: Boolean, reflect: true})
  showDebugOverlay = false;

  /** @internal - Pre-formatted labels for outer label rendering */
  @state()
  private formattedLabels: string[] = [];

  /** @internal - Calculated chart diameter from layout helper */
  private calculatedChartDiameter: number = CHART_DIMENSIONS.CHART_WIDTH;

  /** @internal */
  @query('canvas') private canvasEl!: HTMLCanvasElement;

  /** @internal */
  @query('.legend') private legendDiv?: HTMLDivElement;

  /** @internal */
  private chart?: Chart;

  /** @internal */
  private themeObserver?: MutationObserver;

  /** @internal - ResizeObserver for tracking height threshold crossings */
  private resizeObserver?: ResizeObserver;

  /** @internal - Track previous state to detect threshold crossing */
  private wasAboveThreshold = false;

  private hasAnyChanged(
    changed: PropertyValues,
    props: readonly (keyof ObcPolarChart)[]
  ): boolean {
    return props.some((prop) => changed.has(prop));
  }

  // Update external library AFTER render
  override updated(changed: PropertyValues) {
    super.updated(changed);

    if (this.hasAnyChanged(changed, POLAR_WATCHED_PROP_NAMES)) {
      // Recreate chart when major layout properties change or when plugin configuration changes
      // These properties affect aspect ratio calculation, plugin registration, or outer label rendering
      const needsRecreation = this.hasAnyChanged(
        changed,
        POLAR_RECREATE_PROP_NAMES
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
    this.themeObserver = observeThemeChanges(() => this.updateChart());
    this.setupResizeObserver();
  }

  override disconnectedCallback() {
    super.disconnectedCallback();
    this.chart?.destroy();
    this.themeObserver?.disconnect();
    this.resizeObserver?.disconnect();
  }

  /**
   * Setup resize observer to detect height threshold crossings
   * Recreates chart when crossing MIN_HEIGHT_WITH_LABELS (192px) to show/hide labels
   */
  private setupResizeObserver() {
    if (!this.canvasEl) return;

    this.resizeObserver = new ResizeObserver(() => {
      const height = this.canvasEl?.clientHeight ?? 0;
      const isAboveThreshold =
        height >= CHART_DIMENSIONS.MIN_HEIGHT_WITH_LABELS;

      // Only recreate chart if we crossed the threshold (need to add/remove plugins)
      if (isAboveThreshold !== this.wasAboveThreshold) {
        this.wasAboveThreshold = isAboveThreshold;
        this.chart?.destroy();
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
    const chartColors = getChartColorsOrDefault(
      this,
      this.colors,
      this.enhanced ? CHART_SECTOR_ENHANCED_COLORS : CHART_SECTOR_DEFAULT_COLORS
    );

    // When using discrete color stops, sectors will be drawn by the plugin
    // so we can use transparent colors for the main dataset
    const segmentColors = this.discreteColorStops
      ? values.map(() => 'transparent')
      : values.map((_, index) =>
          this.monochrome
            ? chartColors[0]
            : chartColors[index % chartColors.length]
        );

    // Generate labels based on showSectorLabels property
    const numSectors = this.data.length;
    const displayLabels = this.showSectorLabels
      ? labels
      : Array.from({length: numSectors}, (_, i) => {
          const angle = (i * 360) / numSectors;
          return `${angle}`;
        });

    return {
      values,
      labels,
      colors: segmentColors,
      chartColors, // Pass resolved colors for use in plugin
      displayLabels,
    };
  }

  private getLayoutConfig() {
    // For polar, use actual data labels and values when showSectorLabels is true, otherwise use angle values
    return {
      unit: this.outerLabelUnit,
      showUnit: this.showUnit,
      outerLabelMaxLength: this.outerLabelMaxLength,
      decimalPlaces: this.outerLabelDecimalPlaces,
      data: this.showSectorLabels
        ? this.data
        : Array.from({length: this.data.length}, (_, i) => ({
            label: '',
            value: (i * 360) / this.data.length,
          })),
      denominator: this.showSectorLabels ? 1 : 360,
    };
  }

  private getChartOptions(): ChartOptions<'polarArea'> {
    // Use centralized layout calculation helper for all dimensions and label measurement
    const dimensions = calculateFixedHeightChartLayout({
      fixedHeight: this.fixedHeight,
      isHalfMode: false,
      showOuterLabels: this.showOuterLabels,
      canvasEl: this.canvasEl,
      layoutConfig: this.getLayoutConfig(),
      host: this,
    });

    // Store chart diameter for plugin use
    this.calculatedChartDiameter = dimensions.chartDiameter;
    this.formattedLabels = dimensions.formattedLabels;

    // Set CSS variables for chart dimensions
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

    // Set number of ticks to match color bands when discrete stops enabled
    const chartColors = getChartColorsOrDefault(
      this,
      this.colors,
      CHART_SECTOR_DEFAULT_COLORS
    );
    const numTicks = this.discreteColorStops ? chartColors.length + 1 : 6;

    // Find max value for scaling
    const maxValue = Math.max(...this.data.map((d) => d.value), 100);

    // Calculate rotation to center first label at 12 o'clock if enabled
    const numSectors = this.data.length;
    const anglePerSector = 360 / numSectors;
    const startAngle = this.centerFirstSector ? 0 : -anglePerSector / 2;

    return {
      responsive: true,
      maintainAspectRatio: true,
      aspectRatio: dimensions.aspectRatio,
      layout: {
        padding: dynamicPadding ?? POLAR_BAR_DIMENSIONS.CANVAS_PADDING,
      },
      scales: {
        r: {
          startAngle: startAngle,
          angleLines: {
            display: true,
            color: getCssVariableValue(
              this,
              POLAR_BAR_DIMENSIONS.GAP_AND_BORDER_COLOR
            ),
            lineWidth: 1,
          },
          grid: {
            display: true,
            color: getCssVariableValue(
              this,
              POLAR_BAR_DIMENSIONS.GAP_AND_BORDER_COLOR
            ),
            lineWidth: 1,
          },
          pointLabels: {
            // Always disable Chart.js built-in labels - we use our own outer label plugin
            display: false,
          },
          ticks: {
            display: false,
            stepSize: maxValue / (numTicks - 1),
            count: numTicks,
          },
          max: maxValue,
        },
      },
      plugins: {
        legend: {
          display: false,
          labels: {
            generateLabels: () => [], // Prevent Chart.js from generating labels internally
          },
          onClick: () => {}, // Disable legend click handler
        },
        tooltip: {
          ...getChartTooltipOptions(this),
          enabled: !dimensions.isTooSmall,
          callbacks: {
            title: () => '', // No title line
            label: (context) => {
              // Always show the data label and value, no unit
              const dataIndex = context.dataIndex;
              const data = this.data?.[dataIndex];
              const label = data?.label ?? '';
              const value =
                typeof data?.value === 'number'
                  ? data.value
                  : Number(data?.value);
              return `${label} ${value}`;
            },
          },
        },
      },
      animation: false,
    };
  }

  private createDiscreteColorPlugin(): Plugin<'polarArea'> {
    return {
      id: 'discreteColors',
      beforeDatasetsDraw: (chart: ChartInstance<'polarArea'>) => {
        if (!this.discreteColorStops) return;

        const {ctx, scales} = chart;
        const scale = scales.r as PolarScale | undefined;
        if (!scale) return;

        const centerX = scale.xCenter;
        const centerY = scale.yCenter;
        // Use calculated chart diameter to ensure consistency with layout
        const maxRadius = this.calculatedChartDiameter / 2;
        const numSectors = this.data.length;
        const anglePerSector = (Math.PI * 2) / numSectors;
        const rotationOffset = this.centerFirstSector ? 0 : -anglePerSector / 2;

        // Get resolved colors for creating discrete bands
        const chartColors = getChartColorsOrDefault(
          this,
          this.colors,
          this.enhanced
            ? CHART_SECTOR_ENHANCED_COLORS
            : CHART_SECTOR_DEFAULT_COLORS
        );
        const numBands = chartColors.length;

        // Find max value for scaling
        const maxValue = Math.max(...this.data.map((d) => d.value), 100);

        // Generate threshold stops from the colors array (reversed)
        // Divide maxValue into equal bands based on number of colors
        const colorStops = chartColors.reverse().map((color, index) => ({
          threshold: ((index + 1) / numBands) * maxValue,
          color,
        }));

        ctx.save();

        // Draw each sector with discrete color bands
        this.data.forEach((dataPoint, sectorIndex) => {
          const sectorValue = dataPoint.value;
          const startAngle =
            sectorIndex * anglePerSector + rotationOffset - Math.PI / 2;
          const endAngle = startAngle + anglePerSector;

          // Draw color bands from center outward
          let previousRadius = 0;

          colorStops.forEach((stop) => {
            // Calculate radius for this threshold
            const thresholdRadius = (stop.threshold / maxValue) * maxRadius;
            const sectorRadiusLimit = (sectorValue / maxValue) * maxRadius;

            // Determine the outer radius for this band
            let drawRadius;
            if (sectorRadiusLimit <= thresholdRadius) {
              // Sector value is within or below this band - draw up to sector value
              drawRadius = sectorRadiusLimit;
            } else {
              // Sector value exceeds this band - fill band completely to threshold
              drawRadius = thresholdRadius;
            }

            // Draw the arc segment for this color band
            if (drawRadius > previousRadius) {
              ctx.fillStyle = stop.color;
              ctx.beginPath();
              ctx.arc(centerX, centerY, drawRadius, startAngle, endAngle);
              if (previousRadius > 0) {
                ctx.arc(
                  centerX,
                  centerY,
                  previousRadius,
                  endAngle,
                  startAngle,
                  true
                );
              } else {
                ctx.lineTo(centerX, centerY);
              }
              ctx.closePath();
              ctx.fill();
            }

            previousRadius = drawRadius;

            // Stop if we've reached the sector's value limit
            if (sectorRadiusLimit <= thresholdRadius) {
              return;
            }
          });
        });

        ctx.restore();
      },
    };
  }

  private createChart() {
    // Guard: Verify canvas exists and is connected to DOM
    if (!this.canvasEl || !this.canvasEl.isConnected) return;

    const ctx = this.canvasEl.getContext('2d');
    if (!ctx) return;

    const {values, colors, displayLabels} = this.prepareChartData();

    const plugins: Plugin<'polarArea'>[] = [];

    // Add discrete color plugin if enabled
    if (this.discreteColorStops) {
      plugins.push(this.createDiscreteColorPlugin());
    }

    // Get chart options (this will populate formattedLabels and check dimensions)
    const chartOptions = this.getChartOptions();

    // Only add outer labels plugin if enabled AND canvas is large enough
    // formattedLabels will be empty if too small or outer labels disabled
    if (this.showOuterLabels && this.formattedLabels.length > 0) {
      const numSectors = values.length;
      const anglePerSector = (Math.PI * 2) / (numSectors || 1);
      const rotationOffset = this.centerFirstSector ? 0 : -anglePerSector / 2;
      plugins.push(
        createArcOuterLabelPlugin(this, {
          formattedLabels: this.formattedLabels.slice(0, numSectors),
          rotationOffset,
          chartDiameter: this.calculatedChartDiameter,
          type: 'polar',
        })
      );
    }

    this.chart = new Chart(ctx, {
      type: 'polarArea',
      data: {
        labels: displayLabels, // Use angle labels or sector labels based on showSectorLabels
        datasets: [
          {
            data: values,
            backgroundColor: colors,
            borderWidth: 1,
            borderColor: getCssVariableValue(
              this,
              POLAR_BAR_DIMENSIONS.GAP_AND_BORDER_COLOR
            ),
          },
        ],
      },
      options: chartOptions,
      plugins,
    });

    // Defer legend update to next tick to ensure Chart.js metadata is initialized
    requestAnimationFrame(() => this.updateLegend());
  }

  private updateChart() {
    // Guard: Verify chart and canvas still exist and are connected
    if (!this.chart || !this.canvasEl || !this.canvasEl.isConnected) return;

    const {values, colors, displayLabels} = this.prepareChartData();

    this.chart.data.labels = displayLabels;
    if (this.chart.data.datasets[0]) {
      this.chart.data.datasets[0].data = values;
      this.chart.data.datasets[0].backgroundColor = colors;
    }

    const latestOptions = this.getChartOptions();
    if (this.chart.options) {
      Object.assign(this.chart.options, latestOptions);
    }

    this.chart.update();

    // Update legend after chart update completes to ensure metadata is ready
    requestAnimationFrame(() => this.updateLegend());
  }

  /**
   * Update the legend HTML content
   */
  private updateLegend() {
    // Guard: Check if legend should be shown and chart is ready
    if (!this.legend || !this.legendDiv || !this.chart) return;

    // Guard: Check if chart metadata is available
    const meta = this.chart.getDatasetMeta(0);
    if (!meta || !meta.controller) {
      // console.debug('[obc-polar-chart] updateLegend: skipped - chart metadata not yet initialized');
      return;
    }

    // Guard: Check if dataset has data
    if (!this.data || this.data.length === 0) {
      // console.debug('[obc-polar-chart] updateLegend: skipped - no data available');
      this.legendDiv.innerHTML = '';
      return;
    }

    // Denominator: use max if set, otherwise total, with minimum of 1
    const denominator = this.showSectorLabels ? 1 : 360;
    const isPercentage = this.outerLabelUnit === '%';

    try {
      const legendItems = this.data.map((item, i) => {
        const style = meta.controller.getStyle(i, false);

        let label: string;
        let valueToFormat: number;

        if (this.showSectorLabels) {
          label = item.label;
          valueToFormat = item.value;
        } else {
          const angle = (i * 360) / this.data.length;
          label = `${angle}${this.outerLabelUnit}`;
          valueToFormat = item.value;
        }

        const numericValue = formatNumericValue(
          valueToFormat,
          denominator,
          isPercentage,
          this.outerLabelDecimalPlaces
        );
        const showUnit = this.showUnit && this.outerLabelUnit;
        const value = `${numericValue}`;
        const unit =
          showUnit && this.showSectorLabels ? `${this.outerLabelUnit}` : '';

        return {
          fillStyle: style.backgroundColor as string,
          label,
          value,
          unit,
        };
      });

      const legendHTML = generateLegendHTML(legendItems);
      this.legendDiv.innerHTML = legendHTML;
    } catch (error) {
      console.debug(
        '[obc-polar-chart] updateLegend: error generating legend HTML',
        error
      );
      // Silent failure - don't throw, just skip legend update this time
    }
  }

  override render() {
    return html`
      <div class="wrapper">
        <canvas></canvas>
        ${this.legend ? html`<div class="legend"></div>` : ''}
      </div>
    `;
  }

  static override styles = [
    unsafeCSS(componentStyle),
    unsafeCSS(chartCommonStyle),
    unsafeCSS(chartLegendStyle),
    unsafeCSS(chartDebugStyle),
  ];
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-polar-chart': ObcPolarChart;
  }
}
