import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-limits-attention')
export class ObiLimitsAttention extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M5 3V5H3V3H5Z" fill="currentColor"/>
<path d="M21 5H19V3H21V5Z" fill="currentColor"/>
<path d="M17 5L15 5V3H17V5Z" fill="currentColor"/>
<path d="M13 5L11 5V3H13V5Z" fill="currentColor"/>
<path d="M9 3H7V5H9V3Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M12.0001 7.58594L17.7072 13.293L16.293 14.7073L13.0001 11.4144V20.0002H11.0001V11.4144L7.70718 14.7073L6.29297 13.293L12.0001 7.58594Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M5 3V5H3V3H5Z" style="fill: var(--element-active-color)"/>
<path d="M21 5H19V3H21V5Z" style="fill: var(--element-active-color)"/>
<path d="M17 5L15 5V3H17V5Z" style="fill: var(--element-active-color)"/>
<path d="M13 5L11 5V3H13V5Z" style="fill: var(--element-active-color)"/>
<path d="M9 3H7V5H9V3Z" style="fill: var(--element-active-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M12.0001 7.58594L17.7072 13.293L16.293 14.7073L13.0001 11.4144V20.0002H11.0001V11.4144L7.70718 14.7073L6.29297 13.293L12.0001 7.58594Z" style="fill: var(--element-active-color)"/>
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
    'obi-limits-attention': ObiLimitsAttention;
  }
}
