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

/**
 * Enum for the size of the date item.
 * - `small`: Compact, shows only the date and event dots.
 * - `large`: Expands to show event titles and descriptions for up to two events.
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
 * Appears as a button styled to reflect its state (today, checked/selected, or unchecked/neutral), and can show one or two event indicators. In large mode, event titles and descriptions are displayed for up to two events.
 *
 * ### Features
 * - **Type Variants:**
 *   - `today`: Highlights the current date.
 *   - `checked`: Indicates a selected or active date.
 *   - `unchecked`: Neutral, unselected state.
 * - **Size Options:**
 *   - `small` (default): Compact, shows only the date and event dots.
 *   - `large`: Expands to show event titles and descriptions for up to two events.
 * - **Event Indicators:**
 *   - `hasEvent`: Shows a colored dot below the date to indicate at least one event.
 *   - `moreEvent`: Adds a second dot for multiple events (only if `hasEvent` is true).
 *   - In large size, displays event titles and descriptions for up to two events.
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
 * - Enable `hasEvent` to show that there are scheduled events on that day; use `moreEvent` for multiple events.
 * - Use the `large` size when you want to display event details directly within the date cell (e.g., in an expanded calendar view).
 * - Use the `small` size for compact calendar grids or navigation bars.
 * - Avoid using more than two events per date item; for more, consider a summary or overflow indicator.
 * - For disabled dates (e.g., out-of-range or unavailable), set `disabled` to prevent interaction and visually indicate inactivity.
 *
 * **TODO(designer):** Confirm if there are recommended color/icon conventions for each type, and if there are guidelines for truncating event titles/descriptions.
 *
 * ### Properties and Attributes
 * - `type` (`today` | `checked` | `unchecked`): Controls the visual style and semantic meaning of the date item. Default: `today`.
 * - `size` (`small` | `large`): Determines the layout and whether event details are shown. Default: `small`.
 * - `date` (number): The numeric day of the month (1–31). Values outside this range are clamped.
 * - `disabled` (boolean): Disables the button and applies a muted style.
 * - `hasEvent` (boolean): Shows an event indicator dot and, in large size, displays event details.
 * - `moreEvent` (boolean): Shows a second event dot and, in large size, displays a second event’s details. Only effective if `hasEvent` is true.
 * - `eventTitle1`, `eventDescription1`: Title and description for the first event (large size only).
 * - `eventTitle2`, `eventDescription2`: Title and description for the second event (large size only, and only if `moreEvent` is true).
 *
 * ### Best Practices and Constraints
 * - Only use `moreEvent` if `hasEvent` is true.
 * - In `small` size, only event dots are shown; event titles/descriptions are not displayed.
 * - For accessibility, ensure that event titles and descriptions are concise, as they may be truncated.
 * - Do not use for persistent or multi-day event summaries; this component is for single-day representation.
 *
 * ### Example:
 * ```html
 * <obc-date-item
 *   type="checked"
 *   size="large"
 *   date="15"
 *   hasEvent
 *   moreEvent
 *   eventTitle1="Meeting"
 *   eventDescription1="Team standup at 9 AM"
 *   eventTitle2="Deadline"
 *   eventDescription2="Project review due"
 * ></obc-date-item>
 * ```
 * In this example, the date item is selected, large, and displays two events with their titles and descriptions.
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

  /**
   * Whether this date item has at least one event. Shows an event indicator dot and, in large size, displays event details.
   * @default false
   */
  @property({type: Boolean}) hasEvent = false;

  /**
   * Whether there are multiple events for this date. Shows a second event dot and, in large size, displays a second event’s details.
   * Only effective if `hasEvent` is true.
   * @default false
   */
  @property({type: Boolean}) moreEvent = false;

  /**
   * Title for the first event (shown only in large size and if `hasEvent` is true).
   * @default "Event"
   */
  @property({type: String}) eventTitle1 = 'Event';

  /**
   * Description for the first event (shown only in large size and if `hasEvent` is true).
   * @default "Description"
   */
  @property({type: String}) eventDescription1 = 'Description';

  /**
   * Title for the second event (shown only in large size and if `moreEvent` is true).
   * @default "Event"
   */
  @property({type: String}) eventTitle2 = 'Event';

  /**
   * Description for the second event (shown only in large size and if `moreEvent` is true).
   * @default "Description"
   */
  @property({type: String}) eventDescription2 = 'Description';

  override updated(changedProps: Map<string, unknown>) {
    if (changedProps.has('date')) {
      if (this.date < 1) this.date = 1;
      if (this.date > 31) this.date = 31;
    }
  }

  override render() {
    const eventCount = this.hasEvent ? (this.moreEvent ? 2 : 1) : 0;
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
          [`hasEvent-${this.hasEvent}`]: true,
          [`moreEvent-${this.moreEvent}`]: true,
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
                  <div
                    class="event-dots"
                    aria-hidden="true"
                    aria-label=${eventText}
                  >
                    ${this.hasEvent
                      ? html`
                          <div class="event-dot"></div>
                          ${this.moreEvent
                            ? html`<div class="event-dot"></div>`
                            : nothing}
                        `
                      : nothing}
                  </div>
                </div>
              </div>

              ${this.hasEvent
                ? html`
                    <div class="content-container" aria-hidden="true">
                      <div class="event-row">
                        <p class="title">${this.eventTitle1}</p>
                        <p class="description">${this.eventDescription1}</p>
                      </div>
                      ${this.moreEvent
                        ? html`
                            <div class="event-row">
                              <p class="title">${this.eventTitle2}</p>
                              <p class="description">
                                ${this.eventDescription2}
                              </p>
                            </div>
                          `
                        : nothing}
                    </div>
                  `
                : nothing}
            `
          : html`
              <div class="date-container">
                <div class="date" aria-hidden="true">${this.date}</div>
                <div
                  class="event-dots"
                  aria-hidden="true"
                  aria-label=${eventText}
                >
                  ${this.hasEvent
                    ? html`
                        <div class="event-dot"></div>
                        ${this.moreEvent
                          ? html`<div class="event-dot"></div>`
                          : nothing}
                      `
                    : nothing}
                </div>
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
