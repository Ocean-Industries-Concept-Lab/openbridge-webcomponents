import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-light-flashlight-colour-on')
export class ObiLightFlashlightColourOn extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M12 1C11.4477 1 11 1.44772 11 2V4H13V2C13 1.44772 12.5523 1 12 1Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M15 17L17 15V7H7V15L9 17V23H15V17ZM9 14.1716V13H15V14.1716L13 16.1716V21H11V16.1716L9 14.1716ZM9 11H15V9H9V11Z" fill="currentColor"/>
<path d="M18.4998 2.4737C18.9781 2.74984 19.142 3.36143 18.8658 3.83973L17.8658 5.57178L16.1338 4.57178L17.1338 2.83973C17.4099 2.36143 18.0215 2.19756 18.4998 2.4737Z" fill="currentColor"/>
<path d="M7.86584 4.57178L6.86584 2.83973C6.5897 2.36143 5.97811 2.19756 5.49981 2.4737C5.02152 2.74984 4.85765 3.36143 5.13379 3.83973L6.13379 5.57178L7.86584 4.57178Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M9 14.1716V13H15V14.1716L13 16.1716V21H11V16.1716L9 14.1716ZM9 11H15V9H9V11Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12 1C11.4477 1 11 1.44772 11 2V4H13V2C13 1.44772 12.5523 1 12 1Z" style="fill: var(--automation-device-tertiary-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M15 17L17 15V7H7V15L9 17V23H15V17ZM9 14.1716V13H15V14.1716L13 16.1716V21H11V16.1716L9 14.1716ZM9 11H15V9H9V11Z" style="fill: var(--automation-device-tertiary-color)"/>
<path d="M18.4998 2.4737C18.9781 2.74984 19.142 3.36143 18.8658 3.83973L17.8658 5.57178L16.1338 4.57178L17.1338 2.83973C17.4099 2.36143 18.0215 2.19756 18.4998 2.4737Z" style="fill: var(--automation-device-tertiary-color)"/>
<path d="M7.86584 4.57178L6.86584 2.83973C6.5897 2.36143 5.97811 2.19756 5.49981 2.4737C5.02152 2.74984 4.85765 3.36143 5.13379 3.83973L6.13379 5.57178L7.86584 4.57178Z" style="fill: var(--automation-device-tertiary-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M9 14.1716V13H15V14.1716L13 16.1716V21H11V16.1716L9 14.1716ZM9 11H15V9H9V11Z" style="fill: var(--navigation-light-yellow-color)"/>
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
    'obi-light-flashlight-colour-on': ObiLightFlashlightColourOn;
  }
}
