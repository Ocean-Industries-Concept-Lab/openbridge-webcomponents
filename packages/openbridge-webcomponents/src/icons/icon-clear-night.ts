import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-clear-night')
export class ObiClearNight extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="32" height="32" viewBox="0 0 32 32" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M6.34438 20.701C12.462 20.701 17.4213 15.6558 17.4213 9.43239C17.4213 8.02214 17.1666 6.67243 16.7016 5.4282C16.4168 4.66633 16.9838 3.7916 17.7183 4.04446C22.1405 5.56677 25.3334 9.92621 25.3334 15.0667C25.3334 21.4732 20.3741 26.6667 14.2565 26.6667C10.6979 26.6667 7.53123 24.9093 5.50466 22.1782C5.03876 21.5503 5.5914 20.701 6.34438 20.701Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M6.34438 20.701C12.462 20.701 17.4213 15.6558 17.4213 9.43239C17.4213 8.02214 17.1666 6.67243 16.7016 5.4282C16.4168 4.66633 16.9838 3.7916 17.7183 4.04446C22.1405 5.56677 25.3334 9.92621 25.3334 15.0667C25.3334 21.4732 20.3741 26.6667 14.2565 26.6667C10.6979 26.6667 7.53123 24.9093 5.50466 22.1782C5.03876 21.5503 5.5914 20.701 6.34438 20.701Z" style="fill: var(--element-active-color)"/>
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
    'obi-clear-night': ObiClearNight;
  }
}
