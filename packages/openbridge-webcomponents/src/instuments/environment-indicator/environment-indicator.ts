import {LitElement, html, svg, unsafeCSS} from 'lit';
import {property} from 'lit/decorators.js';
import compentStyle from './environment-indicator.css?inline';
import {customElement} from '../../decorator.js';

export enum EnvironmentIndicatorArrow {
  Heading = 'heading',
  Course = 'course',
}

@customElement('obc-environment-indicator')
export class ObcEnvironmentIndicator extends LitElement {
  @property({type: Number})
  angle = 0;

  @property({type: String})
  arrow = EnvironmentIndicatorArrow.Heading;

  @property({type: Boolean})
  northUp = false;

  override render() {
    const arrow =
      this.arrow === EnvironmentIndicatorArrow.Heading
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
        ${arrow}
      </svg>
    `;
  }

  static override styles = unsafeCSS(compentStyle);
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-environment-indicator': ObcEnvironmentIndicator;
  }
}
