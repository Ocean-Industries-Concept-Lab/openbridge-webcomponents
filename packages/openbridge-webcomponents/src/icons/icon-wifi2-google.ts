import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-wifi2-google')
export class ObiWifi2Google extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M1 8.77626L3 10.7763C7.97 5.80626 16.03 5.80626 21 10.7763L23 8.77626C16.93 2.70625 7.08 2.70625 1 8.77626ZM9 16.7763L12 19.7763L15 16.7763C13.35 15.1163 10.66 15.1163 9 16.7763ZM7 14.7763L5 12.7763C8.87 8.91626 15.14 8.91626 19 12.7763L17 14.7763C14.24 12.0163 9.76 12.0163 7 14.7763Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M1 8.77626L3 10.7763C7.97 5.80626 16.03 5.80626 21 10.7763L23 8.77626C16.93 2.70625 7.08 2.70625 1 8.77626ZM9 16.7763L12 19.7763L15 16.7763C13.35 15.1163 10.66 15.1163 9 16.7763ZM7 14.7763L5 12.7763C8.87 8.91626 15.14 8.91626 19 12.7763L17 14.7763C14.24 12.0163 9.76 12.0163 7 14.7763Z" style="fill: var(--element-active-color)"/>
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
    'obi-wifi2-google': ObiWifi2Google;
  }
}
