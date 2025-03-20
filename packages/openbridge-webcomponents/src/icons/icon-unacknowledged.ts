import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-unacknowledged')
export class ObiUnacknowledged extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M4.60003 7.99993C4.03998 7.99993 3.75995 7.99993 3.54604 8.10892C3.35788 8.20479 3.2049 8.35778 3.10902 8.54594C3.00003 8.75985 3.00003 9.03988 3.00003 9.59993V14.3999C3.00003 14.96 3.00003 15.24 3.10902 15.4539C3.2049 15.6421 3.35788 15.7951 3.54604 15.8909C3.75995 15.9999 4.03998 15.9999 4.60003 15.9999H11L16.6343 21.6342C17.0627 22.0626 17.2769 22.2768 17.4608 22.2913C17.6204 22.3038 17.7763 22.2393 17.8802 22.1175C18 21.9773 18 21.6744 18 21.0686V2.9313C18 2.32548 18 2.02257 17.8802 1.88231C17.7763 1.76061 17.6204 1.69602 17.4608 1.70858C17.2769 1.72305 17.0627 1.93724 16.6343 2.36561L11 7.99993H4.60003ZM16 18.1715L11.8285 13.9999H5.00003V9.99993H11.8285L16 5.82835V18.1715Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M4.60003 7.99993C4.03998 7.99993 3.75995 7.99993 3.54604 8.10892C3.35788 8.20479 3.2049 8.35778 3.10902 8.54594C3.00003 8.75985 3.00003 9.03988 3.00003 9.59993V14.3999C3.00003 14.96 3.00003 15.24 3.10902 15.4539C3.2049 15.6421 3.35788 15.7951 3.54604 15.8909C3.75995 15.9999 4.03998 15.9999 4.60003 15.9999H11L16.6343 21.6342C17.0627 22.0626 17.2769 22.2768 17.4608 22.2913C17.6204 22.3038 17.7763 22.2393 17.8802 22.1175C18 21.9773 18 21.6744 18 21.0686V2.9313C18 2.32548 18 2.02257 17.8802 1.88231C17.7763 1.76061 17.6204 1.69602 17.4608 1.70858C17.2769 1.72305 17.0627 1.93724 16.6343 2.36561L11 7.99993H4.60003ZM16 18.1715L11.8285 13.9999H5.00003V9.99993H11.8285L16 5.82835V18.1715Z" style="fill: var(--element-active-color)"/>
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
    'obi-unacknowledged': ObiUnacknowledged;
  }
}
