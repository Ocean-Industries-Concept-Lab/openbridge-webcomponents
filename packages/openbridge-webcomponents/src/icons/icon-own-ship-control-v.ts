import {LitElement, html, css, svg} from 'lit';
import {property} from 'lit/decorators.js';
import {customElement} from '../decorator.js';

@customElement('obi-own-ship-control-v')
export class ObiOwnShipControlV extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_7025_3078)">
<path fill-rule="evenodd" clip-rule="evenodd" d="M12 4C16.4183 4 20 7.58172 20 12C20 16.4183 16.4183 20 12 20C7.58172 20 4 16.4183 4 12C4 7.58172 7.58172 4 12 4ZM8.13867 7.43164L11.0547 16H12.9385L15.8662 7.43164H14.1143L12.459 12.5801C12.427 12.6841 12.3784 12.852 12.3145 13.084C12.2505 13.3158 12.187 13.5597 12.123 13.8154C12.0671 14.0634 12.0269 14.2799 12.0029 14.4639C11.9789 14.2799 11.9351 14.0634 11.8711 13.8154C11.8071 13.5596 11.7427 13.3159 11.6787 13.084C11.6228 12.8522 11.5751 12.6841 11.5352 12.5801L9.89062 7.43164H8.13867Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M12 0C18.6274 0 24 5.37258 24 12C24 18.6274 18.6274 24 12 24C5.37258 24 0 18.6274 0 12C0 5.37258 5.37258 0 12 0ZM12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2Z" fill="currentColor"/>
</g>
<defs>
<clipPath id="clip0_7025_3078">
<rect width="24" height="24" fill="currentColor"/>
</clipPath>
</defs>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_7025_3078)">
<path fill-rule="evenodd" clip-rule="evenodd" d="M12 4C16.4183 4 20 7.58172 20 12C20 16.4183 16.4183 20 12 20C7.58172 20 4 16.4183 4 12C4 7.58172 7.58172 4 12 4ZM8.13867 7.43164L11.0547 16H12.9385L15.8662 7.43164H14.1143L12.459 12.5801C12.427 12.6841 12.3784 12.852 12.3145 13.084C12.2505 13.3158 12.187 13.5597 12.123 13.8154C12.0671 14.0634 12.0269 14.2799 12.0029 14.4639C11.9789 14.2799 11.9351 14.0634 11.8711 13.8154C11.8071 13.5596 11.7427 13.3159 11.6787 13.084C11.6228 12.8522 11.5751 12.6841 11.5352 12.5801L9.89062 7.43164H8.13867Z" style="fill: var(--element-active-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M12 0C18.6274 0 24 5.37258 24 12C24 18.6274 18.6274 24 12 24C5.37258 24 0 18.6274 0 12C0 5.37258 5.37258 0 12 0ZM12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2Z" style="fill: var(--element-active-color)"/>
</g>
<defs>
<clipPath id="clip0_7025_3078">
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
    'obi-own-ship-control-v': ObiOwnShipControlV;
  }
}
