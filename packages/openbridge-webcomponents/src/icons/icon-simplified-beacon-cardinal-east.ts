import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-simplified-beacon-cardinal-east')
export class ObiSimplifiedBeaconCardinalEast extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M18 11L6 11L12 3L18 11Z" fill="currentColor"/>
<path d="M18 13H6L12 21L18 13Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M18 11L12 3L6 11L18 11ZM16 10L12 4.66667L8 10L16 10ZM6 13L12 21L18 13H6ZM8 14L12 19.3333L16 14H8Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M18 11L6 11L12 3L18 11Z" style="fill: var(--navigation-light-yellow-color)"/>
<path d="M18 13H6L12 21L18 13Z" style="fill: var(--navigation-light-yellow-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M18 11L12 3L6 11L18 11ZM16 10L12 4.66667L8 10L16 10ZM6 13L12 21L18 13H6ZM8 14L12 19.3333L16 14H8Z" style="fill: var(--element-active-color)"/>
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
    'obi-simplified-beacon-cardinal-east': ObiSimplifiedBeaconCardinalEast;
  }
}