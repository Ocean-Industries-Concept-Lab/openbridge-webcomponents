import {LitElement, html, css, svg} from 'lit';
import {property} from 'lit/decorators.js';
import {customElement} from '../decorator.js';

@customElement('obi-own-ship-no-command-a')
export class ObiOwnShipNoCommandA extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M12.248 8.86035C12.312 9.06824 12.3765 9.27649 12.4404 9.48438C12.5043 9.68392 12.5558 9.84775 12.5957 9.97559L13.2559 12.04H10.9756L11.624 9.97559C11.656 9.88755 11.6999 9.74366 11.7559 9.54395C11.8198 9.33607 11.8843 9.12034 11.9482 8.89648C12.0122 8.66448 12.0635 8.46762 12.1035 8.30762C12.1435 8.45962 12.192 8.64435 12.248 8.86035Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M12 4C16.4183 4 20 7.58172 20 12C20 16.4183 16.4183 20 12 20C7.58172 20 4 16.4183 4 12C4 7.58172 7.58172 4 12 4ZM8 15.6035H9.86035L10.5322 13.4922H13.6758L14.3477 15.6035H16.208L13.1357 7H11.0596L8 15.6035Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12.248 8.86035C12.312 9.06824 12.3765 9.27649 12.4404 9.48438C12.5043 9.68392 12.5558 9.84775 12.5957 9.97559L13.2559 12.04H10.9756L11.624 9.97559C11.656 9.88755 11.6999 9.74366 11.7559 9.54395C11.8198 9.33607 11.8843 9.12034 11.9482 8.89648C12.0122 8.66448 12.0635 8.46762 12.1035 8.30762C12.1435 8.45962 12.192 8.64435 12.248 8.86035Z" style="fill: var(--element-active-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M12 4C16.4183 4 20 7.58172 20 12C20 16.4183 16.4183 20 12 20C7.58172 20 4 16.4183 4 12C4 7.58172 7.58172 4 12 4ZM8 15.6035H9.86035L10.5322 13.4922H13.6758L14.3477 15.6035H16.208L13.1357 7H11.0596L8 15.6035Z" style="fill: var(--element-active-color)"/>
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
    'obi-own-ship-no-command-a': ObiOwnShipNoCommandA;
  }
}
