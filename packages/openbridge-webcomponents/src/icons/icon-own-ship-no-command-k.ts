import {LitElement, html, css, svg} from 'lit';
import {property} from 'lit/decorators.js';
import {customElement} from '../decorator.js';

@customElement('obi-own-ship-no-command-k')
export class ObiOwnShipNoCommandK extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M12 4C16.4183 4 20 7.58172 20 12C20 16.4183 16.4183 20 12 20C7.58172 20 4 16.4183 4 12C4 7.58172 7.58172 4 12 4ZM9.13672 16H10.8643V12.916L11.6445 12.3281L13.9727 16H15.9531L12.8809 11.2119L15.917 7.43164H13.9844L11.6689 10.3115C11.533 10.4874 11.3967 10.6677 11.2607 10.8516C11.1328 11.0275 11.0002 11.2076 10.8643 11.3916V7.43164H9.13672V16Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M12 4C16.4183 4 20 7.58172 20 12C20 16.4183 16.4183 20 12 20C7.58172 20 4 16.4183 4 12C4 7.58172 7.58172 4 12 4ZM9.13672 16H10.8643V12.916L11.6445 12.3281L13.9727 16H15.9531L12.8809 11.2119L15.917 7.43164H13.9844L11.6689 10.3115C11.533 10.4874 11.3967 10.6677 11.2607 10.8516C11.1328 11.0275 11.0002 11.2076 10.8643 11.3916V7.43164H9.13672V16Z" style="fill: var(--element-active-color)"/>
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
    'obi-own-ship-no-command-k': ObiOwnShipNoCommandK;
  }
}
