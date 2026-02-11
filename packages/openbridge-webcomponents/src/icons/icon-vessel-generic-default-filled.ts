import {LitElement, html, css, svg} from 'lit';
import {property} from 'lit/decorators.js';
import {customElement} from '../decorator.js';

@customElement('obi-vessel-generic-default-filled')
export class ObiVesselGenericDefaultFilled extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M11.5333 2.31064C11.7018 1.89645 12.2982 1.89645 12.4667 2.31064L19.9243 20.6401C20.2835 21.5228 19.2919 22.3463 18.4667 21.8505L12 18L5.53327 21.8505C4.70814 22.3463 3.71651 21.5228 4.07565 20.6401L11.5333 2.31064Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M11.5333 2.31064C11.7018 1.89645 12.2982 1.89645 12.4667 2.31064L19.9243 20.6401C20.2835 21.5228 19.2919 22.3463 18.4667 21.8505L12 18L5.53327 21.8505C4.70814 22.3463 3.71651 21.5228 4.07565 20.6401L11.5333 2.31064Z" style="fill: var(--element-active-inverted-color)"/>
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
    'obi-vessel-generic-default-filled': ObiVesselGenericDefaultFilled;
  }
}
