import {LitElement, html, css, svg} from 'lit';
import {property} from 'lit/decorators.js';
import {customElement} from '../decorator.js';

@customElement('obi-hydraulic-09-static')
export class ObiHydraulic09Static extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_8040_1500)">
<path fill-rule="evenodd" clip-rule="evenodd" d="M0 24V0H24V24H0ZM16 1L8 1V7H10V9H4V7H6V1L1 1L1 23H6L6 12.5C6 11.6716 6.67157 11 7.5 11H16L16 1ZM16.5 13C17.3284 13 18 12.3284 18 11.5V1L23 1V23H18V17H20V15H14V17H16V23H8L8 13H16.5Z" fill="currentColor"/>
</g>
<defs>
<clipPath id="clip0_8040_1500">
<rect width="24" height="24" fill="currentColor"/>
</clipPath>
</defs>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_8040_1500)">
<path fill-rule="evenodd" clip-rule="evenodd" d="M0 24V0H24V24H0ZM16 1L8 1V7H10V9H4V7H6V1L1 1L1 23H6L6 12.5C6 11.6716 6.67157 11 7.5 11H16L16 1ZM16.5 13C17.3284 13 18 12.3284 18 11.5V1L23 1V23H18V17H20V15H14V17H16V23H8L8 13H16.5Z" style="fill: var(--automation-device-secondary-color)"/>
</g>
<defs>
<clipPath id="clip0_8040_1500">
<rect width="24" height="24" fill="none"/>
</clipPath>
</defs>
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
    'obi-hydraulic-09-static': ObiHydraulic09Static;
  }
}
