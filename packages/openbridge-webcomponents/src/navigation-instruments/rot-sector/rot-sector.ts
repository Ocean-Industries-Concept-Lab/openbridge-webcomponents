import {LitElement, html} from 'lit';
import {customElement} from '../../decorator.js';
import {property} from 'lit/decorators.js';
import {AdviceType} from '../watch/advice.js';
import {SetpointMixin} from '../../svghelpers/setpoint-mixin.js';
import '../../building-blocks/instrument-radial/instrument-radial.js';

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
 * `<obc-rot-sector>` — Rate-of-turn sector gauge for rotational velocity.
 *
 * `ObcRotSector` is a thin wrapper around `<obc-instrument-radial>` that
 * displays a bipolar ±60° sector gauge showing rate of turn. The bottom
 * 50% of the circle is clipped, producing a compact sector arc. It inherits
 * a full setpoint property bundle from {@link SetpointMixin}, including
 * auto at-setpoint detection, dual-marker adjustment preview, and deadband
 * tuning.
 *
 * ## Features
 *
 * - **Bipolar sector**: Value range is symmetric around zero (−maxValue to
 *   +maxValue), mapped to a ±60° arc.
 * - **Port/starboard coloring**: When `portStarboard` is true, positive
 *   values render in starboard (green) and negative in port (red).
 * - **Bar display**: Always renders as a `bar` type — no needle or filled
 *   variants.
 * - **Setpoint via mixin**: `setpoint`, `newSetpoint`, `touching`,
 *   `autoAtSetpointDeadband`, `setpointColorMode`, and all other setpoint
 *   properties are provided by `SetpointMixin` and forwarded to the inner
 *   `<obc-instrument-radial>`.
 * - **Advice zones**: Pass an array of {@link GaugeRadialAdvice} objects to
 *   render caution/alert arcs on the gauge.
 *
 * ## Usage Guidelines
 *
 * - Set `maxValue` to define the symmetric ± range.
 * - Use `enhanced` to switch between regular and in-command color palettes.
 * - Enable `portStarboard` to show directional coloring.
 * - Provide `primaryTickmarkInterval` and `secondaryTickmarkInterval` to
 *   control tickmark density.
 * - Enable `labels` to show numeric labels at primary tickmarks.
 *
 * ## Best Practices
 *
 * - Prefer `SetpointMixin` properties (`setpoint`, `touching`, etc.) over
 *   any legacy aliases — the mixin is the single source of truth.
 * - The sector is always bottom-clipped at 50%; do not change `clipBottom`
 *   externally.
 *
 * ## Example
 *
 * ```html
 * <obc-rot-sector
 *   value="15"
 *   maxValue="60"
 *   enhanced
 *   portStarboard
 *   labels
 *   primaryTickmarkInterval="20"
 *   secondaryTickmarkInterval="10"
 *   setpoint="30"
 * ></obc-rot-sector>
 * ```
 *
 * @element obc-rot-sector
 * @typedef {import('./rot-sector.js').GaugeRadialAdvice} GaugeRadialAdvice
 */
@customElement('obc-rot-sector')
export class ObcRotSector extends SetpointMixin(LitElement) {
  @property({type: Number}) value = 0;
  @property({type: Number}) maxValue = 100;
  @property({type: Boolean}) labels: boolean = false;
  @property({type: Number}) primaryTickmarkInterval = 50;
  @property({type: Number}) secondaryTickmarkInterval = 10;
  @property({type: Boolean}) enhanced: boolean = false;
  @property({type: Boolean}) portStarboard: boolean = false;
  @property({type: Array, attribute: false}) advices: GaugeRadialAdvice[] = [];

  getAngle(v: number): number {
    return (v / this.maxValue) * 60;
  }

  get _type(): ObcGaugeRadialType {
    return ObcGaugeRadialType.bar;
  }

  private get _barColor(): string {
    if (!this.enhanced) {
      return 'var(--instrument-regular-tertiary-color)';
    }

    if (this.portStarboard) {
      if (this.value > 0) {
        return 'var(--instrument-starboard-secondary-color)';
      }
      return 'var(--instrument-port-secondary-color)';
    }

    return 'var(--instrument-enhanced-tertiary-color)';
  }

  override render() {
    const barColor = this._barColor;

    return html`
      <obc-instrument-radial
        .value=${this.value}
        .setpoint=${this.setpoint}
        .newSetpoint=${this.newSetpoint}
        .setpointAtZeroDeadband=${this.setpointAtZeroDeadband}
        .setpointColorMode=${this.setpointColorMode}
        .touching=${this.touching}
        .disableAutoAtSetpoint=${this.disableAutoAtSetpoint}
        .autoAtSetpointDeadband=${this.autoAtSetpointDeadband}
        .maxValue=${this.maxValue}
        .minValue=${-this.maxValue}
        .getAngle=${this.getAngle}
        .needleColor=${this._needleColor}
        .barColor=${barColor}
        .labels=${this.labels}
        .primaryTickmarkInterval=${this.primaryTickmarkInterval}
        .secondaryTickmarkInterval=${this.secondaryTickmarkInterval}
        .type=${this._type}
        .needleType=${this._type}
        .advices=${this.advices}
        .clipBottom=${50}
      >
      </obc-instrument-radial>
    `;
  }

  private get _needleColor(): string {
    if (!this.enhanced) {
      return 'var(--instrument-regular-secondary-color)';
    }

    if (this.portStarboard) {
      if (this.value > 0) {
        return 'var(--instrument-starboard-primary-color)';
      }
      if (this.value < 0) {
        return 'var(--instrument-port-primary-color)';
      }
      return 'var(--instrument-regular-secondary-color)';
    }

    return 'var(--instrument-enhanced-secondary-color)';
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-rot-sector': ObcRotSector;
  }
}
