import {LitElement, html, css, svg, unsafeCSS} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-20-wifi-wifi_statusbar_4')
export class Obi20WifiWifi_statusbar_4 extends LitElement {
  @property({type: Boolean, attribute: 'use-css-color'}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M12 3.5C7.31 3.5 3.07 5.4 0 8.48L12 20.5L24 8.48C20.93 5.4 16.69 3.5 12 3.5Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12 3.5C7.31 3.5 3.07 5.4 0 8.48L12 20.5L24 8.48C20.93 5.4 16.69 3.5 12 3.5Z" fill="currentColor"/>
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
    'obi-20-wifi-wifi_statusbar_4': Obi20WifiWifi_statusbar_4;
  }
}
