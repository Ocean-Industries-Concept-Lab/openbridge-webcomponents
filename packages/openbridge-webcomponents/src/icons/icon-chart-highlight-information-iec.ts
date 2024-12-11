import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-chart-highlight-information-iec')
export class ObiChartHighlightInformationIec extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M13 6V8H11V6H13Z" fill="currentColor"/>
<path d="M9 18V16H11V12H10V10H13V16H15V18H9Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M2 22V2H22V22H2ZM4 4H20V20H4V4Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M13 6V8H11V6H13Z" style="fill: var(--element-active-color)"/>
<path d="M9 18V16H11V12H10V10H13V16H15V18H9Z" style="fill: var(--element-active-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M2 22V2H22V22H2ZM4 4H20V20H4V4Z" style="fill: var(--element-active-color)"/>
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
    'obi-chart-highlight-information-iec': ObiChartHighlightInformationIec;
  }
}