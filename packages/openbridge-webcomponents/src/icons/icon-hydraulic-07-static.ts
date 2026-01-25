import {LitElement, html, css, svg} from 'lit';
import {property} from 'lit/decorators.js';
import {customElement} from '../decorator.js';

@customElement('obi-hydraulic-07-static')
export class ObiHydraulic07Static extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_8040_1598)">
<path fill-rule="evenodd" clip-rule="evenodd" d="M0 24V0H24V24H0ZM17 1H8V1.87534L11.9786 9.77963L14.0211 5.72168L11.6705 4.75446L17 1ZM17 23H23V1L17 1L18.1439 7.41806L15.8728 6.48359L13.0962 12L15.8728 17.5164L18.1439 16.5819L17 23ZM8 22.1247L11.9786 14.2204L14.0211 18.2783L11.6705 19.2455L17 23H8V22.1247ZM6 1H1L1 23H6V22.1247C6 21.852 6.05577 21.5821 6.16388 21.3318L10.861 12L6.16388 2.66821C6.05577 2.41786 6 2.14804 6 1.87534V1Z" fill="currentColor"/>
</g>
<defs>
<clipPath id="clip0_8040_1598">
<rect width="24" height="24" fill="currentColor"/>
</clipPath>
</defs>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_8040_1598)">
<path fill-rule="evenodd" clip-rule="evenodd" d="M0 24V0H24V24H0ZM17 1H8V1.87534L11.9786 9.77963L14.0211 5.72168L11.6705 4.75446L17 1ZM17 23H23V1L17 1L18.1439 7.41806L15.8728 6.48359L13.0962 12L15.8728 17.5164L18.1439 16.5819L17 23ZM8 22.1247L11.9786 14.2204L14.0211 18.2783L11.6705 19.2455L17 23H8V22.1247ZM6 1H1L1 23H6V22.1247C6 21.852 6.05577 21.5821 6.16388 21.3318L10.861 12L6.16388 2.66821C6.05577 2.41786 6 2.14804 6 1.87534V1Z" style="fill: var(--automation-device-secondary-color)"/>
</g>
<defs>
<clipPath id="clip0_8040_1598">
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
    'obi-hydraulic-07-static': ObiHydraulic07Static;
  }
}
