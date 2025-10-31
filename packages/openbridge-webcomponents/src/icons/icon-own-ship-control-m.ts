import {LitElement, html, css, svg} from 'lit';
import {property} from 'lit/decorators.js';
import {customElement} from '../decorator.js';

@customElement('obi-own-ship-control-m')
export class ObiOwnShipControlM extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_7025_3076)">
<path fill-rule="evenodd" clip-rule="evenodd" d="M12 4C16.4183 4 20 7.58172 20 12C20 16.4183 16.4183 20 12 20C7.58172 20 4 16.4183 4 12C4 7.58172 7.58172 4 12 4ZM7.45508 7.43164V16H9.00293V11.8838C9.00293 11.58 8.99548 11.2522 8.97949 10.9004C8.9635 10.5405 8.94666 10.2082 8.93066 9.9043C8.91467 9.59249 8.90351 9.35628 8.89551 9.19629H8.94336L11.0908 16H12.6748L14.9551 9.20801H15.0029C14.9949 9.36801 14.9828 9.60402 14.9668 9.91602C14.9588 10.2199 14.9467 10.5438 14.9307 10.8877C14.9227 11.2235 14.919 11.5317 14.9189 11.8115V16H16.5391V7.43164H14.1748L11.9551 14.0322H11.9189L9.83105 7.43164H7.45508Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M12 0C18.6274 0 24 5.37258 24 12C24 18.6274 18.6274 24 12 24C5.37258 24 0 18.6274 0 12C0 5.37258 5.37258 0 12 0ZM12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2Z" fill="currentColor"/>
</g>
<defs>
<clipPath id="clip0_7025_3076">
<rect width="24" height="24" fill="currentColor"/>
</clipPath>
</defs>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_7025_3076)">
<path fill-rule="evenodd" clip-rule="evenodd" d="M12 4C16.4183 4 20 7.58172 20 12C20 16.4183 16.4183 20 12 20C7.58172 20 4 16.4183 4 12C4 7.58172 7.58172 4 12 4ZM7.45508 7.43164V16H9.00293V11.8838C9.00293 11.58 8.99548 11.2522 8.97949 10.9004C8.9635 10.5405 8.94666 10.2082 8.93066 9.9043C8.91467 9.59249 8.90351 9.35628 8.89551 9.19629H8.94336L11.0908 16H12.6748L14.9551 9.20801H15.0029C14.9949 9.36801 14.9828 9.60402 14.9668 9.91602C14.9588 10.2199 14.9467 10.5438 14.9307 10.8877C14.9227 11.2235 14.919 11.5317 14.9189 11.8115V16H16.5391V7.43164H14.1748L11.9551 14.0322H11.9189L9.83105 7.43164H7.45508Z" style="fill: var(--element-active-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M12 0C18.6274 0 24 5.37258 24 12C24 18.6274 18.6274 24 12 24C5.37258 24 0 18.6274 0 12C0 5.37258 5.37258 0 12 0ZM12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2Z" style="fill: var(--element-active-color)"/>
</g>
<defs>
<clipPath id="clip0_7025_3076">
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
    'obi-own-ship-control-m': ObiOwnShipControlM;
  }
}
