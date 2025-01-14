import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-ship-wreck-iec')
export class ObiShipWreckIec extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M11.9466 3.0001L12 3L12.0534 3.0001C12.6057 3.00225 13.0516 3.45169 13.0495 4.00397C13.0474 4.55625 12.5979 5.00223 12.0456 5.00009L12 5L11.9544 5.00009C11.4021 5.00223 10.9526 4.55625 10.9505 4.00397C10.9484 3.45169 11.3943 3.00225 11.9466 3.0001Z" fill="currentColor"/>
<path d="M14.4907 4.20676C14.6465 3.67691 15.2023 3.37369 15.7322 3.5295C15.7666 3.53961 15.8009 3.54986 15.8351 3.56024C16.3636 3.72056 16.6621 4.27897 16.5018 4.80747C16.3414 5.33597 15.783 5.63444 15.2545 5.47412C15.2257 5.46539 15.1969 5.45677 15.1679 5.44826C14.6381 5.29245 14.3349 4.73661 14.4907 4.20676Z" fill="currentColor"/>
<path d="M9.50931 4.20676C9.66512 4.73661 9.3619 5.29245 8.83205 5.44826C8.80312 5.45677 8.77426 5.46539 8.74547 5.47412C8.21697 5.63444 7.65857 5.33597 7.49825 4.80747C7.33792 4.27897 7.63639 3.72056 8.1649 3.56024C8.19913 3.54986 8.23343 3.53961 8.26782 3.5295C8.79767 3.37369 9.3535 3.67691 9.50931 4.20676Z" fill="currentColor"/>
<path d="M6.18179 5.43478C6.50144 5.88516 6.39546 6.50939 5.94507 6.82904C5.92112 6.84604 5.89729 6.86313 5.87359 6.88031C5.42648 7.20451 4.8012 7.10486 4.477 6.65775C4.15281 6.21063 4.25245 5.58535 4.69957 5.26116C4.72876 5.23999 4.75808 5.21896 4.78753 5.19806C5.23792 4.87841 5.86215 4.98439 6.18179 5.43478Z" fill="currentColor"/>
<path d="M17.8182 5.43478C18.1379 4.98439 18.7621 4.87841 19.2125 5.19806C19.2419 5.21896 19.2712 5.23999 19.3004 5.26116C19.7475 5.58535 19.8472 6.21063 19.523 6.65775C19.1988 7.10486 18.5735 7.20451 18.1264 6.88031C18.1027 6.86313 18.0789 6.84604 18.0549 6.82904C17.6045 6.50939 17.4986 5.88516 17.8182 5.43478Z" fill="currentColor"/>
<path d="M3.46691 7.71918C3.94214 8.00054 4.09931 8.61389 3.81794 9.08913C3.80345 9.1136 3.78914 9.13814 3.77502 9.16275C3.50005 9.64171 2.88886 9.80709 2.40989 9.53212C1.93092 9.25715 1.76555 8.64597 2.04052 8.167C2.05911 8.13462 2.07792 8.10235 2.09695 8.07021C2.37832 7.59497 2.99167 7.43781 3.46691 7.71918Z" fill="currentColor"/>
<path d="M20.5331 7.71918C21.0083 7.43781 21.6217 7.59497 21.903 8.07021C21.9221 8.10235 21.9409 8.13462 21.9595 8.167C22.2344 8.64597 22.0691 9.25715 21.5901 9.53212C21.1111 9.80709 20.5 9.64171 20.225 9.16274C20.2109 9.13814 20.1966 9.1136 20.1821 9.08913C19.9007 8.61389 20.0579 8.00054 20.5331 7.71918Z" fill="currentColor"/>
<path d="M21.9922 10.9505C22.5445 10.9464 22.9956 11.3907 22.9998 11.9429L23 12L22.9998 12.0571C22.9956 12.6093 22.5445 13.0536 21.9922 13.0495C21.44 13.0453 20.9957 12.5942 20.9998 12.0419L21 12L20.9998 11.9581C20.9957 11.4058 21.44 10.9547 21.9922 10.9505Z" fill="currentColor"/>
<path d="M2.00776 10.9505C2.56003 10.9547 3.00434 11.4058 3.00016 11.9581L3 12L3.00016 12.0419C3.00434 12.5942 2.56003 13.0453 2.00776 13.0495C1.45549 13.0536 1.0044 12.6093 1.00022 12.0571L1 12L1.00022 11.9429C1.0044 11.3907 1.45549 10.9464 2.00776 10.9505Z" fill="currentColor"/>
<path d="M21.5901 14.4679C22.0691 14.7428 22.2345 15.354 21.9595 15.833C21.9409 15.8654 21.9221 15.8976 21.903 15.9298C21.6217 16.405 21.0083 16.5622 20.5331 16.2808C20.0579 15.9995 19.9007 15.3861 20.1821 14.9109C20.1966 14.8864 20.2109 14.8619 20.225 14.8373C20.5 14.3583 21.1111 14.1929 21.5901 14.4679Z" fill="currentColor"/>
<path d="M2.40989 14.4679C2.88886 14.1929 3.50005 14.3583 3.77502 14.8373C3.78914 14.8619 3.80345 14.8864 3.81794 14.9109C4.09931 15.3861 3.94214 15.9995 3.46691 16.2808C2.99167 16.5622 2.37832 16.405 2.09695 15.9298C2.07792 15.8976 2.05911 15.8654 2.04052 15.833C1.76555 15.354 1.93093 14.7428 2.40989 14.4679Z" fill="currentColor"/>
<path d="M19.523 17.3423C19.8472 17.7894 19.7475 18.4146 19.3004 18.7388C19.2712 18.76 19.2419 18.781 19.2125 18.8019C18.7621 19.1216 18.1379 19.0156 17.8182 18.5652C17.4986 18.1148 17.6045 17.4906 18.0549 17.171C18.0789 17.154 18.1027 17.1369 18.1264 17.1197C18.5735 16.7955 19.1988 16.8951 19.523 17.3423Z" fill="currentColor"/>
<path d="M4.477 17.3423C4.8012 16.8951 5.42648 16.7955 5.87359 17.1197C5.89729 17.1369 5.92112 17.154 5.94507 17.171C6.39546 17.4906 6.50144 18.1148 6.18179 18.5652C5.86215 19.0156 5.23792 19.1216 4.78753 18.8019C4.75808 18.781 4.72876 18.76 4.69957 18.7388C4.25245 18.4146 4.15281 17.7894 4.477 17.3423Z" fill="currentColor"/>
<path d="M7.49825 19.1925C7.65857 18.664 8.21697 18.3656 8.74547 18.5259C8.77426 18.5346 8.80312 18.5432 8.83205 18.5517C9.3619 18.7075 9.66512 19.2634 9.50931 19.7932C9.3535 20.3231 8.79767 20.6263 8.26782 20.4705C8.23343 20.4604 8.19913 20.4501 8.1649 20.4398C7.63639 20.2794 7.33792 19.721 7.49825 19.1925Z" fill="currentColor"/>
<path d="M16.5018 19.1925C16.6621 19.721 16.3636 20.2794 15.8351 20.4398C15.8009 20.4501 15.7666 20.4604 15.7322 20.4705C15.2023 20.6263 14.6465 20.3231 14.4907 19.7932C14.3349 19.2634 14.6381 18.7075 15.1679 18.5517C15.1969 18.5432 15.2257 18.5346 15.2545 18.5259C15.783 18.3656 16.3414 18.664 16.5018 19.1925Z" fill="currentColor"/>
<path d="M10.9505 19.996C10.9526 19.4437 11.4021 18.9978 11.9544 18.9999L12 19L12.0456 18.9999C12.5979 18.9978 13.0474 19.4437 13.0495 19.996C13.0516 20.5483 12.6057 20.9978 12.0534 20.9999L12 21L11.9466 20.9999C11.3943 20.9978 10.9484 20.5483 10.9505 19.996Z" fill="currentColor"/>
<path d="M8 15V13H11V18H13V13H16V15H18V13H20V11H18V9H16V11H13V6H11V11H8V9H6V11H4V13H6V15H8Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M11.9466 3.0001L12 3L12.0534 3.0001C12.6057 3.00225 13.0516 3.45169 13.0495 4.00397C13.0474 4.55625 12.5979 5.00223 12.0456 5.00009L12 5L11.9544 5.00009C11.4021 5.00223 10.9526 4.55625 10.9505 4.00397C10.9484 3.45169 11.3943 3.00225 11.9466 3.0001Z" style="fill: var(--element-active-color)"/>
<path d="M14.4907 4.20676C14.6465 3.67691 15.2023 3.37369 15.7322 3.5295C15.7666 3.53961 15.8009 3.54986 15.8351 3.56024C16.3636 3.72056 16.6621 4.27897 16.5018 4.80747C16.3414 5.33597 15.783 5.63444 15.2545 5.47412C15.2257 5.46539 15.1969 5.45677 15.1679 5.44826C14.6381 5.29245 14.3349 4.73661 14.4907 4.20676Z" style="fill: var(--element-active-color)"/>
<path d="M9.50931 4.20676C9.66512 4.73661 9.3619 5.29245 8.83205 5.44826C8.80312 5.45677 8.77426 5.46539 8.74547 5.47412C8.21697 5.63444 7.65857 5.33597 7.49825 4.80747C7.33792 4.27897 7.63639 3.72056 8.1649 3.56024C8.19913 3.54986 8.23343 3.53961 8.26782 3.5295C8.79767 3.37369 9.3535 3.67691 9.50931 4.20676Z" style="fill: var(--element-active-color)"/>
<path d="M6.18179 5.43478C6.50144 5.88516 6.39546 6.50939 5.94507 6.82904C5.92112 6.84604 5.89729 6.86313 5.87359 6.88031C5.42648 7.20451 4.8012 7.10486 4.477 6.65775C4.15281 6.21063 4.25245 5.58535 4.69957 5.26116C4.72876 5.23999 4.75808 5.21896 4.78753 5.19806C5.23792 4.87841 5.86215 4.98439 6.18179 5.43478Z" style="fill: var(--element-active-color)"/>
<path d="M17.8182 5.43478C18.1379 4.98439 18.7621 4.87841 19.2125 5.19806C19.2419 5.21896 19.2712 5.23999 19.3004 5.26116C19.7475 5.58535 19.8472 6.21063 19.523 6.65775C19.1988 7.10486 18.5735 7.20451 18.1264 6.88031C18.1027 6.86313 18.0789 6.84604 18.0549 6.82904C17.6045 6.50939 17.4986 5.88516 17.8182 5.43478Z" style="fill: var(--element-active-color)"/>
<path d="M3.46691 7.71918C3.94214 8.00054 4.09931 8.61389 3.81794 9.08913C3.80345 9.1136 3.78914 9.13814 3.77502 9.16275C3.50005 9.64171 2.88886 9.80709 2.40989 9.53212C1.93092 9.25715 1.76555 8.64597 2.04052 8.167C2.05911 8.13462 2.07792 8.10235 2.09695 8.07021C2.37832 7.59497 2.99167 7.43781 3.46691 7.71918Z" style="fill: var(--element-active-color)"/>
<path d="M20.5331 7.71918C21.0083 7.43781 21.6217 7.59497 21.903 8.07021C21.9221 8.10235 21.9409 8.13462 21.9595 8.167C22.2344 8.64597 22.0691 9.25715 21.5901 9.53212C21.1111 9.80709 20.5 9.64171 20.225 9.16274C20.2109 9.13814 20.1966 9.1136 20.1821 9.08913C19.9007 8.61389 20.0579 8.00054 20.5331 7.71918Z" style="fill: var(--element-active-color)"/>
<path d="M21.9922 10.9505C22.5445 10.9464 22.9956 11.3907 22.9998 11.9429L23 12L22.9998 12.0571C22.9956 12.6093 22.5445 13.0536 21.9922 13.0495C21.44 13.0453 20.9957 12.5942 20.9998 12.0419L21 12L20.9998 11.9581C20.9957 11.4058 21.44 10.9547 21.9922 10.9505Z" style="fill: var(--element-active-color)"/>
<path d="M2.00776 10.9505C2.56003 10.9547 3.00434 11.4058 3.00016 11.9581L3 12L3.00016 12.0419C3.00434 12.5942 2.56003 13.0453 2.00776 13.0495C1.45549 13.0536 1.0044 12.6093 1.00022 12.0571L1 12L1.00022 11.9429C1.0044 11.3907 1.45549 10.9464 2.00776 10.9505Z" style="fill: var(--element-active-color)"/>
<path d="M21.5901 14.4679C22.0691 14.7428 22.2345 15.354 21.9595 15.833C21.9409 15.8654 21.9221 15.8976 21.903 15.9298C21.6217 16.405 21.0083 16.5622 20.5331 16.2808C20.0579 15.9995 19.9007 15.3861 20.1821 14.9109C20.1966 14.8864 20.2109 14.8619 20.225 14.8373C20.5 14.3583 21.1111 14.1929 21.5901 14.4679Z" style="fill: var(--element-active-color)"/>
<path d="M2.40989 14.4679C2.88886 14.1929 3.50005 14.3583 3.77502 14.8373C3.78914 14.8619 3.80345 14.8864 3.81794 14.9109C4.09931 15.3861 3.94214 15.9995 3.46691 16.2808C2.99167 16.5622 2.37832 16.405 2.09695 15.9298C2.07792 15.8976 2.05911 15.8654 2.04052 15.833C1.76555 15.354 1.93093 14.7428 2.40989 14.4679Z" style="fill: var(--element-active-color)"/>
<path d="M19.523 17.3423C19.8472 17.7894 19.7475 18.4146 19.3004 18.7388C19.2712 18.76 19.2419 18.781 19.2125 18.8019C18.7621 19.1216 18.1379 19.0156 17.8182 18.5652C17.4986 18.1148 17.6045 17.4906 18.0549 17.171C18.0789 17.154 18.1027 17.1369 18.1264 17.1197C18.5735 16.7955 19.1988 16.8951 19.523 17.3423Z" style="fill: var(--element-active-color)"/>
<path d="M4.477 17.3423C4.8012 16.8951 5.42648 16.7955 5.87359 17.1197C5.89729 17.1369 5.92112 17.154 5.94507 17.171C6.39546 17.4906 6.50144 18.1148 6.18179 18.5652C5.86215 19.0156 5.23792 19.1216 4.78753 18.8019C4.75808 18.781 4.72876 18.76 4.69957 18.7388C4.25245 18.4146 4.15281 17.7894 4.477 17.3423Z" style="fill: var(--element-active-color)"/>
<path d="M7.49825 19.1925C7.65857 18.664 8.21697 18.3656 8.74547 18.5259C8.77426 18.5346 8.80312 18.5432 8.83205 18.5517C9.3619 18.7075 9.66512 19.2634 9.50931 19.7932C9.3535 20.3231 8.79767 20.6263 8.26782 20.4705C8.23343 20.4604 8.19913 20.4501 8.1649 20.4398C7.63639 20.2794 7.33792 19.721 7.49825 19.1925Z" style="fill: var(--element-active-color)"/>
<path d="M16.5018 19.1925C16.6621 19.721 16.3636 20.2794 15.8351 20.4398C15.8009 20.4501 15.7666 20.4604 15.7322 20.4705C15.2023 20.6263 14.6465 20.3231 14.4907 19.7932C14.3349 19.2634 14.6381 18.7075 15.1679 18.5517C15.1969 18.5432 15.2257 18.5346 15.2545 18.5259C15.783 18.3656 16.3414 18.664 16.5018 19.1925Z" style="fill: var(--element-active-color)"/>
<path d="M10.9505 19.996C10.9526 19.4437 11.4021 18.9978 11.9544 18.9999L12 19L12.0456 18.9999C12.5979 18.9978 13.0474 19.4437 13.0495 19.996C13.0516 20.5483 12.6057 20.9978 12.0534 20.9999L12 21L11.9466 20.9999C11.3943 20.9978 10.9484 20.5483 10.9505 19.996Z" style="fill: var(--element-active-color)"/>
<path d="M8 15V13H11V18H13V13H16V15H18V13H20V11H18V9H16V11H13V6H11V11H8V9H6V11H4V13H6V15H8Z" style="fill: var(--element-active-color)"/>
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
    'obi-ship-wreck-iec': ObiShipWreckIec;
  }
}