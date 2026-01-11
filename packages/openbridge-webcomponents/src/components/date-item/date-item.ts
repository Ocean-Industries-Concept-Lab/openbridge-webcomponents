import {LitElement, html, nothing, unsafeCSS} from 'lit';
import {customElement} from '../../decorator.js';
import compentStyle from './date-item.css?inline';
import {property} from 'lit/decorators.js';
import {classMap} from 'lit/directives/class-map.js';

/**
 * Enum for the variant type of the date item.
 * - `today`: Highlights the current date.
 * - `checked`: Indicates a selected or active date.
 * - `unchecked`: Neutral, unselected state.
 */
export enum DateItemType {
  Today = 'today',
  Checked = 'checked',
  Unchecked = 'unchecked',
}

export interface Event {
  title: string;
  startTime: string;
  endTime: string;
}

/**
 * Enum for the size of the date item.
 * - `small`: Compact, shows only the date and event dot.
 * - `large`: Expands to show event times and titles.
 */
export enum DateItemSize {
  Small = 'small',
  Large = 'large',
}

/**
 * `<obc-date-item>` – A calendar date cell component for displaying a single day, with optional event indicators and details.
 *
 * Represents an interactive date item within a calendar or date-picker interface. It visually communicates the current date, selection state, and whether events are scheduled for that day. The component adapts its layout and content based on size and type, supporting both compact and detailed views.
 *
 * Appears as a button styled to reflect its state (today, checked/selected, or unchecked/neutral), and can show a single event indicator. In large mode, event times and titles are displayed.
 *
 * ### Features
 * - **Type Variants:**
 *   - `today`: Highlights the current date.
 *   - `checked`: Indicates a selected or active date.
 *   - `unchecked`: Neutral, unselected state.
 * - **Size Options:**
 *   - `small` (default): Compact, shows only the date and a single event dot.
 *   - `large`: Expands to show event times and titles.
 * - **Event Indicators:**
 *   - Shows a colored dot in the top right corner to indicate events (small size only).
 *   - In large size, displays event times and titles in the content area below the date.
 * - **Disabled State:**
 *   - `disabled`: Visually and functionally disables the date item.
 * - **Accessibility:**
 *   - Uses `aria-label` to describe the date and event count for assistive technologies.
 * - **Date Range Enforcement:**
 *   - The `date` property is clamped between 1 and 31.
 *
 * ### Usage Guidelines
 * Use `obc-date-item` to represent individual days in a calendar, date picker, or scheduling interface.
 * - Use the `today` type to highlight the current day.
 * - Use the `checked` type to indicate a selected or active date (e.g., user’s chosen date).
 * - Use the `unchecked` type for all other dates.
 * - Add events to the `events` array to show that there are scheduled events on that day.
 * - Use the `large` size when you want to display event details directly within the date cell (e.g., in an expanded calendar view).
 * - Use the `small` size for compact calendar grids or navigation bars.
 * - Consider limiting the number of events displayed; for many events, consider a summary or overflow indicator.
 * - For disabled dates (e.g., out-of-range or unavailable), set `disabled` to prevent interaction and visually indicate inactivity.
 *
 * **TODO(designer):** Confirm if there are recommended color/icon conventions for each type, and if there are guidelines for truncating event titles.
 *
 * ### Properties and Attributes
 * - `type` (`today` | `checked` | `unchecked`): Controls the visual style and semantic meaning of the date item. Default: `today`.
 * - `size` (`small` | `large`): Determines the layout and whether event details are shown. Default: `small`.
 * - `date` (number): The numeric day of the month (1–31). Values outside this range are clamped.
 * - `disabled` (boolean): Disables the button and applies a muted style.
 * - `events` (Event[]): Array of events to display. Each event should have title, startTime, and endTime. Shows event dot in small size, full event details in large size.
 *
 * ### Best Practices and Constraints
 * - In `small` size, only a single event dot is shown in the top right corner; event details are not displayed.
 * - In `large` size, all events in the array are displayed with their times and titles.
 * - For accessibility, ensure that event titles are concise, as they may be truncated.
 * - Do not use for persistent or multi-day event summaries; this component is for single-day representation.
 *
 * ### Example:
 * ```html
 * <obc-date-item
 *   type="checked"
 *   size="large"
 *   date="15"
 *   .events=${[
 *     {title: "Meeting", startTime: "09:00", endTime: "10:00"},
 *     {title: "Deadline", startTime: "14:00", endTime: "15:30"}
 *   ]}
 * ></obc-date-item>
 * ```
 * In this example, the date item is selected, large, and displays two events with their times and titles.
 *
 * @slot - (No named slots) – All content is provided via properties; no slots are used.
 */
@customElement('obc-date-item')
export class ObcDateItem extends LitElement {
  /**
   * The size of the date item, controlling its layout and whether event details are shown.
   * - `small`: Compact, shows only the date and event dots.
   * - `large`: Expands to show event titles and descriptions for up to two events.
   * @default DateItemSize.Small
   */
  @property({type: String}) size = DateItemSize.Small;

  /**
   * Whether the date item is disabled. When true, the button is visually muted and not interactive.
   * @default false
   */
  @property({type: Boolean}) disabled = false;

  @property({attribute: false}) events: Event[] = [];

  /**
   * Number of events to display from the events array. When 0, shows all events.
   * In small size, always caps at 2 dots regardless of this value.
   * @default 0
   */
  @property({type: Number}) eventCount = 0;

  /**
   * The variant type of the date item, determining its visual style and semantic meaning.
   * - `today`: Highlights the current date.
   * - `checked`: Indicates a selected or active date.
   * - `unchecked`: Neutral, unselected state.
   * @default DateItemType.Today
   */
  @property({type: String}) type = DateItemType.Today;

  /**
   * The numeric day of the month to display (1–31). Values outside this range are clamped.
   * @default 1
   */
  @property({type: Number}) date = 1;

  override updated(changedProps: Map<string, unknown>) {
    if (changedProps.has('date')) {
      if (this.date < 1) this.date = 1;
      if (this.date > 31) this.date = 31;
    }
  }

  override render() {
    const eventsToShow =
      this.eventCount > 0 ? this.events.slice(0, this.eventCount) : this.events;

    const eventCount = eventsToShow.length;
    const eventText =
      eventCount === 0
        ? 'No events'
        : eventCount === 1
          ? '1 event'
          : 'Multiple events';

    return html`
      <button
        class=${classMap({
          wrapper: true,
          [`type-${this.type}`]: true,
          [`size-${this.size}`]: true,
          [`has-events`]: eventsToShow.length > 0,
          [`disabled`]: this.disabled,
        })}
        aria-label="Date ${this.date}, ${eventText}"
        aria-disabled=${this.disabled}
      >
        ${this.size === 'large'
          ? html`
              <div class="date-item-small">
                <div class="date-container">
                  <div class="date" aria-hidden="true">${this.date}</div>
                </div>
              </div>

              ${eventsToShow.length > 0
                ? html`
                    <div class="content-container" aria-hidden="true">
                      ${eventsToShow.map(
                        (event) => html`
                          <div class="event-row">
                            ${event.startTime && event.endTime
                              ? html`
                                  <div class="time-container">
                                    <span class="time">${event.startTime}</span>
                                    <span class="time-separator"> – </span>
                                    <span class="time">${event.endTime}</span>
                                  </div>
                                `
                              : nothing}
                            <div class="title-container">
                              <p class="title">${event.title}</p>
                            </div>
                          </div>
                        `
                      )}
                    </div>
                  `
                : nothing}
            `
          : html`
              <div class="date-container">
                <div class="date" aria-hidden="true">${this.date}</div>
                ${eventsToShow.length > 0
                  ? html`<div class="event-dot" aria-hidden="true"></div>`
                  : nothing}
              </div>
            `}
      </button>
    `;
  }

  static override styles = unsafeCSS(compentStyle);
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-date-item': ObcDateItem;
  }
}
