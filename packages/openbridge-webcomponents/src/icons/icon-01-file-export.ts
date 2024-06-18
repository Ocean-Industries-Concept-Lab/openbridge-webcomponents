import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-01-file-export')
export class Obi01FileExport extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M5 6L13 6V9H15V6C15 4.9 14.1 4 13 4H5C3.9 4 3 4.9 3 6V17.9998C3 19.0998 3.9 19.9998 5 19.9998H13C14.1 19.9998 15 19.0998 15 17.9998V14.9998H13V17.9998H5L5 6Z" fill="currentColor"/>
<path d="M18 7L16.59 8.41L19.17 11L11 11L11 13L19.17 13L16.59 15.59L18 17L23 12L18 7Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M5 6L13 6V9H15V6C15 4.9 14.1 4 13 4H5C3.9 4 3 4.9 3 6V17.9998C3 19.0998 3.9 19.9998 5 19.9998H13C14.1 19.9998 15 19.0998 15 17.9998V14.9998H13V17.9998H5L5 6Z" fill="currentColor"/>
<path d="M18 7L16.59 8.41L19.17 11L11 11L11 13L19.17 13L16.59 15.59L18 17L23 12L18 7Z" fill="currentColor"/>
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
    'obi-01-file-export': Obi01FileExport;
  }
}
