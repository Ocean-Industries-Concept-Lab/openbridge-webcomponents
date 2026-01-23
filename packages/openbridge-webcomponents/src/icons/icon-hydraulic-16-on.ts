import {LitElement, html, css, svg} from 'lit';
import {property} from 'lit/decorators.js';
import {customElement} from '../decorator.js';

@customElement('obi-hydraulic-16-on')
export class ObiHydraulic16On extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_8040_1544)">
<path d="M6.5 1V7H4.5V9H10.5V7H8.5V1H15.5V7H13.5V9H19.5V7H17.5V1H23V23H17.5V17H19.5V15H13.5V17H15.5V23H8.5V17H10.5V15H4.5V17H6.5V23H1V1H6.5Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M0 0V24H24V0H0ZM23 1L17.5 1V7H19.5V9H13.5V7H15.5V1H8.5V7H10.5V9H4.5V7H6.5L6.5 1H1L1 23H6.5V17H4.5V15H10.5V17H8.5V23H15.5V17H13.5V15H19.5V17H17.5V23H23V1Z" fill="currentColor"/>
</g>
<defs>
<clipPath id="clip0_8040_1544">
<rect width="24" height="24" fill="currentColor"/>
</clipPath>
</defs>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_8040_1544)">
<path d="M6.5 1V7H4.5V9H10.5V7H8.5V1H15.5V7H13.5V9H19.5V7H17.5V1H23V23H17.5V17H19.5V15H13.5V17H15.5V23H8.5V17H10.5V15H4.5V17H6.5V23H1V1H6.5Z" style="fill: var(--automation-device-primary-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M0 0V24H24V0H0ZM23 1L17.5 1V7H19.5V9H13.5V7H15.5V1H8.5V7H10.5V9H4.5V7H6.5L6.5 1H1L1 23H6.5V17H4.5V15H10.5V17H8.5V23H15.5V17H13.5V15H19.5V17H17.5V23H23V1Z" style="fill: var(--automation-device-tertiary-color)"/>
</g>
<defs>
<clipPath id="clip0_8040_1544">
<rect width="24" height="24" style="fill: var(--automation-device-primary-color)"/>
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
    'obi-hydraulic-16-on': ObiHydraulic16On;
  }
}
