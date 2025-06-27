import {LitElement, html, css, svg} from 'lit';
import {property} from 'lit/decorators.js';
import {customElement} from '../decorator.js';

@customElement('obi-connection-4-bars')
export class ObiConnection4Bars extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M3 16H6V20H3V16Z" fill="currentColor"/>
<path d="M8 12H11V20H8V12Z" fill="currentColor"/>
<path d="M13 8H16V20H13V8Z" fill="currentColor"/>
<path d="M18 4H21V20H18V4Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M3 16H6V20H3V16Z" style="fill: var(--element-active-color)"/>
<path d="M8 12H11V20H8V12Z" style="fill: var(--element-active-color)"/>
<path d="M13 8H16V20H13V8Z" style="fill: var(--element-active-color)"/>
<path d="M18 4H21V20H18V4Z" style="fill: var(--element-active-color)"/>
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
