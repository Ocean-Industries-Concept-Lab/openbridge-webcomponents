import {LitElement, html, css, svg} from 'lit';
import {property} from 'lit/decorators.js';
import {customElement} from '../decorator.js';

@customElement('obi-alarm-emergency-iec')
export class ObiAlarmEmergencyIec extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
<use xlink:href="#stroke0_2002_1083" fill="currentColor"/>
<mask id="stroke1_2002_1083" fill="white">
<use xlink:href="#stroke0_2002_1083"/>
</mask>
<path d="M3.77778 22H20.2222C20.8445 22 21.1556 22 21.3933 21.8789C21.6024 21.7724 21.7724 21.6024 21.8789 21.3933C22 21.1556 22 20.8445 22 20.2222V3.77778C22 3.1555 22 2.84436 21.8789 2.60668C21.7724 2.39761 21.6024 2.22763 21.3933 2.1211C21.1556 2 20.8445 2 20.2222 2H3.77778C3.1555 2 2.84436 2 2.60668 2.1211C2.39761 2.22763 2.22763 2.39761 2.1211 2.60668C2 2.84436 2 3.1555 2 3.77778V20.2222C2 20.8445 2 21.1556 2.1211 21.3933C2.22763 21.6024 2.39761 21.7724 2.60668 21.8789C2.84436 22 3.1555 22 3.77778 22Z" stroke-width="2" stroke="currentColor" mask="url(#stroke1_2002_1083)"/>
<defs>
<path id="stroke0_2002_1083" d="M2 3.77778C2 3.1555 2 2.84436 2.1211 2.60668C2.22763 2.39761 2.39761 2.22763 2.60668 2.1211C2.84436 2 3.1555 2 3.77778 2H20.2222C20.8445 2 21.1556 2 21.3933 2.1211C21.6024 2.22763 21.7724 2.39761 21.8789 2.60668C22 2.84436 22 3.1555 22 3.77778V20.2222C22 20.8445 22 21.1556 21.8789 21.3933C21.7724 21.6024 21.6024 21.7724 21.3933 21.8789C21.1556 22 20.8445 22 20.2222 22H3.77778C3.1555 22 2.84436 22 2.60668 21.8789C2.39761 21.7724 2.22763 21.6024 2.1211 21.3933C2 21.1556 2 20.8445 2 20.2222V3.77778Z"/>
</defs>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
<use xlink:href="#stroke0_2002_1083" style="fill: var(--alert-alarm-color)"/>
<mask id="stroke1_2002_1083" fill="white">
<use xlink:href="#stroke0_2002_1083"/>
</mask>
<path d="M3.77778 22H20.2222C20.8445 22 21.1556 22 21.3933 21.8789C21.6024 21.7724 21.7724 21.6024 21.8789 21.3933C22 21.1556 22 20.8445 22 20.2222V3.77778C22 3.1555 22 2.84436 21.8789 2.60668C21.7724 2.39761 21.6024 2.22763 21.3933 2.1211C21.1556 2 20.8445 2 20.2222 2H3.77778C3.1555 2 2.84436 2 2.60668 2.1211C2.39761 2.22763 2.22763 2.39761 2.1211 2.60668C2 2.84436 2 3.1555 2 3.77778V20.2222C2 20.8445 2 21.1556 2.1211 21.3933C2.22763 21.6024 2.39761 21.7724 2.60668 21.8789C2.84436 22 3.1555 22 3.77778 22Z" stroke-width="2" style="stroke: var(--alert-alarm-outline-color)" mask="url(#stroke1_2002_1083)"/>
<defs>
<path id="stroke0_2002_1083" d="M2 3.77778C2 3.1555 2 2.84436 2.1211 2.60668C2.22763 2.39761 2.39761 2.22763 2.60668 2.1211C2.84436 2 3.1555 2 3.77778 2H20.2222C20.8445 2 21.1556 2 21.3933 2.1211C21.6024 2.22763 21.7724 2.39761 21.8789 2.60668C22 2.84436 22 3.1555 22 3.77778V20.2222C22 20.8445 22 21.1556 21.8789 21.3933C21.7724 21.6024 21.6024 21.7724 21.3933 21.8789C21.1556 22 20.8445 22 20.2222 22H3.77778C3.1555 22 2.84436 22 2.60668 21.8789C2.39761 21.7724 2.22763 21.6024 2.1211 21.3933C2 21.1556 2 20.8445 2 20.2222V3.77778Z"/>
</defs>
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
    'obi-alarm-emergency-iec': ObiAlarmEmergencyIec;
  }
}
