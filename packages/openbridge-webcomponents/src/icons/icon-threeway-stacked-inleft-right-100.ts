import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-threeway-stacked-inleft-right-100')
export class ObiThreewayStackedInleftRight100 extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_2539_1008)">
<path fill-rule="evenodd" clip-rule="evenodd" d="M13 0V10H14L20.47 5.95625C21.136 5.53997 22 6.01881 22 6.80425V17.1958C22 17.9812 21.136 18.46 20.47 18.0438L14 14L18.0438 20.47C18.46 21.136 17.9812 22 17.1958 22H6.80425C6.01881 22 5.53997 21.136 5.95625 20.47L10 14V10.5C10 10.2239 10.2239 10 10.5 10H11V0H13ZM14 11C14.1874 11 14.3711 10.9473 14.53 10.848L21 6.80425V17.1958L14.53 13.152C14.1351 12.9052 13.6222 12.9636 13.2929 13.2929C12.9636 13.6222 12.9052 14.1351 13.152 14.53L17.1958 21H6.80425L10.848 14.53C10.9473 14.3711 11 14.1874 11 14V11H14Z" fill="currentColor"/>
<path d="M8 13.4852L3 17.0566V6.94302L8 10.5144V13.4852Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M3 17.0568L8 13.4854V10.5146L3 6.94317V17.0568ZM3.58124 17.8705C2.91937 18.3433 2 17.8702 2 17.0568V6.94317C2 6.1298 2.91937 5.65667 3.58124 6.12944L8.58124 9.70086C8.84403 9.88858 9 10.1916 9 10.5146V13.4854C9 13.8083 8.84403 14.1114 8.58124 14.2991L3.58124 17.8705Z" fill="currentColor"/>
<path d="M14.53 10.8484C14.371 10.9478 14.1874 11.0004 14 11.0004H11V14.0004C11 14.1879 10.9473 14.3715 10.8479 14.5304L6.8042 21.0004H17.1957L13.152 14.5304C12.9052 14.1356 12.9636 13.6226 13.2928 13.2933C13.6221 12.9641 14.1351 12.9056 14.53 13.1524L21 17.1962L21 6.80469L14.53 10.8484Z" fill="currentColor"/>
</g>
<defs>
<clipPath id="clip0_2539_1008">
<rect width="24" height="24" fill="currentColor"/>
</clipPath>
</defs>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_2539_1008)">
<path fill-rule="evenodd" clip-rule="evenodd" d="M13 0V10H14L20.47 5.95625C21.136 5.53997 22 6.01881 22 6.80425V17.1958C22 17.9812 21.136 18.46 20.47 18.0438L14 14L18.0438 20.47C18.46 21.136 17.9812 22 17.1958 22H6.80425C6.01881 22 5.53997 21.136 5.95625 20.47L10 14V10.5C10 10.2239 10.2239 10 10.5 10H11V0H13ZM14 11C14.1874 11 14.3711 10.9473 14.53 10.848L21 6.80425V17.1958L14.53 13.152C14.1351 12.9052 13.6222 12.9636 13.2929 13.2929C12.9636 13.6222 12.9052 14.1351 13.152 14.53L17.1958 21H6.80425L10.848 14.53C10.9473 14.3711 11 14.1874 11 14V11H14Z" style="fill: var(--automation-device-tertiary-color)"/>
<path d="M8 13.4852L3 17.0566V6.94302L8 10.5144V13.4852Z" style="fill: var(--automation-device-tertiary-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M3 17.0568L8 13.4854V10.5146L3 6.94317V17.0568ZM3.58124 17.8705C2.91937 18.3433 2 17.8702 2 17.0568V6.94317C2 6.1298 2.91937 5.65667 3.58124 6.12944L8.58124 9.70086C8.84403 9.88858 9 10.1916 9 10.5146V13.4854C9 13.8083 8.84403 14.1114 8.58124 14.2991L3.58124 17.8705Z" style="fill: var(--automation-device-secondary-color)"/>
<path d="M14.53 10.8484C14.371 10.9478 14.1874 11.0004 14 11.0004H11V14.0004C11 14.1879 10.9473 14.3715 10.8479 14.5304L6.8042 21.0004H17.1957L13.152 14.5304C12.9052 14.1356 12.9636 13.6226 13.2928 13.2933C13.6221 12.9641 14.1351 12.9056 14.53 13.1524L21 17.1962L21 6.80469L14.53 10.8484Z" style="fill: var(--automation-device-primary-color)"/>
</g>
<defs>
<clipPath id="clip0_2539_1008">
<rect width="24" height="24" style="fill: var(--automation-device-primary-color)"/>
</clipPath>
</defs>
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
    'obi-threeway-stacked-inleft-right-100': ObiThreewayStackedInleftRight100;
  }
}
