import {LitElement, html, css, svg} from 'lit';
import {property} from 'lit/decorators.js';
import {customElement} from '../decorator.js';

@customElement('obi-vessel-type-psv-outlined')
export class ObiVesselTypePsvOutlined extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M10.5 17C11.3284 17 12 17.6716 12 18.5C12 19.3284 11.3284 20 10.5 20C9.67157 20 9 19.3284 9 18.5C9 17.6716 9.67157 17 10.5 17Z" fill="currentColor"/>
<path d="M15 20H13V13H15V20Z" fill="currentColor"/>
<path d="M10.5 13C11.3284 13 12 13.6716 12 14.5C12 15.3284 11.3284 16 10.5 16C9.67157 16 9 15.3284 9 14.5C9 13.6716 9.67157 13 10.5 13Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M12.5303 1.17676C15.7966 2.26575 17.9998 5.32252 18 8.76562V23H6V8.76562C6.00019 5.32252 8.20338 2.26575 11.4697 1.17676L12 1L12.5303 1.17676ZM7.5 21.5H16.5V8.75H15.375L13.875 10.75H10.125L8.625 8.75H7.5V21.5ZM11.9443 2.59961C9.78244 3.3203 8.19364 5.10198 7.67871 7.25H9.375L10.875 9.25H13.125L14.625 7.25H16.3213C15.8064 5.10198 14.2176 3.3203 12.0557 2.59961L12 2.58105L11.9443 2.59961Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M10.5 17C11.3284 17 12 17.6716 12 18.5C12 19.3284 11.3284 20 10.5 20C9.67157 20 9 19.3284 9 18.5C9 17.6716 9.67157 17 10.5 17Z" style="fill: var(--element-active-color)"/>
<path d="M15 20H13V13H15V20Z" style="fill: var(--element-active-color)"/>
<path d="M10.5 13C11.3284 13 12 13.6716 12 14.5C12 15.3284 11.3284 16 10.5 16C9.67157 16 9 15.3284 9 14.5C9 13.6716 9.67157 13 10.5 13Z" style="fill: var(--element-active-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M12.5303 1.17676C15.7966 2.26575 17.9998 5.32252 18 8.76562V23H6V8.76562C6.00019 5.32252 8.20338 2.26575 11.4697 1.17676L12 1L12.5303 1.17676ZM7.5 21.5H16.5V8.75H15.375L13.875 10.75H10.125L8.625 8.75H7.5V21.5ZM11.9443 2.59961C9.78244 3.3203 8.19364 5.10198 7.67871 7.25H9.375L10.875 9.25H13.125L14.625 7.25H16.3213C15.8064 5.10198 14.2176 3.3203 12.0557 2.59961L12 2.58105L11.9443 2.59961Z" style="fill: var(--element-active-color)"/>
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
    'obi-vessel-type-psv-outlined': ObiVesselTypePsvOutlined;
  }
}
