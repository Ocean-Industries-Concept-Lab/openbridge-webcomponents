import {LitElement, html, css, svg} from 'lit';
import {property} from 'lit/decorators.js';
import {customElement} from '../decorator.js';

@customElement('obi-electric-motor-ac-static')
export class ObiElectricMotorAcStatic extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_11002_2615)">
<path d="M12 1C18.0751 1 23 5.92487 23 12C23 18.0751 18.0751 23 12 23C5.92487 23 1 18.0751 1 12C1 5.92487 5.92487 1 12 1Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M12 24C18.6274 24 24 18.6274 24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12C0 18.6274 5.37258 24 12 24ZM12 23C18.0751 23 23 18.0751 23 12C23 5.92487 18.0751 1 12 1C5.92487 1 1 5.92487 1 12C1 18.0751 5.92487 23 12 23Z" fill="currentColor"/>
<path d="M10.284 16.6713C11.145 16.723 11.8682 17.1498 12.4901 17.6836C12.9785 18.1029 13.3955 18.306 13.8038 18.3306C14.2051 18.3547 14.7303 18.2142 15.4496 17.6584L16.0824 17.1693L17 18.5186L16.3672 19.0076C15.458 19.7102 14.5842 20.0469 13.716 19.9948C12.855 19.943 12.1318 19.5162 11.5099 18.9824C11.0215 18.5631 10.6045 18.36 10.1962 18.3354C9.79489 18.3113 9.26967 18.4518 8.55038 19.0076L7.91756 19.4967L7 18.1475L7.63282 17.6584C8.54196 16.9558 9.41583 16.6191 10.284 16.6713Z" fill="currentColor"/>
<path d="M11.0645 14.1664L8.84643 6.88721H8.79687C8.80513 7.05838 8.81752 7.31087 8.83404 7.64466C8.85056 7.96989 8.86709 8.32508 8.88361 8.71023C8.90013 9.08681 8.90839 9.43772 8.90839 9.76296V14.1664H7.30992V5H9.76338L11.9195 12.061H11.9566L14.249 5H16.6901V14.1664H15.0173V9.68593C15.0173 9.38637 15.0214 9.05686 15.0297 8.69739C15.0462 8.32936 15.0586 7.98273 15.0668 7.6575C15.0833 7.32371 15.0957 7.07122 15.104 6.90005H15.0544L12.7001 14.1664H11.0645Z" fill="currentColor"/>
</g>
<defs>
<clipPath id="clip0_11002_2615">
<rect width="24" height="24" fill="currentColor"/>
</clipPath>
</defs>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_11002_2615)">
<path d="M12 1C18.0751 1 23 5.92487 23 12C23 18.0751 18.0751 23 12 23C5.92487 23 1 18.0751 1 12C1 5.92487 5.92487 1 12 1Z" style="fill: var(--container-section-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M12 24C18.6274 24 24 18.6274 24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12C0 18.6274 5.37258 24 12 24ZM12 23C18.0751 23 23 18.0751 23 12C23 5.92487 18.0751 1 12 1C5.92487 1 1 5.92487 1 12C1 18.0751 5.92487 23 12 23Z" style="fill: var(--automation-device-secondary-color)"/>
<path d="M10.284 16.6713C11.145 16.723 11.8682 17.1498 12.4901 17.6836C12.9785 18.1029 13.3955 18.306 13.8038 18.3306C14.2051 18.3547 14.7303 18.2142 15.4496 17.6584L16.0824 17.1693L17 18.5186L16.3672 19.0076C15.458 19.7102 14.5842 20.0469 13.716 19.9948C12.855 19.943 12.1318 19.5162 11.5099 18.9824C11.0215 18.5631 10.6045 18.36 10.1962 18.3354C9.79489 18.3113 9.26967 18.4518 8.55038 19.0076L7.91756 19.4967L7 18.1475L7.63282 17.6584C8.54196 16.9558 9.41583 16.6191 10.284 16.6713Z" style="fill: var(--automation-device-secondary-color)"/>
<path d="M11.0645 14.1664L8.84643 6.88721H8.79687C8.80513 7.05838 8.81752 7.31087 8.83404 7.64466C8.85056 7.96989 8.86709 8.32508 8.88361 8.71023C8.90013 9.08681 8.90839 9.43772 8.90839 9.76296V14.1664H7.30992V5H9.76338L11.9195 12.061H11.9566L14.249 5H16.6901V14.1664H15.0173V9.68593C15.0173 9.38637 15.0214 9.05686 15.0297 8.69739C15.0462 8.32936 15.0586 7.98273 15.0668 7.6575C15.0833 7.32371 15.0957 7.07122 15.104 6.90005H15.0544L12.7001 14.1664H11.0645Z" style="fill: var(--automation-device-secondary-color)"/>
</g>
<defs>
<clipPath id="clip0_11002_2615">
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
    'obi-electric-motor-ac-static': ObiElectricMotorAcStatic;
  }
}
