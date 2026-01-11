import {LitElement, html, css, svg} from 'lit';
import {property} from 'lit/decorators.js';
import {customElement} from '../decorator.js';

@customElement('obi-own-ship-no-command-u')
export class ObiOwnShipNoCommandU extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M12 4C16.4183 4 20 7.58172 20 12C20 16.4183 16.4183 20 12 20C7.58172 20 4 16.4183 4 12C4 7.58172 7.58172 4 12 4ZM8.51465 12.9521C8.5147 13.904 8.8067 14.6719 9.39062 15.2559C9.98263 15.8319 10.8427 16.1201 11.9707 16.1201C12.7626 16.1201 13.4185 15.9839 13.9385 15.7119C14.4584 15.4319 14.8465 15.0559 15.1025 14.584C15.3585 14.104 15.4863 13.5676 15.4863 12.9756V7.43164H13.7705V12.7002C13.7705 13.1399 13.707 13.5078 13.5791 13.8037C13.4591 14.0917 13.2706 14.3081 13.0146 14.4521C12.7587 14.5961 12.4265 14.668 12.0186 14.668C11.4266 14.668 10.9825 14.5196 10.6865 14.2236C10.3907 13.9196 10.2422 13.4158 10.2422 12.7119V7.43164H8.51465V12.9521Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M12 4C16.4183 4 20 7.58172 20 12C20 16.4183 16.4183 20 12 20C7.58172 20 4 16.4183 4 12C4 7.58172 7.58172 4 12 4ZM8.51465 12.9521C8.5147 13.904 8.8067 14.6719 9.39062 15.2559C9.98263 15.8319 10.8427 16.1201 11.9707 16.1201C12.7626 16.1201 13.4185 15.9839 13.9385 15.7119C14.4584 15.4319 14.8465 15.0559 15.1025 14.584C15.3585 14.104 15.4863 13.5676 15.4863 12.9756V7.43164H13.7705V12.7002C13.7705 13.1399 13.707 13.5078 13.5791 13.8037C13.4591 14.0917 13.2706 14.3081 13.0146 14.4521C12.7587 14.5961 12.4265 14.668 12.0186 14.668C11.4266 14.668 10.9825 14.5196 10.6865 14.2236C10.3907 13.9196 10.2422 13.4158 10.2422 12.7119V7.43164H8.51465V12.9521Z" style="fill: var(--element-active-color)"/>
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
    'obi-own-ship-no-command-u': ObiOwnShipNoCommandU;
  }
}
