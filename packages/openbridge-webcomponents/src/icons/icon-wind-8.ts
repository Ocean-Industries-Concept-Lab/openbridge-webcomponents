import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-wind-8')
export class ObiWind8 extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M11 24H13L13 7H15L12 0L9 7H11L11 24Z" fill="currentColor"/>
<path d="M5 24L5 22H11V24H5Z" fill="currentColor"/>
<path d="M5 21L5 19H11V21H5Z" fill="currentColor"/>
<path d="M5 18L5 16H11V18H5Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M11 24H13L13 7H15L12 0L9 7H11L11 24Z" style="fill: var(--element-active-color)"/>
<path d="M5 24L5 22H11V24H5Z" style="fill: var(--element-active-color)"/>
<path d="M5 21L5 19H11V21H5Z" style="fill: var(--element-active-color)"/>
<path d="M5 18L5 16H11V18H5Z" style="fill: var(--element-active-color)"/>
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
    'obi-wind-8': ObiWind8;
  }
}
