import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-mosfet-ptype-2')
export class ObiMosfetPtype2 extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M11 1L9 1V6L11 6V4.75L19.25 4.75V11.25H17.875L13 8V11.25H11V9L9 9V15H11V12.75H13V16L17.875 12.75H20.75L20.75 4.75H23V3.25L11 3.25V1Z" fill="currentColor"/>
<path d="M11 18V19.25L23 19.25V20.75L11 20.75V23H9V18H11Z" fill="currentColor"/>
<path d="M1 5.75L4.75 5.75L4.75 19H6.25L6.25 4.25L1 4.25L1 5.75Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M11 1L9 1V6L11 6V4.75L19.25 4.75V11.25H17.875L13 8V11.25H11V9L9 9V15H11V12.75H13V16L17.875 12.75H20.75L20.75 4.75H23V3.25L11 3.25V1Z" style="fill: var(--automation-device-secondary-color)"/>
<path d="M11 18V19.25L23 19.25V20.75L11 20.75V23H9V18H11Z" style="fill: var(--automation-device-secondary-color)"/>
<path d="M1 5.75L4.75 5.75L4.75 19H6.25L6.25 4.25L1 4.25L1 5.75Z" style="fill: var(--automation-device-secondary-color)"/>
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
    'obi-mosfet-ptype-2': ObiMosfetPtype2;
  }
}
