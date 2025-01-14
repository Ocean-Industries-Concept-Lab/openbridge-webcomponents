import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-light-deck-colour-on')
export class ObiLightDeckColourOn extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M11 1V4H13V1H11Z" fill="currentColor"/>
<path d="M11 20V23H13V20H11Z" fill="currentColor"/>
<path d="M19.1342 4.57178L20.6342 1.9737L22.3662 2.9737L20.8662 5.57178L19.1342 4.57178Z" fill="currentColor"/>
<path d="M22.3658 21.0263L20.8658 18.4282L19.1338 19.4282L20.6338 22.0263L22.3658 21.0263Z" fill="currentColor"/>
<path d="M3.13416 5.57178L1.63416 2.9737L3.36621 1.9737L4.86621 4.57178L3.13416 5.57178Z" fill="currentColor"/>
<path d="M3.36584 22.0263L4.86584 19.4282L3.13379 18.4282L1.63379 21.0263L3.36584 22.0263Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M20 7C21.1046 7 22 7.89543 22 9V15C22 16.1046 21.1046 17 20 17H4C2.89543 17 2 16.1046 2 15V9C2 7.89543 2.89543 7 4 7H20ZM4 9H20V11H4V9ZM20 15V13H4V15H20Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M4 9H20V11H4V9ZM20 15V13H4V15H20Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M11 1V4H13V1H11Z" style="fill: var(--automation-device-tertiary-color)"/>
<path d="M11 20V23H13V20H11Z" style="fill: var(--automation-device-tertiary-color)"/>
<path d="M19.1342 4.57178L20.6342 1.9737L22.3662 2.9737L20.8662 5.57178L19.1342 4.57178Z" style="fill: var(--automation-device-tertiary-color)"/>
<path d="M22.3658 21.0263L20.8658 18.4282L19.1338 19.4282L20.6338 22.0263L22.3658 21.0263Z" style="fill: var(--automation-device-tertiary-color)"/>
<path d="M3.13416 5.57178L1.63416 2.9737L3.36621 1.9737L4.86621 4.57178L3.13416 5.57178Z" style="fill: var(--automation-device-tertiary-color)"/>
<path d="M3.36584 22.0263L4.86584 19.4282L3.13379 18.4282L1.63379 21.0263L3.36584 22.0263Z" style="fill: var(--automation-device-tertiary-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M20 7C21.1046 7 22 7.89543 22 9V15C22 16.1046 21.1046 17 20 17H4C2.89543 17 2 16.1046 2 15V9C2 7.89543 2.89543 7 4 7H20ZM4 9H20V11H4V9ZM20 15V13H4V15H20Z" style="fill: var(--automation-device-tertiary-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M4 9H20V11H4V9ZM20 15V13H4V15H20Z" style="fill: var(--navigation-light-yellow-color)"/>
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
    'obi-light-deck-colour-on': ObiLightDeckColourOn;
  }
}