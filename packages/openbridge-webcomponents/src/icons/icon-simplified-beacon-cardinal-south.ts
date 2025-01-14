import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-simplified-beacon-cardinal-south')
export class ObiSimplifiedBeaconCardinalSouth extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M6 3L18 3L12 11L6 3Z" fill="currentColor"/>
<path d="M18 13H6L12 21L18 13Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M6 3H18L12 11L6 3ZM12 9.33333L16 4L8 4L12 9.33333ZM6 13L12 21L18 13H6ZM8 14L12 19.3333L16 14H8Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M6 3L18 3L12 11L6 3Z" style="fill: var(--navigation-light-yellow-color)"/>
<path d="M18 13H6L12 21L18 13Z" style="fill: var(--navigation-light-yellow-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M6 3H18L12 11L6 3ZM12 9.33333L16 4L8 4L12 9.33333ZM6 13L12 21L18 13H6ZM8 14L12 19.3333L16 14H8Z" style="fill: var(--element-active-color)"/>
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
    'obi-simplified-beacon-cardinal-south': ObiSimplifiedBeaconCardinalSouth;
  }
}