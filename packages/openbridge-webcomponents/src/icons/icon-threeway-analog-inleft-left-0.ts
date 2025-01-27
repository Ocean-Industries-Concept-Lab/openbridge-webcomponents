import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-threeway-analog-inleft-left-0')
export class ObiThreewayAnalogInleftLeft0 extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M9.47 10.848C9.62893 10.9473 9.81258 11 10 11H13V14C13 14.1874 13.0527 14.3711 13.152 14.53L17.1958 21H6.80425L10.848 14.53C11.0948 14.1351 11.0364 13.6222 10.7071 13.2929C10.3778 12.9636 9.86488 12.9052 9.47 13.152L3 17.1958L3 6.80425L9.47 10.848ZM3.53 18.0438C2.86395 18.46 2 17.9812 2 17.1958V6.80425C2 6.01881 2.86395 5.53997 3.53 5.95625L10 10H13.5C13.7761 10 14 10.2239 14 10.5V14L18.0438 20.47C18.46 21.136 17.9812 22 17.1958 22H6.80425C6.01881 22 5.53997 21.136 5.95625 20.47L10 14L3.53 18.0438Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M13.5001 7.5V2.5C13.5001 1.67157 12.8285 1 12.0001 1C11.1717 1 10.5001 1.67157 10.5001 2.5V7.5C10.5001 8.32843 11.1717 9 12.0001 9C12.8285 9 13.5001 8.32843 13.5001 7.5ZM12.5001 7.5V2.5C12.5001 2.22386 12.2763 2 12.0001 2C11.724 2 11.5001 2.22386 11.5001 2.5V7.5C11.5001 7.77614 11.724 8 12.0001 8C12.2763 8 12.5001 7.77614 12.5001 7.5Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M21 17.0568L16 13.4854V10.5146L21 6.94321V17.0568Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M21 17.0568L16 13.4854L16 10.5146L21 6.94321V17.0568ZM20.4188 17.8706C21.0806 18.3433 22 17.8702 22 17.0568V6.94321C22 6.12984 21.0806 5.65671 20.4188 6.12948L15.4188 9.7009C15.156 9.88862 15 10.1917 15 10.5146L15 13.4854C15 13.8084 15.156 14.1114 15.4188 14.2991L20.4188 17.8706Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M9.47 10.848C9.62893 10.9473 9.81258 11 10 11H13V14C13 14.1874 13.0527 14.3711 13.152 14.53L17.1958 21H6.80425L10.848 14.53C11.0948 14.1351 11.0364 13.6222 10.7071 13.2929C10.3778 12.9636 9.86488 12.9052 9.47 13.152L3 17.1958L3 6.80425L9.47 10.848Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M12.5001 7.5V2.5C12.5001 2.22386 12.2763 2 12.0001 2C11.724 2 11.5001 2.22386 11.5001 2.5V7.5C11.5001 7.77614 11.724 8 12.0001 8C12.2763 8 12.5001 7.77614 12.5001 7.5Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M9.47 10.848C9.62893 10.9473 9.81258 11 10 11H13V14C13 14.1874 13.0527 14.3711 13.152 14.53L17.1958 21H6.80425L10.848 14.53C11.0948 14.1351 11.0364 13.6222 10.7071 13.2929C10.3778 12.9636 9.86488 12.9052 9.47 13.152L3 17.1958L3 6.80425L9.47 10.848ZM3.53 18.0438C2.86395 18.46 2 17.9812 2 17.1958V6.80425C2 6.01881 2.86395 5.53997 3.53 5.95625L10 10H13.5C13.7761 10 14 10.2239 14 10.5V14L18.0438 20.47C18.46 21.136 17.9812 22 17.1958 22H6.80425C6.01881 22 5.53997 21.136 5.95625 20.47L10 14L3.53 18.0438Z" style="fill: var(--automation-device-tertiary-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M13.5001 7.5V2.5C13.5001 1.67157 12.8285 1 12.0001 1C11.1717 1 10.5001 1.67157 10.5001 2.5V7.5C10.5001 8.32843 11.1717 9 12.0001 9C12.8285 9 13.5001 8.32843 13.5001 7.5ZM12.5001 7.5V2.5C12.5001 2.22386 12.2763 2 12.0001 2C11.724 2 11.5001 2.22386 11.5001 2.5V7.5C11.5001 7.77614 11.724 8 12.0001 8C12.2763 8 12.5001 7.77614 12.5001 7.5Z" style="fill: var(--automation-device-tertiary-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M21 17.0568L16 13.4854V10.5146L21 6.94321V17.0568Z" style="fill: var(--automation-device-tertiary-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M21 17.0568L16 13.4854L16 10.5146L21 6.94321V17.0568ZM20.4188 17.8706C21.0806 18.3433 22 17.8702 22 17.0568V6.94321C22 6.12984 21.0806 5.65671 20.4188 6.12948L15.4188 9.7009C15.156 9.88862 15 10.1917 15 10.5146L15 13.4854C15 13.8084 15.156 14.1114 15.4188 14.2991L20.4188 17.8706Z" style="fill: var(--automation-device-secondary-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M9.47 10.848C9.62893 10.9473 9.81258 11 10 11H13V14C13 14.1874 13.0527 14.3711 13.152 14.53L17.1958 21H6.80425L10.848 14.53C11.0948 14.1351 11.0364 13.6222 10.7071 13.2929C10.3778 12.9636 9.86488 12.9052 9.47 13.152L3 17.1958L3 6.80425L9.47 10.848Z" style="fill: var(--automation-device-primary-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M12.5001 7.5V2.5C12.5001 2.22386 12.2763 2 12.0001 2C11.724 2 11.5001 2.22386 11.5001 2.5V7.5C11.5001 7.77614 11.724 8 12.0001 8C12.2763 8 12.5001 7.77614 12.5001 7.5Z" style="fill: var(--automation-device-primary-color)"/>
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
    'obi-threeway-analog-inleft-left-0': ObiThreewayAnalogInleftLeft0;
  }
}
