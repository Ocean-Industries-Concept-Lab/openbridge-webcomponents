import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-mosfet-ntype-2-off')
export class ObiMosfetNtype2Off extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M23 1L11 1V3.25L23 3.25V1Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M1 1L9 1V6L11 6V4.75L23 4.75L23 19.25H21.25L21.25 11.25H18V8L12 12L18 16V12.75H19.75V19.25L11 19.25V18H9V23H1L1 19.75H6.25L6.25 5L4.75 5L4.75 18.25H1L1 1ZM9 9L11 9V15H9V9Z" fill="currentColor"/>
<path d="M11 20.75L23 20.75V23L11 23V20.75Z" fill="currentColor"/>
<path d="M11 9H9V15H11V9Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M0 1C0 0.447716 0.447715 0 1 0L23 0C23.5523 0 24 0.447715 24 1L24 23C24 23.5523 23.5523 24 23 24L1 24C0.447716 24 0 23.5523 0 23L0 1ZM11 1L23 1V3.25L11 3.25V1ZM9 1L1 1L1 18.25H4.75L4.75 5H6.25L6.25 19.75H1L1 23H9V18H11V19.25L19.75 19.25V12.75H18V16L12 12L18 8L18 11.25H21.25V19.25H23L23 4.75L11 4.75L11 6H9L9 1ZM23 20.75L11 20.75V23L23 23V20.75Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M23 1L11 1V3.25L23 3.25V1Z" style="fill: var(--automation-device-primary-inverted-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M1 1L9 1V6L11 6V4.75L23 4.75L23 19.25H21.25L21.25 11.25H18V8L12 12L18 16V12.75H19.75V19.25L11 19.25V18H9V23H1L1 19.75H6.25L6.25 5L4.75 5L4.75 18.25H1L1 1ZM9 9L11 9V15H9V9Z" style="fill: var(--automation-device-primary-inverted-color)"/>
<path d="M11 20.75L23 20.75V23L11 23V20.75Z" style="fill: var(--automation-device-primary-inverted-color)"/>
<path d="M11 9H9V15H11V9Z" style="fill: var(--automation-device-tertiary-inverted-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M0 1C0 0.447716 0.447715 0 1 0L23 0C23.5523 0 24 0.447715 24 1L24 23C24 23.5523 23.5523 24 23 24L1 24C0.447716 24 0 23.5523 0 23L0 1ZM11 1L23 1V3.25L11 3.25V1ZM9 1L1 1L1 18.25H4.75L4.75 5H6.25L6.25 19.75H1L1 23H9V18H11V19.25L19.75 19.25V12.75H18V16L12 12L18 8L18 11.25H21.25V19.25H23L23 4.75L11 4.75L11 6H9L9 1ZM23 20.75L11 20.75V23L23 23V20.75Z" style="fill: var(--automation-device-tertiary-inverted-color)"/>
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
    'obi-mosfet-ntype-2-off': ObiMosfetNtype2Off;
  }
}
