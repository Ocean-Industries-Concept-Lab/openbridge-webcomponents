import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-manual-only')
export class ObiManualOnly extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M6.375 2L3 17.5556H6.99893L8.51315 10.447L10.3125 17.5556H13.6875L15.5048 10.3761L17.0625 17.5556H21L17.625 2H13.6875L12 9.77778L10.3125 2H6.375Z" fill="currentColor"/>
<path d="M3 19.7778H21V22H3V19.7778Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M6.375 2L3 17.5556H6.99893L8.51315 10.447L10.3125 17.5556H13.6875L15.5048 10.3761L17.0625 17.5556H21L17.625 2H13.6875L12 9.77778L10.3125 2H6.375Z" style="fill: var(--element-active-color)"/>
<path d="M3 19.7778H21V22H3V19.7778Z" style="fill: var(--element-active-color)"/>
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
    'obi-manual-only': ObiManualOnly;
  }
}
