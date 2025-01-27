import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-satellite-low')
export class ObiSatelliteLow extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M12 19C13.8565 19 15.637 18.2625 16.9497 16.9497L12.4141 12.4141L12.8409 11.9874C12.8927 11.9957 12.9458 12 13 12C13.5523 12 14 11.5523 14 11C14 10.4477 13.5523 10 13 10C12.4477 10 12 10.4477 12 11C12 11.1234 12.0224 11.2416 12.0633 11.3508L11.707 11.707L7.05025 7.05023C5.7375 8.36299 5 10.1435 5 12C5 13.8565 5.7375 15.637 7.05025 16.9497C8.36301 18.2625 10.1435 19 12 19Z" fill="currentColor"/>
<path d="M2 23L5.58481 18.3122L5.63604 18.3638C7.32387 20.0516 9.61305 20.9999 12 20.9999C12.689 20.9999 13.3699 20.9208 14.0305 20.7679L16 23H2Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12 19C13.8565 19 15.637 18.2625 16.9497 16.9497L12.4141 12.4141L12.8409 11.9874C12.8927 11.9957 12.9458 12 13 12C13.5523 12 14 11.5523 14 11C14 10.4477 13.5523 10 13 10C12.4477 10 12 10.4477 12 11C12 11.1234 12.0224 11.2416 12.0633 11.3508L11.707 11.707L7.05025 7.05023C5.7375 8.36299 5 10.1435 5 12C5 13.8565 5.7375 15.637 7.05025 16.9497C8.36301 18.2625 10.1435 19 12 19Z" style="fill: var(--element-active-color)"/>
<path d="M2 23L5.58481 18.3122L5.63604 18.3638C7.32387 20.0516 9.61305 20.9999 12 20.9999C12.689 20.9999 13.3699 20.9208 14.0305 20.7679L16 23H2Z" style="fill: var(--element-active-color)"/>
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
    'obi-satellite-low': ObiSatelliteLow;
  }
}
