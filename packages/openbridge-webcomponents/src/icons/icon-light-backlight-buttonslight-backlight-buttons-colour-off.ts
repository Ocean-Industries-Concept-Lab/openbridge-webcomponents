import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-light-backlight-buttonslight-backlight-buttons-colour-off')
export class ObiLightBacklightButtonslightBacklightButtonsColourOff extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<rect x="8" y="16" width="8" height="1" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M7 15V18H17V15H7ZM16 16H8V17H16V16Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect x="8" y="16" width="8" height="1" style="fill: var(--automation-device-primary-inverted-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M7 15V18H17V15H7ZM16 16H8V17H16V16Z" style="fill: var(--undefined)"/>
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
    'obi-light-backlight-buttonslight-backlight-buttons-colour-off': ObiLightBacklightButtonslightBacklightButtonsColourOff;
  }
}
