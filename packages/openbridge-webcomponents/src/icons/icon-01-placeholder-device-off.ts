import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-01-placeholder-device-off')
export class Obi01PlaceholderDeviceOff extends LitElement {
  @property({type: Boolean, attribute: 'use-css-color'}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M1.61214 10.516L10.516 1.61214C11.3322 0.795953 12.6678 0.795953 13.484 1.61214L22.3879 10.516C23.204 11.3322 23.204 12.6678 22.3879 13.484L13.484 22.3879C12.6678 23.204 11.3322 23.204 10.516 22.3879L1.61214 13.484C0.795953 12.6678 0.795953 11.3322 1.61214 10.516Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M2.31925 11.2231L11.2231 2.31925C11.6488 1.89358 12.3512 1.89358 12.7769 2.31925L21.6807 11.2231C22.1064 11.6488 22.1064 12.3512 21.6807 12.7769L12.7769 21.6807C12.3512 22.1064 11.6488 22.1064 11.2231 21.6807L2.31925 12.7769C1.89358 12.3512 1.89358 11.6488 2.31925 11.2231ZM11 7H13V11H17V13H13V17H11V13H7V11H11V7Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M1.61214 10.516L10.516 1.61214C11.3322 0.795953 12.6678 0.795953 13.484 1.61214L22.3879 10.516C23.204 11.3322 23.204 12.6678 22.3879 13.484L13.484 22.3879C12.6678 23.204 11.3322 23.204 10.516 22.3879L1.61214 13.484C0.795953 12.6678 0.795953 11.3322 1.61214 10.516Z" style="fill: var(--automation-device-tertiary-inverted-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M2.31925 11.2231L11.2231 2.31925C11.6488 1.89358 12.3512 1.89358 12.7769 2.31925L21.6807 11.2231C22.1064 11.6488 22.1064 12.3512 21.6807 12.7769L12.7769 21.6807C12.3512 22.1064 11.6488 22.1064 11.2231 21.6807L2.31925 12.7769C1.89358 12.3512 1.89358 11.6488 2.31925 11.2231ZM11 7H13V11H17V13H13V17H11V13H7V11H11V7Z" style="fill: var(--automation-device-tertiary-color)"/>
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
    'obi-01-placeholder-device-off': Obi01PlaceholderDeviceOff;
  }
}
