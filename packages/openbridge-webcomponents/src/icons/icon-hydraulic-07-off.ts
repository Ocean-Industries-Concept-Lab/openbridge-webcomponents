import {LitElement, html, css, svg} from 'lit';
import {property} from 'lit/decorators.js';
import {customElement} from '../decorator.js';

@customElement('obi-hydraulic-07-off')
export class ObiHydraulic07Off extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_8040_1605)">
<path d="M6 1V1.875C6 2.14765 6.05599 2.41765 6.16406 2.66797L10.8613 12L6.16406 21.332C6.05599 21.5823 6 21.8524 6 22.125V23H1V1H6Z" fill="currentColor"/>
<path d="M14.0215 18.2783L11.6709 19.2451L17 23H8V22.125L11.9785 14.2207L14.0215 18.2783Z" fill="currentColor"/>
<path d="M23 1V23H17L18.1436 16.582L15.873 17.5166L13.0957 12L15.873 6.4834L18.1436 7.41797L17 1H23Z" fill="currentColor"/>
<path d="M17 1L11.6709 4.75488L14.0215 5.72168L11.9785 9.7793L8 1.875V1H17Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M0 24V0H24V24H0ZM17 1H8V1.87534L11.9786 9.77963L14.0211 5.72168L11.6705 4.75446L17 1ZM17 23H23V1L17 1L18.1439 7.41806L15.8728 6.48359L13.0962 12L15.8728 17.5164L18.1439 16.5819L17 23ZM8 22.1247L11.9786 14.2204L14.0211 18.2783L11.6705 19.2455L17 23H8V22.1247ZM6 1H1L1 23H6V22.1247C6 21.852 6.05577 21.5821 6.16388 21.3318L10.861 12L6.16388 2.66821C6.05577 2.41786 6 2.14804 6 1.87534V1Z" fill="currentColor"/>
</g>
<defs>
<clipPath id="clip0_8040_1605">
<rect width="24" height="24" fill="currentColor"/>
</clipPath>
</defs>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_8040_1605)">
<path d="M6 1V1.875C6 2.14765 6.05599 2.41765 6.16406 2.66797L10.8613 12L6.16406 21.332C6.05599 21.5823 6 21.8524 6 22.125V23H1V1H6Z" style="fill: var(--automation-device-primary-inverted-color)"/>
<path d="M14.0215 18.2783L11.6709 19.2451L17 23H8V22.125L11.9785 14.2207L14.0215 18.2783Z" style="fill: var(--automation-device-primary-inverted-color)"/>
<path d="M23 1V23H17L18.1436 16.582L15.873 17.5166L13.0957 12L15.873 6.4834L18.1436 7.41797L17 1H23Z" style="fill: var(--automation-device-primary-inverted-color)"/>
<path d="M17 1L11.6709 4.75488L14.0215 5.72168L11.9785 9.7793L8 1.875V1H17Z" style="fill: var(--automation-device-primary-inverted-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M0 24V0H24V24H0ZM17 1H8V1.87534L11.9786 9.77963L14.0211 5.72168L11.6705 4.75446L17 1ZM17 23H23V1L17 1L18.1439 7.41806L15.8728 6.48359L13.0962 12L15.8728 17.5164L18.1439 16.5819L17 23ZM8 22.1247L11.9786 14.2204L14.0211 18.2783L11.6705 19.2455L17 23H8V22.1247ZM6 1H1L1 23H6V22.1247C6 21.852 6.05577 21.5821 6.16388 21.3318L10.861 12L6.16388 2.66821C6.05577 2.41786 6 2.14804 6 1.87534V1Z" style="fill: var(--automation-device-tertiary-inverted-color)"/>
</g>
<defs>
<clipPath id="clip0_8040_1605">
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
    'obi-hydraulic-07-off': ObiHydraulic07Off;
  }
}
