import {LitElement, html, css, svg} from 'lit';
import {property} from 'lit/decorators.js';
import {customElement} from '../decorator.js';

@customElement('obi-hydraulic-08-off')
export class ObiHydraulic08Off extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_8040_1493)">
<path d="M6 7H4V9H10V7H8V1H16V7H14V9H20V7H18V1H23V23H18V15H6V23H1V1H6V7Z" fill="currentColor"/>
<path d="M16 23H8V17H16V23Z" fill="currentColor"/>
<path d="M0 0V24H24V0H0ZM18 1L23 1V23H18V15H6V23H1L1 1H6L6 7H4V9H10V7H8V1H16V7H14V9H20V7H18V1ZM16 17V23H8V17H16Z" fill="currentColor"/>
</g>
<defs>
<clipPath id="clip0_8040_1493">
<rect width="24" height="24" fill="currentColor"/>
</clipPath>
</defs>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_8040_1493)">
<path d="M6 7H4V9H10V7H8V1H16V7H14V9H20V7H18V1H23V23H18V15H6V23H1V1H6V7Z" style="fill: var(--automation-device-primary-inverted-color)"/>
<path d="M16 23H8V17H16V23Z" style="fill: var(--automation-device-primary-inverted-color)"/>
<path d="M0 0V24H24V0H0ZM18 1L23 1V23H18V15H6V23H1L1 1H6L6 7H4V9H10V7H8V1H16V7H14V9H20V7H18V1ZM16 17V23H8V17H16Z" style="fill: var(--automation-device-tertiary-inverted-color)"/>
</g>
<defs>
<clipPath id="clip0_8040_1493">
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
    'obi-hydraulic-08-off': ObiHydraulic08Off;
  }
}
