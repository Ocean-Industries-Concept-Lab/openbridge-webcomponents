import { LitElement, html, unsafeCSS } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import iconStyle from "./IconButton.css?inline";
import "../icon/Icon"

@customElement('ob-icon-button')
export class IconButton extends LitElement {
  @property({ type: String }) icon = '01-placeholder'
  @property({ type: String }) variant = "normal"
  @property({ type: String }) size = "regular"

  render() {
    return html`
      <button class="wrapper variant-${this.variant} size-${this.size}">
        <div class="visible-wrapper">
          <ob-icon icon=${this.icon} class="icon"></ob-icon>
        </div>
      </button>
    `
  }

  static styles = unsafeCSS(iconStyle)
}

declare global {
  interface HTMLElementTagNameMap {
    'ob-icon-button': IconButton
  }
}
