import {LitElement, unsafeCSS, nothing} from 'lit';
import {property} from 'lit/decorators.js';
import {customElement} from '../../decorator.js';
import '../icon-button/icon-button.js';
import compentStyle from './clock.css?inline';
import {literal, html} from 'lit/static-html.js';
import {classMap} from 'lit/directives/class-map.js';

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
  @property({type: Boolean}) showSeconds = false;
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

  @property({type: Boolean, attribute: false}) isClickable: boolean = true;
  @property({type: Boolean}) showYear = false;
  @property({type: Boolean}) showWeekday = false;
  @property({type: String}) locale = 'en-GB';
  @property({type: Boolean}) hour12 = false;
  @property({type: Boolean}) selected = false;
  @property({type: Boolean}) double = false;
  /**
   * If true, the clock as a button is activated. For example, when the calendar is open, the clock is activated.
   */
  @property({type: Boolean}) activated = false;
  @property({type: Boolean}) integrationBarMode = false;

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
      ? `UTC+${this.timeZoneOffsetHours}`
      : `UTC-${-this.timeZoneOffsetHours}`;
  }

  private _dateString(date: Date): string {
    const options: Intl.DateTimeFormatOptions = {
      month: 'short',
      day: 'numeric',
      weekday: this.showWeekday ? 'short' : undefined,
      year: this.showYear ? 'numeric' : undefined,
      timeZone: 'UTC',
    };
    return date
      .toLocaleDateString(this.locale, options)
      .replace(/,/g, '')
      .replace(/\./g, '');
  }

  private _ampm(hours: number): string {
    if (this.hour12) {
      return hours < 12 ? ' AM' : ' PM';
    }
    return '';
  }

  override render() {
    const date = new Date(this.date);
    date.setUTCHours(date.getUTCHours() + this.timeZoneOffsetHours);
    const hours = date.getUTCHours();
    const minutes = date.getUTCMinutes();
    const hour12 = this.hour12 ? hours % 12 : hours;
    const hoursString = hour12 < 10 ? `0${hour12}` : `${hour12}`;
    const minutesString = minutes < 10 ? `0${minutes}` : `${minutes}`;
    const seconds = date.getUTCSeconds();
    const secondsString = seconds < 10 ? `0${seconds}` : `${seconds}`;
    const ampm = this._ampm(hours);

    const dateString = this._dateString(date);

    const wrapperTag = !this.isClickable ? literal`div` : literal`button`;
    const ticks = html`<div class="ticks ${this.showSeconds ? '' : 'animate'}">
      <span class="tick"></span><span class="tick"></span>
    </div>`;

    const query = `@media (max-width: ${this.blinkOnlyBreakpointPx}px )`;

    const firstRow = html`<div class="clock">
        ${hoursString}${ticks}${minutesString}${this.showSeconds
          ? html`${ticks}${secondsString}`
          : ''}${ampm}
      </div>

      ${this.showTimezone
        ? html`<div class="timezone">${this.timezoneString}</div>`
        : null}`;

    return html`
      <style>
        ${query} {
          .wrapper {
            display: none !important;
          }
          .blink-wrapper {
            display: flex !important;
          }
        }
      </style>
      <${wrapperTag} 
        class=${classMap({
          wrapper: true,
          'no-click': !this.isClickable,
          selected: this.selected,
          double: this.double,
          'integration-bar-mode': this.integrationBarMode,
          activated: this.activated,
        })}>
        <div class="visible-wrapper">
          ${this.double ? html`<div class="row">${firstRow}</div>` : firstRow}
        ${
          this.showDate
            ? html` <div class="divider"></div>
                <div class="date">${dateString}</div>`
            : nothing
        }
        ${this.double ? html`</div>` : nothing}
        </div>
      </${wrapperTag}>
      <div class=${classMap({
        'blink-wrapper': true,
        clock: true,
        blink: true,
        'integration-bar-mode': this.integrationBarMode,
      })}>
        <div class="ticks animate"><div class="tick"></div><div class="tick"></div></div>
      </div>
    `;
  }

  static override styles = unsafeCSS(compentStyle);
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-clock': ObcClock;
  }
}
