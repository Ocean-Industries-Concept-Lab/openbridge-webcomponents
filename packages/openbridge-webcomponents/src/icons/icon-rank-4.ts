import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-rank-4')
export class ObiRank4 extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M2 18H22V20H2V18Z" fill="currentColor"/>
<path d="M2 15H22V17H2V15Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M16.2428 12C17.0282 11.0491 17.5 9.82963 17.5 8.5C17.5 5.46243 15.0376 3 12 3C8.96243 3 6.5 5.46243 6.5 8.5C6.5 9.82963 6.97182 11.0491 7.75716 12H2V14H22V12H16.2428ZM14.75 8.5C14.75 10.0188 13.5188 11.25 12 11.25C10.4812 11.25 9.25 10.0188 9.25 8.5C9.25 6.98122 10.4812 5.75 12 5.75C13.5188 5.75 14.75 6.98122 14.75 8.5Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M2 18H22V20H2V18Z" style="fill: var(--element-active-color)"/>
<path d="M2 15H22V17H2V15Z" style="fill: var(--element-active-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M16.2428 12C17.0282 11.0491 17.5 9.82963 17.5 8.5C17.5 5.46243 15.0376 3 12 3C8.96243 3 6.5 5.46243 6.5 8.5C6.5 9.82963 6.97182 11.0491 7.75716 12H2V14H22V12H16.2428ZM14.75 8.5C14.75 10.0188 13.5188 11.25 12 11.25C10.4812 11.25 9.25 10.0188 9.25 8.5C9.25 6.98122 10.4812 5.75 12 5.75C13.5188 5.75 14.75 6.98122 14.75 8.5Z" style="fill: var(--element-active-color)"/>
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
    'obi-rank-4': ObiRank4;
  }
}
