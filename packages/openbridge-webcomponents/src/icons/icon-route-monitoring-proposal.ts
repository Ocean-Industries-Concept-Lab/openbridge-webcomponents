import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-route-monitoring-proposal')
export class ObiRouteMonitoringProposal extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M3 23V1H5V23H3Z" fill="currentColor"/>
<path d="M13 4V1H11V4H13Z" fill="currentColor"/>
<path d="M13 6V9H11V6H13Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M13.1522 11.738C12.7799 11.2623 12.3761 10.8457 12 10.5C11.6239 10.8457 11.2201 11.2623 10.8478 11.738C10.0497 12.7578 9.5 13.9133 9.5 15.1474V23H14.5V15.1474C14.5 13.9133 13.9503 12.7578 13.1522 11.738ZM13 21.5V15.1474C13 14.3787 12.6604 13.5547 12 12.6998C11.3396 13.5547 11 14.3787 11 15.1474V21.5H13Z" fill="currentColor"/>
<path d="M19 1V23H21V1H19Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M3 23V1H5V23H3Z" style="fill: var(--element-active-color)"/>
<path d="M13 4V1H11V4H13Z" style="fill: var(--element-active-color)"/>
<path d="M13 6V9H11V6H13Z" style="fill: var(--element-active-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M13.1522 11.738C12.7799 11.2623 12.3761 10.8457 12 10.5C11.6239 10.8457 11.2201 11.2623 10.8478 11.738C10.0497 12.7578 9.5 13.9133 9.5 15.1474V23H14.5V15.1474C14.5 13.9133 13.9503 12.7578 13.1522 11.738ZM13 21.5V15.1474C13 14.3787 12.6604 13.5547 12 12.6998C11.3396 13.5547 11 14.3787 11 15.1474V21.5H13Z" style="fill: var(--element-active-color)"/>
<path d="M19 1V23H21V1H19Z" style="fill: var(--element-active-color)"/>
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
    'obi-route-monitoring-proposal': ObiRouteMonitoringProposal;
  }
}
