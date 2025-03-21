import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-chart')
export class ObiChart extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M15.6667 21L8.36111 18.675L3.38889 20.45C3.07407 20.6 2.76389 20.5917 2.45833 20.425C2.15278 20.2583 2 20.0083 2 19.675V5.725C2 5.50833 2.06944 5.31667 2.20833 5.15C2.34722 4.98333 2.52778 4.85833 2.75 4.775L8.36111 3L15.6667 5.3L20.6111 3.525C20.9259 3.39167 21.2361 3.40417 21.5417 3.5625C21.8472 3.72083 22 3.96667 22 4.3V18.425C22 18.6083 21.9306 18.7667 21.7917 18.9C21.6528 19.0333 21.4815 19.1333 21.2778 19.2L15.6667 21ZM14.7222 19.125V6.5L9.27778 4.85V17.475L14.7222 19.125ZM16.3889 19.125L20.3333 17.95V5.15L16.3889 6.5V19.125ZM3.66667 18.825L7.61111 17.475V4.85L3.66667 6.025V18.825Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M15.6667 21L8.36111 18.675L3.38889 20.45C3.07407 20.6 2.76389 20.5917 2.45833 20.425C2.15278 20.2583 2 20.0083 2 19.675V5.725C2 5.50833 2.06944 5.31667 2.20833 5.15C2.34722 4.98333 2.52778 4.85833 2.75 4.775L8.36111 3L15.6667 5.3L20.6111 3.525C20.9259 3.39167 21.2361 3.40417 21.5417 3.5625C21.8472 3.72083 22 3.96667 22 4.3V18.425C22 18.6083 21.9306 18.7667 21.7917 18.9C21.6528 19.0333 21.4815 19.1333 21.2778 19.2L15.6667 21ZM14.7222 19.125V6.5L9.27778 4.85V17.475L14.7222 19.125ZM16.3889 19.125L20.3333 17.95V5.15L16.3889 6.5V19.125ZM3.66667 18.825L7.61111 17.475V4.85L3.66667 6.025V18.825Z" style="fill: var(--element-active-color)"/>
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
    'obi-chart': ObiChart;
  }
}
