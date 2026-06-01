import {LitElement, html, css, svg} from 'lit';
import {property} from 'lit/decorators.js';
import {customElement} from '../decorator.js';

@customElement('obi-wind-apparent-11')
export class ObiWindApparent11 extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M18.9996 0C19.4138 0 19.7496 0.335786 19.7496 0.75C19.7496 1.16421 19.4138 1.5 18.9996 1.5H12.9996V3H18.9996C19.4138 3 19.7496 3.33579 19.7496 3.75C19.7496 4.16421 19.4138 4.5 18.9996 4.5H12.9996V6H18.9996C19.4138 6 19.7496 6.33579 19.7496 6.75C19.7496 7.16421 19.4138 7.5 18.9996 7.5H12.9996V9H18.9996C19.4138 9 19.7496 9.33579 19.7496 9.75C19.7496 10.1642 19.4138 10.5 18.9996 10.5H12.9996V12H15.9996C16.4138 12 16.7496 12.3358 16.7496 12.75C16.7496 13.1642 16.4138 13.5 15.9996 13.5H12.9996V15H14.9976C15.7412 15 16.2259 15.7823 15.8932 16.4482L12.8951 22.4453C12.5261 23.1829 11.473 23.183 11.1041 22.4453L8.10604 16.4482C7.7737 15.7828 8.2579 15.0003 9.00155 15H10.9996V1C10.9996 0.447845 11.4475 0.000210999 11.9996 0H18.9996ZM11.9996 19.7637L13.3814 17H10.6178L11.9996 19.7637Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M18.9996 0C19.4138 0 19.7496 0.335786 19.7496 0.75C19.7496 1.16421 19.4138 1.5 18.9996 1.5H12.9996V3H18.9996C19.4138 3 19.7496 3.33579 19.7496 3.75C19.7496 4.16421 19.4138 4.5 18.9996 4.5H12.9996V6H18.9996C19.4138 6 19.7496 6.33579 19.7496 6.75C19.7496 7.16421 19.4138 7.5 18.9996 7.5H12.9996V9H18.9996C19.4138 9 19.7496 9.33579 19.7496 9.75C19.7496 10.1642 19.4138 10.5 18.9996 10.5H12.9996V12H15.9996C16.4138 12 16.7496 12.3358 16.7496 12.75C16.7496 13.1642 16.4138 13.5 15.9996 13.5H12.9996V15H14.9976C15.7412 15 16.2259 15.7823 15.8932 16.4482L12.8951 22.4453C12.5261 23.1829 11.473 23.183 11.1041 22.4453L8.10604 16.4482C7.7737 15.7828 8.2579 15.0003 9.00155 15H10.9996V1C10.9996 0.447845 11.4475 0.000210999 11.9996 0H18.9996ZM11.9996 19.7637L13.3814 17H10.6178L11.9996 19.7637Z" style="fill: var(--element-active-color)"/>
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
    'obi-wind-apparent-11': ObiWindApparent11;
  }
}
