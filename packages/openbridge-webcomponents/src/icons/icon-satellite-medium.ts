import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-satellite-medium')
export class ObiSatelliteMedium extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M15.5355 8.46407C15.0712 7.99978 14.52 7.63148 13.9134 7.38021C13.3068 7.12893 12.6566 6.9996 12 6.9996V4.9996C12.9193 4.9996 13.8295 5.18066 14.6788 5.53245C15.5281 5.88423 16.2997 6.39984 16.9497 7.04985C17.5998 7.69986 18.1154 8.47154 18.4672 9.32082C18.8189 10.1701 19 11.0803 19 11.9996L17 11.9996C17 11.343 16.8707 10.6928 16.6194 10.0862C16.3681 9.47956 15.9998 8.92836 15.5355 8.46407Z" fill="currentColor"/>
<path d="M5.58481 18.3122L2 23H16L14.0305 20.7679C13.3699 20.9209 12.689 20.9999 12 20.9999C9.61305 20.9999 7.32387 20.0517 5.63604 18.3638L5.58481 18.3122Z" fill="currentColor"/>
<path d="M12 19C13.8565 19 15.637 18.2625 16.9497 16.9497L12.4141 12.4141L12.8409 11.9874C12.8927 11.9957 12.9458 12 13 12C13.5523 12 14 11.5523 14 11C14 10.4477 13.5523 10 13 10C12.4477 10 12 10.4477 12 11C12 11.1234 12.0224 11.2417 12.0633 11.3508L11.707 11.707L7.05025 7.05024C5.7375 8.363 5 10.1435 5 12C5 13.8565 5.7375 15.637 7.05025 16.9497C8.36301 18.2625 10.1435 19 12 19Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M15.5355 8.46407C15.0712 7.99978 14.52 7.63148 13.9134 7.38021C13.3068 7.12893 12.6566 6.9996 12 6.9996V4.9996C12.9193 4.9996 13.8295 5.18066 14.6788 5.53245C15.5281 5.88423 16.2997 6.39984 16.9497 7.04985C17.5998 7.69986 18.1154 8.47154 18.4672 9.32082C18.8189 10.1701 19 11.0803 19 11.9996L17 11.9996C17 11.343 16.8707 10.6928 16.6194 10.0862C16.3681 9.47956 15.9998 8.92836 15.5355 8.46407Z" style="fill: var(--element-active-color)"/>
<path d="M5.58481 18.3122L2 23H16L14.0305 20.7679C13.3699 20.9209 12.689 20.9999 12 20.9999C9.61305 20.9999 7.32387 20.0517 5.63604 18.3638L5.58481 18.3122Z" style="fill: var(--element-active-color)"/>
<path d="M12 19C13.8565 19 15.637 18.2625 16.9497 16.9497L12.4141 12.4141L12.8409 11.9874C12.8927 11.9957 12.9458 12 13 12C13.5523 12 14 11.5523 14 11C14 10.4477 13.5523 10 13 10C12.4477 10 12 10.4477 12 11C12 11.1234 12.0224 11.2417 12.0633 11.3508L11.707 11.707L7.05025 7.05024C5.7375 8.363 5 10.1435 5 12C5 13.8565 5.7375 15.637 7.05025 16.9497C8.36301 18.2625 10.1435 19 12 19Z" style="fill: var(--element-active-color)"/>
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
    'obi-satellite-medium': ObiSatelliteMedium;
  }
}