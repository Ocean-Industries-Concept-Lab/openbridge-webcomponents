import {LitElement, html, css, svg} from 'lit';
import {property} from 'lit/decorators.js';
import {customElement} from '../decorator.js';

@customElement('obi-twoway-analog-10')
export class ObiTwowayAnalog10 extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M20.4121 5.1546C21.0731 4.67433 22 5.14703 22 5.96417V18.0364C21.9998 18.8535 21.073 19.3254 20.4121 18.845L13.195 13.5959C13.1095 13.5338 13.0066 13.5003 12.9009 13.5003H11.0991C10.9934 13.5003 10.8905 13.5338 10.805 13.5959L3.58789 18.845C2.92701 19.3254 2.00021 18.8534 2 18.0364V5.96417C2 5.14703 2.92694 4.67432 3.58789 5.1546L10.807 10.4047C10.8924 10.4668 10.9954 10.5003 11.1011 10.5003H12.8989C13.0046 10.5003 13.1076 10.4668 13.193 10.4047L20.4121 5.1546Z" fill="currentColor" stroke="currentColor"/>
<path d="M2 5.96405C2 5.14678 2.92692 4.67479 3.58789 5.15545L10.805 10.4045C10.8905 10.4667 10.9934 10.5002 11.0991 10.5002H13C13.2761 10.5002 13.5 10.724 13.5 11.0002V13.0002C13.5 13.2763 13.2761 13.5002 13 13.5002H11.0991C10.9934 13.5002 10.8905 13.5337 10.805 13.5958L3.58789 18.8449C2.92693 19.3255 2 18.8536 2 18.0363V5.96405Z" fill="currentColor" stroke="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M20.4121 5.1546C21.0731 4.67433 22 5.14703 22 5.96417V18.0364C21.9998 18.8535 21.073 19.3254 20.4121 18.845L13.195 13.5959C13.1095 13.5338 13.0066 13.5003 12.9009 13.5003H11.0991C10.9934 13.5003 10.8905 13.5338 10.805 13.5959L3.58789 18.845C2.92701 19.3254 2.00021 18.8534 2 18.0364V5.96417C2 5.14703 2.92694 4.67432 3.58789 5.1546L10.807 10.4047C10.8924 10.4668 10.9954 10.5003 11.1011 10.5003H12.8989C13.0046 10.5003 13.1076 10.4668 13.193 10.4047L20.4121 5.1546Z" style="fill: var(--automation-symbol-off-line-color); stroke: var(--automation-symbol-off-line-color)"/>
<path d="M2 5.96405C2 5.14678 2.92692 4.67479 3.58789 5.15545L10.805 10.4045C10.8905 10.4667 10.9934 10.5002 11.0991 10.5002H13C13.2761 10.5002 13.5 10.724 13.5 11.0002V13.0002C13.5 13.2763 13.2761 13.5002 13 13.5002H11.0991C10.9934 13.5002 10.8905 13.5337 10.805 13.5958L3.58789 18.8449C2.92693 19.3255 2 18.8536 2 18.0363V5.96405Z" style="fill: var(--automation-symbol-on-background-color); stroke: var(--automation-symbol-on-border-color)"/>
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
    'obi-twoway-analog-10': ObiTwowayAnalog10;
  }
}
