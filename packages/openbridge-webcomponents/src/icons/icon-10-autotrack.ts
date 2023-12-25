import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-10-autotrack')
export class Obi10Autotrack extends LitElement {
  @property({type: Number}) size = 24;
  @property({type: Boolean, attribute: 'use-css-color'}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M4.05 11.1001L2 11.0001C1.73478 11.0001 1.48043 11.1055 1.29289 11.293C1.10536 11.4806 1 11.7349 1 12.0001C1 12.2654 1.10536 12.5197 1.29289 12.7072C1.48043 12.8948 1.73478 13.0001 2 13.0001L4.05 12.9001C4.17115 13.9947 4.51811 15.0522 5.06892 16.0058C5.61972 16.9594 6.36241 17.7883 7.25 18.4401L6.13 20.1601C5.86 20.6401 6 21.2501 6.5 21.5301C7 21.8001 7.59 21.6401 7.87 21.1601L8.8 19.3401C9.81087 19.7747 10.8997 19.9989 12 19.9989C13.1003 19.9989 14.1891 19.7747 15.2 19.3401L16.13 21.1601C16.41 21.6401 17 21.8001 17.5 21.5301C18 21.2501 18.14 20.6401 17.87 20.1601L16.75 18.4401C17.6376 17.7883 18.3803 16.9594 18.9311 16.0058C19.4819 15.0522 19.8288 13.9947 19.95 12.9001L22 13.0001C22.2652 13.0001 22.5196 12.8948 22.7071 12.7072C22.8946 12.5197 23 12.2654 23 12.0001C23 11.7349 22.8946 11.4806 22.7071 11.293C22.5196 11.1055 22.2652 11.0001 22 11.0001L19.95 11.1001C19.8288 10.0056 19.4819 8.94808 18.9311 7.99449C18.3803 7.0409 17.6376 6.21198 16.75 5.56013L17.87 3.84013C18.14 3.36013 18 2.75013 17.5 2.47013C17 2.20013 16.41 2.36013 16.13 2.84013L15.2 4.66013C14.1891 4.22554 13.1003 4.00141 12 4.00141C10.8997 4.00141 9.81087 4.22554 8.8 4.66013L7.87 2.84013C7.59 2.36013 7 2.20013 6.5 2.47013C6 2.75013 5.86 3.36013 6.13 3.84013L7.25 5.56013C6.36241 6.21198 5.61972 7.0409 5.06892 7.99449C4.51811 8.94808 4.17115 10.0056 4.05 11.1001ZM10.7891 10V17.4062H13.2109V10H16.3125V7.98438H7.6875V10H10.7891Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M4.05 11.1001L2 11.0001C1.73478 11.0001 1.48043 11.1055 1.29289 11.293C1.10536 11.4806 1 11.7349 1 12.0001C1 12.2654 1.10536 12.5197 1.29289 12.7072C1.48043 12.8948 1.73478 13.0001 2 13.0001L4.05 12.9001C4.17115 13.9947 4.51811 15.0522 5.06892 16.0058C5.61972 16.9594 6.36241 17.7883 7.25 18.4401L6.13 20.1601C5.86 20.6401 6 21.2501 6.5 21.5301C7 21.8001 7.59 21.6401 7.87 21.1601L8.8 19.3401C9.81087 19.7747 10.8997 19.9989 12 19.9989C13.1003 19.9989 14.1891 19.7747 15.2 19.3401L16.13 21.1601C16.41 21.6401 17 21.8001 17.5 21.5301C18 21.2501 18.14 20.6401 17.87 20.1601L16.75 18.4401C17.6376 17.7883 18.3803 16.9594 18.9311 16.0058C19.4819 15.0522 19.8288 13.9947 19.95 12.9001L22 13.0001C22.2652 13.0001 22.5196 12.8948 22.7071 12.7072C22.8946 12.5197 23 12.2654 23 12.0001C23 11.7349 22.8946 11.4806 22.7071 11.293C22.5196 11.1055 22.2652 11.0001 22 11.0001L19.95 11.1001C19.8288 10.0056 19.4819 8.94808 18.9311 7.99449C18.3803 7.0409 17.6376 6.21198 16.75 5.56013L17.87 3.84013C18.14 3.36013 18 2.75013 17.5 2.47013C17 2.20013 16.41 2.36013 16.13 2.84013L15.2 4.66013C14.1891 4.22554 13.1003 4.00141 12 4.00141C10.8997 4.00141 9.81087 4.22554 8.8 4.66013L7.87 2.84013C7.59 2.36013 7 2.20013 6.5 2.47013C6 2.75013 5.86 3.36013 6.13 3.84013L7.25 5.56013C6.36241 6.21198 5.61972 7.0409 5.06892 7.99449C4.51811 8.94808 4.17115 10.0056 4.05 11.1001ZM10.7891 10V17.4062H13.2109V10H16.3125V7.98438H7.6875V10H10.7891Z" style="fill: var(--element-active-color)"/>
</svg>
`;

  override render() {
    return html`
      <div class="wrapper" style="--size:${this.size}px">
        ${this.useCssColor ? this.iconCss : this.icon}
      </div>
    `;
  }

  static override styles = css`
    .wrapper {
      height: var(--size);
      width: var(--size);
    }
    .wrapper > * {
      height: 100%;
      width: 100%;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    'obi-10-autotrack': Obi10Autotrack;
  }
}
