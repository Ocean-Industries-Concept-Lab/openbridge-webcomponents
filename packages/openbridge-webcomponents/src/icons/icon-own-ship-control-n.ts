import {LitElement, html, css, svg} from 'lit';
import {property} from 'lit/decorators.js';
import {customElement} from '../decorator.js';

@customElement('obi-own-ship-control-n')
export class ObiOwnShipControlN extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_7025_3080)">
<path fill-rule="evenodd" clip-rule="evenodd" d="M12 4C16.4183 4 20 7.58172 20 12C20 16.4183 16.4183 20 12 20C7.58172 20 4 16.4183 4 12C4 7.58172 7.58172 4 12 4ZM8.25195 7.43164V16H9.7998V11.8838C9.79181 11.6759 9.78436 11.4677 9.77637 11.2598C9.76837 11.052 9.75621 10.8482 9.74023 10.6484C9.73224 10.4405 9.72382 10.2361 9.71582 10.0361C9.70782 9.83622 9.70038 9.64016 9.69238 9.44824H9.74023L13.5684 16H15.752V7.43164H14.1924V11.5723C14.2004 11.7721 14.2078 11.972 14.2158 12.1719C14.2238 12.3719 14.2275 12.5725 14.2275 12.7725C14.2355 12.9643 14.244 13.1605 14.252 13.3604C14.2599 13.5522 14.2684 13.74 14.2764 13.9238H14.2402L10.4238 7.43164H8.25195Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M12 0C18.6274 0 24 5.37258 24 12C24 18.6274 18.6274 24 12 24C5.37258 24 0 18.6274 0 12C0 5.37258 5.37258 0 12 0ZM12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2Z" fill="currentColor"/>
</g>
<defs>
<clipPath id="clip0_7025_3080">
<rect width="24" height="24" fill="currentColor"/>
</clipPath>
</defs>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_7025_3080)">
<path fill-rule="evenodd" clip-rule="evenodd" d="M12 4C16.4183 4 20 7.58172 20 12C20 16.4183 16.4183 20 12 20C7.58172 20 4 16.4183 4 12C4 7.58172 7.58172 4 12 4ZM8.25195 7.43164V16H9.7998V11.8838C9.79181 11.6759 9.78436 11.4677 9.77637 11.2598C9.76837 11.052 9.75621 10.8482 9.74023 10.6484C9.73224 10.4405 9.72382 10.2361 9.71582 10.0361C9.70782 9.83622 9.70038 9.64016 9.69238 9.44824H9.74023L13.5684 16H15.752V7.43164H14.1924V11.5723C14.2004 11.7721 14.2078 11.972 14.2158 12.1719C14.2238 12.3719 14.2275 12.5725 14.2275 12.7725C14.2355 12.9643 14.244 13.1605 14.252 13.3604C14.2599 13.5522 14.2684 13.74 14.2764 13.9238H14.2402L10.4238 7.43164H8.25195Z" style="fill: var(--element-active-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M12 0C18.6274 0 24 5.37258 24 12C24 18.6274 18.6274 24 12 24C5.37258 24 0 18.6274 0 12C0 5.37258 5.37258 0 12 0ZM12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2Z" style="fill: var(--element-active-color)"/>
</g>
<defs>
<clipPath id="clip0_7025_3080">
<rect width="24" height="24" fill="none"/>
</clipPath>
</defs>
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
    'obi-own-ship-control-n': ObiOwnShipControlN;
  }
}
