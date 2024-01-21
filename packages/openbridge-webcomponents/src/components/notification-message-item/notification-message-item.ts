import {LitElement, html} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import compentStyle from './notification-message-item.style';
import {renderTime} from '../../time';

@customElement('obc-notification-message-item')
export class ObcNotificationMessageItem extends LitElement {
  @property({type: String}) time = '2021-01-01T11:11:11.111Z';

  override render() {
    const time = renderTime(new Date(this.time));

    return html`
      <div class="wrapper">
        <div class="icon"><slot name="icon"></slot></div>
        <div class="message"><slot name="message"></slot></div>
        <div class="time">${time}</div>
      </div>
    `;
  }

  static override styles = compentStyle;
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-notification-message-item': ObcNotificationMessageItem;
  }
}
