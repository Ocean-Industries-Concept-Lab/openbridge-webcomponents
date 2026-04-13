import {LitElement, html} from 'lit';
import {customElement} from '../../decorator.js';
import {property} from 'lit/decorators.js';
import {AdviceType} from '../watch/advice.js';
import {InstrumentState, Priority} from '../types.js';
import {SetpointMixin} from '../../svghelpers/setpoint-mixin.js';
import '../../building-blocks/instrument-radial/instrument-radial.js';
import {TickmarkStyle} from '../watch/tickmark.js';

export enum ObcGaugeRadialType {
  filled = 'filled',
  bar = 'bar',
  needle = 'needle',
}

export interface GaugeRadialAdvice {
  minValue: number;
  maxValue: number;
  type: AdviceType;
  hinted: boolean;
}

/**
 * `<obc-gauge-radial>` — Configurable radial gauge for generic numeric values.
 *
 * `ObcGaugeRadial` is a thin wrapper around `<obc-instrument-radial>` that adds
 * domain-independent value-to-angle mapping with automatic range handling for
 * both positive-only and bipolar (negative-to-positive) scales. It inherits a
 * full setpoint property bundle from {@link SetpointMixin}, including
 * auto at-setpoint detection, dual-marker adjustment preview, and deadband
 * tuning — no manual wiring required.
 *
 * ## Features
 *
 * - **Three display types**: `filled` (solid arc), `bar` (thinner arc), and
 *   `needle` (pointer indicator) via the `type` property.
 * - **Bipolar range support**: When `minValue < 0` the gauge switches to a
 *   ±135° layout centered at 12 o'clock; otherwise it uses a 270° sweep.
 * - **Setpoint via mixin**: `setpoint`, `newSetpoint`, `touching`,
 *   `autoAtSetpointDeadband`, `setpointOverride`, and all other setpoint
 *   properties are provided by `SetpointMixin` and forwarded to the inner
 *   `<obc-instrument-radial>`.
 * - **Advice zones**: Pass an array of {@link GaugeRadialAdvice} objects to
 *   render caution/alert arcs on the gauge.
 *
 * ## Usage Guidelines
 *
 * - Set `minValue` / `maxValue` to define the scale range.
 * - Use `priority` to switch between regular and enhanced color palettes.
 * - Provide `primaryTickmarkInterval` and `secondaryTickmarkInterval` to
 *   control tickmark density.
 * - Enable `showLabels` to show numeric labels at primary tickmarks.
 *
 * ## Best Practices
 *
 * - Prefer `SetpointMixin` properties (`setpoint`, `touching`, etc.) over
 *   any legacy aliases — the mixin is the single source of truth.
 * - Keep domain-specific logic (units, formatting) in the parent view; this
 *   component is intentionally unit-agnostic.
 *
 * ## Example
 *
 * ```html
 * <obc-gauge-radial
 *   value="42"
 *   minValue="0"
 *   maxValue="100"
 *   type="filled"
 *   enhanced
 *   showLabels
 *   primaryTickmarkInterval="25"
 *   secondaryTickmarkInterval="5"
 *   setpoint="60"
 * ></obc-gauge-radial>
 * ```
 *
 * @element obc-gauge-radial
 * @typedef {import('./gauge-radial.js').GaugeRadialAdvice} GaugeRadialAdvice
 */
@customElement('obc-gauge-radial')
export class ObcGaugeRadial extends SetpointMixin(LitElement) {
  @property({type: Number}) value = 0;
  @property({type: Number}) maxValue = 100;
  @property({type: Number}) minValue = 0;
  @property({type: Boolean}) showLabels: boolean = false;
  @property({type: Number}) primaryTickmarkInterval = 50;
  @property({type: Number}) secondaryTickmarkInterval = 10;
  /**
   * Interval for tertiary tickmarks in value units.
   * When undefined or <= 0, no tertiary tickmarks are shown.
   */
  @property({type: Number}) tertiaryTickmarkInterval: number | undefined =
    undefined;
  @property({type: String}) state: InstrumentState = InstrumentState.active;
  @property({type: String}) priority: Priority = Priority.regular;
  @property({type: String}) type: ObcGaugeRadialType =
    ObcGaugeRadialType.filled;
  @property({type: Boolean}) tickmarksInside: boolean = false;
  @property({type: String}) tickmarkStyle: TickmarkStyle =
    TickmarkStyle.regular;
  @property({type: Array, attribute: false}) advices: GaugeRadialAdvice[] = [];

  getAngle(v: number): number {
    const hasNegative = this.minValue < 0;
    if (hasNegative) {
      return (v / this.maxValue) * 135;
    } else {
      return (v / this.maxValue) * 270 - 135;
    }
  }

  override render() {
    return html`
      <obc-instrument-radial
        .value=${this.value}
        .state=${this.state}
        .priority=${this.priority}
        .setpoint=${this.setpoint}
        .newSetpoint=${this.newSetpoint}
        .setpointAtZeroDeadband=${this.setpointAtZeroDeadband}
        .setpointOverride=${this.setpointOverride}
        .touching=${this.touching}
        .autoAtSetpoint=${this.autoAtSetpoint}
        .autoAtSetpointDeadband=${this.autoAtSetpointDeadband}
        .animateSetpoint=${this.animateSetpoint}
        .maxValue=${this.maxValue}
        .minValue=${this.minValue}
        .getAngle=${this.getAngle}
        .showLabels=${this.showLabels}
        .primaryTickmarkInterval=${this.primaryTickmarkInterval}
        .secondaryTickmarkInterval=${this.secondaryTickmarkInterval}
        .tertiaryTickmarkInterval=${this.tertiaryTickmarkInterval}
        .type=${this.type}
        .needleType=${this.type}
        .tickmarksInside=${this.tickmarksInside}
        .tickmarkStyle=${this.tickmarkStyle}
        .advices=${this.advices}
      >
      </obc-instrument-radial>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-gauge-radial': ObcGaugeRadial;
  }
}
