import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-chart-symbolized-boundaries-iec')
export class ObiChartSymbolizedBoundariesIec extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M10.3677 11.75H12.0275V10.25H1.02747V11.75H2.68704L6.52737 16.1389L10.3677 11.75ZM8.37454 11.75H4.68019L6.52737 13.8611L8.37454 11.75Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M16.5549 7.5V5H18.5549V7.5H21.0549V9.5H18.5549V16.5H19.6407L22.3478 13.7929L23.762 15.2071L20.4691 18.5H14.6407L11.3478 15.2071L12.762 13.7929L15.4691 16.5H16.5549V9.5H14.0549V7.5H16.5549Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M10.3677 11.75H12.0275V10.25H1.02747V11.75H2.68704L6.52737 16.1389L10.3677 11.75ZM8.37454 11.75H4.68019L6.52737 13.8611L8.37454 11.75Z" style="fill: var(--element-active-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M16.5549 7.5V5H18.5549V7.5H21.0549V9.5H18.5549V16.5H19.6407L22.3478 13.7929L23.762 15.2071L20.4691 18.5H14.6407L11.3478 15.2071L12.762 13.7929L15.4691 16.5H16.5549V9.5H14.0549V7.5H16.5549Z" style="fill: var(--element-active-color)"/>
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
    'obi-chart-symbolized-boundaries-iec': ObiChartSymbolizedBoundariesIec;
  }
}