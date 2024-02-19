import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-17-rowing')
export class Obi17Rowing extends LitElement {
  @property({type: Boolean, attribute: 'use-css-color'}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M4.7498 19.75C4.53314 19.5333 4.4248 19.2833 4.4248 19C4.4248 18.7167 4.53314 18.4667 4.7498 18.25L8.4998 14.5L10.9998 17H8.9998L6.2498 19.75C6.03314 19.9667 5.78314 20.075 5.4998 20.075C5.21647 20.075 4.96647 19.9667 4.7498 19.75ZM14.9998 5C14.4498 5 13.9791 4.804 13.5878 4.412C13.1958 4.02067 12.9998 3.55 12.9998 3C12.9998 2.45 13.1958 1.979 13.5878 1.587C13.9791 1.19567 14.4498 1 14.9998 1C15.5498 1 16.0208 1.19567 16.4128 1.587C16.8041 1.979 16.9998 2.45 16.9998 3C16.9998 3.55 16.8041 4.02067 16.4128 4.412C16.0208 4.804 15.5498 5 14.9998 5ZM16.0998 16.15L12.4998 12.6V10.3C12.1665 10.5833 11.8081 10.8417 11.4248 11.075C11.0415 11.3083 10.6331 11.5167 10.1998 11.7L16.4998 18H17.5748C17.7081 18 17.8375 18.025 17.9628 18.075C18.0875 18.125 18.1998 18.2 18.2998 18.3L20.2998 20.3C20.3998 20.4 20.4708 20.5083 20.5128 20.625C20.5541 20.7417 20.5748 20.8667 20.5748 21C20.5748 21.1333 20.5541 21.2583 20.5128 21.375C20.4708 21.4917 20.3998 21.6 20.2998 21.7L18.6998 23.3C18.5998 23.4 18.4915 23.4707 18.3748 23.512C18.2581 23.554 18.1331 23.575 17.9998 23.575C17.8665 23.575 17.7415 23.554 17.6248 23.512C17.5081 23.4707 17.3998 23.4 17.2998 23.3L15.2998 21.3C15.1998 21.2 15.1248 21.0873 15.0748 20.962C15.0248 20.8373 14.9998 20.7083 14.9998 20.575V19.5L7.8998 12.4C7.7498 12.4333 7.5998 12.4583 7.4498 12.475C7.2998 12.4917 7.1498 12.5 6.9998 12.5C6.6998 12.5 6.4458 12.3917 6.2378 12.175C6.02914 11.9583 5.9248 11.7 5.9248 11.4C5.9248 11.1 6.02914 10.8417 6.2378 10.625C6.4458 10.4083 6.6998 10.3 6.9998 10.3C7.83314 10.3 8.68314 10.1123 9.5498 9.737C10.4165 9.36233 11.1165 8.88333 11.6498 8.3L13.0498 6.75C13.2331 6.55 13.4915 6.375 13.8248 6.225C14.1581 6.075 14.4665 6 14.7498 6C15.3831 6 15.9165 6.21667 16.3498 6.65C16.7831 7.08333 16.9998 7.61667 16.9998 8.25V14C16.9998 14.4333 16.9208 14.8293 16.7628 15.188C16.6041 15.546 16.3831 15.8667 16.0998 16.15Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M4.7498 19.75C4.53314 19.5333 4.4248 19.2833 4.4248 19C4.4248 18.7167 4.53314 18.4667 4.7498 18.25L8.4998 14.5L10.9998 17H8.9998L6.2498 19.75C6.03314 19.9667 5.78314 20.075 5.4998 20.075C5.21647 20.075 4.96647 19.9667 4.7498 19.75ZM14.9998 5C14.4498 5 13.9791 4.804 13.5878 4.412C13.1958 4.02067 12.9998 3.55 12.9998 3C12.9998 2.45 13.1958 1.979 13.5878 1.587C13.9791 1.19567 14.4498 1 14.9998 1C15.5498 1 16.0208 1.19567 16.4128 1.587C16.8041 1.979 16.9998 2.45 16.9998 3C16.9998 3.55 16.8041 4.02067 16.4128 4.412C16.0208 4.804 15.5498 5 14.9998 5ZM16.0998 16.15L12.4998 12.6V10.3C12.1665 10.5833 11.8081 10.8417 11.4248 11.075C11.0415 11.3083 10.6331 11.5167 10.1998 11.7L16.4998 18H17.5748C17.7081 18 17.8375 18.025 17.9628 18.075C18.0875 18.125 18.1998 18.2 18.2998 18.3L20.2998 20.3C20.3998 20.4 20.4708 20.5083 20.5128 20.625C20.5541 20.7417 20.5748 20.8667 20.5748 21C20.5748 21.1333 20.5541 21.2583 20.5128 21.375C20.4708 21.4917 20.3998 21.6 20.2998 21.7L18.6998 23.3C18.5998 23.4 18.4915 23.4707 18.3748 23.512C18.2581 23.554 18.1331 23.575 17.9998 23.575C17.8665 23.575 17.7415 23.554 17.6248 23.512C17.5081 23.4707 17.3998 23.4 17.2998 23.3L15.2998 21.3C15.1998 21.2 15.1248 21.0873 15.0748 20.962C15.0248 20.8373 14.9998 20.7083 14.9998 20.575V19.5L7.8998 12.4C7.7498 12.4333 7.5998 12.4583 7.4498 12.475C7.2998 12.4917 7.1498 12.5 6.9998 12.5C6.6998 12.5 6.4458 12.3917 6.2378 12.175C6.02914 11.9583 5.9248 11.7 5.9248 11.4C5.9248 11.1 6.02914 10.8417 6.2378 10.625C6.4458 10.4083 6.6998 10.3 6.9998 10.3C7.83314 10.3 8.68314 10.1123 9.5498 9.737C10.4165 9.36233 11.1165 8.88333 11.6498 8.3L13.0498 6.75C13.2331 6.55 13.4915 6.375 13.8248 6.225C14.1581 6.075 14.4665 6 14.7498 6C15.3831 6 15.9165 6.21667 16.3498 6.65C16.7831 7.08333 16.9998 7.61667 16.9998 8.25V14C16.9998 14.4333 16.9208 14.8293 16.7628 15.188C16.6041 15.546 16.3831 15.8667 16.0998 16.15Z" fill="currentColor"/>
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
    'obi-17-rowing': Obi17Rowing;
  }
}
