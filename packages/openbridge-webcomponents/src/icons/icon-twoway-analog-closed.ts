import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-twoway-analog-closed')
export class ObiTwowayAnalogClosed extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M14 14.4645V11.5348L21 6.86816V19.1311L14 14.4645Z" fill="currentColor"/>
<path d="M3 19.1311L10 14.4645V11.5348L3 6.86816V19.1311Z" fill="currentColor"/>
<path d="M11 8C11 8.55228 11.4477 9 12 9C12.5523 9 13 8.55228 13 8V2C13 1.44772 12.5523 1 12 1C11.4477 1 11 1.44772 11 2V8Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M13 11V15L20.4453 19.9635C21.1099 20.4066 22 19.9302 22 19.1315V6.8685C22 6.06981 21.1099 5.59342 20.4453 6.03645L13 11ZM14 14.4648V11.5352L21 6.8685V19.1315L14 14.4648Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M3.5547 6.03645L11 11V15L3.5547 19.9635C2.89015 20.4066 2 19.9302 2 19.1315V6.8685C2 6.06981 2.89015 5.59342 3.5547 6.03645ZM3 19.1315L10 14.4648V11.5352L3 6.8685L3 19.1315Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M14 14.4645V11.5348L21 6.86816V19.1311L14 14.4645Z" style="fill: var(--automation-device-tertiary-color)"/>
<path d="M3 19.1311L10 14.4645V11.5348L3 6.86816V19.1311Z" style="fill: var(--automation-device-tertiary-color)"/>
<path d="M11 8C11 8.55228 11.4477 9 12 9C12.5523 9 13 8.55228 13 8V2C13 1.44772 12.5523 1 12 1C11.4477 1 11 1.44772 11 2V8Z" style="fill: var(--automation-device-secondary-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M13 11V15L20.4453 19.9635C21.1099 20.4066 22 19.9302 22 19.1315V6.8685C22 6.06981 21.1099 5.59342 20.4453 6.03645L13 11ZM14 14.4648V11.5352L21 6.8685V19.1315L14 14.4648Z" style="fill: var(--automation-device-secondary-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M3.5547 6.03645L11 11V15L3.5547 19.9635C2.89015 20.4066 2 19.9302 2 19.1315V6.8685C2 6.06981 2.89015 5.59342 3.5547 6.03645ZM3 19.1315L10 14.4648V11.5352L3 6.8685L3 19.1315Z" style="fill: var(--automation-device-secondary-color)"/>
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
    'obi-twoway-analog-closed': ObiTwowayAnalogClosed;
  }
}