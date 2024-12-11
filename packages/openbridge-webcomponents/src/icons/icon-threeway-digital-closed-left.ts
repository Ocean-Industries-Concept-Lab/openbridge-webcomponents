import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-threeway-digital-closed-left')
export class ObiThreewayDigitalClosedLeft extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M14.53 10.8481C14.3711 10.9474 14.1874 11.0001 14 11.0001L11 11.0001L11 14.0001C11 14.1875 10.9473 14.3712 10.848 14.5301L6.80425 21.0001H17.1958L13.152 14.5301C12.9052 14.1352 12.9636 13.6222 13.2929 13.293C13.6222 12.9637 14.1351 12.9053 14.53 13.1521L21 17.1958V6.80433L14.53 10.8481ZM20.47 18.0438C21.136 18.4601 22 17.9813 22 17.1958V6.80433C22 6.0189 21.136 5.54005 20.47 5.95634L14 10.0001L10.5 10.0001C10.2239 10.0001 10 10.2239 10 10.5001V14.0001L5.95625 20.4701C5.53997 21.1361 6.01881 22.0001 6.80425 22.0001H17.1958C17.9812 22.0001 18.46 21.1361 18.0438 20.4701L14 14.0001L20.47 18.0438Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M3 17.0569L8 13.4855V10.5147L3 6.94329L3 17.0569Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M3 17.0568L8 13.4854V10.5146L3 6.94317L3 17.0568ZM3.58124 17.8705C2.91937 18.3433 2 17.8702 2 17.0568L2 6.94317C2 6.1298 2.91937 5.65667 3.58124 6.12944L8.58124 9.70086C8.84403 9.88858 9 10.1916 9 10.5146V13.4854C9 13.8083 8.84403 14.1114 8.58124 14.2991L3.58124 17.8705Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M14.53 10.8484C14.371 10.9478 14.1874 11.0004 14 11.0004H11V14.0004C11 14.1879 10.9473 14.3715 10.8479 14.5304L6.8042 21.0004H17.1957L13.152 14.5304C12.9052 14.1356 12.9636 13.6226 13.2928 13.2933C13.6221 12.9641 14.1351 12.9056 14.53 13.1524L21 17.1962L21 6.80469L14.53 10.8484Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M14.53 10.8481C14.3711 10.9474 14.1874 11.0001 14 11.0001L11 11.0001L11 14.0001C11 14.1875 10.9473 14.3712 10.848 14.5301L6.80425 21.0001H17.1958L13.152 14.5301C12.9052 14.1352 12.9636 13.6222 13.2929 13.293C13.6222 12.9637 14.1351 12.9053 14.53 13.1521L21 17.1958V6.80433L14.53 10.8481ZM20.47 18.0438C21.136 18.4601 22 17.9813 22 17.1958V6.80433C22 6.0189 21.136 5.54005 20.47 5.95634L14 10.0001L10.5 10.0001C10.2239 10.0001 10 10.2239 10 10.5001V14.0001L5.95625 20.4701C5.53997 21.1361 6.01881 22.0001 6.80425 22.0001H17.1958C17.9812 22.0001 18.46 21.1361 18.0438 20.4701L14 14.0001L20.47 18.0438Z" style="fill: var(--automation-device-tertiary-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M3 17.0569L8 13.4855V10.5147L3 6.94329L3 17.0569Z" style="fill: var(--automation-device-tertiary-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M3 17.0568L8 13.4854V10.5146L3 6.94317L3 17.0568ZM3.58124 17.8705C2.91937 18.3433 2 17.8702 2 17.0568L2 6.94317C2 6.1298 2.91937 5.65667 3.58124 6.12944L8.58124 9.70086C8.84403 9.88858 9 10.1916 9 10.5146V13.4854C9 13.8083 8.84403 14.1114 8.58124 14.2991L3.58124 17.8705Z" style="fill: var(--automation-device-secondary-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M14.53 10.8484C14.371 10.9478 14.1874 11.0004 14 11.0004H11V14.0004C11 14.1879 10.9473 14.3715 10.8479 14.5304L6.8042 21.0004H17.1957L13.152 14.5304C12.9052 14.1356 12.9636 13.6226 13.2928 13.2933C13.6221 12.9641 14.1351 12.9056 14.53 13.1524L21 17.1962L21 6.80469L14.53 10.8484Z" style="fill: var(--automation-device-primary-color)"/>
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
    'obi-threeway-digital-closed-left': ObiThreewayDigitalClosedLeft;
  }
}