import {LitElement, html, css, svg} from 'lit';
import {property} from 'lit/decorators.js';
import {customElement} from '../decorator.js';

@customElement('obi-hydraulic-04-static')
export class ObiHydraulic04Static extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_8040_1458)">
<path fill-rule="evenodd" clip-rule="evenodd" d="M0 0V24H24V0H0ZM15.5 23H8.49223V6.99988H11.5L7.50008 1L23 1V23H17.5V17H19.5V15H13.5V17H15.5V23ZM7.50008 1L3.5 6.99988H6.49223L6.49223 23H1L1 1L7.50008 1Z" fill="currentColor"/>
</g>
<defs>
<clipPath id="clip0_8040_1458">
<rect width="24" height="24" fill="currentColor"/>
</clipPath>
</defs>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_8040_1458)">
<path fill-rule="evenodd" clip-rule="evenodd" d="M0 0V24H24V0H0ZM15.5 23H8.49223V6.99988H11.5L7.50008 1L23 1V23H17.5V17H19.5V15H13.5V17H15.5V23ZM7.50008 1L3.5 6.99988H6.49223L6.49223 23H1L1 1L7.50008 1Z" style="fill: var(--automation-device-secondary-color)"/>
</g>
<defs>
<clipPath id="clip0_8040_1458">
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
    'obi-hydraulic-04-static': ObiHydraulic04Static;
  }
}
