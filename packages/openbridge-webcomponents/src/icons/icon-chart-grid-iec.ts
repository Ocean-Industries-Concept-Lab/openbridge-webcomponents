import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-chart-grid-iec')
export class ObiChartGridIec extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M4 2C2.89543 2 2 2.89543 2 4V20C2 21.1046 2.89543 22 4 22H20C21.1046 22 22 21.1046 22 20V4C22 2.89543 21.1046 2 20 2H4ZM20 4H16V8H20V4ZM10 4H14V8H10V4ZM10 10H14V14L10 14V10ZM8 14V10H4V14H8ZM4 16H8V20H4V16ZM10 16L14 16V20H10V16ZM16 16V20H20V16H16ZM20 14V10H16V14H20ZM8 8V4H4V8L8 8Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M4 2C2.89543 2 2 2.89543 2 4V20C2 21.1046 2.89543 22 4 22H20C21.1046 22 22 21.1046 22 20V4C22 2.89543 21.1046 2 20 2H4ZM20 4H16V8H20V4ZM10 4H14V8H10V4ZM10 10H14V14L10 14V10ZM8 14V10H4V14H8ZM4 16H8V20H4V16ZM10 16L14 16V20H10V16ZM16 16V20H20V16H16ZM20 14V10H16V14H20ZM8 8V4H4V8L8 8Z" style="fill: var(--element-active-color)"/>
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
    'obi-chart-grid-iec': ObiChartGridIec;
  }
}
