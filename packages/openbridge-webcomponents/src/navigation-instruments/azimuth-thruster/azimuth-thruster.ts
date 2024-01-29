import {LitElement, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import {Size, InstrumentState} from '../types';

import {watchface} from '../watchface/watchface';
import {thruster} from '../thruster/thruster';

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
  @property({type: String}) state: InstrumentState = InstrumentState.inCommand;
  @property({type: Number}) loading: number = 0;

  override render() {
    const rotateAngle = this.angle + 90;
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
      <svg viewBox="-256 -256 512 512" xmlns="http://www.w3.org/2000/svg">
        ${watchface(this.size, {
          topline: true,
          off: this.state === InstrumentState.off,
          secondaryTickmarks:
            this.state !== InstrumentState.loading ? 90 : false,
          loading:
            this.state === InstrumentState.loading ? this.loading : false,
        })}
        ${
          this.angleSetpoint !== undefined && this.state !== InstrumentState.off
            ? svg`
        <g transform="rotate(${this.angleSetpoint})">
          <svg x="-32" y="-256" width="64" height="512" viewBox="0 0 64 512" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M32.0003 81L17.7103 55.9923C16.9484 54.659 17.9112 53 19.4468 53L44.5537 53C46.0894 53 47.0521 54.659 46.2902 55.9923L32.0003 81Z" fill=${setPointColor}/>
            ${
              !this.atAngleSetpoint &&
              (this.state === InstrumentState.inCommand ||
                this.state === InstrumentState.active)
                ? svg`<path d="M31.5661 81.248L32.0003 82.0078L32.4344 81.248L46.7243 56.2403C47.6767 54.5737 46.4733 52.5 44.5537 52.5L19.4468 52.5C17.5273 52.5 16.3239 54.5737 17.2762 56.2403L31.5661 81.248Z" stroke="var(--border-silhouette-color)"/>`
                : null
            }
          </svg>
        </g>
        `
            : null
        }
        <g transform="rotate(${rotateAngle})">
          ${thruster(this.thrust, this.size, this.thrustSetpoint, this.state, {
            atSetpoint: this.atThrustSetpoint,
            tunnel: false,
          })}
        </g>
      </svg>
      `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-azimuth-thruster': ObcAzimuthThruster;
  }
}
