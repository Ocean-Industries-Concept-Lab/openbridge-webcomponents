import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-08-tank')
export class Obi08Tank extends LitElement {
  @property({type: Boolean, attribute: 'use-css-color'}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M9 3H15V4.89474H9V3Z" fill="currentColor"/>
<path d="M5.52983 17.4141C3.58026 17.4141 2 15.0364 2 12.1018C2 9.16714 3.58026 6.78947 5.52983 6.78947H18.4702C20.4197 6.78947 22 9.16714 22 12.1018C22 15.0364 20.4197 17.4141 18.4702 17.4141H16.968L16.5455 21H14.7273V17.4141H9.27273V21H7.45455L7.03196 17.4141H5.52983Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M9 3H15V4.89474H9V3Z" style="fill: var(--element-active-color)"/>
<path d="M5.52983 17.4141C3.58026 17.4141 2 15.0364 2 12.1018C2 9.16714 3.58026 6.78947 5.52983 6.78947H18.4702C20.4197 6.78947 22 9.16714 22 12.1018C22 15.0364 20.4197 17.4141 18.4702 17.4141H16.968L16.5455 21H14.7273V17.4141H9.27273V21H7.45455L7.03196 17.4141H5.52983Z" style="fill: var(--element-active-color)"/>
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
    'obi-08-tank': Obi08Tank;
  }
}
