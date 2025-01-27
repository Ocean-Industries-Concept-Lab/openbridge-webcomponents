import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-capacitor-03')
export class ObiCapacitor03 extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M23.3137 0.686523L21.8995 7.75759L16.2427 2.10074L23.3137 0.686523Z" fill="currentColor"/>
<path d="M15.9999 6.58637L18.364 4.22228L19.7782 5.6365L15.9999 9.4148V18.5C15.9999 19.3284 15.3283 20 14.4999 20C13.6715 20 12.9999 19.3284 12.9999 18.5V12.4148L10.9999 14.4148V18.5C10.9999 19.3284 10.3283 20 9.49988 20C8.67145 20 7.99988 19.3284 7.99988 18.5V17.4148L4.22183 21.1928L2.80762 19.7786L7.99988 14.5864V5.5C7.99988 4.67157 8.67145 4 9.49988 4C10.3283 4 10.9999 4.67157 10.9999 5.5V11.5864L12.9999 9.58637V5.5C12.9999 4.67157 13.6715 4 14.4999 4C15.3283 4 15.9999 4.67157 15.9999 5.5V6.58637Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M23.3137 0.686523L21.8995 7.75759L16.2427 2.10074L23.3137 0.686523Z" style="fill: var(--automation-device-secondary-color)"/>
<path d="M15.9999 6.58637L18.364 4.22228L19.7782 5.6365L15.9999 9.4148V18.5C15.9999 19.3284 15.3283 20 14.4999 20C13.6715 20 12.9999 19.3284 12.9999 18.5V12.4148L10.9999 14.4148V18.5C10.9999 19.3284 10.3283 20 9.49988 20C8.67145 20 7.99988 19.3284 7.99988 18.5V17.4148L4.22183 21.1928L2.80762 19.7786L7.99988 14.5864V5.5C7.99988 4.67157 8.67145 4 9.49988 4C10.3283 4 10.9999 4.67157 10.9999 5.5V11.5864L12.9999 9.58637V5.5C12.9999 4.67157 13.6715 4 14.4999 4C15.3283 4 15.9999 4.67157 15.9999 5.5V6.58637Z" style="fill: var(--automation-device-secondary-color)"/>
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
    'obi-capacitor-03': ObiCapacitor03;
  }
}
