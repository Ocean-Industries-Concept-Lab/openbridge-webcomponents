import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-switch-01-off')
export class ObiSwitch01Off extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M16.8564 4.00017C17.1325 4.47846 16.9686 5.09005 16.4904 5.36619L5 12.0001C4.99995 13.1047 4.10454 14.0001 3 14.0001C1.89543 14.0001 1 13.1046 1 12.0001C1 10.8955 1.89543 10.0001 3 10.0001C3.36446 10.0001 3.70614 10.0975 4.00041 10.2679L15.4904 3.63414C15.9686 3.358 16.5802 3.52187 16.8564 4.00017Z" fill="currentColor"/>
<path d="M21 10C19.8954 10 19 10.8954 19 12C19 13.1046 19.8954 14 21 14C22.1046 14 23 13.1046 23 12C23 10.8954 22.1046 10 21 10Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M16.9904 6.23238C17.9469 5.6801 18.2747 4.45692 17.7224 3.50033C17.1701 2.54375 15.9469 2.216 14.9904 2.76828L3.93721 9.14982C3.64176 9.0527 3.32646 9.00023 3 9.00023C1.34315 9.00023 0 10.3434 0 12.0002C0 13.6571 1.34315 15.0002 3 15.0002C4.44653 15.0002 5.65394 13.9764 5.93717 12.6139L16.9904 6.23238ZM15.4904 3.63431L4.00041 10.268C3.70614 10.0977 3.36446 10.0002 3 10.0002C1.89543 10.0002 1 10.8957 1 12.0002C1 13.1048 1.89543 14.0002 3 14.0002C4.10454 14.0002 4.99995 13.1048 5 12.0003L16.4904 5.36636C16.9686 5.09022 17.1325 4.47863 16.8564 4.00033C16.5802 3.52204 15.9686 3.35817 15.4904 3.63431Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M18 12C18 13.6569 19.3431 15 21 15C22.6569 15 24 13.6569 24 12C24 10.3431 22.6569 9 21 9C19.3431 9 18 10.3431 18 12ZM19 12C19 10.8954 19.8954 10 21 10C22.1046 10 23 10.8954 23 12C23 13.1046 22.1046 14 21 14C19.8954 14 19 13.1046 19 12Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M16.8564 4.00017C17.1325 4.47846 16.9686 5.09005 16.4904 5.36619L5 12.0001C4.99995 13.1047 4.10454 14.0001 3 14.0001C1.89543 14.0001 1 13.1046 1 12.0001C1 10.8955 1.89543 10.0001 3 10.0001C3.36446 10.0001 3.70614 10.0975 4.00041 10.2679L15.4904 3.63414C15.9686 3.358 16.5802 3.52187 16.8564 4.00017Z" style="fill: var(--automation-device-primary-inverted-color)"/>
<path d="M21 10C19.8954 10 19 10.8954 19 12C19 13.1046 19.8954 14 21 14C22.1046 14 23 13.1046 23 12C23 10.8954 22.1046 10 21 10Z" style="fill: var(--automation-device-primary-inverted-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M16.9904 6.23238C17.9469 5.6801 18.2747 4.45692 17.7224 3.50033C17.1701 2.54375 15.9469 2.216 14.9904 2.76828L3.93721 9.14982C3.64176 9.0527 3.32646 9.00023 3 9.00023C1.34315 9.00023 0 10.3434 0 12.0002C0 13.6571 1.34315 15.0002 3 15.0002C4.44653 15.0002 5.65394 13.9764 5.93717 12.6139L16.9904 6.23238ZM15.4904 3.63431L4.00041 10.268C3.70614 10.0977 3.36446 10.0002 3 10.0002C1.89543 10.0002 1 10.8957 1 12.0002C1 13.1048 1.89543 14.0002 3 14.0002C4.10454 14.0002 4.99995 13.1048 5 12.0003L16.4904 5.36636C16.9686 5.09022 17.1325 4.47863 16.8564 4.00033C16.5802 3.52204 15.9686 3.35817 15.4904 3.63431Z" style="fill: var(--automation-device-tertiary-inverted-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M18 12C18 13.6569 19.3431 15 21 15C22.6569 15 24 13.6569 24 12C24 10.3431 22.6569 9 21 9C19.3431 9 18 10.3431 18 12ZM19 12C19 10.8954 19.8954 10 21 10C22.1046 10 23 10.8954 23 12C23 13.1046 22.1046 14 21 14C19.8954 14 19 13.1046 19 12Z" style="fill: var(--automation-device-tertiary-inverted-color)"/>
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
    'obi-switch-01-off': ObiSwitch01Off;
  }
}
