import {LitElement, html, css, svg} from 'lit';
import {property} from 'lit/decorators.js';
import {customElement} from '../decorator.js';

@customElement('obi-diesel-engine-on')
export class ObiDieselEngineOn extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_11002_2646)">
<path d="M12 1C18.0751 1 23 5.92487 23 12C23 18.0751 18.0751 23 12 23C5.92487 23 1 18.0751 1 12C1 5.92487 5.92487 1 12 1Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M12 24C18.6274 24 24 18.6274 24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12C0 18.6274 5.37258 24 12 24ZM12 23C18.0751 23 23 18.0751 23 12C23 5.92487 18.0751 1 12 1C5.92487 1 1 5.92487 1 12C1 18.0751 5.92487 23 12 23Z" fill="currentColor"/>
<path d="M19 16H14.0133V7H19V8.5H15.769V10.5672H18.7805V12.0672H15.769V14.4874H19V16Z" fill="currentColor"/>
<path d="M12.1935 11.4118C12.1935 12.4202 12.0066 13.2647 11.6327 13.9454C11.2588 14.6261 10.7182 15.1387 10.0111 15.4832C9.30391 15.8277 8.45045 16 7.45067 16H5V7H7.7189C8.62927 7 9.41771 7.16807 10.0842 7.5042C10.7507 7.84034 11.2669 8.33613 11.6327 8.9916C12.0066 9.63866 12.1935 10.4454 12.1935 11.4118ZM10.3646 11.4622C10.3646 10.7815 10.2671 10.2227 10.072 9.78571C9.87695 9.34874 9.58434 9.02521 9.19418 8.81513C8.81215 8.60504 8.34478 8.5 7.79206 8.5H6.7557V14.4874H7.59698C8.5236 14.4874 9.2145 14.2353 9.66968 13.7311C10.133 13.2269 10.3646 12.4706 10.3646 11.4622Z" fill="currentColor"/>
</g>
<defs>
<clipPath id="clip0_11002_2646">
<rect width="24" height="24" fill="currentColor"/>
</clipPath>
</defs>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_11002_2646)">
<path d="M12 1C18.0751 1 23 5.92487 23 12C23 18.0751 18.0751 23 12 23C5.92487 23 1 18.0751 1 12C1 5.92487 5.92487 1 12 1Z" style="fill: var(--automation-device-primary-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M12 24C18.6274 24 24 18.6274 24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12C0 18.6274 5.37258 24 12 24ZM12 23C18.0751 23 23 18.0751 23 12C23 5.92487 18.0751 1 12 1C5.92487 1 1 5.92487 1 12C1 18.0751 5.92487 23 12 23Z" style="fill: var(--automation-device-tertiary-color)"/>
<path d="M19 16H14.0133V7H19V8.5H15.769V10.5672H18.7805V12.0672H15.769V14.4874H19V16Z" style="fill: var(--automation-device-tertiary-color)"/>
<path d="M12.1935 11.4118C12.1935 12.4202 12.0066 13.2647 11.6327 13.9454C11.2588 14.6261 10.7182 15.1387 10.0111 15.4832C9.30391 15.8277 8.45045 16 7.45067 16H5V7H7.7189C8.62927 7 9.41771 7.16807 10.0842 7.5042C10.7507 7.84034 11.2669 8.33613 11.6327 8.9916C12.0066 9.63866 12.1935 10.4454 12.1935 11.4118ZM10.3646 11.4622C10.3646 10.7815 10.2671 10.2227 10.072 9.78571C9.87695 9.34874 9.58434 9.02521 9.19418 8.81513C8.81215 8.60504 8.34478 8.5 7.79206 8.5H6.7557V14.4874H7.59698C8.5236 14.4874 9.2145 14.2353 9.66968 13.7311C10.133 13.2269 10.3646 12.4706 10.3646 11.4622Z" style="fill: var(--automation-device-tertiary-color)"/>
</g>
<defs>
<clipPath id="clip0_11002_2646">
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
    'obi-diesel-engine-on': ObiDieselEngineOn;
  }
}
