import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-chart-safety-depths-show-proposal')
export class ObiChartSafetyDepthsShowProposal extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M22 21H2V19H22V21Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M5 16H3V14H5V16Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M9 16H7V14H9V16Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M13 16H11V14H13V16Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M17 16H15V14H17V16Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M21 16H19V14H21V16Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M7.58291 2.81348C7.85211 3.09867 8.10922 3.39366 8.40666 3.64972C9.39829 4.50337 10.6731 5.12535 12 5.12535C13.3269 5.12535 14.6017 4.50337 15.5933 3.64972C15.8908 3.39366 16.1479 3.09867 16.4171 2.81348C16.7489 3.07895 17.0696 3.3493 17.4229 3.5848C18.7658 4.4801 20.3708 5.12535 22 5.12535V6.87535C20.0688 6.87535 18.1743 6.15916 16.5672 5.11655C15.2832 6.16303 13.6748 6.87535 12 6.87535C10.3252 6.87535 8.7168 6.16303 7.4328 5.11656C5.82574 6.15916 3.93116 6.87535 2 6.87535V5.12535C3.6292 5.12535 5.23419 4.4801 6.57714 3.5848C6.93011 3.34949 7.25151 3.07859 7.58291 2.81348Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M22 21H2V19H22V21Z" style="fill: var(--element-active-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M5 16H3V14H5V16Z" style="fill: var(--element-active-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M9 16H7V14H9V16Z" style="fill: var(--element-active-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M13 16H11V14H13V16Z" style="fill: var(--element-active-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M17 16H15V14H17V16Z" style="fill: var(--element-active-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M21 16H19V14H21V16Z" style="fill: var(--element-active-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M7.58291 2.81348C7.85211 3.09867 8.10922 3.39366 8.40666 3.64972C9.39829 4.50337 10.6731 5.12535 12 5.12535C13.3269 5.12535 14.6017 4.50337 15.5933 3.64972C15.8908 3.39366 16.1479 3.09867 16.4171 2.81348C16.7489 3.07895 17.0696 3.3493 17.4229 3.5848C18.7658 4.4801 20.3708 5.12535 22 5.12535V6.87535C20.0688 6.87535 18.1743 6.15916 16.5672 5.11655C15.2832 6.16303 13.6748 6.87535 12 6.87535C10.3252 6.87535 8.7168 6.16303 7.4328 5.11656C5.82574 6.15916 3.93116 6.87535 2 6.87535V5.12535C3.6292 5.12535 5.23419 4.4801 6.57714 3.5848C6.93011 3.34949 7.25151 3.07859 7.58291 2.81348Z" style="fill: var(--element-active-color)"/>
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
    'obi-chart-safety-depths-show-proposal': ObiChartSafetyDepthsShowProposal;
  }
}
