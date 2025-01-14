import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-navigation-route')
export class ObiNavigationRoute extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M11.1961 12.8039C10.2557 12.8623 9.3344 13.2514 8.61784 13.9679L4.46376 18.122L5.87797 19.5362L10.0321 15.3822C10.7486 14.6656 11.1377 13.7443 11.1961 12.8039ZM13 11C10.9983 10.4654 8.774 10.9834 7.20363 12.5537L1.63533 18.122L5.87797 22.3647L11.4463 16.7964C13.0166 15.226 13.5346 13.0017 13 11Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M16.4573 8.95719L14.9573 10.4572L13.5431 9.04298L15.0431 7.54298L16.4573 8.95719ZM19.4573 5.95719L17.9573 7.45719L16.5431 6.04298L18.0431 4.54297L19.4573 5.95719ZM22.4573 2.95718L20.9573 4.45718L19.5431 3.04297L21.0431 1.54297L22.4573 2.95718Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M11.1961 12.8039C10.2557 12.8623 9.3344 13.2514 8.61784 13.9679L4.46376 18.122L5.87797 19.5362L10.0321 15.3822C10.7486 14.6656 11.1377 13.7443 11.1961 12.8039ZM13 11C10.9983 10.4654 8.774 10.9834 7.20363 12.5537L1.63533 18.122L5.87797 22.3647L11.4463 16.7964C13.0166 15.226 13.5346 13.0017 13 11Z" style="fill: var(--element-active-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M16.4573 8.95719L14.9573 10.4572L13.5431 9.04298L15.0431 7.54298L16.4573 8.95719ZM19.4573 5.95719L17.9573 7.45719L16.5431 6.04298L18.0431 4.54297L19.4573 5.95719ZM22.4573 2.95718L20.9573 4.45718L19.5431 3.04297L21.0431 1.54297L22.4573 2.95718Z" style="fill: var(--element-active-color)"/>
</svg>
`;

  override render() {
    return html`
      <div class="wrapper" >
        ${this.useCssColor? this.iconCss : this.icon}
      </div>
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