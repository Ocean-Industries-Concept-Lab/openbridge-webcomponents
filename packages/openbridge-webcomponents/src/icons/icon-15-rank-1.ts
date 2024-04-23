import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-15-rank-1')
export class Obi15Rank1 extends LitElement {
  @property({type: Boolean, attribute: 'use-css-color'}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M16.2428 15C17.0282 14.0491 17.5 12.8296 17.5 11.5C17.5 8.46243 15.0376 6 12 6C8.96243 6 6.5 8.46243 6.5 11.5C6.5 12.8296 6.97182 14.0491 7.75716 15H2V17H22V15H16.2428ZM14.75 11.5C14.75 13.0188 13.5188 14.25 12 14.25C10.4812 14.25 9.25 13.0188 9.25 11.5C9.25 9.98122 10.4812 8.75 12 8.75C13.5188 8.75 14.75 9.98122 14.75 11.5Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M16.2428 15C17.0282 14.0491 17.5 12.8296 17.5 11.5C17.5 8.46243 15.0376 6 12 6C8.96243 6 6.5 8.46243 6.5 11.5C6.5 12.8296 6.97182 14.0491 7.75716 15H2V17H22V15H16.2428ZM14.75 11.5C14.75 13.0188 13.5188 14.25 12 14.25C10.4812 14.25 9.25 13.0188 9.25 11.5C9.25 9.98122 10.4812 8.75 12 8.75C13.5188 8.75 14.75 9.98122 14.75 11.5Z" style="fill: var(--element-active-color)"/>
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
    'obi-15-rank-1': Obi15Rank1;
  }
}
