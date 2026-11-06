import {LitElement, html, css, svg} from 'lit';
import {property} from 'lit/decorators.js';
import {customElement} from '../decorator.js';

@customElement('obi-twoway-analog-25')
export class ObiTwowayAnalog25 extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M20.4121 5.1546C21.0731 4.67431 22 5.14703 22 5.96417V18.0364C21.9998 18.8534 21.073 19.3254 20.4121 18.845L13.195 13.5959C13.1095 13.5338 13.0066 13.5003 12.9009 13.5003H11.0991C10.9934 13.5003 10.8905 13.5338 10.805 13.5959L3.58789 18.845C2.927 19.3254 2.00019 18.8535 2 18.0364V5.96417C2 5.14703 2.92695 4.67434 3.58789 5.1546L10.806 10.4047C10.8915 10.4668 10.9944 10.5003 11.1001 10.5003H12.8989C13.0046 10.5003 13.1076 10.4668 13.193 10.4047L20.4121 5.1546Z" fill="currentColor" stroke="currentColor"/>
<path d="M2 5.96429C2 5.14702 2.92692 4.67504 3.58789 5.1557L10.8047 10.4047C10.8901 10.4669 10.9939 10.5004 11.0996 10.5004H12.9004C13.0061 10.5004 13.1099 10.4669 13.1953 10.4047L16.5 8.00043V15.9994L13.1953 13.5961C13.1099 13.534 13.0061 13.5004 12.9004 13.5004H11.0996C10.9939 13.5004 10.8901 13.534 10.8047 13.5961L3.58789 18.8452C2.92705 19.3254 2.00031 18.8535 2 18.0366V5.96429Z" fill="currentColor" stroke="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M20.4121 5.1546C21.0731 4.67431 22 5.14703 22 5.96417V18.0364C21.9998 18.8534 21.073 19.3254 20.4121 18.845L13.195 13.5959C13.1095 13.5338 13.0066 13.5003 12.9009 13.5003H11.0991C10.9934 13.5003 10.8905 13.5338 10.805 13.5959L3.58789 18.845C2.927 19.3254 2.00019 18.8535 2 18.0364V5.96417C2 5.14703 2.92695 4.67434 3.58789 5.1546L10.806 10.4047C10.8915 10.4668 10.9944 10.5003 11.1001 10.5003H12.8989C13.0046 10.5003 13.1076 10.4668 13.193 10.4047L20.4121 5.1546Z" style="fill: var(--automation-symbol-off-line-color); stroke: var(--automation-symbol-off-line-color)"/>
<path d="M2 5.96429C2 5.14702 2.92692 4.67504 3.58789 5.1557L10.8047 10.4047C10.8901 10.4669 10.9939 10.5004 11.0996 10.5004H12.9004C13.0061 10.5004 13.1099 10.4669 13.1953 10.4047L16.5 8.00043V15.9994L13.1953 13.5961C13.1099 13.534 13.0061 13.5004 12.9004 13.5004H11.0996C10.9939 13.5004 10.8901 13.534 10.8047 13.5961L3.58789 18.8452C2.92705 19.3254 2.00031 18.8535 2 18.0366V5.96429Z" style="fill: var(--automation-symbol-on-background-color)" stroke="currentColor"/>
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
    'obi-twoway-analog-25': ObiTwowayAnalog25;
  }
}
