import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-keylinegrid')
export class ObiKeylinegrid extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M8.99999 6.5C8.99999 5.94771 8.55228 5.5 7.99999 5.5H6L6.00009 10.5H9L8.99999 6.5Z" fill="currentColor"/>
<path d="M18 10.5L18 6.5C18 5.94771 17.5523 5.5 17 5.5H15L15.0001 10.5H18Z" fill="currentColor"/>
<path d="M13.5 6.5L13.5 10.5H10.5001L10.5 5.5H12.5C13.0523 5.5 13.5 5.94771 13.5 6.5Z" fill="currentColor"/>
<path d="M3.13818 13.8468C3.45049 13.1775 3.60665 12.8429 3.84751 12.5979C4.06046 12.3813 4.31994 12.216 4.60628 12.1147C4.93015 12 5.29942 12 6.03796 12H22L21.1667 14.5H21C20.3196 14.5 19.6348 14.3502 18.9878 14.0645C18.6879 13.9353 17.9996 13.5073 17.9996 13.5073C17.9996 13.5073 17.3086 13.9292 17.0086 14.0584C15.7161 14.6143 14.2808 14.6138 12.9885 14.0572C12.6885 13.928 12.0002 13.5 12.0002 13.5C12.0002 13.5 11.3115 13.928 11.0115 14.0572C9.71724 14.6147 8.2797 14.6143 6.98564 14.056C6.68569 13.9268 6.00021 13.5 6.00021 13.5C6.00021 13.5 5.31167 13.9313 5.01172 14.0605C4.36216 14.3487 3.68364 14.5 3 14.5H2.83333L3.13818 13.8468Z" fill="currentColor"/>
<path d="M18 17.25C18.94 17.75 19.97 18 21 18H22V16H21C20.3196 16 19.6348 15.8502 18.9878 15.5645C18.6879 15.4353 17.9996 15.0073 17.9996 15.0073C17.9996 15.0073 17.3086 15.4292 17.0086 15.5584C15.7161 16.1143 14.2809 16.1139 12.9885 15.5572C12.6885 15.428 12.0002 15 12.0002 15C12.0002 15 11.3115 15.428 11.0115 15.5572C9.71724 16.1147 8.27971 16.1143 6.98565 15.556C6.6857 15.4268 6.00021 15 6.00021 15C6.00021 15 5.31167 15.4313 5.01172 15.5605C4.36216 15.8488 3.68364 16 3 16H2V18H3C4.03 18 5.05 17.75 6 17.25C7.89 18.25 10.11 18.25 12 17.25C13.89 18.25 16.11 18.25 18 17.25Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M8.99999 6.5C8.99999 5.94771 8.55228 5.5 7.99999 5.5H6L6.00009 10.5H9L8.99999 6.5Z" style="fill: var(--element-active-color)"/>
<path d="M18 10.5L18 6.5C18 5.94771 17.5523 5.5 17 5.5H15L15.0001 10.5H18Z" style="fill: var(--element-active-color)"/>
<path d="M13.5 6.5L13.5 10.5H10.5001L10.5 5.5H12.5C13.0523 5.5 13.5 5.94771 13.5 6.5Z" style="fill: var(--element-active-color)"/>
<path d="M3.13818 13.8468C3.45049 13.1775 3.60665 12.8429 3.84751 12.5979C4.06046 12.3813 4.31994 12.216 4.60628 12.1147C4.93015 12 5.29942 12 6.03796 12H22L21.1667 14.5H21C20.3196 14.5 19.6348 14.3502 18.9878 14.0645C18.6879 13.9353 17.9996 13.5073 17.9996 13.5073C17.9996 13.5073 17.3086 13.9292 17.0086 14.0584C15.7161 14.6143 14.2808 14.6138 12.9885 14.0572C12.6885 13.928 12.0002 13.5 12.0002 13.5C12.0002 13.5 11.3115 13.928 11.0115 14.0572C9.71724 14.6147 8.2797 14.6143 6.98564 14.056C6.68569 13.9268 6.00021 13.5 6.00021 13.5C6.00021 13.5 5.31167 13.9313 5.01172 14.0605C4.36216 14.3487 3.68364 14.5 3 14.5H2.83333L3.13818 13.8468Z" style="fill: var(--element-active-color)"/>
<path d="M18 17.25C18.94 17.75 19.97 18 21 18H22V16H21C20.3196 16 19.6348 15.8502 18.9878 15.5645C18.6879 15.4353 17.9996 15.0073 17.9996 15.0073C17.9996 15.0073 17.3086 15.4292 17.0086 15.5584C15.7161 16.1143 14.2809 16.1139 12.9885 15.5572C12.6885 15.428 12.0002 15 12.0002 15C12.0002 15 11.3115 15.428 11.0115 15.5572C9.71724 16.1147 8.27971 16.1143 6.98565 15.556C6.6857 15.4268 6.00021 15 6.00021 15C6.00021 15 5.31167 15.4313 5.01172 15.5605C4.36216 15.8488 3.68364 16 3 16H2V18H3C4.03 18 5.05 17.75 6 17.25C7.89 18.25 10.11 18.25 12 17.25C13.89 18.25 16.11 18.25 18 17.25Z" style="fill: var(--element-active-color)"/>
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
    'obi-keylinegrid': ObiKeylinegrid;
  }
}
