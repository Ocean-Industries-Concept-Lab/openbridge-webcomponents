import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-chart-safety-countour-off-proposal')
export class ObiChartSafetyCountourOffProposal extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M6.75015 2H5.25015V3.5H6.75015V2Z" fill="currentColor"/>
<path d="M11.2501 2H12.7501V3.5H11.2501V2Z" fill="currentColor"/>
<path d="M14.2502 2H15.7502V3.5H14.2502V2Z" fill="currentColor"/>
<path d="M18.7502 2H17.2502V3.5H18.7502V2Z" fill="currentColor"/>
<path d="M5.25015 17H6.75015V18.5H5.25015V17Z" fill="currentColor"/>
<path d="M6.75015 14H5.25015V15.5H6.75015V14Z" fill="currentColor"/>
<path d="M5.25015 11H6.75015V12.5H5.25015V11Z" fill="currentColor"/>
<path d="M18.7502 11H17.2502V12.5H18.7502V11Z" fill="currentColor"/>
<path d="M17.2502 8H18.7502V9.5H17.2502V8Z" fill="currentColor"/>
<path d="M18.7502 5H17.2502V6.5H18.7502V5Z" fill="currentColor"/>
<path d="M8.25015 2H9.75015V3.5H8.25015V2Z" fill="currentColor"/>
<path d="M6.75015 20H5.25015V21.5H6.75015V20Z" fill="currentColor"/>
<path d="M8.25015 20H9.75015V21.5H8.25015V20Z" fill="currentColor"/>
<path d="M12.7501 21.5V20H11.2501V21.5H12.7501Z" fill="currentColor"/>
<path d="M14.2502 20H15.7502V21.5H14.2502V20Z" fill="currentColor"/>
<path d="M18.7502 14H17.2502V15.5H18.7502V14Z" fill="currentColor"/>
<path d="M14.5001 10.1474V11.75L13.0001 10.25V10.1474C13.0001 9.37873 12.6606 8.55472 12.0001 7.69984C11.7532 8.01953 11.5511 8.3349 11.3948 8.64467L10.292 7.54181C10.4579 7.26571 10.6449 6.99746 10.848 6.73799C11.2203 6.26226 11.624 5.84571 12.0002 5.5C12.3763 5.84571 12.78 6.26226 13.1523 6.73799C13.9505 7.75781 14.5001 8.9133 14.5001 10.1474Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M2 4.90249L9.50015 12.4026V17.5H14.5975L19.0975 22L20.5117 20.5858L3.41421 3.48828L2 4.90249ZM11.0001 16V13.9026L13.0001 15.9026V16H11.0001Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M6.75015 2H5.25015V3.5H6.75015V2Z" style="fill: var(--element-active-color)"/>
<path d="M11.2501 2H12.7501V3.5H11.2501V2Z" style="fill: var(--element-active-color)"/>
<path d="M14.2502 2H15.7502V3.5H14.2502V2Z" style="fill: var(--element-active-color)"/>
<path d="M18.7502 2H17.2502V3.5H18.7502V2Z" style="fill: var(--element-active-color)"/>
<path d="M5.25015 17H6.75015V18.5H5.25015V17Z" style="fill: var(--element-active-color)"/>
<path d="M6.75015 14H5.25015V15.5H6.75015V14Z" style="fill: var(--element-active-color)"/>
<path d="M5.25015 11H6.75015V12.5H5.25015V11Z" style="fill: var(--element-active-color)"/>
<path d="M18.7502 11H17.2502V12.5H18.7502V11Z" style="fill: var(--element-active-color)"/>
<path d="M17.2502 8H18.7502V9.5H17.2502V8Z" style="fill: var(--element-active-color)"/>
<path d="M18.7502 5H17.2502V6.5H18.7502V5Z" style="fill: var(--element-active-color)"/>
<path d="M8.25015 2H9.75015V3.5H8.25015V2Z" style="fill: var(--element-active-color)"/>
<path d="M6.75015 20H5.25015V21.5H6.75015V20Z" style="fill: var(--element-active-color)"/>
<path d="M8.25015 20H9.75015V21.5H8.25015V20Z" style="fill: var(--element-active-color)"/>
<path d="M12.7501 21.5V20H11.2501V21.5H12.7501Z" style="fill: var(--element-active-color)"/>
<path d="M14.2502 20H15.7502V21.5H14.2502V20Z" style="fill: var(--element-active-color)"/>
<path d="M18.7502 14H17.2502V15.5H18.7502V14Z" style="fill: var(--element-active-color)"/>
<path d="M14.5001 10.1474V11.75L13.0001 10.25V10.1474C13.0001 9.37873 12.6606 8.55472 12.0001 7.69984C11.7532 8.01953 11.5511 8.3349 11.3948 8.64467L10.292 7.54181C10.4579 7.26571 10.6449 6.99746 10.848 6.73799C11.2203 6.26226 11.624 5.84571 12.0002 5.5C12.3763 5.84571 12.78 6.26226 13.1523 6.73799C13.9505 7.75781 14.5001 8.9133 14.5001 10.1474Z" style="fill: var(--element-active-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M2 4.90249L9.50015 12.4026V17.5H14.5975L19.0975 22L20.5117 20.5858L3.41421 3.48828L2 4.90249ZM11.0001 16V13.9026L13.0001 15.9026V16H11.0001Z" style="fill: var(--element-active-color)"/>
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
    'obi-chart-safety-countour-off-proposal': ObiChartSafetyCountourOffProposal;
  }
}
