import {LitElement, html, nothing, unsafeCSS} from 'lit';
import {customElement} from '../../decorator.js';
import componentStyle from './date-item.css?inline';
import {property, state} from 'lit/decorators.js';
import {classMap} from 'lit/directives/class-map.js';
import {repeat} from 'lit/directives/repeat.js';
import {type DateItemEvent, EventItemType} from '../event-item/event-item.js';
export type {DateItemEvent};
export {EventItemType};
import '../event-item/event-item.js';

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
 * @summary Represents an interactive date item within a calendar or date-picker interface.
 * It visually communicates the current date, selection state, and whether events are scheduled for that day.
 * The component adapts its layout and content based on size, supporting both compact and detailed views.
 *
 * **Synonyms:** date item, calendar cell, day cell, date picker item, schedule day
 *
 * ### Features
 * - **Today Highlight:** When `isToday` is true, shows "Today" label (in large size) and uses amplified styling.
 * - **Checked State:** When `checked` is true, uses selected styling (blue filled background).
 * - **Size Options:**
 *   - `small` (default): Compact, shows only the date and event dot indicator.
 *   - `large`: Expands to show event details; visible events are auto-aggregated based on available space.
 * - **Event Indicators:** Shows a colored dot in small size; in large size, displays event details with auto-aggregation.
 * - **Disabled State:** Visually and functionally disables the date item.
 * - **Accessibility:** Uses `aria-label` to describe the date and event count for assistive technologies.
 * - **Date Range Enforcement:** The `date` property is clamped between 1 and 31.
 *
 * ### Usage Guidelines
 * Use `obc-date-item` to represent individual days in a calendar, date picker, or scheduling interface.
 * - Set `isToday` to true for the current day to highlight it with amplified styling.
 * - Set `checked` to true to indicate a selected or active date.
 * - Add events to the `events` array to show scheduled events on that day.
 * - Use the `large` size when you want to display event details directly within the date cell.
 * - Use the `small` size for compact calendar grids or navigation bars.
 * - Use `eventCount` to limit the number of visible events; remaining events are auto-aggregated.
 * - For disabled dates, set `disabled` to prevent interaction.
 *
 * ### Slots
 * This component does not use slots. All content is provided via properties.
 *
 * ### Events
 * | Event Name   | Detail                                                                              | Description                              |
 * |--------------|-------------------------------------------------------------------------------------|----------------------------------------------------|
 * | `date-click` | `{ date: number, events: DateItemEvent[], isToday: boolean, checked: boolean }`     | Fired when the date item is clicked.     |
 *
 * ### Properties
 * - `size` (`small` | `large`): Controls layout. In `large` mode, event details are shown and the visible event list is auto-aggregated based on available space and `eventCount`. Default: `small`.
 * - `date` (number): The numeric day of the month (1–31). Values outside this range are clamped.
 * - `isToday` (boolean): Shows "Today" label in large size and uses amplified styling. Default: `false`.
 * - `checked` (boolean): Uses selected styling (blue filled background). Default: `false`.
 * - `disabled` (boolean): Disables the button and applies a muted style. Default: `false`.
 * - `events` (DateItemEvent[]): Array of events to display. In small size, shows an event dot. In large size, displays event details with auto-aggregation based on available space.
 * - `eventCount` (number): Maximum number of events to display before aggregating. When 0, shows all events that fit; remaining events are shown as an aggregated count. Default: `0`.
 *
 * ### Best Practices
 * - In `small` size, only an event dot is shown; event details are not displayed.
 * - In `large` size, events are auto-aggregated based on available space and `eventCount`.
 * - Ensure event titles are concise as they may be truncated.
 * - Do not use for multi-day event summaries; this component is for single-day representation.
 *
 * ### Example
 * ```html
 * <obc-date-item
 *   checked
 *   size="large"
 *   date="15"
 *   .events=${[
 *     {title: "Meeting", startTime: "09:00", endTime: "10:00"},
 *     {title: "Deadline", startTime: "14:00", endTime: "15:30"}
 *   ]}
 *   @date-click=${(e) => console.log('Date clicked:', e.detail.date)}
 * ></obc-date-item>
 * ```
 *
 * @fires {CustomEvent<{date: number, events: DateItemEvent[], isToday: boolean, checked: boolean}>} date-click - Fired when the date item is clicked.
 * @slot - No slots. All content is provided via properties.
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
   * Array of events to display on this date.
   * In small size, shows an event dot indicator.
   * In large size, displays event details using obc-event-item components.
   * @default []
   */
  @property({attribute: false}) events: DateItemEvent[] = [];

  /**
   * Number of events to display from the events array. When 0, shows all events.
   * In small size, always caps at 2 dots regardless of this value.
   * @default 0
   */
  @property({type: Number}) eventCount = 0;

  /**
   * Whether the date item represents today.
   * When true, displays the "Today" label (in large size) and uses amplified styling.
   * @default false
   */
  @property({type: Boolean}) isToday = false;

  /**
   * Whether the date item is checked/selected.
   * When true, uses selected styling (blue filled background).
   * @default false
   */
  @property({type: Boolean}) checked = false;

  @state() private _date = 1;

  /**
   * The numeric day of the month to display (1–31). Values outside this range are clamped.
   * @default 1
   */
  @property({type: Number})
  get date() {
    return this._date;
  }

  set date(value: number) {
    const oldValue = this._date;
    if (value < 1) this._date = 1;
    else if (value > 31) this._date = 31;
    else this._date = value;
    this.requestUpdate('date', oldValue);
  }

  @state() private _maxVisibleEvents: number | null = null;

  private _resizeObserver?: ResizeObserver;
  private static readonly _HEADER_HEIGHT = 48;
  private static readonly _EVENT_HEIGHT = 48;

  override connectedCallback() {
    super.connectedCallback();
    if (typeof ResizeObserver !== 'undefined') {
      this._resizeObserver = new ResizeObserver((entries) => {
        for (const entry of entries) {
          this._recalcVisibleEvents(entry.contentRect.height);
        }
      });
    }
  }

  override disconnectedCallback() {
    super.disconnectedCallback();
    this._resizeObserver?.disconnect();
    this._resizeObserver = undefined;
  }

  override firstUpdated() {
    if (this.size === DateItemSize.Large) {
      this._resizeObserver?.observe(this);
    }
  }

  override updated(changedProps: Map<string, unknown>) {
    if (changedProps.has('size')) {
      this._resizeObserver?.disconnect();
      if (this.size === DateItemSize.Large) {
        this._resizeObserver?.observe(this);
      } else {
        this._maxVisibleEvents = null;
      }
    }
  }

  private _recalcVisibleEvents(containerHeight: number) {
    const available = containerHeight - ObcDateItem._HEADER_HEIGHT;
    if (available <= 0) {
      this._maxVisibleEvents = 0;
      return;
    }
    const maxEvents = Math.floor(available / ObcDateItem._EVENT_HEIGHT);
    if (this._maxVisibleEvents !== maxEvents) {
      this._maxVisibleEvents = maxEvents;
    }
  }

  @state() private _pressing = false;

  private _handleDateClick(e?: Event) {
    if (this.disabled) return;
    // Don't fire date-click if clicking on an event-item (it handles its own click)
    if (e?.target !== e?.currentTarget) {
      const target = e?.target as HTMLElement;
      if (target?.closest('obc-event-item')) {
        return;
      }
    }
    this.dispatchEvent(
      new CustomEvent('date-click', {
        bubbles: true,
        composed: true,
        detail: {
          date: this.date,
          events: this.events,
          isToday: this.isToday,
          checked: this.checked,
        },
      })
    );
  }

  private _handleKeyDown(e: KeyboardEvent) {
    if (this.disabled) return;
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      this._pressing = true;
      this._handleDateClick();
      // Reset pressing state after a brief moment
      setTimeout(() => {
        this._pressing = false;
      }, 150);
    }
  }

  /**
   * Get the events to display, applying auto-aggregation if needed.
   * Returns an object with visibleEvents and aggregatedCount.
   */
  private _getDisplayEvents(): {
    visibleEvents: DateItemEvent[];
    aggregatedCount: number;
  } {
    const baseEvents =
      this.eventCount > 0 ? this.events.slice(0, this.eventCount) : this.events;

    // If auto-aggregation is not active or we're in small mode, show all events
    if (
      this._maxVisibleEvents === null ||
      this.size !== DateItemSize.Large ||
      baseEvents.length === 0
    ) {
      return {visibleEvents: baseEvents, aggregatedCount: 0};
    }

    const totalEvents = baseEvents.length;

    // If all events fit, show them all
    if (totalEvents <= this._maxVisibleEvents) {
      return {visibleEvents: baseEvents, aggregatedCount: 0};
    }

    // If we need to aggregate, reserve one slot for the "X events" row
    // Show (maxVisible - 1) events + 1 aggregated row
    if (this._maxVisibleEvents <= 1) {
      // Only room for aggregated row
      return {visibleEvents: [], aggregatedCount: totalEvents};
    }

    const visibleCount = this._maxVisibleEvents - 1;
    const visibleEvents = baseEvents.slice(0, visibleCount);
    const aggregatedCount = totalEvents - visibleCount;

    return {visibleEvents, aggregatedCount};
  }

  override render() {
    const {visibleEvents, aggregatedCount} = this._getDisplayEvents();
    const totalEventCount = this.events.length;

    const eventText =
      totalEventCount === 0
        ? '0 events'
        : totalEventCount === 1
          ? '1 event'
          : `${totalEventCount} events`;

    const isSmallSize = this.size === DateItemSize.Small;
    const hasAnyEvents = this.events.length > 0;
    const wrapperClasses = {
      wrapper: true,
      [`size-${this.size}`]: true,
      [`has-events`]: hasAnyEvents,
      disabled: this.disabled,
      isToday: this.isToday,
      checked: this.checked,
      pressing: this._pressing,
    };

    // Small size: use button element (no nested buttons)
    if (isSmallSize) {
      return html`
        <button
          type="button"
          class=${classMap(wrapperClasses)}
          aria-label="Date ${this.date}, ${eventText}"
          ?disabled=${this.disabled}
          @click=${this._handleDateClick}
        >
          <div class="date-container">
            <div class="date" aria-hidden="true">${this.date}</div>
            ${hasAnyEvents
              ? html`<div class="event-dot" aria-hidden="true"></div>`
              : nothing}
          </div>
        </button>
      `;
    }

    // Large size: use div element (contains nested event buttons)
    return html`
      <div
        role="button"
        tabindex=${this.disabled ? '-1' : '0'}
        class=${classMap(wrapperClasses)}
        aria-label="Date ${this.date}, ${eventText}"
        aria-disabled=${this.disabled ? 'true' : 'false'}
        @click=${this._handleDateClick}
        @keydown=${this._handleKeyDown}
      >
        <div class="header-container">
          ${this.isToday ? html`<div class="today-label">Today</div>` : nothing}
          <div class="date-item-small">
            <div class="date-container">
              <div class="date" aria-hidden="true">${this.date}</div>
            </div>
          </div>
        </div>

        ${hasAnyEvents
          ? html`
              <div class="content-container">
                ${repeat(
                  visibleEvents,
                  (event, index) =>
                    `${event.title}-${event.startTime}-${event.endTime}-${index}`,
                  (event) => html`
                    <obc-event-item
                      .title=${event.title}
                      .description=${event.description ?? ''}
                      .startTime=${event.startTime}
                      .endTime=${event.endTime}
                      .eventItemType=${event.eventItemType ??
                      EventItemType.SingleLine}
                      .hasArrow=${event.hasArrow ?? false}
                      .hasTime=${event.hasTime ?? false}
                      .hasEndTime=${event.hasEndTime ?? false}
                      .aggregatedCount=${event.aggregatedCount ?? 0}
                      .colorCoded=${event.colorCoded ?? false}
                      .disabled=${this.disabled || !!event.disabled}
                    ></obc-event-item>
                  `
                )}
                ${aggregatedCount > 0
                  ? html`
                      <obc-event-item
                        .eventItemType=${EventItemType.Aggregated}
                        .aggregatedCount=${aggregatedCount}
                        ?disabled=${this.disabled}
                      ></obc-event-item>
                    `
                  : nothing}
              </div>
            `
          : nothing}
      </div>
    `;
  }

  static override styles = unsafeCSS(componentStyle);
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-date-item': ObcDateItem;
  }
}
