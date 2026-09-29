import {LitElement, html, css, svg} from 'lit';
import {property} from 'lit/decorators.js';
import {customElement} from '../decorator.js';

@customElement('obi-com-call-end-google')
export class ObiComCallEndGoogle extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M12 9.07007C10.4 9.07007 8.85 9.32007 7.4 9.79007V12.8901C7.4 13.2801 7.17 13.6301 6.84 13.7901C5.86 14.2801 4.97 14.9101 4.18 15.6401C4 15.8201 3.75 15.9201 3.48 15.9201C3.2 15.9201 2.95 15.8101 2.77 15.6301L0.29 13.1501C0.11 12.9801 0 12.7301 0 12.4501C0 12.1701 0.11 11.9201 0.29 11.7401C3.34 8.85007 7.46 7.07007 12 7.07007C16.54 7.07007 20.66 8.85007 23.71 11.7401C23.89 11.9201 24 12.1701 24 12.4501C24 12.7301 23.89 12.9801 23.71 13.1601L21.23 15.6401C21.05 15.8201 20.8 15.9301 20.52 15.9301C20.25 15.9301 20 15.8201 19.82 15.6501C19.03 14.9101 18.13 14.2901 17.15 13.8001C16.82 13.6401 16.59 13.3001 16.59 12.9001V9.80007C15.15 9.32007 13.6 9.07007 12 9.07007Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12 9.07007C10.4 9.07007 8.85 9.32007 7.4 9.79007V12.8901C7.4 13.2801 7.17 13.6301 6.84 13.7901C5.86 14.2801 4.97 14.9101 4.18 15.6401C4 15.8201 3.75 15.9201 3.48 15.9201C3.2 15.9201 2.95 15.8101 2.77 15.6301L0.29 13.1501C0.11 12.9801 0 12.7301 0 12.4501C0 12.1701 0.11 11.9201 0.29 11.7401C3.34 8.85007 7.46 7.07007 12 7.07007C16.54 7.07007 20.66 8.85007 23.71 11.7401C23.89 11.9201 24 12.1701 24 12.4501C24 12.7301 23.89 12.9801 23.71 13.1601L21.23 15.6401C21.05 15.8201 20.8 15.9301 20.52 15.9301C20.25 15.9301 20 15.8201 19.82 15.6501C19.03 14.9101 18.13 14.2901 17.15 13.8001C16.82 13.6401 16.59 13.3001 16.59 12.9001V9.80007C15.15 9.32007 13.6 9.07007 12 9.07007Z" style="fill: var(--element-active-color)"/>
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
