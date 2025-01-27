import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-mosfet-ptype-4-on')
export class ObiMosfetPtype4On extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M23 1H13V6.25L23 6.25V1Z" fill="currentColor"/>
<path d="M1 1H11V6.25L7 6.25V3L1 7V1Z" fill="currentColor"/>
<path d="M1 7L7 11V7.75L11 7.75V23H1V7Z" fill="currentColor"/>
<path d="M23 23H13V17.75L23 17.75V23Z" fill="currentColor"/>
<path d="M23 7.75V16.25L13 16.25V7.75L23 7.75Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M0 1C0 0.447716 0.447715 0 1 0H23C23.5523 0 24 0.447715 24 1V23C24 23.5523 23.5523 24 23 24H1C0.447716 24 0 23.5523 0 23V1ZM13 1H23V6.25L13 6.25V1ZM11 1H1V7V23H11V7.75L7 7.75V11L1 7L7 3V6.25L11 6.25V1ZM13 23H23V17.75L13 17.75V23ZM23 16.25V7.75L13 7.75V16.25L23 16.25Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M23 1H13V6.25L23 6.25V1Z" style="fill: var(--automation-device-primary-color)"/>
<path d="M1 1H11V6.25L7 6.25V3L1 7V1Z" style="fill: var(--automation-device-primary-color)"/>
<path d="M1 7L7 11V7.75L11 7.75V23H1V7Z" style="fill: var(--automation-device-primary-color)"/>
<path d="M23 23H13V17.75L23 17.75V23Z" style="fill: var(--automation-device-primary-color)"/>
<path d="M23 7.75V16.25L13 16.25V7.75L23 7.75Z" style="fill: var(--automation-device-primary-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M0 1C0 0.447716 0.447715 0 1 0H23C23.5523 0 24 0.447715 24 1V23C24 23.5523 23.5523 24 23 24H1C0.447716 24 0 23.5523 0 23V1ZM13 1H23V6.25L13 6.25V1ZM11 1H1V7V23H11V7.75L7 7.75V11L1 7L7 3V6.25L11 6.25V1ZM13 23H23V17.75L13 17.75V23ZM23 16.25V7.75L13 7.75V16.25L23 16.25Z" style="fill: var(--automation-device-tertiary-color)"/>
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
    'obi-mosfet-ptype-4-on': ObiMosfetPtype4On;
  }
}
