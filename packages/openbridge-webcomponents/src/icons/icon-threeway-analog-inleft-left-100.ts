import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-threeway-analog-inleft-left-100')
export class ObiThreewayAnalogInleftLeft100 extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M14 11C14.1874 11 14.3711 10.9473 14.53 10.848L21 6.80425V17.1958L14.53 13.152C14.3711 13.0527 14.1874 13 14 13H10C9.81258 13 9.62893 13.0527 9.47 13.152L3 17.1958L3 6.80425L9.3484 10.772C9.5868 10.921 9.86227 11 10.1434 11L14 11ZM14 10L10.1434 10C10.0497 10 9.95786 9.97367 9.8784 9.924L3.53 5.95625C2.86395 5.53997 2 6.01881 2 6.80425L2 17.1958C2 17.9812 2.86395 18.46 3.53 18.0438L10 14H14L20.47 18.0438C21.136 18.46 22 17.9812 22 17.1958V6.80425C22 6.01881 21.136 5.53997 20.47 5.95625L14 10Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M10.5146 16L6.94317 21L17.0568 21L13.4854 16H10.5146Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M9.5 7L14.5 7C15.3284 7 16 6.32843 16 5.5C16 4.67157 15.3284 4 14.5 4L9.5 4C8.67157 4 8 4.67157 8 5.5C8 6.32843 8.67157 7 9.5 7ZM9.5 6L14.5 6C14.7761 6 15 5.77614 15 5.5C15 5.22386 14.7761 5 14.5 5L9.5 5C9.22386 5 9 5.22386 9 5.5C9 5.77614 9.22386 6 9.5 6Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M10.5146 16L6.94317 21H17.0568L13.4854 16H10.5146ZM6.12944 20.4188C5.65667 21.0806 6.1298 22 6.94317 22H17.0568C17.8702 22 18.3433 21.0806 17.8705 20.4188L14.2991 15.4188C14.1114 15.156 13.8083 15 13.4854 15H10.5146C10.1916 15 9.88858 15.156 9.70086 15.4188L6.12944 20.4188Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M14 10.9999C14.1874 10.9999 14.3711 10.9472 14.53 10.8479L21 6.80416V17.1957L14.53 13.1519C14.3711 13.0526 14.1874 12.9999 14 12.9999L10 12.9999C9.81258 12.9999 9.62893 13.0526 9.47 13.1519L3 17.1957L3 6.80416L9.3484 10.7719C9.5868 10.9209 9.86227 10.9999 10.1434 10.9999L14 10.9999Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M9.5 6L14.5 6C14.7761 6 15 5.77614 15 5.5C15 5.22386 14.7761 5 14.5 5L9.5 5C9.22386 5 9 5.22386 9 5.5C9 5.77614 9.22386 6 9.5 6Z" fill="currentColor"/>
<path d="M14.5 6L9.5 6C9.22386 6 9 5.77614 9 5.5C9 5.22386 9.22386 5 9.5 5L14.5 5C14.7761 5 15 5.22386 15 5.5C15 5.77614 14.7761 6 14.5 6Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M14 11C14.1874 11 14.3711 10.9473 14.53 10.848L21 6.80425V17.1958L14.53 13.152C14.3711 13.0527 14.1874 13 14 13H10C9.81258 13 9.62893 13.0527 9.47 13.152L3 17.1958L3 6.80425L9.3484 10.772C9.5868 10.921 9.86227 11 10.1434 11L14 11ZM14 10L10.1434 10C10.0497 10 9.95786 9.97367 9.8784 9.924L3.53 5.95625C2.86395 5.53997 2 6.01881 2 6.80425L2 17.1958C2 17.9812 2.86395 18.46 3.53 18.0438L10 14H14L20.47 18.0438C21.136 18.46 22 17.9812 22 17.1958V6.80425C22 6.01881 21.136 5.53997 20.47 5.95625L14 10Z" style="fill: var(--automation-device-tertiary-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M10.5146 16L6.94317 21L17.0568 21L13.4854 16H10.5146Z" style="fill: var(--automation-device-tertiary-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M9.5 7L14.5 7C15.3284 7 16 6.32843 16 5.5C16 4.67157 15.3284 4 14.5 4L9.5 4C8.67157 4 8 4.67157 8 5.5C8 6.32843 8.67157 7 9.5 7ZM9.5 6L14.5 6C14.7761 6 15 5.77614 15 5.5C15 5.22386 14.7761 5 14.5 5L9.5 5C9.22386 5 9 5.22386 9 5.5C9 5.77614 9.22386 6 9.5 6Z" style="fill: var(--automation-device-tertiary-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M10.5146 16L6.94317 21H17.0568L13.4854 16H10.5146ZM6.12944 20.4188C5.65667 21.0806 6.1298 22 6.94317 22H17.0568C17.8702 22 18.3433 21.0806 17.8705 20.4188L14.2991 15.4188C14.1114 15.156 13.8083 15 13.4854 15H10.5146C10.1916 15 9.88858 15.156 9.70086 15.4188L6.12944 20.4188Z" style="fill: var(--automation-device-secondary-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M14 10.9999C14.1874 10.9999 14.3711 10.9472 14.53 10.8479L21 6.80416V17.1957L14.53 13.1519C14.3711 13.0526 14.1874 12.9999 14 12.9999L10 12.9999C9.81258 12.9999 9.62893 13.0526 9.47 13.1519L3 17.1957L3 6.80416L9.3484 10.7719C9.5868 10.9209 9.86227 10.9999 10.1434 10.9999L14 10.9999Z" fill="none"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M9.5 6L14.5 6C14.7761 6 15 5.77614 15 5.5C15 5.22386 14.7761 5 14.5 5L9.5 5C9.22386 5 9 5.22386 9 5.5C9 5.77614 9.22386 6 9.5 6Z" style="fill: var(--automation-device-tertiary-color)"/>
<path d="M14.5 6L9.5 6C9.22386 6 9 5.77614 9 5.5C9 5.22386 9.22386 5 9.5 5L14.5 5C14.7761 5 15 5.22386 15 5.5C15 5.77614 14.7761 6 14.5 6Z" fill="none"/>
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
    'obi-threeway-analog-inleft-left-100': ObiThreewayAnalogInleftLeft100;
  }
}
