import {LitElement, unsafeCSS} from 'lit';
import {property} from 'lit/decorators.js';
import {customElement} from '../../decorator.js';
import '../icon-button/icon-button.js';
import compentStyle from './clock.css?inline';
import {literal, html} from 'lit/static-html.js';

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

/**
 * `<obc-clock>` – A digital clock component for displaying the current time, with optional date display and responsive blink-only mode.
 *
 * Renders a digital clock showing hours and minutes in a prominent style. Optionally, the current date can be shown below the time. The component supports a "blink-only" mode for responsive layouts, where only the blinking colon (:) is shown at certain breakpoints to save space.
 *
 * ---
 *
 * ### Features
 * - **Digital Time Display:** Shows the current time in HH:MM format with a blinking colon separator.
 * - **Optional Date:** Can display the current date (day and abbreviated month) below the time.
 * - **Responsive Blink-Only Mode:** At or below a configurable pixel width, the full time is hidden and only the blinking colon is shown.
 * - **Customizable Breakpoint:** The `blinkOnlyBreakpointPx` property allows developers to set the screen width at which the component switches to blink-only mode.
 *
 * ---
 *
 * ### Usage Guidelines
 * Use `obc-clock` to display the current time (and optionally the date) in a compact, visually prominent format. It is suitable for dashboards, toolbars, or any UI where a live clock is needed. The blink-only mode is ideal for conserving space on smaller screens or in minimized layouts.
 *
 * **TODO(designer):** Confirm if the clock should update live (tick every minute), or if it is intended for static display of a given time string only.
 *
 * ---
 *
 * ### Properties
 * - `date` (string): The ISO date/time string to display. Defaults to `'2021-01-01T11:11:11.111Z'`. Controls both the time and date shown.
 * - `showDate` (boolean): If true, displays the date below the time. Defaults to `false`.
 * - `blinkOnlyBreakpointPx` (number): The pixel width at which the component switches to blink-only mode. Defaults to `0` (never switches).
 *
 * ---
 *
 * ### Example
 * ```html
 * <obc-clock date="2024-06-01T14:32:00Z" showDate></obc-clock>
 * ```
 * This example displays the time "14:32" and the date "1. Jun".
 *
 * ---
 *
 * @slot - (No named slots) – All content is rendered by the component; no slots are used.
 */
@customElement('obc-clock')
export class ObcClock extends LitElement {
  /**
   * The ISO date/time string to display in the clock.
   * Controls both the time (HH:MM) and the date (if `showDate` is true).
   */
  @property({type: String}) date!: string;

  /**
   * If true, displays the date (day and abbreviated month) after the time.
   * Defaults to `false`.
   */
  @property({type: Boolean}) showDate = false;

  /**
   * If true, displays the timezone after the time.
   * Defaults to `false`.
   */
  @property({type: Boolean}) showTimezone = false;

  /**
   * Timezone offset in hours, from UTC.
   * Defaults to `0`.
   */
  @property({type: Number}) timeZoneOffsetHours = 0;

  @property({type: Boolean}) noClick = false;
  @property({type: Boolean}) showYear = false;
  @property({type: Boolean}) monthBeforeDay = false;

  /**
   * The pixel width at which the component switches to blink-only mode.
   * When the viewport width is less than or equal to this value, only the blinking colon is shown.
   * Defaults to `0` (never switches to blink-only).
   */
  @property({type: Number})
  blinkOnlyBreakpointPx = 0;

  private get timezoneString(): string {
    if (this.timeZoneOffsetHours === 0) {
      return 'UTC';
    }
    return this.timeZoneOffsetHours > 0
      ? `UTC +${this.timeZoneOffsetHours}`
      : `UTC -${this.timeZoneOffsetHours}`;
  }

  override render() {
    const date = new Date(this.date);
    const hours = (date.getUTCHours() + this.timeZoneOffsetHours) % 24;
    const minutes = date.getUTCMinutes();
    const hoursString = hours < 10 ? `0${hours}` : `${hours}`;
    const minutesString = minutes < 10 ? `0${minutes}` : `${minutes}`;

    const day = date.getDate();
    const month = monthNames[date.getMonth()];
    let dateString = '';
    if (this.monthBeforeDay) {
      dateString = `${month} ${day}`;
    } else {
      dateString = `${day}. ${month}`;
    }
    if (this.showYear) {
      dateString = `${dateString} ${date.getUTCFullYear()}`;
    }

    const wrapperTag = this.noClick ? literal`div` : literal`button`;

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
        import { customElement } from '../../decorator.js';
                  }
                }
      </style>
      <${wrapperTag} class="wrapper ${this.noClick ? 'no-click' : ''}">
        <div class="visible-wrapper">
        <div class="clock">
          ${hoursString}<span class="ticks">:</span>${minutesString}
        </div>
        <div class="clock blink">
          <span class="ticks">:</span>
        </div>
        ${
          this.showTimezone
            ? html`<div class="timezone">${this.timezoneString}</div>`
            : null
        }
        ${this.showDate ? html`<div class="date">${dateString}</div>` : null}
        </div>
      </${wrapperTag}>
    `;
  }

  static override styles = unsafeCSS(compentStyle);
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-clock': ObcClock;
  }
}
