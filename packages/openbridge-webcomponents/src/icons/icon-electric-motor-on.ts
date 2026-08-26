import {LitElement, html, css, svg} from 'lit';
import {property} from 'lit/decorators.js';
import {customElement} from '../decorator.js';

@customElement('obi-electric-motor-on')
export class ObiElectricMotorOn extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_11002_2610)">
<path d="M12 1C18.0751 1 23 5.92487 23 12C23 18.0751 18.0751 23 12 23C5.92487 23 1 18.0751 1 12C1 5.92487 5.92487 1 12 1Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M12 24C18.6274 24 24 18.6274 24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12C0 18.6274 5.37258 24 12 24ZM12 23C18.0751 23 23 18.0751 23 12C23 5.92487 18.0751 1 12 1C5.92487 1 1 5.92487 1 12C1 18.0751 5.92487 23 12 23Z" fill="currentColor"/>
<path d="M10.8032 17L7.96565 8.26471H7.90225C7.91281 8.47012 7.92867 8.77311 7.9498 9.17367C7.97094 9.56396 7.99207 9.9902 8.01321 10.4524C8.03435 10.9043 8.04491 11.3254 8.04491 11.7157V17H6V6H9.13871L11.897 14.4734H11.9445L14.8771 6H18V17H15.86V11.6233C15.86 11.2638 15.8653 10.8683 15.8758 10.437C15.897 9.99533 15.9128 9.57936 15.9234 9.18908C15.9445 8.78852 15.9604 8.48553 15.9709 8.28011H15.9075L12.8956 17H10.8032Z" fill="currentColor"/>
</g>
<defs>
<clipPath id="clip0_11002_2610">
<rect width="24" height="24" fill="currentColor"/>
</clipPath>
</defs>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_11002_2610)">
<path d="M12 1C18.0751 1 23 5.92487 23 12C23 18.0751 18.0751 23 12 23C5.92487 23 1 18.0751 1 12C1 5.92487 5.92487 1 12 1Z" style="fill: var(--automation-device-primary-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M12 24C18.6274 24 24 18.6274 24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12C0 18.6274 5.37258 24 12 24ZM12 23C18.0751 23 23 18.0751 23 12C23 5.92487 18.0751 1 12 1C5.92487 1 1 5.92487 1 12C1 18.0751 5.92487 23 12 23Z" style="fill: var(--automation-device-tertiary-color)"/>
<path d="M10.8032 17L7.96565 8.26471H7.90225C7.91281 8.47012 7.92867 8.77311 7.9498 9.17367C7.97094 9.56396 7.99207 9.9902 8.01321 10.4524C8.03435 10.9043 8.04491 11.3254 8.04491 11.7157V17H6V6H9.13871L11.897 14.4734H11.9445L14.8771 6H18V17H15.86V11.6233C15.86 11.2638 15.8653 10.8683 15.8758 10.437C15.897 9.99533 15.9128 9.57936 15.9234 9.18908C15.9445 8.78852 15.9604 8.48553 15.9709 8.28011H15.9075L12.8956 17H10.8032Z" style="fill: var(--automation-device-tertiary-color)"/>
</g>
<defs>
<clipPath id="clip0_11002_2610">
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
    'obi-electric-motor-on': ObiElectricMotorOn;
  }
}
