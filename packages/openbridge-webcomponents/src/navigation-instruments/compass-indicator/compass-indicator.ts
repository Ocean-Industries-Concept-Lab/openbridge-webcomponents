import {LitElement, html, svg, unsafeCSS} from 'lit';
import {property} from 'lit/decorators.js';
import compentStyle from './compass-indicator.css?inline';
import {customElement} from '../../decorator.js';

export enum CompassIndicatorArrow {
  Heading = 'heading',
  Course = 'course',
}

@customElement('obc-compass-indicator')
export class ObcCompassIndicator extends LitElement {
  @property({type: Number})
  angle = 0;

  @property({type: String})
  arrow = CompassIndicatorArrow.Heading;

  @property({type: Boolean})
  northUp = false;

  override render() {
    const arrow =
      this.arrow === CompassIndicatorArrow.Heading
        ? svg`
    <path transform="rotate(${this.northUp ? this.angle : 0}, 24, 24)" d="M23.1426 11.978C23.5519 11.2972 24.6131 11.3458 24.9297 12.1235L32.3877 30.4536L32.4336 30.5796C32.8455 31.8831 31.3809 32.9849 30.209 32.2808V32.2798L24 28.5835L17.79 32.2798L17.791 32.2808C16.5815 33.0075 15.0606 31.8106 15.6123 30.4536L23.0703 12.1235L23.1426 11.978Z" 
    fill="var(--instrument-enhanced-secondary-color)" stroke="var(--border-silhouette-color)"/>`
        : svg`
    <path transform="rotate(${this.northUp ? this.angle : 0}, 24, 24)" d="M23.1426 11.978C23.5519 11.2972 24.6131 11.3458 24.9297 12.1235L32.3877 30.4536L32.4336 30.5796C32.8455 31.8831 31.3809 32.9849 30.209 32.2808V32.2798L24 28.5835L17.79 32.2798L17.791 32.2808C16.5815 33.0075 15.0606 31.8106 15.6123 30.4536L23.0703 12.1235L23.1426 11.978ZM20.0889 27.4087L23.7451 25.2388L24 25.0864L24.2549 25.2388L27.9102 27.4087L24 17.7974L20.0889 27.4087Z" 
    fill="var(--instrument-enhanced-secondary-color)" stroke="var(--border-silhouette-color)"/>
`;

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
          stroke="var(--instrument-frame-tertiary-color"
        />
        <mask
          id="mask0_8_1771"
          style="mask-type:alpha"
          maskUnits="userSpaceOnUse"
          x="0"
          y="0"
          width="48"
          height="48"
        >
          <path
            d="M24 8C32.8366 8 40 15.1634 40 24C40 32.8366 32.8366 40 24 40C15.1634 40 8 32.8366 8 24C8 15.1634 15.1634 8 24 8ZM24 10C16.268 10 10 16.268 10 24C10 31.732 16.268 38 24 38C31.732 38 38 31.732 38 24C38 16.268 31.732 10 24 10Z"
            fill="var(--instrument-frame-primary-color)"
          />
        </mask>
        <g mask="url(#mask0_8_1771)">
          <path
            d="M24 0V24M24 24L19.8324 0.364611M24 24L15.7915 1.44736M24 24L12 3.21539M24 24L8.5731 5.61493M24 24L5.61494 8.5731M24 24L3.21539 12M24 24L1.44738 15.7915M24 24L0.364617 19.8324M24 24H0M24 24L0.364611 28.1676M24 24L1.44739 32.2085M24 24L3.21539 36M24 24L5.61493 39.4269M24 24L8.5731 42.3851M24 24L12 44.7846M24 24L15.7915 46.5526M24 24L19.8324 47.6354M24 24V48M24 24L28.1676 47.6354M24 24L32.2085 46.5526M24 24L36 44.7846M24 24L39.4269 42.3851M24 24L42.3851 39.4269M24 24L44.7846 36M24 24L46.5526 32.2085M24 24L47.6354 28.1676M24 24H48M24 24L47.6354 19.8325M24 24L46.5526 15.7915M24 24L44.7846 12M24 24L42.3851 8.57313M24 24L39.4269 5.61497M24 24L36 3.21539M24 24L32.2085 1.44741M24 24L28.1676 0.364646"
            stroke="var(--instrument-frame-tertiary-color"
          />
        </g>
        <mask
          id="mask1_8_1771"
          style="mask-type:alpha"
          maskUnits="userSpaceOnUse"
          x="-14"
          y="-14"
          width="76"
          height="76"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M24 42C33.9411 42 42 33.9411 42 24C42 14.0589 33.9411 6 24 6C14.0589 6 6 14.0589 6 24C6 33.9411 14.0589 42 24 42ZM24 36C30.6274 36 36 30.6274 36 24C36 17.3726 30.6274 12 24 12C17.3726 12 12 17.3726 12 24C12 30.6274 17.3726 36 24 36Z"
            fill="var(--instrument-frame-primary-color)"
          />
        </mask>
        <g mask="url(#mask1_8_1771)">
          <path
            d="M24 0V24M24 24H0M24 24V48M24 24H48"
            stroke="var(--instrument-frame-tertiary-color"
          />
        </g>
        ${arrow}
      </svg>
    `;
  }

  static override styles = unsafeCSS(compentStyle);
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-compass-indicator': ObcCompassIndicator;
  }
}
