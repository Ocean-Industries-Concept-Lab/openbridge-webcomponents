import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-com-call-end-google')
export class ObiComCallEndGoogle extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M12 9.06995C10.4 9.06995 8.85 9.31995 7.4 9.78995V12.8899C7.4 13.2799 7.17 13.6299 6.84 13.7899C5.86 14.2799 4.97 14.9099 4.18 15.6399C4 15.8199 3.75 15.9199 3.48 15.9199C3.2 15.9199 2.95 15.8099 2.77 15.6299L0.29 13.1499C0.11 12.9799 0 12.7299 0 12.4499C0 12.1699 0.11 11.9199 0.29 11.7399C3.34 8.84995 7.46 7.06995 12 7.06995C16.54 7.06995 20.66 8.84995 23.71 11.7399C23.89 11.9199 24 12.1699 24 12.4499C24 12.7299 23.89 12.9799 23.71 13.1599L21.23 15.6399C21.05 15.8199 20.8 15.9299 20.52 15.9299C20.25 15.9299 20 15.8199 19.82 15.6499C19.03 14.9099 18.13 14.2899 17.15 13.7999C16.82 13.6399 16.59 13.2999 16.59 12.8999V9.79995C15.15 9.31995 13.6 9.06995 12 9.06995Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12 9.06995C10.4 9.06995 8.85 9.31995 7.4 9.78995V12.8899C7.4 13.2799 7.17 13.6299 6.84 13.7899C5.86 14.2799 4.97 14.9099 4.18 15.6399C4 15.8199 3.75 15.9199 3.48 15.9199C3.2 15.9199 2.95 15.8099 2.77 15.6299L0.29 13.1499C0.11 12.9799 0 12.7299 0 12.4499C0 12.1699 0.11 11.9199 0.29 11.7399C3.34 8.84995 7.46 7.06995 12 7.06995C16.54 7.06995 20.66 8.84995 23.71 11.7399C23.89 11.9199 24 12.1699 24 12.4499C24 12.7299 23.89 12.9799 23.71 13.1599L21.23 15.6399C21.05 15.8199 20.8 15.9299 20.52 15.9299C20.25 15.9299 20 15.8199 19.82 15.6499C19.03 14.9099 18.13 14.2899 17.15 13.7999C16.82 13.6399 16.59 13.2999 16.59 12.8999V9.79995C15.15 9.31995 13.6 9.06995 12 9.06995Z" style="fill: var(--element-active-color)"/>
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
