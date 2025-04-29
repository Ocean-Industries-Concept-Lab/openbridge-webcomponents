import {LitElement, css, html, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import {roundedArch} from '../../svghelpers/roundedArch';
import {Tickmark, TickmarkType} from '../watch/tickmark';
import {WatchCircleType} from '../watch/watch';

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
    const valueAngle = this.getAngle(this.speed);
    const barStartAngle = this.speed < 0 ? valueAngle + 360 : 270;
    const barEndAngle = this.speed < 0 ? 270 : valueAngle + 360;
    const bar = svg`
        <mask id="clipBar">
              <path d=${roundedArch({
                r: 160 - 48,
                R: 160,
                startAngle: this.minAngle,
                endAngle: this.maxAngle,
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
    fill="var(--instrument-enhanced-tertiary-color)"
    stroke="var(--instrument-enhanced-tertiary-color)"
    mask="url(#clipBar)"
    />`;
    const setpointAngle =
      this.setpoint !== undefined ? this.getAngle(this.setpoint) : undefined;

    const tickmarks: Tickmark[] = [];

    return html`
      <div class="container">
        <obc-watch
          .cutAngleStart=${this.minAngle}
          .cutAngleEnd=${this.maxAngle}
          .angleSetpoint=${setpointAngle}
          .atAngleSetpoint=${this.atSetpointCalc()}
          .padding=${48}
          .tickmarks=${tickmarks}
          roundOutsideCut
          roundInsideCut
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
    'obc-speed-gauge': ObcSpeedGauge;
  }
}
