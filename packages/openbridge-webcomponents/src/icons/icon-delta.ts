import {LitElement, html, css, svg} from 'lit';
import {property} from 'lit/decorators.js';
import {customElement} from '../decorator.js';

@customElement('obi-delta')
export class ObiDelta extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M20.2768 19.5526C20.6093 20.2175 20.1258 20.9998 19.3824 20.9998H4.61848C3.8751 20.9998 3.3916 20.2175 3.72405 19.5526L11.106 4.78863C11.1521 4.69649 11.2088 4.61588 11.2736 4.54678C11.7268 4.06309 12.5724 4.14371 12.8949 4.78863L20.2768 19.5526ZM11.4421 8.58867L6.23651 18.9998H16.6476L11.4421 8.58867Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M20.2768 19.5526C20.6093 20.2175 20.1258 20.9998 19.3824 20.9998H4.61848C3.8751 20.9998 3.3916 20.2175 3.72405 19.5526L11.106 4.78863C11.1521 4.69649 11.2088 4.61588 11.2736 4.54678C11.7268 4.06309 12.5724 4.14371 12.8949 4.78863L20.2768 19.5526ZM11.4421 8.58867L6.23651 18.9998H16.6476L11.4421 8.58867Z" style="fill: var(--element-active-color)"/>
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
    'obi-delta': ObiDelta;
  }
}
