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

  @property({type: String}) size = DateItemSize.Small;
  @property({type: Boolean}) enabled = true;
  @property({type: String}) type = DateItemType.Today;

  override render() {
    return html`
   
      <div class=${classMap({
        wrapper: true,
        [`type-${this.type}`]: true,
        [`state-${this.enabled}`]: true,
        [`size-${this.size}`]: true,
      })}>
        <div class="date-item-small">
          <div class="date-container">
            <div class="date">10</div>
            <div class="event-container">
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

        <div class="content-container">
          <div class="event-container01">
            <p>Event</p>
            <p>Description</p>
          </div>
          <div class="event-container02">
            <p>Event</p>
            <p>Description</p>
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
