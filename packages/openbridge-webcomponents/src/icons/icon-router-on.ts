import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-router-on')
export class ObiRouterOn extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22ZM12.0311 3L16.0622 7L13.0311 7L13.0311 10H11.0311L11.0311 7L7.99999 7L12.0311 3ZM14 11.9689L18 7.93782V10.9689L21 10.9689V12.9689L18 12.9689L18 16L14 11.9689ZM10 12.0311L6 16.0622V13.0311H3V11.0311H6L6 8L10 12.0311ZM12.0312 21L8.00011 17H11.0312V14H13.0312V17H16.0623L12.0312 21Z" fill="currentColor"/>
<path d="M12.0311 3L16.0622 7L13.0311 7V10H11.0311V7L7.99999 7L12.0311 3Z" fill="currentColor"/>
<path d="M14 11.9689L18 7.93782V10.9689H21L21 12.9689H18V16L14 11.9689Z" fill="currentColor"/>
<path d="M6 16.0622L10 12.0311L6 8L6 11.0311H3V13.0311H6L6 16.0622Z" fill="currentColor"/>
<path d="M12.0312 21L8.00011 17H11.0312V14H13.0312V17H16.0623L12.0312 21Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M23 12C23 18.0751 18.0751 23 12 23C5.92487 23 1 18.0751 1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12ZM22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22ZM12.0311 3L16.0622 7L13.0311 7L13.0311 10H11.0311L11.0311 7L7.99999 7L12.0311 3ZM14 11.9689L18 7.93782V10.9689L21 10.9689V12.9689L18 12.9689L18 16L14 11.9689ZM10 12.0311L6 16.0622V13.0311H3V11.0311H6L6 8L10 12.0311ZM12.0312 21L8.00011 17H11.0312V14H13.0312V17H16.0623L12.0312 21Z" style="fill: var(--automation-device-primary-color)"/>
<path d="M12.0311 3L16.0622 7L13.0311 7V10H11.0311V7L7.99999 7L12.0311 3Z" style="fill: var(--automation-device-tertiary-color)"/>
<path d="M14 11.9689L18 7.93782V10.9689H21L21 12.9689H18V16L14 11.9689Z" style="fill: var(--automation-device-tertiary-color)"/>
<path d="M6 16.0622L10 12.0311L6 8L6 11.0311H3V13.0311H6L6 16.0622Z" style="fill: var(--automation-device-tertiary-color)"/>
<path d="M12.0312 21L8.00011 17H11.0312V14H13.0312V17H16.0623L12.0312 21Z" style="fill: var(--automation-device-tertiary-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M23 12C23 18.0751 18.0751 23 12 23C5.92487 23 1 18.0751 1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12ZM22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" style="fill: var(--automation-device-tertiary-color)"/>
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
    'obi-router-on': ObiRouterOn;
  }
}
