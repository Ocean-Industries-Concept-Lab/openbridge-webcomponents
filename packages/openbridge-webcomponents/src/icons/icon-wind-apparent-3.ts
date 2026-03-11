import {LitElement, html, css, svg} from 'lit';
import {property} from 'lit/decorators.js';
import {customElement} from '../decorator.js';

@customElement('obi-wind-apparent-3')
export class ObiWindApparent3 extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M11.9996 0C12.5519 0 12.9996 0.447715 12.9996 1V3.5H15.9996C16.5519 3.5 16.9996 3.94772 16.9996 4.5C16.9996 5.05228 16.5519 5.5 15.9996 5.5H12.9996V15H14.9976C15.7412 15 16.2259 15.7823 15.8932 16.4482L12.8951 22.4453C12.5261 23.1829 11.473 23.183 11.1041 22.4453L8.10604 16.4482C7.7737 15.7828 8.2579 15.0003 9.00155 15H10.9996V1C10.9996 0.447845 11.4475 0.000210999 11.9996 0ZM11.9996 19.7637L13.3814 17H10.6178L11.9996 19.7637Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M11.9996 0C12.5519 0 12.9996 0.447715 12.9996 1V3.5H15.9996C16.5519 3.5 16.9996 3.94772 16.9996 4.5C16.9996 5.05228 16.5519 5.5 15.9996 5.5H12.9996V15H14.9976C15.7412 15 16.2259 15.7823 15.8932 16.4482L12.8951 22.4453C12.5261 23.1829 11.473 23.183 11.1041 22.4453L8.10604 16.4482C7.7737 15.7828 8.2579 15.0003 9.00155 15H10.9996V1C10.9996 0.447845 11.4475 0.000210999 11.9996 0ZM11.9996 19.7637L13.3814 17H10.6178L11.9996 19.7637Z" style="fill: var(--element-active-color)"/>
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
    'obi-wind-apparent-3': ObiWindApparent3;
  }
}
