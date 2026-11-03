import {LitElement, html, css, svg} from 'lit';
import {property} from 'lit/decorators.js';
import {customElement} from '../decorator.js';

@customElement('obi-electricity-battery-off')
export class ObiElectricityBatteryOff extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<rect x="1" y="1" width="22" height="22" rx="2" fill="currentColor"/>
<path d="M20 13.5C20.2761 13.5 20.5 13.7239 20.5 14C20.5 14.2761 20.2761 14.5 20 14.5H4C3.72386 14.5 3.5 14.2761 3.5 14C3.5 13.7239 3.72386 13.5 4 13.5H20Z" fill="currentColor"/>
<path d="M17 11H7V9H17V11Z" fill="currentColor"/>
<path d="M21 1C22.1046 1 23 1.89543 23 3V21C23 22.0357 22.2128 22.887 21.2041 22.9893L21 23H3L2.7959 22.9893C1.85435 22.8938 1.1062 22.1457 1.01074 21.2041L1 21V3C1 1.89543 1.89543 1 3 1H21ZM3 2C2.44771 2 2 2.44772 2 3V21C2 21.5523 2.44772 22 3 22H11.5V18H7V16H17V18H12.5V22H21C21.5523 22 22 21.5523 22 21V3C22 2.44771 21.5523 2 21 2H12.5V6.5H20C20.2761 6.5 20.5 6.72386 20.5 7C20.5 7.27614 20.2761 7.5 20 7.5H4C3.72386 7.5 3.5 7.27614 3.5 7C3.5 6.72386 3.72386 6.5 4 6.5H11.5V2H3Z" fill-rule="evenodd" clip-rule="evenodd" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect x="1" y="1" width="22" height="22" rx="2" style="fill: var(--automation-symbol-off-background-color)"/>
<path d="M20 13.5C20.2761 13.5 20.5 13.7239 20.5 14C20.5 14.2761 20.2761 14.5 20 14.5H4C3.72386 14.5 3.5 14.2761 3.5 14C3.5 13.7239 3.72386 13.5 4 13.5H20Z" style="fill: var(--automation-symbol-off-border-color)"/>
<path d="M17 11H7V9H17V11Z" style="fill: var(--automation-symbol-off-border-color)"/>
<path d="M21 1C22.1046 1 23 1.89543 23 3V21C23 22.0357 22.2128 22.887 21.2041 22.9893L21 23H3L2.7959 22.9893C1.85435 22.8938 1.1062 22.1457 1.01074 21.2041L1 21V3C1 1.89543 1.89543 1 3 1H21ZM3 2C2.44771 2 2 2.44772 2 3V21C2 21.5523 2.44772 22 3 22H11.5V18H7V16H17V18H12.5V22H21C21.5523 22 22 21.5523 22 21V3C22 2.44771 21.5523 2 21 2H12.5V6.5H20C20.2761 6.5 20.5 6.72386 20.5 7C20.5 7.27614 20.2761 7.5 20 7.5H4C3.72386 7.5 3.5 7.27614 3.5 7C3.5 6.72386 3.72386 6.5 4 6.5H11.5V2H3Z" fill-rule="evenodd" clip-rule="evenodd" style="fill: var(--automation-symbol-off-border-color)"/>
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
    'obi-electricity-battery-off': ObiElectricityBatteryOff;
  }
}
