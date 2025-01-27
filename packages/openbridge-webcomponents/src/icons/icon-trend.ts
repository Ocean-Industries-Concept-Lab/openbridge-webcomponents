import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-trend')
export class ObiTrend extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M9.5 9.97L3.5 15.98L2 14.48L9.5 6.97L13.5 10.97L20.59 3L22 4.41L13.5 13.97L9.5 9.97Z" fill="currentColor"/>
<path d="M22 19H2V21H22V19Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M9.5 9.97L3.5 15.98L2 14.48L9.5 6.97L13.5 10.97L20.59 3L22 4.41L13.5 13.97L9.5 9.97Z" style="fill: var(--element-active-color)"/>
<path d="M22 19H2V21H22V19Z" style="fill: var(--element-active-color)"/>
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
    'obi-trend': ObiTrend;
  }
}
