import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-17-ship-sailship')
export class Obi17ShipSailship extends LitElement {
  @property({type: Boolean, attribute: 'use-css-color'}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M10.2939 5.95701C10.2939 5.95701 11.9368 3.35505 10.0379 1.37454C7.96609 0.531979 6.128 1.37428 6.128 1.37428C6.128 1.37428 7.41771 2.89782 6.5139 5.44676C6.5139 5.44676 8.39261 5.20304 10.2939 5.95701Z" fill="currentColor"/>
<path d="M15.0302 6.12744C15.0302 6.12744 16.1904 4.26447 14.5175 2.55029C14.0441 2.16098 12.8033 2.15123 12.2422 2.19502C12.457 2.76493 12.6743 4.18348 12.0455 5.74463C12.0455 5.74463 13.3116 5.5421 15.0302 6.12744Z" fill="currentColor"/>
<path d="M9.7427 7.36519C12.7103 10.3751 9.74254 14.2569 9.74254 14.2569C7.12236 13.2263 5.48491 13.9248 5.48491 13.9248C7.9239 9.25294 5.22174 7.36518 5.22174 7.36518C5.22174 7.36518 7.12255 6.33258 9.7427 7.36519Z" fill="currentColor"/>
<path d="M15.1387 13.436C15.1387 13.436 17.4776 10.2429 14.9165 7.64616C12.8615 6.93213 11.6349 7.32638 11.6349 7.32638C11.6349 7.32638 13.4401 9.67711 12.0272 13.1319C12.0272 13.1319 13.5126 12.781 15.1387 13.436Z" fill="currentColor"/>
<path d="M1.96338 14.3891C14.5 16.8891 21.9634 13.3891 21.9634 13.3891L23 12.8891V13.3891L21.2134 14.3891L18.8503 18.0154C18.8171 17.9977 18.784 17.98 18.7511 17.962C18.5832 17.8707 18.4271 17.7583 18.2829 17.625C18.0905 17.475 17.8822 17.4 17.6579 17.4C17.4335 17.4 17.2252 17.475 17.0328 17.625C16.7123 17.8917 16.3598 18.104 15.9752 18.262C15.5905 18.4207 15.1899 18.5 14.7732 18.5C14.3566 18.5 13.9559 18.4207 13.5713 18.262C13.1867 18.104 12.8341 17.8917 12.5136 17.625C12.3213 17.475 12.113 17.4 11.8886 17.4C11.6643 17.4 11.4559 17.475 11.2636 17.625C10.9431 17.8917 10.5905 18.104 10.2059 18.262C9.82131 18.4207 9.42067 18.5 9.004 18.5C8.58734 18.5 8.1867 18.4207 7.80208 18.262C7.41747 18.104 7.0649 17.8917 6.74439 17.625C6.55208 17.475 6.34375 17.4 6.11939 17.4C5.89503 17.4 5.6867 17.475 5.49439 17.625C5.35016 17.7583 5.19375 17.8707 5.02516 17.962C4.85721 18.054 4.6851 18.1417 4.50881 18.225C4.25652 18.3297 3.86454 18.3789 3.45943 18.378L1.96338 14.3891Z" fill="currentColor"/>
<path d="M19.475 22.112C19.975 22.2373 20.4833 22.3 21 22.3C21.2833 22.3 21.5207 22.204 21.712 22.012C21.904 21.8207 22 21.5833 22 21.3C22 21.0167 21.904 20.7793 21.712 20.588C21.5207 20.396 21.2833 20.3 21 20.3C20.5667 20.3 20.1373 20.2457 19.712 20.137C19.2873 20.029 18.8833 19.8583 18.5 19.625C18.35 19.5417 18.1833 19.5 18 19.5C17.8167 19.5 17.65 19.5417 17.5 19.625C17.1167 19.8583 16.7123 20.029 16.287 20.137C15.8623 20.2457 15.4333 20.3 15 20.3C14.5667 20.3 14.1373 20.2457 13.712 20.137C13.2873 20.029 12.8833 19.8583 12.5 19.625C12.35 19.5417 12.179 19.5 11.987 19.5C11.7957 19.5 11.6333 19.5417 11.5 19.625C11.1167 19.8583 10.7123 20.029 10.287 20.137C9.86233 20.2457 9.43333 20.3 9 20.3C8.56667 20.3 8.13733 20.2457 7.712 20.137C7.28733 20.029 6.88333 19.8583 6.5 19.625C6.36667 19.5417 6.2 19.5 6 19.5C5.8 19.5 5.63333 19.5417 5.5 19.625C5.11667 19.8583 4.71267 20.029 4.288 20.137C3.86267 20.2457 3.43333 20.3 3 20.3C2.71667 20.3 2.47933 20.396 2.288 20.588C2.096 20.7793 2 21.0167 2 21.3C2 21.5833 2.096 21.8207 2.288 22.012C2.47933 22.204 2.71667 22.3 3 22.3C3.51667 22.3 4.025 22.2373 4.525 22.112C5.025 21.9873 5.51667 21.8 6 21.55C6.48333 21.8 6.975 21.9873 7.475 22.112C7.975 22.2373 8.48333 22.3 9 22.3C9.51667 22.3 10.025 22.2373 10.525 22.112C11.025 21.9873 11.5167 21.8 12 21.55C12.4833 21.8 12.975 21.9873 13.475 22.112C13.975 22.2373 14.4833 22.3 15 22.3C15.5167 22.3 16.025 22.2373 16.525 22.112C17.025 21.9873 17.5167 21.8 18 21.55C18.4833 21.8 18.975 21.9873 19.475 22.112Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M10.2939 5.95701C10.2939 5.95701 11.9368 3.35505 10.0379 1.37454C7.96609 0.531979 6.128 1.37428 6.128 1.37428C6.128 1.37428 7.41771 2.89782 6.5139 5.44676C6.5139 5.44676 8.39261 5.20304 10.2939 5.95701Z" style="fill: var(--element-active-color)"/>
<path d="M15.0302 6.12744C15.0302 6.12744 16.1904 4.26447 14.5175 2.55029C14.0441 2.16098 12.8033 2.15123 12.2422 2.19502C12.457 2.76493 12.6743 4.18348 12.0455 5.74463C12.0455 5.74463 13.3116 5.5421 15.0302 6.12744Z" style="fill: var(--element-active-color)"/>
<path d="M9.7427 7.36519C12.7103 10.3751 9.74254 14.2569 9.74254 14.2569C7.12236 13.2263 5.48491 13.9248 5.48491 13.9248C7.9239 9.25294 5.22174 7.36518 5.22174 7.36518C5.22174 7.36518 7.12255 6.33258 9.7427 7.36519Z" style="fill: var(--element-active-color)"/>
<path d="M15.1387 13.436C15.1387 13.436 17.4776 10.2429 14.9165 7.64616C12.8615 6.93213 11.6349 7.32638 11.6349 7.32638C11.6349 7.32638 13.4401 9.67711 12.0272 13.1319C12.0272 13.1319 13.5126 12.781 15.1387 13.436Z" style="fill: var(--element-active-color)"/>
<path d="M1.96338 14.3891C14.5 16.8891 21.9634 13.3891 21.9634 13.3891L23 12.8891V13.3891L21.2134 14.3891L18.8503 18.0154C18.8171 17.9977 18.784 17.98 18.7511 17.962C18.5832 17.8707 18.4271 17.7583 18.2829 17.625C18.0905 17.475 17.8822 17.4 17.6579 17.4C17.4335 17.4 17.2252 17.475 17.0328 17.625C16.7123 17.8917 16.3598 18.104 15.9752 18.262C15.5905 18.4207 15.1899 18.5 14.7732 18.5C14.3566 18.5 13.9559 18.4207 13.5713 18.262C13.1867 18.104 12.8341 17.8917 12.5136 17.625C12.3213 17.475 12.113 17.4 11.8886 17.4C11.6643 17.4 11.4559 17.475 11.2636 17.625C10.9431 17.8917 10.5905 18.104 10.2059 18.262C9.82131 18.4207 9.42067 18.5 9.004 18.5C8.58734 18.5 8.1867 18.4207 7.80208 18.262C7.41747 18.104 7.0649 17.8917 6.74439 17.625C6.55208 17.475 6.34375 17.4 6.11939 17.4C5.89503 17.4 5.6867 17.475 5.49439 17.625C5.35016 17.7583 5.19375 17.8707 5.02516 17.962C4.85721 18.054 4.6851 18.1417 4.50881 18.225C4.25652 18.3297 3.86454 18.3789 3.45943 18.378L1.96338 14.3891Z" style="fill: var(--element-active-color)"/>
<path d="M19.475 22.112C19.975 22.2373 20.4833 22.3 21 22.3C21.2833 22.3 21.5207 22.204 21.712 22.012C21.904 21.8207 22 21.5833 22 21.3C22 21.0167 21.904 20.7793 21.712 20.588C21.5207 20.396 21.2833 20.3 21 20.3C20.5667 20.3 20.1373 20.2457 19.712 20.137C19.2873 20.029 18.8833 19.8583 18.5 19.625C18.35 19.5417 18.1833 19.5 18 19.5C17.8167 19.5 17.65 19.5417 17.5 19.625C17.1167 19.8583 16.7123 20.029 16.287 20.137C15.8623 20.2457 15.4333 20.3 15 20.3C14.5667 20.3 14.1373 20.2457 13.712 20.137C13.2873 20.029 12.8833 19.8583 12.5 19.625C12.35 19.5417 12.179 19.5 11.987 19.5C11.7957 19.5 11.6333 19.5417 11.5 19.625C11.1167 19.8583 10.7123 20.029 10.287 20.137C9.86233 20.2457 9.43333 20.3 9 20.3C8.56667 20.3 8.13733 20.2457 7.712 20.137C7.28733 20.029 6.88333 19.8583 6.5 19.625C6.36667 19.5417 6.2 19.5 6 19.5C5.8 19.5 5.63333 19.5417 5.5 19.625C5.11667 19.8583 4.71267 20.029 4.288 20.137C3.86267 20.2457 3.43333 20.3 3 20.3C2.71667 20.3 2.47933 20.396 2.288 20.588C2.096 20.7793 2 21.0167 2 21.3C2 21.5833 2.096 21.8207 2.288 22.012C2.47933 22.204 2.71667 22.3 3 22.3C3.51667 22.3 4.025 22.2373 4.525 22.112C5.025 21.9873 5.51667 21.8 6 21.55C6.48333 21.8 6.975 21.9873 7.475 22.112C7.975 22.2373 8.48333 22.3 9 22.3C9.51667 22.3 10.025 22.2373 10.525 22.112C11.025 21.9873 11.5167 21.8 12 21.55C12.4833 21.8 12.975 21.9873 13.475 22.112C13.975 22.2373 14.4833 22.3 15 22.3C15.5167 22.3 16.025 22.2373 16.525 22.112C17.025 21.9873 17.5167 21.8 18 21.55C18.4833 21.8 18.975 21.9873 19.475 22.112Z" style="fill: var(--element-active-color)"/>
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
    'obi-17-ship-sailship': Obi17ShipSailship;
  }
}