import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-iec-02-radar-target-tracked-selected')
export class ObiIEC02RadarTargetTrackedSelected extends LitElement {
  @property({type: Boolean, attribute: 'use-css-color'}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16ZM12 18C15.3137 18 18 15.3137 18 12C18 8.68629 15.3137 6 12 6C8.68629 6 6 8.68629 6 12C6 15.3137 8.68629 18 12 18Z" fill="currentColor"/>
<path d="M2 5V2H5V0H1C0.447715 0 0 0.447716 0 1V5H2Z" fill="currentColor"/>
<path d="M2 19H0V23C0 23.5523 0.447716 24 1 24H5V22H2V19Z" fill="currentColor"/>
<path d="M19 22V24H23C23.5523 24 24 23.5523 24 23V19H22V22H19Z" fill="currentColor"/>
<path d="M22 5H24V1C24 0.447715 23.5523 0 23 0H19V2H22V5Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16ZM12 18C15.3137 18 18 15.3137 18 12C18 8.68629 15.3137 6 12 6C8.68629 6 6 8.68629 6 12C6 15.3137 8.68629 18 12 18Z" style="fill: var(--element-active-color)"/>
<path d="M2 5V2H5V0H1C0.447715 0 0 0.447716 0 1V5H2Z" style="fill: var(--element-active-color)"/>
<path d="M2 19H0V23C0 23.5523 0.447716 24 1 24H5V22H2V19Z" style="fill: var(--element-active-color)"/>
<path d="M19 22V24H23C23.5523 24 24 23.5523 24 23V19H22V22H19Z" style="fill: var(--element-active-color)"/>
<path d="M22 5H24V1C24 0.447715 23.5523 0 23 0H19V2H22V5Z" style="fill: var(--element-active-color)"/>
</svg>
`;

  override render() {
    return html`
      <div class="wrapper" >
        ${this.useCssColor? this.iconCss : this.icon}
      </div>
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
    'obi-iec-02-radar-target-tracked-selected': ObiIEC02RadarTargetTrackedSelected;
  }
}