import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-07-ebl')
export class Obi07Ebl extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M7 19.5C7 20.8808 5.88074 22 4.5 22C3.11926 22 2 20.8808 2 19.5C2 18.1193 3.11926 17 4.5 17C5.88074 17 7 18.1193 7 19.5Z" fill="currentColor"/>
<path d="M7 15.5564L9.82843 12.728L11.2426 14.1422L8.41421 16.9706L7 15.5564Z" fill="currentColor"/>
<path d="M11.2426 11.3137L14.0711 8.48532L15.4853 9.89953L12.6569 12.728L11.2426 11.3137Z" fill="currentColor"/>
<path d="M18.3137 4.24268L15.4853 7.0711L16.8995 8.48532L19.7279 5.65689L18.3137 4.24268Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M7 19.5C7 20.8808 5.88074 22 4.5 22C3.11926 22 2 20.8808 2 19.5C2 18.1193 3.11926 17 4.5 17C5.88074 17 7 18.1193 7 19.5Z" style="fill: var(--element-active-color)"/>
<path d="M7 15.5564L9.82843 12.728L11.2426 14.1422L8.41421 16.9706L7 15.5564Z" style="fill: var(--element-active-color)"/>
<path d="M11.2426 11.3137L14.0711 8.48532L15.4853 9.89953L12.6569 12.728L11.2426 11.3137Z" style="fill: var(--element-active-color)"/>
<path d="M18.3137 4.24268L15.4853 7.0711L16.8995 8.48532L19.7279 5.65689L18.3137 4.24268Z" style="fill: var(--element-active-color)"/>
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
    'obi-07-ebl': Obi07Ebl;
  }
}
