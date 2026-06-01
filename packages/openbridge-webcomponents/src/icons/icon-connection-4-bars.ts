import {LitElement, html, css, svg} from 'lit';
import {property} from 'lit/decorators.js';
import {customElement} from '../decorator.js';

@customElement('obi-connection-4-bars')
export class ObiConnection4Bars extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M3.5 13H5.5V20H3.5V13Z" fill="currentColor"/>
<path d="M8.5 10H10.5V20H8.5V10Z" fill="currentColor"/>
<path d="M13.5 7H15.5V20H13.5V7Z" fill="currentColor"/>
<path d="M18.5 4H20.5V20H18.5V4Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M3.5 13H5.5V20H3.5V13Z" style="fill: var(--element-active-color)"/>
<path d="M8.5 10H10.5V20H8.5V10Z" style="fill: var(--element-active-color)"/>
<path d="M13.5 7H15.5V20H13.5V7Z" style="fill: var(--element-active-color)"/>
<path d="M18.5 4H20.5V20H18.5V4Z" style="fill: var(--element-active-color)"/>
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
    'obi-connection-4-bars': ObiConnection4Bars;
  }
}
