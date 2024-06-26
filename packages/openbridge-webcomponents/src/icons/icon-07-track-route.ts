import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-07-track-route')
export class Obi07TrackRoute extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M21.9798 3.06066L20.4084 4.63209L19.3477 3.57143L20.9191 2L21.9798 3.06066ZM19.2298 5.81066L17.6584 7.38209L16.5977 6.32143L18.1691 4.75L19.2298 5.81066ZM16.4798 8.56066L14.9084 10.1321L13.8477 9.07143L15.4191 7.5L16.4798 8.56066Z" fill="currentColor"/>
<path d="M11.2804 15.3618L5.82855 20.8137L3.00012 17.9853L8.45199 12.5334C9.2575 11.7279 10.3226 11.2846 11.4398 11.0705C11.9609 10.9706 12.4612 10.9271 12.8996 10.9142C12.8867 11.3526 12.8432 11.8529 12.7433 12.374C12.5292 13.4912 12.0859 14.5563 11.2804 15.3618Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M21.9798 3.06066L20.4084 4.63209L19.3477 3.57143L20.9191 2L21.9798 3.06066ZM19.2298 5.81066L17.6584 7.38209L16.5977 6.32143L18.1691 4.75L19.2298 5.81066ZM16.4798 8.56066L14.9084 10.1321L13.8477 9.07143L15.4191 7.5L16.4798 8.56066Z" style="fill: var(--element-active-color)"/>
<path d="M11.2804 15.3618L5.82855 20.8137L3.00012 17.9853L8.45199 12.5334C9.2575 11.7279 10.3226 11.2846 11.4398 11.0705C11.9609 10.9706 12.4612 10.9271 12.8996 10.9142C12.8867 11.3526 12.8432 11.8529 12.7433 12.374C12.5292 13.4912 12.0859 14.5563 11.2804 15.3618Z" style="fill: var(--element-active-color)"/>
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
    'obi-07-track-route': Obi07TrackRoute;
  }
}
