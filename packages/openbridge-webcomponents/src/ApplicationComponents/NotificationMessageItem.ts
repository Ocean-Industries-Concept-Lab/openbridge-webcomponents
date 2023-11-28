import { LitElement, unsafeCSS, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import compentStyle from "./NotificationMessageItem.css?inline";

@customElement('ob-notification-message-item')
export class NotificationMessageItem extends LitElement {
  @property({ type: String }) time = "2021-01-01T11:11:11.111Z"

  render() {
    const date = new Date(this.time);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    const hoursString = hours < 10 ? `0${hours}` : `${hours}`;
    const minutesString = minutes < 10 ? `0${minutes}` : `${minutes}`;
    const secondsString = seconds < 10 ? `0${seconds}` : `${seconds}`;

  return html`
    <div class="wrapper">
    <div class="icon"><slot name="icon"></slot></div>
    <div class="message"><slot name="message"></slot></div>
    <div class="time">
      ${hoursString}<span class="time-divider">:</span>
      ${minutesString}<span class="time-divider">:</span>
      ${secondsString}
      </div>
    </div>
  `
  }

  static styles = unsafeCSS(compentStyle);
}

declare global {
  interface HTMLElementTagNameMap {
  'ob-notification-message-item': NotificationMessageItem
  }
}
