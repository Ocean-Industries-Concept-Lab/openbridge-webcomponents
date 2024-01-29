import {LitElement, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import {Size, InstrumentState} from '../types';

/**
 * @element obc-thruster
 *
 * @prop {Size} size - The size of the thruster
 * @prop {number} thrust - The thrust of the thruster in percent (-100 - +100)
 */
@customElement('obc-thruster')
export class ObcThruster extends LitElement {
  @property({type: String}) size: Size = Size.medium;
  @property({type: Number}) thrust: number = 0;
  @property({type: Number}) setpoint: number | undefined;
  @property({type: Boolean, attribute: 'at-setpoint'}) atSetpoint: boolean =
    false;
  @property({type: String}) state: InstrumentState = InstrumentState.inCommand;
  @property({type: Boolean}) tunnel: boolean = false;
  @property({type: Boolean}) loading: boolean = false;
  @property({type: Boolean}) off: boolean = false;

  override render() {
    return thruster(this.thrust, this.size, this.setpoint, this.state, {
      atSetpoint: this.atSetpoint,
      tunnel: this.tunnel,
    });
  }
}

export function thruster(
  thrust: number,
  size: Size,
  setpoint: number | undefined,
  state: InstrumentState,
  options: {atSetpoint: boolean; tunnel: boolean}
) {
  let boxColor = 'var(--instrument-enhanced-secondary-color)';
  let setPointColor = 'var(--instrument-enhanced-primary-color)';
  let arrowColor = 'var(--instrument-tick-mark-primary-color)';
  let trackBackgroundColor = 'var(--instrument-frame-primary-color)';
  if (options.atSetpoint) {
    setPointColor = 'var(--instrument-frame-tertiary-color)';
  }
  if (state === InstrumentState.active) {
    boxColor = 'var(--instrument-regular-secondary-color)';
    setPointColor = 'var(--instrument-regular-secondary-color)';
    arrowColor = 'var(--instrument-regular-primary-color)';
    if (options.atSetpoint) {
      setPointColor = 'var(--instrument-frame-tertiary-color)';
    }
  } else if (state === InstrumentState.loading) {
    boxColor = 'transparent';
    setPointColor = 'var(--instrument-frame-tertiary-color)';
    arrowColor = 'var(--instrument-regular-primary-color)';
    thrust = 0;
    if (setpoint !== undefined) {
      setpoint = 0;
    }
  } else if (state === InstrumentState.off) {
    boxColor = 'transparent';
    setPointColor = 'var(--instrument-frame-tertiary-color)';
    arrowColor = 'var(--instrument-frame-tertiary-color)';
    thrust = 0;
    trackBackgroundColor = 'transparent';
    if (setpoint !== undefined) {
      setpoint = 0;
    }
  }

  const thrustWidth = (159 * Math.abs(thrust)) / 100;
  const thrustX = thrust < 0 ? 0 : -thrustWidth;
  const setpointX = (-159 * (setpoint ?? 0)) / 100 - 16;

  return svg`
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="-176 -48 352 96" x="-176" y="-48" width="352" height="96">
          <rect x="-159.5" width="319" y="-36.5" height="73" rx="4" stroke="var(--instrument-frame-tertiary-color)" stroke-width="1" fill=${trackBackgroundColor} />
          <line x1="79.5" y1="-36" x2="79.5" y2="36" stroke="var(--instrument-frame-tertiary-color)" stroke-width="1" />
          <line x1="-79.5" y1="-36" x2="-79.5" y2="36" stroke="var(--instrument-frame-tertiary-color)" stroke-width="1" />
          <rect x="-159" width="318" y="-28" height="56" fill=${trackBackgroundColor} />
          <rect x="-159.5" width="319" y="-23.5" height="47" stroke="var(--instrument-frame-tertiary-color)" stroke-width="1" fill="var(--instrument-frame-secondary-color)" />
          <rect x=${thrustX} width=${thrustWidth} y="-23" height="46" fill=${boxColor} />

          
          <line x1="0" y1="-37" x2="0" y2="37" stroke="var(--instrument-frame-tertiary-color" stroke-width="1" />
          ${
            options.tunnel
              ? null
              : svg`
          <svg x="-175" y="-18" width="14" height="36" viewBox="0 0 14 36" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12.1808 0.598838C12.7414 -0.202138 14 0.194583 14 1.17229L14 34.8276C14 35.8053 12.7415 36.202 12.1808 35.401L0 17.9999L12.1808 0.598838Z" fill=${arrowColor}/>
          </svg>`
          }

    ${
      setpoint !== undefined
        ? svg`
          <svg x=${setpointX} y="-56" width="32" height="112" viewBox="0 0 32 112" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8.16138 17C6.48437 17 5.55202 18.9399 6.59965 20.2494L16.0001 32L25.4006 20.2494C26.4482 18.9399 25.5159 17 23.8389 17H8.16138Z" fill=${setPointColor}/>
            <path d="M23.8385 95C25.5155 95 26.4478 93.0601 25.4002 91.7506L15.9997 80L6.59924 91.7506C5.55162 93.0601 6.48397 95 8.16098 95H23.8385Z" fill=${setPointColor}/>
          </svg>
    `
        : null
    }

        </svg>
        
      `;
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-thruster': ObcThruster;
  }
}
