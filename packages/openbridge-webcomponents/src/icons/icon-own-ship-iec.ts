import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-own-ship-iec')
export class ObiOwnShipIec extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C12 2 6 5.49999 6 13.2667V18.8C6 19.9201 6 20.4802 6.21799 20.908C6.40973 21.2843 6.71569 21.5903 7.09202 21.782C7.51984 22 8.0799 22 9.2 22H14.8C15.9201 22 16.4802 22 16.908 21.782C17.2843 21.5903 17.5903 21.2843 17.782 20.908C18 20.4802 18 19.9201 18 18.8V13.2667C18 5.49999 12 2 12 2ZM16 20V13.2667C16 9.93912 14.7254 7.55423 13.4479 5.98215C12.9365 5.35281 12.4257 4.85623 12 4.48903C11.5743 4.85623 11.0635 5.35281 10.5521 5.98215C9.27458 7.55423 8 9.93912 8 13.2667V20H16Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C12 2 6 5.49999 6 13.2667V18.8C6 19.9201 6 20.4802 6.21799 20.908C6.40973 21.2843 6.71569 21.5903 7.09202 21.782C7.51984 22 8.0799 22 9.2 22H14.8C15.9201 22 16.4802 22 16.908 21.782C17.2843 21.5903 17.5903 21.2843 17.782 20.908C18 20.4802 18 19.9201 18 18.8V13.2667C18 5.49999 12 2 12 2ZM16 20V13.2667C16 9.93912 14.7254 7.55423 13.4479 5.98215C12.9365 5.35281 12.4257 4.85623 12 4.48903C11.5743 4.85623 11.0635 5.35281 10.5521 5.98215C9.27458 7.55423 8 9.93912 8 13.2667V20H16Z" style="fill: var(--element-active-color)"/>
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
    'obi-own-ship-iec': ObiOwnShipIec;
  }
}
