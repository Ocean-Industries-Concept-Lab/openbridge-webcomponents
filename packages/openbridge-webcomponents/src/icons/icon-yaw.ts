import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-yaw')
export class ObiYaw extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M20.8704 22.1213L19.4478 20.6988C22.0077 17.3052 24.3503 10.1275 19.6946 3.88338L20.8709 2.70711L15.9211 2L16.6282 6.94975L18.2629 5.31502C21.8845 10.4218 20.1365 16.2988 18.0177 19.2687L16.6277 17.8787L15.9206 22.8285L20.8704 22.1213Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M1.99988 7.00005L1.99988 17.0001H8.99988C14.1999 17.0001 17.8332 13.6667 18.9999 12.0001C17.8332 10.3334 14.1999 7.00005 8.99988 7.00005H1.99988ZM5.99988 9.00005H3.99988L3.99988 15.0001H5.99988L5.99988 9.00005ZM7.99988 15.0001H8.99988C12.3101 15.0001 14.8885 13.3621 16.3384 12.0001C14.8885 10.638 12.3101 9.00005 8.99988 9.00005H7.99988L7.99988 15.0001Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M20.8704 22.1213L19.4478 20.6988C22.0077 17.3052 24.3503 10.1275 19.6946 3.88338L20.8709 2.70711L15.9211 2L16.6282 6.94975L18.2629 5.31502C21.8845 10.4218 20.1365 16.2988 18.0177 19.2687L16.6277 17.8787L15.9206 22.8285L20.8704 22.1213Z" style="fill: var(--element-active-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M1.99988 7.00005L1.99988 17.0001H8.99988C14.1999 17.0001 17.8332 13.6667 18.9999 12.0001C17.8332 10.3334 14.1999 7.00005 8.99988 7.00005H1.99988ZM5.99988 9.00005H3.99988L3.99988 15.0001H5.99988L5.99988 9.00005ZM7.99988 15.0001H8.99988C12.3101 15.0001 14.8885 13.3621 16.3384 12.0001C14.8885 10.638 12.3101 9.00005 8.99988 9.00005H7.99988L7.99988 15.0001Z" style="fill: var(--element-active-color)"/>
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
    'obi-yaw': ObiYaw;
  }
}
