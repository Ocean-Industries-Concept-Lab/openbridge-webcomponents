import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-12-hdg')
export class Obi12Hdg extends LitElement {
  @property({type: Boolean, attribute: 'use-css-color'}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M12 0L7.44629 10.929L2.89256 21.858C2.55514 22.6678 3.34964 23.4886 4.16999 23.1777L12 20.2105L19.8301 23.1777C20.6505 23.4886 21.445 22.6678 21.1075 21.858L12 0Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12 0L7.44629 10.929L2.89256 21.858C2.55514 22.6678 3.34964 23.4886 4.16999 23.1777L12 20.2105L19.8301 23.1777C20.6505 23.4886 21.445 22.6678 21.1075 21.858L12 0Z" style="fill: var(--element-active-color)"/>
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
    'obi-12-hdg': Obi12Hdg;
  }
}
