import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-chart-symbolized-boundaries-iec')
export class ObiChartSymbolizedBoundariesIec extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M10.3676 11.75H12.0273V10.25H1.02734V11.75H2.68692L6.52724 16.1389L10.3676 11.75ZM8.37442 11.75H4.68007L6.52724 13.8611L8.37442 11.75Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M16.5548 7.5V5H18.5548V7.5H21.0548V9.5H18.5548V16.5H19.6406L22.3477 13.7929L23.7619 15.2071L20.469 18.5H14.6406L11.3477 15.2071L12.7619 13.7929L15.469 16.5H16.5548V9.5H14.0548V7.5H16.5548Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M10.3676 11.75H12.0273V10.25H1.02734V11.75H2.68692L6.52724 16.1389L10.3676 11.75ZM8.37442 11.75H4.68007L6.52724 13.8611L8.37442 11.75Z" style="fill: var(--element-active-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M16.5548 7.5V5H18.5548V7.5H21.0548V9.5H18.5548V16.5H19.6406L22.3477 13.7929L23.7619 15.2071L20.469 18.5H14.6406L11.3477 15.2071L12.7619 13.7929L15.469 16.5H16.5548V9.5H14.0548V7.5H16.5548Z" style="fill: var(--element-active-color)"/>
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
    'obi-chart-symbolized-boundaries-iec': ObiChartSymbolizedBoundariesIec;
  }
}
