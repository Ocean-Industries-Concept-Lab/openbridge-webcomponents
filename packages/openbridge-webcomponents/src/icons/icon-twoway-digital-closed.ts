import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-twoway-digital-closed')
export class ObiTwowayDigitalClosed extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M14 13.4645V10.5348L21 5.86816V18.1311L14 13.4645Z" fill="currentColor"/>
<path d="M3 18.1311L10 13.4645V10.5348L3 5.86816V18.1311Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M14 10.5355V13.4652L21 18.1318V5.86887L14 10.5355ZM13 14.0004V10.0004L20.4453 5.03682C21.1099 4.59378 22 5.07017 22 5.86887V18.1318C22 18.9305 21.1099 19.4069 20.4453 18.9639L13 14.0004ZM10 13.4652L3 18.1318L3 5.86887L10 10.5355V13.4652ZM11 10.0004L3.5547 5.03682C2.89015 4.59378 2 5.07017 2 5.86887V18.1318C2 18.9305 2.89015 19.4069 3.5547 18.9639L11 14.0004V10.0004Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M14 13.4645V10.5348L21 5.86816V18.1311L14 13.4645Z" style="fill: var(--automation-device-primary-inverted-color)"/>
<path d="M3 18.1311L10 13.4645V10.5348L3 5.86816V18.1311Z" style="fill: var(--automation-device-primary-inverted-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M14 10.5355V13.4652L21 18.1318V5.86887L14 10.5355ZM13 14.0004V10.0004L20.4453 5.03682C21.1099 4.59378 22 5.07017 22 5.86887V18.1318C22 18.9305 21.1099 19.4069 20.4453 18.9639L13 14.0004ZM10 13.4652L3 18.1318L3 5.86887L10 10.5355V13.4652ZM11 10.0004L3.5547 5.03682C2.89015 4.59378 2 5.07017 2 5.86887V18.1318C2 18.9305 2.89015 19.4069 3.5547 18.9639L11 14.0004V10.0004Z" style="fill: var(--automation-device-tertiary-inverted-color)"/>
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
    'obi-twoway-digital-closed': ObiTwowayDigitalClosed;
  }
}
