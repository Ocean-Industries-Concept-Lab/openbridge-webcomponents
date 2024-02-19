import {LitElement, html, css, svg, unsafeCSS} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-12-altitute')
export class Obi12Altitute extends LitElement {
  @property({type: Boolean, attribute: 'use-css-color'}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M2 21H22V19H2V21Z" fill="currentColor"/>
<path d="M15 9H13V15H15L12 18L9 15H11V9H9L12 6L15 9Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M3 4H2V2H3V4ZM7 4H5V2H7V4ZM11 4H9V2H11V4ZM15 4H13V2H15V4ZM19 4H17V2H19V4ZM22 4H21V2H22V4Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M2 21H22V19H2V21Z" style="fill: var(--element-active-color)"/>
<path d="M15 9H13V15H15L12 18L9 15H11V9H9L12 6L15 9Z" style="fill: var(--element-active-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M3 4H2V2H3V4ZM7 4H5V2H7V4ZM11 4H9V2H11V4ZM15 4H13V2H15V4ZM19 4H17V2H19V4ZM22 4H21V2H22V4Z" style="fill: var(--element-active-color)"/>
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
    }
    .wrapper > * {
      height: 100%;
      width: 100%;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    'obi-12-altitute': Obi12Altitute;
  }
}
