import { LitElement, html, unsafeCSS } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import componentStyle from "./NotificationButton.css?inline";
import { classMap } from 'lit/directives/class-map.js';

@customElement('ob-notification-button')
export class NotificationButton extends LitElement {
  @property({ type: Boolean }) openRight = false
  @property({ type: Boolean }) openLeft = false
  @property({ type: Boolean }) icon = false
  @property({ type: Boolean }) disabled = false
  @property({ type: Boolean }) indent = false

  render() {
    return html`
      <button class=${classMap({wrapper: true, 'open-right': this.openRight, 'open-left': this.openLeft, icon: this.icon, indent: this.indent})}
        ?disabled=${this.disabled}
      >
        <div class="visible-wrapper">
          <slot></slot>
        </div>
      </button>
    `
  }

  static styles = unsafeCSS(componentStyle)
}

declare global {
  interface HTMLElementTagNameMap {
    'ob-notification-button': NotificationButton
  }
}
