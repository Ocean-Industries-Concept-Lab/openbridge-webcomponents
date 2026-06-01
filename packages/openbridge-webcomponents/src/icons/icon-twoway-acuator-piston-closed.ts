import {LitElement, html, css, svg} from 'lit';
import {property} from 'lit/decorators.js';
import {customElement} from '../decorator.js';

@customElement('obi-twoway-acuator-piston-closed')
export class ObiTwowayAcuatorPistonClosed extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M8 9.51462L3 5.94319V18.0568L8 14.4854V9.51462Z" fill="currentColor"/>
<path d="M16 14.4854V9.51462L21 5.94319L21 18.0568L16 14.4854Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M16.5015 2H7.49854V5.00366H11V13C11 13.5523 11.4477 14 12 14C12.5523 14 13 13.5523 13 13V5.00366H16.5015V2Z" fill="currentColor"/>
<path d="M17.5029 6.00391H14.002V13C14.002 14.1044 13.1063 14.9997 12.002 15C10.8974 15 10.002 14.1046 10.002 13V6.00391H6.5V1H17.5029V6.00391ZM7.5 5.00391H11.002V13C11.002 13.5523 11.4497 14 12.002 14C12.554 13.9997 13.002 13.5521 13.002 13V5.00391H16.5029V2H7.5V5.00391Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M3.58124 5.12946C2.91937 4.65669 2 5.12982 2 5.94319V18.0568C2 18.8702 2.91937 19.3433 3.58124 18.8705L9 15V9L3.58124 5.12946ZM8 9.51462L3 5.94319V18.0568L8 14.4854V9.51462Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M22 5.94319V18.0568C22 18.8702 21.0806 19.3433 20.4188 18.8705L15 15V9L20.4188 5.12946C21.0806 4.65669 22 5.12982 22 5.94319ZM16 9.51462V14.4854L21 18.0568L21 5.94319L16 9.51462Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M8 9.51462L3 5.94319V18.0568L8 14.4854V9.51462Z" style="fill: var(--automation-device-primary-inverted-color)"/>
<path d="M16 14.4854V9.51462L21 5.94319L21 18.0568L16 14.4854Z" style="fill: var(--automation-device-primary-inverted-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M16.5015 2H7.49854V5.00366H11V13C11 13.5523 11.4477 14 12 14C12.5523 14 13 13.5523 13 13V5.00366H16.5015V2Z" style="fill: var(--automation-device-primary-inverted-color)"/>
<path d="M17.5029 6.00391H14.002V13C14.002 14.1044 13.1063 14.9997 12.002 15C10.8974 15 10.002 14.1046 10.002 13V6.00391H6.5V1H17.5029V6.00391ZM7.5 5.00391H11.002V13C11.002 13.5523 11.4497 14 12.002 14C12.554 13.9997 13.002 13.5521 13.002 13V5.00391H16.5029V2H7.5V5.00391Z" style="fill: var(--automation-device-tertiary-inverted-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M3.58124 5.12946C2.91937 4.65669 2 5.12982 2 5.94319V18.0568C2 18.8702 2.91937 19.3433 3.58124 18.8705L9 15V9L3.58124 5.12946ZM8 9.51462L3 5.94319V18.0568L8 14.4854V9.51462Z" style="fill: var(--automation-device-tertiary-inverted-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M22 5.94319V18.0568C22 18.8702 21.0806 19.3433 20.4188 18.8705L15 15V9L20.4188 5.12946C21.0806 4.65669 22 5.12982 22 5.94319ZM16 9.51462V14.4854L21 18.0568L21 5.94319L16 9.51462Z" style="fill: var(--automation-device-tertiary-inverted-color)"/>
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
    'obi-twoway-acuator-piston-closed': ObiTwowayAcuatorPistonClosed;
  }
}
