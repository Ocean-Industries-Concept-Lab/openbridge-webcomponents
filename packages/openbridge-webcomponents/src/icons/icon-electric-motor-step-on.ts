import {LitElement, html, css, svg} from 'lit';
import {property} from 'lit/decorators.js';
import {customElement} from '../decorator.js';

@customElement('obi-electric-motor-step-on')
export class ObiElectricMotorStepOn extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_11002_2619)">
<path d="M12 1C18.0751 1 23 5.92487 23 12C23 18.0751 18.0751 23 12 23C5.92487 23 1 18.0751 1 12C1 5.92487 5.92487 1 12 1Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M12 24C18.6274 24 24 18.6274 24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12C0 18.6274 5.37258 24 12 24ZM12 23C18.0751 23 23 18.0751 23 12C23 5.92487 18.0751 1 12 1C5.92487 1 1 5.92487 1 12C1 18.0751 5.92487 23 12 23Z" fill="currentColor"/>
<path d="M11.0026 13.9189L8.63804 6.83625H8.58521C8.59401 7.0028 8.60722 7.24847 8.62484 7.57325C8.64245 7.8897 8.66006 8.23529 8.67768 8.61004C8.69529 8.97646 8.70409 9.31789 8.70409 9.63434V13.9189H7V5H9.61559L11.9141 11.8703H11.9538L14.3976 5H17V13.9189H15.2166V9.55939C15.2166 9.26792 15.221 8.94731 15.2299 8.59755C15.2475 8.23946 15.2607 7.90219 15.2695 7.58574C15.2871 7.26096 15.3003 7.01529 15.3091 6.84874H15.2563L12.7464 13.9189H11.0026Z" fill="currentColor"/>
<path d="M17 15.9459V18.7838H8.66667V20H7V17.1622H15.3333V15.9459H17Z" fill="currentColor"/>
</g>
<defs>
<clipPath id="clip0_11002_2619">
<rect width="24" height="24" fill="currentColor"/>
</clipPath>
</defs>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_11002_2619)">
<path d="M12 1C18.0751 1 23 5.92487 23 12C23 18.0751 18.0751 23 12 23C5.92487 23 1 18.0751 1 12C1 5.92487 5.92487 1 12 1Z" style="fill: var(--automation-device-primary-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M12 24C18.6274 24 24 18.6274 24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12C0 18.6274 5.37258 24 12 24ZM12 23C18.0751 23 23 18.0751 23 12C23 5.92487 18.0751 1 12 1C5.92487 1 1 5.92487 1 12C1 18.0751 5.92487 23 12 23Z" style="fill: var(--automation-device-tertiary-color)"/>
<path d="M11.0026 13.9189L8.63804 6.83625H8.58521C8.59401 7.0028 8.60722 7.24847 8.62484 7.57325C8.64245 7.8897 8.66006 8.23529 8.67768 8.61004C8.69529 8.97646 8.70409 9.31789 8.70409 9.63434V13.9189H7V5H9.61559L11.9141 11.8703H11.9538L14.3976 5H17V13.9189H15.2166V9.55939C15.2166 9.26792 15.221 8.94731 15.2299 8.59755C15.2475 8.23946 15.2607 7.90219 15.2695 7.58574C15.2871 7.26096 15.3003 7.01529 15.3091 6.84874H15.2563L12.7464 13.9189H11.0026Z" style="fill: var(--automation-device-tertiary-color)"/>
<path d="M17 15.9459V18.7838H8.66667V20H7V17.1622H15.3333V15.9459H17Z" style="fill: var(--automation-device-tertiary-color)"/>
</g>
<defs>
<clipPath id="clip0_11002_2619">
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
    'obi-electric-motor-step-on': ObiElectricMotorStepOn;
  }
}
