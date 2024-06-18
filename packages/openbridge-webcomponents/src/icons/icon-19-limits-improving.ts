import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-19-limits-improving')
export class Obi19LimitsImproving extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M6.16667 10.4998L7.10667 9.55984L10.8333 13.2798V5.1665H12.1667L12.1667 13.2798L15.8933 9.55984L16.8333 10.4998L11.5 15.8332L6.16667 10.4998Z" fill="currentColor"/>
<path d="M4.5 19.4998L4.5 21.4998H2.5V19.4998H4.5Z" fill="currentColor"/>
<path d="M20.5 19.4998H18.5V21.4998H20.5V19.4998Z" fill="currentColor"/>
<path d="M16.5 19.4998H14.5V21.4998H16.5V19.4998Z" fill="currentColor"/>
<path d="M12.5 21.4998V19.4998H10.5V21.4998H12.5Z" fill="currentColor"/>
<path d="M8.5 19.4998H6.5V21.4998H8.5V19.4998Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M6.16667 10.4998L7.10667 9.55984L10.8333 13.2798V5.1665H12.1667L12.1667 13.2798L15.8933 9.55984L16.8333 10.4998L11.5 15.8332L6.16667 10.4998Z" style="fill: var(--element-active-color)"/>
<path d="M4.5 19.4998L4.5 21.4998H2.5V19.4998H4.5Z" style="fill: var(--element-active-color)"/>
<path d="M20.5 19.4998H18.5V21.4998H20.5V19.4998Z" style="fill: var(--element-active-color)"/>
<path d="M16.5 19.4998H14.5V21.4998H16.5V19.4998Z" style="fill: var(--element-active-color)"/>
<path d="M12.5 21.4998V19.4998H10.5V21.4998H12.5Z" style="fill: var(--element-active-color)"/>
<path d="M8.5 19.4998H6.5V21.4998H8.5V19.4998Z" style="fill: var(--element-active-color)"/>
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
    'obi-19-limits-improving': Obi19LimitsImproving;
  }
}
