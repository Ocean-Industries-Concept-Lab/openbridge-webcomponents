import {LitElement, html, css, svg} from 'lit';
import {property} from 'lit/decorators.js';
import {customElement} from '../decorator.js';

@customElement('obi-direction-right-on')
export class ObiDirectionRightOn extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M15.8721 5.34863L19.3721 7.34863L20.5117 8L19.3721 8.65137L15.8721 10.6514L14.75 11.292L14.75 8.75L5 8.75C4.58579 8.75 4.25001 8.4142 4.25 8C4.25 7.58579 4.58579 7.25 5 7.25L14.75 7.25V4.70801L15.8721 5.34863Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M15.8721 5.34863L19.3721 7.34863L20.5117 8L19.3721 8.65137L15.8721 10.6514L14.75 11.292L14.75 8.75L5 8.75C4.58579 8.75 4.25001 8.4142 4.25 8C4.25 7.58579 4.58579 7.25 5 7.25L14.75 7.25V4.70801L15.8721 5.34863Z" style="fill: var(--on-line-color)"/>
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
    'obi-direction-right-on': ObiDirectionRightOn;
  }
}
