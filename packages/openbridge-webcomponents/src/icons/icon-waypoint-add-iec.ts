import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-waypoint-add-iec')
export class ObiWaypointAddIec extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M7.0001 8.99998C8.10467 8.99998 9.0001 8.10455 9.0001 6.99998C9.0001 5.89541 8.10467 4.99998 7.0001 4.99998C5.89553 4.99998 5.0001 5.89541 5.0001 6.99998C5.0001 8.10455 5.89553 8.99998 7.0001 8.99998ZM7.0001 11C9.20924 11 11.0001 9.20912 11.0001 6.99998C11.0001 4.79084 9.20924 2.99998 7.0001 2.99998C4.79096 2.99998 3.0001 4.79084 3.0001 6.99998C3.0001 9.20912 4.79096 11 7.0001 11Z" fill="currentColor"/>
<path d="M4.48126 12.5367L6.41311 13.0544L5.89547 14.9862L3.96362 14.4686L4.48126 12.5367Z" fill="currentColor"/>
<path d="M3.44598 16.4004L5.37783 16.9181L4.86019 18.8499L2.92834 18.3323L3.44598 16.4004Z" fill="currentColor"/>
<path d="M2.4107 20.2641L4.34256 20.7818L3.82492 22.7136L1.89307 22.196L2.4107 20.2641Z" fill="currentColor"/>
<path d="M13.0549 6.41286L12.5373 4.48101L14.4692 3.96337L14.9868 5.89523L13.0549 6.41286Z" fill="currentColor"/>
<path d="M16.9186 5.37759L16.401 3.44574L18.3329 2.9281L18.8505 4.85995L16.9186 5.37759Z" fill="currentColor"/>
<path d="M20.7823 4.34231L20.2647 2.41046L22.1966 1.89282L22.7142 3.82467L20.7823 4.34231Z" fill="currentColor"/>
<path d="M17.0001 9.99998H15.0001V15H10.0001V17H15.0001V22H17.0001V17H22.0001V15H17.0001V9.99998Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M7.0001 8.99998C8.10467 8.99998 9.0001 8.10455 9.0001 6.99998C9.0001 5.89541 8.10467 4.99998 7.0001 4.99998C5.89553 4.99998 5.0001 5.89541 5.0001 6.99998C5.0001 8.10455 5.89553 8.99998 7.0001 8.99998ZM7.0001 11C9.20924 11 11.0001 9.20912 11.0001 6.99998C11.0001 4.79084 9.20924 2.99998 7.0001 2.99998C4.79096 2.99998 3.0001 4.79084 3.0001 6.99998C3.0001 9.20912 4.79096 11 7.0001 11Z" style="fill: var(--element-active-color)"/>
<path d="M4.48126 12.5367L6.41311 13.0544L5.89547 14.9862L3.96362 14.4686L4.48126 12.5367Z" style="fill: var(--element-active-color)"/>
<path d="M3.44598 16.4004L5.37783 16.9181L4.86019 18.8499L2.92834 18.3323L3.44598 16.4004Z" style="fill: var(--element-active-color)"/>
<path d="M2.4107 20.2641L4.34256 20.7818L3.82492 22.7136L1.89307 22.196L2.4107 20.2641Z" style="fill: var(--element-active-color)"/>
<path d="M13.0549 6.41286L12.5373 4.48101L14.4692 3.96337L14.9868 5.89523L13.0549 6.41286Z" style="fill: var(--element-active-color)"/>
<path d="M16.9186 5.37759L16.401 3.44574L18.3329 2.9281L18.8505 4.85995L16.9186 5.37759Z" style="fill: var(--element-active-color)"/>
<path d="M20.7823 4.34231L20.2647 2.41046L22.1966 1.89282L22.7142 3.82467L20.7823 4.34231Z" style="fill: var(--element-active-color)"/>
<path d="M17.0001 9.99998H15.0001V15H10.0001V17H15.0001V22H17.0001V17H22.0001V15H17.0001V9.99998Z" style="fill: var(--element-active-color)"/>
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
    'obi-waypoint-add-iec': ObiWaypointAddIec;
  }
}
