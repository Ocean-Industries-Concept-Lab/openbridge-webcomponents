import { LitElement, unsafeCSS, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import compentStyle from "./NavigationItem.css?inline";
import { iconsUrl } from '../icons';

@customElement('ob-navigation-item')
export class NavigationItem extends LitElement {

  @property({ type: String }) icon = 'placeholder'
  @property({ type: String }) label = 'Label'
  @property({ type: String }) href = '#'
  @property({ type: Boolean }) checked = false

  render() {
    const icon = iconsUrl[this.icon];
    return html`
      <a class="wrapper" ?checked=${this.checked} href="${this.href}">
        <span class="icon">
            ${icon}
        </span>
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
