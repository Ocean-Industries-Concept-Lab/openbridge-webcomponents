import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-simplified-beacon-cardinal-west')
export class ObiSimplifiedBeaconCardinalWest extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M6 3L18 3L12 11L6 3Z" fill="currentColor"/>
<path d="M6 21H18L12 13L6 21Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M6 3H18L12 11L6 3ZM12 9.33333L16 4L8 4L12 9.33333ZM18 21L12 13L6 21H18ZM8 20H16L12 14.6667L8 20Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M6 3L18 3L12 11L6 3Z" style="fill: var(--navigation-light-yellow-color)"/>
<path d="M6 21H18L12 13L6 21Z" style="fill: var(--navigation-light-yellow-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M6 3H18L12 11L6 3ZM12 9.33333L16 4L8 4L12 9.33333ZM18 21L12 13L6 21H18ZM8 20H16L12 14.6667L8 20Z" style="fill: var(--element-active-color)"/>
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
    'obi-simplified-beacon-cardinal-west': ObiSimplifiedBeaconCardinalWest;
  }
}
