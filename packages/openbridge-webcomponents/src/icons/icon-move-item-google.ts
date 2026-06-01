import {LitElement, html, css, svg} from 'lit';
import {property} from 'lit/decorators.js';
import {customElement} from '../decorator.js';

@customElement('obi-move-item-google')
export class ObiMoveItemGoogle extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M5 5L13 5V9H15V5C15 3.9 14.1 3 13 3H5C3.9 3 3 3.9 3 5V18.9998C3 20.0998 3.9 20.9998 5 20.9998H13C14.1 20.9998 15 20.0998 15 18.9998V14.9998H13V18.9998H5L5 5Z" fill="currentColor"/>
<path d="M18 7L16.59 8.41L19.17 11L10 11V13L19.17 13L16.59 15.59L18 17L23 12L18 7Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M5 5L13 5V9H15V5C15 3.9 14.1 3 13 3H5C3.9 3 3 3.9 3 5V18.9998C3 20.0998 3.9 20.9998 5 20.9998H13C14.1 20.9998 15 20.0998 15 18.9998V14.9998H13V18.9998H5L5 5Z" style="fill: var(--element-active-color)"/>
<path d="M18 7L16.59 8.41L19.17 11L10 11V13L19.17 13L16.59 15.59L18 17L23 12L18 7Z" style="fill: var(--element-active-color)"/>
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
    'obi-move-item-google': ObiMoveItemGoogle;
  }
}
