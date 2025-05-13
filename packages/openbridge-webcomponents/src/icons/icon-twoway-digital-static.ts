import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-twoway-digital-static')
export class ObiTwowayDigitalStatic extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M3.5547 5.03682L11 10.0004H13L20.4453 5.03682C21.1099 4.59378 22 5.07017 22 5.86887V18.1318C22 18.9305 21.1099 19.4069 20.4453 18.9639L13 14.0004H11L3.5547 18.9639C2.89015 19.4069 2 18.9305 2 18.1318V5.86887C2 5.07017 2.89015 4.59378 3.5547 5.03682Z" fill="currentColor"/>
<path d="M10.6972 10.9996H13.3028L21 5.86816V18.1311L13.3028 12.9996H10.6972L3 18.1311V5.86816L10.6972 10.9996Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M3.5547 5.03682L11 10.0004H13L20.4453 5.03682C21.1099 4.59378 22 5.07017 22 5.86887V18.1318C22 18.9305 21.1099 19.4069 20.4453 18.9639L13 14.0004H11L3.5547 18.9639C2.89015 19.4069 2 18.9305 2 18.1318V5.86887C2 5.07017 2.89015 4.59378 3.5547 5.03682Z" style="fill: var(--automation-device-secondary-color)"/>
<path d="M10.6972 10.9996H13.3028L21 5.86816V18.1311L13.3028 12.9996H10.6972L3 18.1311V5.86816L10.6972 10.9996Z" style="fill: var(--automation-device-primary-color)"/>
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
    'obi-twoway-digital-static': ObiTwowayDigitalStatic;
  }
}
