import {LitElement, html, css, svg, unsafeCSS} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-17-ship-tugboat')
export class Obi17ShipTugboat extends LitElement {
  @property({type: Boolean, attribute: 'use-css-color'}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M15.5 7L16 9.9999L21.3063 9.99999C21.6475 9.99999 21.8885 10.3343 21.7806 10.6581L20.5201 14.4397C20.2386 14.7363 19.9254 14.9981 19.5804 15.225C19.383 15.1417 19.1898 15.054 19.001 14.962C18.8129 14.8707 18.6381 14.7583 18.4766 14.625C18.2612 14.475 18.0278 14.4 17.7766 14.4C17.5253 14.4 17.292 14.475 17.0766 14.625C16.7176 14.8917 16.3227 15.104 15.892 15.262C15.4612 15.4207 15.0125 15.5 14.5458 15.5C14.0791 15.5 13.6304 15.4207 13.1996 15.262C12.7689 15.104 12.374 14.8917 12.015 14.625C11.7996 14.475 11.5663 14.4 11.315 14.4C11.0637 14.4 10.8304 14.475 10.615 14.625C10.2561 14.8917 9.86118 15.104 9.43042 15.262C8.99964 15.4207 8.55093 15.5 8.08426 15.5C7.61759 15.5 7.16888 15.4207 6.73811 15.262C6.30734 15.104 5.91247 14.8917 5.55349 14.625C5.33811 14.475 5.10477 14.4 4.85349 14.4C4.60221 14.4 4.36888 14.475 4.15349 14.625C3.99195 14.7583 3.81677 14.8707 3.62795 14.962C3.43985 15.054 3.24708 15.1417 3.04965 15.225C2.65939 14.9683 2.3095 14.667 1.99997 14.3212V12H9.99997L11 10V7H12V5H13V7H15.5ZM12 8H14.5L15 10H12V8Z" fill="currentColor"/>
<path d="M19.475 19.112C19.975 19.2373 20.4833 19.3 21 19.3C21.2833 19.3 21.5207 19.204 21.712 19.012C21.904 18.8207 22 18.5833 22 18.3C22 18.0167 21.904 17.7793 21.712 17.588C21.5207 17.396 21.2833 17.3 21 17.3C20.5667 17.3 20.1373 17.2457 19.712 17.137C19.2873 17.029 18.8833 16.8583 18.5 16.625C18.35 16.5417 18.1833 16.5 18 16.5C17.8167 16.5 17.65 16.5417 17.5 16.625C17.1167 16.8583 16.7123 17.029 16.287 17.137C15.8623 17.2457 15.4333 17.3 15 17.3C14.5667 17.3 14.1373 17.2457 13.712 17.137C13.2873 17.029 12.8833 16.8583 12.5 16.625C12.35 16.5417 12.179 16.5 11.987 16.5C11.7957 16.5 11.6333 16.5417 11.5 16.625C11.1167 16.8583 10.7123 17.029 10.287 17.137C9.86233 17.2457 9.43333 17.3 9 17.3C8.56667 17.3 8.13733 17.2457 7.712 17.137C7.28733 17.029 6.88333 16.8583 6.5 16.625C6.36667 16.5417 6.2 16.5 6 16.5C5.8 16.5 5.63333 16.5417 5.5 16.625C5.11667 16.8583 4.71267 17.029 4.288 17.137C3.86267 17.2457 3.43333 17.3 3 17.3C2.71667 17.3 2.47933 17.396 2.288 17.588C2.096 17.7793 2 18.0167 2 18.3C2 18.5833 2.096 18.8207 2.288 19.012C2.47933 19.204 2.71667 19.3 3 19.3C3.51667 19.3 4.025 19.2373 4.525 19.112C5.025 18.9873 5.51667 18.8 6 18.55C6.48333 18.8 6.975 18.9873 7.475 19.112C7.975 19.2373 8.48333 19.3 9 19.3C9.51667 19.3 10.025 19.2373 10.525 19.112C11.025 18.9873 11.5167 18.8 12 18.55C12.4833 18.8 12.975 18.9873 13.475 19.112C13.975 19.2373 14.4833 19.3 15 19.3C15.5167 19.3 16.025 19.2373 16.525 19.112C17.025 18.9873 17.5167 18.8 18 18.55C18.4833 18.8 18.975 18.9873 19.475 19.112Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M15.5 7L16 9.9999L21.3063 9.99999C21.6475 9.99999 21.8885 10.3343 21.7806 10.6581L20.5201 14.4397C20.2386 14.7363 19.9254 14.9981 19.5804 15.225C19.383 15.1417 19.1898 15.054 19.001 14.962C18.8129 14.8707 18.6381 14.7583 18.4766 14.625C18.2612 14.475 18.0278 14.4 17.7766 14.4C17.5253 14.4 17.292 14.475 17.0766 14.625C16.7176 14.8917 16.3227 15.104 15.892 15.262C15.4612 15.4207 15.0125 15.5 14.5458 15.5C14.0791 15.5 13.6304 15.4207 13.1996 15.262C12.7689 15.104 12.374 14.8917 12.015 14.625C11.7996 14.475 11.5663 14.4 11.315 14.4C11.0637 14.4 10.8304 14.475 10.615 14.625C10.2561 14.8917 9.86118 15.104 9.43042 15.262C8.99964 15.4207 8.55093 15.5 8.08426 15.5C7.61759 15.5 7.16888 15.4207 6.73811 15.262C6.30734 15.104 5.91247 14.8917 5.55349 14.625C5.33811 14.475 5.10477 14.4 4.85349 14.4C4.60221 14.4 4.36888 14.475 4.15349 14.625C3.99195 14.7583 3.81677 14.8707 3.62795 14.962C3.43985 15.054 3.24708 15.1417 3.04965 15.225C2.65939 14.9683 2.3095 14.667 1.99997 14.3212V12H9.99997L11 10V7H12V5H13V7H15.5ZM12 8H14.5L15 10H12V8Z" style="fill: var(--element-active-color)"/>
<path d="M19.475 19.112C19.975 19.2373 20.4833 19.3 21 19.3C21.2833 19.3 21.5207 19.204 21.712 19.012C21.904 18.8207 22 18.5833 22 18.3C22 18.0167 21.904 17.7793 21.712 17.588C21.5207 17.396 21.2833 17.3 21 17.3C20.5667 17.3 20.1373 17.2457 19.712 17.137C19.2873 17.029 18.8833 16.8583 18.5 16.625C18.35 16.5417 18.1833 16.5 18 16.5C17.8167 16.5 17.65 16.5417 17.5 16.625C17.1167 16.8583 16.7123 17.029 16.287 17.137C15.8623 17.2457 15.4333 17.3 15 17.3C14.5667 17.3 14.1373 17.2457 13.712 17.137C13.2873 17.029 12.8833 16.8583 12.5 16.625C12.35 16.5417 12.179 16.5 11.987 16.5C11.7957 16.5 11.6333 16.5417 11.5 16.625C11.1167 16.8583 10.7123 17.029 10.287 17.137C9.86233 17.2457 9.43333 17.3 9 17.3C8.56667 17.3 8.13733 17.2457 7.712 17.137C7.28733 17.029 6.88333 16.8583 6.5 16.625C6.36667 16.5417 6.2 16.5 6 16.5C5.8 16.5 5.63333 16.5417 5.5 16.625C5.11667 16.8583 4.71267 17.029 4.288 17.137C3.86267 17.2457 3.43333 17.3 3 17.3C2.71667 17.3 2.47933 17.396 2.288 17.588C2.096 17.7793 2 18.0167 2 18.3C2 18.5833 2.096 18.8207 2.288 19.012C2.47933 19.204 2.71667 19.3 3 19.3C3.51667 19.3 4.025 19.2373 4.525 19.112C5.025 18.9873 5.51667 18.8 6 18.55C6.48333 18.8 6.975 18.9873 7.475 19.112C7.975 19.2373 8.48333 19.3 9 19.3C9.51667 19.3 10.025 19.2373 10.525 19.112C11.025 18.9873 11.5167 18.8 12 18.55C12.4833 18.8 12.975 18.9873 13.475 19.112C13.975 19.2373 14.4833 19.3 15 19.3C15.5167 19.3 16.025 19.2373 16.525 19.112C17.025 18.9873 17.5167 18.8 18 18.55C18.4833 18.8 18.975 18.9873 19.475 19.112Z" style="fill: var(--element-active-color)"/>
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
    'obi-17-ship-tugboat': Obi17ShipTugboat;
  }
}
