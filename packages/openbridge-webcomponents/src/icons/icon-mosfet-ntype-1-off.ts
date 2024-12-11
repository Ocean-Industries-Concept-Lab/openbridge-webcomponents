import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-mosfet-ntype-1-off')
export class ObiMosfetNtype1Off extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M23 1L11 1V3.25L23 3.25V1Z" fill="currentColor"/>
<path d="M1 1L9 1L9 23H1L1 19.75H6.25L6.25 5L4.75 5L4.75 18.25H1L1 1Z" fill="currentColor"/>
<path d="M23 23L11 23V20.75L23 20.75V23Z" fill="currentColor"/>
<path d="M23 12.75V19.25L11 19.25L11 4.75L23 4.75V11.25H18V8L12 12L18 16V12.75H23Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M0 1C0 0.447716 0.447715 0 1 0L23 0C23.5523 0 24 0.447715 24 1L24 23C24 23.5523 23.5523 24 23 24L1 24C0.447716 24 0 23.5523 0 23L0 1ZM11 1L23 1V3.25L11 3.25V1ZM9 1L1 1L1 18.25H4.75L4.75 5H6.25L6.25 19.75H1L1 23H9L9 1ZM11 23L23 23V20.75L11 20.75V23ZM23 19.25V12.75H18V16L12 12L18 8L18 11.25H23L23 4.75L11 4.75L11 19.25L23 19.25Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M23 1L11 1V3.25L23 3.25V1Z" style="fill: var(--automation-device-primary-inverted-color)"/>
<path d="M1 1L9 1L9 23H1L1 19.75H6.25L6.25 5L4.75 5L4.75 18.25H1L1 1Z" style="fill: var(--automation-device-primary-inverted-color)"/>
<path d="M23 23L11 23V20.75L23 20.75V23Z" style="fill: var(--automation-device-primary-inverted-color)"/>
<path d="M23 12.75V19.25L11 19.25L11 4.75L23 4.75V11.25H18V8L12 12L18 16V12.75H23Z" style="fill: var(--automation-device-primary-inverted-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M0 1C0 0.447716 0.447715 0 1 0L23 0C23.5523 0 24 0.447715 24 1L24 23C24 23.5523 23.5523 24 23 24L1 24C0.447716 24 0 23.5523 0 23L0 1ZM11 1L23 1V3.25L11 3.25V1ZM9 1L1 1L1 18.25H4.75L4.75 5H6.25L6.25 19.75H1L1 23H9L9 1ZM11 23L23 23V20.75L11 20.75V23ZM23 19.25V12.75H18V16L12 12L18 8L18 11.25H23L23 4.75L11 4.75L11 19.25L23 19.25Z" style="fill: var(--automation-device-tertiary-inverted-color)"/>
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
    'obi-mosfet-ntype-1-off': ObiMosfetNtype1Off;
  }
}