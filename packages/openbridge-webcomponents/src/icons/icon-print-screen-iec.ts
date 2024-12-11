import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-print-screen-iec')
export class ObiPrintScreenIec extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M12 9.5C13.65 9.5 15 10.85 15 12.5C15 14.15 13.65 15.5 12 15.5C10.35 15.5 9 14.15 9 12.5C9 10.85 10.35 9.5 12 9.5Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M15 3H9L7.17 5H4C2.9 5 2 5.9 2 7V19C2 20.1 2.9 21 4 21H20C21.1 21 22 20.1 22 19V7C22 5.9 21.1 5 20 5H16.83L15 3ZM12 7.5C9.24 7.5 7 9.74 7 12.5C7 15.26 9.24 17.5 12 17.5C14.76 17.5 17 15.26 17 12.5C17 9.74 14.76 7.5 12 7.5ZM12 9.5C13.65 9.5 15 10.85 15 12.5C15 14.15 13.65 15.5 12 15.5C10.35 15.5 9 14.15 9 12.5C9 10.85 10.35 9.5 12 9.5Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12 9.5C13.65 9.5 15 10.85 15 12.5C15 14.15 13.65 15.5 12 15.5C10.35 15.5 9 14.15 9 12.5C9 10.85 10.35 9.5 12 9.5Z" style="fill: var(--element-active-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M15 3H9L7.17 5H4C2.9 5 2 5.9 2 7V19C2 20.1 2.9 21 4 21H20C21.1 21 22 20.1 22 19V7C22 5.9 21.1 5 20 5H16.83L15 3ZM12 7.5C9.24 7.5 7 9.74 7 12.5C7 15.26 9.24 17.5 12 17.5C14.76 17.5 17 15.26 17 12.5C17 9.74 14.76 7.5 12 7.5ZM12 9.5C13.65 9.5 15 10.85 15 12.5C15 14.15 13.65 15.5 12 15.5C10.35 15.5 9 14.15 9 12.5C9 10.85 10.35 9.5 12 9.5Z" style="fill: var(--element-active-color)"/>
</svg>
`;

  override render() {
    return html`
      <div class="wrapper" >
        ${this.useCssColor? this.iconCss : this.icon}
      </div>
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
    'obi-print-screen-iec': ObiPrintScreenIec;
  }
}