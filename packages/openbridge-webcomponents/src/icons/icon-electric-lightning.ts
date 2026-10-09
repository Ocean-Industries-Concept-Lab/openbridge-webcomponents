import {LitElement, html, css, svg} from 'lit';
import {property} from 'lit/decorators.js';
import {customElement} from '../decorator.js';

@customElement('obi-electric-lightning')
export class ObiElectricLightning extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M7 22L11 14.5L3 13.5L15 2H17L13 9.5L21 10.5L9 22H7ZM12.55 15.825L16.575 11.975L9.85 11.125L11.425 8.2L7.425 12.05L14.125 12.875L12.55 15.825Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M7 22L11 14.5L3 13.5L15 2H17L13 9.5L21 10.5L9 22H7ZM12.55 15.825L16.575 11.975L9.85 11.125L11.425 8.2L7.425 12.05L14.125 12.875L12.55 15.825Z" style="fill: var(--element-active-color)"/>
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
    'obi-electric-lightning': ObiElectricLightning;
  }
}
