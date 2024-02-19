import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-15-rank-2')
export class Obi15Rank2 extends LitElement {
  @property({type: Boolean, attribute: 'use-css-color'}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M2 17H22V19H2V17Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M16.2428 14C17.0282 13.0491 17.5 11.8296 17.5 10.5C17.5 7.46243 15.0376 5 12 5C8.96243 5 6.5 7.46243 6.5 10.5C6.5 11.8296 6.97182 13.0491 7.75716 14H2V16H22V14H16.2428ZM14.75 10.5C14.75 12.0188 13.5188 13.25 12 13.25C10.4812 13.25 9.25 12.0188 9.25 10.5C9.25 8.98122 10.4812 7.75 12 7.75C13.5188 7.75 14.75 8.98122 14.75 10.5Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M2 17H22V19H2V17Z" style="fill: var(--element-active-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M16.2428 14C17.0282 13.0491 17.5 11.8296 17.5 10.5C17.5 7.46243 15.0376 5 12 5C8.96243 5 6.5 7.46243 6.5 10.5C6.5 11.8296 6.97182 13.0491 7.75716 14H2V16H22V14H16.2428ZM14.75 10.5C14.75 12.0188 13.5188 13.25 12 13.25C10.4812 13.25 9.25 12.0188 9.25 10.5C9.25 8.98122 10.4812 7.75 12 7.75C13.5188 7.75 14.75 8.98122 14.75 10.5Z" style="fill: var(--element-active-color)"/>
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
    'obi-15-rank-2': Obi15Rank2;
  }
}
