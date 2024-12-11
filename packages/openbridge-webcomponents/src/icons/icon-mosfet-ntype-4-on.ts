import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-mosfet-ntype-4-on')
export class ObiMosfetNtype4On extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M23 1L13 1V6.25L23 6.25V1Z" fill="currentColor"/>
<path d="M1 1L11 1L11 17L5 13L5 16.25H1L1 1Z" fill="currentColor"/>
<path d="M11 17L11 23H1L1 17.75H5L5 21L11 17Z" fill="currentColor"/>
<path d="M23 23H13V17.75L23 17.75V23Z" fill="currentColor"/>
<path d="M23 7.75L23 16.25L13 16.25V7.75L23 7.75Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M0 1C0 0.447716 0.447715 0 1 0L23 0C23.5523 0 24 0.447715 24 1L24 23C24 23.5523 23.5523 24 23 24L1 24C0.447716 24 0 23.5523 0 23L0 1ZM13 1L23 1V6.25L13 6.25L13 1ZM11 1L1 1L1 16.25H5L5 13L11 17L5 21L5 17.75H1L1 23H11V17L11 1ZM13 23H23V17.75L13 17.75V23ZM23 16.25L23 7.75L13 7.75V16.25H23Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M23 1L13 1V6.25L23 6.25V1Z" style="fill: var(--automation-device-primary-color)"/>
<path d="M1 1L11 1L11 17L5 13L5 16.25H1L1 1Z" style="fill: var(--automation-device-primary-color)"/>
<path d="M11 17L11 23H1L1 17.75H5L5 21L11 17Z" style="fill: var(--automation-device-primary-color)"/>
<path d="M23 23H13V17.75L23 17.75V23Z" style="fill: var(--automation-device-primary-color)"/>
<path d="M23 7.75L23 16.25L13 16.25V7.75L23 7.75Z" style="fill: var(--automation-device-primary-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M0 1C0 0.447716 0.447715 0 1 0L23 0C23.5523 0 24 0.447715 24 1L24 23C24 23.5523 23.5523 24 23 24L1 24C0.447716 24 0 23.5523 0 23L0 1ZM13 1L23 1V6.25L13 6.25L13 1ZM11 1L1 1L1 16.25H5L5 13L11 17L5 21L5 17.75H1L1 23H11V17L11 1ZM13 23H23V17.75L13 17.75V23ZM23 16.25L23 7.75L13 7.75V16.25H23Z" style="fill: var(--automation-device-tertiary-color)"/>
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
    'obi-mosfet-ntype-4-on': ObiMosfetNtype4On;
  }
}