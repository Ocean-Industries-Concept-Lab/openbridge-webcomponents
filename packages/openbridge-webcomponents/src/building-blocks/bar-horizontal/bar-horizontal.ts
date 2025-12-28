import {LitElement, html} from 'lit';
import {property, state} from 'lit/decorators.js';
import {customElement} from '../../decorator.js';
import {ResizeController} from '@lit-labs/observers/resize-controller.js';
import {CHART_DIMENSIONS} from '../../charthelpers/constants.js';
import {InstrumentState} from '../../navigation-instruments/types.js';
import type {AdviceType} from '../../navigation-instruments/watch/advice.js';
import type {
  ExternalScaleAdvice,
  ExternalScaleConfig,
} from '../external-scale/external-scale.js';
import {
  computeExternalScaleViewBox,
  computeMeetScale,
  computeExternalScaleLayout,
  renderExternalScale,
  toExternalScaleLayoutConfig,
  ScaleType,
  ScaleStyle,
  FillMode,
  AdvicePosition,
} from '../external-scale/external-scale.js';

export enum HorizontalSide {
  top = 'top',
  bottom = 'bottom',
}

// Re-export shared enums from external-scale for convenience
export {ScaleType, ScaleStyle, FillMode, AdvicePosition};

@customElement('obc-bar-horizontal')
/**
 * Horizontal SVG bar + external scale.
 *
 * Thin wrapper around `renderExternalScale()` that sets up a horizontal viewBox
 * and exposes a web-component API for Storybook and consumers.
 */
export class ObcBarHorizontal extends LitElement {
  @property({type: Number}) minValue = 0;
  @property({type: Number}) maxValue = 100;

  /** Total width of the scale (including padding bands) */
  @property({type: Number}) width = 320;

  /** Padding left of the drawing area */
  @property({type: Number}) paddingLeft = CHART_DIMENSIONS.CANVAS_PADDING;

  /** Padding right of the drawing area */
  @property({type: Number}) paddingRight = CHART_DIMENSIONS.CANVAS_PADDING;

  /** Which side of the chart area this scale lives on */
  @property({type: String}) side: HorizontalSide = HorizontalSide.bottom;

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

      // Calculate reference thickness from current configuration
      const layout = computeExternalScaleLayout({
        orientation: 'horizontal',
        side: this.side,
        hasBar: this.hasBar,
        hasScale: this.hasScale,
        hasLabels: this.hasLabels,
        barThickness: this.barThickness,
        tickThickness: this.tickThickness,
        labelThickness: this.labelThickness,
        length: this.width,
      });

      const viewBox = computeExternalScaleViewBox(
        {orientation: 'horizontal', length: this.width},
        layout
      );

      this._scale = computeMeetScale(
        viewBox.width,
        viewBox.height,
        entry.contentRect.width,
        entry.contentRect.height
      );
    },
  });

  // Bands (thickness)
  /** Show scale tickmarks band. */
  @property({type: Boolean}) hasScale = true;
  /** Show labels band. */
  @property({type: Boolean}) hasLabels = true;
  /** Show the bar container band. */
  @property({type: Boolean}) hasBar = false;
  /** Bar container thickness in pixels. */
  @property({type: Number}) barThickness = 24;
  /** Tickmark band thickness in pixels. */
  @property({type: Number}) tickThickness = 28;
  /** Label band thickness in pixels. */
  @property({type: Number}) labelThickness = 60;

  // Tick configuration
  /** Show/hide main tickbars. */
  @property({type: Boolean}) hasMainTickbars = true;
  /** Array of values for main tickbars. Defaults to [minValue, 0, maxValue] if empty. */
  @property({attribute: false}) mainTickbarsArray: number[] = [];
  @property({type: Boolean}) hasPrimaryTickbars = true;
  @property({type: Boolean}) hasSecondaryTickbars = true;
  @property({type: Boolean}) hasTertiaryTickbars = true;
  /** Primary tick interval (and label interval when hasLabels=true). */
  @property({type: Number}) primaryTickbarsInterval?: number = undefined;
  @property({type: Number}) secondaryTickbarsInterval?: number = undefined;
  @property({type: Number}) tertiaryTickbarsInterval?: number = undefined;
  /** Tick density preset. */
  @property({type: String}) scaleType: ScaleType = ScaleType.regular;
  /** Tick style preset. */
  @property({type: String}) scaleStyle: ScaleStyle = ScaleStyle.regular;

  // Values
  /** Use enhanced instrument colors. */
  @property({type: Boolean}) enhanced = false;
  /** Fill visualization mode (0→value or fillMin→fillMax). */
  @property({type: String}) fillMode: FillMode = FillMode.fill;
  @property({type: Number}) fillMin?: number = undefined;
  @property({type: Number}) fillMax?: number = undefined;
  /** Current value (drives bar fill and/or tint marker). */
  @property({type: Number}) value?: number = undefined;

  // Setpoint
  /** Show setpoint indicator when setpoint is provided. */
  @property({type: Boolean}) hasSetpoint = true;
  @property({type: Number}) setpoint?: number = undefined;
  /** Manual at-setpoint override (used when disableAutoAtSetpoint=true). */
  @property({type: Boolean}) atSetpoint = false;
  /** Disable automatic at-setpoint detection. */
  @property({type: Boolean}) disableAutoAtSetpoint = false;
  /** Deadband for automatic at-setpoint detection. */
  @property({type: Number}) autoAtSetpointDeadband = 1;
  /** Deadband around 0 where the setpoint snaps to exactly 0. */
  @property({type: Number}) setpointAtZeroDeadband = 0.5;
  /** Instrument state (affects colors and some marker behavior). */
  @property({type: String}) state: InstrumentState = InstrumentState.inCommand;

  // Advice
  /** Enable advice overlay rendering. */
  @property({type: Boolean}) hasAdvice = true;
  /** Where advice overlays are drawn relative to the bar/tick bands. */
  @property({type: String}) advicePosition: AdvicePosition =
    AdvicePosition.inner;
  @property({attribute: false}) advice: Array<{
    min: number;
    max: number;
    type: AdviceType;
    hinted: boolean;
  }> = [];

  override render() {
    const config: ExternalScaleConfig = {
      orientation: 'horizontal',
      side: this.side,
      length: this.width,
      paddingStart: this.paddingLeft,
      paddingEnd: this.paddingRight,
      minValue: this.minValue,
      maxValue: this.maxValue,
      hasScale: this.hasScale,
      hasLabels: this.hasLabels,
      hasBar: this.hasBar,
      barThickness: this.barThickness,
      tickThickness: this.tickThickness,
      labelThickness: this.labelThickness,
      hasMainTickbars: this.hasMainTickbars,
      mainTickbarsArray: this.mainTickbarsArray,
      hasPrimaryTickbars: this.hasPrimaryTickbars,
      hasSecondaryTickbars: this.hasSecondaryTickbars,
      hasTertiaryTickbars: this.hasTertiaryTickbars,
      primaryTickbarsInterval: this.primaryTickbarsInterval,
      secondaryTickbarsInterval: this.secondaryTickbarsInterval,
      tertiaryTickbarsInterval: this.tertiaryTickbarsInterval,
      scaleType: this.scaleType,
      scaleStyle: this.scaleStyle,
      enhanced: this.enhanced,
      fillMode: this.fillMode,
      fillMin: this.fillMin,
      fillMax: this.fillMax,
      value: this.value,
      hasSetpoint: this.hasSetpoint,
      setpoint: this.setpoint,
      atSetpoint: this.atSetpoint,
      disableAutoAtSetpoint: this.disableAutoAtSetpoint,
      autoAtSetpointDeadband: this.autoAtSetpointDeadband,
      setpointAtZeroDeadband: this.setpointAtZeroDeadband,
      state: this.state,
      hasAdvice: this.hasAdvice,
      advicePosition: this.advicePosition,
      advice: this.advice as ExternalScaleAdvice[],
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
        ${parts.barContainer} ${parts.barFill} ${parts.tickmarks}
        ${parts.labels} ${parts.adviceOverlays} ${parts.setpoint}
      </svg>
    `;
  }

  protected override createRenderRoot() {
    return this;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-bar-horizontal': ObcBarHorizontal;
  }
}
