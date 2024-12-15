import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-simplified-buoy-cardinal-west')
export class ObiSimplifiedBuoyCardinalWest extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M15 21L5 21L12 13L15 21Z" fill="currentColor"/>
<path d="M19 3H9L12 11L19 3Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M15 21L12 13L5 21L15 21ZM13.557 20L11.651 14.9174L7.20377 20L13.557 20ZM9 3L12 11L19 3H9ZM10.443 4H16.7962L12.349 9.08258L10.443 4Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M15 21L5 21L12 13L15 21Z" style="fill: var(--navigation-light-yellow-color)"/>
<path d="M19 3H9L12 11L19 3Z" style="fill: var(--navigation-light-yellow-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M15 21L12 13L5 21L15 21ZM13.557 20L11.651 14.9174L7.20377 20L13.557 20ZM9 3L12 11L19 3H9ZM10.443 4H16.7962L12.349 9.08258L10.443 4Z" style="fill: var(--element-active-color)"/>
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
    'obi-simplified-buoy-cardinal-west': ObiSimplifiedBuoyCardinalWest;
  }
}
