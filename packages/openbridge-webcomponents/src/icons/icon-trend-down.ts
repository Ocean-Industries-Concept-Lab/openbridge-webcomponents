import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-trend-down')
export class ObiTrendDown extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M22.6076 16.3224L21.5077 10.6015L19.9847 11.9612L13.4998 4.66762L9.49985 8.66762L3.49985 2.65762L1.99985 4.15762L9.49985 11.6676L13.4998 7.66762L18.4993 13.2875L17.0473 14.5839L22.6076 16.3224Z" fill="currentColor"/>
<path d="M1.99985 18.9999H21.9998V20.9999H1.99985V18.9999Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M22.6076 16.3224L21.5077 10.6015L19.9847 11.9612L13.4998 4.66762L9.49985 8.66762L3.49985 2.65762L1.99985 4.15762L9.49985 11.6676L13.4998 7.66762L18.4993 13.2875L17.0473 14.5839L22.6076 16.3224Z" style="fill: var(--element-active-color)"/>
<path d="M1.99985 18.9999H21.9998V20.9999H1.99985V18.9999Z" style="fill: var(--element-active-color)"/>
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
    'obi-trend-down': ObiTrendDown;
  }
}