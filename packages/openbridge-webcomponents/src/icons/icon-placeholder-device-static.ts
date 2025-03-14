import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-placeholder-device-static')
export class ObiPlaceholderDeviceStatic extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M13 7H11V11H7V13H11V17H13V13H17V11H13V7Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M10.516 1.61214L1.61214 10.516C0.795953 11.3322 0.795953 12.6678 1.61214 13.484L10.516 22.3879C11.3322 23.204 12.6678 23.204 13.484 22.3879L22.3879 13.484C23.204 12.6678 23.204 11.3322 22.3879 10.516L13.484 1.61214C12.6678 0.795953 11.3322 0.795953 10.516 1.61214ZM11.2231 2.31925L2.31925 11.2231C1.89358 11.6488 1.89358 12.3512 2.31925 12.7769L11.2231 21.6807C11.6488 22.1064 12.3512 22.1064 12.7769 21.6807L21.6807 12.7769C22.1064 12.3512 22.1064 11.6488 21.6807 11.2231L12.7769 2.31925C12.3512 1.89358 11.6488 1.89358 11.2231 2.31925Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M13 7H11V11H7V13H11V17H13V13H17V11H13V7Z" style="fill: var(--automation-device-secondary-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M10.516 1.61214L1.61214 10.516C0.795953 11.3322 0.795953 12.6678 1.61214 13.484L10.516 22.3879C11.3322 23.204 12.6678 23.204 13.484 22.3879L22.3879 13.484C23.204 12.6678 23.204 11.3322 22.3879 10.516L13.484 1.61214C12.6678 0.795953 11.3322 0.795953 10.516 1.61214ZM11.2231 2.31925L2.31925 11.2231C1.89358 11.6488 1.89358 12.3512 2.31925 12.7769L11.2231 21.6807C11.6488 22.1064 12.3512 22.1064 12.7769 21.6807L21.6807 12.7769C22.1064 12.3512 22.1064 11.6488 21.6807 11.2231L12.7769 2.31925C12.3512 1.89358 11.6488 1.89358 11.2231 2.31925Z" style="fill: var(--automation-device-secondary-color)"/>
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
    'obi-placeholder-device-static': ObiPlaceholderDeviceStatic;
  }
}
