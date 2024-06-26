import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-17-ship-bulkcarrier')
export class Obi17ShipBulkcarrier extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M9.5 7.0001V10.4648H22C22 12.2708 21.0085 13.8531 19.2925 14.7319L19.2684 14.725C19.0921 14.6417 18.9197 14.554 18.7511 14.462C18.5832 14.3707 18.4271 14.2583 18.2829 14.125C18.0905 13.975 17.8822 13.9 17.6579 13.9C17.4335 13.9 17.2252 13.975 17.0328 14.125C16.7123 14.3917 16.3598 14.604 15.9752 14.762C15.5905 14.9207 15.1899 15 14.7732 15C14.3566 15 13.9559 14.9207 13.5713 14.762C13.1867 14.604 12.8341 14.3917 12.5136 14.125C12.3213 13.975 12.113 13.9 11.8886 13.9C11.6643 13.9 11.4559 13.975 11.2636 14.125C10.9431 14.3917 10.5905 14.604 10.2059 14.762C9.82131 14.9207 9.42067 15 9.004 15C8.58734 15 8.1867 14.9207 7.80208 14.762C7.41747 14.604 7.0649 14.3917 6.74439 14.125C6.55208 13.975 6.34375 13.9 6.11939 13.9C5.89503 13.9 5.6867 13.975 5.49439 14.125C5.35016 14.2583 5.19375 14.3707 5.02516 14.462C4.85721 14.554 4.6851 14.6417 4.50881 14.725C3.89057 14.9816 2.43359 14.9048 2 14.575V10.4648H3.5V7.5C3.5 7.22385 3.72386 7 4.00001 7L9.5 7.0001ZM5 8.46483H8V10.4648H5V8.46483Z" fill="currentColor"/>
<path d="M19.475 18.612C19.975 18.7373 20.4833 18.8 21 18.8C21.2833 18.8 21.5207 18.704 21.712 18.512C21.904 18.3207 22 18.0833 22 17.8C22 17.5167 21.904 17.2793 21.712 17.088C21.5207 16.896 21.2833 16.8 21 16.8C20.5667 16.8 20.1373 16.7457 19.712 16.637C19.2873 16.529 18.8833 16.3583 18.5 16.125C18.35 16.0417 18.1833 16 18 16C17.8167 16 17.65 16.0417 17.5 16.125C17.1167 16.3583 16.7123 16.529 16.287 16.637C15.8623 16.7457 15.4333 16.8 15 16.8C14.5667 16.8 14.1373 16.7457 13.712 16.637C13.2873 16.529 12.8833 16.3583 12.5 16.125C12.35 16.0417 12.179 16 11.987 16C11.7957 16 11.6333 16.0417 11.5 16.125C11.1167 16.3583 10.7123 16.529 10.287 16.637C9.86233 16.7457 9.43333 16.8 9 16.8C8.56667 16.8 8.13733 16.7457 7.712 16.637C7.28733 16.529 6.88333 16.3583 6.5 16.125C6.36667 16.0417 6.2 16 6 16C5.8 16 5.63333 16.0417 5.5 16.125C5.11667 16.3583 4.71267 16.529 4.288 16.637C3.86267 16.7457 3.43333 16.8 3 16.8C2.71667 16.8 2.47933 16.896 2.288 17.088C2.096 17.2793 2 17.5167 2 17.8C2 18.0833 2.096 18.3207 2.288 18.512C2.47933 18.704 2.71667 18.8 3 18.8C3.51667 18.8 4.025 18.7373 4.525 18.612C5.025 18.4873 5.51667 18.3 6 18.05C6.48333 18.3 6.975 18.4873 7.475 18.612C7.975 18.7373 8.48333 18.8 9 18.8C9.51667 18.8 10.025 18.7373 10.525 18.612C11.025 18.4873 11.5167 18.3 12 18.05C12.4833 18.3 12.975 18.4873 13.475 18.612C13.975 18.7373 14.4833 18.8 15 18.8C15.5167 18.8 16.025 18.7373 16.525 18.612C17.025 18.4873 17.5167 18.3 18 18.05C18.4833 18.3 18.975 18.4873 19.475 18.612Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M9.5 7.0001V10.4648H22C22 12.2708 21.0085 13.8531 19.2925 14.7319L19.2684 14.725C19.0921 14.6417 18.9197 14.554 18.7511 14.462C18.5832 14.3707 18.4271 14.2583 18.2829 14.125C18.0905 13.975 17.8822 13.9 17.6579 13.9C17.4335 13.9 17.2252 13.975 17.0328 14.125C16.7123 14.3917 16.3598 14.604 15.9752 14.762C15.5905 14.9207 15.1899 15 14.7732 15C14.3566 15 13.9559 14.9207 13.5713 14.762C13.1867 14.604 12.8341 14.3917 12.5136 14.125C12.3213 13.975 12.113 13.9 11.8886 13.9C11.6643 13.9 11.4559 13.975 11.2636 14.125C10.9431 14.3917 10.5905 14.604 10.2059 14.762C9.82131 14.9207 9.42067 15 9.004 15C8.58734 15 8.1867 14.9207 7.80208 14.762C7.41747 14.604 7.0649 14.3917 6.74439 14.125C6.55208 13.975 6.34375 13.9 6.11939 13.9C5.89503 13.9 5.6867 13.975 5.49439 14.125C5.35016 14.2583 5.19375 14.3707 5.02516 14.462C4.85721 14.554 4.6851 14.6417 4.50881 14.725C3.89057 14.9816 2.43359 14.9048 2 14.575V10.4648H3.5V7.5C3.5 7.22385 3.72386 7 4.00001 7L9.5 7.0001ZM5 8.46483H8V10.4648H5V8.46483Z" style="fill: var(--element-active-color)"/>
<path d="M19.475 18.612C19.975 18.7373 20.4833 18.8 21 18.8C21.2833 18.8 21.5207 18.704 21.712 18.512C21.904 18.3207 22 18.0833 22 17.8C22 17.5167 21.904 17.2793 21.712 17.088C21.5207 16.896 21.2833 16.8 21 16.8C20.5667 16.8 20.1373 16.7457 19.712 16.637C19.2873 16.529 18.8833 16.3583 18.5 16.125C18.35 16.0417 18.1833 16 18 16C17.8167 16 17.65 16.0417 17.5 16.125C17.1167 16.3583 16.7123 16.529 16.287 16.637C15.8623 16.7457 15.4333 16.8 15 16.8C14.5667 16.8 14.1373 16.7457 13.712 16.637C13.2873 16.529 12.8833 16.3583 12.5 16.125C12.35 16.0417 12.179 16 11.987 16C11.7957 16 11.6333 16.0417 11.5 16.125C11.1167 16.3583 10.7123 16.529 10.287 16.637C9.86233 16.7457 9.43333 16.8 9 16.8C8.56667 16.8 8.13733 16.7457 7.712 16.637C7.28733 16.529 6.88333 16.3583 6.5 16.125C6.36667 16.0417 6.2 16 6 16C5.8 16 5.63333 16.0417 5.5 16.125C5.11667 16.3583 4.71267 16.529 4.288 16.637C3.86267 16.7457 3.43333 16.8 3 16.8C2.71667 16.8 2.47933 16.896 2.288 17.088C2.096 17.2793 2 17.5167 2 17.8C2 18.0833 2.096 18.3207 2.288 18.512C2.47933 18.704 2.71667 18.8 3 18.8C3.51667 18.8 4.025 18.7373 4.525 18.612C5.025 18.4873 5.51667 18.3 6 18.05C6.48333 18.3 6.975 18.4873 7.475 18.612C7.975 18.7373 8.48333 18.8 9 18.8C9.51667 18.8 10.025 18.7373 10.525 18.612C11.025 18.4873 11.5167 18.3 12 18.05C12.4833 18.3 12.975 18.4873 13.475 18.612C13.975 18.7373 14.4833 18.8 15 18.8C15.5167 18.8 16.025 18.7373 16.525 18.612C17.025 18.4873 17.5167 18.3 18 18.05C18.4833 18.3 18.975 18.4873 19.475 18.612Z" style="fill: var(--element-active-color)"/>
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
    'obi-17-ship-bulkcarrier': Obi17ShipBulkcarrier;
  }
}
