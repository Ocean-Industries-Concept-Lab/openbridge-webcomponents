import { LitElement, svg } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import compentStyle from "./thruster.style";
import { Size } from '../types';

/**
 * @element obc-thruster
 * 
 * @prop {Size} size - The size of the thruster
 * @prop {number} thrust - The thrust of the thruster in percent (-100 - +100)
 */
@customElement('obc-thruster')
export class ObcThruster extends LitElement {
  @property({ type: String }) size: Size = Size.medium;
  @property({ type: Number }) thrust: number = 0;
  @property({ type: Number}) setpoint: number | undefined

  override render() {
    const thrustWidth = 159*Math.abs(this.thrust)/100;
    const thrustX = this.thrust < 0 ? 0 : -thrustWidth;
    const setpointX = -159*(this.setpoint ?? 0)/100 -16;

    return svg`
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="-176 -48 352 96">
          <rect x="-159.5" width="319" y="-36.5" height="73" rx="4" stroke="var(--instrument-frame-tertiary-color" stroke-width="1" fill="var(--instrument-frame-primary-color)" />
          <line x1="79.5" y1="-36" x2="79.5" y2="36" stroke="var(--instrument-frame-tertiary-color" stroke-width="1" />
          <line x1="-79.5" y1="-36" x2="-79.5" y2="36" stroke="var(--instrument-frame-tertiary-color" stroke-width="1" />
          <rect x="-159" width="318" y="-28" height="56" fill="var(--instrument-frame-primary-color)" />
          <rect x="-159.5" width="319" y="-23.5" height="47" stroke="var(--instrument-frame-tertiary-color" stroke-width="1" fill="var(--instrument-frame-secondary-color)" />
          <rect x=${thrustX} width=${thrustWidth} y="-23" height="46" fill="var(--instrument-enhanced-secondary-color)" />

          
          <line x1="0" y1="-37" x2="0" y2="37" stroke="var(--instrument-frame-tertiary-color" stroke-width="1" />

          <svg x="-175" y="-18" width="14" height="36" viewBox="0 0 14 36" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12.1808 0.598838C12.7414 -0.202138 14 0.194583 14 1.17229L14 34.8276C14 35.8053 12.7415 36.202 12.1808 35.401L0 17.9999L12.1808 0.598838Z" fill="var(--instrument-tick-mark-primary-color)"/>
          </svg>

    ${this.setpoint !== undefined ? svg`
          <svg x=${setpointX} y="-56" width="32" height="112" viewBox="0 0 32 112" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8.16138 17C6.48437 17 5.55202 18.9399 6.59965 20.2494L16.0001 32L25.4006 20.2494C26.4482 18.9399 25.5159 17 23.8389 17H8.16138Z" fill="var(--instrument-enhanced-primary-color)"/>
            <path d="M23.8385 95C25.5155 95 26.4478 93.0601 25.4002 91.7506L15.9997 80L6.59924 91.7506C5.55162 93.0601 6.48397 95 8.16098 95H23.8385Z" fill="var(--instrument-enhanced-primary-color)"/>
          </svg>
    ` : null}

        </svg>
        
      `
  }

  static override styles = compentStyle;
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-thruster': ObcThruster
  }
}
