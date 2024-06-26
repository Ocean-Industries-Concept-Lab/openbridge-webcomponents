import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-07-waypoint-edit')
export class Obi07WaypointEdit extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M21.1024 4.18925L22 3.96783L21.5352 2L20.6376 2.22141L21.1024 4.18925Z" fill="currentColor"/>
<path d="M17.5119 5.0749L19.3072 4.63207L18.8424 2.66424L17.0471 3.10707L17.5119 5.0749Z" fill="currentColor"/>
<path d="M15.7167 5.51773L13.9215 5.96055L13.4567 3.99272L15.2519 3.54989L15.7167 5.51773Z" fill="currentColor"/>
<path d="M10.331 6.84621L12.1263 6.40338L11.6615 4.43555L9.86624 4.87837L10.331 6.84621Z" fill="currentColor"/>
<path d="M7.51879 9.66412L6.96165 11.5619L5.06426 10.9803L5.6214 9.08242L7.51879 9.66412Z" fill="currentColor"/>
<path d="M5.84738 15.3576L6.40452 13.4598L4.50712 12.8781L3.94998 14.7759L5.84738 15.3576Z" fill="currentColor"/>
<path d="M5.29024 17.2554L4.7331 19.1533L2.83571 18.5716L3.39285 16.6737L5.29024 17.2554Z" fill="currentColor"/>
<path d="M3.89739 22L4.17596 21.0511L2.27857 20.4694L2 21.4183L3.89739 22Z" fill="currentColor"/>
<path d="M7.44758 8.57914C8.54162 8.57914 9.42851 7.6728 9.42851 6.55479C9.42851 5.43677 8.54162 4.53044 7.44758 4.53044C6.35353 4.53044 5.46664 5.43677 5.46664 6.55479C5.46664 7.6728 6.35353 8.57914 7.44758 8.57914Z" fill="currentColor"/>
<path d="M18.1498 8.26893C18.2752 8.14072 18.4469 8.07324 18.6119 8.07324C18.7836 8.07324 18.9487 8.13397 19.0807 8.26893L20.6256 9.84792C20.8831 10.1111 20.8831 10.5362 20.6256 10.7994L19.4174 12.0342L16.9416 9.50378L18.1498 8.26893Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M16.2353 10.2254L8.93328 17.6885V20.2189H11.4091L18.7111 12.7558L16.2353 10.2254ZM16.8425 12.7561L16.2351 12.1353L10.2535 18.2488V18.8696H10.8609L16.8425 12.7561Z" fill="currentColor"/>
<path d="M16.8425 12.7561L16.2351 12.1353L10.2535 18.2488V18.8696H10.8609L16.8425 12.7561Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M21.1024 4.18925L22 3.96783L21.5352 2L20.6376 2.22141L21.1024 4.18925Z" style="fill: var(--element-active-color)"/>
<path d="M17.5119 5.0749L19.3072 4.63207L18.8424 2.66424L17.0471 3.10707L17.5119 5.0749Z" style="fill: var(--element-active-color)"/>
<path d="M15.7167 5.51773L13.9215 5.96055L13.4567 3.99272L15.2519 3.54989L15.7167 5.51773Z" style="fill: var(--element-active-color)"/>
<path d="M10.331 6.84621L12.1263 6.40338L11.6615 4.43555L9.86624 4.87837L10.331 6.84621Z" style="fill: var(--element-active-color)"/>
<path d="M7.51879 9.66412L6.96165 11.5619L5.06426 10.9803L5.6214 9.08242L7.51879 9.66412Z" style="fill: var(--element-active-color)"/>
<path d="M5.84738 15.3576L6.40452 13.4598L4.50712 12.8781L3.94998 14.7759L5.84738 15.3576Z" style="fill: var(--element-active-color)"/>
<path d="M5.29024 17.2554L4.7331 19.1533L2.83571 18.5716L3.39285 16.6737L5.29024 17.2554Z" style="fill: var(--element-active-color)"/>
<path d="M3.89739 22L4.17596 21.0511L2.27857 20.4694L2 21.4183L3.89739 22Z" style="fill: var(--element-active-color)"/>
<path d="M7.44758 8.57914C8.54162 8.57914 9.42851 7.6728 9.42851 6.55479C9.42851 5.43677 8.54162 4.53044 7.44758 4.53044C6.35353 4.53044 5.46664 5.43677 5.46664 6.55479C5.46664 7.6728 6.35353 8.57914 7.44758 8.57914Z" style="fill: var(--element-active-color)"/>
<path d="M18.1498 8.26893C18.2752 8.14072 18.4469 8.07324 18.6119 8.07324C18.7836 8.07324 18.9487 8.13397 19.0807 8.26893L20.6256 9.84792C20.8831 10.1111 20.8831 10.5362 20.6256 10.7994L19.4174 12.0342L16.9416 9.50378L18.1498 8.26893Z" style="fill: var(--element-active-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M16.2353 10.2254L8.93328 17.6885V20.2189H11.4091L18.7111 12.7558L16.2353 10.2254ZM16.8425 12.7561L16.2351 12.1353L10.2535 18.2488V18.8696H10.8609L16.8425 12.7561Z" style="fill: var(--element-active-color)"/>
<path d="M16.8425 12.7561L16.2351 12.1353L10.2535 18.2488V18.8696H10.8609L16.8425 12.7561Z" style="fill: var(--element-active-color)"/>
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
    'obi-07-waypoint-edit': Obi07WaypointEdit;
  }
}
