import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-threeway-stacked-inleft-right-0')
export class ObiThreewayStackedInleftRight0 extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_2539_1004)">
<path fill-rule="evenodd" clip-rule="evenodd" d="M13 10H14L20.47 5.95625C21.136 5.53997 22 6.01881 22 6.80425V17.1958C22 17.9812 21.136 18.46 20.47 18.0438L14 14H10L3.53 18.0438C2.86395 18.46 2 17.9812 2 17.1958V6.80425C2 6.01881 2.86395 5.53997 3.53 5.95625L9.8784 9.924C9.95786 9.97367 10.0497 10 10.1434 10H11V0H13V10ZM14.53 10.848C14.3711 10.9473 14.1874 11 14 11H10.1434C9.86227 11 9.5868 10.921 9.3484 10.772L3 6.80425L3 17.1958L9.47 13.152C9.62893 13.0527 9.81258 13 10 13H14C14.1874 13 14.3711 13.0527 14.53 13.152L21 17.1958V6.80425L14.53 10.848Z" fill="currentColor"/>
<path d="M6.94312 21L10.5145 16H13.4853L17.0567 21H6.94312Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M10.5146 16L6.94317 21H17.0568L13.4854 16L10.5146 16ZM6.12944 20.4188C5.65667 21.0806 6.1298 22 6.94317 22H17.0568C17.8702 22 18.3433 21.0806 17.8705 20.4188L14.2991 15.4188C14.1114 15.156 13.8083 15 13.4854 15H10.5146C10.1916 15 9.88858 15.156 9.70086 15.4188L6.12944 20.4188Z" fill="currentColor"/>
<path d="M14 11.0004C14.1874 11.0004 14.3711 10.9478 14.53 10.8484L21 6.80469V17.1962L14.53 13.1524C14.3711 13.0531 14.1874 13.0004 14 13.0004H10C9.81258 13.0004 9.62893 13.0531 9.47 13.1524L3 17.1962L3 6.80469L9.3484 10.7724C9.5868 10.9214 9.86227 11.0004 10.1434 11.0004H14Z" fill="currentColor"/>
</g>
<defs>
<clipPath id="clip0_2539_1004">
<rect width="24" height="24" fill="currentColor"/>
</clipPath>
</defs>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_2539_1004)">
<path fill-rule="evenodd" clip-rule="evenodd" d="M13 10H14L20.47 5.95625C21.136 5.53997 22 6.01881 22 6.80425V17.1958C22 17.9812 21.136 18.46 20.47 18.0438L14 14H10L3.53 18.0438C2.86395 18.46 2 17.9812 2 17.1958V6.80425C2 6.01881 2.86395 5.53997 3.53 5.95625L9.8784 9.924C9.95786 9.97367 10.0497 10 10.1434 10H11V0H13V10ZM14.53 10.848C14.3711 10.9473 14.1874 11 14 11H10.1434C9.86227 11 9.5868 10.921 9.3484 10.772L3 6.80425L3 17.1958L9.47 13.152C9.62893 13.0527 9.81258 13 10 13H14C14.1874 13 14.3711 13.0527 14.53 13.152L21 17.1958V6.80425L14.53 10.848Z" style="fill: var(--automation-device-tertiary-color)"/>
<path d="M6.94312 21L10.5145 16H13.4853L17.0567 21H6.94312Z" style="fill: var(--automation-device-tertiary-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M10.5146 16L6.94317 21H17.0568L13.4854 16L10.5146 16ZM6.12944 20.4188C5.65667 21.0806 6.1298 22 6.94317 22H17.0568C17.8702 22 18.3433 21.0806 17.8705 20.4188L14.2991 15.4188C14.1114 15.156 13.8083 15 13.4854 15H10.5146C10.1916 15 9.88858 15.156 9.70086 15.4188L6.12944 20.4188Z" style="fill: var(--automation-device-secondary-color)"/>
<path d="M14 11.0004C14.1874 11.0004 14.3711 10.9478 14.53 10.8484L21 6.80469V17.1962L14.53 13.1524C14.3711 13.0531 14.1874 13.0004 14 13.0004H10C9.81258 13.0004 9.62893 13.0531 9.47 13.1524L3 17.1962L3 6.80469L9.3484 10.7724C9.5868 10.9214 9.86227 11.0004 10.1434 11.0004H14Z" style="fill: var(--automation-device-primary-color)"/>
</g>
<defs>
<clipPath id="clip0_2539_1004">
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
    'obi-threeway-stacked-inleft-right-0': ObiThreewayStackedInleftRight0;
  }
}
