import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-connector-cross')
export class ObiConnectorCross extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M11.5 2V0H12.5V2H11.5ZM11.5 8V4H12.5V8H11.5ZM11.5 11.5V10H12.5V11.5H14V12.5H12.5V14H11.5V12.5H10V11.5H11.5ZM2 12.5H0V11.5H2V12.5ZM8 12.5H4V11.5H8V12.5ZM20 12.5H16V11.5H20V12.5ZM24 12.5H22V11.5H24V12.5ZM11.5 20V16H12.5V20H11.5ZM11.5 24V22H12.5V24H11.5Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M11.5 2V0H12.5V2H11.5ZM11.5 8V4H12.5V8H11.5ZM11.5 11.5V10H12.5V11.5H14V12.5H12.5V14H11.5V12.5H10V11.5H11.5ZM2 12.5H0V11.5H2V12.5ZM8 12.5H4V11.5H8V12.5ZM20 12.5H16V11.5H20V12.5ZM24 12.5H22V11.5H24V12.5ZM11.5 20V16H12.5V20H11.5ZM11.5 24V22H12.5V24H11.5Z" style="fill: var(--automation-device-tertiary-color)"/>
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
    'obi-connector-cross': ObiConnectorCross;
  }
}
