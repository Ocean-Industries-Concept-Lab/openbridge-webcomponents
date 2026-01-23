import {LitElement, html, css, svg} from 'lit';
import {property} from 'lit/decorators.js';
import {customElement} from '../decorator.js';

@customElement('obi-hydraulic-10-static')
export class ObiHydraulic10Static extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_8040_1514)">
<path d="M0 24V0H24V24H0ZM23 1L8.16455 1V1.83433L16.0374 17.4754L18.3084 16.5409L17.1646 22.959L11.835 19.2045L14.1857 18.2373L6.32843 2.6272C6.22032 2.37684 6.16455 2.10703 6.16455 1.83433V1L1 1L1 23H6.5V17H4.5V15H10.5V17H8.5V23H23V1Z" fill="currentColor"/>
</g>
<defs>
<clipPath id="clip0_8040_1514">
<rect width="24" height="24" fill="currentColor"/>
</clipPath>
</defs>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_8040_1514)">
<path d="M0 24V0H24V24H0ZM23 1L8.16455 1V1.83433L16.0374 17.4754L18.3084 16.5409L17.1646 22.959L11.835 19.2045L14.1857 18.2373L6.32843 2.6272C6.22032 2.37684 6.16455 2.10703 6.16455 1.83433V1L1 1L1 23H6.5V17H4.5V15H10.5V17H8.5V23H23V1Z" style="fill: var(--automation-device-secondary-color)"/>
</g>
<defs>
<clipPath id="clip0_8040_1514">
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
    'obi-hydraulic-10-static': ObiHydraulic10Static;
  }
}
