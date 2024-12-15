import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-light-lantern-on-colour-off')
export class ObiLightLanternOnColourOff extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M8 2C7.44772 2 7 2.44772 7 3V4H17V3C17 2.44772 16.5523 2 16 2H8Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M7 8C7 6.89543 7.89543 6 9 6H15C16.1046 6 17 6.89543 17 8V16C17 17.1046 16.1046 18 15 18H9C7.89543 18 7 17.1046 7 16V8ZM9 8H15V16H9V8Z" fill="currentColor"/>
<path d="M7 20H17V21C17 21.5523 16.5523 22 16 22H8C7.44772 22 7 21.5523 7 21V20Z" fill="currentColor"/>
<rect x="9" y="8" width="6" height="8" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M8 2C7.44772 2 7 2.44772 7 3V4H17V3C17 2.44772 16.5523 2 16 2H8Z" style="fill: var(--automation-device-tertiary-inverted-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M7 8C7 6.89543 7.89543 6 9 6H15C16.1046 6 17 6.89543 17 8V16C17 17.1046 16.1046 18 15 18H9C7.89543 18 7 17.1046 7 16V8ZM9 8H15V16H9V8Z" style="fill: var(--automation-device-tertiary-inverted-color)"/>
<path d="M7 20H17V21C17 21.5523 16.5523 22 16 22H8C7.44772 22 7 21.5523 7 21V20Z" style="fill: var(--automation-device-tertiary-inverted-color)"/>
<rect x="9" y="8" width="6" height="8" style="fill: var(--automation-device-primary-inverted-color)"/>
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
    'obi-light-lantern-on-colour-off': ObiLightLanternOnColourOff;
  }
}
