import {LitElement, css, html, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import '../watch/watch.js';
import {roundedArch} from '../../svghelpers/roundedArch.js';
import {Tickmark, TickmarkType} from '../watch/tickmark.js';
import {WatchCircleType} from '../watch/watch.js';

@customElement('obc-rudder')
export class ObcRudder extends LitElement {
  @property({type: Number}) angle = 0;
  @property({type: Number}) setpoint: number | undefined;
  @property({type: Boolean}) atSetpoint: boolean = false;
  @property({type: Boolean}) touching: boolean = false;
  @property({type: Boolean}) disableAutoAtSetpoint: boolean = false;
  @property({type: Number}) autoAtSetpointDeadband: number = 2;
  @property({type: Number}) maxAngle = 90;
  @property({type: Boolean}) labels: boolean = false;

  atSetpointCalc(): boolean {
    if (this.setpoint === undefined) {
      return false;
    }

    if (this.touching) {
      return false;
    }

    if (!this.disableAutoAtSetpoint) {
      return Math.abs(this.angle - this.setpoint) < this.autoAtSetpointDeadband;
    }
    return this.atSetpoint;
  }

  override render() {
    const barStartAngle = this.angle > 0 ? 180 - this.angle : 180;
    const barEndAngle = this.angle > 0 ? 180 : 180 - this.angle;
    const bar = svg`
        <mask id="clipBar">
              <path d=${roundedArch({
                r: 160 - 48,
                R: 160,
                startAngle: 180 - this.maxAngle,
                endAngle: 180 + this.maxAngle,
                roundInsideCut: true,
                roundOutsideCut: false,
              })}
              fill="white"
              stroke="white"
              />
            </mask>
      <path d=${roundedArch({
        r: 160 - 48,
        R: 160,
        startAngle: barStartAngle,
        endAngle: barEndAngle,
        roundInsideCut: false,
        roundOutsideCut: false,
      })} 
    fill="var(--instrument-enhanced-secondary-color)"
    stroke="var(--instrument-enhanced-secondary-color)"
    mask="url(#clipBar)"
    />`;
    const setpointAngle =
      this.setpoint !== undefined ? 180 - this.setpoint : undefined;

    const tickmarks: Tickmark[] = [
      {
        angle: 180,
        type: TickmarkType.primary,
        text: this.labels ? '0' : undefined,
      },
      {
        angle: 180 - this.maxAngle,
        type: TickmarkType.secondary,
        text: this.labels ? this.maxAngle.toFixed(0) : undefined,
      },
      {
        angle: 180 + this.maxAngle,
        type: TickmarkType.secondary,
        text: this.labels ? (-this.maxAngle).toFixed(0) : undefined,
      },
    ];

    let helpAngle: null | number = null;
    if (this.maxAngle > 70) {
      helpAngle = 45;
    } else if (this.maxAngle > 50) {
      helpAngle = 30;
    } else if (this.maxAngle > 40) {
      helpAngle = 22.5;
    }

    if (helpAngle !== null) {
      tickmarks.push({angle: 180 - helpAngle, type: TickmarkType.primary});
      tickmarks.push({angle: 180 + helpAngle, type: TickmarkType.primary});
    }

    return html`
      <div class="container">
        <obc-watch
          .areas=${[
            {
              startAngle: 180 - this.maxAngle,
              endAngle: 180 + this.maxAngle,
              roundInsideCut: true,
              roundOutsideCut: true,
            },
          ]}
          .angleSetpoint=${setpointAngle}
          .atAngleSetpoint=${this.atSetpointCalc()}
          .padding=${48}
          .tickmarks=${tickmarks}
          .watchCircleType=${WatchCircleType.double}
        ></obc-watch>
        <svg class="rudder" viewBox="-224 -224 448 448">${bar}</svg>
      </div>
    `;
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
    'obc-rudder': ObcRudder;
  }
}
