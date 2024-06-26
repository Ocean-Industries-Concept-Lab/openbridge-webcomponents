import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-04-day')
export class Obi04Day extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M11 1V5H13V1H11Z" fill="currentColor"/>
<path d="M16.275 6.375L17.65 7.75L20.475 4.925L19.075 3.5L16.275 6.375Z" fill="currentColor"/>
<path d="M23 11H19V13H23V11Z" fill="currentColor"/>
<path d="M3.5 4.925L6.35 7.7L7.75 6.35L4.925 3.525L3.5 4.925Z" fill="currentColor"/>
<path d="M16.275 17.625L19.05 20.5L20.475 19.025L17.625 16.275L16.275 17.625Z" fill="currentColor"/>
<path d="M1 11V13H5V11H1Z" fill="currentColor"/>
<path d="M15.181 15.8578C16.2919 14.9407 17 13.553 17 12C17 9.23858 14.7614 7 12 7C9.23858 7 7 9.23858 7 12C7 12.0263 7.0002 12.0526 7.00061 12.0788C7.32498 12.0264 7.65844 12 8 12C9.18415 12 10.2973 12.3277 11.2938 12.9672C12.124 13.5004 12.7776 14.2043 13.2371 15.0526C13.9448 15.1593 14.6027 15.4282 15.181 15.8578Z" fill="currentColor"/>
<path d="M5.175 15.175C5.82004 14.53 6.57245 14.1505 7.43222 14.0366C7.61655 14.0122 7.80581 14 8 14C8.8 14 9.53767 14.2167 10.213 14.65C10.8877 15.0833 11.375 15.675 11.675 16.425L11.925 17H12.525C13.225 17 13.8127 17.2417 14.288 17.725C14.7627 18.2083 15 18.8 15 19.5C15 20.2 14.7583 20.7917 14.275 21.275C13.7917 21.7583 13.2 22 12.5 22H8C6.9 22 5.95833 21.6083 5.175 20.825C4.39167 20.0417 4 19.1 4 18C4 16.9 4.39167 15.9583 5.175 15.175Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M11 1V5H13V1H11Z" fill="currentColor"/>
<path d="M16.275 6.375L17.65 7.75L20.475 4.925L19.075 3.5L16.275 6.375Z" fill="currentColor"/>
<path d="M23 11H19V13H23V11Z" fill="currentColor"/>
<path d="M3.5 4.925L6.35 7.7L7.75 6.35L4.925 3.525L3.5 4.925Z" fill="currentColor"/>
<path d="M16.275 17.625L19.05 20.5L20.475 19.025L17.625 16.275L16.275 17.625Z" fill="currentColor"/>
<path d="M1 11V13H5V11H1Z" fill="currentColor"/>
<path d="M15.181 15.8578C16.2919 14.9407 17 13.553 17 12C17 9.23858 14.7614 7 12 7C9.23858 7 7 9.23858 7 12C7 12.0263 7.0002 12.0526 7.00061 12.0788C7.32498 12.0264 7.65844 12 8 12C9.18415 12 10.2973 12.3277 11.2938 12.9672C12.124 13.5004 12.7776 14.2043 13.2371 15.0526C13.9448 15.1593 14.6027 15.4282 15.181 15.8578Z" fill="currentColor"/>
<path d="M5.175 15.175C5.82004 14.53 6.57245 14.1505 7.43222 14.0366C7.61655 14.0122 7.80581 14 8 14C8.8 14 9.53767 14.2167 10.213 14.65C10.8877 15.0833 11.375 15.675 11.675 16.425L11.925 17H12.525C13.225 17 13.8127 17.2417 14.288 17.725C14.7627 18.2083 15 18.8 15 19.5C15 20.2 14.7583 20.7917 14.275 21.275C13.7917 21.7583 13.2 22 12.5 22H8C6.9 22 5.95833 21.6083 5.175 20.825C4.39167 20.0417 4 19.1 4 18C4 16.9 4.39167 15.9583 5.175 15.175Z" fill="currentColor"/>
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
    'obi-04-day': Obi04Day;
  }
}
