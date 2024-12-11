import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-simplified-buoy-cardinal-east')
export class ObiSimplifiedBuoyCardinalEast extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M17 11L7 11L14 3L17 11Z" fill="currentColor"/>
<path d="M16 13H6L9 21L16 13Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M17 11L14 3L7 11L17 11ZM15.557 10L13.651 4.91741L9.20377 10L15.557 10ZM6 13L9 21L16 13H6ZM7.443 14L9.34897 19.0826L13.7962 14H7.443Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M17 11L7 11L14 3L17 11Z" style="fill: var(--navigation-light-yellow-color)"/>
<path d="M16 13H6L9 21L16 13Z" style="fill: var(--navigation-light-yellow-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M17 11L14 3L7 11L17 11ZM15.557 10L13.651 4.91741L9.20377 10L15.557 10ZM6 13L9 21L16 13H6ZM7.443 14L9.34897 19.0826L13.7962 14H7.443Z" style="fill: var(--element-active-color)"/>
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
    'obi-simplified-buoy-cardinal-east': ObiSimplifiedBuoyCardinalEast;
  }
}