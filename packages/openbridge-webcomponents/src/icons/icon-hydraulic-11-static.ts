import {LitElement, html, css, svg} from 'lit';
import {property} from 'lit/decorators.js';
import {customElement} from '../decorator.js';

@customElement('obi-hydraulic-11-static')
export class ObiHydraulic11Static extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_8528_1387)">
<path fill-rule="evenodd" clip-rule="evenodd" d="M0 0V24H24V0H0ZM14.3083 23H6.5V22.3336L14.3728 6.69258L16.6439 7.62705L15.5 1.20898L10.1705 4.96344L12.5211 5.93066L4.66388 21.5408C4.55577 21.7911 4.5 22.0609 4.5 22.3336V23H1L1 1L23 1V23H16.3083V17.25H18.3083V15.25H12.3083V17.25H14.3083V23Z" fill="currentColor"/>
</g>
<defs>
<clipPath id="clip0_8528_1387">
<rect width="24" height="24" fill="currentColor"/>
</clipPath>
</defs>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_8528_1387)">
<path fill-rule="evenodd" clip-rule="evenodd" d="M0 0V24H24V0H0ZM14.3083 23H6.5V22.3336L14.3728 6.69258L16.6439 7.62705L15.5 1.20898L10.1705 4.96344L12.5211 5.93066L4.66388 21.5408C4.55577 21.7911 4.5 22.0609 4.5 22.3336V23H1L1 1L23 1V23H16.3083V17.25H18.3083V15.25H12.3083V17.25H14.3083V23Z" style="fill: var(--automation-device-secondary-color)"/>
</g>
<defs>
<clipPath id="clip0_8528_1387">
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
    'obi-hydraulic-11-static': ObiHydraulic11Static;
  }
}
