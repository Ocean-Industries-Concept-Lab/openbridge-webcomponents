import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-duct-coming-from')
export class ObiDuctComingFrom extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M9 5.99989L3.2971e-07 5.99989L-2.18636e-07 17.9999L9 17.9999L15.4 22.7999C16.0592 23.2943 17 22.8239 17 21.9999L17 1.99989C17 1.17585 16.0592 0.705467 15.4 1.19989L9 5.99989Z" fill="currentColor"/>
<path d="M16 21.9999L16 1.99989L9.33333 6.99989L-6.99462e-07 6.99989L-7.43173e-07 5.99989L9 5.99989L15.4 1.19989C16.0592 0.705465 17 1.17585 17 1.99989L17 21.9999C17 22.8239 16.0592 23.2943 15.4 22.7999L9 17.9999L-2.18637e-07 17.9999L-2.62348e-07 16.9999L9.33333 16.9999L16 21.9999Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M9 5.99989L3.2971e-07 5.99989L-2.18636e-07 17.9999L9 17.9999L15.4 22.7999C16.0592 23.2943 17 22.8239 17 21.9999L17 1.99989C17 1.17585 16.0592 0.705467 15.4 1.19989L9 5.99989Z" style="fill: var(--automation-pipe-primary-color)"/>
<path d="M16 21.9999L16 1.99989L9.33333 6.99989L-6.99462e-07 6.99989L-7.43173e-07 5.99989L9 5.99989L15.4 1.19989C16.0592 0.705465 17 1.17585 17 1.99989L17 21.9999C17 22.8239 16.0592 23.2943 15.4 22.7999L9 17.9999L-2.18637e-07 17.9999L-2.62348e-07 16.9999L9.33333 16.9999L16 21.9999Z" style="fill: var(--automation-pipe-tertiary-color)"/>
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
    'obi-duct-coming-from': ObiDuctComingFrom;
  }
}
