import {LitElement, html, css, svg} from 'lit';
import {property} from 'lit/decorators.js';
import {customElement} from '../decorator.js';

@customElement('obi-connection-no-caution')
export class ObiConnectionNoCaution extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M5.5 20H3.5V18H5.5V20Z" fill="currentColor"/>
<path d="M10.5 20H8.5V18H10.5V20Z" fill="currentColor"/>
<path d="M15.5 20H13.5V18H15.5V20Z" fill="currentColor"/>
<path d="M20.5 20H18.5V18H20.5V20Z" fill="currentColor"/>
<path d="M4.5 7C4.78333 7 5.02122 7.09544 5.21289 7.28711C5.40456 7.47878 5.5 7.71667 5.5 8C5.5 8.28333 5.40456 8.52122 5.21289 8.71289C5.02122 8.90456 4.78333 9 4.5 9C4.21667 9 3.97878 8.90456 3.78711 8.71289C3.59544 8.52122 3.5 8.28333 3.5 8C3.5 7.71667 3.59544 7.47878 3.78711 7.28711C3.97878 7.09544 4.21667 7 4.5 7Z" fill="currentColor"/>
<path d="M5.5 6H3.5V2H5.5V6Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M5.5 20H3.5V18H5.5V20Z" style="fill: var(--element-active-color)"/>
<path d="M10.5 20H8.5V18H10.5V20Z" style="fill: var(--element-active-color)"/>
<path d="M15.5 20H13.5V18H15.5V20Z" style="fill: var(--element-active-color)"/>
<path d="M20.5 20H18.5V18H20.5V20Z" style="fill: var(--element-active-color)"/>
<path d="M4.5 7C4.78333 7 5.02122 7.09544 5.21289 7.28711C5.40456 7.47878 5.5 7.71667 5.5 8C5.5 8.28333 5.40456 8.52122 5.21289 8.71289C5.02122 8.90456 4.78333 9 4.5 9C4.21667 9 3.97878 8.90456 3.78711 8.71289C3.59544 8.52122 3.5 8.28333 3.5 8C3.5 7.71667 3.59544 7.47878 3.78711 7.28711C3.97878 7.09544 4.21667 7 4.5 7Z" style="fill: var(--element-active-color)"/>
<path d="M5.5 6H3.5V2H5.5V6Z" style="fill: var(--element-active-color)"/>
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
    'obi-connection-no-caution': ObiConnectionNoCaution;
  }
}
