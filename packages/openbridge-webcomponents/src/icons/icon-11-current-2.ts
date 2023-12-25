import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-11-current-2')
export class Obi11Current2 extends LitElement {
  @property({type: Number}) size = 24;
  @property({type: Boolean, attribute: 'use-css-color'}) useCssColor = false;

  private icon = svg`<svg width="25" height="24" viewBox="0 0 25 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M12.0046 10.9743H3.24249e-05L0 13H12.0046L12.0046 10.9743Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M18.7975 6.79297L24.0046 12.0001L18.7975 17.2072L17.3833 15.793L21.1762 12.0001L17.3833 8.20718L18.7975 6.79297Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M13.4188 7L18.6259 12.2071L13.4188 17.4142L12.0046 16L15.7975 12.2071L12.0046 8.41421L13.4188 7Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12.0046 10.9743H3.24249e-05L0 13H12.0046L12.0046 10.9743Z" style="fill: var(--element-active-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M18.7975 6.79297L24.0046 12.0001L18.7975 17.2072L17.3833 15.793L21.1762 12.0001L17.3833 8.20718L18.7975 6.79297Z" style="fill: var(--element-active-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M13.4188 7L18.6259 12.2071L13.4188 17.4142L12.0046 16L15.7975 12.2071L12.0046 8.41421L13.4188 7Z" style="fill: var(--element-active-color)"/>
</svg>
`;

  override render() {
    return html`
      <div class="wrapper" style="--size:${this.size}px">
        ${this.useCssColor ? this.iconCss : this.icon}
      </div>
    `;
  }

  static override styles = css`
    .wrapper {
      height: var(--size);
      width: var(--size);
    }
    .wrapper > * {
      height: 100%;
      width: 100%;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    'obi-11-current-2': Obi11Current2;
  }
}
