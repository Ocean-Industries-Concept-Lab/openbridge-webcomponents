import { LitElement, html, unsafeCSS } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import comonentStyle from "./toggle-button-option.css?inline";
import "../icon/icon"

@customElement('obc-toggle-button-option')
export class ToggleButtonOption extends LitElement {
  @property({ type: String }) icon = '01-placeholder'
  @property({ type: String }) value = 'value'
  @property({ type: Boolean }) selected = false

  onClick() {
    this.dispatchEvent(new CustomEvent('selected', { detail: { value: this.value } }))
  }

  render() {
    return html`
      <button class="wrapper" ?selected=${this.selected} @click=${this.onClick}>
        <obc-icon icon=${this.icon} class="icon"></obc-icon>
        <div class="label" ?selected=${this.selected}><slot></slot></div>
      </button>
    `
  }

  static styles = unsafeCSS(comonentStyle);
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-toggle-button-option': ToggleButtonOption
  }
}
