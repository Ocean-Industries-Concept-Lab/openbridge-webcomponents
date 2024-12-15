import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-connector-overlap')
export class ObiConnectorOverlap extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M11.5 0V2H12.5V0H11.5Z" fill="currentColor"/>
<path d="M11.5 4V8H12.5V4H11.5Z" fill="currentColor"/>
<path d="M11.5 14H12.5V10H11.5V14Z" fill="currentColor"/>
<path d="M0 12.5H2V11.5H0V12.5Z" fill="currentColor"/>
<path d="M7 12.5H4V11.5H7V11H8V13H7V12.5Z" fill="currentColor"/>
<path d="M17 12.5H20V11.5H17V11H16V13H17V12.5Z" fill="currentColor"/>
<path d="M24 12.5H22V11.5H24V12.5Z" fill="currentColor"/>
<path d="M11.5 16V20H12.5V16H11.5Z" fill="currentColor"/>
<path d="M11.5 24V22H12.5V24H11.5Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M11.5 0V2H12.5V0H11.5Z" style="fill: var(--automation-device-tertiary-color)"/>
<path d="M11.5 4V8H12.5V4H11.5Z" style="fill: var(--automation-device-tertiary-color)"/>
<path d="M11.5 14H12.5V10H11.5V14Z" style="fill: var(--automation-device-tertiary-color)"/>
<path d="M0 12.5H2V11.5H0V12.5Z" style="fill: var(--automation-device-tertiary-color)"/>
<path d="M7 12.5H4V11.5H7V11H8V13H7V12.5Z" style="fill: var(--automation-device-tertiary-color)"/>
<path d="M17 12.5H20V11.5H17V11H16V13H17V12.5Z" style="fill: var(--automation-device-tertiary-color)"/>
<path d="M24 12.5H22V11.5H24V12.5Z" style="fill: var(--automation-device-tertiary-color)"/>
<path d="M11.5 16V20H12.5V16H11.5Z" style="fill: var(--automation-device-tertiary-color)"/>
<path d="M11.5 24V22H12.5V24H11.5Z" style="fill: var(--automation-device-tertiary-color)"/>
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
    'obi-connector-overlap': ObiConnectorOverlap;
  }
}
