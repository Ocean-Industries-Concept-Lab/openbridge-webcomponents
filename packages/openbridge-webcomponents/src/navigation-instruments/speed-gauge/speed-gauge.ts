import {LitElement, css, html, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import {Tickmark, TickmarkType} from '../watch/tickmark.js';
import {WatchCircleType} from '../watch/watch';

export enum ObcSpeedGaugeNeedleType {
  full = 'full',
  bar = 'bar',
}

@customElement('obc-speed-gauge')
export class ObcSpeedGauge extends LitElement {
  @property({type: Number}) speed = 0;
  @property({type: Number}) setpoint: number | undefined;
  @property({type: Boolean}) atSetpoint: boolean = false;
  @property({type: Boolean}) touching: boolean = false;
  @property({type: Boolean}) disableAutoAtSetpoint: boolean = false;
  @property({type: Number}) autoAtSetpointDeadband: number = 2;
  @property({type: Number}) maxSpeed = 100;
  @property({type: Number}) minSpeed = 0;
  @property({type: Boolean}) labels: boolean = false;
  @property({type: Number}) tickmarkInterval = 20;
  @property({type: Boolean}) enhanced: boolean = false;
  @property({type: String}) needleType: ObcSpeedGaugeNeedleType =
    ObcSpeedGaugeNeedleType.full;

  atSetpointCalc(): boolean {
    if (this.setpoint === undefined) {
      return false;
    }

    if (this.touching) {
      return false;
    }

    if (!this.disableAutoAtSetpoint) {
      return Math.abs(this.speed - this.setpoint) < this.autoAtSetpointDeadband;
    }
    return this.atSetpoint;
  }

  getAngle(v: number): number {
    return (v / this.maxSpeed) * (180 + 45) - 90;
  }

  get minAngle(): number {
    return this.getAngle(this.minSpeed) - 360;
  }

  maxAngle = 180 - 45;

  override render() {
    const barColor = this.enhanced
      ? 'var(--instrument-enhanced-tertiary-color)'
      : 'var(--instrument-regular-tertiary-color)';
    const setpointAngle =
      this.setpoint !== undefined ? this.getAngle(this.setpoint) : undefined;

    return html`
      <div class="container">
        <obc-watch
          .angleSetpoint=${setpointAngle}
          .atAngleSetpoint=${this.atSetpointCalc()}
          .padding=${48}
          .tickmarks=${this.tickmarks}
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
      </div>
    `;
  }

  get needle() {
    const needleColor = this.enhanced
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
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-speed-gauge': ObcSpeedGauge;
  }
}
