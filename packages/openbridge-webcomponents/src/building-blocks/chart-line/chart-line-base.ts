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
  InstrumentState,
  FrameStyle,
  BorderRadiusPosition,
} from '../../navigation-instruments/types.js';
import {
  CHART_SECTOR_DEFAULT_COLORS,
  CHART_SECTOR_ENHANCED_COLORS,
  RECTANGULAR_CHART_DIMENSIONS,
  LINE_GRAPH_LABEL_CONFIG,
  LINE_GRAPH_GRID_CONFIG,
  CHART_DIMENSIONS,
  CHART_AREA_BACKGROUND_COLOR_VAR,
  getCssVariableValue,
  getChartColorsOrDefault,
  observeThemeChanges,
  formatNumericValue,
  getChartTooltipOptions,
  generateLegendHTML,
  applyAlphaToColor,
} from '../../charthelpers/index.js';
import {
  EXTERNAL_SCALE_BORDER_RADIUS_CSS_VAR,
  readExternalScaleBorderRadiusPx,
  startExternalScaleBorderRadiusObserver,
  ScaleType,
} from '../external-scale/external-scale.js';

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
 * Dimension information reported by external scale components.
 * Dispatched via 'scale-dimensions-changed' event from slotted scale elements.
 */
export interface ExternalScaleDimensions {
  /** Which side this scale is positioned on */
  side: 'top' | 'bottom' | 'left' | 'right';
  /** Natural thickness in pixels (width for vertical, height for horizontal) */
  thickness: number;
}

/**
 * Type guard to check if an element is an external scale component
 */
interface ExternalScaleElement extends HTMLElement {
  minValue?: number;
  maxValue?: number;
  height?: number;
  width?: number;
  paddingTop?: number;
  paddingBottom?: number;
  paddingLeft?: number;
  paddingRight?: number;
  paddingStart?: number;
  paddingEnd?: number;
  primaryTickbarsInterval?: number;
  labels?: boolean;
  fixedAspectRatio?: boolean;
  scaleReferenceSize?: number;
  state?: InstrumentState;
  enhanced?: boolean;
  frameStyle?: FrameStyle;
  borderRadiusPosition?: BorderRadiusPosition;
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
  'enhanced', // Triggers color palette change
  'borderRadiusPosition', // Triggers border styling update
  'borderRadiusPositionExternalScales', // Triggers external scale border styling update
  // legend only affects HTML; do not use it to drive chart updates
  'width',
  'height',
  'fixedAspectRatioScaling', // Triggers responsive mode change
] as const;

const LINE_GRAPH_RECREATE_PROP_NAMES = [
  'showDebugOverlay',
  'width',
  'height',
  'fixedAspectRatioScaling',
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
 * - **External axis support**: via slots
 *
 * ## Size Behavior
 * - Above 192px: Shows labels, tick marks, and grid lines with standard padding
 * - Below 192px: Hides labels/ticks and uses edge-to-edge rendering for compact display
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
 *   chart.height = 256;
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
 * @property {boolean} showGrid - Show vertical grid lines (x-axis). When combined with `showGridX` and `showGridY`, controls full grid visibility. Default: `false`.
 * @property {boolean} showGridX - Show vertical grid lines (x-axis). Set to `false` to hide only vertical lines while keeping horizontal lines. Default: `false`.
 * @property {boolean} showGridY - Show horizontal grid lines (y-axis). Set to `false` to hide only horizontal lines while keeping vertical lines. Default: `false`.
 * @property {boolean} showTickMarks - Show axis tick marks and labels. Automatically hidden below 192px height threshold. Default: `false`.
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
 * @property {number} height - Chart height in pixels. Determines chart size with 1.5:1 aspect ratio (width = height × 1.5). Default: `320`.
 * @property {boolean} showDebugOverlay - Development mode: show visual debug overlay with dimension guides. Shows blue border around canvas (axis area) and red border around chart grid (data area). Default: `false`.
 *
 * @ignore This is an abstract base class. Use concrete implementations like ObcLineGraph or ObcAreaGraph instead.
 */
export class ObcChartLineBase extends LitElement {
  /** Simple single-series data (array of {label, value}). */
  @property({attribute: false})
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

  /** Custom color palette (CSS variable names or color strings). */
  @property({attribute: false})
  colors: string[] = [];

  /** Show HTML legend below chart with series labels and colors. */
  @property({type: Boolean, reflect: true})
  legend = false;

  /** Development mode: show visual debug overlay with dimension guides. */
  @property({type: Boolean, reflect: true})
  showDebugOverlay = false;

  /** Width of the chart in pixels. Default: 480. */
  @property({type: Number, reflect: true})
  width = 480;

  /** Height of the chart in pixels. Default: 320. */
  @property({type: Number, reflect: true})
  height = 320;

  /**
   * Enable fixed aspect ratio scaling mode.
   * When true, width/height properties define the aspect ratio (not actual pixels).
   * The component fills 100% of parent width and calculates height from aspect ratio.
   * When false (default), width/height are used as actual pixel dimensions.
   */
  @property({type: Boolean, reflect: true})
  fixedAspectRatioScaling = false;

  /**
   * Reference size for external scales when using fixedAspectRatioScaling.
   * This value is passed down to external scales to determine their 1:1 Figma design size.
   * At this reference size, scales render at native size; above/below they scale proportionally.
   * Default: 384 (matches Figma design baseline).
   */
  @property({type: Number})
  scaleReferenceSize = 384;

  /** X-axis mode: 'category' for labeled data points, 'time' for time-based data. */
  @property({type: String})
  xAxisType: XAxisType = XAxisType.category;

  /** Single y-axis position ('left' or 'right'). For multiple y-axes, use yAxes instead. */
  @property({type: String})
  yAxisPosition: YAxisPosition = YAxisPosition.left;

  /** Multiple y-axis definitions for complex multi-axis charts. */
  @property({attribute: false})
  yAxes?: Array<{
    id?: string;
    position?: 'left' | 'right';
    min?: number;
    max?: number;
    grid?: boolean;
  }> = undefined;

  /** Show grid lines. */
  @property({type: Boolean})
  showGrid = false;

  /** Show vertical grid lines (x-axis). Default: false. */
  @property({type: Boolean})
  showGridX = false;

  /** Show horizontal grid lines (y-axis). Default: false. */
  @property({type: Boolean})
  showGridY = false;

  /** Show axis tick marks and labels. */
  @property({type: Boolean})
  showTickMarks = false;

  // Internal default tension used when `lineMode` is 'smooth'. Not exposed as a property.
  private readonly DEFAULT_TENSION = 0.4;

  // Internal default point radius when points are shown.
  private readonly POINT_RADIUS = 3;

  /** Show point markers on data points. Default: false. */
  @property({type: Boolean})
  showPoints = false;

  /** Line drawing style: 'smooth' (curved), 'straight', or 'stepped'. */
  @property({type: String})
  lineMode: LineMode = LineMode.smooth;

  /** Unit label displayed in tooltips (e.g., 'kW', 'kg', '%'). */
  @property({type: String})
  unit = '';

  /** Time axis label format: 'date' (full date/time) or 'minutes' (relative). */
  @property({type: String})
  timeDisplay: TimeDisplay = TimeDisplay.date;

  /** Max number of x-axis ticks/grid lines. Useful for matching external axes. */
  @property({type: Number})
  xTicksLimit?: number = undefined;

  /** Force x-axis tick interval. Useful for matching external axes. */
  @property({type: Number})
  xStepSize?: number = undefined;

  /** Max number of y-axis ticks/grid lines. Useful for matching external axes. */
  @property({type: Number})
  yTicksLimit?: number = undefined;

  /** Force y-axis tick interval. Useful for matching external axes. */
  @property({type: Number})
  yStepSize?: number = undefined;

  /** Instrument state affecting colors of external scales. */
  @property({type: String})
  state: InstrumentState = InstrumentState.inCommand;

  /** Use enhanced color palette (blue) instead of default (gray). */
  @property({type: Boolean})
  enhanced = false;

  /** Frame style for chart and external scales. */
  @property({type: String})
  frameStyle: FrameStyle = FrameStyle.regular;

  /** Border radius position for the chart's own border. */
  @property({type: String})
  borderRadiusPosition?: BorderRadiusPosition = undefined;

  /** Border radius position for external scales based on layout. */
  @property({type: String})
  borderRadiusPositionExternalScales?: BorderRadiusPosition = undefined;

  /**
   * When true, the chart is used inside an instrument (e.g., gauge-trend).
   * In this mode, only label font size responds to .obc-component-size-* CSS classes.
   * Border radius uses the explicit `borderRadius` property value (or defaults to 8px),
   * rather than reading from CSS variables.
   * @default false
   */
  @property({type: Boolean})
  instrumentMode = false;

  /**
   * Explicit border radius value in pixels.
   * When instrumentMode=true, this value is used directly (defaults to 8px).
   * When instrumentMode=false, this is ignored and border radius is read from CSS variable.
   */
  @property({type: Number})
  borderRadius?: number = undefined;

  /** @internal */
  @query('canvas') private canvasEl?: HTMLCanvasElement;

  /** @internal */
  @query('.legend') private legendDiv?: HTMLDivElement;

  /** @internal - Slot elements for external scales */
  @query('slot[name="top-scale"]') private topScaleSlot?: HTMLSlotElement;
  @query('slot[name="bottom-scale"]') private bottomScaleSlot?: HTMLSlotElement;
  @query('slot[name="left-scale"]') private leftScaleSlot?: HTMLSlotElement;
  @query('slot[name="right-scale"]') private rightScaleSlot?: HTMLSlotElement;

  /** @internal */
  private chart?: Chart;

  /** @internal */
  private themeObserver?: MutationObserver;

  /** @internal - ResizeObserver for tracking height threshold crossings (e.g. MIN_HEIGHT_WITH_LABELS = 192px) */
  private resizeObserver?: ResizeObserver;

  /** @internal - Track previous state to detect threshold crossing */
  private wasAboveThreshold = false;

  /** @internal - Track external scale dimensions */
  private externalScaleDimensions: Map<string, number> = new Map();

  /** @internal - Debounce timer for dimension updates */
  private dimensionUpdateTimer?: ReturnType<typeof setTimeout>;

  /** @internal - Flag to prevent infinite update loops */
  private isUpdatingScales = false;

  /** @internal - Border radius observer for theme/size changes */
  private borderRadiusObserver?: MutationObserver;

  /** @internal - Current computed border radius in pixels */
  private currentBorderRadiusPx = 8;

  /** @internal - ResizeObserver for aspect ratio scaling */
  private aspectRatioResizeObserver?: ResizeObserver;

  /** @internal - Computed actual width when using fixed aspect ratio scaling */
  private computedWidth = 480;

  /** @internal - Computed actual height when using fixed aspect ratio scaling */
  private computedHeight = 320;

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

  /**
   * Compute which corners should be rounded based on borderRadiusPosition and
   * which external scales are present.
   *
   * Logic:
   * - Opposite scales (left+right OR top+bottom) → no rounding (middleChild behavior)
   * - Perpendicular scales (e.g., right+bottom):
   *   - innerFirstChild → round corner adjacent to both scales
   *   - outerLastChild → round free corner opposite to scales
   * - Single-side scales:
   *   - When external scale is on RIGHT, chart is on LEFT
   *     - innerFirstChild → round LEFT corners (top-left + bottom-left)
   *     - outerLastChild → round RIGHT corners (top-right + bottom-right)
   *   - When external scale is on LEFT, chart is on RIGHT (opposite)
   *   - When external scale is on TOP, chart is on BOTTOM
   *     - innerFirstChild → round BOTTOM corners (bottom-left + bottom-right)
   *     - outerLastChild → round TOP corners (top-left + top-right)
   *   - When external scale is on BOTTOM, chart is on TOP (opposite)
   * - middleChild → no rounding
   */

  /**
   * Check if a slotted scale element is actually visible (renders content).
   * For bar-vertical/bar-horizontal elements, checks hasBar and hasScale properties.
   */
  private hasVisibleScale(side: 'left' | 'right' | 'top' | 'bottom'): boolean {
    const slotMap = {
      left: this.leftScaleSlot,
      right: this.rightScaleSlot,
      top: this.topScaleSlot,
      bottom: this.bottomScaleSlot,
    };

    const slot = slotMap[side];
    const elements = slot?.assignedElements() ?? [];

    return elements.some((el: Element) => {
      const barEl = el as HTMLElement & {
        hasBar?: boolean;
        hasScale?: boolean;
      };

      // If it has hasBar and hasScale properties, check if at least one is true
      if ('hasBar' in barEl && 'hasScale' in barEl) {
        return barEl.hasBar === true || barEl.hasScale === true;
      }

      // Otherwise assume it's visible
      return true;
    });
  }

  private computeRoundedCorners(): {
    topLeft: boolean;
    topRight: boolean;
    bottomLeft: boolean;
    bottomRight: boolean;
  } {
    if (!this.borderRadiusPosition) {
      return {
        topLeft: false,
        topRight: false,
        bottomLeft: false,
        bottomRight: false,
      };
    }

    if (this.borderRadiusPosition === BorderRadiusPosition.middleChild) {
      return {
        topLeft: false,
        topRight: false,
        bottomLeft: false,
        bottomRight: false,
      };
    }

    // middleRoundedChild → round ALL corners (standalone instrument mode)
    if (this.borderRadiusPosition === BorderRadiusPosition.middleRoundedChild) {
      return {
        topLeft: true,
        topRight: true,
        bottomLeft: true,
        bottomRight: true,
      };
    }

    // Determine which external scales are VISIBLE (not just present in slots)
    const hasLeft = this.hasVisibleScale('left');
    const hasRight = this.hasVisibleScale('right');
    const hasTop = this.hasVisibleScale('top');
    const hasBottom = this.hasVisibleScale('bottom');

    // If scales exist on opposite sides, behave like middleChild (no rounding)
    if ((hasLeft && hasRight) || (hasTop && hasBottom)) {
      return {
        topLeft: false,
        topRight: false,
        bottomLeft: false,
        bottomRight: false,
      };
    }

    const result = {
      topLeft: false,
      topRight: false,
      bottomLeft: false,
      bottomRight: false,
    };

    const isInner =
      this.borderRadiusPosition === BorderRadiusPosition.innerFirstChild;
    const isOuter =
      this.borderRadiusPosition === BorderRadiusPosition.outerLastChild;

    // Handle perpendicular scale configurations (e.g., right + bottom)
    if (hasRight && hasBottom) {
      // Chart is in top-left position
      if (isInner) {
        result.bottomRight = true; // Corner adjacent to both scales
      } else if (isOuter) {
        result.topLeft = true; // Free corner
      }
    } else if (hasRight && hasTop) {
      // Chart is in bottom-left position
      if (isInner) {
        result.topRight = true; // Corner adjacent to both scales
      } else if (isOuter) {
        result.bottomLeft = true; // Free corner
      }
    } else if (hasLeft && hasBottom) {
      // Chart is in top-right position
      if (isInner) {
        result.bottomLeft = true; // Corner adjacent to both scales
      } else if (isOuter) {
        result.topRight = true; // Free corner
      }
    } else if (hasLeft && hasTop) {
      // Chart is in bottom-right position
      if (isInner) {
        result.topLeft = true; // Corner adjacent to both scales
      } else if (isOuter) {
        result.bottomRight = true; // Free corner
      }
    }
    // Handle single-side horizontal scales (left OR right, but not both)
    else if (hasRight && !hasLeft) {
      // Chart is on the left side of composition
      if (isInner) {
        result.topLeft = true;
        result.bottomLeft = true;
      } else if (isOuter) {
        result.topRight = true;
        result.bottomRight = true;
      }
    } else if (hasLeft && !hasRight) {
      // Chart is on the right side of composition
      if (isInner) {
        result.topRight = true;
        result.bottomRight = true;
      } else if (isOuter) {
        result.topLeft = true;
        result.bottomLeft = true;
      }
    }
    // Handle single-side vertical scales (top OR bottom, but not both)
    else if (hasBottom && !hasTop) {
      // Chart is on the top of composition
      if (isInner) {
        result.topLeft = true;
        result.topRight = true;
      } else if (isOuter) {
        result.bottomLeft = true;
        result.bottomRight = true;
      }
    } else if (hasTop && !hasBottom) {
      // Chart is on the bottom of composition
      if (isInner) {
        result.bottomLeft = true;
        result.bottomRight = true;
      } else if (isOuter) {
        result.topLeft = true;
        result.topRight = true;
      }
    }

    return result;
  }

  /**
   * Read current border radius from CSS variable and update state.
   * The chart will be recreated when needed through the normal update mechanism.
   * In instrument mode, uses explicit borderRadius value instead of CSS variable.
   */
  private updateBorderRadius = () => {
    if (!this.canvasEl) return;

    // In instrument mode, use explicit value or default (8px)
    // Skip CSS variable reading entirely
    let next: number;
    if (this.instrumentMode) {
      next = this.borderRadius ?? 8;
    } else {
      next = readExternalScaleBorderRadiusPx(
        this.canvasEl,
        ScaleType.regular,
        EXTERNAL_SCALE_BORDER_RADIUS_CSS_VAR
      );
    }

    if (this.currentBorderRadiusPx !== next) {
      this.currentBorderRadiusPx = next;
      // Trigger chart recreation to update border plugin
      if (this.chart) {
        this.chart.destroy();
        this.createChart();
      }
    }
  };

  /**
   * Create a Chart.js plugin that draws a border around the chart area with selective corner rounding
   * and clips content to that border.
   */
  private createBorderPlugin() {
    const corners = this.computeRoundedCorners();
    const radius = this.currentBorderRadiusPx;

    let didApplyClip = false;

    const buildRoundedRectPath = (
      ctx: CanvasRenderingContext2D,
      rect: {x: number; y: number; width: number; height: number},
      cornerRadius: number
    ) => {
      const {x, y, width, height} = rect;

      // Guard: Avoid invalid paths
      if (width <= 0 || height <= 0) return;

      const r = Math.max(
        0,
        Math.min(cornerRadius, Math.min(width, height) / 2)
      );

      // Start at top-left corner (accounting for radius)
      ctx.moveTo(x + (corners.topLeft ? r : 0), y);

      // Top edge
      ctx.lineTo(x + width - (corners.topRight ? r : 0), y);

      // Top-right corner
      if (corners.topRight) {
        ctx.arcTo(x + width, y, x + width, y + r, r);
      }

      // Right edge
      ctx.lineTo(x + width, y + height - (corners.bottomRight ? r : 0));

      // Bottom-right corner
      if (corners.bottomRight) {
        ctx.arcTo(x + width, y + height, x + width - r, y + height, r);
      }

      // Bottom edge
      ctx.lineTo(x + (corners.bottomLeft ? r : 0), y + height);

      // Bottom-left corner
      if (corners.bottomLeft) {
        ctx.arcTo(x, y + height, x, y + height - r, r);
      }

      // Left edge
      ctx.lineTo(x, y + (corners.topLeft ? r : 0));

      // Top-left corner
      if (corners.topLeft) {
        ctx.arcTo(x, y, x + r, y, r);
      }
    };

    return {
      id: 'chartAreaBorder',
      beforeDatasetsDraw: (chart: Chart) => {
        const ctx = chart.ctx;
        const chartArea = chart.chartArea;

        if (!chartArea) return;

        // Draw/clip behavior should match CSS border-box:
        // - The border stroke must be fully INSIDE the chartArea.
        // - The stroke's OUTER edge should align to the chartArea boundary.
        // Reserve space by clipping content inside the border thickness.
        const borderWidthPx = 1;
        const clipInset = borderWidthPx;

        const {top, right, bottom, left} = chartArea;
        const rect = {
          x: left + clipInset,
          y: top + clipInset,
          width: right - left - clipInset * 2,
          height: bottom - top - clipInset * 2,
        };

        const clipRadius = Math.max(0, radius - clipInset);

        ctx.save();
        didApplyClip = true;

        // Create clipping path with selective corner rounding
        ctx.beginPath();

        buildRoundedRectPath(ctx as CanvasRenderingContext2D, rect, clipRadius);
        ctx.closePath();

        // Fill chart area background when in instrument mode
        if (this.instrumentMode) {
          const backgroundColor = getCssVariableValue(
            this,
            CHART_AREA_BACKGROUND_COLOR_VAR
          );
          ctx.fillStyle = backgroundColor;
          ctx.fill();
        }

        // Apply clipping
        ctx.clip();
      },
      afterDraw: (chart: Chart) => {
        const ctx = chart.ctx;
        const chartArea = chart.chartArea;

        if (!chartArea) return;

        const borderWidthPx = 1;
        const strokeInset = borderWidthPx / 2;

        const {top, right, bottom, left} = chartArea;
        const rect = {
          x: left + strokeInset,
          y: top + strokeInset,
          width: right - left - strokeInset * 2,
          height: bottom - top - strokeInset * 2,
        };

        const strokeRadius = Math.max(0, radius - strokeInset);

        // Check which sides have visible scales (edges to skip)
        const skipTop = this.hasVisibleScale('top');
        const skipRight = this.hasVisibleScale('right');
        const skipBottom = this.hasVisibleScale('bottom');
        const skipLeft = this.hasVisibleScale('left');

        // Get border color from CSS variable
        const borderColor = getCssVariableValue(
          this,
          '--instrument-frame-tertiary-color'
        );

        ctx.save();
        ctx.strokeStyle = borderColor;
        ctx.lineWidth = borderWidthPx;

        const {x, y, width, height} = rect;
        const r = Math.max(
          0,
          Math.min(strokeRadius, Math.min(width, height) / 2)
        );

        // Draw border segments, skipping edges that have visible external scales
        if (!skipTop && !skipRight && !skipBottom && !skipLeft) {
          // No scales - draw full border path
          ctx.beginPath();
          buildRoundedRectPath(
            ctx as CanvasRenderingContext2D,
            rect,
            strokeRadius
          );
          ctx.closePath();
          ctx.stroke();
        } else {
          // Draw border in segments, skipping edges with visible scales
          // Each segment is drawn as a continuous path for proper corner rendering

          // Top edge (skip if top scale present)
          if (!skipTop) {
            ctx.beginPath();
            // Start: either from top-left corner end or top-left corner point
            if (!skipLeft && corners.topLeft) {
              ctx.moveTo(x + r, y);
            } else {
              ctx.moveTo(x, y);
            }
            // Draw to: either to top-right corner start or top-right corner point
            if (!skipRight && corners.topRight) {
              ctx.lineTo(x + width - r, y);
            } else {
              ctx.lineTo(x + width, y);
            }
            ctx.stroke();
          }

          // Right edge (skip if right scale present)
          if (!skipRight) {
            ctx.beginPath();
            // Start: either from top-right corner end or top-right point
            if (!skipTop && corners.topRight) {
              ctx.moveTo(x + width, y + r);
            } else {
              ctx.moveTo(x + width, y);
            }
            // Draw to: either to bottom-right corner start or bottom-right point
            if (!skipBottom && corners.bottomRight) {
              ctx.lineTo(x + width, y + height - r);
            } else {
              ctx.lineTo(x + width, y + height);
            }
            ctx.stroke();
          }

          // Bottom edge (skip if bottom scale present)
          if (!skipBottom) {
            ctx.beginPath();
            // Start: either from bottom-right corner end or bottom-right point
            if (!skipRight && corners.bottomRight) {
              ctx.moveTo(x + width - r, y + height);
            } else {
              ctx.moveTo(x + width, y + height);
            }
            // Draw to: either to bottom-left corner start or bottom-left point
            if (!skipLeft && corners.bottomLeft) {
              ctx.lineTo(x + r, y + height);
            } else {
              ctx.lineTo(x, y + height);
            }
            ctx.stroke();
          }

          // Left edge (skip if left scale present)
          if (!skipLeft) {
            ctx.beginPath();
            // Start: either from bottom-left corner end or bottom-left point
            if (!skipBottom && corners.bottomLeft) {
              ctx.moveTo(x, y + height - r);
            } else {
              ctx.moveTo(x, y + height);
            }
            // Draw to: either to top-left corner start or top-left point
            if (!skipTop && corners.topLeft) {
              ctx.lineTo(x, y + r);
            } else {
              ctx.lineTo(x, y);
            }
            ctx.stroke();
          }

          // Draw corners separately (only if adjacent edges are both drawn)
          // Top-left corner
          if (!skipTop && !skipLeft && corners.topLeft) {
            ctx.beginPath();
            ctx.arc(x + r, y + r, r, Math.PI, Math.PI * 1.5);
            ctx.stroke();
          }

          // Top-right corner
          if (!skipTop && !skipRight && corners.topRight) {
            ctx.beginPath();
            ctx.arc(x + width - r, y + r, r, Math.PI * 1.5, Math.PI * 2);
            ctx.stroke();
          }

          // Bottom-right corner
          if (!skipRight && !skipBottom && corners.bottomRight) {
            ctx.beginPath();
            ctx.arc(x + width - r, y + height - r, r, 0, Math.PI * 0.5);
            ctx.stroke();
          }

          // Bottom-left corner
          if (!skipBottom && !skipLeft && corners.bottomLeft) {
            ctx.beginPath();
            ctx.arc(x + r, y + height - r, r, Math.PI * 0.5, Math.PI);
            ctx.stroke();
          }
        }

        ctx.restore();

        // Redraw points above the border so edge points are not clipped.
        // The dataset draw already happened (and may have been clipped), so this pass only
        // matters for points near the chart-area boundary.
        if (this.showPoints) {
          ctx.save();

          chart.data.datasets.forEach((_ds, datasetIndex) => {
            const meta = chart.getDatasetMeta(datasetIndex);
            if (!meta || meta.hidden) return;

            // For line charts, meta.data contains PointElements
            (meta.data ?? []).forEach((el) => {
              const point = el as unknown as {
                draw: (ctx: CanvasRenderingContext2D) => void;
                skip?: boolean;
                options?: {radius?: number};
              };

              if (point.skip) return;
              const r = point.options?.radius;
              if (typeof r === 'number' && r <= 0) return;

              point.draw(ctx as CanvasRenderingContext2D);
            });
          });

          ctx.restore();
        }
      },
      afterDatasetsDraw: (chart: Chart) => {
        // Restore context after datasets are drawn to remove clipping
        if (didApplyClip) {
          chart.ctx.restore();
          didApplyClip = false;
        }
      },
    };
  }

  /**
   * Check if any external scales are slotted
   */
  private hasExternalScales(): boolean {
    const top = this.topScaleSlot?.assignedElements() ?? [];
    const bottom = this.bottomScaleSlot?.assignedElements() ?? [];
    const left = this.leftScaleSlot?.assignedElements() ?? [];
    const right = this.rightScaleSlot?.assignedElements() ?? [];
    return (
      top.length > 0 || bottom.length > 0 || left.length > 0 || right.length > 0
    );
  }

  /**
   * Handle slot change events - when scales are added/removed
   */
  private handleSlotChange = () => {
    // Reset ready state when scales change
    this.externalScaleDimensions.clear();

    // Wait for slotted elements to report their dimensions
    this.waitForScaleDimensions();
  };

  /**
   * Handle scale-dimensions-changed events from slotted scales
   */
  private handleScaleDimensionsChanged = (e: Event) => {
    if (this.isUpdatingScales) return; // Prevent infinite loops

    const event = e as CustomEvent<ExternalScaleDimensions>;
    const {side, thickness} = event.detail;

    // console.debug(`[chart-line-base] Scale dimension changed:`, {
    //   side,
    //   thickness,
    //   previousThickness: this.externalScaleDimensions.get(side),
    //   isUpdatingScales: this.isUpdatingScales,
    // });

    // Update dimension tracking
    const previousThickness = this.externalScaleDimensions.get(side);
    if (previousThickness === thickness) return; // No change

    this.externalScaleDimensions.set(side, thickness);

    // Debounce updates to avoid layout thrashing
    if (this.dimensionUpdateTimer) {
      clearTimeout(this.dimensionUpdateTimer);
    }

    this.dimensionUpdateTimer = setTimeout(() => {
      this.syncScalesAndChart();
    }, 16); // One frame
  };

  /**
   * Wait for all slotted scales to report their dimensions
   */
  private async waitForScaleDimensions() {
    if (!this.hasExternalScales()) {
      this.requestUpdate();
      return;
    }

    // Collect all slotted scale elements
    const scaleElements: ExternalScaleElement[] = [];
    [
      this.topScaleSlot,
      this.bottomScaleSlot,
      this.leftScaleSlot,
      this.rightScaleSlot,
    ].forEach((slot) => {
      if (slot) {
        const assigned = slot.assignedElements() as ExternalScaleElement[];
        scaleElements.push(...assigned);
      }
    });

    // Ensure all scales have fixedAspectRatio matching our fixedAspectRatioScaling setting
    // and use the same scaleReferenceSize for consistent proportional scaling.
    // Each scale handles orientation-specific scaling internally based on its main axis.
    const setScaleProps = (slot: HTMLSlotElement | undefined) => {
      if (!slot) return;
      const scales = slot.assignedElements() as ExternalScaleElement[];
      scales.forEach((scale) => {
        scale.fixedAspectRatio = this.fixedAspectRatioScaling;
        scale.scaleReferenceSize = this.scaleReferenceSize;
      });
    };

    // All scales use the same scaleReferenceSize - this avoids churn from
    // conflicting values between here and updateScaleProperties()
    setScaleProps(this.leftScaleSlot);
    setScaleProps(this.rightScaleSlot);
    setScaleProps(this.topScaleSlot);
    setScaleProps(this.bottomScaleSlot);

    // Wait for all scales to finish rendering
    await Promise.all(
      scaleElements.map((el) =>
        'updateComplete' in el && typeof el.updateComplete === 'object'
          ? (el.updateComplete as Promise<unknown>)
          : Promise.resolve()
      )
    );

    // Scales should have dispatched their dimensions by now
    // If we don't have dimensions yet, wait a bit more
    if (this.externalScaleDimensions.size === 0 && scaleElements.length > 0) {
      await new Promise((resolve) => setTimeout(resolve, 50));
    }

    this.syncScalesAndChart();
  }

  /**
   * Synchronize scale and chart dimensions/data
   * This is the main coordination function
   */
  private syncScalesAndChart() {
    if (this.isUpdatingScales) return;
    this.isUpdatingScales = true;

    // console.debug(`[chart-line-base] Syncing scales and chart`, {
    //   width: this.width,
    //   height: this.height,
    //   scaleDimensions: Array.from(this.externalScaleDimensions.entries()),
    // });

    try {
      // Step 1: Calculate padding from scale dimensions
      const padding = this.calculatePaddingFromScales();

      // console.debug(`[chart-line-base] Calculated padding:`, padding);

      // Step 2: Calculate effective chart area
      const effectiveWidth = this.width - padding.left - padding.right;
      const effectiveHeight = this.height - padding.top - padding.bottom;

      // console.debug(`[chart-line-base] Effective dimensions:`, {
      //   effectiveWidth,
      //   effectiveHeight,
      // });

      // Guard against invalid dimensions
      if (effectiveWidth <= 0 || effectiveHeight <= 0) {
        console.warn('[chart-line-base] Invalid effective dimensions', {
          width: this.width,
          height: this.height,
          padding,
          effectiveWidth,
          effectiveHeight,
        });
        return;
      }

      // Step 3: Update slotted scales with coordinated properties
      // this.updateScaleProperties(padding, effectiveWidth, effectiveHeight);
      this.updateScaleProperties(padding);

      // Step 4: Force recreation of chart with new padding
      if (this.chart) {
        this.chart.destroy();
      }
      this.createChart();
    } finally {
      this.isUpdatingScales = false;
    }
  }

  /**
   * Calculate chart padding from external scale dimensions
   */
  private calculatePaddingFromScales() {
    const defaultPadding = CHART_DIMENSIONS.CANVAS_PADDING;

    const padding = {
      top: this.externalScaleDimensions.get('top') ?? defaultPadding,
      right: this.externalScaleDimensions.get('right') ?? defaultPadding,
      bottom: this.externalScaleDimensions.get('bottom') ?? defaultPadding,
      left: this.externalScaleDimensions.get('left') ?? defaultPadding,
    };

    console.debug(`[chart-line-base] calculatePaddingFromScales:`, {
      fixedAspectRatioScaling: this.fixedAspectRatioScaling,
      scaleReferenceSize: this.scaleReferenceSize,
      externalScaleDimensions: Object.fromEntries(this.externalScaleDimensions),
      defaultPadding,
      calculatedPadding: padding,
    });

    return padding;
  }

  /**
   * Update properties on slotted scale elements
   */
  private updateScaleProperties(
    padding: {top: number; right: number; bottom: number; left: number}
    // effectiveWidth: number,
    // effectiveHeight: number
  ) {
    // Get chart scales for min/max values
    const yMin = this.chart?.scales['y']?.min ?? 0;
    const yMax = this.chart?.scales['y']?.max ?? 100;
    const xMin = this.chart?.scales['x']?.min ?? 0;
    const xMax = this.chart?.scales['x']?.max ?? 100;

    // Use effective dimensions for threshold checks
    const effectiveWidth = this.getEffectiveWidth();
    const effectiveHeight = this.getEffectiveHeight();

    // Determine if we should hide labels (below threshold)
    const hideLabels =
      effectiveWidth < RECTANGULAR_CHART_DIMENSIONS.MIN_HEIGHT_WITH_LABELS ||
      effectiveHeight < RECTANGULAR_CHART_DIMENSIONS.MIN_HEIGHT_WITH_LABELS;

    // Calculate viewBox padding for external scales.
    // When fixedAspectRatioScaling is true, the chart's Canvas padding is scaled by
    // scaleFactor = computedWidth / this.width. For external scales to match, their
    // viewBox padding needs to be: basePadding * scaleReferenceSize / referenceSize
    // This ensures the visual padding matches when the SVG scales to fill the container.
    const verticalViewBoxPadding = this.fixedAspectRatioScaling
      ? {
          top: Math.round(
            (padding.top * this.scaleReferenceSize) / this.height
          ),
          bottom: Math.round(
            (padding.bottom * this.scaleReferenceSize) / this.height
          ),
        }
      : {top: padding.top, bottom: padding.bottom};

    const horizontalViewBoxPadding = this.fixedAspectRatioScaling
      ? {
          left: Math.round(
            (padding.left * this.scaleReferenceSize) / this.width
          ),
          right: Math.round(
            (padding.right * this.scaleReferenceSize) / this.width
          ),
        }
      : {left: padding.left, right: padding.right};

    console.debug(`[chart-line-base] updateScaleProperties:`, {
      fixedAspectRatioScaling: this.fixedAspectRatioScaling,
      referenceWidth: this.width,
      referenceHeight: this.height,
      scaleReferenceSize: this.scaleReferenceSize,
      effectiveWidth,
      effectiveHeight,
      scaleFactor: this.getScaleFactor(),
      basePadding: padding,
      verticalViewBoxPadding,
      horizontalViewBoxPadding,
      hideLabels,
    });

    // Update each slotted scale
    const updates: Array<
      [
        HTMLSlotElement | undefined,
        ExternalScaleElement,
        Partial<ExternalScaleElement>,
      ]
    > = [];

    // Left scale
    if (this.leftScaleSlot) {
      const scales =
        this.leftScaleSlot.assignedElements() as ExternalScaleElement[];
      scales.forEach((scale) => {
        const props: Partial<ExternalScaleElement> = {
          minValue: yMin,
          maxValue: yMax,
          height: effectiveHeight, // Use effective height for proper sizing
          paddingTop: verticalViewBoxPadding.top,
          paddingBottom: verticalViewBoxPadding.bottom,
          paddingStart: verticalViewBoxPadding.top,
          paddingEnd: verticalViewBoxPadding.bottom,
          labels: !hideLabels,
          fixedAspectRatio: this.fixedAspectRatioScaling,
          // Use chart's scaleReferenceSize property for proportional scaling
          scaleReferenceSize: this.scaleReferenceSize,
          state: this.state,
          enhanced: this.enhanced,
          frameStyle: this.frameStyle,
          borderRadiusPosition: this.borderRadiusPositionExternalScales,
        };
        // Only override interval if explicitly set
        if (this.yStepSize !== undefined) {
          props.primaryTickbarsInterval = this.yStepSize;
        }
        updates.push([this.leftScaleSlot, scale, props]);
      });
    }

    // Right scale
    if (this.rightScaleSlot) {
      const scales =
        this.rightScaleSlot.assignedElements() as ExternalScaleElement[];
      scales.forEach((scale) => {
        const props: Partial<ExternalScaleElement> = {
          minValue: yMin,
          maxValue: yMax,
          height: effectiveHeight, // Use effective height for proper sizing
          paddingTop: verticalViewBoxPadding.top,
          paddingBottom: verticalViewBoxPadding.bottom,
          paddingStart: verticalViewBoxPadding.top,
          paddingEnd: verticalViewBoxPadding.bottom,
          labels: !hideLabels,
          fixedAspectRatio: this.fixedAspectRatioScaling,
          // Use chart's scaleReferenceSize property for proportional scaling
          scaleReferenceSize: this.scaleReferenceSize,
          state: this.state,
          enhanced: this.enhanced,
          frameStyle: this.frameStyle,
          borderRadiusPosition: this.borderRadiusPositionExternalScales,
        };
        // Only override interval if explicitly set
        if (this.yStepSize !== undefined) {
          props.primaryTickbarsInterval = this.yStepSize;
        }
        updates.push([this.rightScaleSlot, scale, props]);
      });
    }

    // Top scale
    if (this.topScaleSlot) {
      const scales =
        this.topScaleSlot.assignedElements() as ExternalScaleElement[];
      scales.forEach((scale) => {
        const props: Partial<ExternalScaleElement> = {
          minValue: xMin,
          maxValue: xMax,
          width: effectiveWidth, // Use effective width for proper sizing
          paddingLeft: horizontalViewBoxPadding.left,
          paddingRight: horizontalViewBoxPadding.right,
          paddingStart: horizontalViewBoxPadding.left,
          paddingEnd: horizontalViewBoxPadding.right,
          labels: !hideLabels,
          fixedAspectRatio: this.fixedAspectRatioScaling,
          // Use chart's scaleReferenceSize property for proportional scaling
          scaleReferenceSize: this.scaleReferenceSize,
          state: this.state,
          enhanced: this.enhanced,
          frameStyle: this.frameStyle,
          borderRadiusPosition: this.borderRadiusPositionExternalScales,
        };
        // Only override interval if explicitly set
        if (this.xStepSize !== undefined) {
          props.primaryTickbarsInterval = this.xStepSize;
        }
        updates.push([this.topScaleSlot, scale, props]);
      });
    }

    // Bottom scale
    if (this.bottomScaleSlot) {
      const scales =
        this.bottomScaleSlot.assignedElements() as ExternalScaleElement[];
      scales.forEach((scale) => {
        const props: Partial<ExternalScaleElement> = {
          minValue: xMin,
          maxValue: xMax,
          width: effectiveWidth, // Use effective width for proper sizing
          paddingLeft: horizontalViewBoxPadding.left,
          paddingRight: horizontalViewBoxPadding.right,
          paddingStart: horizontalViewBoxPadding.left,
          paddingEnd: horizontalViewBoxPadding.right,
          labels: !hideLabels,
          fixedAspectRatio: this.fixedAspectRatioScaling,
          // Use chart's scaleReferenceSize property for proportional scaling
          scaleReferenceSize: this.scaleReferenceSize,
          state: this.state,
          enhanced: this.enhanced,
          frameStyle: this.frameStyle,
          borderRadiusPosition: this.borderRadiusPositionExternalScales,
        };
        // Only override interval if explicitly set
        if (this.xStepSize !== undefined) {
          props.primaryTickbarsInterval = this.xStepSize;
        }
        updates.push([this.bottomScaleSlot, scale, props]);
      });
    }

    // Apply all updates
    // console.debug(`[chart-line-base] Applying ${updates.length} scale updates`);
    updates.forEach(([_slot, scale, props]) => {
      // console.debug(`  - Updating scale:`, props);
      Object.assign(scale, props);
    });
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
   *
   * NOTE: For non-threshold modes (solid, semitransparent), backgroundColor is already
   * set correctly in buildDataset(). This method now only handles threshold gradients
   * which require Chart.js scales to be available.
   */
  protected applyFillModes() {
    // Guard: Verify chart and canvas exist and are connected
    if (!this.chart || !this.canvasEl || !this.canvasEl.isConnected) return;

    const chart = this.chart; // Store reference for TypeScript
    const ctx = chart.ctx as CanvasRenderingContext2D;

    // Guard: Verify canvas context is available
    if (!ctx) return;

    const fill = this.shouldApplyFill();
    const fillMode = this.getFillMode();

    // Only process threshold mode - other modes already have correct backgroundColor from buildDataset()
    if (fillMode !== 'threshold' || !fill) {
      return;
    }

    chart.data.datasets.forEach((ds, _idx) => {
      const dataset = ds as ChartDataset<'line'> & {
        fill?:
          | boolean
          | number
          | {target: number; above: string; below: string};
        yAxisID?: string;
      };

      // Skip if not filling
      if (dataset.fill === false || !fill) {
        return;
      }

      // Threshold fill: only applies to single-series, creates gradients for border
      const yScaleId = dataset.yAxisID ?? 'y';
      const yScale = chart.scales[yScaleId];

      if (!yScale) {
        return;
      }

      // Calculate threshold and gradient stop position
      const dataValues = (dataset.data as (number | {x: number; y: number})[])
        .map((d) => (typeof d === 'number' ? d : d.y))
        .filter((v) => Number.isFinite(v));

      // Guard: Need at least some data to calculate threshold
      if (dataValues.length === 0) {
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
        const grad = ctx.createLinearGradient(0, yScale.top, 0, yScale.bottom);
        grad.addColorStop(0, high);
        grad.addColorStop(stop, high);
        grad.addColorStop(stop, low);
        grad.addColorStop(1, low);
        return grad;
      };

      // Create fill gradient (35% alpha) and border gradient (80% alpha)
      const fillGradient = createGradient(0.35, 0.35);
      const borderGradient = createGradient(0.8, 0.8);
      dataset.backgroundColor = fillGradient as unknown as string;
      dataset.borderColor = borderGradient as unknown as string;
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

  override async firstUpdated() {
    // Wait for external scales to report dimensions before creating chart
    await this.waitForScaleDimensions();

    if (!this.hasExternalScales()) {
      // No external scales, create chart normally
      this.createChart();
    }
    // If we have external scales, chart is created in syncScalesAndChart()

    this.themeObserver = observeThemeChanges(() => {
      this.updateChartColors();
      this.updateBorderRadius(); // Border color may change with theme
    });
    this.setupResizeObserver();
    this.setupAspectRatioResizeObserver();

    // Setup border radius observer and apply initial styling
    // In instrument mode, skip observer - we use fixed border radius
    if (this.canvasEl) {
      if (!this.instrumentMode) {
        this.borderRadiusObserver = startExternalScaleBorderRadiusObserver(
          this.canvasEl,
          this.updateBorderRadius
        );
      }
      this.updateBorderRadius();
    }
  }

  override disconnectedCallback() {
    super.disconnectedCallback();
    this.chart?.destroy();
    this.themeObserver?.disconnect();
    this.resizeObserver?.disconnect();
    this.aspectRatioResizeObserver?.disconnect();
    this.borderRadiusObserver?.disconnect();

    if (this.dimensionUpdateTimer) {
      clearTimeout(this.dimensionUpdateTimer);
    }
  }

  /**
   * Setup resize observer to detect height threshold crossings
   * Recreates chart when crossing MIN_HEIGHT_WITH_LABELS (192px) to show/hide labels
   * Detect when height property changes programmatically (e.g., via Storybook controls or user code)
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
   * Setup resize observer for fixed aspect ratio scaling.
   * Observes the wrapper element and recalculates dimensions when parent size changes.
   */
  private setupAspectRatioResizeObserver() {
    const wrapper = this.renderRoot.querySelector('.wrapper');
    if (!wrapper) return;

    // Initialize computed dimensions
    this.updateComputedDimensions();

    this.aspectRatioResizeObserver = new ResizeObserver(() => {
      if (!this.fixedAspectRatioScaling) return;
      this.updateComputedDimensions();
    });

    this.aspectRatioResizeObserver.observe(wrapper);
  }

  /**
   * Calculate actual dimensions based on parent width and aspect ratio.
   * Only used when fixedAspectRatioScaling is true.
   */
  private updateComputedDimensions() {
    if (!this.fixedAspectRatioScaling) {
      // In pixel mode, use width/height directly
      this.computedWidth = this.width;
      this.computedHeight = this.height;
      return;
    }

    // Get the wrapper element
    const wrapper = this.renderRoot.querySelector('.wrapper') as HTMLElement;
    if (!wrapper) return;

    // Get parent's available width
    const parentWidth = wrapper.clientWidth;
    if (parentWidth <= 0) return;

    // Calculate aspect ratio from width/height properties
    const aspectRatio = this.width / this.height;

    // Use parent width as actual width, calculate height from aspect ratio
    const newWidth = parentWidth;
    const newHeight = Math.round(parentWidth / aspectRatio);

    console.debug(`[chart-line-base] updateComputedDimensions:`, {
      fixedAspectRatioScaling: this.fixedAspectRatioScaling,
      referenceWidth: this.width,
      referenceHeight: this.height,
      scaleReferenceSize: this.scaleReferenceSize,
      parentWidth,
      aspectRatio,
      newWidth,
      newHeight,
      scaleFactor: newWidth / this.width,
    });

    // Only update if dimensions changed
    if (this.computedWidth !== newWidth || this.computedHeight !== newHeight) {
      this.computedWidth = newWidth;
      this.computedHeight = newHeight;

      // Update external scales and recreate chart with new dimensions
      // Note: syncScalesAndChart() handles chart destruction and creation internally,
      // so we only call createChart() directly when there are no external scales.
      if (this.hasExternalScales()) {
        this.syncScalesAndChart();
      } else if (this.chart) {
        // No external scales - just recreate chart
        this.chart.destroy();
        this.createChart();
      }
    }
  }

  /**
   * Get the effective width for chart rendering.
   * Returns computed width when fixedAspectRatioScaling is true, otherwise the width property.
   */
  protected getEffectiveWidth(): number {
    return this.fixedAspectRatioScaling ? this.computedWidth : this.width;
  }

  /**
   * Get the effective height for chart rendering.
   * Returns computed height when fixedAspectRatioScaling is true, otherwise the height property.
   */
  protected getEffectiveHeight(): number {
    return this.fixedAspectRatioScaling ? this.computedHeight : this.height;
  }

  /**
   * Get the scale factor for proportional scaling when fixedAspectRatioScaling is true.
   * Returns 1.0 when not in fixed aspect ratio mode.
   * The scale factor is based on computed width vs reference width (the width property).
   */
  protected getScaleFactor(): number {
    if (!this.fixedAspectRatioScaling) {
      return 1.0;
    }
    // Scale factor is based on computed width vs the reference width (width property)
    // The width property defines the "design" or "reference" size
    return this.computedWidth / this.width;
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

    // Calculate backgroundColor immediately instead of deferring to applyFillModes()
    // This prevents flicker when chart is recreated multiple times during resize
    let backgroundColor: string = 'transparent';
    const fillMode = this.getFillMode();

    if (fillFlag && fillMode) {
      const nextColor = chartColors[(index + 1) % chartColors.length];

      if (fillMode === 'solid') {
        backgroundColor = String(borderColor);
      } else if (fillMode === 'semitransparent') {
        backgroundColor = applyAlphaToColor(this, nextColor, 0.5);
      } else if (fillMode === 'threshold') {
        // For threshold, we'll still need gradients from applyFillModes
        // but set a reasonable default to avoid transparent flash
        backgroundColor = applyAlphaToColor(this, nextColor, 0.5);
      }
    }

    const result = {
      ...(existingDataset || {}),
      data: existingDataset?.data ?? values!,
      borderColor,
      backgroundColor,
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
      // Use 'start' to fill from chart bottom, not 'origin' (y=0)
      fill: fillFlag ? 'start' : false,
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
    const defaultPalette = this.enhanced
      ? CHART_SECTOR_ENHANCED_COLORS
      : CHART_SECTOR_DEFAULT_COLORS;
    const chartColors = getChartColorsOrDefault(
      this,
      this.colors,
      defaultPalette
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
    const defaultPalette = this.enhanced
      ? CHART_SECTOR_ENHANCED_COLORS
      : CHART_SECTOR_DEFAULT_COLORS;
    const chartColors = getChartColorsOrDefault(
      this,
      this.colors,
      defaultPalette
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
   * Get Chart.js options with dynamic sizing and padding
   */
  protected getChartOptions(): ChartOptions<'line'> {
    // Use effective dimensions (computed when fixedAspectRatioScaling=true)
    const effectiveWidth = this.getEffectiveWidth();
    const effectiveHeight = this.getEffectiveHeight();

    // Determine if chart is too small for labels
    const isTooSmall =
      effectiveWidth < RECTANGULAR_CHART_DIMENSIONS.MIN_HEIGHT_WITH_LABELS ||
      effectiveHeight < RECTANGULAR_CHART_DIMENSIONS.MIN_HEIGHT_WITH_LABELS;

    // Get scale factor for proportional scaling in fixed aspect ratio mode
    const scaleFactor = this.getScaleFactor();

    // Calculate padding for the chart.
    // External scales report their actual visual (scaled) thickness when in fixedAspectRatio mode,
    // so we use those values directly without additional scaling.
    // For sides without external scales, we apply the chart's scaleFactor to default padding.
    let padding: {top: number; right: number; bottom: number; left: number};

    if (isTooSmall) {
      padding = {top: 0, right: 0, bottom: 0, left: 0};
    } else if (this.hasExternalScales()) {
      // External scales report their visual dimensions (already scaled when fixedAspectRatio=true)
      const scalePadding = this.calculatePaddingFromScales();
      // For sides with external scales, use their reported dimensions directly
      // For sides without external scales, apply chart's scaleFactor to default padding
      const defaultPaddingScaled = this.fixedAspectRatioScaling
        ? Math.round(CHART_DIMENSIONS.CANVAS_PADDING * scaleFactor)
        : CHART_DIMENSIONS.CANVAS_PADDING;
      padding = {
        top: this.externalScaleDimensions.has('top')
          ? scalePadding.top
          : defaultPaddingScaled,
        right: this.externalScaleDimensions.has('right')
          ? scalePadding.right
          : defaultPaddingScaled,
        bottom: this.externalScaleDimensions.has('bottom')
          ? scalePadding.bottom
          : defaultPaddingScaled,
        left: this.externalScaleDimensions.has('left')
          ? scalePadding.left
          : defaultPaddingScaled,
      };
    } else {
      // No external scales - apply scaleFactor to all default padding
      const defaultPaddingScaled = this.fixedAspectRatioScaling
        ? Math.round(CHART_DIMENSIONS.CANVAS_PADDING * scaleFactor)
        : CHART_DIMENSIONS.CANVAS_PADDING;
      padding = {
        top: defaultPaddingScaled,
        right: defaultPaddingScaled,
        bottom: defaultPaddingScaled,
        left: defaultPaddingScaled,
      };
    }

    console.debug(`[chart-line-base] getChartOptions:`, {
      fixedAspectRatioScaling: this.fixedAspectRatioScaling,
      referenceWidth: this.width,
      referenceHeight: this.height,
      effectiveWidth,
      effectiveHeight,
      scaleFactor,
      scaleReferenceSize: this.scaleReferenceSize,
      padding,
      externalScaleDimensions: Object.fromEntries(this.externalScaleDimensions),
      hasExternalScales: this.hasExternalScales(),
    });

    // Set CSS variables for wrapper and canvas sizing
    if (this.fixedAspectRatioScaling) {
      // In responsive mode, use 100% width, computed height
      this.style.setProperty('--chart-width', '100%');
      this.style.setProperty('--chart-height', `${effectiveHeight}px`);
    } else {
      // In pixel mode, use width/height directly
      this.style.setProperty('--chart-width', `${this.width}px`);
      this.style.setProperty('--chart-height', `${this.height}px`);
    }

    // Compute reference timestamp for time-based x-axis
    const refTs = this.computeTimeReference();

    // Force showTickMarks=false when external scales are present
    const effectiveShowTickMarks = this.hasExternalScales()
      ? false
      : this.showTickMarks;

    return {
      responsive: true,
      maintainAspectRatio: false, // Use explicit width/height instead
      layout: {
        padding,
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
          enabled: !isTooSmall,
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
      scales: this.buildScalesConfig(refTs, isTooSmall, effectiveShowTickMarks),
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
   * @param showTickMarks - Whether to show tick marks (overridden to false when external scales present)
   * @returns Configured scales object for Chart.js options
   */
  protected buildScalesConfig(
    minX?: number,
    isTooSmall = false,
    showTickMarks = true
  ) {
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
    const showLabels = showTickMarks && !isTooSmall;
    const showTicks = showTickMarks && !isTooSmall;
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

    // Destroy existing chart instance to prevent canvas reuse errors
    if (this.chart) {
      this.chart.destroy();
      this.chart = undefined;
    }

    const {datasets, labels} = this.prepareChartDataAndLabels();

    this.chart = new Chart(ctx, {
      type: 'line',
      data: {labels, datasets},
      options: this.getChartOptions(),
      plugins: this.borderRadiusPosition ? [this.createBorderPlugin()] : [],
    } as ChartConfiguration<'line'>);

    // Defer legend update to next tick to ensure Chart.js metadata is initialized
    requestAnimationFrame(() => this.updateLegend());
    this.applyFillModes();
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
        <div class="canvas-and-slots-container">
          <slot
            name="top-scale"
            @slotchange=${this.handleSlotChange}
            @scale-dimensions-changed=${this.handleScaleDimensionsChanged}
          ></slot>
          <slot
            name="bottom-scale"
            @slotchange=${this.handleSlotChange}
            @scale-dimensions-changed=${this.handleScaleDimensionsChanged}
          ></slot>
          <slot
            name="left-scale"
            @slotchange=${this.handleSlotChange}
            @scale-dimensions-changed=${this.handleScaleDimensionsChanged}
          ></slot>
          <slot
            name="right-scale"
            @slotchange=${this.handleSlotChange}
            @scale-dimensions-changed=${this.handleScaleDimensionsChanged}
          ></slot>
          <canvas></canvas>
        </div>

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
