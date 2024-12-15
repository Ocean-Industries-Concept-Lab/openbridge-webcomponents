import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-router-2-off')
export class ObiRouter2Off extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M3 2L21 2C21.5523 2 22 2.44771 22 3L22 21C22 21.5523 21.5523 22 21 22L3 22C2.44772 22 2 21.5523 2 21L2 3C2 2.44772 2.44771 2 3 2ZM16.0623 7L12.0311 3L8 7L11.0311 7L11.0311 10H13.0311L13.0311 7L16.0623 7ZM18 7.93782L14 11.9689L18 16L18 12.9689L21 12.9689V10.9689L18 10.9689V7.93782ZM10 12.0311L6 16.0622L6 13.0311H3.00001V11.0311H6L6 8L10 12.0311ZM8.00012 17L12.0312 21L16.0623 17H13.0312V14H11.0312V17H8.00012Z" fill="currentColor"/>
<path d="M16.0623 7L12.0311 3L8 7L11.0311 7V10H13.0311V7L16.0623 7Z" fill="currentColor"/>
<path d="M18 7.93782L14 11.9689L18 16V12.9689H21L21 10.9689H18V7.93782Z" fill="currentColor"/>
<path d="M6 16.0622L10 12.0311L6 8L6 11.0311H3.00001V13.0311H6L6 16.0622Z" fill="currentColor"/>
<path d="M8.00012 17L12.0312 21L16.0623 17H13.0312V14H11.0312V17H8.00012Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M1 3C1 1.89543 1.89543 1 3 1L21 1C22.1046 1 23 1.89543 23 3L23 21C23 22.1046 22.1046 23 21 23L3 23C1.89543 23 1 22.1046 1 21L1 3ZM21 2L3 2C2.44771 2 2 2.44772 2 3L2 21C2 21.5523 2.44772 22 3 22L21 22C21.5523 22 22 21.5523 22 21L22 3C22 2.44771 21.5523 2 21 2Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M3 2L21 2C21.5523 2 22 2.44771 22 3L22 21C22 21.5523 21.5523 22 21 22L3 22C2.44772 22 2 21.5523 2 21L2 3C2 2.44772 2.44771 2 3 2ZM16.0623 7L12.0311 3L8 7L11.0311 7L11.0311 10H13.0311L13.0311 7L16.0623 7ZM18 7.93782L14 11.9689L18 16L18 12.9689L21 12.9689V10.9689L18 10.9689V7.93782ZM10 12.0311L6 16.0622L6 13.0311H3.00001V11.0311H6L6 8L10 12.0311ZM8.00012 17L12.0312 21L16.0623 17H13.0312V14H11.0312V17H8.00012Z" style="fill: var(--automation-device-primary-inverted-color)"/>
<path d="M16.0623 7L12.0311 3L8 7L11.0311 7V10H13.0311V7L16.0623 7Z" style="fill: var(--automation-device-tertiary-inverted-color)"/>
<path d="M18 7.93782L14 11.9689L18 16V12.9689H21L21 10.9689H18V7.93782Z" style="fill: var(--automation-device-tertiary-inverted-color)"/>
<path d="M6 16.0622L10 12.0311L6 8L6 11.0311H3.00001V13.0311H6L6 16.0622Z" style="fill: var(--automation-device-tertiary-inverted-color)"/>
<path d="M8.00012 17L12.0312 21L16.0623 17H13.0312V14H11.0312V17H8.00012Z" style="fill: var(--automation-device-tertiary-inverted-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M1 3C1 1.89543 1.89543 1 3 1L21 1C22.1046 1 23 1.89543 23 3L23 21C23 22.1046 22.1046 23 21 23L3 23C1.89543 23 1 22.1046 1 21L1 3ZM21 2L3 2C2.44771 2 2 2.44772 2 3L2 21C2 21.5523 2.44772 22 3 22L21 22C21.5523 22 22 21.5523 22 21L22 3C22 2.44771 21.5523 2 21 2Z" style="fill: var(--automation-device-tertiary-inverted-color)"/>
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
    'obi-router-2-off': ObiRouter2Off;
  }
}
