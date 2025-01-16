import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-waypoint-edit-iec')
export class ObiWaypointEditIec extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M6.99971 9.00009C8.10428 9.00009 8.99971 8.10466 8.99971 7.00009C8.99971 5.89552 8.10428 5.00009 6.99971 5.00009C5.89514 5.00009 4.99971 5.89552 4.99971 7.00009C4.99971 8.10466 5.89514 9.00009 6.99971 9.00009ZM6.99971 11.0001C9.20885 11.0001 10.9997 9.20923 10.9997 7.00009C10.9997 4.79095 9.20885 3.00009 6.99971 3.00009C4.79057 3.00009 2.99971 4.79095 2.99971 7.00009C2.99971 9.20923 4.79057 11.0001 6.99971 11.0001Z" fill="currentColor"/>
<path d="M4.48077 12.537L6.41262 13.0546L5.89498 14.9864L3.96313 14.4688L4.48077 12.537Z" fill="currentColor"/>
<path d="M3.44549 16.4007L5.37734 16.9183L4.85971 18.8502L2.92785 18.3325L3.44549 16.4007Z" fill="currentColor"/>
<path d="M2.41022 20.2644L4.34207 20.782L3.82443 22.7139L1.89258 22.1962L2.41022 20.2644Z" fill="currentColor"/>
<path d="M13.0545 6.41311L12.5368 4.48126L14.4687 3.96362L14.9863 5.89547L13.0545 6.41311Z" fill="currentColor"/>
<path d="M16.9182 5.37783L16.4005 3.44598L18.3324 2.92834L18.85 4.86019L16.9182 5.37783Z" fill="currentColor"/>
<path d="M20.7819 4.34256L20.2642 2.4107L22.1961 1.89307L22.7137 3.82492L20.7819 4.34256Z" fill="currentColor"/>
<path d="M7.9998 21.9999V17.7499L17.1748 8.57493C17.3748 8.37493 17.5998 8.22493 17.8498 8.12493C18.0998 8.02493 18.3498 7.97493 18.5998 7.97493C18.8665 7.97493 19.1206 8.02493 19.3623 8.12493C19.604 8.22493 19.8248 8.37493 20.0248 8.57493L21.4248 9.99993C21.6081 10.1999 21.7498 10.4208 21.8498 10.6624C21.9498 10.9041 21.9998 11.1499 21.9998 11.3999C21.9998 11.6499 21.954 11.8958 21.8623 12.1374C21.7706 12.3791 21.6248 12.5999 21.4248 12.7999L12.2498 21.9999H7.9998ZM9.9998 19.9999H11.3998L17.1998 14.1999L16.4998 13.4999L15.7748 12.7999L9.9998 18.5749V19.9999Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M6.99971 9.00009C8.10428 9.00009 8.99971 8.10466 8.99971 7.00009C8.99971 5.89552 8.10428 5.00009 6.99971 5.00009C5.89514 5.00009 4.99971 5.89552 4.99971 7.00009C4.99971 8.10466 5.89514 9.00009 6.99971 9.00009ZM6.99971 11.0001C9.20885 11.0001 10.9997 9.20923 10.9997 7.00009C10.9997 4.79095 9.20885 3.00009 6.99971 3.00009C4.79057 3.00009 2.99971 4.79095 2.99971 7.00009C2.99971 9.20923 4.79057 11.0001 6.99971 11.0001Z" style="fill: var(--element-active-color)"/>
<path d="M4.48077 12.537L6.41262 13.0546L5.89498 14.9864L3.96313 14.4688L4.48077 12.537Z" style="fill: var(--element-active-color)"/>
<path d="M3.44549 16.4007L5.37734 16.9183L4.85971 18.8502L2.92785 18.3325L3.44549 16.4007Z" style="fill: var(--element-active-color)"/>
<path d="M2.41022 20.2644L4.34207 20.782L3.82443 22.7139L1.89258 22.1962L2.41022 20.2644Z" style="fill: var(--element-active-color)"/>
<path d="M13.0545 6.41311L12.5368 4.48126L14.4687 3.96362L14.9863 5.89547L13.0545 6.41311Z" style="fill: var(--element-active-color)"/>
<path d="M16.9182 5.37783L16.4005 3.44598L18.3324 2.92834L18.85 4.86019L16.9182 5.37783Z" style="fill: var(--element-active-color)"/>
<path d="M20.7819 4.34256L20.2642 2.4107L22.1961 1.89307L22.7137 3.82492L20.7819 4.34256Z" style="fill: var(--element-active-color)"/>
<path d="M7.9998 21.9999V17.7499L17.1748 8.57493C17.3748 8.37493 17.5998 8.22493 17.8498 8.12493C18.0998 8.02493 18.3498 7.97493 18.5998 7.97493C18.8665 7.97493 19.1206 8.02493 19.3623 8.12493C19.604 8.22493 19.8248 8.37493 20.0248 8.57493L21.4248 9.99993C21.6081 10.1999 21.7498 10.4208 21.8498 10.6624C21.9498 10.9041 21.9998 11.1499 21.9998 11.3999C21.9998 11.6499 21.954 11.8958 21.8623 12.1374C21.7706 12.3791 21.6248 12.5999 21.4248 12.7999L12.2498 21.9999H7.9998ZM9.9998 19.9999H11.3998L17.1998 14.1999L16.4998 13.4999L15.7748 12.7999L9.9998 18.5749V19.9999Z" style="fill: var(--element-active-color)"/>
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
    'obi-waypoint-edit-iec': ObiWaypointEditIec;
  }
}