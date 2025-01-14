import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-ship-sailship')
export class ObiShipSailship extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M9.33055 5.95701C9.33055 5.95701 10.9734 3.35505 9.07454 1.37454C7.00271 0.531979 5.16463 1.37428 5.16463 1.37428C5.16463 1.37428 6.45433 2.89782 5.55052 5.44676C5.55052 5.44676 7.42923 5.20304 9.33055 5.95701Z" fill="currentColor"/>
<path d="M14.0668 6.12744C14.0668 6.12744 15.227 4.26447 13.5541 2.55029C13.0807 2.16098 11.84 2.15123 11.2788 2.19502C11.4936 2.76493 11.7109 4.18348 11.0821 5.74463C11.0821 5.74463 12.3482 5.5421 14.0668 6.12744Z" fill="currentColor"/>
<path d="M8.77932 7.36519C11.7469 10.3751 8.77916 14.2569 8.77916 14.2569C6.15898 13.2263 4.52153 13.9248 4.52153 13.9248C6.96053 9.25294 4.25836 7.36518 4.25836 7.36518C4.25836 7.36518 6.15917 6.33258 8.77932 7.36519Z" fill="currentColor"/>
<path d="M14.1753 13.436C14.1753 13.436 16.5142 10.2429 13.9531 7.64616C11.8981 6.93213 10.6715 7.32638 10.6715 7.32638C10.6715 7.32638 12.4767 9.67711 11.0639 13.1319C11.0639 13.1319 12.5492 12.781 14.1753 13.436Z" fill="currentColor"/>
<path d="M1 14.3891C13.5366 16.8891 21 13.3891 21 13.3891L22.0366 12.8891V13.3891L20.25 14.3891L17.8869 18.0154C17.8537 17.9977 17.8206 17.98 17.7877 17.962C17.6198 17.8707 17.4637 17.7583 17.3195 17.625C17.1272 17.475 16.9188 17.4 16.6945 17.4C16.4701 17.4 16.2618 17.475 16.0695 17.625C15.749 17.8917 15.3964 18.104 15.0118 18.262C14.6272 18.4207 14.2265 18.5 13.8099 18.5C13.3932 18.5 12.9925 18.4207 12.6079 18.262C12.2233 18.104 11.8708 17.8917 11.5502 17.625C11.3579 17.475 11.1496 17.4 10.9252 17.4C10.7009 17.4 10.4926 17.475 10.3002 17.625C9.97973 17.8917 9.62717 18.104 9.24255 18.262C8.85794 18.4207 8.45729 18.5 8.04063 18.5C7.62396 18.5 7.22332 18.4207 6.8387 18.262C6.45409 18.104 6.10152 17.8917 5.78101 17.625C5.5887 17.475 5.38037 17.4 5.15601 17.4C4.93165 17.4 4.72332 17.475 4.53101 17.625C4.38678 17.7583 4.23037 17.8707 4.06178 17.962C3.89383 18.054 3.72172 18.1417 3.54543 18.225C3.29314 18.3297 2.90116 18.3789 2.49605 18.378L1 14.3891Z" fill="currentColor"/>
<path d="M18.5116 22.112C19.0116 22.2373 19.52 22.3 20.0366 22.3C20.32 22.3 20.5573 22.204 20.7486 22.012C20.9406 21.8207 21.0366 21.5833 21.0366 21.3C21.0366 21.0167 20.9406 20.7793 20.7486 20.588C20.5573 20.396 20.32 20.3 20.0366 20.3C19.6033 20.3 19.174 20.2457 18.7486 20.137C18.324 20.029 17.92 19.8583 17.5366 19.625C17.3866 19.5417 17.22 19.5 17.0366 19.5C16.8533 19.5 16.6866 19.5417 16.5366 19.625C16.1533 19.8583 15.749 20.029 15.3236 20.137C14.899 20.2457 14.47 20.3 14.0366 20.3C13.6033 20.3 13.174 20.2457 12.7486 20.137C12.324 20.029 11.92 19.8583 11.5366 19.625C11.3866 19.5417 11.2156 19.5 11.0236 19.5C10.8323 19.5 10.67 19.5417 10.5366 19.625C10.1533 19.8583 9.74895 20.029 9.32362 20.137C8.89895 20.2457 8.46995 20.3 8.03662 20.3C7.60329 20.3 7.17395 20.2457 6.74862 20.137C6.32395 20.029 5.91995 19.8583 5.53662 19.625C5.40329 19.5417 5.23662 19.5 5.03662 19.5C4.83662 19.5 4.66995 19.5417 4.53662 19.625C4.15329 19.8583 3.74929 20.029 3.32462 20.137C2.89929 20.2457 2.46995 20.3 2.03662 20.3C1.75329 20.3 1.51595 20.396 1.32462 20.588C1.13262 20.7793 1.03662 21.0167 1.03662 21.3C1.03662 21.5833 1.13262 21.8207 1.32462 22.012C1.51595 22.204 1.75329 22.3 2.03662 22.3C2.55329 22.3 3.06162 22.2373 3.56162 22.112C4.06162 21.9873 4.55329 21.8 5.03662 21.55C5.51995 21.8 6.01162 21.9873 6.51162 22.112C7.01162 22.2373 7.51995 22.3 8.03662 22.3C8.55329 22.3 9.06162 22.2373 9.56162 22.112C10.0616 21.9873 10.5533 21.8 11.0366 21.55C11.52 21.8 12.0116 21.9873 12.5116 22.112C13.0116 22.2373 13.52 22.3 14.0366 22.3C14.5533 22.3 15.0616 22.2373 15.5616 22.112C16.0616 21.9873 16.5533 21.8 17.0366 21.55C17.52 21.8 18.0116 21.9873 18.5116 22.112Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M9.33055 5.95701C9.33055 5.95701 10.9734 3.35505 9.07454 1.37454C7.00271 0.531979 5.16463 1.37428 5.16463 1.37428C5.16463 1.37428 6.45433 2.89782 5.55052 5.44676C5.55052 5.44676 7.42923 5.20304 9.33055 5.95701Z" style="fill: var(--element-active-color)"/>
<path d="M14.0668 6.12744C14.0668 6.12744 15.227 4.26447 13.5541 2.55029C13.0807 2.16098 11.84 2.15123 11.2788 2.19502C11.4936 2.76493 11.7109 4.18348 11.0821 5.74463C11.0821 5.74463 12.3482 5.5421 14.0668 6.12744Z" style="fill: var(--element-active-color)"/>
<path d="M8.77932 7.36519C11.7469 10.3751 8.77916 14.2569 8.77916 14.2569C6.15898 13.2263 4.52153 13.9248 4.52153 13.9248C6.96053 9.25294 4.25836 7.36518 4.25836 7.36518C4.25836 7.36518 6.15917 6.33258 8.77932 7.36519Z" style="fill: var(--element-active-color)"/>
<path d="M14.1753 13.436C14.1753 13.436 16.5142 10.2429 13.9531 7.64616C11.8981 6.93213 10.6715 7.32638 10.6715 7.32638C10.6715 7.32638 12.4767 9.67711 11.0639 13.1319C11.0639 13.1319 12.5492 12.781 14.1753 13.436Z" style="fill: var(--element-active-color)"/>
<path d="M1 14.3891C13.5366 16.8891 21 13.3891 21 13.3891L22.0366 12.8891V13.3891L20.25 14.3891L17.8869 18.0154C17.8537 17.9977 17.8206 17.98 17.7877 17.962C17.6198 17.8707 17.4637 17.7583 17.3195 17.625C17.1272 17.475 16.9188 17.4 16.6945 17.4C16.4701 17.4 16.2618 17.475 16.0695 17.625C15.749 17.8917 15.3964 18.104 15.0118 18.262C14.6272 18.4207 14.2265 18.5 13.8099 18.5C13.3932 18.5 12.9925 18.4207 12.6079 18.262C12.2233 18.104 11.8708 17.8917 11.5502 17.625C11.3579 17.475 11.1496 17.4 10.9252 17.4C10.7009 17.4 10.4926 17.475 10.3002 17.625C9.97973 17.8917 9.62717 18.104 9.24255 18.262C8.85794 18.4207 8.45729 18.5 8.04063 18.5C7.62396 18.5 7.22332 18.4207 6.8387 18.262C6.45409 18.104 6.10152 17.8917 5.78101 17.625C5.5887 17.475 5.38037 17.4 5.15601 17.4C4.93165 17.4 4.72332 17.475 4.53101 17.625C4.38678 17.7583 4.23037 17.8707 4.06178 17.962C3.89383 18.054 3.72172 18.1417 3.54543 18.225C3.29314 18.3297 2.90116 18.3789 2.49605 18.378L1 14.3891Z" style="fill: var(--element-active-color)"/>
<path d="M18.5116 22.112C19.0116 22.2373 19.52 22.3 20.0366 22.3C20.32 22.3 20.5573 22.204 20.7486 22.012C20.9406 21.8207 21.0366 21.5833 21.0366 21.3C21.0366 21.0167 20.9406 20.7793 20.7486 20.588C20.5573 20.396 20.32 20.3 20.0366 20.3C19.6033 20.3 19.174 20.2457 18.7486 20.137C18.324 20.029 17.92 19.8583 17.5366 19.625C17.3866 19.5417 17.22 19.5 17.0366 19.5C16.8533 19.5 16.6866 19.5417 16.5366 19.625C16.1533 19.8583 15.749 20.029 15.3236 20.137C14.899 20.2457 14.47 20.3 14.0366 20.3C13.6033 20.3 13.174 20.2457 12.7486 20.137C12.324 20.029 11.92 19.8583 11.5366 19.625C11.3866 19.5417 11.2156 19.5 11.0236 19.5C10.8323 19.5 10.67 19.5417 10.5366 19.625C10.1533 19.8583 9.74895 20.029 9.32362 20.137C8.89895 20.2457 8.46995 20.3 8.03662 20.3C7.60329 20.3 7.17395 20.2457 6.74862 20.137C6.32395 20.029 5.91995 19.8583 5.53662 19.625C5.40329 19.5417 5.23662 19.5 5.03662 19.5C4.83662 19.5 4.66995 19.5417 4.53662 19.625C4.15329 19.8583 3.74929 20.029 3.32462 20.137C2.89929 20.2457 2.46995 20.3 2.03662 20.3C1.75329 20.3 1.51595 20.396 1.32462 20.588C1.13262 20.7793 1.03662 21.0167 1.03662 21.3C1.03662 21.5833 1.13262 21.8207 1.32462 22.012C1.51595 22.204 1.75329 22.3 2.03662 22.3C2.55329 22.3 3.06162 22.2373 3.56162 22.112C4.06162 21.9873 4.55329 21.8 5.03662 21.55C5.51995 21.8 6.01162 21.9873 6.51162 22.112C7.01162 22.2373 7.51995 22.3 8.03662 22.3C8.55329 22.3 9.06162 22.2373 9.56162 22.112C10.0616 21.9873 10.5533 21.8 11.0366 21.55C11.52 21.8 12.0116 21.9873 12.5116 22.112C13.0116 22.2373 13.52 22.3 14.0366 22.3C14.5533 22.3 15.0616 22.2373 15.5616 22.112C16.0616 21.9873 16.5533 21.8 17.0366 21.55C17.52 21.8 18.0116 21.9873 18.5116 22.112Z" style="fill: var(--element-active-color)"/>
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
    'obi-ship-sailship': ObiShipSailship;
  }
}