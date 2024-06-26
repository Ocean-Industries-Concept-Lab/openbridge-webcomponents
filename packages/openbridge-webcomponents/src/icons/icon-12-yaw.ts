import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-12-yaw')
export class Obi12Yaw extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M21.5106 22.1213L20.088 20.6988C22.6479 17.3052 24.9905 10.1275 20.3348 3.88338L21.5111 2.70711L16.5613 2L17.2684 6.94975L18.9032 5.31502C22.5247 10.4218 20.7767 16.2988 18.658 19.2687L17.2679 17.8787L16.5608 22.8285L21.5106 22.1213Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M5.5 15.5L5.5 8.5L3.5 8.5L3.5 15.5L5.5 15.5ZM12.5799 15.5L7 15.5L7 8.5L12.5799 8.5C13.1671 8.5 13.7357 8.70675 14.1858 9.08399L17.6649 12L14.1858 14.916C13.7357 15.2933 13.1671 15.5 12.5799 15.5ZM2 7L2 17L12.5799 17C13.5195 17 14.4292 16.6692 15.1493 16.0656L20 12L15.1493 7.93439C14.4292 7.3308 13.5195 7 12.5799 7L2 7Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M21.5106 22.1213L20.088 20.6988C22.6479 17.3052 24.9905 10.1275 20.3348 3.88338L21.5111 2.70711L16.5613 2L17.2684 6.94975L18.9032 5.31502C22.5247 10.4218 20.7767 16.2988 18.658 19.2687L17.2679 17.8787L16.5608 22.8285L21.5106 22.1213Z" style="fill: var(--element-active-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M5.5 15.5L5.5 8.5L3.5 8.5L3.5 15.5L5.5 15.5ZM12.5799 15.5L7 15.5L7 8.5L12.5799 8.5C13.1671 8.5 13.7357 8.70675 14.1858 9.08399L17.6649 12L14.1858 14.916C13.7357 15.2933 13.1671 15.5 12.5799 15.5ZM2 7L2 17L12.5799 17C13.5195 17 14.4292 16.6692 15.1493 16.0656L20 12L15.1493 7.93439C14.4292 7.3308 13.5195 7 12.5799 7L2 7Z" style="fill: var(--element-active-color)"/>
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
    'obi-12-yaw': Obi12Yaw;
  }
}
