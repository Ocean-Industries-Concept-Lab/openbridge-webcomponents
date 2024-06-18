import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-06-ship')
export class Obi06Ship extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M9.00233 1H15.0023V4H18.0023C19.1023 4 20.0023 4.9 20.0023 6V10.62L21.2823 11.04C21.5423 11.12 21.7623 11.3 21.8823 11.54C22.0023 11.78 22.0223 12.06 21.9423 12.32L20.0523 19H20.0023C18.4023 19 16.9823 18.12 16.0023 17C15.0223 18.12 13.6023 19 12.0023 19C10.4023 19 8.98233 18.12 8.00233 17C7.02233 18.12 5.60233 19 4.00233 19H3.95233L2.05233 12.32C1.96233 12.06 1.99233 11.78 2.11233 11.54C2.23233 11.3 2.45233 11.12 2.71233 11.04L4.00233 10.62V6C4.00233 4.9 4.90233 4 6.00233 4H9.00233V1ZM13.0024 4V3H11.0024V4H13.0024ZM17.3823 11.88L12.0023 10.11L6.62225 11.86L4.22225 12.65L5.00107 16C5.56357 16 6.32761 15.8278 6.81747 15.5078L8.00233 14.5L9.41122 15.8008C9.87997 16.1758 10.7923 17 12.0023 17C13.2123 17 14.1222 16.0625 14.6222 15.7109L16.0024 14.5L17.0266 15.2723C17.6771 15.7399 18.4212 16 19.0011 16L19.7723 12.66L17.3823 11.88ZM6.00239 6V9.97L12.0024 8L18.0024 9.97V6H6.00239Z" fill="currentColor"/>
<path d="M12.0024 20.96C13.3924 20.96 14.7824 20.53 16.0024 19.68C17.2224 20.53 18.6124 21 20.0024 21H22.0024V23H20.0024C18.6224 23 17.2624 22.66 16.0024 22.01C14.7424 22.66 13.3724 22.98 12.0024 22.98C10.6324 22.98 9.26239 22.65 8.00239 22.01C6.74239 22.65 5.38239 23 4.00239 23H2.00239V21H4.00239C5.39239 21 6.78239 20.53 8.00239 19.68C9.22239 20.53 10.6124 20.96 12.0024 20.96Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M9.00233 1H15.0023V4H18.0023C19.1023 4 20.0023 4.9 20.0023 6V10.62L21.2823 11.04C21.5423 11.12 21.7623 11.3 21.8823 11.54C22.0023 11.78 22.0223 12.06 21.9423 12.32L20.0523 19H20.0023C18.4023 19 16.9823 18.12 16.0023 17C15.0223 18.12 13.6023 19 12.0023 19C10.4023 19 8.98233 18.12 8.00233 17C7.02233 18.12 5.60233 19 4.00233 19H3.95233L2.05233 12.32C1.96233 12.06 1.99233 11.78 2.11233 11.54C2.23233 11.3 2.45233 11.12 2.71233 11.04L4.00233 10.62V6C4.00233 4.9 4.90233 4 6.00233 4H9.00233V1ZM13.0024 4V3H11.0024V4H13.0024ZM17.3823 11.88L12.0023 10.11L6.62225 11.86L4.22225 12.65L5.00107 16C5.56357 16 6.32761 15.8278 6.81747 15.5078L8.00233 14.5L9.41122 15.8008C9.87997 16.1758 10.7923 17 12.0023 17C13.2123 17 14.1222 16.0625 14.6222 15.7109L16.0024 14.5L17.0266 15.2723C17.6771 15.7399 18.4212 16 19.0011 16L19.7723 12.66L17.3823 11.88ZM6.00239 6V9.97L12.0024 8L18.0024 9.97V6H6.00239Z" style="fill: var(--element-active-color)"/>
<path d="M12.0024 20.96C13.3924 20.96 14.7824 20.53 16.0024 19.68C17.2224 20.53 18.6124 21 20.0024 21H22.0024V23H20.0024C18.6224 23 17.2624 22.66 16.0024 22.01C14.7424 22.66 13.3724 22.98 12.0024 22.98C10.6324 22.98 9.26239 22.65 8.00239 22.01C6.74239 22.65 5.38239 23 4.00239 23H2.00239V21H4.00239C5.39239 21 6.78239 20.53 8.00239 19.68C9.22239 20.53 10.6124 20.96 12.0024 20.96Z" style="fill: var(--element-active-color)"/>
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
    'obi-06-ship': Obi06Ship;
  }
}
