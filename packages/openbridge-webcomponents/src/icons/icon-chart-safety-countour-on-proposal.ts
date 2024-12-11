import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-chart-safety-countour-on-proposal')
export class ObiChartSafetyCountourOnProposal extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M6.75 2H5.25V3.5H6.75V2Z" fill="currentColor"/>
<path d="M11.25 2H12.75V3.5H11.25V2Z" fill="currentColor"/>
<path d="M14.25 2H15.75V3.5H14.25V2Z" fill="currentColor"/>
<path d="M18.75 2H17.25V3.5H18.75V2Z" fill="currentColor"/>
<path d="M5.25 17H6.75V18.5H5.25V17Z" fill="currentColor"/>
<path d="M6.75 14H5.25V15.5H6.75V14Z" fill="currentColor"/>
<path d="M5.25 11H6.75V12.5H5.25V11Z" fill="currentColor"/>
<path d="M18.75 11H17.25V12.5H18.75V11Z" fill="currentColor"/>
<path d="M17.25 8H18.75V9.5H17.25V8Z" fill="currentColor"/>
<path d="M18.75 5H17.25V6.5H18.75V5Z" fill="currentColor"/>
<path d="M8.25 2H9.75V3.5H8.25V2Z" fill="currentColor"/>
<path d="M6.75 20H5.25V21.5H6.75V20Z" fill="currentColor"/>
<path d="M8.25 20H9.75V21.5H8.25V20Z" fill="currentColor"/>
<path d="M12.75 21.5V20H11.25V21.5H12.75Z" fill="currentColor"/>
<path d="M14.25 20H15.75V21.5H14.25V20Z" fill="currentColor"/>
<path d="M18.75 14H17.25V15.5H18.75V14Z" fill="currentColor"/>
<path d="M5.25 8H6.75V9.5H5.25V8Z" fill="currentColor"/>
<path d="M6.75 5H5.25V6.5H6.75V5Z" fill="currentColor"/>
<path d="M18.75 17H17.25V18.5H18.75V17Z" fill="currentColor"/>
<path d="M18.75 20H17.25V21.5H18.75V20Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M13.1522 6.73799C12.7799 6.26226 12.3761 5.84571 12 5.5C11.6239 5.84571 11.2201 6.26226 10.8478 6.73799C10.0497 7.75781 9.5 8.9133 9.5 10.1474V17.5L14.5 17.5V10.1474C14.5 8.9133 13.9503 7.75781 13.1522 6.73799ZM13 16V10.1474C13 9.37873 12.6604 8.55472 12 7.69984C11.3396 8.55472 11 9.37873 11 10.1474V16H13Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M6.75 2H5.25V3.5H6.75V2Z" style="fill: var(--element-active-color)"/>
<path d="M11.25 2H12.75V3.5H11.25V2Z" style="fill: var(--element-active-color)"/>
<path d="M14.25 2H15.75V3.5H14.25V2Z" style="fill: var(--element-active-color)"/>
<path d="M18.75 2H17.25V3.5H18.75V2Z" style="fill: var(--element-active-color)"/>
<path d="M5.25 17H6.75V18.5H5.25V17Z" style="fill: var(--element-active-color)"/>
<path d="M6.75 14H5.25V15.5H6.75V14Z" style="fill: var(--element-active-color)"/>
<path d="M5.25 11H6.75V12.5H5.25V11Z" style="fill: var(--element-active-color)"/>
<path d="M18.75 11H17.25V12.5H18.75V11Z" style="fill: var(--element-active-color)"/>
<path d="M17.25 8H18.75V9.5H17.25V8Z" style="fill: var(--element-active-color)"/>
<path d="M18.75 5H17.25V6.5H18.75V5Z" style="fill: var(--element-active-color)"/>
<path d="M8.25 2H9.75V3.5H8.25V2Z" style="fill: var(--element-active-color)"/>
<path d="M6.75 20H5.25V21.5H6.75V20Z" style="fill: var(--element-active-color)"/>
<path d="M8.25 20H9.75V21.5H8.25V20Z" style="fill: var(--element-active-color)"/>
<path d="M12.75 21.5V20H11.25V21.5H12.75Z" style="fill: var(--element-active-color)"/>
<path d="M14.25 20H15.75V21.5H14.25V20Z" style="fill: var(--element-active-color)"/>
<path d="M18.75 14H17.25V15.5H18.75V14Z" style="fill: var(--element-active-color)"/>
<path d="M5.25 8H6.75V9.5H5.25V8Z" style="fill: var(--element-active-color)"/>
<path d="M6.75 5H5.25V6.5H6.75V5Z" style="fill: var(--element-active-color)"/>
<path d="M18.75 17H17.25V18.5H18.75V17Z" style="fill: var(--element-active-color)"/>
<path d="M18.75 20H17.25V21.5H18.75V20Z" style="fill: var(--element-active-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M13.1522 6.73799C12.7799 6.26226 12.3761 5.84571 12 5.5C11.6239 5.84571 11.2201 6.26226 10.8478 6.73799C10.0497 7.75781 9.5 8.9133 9.5 10.1474V17.5L14.5 17.5V10.1474C14.5 8.9133 13.9503 7.75781 13.1522 6.73799ZM13 16V10.1474C13 9.37873 12.6604 8.55472 12 7.69984C11.3396 8.55472 11 9.37873 11 10.1474V16H13Z" style="fill: var(--element-active-color)"/>
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
    'obi-chart-safety-countour-on-proposal': ObiChartSafetyCountourOnProposal;
  }
}
