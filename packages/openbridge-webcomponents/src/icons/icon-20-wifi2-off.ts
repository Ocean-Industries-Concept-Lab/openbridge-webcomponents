import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-20-wifi2-off')
export class Obi20Wifi2Off extends LitElement {
  @property({type: Boolean, attribute: 'use-css-color'}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M2 4.22006L3.41 2.81006L20.38 19.7801L18.97 21.1901L11.89 14.1101C10.11 14.1301 8.35 14.8201 7 16.1701L5 14.1701C6.27 12.9101 7.79 12.0601 9.41 11.6301L7.17 9.39006C5.65 10.0101 4.23 10.9401 3 12.1701L1 10.1701C2.22 8.96006 3.59 8.00006 5.05 7.27006L2 4.22006ZM23 10.1701L21 12.1701C18.49 9.66006 15.18 8.42006 11.88 8.44006L9.3 5.86006C14.13 5.02006 19.27 6.44006 23 10.1701ZM15.28 11.8401C16.64 12.3201 17.92 13.0901 19 14.1701L18.3 14.8601L15.28 11.8401ZM9 18.1701L12 21.1701L15 18.1701C13.35 16.5101 10.66 16.5101 9 18.1701Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M2 4.22006L3.41 2.81006L20.38 19.7801L18.97 21.1901L11.89 14.1101C10.11 14.1301 8.35 14.8201 7 16.1701L5 14.1701C6.27 12.9101 7.79 12.0601 9.41 11.6301L7.17 9.39006C5.65 10.0101 4.23 10.9401 3 12.1701L1 10.1701C2.22 8.96006 3.59 8.00006 5.05 7.27006L2 4.22006ZM23 10.1701L21 12.1701C18.49 9.66006 15.18 8.42006 11.88 8.44006L9.3 5.86006C14.13 5.02006 19.27 6.44006 23 10.1701ZM15.28 11.8401C16.64 12.3201 17.92 13.0901 19 14.1701L18.3 14.8601L15.28 11.8401ZM9 18.1701L12 21.1701L15 18.1701C13.35 16.5101 10.66 16.5101 9 18.1701Z" style="fill: var(--element-active-color)"/>
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
    'obi-20-wifi2-off': Obi20Wifi2Off;
  }
}
