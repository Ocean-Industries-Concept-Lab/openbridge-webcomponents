import {property} from 'lit/decorators.js';
import {customElement} from '../../decorator.js';
import {ObcChartLineBase} from '../../building-blocks/chart-line/chart-line-base.js';
import {BorderRadiusPosition, InstrumentState} from '../types.js';
import {
  FillMode,
  AdvicePosition,
  BarContainerStyle,
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
 * Advice position on the vertical scale.
 */
export enum ScaleAdvicePosition {
  /** Overlays minor ticks */
  inner = 'inner',
  /** Centered in bar */
  center = 'center',
  /** No overlap with scale */
  outer = 'outer',
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
 * Configuration defaults:
 * - Fill mode: 'semitransparent' (can be changed to 'solid', 'threshold', or undefined for line-only)
 * - Grid display: locked to false
 * - Border radius positioning: optimized for the composition
 *
 * All scale-related properties are exposed with the `scale-` prefix for clarity.
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
 *   scaleMinValue="3"
 *   scaleMaxValue="7"
 *   scaleValue="5"
 *   width="480"
 *   height="480"
 * ></obc-gauge-trend>
 * ```
 *
 * ### Line-only (no fill)
 * ```html
 * <obc-gauge-trend
 *   .fillMode=${undefined}
 *   .data=${chartData}
 * ></obc-gauge-trend>
 * ```
 *
 * ### Solid fill area chart
 * ```html
 * <obc-gauge-trend
 *   fillMode="solid"
 *   .data=${chartData}
 * ></obc-gauge-trend>
 * ```
 *
 * ### With enhanced colors and setpoint
 * ```html
 * <obc-gauge-trend
 *   enhanced
 *   scale-setpoint="5.5"
 *   scale-value="5.2"
 *   scale-has-bar
 *   has-scale
 * ></obc-gauge-trend>
 * ```
 *
 * ### With advice overlays
 * ```html
 * <obc-gauge-trend
 *   scale-has-advice
 *   .scaleAdvice=${[
 *     {min: 3, max: 5, type: 'caution', hinted: true},
 *     {min: 6, max: 7, type: 'advice', hinted: false}
 *   ]}
 * ></obc-gauge-trend>
 * ```
 *
 * @property {number} width - Chart width in pixels
 * @property {number} height - Chart height in pixels
 * @property {boolean} enhanced - Use enhanced color palette for chart and scales
 * @property {string} fillMode - Chart fill: 'semitransparent' (default) or undefined for line-only
 */
@customElement('obc-gauge-trend')
export class ObcGaugeTrend extends ObcChartLineBase {
  private _barVerticalElement?: HTMLElement;
  private _isFirstUpdate = false;

  constructor() {
    super();
    // Lock showGrid to false for gauge-trend
    this.showGrid = false;
    // Set optimized border radius positions for the chart + scale composition
    this.borderRadiusPosition = BorderRadiusPosition.innerFirstChild;
    this.borderRadiusPositionExternalScales = BorderRadiusPosition.middleChild;
    // Lock fixed aspect ratio scaling to true for gauge-trend
    // Gauge trend always uses fixed aspect ratio scaling mode
    this.fixedAspectRatioScaling = true;
    // Enable instrument mode: chart border radius won't react to .obc-component-size-* CSS classes
    // Use fixed 8px border radius (same as medium component size) for consistent instrument appearance
    this.instrumentMode = true;
    this.borderRadius = 8;
    // Set y-axis to match scale range (0-100)
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
    if (this._barVerticalElement) {
      this._barVerticalElement.remove();
      this._barVerticalElement = undefined;
    }
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
    const scaleFactor = this.getScaleFactor();

    console.debug(`[gauge-trend] _updateBarVerticalProperties:`, {
      fixedAspectRatioScaling: this.fixedAspectRatioScaling,
      width: this.width,
      height: this.height,
      effectiveHeight,
      scaleFactor,
      scaleReferenceSize: this.scaleReferenceSize,
    });

    barVertical.minValue = this.scaleMinValue;
    barVertical.maxValue = this.scaleMaxValue;
    barVertical.height = effectiveHeight;
    barVertical.side = 'right';
    barVertical.hasScale = this.hasScale;
    barVertical.hasBar = this.scaleHasBar;
    // Use custom thickness if provided, otherwise 48 for scale mode, 24 for bar-only mode
    barVertical.barThickness =
      this.scaleBarThickness ?? (this.hasScale ? 48 : 24);
    barVertical.fillMode =
      this.scaleFillMode === ScaleFillMode.fill ? FillMode.fill : FillMode.tint;
    barVertical.fillMin = this.scaleFillMin;
    barVertical.fillMax = this.scaleFillMax;
    barVertical.value = this.scaleValue;
    barVertical.setpoint = this.scaleSetpoint;
    barVertical.hasAdvice = this.scaleHasAdvice;
    barVertical.advicePosition =
      this.scaleAdvicePosition === ScaleAdvicePosition.inner
        ? AdvicePosition.inner
        : this.scaleAdvicePosition === ScaleAdvicePosition.center
          ? AdvicePosition.center
          : AdvicePosition.outer;
    barVertical.advice = this.scaleAdvice;
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
    barVertical.hasPrimaryTickbars = this.scaleHasPrimaryTickbars;
    barVertical.hasTertiaryTickbars = this.scaleHasTertiaryTickbars;
    barVertical.enhanced = this.enhanced;
    barVertical.state = this.scaleState;

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
  }

  /**
   * Minimum value for the vertical scale.
   */
  @property({type: Number, attribute: 'scale-min-value'})
  scaleMinValue = 0;

  /**
   * Maximum value for the vertical scale.
   */
  @property({type: Number, attribute: 'scale-max-value'})
  scaleMaxValue = 100;

  /**
   * Minimum value for the chart y-axis.
   * Defaults to scaleMinValue to keep chart and scale aligned.
   */
  @property({type: Number, attribute: 'chart-min-value'})
  chartMinValue = 0;

  /**
   * Maximum value for the chart y-axis.
   * Defaults to scaleMaxValue to keep chart and scale aligned.
   */
  @property({type: Number, attribute: 'chart-max-value'})
  chartMaxValue = 100;

  /**
   * Current value displayed on the vertical scale (drives bar fill).
   */
  @property({type: Number, attribute: 'scale-value'})
  scaleValue?: number = undefined;

  /**
   * Setpoint value displayed on the vertical scale.
   */
  @property({type: Number, attribute: 'scale-setpoint'})
  scaleSetpoint?: number = undefined;

  /**
   * Show bar on the vertical scale.
   */
  @property({type: Boolean, attribute: 'scale-has-bar'})
  scaleHasBar = false;

  /**
   * Thickness of the vertical bar in pixels.
   * Default is 48 when hasScale=true, recommended 24 when hasScale=false.
   */
  @property({type: Number, attribute: 'scale-bar-thickness'})
  scaleBarThickness?: number = undefined;

  /**
   * Show scale.
   */
  @property({type: Boolean, attribute: 'has-scale'})
  hasScale = false;

  /**
   * Show advice overlays on the vertical scale.
   */
  @property({type: Boolean, attribute: 'scale-has-advice'})
  scaleHasAdvice = false;

  /**
   * Vertical scale fill mode.
   * - `'fill'`: Fill from zero to value
   * - `'tint'`: Fill between fillMin and fillMax
   */
  @property({type: String, attribute: 'scale-fill-mode'})
  scaleFillMode: ScaleFillMode = ScaleFillMode.fill;

  /**
   * Minimum fill value for tint mode.
   */
  @property({type: Number, attribute: 'scale-fill-min'})
  scaleFillMin = 0;

  /**
   * Maximum fill value for tint mode.
   */
  @property({type: Number, attribute: 'scale-fill-max'})
  scaleFillMax?: number = undefined;

  /**
   * Vertical scale advice position.
   * - `'inner'`: Overlays minor ticks
   * - `'center'`: Centered in bar
   * - `'outer'`: No overlap with scale
   */
  @property({type: String, attribute: 'scale-advice-position'})
  scaleAdvicePosition: ScaleAdvicePosition = ScaleAdvicePosition.inner;

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
  @property({type: Number, attribute: 'scale-primary-interval'})
  scalePrimaryInterval = 1;

  /**
   * Secondary tick interval for the vertical scale.
   */
  @property({type: Number, attribute: 'scale-secondary-interval'})
  scaleSecondaryInterval = 0.5;

  /**
   * Tertiary tick interval for the vertical scale.
   */
  @property({type: Number, attribute: 'scale-tertiary-interval'})
  scaleTertiaryInterval = 0.125;

  /**
   * Show primary tickbars on the vertical scale.
   */
  @property({type: Boolean, attribute: 'scale-has-primary-tickbars'})
  scaleHasPrimaryTickbars = false;

  /**
   * Show tertiary tickbars on the vertical scale.
   */
  @property({type: Boolean, attribute: 'scale-has-tertiary-tickbars'})
  scaleHasTertiaryTickbars = false;

  /**
   * Instrument state for the vertical scale.
   */
  @property({type: String, attribute: 'scale-state'})
  scaleState: InstrumentState = InstrumentState.inCommand;

  /**
   * Chart fill mode for area rendering.
   * - `'semitransparent'`: 50% alpha fill (default)
   * - `undefined`: No fill (line graph only)
   */
  @property({type: String, attribute: 'fill-mode'})
  fillMode?: 'semitransparent' = 'semitransparent' as const;

  /**
   * Apply fill when fillMode is defined.
   */
  protected override shouldApplyFill(): boolean {
    return this.fillMode !== undefined;
  }

  /**
   * Return the fill mode for area rendering.
   */
  protected override getFillMode(): string | undefined {
    return this.fillMode;
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
      changed.has('scaleBarThickness') ||
      changed.has('hasScale') ||
      changed.has('scaleHasAdvice') ||
      changed.has('scaleFillMode') ||
      changed.has('scaleFillMin') ||
      changed.has('scaleFillMax') ||
      changed.has('scaleAdvicePosition') ||
      changed.has('scaleAdvice') ||
      changed.has('scalePrimaryInterval') ||
      changed.has('scaleSecondaryInterval') ||
      changed.has('scaleTertiaryInterval') ||
      changed.has('scaleHasPrimaryTickbars') ||
      changed.has('scaleHasTertiaryTickbars') ||
      changed.has('scaleState') ||
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
