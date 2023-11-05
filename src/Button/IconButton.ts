import { LitElement, html, unsafeCSS } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { iconsUrl } from '../icons'
import iconStyle from "./IconButton.css?inline";

@customElement('ob-icon-button')
export class IconButton extends LitElement {
  @property({ type: String }) icon = 'placeholder'
  @property({ type: String }) variant = "normal"
  @property({ type: String }) size = "regular"

  render() {
    const icon = iconsUrl[this.icon];
    if (icon == null) {
      throw new Error(`Icon ${this.icon} not found`)
    }

    return html`
      <button class="wrapper variant-${this.variant} size-${this.size}">
        <div class="icon">${icon}</div>
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
