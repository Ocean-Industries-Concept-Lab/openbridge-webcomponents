import {LitElement, html, nothing, unsafeCSS} from 'lit';
import {customElement} from '../../decorator.js';
import componentStyle from './event-list.css?inline';
import {property} from 'lit/decorators.js';
import {repeat} from 'lit/directives/repeat.js';
import {type DateItemEvent, EventItemType} from '../event-item/event-item.js';
import '../event-item/event-item.js';

export type {DateItemEvent};

/**
 * `<obc-event-list>` – A component that displays a list of events with a date header.
 *
 * @summary Shows a formatted date header (day, month, date, year) followed by a list of event items.
 * Reuses the `obc-event-item` component for each event entry.
 *
 * **Synonyms:** event list, schedule, agenda, appointment list, calendar events
 *
 * ### Example
 * ```html
 * <obc-event-list
 *   .date=${new Date(2025, 0, 11)}
 *   .events=${[
 *     {title: "Meeting", startTime: "07:00", endTime: "10:00", hasTime: true, hasEndTime: true, hasArrow: true},
 *     {title: "Review", startTime: "14:00", endTime: "15:00", hasTime: true, hasEndTime: true, hasArrow: true}
 *   ]}
 * ></obc-event-list>
 * ```
 *
 * ### Slots
 * This component does not use slots. All content is provided via properties.
 *
 * ### Events
 * This component does not emit custom events directly. Events from child `obc-event-item` components
 * bubble up and can be listened to on this component (e.g., `event-click`).
 *
 * ### Properties
 * - `date` (Date | number): The date to display in the header. Accepts Date object or timestamp.
 * - `events` (DateItemEvent[]): Array of events to display in the list.
 * - `showHeader` (boolean): Whether to show the date header. Default: `true`.
 * - `locale` (string): Locale for date formatting (e.g., 'en-US', 'nb-NO'). Uses browser default if not specified.
 *
 * @slot - No slots. All content is provided via properties.
 */
@customElement('obc-event-list')
export class ObcEventList extends LitElement {
  /**
   * Whether to hide the date header.
   * @default false
   */
  @property({type: Boolean, attribute: false}) showHeader: boolean = true;

  /**
   * The date to display in the header. The component will extract
   * day name, month name, date number, and year from this Date object.
   * Also accepts a timestamp (number) for compatibility with Storybook.
   */
  @property({attribute: false}) date: Date | number = new Date();

  /**
   * Array of events to display in the list.
   */
  @property({attribute: false}) events: DateItemEvent[] = [];

  /**
   * Locale for date formatting. Uses browser default if not specified.
   * @example 'en-US', 'nb-NO', 'de-DE'
   */
  @property({type: String}) locale?: string;

  /**
   * Get the normalized Date object (handles both Date and timestamp).
   */
  private get _normalizedDate(): Date {
    if (this.date instanceof Date) {
      return this.date;
    }
    return new Date(this.date);
  }

  /**
   * Get the formatted day name (e.g., "Saturday").
   */
  private get _dayName(): string {
    return this._normalizedDate.toLocaleDateString(this.locale, {
      weekday: 'long',
    });
  }

  /**
   * Get the formatted abbreviated month name (e.g., "Jan").
   */
  private get _monthName(): string {
    return this._normalizedDate.toLocaleDateString(this.locale, {
      month: 'short',
    });
  }

  /**
   * Get the date number (e.g., "11").
   */
  private get _dateNumber(): string {
    return this._normalizedDate.getDate().toString();
  }

  /**
   * Get the year (e.g., "2025").
   */
  private get _year(): string {
    return this._normalizedDate.getFullYear().toString();
  }

  override render() {
    return html`
      <div class="wrapper">
        ${this.showHeader
          ? html`
              <div class="title-container">
                <div class="label-container">
                  <div class="label">
                    <span class="day-container">
                      <span class="day">${this._dayName}</span>
                      <span class="comma">,</span>
                    </span>
                    <span class="date-container">
                      <span>${this._dateNumber}</span>
                      <span class="month">${this._monthName}</span>
                    </span>
                    <span class="year">${this._year}</span>
                  </div>
                </div>
              </div>
            `
          : nothing}
        <div class="content-container">
          <div class="event-container" role="list" aria-label="Events">
            ${repeat(
              this.events,
              (event, index) =>
                `${event.title}-${event.startTime}-${event.endTime}-${index}`,
              (event) => html`
                <obc-event-item
                  role="listitem"
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
                  .disabled=${event.disabled ?? false}
                ></obc-event-item>
              `
            )}
          </div>
        </div>
      </div>
    `;
  }

  static override styles = unsafeCSS(componentStyle);
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-event-list': ObcEventList;
  }
}
