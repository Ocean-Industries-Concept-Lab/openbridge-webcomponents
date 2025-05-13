import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-light-backlight-buttons-colour-on')
export class ObiLightBacklightButtonsColourOn extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<rect x="8" y="16" width="8" height="1" fill="currentColor"/>
<path d="M1 13V15H5V13H1Z" fill="currentColor"/>
<path d="M3.525 6.925L6.35 9.75L7.75 8.35L4.925 5.5L3.525 6.925Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M7 15V18H17V15H7ZM16 16H8V17H16V16Z" fill="currentColor"/>
<path d="M11 3V7H13V3H11Z" fill="currentColor"/>
<path d="M16.25 8.35L17.65 9.75L20.5 6.925L19.075 5.525L16.25 8.35Z" fill="currentColor"/>
<path d="M19 13V15H23V13H19Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect x="8" y="16" width="8" height="1" style="fill: var(--navigation-light-yellow-color)"/>
<path d="M1 13V15H5V13H1Z" style="fill: var(--automation-device-tertiary-color)"/>
<path d="M3.525 6.925L6.35 9.75L7.75 8.35L4.925 5.5L3.525 6.925Z" style="fill: var(--automation-device-tertiary-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M7 15V18H17V15H7ZM16 16H8V17H16V16Z" style="fill: var(--automation-device-tertiary-color)"/>
<path d="M11 3V7H13V3H11Z" style="fill: var(--automation-device-tertiary-color)"/>
<path d="M16.25 8.35L17.65 9.75L20.5 6.925L19.075 5.525L16.25 8.35Z" style="fill: var(--automation-device-tertiary-color)"/>
<path d="M19 13V15H23V13H19Z" style="fill: var(--automation-device-tertiary-color)"/>
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
    'obi-light-backlight-buttons-colour-on': ObiLightBacklightButtonsColourOn;
  }
}
