import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-09-twoway-analog-closed')
export class Obi09TwowayAnalogClosed extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M3 16.8892L10 12.8059V10.4546L3 6.37127V16.8892ZM11 9.88024V13.3802L2.75194 18.1916C2.41861 18.386 2 18.1456 2 17.7597V5.50075C2 5.11486 2.41861 4.87442 2.75193 5.06886L11 9.88024ZM21 16.8892V6.37127L14 10.4546V12.8059L21 16.8892ZM13 13.3802L21.2481 18.1916C21.5814 18.386 22 18.1456 22 17.7597V5.50075C22 5.11486 21.5814 4.87442 21.2481 5.06886L13 9.88024V13.3802ZM12 22.6301C11.4477 22.6301 11 22.1824 11 21.6301V15.6301C11 15.0778 11.4477 14.6301 12 14.6301C12.5523 14.6301 13 15.0778 13 15.6301V21.6301C13 22.1824 12.5523 22.6301 12 22.6301Z" fill="currentColor"/>
<path d="M10 12.8059L3 16.8892V6.37127L10 10.4546V12.8059Z" fill="currentColor"/>
<path d="M21 6.37127V16.8892L14 12.8059V10.4546L21 6.37127Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M3 16.8892L10 12.8059V10.4546L3 6.37127V16.8892ZM11 9.88024V13.3802L2.75194 18.1916C2.41861 18.386 2 18.1456 2 17.7597V5.50075C2 5.11486 2.41861 4.87442 2.75193 5.06886L11 9.88024ZM21 16.8892V6.37127L14 10.4546V12.8059L21 16.8892ZM13 13.3802L21.2481 18.1916C21.5814 18.386 22 18.1456 22 17.7597V5.50075C22 5.11486 21.5814 4.87442 21.2481 5.06886L13 9.88024V13.3802ZM12 22.6301C11.4477 22.6301 11 22.1824 11 21.6301V15.6301C11 15.0778 11.4477 14.6301 12 14.6301C12.5523 14.6301 13 15.0778 13 15.6301V21.6301C13 22.1824 12.5523 22.6301 12 22.6301Z" style="fill: var(--automation-device-secondary-color)"/>
<path d="M10 12.8059L3 16.8892V6.37127L10 10.4546V12.8059Z" style="fill: var(--automation-device-tertiary-color)"/>
<path d="M21 6.37127V16.8892L14 12.8059V10.4546L21 6.37127Z" style="fill: var(--automation-device-tertiary-color)"/>
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
    'obi-09-twoway-analog-closed': Obi09TwowayAnalogClosed;
  }
}
