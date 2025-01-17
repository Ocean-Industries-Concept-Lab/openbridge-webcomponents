import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-light-flashlight-colour-off')
export class ObiLightFlashlightColourOff extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M15 17L17 15V7H7V15L9 17V23H15V17ZM9 14.1716V13H15V14.1716L13 16.1716V21H11V16.1716L9 14.1716ZM9 11H15V9H9V11Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M9 14.1716V13H15V14.1716L13 16.1716V21H11V16.1716L9 14.1716ZM9 11H15V9H9V11Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M15 17L17 15V7H7V15L9 17V23H15V17ZM9 14.1716V13H15V14.1716L13 16.1716V21H11V16.1716L9 14.1716ZM9 11H15V9H9V11Z" style="fill: var(--automation-device-tertiary-inverted-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M9 14.1716V13H15V14.1716L13 16.1716V21H11V16.1716L9 14.1716ZM9 11H15V9H9V11Z" style="fill: var(--automation-device-primary-inverted-color)"/>
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
    'obi-light-flashlight-colour-off': ObiLightFlashlightColourOff;
  }
}
