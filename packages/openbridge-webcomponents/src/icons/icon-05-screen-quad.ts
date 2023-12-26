import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-05-screen-quad')
export class Obi05ScreenQuad extends LitElement {
  @property({type: Boolean, attribute: 'use-css-color'}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M13 5H20V9H13V5Z" fill="currentColor"/>
<path d="M20 11H13V15H20V11Z" fill="currentColor"/>
<path d="M4 5H11V9H4V5Z" fill="currentColor"/>
<path d="M11 11H4V15H11V11Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M3 2H21C22.1 2 23 2.9 23 4V16C23 17.1 22.1 18 21 18H14V20H16V22H8V20H10V18H3C1.9 18 1 17.1 1 16V4C1 2.9 1.9 2 3 2ZM3 16H21V4H3V16Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M13 5H20V9H13V5Z" style="fill: var(--element-active-color)"/>
<path d="M20 11H13V15H20V11Z" style="fill: var(--element-active-color)"/>
<path d="M4 5H11V9H4V5Z" style="fill: var(--element-active-color)"/>
<path d="M11 11H4V15H11V11Z" style="fill: var(--element-active-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M3 2H21C22.1 2 23 2.9 23 4V16C23 17.1 22.1 18 21 18H14V20H16V22H8V20H10V18H3C1.9 18 1 17.1 1 16V4C1 2.9 1.9 2 3 2ZM3 16H21V4H3V16Z" style="fill: var(--element-active-color)"/>
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
    'obi-05-screen-quad': Obi05ScreenQuad;
  }
}
