import {LitElement, PropertyValues, html, unsafeCSS} from 'lit';
import {property, query} from 'lit/decorators.js';
import {classMap} from 'lit/directives/class-map.js';
import componentStyle from './radial-bar-chart.css?inline';
import chartCommonStyle from '../../charthelpers/chart-common.css?inline';
import chartDebugStyle from '../../charthelpers/chart-debug.css?inline';
import chartLegendStyle from '../../charthelpers/chart-legend.css?inline';
import {customElement} from '../../decorator.js';
import {Priority} from '../../navigation-instruments/types.js';
import {Chart, DoughnutController, ArcElement, Tooltip} from 'chart.js';
import type {ChartOptions} from 'chart.js';
import {
  CHART_SECTOR_DEFAULT_COLORS,
  CHART_SECTOR_ENHANCED_COLORS,
  CHART_DIMENSIONS,
  getCssVariableValue,
  getChartColorsOrDefault,
  observeThemeChanges,
  calculateFixedHeightChartLayout,
  getChartTooltipOptions,
  generateLegendHTML,
} from '../../charthelpers/index.js';

// Register Chart.js components
Chart.register(DoughnutController, ArcElement, Tooltip);

// Radial-bar-specific dimension constants
const RADIAL_BAR_DIMENSIONS = {
  ...CHART_DIMENSIONS,
  CHART_WIDTH: 258, // Override: 256 + 2px to compensate for outer border visual appearance
  CANVAS_PADDING: 30, // Recude by the above 2px to keep chart area consistent
  GAP_AND_BORDER_COLOR: '--container-background-color',
  REMAINING_COLOR: '--border-outline-color',
  BORDER_RADIUS: 4,
  SPACING: 4, // Gap between rings in pixels (2px border on each side)
  MIN_RING_THICKNESS: 16, // Minimum visible arc thickness in pixels (excluding borders)
  MIN_CUTOUT_PERCENT: 20, // Minimum cutout percentage to maintain empty center
  DEFAULT_MAX_CUTOUT_PERCENT: 60, // Default/maximum cutout percentage when space allows
} as const;

// Properties that require chart recreation (destroy and create)
const RADIAL_BAR_RECREATE_PROP_NAMES = [
  'circumference',
  'showDebugOverlay',
  'fixedHeight',
  'minRingThickness',
] as const;

// All properties that trigger chart updates
const RADIAL_BAR_WATCHED_PROP_NAMES = [
  'legend',
  'data',
  'colors',
  'priority',
  'max',
  'circumference',
  'showDebugOverlay',
  'fixedHeight',
  'minRingThickness',
] as const;

/**
 * `<obc-radial-bar-chart>` – A customizable radial bar chart for visualizing multiple metrics as concentric rings, with dynamic ring thickness and cutout calculation.
 *
 * This component renders multiple data values as concentric arcs (rings), each representing a different metric. It supports full circle (360°) or three-quarter circle (270°) layouts, dynamic ring thickness, and automatic cutout calculation to ensure all rings fit within the available space. The chart adapts its layout based on the number of rings and available space, and hides labels when the chart is too small (< 192px height) for clarity.
 *
 * ## Features
 * - **Fixed Height ⇒ Fixed Circumference:** The chart's circumference is determined by the `fixedHeight` property (default: 320px). This ensures the chart's circumference remains consistent and matches other radial instruments, regardless of the available browser or container width. The chart does not scale to fill the width; instead, it always uses the specified fixed height to define its size and circumference.
 * - **Layout:**
 *   - Full 360° or 270° (three-quarter) circle layout, controlled by the `circumference` property.
 *   - Multiple concentric rings, each representing a data value.
 * - **Dynamic Ring Thickness:**
 *   - All rings maintain equal thickness when possible.
 *   - The `cutout` value serves as the maximum/preferred cutout percentage.
 *   - When many rings are present, cutout is automatically reduced to fit rings at `minRingThickness`.
 *   - Cutout will not go below 20% (minimum to maintain visible center).
 *   - If rings still don't fit with 20% cutout, ring thickness is reduced proportionally.
 * - **Customization:**
 *   - Custom ring colors (with automatic fallback to theme palette).
 *   - Adjustable minimum ring thickness (`minRingThickness`).
 *   - Adjustable arc span (`circumference`).
 * - **Color Priority:** Set `priority` to `Priority.enhanced` to use the blue/enhanced
 *   color palette instead of the default gray/regular palette (default: `Priority.regular`).
 * - **Capacity Visualization:**
 *   - Each ring shows a filled and remaining segment based on the `max` value.
 * - **Responsive Behavior:**
 *   - Automatically hides labels and reduces spacing when height < 192px.
 *   - Maintains aspect ratio and adjusts padding for optimal ring positioning.
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
 * <obc-radial-bar-chart></obc-radial-bar-chart>
 * <script>
 *   document.querySelector('obc-radial-bar-chart').data = [70, 50, 30];
 * </script>
 * ```
 *
 * **Three-Quarter Circle with Custom Colors**
 * ```html
 * <obc-radial-bar-chart></obc-radial-bar-chart>
 * <script>
 *   const chart = document.querySelector('obc-radial-bar-chart');
 *   chart.circumference = 270;
 *   chart.data = [80, 60, 40, 20];
 *   chart.colors = ['#e74c3c', '#f39c12', '#2ecc71', '#3498db'];
 * </script>
 * ```
 *
 * **Custom Minimum Ring Thickness and Max Value**
 * ```html
 * <obc-radial-bar-chart></obc-radial-bar-chart>
 * <script>
 *   const chart = document.querySelector('obc-radial-bar-chart');
 *   chart.minRingThickness = 20;
 *   chart.max = 200;
 *   chart.data = [120, 80, 40];
 * </script>
 * ```
 *
 * @property {number[]} data - Array of values for each ring (set via JavaScript)
 * @property {string[]} colors - Custom ring colors (set via JavaScript) with fallback to theme palette
 * @property {number} max - Maximum value for calculating remaining empty area, default: 100
 * @property {number} circumference - Arc span in degrees: 360 for full circle, 270 for 3/4 circle, default: 270
 * @property {boolean} showDebugOverlay - Show debug overlay for development, default: false
 * @property {number} fixedHeight - Fixed height of the chart in pixels (mandatory, determines chart circumference), default: 320. The chart's circumference is always based on this fixed height to match other radial instruments.
 * @property {number} minRingThickness - Minimum thickness of each ring in pixels, excluding borders, default: 16
 * @property {boolean} legend - Whether to display the legend below the chart, default: false
 */
@customElement('obc-radial-bar-chart')
export class ObcRadialBarChart extends LitElement {
  @property({type: Array, attribute: false}) data: number[] = [];
  @property({type: Array, attribute: false}) colors: string[] = [];
  @property({type: String})
  priority: Priority = Priority.regular;
  @property({type: Number})
  max = 100;
  @property({type: Number})
  circumference = 270;
  @property({type: Boolean, reflect: true})
  legend = false;
  @property({type: Boolean, reflect: true})
  showDebugOverlay = false;
  @property({type: Number, reflect: true})
  fixedHeight = 320;
  @property({
    type: Number,
  })
  minRingThickness = 16;

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
  private wasAboveThreshold = false;

  private hasAnyChanged(
    changed: PropertyValues,
    props: readonly (keyof ObcRadialBarChart)[]
  ): boolean {
    return props.some((prop) => changed.has(prop));
  }

  /**
   * Calculate optimal cutout percentage and whether rings should use minimum thickness
   * based on available chart space and number of rings.
   *
   * Algorithm:
   * 1. Calculate total space needed for all rings at minRingThickness
   * 2. If enough space: use equal thickness and adjust cutout
   * 3. If not enough space with minCutout: reduce cutout to minimum
   * 4. If still not enough: rings must be thinner than minimum
   *
   * @param chartDiameter - Available chart diameter in pixels
   * @param isTooSmall - Whether chart is below MIN_HEIGHT_WITH_LABELS (affects border width)
   * @returns Object with calculated cutout percentage and flag for using minimum thickness
   */
  private calculateOptimalLayout(
    chartDiameter: number,
    isTooSmall: boolean
  ): {
    cutout: number;
    useMinThickness: boolean;
  } {
    const numRings = this.data.length;
    if (numRings === 0) {
      return {
        cutout: RADIAL_BAR_DIMENSIONS.DEFAULT_MAX_CUTOUT_PERCENT,
        useMinThickness: false,
      };
    }

    // Calculate total space per ring: minRingThickness + borders (spacing applied as borderWidth)
    // Border is applied on both sides, so total border = spacing (or spacing/2 for small charts)
    const effectiveSpacing = isTooSmall
      ? RADIAL_BAR_DIMENSIONS.SPACING / 2
      : RADIAL_BAR_DIMENSIONS.SPACING;
    const totalSpacePerRing = this.minRingThickness + effectiveSpacing;

    // Calculate radius (half of diameter)
    const radius = chartDiameter / 2;

    // Calculate total space needed for all rings
    const totalRingsSpace = numRings * totalSpacePerRing;

    // Calculate remaining space for cutout
    const remainingSpace = radius - totalRingsSpace;

    // Convert remaining space to cutout percentage
    const calculatedCutoutPercent = (remainingSpace / radius) * 100;

    // Check if we can fit all rings with minimum thickness
    if (calculatedCutoutPercent >= RADIAL_BAR_DIMENSIONS.MIN_CUTOUT_PERCENT) {
      // We have enough space - use minimum thickness and calculated cutout
      return {
        cutout: Math.min(
          calculatedCutoutPercent,
          RADIAL_BAR_DIMENSIONS.DEFAULT_MAX_CUTOUT_PERCENT
        ),
        useMinThickness: true,
      };
    } else {
      // Not enough space - try with minimum cutout
      const minCutoutSpace =
        (radius * RADIAL_BAR_DIMENSIONS.MIN_CUTOUT_PERCENT) / 100;
      const availableRingSpace = radius - minCutoutSpace;
      const spacePerRingWithMinCutout = availableRingSpace / numRings;

      if (spacePerRingWithMinCutout >= totalSpacePerRing) {
        // We can fit with minimum cutout
        return {
          cutout: RADIAL_BAR_DIMENSIONS.MIN_CUTOUT_PERCENT,
          useMinThickness: true,
        };
      } else {
        // Can't fit even with minimum cutout - rings must be thinner
        return {
          cutout: RADIAL_BAR_DIMENSIONS.MIN_CUTOUT_PERCENT,
          useMinThickness: false,
        };
      }
    }
  }

  // Update external library AFTER render
  override updated(changed: PropertyValues) {
    super.updated(changed);

    if (this.hasAnyChanged(changed, RADIAL_BAR_WATCHED_PROP_NAMES)) {
      // Recreate chart when major layout properties change
      // These properties affect aspect ratio calculation or require plugin reconfiguration
      const needsRecreation = this.hasAnyChanged(
        changed,
        RADIAL_BAR_RECREATE_PROP_NAMES
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
        height >= RADIAL_BAR_DIMENSIONS.MIN_HEIGHT_WITH_LABELS;

      // Only recreate chart if we crossed the threshold
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
    this.wasAboveThreshold =
      height >= RADIAL_BAR_DIMENSIONS.MIN_HEIGHT_WITH_LABELS;
  }

  private prepareChartData() {
    const chartColors = getChartColorsOrDefault(
      this,
      this.colors,
      this.priority === Priority.enhanced
        ? CHART_SECTOR_ENHANCED_COLORS
        : CHART_SECTOR_DEFAULT_COLORS
    );
    const remainingColor = getCssVariableValue(
      this,
      RADIAL_BAR_DIMENSIONS.REMAINING_COLOR
    );
    const borderColor = getCssVariableValue(
      this,
      RADIAL_BAR_DIMENSIONS.GAP_AND_BORDER_COLOR
    );

    // Reduce spacing for small charts to save space
    // Border is 2px on each side (top + bottom), so 4px total becomes 2px total
    const height = this.canvasEl?.clientHeight ?? 0;
    const isTooSmall = height < RADIAL_BAR_DIMENSIONS.MIN_HEIGHT_WITH_LABELS;
    const effectiveSpacing = isTooSmall
      ? RADIAL_BAR_DIMENSIONS.SPACING / 2
      : RADIAL_BAR_DIMENSIONS.SPACING;

    const datasets = this.data.map((value, index) => {
      const remaining = Math.max(0, this.max - value);
      const color =
        chartColors[index % chartColors.length] ??
        CHART_SECTOR_DEFAULT_COLORS[0];

      return {
        data: [value, remaining],
        backgroundColor: [color, remainingColor],
        borderWidth: effectiveSpacing, // Use reduced spacing for small charts (1px + 1px borders)
        borderColor: borderColor, // Use container section color for gaps
        borderRadius: RADIAL_BAR_DIMENSIONS.BORDER_RADIUS,
        spacing: 0, // Spacing between colored and remaining segments
        weight: 1, // Equal weight for all rings
      };
    });

    return {datasets};
  }

  private getChartOptions(): ChartOptions<'doughnut'> {
    // Always start at 12 o'clock (top) and move clockwise
    const rotation = 0;

    // Use centralized layout calculation helper
    // Note: Radial bar charts don't have outer labels
    // Important: Always use full circle mode (isHalfMode = false) regardless of circumference (half is for donut chart only)
    // The circumference property only affects what portion of the circle is shown,
    // not the dimensions/layout calculation
    const dimensions = calculateFixedHeightChartLayout({
      fixedHeight: this.fixedHeight,
      isHalfMode: false, // Always full circle dimensions, circumference only controls what's shown
      showOuterLabels: false, // Radial bar charts don't have outer labels
      canvasEl: this.canvasEl,
      layoutConfig: {
        data: [], // No data labels for radial bars
        denominator: 100,
      },
      host: this,
    });

    // Set CSS variables for wrapper and canvas sizing
    this.style.setProperty('--chart-width', `${dimensions.calculatedWidth}px`);
    this.style.setProperty('--chart-height', `${dimensions.actualHeight}px`);

    // Calculate dynamic padding for Chart.js layout
    // Reduce padding by 1px to compensate for 2px wider chart diameter (258px vs 256px)
    const dynamicPadding = dimensions.isTooSmall
      ? 0 // No padding when too small
      : RADIAL_BAR_DIMENSIONS.CANVAS_PADDING;

    // Calculate chart diameter from dimensions
    // The chart area is inside the padding, so subtract padding from both sides
    // For larger charts (>= 192px), use RADIAL_BAR_DIMENSIONS.CHART_WIDTH (258px) to compensate for outer border
    // For small charts, calculate based on actual height
    const chartDiameter = dimensions.isTooSmall
      ? dimensions.actualHeight - dynamicPadding * 2
      : RADIAL_BAR_DIMENSIONS.CHART_WIDTH; // 258px: adds 2px to compensate for outer border visual appearance

    // Calculate optimal cutout based on number of rings and available space
    const {cutout: optimalCutout} = this.calculateOptimalLayout(
      chartDiameter,
      dimensions.isTooSmall
    );

    return {
      responsive: true,
      maintainAspectRatio: true,
      aspectRatio: dimensions.aspectRatio,
      rotation,
      circumference: this.circumference,
      cutout: `${optimalCutout}%`,
      layout: {
        padding: {
          top: dynamicPadding,
          right: dynamicPadding,
          bottom: dynamicPadding,
          left: dynamicPadding,
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
          filter: (tooltipItem) => tooltipItem.label !== 'Remaining',
          callbacks: {
            title: () => '',
            label: (context) => {
              // Show correct ring label and value for each dataset
              const datasetIndex = context.datasetIndex;
              const valueIndex = context.dataIndex;
              // Only show tooltip for the filled segment (index 0)
              if (valueIndex !== 0) return '';
              const ringLabel = `Ring ${datasetIndex + 1}`;
              const value = context.parsed;
              return `${ringLabel} ${value}`;
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

  private createChart() {
    // Guard: Verify canvas exists and is connected to DOM
    if (!this.canvasEl || !this.canvasEl.isConnected) return;

    const ctx = this.canvasEl.getContext('2d');
    if (!ctx) return;

    const {datasets} = this.prepareChartData();

    this.chart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: this.data.map((_, i) => `Ring ${i + 1}`),
        datasets,
      },
      options: this.getChartOptions(),
    });

    // Defer legend update to next tick to ensure Chart.js metadata is initialized
    requestAnimationFrame(() => this.updateLegend());
  }

  private updateChart() {
    // Guard: Verify chart and canvas still exist and are connected
    if (!this.chart || !this.canvasEl || !this.canvasEl.isConnected) return;

    const {datasets} = this.prepareChartData();

    this.chart.data.labels = this.data.map((_, i) => `Ring ${i + 1}`);
    this.chart.data.datasets = datasets;

    // Recalculate options with current dimensions
    const newOptions = this.getChartOptions();

    if (this.chart.options) {
      // Update all dynamic options
      Object.assign(this.chart.options, newOptions);
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

    // Guard: Check if dataset has data
    if (!this.data || this.data.length === 0) {
      // console.debug('[obc-radial-bar-chart] updateLegend: skipped - no data available');
      this.legendDiv.innerHTML = '';
      return;
    }

    try {
      const chartColors = getChartColorsOrDefault(
        this,
        this.colors,
        this.priority === Priority.enhanced
          ? CHART_SECTOR_ENHANCED_COLORS
          : CHART_SECTOR_DEFAULT_COLORS
      );

      const legendItems = this.data.map((value, i) => {
        const color =
          chartColors[i % chartColors.length] ??
          (this.priority === Priority.enhanced
            ? CHART_SECTOR_ENHANCED_COLORS[0]
            : CHART_SECTOR_DEFAULT_COLORS[0]);

        return {
          fillStyle: color,
          label: `Ring ${i + 1}`,
          value: value.toString(),
          unit: '',
        };
      });

      const legendHTML = generateLegendHTML(legendItems);
      this.legendDiv.innerHTML = legendHTML;
    } catch (error) {
      console.debug(
        '[obc-radial-bar-chart] updateLegend: error generating legend HTML',
        error
      );
      // Silent failure - don't throw, just skip legend update this time
    }
  }
  override render() {
    const wrapperClasses = {
      wrapper: true,
      debug: this.showDebugOverlay,
    };

    return html`
      <div class=${classMap(wrapperClasses)}>
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
    'obc-radial-bar-chart': ObcRadialBarChart;
  }
}
