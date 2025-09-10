import {LitElement, html, nothing, unsafeCSS} from 'lit';
import {customElement} from '../../decorator.js';
import compentStyle from './chat-message.css?inline';
import {property} from 'lit/decorators.js';
import {classMap} from 'lit/directives/class-map.js';

export enum ObcChatMessagePosition {
  Top = 'top',
  Middle = 'middle',
  Bottom = 'bottom',
  Single = 'single',
}

@customElement('obc-chat-message')
export class ObcChatMessage extends LitElement {
  @property({type: String}) name!: string;
  @property({type: Boolean}) showName: boolean = false;
  @property({attribute: false}) date!: Date;
  @property({type: Boolean}) showDate: boolean = false;
  @property({type: String}) position: ObcChatMessagePosition =
    ObcChatMessagePosition.Single;
  @property({attribute: false}) dateFormatter: (date: Date) => string = (
    date: Date
  ) =>
    date.toLocaleTimeString(undefined, {
      hour12: false,
      minute: '2-digit',
      hour: '2-digit',
    });
  @property({type: Boolean}) self: boolean = false;

  override render() {
    const round =
      this.position === ObcChatMessagePosition.Single &&
      !this.showDate &&
      !this.showName;
    return html` <div
      class=${classMap({
        wrapper: true,
        self: this.self,
        other: !this.self,
        [this.position]: true,
        round,
      })}
    >
      ${this.showName || this.showDate
        ? html`<div class="header">
            ${this.showName
              ? html`<div class="name">${this.name}</div>`
              : nothing}
            ${this.showDate
              ? html`<div class="date">
                  ${this.date !== undefined
                    ? this.dateFormatter(this.date)
                    : nothing}
                </div>`
              : nothing}
          </div>`
        : nothing}
      <div class="content">
        <slot></slot>
      </div>
    </div>`;
  }

  static override styles = unsafeCSS(compentStyle);
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-chat-message': ObcChatMessage;
  }
}
