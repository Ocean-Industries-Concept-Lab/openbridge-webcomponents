import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-light-lantern-stbd-colour-on')
export class ObiLightLanternStbdColourOn extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M5 13H3C2.44772 13 2 12.5523 2 12C2 11.4477 2.44772 11 3 11H5V13Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M5.5718 8.86603L3.83975 7.86603C3.36145 7.58988 3.19758 6.97829 3.47372 6.5C3.74986 6.02171 4.36145 5.85783 4.83975 6.13397L6.5718 7.13397L5.5718 8.86603Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M6.57269 16.866L4.84064 17.866C4.36234 18.1422 3.75075 17.9783 3.47461 17.5C3.19847 17.0217 3.36234 16.4101 3.84064 16.134L5.57269 15.134L6.57269 16.866Z" fill="currentColor"/>
<path d="M9 2C8.44772 2 8 2.44772 8 3V4H18V3C18 2.44772 17.5523 2 17 2H9Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M8 8C8 6.89543 8.89543 6 10 6H16C17.1046 6 18 6.89543 18 8V16C18 17.1046 17.1046 18 16 18H10C8.89543 18 8 17.1046 8 16V8ZM10 8H16V16H10V8Z" fill="currentColor"/>
<path d="M8 20H20V2H22V21C22 21.5523 21.5523 22 21 22H8V20Z" fill="currentColor"/>
<rect width="6" height="8" transform="matrix(-1 0 0 1 16 8)" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M5 13H3C2.44772 13 2 12.5523 2 12C2 11.4477 2.44772 11 3 11H5V13Z" style="fill: var(--automation-device-tertiary-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M5.5718 8.86603L3.83975 7.86603C3.36145 7.58988 3.19758 6.97829 3.47372 6.5C3.74986 6.02171 4.36145 5.85783 4.83975 6.13397L6.5718 7.13397L5.5718 8.86603Z" style="fill: var(--automation-device-tertiary-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M6.57269 16.866L4.84064 17.866C4.36234 18.1422 3.75075 17.9783 3.47461 17.5C3.19847 17.0217 3.36234 16.4101 3.84064 16.134L5.57269 15.134L6.57269 16.866Z" style="fill: var(--automation-device-tertiary-color)"/>
<path d="M9 2C8.44772 2 8 2.44772 8 3V4H18V3C18 2.44772 17.5523 2 17 2H9Z" style="fill: var(--automation-device-tertiary-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M8 8C8 6.89543 8.89543 6 10 6H16C17.1046 6 18 6.89543 18 8V16C18 17.1046 17.1046 18 16 18H10C8.89543 18 8 17.1046 8 16V8ZM10 8H16V16H10V8Z" style="fill: var(--automation-device-tertiary-color)"/>
<path d="M8 20H20V2H22V21C22 21.5523 21.5523 22 21 22H8V20Z" style="fill: var(--automation-device-tertiary-color)"/>
<rect width="6" height="8" transform="matrix(-1 0 0 1 16 8)" style="fill: var(--navigation-light-green-color)"/>
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
    'obi-light-lantern-stbd-colour-on': ObiLightLanternStbdColourOn;
  }
}