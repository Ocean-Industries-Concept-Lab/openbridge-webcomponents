import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-palette-day-night-iec')
export class ObiPaletteDayNightIec extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M6.99976 11.9999C6.99976 10.6739 7.52654 9.40209 8.46422 8.4644C9.4019 7.52672 10.6737 6.99994 11.9998 6.99994C13.3258 6.99994 14.5976 7.52672 15.5353 8.4644L16.2424 9.17151L9.17133 16.2426L8.46422 15.5355C7.52654 14.5978 6.99976 13.326 6.99976 11.9999ZM9.87843 9.87862C9.31583 10.4412 8.99976 11.2043 8.99976 11.9999C8.99976 12.4516 9.10163 12.8928 9.29265 13.2928L13.2926 9.29283C12.8927 9.10181 12.4515 8.99994 11.9998 8.99994C11.2041 8.99994 10.441 9.31601 9.87843 9.87862Z" fill="currentColor"/>
<path d="M3.51447 19.071L6.3429 16.2426L7.75711 17.6568L4.92869 20.4852L3.51447 19.071Z" fill="currentColor"/>
<path d="M0.999756 10.9999H4.99976V12.9999H0.999756V10.9999Z" fill="currentColor"/>
<path d="M4.92874 3.51468L7.75717 6.3431L6.34295 7.75732L3.51453 4.92889L4.92874 3.51468Z" fill="currentColor"/>
<path d="M12.9998 0.999939V4.99994H10.9998V0.999939H12.9998Z" fill="currentColor"/>
<path d="M20.4851 4.92884L17.6567 7.75727L16.2425 6.34306L19.0709 3.51463L20.4851 4.92884Z" fill="currentColor"/>
<path d="M20.1539 11C20.8 11 21.4154 11.088 22 11.253C19.5016 11.9515 17.6924 14.036 17.6924 16.5C17.6924 18.964 19.5016 21.0485 22 21.747C21.4154 21.912 20.8 22 20.1539 22C16.757 22 14 19.536 14 16.5C14 13.464 16.757 11 20.1539 11Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M6.99976 11.9999C6.99976 10.6739 7.52654 9.40209 8.46422 8.4644C9.4019 7.52672 10.6737 6.99994 11.9998 6.99994C13.3258 6.99994 14.5976 7.52672 15.5353 8.4644L16.2424 9.17151L9.17133 16.2426L8.46422 15.5355C7.52654 14.5978 6.99976 13.326 6.99976 11.9999ZM9.87843 9.87862C9.31583 10.4412 8.99976 11.2043 8.99976 11.9999C8.99976 12.4516 9.10163 12.8928 9.29265 13.2928L13.2926 9.29283C12.8927 9.10181 12.4515 8.99994 11.9998 8.99994C11.2041 8.99994 10.441 9.31601 9.87843 9.87862Z" style="fill: var(--element-active-color)"/>
<path d="M3.51447 19.071L6.3429 16.2426L7.75711 17.6568L4.92869 20.4852L3.51447 19.071Z" style="fill: var(--element-active-color)"/>
<path d="M0.999756 10.9999H4.99976V12.9999H0.999756V10.9999Z" style="fill: var(--element-active-color)"/>
<path d="M4.92874 3.51468L7.75717 6.3431L6.34295 7.75732L3.51453 4.92889L4.92874 3.51468Z" style="fill: var(--element-active-color)"/>
<path d="M12.9998 0.999939V4.99994H10.9998V0.999939H12.9998Z" style="fill: var(--element-active-color)"/>
<path d="M20.4851 4.92884L17.6567 7.75727L16.2425 6.34306L19.0709 3.51463L20.4851 4.92884Z" style="fill: var(--element-active-color)"/>
<path d="M20.1539 11C20.8 11 21.4154 11.088 22 11.253C19.5016 11.9515 17.6924 14.036 17.6924 16.5C17.6924 18.964 19.5016 21.0485 22 21.747C21.4154 21.912 20.8 22 20.1539 22C16.757 22 14 19.536 14 16.5C14 13.464 16.757 11 20.1539 11Z" style="fill: var(--element-active-color)"/>
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
    'obi-palette-day-night-iec': ObiPaletteDayNightIec;
  }
}
