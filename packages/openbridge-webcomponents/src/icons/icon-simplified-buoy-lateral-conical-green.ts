import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-simplified-buoy-lateral-conical-green')
export class ObiSimplifiedBuoyLateralConicalGreen extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M20 21L4 21L17 3L20 21Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M20 21L17 3L4 21L20 21ZM18.8195 20L16.4076 5.52824L5.95576 20L18.8195 20Z" fill="currentColor"/>
<path d="M15 15C15 15.5523 14.5523 16 14 16C13.4477 16 13 15.5523 13 15C13 14.4477 13.4477 14 14 14C14.5523 14 15 14.4477 15 15Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M20 21L4 21L17 3L20 21Z" style="fill: var(--navigation-light-green-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M20 21L17 3L4 21L20 21ZM18.8195 20L16.4076 5.52824L5.95576 20L18.8195 20Z" style="fill: var(--element-active-color)"/>
<path d="M15 15C15 15.5523 14.5523 16 14 16C13.4477 16 13 15.5523 13 15C13 14.4477 13.4477 14 14 14C14.5523 14 15 14.4477 15 15Z" style="fill: var(--element-active-color)"/>
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
    'obi-simplified-buoy-lateral-conical-green': ObiSimplifiedBuoyLateralConicalGreen;
  }
}
