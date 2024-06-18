import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-17-swimming')
export class Obi17Swimming extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M3.175 20.85C2.875 20.9333 2.604 20.8667 2.362 20.65C2.12067 20.4333 2 20.15 2 19.8C2 19.6167 2.071 19.4373 2.213 19.262C2.35433 19.0873 2.54167 18.95 2.775 18.85C3.10833 18.7167 3.43767 18.5417 3.763 18.325C4.08767 18.1083 4.6 18 5.3 18C6.23333 18 6.875 18.1667 7.225 18.5C7.575 18.8333 8.05 19 8.65 19C9.25 19 9.725 18.8333 10.075 18.5C10.425 18.1667 11.0667 18 12 18C12.9333 18 13.575 18.1667 13.925 18.5C14.275 18.8333 14.75 19 15.35 19C15.95 19 16.425 18.8333 16.775 18.5C17.125 18.1667 17.7667 18 18.7 18C19.4 18 19.9127 18.1083 20.238 18.325C20.5627 18.5417 20.8917 18.7167 21.225 18.85C21.4583 18.95 21.646 19.0833 21.788 19.25C21.9293 19.4167 22 19.6 22 19.8C22 20.15 21.8793 20.4333 21.638 20.65C21.396 20.8667 21.125 20.9333 20.825 20.85C20.3583 20.7167 20 20.5417 19.75 20.325C19.5 20.1083 19.15 20 18.7 20C18.1 20 17.625 20.1667 17.275 20.5C16.925 20.8333 16.2833 21 15.35 21C14.4167 21 13.775 20.8333 13.425 20.5C13.075 20.1667 12.6 20 12 20C11.4 20 10.925 20.1667 10.575 20.5C10.225 20.8333 9.58333 21 8.65 21C7.71667 21 7.075 20.8333 6.725 20.5C6.375 20.1667 5.9 20 5.3 20C4.85 20 4.5 20.1083 4.25 20.325C4 20.5417 3.64167 20.7167 3.175 20.85ZM3.175 16.35C2.875 16.4333 2.604 16.3667 2.362 16.15C2.12067 15.9333 2 15.65 2 15.3C2 15.1167 2.071 14.9373 2.213 14.762C2.35433 14.5873 2.54167 14.45 2.775 14.35C3.10833 14.2167 3.43767 14.0417 3.763 13.825C4.08767 13.6083 4.6 13.5 5.3 13.5C6.23333 13.5 6.87933 13.6667 7.238 14C7.596 14.3333 8.06667 14.5 8.65 14.5C9.25 14.5 9.725 14.3333 10.075 14C10.425 13.6667 11.0667 13.5 12 13.5C12.9333 13.5 13.575 13.6667 13.925 14C14.275 14.3333 14.75 14.5 15.35 14.5C15.95 14.5 16.425 14.3333 16.775 14C17.125 13.6667 17.7667 13.5 18.7 13.5C19.4 13.5 19.9127 13.6083 20.238 13.825C20.5627 14.0417 20.8917 14.2167 21.225 14.35C21.4583 14.45 21.646 14.5833 21.788 14.75C21.9293 14.9167 22 15.1 22 15.3C22 15.65 21.8793 15.9333 21.638 16.15C21.396 16.3667 21.125 16.4333 20.825 16.35C20.3583 16.2167 20 16.0417 19.75 15.825C19.5 15.6083 19.15 15.5 18.7 15.5C18.1 15.5 17.6373 15.6667 17.312 16C16.9873 16.3333 16.3333 16.5 15.35 16.5C14.4 16.5 13.7543 16.3333 13.413 16C13.071 15.6667 12.6 15.5 12 15.5C11.3667 15.5 10.896 15.6667 10.588 16C10.2793 16.3333 9.63333 16.5 8.65 16.5C7.66667 16.5 7.01267 16.3333 6.688 16C6.36267 15.6667 5.9 15.5 5.3 15.5C4.85 15.5 4.5 15.6083 4.25 15.825C4 16.0417 3.64167 16.2167 3.175 16.35ZM8.65 12C8.3 12 7.99167 11.9457 7.725 11.837C7.45833 11.729 7.18333 11.5833 6.9 11.4L10.225 8.075L9.225 7.075C8.80833 6.65833 8.37933 6.325 7.938 6.075C7.496 5.825 6.98333 5.65833 6.4 5.575C6.06667 5.525 5.78333 5.379 5.55 5.137C5.31667 4.89567 5.2 4.60833 5.2 4.275C5.2 3.90833 5.32933 3.604 5.588 3.362C5.846 3.12067 6.14167 3.01667 6.475 3.05C7.35833 3.13333 8.125 3.32067 8.775 3.612C9.425 3.904 10.0667 4.36667 10.7 5L17.1 11.4C16.8167 11.5833 16.5417 11.729 16.275 11.837C16.0083 11.9457 15.7 12 15.35 12C14.75 12 14.275 11.8333 13.925 11.5C13.575 11.1667 12.9333 11 12 11C11.0667 11 10.425 11.1667 10.075 11.5C9.725 11.8333 9.25 12 8.65 12ZM16.7 8C16 8 15.4083 7.75833 14.925 7.275C14.4417 6.79167 14.2 6.2 14.2 5.5C14.2 4.81667 14.4417 4.229 14.925 3.737C15.4083 3.24567 16 3 16.7 3C17.4 3 17.9917 3.24567 18.475 3.737C18.9583 4.229 19.2 4.81667 19.2 5.5C19.2 6.2 18.9583 6.79167 18.475 7.275C17.9917 7.75833 17.4 8 16.7 8Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M3.175 20.85C2.875 20.9333 2.604 20.8667 2.362 20.65C2.12067 20.4333 2 20.15 2 19.8C2 19.6167 2.071 19.4373 2.213 19.262C2.35433 19.0873 2.54167 18.95 2.775 18.85C3.10833 18.7167 3.43767 18.5417 3.763 18.325C4.08767 18.1083 4.6 18 5.3 18C6.23333 18 6.875 18.1667 7.225 18.5C7.575 18.8333 8.05 19 8.65 19C9.25 19 9.725 18.8333 10.075 18.5C10.425 18.1667 11.0667 18 12 18C12.9333 18 13.575 18.1667 13.925 18.5C14.275 18.8333 14.75 19 15.35 19C15.95 19 16.425 18.8333 16.775 18.5C17.125 18.1667 17.7667 18 18.7 18C19.4 18 19.9127 18.1083 20.238 18.325C20.5627 18.5417 20.8917 18.7167 21.225 18.85C21.4583 18.95 21.646 19.0833 21.788 19.25C21.9293 19.4167 22 19.6 22 19.8C22 20.15 21.8793 20.4333 21.638 20.65C21.396 20.8667 21.125 20.9333 20.825 20.85C20.3583 20.7167 20 20.5417 19.75 20.325C19.5 20.1083 19.15 20 18.7 20C18.1 20 17.625 20.1667 17.275 20.5C16.925 20.8333 16.2833 21 15.35 21C14.4167 21 13.775 20.8333 13.425 20.5C13.075 20.1667 12.6 20 12 20C11.4 20 10.925 20.1667 10.575 20.5C10.225 20.8333 9.58333 21 8.65 21C7.71667 21 7.075 20.8333 6.725 20.5C6.375 20.1667 5.9 20 5.3 20C4.85 20 4.5 20.1083 4.25 20.325C4 20.5417 3.64167 20.7167 3.175 20.85ZM3.175 16.35C2.875 16.4333 2.604 16.3667 2.362 16.15C2.12067 15.9333 2 15.65 2 15.3C2 15.1167 2.071 14.9373 2.213 14.762C2.35433 14.5873 2.54167 14.45 2.775 14.35C3.10833 14.2167 3.43767 14.0417 3.763 13.825C4.08767 13.6083 4.6 13.5 5.3 13.5C6.23333 13.5 6.87933 13.6667 7.238 14C7.596 14.3333 8.06667 14.5 8.65 14.5C9.25 14.5 9.725 14.3333 10.075 14C10.425 13.6667 11.0667 13.5 12 13.5C12.9333 13.5 13.575 13.6667 13.925 14C14.275 14.3333 14.75 14.5 15.35 14.5C15.95 14.5 16.425 14.3333 16.775 14C17.125 13.6667 17.7667 13.5 18.7 13.5C19.4 13.5 19.9127 13.6083 20.238 13.825C20.5627 14.0417 20.8917 14.2167 21.225 14.35C21.4583 14.45 21.646 14.5833 21.788 14.75C21.9293 14.9167 22 15.1 22 15.3C22 15.65 21.8793 15.9333 21.638 16.15C21.396 16.3667 21.125 16.4333 20.825 16.35C20.3583 16.2167 20 16.0417 19.75 15.825C19.5 15.6083 19.15 15.5 18.7 15.5C18.1 15.5 17.6373 15.6667 17.312 16C16.9873 16.3333 16.3333 16.5 15.35 16.5C14.4 16.5 13.7543 16.3333 13.413 16C13.071 15.6667 12.6 15.5 12 15.5C11.3667 15.5 10.896 15.6667 10.588 16C10.2793 16.3333 9.63333 16.5 8.65 16.5C7.66667 16.5 7.01267 16.3333 6.688 16C6.36267 15.6667 5.9 15.5 5.3 15.5C4.85 15.5 4.5 15.6083 4.25 15.825C4 16.0417 3.64167 16.2167 3.175 16.35ZM8.65 12C8.3 12 7.99167 11.9457 7.725 11.837C7.45833 11.729 7.18333 11.5833 6.9 11.4L10.225 8.075L9.225 7.075C8.80833 6.65833 8.37933 6.325 7.938 6.075C7.496 5.825 6.98333 5.65833 6.4 5.575C6.06667 5.525 5.78333 5.379 5.55 5.137C5.31667 4.89567 5.2 4.60833 5.2 4.275C5.2 3.90833 5.32933 3.604 5.588 3.362C5.846 3.12067 6.14167 3.01667 6.475 3.05C7.35833 3.13333 8.125 3.32067 8.775 3.612C9.425 3.904 10.0667 4.36667 10.7 5L17.1 11.4C16.8167 11.5833 16.5417 11.729 16.275 11.837C16.0083 11.9457 15.7 12 15.35 12C14.75 12 14.275 11.8333 13.925 11.5C13.575 11.1667 12.9333 11 12 11C11.0667 11 10.425 11.1667 10.075 11.5C9.725 11.8333 9.25 12 8.65 12ZM16.7 8C16 8 15.4083 7.75833 14.925 7.275C14.4417 6.79167 14.2 6.2 14.2 5.5C14.2 4.81667 14.4417 4.229 14.925 3.737C15.4083 3.24567 16 3 16.7 3C17.4 3 17.9917 3.24567 18.475 3.737C18.9583 4.229 19.2 4.81667 19.2 5.5C19.2 6.2 18.9583 6.79167 18.475 7.275C17.9917 7.75833 17.4 8 16.7 8Z" fill="currentColor"/>
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
    'obi-17-swimming': Obi17Swimming;
  }
}
