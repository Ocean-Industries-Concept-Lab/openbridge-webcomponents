import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-rank-3')
export class ObiRank3 extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M2 18H22V20H2V18Z" fill="currentColor"/>
<path d="M2 16H22V17H2V16Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M16.2428 13C17.0282 12.0491 17.5 10.8296 17.5 9.5C17.5 6.46243 15.0376 4 12 4C8.96243 4 6.5 6.46243 6.5 9.5C6.5 10.8296 6.97182 12.0491 7.75716 13H2V15H22V13H16.2428ZM14.75 9.5C14.75 11.0188 13.5188 12.25 12 12.25C10.4812 12.25 9.25 11.0188 9.25 9.5C9.25 7.98122 10.4812 6.75 12 6.75C13.5188 6.75 14.75 7.98122 14.75 9.5Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M2 18H22V20H2V18Z" style="fill: var(--element-active-color)"/>
<path d="M2 16H22V17H2V16Z" style="fill: var(--element-active-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M16.2428 13C17.0282 12.0491 17.5 10.8296 17.5 9.5C17.5 6.46243 15.0376 4 12 4C8.96243 4 6.5 6.46243 6.5 9.5C6.5 10.8296 6.97182 12.0491 7.75716 13H2V15H22V13H16.2428ZM14.75 9.5C14.75 11.0188 13.5188 12.25 12 12.25C10.4812 12.25 9.25 11.0188 9.25 9.5C9.25 7.98122 10.4812 6.75 12 6.75C13.5188 6.75 14.75 7.98122 14.75 9.5Z" style="fill: var(--element-active-color)"/>
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
    'obi-rank-3': ObiRank3;
  }
}
