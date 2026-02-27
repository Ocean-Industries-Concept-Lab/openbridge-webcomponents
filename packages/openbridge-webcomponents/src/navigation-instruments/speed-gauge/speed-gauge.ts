import {LitElement, css, html, nothing, svg} from 'lit';
import {property} from 'lit/decorators.js';
import {Tickmark, TickmarkType} from '../watch/tickmark.js';
import {WatchCircleType} from '../watch/watch.js';
import {AdviceType, AngleAdviceRaw, AdviceState} from '../watch/advice.js';
import {InstrumentFieldSize} from '../instrument-field/instrument-field.js';
import {SetpointMixin} from '../../svghelpers/setpoint-mixin.js';
import {Priority} from '../types.js';
import {customElement} from '../../decorator.js';

export enum ObcSpeedGaugeNeedleType {
  full = 'full',
  bar = 'bar',
}

export interface SpeedAdvice {
  minSpeed: number;
  maxSpeed: number;
  type: AdviceType;
  hinted: boolean;
}

/**
 * `<obc-speed-gauge>` — Radial speed gauge with needle and optional readout.
 *
 * `ObcSpeedGauge` renders a 225° arc gauge (−90° to +135°) that displays
 * the current speed with a configurable full-length or bar needle. It layers
 * an `<obc-watch>` base with a needle SVG overlay and an optional numeric
 * readout field. It inherits a full setpoint property bundle from
 * {@link SetpointMixin}, including auto at-setpoint detection, dual-marker
 * adjustment preview, and deadband tuning.
 *
 * ## Features
 *
 * - **Two needle types**: `full` (pointer with center dot) and `bar`
 *   (short indicator bar) via `needleType`.
 * - **Bipolar range support**: When `minSpeed < 0`, negative tickmarks are
 *   rendered with `main` tick style.
 * - **Optional readout**: Enable `showReadout` to display an
 *   `<obc-instrument-field>` with the current speed, unit (KN), and tag (STW).
 * - **Setpoint via mixin**: `setpoint`, `newSetpoint`, `touching`,
 *   `autoAtSetpointDeadband`, `setpointOverride`, and all other setpoint
 *   properties are provided by `SetpointMixin`; the setpoint angle and
 *   at-setpoint state are computed and forwarded to `<obc-watch>`.
 * - **Speed advice zones**: Pass an array of {@link SpeedAdvice} objects to
 *   render caution/alert arcs; triggered state is derived from whether the
 *   current speed falls inside the advice range.
 *
 * ## Usage Guidelines
 *
 * - Set `maxSpeed` (and optionally `minSpeed`) to define the gauge range.
 * - Use `priority` to switch between regular and enhanced color palettes
 *   (default: `Priority.regular`).
 * - Provide `tickmarkInterval` to control tickmark spacing.
 * - Enable `labels` to show numeric labels at primary tickmarks.
 * - Enable `showReadout` to display the numeric value below the gauge.
 *
 * ## Best Practices
 *
 * - Prefer `SetpointMixin` properties (`setpoint`, `touching`, etc.) over
 *   any legacy aliases — the mixin is the single source of truth.
 * - The needle overlay SVG uses viewBox `−224 −224 448 448` to align with
 *   the `<obc-watch>` layer.
 *
 * ## Example
 *
 * ```html
 * <obc-speed-gauge
 *   speed="12.5"
 *   maxSpeed="25"
 *   needleType="full"
 *   enhanced
 *   labels
 *   showReadout
 *   tickmarkInterval="5"
 *   setpoint="15"
 * ></obc-speed-gauge>
 * ```
 *
 * @element obc-speed-gauge
 * @typedef {import('./speed-gauge.js').SpeedAdvice} SpeedAdvice
 */
@customElement('obc-speed-gauge')
export class ObcSpeedGauge extends SetpointMixin(LitElement) {
  @property({type: Number}) speed = 0;
  @property({type: Number}) maxSpeed = 100;
  @property({type: Number}) minSpeed = 0;
  @property({type: Boolean}) labels: boolean = false;
  @property({type: Number}) tickmarkInterval = 20;
  @property({type: String}) priority: Priority = Priority.regular;
  @property({type: String}) needleType: ObcSpeedGaugeNeedleType =
    ObcSpeedGaugeNeedleType.full;
  @property({type: Array, attribute: false}) speedAdvices: SpeedAdvice[] = [];
  @property({type: Boolean}) showReadout: boolean = false;

  getAngle(v: number): number {
    return (v / this.maxSpeed) * (180 + 45) - 90;
  }

  get minAngle(): number {
    return this.getAngle(this.minSpeed) - 360;
  }

  maxAngle = 180 - 45;

  override render() {
    const barColor =
      this.priority === Priority.enhanced
        ? 'var(--instrument-enhanced-tertiary-color)'
        : 'var(--instrument-regular-tertiary-color)';
    const setpointAngle =
      this.setpoint !== undefined ? this.getAngle(this.setpoint) : undefined;

    const maxDigits = this.maxSpeed.toFixed(1).length;

    return html`
      <div class="container">
        <obc-watch
          .touching=${this.touching}
          .angleSetpoint=${setpointAngle}
          .newAngleSetpoint=${this.newSetpoint !== undefined
            ? this.getAngle(this.newSetpoint)
            : undefined}
          .atAngleSetpoint=${this.computeAtSetpoint(this.speed)}
          .angleSetpointAtZeroDeadband=${this.setpointAtZeroDeadband}
          .setpointOverride=${this.setpointOverride}
          .animateSetpoint=${this.animateSetpoint}
          .padding=${48}
          .tickmarks=${this.tickmarks}
          .advices=${this._advices}
          .areas=${[
            {
              startAngle: this.minAngle,
              endAngle: this.maxAngle,
              roundInsideCut: true,
              roundOutsideCut: true,
            },
          ]}
          .watchCircleType=${WatchCircleType.double}
          .barAreas=${[
            {
              startAngle: this.getAngle(0),
              endAngle: this.getAngle(this.speed),
              fillColor: barColor,
            },
          ]}
        ></obc-watch>
        <svg class="rudder" viewBox="-224 -224 448 448">${this.needle}</svg>
        ${this.showReadout
          ? html`
              <obc-instrument-field
                class="speed-gauge-value"
                .size=${InstrumentFieldSize.enhanced}
                .neutralColor=${this.priority !== Priority.enhanced}
                .value=${this.speed}
                horizontal
                unit="KN"
                tag="STW"
                .fractionDigits=${1}
                .maxDigits=${maxDigits}
              ></obc-instrument-field>
            `
          : nothing}
      </div>
    `;
  }

  get needle() {
    const needleColor =
      this.priority === Priority.enhanced
        ? 'var(--instrument-enhanced-secondary-color)'
        : 'var(--instrument-regular-secondary-color)';
    if (this.needleType === ObcSpeedGaugeNeedleType.full) {
      return svg`<g transform="rotate(${this.getAngle(this.speed)}) translate(-256, -256)">
      <circle cx="256" cy="256" r="14" fill=${needleColor}/>
      <rect x="250" y="96" width="12" height="192" rx="6" fill=${needleColor}/>
      <rect x="252" y="98" width="8" height="188" rx="4" stroke=${needleColor} fill=${needleColor} stroke-width="4"/>
      </svg> 
`;
    } else {
      return svg`<g transform="rotate(${this.getAngle(this.speed)}) translate(-256, -256)">
<rect x="252" y="96" width="8" height="48" rx="4" fill=${needleColor} stroke="var(--border-silhouette-color)"/>
</svg>
      `;
    }
  }

  get tickmarks(): Tickmark[] {
    const tickmarks: Tickmark[] = [];
    for (
      let i = this.tickmarkInterval;
      i < this.maxSpeed;
      i += this.tickmarkInterval
    ) {
      tickmarks.push({
        angle: this.getAngle(i),
        type: TickmarkType.primary,
        text: this.labels ? i.toString() : undefined,
      });
    }

    if (this.labels && this.maxSpeed % this.tickmarkInterval === 0) {
      tickmarks.push({
        angle: this.getAngle(this.maxSpeed),
        type: TickmarkType.textOnly,
        text: this.labels ? this.maxSpeed.toString() : undefined,
      });
    }

    for (
      let i = -this.tickmarkInterval;
      i > this.minSpeed;
      i -= this.tickmarkInterval
    ) {
      tickmarks.push({
        angle: this.getAngle(i),
        type: TickmarkType.main,
        text: this.labels ? i.toString() : undefined,
      });
    }

    if (this.labels && this.minSpeed % this.tickmarkInterval === 0) {
      tickmarks.push({
        angle: this.getAngle(this.minSpeed),
        type: TickmarkType.textOnly,
        text: this.labels ? this.minSpeed.toString() : undefined,
      });
    }

    tickmarks.push({
      angle: this.getAngle(0),
      type: this.minSpeed < 0 ? TickmarkType.main : TickmarkType.textOnly,
      text: this.labels ? '0' : undefined,
    });

    return tickmarks;
  }

  get _advices(): AngleAdviceRaw[] {
    return this.speedAdvices.map((speedAdvice) => {
      const minAngle = this.getAngle(speedAdvice.minSpeed);
      const maxAngle = this.getAngle(speedAdvice.maxSpeed);
      let state = speedAdvice.hinted ? AdviceState.hinted : AdviceState.regular;
      if (
        this.speed >= speedAdvice.minSpeed &&
        this.speed <= speedAdvice.maxSpeed
      ) {
        state = AdviceState.triggered;
      }

      return {
        minAngle,
        maxAngle,
        type: speedAdvice.type,
        state,
        hideMinTickmark: speedAdvice.minSpeed === this.minSpeed,
        hideMaxTickmark: speedAdvice.maxSpeed === this.maxSpeed,
      };
    });
  }

  static override styles = css`
    * {
      box-sizing: border-box;
    }

    .container {
      position: relative;
      width: 100%;
      height: 100%;
    }

    .container > * {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }

    obc-watch {
      anchor-name: --watch;
    }

    .speed-gauge-value {
      position: absolute;
      top: clamp(
        70%,
        calc(80% - (anchor-size(--watch height) - 200px) * 0.2),
        80%
      );
      left: 50%;
      transform: translateX(-50%);
      width: fit-content;
      height: fit-content;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-speed-gauge': ObcSpeedGauge;
  }
}
