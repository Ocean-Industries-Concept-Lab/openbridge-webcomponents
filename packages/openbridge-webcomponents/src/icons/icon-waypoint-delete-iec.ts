import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-waypoint-delete-iec')
export class ObiWaypointDeleteIec extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M20.2647 2.41046L20.7823 4.34231L22.7142 3.82467L22.1966 1.89282L20.2647 2.41046Z" fill="currentColor"/>
<path d="M16.9186 5.37759L16.401 3.44574L18.3329 2.9281L18.8505 4.85995L16.9186 5.37759Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M7.0001 11C9.20924 11 11.0001 9.20912 11.0001 6.99998C11.0001 4.79084 9.20924 2.99998 7.0001 2.99998C4.79096 2.99998 3.0001 4.79084 3.0001 6.99998C3.0001 9.20912 4.79096 11 7.0001 11ZM7.0001 8.99998C8.10467 8.99998 9.0001 8.10455 9.0001 6.99998C9.0001 5.89541 8.10467 4.99998 7.0001 4.99998C5.89553 4.99998 5.0001 5.89541 5.0001 6.99998C5.0001 8.10455 5.89553 8.99998 7.0001 8.99998Z" fill="currentColor"/>
<path d="M4.48126 12.5367L6.41311 13.0544L5.89547 14.9862L3.96362 14.4686L4.48126 12.5367Z" fill="currentColor"/>
<path d="M5.37783 16.9181L3.44598 16.4004L2.92834 18.3323L4.86019 18.8499L5.37783 16.9181Z" fill="currentColor"/>
<path d="M2.4107 20.2641L4.34256 20.7818L3.82492 22.7136L1.89307 22.196L2.4107 20.2641Z" fill="currentColor"/>
<path d="M12.5373 4.48101L13.0549 6.41286L14.9868 5.89523L14.4692 3.96337L12.5373 4.48101Z" fill="currentColor"/>
<path d="M17.0001 16.4394L18.4697 14.9697L19.5304 16.0304L18.0607 17.5001L19.5304 18.9697L18.4697 20.0304L17.0001 18.5607L15.5304 20.0304L14.4697 18.9697L15.9394 17.5001L14.4697 16.0304L15.5304 14.9697L17.0001 16.4394Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M15 10H19V11H23V13H22V21C22 22.1046 21.1046 23 20 23H14C12.8954 23 12 22.1046 12 21V13H11V11H15V10ZM13.5 13.5H20.5V21C20.5 21.2761 20.2761 21.5 20 21.5H14C13.7239 21.5 13.5 21.2761 13.5 21V13.5Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M20.2647 2.41046L20.7823 4.34231L22.7142 3.82467L22.1966 1.89282L20.2647 2.41046Z" style="fill: var(--element-active-color)"/>
<path d="M16.9186 5.37759L16.401 3.44574L18.3329 2.9281L18.8505 4.85995L16.9186 5.37759Z" style="fill: var(--element-active-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M7.0001 11C9.20924 11 11.0001 9.20912 11.0001 6.99998C11.0001 4.79084 9.20924 2.99998 7.0001 2.99998C4.79096 2.99998 3.0001 4.79084 3.0001 6.99998C3.0001 9.20912 4.79096 11 7.0001 11ZM7.0001 8.99998C8.10467 8.99998 9.0001 8.10455 9.0001 6.99998C9.0001 5.89541 8.10467 4.99998 7.0001 4.99998C5.89553 4.99998 5.0001 5.89541 5.0001 6.99998C5.0001 8.10455 5.89553 8.99998 7.0001 8.99998Z" style="fill: var(--element-active-color)"/>
<path d="M4.48126 12.5367L6.41311 13.0544L5.89547 14.9862L3.96362 14.4686L4.48126 12.5367Z" style="fill: var(--element-active-color)"/>
<path d="M5.37783 16.9181L3.44598 16.4004L2.92834 18.3323L4.86019 18.8499L5.37783 16.9181Z" style="fill: var(--element-active-color)"/>
<path d="M2.4107 20.2641L4.34256 20.7818L3.82492 22.7136L1.89307 22.196L2.4107 20.2641Z" style="fill: var(--element-active-color)"/>
<path d="M12.5373 4.48101L13.0549 6.41286L14.9868 5.89523L14.4692 3.96337L12.5373 4.48101Z" style="fill: var(--element-active-color)"/>
<path d="M17.0001 16.4394L18.4697 14.9697L19.5304 16.0304L18.0607 17.5001L19.5304 18.9697L18.4697 20.0304L17.0001 18.5607L15.5304 20.0304L14.4697 18.9697L15.9394 17.5001L14.4697 16.0304L15.5304 14.9697L17.0001 16.4394Z" style="fill: var(--element-active-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M15 10H19V11H23V13H22V21C22 22.1046 21.1046 23 20 23H14C12.8954 23 12 22.1046 12 21V13H11V11H15V10ZM13.5 13.5H20.5V21C20.5 21.2761 20.2761 21.5 20 21.5H14C13.7239 21.5 13.5 21.2761 13.5 21V13.5Z" style="fill: var(--element-active-color)"/>
</svg>
`;

  override render() {
    return html`
      <div class="wrapper" >
        ${this.useCssColor? this.iconCss : this.icon}
      </div>
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
    'obi-waypoint-delete-iec': ObiWaypointDeleteIec;
  }
}