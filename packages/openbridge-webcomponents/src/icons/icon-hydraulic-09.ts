import {LitElement, html, css, svg} from 'lit';
import {property} from 'lit/decorators.js';
import {customElement} from '../decorator.js';

@customElement('obi-hydraulic-09')
export class ObiHydraulic09 extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M18 1V11.5C18 12.3284 17.3284 13 16.5 13H8L8 23H6L6 12.5C6 11.6716 6.67157 11 7.5 11H16L16 1L18 1Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M14 15V17H16V23H18V17H20V15H14Z" fill="currentColor"/>
<path d="M8 7V1H6V7H4V9H10V7H8Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M18 1V11.5C18 12.3284 17.3284 13 16.5 13H8L8 23H6L6 12.5C6 11.6716 6.67157 11 7.5 11H16L16 1L18 1Z" style="fill: var(--element-active-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M14 15V17H16V23H18V17H20V15H14Z" style="fill: var(--element-active-color)"/>
<path d="M8 7V1H6V7H4V9H10V7H8Z" style="fill: var(--element-active-color)"/>
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
    'obi-hydraulic-09': ObiHydraulic09;
  }
}
