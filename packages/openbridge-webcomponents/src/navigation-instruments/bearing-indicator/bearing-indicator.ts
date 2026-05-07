import {LitElement, html, unsafeCSS} from 'lit';
import {property} from 'lit/decorators.js';
import compentStyle from './bearing-indicator.css?inline';
import {customElement} from '../../decorator.js';

@customElement('obc-bearing-indicator')
export class ObcBearingIndicator extends LitElement {
  @property({type: Number})
  bearingDeg = 0;

  override render() {
    const r = 13;
    const x = 25 + r * Math.sin((this.bearingDeg * Math.PI) / 180);
    const y = 25 - r * Math.cos((this.bearingDeg * Math.PI) / 180);
    const R = 17.5;
    const x2 = 25 + R * Math.sin((this.bearingDeg * Math.PI) / 180);
    const y2 = 25 - R * Math.cos((this.bearingDeg * Math.PI) / 180);
    return html`
      <svg
        width="48"
        height="48"
        viewBox="1 1 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          cx="25"
          cy="25"
          r="17.5"
          fill="var(--instrument-frame-primary-color)"
        />
        <path
          d="M25 8L25 24"
          stroke="var(--instrument-frame-tertiary-color)"
          stroke-linecap="round"
        />
        <g clip-path="url(#clip0_37_16229)">
          <path d="M${x2} ${y2}L25 25" stroke="var(--element-neutral-color)" />

          <circle
            cx="24.9995"
            cy="25"
            r="13"
            stroke="var(--element-neutral-color)"
          />
          <circle
            cx="${x}"
            cy="${y}"
            r="2.5"
            fill="var(--element-neutral-color)"
            stroke="var(--instrument-frame-primary-color)"
          />
        </g>
        <circle
          cx="25"
          cy="25"
          r="17.5"
          fill="none"
          stroke="var(--instrument-frame-tertiary-color)"
        />

        <path
          transform="translate(20.8 20)"
          d="M3.94634 0.15532C4.0306 -0.0517729 4.32878 -0.0517736 4.41304 0.155319L8.14186 9.32007C8.32143 9.76142 7.82562 10.1731 7.41305 9.92527L4.17969 8L0.94632 9.92527C0.533756 10.1731 0.0379447 9.76142 0.217513 9.32007L3.94634 0.15532Z"
          fill="var(--element-active-color)"
        />
        <defs>
          <clipPath id="clip0_37_16229">
            <rect
              width="34"
              height="34"
              fill="white"
              transform="translate(0.958008 25) rotate(-45)"
            />
          </clipPath>
        </defs>
      </svg>
    `;
  }

  static override styles = unsafeCSS(compentStyle);
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-bearing-indicator': ObcBearingIndicator;
  }
}
