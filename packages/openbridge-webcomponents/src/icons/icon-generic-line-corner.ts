import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-generic-line-corner')
export class ObiGenericLineCorner extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M15.1615 11L24 11V13H15.2C14.6234 13 14.2512 13.0008 13.9678 13.0239C13.6962 13.0461 13.5955 13.0838 13.546 13.109C13.3578 13.2049 13.2049 13.3578 13.109 13.546C13.0838 13.5955 13.0461 13.6962 13.0239 13.9678C13.0008 14.2512 13 14.6234 13 15.2V24H11L11 15.1615C11 14.6343 11 14.1795 11.0306 13.805C11.0629 13.4096 11.1342 13.0164 11.327 12.638C11.6146 12.0735 12.0735 11.6146 12.638 11.327C13.0164 11.1342 13.4096 11.0629 13.805 11.0306C14.1795 11 14.6343 11 15.1615 11Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M15.1615 11L24 11V13H15.2C14.6234 13 14.2512 13.0008 13.9678 13.0239C13.6962 13.0461 13.5955 13.0838 13.546 13.109C13.3578 13.2049 13.2049 13.3578 13.109 13.546C13.0838 13.5955 13.0461 13.6962 13.0239 13.9678C13.0008 14.2512 13 14.6234 13 15.2V24H11L11 15.1615C11 14.6343 11 14.1795 11.0306 13.805C11.0629 13.4096 11.1342 13.0164 11.327 12.638C11.6146 12.0735 12.0735 11.6146 12.638 11.327C13.0164 11.1342 13.4096 11.0629 13.805 11.0306C14.1795 11 14.6343 11 15.1615 11Z" style="fill: var(--automation-device-tertiary-color)"/>
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
    'obi-generic-line-corner': ObiGenericLineCorner;
  }
}
