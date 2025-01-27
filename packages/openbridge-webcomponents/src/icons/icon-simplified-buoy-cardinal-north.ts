import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-simplified-buoy-cardinal-north')
export class ObiSimplifiedBuoyCardinalNorth extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M8 11L18 11L15 3L8 11Z" fill="currentColor"/>
<path d="M13 13L16 21H6L13 13Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M18 11L15 3L8 11L18 11ZM16.557 10L14.651 4.91741L10.2038 10L16.557 10ZM13 13L6 21H16L13 13ZM12.651 14.9174L8.20377 20H14.557L12.651 14.9174Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M8 11L18 11L15 3L8 11Z" style="fill: var(--navigation-light-yellow-color)"/>
<path d="M13 13L16 21H6L13 13Z" style="fill: var(--navigation-light-yellow-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M18 11L15 3L8 11L18 11ZM16.557 10L14.651 4.91741L10.2038 10L16.557 10ZM13 13L6 21H16L13 13ZM12.651 14.9174L8.20377 20H14.557L12.651 14.9174Z" style="fill: var(--element-active-color)"/>
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
    'obi-simplified-buoy-cardinal-north': ObiSimplifiedBuoyCardinalNorth;
  }
}
