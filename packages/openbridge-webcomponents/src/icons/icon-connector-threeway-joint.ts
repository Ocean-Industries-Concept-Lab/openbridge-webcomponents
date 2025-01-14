import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-connector-threeway-joint')
export class ObiConnectorThreewayJoint extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M12 14C13.1046 14 14 13.1046 14 12C14 10.8954 13.1046 10 12 10C10.8954 10 10 10.8954 10 12C10 13.1046 10.8954 14 12 14Z" fill="currentColor"/>
<path d="M2 12.5H0V11.5H2V12.5Z" fill="currentColor"/>
<path d="M8 12.5H4V11.5H8V12.5Z" fill="currentColor"/>
<path d="M20 12.5H16V11.5H20V12.5Z" fill="currentColor"/>
<path d="M24 12.5H22V11.5H24V12.5Z" fill="currentColor"/>
<path d="M11.5 20V16H12.5V20H11.5Z" fill="currentColor"/>
<path d="M11.5 24V22H12.5V24H11.5Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12 14C13.1046 14 14 13.1046 14 12C14 10.8954 13.1046 10 12 10C10.8954 10 10 10.8954 10 12C10 13.1046 10.8954 14 12 14Z" style="fill: var(--automation-device-tertiary-color)"/>
<path d="M2 12.5H0V11.5H2V12.5Z" style="fill: var(--automation-device-tertiary-color)"/>
<path d="M8 12.5H4V11.5H8V12.5Z" style="fill: var(--automation-device-tertiary-color)"/>
<path d="M20 12.5H16V11.5H20V12.5Z" style="fill: var(--automation-device-tertiary-color)"/>
<path d="M24 12.5H22V11.5H24V12.5Z" style="fill: var(--automation-device-tertiary-color)"/>
<path d="M11.5 20V16H12.5V20H11.5Z" style="fill: var(--automation-device-tertiary-color)"/>
<path d="M11.5 24V22H12.5V24H11.5Z" style="fill: var(--automation-device-tertiary-color)"/>
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
    'obi-connector-threeway-joint': ObiConnectorThreewayJoint;
  }
}