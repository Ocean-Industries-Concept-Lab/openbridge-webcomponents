import {LitElement, html, css, svg} from 'lit';
import {property} from 'lit/decorators.js';
import {customElement} from '../decorator.js';

@customElement('obi-sign-arrow-up-left')
export class ObiSignArrowUpLeft extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M8.92871 20.2433L4.92871 16.2433L4.92871 4.92969L16.2426 4.92969L20.2425 8.92969H11.7571L19.778 16.9505L16.9495 19.7789L8.92871 11.7581L8.92871 20.2433Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M8.92871 20.2433L4.92871 16.2433L4.92871 4.92969L16.2426 4.92969L20.2425 8.92969H11.7571L19.778 16.9505L16.9495 19.7789L8.92871 11.7581L8.92871 20.2433Z" style="fill: var(--element-active-color)"/>
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
    'obi-sign-arrow-up-left': ObiSignArrowUpLeft;
  }
}
