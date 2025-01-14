import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-mosfet-ntype-1-on')
export class ObiMosfetNtype1On extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M23 1H11V3.25H23V1Z" fill="currentColor"/>
<path d="M1 1H9V23H1V19.75H6.25V5H4.75V18.25H1V1Z" fill="currentColor"/>
<path d="M23 23H11V20.75H23V23Z" fill="currentColor"/>
<path d="M23 12.75V19.25H11V4.75H23V11.25H18V8L12 12L18 16V12.75H23Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M0 1C0 0.447716 0.447715 0 1 0H23C23.5523 0 24 0.447715 24 1V23C24 23.5523 23.5523 24 23 24H1C0.447716 24 0 23.5523 0 23L0 1ZM11 1H23V3.25H11V1ZM9 1H1V18.25H4.75V5H6.25V19.75H1V23H9V1ZM11 23H23V20.75H11V23ZM23 19.25V12.75H18V16L12 12L18 8V11.25H23V4.75H11V19.25H23Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M23 1H11V3.25H23V1Z" style="fill: var(--automation-device-primary-color)"/>
<path d="M1 1H9V23H1V19.75H6.25V5H4.75V18.25H1V1Z" style="fill: var(--automation-device-primary-color)"/>
<path d="M23 23H11V20.75H23V23Z" style="fill: var(--automation-device-primary-color)"/>
<path d="M23 12.75V19.25H11V4.75H23V11.25H18V8L12 12L18 16V12.75H23Z" style="fill: var(--automation-device-primary-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M0 1C0 0.447716 0.447715 0 1 0H23C23.5523 0 24 0.447715 24 1V23C24 23.5523 23.5523 24 23 24H1C0.447716 24 0 23.5523 0 23L0 1ZM11 1H23V3.25H11V1ZM9 1H1V18.25H4.75V5H6.25V19.75H1V23H9V1ZM11 23H23V20.75H11V23ZM23 19.25V12.75H18V16L12 12L18 8V11.25H23V4.75H11V19.25H23Z" style="fill: var(--automation-device-tertiary-color)"/>
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
    'obi-mosfet-ntype-1-on': ObiMosfetNtype1On;
  }
}