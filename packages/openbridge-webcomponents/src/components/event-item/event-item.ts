import { LitElement, html, unsafeCSS } from 'lit'
import { customElement } from '../../decorator.js'
import compentStyle from "./event-item.css?inline";
import { property } from 'lit/decorators.js';

export enum EventItemType {
  SingleLine = "single-line",
  MultiLine = "multi-line"
}

@customElement('obc-event-item')
export class ObcEventItem extends LitElement {
  @property({type: Boolean}) enabled = true;
  @property({type: EventItemType}) type = "single-line";
  @property({type: Boolean}) hasDescription = true;
  @property({type: String}) event = "";
  @property({type: String}) description = "";
  @property({type: String}) time = "00:00";
  

  private static readonly TIME_REGEX = /^([01]\d|2[0-3]):([0-5]\d)$/;

  override updated(changedProps: Map<string, unknown>) {
    if (changedProps.has("time") && !ObcEventItem.TIME_REGEX.test(this.time)) {
      this.time = "00:00";
    }
  }

  override render() {
    return html`
      <div class="wrapper">
        <div class="time-container">
          <div class="time">${this.time}</div>
        </div>
        <div class="label-container">
          <p class="event">${this.event}</p>
          <p class="description">${this.description}</p>
        </div>
        <div class="arrow-flyout-google"></div>
      </div>
      `
  }

static override styles = unsafeCSS(compentStyle);
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-event-item': ObcEventItem
  }
}
