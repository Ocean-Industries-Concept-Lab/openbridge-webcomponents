import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-chart-ship-routing-system-iec')
export class ObiChartShipRoutingSystemIec extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M17.262 13.1522C17.7377 12.7799 18.1543 12.3761 18.5 12C18.1543 11.6239 17.7377 11.2201 17.262 10.8478C16.2422 10.0497 15.0867 9.5 13.8526 9.5L5.5 9.5L5.5 14.5L13.8526 14.5C15.0867 14.5 16.2422 13.9503 17.262 13.1522ZM7 13L13.8526 13C14.6213 13 15.4453 12.6604 16.3002 12C15.4453 11.3396 14.6213 11 13.8526 11L7 11V13Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M4 12.75H0V11.25H4V12.75Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M24 12.75H20V11.25H24V12.75Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M17.262 13.1522C17.7377 12.7799 18.1543 12.3761 18.5 12C18.1543 11.6239 17.7377 11.2201 17.262 10.8478C16.2422 10.0497 15.0867 9.5 13.8526 9.5L5.5 9.5L5.5 14.5L13.8526 14.5C15.0867 14.5 16.2422 13.9503 17.262 13.1522ZM7 13L13.8526 13C14.6213 13 15.4453 12.6604 16.3002 12C15.4453 11.3396 14.6213 11 13.8526 11L7 11V13Z" style="fill: var(--element-active-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M4 12.75H0V11.25H4V12.75Z" style="fill: var(--element-active-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M24 12.75H20V11.25H24V12.75Z" style="fill: var(--element-active-color)"/>
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
    'obi-chart-ship-routing-system-iec': ObiChartShipRoutingSystemIec;
  }
}
