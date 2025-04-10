import {LitElement, html, nothing, unsafeCSS} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import compentStyle from './notification-message.css?inline';
import {classMap} from 'lit/directives/class-map.js';

export enum ObcNotificationMessageAction {
  TextButton = 'text-button',
  IconButton = 'icon-button',
  IconNoClick = 'icon-no-click',
  None = 'none',
}

/**
 * Notification message component
 *
 * @fires message-click - Fired when the message is clicked
 * @fires action-click - Fired when the action is clicked
 */
@customElement('obc-notification-message')
export class ObcNotificationMessage extends LitElement {
  @property({type: Boolean}) large = false;
  @property({type: Boolean}) empty = false;
  @property({type: String}) action = ObcNotificationMessageAction.None;

  private onMessageClick() {
    this.dispatchEvent(new CustomEvent('message-click'));
  }

  private onActionClick() {
    this.dispatchEvent(new CustomEvent('action-click'));
  }

  override render() {
    return html`
      <div
        class=${classMap({
          wrapper: true,
          empty: this.empty,
          large: this.large,
          ['action-' + this.action]: true,
        })}
      >
        ${this.empty
          ? html`<div class="empty-message"><slot name="empty"></slot></div>`
          : html` <button
                class="message-item-touch"
                @click=${this.onMessageClick}
              >
                <div class="message-item">
                  <div class="icon-container">
                    <div class="icon primary">
                      <slot name="primary-icon"></slot>
                    </div>
                    <div class="icon secondary">
                      <slot name="secondary-icon"></slot>
                    </div>
                  </div>
                  <div class="content-container">
                    <div class="title-container">
                      <div class="title">
                        <slot name="title"></slot>
                      </div>
                      ${this.large
                        ? html`<div class="time">
                            <slot name="time"></slot>
                          </div>`
                        : nothing}
                    </div>
                    <div class="description">
                      <slot name="description"></slot>
                    </div>
                    <div class="spacer"></div>
                    ${this.large
                      ? nothing
                      : html`<div class="time"><slot name="time"></slot></div>`}
                  </div>
                </div>
              </button>
              ${this.action === ObcNotificationMessageAction.None
                ? nothing
                : this.action === ObcNotificationMessageAction.IconNoClick
                  ? html`<div
                      class="action-wrapper"
                      @click=${this.onActionClick}
                    >
                      <div class="action">
                        <slot name="action-icon"></slot>
                      </div>
                    </div>`
                  : html`
                      <button
                        class="action-wrapper"
                        @click=${this.onActionClick}
                      >
                        <div class="action">
                          ${this.action ===
                          ObcNotificationMessageAction.IconButton
                            ? html`<slot name="action-icon"></slot>`
                            : html`<slot name="action-text"></slot>`}
                        </div>
                      </button>
                    `}`}
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
