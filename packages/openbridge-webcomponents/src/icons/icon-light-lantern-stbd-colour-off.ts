import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-light-lantern-stbd-colour-off')
export class ObiLightLanternStbdColourOff extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M15 2C15.5523 2 16 2.44772 16 3V4H6V3C6 2.44772 6.44772 2 7 2H15Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M16 8C16 6.89543 15.1046 6 14 6H8C6.89543 6 6 6.89543 6 8V16C6 17.1046 6.89543 18 8 18H14C15.1046 18 16 17.1046 16 16V8ZM14 8H8V16H14V8Z" fill="currentColor"/>
<path d="M16 20H4V2H2V21C2 21.5523 2.44772 22 3 22H16V20Z" fill="currentColor"/>
<rect x="8" y="8" width="6" height="8" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M15 2C15.5523 2 16 2.44772 16 3V4H6V3C6 2.44772 6.44772 2 7 2H15Z" style="fill: var(--automation-device-tertiary-inverted-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M16 8C16 6.89543 15.1046 6 14 6H8C6.89543 6 6 6.89543 6 8V16C6 17.1046 6.89543 18 8 18H14C15.1046 18 16 17.1046 16 16V8ZM14 8H8V16H14V8Z" style="fill: var(--automation-device-tertiary-inverted-color)"/>
<path d="M16 20H4V2H2V21C2 21.5523 2.44772 22 3 22H16V20Z" style="fill: var(--automation-device-tertiary-inverted-color)"/>
<rect x="8" y="8" width="6" height="8" style="fill: var(--automation-device-primary-inverted-color)"/>
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
    'obi-light-lantern-stbd-colour-off': ObiLightLanternStbdColourOff;
  }
}
