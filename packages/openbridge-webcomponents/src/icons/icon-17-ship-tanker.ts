import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-17-ship-tanker')
export class Obi17ShipTanker extends LitElement {
  @property({type: Boolean, attribute: 'use-css-color'}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M7 9.9999V7H3V10H2V14.5709C2.07513 14.6239 2.15183 14.6753 2.2301 14.725C2.43459 14.6417 2.63424 14.554 2.82906 14.462C3.02463 14.3707 3.20606 14.2583 3.37337 14.125C3.59645 13.975 3.83811 13.9 4.09837 13.9C4.35863 13.9 4.60029 13.975 4.82337 14.125C5.19517 14.3917 5.60414 14.604 6.05029 14.762C6.49645 14.9207 6.96119 15 7.44452 15C7.92786 15 8.3926 14.9207 8.83876 14.762C9.28491 14.604 9.69388 14.3917 10.0657 14.125C10.2888 13.975 10.5304 13.9 10.7907 13.9C11.0509 13.9 11.2926 13.975 11.5157 14.125C11.8875 14.3917 12.2964 14.604 12.7426 14.762C13.1888 14.9207 13.6535 15 14.1368 15C14.6202 15 15.0849 14.9207 15.5311 14.762C15.9772 14.604 16.3862 14.3917 16.758 14.125C16.9811 13.975 17.2227 13.9 17.483 13.9C17.7432 13.9 17.9849 13.975 18.208 14.125C18.3753 14.2583 18.5564 14.3707 18.7512 14.462C18.8428 14.5051 18.9354 14.5473 19.0291 14.5885C19.1985 13.4306 20.5778 11.8494 21.3362 11.3481C21.9588 10.9365 22.5 10.5788 22.5 10L18 9.99997V8.5C18 8.22386 17.7761 8 17.5 8H14.5C14.2239 8 14 8.22386 14 8.5V9.99994L13 9.99994V8.5C13 8.22386 12.7761 8 12.5 8H9.5C9.22386 8 9 8.22386 9 8.5V9.99991L7 9.9999ZM6 8H4V10H6V8Z" fill="currentColor"/>
<path d="M18.8488 18.7986C19.3738 18.9329 19.9075 19 20.45 19C20.7475 19 20.9967 18.8971 21.1976 18.6914C21.3992 18.4864 21.5 18.2321 21.5 17.9286C21.5 17.625 21.3992 17.3707 21.1976 17.1657C20.9967 16.96 20.7475 16.8571 20.45 16.8571C19.995 16.8571 19.5442 16.7989 19.0976 16.6825C18.6517 16.5668 18.2275 16.3839 17.825 16.1339C17.6675 16.0446 17.4925 16 17.3 16C17.1075 16 16.9325 16.0446 16.775 16.1339C16.3725 16.3839 15.948 16.5668 15.5014 16.6825C15.0555 16.7989 14.605 16.8571 14.15 16.8571C13.695 16.8571 13.2442 16.7989 12.7976 16.6825C12.3517 16.5668 11.9275 16.3839 11.525 16.1339C11.3675 16.0446 11.188 16 10.9864 16C10.7855 16 10.615 16.0446 10.475 16.1339C10.0725 16.3839 9.64795 16.5668 9.20135 16.6825C8.75545 16.7989 8.305 16.8571 7.85 16.8571C7.395 16.8571 6.9442 16.7989 6.4976 16.6825C6.0517 16.5668 5.6275 16.3839 5.225 16.1339C5.085 16.0446 4.91 16 4.7 16C4.49 16 4.315 16.0446 4.175 16.1339C3.7725 16.3839 3.3483 16.5668 2.9024 16.6825C2.4558 16.7989 2.005 16.8571 1.55 16.8571C1.2525 16.8571 1.0033 16.96 0.802401 17.1657C0.600801 17.3707 0.5 17.625 0.5 17.9286C0.5 18.2321 0.600801 18.4864 0.802401 18.6914C1.0033 18.8971 1.2525 19 1.55 19C2.0925 19 2.62625 18.9329 3.15125 18.7986C3.67625 18.665 4.1925 18.4643 4.7 18.1964C5.2075 18.4643 5.72375 18.665 6.24875 18.7986C6.77375 18.9329 7.3075 19 7.85 19C8.3925 19 8.92625 18.9329 9.45125 18.7986C9.97625 18.665 10.4925 18.4643 11 18.1964C11.5075 18.4643 12.0238 18.665 12.5488 18.7986C13.0738 18.9329 13.6075 19 14.15 19C14.6925 19 15.2263 18.9329 15.7513 18.7986C16.2763 18.665 16.7925 18.4643 17.3 18.1964C17.8075 18.4643 18.3238 18.665 18.8488 18.7986Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M7 9.9999V7H3V10H2V14.5709C2.07513 14.6239 2.15183 14.6753 2.2301 14.725C2.43459 14.6417 2.63424 14.554 2.82906 14.462C3.02463 14.3707 3.20606 14.2583 3.37337 14.125C3.59645 13.975 3.83811 13.9 4.09837 13.9C4.35863 13.9 4.60029 13.975 4.82337 14.125C5.19517 14.3917 5.60414 14.604 6.05029 14.762C6.49645 14.9207 6.96119 15 7.44452 15C7.92786 15 8.3926 14.9207 8.83876 14.762C9.28491 14.604 9.69388 14.3917 10.0657 14.125C10.2888 13.975 10.5304 13.9 10.7907 13.9C11.0509 13.9 11.2926 13.975 11.5157 14.125C11.8875 14.3917 12.2964 14.604 12.7426 14.762C13.1888 14.9207 13.6535 15 14.1368 15C14.6202 15 15.0849 14.9207 15.5311 14.762C15.9772 14.604 16.3862 14.3917 16.758 14.125C16.9811 13.975 17.2227 13.9 17.483 13.9C17.7432 13.9 17.9849 13.975 18.208 14.125C18.3753 14.2583 18.5564 14.3707 18.7512 14.462C18.8428 14.5051 18.9354 14.5473 19.0291 14.5885C19.1985 13.4306 20.5778 11.8494 21.3362 11.3481C21.9588 10.9365 22.5 10.5788 22.5 10L18 9.99997V8.5C18 8.22386 17.7761 8 17.5 8H14.5C14.2239 8 14 8.22386 14 8.5V9.99994L13 9.99994V8.5C13 8.22386 12.7761 8 12.5 8H9.5C9.22386 8 9 8.22386 9 8.5V9.99991L7 9.9999ZM6 8H4V10H6V8Z" style="fill: var(--element-active-color)"/>
<path d="M18.8488 18.7986C19.3738 18.9329 19.9075 19 20.45 19C20.7475 19 20.9967 18.8971 21.1976 18.6914C21.3992 18.4864 21.5 18.2321 21.5 17.9286C21.5 17.625 21.3992 17.3707 21.1976 17.1657C20.9967 16.96 20.7475 16.8571 20.45 16.8571C19.995 16.8571 19.5442 16.7989 19.0976 16.6825C18.6517 16.5668 18.2275 16.3839 17.825 16.1339C17.6675 16.0446 17.4925 16 17.3 16C17.1075 16 16.9325 16.0446 16.775 16.1339C16.3725 16.3839 15.948 16.5668 15.5014 16.6825C15.0555 16.7989 14.605 16.8571 14.15 16.8571C13.695 16.8571 13.2442 16.7989 12.7976 16.6825C12.3517 16.5668 11.9275 16.3839 11.525 16.1339C11.3675 16.0446 11.188 16 10.9864 16C10.7855 16 10.615 16.0446 10.475 16.1339C10.0725 16.3839 9.64795 16.5668 9.20135 16.6825C8.75545 16.7989 8.305 16.8571 7.85 16.8571C7.395 16.8571 6.9442 16.7989 6.4976 16.6825C6.0517 16.5668 5.6275 16.3839 5.225 16.1339C5.085 16.0446 4.91 16 4.7 16C4.49 16 4.315 16.0446 4.175 16.1339C3.7725 16.3839 3.3483 16.5668 2.9024 16.6825C2.4558 16.7989 2.005 16.8571 1.55 16.8571C1.2525 16.8571 1.0033 16.96 0.802401 17.1657C0.600801 17.3707 0.5 17.625 0.5 17.9286C0.5 18.2321 0.600801 18.4864 0.802401 18.6914C1.0033 18.8971 1.2525 19 1.55 19C2.0925 19 2.62625 18.9329 3.15125 18.7986C3.67625 18.665 4.1925 18.4643 4.7 18.1964C5.2075 18.4643 5.72375 18.665 6.24875 18.7986C6.77375 18.9329 7.3075 19 7.85 19C8.3925 19 8.92625 18.9329 9.45125 18.7986C9.97625 18.665 10.4925 18.4643 11 18.1964C11.5075 18.4643 12.0238 18.665 12.5488 18.7986C13.0738 18.9329 13.6075 19 14.15 19C14.6925 19 15.2263 18.9329 15.7513 18.7986C16.2763 18.665 16.7925 18.4643 17.3 18.1964C17.8075 18.4643 18.3238 18.665 18.8488 18.7986Z" style="fill: var(--element-active-color)"/>
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
    'obi-17-ship-tanker': Obi17ShipTanker;
  }
}