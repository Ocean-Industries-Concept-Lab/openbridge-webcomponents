import {LitElement, html} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import '../icon-button/icon-button';
import compentStyle from './clock.style';

const monthNames = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

@customElement('obc-clock')
export class ObcClock extends LitElement {
  @property({type: String}) date = '2021-01-01T11:11:11.111Z';
  @property({type: Boolean, attribute: 'show-date'}) showDate = false;
  @property({type: Number, attribute: 'blink-only-breakpoint-px'})
  blinkOnlyBreakpointPx = 0;

  override render() {
    const date = new Date(this.date);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const hoursString = hours < 10 ? `0${hours}` : `${hours}`;
    const minutesString = minutes < 10 ? `0${minutes}` : `${minutes}`;

    const day = date.getDate();
    const month = monthNames[date.getMonth()];
    const dateString = `${day}. ${month}`;

    return html`
      <style>
        @media (max-width: ${this.blinkOnlyBreakpointPx}px) {
          .clock {
            display: none;
          }
          .clock.blink {
            display: block;
          }

          :host {
            padding: 0 !important;
          }
        }
      </style>
      <div class="clock">
        ${hoursString}<span class="ticks">:</span>${minutesString}
      </div>
      <div class="clock blink">
        <span class="ticks">:</span>
      </div>
      ${this.showDate ? html`<div class="date">${dateString}</div>` : null}
    `;
  }

  static override styles = compentStyle;
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-clock': ObcClock;
  }
}
