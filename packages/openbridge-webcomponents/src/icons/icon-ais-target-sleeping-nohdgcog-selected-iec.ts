import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-ais-target-sleeping-nohdgcog-selected-iec')
export class ObiAisTargetSleepingNohdgcogSelectedIec extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M12 3L10.3061 8.42046L14.4397 10.807L12 3Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M22.0325 17.5001L21.0325 19.2322L16.2008 16.4426L17 19H7L9.08334 12.3333L1.97998 8.23217L2.97998 6.50012L22.0325 17.5001ZM10.8585 13.3582L9.72038 17H14.2796L13.6441 14.9665L10.8585 13.3582Z" fill="currentColor"/>
<path d="M2 5V2H5V0H1C0.447715 0 0 0.447716 0 1V5H2Z" fill="currentColor"/>
<path d="M2 19H0V23C0 23.5523 0.447716 24 1 24H5V22H2V19Z" fill="currentColor"/>
<path d="M19 22V24H23C23.5523 24 24 23.5523 24 23V19H22V22H19Z" fill="currentColor"/>
<path d="M22 5H24V1C24 0.447715 23.5523 0 23 0H19V2H22V5Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12 3L10.3061 8.42046L14.4397 10.807L12 3Z" style="fill: var(--element-active-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M22.0325 17.5001L21.0325 19.2322L16.2008 16.4426L17 19H7L9.08334 12.3333L1.97998 8.23217L2.97998 6.50012L22.0325 17.5001ZM10.8585 13.3582L9.72038 17H14.2796L13.6441 14.9665L10.8585 13.3582Z" style="fill: var(--element-active-color)"/>
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
    'obi-ais-target-sleeping-nohdgcog-selected-iec': ObiAisTargetSleepingNohdgcogSelectedIec;
  }
}
