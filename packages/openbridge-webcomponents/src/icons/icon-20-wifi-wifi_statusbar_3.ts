import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-20-wifi-wifi_statusbar_3')
export class Obi20WifiWifi_statusbar_3 extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M0 8.48C3.07 5.4 7.31 3.5 12 3.5C16.69 3.5 20.93 5.4 24 8.48L12 20.5L0 8.48ZM12 5.5C8.67 5.5 5.51 6.58 2.92 8.57L4.29443 9.94746C6.4324 8.4106 9.10163 7.5 12 7.5C14.8984 7.5 17.5676 8.4106 19.7056 9.94746L21.08 8.57C18.49 6.58 15.33 5.5 12 5.5Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M0 8.48C3.07 5.4 7.31 3.5 12 3.5C16.69 3.5 20.93 5.4 24 8.48L12 20.5L0 8.48ZM12 5.5C8.67 5.5 5.51 6.58 2.92 8.57L4.29443 9.94746C6.4324 8.4106 9.10163 7.5 12 7.5C14.8984 7.5 17.5676 8.4106 19.7056 9.94746L21.08 8.57C18.49 6.58 15.33 5.5 12 5.5Z" fill="currentColor"/>
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
    'obi-20-wifi-wifi_statusbar_3': Obi20WifiWifi_statusbar_3;
  }
}
