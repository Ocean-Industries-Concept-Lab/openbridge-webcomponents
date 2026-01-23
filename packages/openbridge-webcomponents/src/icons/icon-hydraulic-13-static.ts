import {LitElement, html, css, svg} from 'lit';
import {property} from 'lit/decorators.js';
import {customElement} from '../decorator.js';

@customElement('obi-hydraulic-13-static')
export class ObiHydraulic13Static extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M0 1V0H1H23H24V1V23V24H23H1H0V23V1ZM11 23H1L1 1H11V9.17071C9.99188 9.52703 9.23108 10.4069 9.04428 11.4836L7.53033 9.96967C7.23744 9.67678 6.76256 9.67678 6.46967 9.96967C6.17678 10.2626 6.17678 10.7374 6.46967 11.0303L11 15.5607V23ZM23 23H13V15.5607L17.5303 11.0303C17.8232 10.7374 17.8232 10.2626 17.5303 9.96967C17.2374 9.67678 16.7626 9.67678 16.4697 9.96967L14.9557 11.4836C14.7689 10.4069 14.0081 9.52703 13 9.17071V1L23 1V23ZM12 13.5C12.8284 13.5 13.5 12.8284 13.5 12C13.5 11.1716 12.8284 10.5 12 10.5C11.1716 10.5 10.5 11.1716 10.5 12C10.5 12.8284 11.1716 13.5 12 13.5Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M0 1V0H1H23H24V1V23V24H23H1H0V23V1ZM11 23H1L1 1H11V9.17071C9.99188 9.52703 9.23108 10.4069 9.04428 11.4836L7.53033 9.96967C7.23744 9.67678 6.76256 9.67678 6.46967 9.96967C6.17678 10.2626 6.17678 10.7374 6.46967 11.0303L11 15.5607V23ZM23 23H13V15.5607L17.5303 11.0303C17.8232 10.7374 17.8232 10.2626 17.5303 9.96967C17.2374 9.67678 16.7626 9.67678 16.4697 9.96967L14.9557 11.4836C14.7689 10.4069 14.0081 9.52703 13 9.17071V1L23 1V23ZM12 13.5C12.8284 13.5 13.5 12.8284 13.5 12C13.5 11.1716 12.8284 10.5 12 10.5C11.1716 10.5 10.5 11.1716 10.5 12C10.5 12.8284 11.1716 13.5 12 13.5Z" style="fill: var(--automation-device-secondary-color)"/>
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
    'obi-hydraulic-13-static': ObiHydraulic13Static;
  }
}
