import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-09-twoway-digital-static')
export class Obi09TwowayDigitalStatic extends LitElement {
  @property({type: Boolean, attribute: 'use-css-color'}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M10.2882 13.1115H13.7118L21 17.6001V6.39991L13.7118 10.8885H10.2882L3 6.39991V17.6001L10.2882 13.1115ZM2.75194 18.9273C2.41861 19.1326 2 18.8787 2 18.4713V5.52868C2 5.12126 2.41861 4.86742 2.75193 5.0727L10.5714 9.88846H13.4286L21.2481 5.0727C21.5814 4.86742 22 5.12126 22 5.52868V18.4713C22 18.8787 21.5814 19.1326 21.2481 18.9273L13.4286 14.1115H10.5714L2.75194 18.9273Z" fill="currentColor"/>
<path d="M21 6.39991V17.6001L13.7118 13.1115H10.2882L3 17.6001V6.39991L10.2882 10.8885H13.7118L21 6.39991Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M10.2882 13.1115H13.7118L21 17.6001V6.39991L13.7118 10.8885H10.2882L3 6.39991V17.6001L10.2882 13.1115ZM2.75194 18.9273C2.41861 19.1326 2 18.8787 2 18.4713V5.52868C2 5.12126 2.41861 4.86742 2.75193 5.0727L10.5714 9.88846H13.4286L21.2481 5.0727C21.5814 4.86742 22 5.12126 22 5.52868V18.4713C22 18.8787 21.5814 19.1326 21.2481 18.9273L13.4286 14.1115H10.5714L2.75194 18.9273Z" style="fill: var(--automation-device-secondary-color)"/>
<path d="M21 6.39991V17.6001L13.7118 13.1115H10.2882L3 17.6001V6.39991L10.2882 10.8885H13.7118L21 6.39991Z" style="fill: var(--automation-device-primary-color)"/>
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
    }
    .wrapper > * {
      height: 100%;
      width: 100%;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    'obi-09-twoway-digital-static': Obi09TwowayDigitalStatic;
  }
}
