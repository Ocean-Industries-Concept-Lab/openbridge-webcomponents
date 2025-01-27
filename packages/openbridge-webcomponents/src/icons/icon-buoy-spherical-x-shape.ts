import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-buoy-spherical-x-shape')
export class ObiBuoySphericalXShape extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M15.7944 6.6476L13.4801 8.57616L12.5199 7.42383L14.7974 5.52592L13.4394 3.99827L14.5606 3.00172L15.9503 4.56515L18.5199 2.42383L19.4801 3.57616L16.9473 5.68684L18.5606 7.50172L17.4394 8.49827L15.7944 6.6476Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M20 20H15C15 21.6568 13.6569 23 12 23C10.3431 23 9 21.6568 9 20H4V18.5H6.54404C6.19474 17.7389 6 16.8922 6 16C6 12.6863 8.68629 9.99999 12 9.99999C15.3137 9.99999 18 12.6863 18 16C18 16.8922 17.8053 17.7389 17.456 18.5H20V20ZM9.40135 18.5C9.92006 17.6033 10.8896 17 12 17C13.1104 17 14.0799 17.6033 14.5987 18.5H15.7425C16.2215 17.7849 16.5 16.9261 16.5 16C16.5 13.5147 14.4853 11.5 12 11.5C9.51472 11.5 7.5 13.5147 7.5 16C7.5 16.9261 7.7785 17.7849 8.25754 18.5H9.40135ZM13.5 20C13.5 20.8284 12.8284 21.5 12 21.5C11.1716 21.5 10.5 20.8284 10.5 20C10.5 19.1716 11.1716 18.5 12 18.5C12.8284 18.5 13.5 19.1716 13.5 20Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M15.7944 6.6476L13.4801 8.57616L12.5199 7.42383L14.7974 5.52592L13.4394 3.99827L14.5606 3.00172L15.9503 4.56515L18.5199 2.42383L19.4801 3.57616L16.9473 5.68684L18.5606 7.50172L17.4394 8.49827L15.7944 6.6476Z" style="fill: var(--element-active-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M20 20H15C15 21.6568 13.6569 23 12 23C10.3431 23 9 21.6568 9 20H4V18.5H6.54404C6.19474 17.7389 6 16.8922 6 16C6 12.6863 8.68629 9.99999 12 9.99999C15.3137 9.99999 18 12.6863 18 16C18 16.8922 17.8053 17.7389 17.456 18.5H20V20ZM9.40135 18.5C9.92006 17.6033 10.8896 17 12 17C13.1104 17 14.0799 17.6033 14.5987 18.5H15.7425C16.2215 17.7849 16.5 16.9261 16.5 16C16.5 13.5147 14.4853 11.5 12 11.5C9.51472 11.5 7.5 13.5147 7.5 16C7.5 16.9261 7.7785 17.7849 8.25754 18.5H9.40135ZM13.5 20C13.5 20.8284 12.8284 21.5 12 21.5C11.1716 21.5 10.5 20.8284 10.5 20C10.5 19.1716 11.1716 18.5 12 18.5C12.8284 18.5 13.5 19.1716 13.5 20Z" style="fill: var(--element-active-color)"/>
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
    'obi-buoy-spherical-x-shape': ObiBuoySphericalXShape;
  }
}
