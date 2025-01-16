import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-page-last-google')
export class ObiPageLastGoogle extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M5.58976 7.41L10.1798 12L5.58976 16.59L6.99976 18L12.9998 12L6.99976 6L5.58976 7.41ZM17.9998 18L15.9998 18L15.9998 6L17.9998 6L17.9998 18Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M5.58976 7.41L10.1798 12L5.58976 16.59L6.99976 18L12.9998 12L6.99976 6L5.58976 7.41ZM17.9998 18L15.9998 18L15.9998 6L17.9998 6L17.9998 18Z" style="fill: var(--element-active-color)"/>
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
    'obi-page-last-google': ObiPageLastGoogle;
  }
}
