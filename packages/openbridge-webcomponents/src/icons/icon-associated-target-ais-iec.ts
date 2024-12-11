import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-associated-target-ais-iec')
export class ObiAssociatedTargetAisIec extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M24 12C24 18.6274 18.6274 24 12 24C5.37258 24 0 18.6274 0 12C0 5.37258 5.37258 0 12 0C18.6274 0 24 5.37258 24 12ZM18.3262 21C16.5368 22.2601 14.3548 23 12 23C9.64518 23 7.46319 22.2601 5.67384 21H18.3262ZM18.8598 20.5995L12 1C18.0751 1 23 5.92487 23 12C23 15.4808 21.3833 18.5839 18.8598 20.5995ZM5.14017 20.5995C2.6167 18.5839 1 15.4808 1 12C1 5.92487 5.92487 1 12 1L5.14017 20.5995ZM7.81896 19L12 7.05418L16.181 19H7.81896Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M24 12C24 18.6274 18.6274 24 12 24C5.37258 24 0 18.6274 0 12C0 5.37258 5.37258 0 12 0C18.6274 0 24 5.37258 24 12ZM18.3262 21C16.5368 22.2601 14.3548 23 12 23C9.64518 23 7.46319 22.2601 5.67384 21H18.3262ZM18.8598 20.5995L12 1C18.0751 1 23 5.92487 23 12C23 15.4808 21.3833 18.5839 18.8598 20.5995ZM5.14017 20.5995C2.6167 18.5839 1 15.4808 1 12C1 5.92487 5.92487 1 12 1L5.14017 20.5995ZM7.81896 19L12 7.05418L16.181 19H7.81896Z" style="fill: var(--element-active-color)"/>
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
    'obi-associated-target-ais-iec': ObiAssociatedTargetAisIec;
  }
}
