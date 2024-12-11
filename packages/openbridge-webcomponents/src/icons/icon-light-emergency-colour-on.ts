import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-light-emergency-colour-on')
export class ObiLightEmergencyColourOn extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M13 1V4H11V1L13 1Z" fill="currentColor"/>
<path d="M19.0721 3.5145L16.9508 5.63582L18.365 7.05003L20.4863 4.92871L19.0721 3.5145Z" fill="currentColor"/>
<path d="M5.63582 7.05018L3.5145 4.92886L4.92871 3.51465L7.05003 5.63597L5.63582 7.05018Z" fill="currentColor"/>
<path d="M1 13H4V11H1V13Z" fill="currentColor"/>
<path d="M20 13H23V11H20V13Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M19 11C19 12.8638 17.7252 14.4299 16 14.874V17H19C19.5523 17 20 17.4477 20 18V20H4V18C4 17.4477 4.44772 17 5 17H8V14.874C6.27477 14.4299 5 12.8638 5 11C5 8.79086 6.79086 7 9 7C10.1947 7 11.2671 7.52376 12 8.35418C12.7329 7.52376 13.8053 7 15 7C17.2091 7 19 8.79086 19 11ZM11 11C11 12.1046 10.1046 13 9 13C7.89543 13 7 12.1046 7 11C7 9.89543 7.89543 9 9 9C10.1046 9 11 9.89543 11 11ZM10 14.874C10.7862 14.6716 11.4789 14.2362 12 13.6458C12.5211 14.2362 13.2138 14.6716 14 14.874V17H10V14.874ZM13 11C13 12.1046 13.8954 13 15 13C16.1046 13 17 12.1046 17 11C17 9.89543 16.1046 9 15 9C13.8954 9 13 9.89543 13 11Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M11 11C11 12.1046 10.1046 13 9 13C7.89543 13 7 12.1046 7 11C7 9.89543 7.89543 9 9 9C10.1046 9 11 9.89543 11 11ZM13 11C13 12.1046 13.8954 13 15 13C16.1046 13 17 12.1046 17 11C17 9.89543 16.1046 9 15 9C13.8954 9 13 9.89543 13 11Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M13 1V4H11V1L13 1Z" style="fill: var(--automation-device-tertiary-color)"/>
<path d="M19.0721 3.5145L16.9508 5.63582L18.365 7.05003L20.4863 4.92871L19.0721 3.5145Z" style="fill: var(--automation-device-tertiary-color)"/>
<path d="M5.63582 7.05018L3.5145 4.92886L4.92871 3.51465L7.05003 5.63597L5.63582 7.05018Z" style="fill: var(--automation-device-tertiary-color)"/>
<path d="M1 13H4V11H1V13Z" style="fill: var(--automation-device-tertiary-color)"/>
<path d="M20 13H23V11H20V13Z" style="fill: var(--automation-device-tertiary-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M19 11C19 12.8638 17.7252 14.4299 16 14.874V17H19C19.5523 17 20 17.4477 20 18V20H4V18C4 17.4477 4.44772 17 5 17H8V14.874C6.27477 14.4299 5 12.8638 5 11C5 8.79086 6.79086 7 9 7C10.1947 7 11.2671 7.52376 12 8.35418C12.7329 7.52376 13.8053 7 15 7C17.2091 7 19 8.79086 19 11ZM11 11C11 12.1046 10.1046 13 9 13C7.89543 13 7 12.1046 7 11C7 9.89543 7.89543 9 9 9C10.1046 9 11 9.89543 11 11ZM10 14.874C10.7862 14.6716 11.4789 14.2362 12 13.6458C12.5211 14.2362 13.2138 14.6716 14 14.874V17H10V14.874ZM13 11C13 12.1046 13.8954 13 15 13C16.1046 13 17 12.1046 17 11C17 9.89543 16.1046 9 15 9C13.8954 9 13 9.89543 13 11Z" style="fill: var(--automation-device-tertiary-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M11 11C11 12.1046 10.1046 13 9 13C7.89543 13 7 12.1046 7 11C7 9.89543 7.89543 9 9 9C10.1046 9 11 9.89543 11 11ZM13 11C13 12.1046 13.8954 13 15 13C16.1046 13 17 12.1046 17 11C17 9.89543 16.1046 9 15 9C13.8954 9 13 9.89543 13 11Z" style="fill: var(--navigation-light-yellow-color)"/>
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
    'obi-light-emergency-colour-on': ObiLightEmergencyColourOn;
  }
}