import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-16-command-partial')
export class Obi16CommandPartial extends LitElement {
  @property({type: Boolean, attribute: 'use-css-color'}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M6.50019 2.62823C6.97198 2.35584 7.57568 2.53239 7.82637 3.01606L9.22991 5.72407C10.0795 5.35762 11.016 5.1546 12 5.1546C12.9841 5.1546 13.9208 5.35767 14.7704 5.7242L16.174 3.01606C16.4247 2.53239 17.0284 2.35584 17.5002 2.62823C17.972 2.90062 18.1209 3.51172 17.8274 3.97066L16.1831 6.54146C17.6875 7.66442 18.7253 9.37795 18.9529 11.3386L22.001 11.2C22.5453 11.1753 23 11.6098 23 12.1546C23 12.6994 22.5453 13.1339 22.001 13.1092L18.9529 12.9706C18.7253 14.9312 17.6876 16.6447 16.1832 17.7677L17.8274 20.3384C18.1209 20.7973 17.972 21.4084 17.5002 21.6808C17.0284 21.9532 16.4247 21.7766 16.174 21.293L14.7705 18.585C13.9208 18.9515 12.9841 19.1546 12 19.1546C11.016 19.1546 10.0794 18.9516 9.22984 18.5851L7.82637 21.293C7.57568 21.7766 6.97198 21.9532 6.50018 21.6808C6.02839 21.4084 5.87943 20.7973 6.17297 20.3384L7.81703 17.7679C6.31254 16.6449 5.2747 14.9313 5.04706 12.9706L1.99897 13.1092C1.45475 13.1339 1 12.6994 1 12.1546C1 11.6098 1.45475 11.1753 1.99897 11.2L5.04706 11.3386C5.2747 9.37784 6.31257 7.66423 7.81711 6.54127L6.17297 3.97066C5.87944 3.51172 6.02839 2.90062 6.50019 2.62823ZM12 17.1545C14.7614 17.1545 17 14.916 17 12.1545C17 9.39312 14.7614 7.15454 12 7.15454C9.23858 7.15454 7 9.39312 7 12.1545C7 14.916 9.23858 17.1545 12 17.1545Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M6.50019 2.62823C6.97198 2.35584 7.57568 2.53239 7.82637 3.01606L9.22991 5.72407C10.0795 5.35762 11.016 5.1546 12 5.1546C12.9841 5.1546 13.9208 5.35767 14.7704 5.7242L16.174 3.01606C16.4247 2.53239 17.0284 2.35584 17.5002 2.62823C17.972 2.90062 18.1209 3.51172 17.8274 3.97066L16.1831 6.54146C17.6875 7.66442 18.7253 9.37795 18.9529 11.3386L22.001 11.2C22.5453 11.1753 23 11.6098 23 12.1546C23 12.6994 22.5453 13.1339 22.001 13.1092L18.9529 12.9706C18.7253 14.9312 17.6876 16.6447 16.1832 17.7677L17.8274 20.3384C18.1209 20.7973 17.972 21.4084 17.5002 21.6808C17.0284 21.9532 16.4247 21.7766 16.174 21.293L14.7705 18.585C13.9208 18.9515 12.9841 19.1546 12 19.1546C11.016 19.1546 10.0794 18.9516 9.22984 18.5851L7.82637 21.293C7.57568 21.7766 6.97198 21.9532 6.50018 21.6808C6.02839 21.4084 5.87943 20.7973 6.17297 20.3384L7.81703 17.7679C6.31254 16.6449 5.2747 14.9313 5.04706 12.9706L1.99897 13.1092C1.45475 13.1339 1 12.6994 1 12.1546C1 11.6098 1.45475 11.1753 1.99897 11.2L5.04706 11.3386C5.2747 9.37784 6.31257 7.66423 7.81711 6.54127L6.17297 3.97066C5.87944 3.51172 6.02839 2.90062 6.50019 2.62823ZM12 17.1545C14.7614 17.1545 17 14.916 17 12.1545C17 9.39312 14.7614 7.15454 12 7.15454C9.23858 7.15454 7 9.39312 7 12.1545C7 14.916 9.23858 17.1545 12 17.1545Z" style="fill: var(--element-active-color)"/>
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
    'obi-16-command-partial': Obi16CommandPartial;
  }
}
