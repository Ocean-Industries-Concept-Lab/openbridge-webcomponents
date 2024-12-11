import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-threeway-acuator-piston-inleft-left-100')
export class ObiThreewayAcuatorPistonInleftLeft100 extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M16.5015 1C17.0537 1 17.5015 1.44772 17.5015 2V5.00366C17.5015 5.55595 17.0537 6.00366 16.5015 6.00366L13 6.00366L13 10H14L20.47 5.95625C21.136 5.53997 22 6.01881 22 6.80425L22 17.1958C22 17.9812 21.136 18.46 20.47 18.0438L14 14L18.0438 20.47C18.46 21.136 17.9812 22 17.1958 22H6.80425C6.01881 22 5.53997 21.136 5.95625 20.47L10 14L10 10.5C10 10.2239 10.2239 10 10.5 10H11L11 6.00366H7.49854C6.94625 6.00366 6.49854 5.55595 6.49854 5.00366V2C6.49854 1.44772 6.94625 1 7.49854 1L16.5015 1ZM7.49854 2L16.5015 2V5.00366L7.49854 5.00366L7.49854 2ZM14.53 10.848C14.3711 10.9473 14.1874 11 14 11H11V14C11 14.1874 10.9473 14.3711 10.848 14.53L6.80425 21H17.1958L13.152 14.53C12.9052 14.1351 12.9636 13.6222 13.2929 13.2929C13.6222 12.9636 14.1351 12.9052 14.53 13.152L21 17.1958L21 6.80425L14.53 10.848Z" fill="currentColor"/>
<path d="M8 13.4852L3 17.0566L3 6.94302L8 10.5144L8 13.4852Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M3 17.0568L8 13.4854V10.5146L3 6.94317L3 17.0568ZM3.58124 17.8705C2.91937 18.3433 2 17.8702 2 17.0568L2 6.94317C2 6.1298 2.91937 5.65667 3.58124 6.12944L8.58124 9.70086C8.84403 9.88858 9 10.1916 9 10.5146V13.4854C9 13.8083 8.84403 14.1114 8.58124 14.2991L3.58124 17.8705Z" fill="currentColor"/>
<path d="M14 11C14.1874 11 14.371 10.9473 14.53 10.848L21 6.80425L21 17.1958L14.53 13.152C14.1351 12.9052 13.6221 12.9636 13.2928 13.2929C12.9636 13.6222 12.9052 14.1351 13.152 14.53L17.1957 21H6.8042L10.8479 14.53C10.9473 14.3711 11 14.1874 11 14L11 11H14Z" fill="currentColor"/>
<path d="M16.5014 2L7.49849 2V5.00366L16.5014 5.00366V2Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M16.5015 1C17.0537 1 17.5015 1.44772 17.5015 2V5.00366C17.5015 5.55595 17.0537 6.00366 16.5015 6.00366L13 6.00366L13 10H14L20.47 5.95625C21.136 5.53997 22 6.01881 22 6.80425L22 17.1958C22 17.9812 21.136 18.46 20.47 18.0438L14 14L18.0438 20.47C18.46 21.136 17.9812 22 17.1958 22H6.80425C6.01881 22 5.53997 21.136 5.95625 20.47L10 14L10 10.5C10 10.2239 10.2239 10 10.5 10H11L11 6.00366H7.49854C6.94625 6.00366 6.49854 5.55595 6.49854 5.00366V2C6.49854 1.44772 6.94625 1 7.49854 1L16.5015 1ZM7.49854 2L16.5015 2V5.00366L7.49854 5.00366L7.49854 2ZM14.53 10.848C14.3711 10.9473 14.1874 11 14 11H11V14C11 14.1874 10.9473 14.3711 10.848 14.53L6.80425 21H17.1958L13.152 14.53C12.9052 14.1351 12.9636 13.6222 13.2929 13.2929C13.6222 12.9636 14.1351 12.9052 14.53 13.152L21 17.1958L21 6.80425L14.53 10.848Z" style="fill: var(--automation-device-tertiary-color)"/>
<path d="M8 13.4852L3 17.0566L3 6.94302L8 10.5144L8 13.4852Z" style="fill: var(--automation-device-tertiary-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M3 17.0568L8 13.4854V10.5146L3 6.94317L3 17.0568ZM3.58124 17.8705C2.91937 18.3433 2 17.8702 2 17.0568L2 6.94317C2 6.1298 2.91937 5.65667 3.58124 6.12944L8.58124 9.70086C8.84403 9.88858 9 10.1916 9 10.5146V13.4854C9 13.8083 8.84403 14.1114 8.58124 14.2991L3.58124 17.8705Z" style="fill: var(--automation-device-secondary-color)"/>
<path d="M14 11C14.1874 11 14.371 10.9473 14.53 10.848L21 6.80425L21 17.1958L14.53 13.152C14.1351 12.9052 13.6221 12.9636 13.2928 13.2929C12.9636 13.6222 12.9052 14.1351 13.152 14.53L17.1957 21H6.8042L10.8479 14.53C10.9473 14.3711 11 14.1874 11 14L11 11H14Z" style="fill: var(--automation-device-primary-color)"/>
<path d="M16.5014 2L7.49849 2V5.00366L16.5014 5.00366V2Z" style="fill: var(--automation-device-primary-color)"/>
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
    'obi-threeway-acuator-piston-inleft-left-100': ObiThreewayAcuatorPistonInleftLeft100;
  }
}
