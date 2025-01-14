import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-energy-hydrogen')
export class ObiEnergyHydrogen extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M13.7001 17.9996H15.5121V9.43164H13.7001V12.7916H10.3041V9.43164H8.49207V17.9996H10.3041V14.3036H13.7001V17.9996Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M4.9375 7.42632L12 1L19.0625 7.42632C20 8.27544 20.724 9.25483 21.2344 10.3645C21.7448 11.4741 22 12.6368 22 13.8526C22 16.4 21.026 18.5614 19.0781 20.3368C17.1302 22.1123 14.7708 23 12 23C9.22917 23 6.86979 22.1123 4.92188 20.3368C2.97396 18.5614 2 16.4 2 13.8526C2 12.6368 2.25521 11.4741 2.76562 10.3645C3.27604 9.25483 4 8.27544 4.9375 7.42632ZM6.28012 8.90868L12 3.70404L17.7165 8.90559L17.7199 8.90867C18.4645 9.5831 19.0238 10.3447 19.4174 11.2003C19.8078 12.049 20 12.9268 20 13.8526C20 15.8157 19.2793 17.4473 17.7309 18.8587C16.1715 20.28 14.3005 21 12 21C9.69954 21 7.82846 20.28 6.26913 18.8587C4.72067 17.4473 4 15.8157 4 13.8526C4 12.9268 4.1922 12.049 4.58262 11.2003C4.97615 10.3447 5.5355 9.58311 6.28012 8.90868Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M13.7001 17.9996H15.5121V9.43164H13.7001V12.7916H10.3041V9.43164H8.49207V17.9996H10.3041V14.3036H13.7001V17.9996Z" style="fill: var(--element-active-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M4.9375 7.42632L12 1L19.0625 7.42632C20 8.27544 20.724 9.25483 21.2344 10.3645C21.7448 11.4741 22 12.6368 22 13.8526C22 16.4 21.026 18.5614 19.0781 20.3368C17.1302 22.1123 14.7708 23 12 23C9.22917 23 6.86979 22.1123 4.92188 20.3368C2.97396 18.5614 2 16.4 2 13.8526C2 12.6368 2.25521 11.4741 2.76562 10.3645C3.27604 9.25483 4 8.27544 4.9375 7.42632ZM6.28012 8.90868L12 3.70404L17.7165 8.90559L17.7199 8.90867C18.4645 9.5831 19.0238 10.3447 19.4174 11.2003C19.8078 12.049 20 12.9268 20 13.8526C20 15.8157 19.2793 17.4473 17.7309 18.8587C16.1715 20.28 14.3005 21 12 21C9.69954 21 7.82846 20.28 6.26913 18.8587C4.72067 17.4473 4 15.8157 4 13.8526C4 12.9268 4.1922 12.049 4.58262 11.2003C4.97615 10.3447 5.5355 9.58311 6.28012 8.90868Z" style="fill: var(--element-active-color)"/>
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
    'obi-energy-hydrogen': ObiEnergyHydrogen;
  }
}