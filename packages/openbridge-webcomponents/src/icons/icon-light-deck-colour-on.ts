import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-light-deck-colour-on')
export class ObiLightDeckColourOn extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M13 1V4H11V1H13Z" fill="currentColor"/>
<path d="M13 20V23H11V20H13Z" fill="currentColor"/>
<path d="M4.86584 4.57178L3.36584 1.9737L1.63379 2.9737L3.13379 5.57178L4.86584 4.57178Z" fill="currentColor"/>
<path d="M1.63416 21.0263L3.13416 18.4282L4.86621 19.4282L3.36621 22.0263L1.63416 21.0263Z" fill="currentColor"/>
<path d="M20.8658 5.57178L22.3658 2.9737L20.6338 1.9737L19.1338 4.57178L20.8658 5.57178Z" fill="currentColor"/>
<path d="M20.6342 22.0263L19.1342 19.4282L20.8662 18.4282L22.3662 21.0263L20.6342 22.0263Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M4 7C2.89543 7 2 7.89543 2 9V15C2 16.1046 2.89543 17 4 17H20C21.1046 17 22 16.1046 22 15V9C22 7.89543 21.1046 7 20 7H4ZM20 9H4V11H20V9ZM4 15V13H20V15H4Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M20 9H4V11H20V9ZM4 15V13H20V15H4Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M13 1V4H11V1H13Z" style="fill: var(--automation-device-tertiary-color)"/>
<path d="M13 20V23H11V20H13Z" style="fill: var(--automation-device-tertiary-color)"/>
<path d="M4.86584 4.57178L3.36584 1.9737L1.63379 2.9737L3.13379 5.57178L4.86584 4.57178Z" style="fill: var(--automation-device-tertiary-color)"/>
<path d="M1.63416 21.0263L3.13416 18.4282L4.86621 19.4282L3.36621 22.0263L1.63416 21.0263Z" style="fill: var(--automation-device-tertiary-color)"/>
<path d="M20.8658 5.57178L22.3658 2.9737L20.6338 1.9737L19.1338 4.57178L20.8658 5.57178Z" style="fill: var(--automation-device-tertiary-color)"/>
<path d="M20.6342 22.0263L19.1342 19.4282L20.8662 18.4282L22.3662 21.0263L20.6342 22.0263Z" style="fill: var(--automation-device-tertiary-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M4 7C2.89543 7 2 7.89543 2 9V15C2 16.1046 2.89543 17 4 17H20C21.1046 17 22 16.1046 22 15V9C22 7.89543 21.1046 7 20 7H4ZM20 9H4V11H20V9ZM4 15V13H20V15H4Z" style="fill: var(--automation-device-tertiary-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M20 9H4V11H20V9ZM4 15V13H20V15H4Z" style="fill: var(--navigation-light-yellow-color)"/>
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