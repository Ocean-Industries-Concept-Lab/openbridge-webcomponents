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
  color?: string;
  disabled?: boolean;
}

/**
 * `<obc-event-item>` - An event item component used within `obc-date-item`.
 * Displays event details such as time, title, description, and optional arrow.
 * Supports different types like SingleLine, DoubleLine, and Aggregated.
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
  @property({type: String}) color = '';
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
    const isColorCoded = !!this.color;

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
