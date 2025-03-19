import {LitElement, html, nothing, unsafeCSS} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import compentStyle from './notification-message.css?inline';
import {classMap} from 'lit/directives/class-map.js';

export enum ObcNotificationMessageAction {
  TextButton = 'text-button',
  IconButton = 'icon-button',
  None = 'none',
}

@customElement('obc-notification-message')
export class ObcNotificationMessage extends LitElement {
  @property({type: Boolean}) large = false;
  @property({type: Boolean}) empty = false;
  @property({type: String}) action = ObcNotificationMessageAction.None;

  override render() {
    return html`
      <div
        class=${classMap({
          wrapper: true,
          empty: this.empty,
          large: this.large,
        })}
      >
        <button class="message-item">
          <div class="icon primary">
            <slot name="primary-icon"></slot>
          </div>
          <div class="icon secondary">
            <slot name="secondary-icon"></slot>
          </div>
          <div class="title">
            <slot name="title"></slot>
          </div>
          <div class="description">
            <slot name="description"></slot>
          </div>
          <div class="time">
            <slot name="time"></slot>
          </div>
          ${this.empty ? html`<slot name="empty"></slot>` : null}
        </button>
        ${this.action === ObcNotificationMessageAction.None
          ? nothing
          : html`
              <button class="action">
                ${this.action === ObcNotificationMessageAction.IconButton
                  ? html`<slot name="action-label"></slot>`
                  : html`<slot name="action-text"></slot>`}
              </button>
            `}
      </div>
    `;
  }

  static override styles = unsafeCSS(compentStyle);
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-notification-message': ObcNotificationMessage;
  }
}
