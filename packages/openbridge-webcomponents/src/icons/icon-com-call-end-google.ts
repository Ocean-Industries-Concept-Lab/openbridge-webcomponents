import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-com-call-end-google')
export class ObiComCallEndGoogle extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M12 9.07001C10.4 9.07001 8.85 9.32001 7.4 9.79001V12.89C7.4 13.28 7.17 13.63 6.84 13.79C5.86 14.28 4.97 14.91 4.18 15.64C4 15.82 3.75 15.92 3.48 15.92C3.2 15.92 2.95 15.81 2.77 15.63L0.29 13.15C0.11 12.98 0 12.73 0 12.45C0 12.17 0.11 11.92 0.29 11.74C3.34 8.85001 7.46 7.07001 12 7.07001C16.54 7.07001 20.66 8.85001 23.71 11.74C23.89 11.92 24 12.17 24 12.45C24 12.73 23.89 12.98 23.71 13.16L21.23 15.64C21.05 15.82 20.8 15.93 20.52 15.93C20.25 15.93 20 15.82 19.82 15.65C19.03 14.91 18.13 14.29 17.15 13.8C16.82 13.64 16.59 13.3 16.59 12.9V9.80001C15.15 9.32001 13.6 9.07001 12 9.07001Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12 9.07001C10.4 9.07001 8.85 9.32001 7.4 9.79001V12.89C7.4 13.28 7.17 13.63 6.84 13.79C5.86 14.28 4.97 14.91 4.18 15.64C4 15.82 3.75 15.92 3.48 15.92C3.2 15.92 2.95 15.81 2.77 15.63L0.29 13.15C0.11 12.98 0 12.73 0 12.45C0 12.17 0.11 11.92 0.29 11.74C3.34 8.85001 7.46 7.07001 12 7.07001C16.54 7.07001 20.66 8.85001 23.71 11.74C23.89 11.92 24 12.17 24 12.45C24 12.73 23.89 12.98 23.71 13.16L21.23 15.64C21.05 15.82 20.8 15.93 20.52 15.93C20.25 15.93 20 15.82 19.82 15.65C19.03 14.91 18.13 14.29 17.15 13.8C16.82 13.64 16.59 13.3 16.59 12.9V9.80001C15.15 9.32001 13.6 9.07001 12 9.07001Z" style="fill: var(--element-active-color)"/>
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
    'obi-com-call-end-google': ObiComCallEndGoogle;
  }
}
