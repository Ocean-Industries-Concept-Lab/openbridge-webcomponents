import {LitElement, html, css, svg} from 'lit';
import {property} from 'lit/decorators.js';
import {customElement} from '../decorator.js';

@customElement('obi-own-ship-remote-v')
export class ObiOwnShipRemoteV extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M12 4C16.4183 4 20 7.58172 20 12C20 16.4183 16.4183 20 12 20C7.58172 20 4 16.4183 4 12C4 7.58172 7.58172 4 12 4ZM8.13867 7.43164L11.0547 16H12.9385L15.8662 7.43164H14.1143L12.459 12.5801C12.427 12.6841 12.3784 12.852 12.3145 13.084C12.2505 13.3158 12.187 13.5597 12.123 13.8154C12.0671 14.0634 12.0269 14.2799 12.0029 14.4639C11.9789 14.2799 11.9351 14.0634 11.8711 13.8154C11.8071 13.5596 11.7427 13.3159 11.6787 13.084C11.6228 12.8522 11.5751 12.6841 11.5352 12.5801L9.89062 7.43164H8.13867Z" fill="currentColor"/>
<path d="M2.76074 8.17285C2.25833 9.38589 2.00006 10.687 2 12C2.00006 13.3128 2.25845 14.6133 2.76074 15.8262L0.913086 16.5918C0.310214 15.1362 5.77178e-05 13.5755 0 12C5.77831e-05 10.4243 0.310089 8.86299 0.913086 7.40723L2.76074 8.17285Z" fill="currentColor"/>
<path d="M23.0869 7.40723C23.6899 8.86299 23.9999 10.4243 24 12C23.9999 13.5755 23.6898 15.1362 23.0869 16.5918L21.2393 15.8262C21.7416 14.6133 21.9999 13.3128 22 12C21.9999 10.687 21.7417 9.38589 21.2393 8.17285L23.0869 7.40723Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M12 4C16.4183 4 20 7.58172 20 12C20 16.4183 16.4183 20 12 20C7.58172 20 4 16.4183 4 12C4 7.58172 7.58172 4 12 4ZM8.13867 7.43164L11.0547 16H12.9385L15.8662 7.43164H14.1143L12.459 12.5801C12.427 12.6841 12.3784 12.852 12.3145 13.084C12.2505 13.3158 12.187 13.5597 12.123 13.8154C12.0671 14.0634 12.0269 14.2799 12.0029 14.4639C11.9789 14.2799 11.9351 14.0634 11.8711 13.8154C11.8071 13.5596 11.7427 13.3159 11.6787 13.084C11.6228 12.8522 11.5751 12.6841 11.5352 12.5801L9.89062 7.43164H8.13867Z" style="fill: var(--element-active-color)"/>
<path d="M2.76074 8.17285C2.25833 9.38589 2.00006 10.687 2 12C2.00006 13.3128 2.25845 14.6133 2.76074 15.8262L0.913086 16.5918C0.310214 15.1362 5.77178e-05 13.5755 0 12C5.77831e-05 10.4243 0.310089 8.86299 0.913086 7.40723L2.76074 8.17285Z" style="fill: var(--element-active-color)"/>
<path d="M23.0869 7.40723C23.6899 8.86299 23.9999 10.4243 24 12C23.9999 13.5755 23.6898 15.1362 23.0869 16.5918L21.2393 15.8262C21.7416 14.6133 21.9999 13.3128 22 12C21.9999 10.687 21.7417 9.38589 21.2393 8.17285L23.0869 7.40723Z" style="fill: var(--element-active-color)"/>
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
    'obi-own-ship-remote-v': ObiOwnShipRemoteV;
  }
}
