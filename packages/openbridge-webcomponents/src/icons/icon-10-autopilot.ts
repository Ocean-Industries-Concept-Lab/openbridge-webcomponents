import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-10-autopilot')
export class Obi10Autopilot extends LitElement {
  @property({type: Boolean, attribute: 'use-css-color'}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M12.8166 12.2143H11.0304L11.881 9.83264L12.8166 12.2143Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M2 11.0001L4.05 11.1001C4.17115 10.0056 4.51811 8.94808 5.06892 7.99449C5.61972 7.0409 6.36241 6.21198 7.25 5.56013L6.13 3.84013C5.86 3.36013 6 2.75013 6.5 2.47013C7 2.20013 7.59 2.36013 7.87 2.84013L8.8 4.66013C9.81087 4.22554 10.8997 4.00141 12 4.00141C13.1003 4.00141 14.1891 4.22554 15.2 4.66013L16.13 2.84013C16.41 2.36013 17 2.20013 17.5 2.47013C18 2.75013 18.14 3.36013 17.87 3.84013L16.75 5.56013C17.6376 6.21198 18.3803 7.0409 18.9311 7.99449C19.4819 8.94808 19.8288 10.0056 19.95 11.1001L22 11.0001C22.2652 11.0001 22.5196 11.1055 22.7071 11.293C22.8946 11.4806 23 11.7349 23 12.0001C23 12.2654 22.8946 12.5197 22.7071 12.7072C22.5196 12.8948 22.2652 13.0001 22 13.0001L19.95 12.9001C19.8288 13.9947 19.4819 15.0522 18.9311 16.0058C18.3803 16.9594 17.6376 17.7883 16.75 18.4401L17.87 20.1601C18.14 20.6401 18 21.2501 17.5 21.5301C17 21.8001 16.41 21.6401 16.13 21.1601L15.2 19.3401C14.1891 19.7747 13.1003 19.9989 12 19.9989C10.8997 19.9989 9.81087 19.7747 8.8 19.3401L7.87 21.1601C7.59 21.6401 7 21.8001 6.5 21.5301C6 21.2501 5.86 20.6401 6.13 20.1601L7.25 18.4401C6.36241 17.7883 5.61972 16.9594 5.06892 16.0058C4.51811 15.0522 4.17115 13.9947 4.05 12.9001L2 13.0001C1.73478 13.0001 1.48043 12.8948 1.29289 12.7072C1.10536 12.5197 1 12.2654 1 12.0001C1 11.7349 1.10536 11.4806 1.29289 11.293C1.48043 11.1055 1.73478 11.0001 2 11.0001ZM10.5713 6.5L7 16.5H9.49988L10.2651 14.3571H13.6584L14.5002 16.5H17L13.0711 6.5H10.5713Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12.8166 12.2143H11.0304L11.881 9.83264L12.8166 12.2143Z" style="fill: var(--element-active-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M2 11.0001L4.05 11.1001C4.17115 10.0056 4.51811 8.94808 5.06892 7.99449C5.61972 7.0409 6.36241 6.21198 7.25 5.56013L6.13 3.84013C5.86 3.36013 6 2.75013 6.5 2.47013C7 2.20013 7.59 2.36013 7.87 2.84013L8.8 4.66013C9.81087 4.22554 10.8997 4.00141 12 4.00141C13.1003 4.00141 14.1891 4.22554 15.2 4.66013L16.13 2.84013C16.41 2.36013 17 2.20013 17.5 2.47013C18 2.75013 18.14 3.36013 17.87 3.84013L16.75 5.56013C17.6376 6.21198 18.3803 7.0409 18.9311 7.99449C19.4819 8.94808 19.8288 10.0056 19.95 11.1001L22 11.0001C22.2652 11.0001 22.5196 11.1055 22.7071 11.293C22.8946 11.4806 23 11.7349 23 12.0001C23 12.2654 22.8946 12.5197 22.7071 12.7072C22.5196 12.8948 22.2652 13.0001 22 13.0001L19.95 12.9001C19.8288 13.9947 19.4819 15.0522 18.9311 16.0058C18.3803 16.9594 17.6376 17.7883 16.75 18.4401L17.87 20.1601C18.14 20.6401 18 21.2501 17.5 21.5301C17 21.8001 16.41 21.6401 16.13 21.1601L15.2 19.3401C14.1891 19.7747 13.1003 19.9989 12 19.9989C10.8997 19.9989 9.81087 19.7747 8.8 19.3401L7.87 21.1601C7.59 21.6401 7 21.8001 6.5 21.5301C6 21.2501 5.86 20.6401 6.13 20.1601L7.25 18.4401C6.36241 17.7883 5.61972 16.9594 5.06892 16.0058C4.51811 15.0522 4.17115 13.9947 4.05 12.9001L2 13.0001C1.73478 13.0001 1.48043 12.8948 1.29289 12.7072C1.10536 12.5197 1 12.2654 1 12.0001C1 11.7349 1.10536 11.4806 1.29289 11.293C1.48043 11.1055 1.73478 11.0001 2 11.0001ZM10.5713 6.5L7 16.5H9.49988L10.2651 14.3571H13.6584L14.5002 16.5H17L13.0711 6.5H10.5713Z" style="fill: var(--element-active-color)"/>
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
    'obi-10-autopilot': Obi10Autopilot;
  }
}
