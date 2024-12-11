import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-duct-coming-from')
export class ObiDuctComingFrom extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M9 6.00014L3.2971e-07 6.00013L-2.18636e-07 18.0001L9 18.0001L15.4 22.8001C16.0592 23.2946 17 22.8242 17 22.0001L17 2.00014C17 1.17609 16.0592 0.705711 15.4 1.20014L9 6.00014Z" fill="currentColor"/>
<path d="M16 22.0001L16 2.00014L9.33333 7.00014L-6.99462e-07 7.00013L-7.43173e-07 6.00013L9 6.00014L15.4 1.20014C16.0592 0.705709 17 1.17609 17 2.00014L17 22.0001C17 22.8242 16.0592 23.2946 15.4 22.8001L9 18.0001L-2.18637e-07 18.0001L-2.62348e-07 17.0001L9.33333 17.0001L16 22.0001Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M9 6.00014L3.2971e-07 6.00013L-2.18636e-07 18.0001L9 18.0001L15.4 22.8001C16.0592 23.2946 17 22.8242 17 22.0001L17 2.00014C17 1.17609 16.0592 0.705711 15.4 1.20014L9 6.00014Z" style="fill: var(--automation-pipes-primary-color)"/>
<path d="M16 22.0001L16 2.00014L9.33333 7.00014L-6.99462e-07 7.00013L-7.43173e-07 6.00013L9 6.00014L15.4 1.20014C16.0592 0.705709 17 1.17609 17 2.00014L17 22.0001C17 22.8242 16.0592 23.2946 15.4 22.8001L9 18.0001L-2.18637e-07 18.0001L-2.62348e-07 17.0001L9.33333 17.0001L16 22.0001Z" style="fill: var(--automation-pipes-tertiary-color)"/>
</svg>
`;

  override render() {
    return html`
      <div class="wrapper" >
        ${this.useCssColor? this.iconCss : this.icon}
      </div>
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
    'obi-duct-coming-from': ObiDuctComingFrom;
  }
}