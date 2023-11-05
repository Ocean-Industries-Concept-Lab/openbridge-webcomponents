import { LitElement, html, unsafeCSS } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { iconsUrl } from '../icons'
import comonentStyle from "./ToggleButtonOption.css?inline";

@customElement('ob-toggle-button-option')
export class ToggleButtonOption extends LitElement {
  @property({ type: String }) icon = 'placeholder'
  @property({ type: String }) value = 'value'
  @property({ type: Boolean }) selected = false

  onClick() {
    this.dispatchEvent(new CustomEvent('selected', { detail: { value: this.value } }))
  }

  render() {
    const icon = iconsUrl[this.icon];
    if (icon == null) {
      throw new Error(`Icon ${this.icon} not found`)
    }

    return html`
      <button class="wrapper" ?selected=${this.selected} @click=${this.onClick}>
        <div class="icon">${icon}</div>
        <div class="label" ?selected=${this.selected}><slot></slot></div>
      </button>
    `
  }

  static styles = unsafeCSS(comonentStyle);
}

declare global {
  interface HTMLElementTagNameMap {
    'ob-toggle-button-option': ToggleButtonOption
  }
}
