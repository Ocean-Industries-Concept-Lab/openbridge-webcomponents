import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-tide')
export class ObiTide extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M6 11L6.00008 5.82843L4.20718 7.62132L2.79297 6.20711L7.00008 2L11.2072 6.20711L9.79297 7.62132L8.00008 5.82843L8 11H6Z" fill="currentColor"/>
<path d="M15.9985 2L15.9986 7.17157L14.2057 5.37868L12.7915 6.79289L16.9986 11L21.2057 6.79289L19.7915 5.37868L17.9986 7.17157L17.9985 2H15.9985Z" fill="currentColor"/>
<path d="M21 17C19.97 17 18.94 16.75 18 16.25C16.11 17.25 13.89 17.25 12 16.25C10.11 17.25 7.89 17.25 6 16.25C5.05 16.75 4.03 17 3 17H2V15H3C3.68364 15 4.36195 14.8488 5.01151 14.5605C5.31146 14.4313 6 14 6 14C6 14 6.6857 14.428 6.98565 14.5572C8.27971 15.1155 9.71724 15.1147 11.0115 14.5572C11.3115 14.428 12 14 12 14C12 14 12.6885 14.428 12.9885 14.5572C14.2809 15.1139 15.7161 15.1143 17.0086 14.5584C17.3086 14.4292 17.9994 14.0073 17.9994 14.0073C17.9994 14.0073 18.6879 14.4353 18.9878 14.5645C19.6348 14.8502 20.3196 15 21 15H22V17H21Z" fill="currentColor"/>
<path d="M2 20V22H22V20H2Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M6 11L6.00008 5.82843L4.20718 7.62132L2.79297 6.20711L7.00008 2L11.2072 6.20711L9.79297 7.62132L8.00008 5.82843L8 11H6Z" style="fill: var(--element-active-color)"/>
<path d="M15.9985 2L15.9986 7.17157L14.2057 5.37868L12.7915 6.79289L16.9986 11L21.2057 6.79289L19.7915 5.37868L17.9986 7.17157L17.9985 2H15.9985Z" style="fill: var(--element-active-color)"/>
<path d="M21 17C19.97 17 18.94 16.75 18 16.25C16.11 17.25 13.89 17.25 12 16.25C10.11 17.25 7.89 17.25 6 16.25C5.05 16.75 4.03 17 3 17H2V15H3C3.68364 15 4.36195 14.8488 5.01151 14.5605C5.31146 14.4313 6 14 6 14C6 14 6.6857 14.428 6.98565 14.5572C8.27971 15.1155 9.71724 15.1147 11.0115 14.5572C11.3115 14.428 12 14 12 14C12 14 12.6885 14.428 12.9885 14.5572C14.2809 15.1139 15.7161 15.1143 17.0086 14.5584C17.3086 14.4292 17.9994 14.0073 17.9994 14.0073C17.9994 14.0073 18.6879 14.4353 18.9878 14.5645C19.6348 14.8502 20.3196 15 21 15H22V17H21Z" style="fill: var(--element-active-color)"/>
<path d="M2 20V22H22V20H2Z" style="fill: var(--element-active-color)"/>
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
    'obi-tide': ObiTide;
  }
}