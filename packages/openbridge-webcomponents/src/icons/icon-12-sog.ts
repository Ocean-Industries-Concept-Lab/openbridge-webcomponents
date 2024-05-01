import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-12-sog')
export class Obi12Sog extends LitElement {
  @property({type: Boolean, attribute: 'use-css-color'}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M9 3H6L10 7L6 11H9L13 7L9 3Z" fill="currentColor"/>
<path d="M18 7L14 3H11L15 7L11 11H14L18 7Z" fill="currentColor"/>
<path d="M11 15V13H13V15H11Z" fill="currentColor"/>
<path d="M11 18V16H13V18H11Z" fill="currentColor"/>
<path d="M2 21H22V19H2V21Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M9 3H6L10 7L6 11H9L13 7L9 3Z" style="fill: var(--element-active-color)"/>
<path d="M18 7L14 3H11L15 7L11 11H14L18 7Z" style="fill: var(--element-active-color)"/>
<path d="M11 15V13H13V15H11Z" style="fill: var(--element-active-color)"/>
<path d="M11 18V16H13V18H11Z" style="fill: var(--element-active-color)"/>
<path d="M2 21H22V19H2V21Z" style="fill: var(--element-active-color)"/>
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
    'obi-12-sog': Obi12Sog;
  }
}
