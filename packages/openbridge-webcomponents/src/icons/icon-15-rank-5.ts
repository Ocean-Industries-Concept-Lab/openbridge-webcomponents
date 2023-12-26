import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-15-rank-5')
export class Obi15Rank5 extends LitElement {
  @property({type: Boolean, attribute: 'use-css-color'}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M2 19H22V21H2V19Z" fill="currentColor"/>
<path d="M2 16H22V18H2V16Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M16.2428 11C17.0282 10.0491 17.5 8.82963 17.5 7.5C17.5 4.46243 15.0376 2 12 2C8.96243 2 6.5 4.46243 6.5 7.5C6.5 8.82963 6.97182 10.0491 7.75716 11H2V13H22V11H16.2428ZM14.75 7.5C14.75 9.01878 13.5188 10.25 12 10.25C10.4812 10.25 9.25 9.01878 9.25 7.5C9.25 5.98122 10.4812 4.75 12 4.75C13.5188 4.75 14.75 5.98122 14.75 7.5Z" fill="currentColor"/>
<path d="M2 14H22V15H2V14Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M2 19H22V21H2V19Z" style="fill: var(--element-active-color)"/>
<path d="M2 16H22V18H2V16Z" style="fill: var(--element-active-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M16.2428 11C17.0282 10.0491 17.5 8.82963 17.5 7.5C17.5 4.46243 15.0376 2 12 2C8.96243 2 6.5 4.46243 6.5 7.5C6.5 8.82963 6.97182 10.0491 7.75716 11H2V13H22V11H16.2428ZM14.75 7.5C14.75 9.01878 13.5188 10.25 12 10.25C10.4812 10.25 9.25 9.01878 9.25 7.5C9.25 5.98122 10.4812 4.75 12 4.75C13.5188 4.75 14.75 5.98122 14.75 7.5Z" style="fill: var(--element-active-color)"/>
<path d="M2 14H22V15H2V14Z" style="fill: var(--element-active-color)"/>
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
    'obi-15-rank-5': Obi15Rank5;
  }
}
