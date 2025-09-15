import {LitElement, PropertyValues, html, nothing, unsafeCSS} from 'lit';
import {customElement} from '../../decorator.js';
import compentStyle from './date-item.css?inline';
import {property} from 'lit/decorators.js';
import {classMap} from 'lit/directives/class-map.js';

export enum DateItemType {
  Today = 'today',
  Checked = 'checked',
  Unchecked = 'unchecked',
}

export enum DateItemSize {
  Small = 'small',
  Large = 'large',
}

@customElement('obc-date-item')
export class ObcDateItem extends LitElement {
  @property({type: String}) size = DateItemSize.Small;
  @property({type: Boolean}) disabled = false;
  @property({type: String}) type = DateItemType.Today;
  @property({type: Number}) date = 1;
  @property({type: Boolean}) hasEvent = false;
  @property({type: Boolean}) moreEvent = false;
  @property({type: String}) eventTitle1 = 'Event';
  @property({type: String}) eventDescription1 = 'Description';
  @property({type: String}) eventTitle2 = 'Event';
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
      <div
        class=${classMap({
          wrapper: true,
          [`type-${this.type}`]: true,
          [`size-${this.size}`]: true,
          [`hasEvent-${this.hasEvent}`]: true,
          [`moreEvent-${this.moreEvent}`]: true,
          [`disabled`]: this.disabled,
        })}
        role="button"
        tabindex="0"
        aria-label="Date 10, ${eventText}"
        aria-disabled=${!this.disabled}
      >
        <div class="date-item-small">
          <div class="date-container">
            <div class="date" aria-hidden="true">${this.date}</div>
            <div class="event-dots" aria-hidden="true" aria-label=${eventText}>
              ${this.hasEvent
                ? html`
                    <div class="event-dot"></div>
                    ${this.moreEvent
                      ? html` <div class="event-dot"></div> `
                      : nothing}
                  `
                : nothing}
            </div>
          </div>
        </div>

        ${this.size == 'large' && this.hasEvent
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
                        <p class="description">${this.eventDescription2}</p>
                      </div>
                    `
                  : nothing}
              </div>
            `
          : nothing}
      </div>
    `;
  }
  static override styles = unsafeCSS(compentStyle);
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-date-item': ObcDateItem;
  }
}
