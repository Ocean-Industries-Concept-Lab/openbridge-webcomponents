import {LitElement, html, css, svg} from 'lit';
import {property} from 'lit/decorators.js';
import {customElement} from '../decorator.js';

@customElement('obi-direction-left-static')
export class ObiDirectionLeftStatic extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M8.02637 10.6514L4.52637 8.65137L3.38672 8L4.52637 7.34863L8.02637 5.34863L9.14844 4.70801L9.14844 7.25L18.8984 7.25C19.3126 7.25 19.6484 7.5858 19.6484 8C19.6484 8.41421 19.3127 8.75 18.8984 8.75L9.14844 8.75L9.14844 11.292L8.02637 10.6514Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M8.02637 10.6514L4.52637 8.65137L3.38672 8L4.52637 7.34863L8.02637 5.34863L9.14844 4.70801L9.14844 7.25L18.8984 7.25C19.3126 7.25 19.6484 7.5858 19.6484 8C19.6484 8.41421 19.3127 8.75 18.8984 8.75L9.14844 8.75L9.14844 11.292L8.02637 10.6514Z" style="fill: var(--automation-symbol-static-background-color)"/>
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
    'obi-direction-left-static': ObiDirectionLeftStatic;
  }
}
