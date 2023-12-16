import { LitElement, unsafeCSS, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import compentStyle from "./navigation-item.css?inline";
import "../icon/icon";

@customElement('obc-navigation-item')
export class NavigationItem extends LitElement {

  @property({ type: String }) icon = '01-placeholder'
  @property({ type: String }) label = 'Label'
  @property({ type: String }) href = '#'
  @property({ type: Boolean }) checked = false

  onClick() {
    dispatchEvent(new CustomEvent('click'));
  }

  render() {
    return html`
      <a class="wrapper" ?checked=${this.checked} href="${this.href}" @click=${this.onClick}>
        <obc-icon icon=${this.icon} class="icon">
        </obc-icon>
        <span class="label">
            ${this.label}
        </span>
    </a>
    `
  }

  static styles = unsafeCSS(compentStyle);
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-navigation-item': NavigationItem
  }
}
