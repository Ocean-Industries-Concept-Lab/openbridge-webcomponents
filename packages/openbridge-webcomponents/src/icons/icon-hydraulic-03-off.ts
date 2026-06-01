import {LitElement, html, css, svg} from 'lit';
import {property} from 'lit/decorators.js';
import {customElement} from '../decorator.js';

@customElement('obi-hydraulic-03-off')
export class ObiHydraulic03Off extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_8040_1451)">
<path d="M24 0V24H0V0H24Z" fill="currentColor"/>
<path d="M8.49223 17.5001H11L7.5 23.0001L4 17.5001H6.49223V6.5H4L7.5 1L11 6.5H8.49223V17.5001Z" fill="currentColor"/>
<path d="M17.4922 17.5001H20L16.5 23.0001L13 17.5001H15.4922V6.5H13L16.5 1L20 6.5H17.4922V17.5001Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M0 0V24H24V0H0ZM1 23L1 1L23 1V23H1Z" fill="currentColor"/>
</g>
<defs>
<clipPath id="clip0_8040_1451">
<rect width="24" height="24" fill="currentColor"/>
</clipPath>
</defs>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_8040_1451)">
<path d="M24 0V24H0V0H24Z" style="fill: var(--automation-device-primary-inverted-color)"/>
<path d="M8.49223 17.5001H11L7.5 23.0001L4 17.5001H6.49223V6.5H4L7.5 1L11 6.5H8.49223V17.5001Z" style="fill: var(--automation-device-tertiary-inverted-color)"/>
<path d="M17.4922 17.5001H20L16.5 23.0001L13 17.5001H15.4922V6.5H13L16.5 1L20 6.5H17.4922V17.5001Z" style="fill: var(--automation-device-tertiary-inverted-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M0 0V24H24V0H0ZM1 23L1 1L23 1V23H1Z" style="fill: var(--automation-device-tertiary-inverted-color)"/>
</g>
<defs>
<clipPath id="clip0_8040_1451">
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
    'obi-hydraulic-03-off': ObiHydraulic03Off;
  }
}
