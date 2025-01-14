import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-threeway-digital-closed-bottom')
export class ObiThreewayDigitalClosedBottom extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M14 11.0001C14.1874 11.0001 14.3711 10.9474 14.53 10.8481L21 6.80433V17.1958L14.53 13.1521C14.3711 13.0528 14.1874 13.0001 14 13.0001H10C9.81258 13.0001 9.62893 13.0528 9.47 13.1521L3 17.1958L3 6.80433L9.3484 10.7721C9.5868 10.9211 9.86227 11.0001 10.1434 11.0001H14ZM14 10.0001H10.1434C10.0497 10.0001 9.95786 9.97375 9.8784 9.92408L3.53 5.95634C2.86395 5.54005 2 6.0189 2 6.80433V17.1958C2 17.9813 2.86395 18.4601 3.53 18.0438L10 14.0001H14L20.47 18.0438C21.136 18.4601 22 17.9813 22 17.1958V6.80433C22 6.0189 21.136 5.54005 20.47 5.95634L14 10.0001Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M10.5146 16.0002L6.94317 21.0002H17.0568L13.4854 16.0002H10.5146Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M10.5146 16L6.94317 21H17.0568L13.4854 16H10.5146ZM6.12944 20.4188C5.65667 21.0806 6.1298 22 6.94317 22H17.0568C17.8702 22 18.3433 21.0806 17.8705 20.4188L14.2991 15.4188C14.1114 15.156 13.8083 15 13.4854 15H10.5146C10.1916 15 9.88858 15.156 9.70086 15.4188L6.12944 20.4188Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M14 10.9996C14.1874 10.9996 14.3711 10.9469 14.53 10.8476L21 6.80381V17.1953L14.53 13.1516C14.3711 13.0522 14.1874 12.9996 14 12.9996L10 12.9996C9.81258 12.9996 9.62893 13.0522 9.47 13.1516L3 17.1953L3 6.80381L9.3484 10.7716C9.5868 10.9206 9.86227 10.9996 10.1434 10.9996L14 10.9996Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M14 11.0001C14.1874 11.0001 14.3711 10.9474 14.53 10.8481L21 6.80433V17.1958L14.53 13.1521C14.3711 13.0528 14.1874 13.0001 14 13.0001H10C9.81258 13.0001 9.62893 13.0528 9.47 13.1521L3 17.1958L3 6.80433L9.3484 10.7721C9.5868 10.9211 9.86227 11.0001 10.1434 11.0001H14ZM14 10.0001H10.1434C10.0497 10.0001 9.95786 9.97375 9.8784 9.92408L3.53 5.95634C2.86395 5.54005 2 6.0189 2 6.80433V17.1958C2 17.9813 2.86395 18.4601 3.53 18.0438L10 14.0001H14L20.47 18.0438C21.136 18.4601 22 17.9813 22 17.1958V6.80433C22 6.0189 21.136 5.54005 20.47 5.95634L14 10.0001Z" style="fill: var(--automation-device-tertiary-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M10.5146 16.0002L6.94317 21.0002H17.0568L13.4854 16.0002H10.5146Z" style="fill: var(--automation-device-tertiary-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M10.5146 16L6.94317 21H17.0568L13.4854 16H10.5146ZM6.12944 20.4188C5.65667 21.0806 6.1298 22 6.94317 22H17.0568C17.8702 22 18.3433 21.0806 17.8705 20.4188L14.2991 15.4188C14.1114 15.156 13.8083 15 13.4854 15H10.5146C10.1916 15 9.88858 15.156 9.70086 15.4188L6.12944 20.4188Z" style="fill: var(--automation-device-secondary-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M14 10.9996C14.1874 10.9996 14.3711 10.9469 14.53 10.8476L21 6.80381V17.1953L14.53 13.1516C14.3711 13.0522 14.1874 12.9996 14 12.9996L10 12.9996C9.81258 12.9996 9.62893 13.0522 9.47 13.1516L3 17.1953L3 6.80381L9.3484 10.7716C9.5868 10.9206 9.86227 10.9996 10.1434 10.9996L14 10.9996Z" style="fill: var(--automation-device-primary-color)"/>
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
    'obi-threeway-digital-closed-bottom': ObiThreewayDigitalClosedBottom;
  }
}