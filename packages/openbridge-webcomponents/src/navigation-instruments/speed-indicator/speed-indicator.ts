import {LitElement, html} from 'lit';
import {property} from 'lit/decorators.js';
import {customElement} from '../../decorator.js';

@customElement('obc-speed-indicator')
export class ObcSpeedIndicator extends LitElement {
  @property({type: Number}) speed: number = 0;
  @property({type: Number}) maxSpeed: number = 100;

  override render() {
    const speed = this.speed / this.maxSpeed;
    const speedAngle = speed * 225 - 90;

    const r = 20;
    const x = 34 + r * Math.sin((speedAngle * Math.PI) / 180);
    const y = 34 - r * Math.cos((speedAngle * Math.PI) / 180);

    const largeArc = speedAngle > 90 ? 1 : 0;
    const sweep = speed > 0 ? 1 : 0;

    const speedPath = `M34 34 L 14 34 A ${r} ${r} 0 ${largeArc} ${sweep} ${x} ${y} Z`;

    return html`
      <svg
        width="48"
        height="48"
        viewBox="10 10 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="${speedPath}"
          fill="var(--instrument-enhanced-tertiary-color)"
          stroke="var(--instrument-enhanced-tertiary-color)"
        />
        <path
          d="M14 34L34 34.0001"
          stroke="var(--instrument-frame-tertiary-color)"
          stroke-linecap="square"
        />
        <path
          d="M19.8579 48.1421C17.0608 45.3451 15.156 41.7814 14.3843 37.9018C13.6126 34.0222 14.0087 30.0009 15.5224 26.3463C17.0362 22.6918 19.5996 19.5682 22.8886 17.3706C26.1776 15.173 30.0444 14 34 14C37.9556 14 41.8224 15.173 45.1114 17.3706C48.4004 19.5682 50.9638 22.6918 52.4776 26.3463C53.9913 30.0009 54.3874 34.0222 53.6157 37.9018C52.844 41.7814 50.9392 45.3451 48.1421 48.1421"
          stroke="var(--instrument-frame-tertiary-color)"
          stroke-linecap="round"
        />
        <path
          transform="rotate(${speedAngle + 45})"
          transform-origin="34 34"
          d="M31.8821 36.1213C33.0537 37.2928 34.9532 37.2928 36.1248 36.1213C37.2963 34.9497 37.2963 33.0502 36.1248 31.8786C34.9532 30.707 19.9836 19.8474 19.9836 19.8474C19.9384 19.8181 19.8892 19.83 19.8586 19.8606C19.828 19.8912 19.8161 19.9404 19.8454 19.9856C19.9039 20.0761 30.7106 34.9497 31.8821 36.1213Z"
          fill="var(--instrument-enhanced-secondary-color)"
          stroke="var(--instrument-enhanced-secondary-color)"
          stroke-linecap="square"
        />
      </svg>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-speed-indicator': ObcSpeedIndicator;
  }
}
