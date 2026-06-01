import {LitElement, html, css, svg} from 'lit';
import {property} from 'lit/decorators.js';
import {customElement} from '../decorator.js';

@customElement('obi-hydraulic-12-on')
export class ObiHydraulic12On extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_8040_1530)">
<path d="M23 1V23H12L16 17H12.9922V7H16L12 1L8 7H10.9922L10.9961 12L10.9922 17H8L12 23H1V1H23Z" fill="currentColor"/>
<path d="M16 7H12.9922V17.0002H16L12 23.0002L8 17.0002H10.9922L10.9959 12.0001L10.9922 7H8L12 1L16 7Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M0 0V24H24V0H0ZM1 23L1 1L23 1V23H1Z" fill="currentColor"/>
</g>
<defs>
<clipPath id="clip0_8040_1530">
<rect width="24" height="24" fill="currentColor"/>
</clipPath>
</defs>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_8040_1530)">
<path d="M23 1V23H12L16 17H12.9922V7H16L12 1L8 7H10.9922L10.9961 12L10.9922 17H8L12 23H1V1H23Z" style="fill: var(--automation-device-primary-color)"/>
<path d="M16 7H12.9922V17.0002H16L12 23.0002L8 17.0002H10.9922L10.9959 12.0001L10.9922 7H8L12 1L16 7Z" style="fill: var(--automation-device-tertiary-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M0 0V24H24V0H0ZM1 23L1 1L23 1V23H1Z" style="fill: var(--automation-device-tertiary-color)"/>
</g>
<defs>
<clipPath id="clip0_8040_1530">
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
    'obi-hydraulic-12-on': ObiHydraulic12On;
  }
}
