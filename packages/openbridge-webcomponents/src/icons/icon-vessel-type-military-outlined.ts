import {LitElement, html, css, svg} from 'lit';
import {property} from 'lit/decorators.js';
import {customElement} from '../decorator.js';

@customElement('obi-vessel-type-military-outlined')
export class ObiVesselTypeMilitaryOutlined extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M10.4612 16.5618C10.0754 16.856 9.53879 16.4835 9.67949 16.0192L10.2692 14.0731L8.77328 13.0072C8.37688 12.7248 8.57669 12.1 9.06341 12.1H10.8923L11.5221 10.0532C11.6669 9.58254 12.3331 9.58254 12.4779 10.0532L13.1077 12.1H14.9366C15.4233 12.1 15.6231 12.7248 15.2267 13.0072L13.7308 14.0731L14.3205 16.0192C14.4612 16.4835 13.9246 16.856 13.5388 16.5618L12 15.3885L10.4612 16.5618Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M18 22V8.94427C18 5.91409 16.288 3.14399 13.5777 1.78885L12 1L10.4223 1.78886C7.71202 3.14399 6 5.9141 6 8.94427V22H18ZM11.25 3.05205L11.0931 3.1305C8.89101 4.23154 7.5 6.48225 7.5 8.94427V20.5H11.25L11.25 19C11.25 18.5858 11.5858 18.25 12 18.25C12.4142 18.25 12.75 18.5858 12.75 19L12.75 20.5H16.5V8.94427C16.5 6.48225 15.109 4.23154 12.9069 3.1305L12.75 3.05205V7C12.75 7.41421 12.4142 7.75 12 7.75C11.5858 7.75 11.25 7.41421 11.25 7V3.05205Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M10.4612 16.5618C10.0754 16.856 9.53879 16.4835 9.67949 16.0192L10.2692 14.0731L8.77328 13.0072C8.37688 12.7248 8.57669 12.1 9.06341 12.1H10.8923L11.5221 10.0532C11.6669 9.58254 12.3331 9.58254 12.4779 10.0532L13.1077 12.1H14.9366C15.4233 12.1 15.6231 12.7248 15.2267 13.0072L13.7308 14.0731L14.3205 16.0192C14.4612 16.4835 13.9246 16.856 13.5388 16.5618L12 15.3885L10.4612 16.5618Z" style="fill: var(--element-active-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M18 22V8.94427C18 5.91409 16.288 3.14399 13.5777 1.78885L12 1L10.4223 1.78886C7.71202 3.14399 6 5.9141 6 8.94427V22H18ZM11.25 3.05205L11.0931 3.1305C8.89101 4.23154 7.5 6.48225 7.5 8.94427V20.5H11.25L11.25 19C11.25 18.5858 11.5858 18.25 12 18.25C12.4142 18.25 12.75 18.5858 12.75 19L12.75 20.5H16.5V8.94427C16.5 6.48225 15.109 4.23154 12.9069 3.1305L12.75 3.05205V7C12.75 7.41421 12.4142 7.75 12 7.75C11.5858 7.75 11.25 7.41421 11.25 7V3.05205Z" style="fill: var(--element-active-color)"/>
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
    'obi-vessel-type-military-outlined': ObiVesselTypeMilitaryOutlined;
  }
}
