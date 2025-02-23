import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-ais-locatingdevice-active-selected-iec')
export class ObiAisLocatingdeviceActiveSelectedIec extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M12 24C18.6274 24 24 18.6274 24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12C0 18.6274 5.37258 24 12 24ZM19.743 18.3287C21.1537 16.6048 22 14.4012 22 12C22 9.59871 21.1536 7.3951 19.7429 5.67122L13.4142 11.9999L19.743 18.3287ZM18.3288 19.7429C16.6049 21.1536 14.4013 22 12 22C9.59871 22 7.3951 21.1536 5.67122 19.7429L12 13.4141L18.3288 19.7429ZM10.5858 11.9999L4.25701 18.3287C2.84635 16.6048 2 14.4012 2 12C2 9.59871 2.84638 7.3951 4.2571 5.67122L10.5858 11.9999ZM12 10.5857L18.3287 4.25701C16.6048 2.84635 14.4012 2 12 2C9.59875 2 7.39518 2.84635 5.67132 4.25701L12 10.5857Z" fill="currentColor"/>
<path d="M2 5V2H5V0H1C0.447715 0 0 0.447716 0 1V5H2Z" fill="currentColor"/>
<path d="M2 19H0V23C0 23.5523 0.447716 24 1 24H5V22H2V19Z" fill="currentColor"/>
<path d="M19 22V24H23C23.5523 24 24 23.5523 24 23V19H22V22H19Z" fill="currentColor"/>
<path d="M22 5H24V1C24 0.447715 23.5523 0 23 0H19V2H22V5Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M12 24C18.6274 24 24 18.6274 24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12C0 18.6274 5.37258 24 12 24ZM19.743 18.3287C21.1537 16.6048 22 14.4012 22 12C22 9.59871 21.1536 7.3951 19.7429 5.67122L13.4142 11.9999L19.743 18.3287ZM18.3288 19.7429C16.6049 21.1536 14.4013 22 12 22C9.59871 22 7.3951 21.1536 5.67122 19.7429L12 13.4141L18.3288 19.7429ZM10.5858 11.9999L4.25701 18.3287C2.84635 16.6048 2 14.4012 2 12C2 9.59871 2.84638 7.3951 4.2571 5.67122L10.5858 11.9999ZM12 10.5857L18.3287 4.25701C16.6048 2.84635 14.4012 2 12 2C9.59875 2 7.39518 2.84635 5.67132 4.25701L12 10.5857Z" style="fill: var(--element-active-color)"/>
<path d="M2 5V2H5V0H1C0.447715 0 0 0.447716 0 1V5H2Z" style="fill: var(--element-active-color)"/>
<path d="M2 19H0V23C0 23.5523 0.447716 24 1 24H5V22H2V19Z" style="fill: var(--element-active-color)"/>
<path d="M19 22V24H23C23.5523 24 24 23.5523 24 23V19H22V22H19Z" style="fill: var(--element-active-color)"/>
<path d="M22 5H24V1C24 0.447715 23.5523 0 23 0H19V2H22V5Z" style="fill: var(--element-active-color)"/>
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
    'obi-ais-locatingdevice-active-selected-iec': ObiAisLocatingdeviceActiveSelectedIec;
  }
}
