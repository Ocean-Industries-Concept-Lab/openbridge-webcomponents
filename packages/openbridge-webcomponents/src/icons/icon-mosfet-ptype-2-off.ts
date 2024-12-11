import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-mosfet-ptype-2-off')
export class ObiMosfetPtype2Off extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M23 1L11 1V3.25L23 3.25V1Z" fill="currentColor"/>
<path d="M1 1L9 1V6L11 6V4.75L19.25 4.75V11.25H17.875L13 8V11.25H11V9L9 9V15H11V12.75H13V16L17.875 12.75H20.75L20.75 4.75H23L23 19.25L11 19.25V18H9V23H1L1 5.75L4.75 5.75L4.75 19H6.25L6.25 4.25L1 4.25L1 1Z" fill="currentColor"/>
<path d="M11 20.75L23 20.75V23L11 23V20.75Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M0 1C0 0.447716 0.447715 0 1 0L23 0C23.5523 0 24 0.447715 24 1L24 23C24 23.5523 23.5523 24 23 24L1 24C0.447716 24 0 23.5523 0 23L0 1ZM11 1L23 1V3.25L11 3.25V1ZM9 1L1 1L1 4.25L6.25 4.25L6.25 19H4.75L4.75 5.75L1 5.75L1 23H9V18H11V19.25L23 19.25L23 4.75H20.75L20.75 12.75H17.875L13 16V12.75H11V15H9V9H11V11.25H13V8L17.875 11.25H19.25L19.25 4.75L11 4.75L11 6H9L9 1ZM23 20.75L11 20.75V23L23 23V20.75Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M23 1L11 1V3.25L23 3.25V1Z" style="fill: var(--automation-device-primary-inverted-color)"/>
<path d="M1 1L9 1V6L11 6V4.75L19.25 4.75V11.25H17.875L13 8V11.25H11V9L9 9V15H11V12.75H13V16L17.875 12.75H20.75L20.75 4.75H23L23 19.25L11 19.25V18H9V23H1L1 5.75L4.75 5.75L4.75 19H6.25L6.25 4.25L1 4.25L1 1Z" style="fill: var(--automation-device-primary-inverted-color)"/>
<path d="M11 20.75L23 20.75V23L11 23V20.75Z" style="fill: var(--automation-device-primary-inverted-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M0 1C0 0.447716 0.447715 0 1 0L23 0C23.5523 0 24 0.447715 24 1L24 23C24 23.5523 23.5523 24 23 24L1 24C0.447716 24 0 23.5523 0 23L0 1ZM11 1L23 1V3.25L11 3.25V1ZM9 1L1 1L1 4.25L6.25 4.25L6.25 19H4.75L4.75 5.75L1 5.75L1 23H9V18H11V19.25L23 19.25L23 4.75H20.75L20.75 12.75H17.875L13 16V12.75H11V15H9V9H11V11.25H13V8L17.875 11.25H19.25L19.25 4.75L11 4.75L11 6H9L9 1ZM23 20.75L11 20.75V23L23 23V20.75Z" style="fill: var(--automation-device-tertiary-inverted-color)"/>
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
    'obi-mosfet-ptype-2-off': ObiMosfetPtype2Off;
  }
}