import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-silence-iec')
export class ObiSilenceIec extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M4.51477 2.10051L3.10056 3.51473L7.58576 7.99993H4.6C4.03995 7.99993 3.75992 7.99993 3.54601 8.10892C3.35785 8.20479 3.20487 8.35777 3.10899 8.54594C3 8.75985 3 9.03987 3 9.59993V14.3999C3 14.96 3 15.24 3.10899 15.4539C3.20487 15.6421 3.35785 15.7951 3.54601 15.8909C3.75992 15.9999 4.03995 15.9999 4.6 15.9999H11L16.6343 21.6342C17.0627 22.0626 17.2769 22.2768 17.4608 22.2913C17.6203 22.3038 17.7763 22.2393 17.8802 22.1175C18 21.9773 18 21.6744 18 21.0686V18.4142L20.4853 20.8995L21.8995 19.4853L4.51477 2.10051ZM5 9.99993H9.58576L16 16.4142V18.1715L11.8284 13.9999H5V9.99993Z" fill="currentColor"/>
<path d="M12.1213 6.8786L13.5355 8.29282L16 5.82835V10.7573L18 12.7573V2.9313C18 2.32548 18 2.02257 17.8802 1.88231C17.7763 1.76061 17.6203 1.69602 17.4608 1.70858C17.2769 1.72305 17.0627 1.93724 16.6343 2.36561L12.1213 6.8786Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M4.51477 2.10051L3.10056 3.51473L7.58576 7.99993H4.6C4.03995 7.99993 3.75992 7.99993 3.54601 8.10892C3.35785 8.20479 3.20487 8.35777 3.10899 8.54594C3 8.75985 3 9.03987 3 9.59993V14.3999C3 14.96 3 15.24 3.10899 15.4539C3.20487 15.6421 3.35785 15.7951 3.54601 15.8909C3.75992 15.9999 4.03995 15.9999 4.6 15.9999H11L16.6343 21.6342C17.0627 22.0626 17.2769 22.2768 17.4608 22.2913C17.6203 22.3038 17.7763 22.2393 17.8802 22.1175C18 21.9773 18 21.6744 18 21.0686V18.4142L20.4853 20.8995L21.8995 19.4853L4.51477 2.10051ZM5 9.99993H9.58576L16 16.4142V18.1715L11.8284 13.9999H5V9.99993Z" style="fill: var(--element-active-color)"/>
<path d="M12.1213 6.8786L13.5355 8.29282L16 5.82835V10.7573L18 12.7573V2.9313C18 2.32548 18 2.02257 17.8802 1.88231C17.7763 1.76061 17.6203 1.69602 17.4608 1.70858C17.2769 1.72305 17.0627 1.93724 16.6343 2.36561L12.1213 6.8786Z" style="fill: var(--element-active-color)"/>
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
