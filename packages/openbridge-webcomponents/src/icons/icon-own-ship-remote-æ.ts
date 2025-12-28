import {LitElement, html, css, svg} from 'lit';
import {property} from 'lit/decorators.js';
import {customElement} from '../decorator.js';

@customElement('obi-own-ship-remote-æ')
export class ObiOwnShipRemoteÆ extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M11.9141 8.9082V12.4355H9.6582L11.1699 8.9082H11.9141Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M12 4C16.4183 4 20 7.58172 20 12C20 16.4183 16.4183 20 12 20C7.58172 20 4 16.4183 4 12C4 7.58172 7.58172 4 12 4ZM10.1982 7.43164L6.33398 16H8.09766L9.02246 13.8877H11.9141V16H16.9541V14.5596H13.6416V12.2559H16.7383V10.8281H13.6416V8.86035H16.9541V7.43164H10.1982Z" fill="currentColor"/>
<path d="M2.76074 8.17285C2.25833 9.38589 2.00006 10.687 2 12C2.00006 13.3128 2.25845 14.6133 2.76074 15.8262L0.913086 16.5918C0.310214 15.1362 5.77178e-05 13.5755 0 12C5.77831e-05 10.4243 0.310089 8.86299 0.913086 7.40723L2.76074 8.17285Z" fill="currentColor"/>
<path d="M23.0869 7.40723C23.6899 8.86299 23.9999 10.4243 24 12C23.9999 13.5755 23.6898 15.1362 23.0869 16.5918L21.2393 15.8262C21.7416 14.6133 21.9999 13.3128 22 12C21.9999 10.687 21.7417 9.38589 21.2393 8.17285L23.0869 7.40723Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M11.9141 8.9082V12.4355H9.6582L11.1699 8.9082H11.9141Z" style="fill: var(--element-active-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M12 4C16.4183 4 20 7.58172 20 12C20 16.4183 16.4183 20 12 20C7.58172 20 4 16.4183 4 12C4 7.58172 7.58172 4 12 4ZM10.1982 7.43164L6.33398 16H8.09766L9.02246 13.8877H11.9141V16H16.9541V14.5596H13.6416V12.2559H16.7383V10.8281H13.6416V8.86035H16.9541V7.43164H10.1982Z" style="fill: var(--element-active-color)"/>
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
    'obi-own-ship-remote-æ': ObiOwnShipRemoteÆ;
  }
}
