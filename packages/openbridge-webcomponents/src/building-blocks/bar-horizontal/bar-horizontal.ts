import {LitElement, html} from 'lit';
import {property} from 'lit/decorators.js';
import {customElement} from '../../decorator.js';
import {CHART_DIMENSIONS} from '../../charthelpers/constants.js';
import {InstrumentState} from '../../navigation-instruments/types.js';
import type {AdviceType} from '../../navigation-instruments/watch/advice.js';
import type {
  ExternalScaleAdvice,
  ExternalScaleConfig,
} from '../external-scale/external-scale.js';
import {
  computeExternalScaleLayout,
  renderExternalScale,
} from '../external-scale/external-scale.js';

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
  @property({type: String}) side: 'top' | 'bottom' = 'bottom';

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
  @property({type: String}) scaleType: 'regular' | 'condensed' = 'regular';
  /** Tick style preset. */
  @property({type: String}) scaleStyle: 'regular' | 'flat' = 'regular';

  // Values
  /** Use enhanced instrument colors. */
  @property({type: Boolean}) enhanced = false;
  /** Fill visualization mode (0→value or fillMin→fillMax). */
  @property({type: String}) fillMode: 'fill' | 'tint' = 'fill';
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
  @property({type: String}) advicePosition: 'center' | 'inner' | 'outer' =
    'inner';
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
    };

    const layout = computeExternalScaleLayout({
      orientation: config.orientation,
      side: config.side,
      hasBar: config.hasBar,
      hasScale: config.hasScale,
      hasLabels: config.hasLabels,
      barThickness: config.barThickness,
      tickThickness: config.tickThickness,
      labelThickness: config.labelThickness,
      length: config.length,
    });

    const parts = renderExternalScale(config);

    const viewBoxX = 0;
    const viewBoxY = layout.viewBoxPerpStart;
    const viewBoxWidth = this.width;
    const viewBoxHeight = layout.viewBoxThickness;

    return html`
      <svg
        width="${this.width}px"
        height="${viewBoxHeight}px"
        viewBox="${viewBoxX} ${viewBoxY} ${viewBoxWidth} ${viewBoxHeight}"
        preserveAspectRatio="none"
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
