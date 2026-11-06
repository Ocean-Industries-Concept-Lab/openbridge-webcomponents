import {LitElement, html, css, svg} from 'lit';
import {property} from 'lit/decorators.js';
import {customElement} from '../decorator.js';

@customElement('obi-twoway-analog-75')
export class ObiTwowayAnalog75 extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M20.4121 5.1546C21.0731 4.67431 22 5.14703 22 5.96417V18.0364C21.9998 18.8534 21.073 19.3254 20.4121 18.845L13.195 13.5959C13.1095 13.5338 13.0066 13.5003 12.9009 13.5003H11.0991C10.9934 13.5003 10.8905 13.5338 10.805 13.5959L3.58789 18.845C2.927 19.3254 2.00019 18.8535 2 18.0364V5.96417C2 5.14703 2.92695 4.67434 3.58789 5.1546L10.806 10.4047C10.8915 10.4668 10.9944 10.5003 11.1001 10.5003H12.8989C13.0046 10.5003 13.1076 10.4668 13.193 10.4047L20.4121 5.1546Z" fill="currentColor" stroke="currentColor"/>
<path d="M2 5.96405C2 5.14678 2.92692 4.67479 3.58789 5.15546L10.8047 10.4045C10.8901 10.4666 10.9939 10.5002 11.0996 10.5002H12.9004C13.0061 10.5002 13.1099 10.4666 13.1953 10.4045L19.5 5.81854V18.1808L13.1953 13.5959C13.1099 13.5337 13.0061 13.5002 12.9004 13.5002H11.0996C10.9939 13.5002 10.8901 13.5337 10.8047 13.5959L3.58789 18.8449C2.92693 19.3255 2.00002 18.8535 2 18.0363V5.96405Z" fill="currentColor" stroke="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M20.4121 5.1546C21.0731 4.67431 22 5.14703 22 5.96417V18.0364C21.9998 18.8534 21.073 19.3254 20.4121 18.845L13.195 13.5959C13.1095 13.5338 13.0066 13.5003 12.9009 13.5003H11.0991C10.9934 13.5003 10.8905 13.5338 10.805 13.5959L3.58789 18.845C2.927 19.3254 2.00019 18.8535 2 18.0364V5.96417C2 5.14703 2.92695 4.67434 3.58789 5.1546L10.806 10.4047C10.8915 10.4668 10.9944 10.5003 11.1001 10.5003H12.8989C13.0046 10.5003 13.1076 10.4668 13.193 10.4047L20.4121 5.1546Z" style="fill: var(--automation-symbol-off-line-color); stroke: var(--automation-symbol-off-line-color)"/>
<path d="M2 5.96405C2 5.14678 2.92692 4.67479 3.58789 5.15546L10.8047 10.4045C10.8901 10.4666 10.9939 10.5002 11.0996 10.5002H12.9004C13.0061 10.5002 13.1099 10.4666 13.1953 10.4045L19.5 5.81854V18.1808L13.1953 13.5959C13.1099 13.5337 13.0061 13.5002 12.9004 13.5002H11.0996C10.9939 13.5002 10.8901 13.5337 10.8047 13.5959L3.58789 18.8449C2.92693 19.3255 2.00002 18.8535 2 18.0363V5.96405Z" style="fill: var(--automation-symbol-on-background-color)" stroke="currentColor"/>
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
    'obi-twoway-analog-75': ObiTwowayAnalog75;
  }
}
