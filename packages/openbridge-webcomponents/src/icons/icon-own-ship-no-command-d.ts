import {LitElement, html, css, svg} from 'lit';
import {property} from 'lit/decorators.js';
import {customElement} from '../decorator.js';

@customElement('obi-own-ship-no-command-d')
export class ObiOwnShipNoCommandD extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M11.748 8.86035C12.292 8.86036 12.7519 8.96016 13.1279 9.16016C13.5119 9.36016 13.8002 9.66799 13.9922 10.084C14.1841 10.4999 14.2802 11.0319 14.2803 11.6797C14.2803 12.6397 14.0517 13.3598 13.5957 13.8398C13.1477 14.3198 12.4676 14.5596 11.5557 14.5596H10.7275V8.86035H11.748Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M12 4C16.4183 4 20 7.58172 20 12C20 16.4183 16.4183 20 12 20C7.58172 20 4 16.4183 4 12C4 7.58172 7.58172 4 12 4ZM9 16H11.4121C12.396 16 13.2357 15.8357 13.9316 15.5078C14.6276 15.1798 15.1603 14.6919 15.5283 14.0439C15.8963 13.396 16.0801 12.5917 16.0801 11.6318C16.0801 10.712 15.8962 9.94405 15.5283 9.32812C15.1683 8.70413 14.6599 8.23211 14.0039 7.91211C13.3479 7.59212 12.5718 7.43164 11.6758 7.43164H9V16Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M11.748 8.86035C12.292 8.86036 12.7519 8.96016 13.1279 9.16016C13.5119 9.36016 13.8002 9.66799 13.9922 10.084C14.1841 10.4999 14.2802 11.0319 14.2803 11.6797C14.2803 12.6397 14.0517 13.3598 13.5957 13.8398C13.1477 14.3198 12.4676 14.5596 11.5557 14.5596H10.7275V8.86035H11.748Z" style="fill: var(--element-active-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M12 4C16.4183 4 20 7.58172 20 12C20 16.4183 16.4183 20 12 20C7.58172 20 4 16.4183 4 12C4 7.58172 7.58172 4 12 4ZM9 16H11.4121C12.396 16 13.2357 15.8357 13.9316 15.5078C14.6276 15.1798 15.1603 14.6919 15.5283 14.0439C15.8963 13.396 16.0801 12.5917 16.0801 11.6318C16.0801 10.712 15.8962 9.94405 15.5283 9.32812C15.1683 8.70413 14.6599 8.23211 14.0039 7.91211C13.3479 7.59212 12.5718 7.43164 11.6758 7.43164H9V16Z" style="fill: var(--element-active-color)"/>
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
    'obi-own-ship-no-command-d': ObiOwnShipNoCommandD;
  }
}
