import {LitElement, html, css, svg} from 'lit';
import {property} from 'lit/decorators.js';
import {customElement} from '../decorator.js';

@customElement('obi-silence-iec')
export class ObiSilenceIec extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M4.5148 2.10051L3.10059 3.51473L7.58579 7.99993H4.60003C4.03998 7.99993 3.75995 7.99993 3.54604 8.10892C3.35788 8.20479 3.2049 8.35777 3.10902 8.54594C3.00003 8.75985 3.00003 9.03987 3.00003 9.59993V14.3999C3.00003 14.96 3.00003 15.24 3.10902 15.4539C3.2049 15.6421 3.35788 15.7951 3.54604 15.8909C3.75995 15.9999 4.03998 15.9999 4.60003 15.9999H11L16.6343 21.6342C17.0627 22.0626 17.2769 22.2768 17.4608 22.2913C17.6204 22.3038 17.7763 22.2393 17.8802 22.1175C18 21.9773 18 21.6744 18 21.0686V18.4142L20.4854 20.8995L21.8996 19.4853L4.5148 2.10051ZM5.00003 9.99993H9.58579L16 16.4142V18.1715L11.8285 13.9999H5.00003V9.99993Z" fill-rule="evenodd" clip-rule="evenodd" fill="currentColor"/>
<path d="M12.1214 6.8786L13.5356 8.29282L16 5.82835V10.7573L18 12.7573V2.9313C18 2.32548 18 2.02257 17.8802 1.88231C17.7763 1.76061 17.6204 1.69602 17.4608 1.70858C17.2769 1.72305 17.0627 1.93724 16.6343 2.36561L12.1214 6.8786Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M4.5148 2.10051L3.10059 3.51473L7.58579 7.99993H4.60003C4.03998 7.99993 3.75995 7.99993 3.54604 8.10892C3.35788 8.20479 3.2049 8.35777 3.10902 8.54594C3.00003 8.75985 3.00003 9.03987 3.00003 9.59993V14.3999C3.00003 14.96 3.00003 15.24 3.10902 15.4539C3.2049 15.6421 3.35788 15.7951 3.54604 15.8909C3.75995 15.9999 4.03998 15.9999 4.60003 15.9999H11L16.6343 21.6342C17.0627 22.0626 17.2769 22.2768 17.4608 22.2913C17.6204 22.3038 17.7763 22.2393 17.8802 22.1175C18 21.9773 18 21.6744 18 21.0686V18.4142L20.4854 20.8995L21.8996 19.4853L4.5148 2.10051ZM5.00003 9.99993H9.58579L16 16.4142V18.1715L11.8285 13.9999H5.00003V9.99993Z" fill-rule="evenodd" clip-rule="evenodd" style="fill: var(--element-active-color)"/>
<path d="M12.1214 6.8786L13.5356 8.29282L16 5.82835V10.7573L18 12.7573V2.9313C18 2.32548 18 2.02257 17.8802 1.88231C17.7763 1.76061 17.6204 1.69602 17.4608 1.70858C17.2769 1.72305 17.0627 1.93724 16.6343 2.36561L12.1214 6.8786Z" style="fill: var(--element-active-color)"/>
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
    'obi-silence-iec': ObiSilenceIec;
  }
}
