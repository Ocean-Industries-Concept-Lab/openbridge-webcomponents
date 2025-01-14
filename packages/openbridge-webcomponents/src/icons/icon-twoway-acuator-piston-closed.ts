import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-twoway-acuator-piston-closed')
export class ObiTwowayAcuatorPistonClosed extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M8 9.51462L3 5.94319V18.0568L8 14.4854V9.51462Z" fill="currentColor"/>
<path d="M16 14.4854V9.51462L21 5.94319L21 18.0568L16 14.4854Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M16.5015 2H7.49854V5.00366H16.5015V2Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M13 6.00366H16.5015C17.0537 6.00366 17.5015 5.55595 17.5015 5.00366V2C17.5015 1.44772 17.0538 1 16.5015 1H7.49854C6.94625 1 6.49854 1.44772 6.49854 2V5.00366C6.49854 5.55595 6.94625 6.00366 7.49854 6.00366H11V15C11 15.5523 11.4477 16 12 16C12.5523 16 13 15.5523 13 15V6.00366ZM16.5015 2H7.49854V5.00366H11.9138C11.9422 5.00124 11.971 5 12 5C12.029 5 12.0578 5.00124 12.0862 5.00366H16.5015V2Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M3.58124 5.12946C2.91937 4.65669 2 5.12982 2 5.94319V18.0568C2 18.8702 2.91937 19.3433 3.58124 18.8705L9 15V9L3.58124 5.12946ZM8 9.51462L3 5.94319V18.0568L8 14.4854V9.51462Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M22 5.94319V18.0568C22 18.8702 21.0806 19.3433 20.4188 18.8705L15 15V9L20.4188 5.12946C21.0806 4.65669 22 5.12982 22 5.94319ZM16 9.51462V14.4854L21 18.0568L21 5.94319L16 9.51462Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M8 9.51462L3 5.94319V18.0568L8 14.4854V9.51462Z" style="fill: var(--automation-device-primary-inverted-color)"/>
<path d="M16 14.4854V9.51462L21 5.94319L21 18.0568L16 14.4854Z" style="fill: var(--automation-device-primary-inverted-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M16.5015 2H7.49854V5.00366H16.5015V2Z" style="fill: var(--automation-device-primary-inverted-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M13 6.00366H16.5015C17.0537 6.00366 17.5015 5.55595 17.5015 5.00366V2C17.5015 1.44772 17.0538 1 16.5015 1H7.49854C6.94625 1 6.49854 1.44772 6.49854 2V5.00366C6.49854 5.55595 6.94625 6.00366 7.49854 6.00366H11V15C11 15.5523 11.4477 16 12 16C12.5523 16 13 15.5523 13 15V6.00366ZM16.5015 2H7.49854V5.00366H11.9138C11.9422 5.00124 11.971 5 12 5C12.029 5 12.0578 5.00124 12.0862 5.00366H16.5015V2Z" style="fill: var(--undefined)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M3.58124 5.12946C2.91937 4.65669 2 5.12982 2 5.94319V18.0568C2 18.8702 2.91937 19.3433 3.58124 18.8705L9 15V9L3.58124 5.12946ZM8 9.51462L3 5.94319V18.0568L8 14.4854V9.51462Z" style="fill: var(--undefined)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M22 5.94319V18.0568C22 18.8702 21.0806 19.3433 20.4188 18.8705L15 15V9L20.4188 5.12946C21.0806 4.65669 22 5.12982 22 5.94319ZM16 9.51462V14.4854L21 18.0568L21 5.94319L16 9.51462Z" style="fill: var(--undefined)"/>
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
    'obi-twoway-acuator-piston-closed': ObiTwowayAcuatorPistonClosed;
  }
}