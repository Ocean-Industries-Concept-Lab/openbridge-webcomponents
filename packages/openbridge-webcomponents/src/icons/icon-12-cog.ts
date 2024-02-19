import {LitElement, html, css, svg, unsafeCSS} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-12-cog')
export class Obi12Cog extends LitElement {
  @property({type: Boolean, attribute: 'use-css-color'}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M12 18.0717L18.3689 20.4852L12 5.2L5.63122 20.4852L12 18.0717ZM12 0L21.1075 21.858C21.445 22.6678 20.6505 23.4886 19.8301 23.1777L12 20.2105L4.16999 23.1777C3.34964 23.4886 2.55514 22.6678 2.89256 21.858L12 0Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M12 18.0717L18.3689 20.4852L12 5.2L5.63122 20.4852L12 18.0717ZM12 0L21.1075 21.858C21.445 22.6678 20.6505 23.4886 19.8301 23.1777L12 20.2105L4.16999 23.1777C3.34964 23.4886 2.55514 22.6678 2.89256 21.858L12 0Z" style="fill: var(--element-active-color)"/>
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
    }
    .wrapper > * {
      height: 100%;
      width: 100%;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    'obi-12-cog': Obi12Cog;
  }
}
