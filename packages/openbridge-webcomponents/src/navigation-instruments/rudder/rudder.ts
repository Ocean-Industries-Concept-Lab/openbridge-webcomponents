import { LitElement, css, html, svg } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import "../watch/watch"
import { roundedArch } from '../../svghelpers/roundedArch';


@customElement('obc-rudder')
export class ObcRudder extends LitElement {
  @property({ type: Number }) angle = 0;
  @property({ type: Number }) setpoint: number | undefined;
  @property({ type: Boolean }) atSetpoint: boolean = false;
  @property({ type: Boolean }) touching: boolean = false;
  @property({ type: Boolean }) disableAutoAtSetpoint: boolean = false;
  @property({ type: Number }) autoAtSetpointDeadband: number = 2;
  @property({ type: Number }) minAngle = -90;
  @property({ type: Number }) maxAngle = 90;

  atSetpointCalc(): boolean {
    if (this.setpoint === undefined) {
      return false;
    }

    if (this.touching) {
      return false;
    }

    if (!this.disableAutoAtSetpoint) {
      return (
        Math.abs(this.angle - this.setpoint) <
        this.autoAtSetpointDeadband
      );
    }
    return this.atSetpoint;
  }

  override render() {
    const barStartAngle = this.angle > 0 ? 180 - this.angle : 180;
    const barEndAngle = this.angle > 0 ? 180 : 180 - this.angle;
    const bar = svg`
        <mask id="clipBar">
              <path d=${roundedArch({
      r: 160 - 48, R: 160, startAngle: 180 - this.maxAngle, endAngle: 180 - this.minAngle, roundInsideCut: true, roundOutsideCut: false
    })}
              fill="white"
              stroke="white"
              />
            </mask>
      <path d=${roundedArch({
      r: 160 - 48, R: 160, startAngle: barStartAngle, endAngle: barEndAngle, roundInsideCut: false, roundOutsideCut: false
    })} 
    fill="var(--instrument-enhanced-secondary-color)"
    stroke="var(--instrument-enhanced-secondary-color)"
    mask="url(#clipBar)"
    />`
    const setpointAngle = this.setpoint !== undefined ? 180 - this.setpoint : undefined;

    return html`
      <div class="container">
        <obc-watch 
          .cutAngleStart=${180 - this.maxAngle} 
          .cutAngleEnd=${180 - this.minAngle} 
          .angleSetpoint=${setpointAngle}
          .atAngleSetpoint=${this.atSetpointCalc()}
          roundOutsideCut
          
          ></obc-watch>
        <svg class="rudder" viewBox="-200 -200 400 400">
          <path d=${roundedArch({
      r: 160 - 48, R: 160, startAngle: 180 - this.maxAngle, endAngle: 180 - this.minAngle, roundInsideCut: true, roundOutsideCut: false
    })}
          fill="var(--instrument-frame-secondary-color)"
          stroke="var(--instrument-frame-tertiary-color)"
          vector-effect="non-scaling-stroke"
          stroke-width="1"
    ></path>
         ${bar}
        </svg>
      </div>
      `
  }

  static override styles = css`* {
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
}`


}

declare global {
  interface HTMLElementTagNameMap {
    'obc-rudder': ObcRudder
  }
}
