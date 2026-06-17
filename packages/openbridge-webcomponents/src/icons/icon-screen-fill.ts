import {LitElement, html, css, svg} from 'lit';
import {property} from 'lit/decorators.js';
import {customElement} from '../decorator.js';

@customElement('obi-screen-fill')
export class ObiScreenFill extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M5.5 7.58749V10.0875H7.5V7.58749H10.5V5.58749H7.5C6.95 5.58749 6.47917 5.78333 6.0875 6.17499C5.69583 6.56666 5.5 7.03749 5.5 7.58749Z" fill="currentColor"/>
<path d="M5.5 16.5875V14.0875H7.5V16.5875H10.5V18.5875H7.5C6.95 18.5875 6.47917 18.3917 6.0875 18C5.69583 17.6083 5.5 17.1375 5.5 16.5875Z" fill="currentColor"/>
<path d="M18.5 7.5875V10.0875H16.5V7.5875H13.5V5.5875H16.5C17.05 5.5875 17.5208 5.78333 17.9125 6.175C18.3042 6.56667 18.5 7.0375 18.5 7.5875Z" fill="currentColor"/>
<path d="M18.5 16.5V14H16.5V16.5H13.5V18.5H16.5C17.05 18.5 17.5208 18.3042 17.9125 17.9125C18.3042 17.5208 18.5 17.05 18.5 16.5Z" fill="currentColor"/>
<path d="M4 20H20V4H4V20ZM22 20.5C22 21.2767 21.4097 21.9154 20.6533 21.9922L20.5 22H3.5L3.34668 21.9922C2.64069 21.9205 2.07949 21.3593 2.00781 20.6533L2 20.5V3.5C2 2.67157 2.67157 2 3.5 2H20.5C21.3284 2 22 2.67157 22 3.5V20.5Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M5.5 7.58749V10.0875H7.5V7.58749H10.5V5.58749H7.5C6.95 5.58749 6.47917 5.78333 6.0875 6.17499C5.69583 6.56666 5.5 7.03749 5.5 7.58749Z" style="fill: var(--element-active-color)"/>
<path d="M5.5 16.5875V14.0875H7.5V16.5875H10.5V18.5875H7.5C6.95 18.5875 6.47917 18.3917 6.0875 18C5.69583 17.6083 5.5 17.1375 5.5 16.5875Z" style="fill: var(--element-active-color)"/>
<path d="M18.5 7.5875V10.0875H16.5V7.5875H13.5V5.5875H16.5C17.05 5.5875 17.5208 5.78333 17.9125 6.175C18.3042 6.56667 18.5 7.0375 18.5 7.5875Z" style="fill: var(--element-active-color)"/>
<path d="M18.5 16.5V14H16.5V16.5H13.5V18.5H16.5C17.05 18.5 17.5208 18.3042 17.9125 17.9125C18.3042 17.5208 18.5 17.05 18.5 16.5Z" style="fill: var(--element-active-color)"/>
<path d="M4 20H20V4H4V20ZM22 20.5C22 21.2767 21.4097 21.9154 20.6533 21.9922L20.5 22H3.5L3.34668 21.9922C2.64069 21.9205 2.07949 21.3593 2.00781 20.6533L2 20.5V3.5C2 2.67157 2.67157 2 3.5 2H20.5C21.3284 2 22 2.67157 22 3.5V20.5Z" style="fill: var(--element-active-color)"/>
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
    'obi-screen-fill': ObiScreenFill;
  }
}
