import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-threeway-stacked-inleft-bottom-0')
export class ObiThreewayStackedInleftBottom0 extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_2539_999)">
<path fill-rule="evenodd" clip-rule="evenodd" d="M11 0V10H10L3.53 5.95625C2.86395 5.53997 2 6.01881 2 6.80425V17.1958C2 17.9812 2.86395 18.46 3.53 18.0438L10 14L5.95625 20.47C5.53997 21.136 6.01881 22 6.80425 22H17.1958C17.9812 22 18.46 21.136 18.0438 20.47L14 14V10.5C14 10.2239 13.7761 10 13.5 10H13V0H11ZM10 11C9.81258 11 9.62893 10.9473 9.47 10.848L3 6.80425L3 17.1958L9.47 13.152C9.86488 12.9052 10.3778 12.9636 10.7071 13.2929C11.0364 13.6222 11.0948 14.1351 10.848 14.53L6.80425 21H17.1958L13.152 14.53C13.0527 14.3711 13 14.1874 13 14V11H10Z" fill="currentColor"/>
<path d="M16 13.4852L21 17.0566V6.94302L16 10.5144V13.4852Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M21 17.0568L16 13.4854L16 10.5146L21 6.94321V17.0568ZM20.4188 17.8706C21.0806 18.3433 22 17.8702 22 17.0568V6.94321C22 6.12984 21.0806 5.65671 20.4188 6.12948L15.4188 9.7009C15.156 9.88862 15 10.1917 15 10.5146L15 13.4854C15 13.8084 15.156 14.1114 15.4188 14.2991L20.4188 17.8706Z" fill="currentColor"/>
<path d="M9.47 10.8484C9.62893 10.9478 9.81258 11.0004 10 11.0004H13V14.0004C13 14.1879 13.0527 14.3715 13.152 14.5304L17.1958 21.0004H6.80425L10.848 14.5304C11.0948 14.1356 11.0364 13.6226 10.7071 13.2933C10.3778 12.9641 9.86488 12.9056 9.47 13.1524L3 17.1962L3 6.80469L9.47 10.8484Z" fill="currentColor"/>
</g>
<defs>
<clipPath id="clip0_2539_999">
<rect width="24" height="24" fill="currentColor"/>
</clipPath>
</defs>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_2539_999)">
<path fill-rule="evenodd" clip-rule="evenodd" d="M11 0V10H10L3.53 5.95625C2.86395 5.53997 2 6.01881 2 6.80425V17.1958C2 17.9812 2.86395 18.46 3.53 18.0438L10 14L5.95625 20.47C5.53997 21.136 6.01881 22 6.80425 22H17.1958C17.9812 22 18.46 21.136 18.0438 20.47L14 14V10.5C14 10.2239 13.7761 10 13.5 10H13V0H11ZM10 11C9.81258 11 9.62893 10.9473 9.47 10.848L3 6.80425L3 17.1958L9.47 13.152C9.86488 12.9052 10.3778 12.9636 10.7071 13.2929C11.0364 13.6222 11.0948 14.1351 10.848 14.53L6.80425 21H17.1958L13.152 14.53C13.0527 14.3711 13 14.1874 13 14V11H10Z" style="fill: var(--automation-device-tertiary-color)"/>
<path d="M16 13.4852L21 17.0566V6.94302L16 10.5144V13.4852Z" style="fill: var(--automation-device-tertiary-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M21 17.0568L16 13.4854L16 10.5146L21 6.94321V17.0568ZM20.4188 17.8706C21.0806 18.3433 22 17.8702 22 17.0568V6.94321C22 6.12984 21.0806 5.65671 20.4188 6.12948L15.4188 9.7009C15.156 9.88862 15 10.1917 15 10.5146L15 13.4854C15 13.8084 15.156 14.1114 15.4188 14.2991L20.4188 17.8706Z" style="fill: var(--automation-device-secondary-color)"/>
<path d="M9.47 10.8484C9.62893 10.9478 9.81258 11.0004 10 11.0004H13V14.0004C13 14.1879 13.0527 14.3715 13.152 14.5304L17.1958 21.0004H6.80425L10.848 14.5304C11.0948 14.1356 11.0364 13.6226 10.7071 13.2933C10.3778 12.9641 9.86488 12.9056 9.47 13.1524L3 17.1962L3 6.80469L9.47 10.8484Z" style="fill: var(--automation-device-primary-color)"/>
</g>
<defs>
<clipPath id="clip0_2539_999">
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
    'obi-threeway-stacked-inleft-bottom-0': ObiThreewayStackedInleftBottom0;
  }
}
