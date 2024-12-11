import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-tide-low')
export class ObiTideLow extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M2 20V22H22V20H2Z" fill="currentColor"/>
<path d="M21 18C19.97 18 18.94 17.75 18 17.25C16.11 18.25 13.89 18.25 12 17.25C10.11 18.25 7.89 18.25 6 17.25C5.05 17.75 4.03 18 3 18H2V16H3C3.68364 16 4.36195 15.8488 5.01151 15.5605C5.31146 15.4313 6 15 6 15C6 15 6.6857 15.428 6.98565 15.5572C8.27971 16.1155 9.71724 16.1147 11.0115 15.5572C11.3115 15.428 12 15 12 15C12 15 12.6885 15.428 12.9885 15.5572C14.2809 16.1139 15.7161 16.1143 17.0086 15.5584C17.3086 15.4292 17.9994 15.0073 17.9994 15.0073C17.9994 15.0073 18.6879 15.4353 18.9878 15.5645C19.6348 15.8502 20.3196 16 21 16H22V18H21Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M11.0001 9.17157L11 3H13L13.0001 9.17157L14.793 7.37868L16.2072 8.79289L12.0001 13L7.79297 8.79289L9.20718 7.37868L11.0001 9.17157Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M2 20V22H22V20H2Z" style="fill: var(--element-active-color)"/>
<path d="M21 18C19.97 18 18.94 17.75 18 17.25C16.11 18.25 13.89 18.25 12 17.25C10.11 18.25 7.89 18.25 6 17.25C5.05 17.75 4.03 18 3 18H2V16H3C3.68364 16 4.36195 15.8488 5.01151 15.5605C5.31146 15.4313 6 15 6 15C6 15 6.6857 15.428 6.98565 15.5572C8.27971 16.1155 9.71724 16.1147 11.0115 15.5572C11.3115 15.428 12 15 12 15C12 15 12.6885 15.428 12.9885 15.5572C14.2809 16.1139 15.7161 16.1143 17.0086 15.5584C17.3086 15.4292 17.9994 15.0073 17.9994 15.0073C17.9994 15.0073 18.6879 15.4353 18.9878 15.5645C19.6348 15.8502 20.3196 16 21 16H22V18H21Z" style="fill: var(--element-active-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M11.0001 9.17157L11 3H13L13.0001 9.17157L14.793 7.37868L16.2072 8.79289L12.0001 13L7.79297 8.79289L9.20718 7.37868L11.0001 9.17157Z" style="fill: var(--element-active-color)"/>
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
    'obi-tide-low': ObiTideLow;
  }
}
