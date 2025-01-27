import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-threeway-analog-inleft-bottom-0')
export class ObiThreewayAnalogInleftBottom0 extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M9.47 10.848C9.62893 10.9473 9.81258 11 10 11H13V14C13 14.1874 13.0527 14.3711 13.152 14.53L17.1958 21H6.80425L10.848 14.53C11.0948 14.1351 11.0364 13.6222 10.7071 13.2929C10.3778 12.9636 9.86488 12.9052 9.47 13.152L3 17.1958L3 6.80425L9.47 10.848ZM3.53 18.0438C2.86395 18.46 2 17.9812 2 17.1958V6.80425C2 6.01881 2.86395 5.53997 3.53 5.95625L10 10H13.5C13.7761 10 14 10.2239 14 10.5V14L18.0438 20.47C18.46 21.136 17.9812 22 17.1958 22H6.80425C6.01881 22 5.53997 21.136 5.95625 20.47L10 14L3.53 18.0438Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M21 17.0568L16 13.4854V10.5146L21 6.94321V17.0568Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M9.5 7L14.5 7C15.3284 7 16 6.32843 16 5.5C16 4.67157 15.3284 4 14.5 4L9.5 4C8.67157 4 8 4.67157 8 5.5C8 6.32843 8.67157 7 9.5 7ZM9.5 6L14.5 6C14.7761 6 15 5.77614 15 5.5C15 5.22386 14.7761 5 14.5 5L9.5 5C9.22386 5 9 5.22386 9 5.5C9 5.77614 9.22386 6 9.5 6Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M21 17.0568L16 13.4854L16 10.5146L21 6.94321V17.0568ZM20.4188 17.8706C21.0806 18.3433 22 17.8702 22 17.0568V6.94321C22 6.12984 21.0806 5.65671 20.4188 6.12948L15.4188 9.7009C15.156 9.88862 15 10.1917 15 10.5146L15 13.4854C15 13.8084 15.156 14.1114 15.4188 14.2991L20.4188 17.8706Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M9.47 10.848C9.62893 10.9473 9.81258 11 10 11H13V14C13 14.1874 13.0527 14.3711 13.152 14.53L17.1958 21H6.80425L10.848 14.53C11.0948 14.1351 11.0364 13.6222 10.7071 13.2929C10.3778 12.9636 9.86488 12.9052 9.47 13.152L3 17.1958L3 6.80425L9.47 10.848Z" fill="currentColor"/>
<path d="M9.5 5C9.22386 5 9 5.22386 9 5.5C9 5.77614 9.22386 6 9.5 6L14.5 6C14.7761 6 15 5.77614 15 5.5C15 5.22386 14.7761 5 14.5 5L9.5 5Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M9.5 6L14.5 6C14.7761 6 15 5.77614 15 5.5C15 5.22386 14.7761 5 14.5 5L9.5 5C9.22386 5 9 5.22386 9 5.5C9 5.77614 9.22386 6 9.5 6Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M9.47 10.848C9.62893 10.9473 9.81258 11 10 11H13V14C13 14.1874 13.0527 14.3711 13.152 14.53L17.1958 21H6.80425L10.848 14.53C11.0948 14.1351 11.0364 13.6222 10.7071 13.2929C10.3778 12.9636 9.86488 12.9052 9.47 13.152L3 17.1958L3 6.80425L9.47 10.848ZM3.53 18.0438C2.86395 18.46 2 17.9812 2 17.1958V6.80425C2 6.01881 2.86395 5.53997 3.53 5.95625L10 10H13.5C13.7761 10 14 10.2239 14 10.5V14L18.0438 20.47C18.46 21.136 17.9812 22 17.1958 22H6.80425C6.01881 22 5.53997 21.136 5.95625 20.47L10 14L3.53 18.0438Z" style="fill: var(--automation-device-tertiary-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M21 17.0568L16 13.4854V10.5146L21 6.94321V17.0568Z" style="fill: var(--automation-device-tertiary-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M9.5 7L14.5 7C15.3284 7 16 6.32843 16 5.5C16 4.67157 15.3284 4 14.5 4L9.5 4C8.67157 4 8 4.67157 8 5.5C8 6.32843 8.67157 7 9.5 7ZM9.5 6L14.5 6C14.7761 6 15 5.77614 15 5.5C15 5.22386 14.7761 5 14.5 5L9.5 5C9.22386 5 9 5.22386 9 5.5C9 5.77614 9.22386 6 9.5 6Z" style="fill: var(--automation-device-tertiary-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M21 17.0568L16 13.4854L16 10.5146L21 6.94321V17.0568ZM20.4188 17.8706C21.0806 18.3433 22 17.8702 22 17.0568V6.94321C22 6.12984 21.0806 5.65671 20.4188 6.12948L15.4188 9.7009C15.156 9.88862 15 10.1917 15 10.5146L15 13.4854C15 13.8084 15.156 14.1114 15.4188 14.2991L20.4188 17.8706Z" style="fill: var(--automation-device-secondary-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M9.47 10.848C9.62893 10.9473 9.81258 11 10 11H13V14C13 14.1874 13.0527 14.3711 13.152 14.53L17.1958 21H6.80425L10.848 14.53C11.0948 14.1351 11.0364 13.6222 10.7071 13.2929C10.3778 12.9636 9.86488 12.9052 9.47 13.152L3 17.1958L3 6.80425L9.47 10.848Z" style="fill: var(--automation-device-primary-color)"/>
<path d="M9.5 5C9.22386 5 9 5.22386 9 5.5C9 5.77614 9.22386 6 9.5 6L14.5 6C14.7761 6 15 5.77614 15 5.5C15 5.22386 14.7761 5 14.5 5L9.5 5Z" style="fill: var(--automation-device-primary-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M9.5 6L14.5 6C14.7761 6 15 5.77614 15 5.5C15 5.22386 14.7761 5 14.5 5L9.5 5C9.22386 5 9 5.22386 9 5.5C9 5.77614 9.22386 6 9.5 6Z" style="fill: var(--automation-device-primary-color)"/>
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
    'obi-threeway-analog-inleft-bottom-0': ObiThreewayAnalogInleftBottom0;
  }
}
