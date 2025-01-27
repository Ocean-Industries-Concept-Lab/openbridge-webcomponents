import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-threeway-analog-inleft-bottom-100')
export class ObiThreewayAnalogInleftBottom100 extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M14.53 10.848C14.3711 10.9473 14.1874 11 14 11H11V14C11 14.1874 10.9473 14.3711 10.848 14.53L6.80425 21H17.1958L13.152 14.53C12.9052 14.1351 12.9636 13.6222 13.2929 13.2929C13.6222 12.9636 14.1351 12.9052 14.53 13.152L21 17.1958V6.80425L14.53 10.848ZM20.47 18.0438C21.136 18.46 22 17.9812 22 17.1958V6.80425C22 6.01881 21.136 5.53997 20.47 5.95625L14 10H10.5C10.2239 10 10 10.2239 10 10.5V14L5.95625 20.47C5.53997 21.136 6.01881 22 6.80425 22H17.1958C17.9812 22 18.46 21.136 18.0438 20.47L14 14L20.47 18.0438Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M10.4999 7.5V2.5C10.4999 1.67157 11.1715 1 11.9999 1C12.8283 1 13.4999 1.67157 13.4999 2.5V7.5C13.4999 8.32843 12.8283 9 11.9999 9C11.1715 9 10.4999 8.32843 10.4999 7.5ZM11.4999 7.5V2.5C11.4999 2.22386 11.7237 2 11.9999 2C12.276 2 12.4999 2.22386 12.4999 2.5V7.5C12.4999 7.77614 12.276 8 11.9999 8C11.7237 8 11.4999 7.77614 11.4999 7.5Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M3 17.0568L8 13.4854V10.5146L3 6.94321V17.0568Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M3 17.0568L8 13.4854V10.5146L3 6.94317V17.0568ZM3.58124 17.8705C2.91937 18.3433 2 17.8702 2 17.0568V6.94317C2 6.1298 2.91937 5.65667 3.58124 6.12944L8.58124 9.70086C8.84403 9.88858 9 10.1916 9 10.5146V13.4854C9 13.8083 8.84403 14.1114 8.58124 14.2991L3.58124 17.8705Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M14.53 10.848C14.3711 10.9473 14.1874 11 14 11H11V14C11 14.1874 10.9473 14.3711 10.848 14.53L6.80426 21H17.1958L13.152 14.53C12.9052 14.1351 12.9636 13.6222 13.2929 13.2929C13.6222 12.9636 14.1351 12.9052 14.53 13.152L21 17.1958L21 6.80425L14.53 10.848Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M11.4999 7.5V2.5C11.4999 2.22386 11.7237 2 11.9999 2C12.276 2 12.4999 2.22386 12.4999 2.5V7.5C12.4999 7.77614 12.276 8 11.9999 8C11.7237 8 11.4999 7.77614 11.4999 7.5Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M14.53 10.848C14.3711 10.9473 14.1874 11 14 11H11V14C11 14.1874 10.9473 14.3711 10.848 14.53L6.80425 21H17.1958L13.152 14.53C12.9052 14.1351 12.9636 13.6222 13.2929 13.2929C13.6222 12.9636 14.1351 12.9052 14.53 13.152L21 17.1958V6.80425L14.53 10.848ZM20.47 18.0438C21.136 18.46 22 17.9812 22 17.1958V6.80425C22 6.01881 21.136 5.53997 20.47 5.95625L14 10H10.5C10.2239 10 10 10.2239 10 10.5V14L5.95625 20.47C5.53997 21.136 6.01881 22 6.80425 22H17.1958C17.9812 22 18.46 21.136 18.0438 20.47L14 14L20.47 18.0438Z" style="fill: var(--automation-device-tertiary-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M10.4999 7.5V2.5C10.4999 1.67157 11.1715 1 11.9999 1C12.8283 1 13.4999 1.67157 13.4999 2.5V7.5C13.4999 8.32843 12.8283 9 11.9999 9C11.1715 9 10.4999 8.32843 10.4999 7.5ZM11.4999 7.5V2.5C11.4999 2.22386 11.7237 2 11.9999 2C12.276 2 12.4999 2.22386 12.4999 2.5V7.5C12.4999 7.77614 12.276 8 11.9999 8C11.7237 8 11.4999 7.77614 11.4999 7.5Z" style="fill: var(--automation-device-tertiary-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M3 17.0568L8 13.4854V10.5146L3 6.94321V17.0568Z" style="fill: var(--automation-device-tertiary-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M3 17.0568L8 13.4854V10.5146L3 6.94317V17.0568ZM3.58124 17.8705C2.91937 18.3433 2 17.8702 2 17.0568V6.94317C2 6.1298 2.91937 5.65667 3.58124 6.12944L8.58124 9.70086C8.84403 9.88858 9 10.1916 9 10.5146V13.4854C9 13.8083 8.84403 14.1114 8.58124 14.2991L3.58124 17.8705Z" style="fill: var(--automation-device-secondary-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M14.53 10.848C14.3711 10.9473 14.1874 11 14 11H11V14C11 14.1874 10.9473 14.3711 10.848 14.53L6.80426 21H17.1958L13.152 14.53C12.9052 14.1351 12.9636 13.6222 13.2929 13.2929C13.6222 12.9636 14.1351 12.9052 14.53 13.152L21 17.1958L21 6.80425L14.53 10.848Z" style="fill: var(--automation-device-primary-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M11.4999 7.5V2.5C11.4999 2.22386 11.7237 2 11.9999 2C12.276 2 12.4999 2.22386 12.4999 2.5V7.5C12.4999 7.77614 12.276 8 11.9999 8C11.7237 8 11.4999 7.77614 11.4999 7.5Z" style="fill: var(--automation-device-primary-color)"/>
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
    'obi-threeway-analog-inleft-bottom-100': ObiThreewayAnalogInleftBottom100;
  }
}
