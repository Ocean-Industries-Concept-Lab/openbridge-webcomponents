import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-13-winch')
export class Obi13Winch extends LitElement {
  @property({type: Boolean, attribute: 'use-css-color'}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M3 5C3 4.44772 3.44772 4 4 4H6C6.55228 4 7 4.44772 7 5V13C7 13.5523 6.55228 14 6 14H4C3.44772 14 3 13.5523 3 13V5Z" fill="currentColor"/>
<path d="M8 6H10V12H8V6Z" fill="currentColor"/>
<path d="M11 6H13V12H11V6Z" fill="currentColor"/>
<path d="M14 6H16V20H14V6Z" fill="currentColor"/>
<path d="M17 5C17 4.44772 17.4477 4 18 4H20C20.5523 4 21 4.44772 21 5V13C21 13.5523 20.5523 14 20 14H18C17.4477 14 17 13.5523 17 13V5Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M3 5C3 4.44772 3.44772 4 4 4H6C6.55228 4 7 4.44772 7 5V13C7 13.5523 6.55228 14 6 14H4C3.44772 14 3 13.5523 3 13V5Z" style="fill: var(--element-active-color)"/>
<path d="M8 6H10V12H8V6Z" style="fill: var(--element-active-color)"/>
<path d="M11 6H13V12H11V6Z" style="fill: var(--element-active-color)"/>
<path d="M14 6H16V20H14V6Z" style="fill: var(--element-active-color)"/>
<path d="M17 5C17 4.44772 17.4477 4 18 4H20C20.5523 4 21 4.44772 21 5V13C21 13.5523 20.5523 14 20 14H18C17.4477 14 17 13.5523 17 13V5Z" style="fill: var(--element-active-color)"/>
</svg>
`;

  override render() {
    return html`
      <div class="wrapper" >
        ${this.useCssColor? this.iconCss : this.icon}
      </div>
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
    'obi-13-winch': Obi13Winch;
  }
}