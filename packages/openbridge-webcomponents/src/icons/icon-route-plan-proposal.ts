import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-route-plan-proposal')
export class ObiRoutePlanProposal extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M17 8H15V10.2676C14.4022 10.6134 14 11.2597 14 12C14 13.1045 14.8953 13.9999 15.9998 14L20.1338 21.1603L21.9998 22.3923L21.8658 20.1603L17.7322 13.0005C17.9025 12.7062 18 12.3645 18 12C18 11.2597 17.5978 10.6134 17 10.2676V8Z" fill="currentColor"/>
<path d="M14.6606 15.2331C14.8323 15.3043 15.009 15.3614 15.189 15.4043L11.866 21.1598L10 22.3919L10.134 20.1598L13.4569 14.4043C13.4793 14.428 13.5021 14.4514 13.5251 14.4744C13.8501 14.7994 14.236 15.0572 14.6606 15.2331Z" fill="currentColor"/>
<path d="M16 6C17.1046 6 18 5.10457 18 4C18 2.89543 17.1046 2 16 2C14.8954 2 14 2.89543 14 4C14 5.10457 14.8954 6 16 6Z" fill="currentColor"/>
<path d="M11.4289 7.86584L10.4289 6.13379L12.161 5.13379L13.161 6.86584L11.4289 7.86584Z" fill="currentColor"/>
<path d="M7.96484 9.86584L6.96484 8.13379L8.69689 7.13379L9.69689 8.86584L7.96484 9.86584Z" fill="currentColor"/>
<path d="M4 13C5.10457 13 6 12.1046 6 11C6 9.89543 5.10457 9 4 9C2.89543 9 2 9.89543 2 11C2 12.1046 2.89543 13 4 13Z" fill="currentColor"/>
<path d="M5 17V15H3V17H5Z" fill="currentColor"/>
<path d="M5 21V19H3V21H5Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M17 8H15V10.2676C14.4022 10.6134 14 11.2597 14 12C14 13.1045 14.8953 13.9999 15.9998 14L20.1338 21.1603L21.9998 22.3923L21.8658 20.1603L17.7322 13.0005C17.9025 12.7062 18 12.3645 18 12C18 11.2597 17.5978 10.6134 17 10.2676V8Z" style="fill: var(--element-active-color)"/>
<path d="M14.6606 15.2331C14.8323 15.3043 15.009 15.3614 15.189 15.4043L11.866 21.1598L10 22.3919L10.134 20.1598L13.4569 14.4043C13.4793 14.428 13.5021 14.4514 13.5251 14.4744C13.8501 14.7994 14.236 15.0572 14.6606 15.2331Z" style="fill: var(--element-active-color)"/>
<path d="M16 6C17.1046 6 18 5.10457 18 4C18 2.89543 17.1046 2 16 2C14.8954 2 14 2.89543 14 4C14 5.10457 14.8954 6 16 6Z" style="fill: var(--element-active-color)"/>
<path d="M11.4289 7.86584L10.4289 6.13379L12.161 5.13379L13.161 6.86584L11.4289 7.86584Z" style="fill: var(--element-active-color)"/>
<path d="M7.96484 9.86584L6.96484 8.13379L8.69689 7.13379L9.69689 8.86584L7.96484 9.86584Z" style="fill: var(--element-active-color)"/>
<path d="M4 13C5.10457 13 6 12.1046 6 11C6 9.89543 5.10457 9 4 9C2.89543 9 2 9.89543 2 11C2 12.1046 2.89543 13 4 13Z" style="fill: var(--element-active-color)"/>
<path d="M5 17V15H3V17H5Z" style="fill: var(--element-active-color)"/>
<path d="M5 21V19H3V21H5Z" style="fill: var(--element-active-color)"/>
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
    'obi-route-plan-proposal': ObiRoutePlanProposal;
  }
}
