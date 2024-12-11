import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-threeway-acuator-piston-closed-bottom')
export class ObiThreewayAcuatorPistonClosedBottom extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M7.49854 1C6.94625 1 6.49854 1.44772 6.49854 2L6.49854 5.00366C6.49854 5.55595 6.94625 6.00366 7.49854 6.00366H11L11 10H10.1434C10.0497 10 9.95786 9.97367 9.8784 9.924L3.53 5.95625C2.86395 5.53997 2 6.01881 2 6.80425L2 17.1958C2 17.9812 2.86395 18.46 3.53 18.0438L10 14H14L20.47 18.0438C21.136 18.46 22 17.9812 22 17.1958L22 6.80425C22 6.01881 21.136 5.53997 20.47 5.95625L14 10H13L13 6.00366H16.5015C17.0537 6.00366 17.5015 5.55595 17.5015 5.00366V2C17.5015 1.44772 17.0538 1 16.5015 1L7.49854 1ZM16.5015 2L7.49854 2L7.49854 5.00366L16.5015 5.00366V2ZM14 11C14.1874 11 14.3711 10.9473 14.53 10.848L21 6.80425L21 17.1958L14.53 13.152C14.3711 13.0527 14.1874 13 14 13H10C9.81258 13 9.62893 13.0527 9.47 13.152L3 17.1958L3 6.80425L9.3484 10.772C9.5868 10.921 9.86227 11 10.1434 11H14Z" fill="currentColor"/>
<path d="M6.94312 21L10.5145 16H13.4853L17.0567 21L6.94312 21Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M10.5146 16L6.94317 21H17.0568L13.4854 16H10.5146ZM6.12944 20.4188C5.65667 21.0806 6.1298 22 6.94317 22H17.0568C17.8702 22 18.3433 21.0806 17.8705 20.4188L14.2991 15.4188C14.1114 15.156 13.8083 15 13.4854 15H10.5146C10.1916 15 9.88858 15.156 9.70086 15.4188L6.12944 20.4188Z" fill="currentColor"/>
<path d="M14.53 10.848C14.3711 10.9473 14.1874 11 14 11L10.1434 11C9.86227 11 9.5868 10.921 9.3484 10.772L3 6.80425L3 17.1958L9.47 13.152C9.62893 13.0527 9.81258 13 10 13L14 13C14.1874 13 14.3711 13.0527 14.53 13.152L21 17.1958L21 6.80425L14.53 10.848Z" fill="currentColor"/>
<path d="M7.49854 2L16.5015 2V5.00366L7.49854 5.00366V2Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M7.49854 1C6.94625 1 6.49854 1.44772 6.49854 2L6.49854 5.00366C6.49854 5.55595 6.94625 6.00366 7.49854 6.00366H11L11 10H10.1434C10.0497 10 9.95786 9.97367 9.8784 9.924L3.53 5.95625C2.86395 5.53997 2 6.01881 2 6.80425L2 17.1958C2 17.9812 2.86395 18.46 3.53 18.0438L10 14H14L20.47 18.0438C21.136 18.46 22 17.9812 22 17.1958L22 6.80425C22 6.01881 21.136 5.53997 20.47 5.95625L14 10H13L13 6.00366H16.5015C17.0537 6.00366 17.5015 5.55595 17.5015 5.00366V2C17.5015 1.44772 17.0538 1 16.5015 1L7.49854 1ZM16.5015 2L7.49854 2L7.49854 5.00366L16.5015 5.00366V2ZM14 11C14.1874 11 14.3711 10.9473 14.53 10.848L21 6.80425L21 17.1958L14.53 13.152C14.3711 13.0527 14.1874 13 14 13H10C9.81258 13 9.62893 13.0527 9.47 13.152L3 17.1958L3 6.80425L9.3484 10.772C9.5868 10.921 9.86227 11 10.1434 11H14Z" style="fill: var(--automation-device-tertiary-color)"/>
<path d="M6.94312 21L10.5145 16H13.4853L17.0567 21L6.94312 21Z" style="fill: var(--automation-device-tertiary-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M10.5146 16L6.94317 21H17.0568L13.4854 16H10.5146ZM6.12944 20.4188C5.65667 21.0806 6.1298 22 6.94317 22H17.0568C17.8702 22 18.3433 21.0806 17.8705 20.4188L14.2991 15.4188C14.1114 15.156 13.8083 15 13.4854 15H10.5146C10.1916 15 9.88858 15.156 9.70086 15.4188L6.12944 20.4188Z" style="fill: var(--automation-device-secondary-color)"/>
<path d="M14.53 10.848C14.3711 10.9473 14.1874 11 14 11L10.1434 11C9.86227 11 9.5868 10.921 9.3484 10.772L3 6.80425L3 17.1958L9.47 13.152C9.62893 13.0527 9.81258 13 10 13L14 13C14.1874 13 14.3711 13.0527 14.53 13.152L21 17.1958L21 6.80425L14.53 10.848Z" style="fill: var(--automation-device-primary-color)"/>
<path d="M7.49854 2L16.5015 2V5.00366L7.49854 5.00366V2Z" style="fill: var(--automation-device-primary-color)"/>
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
    'obi-threeway-acuator-piston-closed-bottom': ObiThreewayAcuatorPistonClosedBottom;
  }
}
