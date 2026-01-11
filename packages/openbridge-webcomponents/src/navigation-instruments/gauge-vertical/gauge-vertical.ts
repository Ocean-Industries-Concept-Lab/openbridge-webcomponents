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
} from '../../building-blocks/external-scale/external-scale.js';

export enum VerticalSide {
  left = 'left',
  right = 'right',
}

// Re-export shared enums for convenience
export {ScaleType, FillMode, AdvicePosition, FrameStyle, BorderRadiusPosition};

/**
 * `<obc-gauge-vertical>` – A vertical gauge component with bar and scale background.
 *
 * Provides a visual representation of a value within a defined range using a vertical bar
 * with an always-visible scale. Thin wrapper around `renderExternalScale()` that sets up
 * a vertical viewBox and exposes a web-component API for Storybook and consumers.
 * Unlike `obc-bar-vertical`, this component always shows the bar and scale background.
 *
 * ---
 *
 * ### Features
 * - **Fixed Layout:** Height (384px), padding (32px), bar/tick/label thicknesses, and border radius are fixed for consistent gauge appearance.
 * - **Scale Configuration:**
 *   - Configurable `minValue` and `maxValue` for the value range.
 *   - Optional main, primary, secondary, and tertiary tickbars at specified intervals.
 *   - Labels shown at primary tickbar intervals (can be hidden via `hideLabels`).
 * - **Side Positioning:** Can be placed on the `left` or `right` side via the `side` property.
 * - **Value Display:**
 *   - `value` property drives the bar fill.
 *   - `fillMode` controls whether fill goes from 0→value (`fill`) or `fillMin`→`fillMax` (`range`).
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
 * ### Usage Guidelines
 * Use `obc-gauge-vertical` when you need a standalone vertical gauge with a visible scale
 * and bar. This is ideal for displaying single values like tank levels, pressure, or
 * temperature where the scale context is always needed.
 *
 * - Set `minValue` and `maxValue` to define the value range.
 * - Configure tickbar intervals (`primaryTickbarsInterval`, etc.) for scale granularity.
 * - Use `setpoint` to show a target value marker.
 * - Use `advices` to highlight warning/caution ranges.
 * - Enable `fixedAspectRatio` when the gauge should scale proportionally within its container.
 *
 * ---
 *
 * ### Fixed Properties (not configurable)
 * - `height`: 384px
 * - `paddingTop`/`paddingBottom`: 32px (CHART_DIMENSIONS.CANVAS_PADDING)
 * - `barThickness`: 48px
 * - `tickThickness`: 28px
 * - `labelThickness`: 60px
 * - `borderRadius`: 8px (matches obc-component-size-medium)
 * - `scaleType`: regular
 * - `frameStyle`: regular
 * - `hasBar`: true
 * - `hasScale`: true
 * - `scaleBackground`: true
 *
 * ---
 *
 * ### Events
 * - `scale-dimensions-changed` – Fired when layout-affecting properties (`side`, `hideLabels`) change, reporting dimensions to parent chart components.
 *
 * ---
 *
 * ### Best Practices
 * - Configure tickbar intervals appropriate for the value range.
 * - Use `enhanced` mode for higher visual prominence.
 * - Pair with advice overlays to indicate operational limits or warnings.
 * - When integrating with charts, listen for `scale-dimensions-changed` to coordinate layouts.
 *
 * ---
 *
 * ### Example
 *
 * ```html
 * <obc-gauge-vertical
 *   min-value="0"
 *   max-value="100"
 *   value="75"
 *   primary-tickbars-interval="20"
 *   secondary-tickbars-interval="10"
 *   setpoint="80"
 *   side="right"
 * ></obc-gauge-vertical>
 * ```
 *
 * @fires scale-dimensions-changed {CustomEvent} Fired when layout-affecting properties change, providing dimension info for parent chart integration.
 */
@customElement('obc-gauge-vertical')
export class ObcGaugeVertical extends LitElement {
  @property({type: Number}) minValue = 0;
  @property({type: Number}) maxValue = 100;

  private readonly height = 384;
  private readonly paddingTop = CHART_DIMENSIONS.CANVAS_PADDING;
  private readonly paddingBottom = CHART_DIMENSIONS.CANVAS_PADDING;

  /** Which side of the chart area this scale lives on */
  @property({type: String}) side: VerticalSide = VerticalSide.right;

  /**
   * When true, freezes all internal calculations and scales the entire component
   * proportionally (like CSS transform:scale), except label font-size remains constant.
   * When false (default), dimensions react to component properties.
   */
  @property({type: Boolean, attribute: 'fixed-aspect-ratio'})
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
        orientation: 'vertical',
        side: this.side,
        hasBar: this.hasBar,
        hasScale: this.hasScale,
        labels: !this.hideLabels,
        barThickness: effectiveBarThickness,
        tickThickness: this.tickThickness,
        labelThickness: this.labelThickness,
        length: this.height,
      });

      const viewBox = computeExternalScaleViewBox(
        {orientation: 'vertical', length: this.height},
        layout
      );

      const scale = computeMeetScale(
        viewBox.width,
        viewBox.height,
        entry.contentRect.width,
        entry.contentRect.height
      );
      // Clamp to minimum of 1 to guard against zero-sized containers
      this._scale = Math.max(1, scale);
    },
  });

  @property({type: Boolean}) hideLabels = false;
  private readonly barThickness = 48;
  private readonly tickThickness = 28;
  private readonly labelThickness = 60;

  @property({attribute: false}) mainTickbars?: number[] = [];
  @property({type: Number}) primaryTickbarsInterval?: number = undefined;
  @property({type: Number}) secondaryTickbarsInterval?: number = undefined;
  @property({type: Number}) tertiaryTickbarsInterval?: number = undefined;
  private readonly scaleType: ScaleType = ScaleType.regular;
  private readonly frameStyle: FrameStyle = FrameStyle.regular;
  @property({type: String, attribute: 'border-radius-position'})
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

  @property({type: Boolean}) enhanced = false;
  @property({type: String}) fillMode: FillMode = FillMode.fill;
  @property({type: Number}) fillMin?: number = undefined;
  @property({type: Number}) fillMax?: number = undefined;
  @property({type: Number}) value?: number = undefined;

  @property({type: Number}) setpoint?: number = undefined;
  @property({type: Boolean}) atSetpoint = false;
  @property({type: Boolean}) disableAutoAtSetpoint = false;
  @property({type: Number}) autoAtSetpointDeadband = 1;
  @property({type: Number}) setpointAtZeroDeadband = 0.5;
  @property({type: String}) state: InstrumentState = InstrumentState.inCommand;

  @property({type: String}) advicePosition: AdvicePosition =
    AdvicePosition.inner;
  @property({attribute: false}) advices?: Array<{
    min: number;
    max: number;
    type: AdviceType;
    hinted: boolean;
  }> = [];

  override render() {
    const config: ExternalScaleConfig = {
      orientation: 'vertical',
      side: this.side,
      length: this.height,
      paddingStart: this.paddingTop,
      paddingEnd: this.paddingBottom,
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
      {orientation: config.orientation, length: this.height},
      layout
    );
    const preserveAspectRatio = this.fixedAspectRatio
      ? 'xMidYMid meet'
      : 'none';

    return html`
      <svg
        width=${this.fixedAspectRatio ? '100%' : `${viewBox.width}px`}
        height=${this.fixedAspectRatio ? '100%' : `${this.height}px`}
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
      orientation: 'vertical',
      side: this.side,
      hasBar: this.hasBar,
      hasScale: this.hasScale,
      labels: !this.hideLabels,
      barThickness: effectiveBarThickness,
      tickThickness: this.tickThickness,
      labelThickness: this.labelThickness,
      length: this.height,
    });

    // console.debug(`[obc-gauge-vertical] Reporting dimensions:`, {
    //   side: this.side,
    //   thickness: dimensions.thickness,
    //   height: this.height,
    //   hasBar: this.hasBar,
    //   hasScale: this.hasScale,
    //   labels: this.labels,
    // });

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
    'obc-gauge-vertical': ObcGaugeVertical;
  }
}
