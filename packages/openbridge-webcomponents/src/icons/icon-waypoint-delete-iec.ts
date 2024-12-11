import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-waypoint-delete-iec')
export class ObiWaypointDeleteIec extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M20.2647 2.41022L20.7823 4.34207L22.7142 3.82443L22.1966 1.89258L20.2647 2.41022Z" fill="currentColor"/>
<path d="M16.9186 5.37734L16.401 3.44549L18.3329 2.92785L18.8505 4.85971L16.9186 5.37734Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M7.0001 10.9997C9.20924 10.9997 11.0001 9.20887 11.0001 6.99973C11.0001 4.7906 9.20924 2.99973 7.0001 2.99973C4.79096 2.99973 3.0001 4.7906 3.0001 6.99973C3.0001 9.20887 4.79096 10.9997 7.0001 10.9997ZM7.0001 8.99973C8.10467 8.99973 9.0001 8.1043 9.0001 6.99973C9.0001 5.89516 8.10467 4.99973 7.0001 4.99973C5.89553 4.99973 5.0001 5.89516 5.0001 6.99973C5.0001 8.1043 5.89553 8.99973 7.0001 8.99973Z" fill="currentColor"/>
<path d="M4.48126 12.5365L6.41311 13.0541L5.89547 14.986L3.96362 14.4683L4.48126 12.5365Z" fill="currentColor"/>
<path d="M5.37783 16.9178L3.44598 16.4002L2.92834 18.332L4.86019 18.8497L5.37783 16.9178Z" fill="currentColor"/>
<path d="M2.4107 20.2639L4.34256 20.7815L3.82492 22.7134L1.89307 22.1957L2.4107 20.2639Z" fill="currentColor"/>
<path d="M12.5373 4.48077L13.0549 6.41262L14.9868 5.89498L14.4692 3.96313L12.5373 4.48077Z" fill="currentColor"/>
<path d="M17.0001 16.4392L18.4697 14.9695L19.5304 16.0301L18.0607 17.4998L19.5304 18.9695L18.4697 20.0301L17.0001 18.5605L15.5304 20.0301L14.4697 18.9695L15.9394 17.4998L14.4697 16.0301L15.5304 14.9695L17.0001 16.4392Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M15 9.99976H19V10.9998H23V12.9998H22V20.9998C22 22.1043 21.1046 22.9998 20 22.9998H14C12.8954 22.9998 12 22.1043 12 20.9998V12.9998H11V10.9998H15V9.99976ZM13.5 13.4998H20.5V20.9998C20.5 21.2759 20.2761 21.4998 20 21.4998H14C13.7239 21.4998 13.5 21.2759 13.5 20.9998V13.4998Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M20.2647 2.41022L20.7823 4.34207L22.7142 3.82443L22.1966 1.89258L20.2647 2.41022Z" style="fill: var(--element-active-color)"/>
<path d="M16.9186 5.37734L16.401 3.44549L18.3329 2.92785L18.8505 4.85971L16.9186 5.37734Z" style="fill: var(--element-active-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M7.0001 10.9997C9.20924 10.9997 11.0001 9.20887 11.0001 6.99973C11.0001 4.7906 9.20924 2.99973 7.0001 2.99973C4.79096 2.99973 3.0001 4.7906 3.0001 6.99973C3.0001 9.20887 4.79096 10.9997 7.0001 10.9997ZM7.0001 8.99973C8.10467 8.99973 9.0001 8.1043 9.0001 6.99973C9.0001 5.89516 8.10467 4.99973 7.0001 4.99973C5.89553 4.99973 5.0001 5.89516 5.0001 6.99973C5.0001 8.1043 5.89553 8.99973 7.0001 8.99973Z" style="fill: var(--element-active-color)"/>
<path d="M4.48126 12.5365L6.41311 13.0541L5.89547 14.986L3.96362 14.4683L4.48126 12.5365Z" style="fill: var(--element-active-color)"/>
<path d="M5.37783 16.9178L3.44598 16.4002L2.92834 18.332L4.86019 18.8497L5.37783 16.9178Z" style="fill: var(--element-active-color)"/>
<path d="M2.4107 20.2639L4.34256 20.7815L3.82492 22.7134L1.89307 22.1957L2.4107 20.2639Z" style="fill: var(--element-active-color)"/>
<path d="M12.5373 4.48077L13.0549 6.41262L14.9868 5.89498L14.4692 3.96313L12.5373 4.48077Z" style="fill: var(--element-active-color)"/>
<path d="M17.0001 16.4392L18.4697 14.9695L19.5304 16.0301L18.0607 17.4998L19.5304 18.9695L18.4697 20.0301L17.0001 18.5605L15.5304 20.0301L14.4697 18.9695L15.9394 17.4998L14.4697 16.0301L15.5304 14.9695L17.0001 16.4392Z" style="fill: var(--element-active-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M15 9.99976H19V10.9998H23V12.9998H22V20.9998C22 22.1043 21.1046 22.9998 20 22.9998H14C12.8954 22.9998 12 22.1043 12 20.9998V12.9998H11V10.9998H15V9.99976ZM13.5 13.4998H20.5V20.9998C20.5 21.2759 20.2761 21.4998 20 21.4998H14C13.7239 21.4998 13.5 21.2759 13.5 20.9998V13.4998Z" style="fill: var(--element-active-color)"/>
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
    'obi-waypoint-delete-iec': ObiWaypointDeleteIec;
  }
}
