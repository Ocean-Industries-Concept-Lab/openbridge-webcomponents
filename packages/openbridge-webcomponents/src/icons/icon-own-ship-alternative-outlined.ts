import {LitElement, html, css, svg} from 'lit';
import {property} from 'lit/decorators.js';
import {customElement} from '../decorator.js';

@customElement('obi-own-ship-alternative-outlined')
export class ObiOwnShipAlternativeOutlined extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12ZM20 12C20 16.4183 16.4183 20 12 20C7.58172 20 4 16.4183 4 12C4 7.58172 7.58172 4 12 4C16.4183 4 20 7.58172 20 12Z" fill="currentColor"/>
<path d="M7.03865 16.2869L11.4846 5.33535C11.6661 4.88821 12.3339 4.88822 12.5154 5.33536L16.9613 16.2869C17.1482 16.7473 16.6205 17.1744 16.1697 16.9277L12.2763 14.7964C12.1053 14.7029 11.8947 14.7029 11.7237 14.7964L7.8303 16.9277C7.37952 17.1744 6.85176 16.7473 7.03865 16.2869Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12ZM20 12C20 16.4183 16.4183 20 12 20C7.58172 20 4 16.4183 4 12C4 7.58172 7.58172 4 12 4C16.4183 4 20 7.58172 20 12Z" style="fill: var(--element-active-color)"/>
<path d="M7.03865 16.2869L11.4846 5.33535C11.6661 4.88821 12.3339 4.88822 12.5154 5.33536L16.9613 16.2869C17.1482 16.7473 16.6205 17.1744 16.1697 16.9277L12.2763 14.7964C12.1053 14.7029 11.8947 14.7029 11.7237 14.7964L7.8303 16.9277C7.37952 17.1744 6.85176 16.7473 7.03865 16.2869Z" style="fill: var(--element-active-color)"/>
</svg>
`;

  override render() {
    return html`
      <div class="wrapper">${this.useCssColor ? this.iconCss : this.icon}</div>
    `;
  }

  static override styles = css`
    .wrapper {
      height: 100%;
      width: 100%;
      line-height: 0;
    }
    .wrapper > * {
      height: 100%;
      width: 100%;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    'obi-own-ship-alternative-outlined': ObiOwnShipAlternativeOutlined;
  }
}
