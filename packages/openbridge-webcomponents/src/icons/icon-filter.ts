import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-filter')
export class ObiFilter extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M20 19L13 19L13 21L11 21L11 15L13 15L13 17L20 17L20 19ZM9 19L4 19L4 17L9 17L9 19ZM9 15L7 15L7 13L4 13L4 11L7 11L7 9L9 9L9 15ZM20 13L11 13L11 11L20 11L20 13ZM20 7L17 7L17 9L15 9L15 3L17 3L17 5L20 5L20 7ZM13 7L4 7L4 5L13 5L13 7Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M20 19L13 19L13 21L11 21L11 15L13 15L13 17L20 17L20 19ZM9 19L4 19L4 17L9 17L9 19ZM9 15L7 15L7 13L4 13L4 11L7 11L7 9L9 9L9 15ZM20 13L11 13L11 11L20 11L20 13ZM20 7L17 7L17 9L15 9L15 3L17 3L17 5L20 5L20 7ZM13 7L4 7L4 5L13 5L13 7Z" style="fill: var(--element-active-color)"/>
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
    'obi-filter': ObiFilter;
  }
}
