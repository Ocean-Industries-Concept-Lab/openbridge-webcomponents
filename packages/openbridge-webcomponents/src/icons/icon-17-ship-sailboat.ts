import {LitElement, html, css, svg, unsafeCSS} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-17-ship-sailboat')
export class Obi17ShipSailboat extends LitElement {
  @property({type: Boolean, attribute: 'use-css-color'}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M3.95 13.5002C3.75 13.5002 3.60433 13.4129 3.513 13.2382C3.421 13.0629 3.43333 12.8919 3.55 12.7252L10.1 3.3002C10.2333 3.1002 10.4167 3.03753 10.65 3.1122C10.8833 3.18753 11 3.3502 11 3.6002V13.0002C11 13.1335 10.95 13.2502 10.85 13.3502C10.75 13.4502 10.6333 13.5002 10.5 13.5002H3.95ZM12.75 12.8002C12.9333 12.1835 13.104 11.3919 13.262 10.4252C13.4207 9.45853 13.5 8.48353 13.5 7.5002C13.5 6.5502 13.425 5.56686 13.275 4.5502C13.125 3.53353 12.9583 2.66686 12.775 1.9502C12.6917 1.66686 12.7167 1.46686 12.85 1.3502C12.9833 1.23353 13.175 1.23353 13.425 1.3502C14.3417 1.76686 15.2417 2.37086 16.125 3.1622C17.0083 3.9542 17.8 4.87086 18.5 5.9122C19.2 6.9542 19.7793 8.0792 20.238 9.2872C20.696 10.4959 20.95 11.7335 21 13.0002C21 13.1335 20.95 13.2502 20.85 13.3502C20.75 13.4502 20.6333 13.5002 20.5 13.5002H13.25C13.05 13.5002 12.9 13.4335 12.8 13.3002C12.7 13.1669 12.6833 13.0002 12.75 12.8002ZM11.35 18.1252C11.0167 18.3919 10.65 18.6042 10.25 18.7622C9.85 18.9209 9.43333 19.0002 9 19.0002C8.56667 19.0002 8.15 18.9209 7.75 18.7622C7.35 18.6042 6.98333 18.3919 6.65 18.1252C6.45 17.9752 6.23333 17.9002 6 17.9002C5.76667 17.9002 5.55 17.9752 5.35 18.1252C5.2 18.2585 5.03767 18.3709 4.863 18.4622C4.68767 18.5542 4.50833 18.6419 4.325 18.7252C3.925 18.4419 3.571 18.1042 3.263 17.7122C2.95433 17.3209 2.69167 16.8919 2.475 16.4252C2.30833 16.0585 2.32933 15.7295 2.538 15.4382C2.746 15.1462 3.06667 15.0002 3.5 15.0002H20.5C20.9333 15.0002 21.2543 15.1462 21.463 15.4382C21.671 15.7295 21.6917 16.0585 21.525 16.4252C21.3083 16.8919 21.046 17.3209 20.738 17.7122C20.4293 18.1042 20.075 18.4419 19.675 18.7252C19.4917 18.6419 19.3127 18.5542 19.138 18.4622C18.9627 18.3709 18.8 18.2585 18.65 18.1252C18.45 17.9752 18.2333 17.9002 18 17.9002C17.7667 17.9002 17.55 17.9752 17.35 18.1252C17.0167 18.3919 16.65 18.6042 16.25 18.7622C15.85 18.9209 15.4333 19.0002 15 19.0002C14.5667 19.0002 14.15 18.9209 13.75 18.7622C13.35 18.6042 12.9833 18.3919 12.65 18.1252C12.45 17.9752 12.2333 17.9002 12 17.9002C11.7667 17.9002 11.55 17.9752 11.35 18.1252ZM3 23.0002C3.51667 23.0002 4.025 22.9375 4.525 22.8122C5.025 22.6875 5.51667 22.5002 6 22.2502C6.48333 22.5002 6.975 22.6875 7.475 22.8122C7.975 22.9375 8.48333 23.0002 9 23.0002C9.51667 23.0002 10.025 22.9375 10.525 22.8122C11.025 22.6875 11.5167 22.5002 12 22.2502C12.4833 22.5002 12.975 22.6875 13.475 22.8122C13.975 22.9375 14.4833 23.0002 15 23.0002C15.5167 23.0002 16.025 22.9375 16.525 22.8122C17.025 22.6875 17.5167 22.5002 18 22.2502C18.4833 22.5002 18.975 22.6875 19.475 22.8122C19.975 22.9375 20.4833 23.0002 21 23.0002C21.2833 23.0002 21.5207 22.9042 21.712 22.7122C21.904 22.5209 22 22.2835 22 22.0002C22 21.7169 21.904 21.4795 21.712 21.2882C21.5207 21.0962 21.2833 21.0002 21 21.0002C20.5667 21.0002 20.1373 20.9459 19.712 20.8372C19.2873 20.7292 18.8833 20.5585 18.5 20.3252C18.3667 20.2419 18.2 20.2002 18 20.2002C17.8 20.2002 17.6333 20.2419 17.5 20.3252C17.1167 20.5585 16.7127 20.7292 16.288 20.8372C15.8627 20.9459 15.4333 21.0002 15 21.0002C14.5667 21.0002 14.1377 20.9459 13.713 20.8372C13.2877 20.7292 12.8833 20.5585 12.5 20.3252C12.3667 20.2419 12.2043 20.2002 12.013 20.2002C11.821 20.2002 11.65 20.2419 11.5 20.3252C11.1167 20.5585 10.7127 20.7292 10.288 20.8372C9.86267 20.9459 9.43333 21.0002 9 21.0002C8.56667 21.0002 8.13767 20.9459 7.713 20.8372C7.28767 20.7292 6.88333 20.5585 6.5 20.3252C6.35 20.2419 6.18333 20.2002 6 20.2002C5.81667 20.2002 5.65 20.2419 5.5 20.3252C5.11667 20.5585 4.71267 20.7292 4.288 20.8372C3.86267 20.9459 3.43333 21.0002 3 21.0002C2.71667 21.0002 2.47933 21.0962 2.288 21.2882C2.096 21.4795 2 21.7169 2 22.0002C2 22.2835 2.096 22.5209 2.288 22.7122C2.47933 22.9042 2.71667 23.0002 3 23.0002Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M3.95 13.5002C3.75 13.5002 3.60433 13.4129 3.513 13.2382C3.421 13.0629 3.43333 12.8919 3.55 12.7252L10.1 3.3002C10.2333 3.1002 10.4167 3.03753 10.65 3.1122C10.8833 3.18753 11 3.3502 11 3.6002V13.0002C11 13.1335 10.95 13.2502 10.85 13.3502C10.75 13.4502 10.6333 13.5002 10.5 13.5002H3.95ZM12.75 12.8002C12.9333 12.1835 13.104 11.3919 13.262 10.4252C13.4207 9.45853 13.5 8.48353 13.5 7.5002C13.5 6.5502 13.425 5.56686 13.275 4.5502C13.125 3.53353 12.9583 2.66686 12.775 1.9502C12.6917 1.66686 12.7167 1.46686 12.85 1.3502C12.9833 1.23353 13.175 1.23353 13.425 1.3502C14.3417 1.76686 15.2417 2.37086 16.125 3.1622C17.0083 3.9542 17.8 4.87086 18.5 5.9122C19.2 6.9542 19.7793 8.0792 20.238 9.2872C20.696 10.4959 20.95 11.7335 21 13.0002C21 13.1335 20.95 13.2502 20.85 13.3502C20.75 13.4502 20.6333 13.5002 20.5 13.5002H13.25C13.05 13.5002 12.9 13.4335 12.8 13.3002C12.7 13.1669 12.6833 13.0002 12.75 12.8002ZM11.35 18.1252C11.0167 18.3919 10.65 18.6042 10.25 18.7622C9.85 18.9209 9.43333 19.0002 9 19.0002C8.56667 19.0002 8.15 18.9209 7.75 18.7622C7.35 18.6042 6.98333 18.3919 6.65 18.1252C6.45 17.9752 6.23333 17.9002 6 17.9002C5.76667 17.9002 5.55 17.9752 5.35 18.1252C5.2 18.2585 5.03767 18.3709 4.863 18.4622C4.68767 18.5542 4.50833 18.6419 4.325 18.7252C3.925 18.4419 3.571 18.1042 3.263 17.7122C2.95433 17.3209 2.69167 16.8919 2.475 16.4252C2.30833 16.0585 2.32933 15.7295 2.538 15.4382C2.746 15.1462 3.06667 15.0002 3.5 15.0002H20.5C20.9333 15.0002 21.2543 15.1462 21.463 15.4382C21.671 15.7295 21.6917 16.0585 21.525 16.4252C21.3083 16.8919 21.046 17.3209 20.738 17.7122C20.4293 18.1042 20.075 18.4419 19.675 18.7252C19.4917 18.6419 19.3127 18.5542 19.138 18.4622C18.9627 18.3709 18.8 18.2585 18.65 18.1252C18.45 17.9752 18.2333 17.9002 18 17.9002C17.7667 17.9002 17.55 17.9752 17.35 18.1252C17.0167 18.3919 16.65 18.6042 16.25 18.7622C15.85 18.9209 15.4333 19.0002 15 19.0002C14.5667 19.0002 14.15 18.9209 13.75 18.7622C13.35 18.6042 12.9833 18.3919 12.65 18.1252C12.45 17.9752 12.2333 17.9002 12 17.9002C11.7667 17.9002 11.55 17.9752 11.35 18.1252ZM3 23.0002C3.51667 23.0002 4.025 22.9375 4.525 22.8122C5.025 22.6875 5.51667 22.5002 6 22.2502C6.48333 22.5002 6.975 22.6875 7.475 22.8122C7.975 22.9375 8.48333 23.0002 9 23.0002C9.51667 23.0002 10.025 22.9375 10.525 22.8122C11.025 22.6875 11.5167 22.5002 12 22.2502C12.4833 22.5002 12.975 22.6875 13.475 22.8122C13.975 22.9375 14.4833 23.0002 15 23.0002C15.5167 23.0002 16.025 22.9375 16.525 22.8122C17.025 22.6875 17.5167 22.5002 18 22.2502C18.4833 22.5002 18.975 22.6875 19.475 22.8122C19.975 22.9375 20.4833 23.0002 21 23.0002C21.2833 23.0002 21.5207 22.9042 21.712 22.7122C21.904 22.5209 22 22.2835 22 22.0002C22 21.7169 21.904 21.4795 21.712 21.2882C21.5207 21.0962 21.2833 21.0002 21 21.0002C20.5667 21.0002 20.1373 20.9459 19.712 20.8372C19.2873 20.7292 18.8833 20.5585 18.5 20.3252C18.3667 20.2419 18.2 20.2002 18 20.2002C17.8 20.2002 17.6333 20.2419 17.5 20.3252C17.1167 20.5585 16.7127 20.7292 16.288 20.8372C15.8627 20.9459 15.4333 21.0002 15 21.0002C14.5667 21.0002 14.1377 20.9459 13.713 20.8372C13.2877 20.7292 12.8833 20.5585 12.5 20.3252C12.3667 20.2419 12.2043 20.2002 12.013 20.2002C11.821 20.2002 11.65 20.2419 11.5 20.3252C11.1167 20.5585 10.7127 20.7292 10.288 20.8372C9.86267 20.9459 9.43333 21.0002 9 21.0002C8.56667 21.0002 8.13767 20.9459 7.713 20.8372C7.28767 20.7292 6.88333 20.5585 6.5 20.3252C6.35 20.2419 6.18333 20.2002 6 20.2002C5.81667 20.2002 5.65 20.2419 5.5 20.3252C5.11667 20.5585 4.71267 20.7292 4.288 20.8372C3.86267 20.9459 3.43333 21.0002 3 21.0002C2.71667 21.0002 2.47933 21.0962 2.288 21.2882C2.096 21.4795 2 21.7169 2 22.0002C2 22.2835 2.096 22.5209 2.288 22.7122C2.47933 22.9042 2.71667 23.0002 3 23.0002Z" fill="currentColor"/>
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
    }
    .wrapper > * {
      height: 100%;
      width: 100%;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    'obi-17-ship-sailboat': Obi17ShipSailboat;
  }
}
