import {LitElement, html, css, svg} from 'lit';
import {property} from 'lit/decorators.js';
import {customElement} from '../decorator.js';

@customElement('obi-own-ship-no-command-index')
export class ObiOwnShipNoCommandIndex extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M12 4C16.4183 4 20 7.58172 20 12C20 16.4183 16.4183 20 12 20C7.58172 20 4 16.4183 4 12C4 7.58172 7.58172 4 12 4ZM10.958 7.39648L7.89844 16H9.75879L10.4307 13.8877H13.5742L14.2461 16H16.1064L13.0342 7.39648H10.958ZM12.1465 9.25586C12.2105 9.46386 12.2749 9.67188 12.3389 9.87988C12.4029 10.0799 12.4541 10.2441 12.4941 10.3721L13.1543 12.4355H10.874L11.5225 10.3721C11.5544 10.2841 11.5984 10.1402 11.6543 9.94043C11.7183 9.73243 11.7827 9.51599 11.8467 9.29199C11.9106 9.06012 11.962 8.86405 12.002 8.7041C12.0419 8.85607 12.0905 9.03991 12.1465 9.25586Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12 4C16.4183 4 20 7.58172 20 12C20 16.4183 16.4183 20 12 20C7.58172 20 4 16.4183 4 12C4 7.58172 7.58172 4 12 4ZM10.958 7.39648L7.89844 16H9.75879L10.4307 13.8877H13.5742L14.2461 16H16.1064L13.0342 7.39648H10.958ZM12.1465 9.25586C12.2105 9.46386 12.2749 9.67188 12.3389 9.87988C12.4029 10.0799 12.4541 10.2441 12.4941 10.3721L13.1543 12.4355H10.874L11.5225 10.3721C11.5544 10.2841 11.5984 10.1402 11.6543 9.94043C11.7183 9.73243 11.7827 9.51599 11.8467 9.29199C11.9106 9.06012 11.962 8.86405 12.002 8.7041C12.0419 8.85607 12.0905 9.03991 12.1465 9.25586Z" style="fill: var(--element-active-color)"/>
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
    'obi-own-ship-no-command-index': ObiOwnShipNoCommandIndex;
  }
}
