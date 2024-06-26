import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-10-keeping-track')
export class Obi10KeepingTrack extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M6 7.79312C6 4.59034 8.68286 2 12 2C15.3171 2 18 4.59034 18 7.79312C18 12.1379 12 18 12 18C12 18 6 12.1379 6 7.79312ZM9.85712 7.79312C9.85712 8.93516 10.8171 9.86208 12 9.86208C13.1829 9.86208 14.1429 8.93516 14.1429 7.79312C14.1429 6.65104 13.1829 5.72415 12 5.72415C10.8171 5.72415 9.85712 6.65104 9.85712 7.79312Z" fill="currentColor"/>
<path d="M2 22H4.22222V20H2V22Z" fill="currentColor"/>
<path d="M6.44444 22H10.8889V20H6.44444V22Z" fill="currentColor"/>
<path d="M13.1111 22H17.5556V20H13.1111V22Z" fill="currentColor"/>
<path d="M19.7778 22H22V20H19.7778V22Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M6 7.79312C6 4.59034 8.68286 2 12 2C15.3171 2 18 4.59034 18 7.79312C18 12.1379 12 18 12 18C12 18 6 12.1379 6 7.79312ZM9.85712 7.79312C9.85712 8.93516 10.8171 9.86208 12 9.86208C13.1829 9.86208 14.1429 8.93516 14.1429 7.79312C14.1429 6.65104 13.1829 5.72415 12 5.72415C10.8171 5.72415 9.85712 6.65104 9.85712 7.79312Z" style="fill: var(--element-active-color)"/>
<path d="M2 22H4.22222V20H2V22Z" style="fill: var(--element-active-color)"/>
<path d="M6.44444 22H10.8889V20H6.44444V22Z" style="fill: var(--element-active-color)"/>
<path d="M13.1111 22H17.5556V20H13.1111V22Z" style="fill: var(--element-active-color)"/>
<path d="M19.7778 22H22V20H19.7778V22Z" style="fill: var(--element-active-color)"/>
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
    'obi-10-keeping-track': Obi10KeepingTrack;
  }
}
