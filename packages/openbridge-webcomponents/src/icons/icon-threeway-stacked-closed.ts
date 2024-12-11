import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-threeway-stacked-closed')
export class ObiThreewayStackedClosed extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_3597_1983)">
<path fill-rule="evenodd" clip-rule="evenodd" d="M8 10.5145L3 6.94312L3 17.0567L8 13.4853V10.5145Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M21 17.0568L16 13.4853V10.5146L21 6.94316V17.0568Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M10.5146 15.9999L6.94317 20.9999H17.0568L13.4854 15.9999H10.5146Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M3.58124 6.12944C2.91937 5.65667 2 6.1298 2 6.94317L2 17.0568C2 17.8702 2.91937 18.3433 3.58124 17.8705L8.58124 14.2991C8.84403 14.1114 9 13.8083 9 13.4854L9 10.5146C9 10.1916 8.84403 9.88858 8.58124 9.70086L3.58124 6.12944ZM8 10.5146L3 6.94317L3 17.0568L8 13.4854L8 10.5146Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M20.4188 17.8706C21.0806 18.3433 22 17.8702 22 17.0568L22 6.94321C22 6.12984 21.0806 5.65671 20.4188 6.12948L15.4188 9.7009C15.156 9.88862 15 10.1917 15 10.5146V13.4854C15 13.8084 15.156 14.1114 15.4188 14.2991L20.4188 17.8706ZM21 17.0568L16 13.4854V10.5146L21 6.94321L21 17.0568Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M6.12944 20.4188C5.65667 21.0806 6.1298 22 6.94317 22L17.0568 22C17.8702 22 18.3433 21.0806 17.8705 20.4188L14.2991 15.4188C14.1114 15.156 13.8083 15 13.4854 15H10.5146C10.1916 15 9.88858 15.156 9.70086 15.4188L6.12944 20.4188ZM10.5146 16L6.94317 21L17.0568 21L13.4854 16H10.5146Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M13 0L13 12C13 12.5523 12.5523 13 12 13C11.4477 13 11 12.5523 11 12L11 8.74224e-08L13 0Z" fill="currentColor"/>
</g>
<defs>
<clipPath id="clip0_3597_1983">
<rect width="24" height="24" fill="currentColor"/>
</clipPath>
</defs>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_3597_1983)">
<path fill-rule="evenodd" clip-rule="evenodd" d="M8 10.5145L3 6.94312L3 17.0567L8 13.4853V10.5145Z" style="fill: var(--automation-device-tertiary-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M21 17.0568L16 13.4853V10.5146L21 6.94316V17.0568Z" style="fill: var(--automation-device-tertiary-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M10.5146 15.9999L6.94317 20.9999H17.0568L13.4854 15.9999H10.5146Z" style="fill: var(--automation-device-tertiary-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M3.58124 6.12944C2.91937 5.65667 2 6.1298 2 6.94317L2 17.0568C2 17.8702 2.91937 18.3433 3.58124 17.8705L8.58124 14.2991C8.84403 14.1114 9 13.8083 9 13.4854L9 10.5146C9 10.1916 8.84403 9.88858 8.58124 9.70086L3.58124 6.12944ZM8 10.5146L3 6.94317L3 17.0568L8 13.4854L8 10.5146Z" style="fill: var(--automation-device-secondary-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M20.4188 17.8706C21.0806 18.3433 22 17.8702 22 17.0568L22 6.94321C22 6.12984 21.0806 5.65671 20.4188 6.12948L15.4188 9.7009C15.156 9.88862 15 10.1917 15 10.5146V13.4854C15 13.8084 15.156 14.1114 15.4188 14.2991L20.4188 17.8706ZM21 17.0568L16 13.4854V10.5146L21 6.94321L21 17.0568Z" style="fill: var(--automation-device-secondary-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M6.12944 20.4188C5.65667 21.0806 6.1298 22 6.94317 22L17.0568 22C17.8702 22 18.3433 21.0806 17.8705 20.4188L14.2991 15.4188C14.1114 15.156 13.8083 15 13.4854 15H10.5146C10.1916 15 9.88858 15.156 9.70086 15.4188L6.12944 20.4188ZM10.5146 16L6.94317 21L17.0568 21L13.4854 16H10.5146Z" style="fill: var(--automation-device-secondary-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M13 0L13 12C13 12.5523 12.5523 13 12 13C11.4477 13 11 12.5523 11 12L11 8.74224e-08L13 0Z" style="fill: var(--automation-device-secondary-color)"/>
</g>
<defs>
<clipPath id="clip0_3597_1983">
<rect width="24" height="24" fill="none"/>
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
    'obi-threeway-stacked-closed': ObiThreewayStackedClosed;
  }
}
