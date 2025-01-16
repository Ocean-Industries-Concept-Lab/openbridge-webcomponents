import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-chart-highlight-data-dependent-iec')
export class ObiChartHighlightDataDependentIec extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M12 6H15V16H16V18H11.5C9.567 18 8 16.433 8 14.5C8 12.567 9.567 11 11.5 11H13V8H12V6ZM13 13H11.5C10.6716 13 10 13.6716 10 14.5C10 15.3284 10.6716 16 11.5 16H13V13Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M20 4H4V20H20V4ZM4 2C2.89543 2 2 2.89543 2 4V20C2 21.1046 2.89543 22 4 22H20C21.1046 22 22 21.1046 22 20V4C22 2.89543 21.1046 2 20 2H4Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M12 6H15V16H16V18H11.5C9.567 18 8 16.433 8 14.5C8 12.567 9.567 11 11.5 11H13V8H12V6ZM13 13H11.5C10.6716 13 10 13.6716 10 14.5C10 15.3284 10.6716 16 11.5 16H13V13Z" style="fill: var(--element-active-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M20 4H4V20H20V4ZM4 2C2.89543 2 2 2.89543 2 4V20C2 21.1046 2.89543 22 4 22H20C21.1046 22 22 21.1046 22 20V4C22 2.89543 21.1046 2 20 2H4Z" style="fill: var(--element-active-color)"/>
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
    'obi-chart-highlight-data-dependent-iec': ObiChartHighlightDataDependentIec;
  }
}
