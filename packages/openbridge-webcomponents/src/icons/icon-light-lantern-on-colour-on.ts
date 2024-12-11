import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-light-lantern-on-colour-on')
export class ObiLightLanternOnColourOn extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M8 2C7.44772 2 7 2.44772 7 3V4H17V3C17 2.44772 16.5523 2 16 2H8Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M7 8C7 6.89543 7.89543 6 9 6H15C16.1046 6 17 6.89543 17 8V16C17 17.1046 16.1046 18 15 18H9C7.89543 18 7 17.1046 7 16V8ZM9 8H15V16H9V8Z" fill="currentColor"/>
<path d="M7 20H17V21C17 21.5523 16.5523 22 16 22H8C7.44772 22 7 21.5523 7 21V20Z" fill="currentColor"/>
<path d="M23 12C23 12.5523 22.5523 13 22 13H20V11H22C22.5523 11 23 11.4477 23 12Z" fill="currentColor"/>
<path d="M1 12C1 12.5523 1.44772 13 2 13H4V11H2C1.44772 11 1 11.4477 1 12Z" fill="currentColor"/>
<path d="M21.5258 17.4998C21.2497 17.9781 20.6381 18.142 20.1598 17.8658L18.4277 16.8658L19.4277 15.1338L21.1598 16.1338C21.6381 16.4099 21.802 17.0215 21.5258 17.4998Z" fill="currentColor"/>
<path d="M2.47363 6.49981C2.19749 6.97811 2.36137 7.5897 2.83966 7.86584L4.57171 8.86584L5.57171 7.13379L3.83966 6.13379C3.36137 5.85765 2.74978 6.02152 2.47363 6.49981Z" fill="currentColor"/>
<path d="M21.5268 6.49981C21.8029 6.97811 21.6391 7.5897 21.1608 7.86584L19.4287 8.86584L18.4287 7.13379L20.1608 6.13379C20.6391 5.85765 21.2506 6.02152 21.5268 6.49981Z" fill="currentColor"/>
<path d="M2.47461 17.4998C2.75075 17.9781 3.36234 18.142 3.84063 17.8658L5.57269 16.8658L4.57269 15.1338L2.84063 16.1338C2.36234 16.4099 2.19847 17.0215 2.47461 17.4998Z" fill="currentColor"/>
<rect x="9" y="8" width="6" height="8" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M8 2C7.44772 2 7 2.44772 7 3V4H17V3C17 2.44772 16.5523 2 16 2H8Z" style="fill: var(--automation-device-tertiary-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M7 8C7 6.89543 7.89543 6 9 6H15C16.1046 6 17 6.89543 17 8V16C17 17.1046 16.1046 18 15 18H9C7.89543 18 7 17.1046 7 16V8ZM9 8H15V16H9V8Z" style="fill: var(--automation-device-tertiary-color)"/>
<path d="M7 20H17V21C17 21.5523 16.5523 22 16 22H8C7.44772 22 7 21.5523 7 21V20Z" style="fill: var(--automation-device-tertiary-color)"/>
<path d="M23 12C23 12.5523 22.5523 13 22 13H20V11H22C22.5523 11 23 11.4477 23 12Z" style="fill: var(--automation-device-tertiary-color)"/>
<path d="M1 12C1 12.5523 1.44772 13 2 13H4V11H2C1.44772 11 1 11.4477 1 12Z" style="fill: var(--automation-device-tertiary-color)"/>
<path d="M21.5258 17.4998C21.2497 17.9781 20.6381 18.142 20.1598 17.8658L18.4277 16.8658L19.4277 15.1338L21.1598 16.1338C21.6381 16.4099 21.802 17.0215 21.5258 17.4998Z" style="fill: var(--automation-device-tertiary-color)"/>
<path d="M2.47363 6.49981C2.19749 6.97811 2.36137 7.5897 2.83966 7.86584L4.57171 8.86584L5.57171 7.13379L3.83966 6.13379C3.36137 5.85765 2.74978 6.02152 2.47363 6.49981Z" style="fill: var(--automation-device-tertiary-color)"/>
<path d="M21.5268 6.49981C21.8029 6.97811 21.6391 7.5897 21.1608 7.86584L19.4287 8.86584L18.4287 7.13379L20.1608 6.13379C20.6391 5.85765 21.2506 6.02152 21.5268 6.49981Z" style="fill: var(--automation-device-tertiary-color)"/>
<path d="M2.47461 17.4998C2.75075 17.9781 3.36234 18.142 3.84063 17.8658L5.57269 16.8658L4.57269 15.1338L2.84063 16.1338C2.36234 16.4099 2.19847 17.0215 2.47461 17.4998Z" style="fill: var(--automation-device-tertiary-color)"/>
<rect x="9" y="8" width="6" height="8" style="fill: var(--navigation-light-yellow-color)"/>
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
    'obi-light-lantern-on-colour-on': ObiLightLanternOnColourOn;
  }
}