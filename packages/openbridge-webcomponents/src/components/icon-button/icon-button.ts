import { LitElement, html, unsafeCSS } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import iconStyle from "./icon-button.css?inline";
import "../icon/icon"
import { classMap } from 'lit/directives/class-map.js';

@customElement('ob-icon-button')
export class IconButton extends LitElement {
  @property({ type: String }) icon = '01-placeholder'
  @property({ type: String }) variant = "normal"
  @property({ type: String }) size = "regular"
  @property({ type: Boolean }) cornerLeft = false
  @property({ type: Boolean }) cornerRight = false
  @property({ type: Boolean, attribute: "active-color" }) activeColor = false

  render() {
    return html`
      <button class=${
        classMap({
          "wrapper": true,
          ["variant-"+this.variant]: true,
          ["size-"+this.size]: true,
          "corner-left": this.cornerLeft,
          "corner-right": this.cornerRight,
          "active-color": this.activeColor
        })
      }>
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
