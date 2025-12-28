import {LitElement, PropertyValues, html, unsafeCSS} from 'lit';
import {property, query, state} from 'lit/decorators.js';
import componentStyle from './pie-chart.css?inline';
import chartCommonStyle from '../../charthelpers/chart-common.css?inline';
import chartDebugStyle from '../../charthelpers/chart-debug.css?inline';
import chartLegendStyle from '../../charthelpers/chart-legend.css?inline';
import {customElement} from '../../decorator.js';
import {
  Chart,
  PieController,
  DoughnutController,
  ArcElement,
  Tooltip,
} from 'chart.js';
import type {Plugin, ChartOptions, ChartDataset} from 'chart.js';
import {
  CHART_SECTOR_DEFAULT_COLORS,
  CHART_DIMENSIONS,
  OUTER_LABEL_CONFIG,
  getCssVariableValue,
  getChartColorsOrDefault,
  observeThemeChanges,
  calculateSumTotal,
  createArcOuterLabelPlugin,
  calculateFixedHeightChartLayout,
  formatSingleLabel,
  formatNumericValue,
  getChartTooltipOptions,
  generateLegendHTML,
} from '../../charthelpers/index.js';

// Register Chart.js components
Chart.register(PieController, DoughnutController, ArcElement, Tooltip);

// Pie-specific dimension constants (extends shared CHART_DIMENSIONS)
const PIE_DIMENSIONS = {
  ...CHART_DIMENSIONS,
  GAP_AND_BORDER_COLOR: '--container-section-color',
} as const;

const PIE_RECREATE_PROP_NAMES = [
  'sunburst',
  'showOuterLabels',
  'showUnit',
  'outerLabelUnit',
  'outerLabelMaxLength',
  'outerLabelDecimalPlaces',
  'showDebugOverlay',
  'fixedHeight',
] as const;

const PIE_WATCHED_PROP_NAMES = [
  'legend',
  'data',
  'colors',
  'sunburst',
  'showOuterLabels',
  'showUnit',
  'outerLabelUnit',
  'outerLabelMaxLength',
  'outerLabelDecimalPlaces',
  'showDebugOverlay',
  'fixedHeight',
] as const;

/**
 * `<obc-pie-chart>` – A customizable pie chart component for visualizing proportional data as segments, with optional sunburst subsegments and outer labels.
 *
 * This component renders an interactive pie chart powered by Chart.js, displaying data segments as arcs with optional outer labels and a sunburst mode for hierarchical data. It supports customizable colors, percentage or unit display, and adapts its layout based on available space. Labels are hidden when the chart is too small (< 192px height), ensuring clarity at all sizes.
 *
 * ## Features
 * - **Fixed Height ⇒ Fixed Circumference:** The chart's circumference is determined by the `fixedHeight` property (default: 320px). This ensures the donut's circumference remains consistent and matches other radial instruments, regardless of the available browser or container width. The chart does not scale to fill the width; instead, it always uses the specified fixed height to define its size and circumference.
 * - **Layout:**
 *   - Full 360° pie chart layout.
 * - **Outer Labels:**
 *   - Optional labels positioned outside the chart showing segment names and values.
 *   - Supports percentage or custom units (e.g., "kW", "kg", "MB").
 *   - Configurable decimal places and maximum label length (with trimming).
 * - **Sunburst Mode:**
 *   - Enable hierarchical data display with interactive subsegments (children) as an outer ring.
 *   - Click a segment to expand/collapse its children in the sunburst ring.
 * - **Customization:**
 *   - Custom segment colors (with automatic fallback to theme palette).
 *   - Adjustable outer label formatting and units.
 * - **Responsive Behavior:**
 *   - Automatically hides labels when height < 192px.
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
 * **Basic Usage**
 * ```html
 * <obc-pie-chart></obc-pie-chart>
 * <script>
 *   document.querySelector('obc-pie-chart').data = [
 *     {label: 'A', value: 50},
 *     {label: 'B', value: 30},
 *     {label: 'C', value: 20}
 *   ];
 * </script>
 * ```
 *
 * **With Sunburst Subsegments**
 * ```html
 * <obc-pie-chart></obc-pie-chart>
 * <script>
 *   const chart = document.querySelector('obc-pie-chart');
 *   chart.sunburst = true;
 *   chart.data = [
 *     {label: 'A', value: 50, children: [
 *       {label: 'A1', value: 30},
 *       {label: 'A2', value: 20}
 *     ]},
 *     {label: 'B', value: 30}
 *   ];
 * </script>
 * ```
 *
 * **Custom Colors and Units**
 * ```html
 * <obc-pie-chart></obc-pie-chart>
 * <script>
 *   const chart = document.querySelector('obc-pie-chart');
 *   chart.showOuterLabels = true;
 *   chart.outerLabelUnit = 'kW';
 *   chart.outerLabelDecimalPlaces = 2;
 *   chart.data = [
 *     {label: 'Critical', value: 20},
 *     {label: 'Warning', value: 35},
 *     {label: 'Normal', value: 45}
 *   ];
 *   chart.colors = ['#e74c3c', '#f39c12', '#2ecc71'];
 * </script>
 * ```
 *
 * @property {Array<{label: string, value: number, children?: Array<{label: string, value: number}>}>} data - Chart data segments with optional children subsegments for sunburst mode (set via JavaScript)
 * @property {string[]} colors - Custom segment colors (set via JavaScript) with fallback to theme palette
 * @property {boolean} showOuterLabels - Show outer labels, default: false
 * @property {boolean} showUnit - Whether to show unit in labels, default: true
 * @property {boolean} sunburst - Enable sunburst mode with interactive children subsegments, default: false
 * @property {string} outerLabelUnit - Unit string to append to outer labels, default: "%"
 * @property {number} outerLabelMaxLength - Maximum character length for labels before trim (0 = no limit), default: 0
 * @property {number} outerLabelDecimalPlaces - Number of decimal places in labels, default: 0
 * @property {boolean} showDebugOverlay - Show debug overlay for development, default: false
 * @property {number} fixedHeight - Fixed height of the chart in pixels (mandatory, determines chart circumference), default: 320. The chart's circumference is always based on this fixed height to match other radial instruments.
 * @property {boolean} legend - Whether to display the legend below the chart, default: false
 */
@customElement('obc-pie-chart')
export class ObcPieChart extends LitElement {
  @property({attribute: false})
  data: {
    label: string;
    value: number;
    children?: {label: string; value: number}[];
  }[] = [];

  @property({attribute: false})
  colors: string[] = [];

  @property({type: Boolean})
  showOuterLabels = false;

  @property({type: Boolean})
  showUnit = true;

  @property({type: Boolean})
  sunburst = false;

  @property({type: String})
  outerLabelUnit = '%';

  @property({
    type: Number,
  })
  outerLabelMaxLength = 0;

  @property({
    type: Number,
  })
  outerLabelDecimalPlaces = 0;

  @property({type: Boolean, reflect: true})
  legend = false;

  @property({type: Boolean, reflect: true})
  showDebugOverlay = false;

  @property({type: Number, reflect: true})
  fixedHeight = 320;

  /** @internal */
  @state() private total = 0;

  /** @internal - Pre-formatted labels for outer label rendering */
  @state() private formattedLabels: string[] = [];

  /** @internal */
  @state() private activeSegmentIndex: number | null = null;

  /** @internal */
  @query('canvas') private canvasEl?: HTMLCanvasElement;

  /** @internal */
  @query('.legend') private legendDiv?: HTMLDivElement;

  /** @internal */
  private chart?: Chart;

  /** @internal */
  private themeObserver?: MutationObserver;

  /** @internal - ResizeObserver for tracking height threshold crossings */
  private resizeObserver?: ResizeObserver;

  /** @internal - Track previous state to detect threshold crossing */
  private wasAboveThreshold = true;

  private hasAnyChanged(
    changed: PropertyValues,
    props: readonly (keyof ObcPieChart)[]
  ): boolean {
    return props.some((prop) => changed.has(prop));
  }

  /**
   * Get layout configuration for canvas calculation
   */
  private getLayoutConfig() {
    return {
      unit: this.outerLabelUnit,
      showUnit: this.showUnit,
      outerLabelMaxLength: this.outerLabelMaxLength,
      decimalPlaces: this.outerLabelDecimalPlaces,
      data: this.data,
      denominator: this.total > 0 ? this.total : 1,
    };
  }

  // Calculate derived state BEFORE render
  override willUpdate(changed: PropertyValues) {
    if (changed.has('data')) {
      this.total = calculateSumTotal(this.data);
    }
  }

  // Update external library AFTER render
  override updated(changed: PropertyValues) {
    super.updated(changed);

    if (this.hasAnyChanged(changed, PIE_WATCHED_PROP_NAMES)) {
      // Recreate chart when major layout properties change or when plugin configuration changes
      // These properties affect aspect ratio calculation, plugin registration, or outer label rendering
      const needsRecreation = this.hasAnyChanged(
        changed,
        PIE_RECREATE_PROP_NAMES
      );

      if (needsRecreation) {
        this.chart?.destroy();
        this.removeSunburstInteraction();
        this.createChart();
        if (this.sunburst) {
          this.setupSunburstInteraction();
        }
      } else {
        this.updateChart();
      }
    }
  }

  override firstUpdated() {
    this.createChart();
    this.themeObserver = observeThemeChanges(() => this.updateChartColors());
    this.setupResizeObserver();

    // Add click listeners for sunburst interaction
    if (this.sunburst) {
      this.setupSunburstInteraction();
    }
  }

  override disconnectedCallback() {
    super.disconnectedCallback();
    this.chart?.destroy();
    this.themeObserver?.disconnect();
    this.resizeObserver?.disconnect();
    this.removeSunburstInteraction();
  }

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

  /** @internal */
  private handleCanvasClick = (event: MouseEvent) => {
    if (!this.chart || !this.sunburst) return;

    const elements = this.chart.getElementsAtEventForMode(
      event as unknown as Event,
      'nearest',
      {intersect: true},
      false
    );

    if (elements.length > 0) {
      const clickedIndex = elements[0].index;
      // Toggle: if already active, deactivate; otherwise activate
      const newIndex =
        this.activeSegmentIndex === clickedIndex ? null : clickedIndex;
      this.activeSegmentIndex = newIndex;

      // Recreate chart to update plugins with new hideIndex and radius
      this.chart.destroy();
      this.createChart();
    }
  };

  private setupSunburstInteraction() {
    if (!this.canvasEl) return;
    this.canvasEl.addEventListener('click', this.handleCanvasClick);
    this.canvasEl.style.cursor = 'pointer';
  }

  private removeSunburstInteraction() {
    if (!this.canvasEl) return;
    this.canvasEl.removeEventListener('click', this.handleCanvasClick);
    this.canvasEl.style.cursor = '';
  }

  private prepareChartData() {
    const values = this.data.map((d) => d.value);
    const labels = this.data.map((d) => d.label);
    const chartColors = getChartColorsOrDefault(
      this,
      this.colors,
      CHART_SECTOR_DEFAULT_COLORS
    );
    const segmentColors = values.map(
      (_, index) => chartColors[index % chartColors.length]
    );

    if (!this.sunburst) {
      return {
        values,
        labels,
        colors: segmentColors,
        sunburstValues: [],
        sunburstColors: [],
        sunburstLabels: [],
      };
    }

    // Sunburst mode: create outer ring dataset and shrink the 'inner' pie chart radius
    const sunburstValues: number[] = [];
    const sunburstColors: string[] = [];
    const sunburstLabels: string[] = [];

    this.data.forEach((segment, parentIndex) => {
      const children = segment.children || [];

      if (children.length > 0) {
        // Add children to outer/sunburst ring
        children.forEach((child, childIndex) => {
          sunburstValues.push(child.value);
          sunburstLabels.push(child.label);
          // Use next colors in sequence after parent color
          const colorIndex =
            (parentIndex + childIndex + 1) % chartColors.length;
          sunburstColors.push(chartColors[colorIndex]);
        });
      } else {
        // No children: add transparent placeholder with same value as parent
        sunburstValues.push(segment.value);
        sunburstLabels.push('');
        sunburstColors.push('transparent');
      }
    });

    return {
      values,
      labels,
      colors: segmentColors,
      sunburstValues,
      sunburstColors,
      sunburstLabels,
    };
  }

  /**
   * Get Chart.js options using centralized fixed height layout calculation
   */
  private getChartOptions(): ChartOptions<'pie'> {
    // If sunburst mode and a segment is active, reduce the pie chart radius
    // to make room for the outer ring while keeping total size at CHART_WIDTH
    const radiusPercentage =
      this.sunburst && this.activeSegmentIndex !== null ? 75 : 100;

    // Use centralized layout calculation helper
    const dimensions = calculateFixedHeightChartLayout({
      fixedHeight: this.fixedHeight,
      isHalfMode: false, // Pie charts are always full circles
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
      radius: `${radiusPercentage}%`,
      layout: {
        padding: dynamicPadding ?? PIE_DIMENSIONS.CANVAS_PADDING,
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
          filter: (tooltipItem) => {
            // Hide tooltips for transparent placeholder segments
            const dataset = tooltipItem.dataset;
            const bgColor = Array.isArray(dataset.backgroundColor)
              ? dataset.backgroundColor[tooltipItem.dataIndex]
              : dataset.backgroundColor;
            return bgColor !== 'transparent';
          },
          callbacks: {
            title: () => '', // No title line
            label: (context) => {
              const label = context.label ?? '';
              const value = context.parsed;
              const denominator = this.total > 0 ? this.total : 1;
              const isPercentage = this.outerLabelUnit === '%';
              const numericValue = formatNumericValue(
                value,
                denominator,
                isPercentage,
                this.outerLabelDecimalPlaces
              );
              const showUnit = this.showUnit && this.outerLabelUnit;
              return showUnit
                ? `${label} ${numericValue}${this.outerLabelUnit}`
                : `${label} ${numericValue}`;
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

  private createOuterLabelPiePlugin(): Plugin {
    return createArcOuterLabelPlugin(this, {
      formattedLabels: this.formattedLabels,
      hideIndex: this.sunburst ? this.activeSegmentIndex : null,
    }) as Plugin;
  }

  private createChart() {
    // Guard: Verify canvas exists and is connected to DOM
    if (!this.canvasEl || !this.canvasEl.isConnected) return;

    const ctx = this.canvasEl.getContext('2d');
    if (!ctx) return;

    const {
      values,
      labels,
      colors,
      sunburstValues,
      sunburstColors,
      sunburstLabels,
    } = this.prepareChartData();

    // Always use pie chart type, add custom plugin for sunburst
    const datasets: ChartDataset<'pie', number[]>[] = [
      {
        data: values,
        backgroundColor: colors,
        borderWidth: 1,
        borderColor: getCssVariableValue(
          this,
          PIE_DIMENSIONS.GAP_AND_BORDER_COLOR
        ),
      },
    ];

    const height = this.canvasEl?.clientHeight ?? 0;
    const isTooSmall = height < CHART_DIMENSIONS.MIN_HEIGHT_WITH_LABELS;

    this.chart = new Chart(ctx, {
      type: 'pie',
      data: {
        labels,
        datasets,
      },
      options: this.getChartOptions(),
      plugins: [
        // Only show outer labels if enabled AND height is large enough
        ...(this.showOuterLabels && !isTooSmall
          ? [this.createOuterLabelPiePlugin()]
          : []),
        this.sunburst && sunburstValues.length > 0
          ? this.createSunburstPlugin(
              sunburstValues,
              sunburstColors,
              sunburstLabels
            )
          : {id: 'sunburst'},
      ].filter((p) => p !== undefined),
    });

    // Defer legend update to next tick to ensure Chart.js metadata is initialized
    requestAnimationFrame(() => this.updateLegend());
  }

  private createSunburstPlugin(
    _outerValues: number[],
    sunburstColors: string[],
    sunburstLabels: string[]
  ): Plugin {
    return {
      id: 'sunburst',
      afterDatasetsDraw: (chart) => {
        const meta = chart.getDatasetMeta(0);
        if (!meta?.data.length) return;

        // Only draw if a segment is active (clicked)
        if (this.activeSegmentIndex === null) return;

        const {ctx} = chart;
        const centerX = chart.chartArea.left + chart.chartArea.width / 2;
        const centerY = chart.chartArea.top + chart.chartArea.height / 2;

        ctx.save();

        // Calculate radii to fit within CHART_WIDTH
        // Inner pie is now at 75% (radius property in getChartOptions)
        const firstArc = meta.data[0] as ArcElement;
        const innerPieRadius = firstArc.outerRadius;

        // The original 100% radius (before shrinking to 75%)
        // innerPieRadius = 0.75 * originalRadius, so originalRadius = innerPieRadius / 0.75
        const originalFullRadius = innerPieRadius / 0.75;

        // Determine if chart is below label threshold
        const height = this.canvasEl?.clientHeight ?? 0;
        const isTooSmall = height < PIE_DIMENSIONS.MIN_HEIGHT_WITH_LABELS;

        // Gap and thickness logic for small charts
        const gapWidth = isTooSmall ? 2 : 8;
        // For small charts, fill all available space with the sunburst arc
        const outerRingInnerRadius = innerPieRadius + gapWidth;
        const outerRingOuterRadius = isTooSmall
          ? originalFullRadius
          : originalFullRadius;
        // (If you want to reserve a gap to the edge, adjust here)

        // Setup font styling for labels
        const fontFamily = getCssVariableValue(
          this,
          OUTER_LABEL_CONFIG.fontFamily
        );
        const fontWeight = getCssVariableValue(
          this,
          OUTER_LABEL_CONFIG.fontWeightVar
        );
        const fontSize = getCssVariableValue(
          this,
          OUTER_LABEL_CONFIG.fontSizeVar
        );
        const fontColor = getCssVariableValue(
          this,
          OUTER_LABEL_CONFIG.fontColorVar
        );

        ctx.font = `${fontWeight} ${fontSize} ${fontFamily}`;
        ctx.fillStyle = fontColor;
        ctx.textBaseline = 'middle';

        // Draw outer ring segments only for the active parent
        let sunburstDataIndex = 0;
        this.data.forEach((segment, segmentIndex) => {
          const children = segment.children || [];

          if (children.length > 0) {
            // Only draw if this is the active segment
            if (segmentIndex === this.activeSegmentIndex) {
              // Calculate total for this parent's children
              const childrenTotal = children.reduce(
                (sum, child) => sum + child.value,
                0
              );
              let startAngle = 0;

              // Find the parent arc to align with it
              const parentArc = meta.data[segmentIndex] as ArcElement;
              const parentStart = parentArc.startAngle;
              const parentEnd = parentArc.endAngle;
              const parentAngleRange = parentEnd - parentStart;

              children.forEach((child) => {
                const childValue = child.value;
                const childRatio = childValue / childrenTotal;
                const childAngleRange = parentAngleRange * childRatio;
                const childStartAngle = parentStart + startAngle;
                const childEndAngle = childStartAngle + childAngleRange;

                // Draw the outer/sunburst arc
                ctx.fillStyle =
                  sunburstColors[sunburstDataIndex] || 'transparent';
                ctx.beginPath();
                ctx.arc(
                  centerX,
                  centerY,
                  outerRingOuterRadius,
                  childStartAngle,
                  childEndAngle
                );
                ctx.arc(
                  centerX,
                  centerY,
                  outerRingInnerRadius,
                  childEndAngle,
                  childStartAngle,
                  true
                );
                ctx.closePath();
                ctx.fill();

                // Draw label for this sunburst segment (if showOuterLabels is enabled)
                if (this.showOuterLabels && sunburstLabels[sunburstDataIndex]) {
                  const middleAngle = (childStartAngle + childEndAngle) / 2;
                  const labelRadius =
                    outerRingOuterRadius + OUTER_LABEL_CONFIG.labelGap;
                  const x = centerX + Math.cos(middleAngle) * labelRadius;
                  const y = centerY + Math.sin(middleAngle) * labelRadius;
                  const alignLeft = Math.cos(middleAngle) >= 0;

                  ctx.fillStyle = fontColor;
                  ctx.textAlign = alignLeft ? 'left' : 'right';
                  const textX = alignLeft
                    ? x + OUTER_LABEL_CONFIG.labelGap
                    : x - OUTER_LABEL_CONFIG.labelGap;

                  // Format label using shared helper
                  const total = this.total > 0 ? this.total : 1;
                  const valueText = formatSingleLabel(childValue, total, {
                    unit: this.outerLabelUnit,
                    showUnit: this.showUnit,
                    decimalPlaces: this.outerLabelDecimalPlaces,
                    maxLength: this.outerLabelMaxLength,
                  });

                  ctx.fillText(valueText, textX, y);
                }

                startAngle += childAngleRange;
                sunburstDataIndex++;
              });
            } else {
              // Skip this parent's children
              sunburstDataIndex += children.length;
            }
          } else {
            sunburstDataIndex++; // Skip transparent placeholders
          }
        });

        ctx.restore();
      },
    };
  }

  private updateChart() {
    // Guard: Verify chart and canvas still exist and are connected
    if (!this.chart || !this.canvasEl || !this.canvasEl.isConnected) return;

    this.chart.update();

    // Update legend after chart update completes to ensure metadata is ready
    requestAnimationFrame(() => this.updateLegend());
  }

  /**
   * Update only chart colors without recreating the entire chart
   * Used by theme observer for efficient theme changes
   */
  private updateChartColors() {
    // Guard: Verify chart and canvas still exist and are connected
    if (!this.chart || !this.canvasEl || !this.canvasEl.isConnected) return;

    const {colors, sunburstColors} = this.prepareChartData();

    // Update dataset colors
    if (this.chart.data.datasets[0]) {
      this.chart.data.datasets[0].backgroundColor = colors;
    }

    // Update sunburst dataset colors if in sunburst mode
    if (this.sunburst && this.chart.data.datasets[1]) {
      this.chart.data.datasets[1].backgroundColor = sunburstColors;
    }

    // Update without animation for instant theme change
    this.chart.update('none');

    // Defer legend update to next frame to ensure metadata is ready
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
      // console.debug('[obc-pie-chart] updateLegend: skipped - chart metadata not yet initialized');
      return;
    }

    // Guard: Check if dataset has data
    if (!this.data || this.data.length === 0) {
      // console.debug('[obc-pie-chart] updateLegend: skipped - no data available');
      this.legendDiv.innerHTML = '';
      return;
    }

    // Denominator: use max if set, otherwise total, with minimum of 1
    const denominator = this.total > 0 ? this.total : 1;
    const isPercentage = this.outerLabelUnit === '%';

    try {
      const legendItems = this.data.map((item, i) => {
        const style = meta.controller.getStyle(i, false);
        const numericValue = formatNumericValue(
          item.value,
          denominator,
          isPercentage,
          this.outerLabelDecimalPlaces
        );
        const showUnit = this.showUnit && this.outerLabelUnit;
        const value = `${numericValue}`;
        const unit = showUnit ? `${this.outerLabelUnit}` : '';

        return {
          fillStyle: style.backgroundColor as string,
          label: item.label as string,
          value: value as string,
          unit: unit as string,
        };
      });

      const legendHTML = generateLegendHTML(legendItems);
      this.legendDiv.innerHTML = legendHTML;
    } catch (error) {
      console.debug(
        '[obc-pie-chart] updateLegend: error generating legend HTML',
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
    'obc-pie-chart': ObcPieChart;
  }
}
