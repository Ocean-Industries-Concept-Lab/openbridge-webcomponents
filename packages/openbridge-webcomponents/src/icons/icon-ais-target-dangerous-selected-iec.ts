import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-ais-target-dangerous-selected-iec')
export class ObiAisTargetDangerousSelectedIec extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M2 2V5H0V1C0 0.447716 0.447715 0 1 0H5V2H2Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M0 23V19H2V22H4.66667L12 0L19.3333 22H22V19H24V23C24 23.5523 23.5523 24 23 24H1C0.447716 24 0 23.5523 0 23ZM6.77485 22L12 6.32456L17.2251 22H6.77485Z" fill="currentColor"/>
<path d="M24 1V5H22V2H19V0H23C23.5523 0 24 0.447715 24 1Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M2 2V5H0V1C0 0.447716 0.447715 0 1 0H5V2H2Z" style="fill: var(--element-active-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M0 23V19H2V22H4.66667L12 0L19.3333 22H22V19H24V23C24 23.5523 23.5523 24 23 24H1C0.447716 24 0 23.5523 0 23ZM6.77485 22L12 6.32456L17.2251 22H6.77485Z" style="fill: var(--element-active-color)"/>
<path d="M24 1V5H22V2H19V0H23C23.5523 0 24 0.447715 24 1Z" style="fill: var(--element-active-color)"/>
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
    'obi-ais-target-dangerous-selected-iec': ObiAisTargetDangerousSelectedIec;
  }
}
