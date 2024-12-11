import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-chart-safety-countour-off-proposal')
export class ObiChartSafetyCountourOffProposal extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M6.75027 2H5.25027V3.5H6.75027V2Z" fill="currentColor"/>
<path d="M11.2503 2H12.7503V3.5H11.2503V2Z" fill="currentColor"/>
<path d="M14.2503 2H15.7503V3.5H14.2503V2Z" fill="currentColor"/>
<path d="M18.7503 2H17.2503V3.5H18.7503V2Z" fill="currentColor"/>
<path d="M5.25027 17H6.75027V18.5H5.25027V17Z" fill="currentColor"/>
<path d="M6.75027 14H5.25027V15.5H6.75027V14Z" fill="currentColor"/>
<path d="M5.25027 11H6.75027V12.5H5.25027V11Z" fill="currentColor"/>
<path d="M18.7503 11H17.2503V12.5H18.7503V11Z" fill="currentColor"/>
<path d="M17.2503 8H18.7503V9.5H17.2503V8Z" fill="currentColor"/>
<path d="M18.7503 5H17.2503V6.5H18.7503V5Z" fill="currentColor"/>
<path d="M8.25027 2H9.75027V3.5H8.25027V2Z" fill="currentColor"/>
<path d="M6.75027 20H5.25027V21.5H6.75027V20Z" fill="currentColor"/>
<path d="M8.25027 20H9.75027V21.5H8.25027V20Z" fill="currentColor"/>
<path d="M12.7503 21.5V20H11.2503V21.5H12.7503Z" fill="currentColor"/>
<path d="M14.2503 20H15.7503V21.5H14.2503V20Z" fill="currentColor"/>
<path d="M18.7503 14H17.2503V15.5H18.7503V14Z" fill="currentColor"/>
<path d="M14.5003 10.1474V11.75L13.0003 10.25V10.1474C13.0003 9.37873 12.6607 8.55472 12.0003 7.69984C11.7533 8.01953 11.5512 8.3349 11.3949 8.64467L10.2921 7.54181C10.458 7.26571 10.645 6.99746 10.8481 6.73799C11.2204 6.26226 11.6242 5.84571 12.0003 5.5C12.3764 5.84571 12.7801 6.26226 13.1525 6.73799C13.9506 7.75781 14.5003 8.9133 14.5003 10.1474Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M2.00012 4.90249L9.50027 12.4026V17.5H14.5976L19.0976 22L20.5118 20.5858L3.41434 3.48828L2.00012 4.90249ZM11.0003 16V13.9026L13.0003 15.9026V16H11.0003Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M6.75027 2H5.25027V3.5H6.75027V2Z" style="fill: var(--element-active-color)"/>
<path d="M11.2503 2H12.7503V3.5H11.2503V2Z" style="fill: var(--element-active-color)"/>
<path d="M14.2503 2H15.7503V3.5H14.2503V2Z" style="fill: var(--element-active-color)"/>
<path d="M18.7503 2H17.2503V3.5H18.7503V2Z" style="fill: var(--element-active-color)"/>
<path d="M5.25027 17H6.75027V18.5H5.25027V17Z" style="fill: var(--element-active-color)"/>
<path d="M6.75027 14H5.25027V15.5H6.75027V14Z" style="fill: var(--element-active-color)"/>
<path d="M5.25027 11H6.75027V12.5H5.25027V11Z" style="fill: var(--element-active-color)"/>
<path d="M18.7503 11H17.2503V12.5H18.7503V11Z" style="fill: var(--element-active-color)"/>
<path d="M17.2503 8H18.7503V9.5H17.2503V8Z" style="fill: var(--element-active-color)"/>
<path d="M18.7503 5H17.2503V6.5H18.7503V5Z" style="fill: var(--element-active-color)"/>
<path d="M8.25027 2H9.75027V3.5H8.25027V2Z" style="fill: var(--element-active-color)"/>
<path d="M6.75027 20H5.25027V21.5H6.75027V20Z" style="fill: var(--element-active-color)"/>
<path d="M8.25027 20H9.75027V21.5H8.25027V20Z" style="fill: var(--element-active-color)"/>
<path d="M12.7503 21.5V20H11.2503V21.5H12.7503Z" style="fill: var(--element-active-color)"/>
<path d="M14.2503 20H15.7503V21.5H14.2503V20Z" style="fill: var(--element-active-color)"/>
<path d="M18.7503 14H17.2503V15.5H18.7503V14Z" style="fill: var(--element-active-color)"/>
<path d="M14.5003 10.1474V11.75L13.0003 10.25V10.1474C13.0003 9.37873 12.6607 8.55472 12.0003 7.69984C11.7533 8.01953 11.5512 8.3349 11.3949 8.64467L10.2921 7.54181C10.458 7.26571 10.645 6.99746 10.8481 6.73799C11.2204 6.26226 11.6242 5.84571 12.0003 5.5C12.3764 5.84571 12.7801 6.26226 13.1525 6.73799C13.9506 7.75781 14.5003 8.9133 14.5003 10.1474Z" style="fill: var(--element-active-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M2.00012 4.90249L9.50027 12.4026V17.5H14.5976L19.0976 22L20.5118 20.5858L3.41434 3.48828L2.00012 4.90249ZM11.0003 16V13.9026L13.0003 15.9026V16H11.0003Z" style="fill: var(--element-active-color)"/>
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
    'obi-chart-safety-countour-off-proposal': ObiChartSafetyCountourOffProposal;
  }
}