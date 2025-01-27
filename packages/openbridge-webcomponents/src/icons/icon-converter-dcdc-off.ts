import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-converter-dcdc-off')
export class ObiConverterDcdcOff extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M1 1H22.2929L1 22.2929V1ZM11 3H3V5H11V3ZM3 7L11 7V9H3V7Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M1.70711 23H23V1.70711L1.70711 23ZM13 15H21V17H13V15ZM21 19H13V21H21V19Z" fill="currentColor"/>
<path d="M11 3H3V5H11V3Z" fill="currentColor"/>
<path d="M3 7L11 7V9H3V7Z" fill="currentColor"/>
<path d="M21 15H13V17H21V15Z" fill="currentColor"/>
<path d="M21 19H13V21H21V19Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M1 0C0.447715 0 0 0.447716 0 1L0 23C0 23.5523 0.447716 24 1 24H23C23.5523 24 24 23.5523 24 23V1C24 0.447715 23.5523 0 23 0H1ZM22.2929 1H1V22.2929L22.2929 1ZM23 23H1.70711L23 1.70711V23Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M1 1H22.2929L1 22.2929V1ZM11 3H3V5H11V3ZM3 7L11 7V9H3V7Z" style="fill: var(--automation-device-primary-inverted-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M1.70711 23H23V1.70711L1.70711 23ZM13 15H21V17H13V15ZM21 19H13V21H21V19Z" style="fill: var(--automation-device-primary-inverted-color)"/>
<path d="M11 3H3V5H11V3Z" style="fill: var(--automation-device-tertiary-inverted-color)"/>
<path d="M3 7L11 7V9H3V7Z" style="fill: var(--automation-device-tertiary-inverted-color)"/>
<path d="M21 15H13V17H21V15Z" style="fill: var(--automation-device-tertiary-inverted-color)"/>
<path d="M21 19H13V21H21V19Z" style="fill: var(--automation-device-tertiary-inverted-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M1 0C0.447715 0 0 0.447716 0 1L0 23C0 23.5523 0.447716 24 1 24H23C23.5523 24 24 23.5523 24 23V1C24 0.447715 23.5523 0 23 0H1ZM22.2929 1H1V22.2929L22.2929 1ZM23 23H1.70711L23 1.70711V23Z" style="fill: var(--automation-device-tertiary-inverted-color)"/>
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
    'obi-converter-dcdc-off': ObiConverterDcdcOff;
  }
}
