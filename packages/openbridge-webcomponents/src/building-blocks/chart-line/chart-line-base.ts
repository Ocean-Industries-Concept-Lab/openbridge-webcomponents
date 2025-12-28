import {LitElement, PropertyValues, html, unsafeCSS} from 'lit';
import {property, query} from 'lit/decorators.js';
import componentStyle from './chart-line-base.css?inline';
import chartCommonStyle from '../../charthelpers/chart-common.css?inline';
import chartDebugStyle from '../../charthelpers/chart-debug.css?inline';
import chartLegendStyle from '../../charthelpers/chart-legend.css?inline';
import {
  Chart,
  LineController,
  LineElement,
  PointElement,
  ArcElement,
  Tooltip,
  CategoryScale,
  LinearScale,
  TimeScale,
  Filler,
} from 'chart.js';
import type {ChartOptions, ChartDataset, ChartConfiguration} from 'chart.js';
import {
  CHART_SECTOR_DEFAULT_COLORS,
  RECTANGULAR_CHART_DIMENSIONS,
  LINE_GRAPH_LABEL_CONFIG,
  LINE_GRAPH_GRID_CONFIG,
  getCssVariableValue,
  getChartColorsOrDefault,
  observeThemeChanges,
  formatNumericValue,
  getChartTooltipOptions,
  generateLegendHTML,
  applyAlphaToColor,
  calculateRectangularChartLayout,
} from '../../charthelpers/index.js';

// Register Chart.js components used by the line graph (scales, elements, plugins)
Chart.register(
  LineController,
  LineElement,
  PointElement,
  ArcElement,
  CategoryScale,
  LinearScale,
  TimeScale,
  Filler,
  Tooltip
);

/**
 * Scale information exposed via 'scales-updated' event
 * Provides computed min/max ranges, pixel positions, and padding for x and y axes
 * Enables external axis overlay matching with minimal calculation
 */
export interface ScaleInfo {
  x: {
    min: number;
    max: number;
    type: 'category' | 'time';
    labels?: string[];
    /** Pixel position of left edge of scale */
    left: number;
    /** Pixel position of right edge of scale */
    right: number;
  };
  y: {
    min: number;
    max: number;
    /** Pixel position of top edge of scale */
    top: number;
    /** Pixel position of bottom edge of scale */
    bottom: number;
  };
  /** Padding applied to canvas (from constants or computed) */
  padding: {
    top: number;
    right: number;
    bottom: number;
    left: number;
  };
  /** Canvas dimensions */
  canvas: {
    width: number;
    height: number;
  };
  /** Tick configuration (for matching external axes) */
  config: {
    xTicksLimit?: number;
    xStepSize?: number;
    yTicksLimit?: number;
    yStepSize?: number;
  };
}

export enum XAxisType {
  category = 'category',
  time = 'time',
}

export enum YAxisPosition {
  left = 'left',
  right = 'right',
}

export enum LineMode {
  smooth = 'smooth',
  straight = 'straight',
  stepped = 'stepped',
}

export enum TimeDisplay {
  minutes = 'minutes',
  date = 'date',
}

const LINE_GRAPH_WATCHED_PROP_NAMES = [
  'data',
  'datasets',
  'labels',
  'colors',
  'xAxisType',
  'yAxisPosition',
  'yAxes',
  'showGrid',
  'showGridX',
  'showGridY',
  'showTickMarks',
  'showPoints',
  'lineMode',
  'unit', // Used in tooltip display
  'timeDisplay',
  'xTicksLimit',
  'xStepSize',
  'yTicksLimit',
  'yStepSize',
  // legend only affects HTML; do not use it to drive chart updates
  'fixedHeight',
] as const;

const LINE_GRAPH_RECREATE_PROP_NAMES = [
  'showDebugOverlay',
  'fixedHeight',
] as const;

/**
 * Abstract base class for line and area chart components built on Chart.js.
 *
 * ## Features
 * - **Single or multi-series**: Use `data` for simple single-series or `datasets` for multi-series charts
 * - **Time and category axes**: Supports `category` x-axis (labels) and `time` x-axis (ISO dates or timestamps)
 * - **Line styles**: Choose `smooth` (curved), `straight`, or `stepped` line rendering
 * - **Fill modes**: Area fills with `semitransparent`, `solid`, or `threshold` (red/blue above/below midpoint)
 * - **Stacked charts**: Enable `stacked` for multi-series datasets to stack values on y-axis
 * - **Flexible axes**: Single y-axis via `yAxisPosition` or multi-axis via `yAxes` for complex charts
 * - **Theme-aware**: Automatically updates colors on theme changes using CSS variables
 * - **Responsive sizing**: Fixed height with 1.5:1 aspect ratio (e.g., 320px height → 480px width)
 * - **Grid & ticks**: Toggle grid lines (`showGrid`, `showGridX`, `showGridY`) and tick marks (`showTickMarks`)
 * - **Legend support**: Optional HTML legend showing series labels with `legend` property
 * - **External axis support**: Dispatches `scales-updated` event with computed scale ranges for SVG overlay matching
 *
 * ## Size Behavior
 * - Above 192px: Shows labels, tick marks, and grid lines with standard padding
 * - Below 192px: Hides labels/ticks and uses edge-to-edge rendering for compact display
 *
 * ## Events
 * - **scales-updated**: Dispatched after chart creation/update with `{detail: ScaleInfo}` containing computed x/y min/max ranges
 *
 * ## Examples
 *
 * Basic single-series with category axis:
 * ```html
 * <obc-line-graph></obc-line-graph>
 * <script>
 *   const chart = document.querySelector('obc-line-graph');
 *   chart.data = [
 *     {label: 'Jan', value: 10},
 *     {label: 'Feb', value: 14},
 *     {label: 'Mar', value: 12}
 *   ];
 *   chart.unit = 'kW';
 *   chart.fixedHeight = 256;
 * </script>
 * ```
 *
 * Multi-series with time axis and legend:
 * ```html
 * <obc-line-graph></obc-line-graph>
 * <script>
 *   const chart = document.querySelector('obc-line-graph');
 *   chart.xAxisType = 'time';
 *   chart.timeDisplay = 'date';
 *   chart.legend = true;
 *   chart.datasets = [
 *     {label: 'Temperature', data: [{x: '2025-01-01', y: 20}, {x: '2025-01-02', y: 22}]},
 *     {label: 'Humidity', data: [{x: '2025-01-01', y: 65}, {x: '2025-01-02', y: 68}]}
 *   ];
 * </script>
 * ```
 *
 * Stacked area chart with solid fill:
 * ```html
 * <obc-line-graph></obc-line-graph>
 * <script>
 *   const chart = document.querySelector('obc-line-graph');
 *   chart.datasets = [
 *     {label: 'Series A', data: [2, 3, 4, 3, 5]},
 *     {label: 'Series B', data: [1, 2, 3, 2, 4]},
 *     {label: 'Series C', data: [3, 2, 1, 2, 3]}
 *   ];
 *   chart.fill = true;
 *   chart.fillMode = 'solid';
 *   chart.stacked = true;
 *   chart.legend = true;
 * </script>
 * ```
 *
 * Threshold fill (single-series only):
 * ```html
 * <obc-line-graph></obc-line-graph>
 * <script>
 *   const chart = document.querySelector('obc-line-graph');
 *   chart.data = [{label: '1', value: 20}, {label: '2', value: 45}, {label: '3', value: 35}];
 *   chart.fill = true;
 *   chart.fillMode = 'threshold';
 * </script>
 * ```
 *
 * Multi-axis chart with right-side y-axis:
 * ```html
 * <obc-line-graph></obc-line-graph>
 * <script>
 *   const chart = document.querySelector('obc-line-graph');
 *   chart.yAxes = [
 *     {id: 'y-temp', position: 'left', min: 0, max: 100},
 *     {id: 'y-pressure', position: 'right', min: 0, max: 10}
 *   ];
 *   chart.datasets = [
 *     {label: 'Temperature', data: [20, 25, 30], yAxisID: 'y-temp'},
 *     {label: 'Pressure', data: [2, 3, 2.5], yAxisID: 'y-pressure'}
 *   ];
 * </script>
 * ```
 *
 * @property {Array<{label: string, value: number}>} data - Single-series data array. Each object must have `label` (string) and `value` (number). Used when `datasets` is not provided.
 * @property {ChartDataset<'line', (number | {x: string|number|Date; y: number})[]>[]} datasets - Multi-series Chart.js datasets. Takes precedence over `data`. Each dataset can have `label`, `data` (numeric array or `{x, y}` points), and visual properties like `borderColor`, `backgroundColor`, `fill`, etc.
 * @property {(string|number)[]} labels - Explicit labels for category x-axis. If omitted, labels are derived from `data` property or dataset x-values.
 * @property {string[]} colors - Custom color palette (CSS variable names or color strings). Falls back to theme default colors if not provided.
 * @property {'category'|'time'} xAxisType - X-axis mode. `'category'` for labeled data points, `'time'` for time-based data (ISO strings or timestamps). Default: `'category'`.
 * @property {'minutes'|'date'} timeDisplay - Time axis label format when `xAxisType='time'`. `'date'` shows full date/time, `'minutes'` shows minutes relative to first data point. Default: `'date'`.
 * @property {'left'|'right'} yAxisPosition - Single y-axis position. Use this for simple charts with one y-axis. For multiple y-axes, use `yAxes` property instead. Default: `'left'`.
 * @property {Array<{id?: string; position?: 'left'|'right'; min?: number; max?: number; grid?: boolean}>} yAxes - Multiple y-axis definitions for complex charts. Each axis can specify `id` (referenced by dataset `yAxisID`), `position`, `min`/`max` range, and `grid` visibility.
 * @property {boolean} showGrid - Show vertical grid lines (x-axis). When combined with `showGridX` and `showGridY`, controls full grid visibility. Default: `true`.
 * @property {boolean} showGridX - Show vertical grid lines (x-axis). Set to `false` to hide only vertical lines while keeping horizontal lines. Default: `true`.
 * @property {boolean} showGridY - Show horizontal grid lines (y-axis). Set to `false` to hide only horizontal lines while keeping vertical lines. Default: `true`.
 * @property {boolean} showTickMarks - Show axis tick marks and labels. Automatically hidden below 192px height threshold. Default: `true`.
 * @property {boolean} showPoints - Show point markers on data points. Default: `false`.
 * @property {boolean} fill - Enable area fill under/between lines. Use with `fillMode` to control fill style. Default: `false`.
 * @property {'semitransparent'|'solid'|'threshold'} fillMode - Fill rendering mode. `'semitransparent'` uses 50% alpha, `'solid'` uses opaque fill, `'threshold'` (single-series only) fills above/below midpoint with red/blue gradient. Default: `'semitransparent'`.
 * @property {'smooth'|'straight'|'stepped'} lineMode - Line drawing style. `'smooth'` applies bezier curve tension, `'straight'` draws straight lines, `'stepped'` creates step-like lines. Default: `'smooth'`.
 * @property {boolean} stacked - Stack multi-series datasets vertically on y-axis. Ignored for single-series and threshold fill mode. Default: `false`.
 * @property {string} unit - Unit label displayed in tooltips (e.g., 'kW', 'kg', '%'). Default: empty string.
 * @property {number} xTicksLimit - Maximum number of x-axis ticks/grid lines. Useful for matching external axes. Optional.
 * @property {number} xStepSize - Force specific interval between x-axis ticks (e.g., 1, 2, 5). Useful for matching external axes. Optional.
 * @property {number} yTicksLimit - Maximum number of y-axis ticks/grid lines. Useful for matching external axes. Optional.
 * @property {number} yStepSize - Force specific interval between y-axis ticks (e.g., 2, 5, 10). Useful for matching external axes. Optional.
 * @property {boolean} legend - Show HTML legend below chart with series labels and colors. Default: `false`.
 * @property {number} fixedHeight - Chart height in pixels. Determines chart size with 1.5:1 aspect ratio (width = height × 1.5). Default: `320`.
 * @property {boolean} showDebugOverlay - Development mode: show visual debug overlay with dimension guides. Shows blue border around canvas (axis area) and red border around chart grid (data area). Default: `false`.
 *
 * @ignore This is an abstract base class. Use concrete implementations like ObcLineGraph or ObcAreaGraph instead.
 */
export class ObcChartLineBase extends LitElement {
  @property({attribute: false})
  // Simple single-series data model
  data: {label: string; value: number}[] = [];

  /** Chart.js-style datasets for multi-series use. If provided, takes precedence over `data`. */
  @property({attribute: false})
  datasets?: ChartDataset<
    'line',
    (number | {x: string | number | Date; y: number})[]
  >[] = undefined;

  /** Optional explicit labels for the x-axis (category mode). If omitted labels are derived from `data` */
  @property({attribute: false})
  labels?: (string | number)[] = undefined;

  @property({attribute: false})
  colors: string[] = [];

  @property({type: Boolean, reflect: true})
  legend = false;

  @property({type: Boolean, reflect: true})
  showDebugOverlay = false;

  @property({type: Number, reflect: true})
  fixedHeight = 320;

  // --- Line-specific visual props ---
  @property({type: String})
  xAxisType: XAxisType = XAxisType.category;

  @property({type: String})
  // Single-axis convenience: 'left' | 'right'
  yAxisPosition: YAxisPosition = YAxisPosition.left;

  @property({attribute: false})
  // Full axis definitions to support multi-axis charts. Optional.
  yAxes?: Array<{
    id?: string;
    position?: 'left' | 'right';
    min?: number;
    max?: number;
    grid?: boolean;
  }> = undefined;

  @property({type: Boolean})
  showGrid = true;

  @property({type: Boolean})
  // When false, hide vertical grid lines (x-axis). Default: true
  showGridX = true;

  @property({type: Boolean})
  // When false, hide horizontal grid lines (y-axis). Default: true
  showGridY = true;

  @property({type: Boolean})
  showTickMarks = true;

  // Internal default tension used when `lineMode` is 'smooth'. Not exposed as a property.
  private readonly DEFAULT_TENSION = 0.4;

  // Internal default point radius when points are shown.
  private readonly POINT_RADIUS = 3;

  @property({type: Boolean})
  // Whether to show point markers. Default: hidden (false).
  showPoints = false;

  @property({type: String})
  // Line drawing mode: 'smooth' uses tension, 'straight' uses tension=0, 'stepped' uses stepped lines
  lineMode: LineMode = LineMode.smooth;

  @property({type: String})
  unit = '';

  @property({type: String})
  // Controls how time x-axis labels are displayed when `xAxisType='time'`.
  // 'date' shows the full date/time; 'minutes' shows minutes since first datapoint.
  timeDisplay: TimeDisplay = TimeDisplay.date;

  @property({type: Number})
  // Maximum number of ticks/grid lines on x-axis. Useful for matching external axes.
  xTicksLimit?: number = undefined;

  @property({type: Number})
  // Force specific interval between x-axis ticks. Useful for matching external axes.
  xStepSize?: number = undefined;

  @property({type: Number})
  // Maximum number of ticks/grid lines on y-axis. Useful for matching external axes.
  yTicksLimit?: number = undefined;

  @property({type: Number})
  // Force specific interval between y-axis ticks. Useful for matching external axes.
  yStepSize?: number = undefined;

  /** @internal */
  @query('canvas') private canvasEl?: HTMLCanvasElement;

  /** @internal */
  @query('.legend') private legendDiv?: HTMLDivElement;

  /** @internal */
  private chart?: Chart;

  /** @internal */
  private themeObserver?: MutationObserver;

  /** @internal - ResizeObserver for tracking height threshold crossings (e.g. MIN_HEIGHT_WITH_LABELS = 192px) */
  private resizeObserver?: ResizeObserver;

  /** @internal - Track previous state to detect threshold crossing */
  private wasAboveThreshold = true;

  /**
   * Should fill be applied to this chart?
   * Line graph returns false, area graph returns true.
   * Must be implemented in subclass.
   */
  protected shouldApplyFill(): boolean {
    throw new Error('shouldApplyFill() must be implemented in subclass');
  }

  /**
   * Get fill mode for area rendering.
   * Line graph returns undefined, area graph returns 'semitransparent' | 'solid' | 'threshold'.
   * Must be implemented in subclass.
   */
  protected getFillMode(): string | undefined {
    throw new Error('getFillMode() must be implemented in subclass');
  }

  /**
   * Should multi-series datasets be stacked?
   * Line graph returns false, area graph returns stacked property value.
   * Must be implemented in subclass.
   */
  protected shouldStack(): boolean {
    throw new Error('shouldStack() must be implemented in subclass');
  }

  private hasAnyChanged(
    changed: PropertyValues,
    props: readonly (keyof ObcChartLineBase)[]
  ): boolean {
    return props.some((prop) => changed.has(prop));
  }

  /**
   * Apply fillMode rules to datasets. Must be called after the chart is created
   * so scales and pixel coordinates are available for gradient construction.
   */
  protected applyFillModes() {
    // Guard: Verify chart and canvas exist and are connected
    if (!this.chart || !this.canvasEl || !this.canvasEl.isConnected) return;

    const chart = this.chart; // Store reference for TypeScript
    const ctx = chart.ctx as CanvasRenderingContext2D;

    // Guard: Verify canvas context is available
    if (!ctx) return;
    const chartColors = getChartColorsOrDefault(
      this,
      this.colors,
      CHART_SECTOR_DEFAULT_COLORS
    );
    const fill = this.shouldApplyFill();
    const fillMode = this.getFillMode();

    chart.data.datasets.forEach((ds, idx) => {
      const dataset = ds as ChartDataset<'line'> & {
        fill?:
          | boolean
          | number
          | {target: number; above: string; below: string};
        yAxisID?: string;
      };

      // Skip if not filling
      if (dataset.fill === false || !fill) {
        dataset.backgroundColor = 'transparent';
        return;
      }

      const borderColor =
        (dataset.borderColor as string) ??
        chartColors[idx % chartColors.length];
      const nextColor = chartColors[(idx + 1) % chartColors.length];

      // Handle solid and semitransparent fill modes
      if (fillMode === 'solid') {
        dataset.backgroundColor = String(borderColor);
        return;
      }

      if (fillMode === 'semitransparent') {
        dataset.backgroundColor = applyAlphaToColor(this, nextColor, 0.5);
        return;
      }

      // Threshold fill: only applies to single-series, creates gradients for border
      if (fillMode === 'threshold') {
        const yScaleId = dataset.yAxisID ?? 'y';
        const yScale = chart.scales[yScaleId];

        if (!yScale) {
          // Fallback to semitransparent
          const nextColor = chartColors[(idx + 1) % chartColors.length];
          dataset.backgroundColor = applyAlphaToColor(this, nextColor, 0.5);
          return;
        }

        // Calculate threshold and gradient stop position
        const dataValues = (dataset.data as (number | {x: number; y: number})[])
          .map((d) => (typeof d === 'number' ? d : d.y))
          .filter((v) => Number.isFinite(v));

        // Guard: Need at least some data to calculate threshold
        if (dataValues.length === 0) {
          // console.debug('[chart-line-base] applyFillModes: skipping threshold gradient - no valid data');
          const nextColor = chartColors[(idx + 1) % chartColors.length];
          dataset.backgroundColor = applyAlphaToColor(this, nextColor, 0.5);
          return;
        }

        const minVal = Math.min(...dataValues);
        const maxVal = Math.max(...dataValues);
        const thresholdVal = (minVal + maxVal) / 2;
        const thresholdPixel = yScale.getPixelForValue(thresholdVal);
        const range = yScale.bottom - yScale.top;

        // Guard: Ensure stop is a finite number between 0 and 1
        let stop = (thresholdPixel - yScale.top) / range;
        if (!Number.isFinite(stop) || range === 0) {
          // console.debug('[chart-line-base] applyFillModes: invalid stop value, using 0.5');
          stop = 0.5; // Fallback to middle if calculation fails
        } else {
          stop = Math.max(0, Math.min(1, stop));
        }

        // Extract threshold color variables (used for both fill and border)
        const lowRaw = LINE_GRAPH_GRID_CONFIG.thresholdLowColorVar;
        const highRaw = LINE_GRAPH_GRID_CONFIG.thresholdHighColorVar;

        // Helper to create threshold gradient
        const createGradient = (lowAlpha: number, highAlpha: number) => {
          const low = applyAlphaToColor(this, lowRaw, lowAlpha);
          const high = applyAlphaToColor(this, highRaw, highAlpha);
          const grad = ctx.createLinearGradient(
            0,
            yScale.top,
            0,
            yScale.bottom
          );
          grad.addColorStop(0, high);
          grad.addColorStop(stop, high);
          grad.addColorStop(stop, low);
          grad.addColorStop(1, low);
          return grad;
        };

        // Create fill gradient (35% alpha) and border gradient (80% alpha)
        dataset.backgroundColor = createGradient(
          0.35,
          0.35
        ) as unknown as string;
        dataset.borderColor = createGradient(0.8, 0.8) as unknown as string;
      }
    });
  }

  // Update external library AFTER render
  override updated(changed: PropertyValues) {
    super.updated(changed);

    // Only update if watched properties changed
    if (!this.hasAnyChanged(changed, LINE_GRAPH_WATCHED_PROP_NAMES)) {
      return;
    }

    const needsRecreation = this.hasAnyChanged(
      changed,
      LINE_GRAPH_RECREATE_PROP_NAMES
    );

    if (needsRecreation) {
      this.chart?.destroy();
      this.createChart();
    } else {
      this.updateChart();
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
   * Setup resize observer to detect height threshold crossings
   * Recreates chart when crossing MIN_HEIGHT_WITH_LABELS (192px) to show/hide labels
   * Detect when fixedHeight property changes programmatically (e.g., via Storybook controls or user code)
   */
  private setupResizeObserver() {
    if (!this.canvasEl) return;

    this.resizeObserver = new ResizeObserver(() => {
      // Guard: Check if chart and canvas still exist (component may be disconnecting)
      if (!this.chart || !this.canvasEl || !this.canvasEl.isConnected) return;

      const height = this.canvasEl.clientHeight;
      const isAboveThreshold =
        height >= RECTANGULAR_CHART_DIMENSIONS.MIN_HEIGHT_WITH_LABELS;

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
    this.wasAboveThreshold =
      height >= RECTANGULAR_CHART_DIMENSIONS.MIN_HEIGHT_WITH_LABELS;
  }

  /**
   * Build a complete dataset configuration with all styling properties.
   * Handles both new datasets (from values array) and existing datasets (normalization).
   *
   * @param data - Either numeric values array or existing dataset to normalize
   * @param index - Dataset index for color cycling
   * @param chartColors - Color palette array
   * @param totalCount - Total number of datasets (used for stacked divider logic)
   * @returns Fully configured Chart.js dataset
   */
  protected buildDataset(
    data:
      | number[]
      | ChartDataset<
          'line',
          (number | {x: string | number | Date; y: number})[]
        >,
    index: number,
    chartColors: string[],
    totalCount = 1
  ): ChartDataset<
    'line',
    number[] | (number | {x: string | number | Date; y: number})[]
  > {
    const currentColor = chartColors[index % chartColors.length];

    // Check if input is existing dataset (has 'data' property) or raw values array
    const existingDataset =
      'data' in (data as object)
        ? (data as ChartDataset<
            'line',
            (number | {x: string | number | Date; y: number})[]
          >)
        : null;
    const values = existingDataset ? null : (data as number[]);

    const borderColor = existingDataset?.borderColor ?? currentColor;
    const fillFlag = existingDataset?.fill ?? this.shouldApplyFill();
    const tension = this.lineMode === 'smooth' ? this.DEFAULT_TENSION : 0;

    // For stacked mode, add divider lines between datasets (except the topmost one)
    const isStacked = this.shouldStack() && this.getFillMode() !== 'threshold';
    const needsDivider = isStacked && index < totalCount - 1;

    const result = {
      ...(existingDataset || {}),
      data: existingDataset?.data ?? values!,
      borderColor,
      // Don't set backgroundColor here - let applyFillModes() handle it based on fillMode
      backgroundColor: 'transparent',
      borderWidth: existingDataset?.borderWidth ?? 2,
      showLine: existingDataset?.showLine ?? true,
      tension: existingDataset?.tension ?? tension,
      pointRadius:
        existingDataset?.pointRadius ??
        (this.showPoints ? this.POINT_RADIUS : 0),
      pointBackgroundColor: existingDataset?.pointBackgroundColor ?? '#fff',
      pointBorderColor: existingDataset?.pointBorderColor ?? borderColor,
      pointBorderWidth: existingDataset?.pointBorderWidth ?? 2,
      stepped: existingDataset?.stepped ?? this.lineMode === 'stepped',
      fill: fillFlag,
      spanGaps: existingDataset?.spanGaps ?? true,
      // Add segment styling for stacked divider lines
      ...(needsDivider && {
        segment: {
          borderColor: getCssVariableValue(
            this,
            LINE_GRAPH_GRID_CONFIG.stackedDividerColorVar
          ),
          borderWidth: 1,
        },
      }),
    };

    return result as ChartDataset<
      'line',
      number[] | (number | {x: string | number | Date; y: number})[]
    >;
  }

  /**
   * Create threshold mode datasets: invisible baseline + main dataset with above/below fills
   */
  protected createThresholdDatasets(
    values: number[],
    chartColors: string[]
  ): ChartDataset<'line', number[]>[] {
    const numericValues = values
      .map((v) => Number(v))
      .filter((n) => Number.isFinite(n));
    const minV = numericValues.length ? Math.min(...numericValues) : 0;
    const maxV = numericValues.length ? Math.max(...numericValues) : 100;
    const threshold = (minV + maxV) / 2;
    const baselineData = numericValues.map(() => threshold);

    const lowRaw = LINE_GRAPH_GRID_CONFIG.thresholdLowColorVar;
    const highRaw = LINE_GRAPH_GRID_CONFIG.thresholdHighColorVar;
    const highFill = applyAlphaToColor(this, highRaw, 0.35);
    const lowFill = applyAlphaToColor(this, lowRaw, 0.35);

    const baselineDataset: ChartDataset<'line', number[]> = {
      label: 'threshold-baseline',
      data: baselineData,
      borderColor: 'transparent',
      backgroundColor: 'transparent',
      borderWidth: 0,
      pointRadius: 0,
      showLine: false,
      fill: false,
      spanGaps: true,
    };

    const main = this.buildDataset(values, 0, chartColors) as ChartDataset<
      'line',
      number[]
    >;
    (main as unknown as Record<string, unknown>).fill = {
      target: 0,
      above: highFill,
      below: lowFill,
    };
    // Border gradient will be set by applyFillModes after chart scales are ready
    main.borderWidth = 2;

    return [baselineDataset, main];
  }

  /**
   * Prepare normalized datasets for multi-series charts
   */
  protected prepareMultiSeriesDatasets() {
    const chartColors = getChartColorsOrDefault(
      this,
      this.colors,
      CHART_SECTOR_DEFAULT_COLORS
    );

    const totalCount = this.datasets!.length;
    return this.datasets!.map((ds, i) =>
      this.buildDataset(ds, i, chartColors, totalCount)
    );
  }

  /**
   * Prepare datasets for single-series charts
   * Handles both regular and threshold fill modes
   */
  protected prepareSingleSeriesDatasets() {
    const values = this.data.map((d) => d.value);
    const labels = this.data.map((d) => d.label);
    const chartColors = getChartColorsOrDefault(
      this,
      this.colors,
      CHART_SECTOR_DEFAULT_COLORS
    );
    const fill = this.shouldApplyFill();
    const fillMode = this.getFillMode();

    const datasets =
      fill && fillMode === 'threshold'
        ? this.createThresholdDatasets(values, chartColors)
        : [this.buildDataset(values, 0, chartColors)];

    return {datasets, labels};
  }

  /**
   * Get Chart.js options using rectangular chart layout helper
   */
  protected getChartOptions(): ChartOptions<'line'> {
    // Use rectangular chart layout helper (simpler than circular chart calculations)
    const dimensions = calculateRectangularChartLayout(
      this.fixedHeight,
      RECTANGULAR_CHART_DIMENSIONS.DEFAULT_ASPECT_RATIO
    );

    // Set CSS variables for wrapper and canvas sizing (following donut-chart pattern)
    this.style.setProperty('--chart-width', `${dimensions.width}px`);
    this.style.setProperty('--chart-height', `${dimensions.height}px`);

    // Compute reference timestamp for time-based x-axis
    const refTs = this.computeTimeReference();

    return {
      responsive: true,
      maintainAspectRatio: true,
      aspectRatio: dimensions.aspectRatio,
      layout: {
        padding: dimensions.padding,
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
            title: () => '',
            label: (context) => {
              const label = context.label ?? '';
              const value =
                typeof context.parsed === 'object' && context.parsed !== null
                  ? (context.parsed as {y: number}).y
                  : (context.parsed as number);
              const numericValue = formatNumericValue(value, 1, false, 0);
              const unit = this.unit ? `${this.unit}` : '';
              return `${label} ${numericValue}${unit}`;
            },
          },
        },
      },
      animation: false,
      scales: this.buildScalesConfig(refTs, dimensions.isTooSmall),
    };
  }

  /**
   * Compute reference timestamp for time axis formatting.
   * Returns earliest timestamp for 'date' mode, latest for 'minutes' mode.
   */
  private computeTimeReference(): number | undefined {
    const timestamps: number[] = [];

    // Collect timestamps from datasets
    if (this.datasets?.length) {
      this.datasets.forEach((ds) => {
        if (!ds.data) return;
        (ds.data as (number | {x: unknown; y: number})[]).forEach((pt) => {
          if (pt && typeof pt === 'object' && 'x' in pt) {
            const xVal = (pt as {x: unknown}).x;
            const ts =
              typeof xVal === 'string'
                ? new Date(String(xVal)).getTime()
                : Number(xVal);
            if (Number.isFinite(ts)) timestamps.push(ts);
          }
        });
      });
    }

    // Collect timestamps from labels if no dataset timestamps found
    if (!timestamps.length && this.labels?.length) {
      this.labels.forEach((l) => {
        if (typeof l === 'string') {
          const ts = new Date(l).getTime();
          if (Number.isFinite(ts)) timestamps.push(ts);
        }
      });
    }

    return timestamps.length
      ? this.timeDisplay === 'minutes'
        ? Math.max(...timestamps)
        : Math.min(...timestamps)
      : undefined;
  }

  /**
   * Build Chart.js scale configuration with theme-aware styling.
   * Applies CSS variables for grid colors, tick colors, and label typography.
   *
   * @param minX - Reference timestamp for time-based x-axis (used for 'minutes' display)
   * @param isTooSmall - Whether chart is below 192px threshold (hides ticks when true)
   * @returns Configured scales object for Chart.js options
   */
  protected buildScalesConfig(minX?: number, isTooSmall = false) {
    // Build scales typed for ChartOptions<'line'>
    // If we don't have a date adapter available, fall back to numeric linear scale
    // by converting date strings to timestamps before chart creation. We still
    // render formatted tick labels for readability.
    // Read CSS variables for styling
    const gridColor = getCssVariableValue(
      this,
      LINE_GRAPH_GRID_CONFIG.gridColorVar
    );
    const tickColor = getCssVariableValue(
      this,
      LINE_GRAPH_GRID_CONFIG.tickColorVar
    );
    const fontFamily = getCssVariableValue(
      this,
      LINE_GRAPH_LABEL_CONFIG.fontFamily
    );
    const fontSize = getCssVariableValue(
      this,
      LINE_GRAPH_LABEL_CONFIG.fontSizeVar
    );
    const fontWeight = getCssVariableValue(
      this,
      LINE_GRAPH_LABEL_CONFIG.fontWeightVar
    );
    const fontColor = getCssVariableValue(
      this,
      LINE_GRAPH_LABEL_CONFIG.fontColorVar
    );

    // Extract common values used for both x and y axes
    const showLabels = this.showTickMarks && !isTooSmall;
    const showTicks = this.showTickMarks && !isTooSmall;
    const fontConfig = {family: fontFamily, size: fontSize, weight: fontWeight};

    const x = {
      type: this.xAxisType === 'time' ? 'linear' : 'category',
      offset: false, // Always edge-to-edge (no padding on x-axis)
      grace: 0, // No extra margin
      bounds: 'data', // Use data bounds for edge-to-edge rendering
      grid: {
        display: this.showGrid && this.showGridX,
        color: gridColor,
        offset: false,
        drawTicks: showTicks,
      },
      ticks: {
        display: showLabels,
        color: fontColor,
        font: fontConfig,
        maxRotation: 0, // Keep labels horizontal (no rotation)
        minRotation: 0, // Keep labels horizontal (no rotation)
        maxTicksLimit: this.xTicksLimit,
        stepSize: this.xStepSize,
        callback: (value: unknown) => {
          if (this.xAxisType !== 'time') return String(value);
          const n = Number(value);
          if (!Number.isFinite(n)) return String(value);
          if (
            this.timeDisplay === 'minutes' &&
            minX !== undefined &&
            Number.isFinite(minX)
          ) {
            const minutes = Math.round((n - minX) / 60000);
            return `${minutes}min`;
          }
          return new Date(n).toLocaleDateString();
        },
      },
      border: {
        display: showLabels,
        color: tickColor,
      },
    } as unknown;

    // Build y-axis scales configuration
    const yAxesConfig = this.yAxes?.length
      ? this.yAxes.map((axis, i) => ({
          id: axis.id ?? `y${i}`,
          position: axis.position ?? ('left' as 'left' | 'right'),
          min: axis.min,
          max: axis.max,
          gridDisplay: axis.grid ?? (this.showGrid && this.showGridY),
        }))
      : [
          {
            id: 'y',
            position: this.yAxisPosition,
            min: undefined,
            max: undefined,
            gridDisplay: this.showGrid && this.showGridY,
          },
        ];

    const scalesRecord: Record<string, unknown> = {x};

    yAxesConfig.forEach(({id, position, min, max, gridDisplay}) => {
      scalesRecord[id] = {
        type: 'linear',
        display: true,
        position,
        stacked: this.shouldStack() && this.getFillMode() !== 'threshold',
        grace: isTooSmall ? 0 : undefined,
        bounds: isTooSmall ? 'data' : 'ticks',
        grid: {
          display: gridDisplay,
          color: gridColor,
          drawTicks: showTicks,
        },
        ticks: {
          display: showLabels,
          color: fontColor,
          font: fontConfig,
          maxTicksLimit: this.yTicksLimit,
          stepSize: this.yStepSize,
        },
        border: {
          display: showLabels,
          color: tickColor,
        },
        min,
        max,
      };
    });

    return scalesRecord as ChartOptions<'line'>['scales'];
  }

  /**
   * Prepare chart data and labels for both single and multi-series modes
   */
  private prepareChartDataAndLabels() {
    if (this.datasets?.length) {
      return {
        datasets: this.prepareMultiSeriesDatasets(),
        labels: (this.labels ?? []) as (string | number)[],
      };
    }
    return this.prepareSingleSeriesDatasets();
  }

  private createChart() {
    // Guard: Verify canvas exists and is connected to DOM
    if (!this.canvasEl || !this.canvasEl.isConnected) return;

    const ctx = this.canvasEl.getContext('2d');
    if (!ctx) return;

    const {datasets, labels} = this.prepareChartDataAndLabels();

    this.chart = new Chart(ctx, {
      type: 'line',
      data: {labels, datasets},
      options: this.getChartOptions(),
    } as ChartConfiguration<'line'>);

    // Defer legend update to next tick to ensure Chart.js metadata is initialized
    requestAnimationFrame(() => this.updateLegend());
    this.applyFillModes();
    this.dispatchScalesUpdated();
  }

  private updateChart() {
    // Guard: Verify chart and canvas still exist and are connected
    if (!this.chart || !this.canvasEl || !this.canvasEl.isConnected) return;

    const {datasets, labels} = this.prepareChartDataAndLabels();

    this.chart.data.labels = labels;
    this.chart.data.datasets = datasets as unknown as ChartDataset<'line'>[];

    // Update options (chart.options is always defined after chart creation)
    Object.assign(this.chart.options, this.getChartOptions());

    this.applyFillModes();
    this.chart.update();

    // Update legend after chart update completes to ensure metadata is ready
    requestAnimationFrame(() => this.updateLegend());
    this.dispatchScalesUpdated();
  }

  /**
   * Update only chart colors without recalculating layout
   * Used by theme observer for efficient theme changes
   */
  private updateChartColors() {
    // Guard: Verify chart and canvas still exist and are connected
    if (!this.chart || !this.canvasEl || !this.canvasEl.isConnected) return;

    // Re-apply fill modes which will update gradients for threshold mode
    this.applyFillModes();

    // Update without animation for instant theme change
    this.chart.update('none');

    // Defer legend update to next frame to ensure metadata is ready
    requestAnimationFrame(() => this.updateLegend());
  }

  /**
   * Dispatch 'scales-updated' event with current scale information
   * Enables external SVG axis overlays to match Chart.js scale ranges
   * Event fires after chart creation/update when scales are computed
   */
  private dispatchScalesUpdated() {
    // Guard: Verify chart, canvas, and DOM connection exist
    if (!this.chart || !this.canvasEl || !this.canvasEl.isConnected) return;

    const xScale = this.chart.scales['x'];
    const yScale = this.chart.scales['y'];

    if (!xScale || !yScale) return;

    // Get padding from chart options (matches calculateRectangularChartLayout)
    const chartPadding = this.chart.options.layout?.padding as
      | {top: number; right: number; bottom: number; left: number}
      | undefined;
    const padding = chartPadding ?? {top: 0, right: 0, bottom: 0, left: 0};

    const scaleInfo: ScaleInfo = {
      x: {
        min: xScale.min,
        max: xScale.max,
        type: this.xAxisType,
        labels:
          this.xAxisType === 'category'
            ? (this.chart.data.labels as string[])
            : undefined,
        left: xScale.left,
        right: xScale.right,
      },
      y: {
        min: yScale.min,
        max: yScale.max,
        top: yScale.top,
        bottom: yScale.bottom,
      },
      padding,
      canvas: {
        width: this.canvasEl.width,
        height: this.canvasEl.height,
      },
      config: {
        xTicksLimit: this.xTicksLimit,
        xStepSize: this.xStepSize,
        yTicksLimit: this.yTicksLimit,
        yStepSize: this.yStepSize,
      },
    };

    this.dispatchEvent(
      new CustomEvent('scales-updated', {
        detail: scaleInfo,
        bubbles: true,
        composed: true,
      })
    );
  }

  /**
   * Update the legend HTML content
   */
  private updateLegend() {
    // Guard: Check if legend should be shown and chart is ready
    if (!this.legend || !this.legendDiv || !this.chart) return;

    // Guard: Check if chart has datasets
    if (!this.chart.data.datasets || this.chart.data.datasets.length === 0) {
      // console.debug('[chart-line-base] updateLegend: skipped - no datasets available');
      this.legendDiv.innerHTML = '';
      return;
    }

    try {
      const legendItems = this.chart.data.datasets
        .map((ds, i) => {
          const meta = this.chart!.getDatasetMeta(i);

          // Guard: Check if metadata and controller are available
          if (!meta || !meta.controller) {
            // console.debug(`[chart-line-base] updateLegend: dataset ${i} metadata not yet initialized`);
            return null;
          }

          const style = meta.controller.getStyle(0, false);
          const dataset = ds as ChartDataset<
            'line',
            (number | {x: number; y: number})[]
          >;

          return {
            fillStyle: (dataset.borderColor ??
              style.borderColor ??
              '') as string,
            label: (dataset.label as string) || `Series ${i + 1}`,
            value: '',
            unit: '',
          };
        })
        .filter((item) => item !== null);

      // Only update legend if we have valid items
      if (legendItems.length > 0) {
        const legendHTML = generateLegendHTML(legendItems);
        this.legendDiv.innerHTML = legendHTML;
      }
    } catch (error) {
      console.debug(
        '[chart-line-base] updateLegend: error generating legend HTML',
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
