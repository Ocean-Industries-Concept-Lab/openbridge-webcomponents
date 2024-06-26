import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-11-wind-7')
export class Obi11Wind7 extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M0 11V13H17V15L24 12L17 9V11H0Z" fill="currentColor"/>
<path d="M0 5H1V11H0V5Z" fill="currentColor"/>
<path d="M3 5H4V11H3V5Z" fill="currentColor"/>
<path d="M6 8H7V11H6V8Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M0 11V13H17V15L24 12L17 9V11H0Z" style="fill: var(--element-active-color)"/>
<path d="M0 5H1V11H0V5Z" style="fill: var(--element-active-color)"/>
<path d="M3 5H4V11H3V5Z" style="fill: var(--element-active-color)"/>
<path d="M6 8H7V11H6V8Z" style="fill: var(--element-active-color)"/>
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
    'obi-11-wind-7': Obi11Wind7;
  }
}
