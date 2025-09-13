import {LitElement, html, css, svg} from 'lit';
import {property} from 'lit/decorators.js';
import {customElement} from '../decorator.js';

@customElement('obi-screen-sharing')
export class ObiScreenSharing extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M17 3H20C21.1 3 22 3.9 22 5V16C22 17.1 21.1 18 20 18H14V20H16V22H8V20H10V18H4C2.9 18 2 17.1 2 16V5C2 3.9 2.9 3 4 3H7V5H4V16H20V5H17V3Z" fill="currentColor"/>
<path d="M17.207 7.79297L15.793 9.20703L13 6.41406V14H11V6.41406L8.20703 9.20703L6.79297 7.79297L12 2.58594L17.207 7.79297Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M17 3H20C21.1 3 22 3.9 22 5V16C22 17.1 21.1 18 20 18H14V20H16V22H8V20H10V18H4C2.9 18 2 17.1 2 16V5C2 3.9 2.9 3 4 3H7V5H4V16H20V5H17V3Z" style="fill: var(--element-active-color)"/>
<path d="M17.207 7.79297L15.793 9.20703L13 6.41406V14H11V6.41406L8.20703 9.20703L6.79297 7.79297L12 2.58594L17.207 7.79297Z" style="fill: var(--element-active-color)"/>
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
    'obi-screen-sharing': ObiScreenSharing;
  }
}
