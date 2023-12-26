import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-17-kitesurfing')
export class Obi17Kitesurfing extends LitElement {
  @property({type: Boolean, attribute: 'use-css-color'}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M8 5C7.45 5 6.97933 4.804 6.588 4.412C6.196 4.02067 6 3.55 6 3C6 2.45 6.196 1.979 6.588 1.587C6.97933 1.19567 7.45 1 8 1C8.55 1 9.021 1.19567 9.413 1.587C9.80433 1.979 10 2.45 10 3C10 3.55 9.80433 4.02067 9.413 4.412C9.021 4.804 8.55 5 8 5ZM16.025 3.975C15.875 3.825 15.8 3.65 15.8 3.45C15.8 3.25 15.875 3.075 16.025 2.925L17.95 1H20.05L17.075 3.975C16.925 4.125 16.75 4.2 16.55 4.2C16.35 4.2 16.175 4.125 16.025 3.975ZM9 19C8.51667 19 8.06667 18.9083 7.65 18.725C7.23333 18.5417 6.85 18.3 6.5 18C6.73333 17.8167 6.975 17.625 7.225 17.425C7.475 17.225 7.73333 17.0333 8 16.85L6.45 13.875C6.3 13.5917 6.18767 13.2917 6.113 12.975C6.03767 12.6583 6 12.3333 6 12V8C6 7.45 6.196 6.97933 6.588 6.588C6.97933 6.196 7.45 6 8 6H11C11.7 6 12.35 5.87067 12.95 5.612C13.55 5.354 14.0833 5 14.55 4.55L15.95 5.95C15.3167 6.58333 14.575 7.08333 13.725 7.45C12.875 7.81667 11.9667 8 11 8H9.6V11.5H11.525C11.8083 11.5 12.0793 11.554 12.338 11.662C12.596 11.7707 12.8167 11.9333 13 12.15L14.1 13.375C15.0833 12.9583 16.0083 12.625 16.875 12.375C17.7417 12.125 18.5 12 19.15 12C19.5833 12 20 12.0833 20.4 12.25C20.8 12.4167 21 12.7583 21 13.275C21 14.0083 20.5167 14.875 19.55 15.875C18.5833 16.875 17.3833 17.8667 15.95 18.85C15.8 18.9 15.646 18.9373 15.488 18.962C15.3293 18.9873 15.1667 19 15 19C14.4 19 13.8417 18.8583 13.325 18.575C12.8083 18.2917 12.3667 17.9333 12 17.5C11.6333 17.9333 11.1917 18.2917 10.675 18.575C10.1583 18.8583 9.6 19 9 19ZM9.825 15.6C10.125 15.4167 10.525 15.1833 11.025 14.9C11.525 14.6167 11.9167 14.4083 12.2 14.275L11.5 13.5L9 13.6L9.825 15.6ZM3 23C2.71667 23 2.47933 22.904 2.288 22.712C2.096 22.5207 2 22.2833 2 22C2 21.7167 2.096 21.4793 2.288 21.288C2.47933 21.096 2.71667 21 3 21C3.43333 21 3.86267 20.9457 4.288 20.837C4.71267 20.729 5.11667 20.5583 5.5 20.325C5.65 20.2417 5.81667 20.2 6 20.2C6.18333 20.2 6.35 20.2417 6.5 20.325C6.88333 20.5583 7.28767 20.729 7.713 20.837C8.13767 20.9457 8.56667 21 9 21C9.43333 21 9.86267 20.9457 10.288 20.837C10.7127 20.729 11.1167 20.5583 11.5 20.325C11.65 20.2417 11.821 20.2 12.013 20.2C12.2043 20.2 12.3667 20.2417 12.5 20.325C12.8833 20.5583 13.2877 20.729 13.713 20.837C14.1377 20.9457 14.5667 21 15 21C15.4333 21 15.8627 20.9457 16.288 20.837C16.7127 20.729 17.1167 20.5583 17.5 20.325C17.6333 20.2417 17.8 20.2 18 20.2C18.2 20.2 18.3667 20.2417 18.5 20.325C18.8833 20.5583 19.2873 20.729 19.712 20.837C20.1373 20.9457 20.5667 21 21 21C21.2833 21 21.5207 21.096 21.712 21.288C21.904 21.4793 22 21.7167 22 22C22 22.2833 21.904 22.5207 21.712 22.712C21.5207 22.904 21.2833 23 21 23C20.4833 23 19.975 22.9373 19.475 22.812C18.975 22.6873 18.4833 22.5 18 22.25C17.5167 22.5 17.025 22.6873 16.525 22.812C16.025 22.9373 15.5167 23 15 23C14.4833 23 13.975 22.9373 13.475 22.812C12.975 22.6873 12.4833 22.5 12 22.25C11.5167 22.5 11.025 22.6873 10.525 22.812C10.025 22.9373 9.51667 23 9 23C8.48333 23 7.975 22.9373 7.475 22.812C6.975 22.6873 6.48333 22.5 6 22.25C5.51667 22.5 5.025 22.6873 4.525 22.812C4.025 22.9373 3.51667 23 3 23Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M8 5C7.45 5 6.97933 4.804 6.588 4.412C6.196 4.02067 6 3.55 6 3C6 2.45 6.196 1.979 6.588 1.587C6.97933 1.19567 7.45 1 8 1C8.55 1 9.021 1.19567 9.413 1.587C9.80433 1.979 10 2.45 10 3C10 3.55 9.80433 4.02067 9.413 4.412C9.021 4.804 8.55 5 8 5ZM16.025 3.975C15.875 3.825 15.8 3.65 15.8 3.45C15.8 3.25 15.875 3.075 16.025 2.925L17.95 1H20.05L17.075 3.975C16.925 4.125 16.75 4.2 16.55 4.2C16.35 4.2 16.175 4.125 16.025 3.975ZM9 19C8.51667 19 8.06667 18.9083 7.65 18.725C7.23333 18.5417 6.85 18.3 6.5 18C6.73333 17.8167 6.975 17.625 7.225 17.425C7.475 17.225 7.73333 17.0333 8 16.85L6.45 13.875C6.3 13.5917 6.18767 13.2917 6.113 12.975C6.03767 12.6583 6 12.3333 6 12V8C6 7.45 6.196 6.97933 6.588 6.588C6.97933 6.196 7.45 6 8 6H11C11.7 6 12.35 5.87067 12.95 5.612C13.55 5.354 14.0833 5 14.55 4.55L15.95 5.95C15.3167 6.58333 14.575 7.08333 13.725 7.45C12.875 7.81667 11.9667 8 11 8H9.6V11.5H11.525C11.8083 11.5 12.0793 11.554 12.338 11.662C12.596 11.7707 12.8167 11.9333 13 12.15L14.1 13.375C15.0833 12.9583 16.0083 12.625 16.875 12.375C17.7417 12.125 18.5 12 19.15 12C19.5833 12 20 12.0833 20.4 12.25C20.8 12.4167 21 12.7583 21 13.275C21 14.0083 20.5167 14.875 19.55 15.875C18.5833 16.875 17.3833 17.8667 15.95 18.85C15.8 18.9 15.646 18.9373 15.488 18.962C15.3293 18.9873 15.1667 19 15 19C14.4 19 13.8417 18.8583 13.325 18.575C12.8083 18.2917 12.3667 17.9333 12 17.5C11.6333 17.9333 11.1917 18.2917 10.675 18.575C10.1583 18.8583 9.6 19 9 19ZM9.825 15.6C10.125 15.4167 10.525 15.1833 11.025 14.9C11.525 14.6167 11.9167 14.4083 12.2 14.275L11.5 13.5L9 13.6L9.825 15.6ZM3 23C2.71667 23 2.47933 22.904 2.288 22.712C2.096 22.5207 2 22.2833 2 22C2 21.7167 2.096 21.4793 2.288 21.288C2.47933 21.096 2.71667 21 3 21C3.43333 21 3.86267 20.9457 4.288 20.837C4.71267 20.729 5.11667 20.5583 5.5 20.325C5.65 20.2417 5.81667 20.2 6 20.2C6.18333 20.2 6.35 20.2417 6.5 20.325C6.88333 20.5583 7.28767 20.729 7.713 20.837C8.13767 20.9457 8.56667 21 9 21C9.43333 21 9.86267 20.9457 10.288 20.837C10.7127 20.729 11.1167 20.5583 11.5 20.325C11.65 20.2417 11.821 20.2 12.013 20.2C12.2043 20.2 12.3667 20.2417 12.5 20.325C12.8833 20.5583 13.2877 20.729 13.713 20.837C14.1377 20.9457 14.5667 21 15 21C15.4333 21 15.8627 20.9457 16.288 20.837C16.7127 20.729 17.1167 20.5583 17.5 20.325C17.6333 20.2417 17.8 20.2 18 20.2C18.2 20.2 18.3667 20.2417 18.5 20.325C18.8833 20.5583 19.2873 20.729 19.712 20.837C20.1373 20.9457 20.5667 21 21 21C21.2833 21 21.5207 21.096 21.712 21.288C21.904 21.4793 22 21.7167 22 22C22 22.2833 21.904 22.5207 21.712 22.712C21.5207 22.904 21.2833 23 21 23C20.4833 23 19.975 22.9373 19.475 22.812C18.975 22.6873 18.4833 22.5 18 22.25C17.5167 22.5 17.025 22.6873 16.525 22.812C16.025 22.9373 15.5167 23 15 23C14.4833 23 13.975 22.9373 13.475 22.812C12.975 22.6873 12.4833 22.5 12 22.25C11.5167 22.5 11.025 22.6873 10.525 22.812C10.025 22.9373 9.51667 23 9 23C8.48333 23 7.975 22.9373 7.475 22.812C6.975 22.6873 6.48333 22.5 6 22.25C5.51667 22.5 5.025 22.6873 4.525 22.812C4.025 22.9373 3.51667 23 3 23Z" fill="currentColor"/>
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
    'obi-17-kitesurfing': Obi17Kitesurfing;
  }
}