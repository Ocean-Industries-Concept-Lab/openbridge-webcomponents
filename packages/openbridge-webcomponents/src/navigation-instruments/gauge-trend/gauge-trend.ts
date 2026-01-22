import {property} from 'lit/decorators.js';
import {customElement} from '../../decorator.js';
import {
  ObcChartLineBase,
  XAxisType,
  YAxisPosition,
  LineMode,
  TimeDisplay,
} from '../../building-blocks/chart-line/chart-line-base.js';
import {BorderRadiusPosition} from '../types.js';
import {
  FillMode,
  AdvicePosition,
  BarContainerStyle,
  ScaleType,
} from '../../building-blocks/bar-vertical/bar-vertical.js';
import type {AdviceType} from '../watch/advice.js';
import '../../building-blocks/bar-vertical/bar-vertical.js';

/**
 * Fill mode for the vertical scale bar.
 */
export enum ScaleFillMode {
  /** Fill from zero to value */
  fill = 'fill',
  /** Fill between fillMin and fillMax */
  tint = 'tint',
}

/**
 * Gauge Trend - A navigation instrument combining a line/area chart with an integrated vertical scale.
 *
 * This is a high-level, self-contained component that combines:
 * - A line/area chart (based on `ObcChartLineBase`) with configurable fill mode
 * - An integrated vertical scale (`obc-bar-vertical`) on the right side
 *
 * The component is designed for displaying time-series or categorical trend data alongside a calibrated
 * vertical measurement scale, commonly used in maritime navigation instruments.
 *
 * ## Architecture
 *
 * Internally composed of:
 * - **Base**: `ObcChartLineBase` (line/area graph functionality)
 * - **Right scale**: `obc-bar-vertical` (external scale component)
 *
 * ## Locked Configuration (not user-configurable)
 * - Fixed aspect ratio scaling: always enabled
 * - Instrument mode: always enabled (8px border radius)
 * - X-axis type: always 'category'
 * - Line mode: always 'smooth'
 * - Grid, tick marks, points, legend: always hidden
 * - Scale advice position: always 'inner'
 * - Scale state: automatically inherits from `state` property
 *
 * ## Usage Examples
 *
 * ### Basic gauge trend with default area fill
 * ```html
 * <obc-gauge-trend
 *   .data=${[
 *     {label: 'Jan', value: 3.5},
 *     {label: 'Feb', value: 4.2},
 *     {label: 'Mar', value: 5.0}
 *   ]}
 *   .scaleMinValue=${3}
 *   .scaleMaxValue=${7}
 *   .scaleValue=${5}
 *   .width=${480}
 *   .height=${480}
 * ></obc-gauge-trend>
 * ```
 *
 * ### Line-only (no fill) - default
 * ```html
 * <obc-gauge-trend
 *   .data=${chartData}
 * ></obc-gauge-trend>
 * ```
 *
 * ### With area fill
 * ```html
 * <obc-gauge-trend
 *   .chartFill=${true}
 *   .data=${chartData}
 * ></obc-gauge-trend>
 * ```
 *
 * ### With enhanced colors and setpoint
 * ```html
 * <obc-gauge-trend
 *   .enhanced=${true}
 *   .state=${'in-command'}
 *   .scaleSetpoint=${5.5}
 *   .scaleValue=${5.2}
 *   .scaleHasBar=${true}
 *   .hasScale=${true}
 * ></obc-gauge-trend>
 * ```
 *
 * ### With advice overlays
 * ```html
 * <obc-gauge-trend
 *   .scaleHasAdvice=${true}
 *   .scaleAdvice=${[
 *     {min: 3, max: 5, type: 'caution', hinted: true},
 *     {min: 6, max: 7, type: 'advice', hinted: false}
 *   ]}
 * ></obc-gauge-trend>
 * ```
 *
 * @property {number} width - Chart width in pixels (defines aspect ratio)
 * @property {number} height - Chart height in pixels (defines aspect ratio)
 * @property {boolean} enhanced - Use enhanced color palette for chart and scales
 * @property {InstrumentState} state - Instrument state (automatically applied to scale)
 * @property {boolean} chartFill - Enable chart area fill (default: false for line-only)
 */
@customElement('obc-gauge-trend')
export class ObcGaugeTrend extends ObcChartLineBase {
  private _barVerticalElement?: HTMLElement;
  private _isFirstUpdate = false;

  constructor() {
    super();

    // ═══════════════════════════════════════════════════════════════════════════
    // LOCKED BASE CLASS PROPERTIES
    // These properties are intentionally locked to specific values for gauge-trend.
    // They are set here in the constructor and should not be modified.
    // ═══════════════════════════════════════════════════════════════════════════

    // Chart display options - locked for gauge-trend
    this.legend = false;
    this.showDebugOverlay = false;
    this.showGrid = false;
    this.showTickMarks = false;
    this.showPoints = false;

    // Axis configuration - locked for gauge-trend
    this.xAxisType = XAxisType.category;
    this.yAxisPosition = YAxisPosition.left;

    // Line rendering - locked for gauge-trend
    this.lineMode = LineMode.smooth;

    // Tooltip/unit - locked for gauge-trend (scale shows values)
    this.unit = '';
    this.timeDisplay = TimeDisplay.date;

    // Scaling and sizing - locked for gauge-trend
    this.fixedAspectRatioScaling = true;
    this.instrumentMode = true;
    this.borderRadius = 8;

    // Border radius positions for chart + scale composition
    this.borderRadiusPosition = BorderRadiusPosition.innerFirstChild;
    this.borderRadiusPositionExternalScales = BorderRadiusPosition.middleChild;

    // Y-axis configuration (managed internally, single axis only)
    this.yAxes = [
      {
        id: 'y',
        position: 'left',
        min: this.chartMinValue,
        max: this.chartMaxValue,
      },
    ];
  }

  override async firstUpdated() {
    // IMPORTANT: create the external scale *before* base firstUpdated runs.
    // The base waits for external scale dimensions to integrate chart padding.
    this._createBarVerticalElement();
    this._updateBorderRadiusPosition();

    await super.firstUpdated();

    this._isFirstUpdate = false;
  }

  override disconnectedCallback() {
    super.disconnectedCallback();
    // Note: We intentionally don't remove _barVerticalElement here.
    // It's a light DOM child that naturally travels with the parent when
    // the component is moved in the DOM. Removing it would cause the scale
    // to be lost on reconnect since firstUpdated() only runs once.
  }

  private _createBarVerticalElement() {
    // Create bar-vertical element in light DOM so it can be slotted
    if (!this._barVerticalElement) {
      const barVertical = document.createElement('obc-bar-vertical');
      barVertical.setAttribute('slot', 'right-scale');
      this._barVerticalElement = barVertical;
      this.appendChild(barVertical);
      this._updateBarVerticalProperties();
    }
  }

  private _updateBorderRadiusPosition() {
    // When there's no bar and no scale (labels only), round all corners
    if (!this.scaleHasBar && !this.hasScale) {
      this.borderRadiusPosition = BorderRadiusPosition.middleRoundedChild;
    } else {
      // Otherwise, use innerFirstChild (rounds left side when scale is on right)
      this.borderRadiusPosition = BorderRadiusPosition.innerFirstChild;
    }
  }

  private _updateBarVerticalProperties() {
    if (!this._barVerticalElement) {
      return;
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const barVertical = this._barVerticalElement as any;

    // Use getEffectiveHeight() which returns computed height in fixedAspectRatioScaling mode
    // This ensures the bar-vertical gets the correct height that matches the chart's actual size
    const effectiveHeight = this.getEffectiveHeight();
    // const scaleFactor = this.getScaleFactor();

    // console.debug(`[gauge-trend] _updateBarVerticalProperties:`, {
    //   fixedAspectRatioScaling: this.fixedAspectRatioScaling,
    //   width: this.width,
    //   height: this.height,
    //   effectiveHeight,
    //   scaleFactor,
    //   scaleReferenceSize: this.scaleReferenceSize,
    // });

    barVertical.minValue = this.scaleMinValue;
    barVertical.maxValue = this.scaleMaxValue;
    barVertical.height = effectiveHeight;
    barVertical.side = 'right';
    barVertical.hasScale = this.hasScale;
    barVertical.hasBar = this.scaleHasBar;
    // Bar thickness: 48 for scale mode, 24 for bar-only mode (internal, not user-configurable)
    barVertical.barThickness = this.hasScale ? 48 : 24;
    barVertical.scaleType = this.scaleType;
    barVertical.fillMode =
      this.scaleFillMode === ScaleFillMode.fill ? FillMode.fill : FillMode.tint;
    barVertical.fillMin = this.scaleFillMin;
    barVertical.fillMax = this.scaleFillMax;
    barVertical.value = this.scaleValue;
    barVertical.setpoint = this.scaleSetpoint;
    // Advice position is always 'inner' for gauge-trend
    barVertical.advicePosition = AdvicePosition.inner;
    // obc-bar-vertical uses 'advices' (plural), not 'advice' or 'hasAdvice'
    barVertical.advices = this.scaleHasAdvice ? this.scaleAdvice : [];
    barVertical.primaryTickbarsInterval = this.scalePrimaryInterval;
    barVertical.secondaryTickbarsInterval = this.scaleSecondaryInterval;
    barVertical.tertiaryTickbarsInterval = this.scaleTertiaryInterval;
    barVertical.scaleBackground = this.hasScale;
    // When hasScale=false, use gray (secondary) background for the bar container
    barVertical.barContainerStyle = this.hasScale
      ? undefined
      : BarContainerStyle.secondary;
    // Pass fixedAspectRatio to match parent's fixedAspectRatioScaling
    barVertical.fixedAspectRatio = this.fixedAspectRatioScaling;
    // Pass scaleReferenceSize from parent (inherited from ObcChartLineBase)
    barVertical.scaleReferenceSize = this.scaleReferenceSize;
    // Derive tickbar visibility from whether intervals are defined
    barVertical.hasPrimaryTickbars = this.scalePrimaryInterval !== undefined;
    barVertical.hasTertiaryTickbars = this.scaleTertiaryInterval !== undefined;
    barVertical.enhanced = this.enhanced;
    // Scale state inherits from parent 'state' property automatically
    barVertical.state = this.state;

    // Enable instrument mode: only label font size responds to .obc-component-size-* CSS classes
    // Border radius and bar thickness are controlled by explicit values, not CSS variables
    barVertical.instrumentMode = true;
    // Use fixed border radius of 8px (same as medium component size) for consistent instrument appearance
    // This matches the chart's border radius for visual consistency
    barVertical.borderRadius = 8;

    // Automatically adjust border radius position based on hasScale
    // When hasScale=false, the bar-vertical should have outerLastChild border radius
    // When hasScale=true, it should be middleChild (has scale background as neighbor)
    barVertical.borderRadiusPosition = this.hasScale
      ? BorderRadiusPosition.middleChild
      : BorderRadiusPosition.outerLastChild;

    // Highlight current value with a dot indicator
    barVertical.highlightCurrentValue = this.scaleHighlightCurrentValue;
  }

  /**
   * Scale type for the vertical scale.
   * - `'regular'`: Standard tick lengths (default)
   * - `'condensed'`: Shorter tick lengths for compact display
   *
   * Hidden from Storybook controls via argTypes configuration.
   */
  @property({type: String})
  scaleType: ScaleType = ScaleType.regular;

  /**
   * Minimum value for the vertical scale.
   */
  @property({type: Number})
  scaleMinValue = 0;

  /**
   * Maximum value for the vertical scale.
   */
  @property({type: Number})
  scaleMaxValue = 100;

  /**
   * Minimum value for the chart y-axis.
   * Defaults to scaleMinValue to keep chart and scale aligned.
   */
  @property({type: Number})
  chartMinValue = 0;

  /**
   * Maximum value for the chart y-axis.
   * Defaults to scaleMaxValue to keep chart and scale aligned.
   */
  @property({type: Number})
  chartMaxValue = 100;

  /**
   * Current value displayed on the vertical scale (drives bar fill).
   */
  @property({type: Number})
  scaleValue?: number = undefined;

  /**
   * Setpoint value displayed on the vertical scale.
   */
  @property({type: Number})
  scaleSetpoint?: number = undefined;

  /**
   * Show bar on the vertical scale.
   */
  @property({type: Boolean})
  scaleHasBar = false;

  /**
   * Show scale.
   */
  @property({type: Boolean})
  hasScale = false;

  /**
   * Show advice overlays on the vertical scale.
   */
  @property({type: Boolean})
  scaleHasAdvice = false;

  /**
   * Vertical scale fill mode.
   * - `'fill'`: Fill from zero to value
   * - `'tint'`: Fill between fillMin and fillMax
   */
  @property({type: String})
  scaleFillMode: ScaleFillMode = ScaleFillMode.fill;

  /**
   * Minimum fill value for tint mode.
   */
  @property({type: Number})
  scaleFillMin = 0;

  /**
   * Maximum fill value for tint mode.
   */
  @property({type: Number})
  scaleFillMax?: number = undefined;

  /**
   * Advice/alert overlays for the vertical scale.
   */
  @property({attribute: false})
  scaleAdvice: Array<{
    min: number;
    max: number;
    type: AdviceType;
    hinted: boolean;
  }> = [];

  /**
   * Primary tick interval for the vertical scale.
   */
  @property({type: Number})
  scalePrimaryInterval?: number = undefined;

  /**
   * Secondary tick interval for the vertical scale.
   */
  @property({type: Number})
  scaleSecondaryInterval = 0.5;

  /**
   * Tertiary tick interval for the vertical scale.
   */
  @property({type: Number})
  scaleTertiaryInterval?: number = undefined;

  /**
   * When true, displays a dot indicator at the current value position on the scale.
   * This provides an alternative to bar fill for highlighting the current value.
   * @default false
   */
  @property({type: Boolean})
  scaleHighlightCurrentValue = false;

  /**
   * Enable chart area fill.
   * When true, fills the area under the line with semitransparent color.
   * When false (default), renders as line-only chart.
   */
  @property({type: Boolean})
  chartFill = false;

  /**
   * Apply fill when chartFill is true.
   */
  protected override shouldApplyFill(): boolean {
    return this.chartFill;
  }

  /**
   * Return the fill mode for area rendering.
   * Maps chartFill boolean to base class fillMode.
   */
  protected override getFillMode(): string | undefined {
    return this.chartFill ? 'semitransparent' : undefined;
  }

  /**
   * Stacking is not used in gauge-trend (always false).
   */
  protected override shouldStack(): boolean {
    return false;
  }

  override willUpdate(changed: Map<PropertyKey, unknown>) {
    super.willUpdate(changed);

    // Update y-axis range when chart min/max changes
    // Note: yAxes is managed internally - users cannot set multiple axes
    if (changed.has('chartMinValue') || changed.has('chartMaxValue')) {
      this.yAxes = [
        {
          id: 'y',
          position: 'left',
          min: this.chartMinValue,
          max: this.chartMaxValue,
        },
      ];
    }

    // Adjust chart's border radius position for external scales based on hasScale
    // This needs to be set before render, so we do it in willUpdate
    if (changed.has('hasScale')) {
      this.borderRadiusPositionExternalScales = this.hasScale
        ? BorderRadiusPosition.middleChild
        : BorderRadiusPosition.outerLastChild;
    }
  }

  override updated(changed: Map<PropertyKey, unknown>) {
    // Handle chartFill changes by forcing a data refresh
    // This triggers the base class to update the chart with new fill settings
    if (changed.has('chartFill') && this.data) {
      // Create a shallow copy to trigger the base class's watched property detection
      this.data = [...this.data];
    }

    super.updated(changed);
    // Update border radius position when bar/scale visibility changes
    if (changed.has('scaleHasBar') || changed.has('hasScale')) {
      this._updateBorderRadiusPosition();
    }
    // Keep the internal right-scale in sync with public API changes.
    // (Mirrors the storybook “chart integration” examples, but encapsulated.)
    if (!this._barVerticalElement || this._isFirstUpdate) return;

    const shouldUpdateScale =
      changed.has('scaleMinValue') ||
      changed.has('scaleMaxValue') ||
      changed.has('scaleValue') ||
      changed.has('scaleSetpoint') ||
      changed.has('scaleHasBar') ||
      changed.has('hasScale') ||
      changed.has('scaleHasAdvice') ||
      changed.has('scaleFillMode') ||
      changed.has('scaleFillMin') ||
      changed.has('scaleFillMax') ||
      changed.has('scaleAdvice') ||
      changed.has('scalePrimaryInterval') ||
      changed.has('scaleSecondaryInterval') ||
      changed.has('scaleTertiaryInterval') ||
      changed.has('scaleHighlightCurrentValue') ||
      changed.has('scaleType') ||
      changed.has('state') || // Scale state inherits from parent 'state'
      changed.has('enhanced') ||
      changed.has('height') ||
      changed.has('width') ||
      changed.has('scaleReferenceSize') ||
      changed.has('chartMinValue') ||
      changed.has('chartMaxValue');

    if (shouldUpdateScale) this._updateBarVerticalProperties();
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-gauge-trend': ObcGaugeTrend;
  }
}
