import { LitElement, unsafeCSS, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import compentStyle from "./NavigationItem.css?inline";
import "../icon/Icon";

@customElement('ob-navigation-item')
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
        <ob-icon icon=${this.icon} class="icon">
        </ob-icon>
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
    'ob-navigation-item': NavigationItem
  }
}
