import {LitElement, html, css, svg} from 'lit';
import {property} from 'lit/decorators.js';
import {customElement} from '../decorator.js';

@customElement('obi-own-ship-no-command-j')
export class ObiOwnShipNoCommandJ extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M12 4C16.4183 4 20 7.58172 20 12C20 16.4183 16.4183 20 12 20C7.58172 20 4 16.4183 4 12C4 7.58172 7.58172 4 12 4ZM11.9453 13.1562C11.9453 13.5641 11.8968 13.8805 11.8008 14.1045C11.7049 14.3201 11.573 14.4679 11.4053 14.5479C11.2373 14.6278 11.045 14.6679 10.8291 14.668C10.6053 14.668 10.3932 14.6483 10.1934 14.6084C9.99337 14.5604 9.80489 14.5081 9.62891 14.4521V15.916C9.79689 15.98 9.99282 16.0323 10.2168 16.0723C10.4487 16.1122 10.7167 16.1318 11.0205 16.1318C11.5485 16.1318 12.0131 16.032 12.4131 15.832C12.813 15.632 13.1209 15.312 13.3369 14.8721C13.5609 14.4321 13.6729 13.8518 13.6729 13.1318V7.43164H11.9453V13.1562Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M12 4C16.4183 4 20 7.58172 20 12C20 16.4183 16.4183 20 12 20C7.58172 20 4 16.4183 4 12C4 7.58172 7.58172 4 12 4ZM11.9453 13.1562C11.9453 13.5641 11.8968 13.8805 11.8008 14.1045C11.7049 14.3201 11.573 14.4679 11.4053 14.5479C11.2373 14.6278 11.045 14.6679 10.8291 14.668C10.6053 14.668 10.3932 14.6483 10.1934 14.6084C9.99337 14.5604 9.80489 14.5081 9.62891 14.4521V15.916C9.79689 15.98 9.99282 16.0323 10.2168 16.0723C10.4487 16.1122 10.7167 16.1318 11.0205 16.1318C11.5485 16.1318 12.0131 16.032 12.4131 15.832C12.813 15.632 13.1209 15.312 13.3369 14.8721C13.5609 14.4321 13.6729 13.8518 13.6729 13.1318V7.43164H11.9453V13.1562Z" style="fill: var(--element-active-color)"/>
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
    'obi-own-ship-no-command-j': ObiOwnShipNoCommandJ;
  }
}
