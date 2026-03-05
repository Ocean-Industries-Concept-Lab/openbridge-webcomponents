import {LitElement, html, unsafeCSS} from 'lit';
import {property} from 'lit/decorators.js';
import compentStyle from './wind-indicator.css?inline';
import {customElement} from '../../decorator.js';
import {environmentSvgs} from '../../navigation-instruments/watch/environment.js';

/**
 * @element obc-wind-indicator
 *
 * @prop {number} speed - The wind speed in Beaufort scale (0-12)
 * @prop {number} angle - The wind direction in degrees (0-360)
 * @prop {boolean} northUp - If true, the wind direction is relative to North. If false, it is relative to the vessel's heading.
 */
@customElement('obc-wind-indicator')
export class ObcWindIndicator extends LitElement {
  /** The wind speed in Beaufort scale (0-12) */
  @property({type: Number}) speed: number = 0;
  /** The wind direction in degrees (0-360) */
  @property({type: Number}) angle: number = 0;
  /** If true, the wind direction is relative to North. If false, it is relative to the vessel's heading. */
  @property({type: Boolean}) northUp = false;

  override render() {
    const windSymbolName = `wind-${this.speed + 1}.svg`;
    const windSymbol = environmentSvgs[windSymbolName];

    return html`
      <svg
        width="48"
        height="48"
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          transform="rotate(${this.northUp ? 0 : -this.angle}, 24, 24)"
          d="M23.5929 1.56961L19.5645 7.20938C19.3281 7.54031 19.5646 8 19.9713 8L28.0281 8C28.4348 8 28.6714 7.54031 28.435 7.20938L24.4066 1.56961C24.2072 1.29044 23.7923 1.29044 23.5929 1.56961Z"
          fill="var(--instrument-tick-mark-tertiary-color)"
        />
        <circle
          cx="24"
          cy="24"
          r="18"
          fill="var(--instrument-frame-primary-color)"
          stroke="var(--instrument-frame-tertiary-color)"
        />
        <g
          transform="translate(24 24) rotate(${this.northUp
            ? -this.angle
            : 0}) translate(-12 -12)"
        >
          ${windSymbol}
        </g>
      </svg>
    `;
  }

  static override styles = unsafeCSS(compentStyle);
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-wind-indicator': ObcWindIndicator;
  }
}
