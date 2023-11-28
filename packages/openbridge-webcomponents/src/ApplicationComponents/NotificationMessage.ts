import { LitElement, unsafeCSS, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import compentStyle from "./NotificationMessage.css?inline";
import { classMap } from 'lit/directives/class-map.js';

@customElement('ob-notification-message')
export class NotificationMessage extends LitElement {
    @property({ type: Boolean}) empty = false;
    @property({ type: Boolean}) large = false;

  render() {
    return html`
        <div class=${classMap({
            'wrapper': true,
            'empty': this.empty,
            'large': this.large,
        })}>
            <div class='message-wrapper'>
                <slot></slot>
                ${this.empty ? html`<div class="empty-wapper"><slot name="empty"></slot></div>`: null }
            </div>
        </div>
    `
  }

  static styles = unsafeCSS(compentStyle);
}

declare global {
  interface HTMLElementTagNameMap {
    'ob-notification-message': NotificationMessage
  }
}
