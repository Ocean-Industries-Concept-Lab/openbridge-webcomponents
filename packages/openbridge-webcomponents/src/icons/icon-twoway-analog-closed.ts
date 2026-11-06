import {LitElement, html, css, svg} from 'lit';
import {property} from 'lit/decorators.js';
import {customElement} from '../decorator.js';

@customElement('obi-twoway-analog-closed')
export class ObiTwowayAnalogClosed extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M20.3999 7.20039C21.0591 6.70596 22.0004 7.17615 22.0004 8.00019V16.0002C22.0004 16.8242 21.0591 17.2944 20.3999 16.8L15.067 12.8002C14.5337 12.4002 14.5337 11.6002 15.067 11.2002L20.3999 7.20039Z" fill="currentColor" stroke="currentColor"/>
<path d="M2 5.96405C2 5.14678 2.92692 4.67479 3.58789 5.15545L11.8879 11.1914C12.437 11.5908 12.437 12.4096 11.8879 12.8089L3.58789 18.8449C2.92693 19.3255 2 18.8536 2 18.0363V5.96405Z" fill="currentColor" stroke="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M20.3999 7.20039C21.0591 6.70596 22.0004 7.17615 22.0004 8.00019V16.0002C22.0004 16.8242 21.0591 17.2944 20.3999 16.8L15.067 12.8002C14.5337 12.4002 14.5337 11.6002 15.067 11.2002L20.3999 7.20039Z" style="fill: var(--automation-symbol-off-background-color); stroke: var(--automation-symbol-off-border-color)"/>
<path d="M2 5.96405C2 5.14678 2.92692 4.67479 3.58789 5.15545L11.8879 11.1914C12.437 11.5908 12.437 12.4096 11.8879 12.8089L3.58789 18.8449C2.92693 19.3255 2 18.8536 2 18.0363V5.96405Z" style="fill: var(--automation-symbol-on-background-color); stroke: var(--automation-symbol-on-border-color)"/>
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
    'obi-twoway-analog-closed': ObiTwowayAnalogClosed;
  }
}
