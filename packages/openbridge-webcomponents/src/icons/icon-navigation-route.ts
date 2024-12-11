import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-navigation-route')
export class ObiNavigationRoute extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M11.196 12.8039C10.2556 12.8623 9.33428 13.2514 8.61772 13.9679L4.46364 18.122L5.87785 19.5362L10.0319 15.3822C10.7485 14.6656 11.1376 13.7443 11.196 12.8039ZM12.9999 11C10.9982 10.4654 8.77388 10.9834 7.20351 12.5537L1.63521 18.122L5.87785 22.3647L11.4461 16.7964C13.0165 15.226 13.5344 13.0017 12.9999 11Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M16.4572 8.95719L14.9572 10.4572L13.543 9.04298L15.043 7.54298L16.4572 8.95719ZM19.4572 5.95719L17.9572 7.45719L16.543 6.04298L18.043 4.54297L19.4572 5.95719ZM22.4572 2.95718L20.9572 4.45718L19.543 3.04297L21.043 1.54297L22.4572 2.95718Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M11.196 12.8039C10.2556 12.8623 9.33428 13.2514 8.61772 13.9679L4.46364 18.122L5.87785 19.5362L10.0319 15.3822C10.7485 14.6656 11.1376 13.7443 11.196 12.8039ZM12.9999 11C10.9982 10.4654 8.77388 10.9834 7.20351 12.5537L1.63521 18.122L5.87785 22.3647L11.4461 16.7964C13.0165 15.226 13.5344 13.0017 12.9999 11Z" style="fill: var(--element-active-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M16.4572 8.95719L14.9572 10.4572L13.543 9.04298L15.043 7.54298L16.4572 8.95719ZM19.4572 5.95719L17.9572 7.45719L16.543 6.04298L18.043 4.54297L19.4572 5.95719ZM22.4572 2.95718L20.9572 4.45718L19.543 3.04297L21.043 1.54297L22.4572 2.95718Z" style="fill: var(--element-active-color)"/>
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
    'obi-navigation-route': ObiNavigationRoute;
  }
}
