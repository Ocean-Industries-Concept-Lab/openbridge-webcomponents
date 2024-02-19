import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-11-current-3')
export class Obi11Current3 extends LitElement {
  @property({type: Boolean, attribute: 'use-css-color'}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M5.99998 11H1.62062e-05L0 13H5.99997L5.99998 11Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M18.7929 6.79297L24 12.0001L18.7929 17.2072L17.3787 15.793L21.1716 12.0001L17.3787 8.20718L18.7929 6.79297Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M13.4142 7L18.6213 12.2071L13.4142 17.4142L12 16L15.7929 12.2071L12 8.41421L13.4142 7Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M7.41423 7L12.6213 12.2071L7.41423 17.4142L6.00002 16L9.79291 12.2071L6.00002 8.41421L7.41423 7Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M5.99998 11H1.62062e-05L0 13H5.99997L5.99998 11Z" style="fill: var(--element-active-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M18.7929 6.79297L24 12.0001L18.7929 17.2072L17.3787 15.793L21.1716 12.0001L17.3787 8.20718L18.7929 6.79297Z" style="fill: var(--element-active-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M13.4142 7L18.6213 12.2071L13.4142 17.4142L12 16L15.7929 12.2071L12 8.41421L13.4142 7Z" style="fill: var(--element-active-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M7.41423 7L12.6213 12.2071L7.41423 17.4142L6.00002 16L9.79291 12.2071L6.00002 8.41421L7.41423 7Z" style="fill: var(--element-active-color)"/>
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
    'obi-11-current-3': Obi11Current3;
  }
}
