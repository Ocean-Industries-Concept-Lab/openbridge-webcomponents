import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-trend-up')
export class ObiTrendUp extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M22.6077 2.31519L21.5078 8.03608L19.9849 6.67635L13.5 13.9699L9.5 9.96995L3.5 15.9799L2 14.4799L9.5 6.96995L13.5 10.9699L18.4994 5.35003L17.0475 4.0537L22.6077 2.31519Z" fill="currentColor"/>
<path d="M2 18.9999H22V20.9999H2V18.9999Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M22.6077 2.31519L21.5078 8.03608L19.9849 6.67635L13.5 13.9699L9.5 9.96995L3.5 15.9799L2 14.4799L9.5 6.96995L13.5 10.9699L18.4994 5.35003L17.0475 4.0537L22.6077 2.31519Z" style="fill: var(--element-active-color)"/>
<path d="M2 18.9999H22V20.9999H2V18.9999Z" style="fill: var(--element-active-color)"/>
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
    'obi-trend-up': ObiTrendUp;
  }
}