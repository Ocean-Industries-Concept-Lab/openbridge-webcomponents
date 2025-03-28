import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-diagnostic-google')
export class ObiDiagnosticGoogle extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M19.88 17.47C20.32 16.77 20.58 15.96 20.58 15.08C20.58 12.59 18.57 10.58 16.08 10.58C13.59 10.58 11.58 12.59 11.58 15.08C11.58 17.57 13.59 19.58 16.07 19.58C16.95 19.58 17.77 19.32 18.46 18.88L21.58 22L23 20.58L19.88 17.47ZM16.08 17.58C14.7 17.58 13.58 16.46 13.58 15.08C13.58 13.7 14.7 12.58 16.08 12.58C17.46 12.58 18.58 13.7 18.58 15.08C18.58 16.46 17.46 17.58 16.08 17.58ZM15.72 9.08C14.98 9.1 14.27 9.26 13.62 9.53L13.07 8.7L9.27 14.88L6.26 11.36L2.63 17.17L1 16L6 8L9 11.5L13 5L15.72 9.08ZM18.31 9.58C17.67 9.3 16.98 9.13 16.26 9.09L21.38 1L23 2.18L18.31 9.58Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M19.88 17.47C20.32 16.77 20.58 15.96 20.58 15.08C20.58 12.59 18.57 10.58 16.08 10.58C13.59 10.58 11.58 12.59 11.58 15.08C11.58 17.57 13.59 19.58 16.07 19.58C16.95 19.58 17.77 19.32 18.46 18.88L21.58 22L23 20.58L19.88 17.47ZM16.08 17.58C14.7 17.58 13.58 16.46 13.58 15.08C13.58 13.7 14.7 12.58 16.08 12.58C17.46 12.58 18.58 13.7 18.58 15.08C18.58 16.46 17.46 17.58 16.08 17.58ZM15.72 9.08C14.98 9.1 14.27 9.26 13.62 9.53L13.07 8.7L9.27 14.88L6.26 11.36L2.63 17.17L1 16L6 8L9 11.5L13 5L15.72 9.08ZM18.31 9.58C17.67 9.3 16.98 9.13 16.26 9.09L21.38 1L23 2.18L18.31 9.58Z" style="fill: var(--element-active-color)"/>
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
    'obi-diagnostic-google': ObiDiagnosticGoogle;
  }
}
