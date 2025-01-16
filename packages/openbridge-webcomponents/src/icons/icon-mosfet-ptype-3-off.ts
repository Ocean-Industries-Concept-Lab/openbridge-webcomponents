import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-mosfet-ptype-3-off')
export class ObiMosfetPtype3Off extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M23 1H11V4.25H23V1Z" fill="currentColor"/>
<path d="M1 1H9V23H1V5.75H4.75V19H6.25V4.25H1V1Z" fill="currentColor"/>
<path d="M23 23H11V19.75H23V23Z" fill="currentColor"/>
<path d="M23 5.75V18.25H11V12.75H13V16L17.875 12.75H20.75V5.75H23Z" fill="currentColor"/>
<path d="M17.875 11.25H19.25V5.75H11V11.25H13V8L17.875 11.25Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M0 1C0 0.447716 0.447715 0 1 0H23C23.5523 0 24 0.447715 24 1V23C24 23.5523 23.5523 24 23 24H1C0.447716 24 0 23.5523 0 23V1ZM11 1H23V4.25H11V1ZM9 1H1V4.25H6.25V19H4.75V5.75H1V23H9V1ZM11 23H23V19.75H11V23ZM23 18.25V5.75H20.75V12.75H17.875L13 16V12.75H11V18.25H23ZM19.25 11.25H17.875L13 8V11.25H11V5.75H19.25V11.25Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M23 1H11V4.25H23V1Z" style="fill: var(--automation-device-primary-inverted-color)"/>
<path d="M1 1H9V23H1V5.75H4.75V19H6.25V4.25H1V1Z" style="fill: var(--automation-device-primary-inverted-color)"/>
<path d="M23 23H11V19.75H23V23Z" style="fill: var(--automation-device-primary-inverted-color)"/>
<path d="M23 5.75V18.25H11V12.75H13V16L17.875 12.75H20.75V5.75H23Z" style="fill: var(--automation-device-primary-inverted-color)"/>
<path d="M17.875 11.25H19.25V5.75H11V11.25H13V8L17.875 11.25Z" style="fill: var(--automation-device-primary-inverted-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M0 1C0 0.447716 0.447715 0 1 0H23C23.5523 0 24 0.447715 24 1V23C24 23.5523 23.5523 24 23 24H1C0.447716 24 0 23.5523 0 23V1ZM11 1H23V4.25H11V1ZM9 1H1V4.25H6.25V19H4.75V5.75H1V23H9V1ZM11 23H23V19.75H11V23ZM23 18.25V5.75H20.75V12.75H17.875L13 16V12.75H11V18.25H23ZM19.25 11.25H17.875L13 8V11.25H11V5.75H19.25V11.25Z" style="fill: var(--undefined)"/>
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
    'obi-mosfet-ptype-3-off': ObiMosfetPtype3Off;
  }
}
