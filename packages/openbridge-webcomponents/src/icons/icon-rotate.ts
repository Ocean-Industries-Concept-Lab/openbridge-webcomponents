import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-rotate')
export class ObiRotate extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M7.05025 8.05015C4.31658 10.7838 4.31658 15.216 7.05025 17.9496C9.78392 20.6833 14.2161 20.6833 16.9497 17.9496C18.3166 16.5828 19 14.7913 19 12.9999H21C21 15.3032 20.1213 17.6065 18.364 19.3639C14.8492 22.8786 9.15076 22.8786 5.63604 19.3639C2.12132 15.8491 2.12132 10.1507 5.63604 6.63593C7.63522 4.63676 10.3409 3.77471 12.9494 4.04981L10.5858 1.68619L12 0.271973L16.9497 5.22172L12 10.1715L10.5858 8.75725L13.2341 6.10892C11.0573 5.72104 8.73228 6.36812 7.05025 8.05015Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M7.05025 8.05015C4.31658 10.7838 4.31658 15.216 7.05025 17.9496C9.78392 20.6833 14.2161 20.6833 16.9497 17.9496C18.3166 16.5828 19 14.7913 19 12.9999H21C21 15.3032 20.1213 17.6065 18.364 19.3639C14.8492 22.8786 9.15076 22.8786 5.63604 19.3639C2.12132 15.8491 2.12132 10.1507 5.63604 6.63593C7.63522 4.63676 10.3409 3.77471 12.9494 4.04981L10.5858 1.68619L12 0.271973L16.9497 5.22172L12 10.1715L10.5858 8.75725L13.2341 6.10892C11.0573 5.72104 8.73228 6.36812 7.05025 8.05015Z" style="fill: var(--element-active-color)"/>
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
    'obi-rotate': ObiRotate;
  }
}
