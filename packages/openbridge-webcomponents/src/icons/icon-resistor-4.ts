import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-resistor-4')
export class ObiResistor4 extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M16.2428 2.09976L17.657 0.685547L23.3138 6.3424L21.8996 7.75661L16.2428 2.09976Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M14.5861 7.9996L18.3641 4.22168L19.7783 5.63589L17.4146 7.9996H20V10.9996H23L23 12.9996H20V15.9996L9.41457 15.9996L4.22192 21.1922L2.80771 19.778L6.58614 15.9996L4 15.9996L4 12.9996H1L1 10.9996H4V7.9996L14.5861 7.9996ZM12.5861 9.9996L6 9.9996V13.9996L8.58614 13.9996L12.5861 9.9996ZM11.4146 13.9996L18 13.9996L18 9.9996L15.4146 9.9996L11.4146 13.9996Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M16.2428 2.09976L17.657 0.685547L23.3138 6.3424L21.8996 7.75661L16.2428 2.09976Z" style="fill: var(--automation-device-secondary-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M14.5861 7.9996L18.3641 4.22168L19.7783 5.63589L17.4146 7.9996H20V10.9996H23L23 12.9996H20V15.9996L9.41457 15.9996L4.22192 21.1922L2.80771 19.778L6.58614 15.9996L4 15.9996L4 12.9996H1L1 10.9996H4V7.9996L14.5861 7.9996ZM12.5861 9.9996L6 9.9996V13.9996L8.58614 13.9996L12.5861 9.9996ZM11.4146 13.9996L18 13.9996L18 9.9996L15.4146 9.9996L11.4146 13.9996Z" style="fill: var(--automation-device-secondary-color)"/>
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
    'obi-resistor-4': ObiResistor4;
  }
}
