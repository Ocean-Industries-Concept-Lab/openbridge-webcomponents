import {LitElement, html, css, svg} from 'lit';
import {property} from 'lit/decorators.js';
import {customElement} from '../decorator.js';

@customElement('obi-vessel-type-generic-outlined')
export class ObiVesselTypeGenericOutlined extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M7 20.9607V9.56507C7.035 5.90422 9.03708 2.71382 12.0001 1C14.9629 2.71388 16.9648 5.90415 16.9998 9.56483V20.9607H7ZM15.4998 19.4607V9.57228C15.4709 6.78553 14.1013 4.31822 12.0001 2.78733C9.89863 4.31821 8.52886 6.78563 8.5 9.57253V19.4607H15.4998Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M7 20.9607V9.56507C7.035 5.90422 9.03708 2.71382 12.0001 1C14.9629 2.71388 16.9648 5.90415 16.9998 9.56483V20.9607H7ZM15.4998 19.4607V9.57228C15.4709 6.78553 14.1013 4.31822 12.0001 2.78733C9.89863 4.31821 8.52886 6.78563 8.5 9.57253V19.4607H15.4998Z" style="fill: var(--element-active-color)"/>
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
    'obi-vessel-type-generic-outlined': ObiVesselTypeGenericOutlined;
  }
}
