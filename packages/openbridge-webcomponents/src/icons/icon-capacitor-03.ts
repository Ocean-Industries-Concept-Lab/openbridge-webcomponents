import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-capacitor-03')
export class ObiCapacitor03 extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M23.3139 0.686523L21.8996 7.75759L16.2428 2.10074L23.3139 0.686523Z" fill="currentColor"/>
<path d="M16 6.58637L18.3641 4.22228L19.7783 5.6365L16 9.4148V18.5C16 19.3284 15.3284 20 14.5 20C13.6716 20 13 19.3284 13 18.5V12.4148L11 14.4148V18.5C11 19.3284 10.3284 20 9.5 20C8.67157 20 8 19.3284 8 18.5V17.4148L4.22195 21.1928L2.80774 19.7786L8 14.5864V5.5C8 4.67157 8.67157 4 9.5 4C10.3284 4 11 4.67157 11 5.5V11.5864L13 9.58637V5.5C13 4.67157 13.6716 4 14.5 4C15.3284 4 16 4.67157 16 5.5V6.58637Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M23.3139 0.686523L21.8996 7.75759L16.2428 2.10074L23.3139 0.686523Z" style="fill: var(--automation-device-secondary-color)"/>
<path d="M16 6.58637L18.3641 4.22228L19.7783 5.6365L16 9.4148V18.5C16 19.3284 15.3284 20 14.5 20C13.6716 20 13 19.3284 13 18.5V12.4148L11 14.4148V18.5C11 19.3284 10.3284 20 9.5 20C8.67157 20 8 19.3284 8 18.5V17.4148L4.22195 21.1928L2.80774 19.7786L8 14.5864V5.5C8 4.67157 8.67157 4 9.5 4C10.3284 4 11 4.67157 11 5.5V11.5864L13 9.58637V5.5C13 4.67157 13.6716 4 14.5 4C15.3284 4 16 4.67157 16 5.5V6.58637Z" style="fill: var(--automation-device-secondary-color)"/>
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
    'obi-capacitor-03': ObiCapacitor03;
  }
}