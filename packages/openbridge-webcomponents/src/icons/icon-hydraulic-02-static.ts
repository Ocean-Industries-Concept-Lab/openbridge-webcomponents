import {LitElement, html, css, svg} from 'lit';
import {property} from 'lit/decorators.js';
import {customElement} from '../decorator.js';

@customElement('obi-hydraulic-02-static')
export class ObiHydraulic02Static extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_8040_1556)">
<path d="M0 24V0H24V24H0ZM16.5 1L8.49223 1V17.0001H11.5L7.5 23.0001L3.5 17.0001H6.49223L6.49223 1L1 1L1 23L7.5 23.0001L15.4922 23V7H12.5L16.5 1ZM16.5 1L20.5 7H17.4922V23H23V1L16.5 1Z" fill="currentColor"/>
</g>
<defs>
<clipPath id="clip0_8040_1556">
<rect width="24" height="24" fill="currentColor"/>
</clipPath>
</defs>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_8040_1556)">
<path d="M0 24V0H24V24H0ZM16.5 1L8.49223 1V17.0001H11.5L7.5 23.0001L3.5 17.0001H6.49223L6.49223 1L1 1L1 23L7.5 23.0001L15.4922 23V7H12.5L16.5 1ZM16.5 1L20.5 7H17.4922V23H23V1L16.5 1Z" style="fill: var(--automation-device-secondary-color)"/>
</g>
<defs>
<clipPath id="clip0_8040_1556">
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
    'obi-hydraulic-02-static': ObiHydraulic02Static;
  }
}
