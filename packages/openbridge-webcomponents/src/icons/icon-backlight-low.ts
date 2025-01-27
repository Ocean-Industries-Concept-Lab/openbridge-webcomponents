import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-backlight-low')
export class ObiBacklightLow extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M6.34961 12.75L4.22461 10.625L5.62461 9.225L7.74961 11.35L6.34961 12.75ZM6.99961 19V16H16.9996V19H6.99961ZM10.9996 10V7H12.9996V10H10.9996ZM17.6496 12.775L16.2496 11.35L18.3746 9.225L19.7746 10.65L17.6496 12.775Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M6.34961 12.75L4.22461 10.625L5.62461 9.225L7.74961 11.35L6.34961 12.75ZM6.99961 19V16H16.9996V19H6.99961ZM10.9996 10V7H12.9996V10H10.9996ZM17.6496 12.775L16.2496 11.35L18.3746 9.225L19.7746 10.65L17.6496 12.775Z" style="fill: var(--element-active-color)"/>
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
    'obi-backlight-low': ObiBacklightLow;
  }
}
