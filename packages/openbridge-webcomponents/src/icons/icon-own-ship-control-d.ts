import {LitElement, html, css, svg} from 'lit';
import {property} from 'lit/decorators.js';
import {customElement} from '../decorator.js';

@customElement('obi-own-ship-control-d')
export class ObiOwnShipControlD extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_7025_3085)">
<path d="M11.9043 8.86035C12.4483 8.86036 12.9082 8.96016 13.2842 9.16016C13.6682 9.36016 13.9564 9.66799 14.1484 10.084C14.3404 10.4999 14.4365 11.0319 14.4365 11.6797C14.4365 12.6397 14.208 13.3598 13.752 13.8398C13.304 14.3198 12.6239 14.5596 11.7119 14.5596H10.8838V8.86035H11.9043Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M12 4C16.4183 4 20 7.58172 20 12C20 16.4183 16.4183 20 12 20C7.58172 20 4 16.4183 4 12C4 7.58172 7.58172 4 12 4ZM9.15625 7.43164V16H11.5684C12.5522 16 13.392 15.8357 14.0879 15.5078C14.7839 15.1798 15.3166 14.6919 15.6846 14.0439C16.0525 13.396 16.2363 12.5917 16.2363 11.6318C16.2363 10.712 16.0525 9.94405 15.6846 9.32812C15.3246 8.70413 14.8162 8.23211 14.1602 7.91211C13.5042 7.59212 12.728 7.43164 11.832 7.43164H9.15625Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M12 0C18.6274 0 24 5.37258 24 12C24 18.6274 18.6274 24 12 24C5.37258 24 0 18.6274 0 12C0 5.37258 5.37258 0 12 0ZM12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2Z" fill="currentColor"/>
</g>
<defs>
<clipPath id="clip0_7025_3085">
<rect width="24" height="24" fill="currentColor"/>
</clipPath>
</defs>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_7025_3085)">
<path d="M11.9043 8.86035C12.4483 8.86036 12.9082 8.96016 13.2842 9.16016C13.6682 9.36016 13.9564 9.66799 14.1484 10.084C14.3404 10.4999 14.4365 11.0319 14.4365 11.6797C14.4365 12.6397 14.208 13.3598 13.752 13.8398C13.304 14.3198 12.6239 14.5596 11.7119 14.5596H10.8838V8.86035H11.9043Z" style="fill: var(--element-active-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M12 4C16.4183 4 20 7.58172 20 12C20 16.4183 16.4183 20 12 20C7.58172 20 4 16.4183 4 12C4 7.58172 7.58172 4 12 4ZM9.15625 7.43164V16H11.5684C12.5522 16 13.392 15.8357 14.0879 15.5078C14.7839 15.1798 15.3166 14.6919 15.6846 14.0439C16.0525 13.396 16.2363 12.5917 16.2363 11.6318C16.2363 10.712 16.0525 9.94405 15.6846 9.32812C15.3246 8.70413 14.8162 8.23211 14.1602 7.91211C13.5042 7.59212 12.728 7.43164 11.832 7.43164H9.15625Z" style="fill: var(--element-active-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M12 0C18.6274 0 24 5.37258 24 12C24 18.6274 18.6274 24 12 24C5.37258 24 0 18.6274 0 12C0 5.37258 5.37258 0 12 0ZM12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2Z" style="fill: var(--element-active-color)"/>
</g>
<defs>
<clipPath id="clip0_7025_3085">
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
    'obi-own-ship-control-d': ObiOwnShipControlD;
  }
}
