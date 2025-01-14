import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-chart-catzoc-iec')
export class ObiChartCatzocIec extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M21.3147 4.5H2.68543C2.28871 4.5 2.05 4.93987 2.26621 5.2725L11.5808 19.6027C11.778 19.906 12.2221 19.906 12.4193 19.6027L21.7339 5.27249C21.9501 4.93987 21.7114 4.5 21.3147 4.5ZM2.68543 3H21.3147C22.9016 3 23.8564 4.75947 22.9916 6.08998L13.6769 20.4202C12.8883 21.6335 11.1119 21.6335 10.3232 20.4202L1.00854 6.08998C0.143712 4.75947 1.09855 3 2.68543 3Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M7.20101 7.25L6.60054 6.20996L7.89957 5.45996L8.50006 6.50001L9.10054 5.45996L10.3996 6.20996L9.7991 7.25H11.0001V8.75H9.79909L10.3996 9.79009L9.10053 10.5401L8.50005 9.50001L7.89958 10.5401L6.60053 9.79009L7.20102 8.75H6.00006V7.25H7.20101Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M10.701 12.79L10.1005 11.75L11.3996 11L12.0001 12.0401L12.6005 11L13.8996 11.75L13.2991 12.79H14.5001V14.29H13.2991L13.8996 15.3301L12.6005 16.0801L12.0001 15.0401L11.3996 16.0801L10.1005 15.3301L10.701 14.29H9.50006V12.79H10.701Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M14.201 7.25L13.6005 6.20996L14.8996 5.45996L15.5001 6.50001L16.1005 5.45996L17.3996 6.20996L16.7991 7.25H18.0001V8.75H16.7991L17.3996 9.79009L16.1005 10.5401L15.5001 9.50001L14.8996 10.5401L13.6005 9.79009L14.201 8.75H13.0001V7.25H14.201Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M21.3147 4.5H2.68543C2.28871 4.5 2.05 4.93987 2.26621 5.2725L11.5808 19.6027C11.778 19.906 12.2221 19.906 12.4193 19.6027L21.7339 5.27249C21.9501 4.93987 21.7114 4.5 21.3147 4.5ZM2.68543 3H21.3147C22.9016 3 23.8564 4.75947 22.9916 6.08998L13.6769 20.4202C12.8883 21.6335 11.1119 21.6335 10.3232 20.4202L1.00854 6.08998C0.143712 4.75947 1.09855 3 2.68543 3Z" style="fill: var(--element-active-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M7.20101 7.25L6.60054 6.20996L7.89957 5.45996L8.50006 6.50001L9.10054 5.45996L10.3996 6.20996L9.7991 7.25H11.0001V8.75H9.79909L10.3996 9.79009L9.10053 10.5401L8.50005 9.50001L7.89958 10.5401L6.60053 9.79009L7.20102 8.75H6.00006V7.25H7.20101Z" style="fill: var(--element-active-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M10.701 12.79L10.1005 11.75L11.3996 11L12.0001 12.0401L12.6005 11L13.8996 11.75L13.2991 12.79H14.5001V14.29H13.2991L13.8996 15.3301L12.6005 16.0801L12.0001 15.0401L11.3996 16.0801L10.1005 15.3301L10.701 14.29H9.50006V12.79H10.701Z" style="fill: var(--element-active-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M14.201 7.25L13.6005 6.20996L14.8996 5.45996L15.5001 6.50001L16.1005 5.45996L17.3996 6.20996L16.7991 7.25H18.0001V8.75H16.7991L17.3996 9.79009L16.1005 10.5401L15.5001 9.50001L14.8996 10.5401L13.6005 9.79009L14.201 8.75H13.0001V7.25H14.201Z" style="fill: var(--element-active-color)"/>
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
    'obi-chart-catzoc-iec': ObiChartCatzocIec;
  }
}