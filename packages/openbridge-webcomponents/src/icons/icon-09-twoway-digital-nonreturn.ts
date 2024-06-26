import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-09-twoway-digital-nonreturn')
export class Obi09TwowayDigitalNonreturn extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M2 5.52868V18.4713C2 18.8787 2.41861 19.1326 2.75194 18.9273L10.5714 14.1115H13.4286L21.2481 18.9273C21.5814 19.1326 22 18.8787 22 18.4713V5.52868C22 5.12126 21.5814 4.86742 21.2481 5.0727L13.4286 9.88846H10.5714L2.75193 5.0727C2.41861 4.86742 2 5.12126 2 5.52868Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M10.3011 13.0558H13.4287L13.4285 10.9442H10.3011L3 6.44775V17.5523L10.3011 13.0558Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M2 5.52868V18.4713C2 18.8787 2.41861 19.1326 2.75194 18.9273L10.5714 14.1115H13.4286L21.2481 18.9273C21.5814 19.1326 22 18.8787 22 18.4713V5.52868C22 5.12126 21.5814 4.86742 21.2481 5.0727L13.4286 9.88846H10.5714L2.75193 5.0727C2.41861 4.86742 2 5.12126 2 5.52868Z" style="fill: var(--automation-device-secondary-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M10.3011 13.0558H13.4287L13.4285 10.9442H10.3011L3 6.44775V17.5523L10.3011 13.0558Z" style="fill: var(--automation-device-primary-color)"/>
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
    'obi-09-twoway-digital-nonreturn': Obi09TwowayDigitalNonreturn;
  }
}
