import {LitElement, html} from 'lit';
import {customElement} from '../../decorator.js';
import {property} from 'lit/decorators.js';
import {AdviceType} from '../watch/advice.js';
import {Priority} from '../types.js';
import {SetpointMixin} from '../../svghelpers/setpoint-mixin.js';
import {TickmarkIntervalMixin} from '../../svghelpers/tickmark-interval-mixin.js';
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
 * `<obc-rot-sector>` — Rate-of-turn sector gauge for rotational velocity.
 *
 * `ObcRotSector` is a thin wrapper around `<obc-instrument-radial>` that
 * displays a bipolar sector gauge showing rate of turn. The arc extent is
 * configurable via `rotArcExtent` (default 60°), mapping the value range
 * (−maxValue to +maxValue) to ±rotArcExtent degrees. The bottom 50% of the
 * circle is clipped, producing a compact sector arc. When `zoomToFitArc`
 * is enabled, clipping is bypassed and the arc is enlarged to fill the
 * available space. It inherits
 * a full setpoint property bundle from {@link SetpointMixin}, including
 * auto at-setpoint detection, dual-marker adjustment preview, and deadband
 * tuning.
 *
 * ## Features
 *
 * - **Bipolar sector**: Value range is symmetric around zero (−maxValue to
 *   +maxValue), mapped to a ±`rotArcExtent`° arc (default 60°).
 * - **Port/starboard coloring**: When `portStarboard` is true, positive
 *   values render in starboard (green) and negative in port (red).
 * - **Bar display**: Always renders as a `bar` type — no needle or filled
 *   variants.
 * - **Setpoint via mixin**: `setpoint`, `newSetpoint`, `touching`,
 *   `autoAtSetpointDeadband`, `setpointOverride`, and all other setpoint
 *   properties are provided by `SetpointMixin` and forwarded to the inner
 *   `<obc-instrument-radial>`.
 * - **Advice zones**: Pass an array of {@link GaugeRadialAdvice} objects to
 *   render caution/alert arcs on the gauge.
 *
 * ## Usage Guidelines
 *
 * - Set `maxValue` to define the symmetric ± range.
 * - Use `priority` to switch between regular and enhanced color palettes.
 * - Enable `portStarboard` to show directional coloring.
 * - Provide `primaryTickmarkInterval` and `secondaryTickmarkInterval` to
 *   control tickmark density.
 * - Enable `showLabels` to show numeric labels at primary tickmarks.
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
 *   showLabels
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
export class ObcRotSector extends TickmarkIntervalMixin(
  SetpointMixin(LitElement),
  {defaultPrimary: 50, defaultSecondary: 10}
) {
  @property({type: Number}) value = 0;
  @property({type: Number}) maxValue = 100;
  @property({type: Boolean}) showLabels: boolean = false;
  /** Whether to render tickmarks inside the ring. */
  @property({type: Boolean}) tickmarksInside: boolean = false;
  @property({type: String}) priority: Priority = Priority.regular;
  @property({type: Boolean}) portStarboard: boolean = false;
  @property({type: String}) tickmarkStyle: TickmarkStyle =
    TickmarkStyle.regular;
  @property({type: Array, attribute: false}) advices: GaugeRadialAdvice[] = [];
  @property({type: Boolean}) zoomToFitArc: boolean = false;
  @property({type: Number}) rotArcExtent: number = 60;

  getAngle = (v: number): number => {
    if (!this.maxValue) return 0;
    return (v / this.maxValue) * this.rotArcExtent;
  };

  get _type(): ObcGaugeRadialType {
    return ObcGaugeRadialType.bar;
  }

  private get _barColor(): string {
    if (this.portStarboard) {
      if (this.value > 0) {
        return 'var(--instrument-starboard-secondary-color)';
      }
      if (this.value < 0) {
        return 'var(--instrument-port-secondary-color)';
      }
    }

    if (this.priority !== Priority.enhanced) {
      return 'var(--instrument-regular-tertiary-color)';
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
        .setpointOverride=${this.setpointOverride}
        .touching=${this.touching}
        .autoAtSetpoint=${this.autoAtSetpoint}
        .autoAtSetpointDeadband=${this.autoAtSetpointDeadband}
        .maxValue=${this.maxValue}
        .minValue=${-this.maxValue}
        .getAngle=${this.getAngle}
        .needleColor=${this._needleColor}
        .barColor=${barColor}
        .showLabels=${this.showLabels}
        .tickmarksInside=${this.tickmarksInside}
        .tickmarkStyle=${this.tickmarkStyle}
        .primaryTickmarkInterval=${this.primaryTickmarkInterval}
        .secondaryTickmarkInterval=${this.secondaryTickmarkInterval}
        .tertiaryTickmarkInterval=${this.tertiaryTickmarkInterval}
        .type=${this._type}
        .needleType=${this._type}
        .advices=${this.advices}
        .clipBottom=${50}
        .zoomToFitArc=${this.zoomToFitArc}
      >
      </obc-instrument-radial>
    `;
  }

  private get _needleColor(): string {
    if (this.portStarboard) {
      if (this.value > 0) {
        return 'var(--instrument-starboard-primary-color)';
      }
      if (this.value < 0) {
        return 'var(--instrument-port-primary-color)';
      }
      return 'var(--instrument-regular-secondary-color)';
    }

    if (this.priority !== Priority.enhanced) {
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
