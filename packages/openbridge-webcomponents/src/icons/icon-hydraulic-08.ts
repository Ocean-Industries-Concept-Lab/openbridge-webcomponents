import {LitElement, html, css, svg} from 'lit';
import {property} from 'lit/decorators.js';
import {customElement} from '../decorator.js';

@customElement('obi-hydraulic-08')
export class ObiHydraulic08 extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M6 15V23H8V17H16V23H18V15H6Z" fill="currentColor"/>
<path d="M18 7V1H16V7H14V9H20V7H18Z" fill="currentColor"/>
<path d="M8 7L8 1H6L6 7H4V9H10V7H8Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M6 15V23H8V17H16V23H18V15H6Z" style="fill: var(--element-active-color)"/>
<path d="M18 7V1H16V7H14V9H20V7H18Z" style="fill: var(--element-active-color)"/>
<path d="M8 7L8 1H6L6 7H4V9H10V7H8Z" style="fill: var(--element-active-color)"/>
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
    'obi-hydraulic-08': ObiHydraulic08;
  }
}
