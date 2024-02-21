import {LitElement, svg, unsafeCSS} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import {Size, InstrumentState} from '../types';
import {thruster} from '../thruster/thruster';
import '../test-watch/test-watch';
import componentStyle from './azimuth-thruster.css?inline';

@customElement('obc-azimuth-thruster')
export class ObcAzimuthThruster extends LitElement {
  @property({type: String}) size: Size = Size.medium;
  @property({type: Number}) angle = 0;
  @property({type: Number, attribute: 'angle-setpoint'}) angleSetpoint:
    | number
    | undefined;
  @property({type: Boolean, attribute: 'at-angle-setpoint'})
  atAngleSetpoint: boolean = false;
  
  @property({type: Number}) thrust = 0;
  @property({type: Number, attribute: 'thrust-setpoint'}) thrustSetpoint:
    | number
    | undefined;
  @property({type: Boolean, attribute: 'at-thrust-setpoint'})
  atThrustSetpoint: boolean = false;
  @property({type: Boolean, attribute: 'thrust-setpoint-at-zero'}) thrustSetpointAtZero: boolean = false;
  @property({type: String}) state: InstrumentState = InstrumentState.inCommand;
  @property({type: Number}) loading: number = 0;

  override render() {
    const rotateAngle = this.angle;
    let setPointColor = 'var(--instrument-enhanced-primary-color)';
    if (this.atAngleSetpoint) {
      setPointColor = 'var(--instrument-frame-tertiary-color)';
    }
    if (this.state === InstrumentState.active) {
      setPointColor = 'var(--instrument-regular-secondary-color)';
      if (this.atAngleSetpoint) {
        setPointColor = 'var(--instrument-frame-tertiary-color)';
      }
    } else if (this.state === InstrumentState.loading) {
      setPointColor = 'var(--instrument-frame-tertiary-color)';
    } else if (this.state === InstrumentState.off) {
      setPointColor = 'var(--instrument-frame-tertiary-color)';
    }
    return svg`
      <div class="container">
      <obc-test-watch></obc-test-watch>
      <svg viewBox="-200 -200 400 400" xmlns="http://www.w3.org/2000/svg">
        ${
          this.angleSetpoint !== undefined && this.state !== InstrumentState.off
            ? svg`
            <g transform="rotate(${this.angleSetpoint}) translate(-12 -192) ">
              <path d="M11.1999 28.6018C11.3887 28.8537 11.6852 29.002 12 29.002C12.3148 29.002 12.6113 28.8537 12.8001 28.6018L22.3966 15.8018C23.879 13.8246 22.4692 11.002 19.9971 11.002L4.0029 11.002C1.53076 11.002 0.121035 13.8246 1.60338 15.8018L11.1999 28.6018Z" vector-effect="non-scaling-stroke" fill=${setPointColor} stroke="#F7F7F7" stroke-width="2" stroke-linejoin="round"/>
            </g>
        `
            : null
        }
      <g transform="rotate(${rotateAngle})">
      <svg  width="128" height="320" y ="-160" x="-64" viewBox="-64 -160 128 320">
        ${thruster(this.thrust, this.thrustSetpoint, this.state, {
          atSetpoint: this.atThrustSetpoint,
          tunnel: false,
          setpointAtZero: this.thrustSetpointAtZero,
        })}
        </svg>
        </g>
        </svg>
      </div>
      </div>
      `;
  }

  static override styles = unsafeCSS(componentStyle);
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-azimuth-thruster': ObcAzimuthThruster;
  }
}
