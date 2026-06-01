import {LitElement, html, nothing, unsafeCSS} from 'lit';
import {customElement} from '../../decorator.js';
import componentStyle from './event-item.css?inline';
import {property, state} from 'lit/decorators.js';
import {classMap} from 'lit/directives/class-map.js';
import '../../icons/icon-arrow-flyout-google.js';

export enum EventItemType {
  SingleLine = 'singleLine',
  DoubleLine = 'doubleLine',
  Aggregated = 'aggregated',
}

export interface DateItemEvent {
  title: string;
  description?: string;
  startTime: string;
  endTime: string;
  eventItemType?: EventItemType;
  hasArrow?: boolean;
  hasTime?: boolean;
  hasEndTime?: boolean;
  aggregatedCount?: number;
  colorCoded?: boolean;
  disabled?: boolean;
}

/**
 * `<obc-event-item>` – A single event entry component for calendar and scheduling interfaces.
 *
 * @summary Displays event details such as time, title, description, and optional navigation arrow.
 * Used within `obc-date-item` and `obc-event-list` to render individual events.
 *
 * **Synonyms:** event item, calendar entry, schedule item, appointment item, agenda entry
 *
 * ### Features / Variants
 * - **SingleLine:** Compact display showing time and title on a single line.
 * - **DoubleLine:** Extended display with title and description on separate lines.
 * - **Aggregated:** Shows a count of additional events (e.g., "3 more events").
 * - **Color Coded:** Optional blue background styling for visual categorization.
 * - **Disabled State:** Visually muted and non-interactive.
 * - **Arrow Indicator:** Optional flyout arrow for navigation or drill-down.
 *
 * ### Usage Guidelines
 * - Use `SingleLine` for compact event lists where space is limited.
 * - Use `DoubleLine` when event descriptions provide important context.
 * - Use `Aggregated` to indicate overflow events that don't fit in the available space.
 * - Set `colorCoded` to true for visually distinct events.
 * - Set `hasArrow` to true when the event can be clicked to navigate to details.
 *
 * ### Slots
 * This component does not use slots. All content is provided via properties.
 *
 * ### Events
 * | Event Name    | Detail                                              | Description                          |
 * |---------------|-----------------------------------------------------|--------------------------------------|
 * | `event-click` | `{ title: string, startTime: string, endTime: string }` | Fired when the event item is clicked. |
 *
 * ### Best Practices
 * - Keep titles concise as they may be truncated.
 * - Use `hasTime` and `hasEndTime` to control time display.
 * - For aggregated items, set `aggregatedCount` to indicate the number of hidden events.
 *
 * ### Example
 * ```html
 * <obc-event-item
 *   title="Team Meeting"
 *   startTime="09:00"
 *   endTime="10:00"
 *   .eventItemType=${'singleLine'}
 *   hasTime
 *   hasEndTime
 *   hasArrow
 *   @event-click=${(e) => console.log('Event clicked:', e.detail)}
 * ></obc-event-item>
 * ```
 *
 * @fires {CustomEvent<{title: string, startTime: string, endTime: string}>} event-click - Fired when the event item is clicked. Contains event title, start time, and end time.
 * @slot - No slots. All content is provided via properties.
 */
@customElement('obc-event-item')
export class ObcEventItem extends LitElement {
  @property({type: String}) override title = '';
  @property({type: String}) description = '';
  @property({type: String}) startTime = '';
  @property({type: String}) endTime = '';
  @property({type: String}) eventItemType = EventItemType.SingleLine;
  @property({type: Boolean}) hasArrow = false;
  @property({type: Boolean}) hasTime = false;
  @property({type: Boolean}) hasEndTime = false;
  @property({type: Number}) aggregatedCount = 0;
  @property({type: Boolean}) colorCoded = false;
  @property({type: Boolean}) disabled = false;

  @state() private _pressing = false;

  private _handleClick(e: MouseEvent) {
    e.stopPropagation();
    this.dispatchEvent(
      new CustomEvent('event-click', {
        bubbles: true,
        composed: true,
        detail: {
          title: this.title,
          startTime: this.startTime,
          endTime: this.endTime,
        },
      })
    );
  }

  private _getAggregatedText(): string {
    const count = this.aggregatedCount ?? 0;
    return count === 1 ? '1 more event' : `${count} more events`;
  }

  private _handleKeyDown(e: KeyboardEvent) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.stopPropagation();
      this._pressing = true;
      setTimeout(() => {
        this._pressing = false;
      }, 150);
    }
  }

  override render() {
    const isAggregated = this.eventItemType === EventItemType.Aggregated;
    const isDoubleLine = this.eventItemType === EventItemType.DoubleLine;
    const isColorCoded = this.colorCoded;

    return html`
      <button
        type="button"
        @click=${this._handleClick}
        @keydown=${this._handleKeyDown}
        class=${classMap({
          wrapper: true,
          'type-aggregated': isAggregated,
          'type-double-line': isDoubleLine,
          'type-color-coded': isColorCoded,
          disabled: this.disabled,
          pressing: this._pressing,
        })}
        ?disabled=${this.disabled}
      >
        <div class="visible-wrapper">
          <div class="event-content">
            ${this.hasTime && this.startTime
              ? html`
                  <div class="time-container">
                    <span class="time">${this.startTime}</span>
                    ${this.hasEndTime && this.endTime
                      ? html`
                          <span class="time-separator">–</span>
                          <span class="time">${this.endTime}</span>
                        `
                      : nothing}
                  </div>
                `
              : nothing}
            <div class="label-container">
              <div class="title-container">
                <p class="title">
                  ${isAggregated ? this._getAggregatedText() : this.title}
                </p>
              </div>
              ${isDoubleLine && this.description
                ? html`
                    <div class="description-container">
                      <p class="description">${this.description}</p>
                    </div>
                  `
                : nothing}
            </div>
          </div>
          ${this.hasArrow
            ? html`<div class="arrow">
                <obi-arrow-flyout-google></obi-arrow-flyout-google>
              </div>`
            : nothing}
        </div>
      </button>
    `;
  }

  static override styles = unsafeCSS(componentStyle);
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-event-item': ObcEventItem;
  }
}
