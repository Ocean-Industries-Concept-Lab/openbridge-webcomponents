import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-06-com')
export class Obi06Com extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M12 14.5C13.66 14.5 14.99 13.16 14.99 11.5L15 5.5C15 3.84 13.66 2.5 12 2.5C10.34 2.5 9 3.84 9 5.5V11.5C9 13.16 10.34 14.5 12 14.5ZM10.7999 5.39998C10.7999 4.73998 11.3399 4.19998 11.9999 4.19998C12.6599 4.19998 13.1999 4.73998 13.1999 5.39998L13.1899 11.6C13.1899 12.26 12.6599 12.8 11.9999 12.8C11.3399 12.8 10.7999 12.26 10.7999 11.6V5.39998ZM12 16.6C14.76 16.6 17.3 14.5 17.3 11.5H19C19 14.92 16.28 17.74 13 18.22V21.5H11V18.22C7.72 17.73 5 14.91 5 11.5H6.7C6.7 14.5 9.24 16.6 12 16.6Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M12 14.5C13.66 14.5 14.99 13.16 14.99 11.5L15 5.5C15 3.84 13.66 2.5 12 2.5C10.34 2.5 9 3.84 9 5.5V11.5C9 13.16 10.34 14.5 12 14.5ZM10.7999 5.39998C10.7999 4.73998 11.3399 4.19998 11.9999 4.19998C12.6599 4.19998 13.1999 4.73998 13.1999 5.39998L13.1899 11.6C13.1899 12.26 12.6599 12.8 11.9999 12.8C11.3399 12.8 10.7999 12.26 10.7999 11.6V5.39998ZM12 16.6C14.76 16.6 17.3 14.5 17.3 11.5H19C19 14.92 16.28 17.74 13 18.22V21.5H11V18.22C7.72 17.73 5 14.91 5 11.5H6.7C6.7 14.5 9.24 16.6 12 16.6Z" style="fill: var(--element-active-color)"/>
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
    'obi-06-com': Obi06Com;
  }
}
