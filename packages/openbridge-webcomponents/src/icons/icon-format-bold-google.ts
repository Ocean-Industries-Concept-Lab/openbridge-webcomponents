import {LitElement, html, css, svg} from 'lit';
import {property} from 'lit/decorators.js';
import {customElement} from '../decorator.js';

@customElement('obi-format-bold-google')
export class ObiFormatBoldGoogle extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M6.80005 19V5H12.325C13.4084 5 14.4084 5.33333 15.325 6C16.2417 6.66667 16.7 7.59167 16.7 8.775C16.7 9.625 16.5084 10.2792 16.125 10.7375C15.7417 11.1958 15.3834 11.525 15.05 11.725C15.4667 11.9083 15.9292 12.25 16.4375 12.75C16.9459 13.25 17.2 14 17.2 15C17.2 16.4833 16.6584 17.5208 15.575 18.1125C14.4917 18.7042 13.475 19 12.525 19H6.80005ZM9.82505 16.2H12.425C13.225 16.2 13.7125 15.9958 13.8875 15.5875C14.0625 15.1792 14.15 14.8833 14.15 14.7C14.15 14.5167 14.0625 14.2208 13.8875 13.8125C13.7125 13.4042 13.2 13.2 12.35 13.2H9.82505V16.2ZM9.82505 10.5H12.15C12.7 10.5 13.1 10.3583 13.35 10.075C13.6 9.79167 13.725 9.475 13.725 9.125C13.725 8.725 13.5834 8.4 13.3 8.15C13.0167 7.9 12.65 7.775 12.2 7.775H9.82505V10.5Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M6.80005 19V5H12.325C13.4084 5 14.4084 5.33333 15.325 6C16.2417 6.66667 16.7 7.59167 16.7 8.775C16.7 9.625 16.5084 10.2792 16.125 10.7375C15.7417 11.1958 15.3834 11.525 15.05 11.725C15.4667 11.9083 15.9292 12.25 16.4375 12.75C16.9459 13.25 17.2 14 17.2 15C17.2 16.4833 16.6584 17.5208 15.575 18.1125C14.4917 18.7042 13.475 19 12.525 19H6.80005ZM9.82505 16.2H12.425C13.225 16.2 13.7125 15.9958 13.8875 15.5875C14.0625 15.1792 14.15 14.8833 14.15 14.7C14.15 14.5167 14.0625 14.2208 13.8875 13.8125C13.7125 13.4042 13.2 13.2 12.35 13.2H9.82505V16.2ZM9.82505 10.5H12.15C12.7 10.5 13.1 10.3583 13.35 10.075C13.6 9.79167 13.725 9.475 13.725 9.125C13.725 8.725 13.5834 8.4 13.3 8.15C13.0167 7.9 12.65 7.775 12.2 7.775H9.82505V10.5Z" style="fill: var(--element-active-color)"/>
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
    'obi-format-bold-google': ObiFormatBoldGoogle;
  }
}
