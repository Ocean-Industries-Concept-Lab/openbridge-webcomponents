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
import type {SetpointColorMode} from '../../svghelpers/setpoint.js';
import '../../building-blocks/bar-vertical/bar-vertical.js';

// Re-export FillMode and ScaleType for user convenience
export {FillMode, ScaleType};

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
 *   .minValue=${3}
 *   .maxValue=${7}
 *   .value=${5}
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
 *   .setpoint=${5.5}
 *   .value=${5.2}
 *   .hasBar=${true}
 *   .hasScale=${true}
 * ></obc-gauge-trend>
 * ```
 *
 * ### With advice overlays
 * ```html
 * <obc-gauge-trend
 *   .hasAdvice=${true}
 *   .advice=${[
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
 * @property {number|undefined} setpoint - Target value shown as a marker on the scale
 * @property {number|undefined} newSetpoint - Pending setpoint shown as a secondary marker during adjustment; when defined, the original marker dims and the new one renders in focus state
 * @property {boolean} touching - Whether the user is actively interacting with the setpoint control; suppresses at-setpoint detection while true (default: false)
 * @property {boolean} atSetpoint - Whether the current value equals the setpoint within the deadband; auto-computed by default, or set manually when `disableAutoAtSetpoint` is true (default: false)
 * @property {boolean} disableAutoAtSetpoint - Disables internal at-setpoint computation so `atSetpoint` must be controlled externally (default: false)
 * @property {number} autoAtSetpointDeadband - Tolerance for auto at-setpoint detection; value is "at setpoint" when |value − setpoint| ≤ deadband (default: 1)
 * @property {number|undefined} setpointAtZeroDeadband - Tolerance for zero-snap visual state; triggers the `equalZero` marker style when setpoint is near zero
 * @property {SetpointColorMode|undefined} setpointColorMode - Explicit color palette for the setpoint marker; when undefined, derived from instrument state
 */
@customElement('obc-gauge-trend')
export class ObcGaugeTrend extends ObcChartLineBase {
  private _barVerticalElement?: HTMLElement;
  private _isFirstUpdate = false;

  constructor() {
    super();

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
    // Note: yAxes will be properly set in willUpdate once properties are initialized
    // Using minValue/maxValue as defaults when chartMinValue/chartMaxValue are undefined
    this.yAxes = [
      {
        id: 'y',
        position: 'left',
        min: this.chartMinValue ?? this.minValue,
        max: this.chartMaxValue ?? this.maxValue,
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
    if (!this.hasBar && !this.hasScale) {
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

    barVertical.minValue = this.minValue;
    barVertical.maxValue = this.maxValue;
    barVertical.height = effectiveHeight;
    barVertical.side = 'right';
    barVertical.hasScale = this.hasScale;
    barVertical.hasBar = this.hasBar;
    // Bar thickness: 48 for scale mode, 24 for bar-only mode (internal, not user-configurable)
    barVertical.barThickness = this.hasScale ? 48 : 24;
    barVertical.scaleType = this.scaleType;
    barVertical.fillMode = this.fillMode;
    barVertical.fillMin = this.fillMin;
    // In 'fill' mode: fillMax always tracks value (bar shows current value)
    // In 'tint' mode: fillMax uses explicit value or defaults to value
    barVertical.fillMax =
      this.fillMode === FillMode.fill
        ? this.value
        : (this.fillMax ?? this.value);
    barVertical.value = this.value;
    barVertical.setpoint = this.setpoint;
    barVertical.newSetpoint = this.newSetpoint;
    barVertical.touching = this.touching;
    barVertical.atSetpoint = this.atSetpoint;
    barVertical.disableAutoAtSetpoint = this.disableAutoAtSetpoint;
    barVertical.autoAtSetpointDeadband = this.autoAtSetpointDeadband;
    barVertical.setpointAtZeroDeadband = this.setpointAtZeroDeadband;
    barVertical.setpointColorMode = this.setpointColorMode;
    // Advice position is always 'inner' for gauge-trend
    barVertical.advicePosition = AdvicePosition.inner;
    // obc-bar-vertical uses 'advices' (plural), not 'advice' or 'hasAdvice'
    barVertical.advices = this.hasAdvice ? this.advice : [];
    barVertical.primaryTickbarsInterval = this.primaryInterval;
    barVertical.secondaryTickbarsInterval = this.secondaryInterval;
    barVertical.tertiaryTickbarsInterval = this.tertiaryInterval;
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
    barVertical.hasPrimaryTickbars = this.primaryInterval !== undefined;
    barVertical.hasTertiaryTickbars = this.tertiaryInterval !== undefined;
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

    // Auto-derive: show dot indicator when no bar is shown
    barVertical.highlightCurrentValue = !this.hasBar;
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
   * Minimum value for the scale range.
   * Also used as chart y-axis minimum when `chartMinValue` is undefined.
   */
  @property({type: Number})
  minValue = 0;

  /**
   * Maximum value for the scale range.
   * Also used as chart y-axis maximum when `chartMaxValue` is undefined.
   */
  @property({type: Number})
  maxValue = 100;

  /**
   * Minimum value for the chart y-axis.
   * When undefined, defaults to `minValue` to keep chart and scale aligned.
   */
  @property({type: Number})
  chartMinValue?: number = undefined;

  /**
   * Maximum value for the chart y-axis.
   * When undefined, defaults to `maxValue` to keep chart and scale aligned.
   */
  @property({type: Number})
  chartMaxValue?: number = undefined;

  /**
   * Current value displayed on the vertical scale.
   *
   * This is the primary value property that drives:
   * - The bar fill level (when `hasBar=true`)
   * - The dot indicator position (when `hasBar=false`)
   * - The `fillMax` value (when `fillMax` is not explicitly set)
   *
   * In typical usage, you only need to set this property to update the gauge.
   */
  @property({type: Number})
  value?: number = undefined;

  /**
   * Setpoint/target value displayed on the vertical scale.
   * Shows as a marker indicator on the scale.
   */
  @property({type: Number})
  setpoint?: number = undefined;

  /**
   * Show bar on the vertical scale.
   *
   * When `true`, displays a filled bar indicating the current value.
   * When `false`, a dot indicator is automatically shown at the value position instead.
   */
  @property({type: Boolean})
  hasBar = false;

  /**
   * Show scale tick marks and labels.
   */
  @property({type: Boolean})
  hasScale = false;

  /**
   * Show advice overlays on the vertical scale.
   */
  @property({type: Boolean})
  hasAdvice = false;

  /**
   * Fill mode for the bar.
   * - `'fill'`: Bar fills from `fillMin` to `value` — the bar visually tracks the current value.
   *   The `fillMax` property is **ignored** in this mode.
   * - `'tint'`: Bar fills from `fillMin` to `fillMax` — an explicit highlighted range.
   *   Use this when you want to show a fixed range independent of the current value.
   *
   * In both modes, `fillMin` is the origin point (e.g., 0 in a -100..100 scale).
   */
  @property({type: String})
  fillMode: FillMode = FillMode.fill;

  /**
   * Fill origin value - the starting point for the bar fill.
   * In both fill modes, the bar fills from this value toward the current value.
   * For scales like -100..100, set this to 0 to have the bar fill up or down from zero.
   */
  @property({type: Number})
  fillMin = 0;

  /**
   * Maximum fill value for the bar (only used in `'tint'` mode).
   *
   * In `'fill'` mode, this property is **ignored** — the bar always fills to `value`.
   *
   * In `'tint'` mode, this defines the upper bound of the highlighted range.
   * When `undefined`, defaults to `value`.
   */
  @property({type: Number})
  fillMax?: number = undefined;

  /**
   * Advice/alert overlays for the vertical scale.
   */
  @property({attribute: false})
  advice: Array<{
    min: number;
    max: number;
    type: AdviceType;
    hinted: boolean;
  }> = [];

  /**
   * Primary tick interval for the vertical scale (longest ticks with labels).
   */
  @property({type: Number})
  primaryInterval?: number = undefined;

  /**
   * A pending/new setpoint value, shown as a secondary marker.
   * Forwarded to the internal bar-vertical scale.
   */
  @property({type: Number}) newSetpoint?: number;

  /**
   * Whether the user is actively interacting (touching/dragging) the setpoint.
   * Forwarded to the internal bar-vertical scale.
   */
  @property({type: Boolean}) touching = false;

  /**
   * Whether the current value is at the setpoint (within deadband).
   * In auto mode (default), this is computed by the bar-vertical internally.
   * Set `disableAutoAtSetpoint=true` to control this manually.
   */
  @property({type: Boolean}) atSetpoint = false;

  /**
   * Disable automatic atSetpoint computation. When true, the `atSetpoint`
   * property must be set externally.
   */
  @property({type: Boolean}) disableAutoAtSetpoint = false;

  /**
   * Deadband for auto atSetpoint computation.
   * The value is considered "at setpoint" when |value - setpoint| <= deadband.
   */
  @property({type: Number}) autoAtSetpointDeadband = 1;

  /**
   * Deadband used when the setpoint is exactly zero.
   */
  @property({type: Number}) setpointAtZeroDeadband?: number;

  /**
   * Color mode for the setpoint marker.
   */
  @property({type: String}) setpointColorMode?: SetpointColorMode;

  /**
   * Secondary tick interval for the vertical scale (medium ticks).
   */
  @property({type: Number})
  secondaryInterval = 0.5;

  /**
   * Tertiary tick interval for the vertical scale (shortest ticks).
   */
  @property({type: Number})
  tertiaryInterval?: number = undefined;

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

    // Update y-axis range when chart or scale min/max changes
    // Note: yAxes is managed internally - users cannot set multiple axes
    // When chartMinValue/chartMaxValue are undefined, fall back to minValue/maxValue
    if (
      changed.has('chartMinValue') ||
      changed.has('chartMaxValue') ||
      changed.has('minValue') ||
      changed.has('maxValue')
    ) {
      const chartMin = this.chartMinValue ?? this.minValue;
      const chartMax = this.chartMaxValue ?? this.maxValue;
      this.yAxes = [
        {
          id: 'y',
          position: 'left',
          min: chartMin,
          max: chartMax,
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
    if (changed.has('hasBar') || changed.has('hasScale')) {
      this._updateBorderRadiusPosition();
    }
    // Keep the internal right-scale in sync with public API changes.
    // (Mirrors the storybook “chart integration” examples, but encapsulated.)
    if (!this._barVerticalElement || this._isFirstUpdate) return;

    const shouldUpdateScale =
      changed.has('minValue') ||
      changed.has('maxValue') ||
      changed.has('value') ||
      changed.has('setpoint') ||
      changed.has('newSetpoint') ||
      changed.has('touching') ||
      changed.has('atSetpoint') ||
      changed.has('disableAutoAtSetpoint') ||
      changed.has('autoAtSetpointDeadband') ||
      changed.has('setpointAtZeroDeadband') ||
      changed.has('setpointColorMode') ||
      changed.has('hasBar') ||
      changed.has('hasScale') ||
      changed.has('hasAdvice') ||
      changed.has('fillMode') ||
      changed.has('fillMin') ||
      changed.has('fillMax') ||
      changed.has('advice') ||
      changed.has('primaryInterval') ||
      changed.has('secondaryInterval') ||
      changed.has('tertiaryInterval') ||
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
