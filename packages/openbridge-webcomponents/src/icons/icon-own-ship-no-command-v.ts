import {LitElement, html, css, svg} from 'lit';
import {property} from 'lit/decorators.js';
import {customElement} from '../decorator.js';

@customElement('obi-own-ship-no-command-v')
export class ObiOwnShipNoCommandV extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M12 4C16.4183 4 20 7.58172 20 12C20 16.4183 16.4183 20 12 20C7.58172 20 4 16.4183 4 12C4 7.58172 7.58172 4 12 4ZM11.0547 16H12.9385L15.8662 7.43164H14.1143L12.459 12.5801C12.427 12.6841 12.3784 12.852 12.3145 13.084C12.2505 13.3158 12.187 13.5597 12.123 13.8154C12.0671 14.0634 12.0269 14.2799 12.0029 14.4639C11.9789 14.2799 11.9351 14.0634 11.8711 13.8154C11.8071 13.5596 11.7427 13.3159 11.6787 13.084C11.6228 12.8522 11.5751 12.6841 11.5352 12.5801L9.89062 7.43164H8.13867L11.0547 16Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M12 4C16.4183 4 20 7.58172 20 12C20 16.4183 16.4183 20 12 20C7.58172 20 4 16.4183 4 12C4 7.58172 7.58172 4 12 4ZM11.0547 16H12.9385L15.8662 7.43164H14.1143L12.459 12.5801C12.427 12.6841 12.3784 12.852 12.3145 13.084C12.2505 13.3158 12.187 13.5597 12.123 13.8154C12.0671 14.0634 12.0269 14.2799 12.0029 14.4639C11.9789 14.2799 11.9351 14.0634 11.8711 13.8154C11.8071 13.5596 11.7427 13.3159 11.6787 13.084C11.6228 12.8522 11.5751 12.6841 11.5352 12.5801L9.89062 7.43164H8.13867L11.0547 16Z" style="fill: var(--element-active-color)"/>
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
    'obi-own-ship-no-command-v': ObiOwnShipNoCommandV;
  }
}
