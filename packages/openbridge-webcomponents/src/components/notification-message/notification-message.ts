import {LitElement, unsafeCSS, html} from 'lit';
import {
  customElement,
  property,
  queryAssignedElements,
  state,
} from 'lit/decorators.js';
import compentStyle from './notification-message.style';
import {classMap} from 'lit/directives/class-map.js';

@customElement('obc-notification-message')
export class NotificationMessage extends LitElement {
  @property({type: Boolean}) large = false;

  @queryAssignedElements()
  message!: NodeListOf<HTMLElement>;
  @state() hasMessage = false;

  override firstUpdated() {
    this.hasMessage = this.message.length > 0;
  }

  override render() {
    return html`
      <div
        class=${classMap({
          wrapper: true,
          empty: !this.hasMessage,
          large: this.large,
        })}
      >
        <div class="message-wrapper">
          <slot></slot>
          ${!this.hasMessage
            ? html`<div class="empty-wapper"><slot name="empty"></slot></div>`
            : null}
        </div>
      </div>
    `;
  }

  static override styles = unsafeCSS(compentStyle);
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-notification-message': NotificationMessage;
  }
}
