import {LitElement, html, css, svg} from 'lit';
import {property} from 'lit/decorators.js';
import {customElement} from '../decorator.js';

@customElement('obi-hdg')
export class ObiHdg extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M11.5333 1.31064C11.7018 0.896454 12.2982 0.896453 12.4667 1.31064L19.9243 19.6401C20.2835 20.5228 19.2919 21.3463 18.4667 20.8505L12 17L5.53327 20.8505C4.70814 21.3463 3.71651 20.5228 4.07565 19.6401L11.5333 1.31064Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M11.5333 1.31064C11.7018 0.896454 12.2982 0.896453 12.4667 1.31064L19.9243 19.6401C20.2835 20.5228 19.2919 21.3463 18.4667 20.8505L12 17L5.53327 20.8505C4.70814 21.3463 3.71651 20.5228 4.07565 19.6401L11.5333 1.31064Z" style="fill: var(--element-active-color)"/>
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
    'obi-hdg': ObiHdg;
  }
}
