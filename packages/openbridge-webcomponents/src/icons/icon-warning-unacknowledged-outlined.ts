import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-warning-unacknowledged-outlined')
export class ObiWarningUnacknowledgedOutlined extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21ZM12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" fill="currentColor"/>
<path d="M7.5 13.1999V10.7999C7.5 10.5199 7.5 10.3799 7.5545 10.2729C7.60243 10.1789 7.67892 10.1024 7.773 10.0544C7.87996 9.99993 8.01997 9.99993 8.3 9.99993H11L13.6343 7.36561C14.0627 6.93724 14.2769 6.72305 14.4608 6.70858C14.6203 6.69602 14.7763 6.7606 14.8802 6.88231C15 7.02257 15 7.32548 15 7.9313V16.0686C15 16.6744 15 16.9773 14.8802 17.1175C14.7763 17.2392 14.6203 17.3038 14.4608 17.2913C14.2769 17.2768 14.0627 17.0626 13.6343 16.6342L11 13.9999H8.3C8.01997 13.9999 7.87996 13.9999 7.773 13.9454C7.67892 13.8975 7.60243 13.821 7.5545 13.7269C7.5 13.62 7.5 13.48 7.5 13.1999Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21ZM12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" style="fill: var(--element-active-color)"/>
<path d="M7.5 13.1999V10.7999C7.5 10.5199 7.5 10.3799 7.5545 10.2729C7.60243 10.1789 7.67892 10.1024 7.773 10.0544C7.87996 9.99993 8.01997 9.99993 8.3 9.99993H11L13.6343 7.36561C14.0627 6.93724 14.2769 6.72305 14.4608 6.70858C14.6203 6.69602 14.7763 6.7606 14.8802 6.88231C15 7.02257 15 7.32548 15 7.9313V16.0686C15 16.6744 15 16.9773 14.8802 17.1175C14.7763 17.2392 14.6203 17.3038 14.4608 17.2913C14.2769 17.2768 14.0627 17.0626 13.6343 16.6342L11 13.9999H8.3C8.01997 13.9999 7.87996 13.9999 7.773 13.9454C7.67892 13.8975 7.60243 13.821 7.5545 13.7269C7.5 13.62 7.5 13.48 7.5 13.1999Z" style="fill: var(--element-active-color)"/>
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
    'obi-warning-unacknowledged-outlined': ObiWarningUnacknowledgedOutlined;
  }
}
