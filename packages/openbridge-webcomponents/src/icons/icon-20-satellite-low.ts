import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-20-satellite-low')
export class Obi20SatelliteLow extends LitElement {
  @property({type: Boolean, attribute: 'use-css-color'}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M12 19C13.8565 19 15.637 18.2625 16.9497 16.9498L12.4141 12.4142L12.8409 11.9875C12.8927 11.9958 12.9458 12.0001 13 12.0001C13.5523 12.0001 14 11.5523 14 11.0001C14 10.4478 13.5523 10.0001 13 10.0001C12.4477 10.0001 12 10.4478 12 11.0001C12 11.1235 12.0224 11.2417 12.0633 11.3509L11.707 11.7071L7.05025 7.05029C5.7375 8.36305 5 10.1435 5 12C5 13.8566 5.7375 15.637 7.05025 16.9498C8.36301 18.2625 10.1435 19 12 19Z" fill="currentColor"/>
<path d="M2 23.0001L5.58481 18.3122L5.63604 18.3639C7.32387 20.0517 9.61305 20.9999 12 20.9999C12.689 20.9999 13.3699 20.9209 14.0305 20.7679L16 23.0001H2Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12 19C13.8565 19 15.637 18.2625 16.9497 16.9498L12.4141 12.4142L12.8409 11.9875C12.8927 11.9958 12.9458 12.0001 13 12.0001C13.5523 12.0001 14 11.5523 14 11.0001C14 10.4478 13.5523 10.0001 13 10.0001C12.4477 10.0001 12 10.4478 12 11.0001C12 11.1235 12.0224 11.2417 12.0633 11.3509L11.707 11.7071L7.05025 7.05029C5.7375 8.36305 5 10.1435 5 12C5 13.8566 5.7375 15.637 7.05025 16.9498C8.36301 18.2625 10.1435 19 12 19Z" fill="currentColor"/>
<path d="M2 23.0001L5.58481 18.3122L5.63604 18.3639C7.32387 20.0517 9.61305 20.9999 12 20.9999C12.689 20.9999 13.3699 20.9209 14.0305 20.7679L16 23.0001H2Z" fill="currentColor"/>
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
    'obi-20-satellite-low': Obi20SatelliteLow;
  }
}
