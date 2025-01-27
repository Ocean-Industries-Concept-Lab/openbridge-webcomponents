import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-chart-safety-settings-proposal')
export class ObiChartSafetySettingsProposal extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M16.5 10.5C15.9477 10.5 15.5 10.9477 15.5 11.5V12.3848C13.9144 12.8224 12.75 14.2752 12.75 16V18.75H11.5V20.25H21.5V18.75H20.25V16C20.25 14.2752 19.0856 12.8224 17.5 12.3848V11.5C17.5 10.9477 17.0523 10.5 16.5 10.5Z" fill="currentColor"/>
<path d="M18 21.25C18 21.447 17.9612 21.642 17.8858 21.824C17.8104 22.006 17.6999 22.1714 17.5607 22.3107C17.4214 22.4499 17.256 22.5604 17.074 22.6358C16.892 22.7112 16.697 22.75 16.5 22.75C16.303 22.75 16.108 22.7112 15.926 22.6358C15.744 22.5604 15.5786 22.4499 15.4393 22.3107C15.3001 22.1714 15.1896 22.006 15.1142 21.824C15.0388 21.642 15 21.447 15 21.25H16.5H18Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M2.10608 4.74025L8.5 2L15.5 4L21.2253 2.36421C21.8641 2.18169 22.5 2.66135 22.5 3.32573V11.9993C22.0733 11.4314 21.5679 10.926 21 10.4995V3.9886L16.25 5.34574V9.00409C15.7352 9.02095 15.2335 9.08969 14.75 9.20526V5.34574L9.25 3.77431V18.6786L2.89392 21.4026C2.23405 21.6854 1.5 21.2014 1.5 20.4835V5.6594C1.5 5.25937 1.7384 4.89783 2.10608 4.74025ZM3 5.98909L7.75 3.95338V17.6895L3 19.7252V5.98909Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M16.5 10.5C15.9477 10.5 15.5 10.9477 15.5 11.5V12.3848C13.9144 12.8224 12.75 14.2752 12.75 16V18.75H11.5V20.25H21.5V18.75H20.25V16C20.25 14.2752 19.0856 12.8224 17.5 12.3848V11.5C17.5 10.9477 17.0523 10.5 16.5 10.5Z" style="fill: var(--element-active-color)"/>
<path d="M18 21.25C18 21.447 17.9612 21.642 17.8858 21.824C17.8104 22.006 17.6999 22.1714 17.5607 22.3107C17.4214 22.4499 17.256 22.5604 17.074 22.6358C16.892 22.7112 16.697 22.75 16.5 22.75C16.303 22.75 16.108 22.7112 15.926 22.6358C15.744 22.5604 15.5786 22.4499 15.4393 22.3107C15.3001 22.1714 15.1896 22.006 15.1142 21.824C15.0388 21.642 15 21.447 15 21.25H16.5H18Z" style="fill: var(--element-active-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M2.10608 4.74025L8.5 2L15.5 4L21.2253 2.36421C21.8641 2.18169 22.5 2.66135 22.5 3.32573V11.9993C22.0733 11.4314 21.5679 10.926 21 10.4995V3.9886L16.25 5.34574V9.00409C15.7352 9.02095 15.2335 9.08969 14.75 9.20526V5.34574L9.25 3.77431V18.6786L2.89392 21.4026C2.23405 21.6854 1.5 21.2014 1.5 20.4835V5.6594C1.5 5.25937 1.7384 4.89783 2.10608 4.74025ZM3 5.98909L7.75 3.95338V17.6895L3 19.7252V5.98909Z" style="fill: var(--element-active-color)"/>
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
    'obi-chart-safety-settings-proposal': ObiChartSafetySettingsProposal;
  }
}
