import { LitElement, html, unsafeCSS } from 'lit'
import { customElement } from '../../decorator.js'
import compentStyle from "./date-item.css?inline";
import { property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';

export enum DateItemType {
  Today = "today",
  Checked = "checked",
  Unchecked = "unchecked"
}

export enum DateItemSize {
  Small = "small",
  Large = "large"
}

@customElement('obc-date-item')
export class ObcDateItem extends LitElement {

  @property({ type: String }) size = DateItemSize.Small;
  @property({ type: Boolean }) enabled = true;
  @property({ type: String }) type = DateItemType.Today;
  @property({ type: Boolean }) hasEvent = false;
  @property({ type: Boolean }) moreEvent = false;
  @property({ type: String }) eventTitle1 = 'Event';
  @property({ type: String }) eventDescription1 = 'Description';
  @property({ type: String }) eventTitle2 = 'Event';
  @property({ type: String }) eventDescription2 = 'Description';


  override render() {
    const eventCount = this.hasEvent ? (this.moreEvent ? 2 : 1) : 0;
    const eventText = eventCount === 0 ? 'No events' :
      eventCount === 1 ? '1 event' :
        'Multiple events';

    return html`
   
      <div class=${classMap({
      wrapper: true,
      [`type-${this.type}`]: true,
      [`state-${this.enabled}`]: true,
      [`size-${this.size}`]: true,
      [`hasEvent-${this.hasEvent}`]: true,
      [`moreEvent-${this.moreEvent}`]: true,
    })}
      role="button"
      tabindex="0"
      aria-label="Date 10, ${eventText}"
      aria-disabled=${!this.enabled}>
        <div class="date-item-small">
          <div class="date-container">
            <div class="date" aria-hidden="true">10</div>
            <div class="event-container" 
                 aria-hidden="true"
                 aria-label=${eventText}>
              <div class="event01">
                <svg xmlns="http://www.w3.org/2000/svg" width="4" height="4" viewBox="0 0 4 4" fill="none">
                  <circle cx="2" cy="2" r="2" fill="#335483"/>
                </svg>
              </div>
              <div class="event02">
                <svg xmlns="http://www.w3.org/2000/svg" width="4" height="4" viewBox="0 0 4 4" fill="none">
                  <circle cx="2" cy="2" r="2" fill="#335483"/>
                </svg>
              </div>
            </div>
            </div>
        </div>

        <div class="content-container" aria-hidden="true">
          <div class="event-container01">
            <p>${this.eventTitle1}</p>
            <p>${this.eventDescription1}</p>
          </div>
          <div class="event-container02">
            <p>${this.eventTitle2}</p>
            <p>${this.eventDescription2}</p>
          </div>
        </div>
      </div>
      `
  }

  static override styles = unsafeCSS(compentStyle);
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-date-item': ObcDateItem
  }
}
