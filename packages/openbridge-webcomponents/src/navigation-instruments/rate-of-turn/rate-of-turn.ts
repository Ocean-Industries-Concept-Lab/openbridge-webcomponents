import {LitElement, css, html} from 'lit';
import {customElement, property, query} from 'lit/decorators.js';
import '../watch/watch';
import {WatchCircleType} from '../watch/watch';
import {RateOfTurnController} from './rate-of-turn.controller.js';

@customElement('obc-rate-of-turn')
export class ObcRateOfTurn extends LitElement {
  @property({type: Number})
  set rotationsPerMinute(value: number) {
    this._rotationsPerMinute = value;
    if (this.rateOfTurnController) {
      this.rateOfTurnController.rotationsPerMinute = value;
    }
  }
  get rotationsPerMinute() {
    return this._rotationsPerMinute;
  }
  _rotationsPerMinute = 1;

  @query('#spinner')
  private spinner!: HTMLElement;

  private rateOfTurnController?: RateOfTurnController;

  override firstUpdated() {
    this.rateOfTurnController = new RateOfTurnController(
      this,
      this.spinner,
      this.rotationsPerMinute
    );
  }

  static override styles = css`
    * {
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
    }
  `;

  override render() {
    return html`<div class="container">
      <obc-watch .watchCircleType=${WatchCircleType.single}></obc-watch>
      <svg id="spinner" viewBox="-200 -200 400 400">
        <g transform="translate(-256, -256)">
          <path
          d="M263.998 84C263.998 88.4183 260.416 92 255.998 92C251.58 92 247.998 88.4183 247.998 84C247.998 79.5817 251.58 76 255.998 76C260.416 76 263.998 79.5817 263.998 84Z"
          fill="var(--instrument-enhanced-secondary-color)"
        />
        <path
          d="M94.8884 195.241C99.0904 196.606 101.39 201.119 100.025 205.321C98.6594 209.523 94.1461 211.823 89.9441 210.458C85.7421 209.092 83.4424 204.579 84.8078 200.377C86.1731 196.175 90.6863 193.875 94.8884 195.241Z"
          fill="var(--instrument-enhanced-secondary-color)"
        />
        <path
          d="M148.427 390.449C151.024 386.874 156.027 386.082 159.601 388.679C163.176 391.276 163.968 396.279 161.371 399.853C158.774 403.428 153.771 404.22 150.197 401.623C146.622 399.026 145.83 394.023 148.427 390.449Z"
          fill="var(--instrument-enhanced-secondary-color)"
        />
        <path
          d="M350.625 399.853C348.028 396.279 348.82 391.276 352.395 388.679C355.969 386.082 360.972 386.874 363.569 390.449C366.166 394.023 365.374 399.026 361.799 401.623C358.225 404.22 353.222 403.428 350.625 399.853Z"
          fill="var(--instrument-enhanced-secondary-color)"
        />
        <path
          d="M422.052 210.458C417.85 211.823 413.336 209.523 411.971 205.321C410.606 201.119 412.905 196.606 417.107 195.241C421.309 193.875 425.823 196.175 427.188 200.377C428.553 204.579 426.254 209.092 422.052 210.458Z"
          fill="var(--instrument-enhanced-secondary-color)"
        />
      </svg>
    </div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-rate-of-turn': ObcRateOfTurn;
  }
}
