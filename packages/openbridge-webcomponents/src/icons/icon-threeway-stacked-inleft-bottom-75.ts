import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-threeway-stacked-inleft-bottom-75')
export class ObiThreewayStackedInleftBottom75 extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M11 0V10H10L3.53 5.95625C2.86395 5.53997 2 6.01881 2 6.80425V17.1958C2 17.9812 2.86395 18.46 3.53 18.0438L10 14L5.95625 20.47C5.53997 21.136 6.01881 22 6.80425 22H17.1958C17.9812 22 18.46 21.136 18.0438 20.47L14 14L20.47 18.0438C21.136 18.46 22 17.9812 22 17.1958V6.80425C22 6.01881 21.136 5.53997 20.47 5.95625L14.1216 9.924C14.0421 9.97367 13.9503 10 13.8566 10H13V0H11ZM14.6516 10.772L17 9.30425V14.6958L14.53 13.152C14.1351 12.9052 13.6222 12.9636 13.2929 13.2929C12.9636 13.6222 12.9052 14.1351 13.152 14.53L17.1958 21L6.80425 21L10.848 14.53C11.0948 14.1351 11.0364 13.6222 10.7071 13.2929C10.3778 12.9636 9.86488 12.9052 9.47 13.152L5 15.9458V8.05425L9.47 10.848C9.62893 10.9473 9.81258 11 10 11H13.8566C14.1377 11 14.4132 10.921 14.6516 10.772ZM18 8.67925V15.3208L21 17.1958V6.80425L18 8.67925ZM4 7.42925V16.5708L3 17.1958L3 6.80425L4 7.42925Z" fill="currentColor"/>
<path d="M18 15.3212V8.67969L21 6.80469V17.1962L18 15.3212Z" fill="currentColor"/>
<path d="M4 16.5712V7.42969L3 6.80469L3 17.1962L4 16.5712Z" fill="currentColor"/>
<path d="M17 9.30469L14.6516 10.7724C14.4132 10.9214 14.1377 11.0004 13.8566 11.0004H10C9.81258 11.0004 9.62893 10.9478 9.47 10.8484L5 8.05469V15.9462L9.47 13.1524C9.86488 12.9056 10.3778 12.9641 10.7071 13.2933C11.0364 13.6226 11.0948 14.1356 10.848 14.5304L6.80425 21.0004L17.1958 21.0004L13.152 14.5304C12.9052 14.1356 12.9636 13.6226 13.2929 13.2933C13.6222 12.9641 14.1351 12.9056 14.53 13.1524L17 14.6962V9.30469Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M11 0V10H10L3.53 5.95625C2.86395 5.53997 2 6.01881 2 6.80425V17.1958C2 17.9812 2.86395 18.46 3.53 18.0438L10 14L5.95625 20.47C5.53997 21.136 6.01881 22 6.80425 22H17.1958C17.9812 22 18.46 21.136 18.0438 20.47L14 14L20.47 18.0438C21.136 18.46 22 17.9812 22 17.1958V6.80425C22 6.01881 21.136 5.53997 20.47 5.95625L14.1216 9.924C14.0421 9.97367 13.9503 10 13.8566 10H13V0H11ZM14.6516 10.772L17 9.30425V14.6958L14.53 13.152C14.1351 12.9052 13.6222 12.9636 13.2929 13.2929C12.9636 13.6222 12.9052 14.1351 13.152 14.53L17.1958 21L6.80425 21L10.848 14.53C11.0948 14.1351 11.0364 13.6222 10.7071 13.2929C10.3778 12.9636 9.86488 12.9052 9.47 13.152L5 15.9458V8.05425L9.47 10.848C9.62893 10.9473 9.81258 11 10 11H13.8566C14.1377 11 14.4132 10.921 14.6516 10.772ZM18 8.67925V15.3208L21 17.1958V6.80425L18 8.67925ZM4 7.42925V16.5708L3 17.1958L3 6.80425L4 7.42925Z" style="fill: var(--automation-device-tertiary-color)"/>
<path d="M18 15.3212V8.67969L21 6.80469V17.1962L18 15.3212Z" style="fill: var(--automation-device-secondary-color)"/>
<path d="M4 16.5712V7.42969L3 6.80469L3 17.1962L4 16.5712Z" style="fill: var(--automation-device-secondary-color)"/>
<path d="M17 9.30469L14.6516 10.7724C14.4132 10.9214 14.1377 11.0004 13.8566 11.0004H10C9.81258 11.0004 9.62893 10.9478 9.47 10.8484L5 8.05469V15.9462L9.47 13.1524C9.86488 12.9056 10.3778 12.9641 10.7071 13.2933C11.0364 13.6226 11.0948 14.1356 10.848 14.5304L6.80425 21.0004L17.1958 21.0004L13.152 14.5304C12.9052 14.1356 12.9636 13.6226 13.2929 13.2933C13.6222 12.9641 14.1351 12.9056 14.53 13.1524L17 14.6962V9.30469Z" style="fill: var(--automation-device-primary-color)"/>
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
    'obi-threeway-stacked-inleft-bottom-75': ObiThreewayStackedInleftBottom75;
  }
}
