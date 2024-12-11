import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-simplified-buoy-cardinal-south')
export class ObiSimplifiedBuoyCardinalSouth extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M16 13L6 13L9 21L16 13Z" fill="currentColor"/>
<path d="M11 11L8 3L18 3L11 11Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M6 13L9 21L16 13L6 13ZM7.443 14L9.34897 19.0826L13.7962 14L7.443 14ZM11 11L18 3L8 3L11 11ZM11.349 9.08259L15.7962 4L9.443 4L11.349 9.08259Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M16 13L6 13L9 21L16 13Z" style="fill: var(--navigation-light-yellow-color)"/>
<path d="M11 11L8 3L18 3L11 11Z" style="fill: var(--navigation-light-yellow-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M6 13L9 21L16 13L6 13ZM7.443 14L9.34897 19.0826L13.7962 14L7.443 14ZM11 11L18 3L8 3L11 11ZM11.349 9.08259L15.7962 4L9.443 4L11.349 9.08259Z" style="fill: var(--element-active-color)"/>
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
    'obi-simplified-buoy-cardinal-south': ObiSimplifiedBuoyCardinalSouth;
  }
}