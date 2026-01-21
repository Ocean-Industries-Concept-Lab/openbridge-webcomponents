import {LitElement, html} from 'lit';
import {property, state} from 'lit/decorators.js';
import type {PropertyValues} from 'lit';
import {customElement} from '../../decorator.js';
import {ResizeController} from '@lit-labs/observers/resize-controller.js';
import {CHART_DIMENSIONS} from '../../charthelpers/constants.js';
import {InstrumentState, FrameStyle, BorderRadiusPosition} from '../types.js';
import type {AdviceType} from '../watch/advice.js';
import type {
  ExternalScaleAdvice,
  ExternalScaleConfig,
} from '../../building-blocks/external-scale/external-scale.js';
import {
  computeExternalScaleViewBox,
  computeMeetScale,
  computeExternalScaleLayout,
  renderExternalScale,
  toExternalScaleLayoutConfig,
  computeScaleDimensionsForReport,
  computeExternalScaleEffectiveBarThickness,
  ScaleType,
  FillMode,
  AdvicePosition,
  ExternalScaleOrientation,
  ExternalScaleSide,
} from '../../building-blocks/external-scale/external-scale.js';

// Re-export shared enums for convenience
export {
  ScaleType,
  FillMode,
  AdvicePosition,
  FrameStyle,
  BorderRadiusPosition,
  InstrumentState,
  ExternalScaleSide,
};

/**
 * `<obc-gauge-horizontal>` – A horizontal gauge component with bar and scale background.
 *
 * Use `obc-gauge-horizontal` when you need a standalone horizontal gauge with a visible scale
 * and bar. This is ideal for displaying single values like speed, power, or progress where
 * the scale context is always needed.
 *
 * This is the same as `obc-bar-horizontal` (both use `external-scale.ts`)
 * but with several properties fixed for consistent gauge appearance.
 * Unlike `obc-bar-horizontal`, this component always shows the bar and scale background.
 *
 * ---
 *
 * ### Features
 * - **Fixed Layout:** Width (384px), padding (32px), bar/tick/label thicknesses, and border radius are fixed for consistent gauge appearance.
 * - **Scale Configuration:**
 *   - Configurable `minValue` and `maxValue` for the value range.
 *   - Optional main, primary, secondary, and tertiary tickbars at specified intervals.
 *   - Labels shown at primary tickbar intervals (can be hidden via `hideLabels`).
 * - **Side Positioning:** Can be placed on the `top` or `bottom` side via the `side` property.
 * - **Value Display:**
 *   - `value` property drives the bar fill.
 *   - `fillMode` controls visualization: `fill` shows bar from `fillMin` to `fillMax`; `tint` adds a marker at the `value` position.
 *   - `enhanced` mode uses enhanced instrument colors.
 * - **Setpoint Marker:**
 *   - Optional `setpoint` value displays a marker.
 *   - Automatic at-setpoint detection with configurable deadband.
 * - **Advice Overlays:** Render advice ranges with different types and hinted states.
 * - **Fixed Aspect Ratio:** When enabled, scales the component proportionally while keeping label font-size constant.
 * - **Dimension Reporting:** Dispatches `scale-dimensions-changed` events for parent chart integration.
 *
 * ---
 *
 * ### Fixed Properties (not configurable)
 * - `width`: 384px
 * - `paddingLeft`/`paddingRight`: 32px (`CHART_DIMENSIONS.CANVAS_PADDING`)
 * - `barThickness`: 48px
 * - `tickThickness`: 28px
 * - `labelThickness`: 60px
 * - `borderRadius`: 8px (matches obc-component-size-medium)
 * - `scaleType`: regular
 * - `frameStyle`: regular
 * - `hasBar`: true
 * - `hasScale`: true
 * - `scaleBackground`: true
 * - `fixedAspectRatio`: true (always scales proportionally)
 *
 * ---
 *
 * ### Implementation
 * This is a higher fidelity implementation of the concept shown in `instrument-linear.ts`,
 * providing a complete gauge with container, scale background, tickmarks, labels, advice overlays, and setpoint marker.
 *
 * This is a thin web-component wrapper around the pure SVG building-block renderer in `external-scale.ts`.
 * It sets up the outer `<svg>`/`viewBox` for a horizontal scale and delegates rendering/layout to:
 * - `computeExternalScaleLayout(...)`
 * - `renderExternalScale(config)`
 *
 * For renderer documentation see: **Building Blocks/External Scale**.
 *
 * For a version where these properties are user-configurable, see **Building Blocks/Bar Horizontal**.
 *
 * ---
 *
 * ### Events
 * - `scale-dimensions-changed` – Fired when layout-affecting properties (`side`, `hideLabels`) change, reporting dimensions to parent chart components.
 *
 * ---
 *
 * ### Example
 *
 * ```html
 * <obc-gauge-horizontal
 *   min-value="0"
 *   max-value="100"
 *   value="75"
 *   primary-tickbars-interval="20"
 *   secondary-tickbars-interval="10"
 *   setpoint="80"
 *   side="bottom"
 * ></obc-gauge-horizontal>
 * ```
 *
 * @fires scale-dimensions-changed {CustomEvent} Fired when layout-affecting properties change, providing dimension info for parent chart integration.
 */
@customElement('obc-gauge-horizontal')
export class ObcGaugeHorizontal extends LitElement {
  /** Minimum scale value */
  @property({type: Number}) minValue = 0;
  /** Maximum scale value */
  @property({type: Number}) maxValue = 100;

  private readonly width = 384;
  private readonly paddingLeft = CHART_DIMENSIONS.CANVAS_PADDING;
  private readonly paddingRight = CHART_DIMENSIONS.CANVAS_PADDING;

  /** Which side of the chart area this scale lives on (top or bottom) */
  @property({type: String}) side: ExternalScaleSide = ExternalScaleSide.bottom;

  /**
   * When true, freezes all internal calculations and scales the entire component
   * proportionally (like CSS transform:scale), except label font-size remains constant.
   * When false (default), dimensions react to component properties.
   *
   * This property is intentionally not exposed as a public API or Storybook control.
   * It can be set programmatically by parent components (e.g., GaugeTrend).
   */
  fixedAspectRatio = false;

  @state()
  private _scale = 1;

  // ResizeController automatically subscribes/unsubscribes based on component lifecycle
  // @ts-expect-error - Controller is used for side effects, not accessed directly
  private _resizeController = new ResizeController(this, {
    callback: (entries) => {
      if (!this.fixedAspectRatio) return;

      const entry = entries[0];
      if (!entry) return;

      const effectiveBarThickness = computeExternalScaleEffectiveBarThickness({
        hasBar: this.hasBar,
        barThickness: this.barThickness,
        borderRadius: this.borderRadius,
        scaleType: this.scaleType,
      });

      // Calculate reference thickness from current configuration
      const layout = computeExternalScaleLayout({
        orientation: ExternalScaleOrientation.horizontal,
        side: this.side,
        hasBar: this.hasBar,
        hasScale: this.hasScale,
        labels: !this.hideLabels,
        barThickness: effectiveBarThickness,
        tickThickness: this.tickThickness,
        labelThickness: this.labelThickness,
        length: this.width,
      });

      const viewBox = computeExternalScaleViewBox(
        {orientation: ExternalScaleOrientation.horizontal, length: this.width},
        layout
      );

      const scale = computeMeetScale(
        viewBox.width,
        viewBox.height,
        entry.contentRect.width,
        entry.contentRect.height
      );
      // Guard against zero-sized containers, but allow fractional scales < 1
      this._scale = scale > 0 ? scale : 1;
    },
  });

  /** Hide numerical value labels at primary tickmarks */
  @property({type: Boolean}) hideLabels = false;
  private readonly barThickness = 48;
  private readonly tickThickness = 28;
  private readonly labelThickness = 60;

  /** Array of values for main tickbars. When undefined, no main tickbars shown. When empty array [], defaults to [minValue, 0, maxValue]. */
  @property({attribute: false}) mainTickbars?: number[] = [];
  /** Interval for primary (longest) tickmarks with labels */
  @property({type: Number}) primaryTickbarsInterval?: number = undefined;
  /** Interval for secondary (medium) tickmarks */
  @property({type: Number}) secondaryTickbarsInterval?: number = undefined;
  /** Interval for tertiary (shortest) tickmarks */
  @property({type: Number}) tertiaryTickbarsInterval?: number = undefined;
  private readonly scaleType: ScaleType = ScaleType.regular;
  private readonly frameStyle: FrameStyle = FrameStyle.regular;
  /** Border radius position based on component layout */
  @property({type: String, attribute: false})
  borderRadiusPosition?: BorderRadiusPosition =
    BorderRadiusPosition.innerFirstChild;

  private readonly borderRadius = 8;

  private get hasBar(): boolean {
    return true;
  }

  private get scaleBackground(): boolean {
    return true;
  }

  private get hasScale(): boolean {
    return true;
  }

  /** Enhanced visual mode: when true, uses enhanced instrument colors for bar fill and setpoint */
  @property({type: Boolean}) enhanced = false;
  /** Fill visualization mode: 'fill' shows bar from fillMin to fillMax; 'tint' adds a marker at the value position */
  @property({type: String}) fillMode: FillMode = FillMode.fill;
  /** Minimum fill value (defaults to 0) */
  @property({type: Number}) fillMin?: number = undefined;
  /** Maximum fill value (defaults to value) */
  @property({type: Number}) fillMax?: number = undefined;
  /** Current value (bar fill level) */
  @property({type: Number}) value?: number = undefined;

  /** Setpoint/target value to display as indicator. When undefined, setpoint is off. */
  @property({type: Number}) setpoint?: number = undefined;
  /** Whether value is at setpoint (manual override when disableAutoAtSetpoint=true) */
  @property({type: Boolean}) atSetpoint = false;
  /** Disable automatic atSetpoint calculation based on value and deadband */
  @property({type: Boolean}) disableAutoAtSetpoint = false;
  /** Deadband for automatic atSetpoint detection (when disableAutoAtSetpoint=false) */
  @property({type: Number}) autoAtSetpointDeadband = 1;
  /** Deadband around zero for setpoint positioning */
  @property({type: Number}) setpointAtZeroDeadband = 0.5;
  /** Instrument state: inCommand, active, loading, or off */
  @property({type: String}) state: InstrumentState = InstrumentState.inCommand;

  private readonly advicePosition: AdvicePosition = AdvicePosition.inner;
  /** Advice/alert overlays with min, max, type, and hinted state. When undefined or empty, no advice shown. */
  @property({attribute: false}) advices?: Array<{
    min: number;
    max: number;
    type: AdviceType;
    hinted: boolean;
  }> = [];

  override render() {
    const config: ExternalScaleConfig = {
      orientation: ExternalScaleOrientation.horizontal,
      side: this.side,
      length: this.width,
      paddingStart: this.paddingLeft,
      paddingEnd: this.paddingRight,
      minValue: this.minValue,
      maxValue: this.maxValue,
      hasScale: this.hasScale,
      labels: !this.hideLabels,
      hasBar: this.hasBar,
      scaleBackground: this.scaleBackground,
      barThickness: this.barThickness,
      tickThickness: this.tickThickness,
      labelThickness: this.labelThickness,
      mainTickbars: this.mainTickbars,
      primaryTickbarsInterval: this.primaryTickbarsInterval,
      secondaryTickbarsInterval: this.secondaryTickbarsInterval,
      tertiaryTickbarsInterval: this.tertiaryTickbarsInterval,
      scaleType: this.scaleType,
      frameStyle: this.frameStyle,
      borderRadiusPosition: this.borderRadiusPosition,
      borderRadius: this.borderRadius,
      enhanced: this.enhanced,
      fillMode: this.fillMode,
      fillMin: this.fillMin,
      fillMax: this.fillMax,
      value: this.value,
      setpoint: this.setpoint,
      atSetpoint: this.atSetpoint,
      disableAutoAtSetpoint: this.disableAutoAtSetpoint,
      autoAtSetpointDeadband: this.autoAtSetpointDeadband,
      setpointAtZeroDeadband: this.setpointAtZeroDeadband,
      state: this.state,
      advicePosition: this.advicePosition,
      advices: this.advices as ExternalScaleAdvice[],
      fixedAspectRatio: this.fixedAspectRatio,
    };

    const layout = computeExternalScaleLayout(
      toExternalScaleLayoutConfig(config)
    );

    const parts = renderExternalScale(config);

    const viewBox = computeExternalScaleViewBox(
      {orientation: config.orientation, length: this.width},
      layout
    );
    const preserveAspectRatio = this.fixedAspectRatio
      ? 'xMidYMid meet'
      : 'none';

    return html`
      <svg
        width=${this.fixedAspectRatio ? '100%' : `${this.width}px`}
        height=${this.fixedAspectRatio ? '100%' : `${viewBox.height}px`}
        viewBox="${viewBox.x} ${viewBox.y} ${viewBox.width} ${viewBox.height}"
        preserveAspectRatio="${preserveAspectRatio}"
        style="--scale: ${this.fixedAspectRatio ? this._scale : 1};"
        part="svg"
      >
        ${parts.barContainer} ${parts.barFill} ${parts.scaleBackground}
        ${parts.tickmarks} ${parts.labels} ${parts.adviceOverlays}
        ${parts.setpoint}
      </svg>
    `;
  }

  override updated(changed: PropertyValues) {
    super.updated(changed);

    // Report dimensions to parent chart (if in integration mode)
    // Only emit when layout-affecting properties change to avoid spamming events
    if (
      !this.fixedAspectRatio &&
      (changed.has('side') || changed.has('hideLabels'))
    ) {
      this.reportDimensions();
    }
  }

  /**
   * Report scale dimensions to parent chart component.
   */
  private reportDimensions() {
    const effectiveBarThickness = computeExternalScaleEffectiveBarThickness({
      hasBar: this.hasBar,
      barThickness: this.barThickness,
      borderRadius: this.borderRadius,
      scaleType: this.scaleType,
    });

    const dimensions = computeScaleDimensionsForReport({
      orientation: ExternalScaleOrientation.horizontal,
      side: this.side,
      hasBar: this.hasBar,
      hasScale: this.hasScale,
      labels: !this.hideLabels,
      barThickness: effectiveBarThickness,
      tickThickness: this.tickThickness,
      labelThickness: this.labelThickness,
      length: this.width,
    });

    this.dispatchEvent(
      new CustomEvent('scale-dimensions-changed', {
        detail: dimensions,
        bubbles: true,
        composed: true,
      })
    );
  }

  protected override createRenderRoot() {
    return this;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-gauge-horizontal': ObcGaugeHorizontal;
  }
}
