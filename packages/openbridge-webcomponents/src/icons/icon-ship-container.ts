import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-ship-container')
export class ObiShipContainer extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M9 5H13V7H9V5Z" fill="currentColor"/>
<path d="M9 8H13V10H9V8Z" fill="currentColor"/>
<path d="M14 8H18V10H14V8Z" fill="currentColor"/>
<path d="M4 8H8V10H4V8Z" fill="currentColor"/>
<path d="M8 5H4V7H8V5Z" fill="currentColor"/>
<path d="M18 17.25C18.94 17.75 19.97 18 21 18H22V16H21C20.3196 16 19.6348 15.8502 18.9878 15.5645C18.6879 15.4353 17.9996 15.0073 17.9996 15.0073C17.9996 15.0073 17.3086 15.4292 17.0086 15.5584C15.7161 16.1143 14.2809 16.1139 12.9885 15.5572C12.6885 15.428 12.0002 15 12.0002 15C12.0002 15 11.3115 15.428 11.0115 15.5572C9.71724 16.1147 8.27971 16.1143 6.98565 15.556C6.6857 15.4268 6.00021 15 6.00021 15C6.00021 15 5.31167 15.4313 5.01172 15.5605C4.36216 15.8488 3.68364 16 3 16H2V18H3C4.03 18 5.05 17.75 6 17.25C7.89 18.25 10.11 18.25 12 17.25C13.89 18.25 16.11 18.25 18 17.25Z" fill="currentColor"/>
<path d="M22 11L3 10.9999V14.5C3.68364 14.5 4.36216 14.3487 5.01172 14.0605C5.31167 13.9313 6.00021 13.5 6.00021 13.5C6.00021 13.5 6.6857 13.9268 6.98565 14.056C8.27971 14.6143 9.71724 14.6147 11.0115 14.0572C11.3115 13.928 12.0002 13.5 12.0002 13.5C12.0002 13.5 12.6885 13.928 12.9885 14.0572C14.2809 14.6139 15.7161 14.6143 17.0086 14.0584C17.3086 13.9292 17.9996 13.5073 17.9996 13.5073C17.9996 13.5073 18.6879 13.9353 18.9878 14.0645C19.3459 14.2226 19.7154 14.3391 20.0894 14.4116C21.2355 13.7081 22 12.4433 22 11Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M9 5H13V7H9V5Z" style="fill: var(--element-active-color)"/>
<path d="M9 8H13V10H9V8Z" style="fill: var(--element-active-color)"/>
<path d="M14 8H18V10H14V8Z" style="fill: var(--element-active-color)"/>
<path d="M4 8H8V10H4V8Z" style="fill: var(--element-active-color)"/>
<path d="M8 5H4V7H8V5Z" style="fill: var(--element-active-color)"/>
<path d="M18 17.25C18.94 17.75 19.97 18 21 18H22V16H21C20.3196 16 19.6348 15.8502 18.9878 15.5645C18.6879 15.4353 17.9996 15.0073 17.9996 15.0073C17.9996 15.0073 17.3086 15.4292 17.0086 15.5584C15.7161 16.1143 14.2809 16.1139 12.9885 15.5572C12.6885 15.428 12.0002 15 12.0002 15C12.0002 15 11.3115 15.428 11.0115 15.5572C9.71724 16.1147 8.27971 16.1143 6.98565 15.556C6.6857 15.4268 6.00021 15 6.00021 15C6.00021 15 5.31167 15.4313 5.01172 15.5605C4.36216 15.8488 3.68364 16 3 16H2V18H3C4.03 18 5.05 17.75 6 17.25C7.89 18.25 10.11 18.25 12 17.25C13.89 18.25 16.11 18.25 18 17.25Z" style="fill: var(--element-active-color)"/>
<path d="M22 11L3 10.9999V14.5C3.68364 14.5 4.36216 14.3487 5.01172 14.0605C5.31167 13.9313 6.00021 13.5 6.00021 13.5C6.00021 13.5 6.6857 13.9268 6.98565 14.056C8.27971 14.6143 9.71724 14.6147 11.0115 14.0572C11.3115 13.928 12.0002 13.5 12.0002 13.5C12.0002 13.5 12.6885 13.928 12.9885 14.0572C14.2809 14.6139 15.7161 14.6143 17.0086 14.0584C17.3086 13.9292 17.9996 13.5073 17.9996 13.5073C17.9996 13.5073 18.6879 13.9353 18.9878 14.0645C19.3459 14.2226 19.7154 14.3391 20.0894 14.4116C21.2355 13.7081 22 12.4433 22 11Z" style="fill: var(--element-active-color)"/>
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
    'obi-ship-container': ObiShipContainer;
  }
}