import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-mosfet-ntype-4-off')
export class ObiMosfetNtype4Off extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M23 1H13V6.25H23V1Z" fill="currentColor"/>
<path d="M1 1H11V17L5 13V16.25H1V1Z" fill="currentColor"/>
<path d="M11 17V23H1V17.75H5V21L11 17Z" fill="currentColor"/>
<path d="M23 23H13V17.75L23 17.75V23Z" fill="currentColor"/>
<path d="M23 7.75V16.25H13V7.75H23Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M0 1C0 0.447716 0.447715 0 1 0H23C23.5523 0 24 0.447715 24 1V23C24 23.5523 23.5523 24 23 24H1C0.447716 24 0 23.5523 0 23V1ZM13 1H23V6.25H13V1ZM11 1H1V16.25H5V13L11 17L5 21V17.75H1V23H11V17V1ZM13 23H23V17.75L13 17.75V23ZM23 16.25V7.75H13V16.25H23Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M23 1H13V6.25H23V1Z" style="fill: var(--automation-device-primary-inverted-color)"/>
<path d="M1 1H11V17L5 13V16.25H1V1Z" style="fill: var(--automation-device-primary-inverted-color)"/>
<path d="M11 17V23H1V17.75H5V21L11 17Z" style="fill: var(--automation-device-primary-inverted-color)"/>
<path d="M23 23H13V17.75L23 17.75V23Z" style="fill: var(--automation-device-primary-inverted-color)"/>
<path d="M23 7.75V16.25H13V7.75H23Z" style="fill: var(--automation-device-primary-inverted-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M0 1C0 0.447716 0.447715 0 1 0H23C23.5523 0 24 0.447715 24 1V23C24 23.5523 23.5523 24 23 24H1C0.447716 24 0 23.5523 0 23V1ZM13 1H23V6.25H13V1ZM11 1H1V16.25H5V13L11 17L5 21V17.75H1V23H11V17V1ZM13 23H23V17.75L13 17.75V23ZM23 16.25V7.75H13V16.25H23Z" style="fill: var(--undefined)"/>
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
    'obi-mosfet-ntype-4-off': ObiMosfetNtype4Off;
  }
}