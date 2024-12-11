import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-light-sleet-showers-day-colour')
export class ObiLightSleetShowersDayColour extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="32" height="32" viewBox="0 0 32 32" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M24 15.3487C24 15.3487 27.4497 15.8351 27.3333 17.3487C27.2486 18.45 26.4379 19.3487 25.3333 19.3487H6.66663C5.56206 19.3487 4.66663 18.4533 4.66663 17.3487C4.66663 16.2441 5.33329 15.3487 6.66663 15.3487H9.33329C9.33329 15.3487 8.95829 14.2237 9.33329 13.3799C9.45829 13.0987 9.66663 12.8487 9.99996 12.682C10.3898 12.4871 10.7796 12.5202 11.1362 12.6645C11.999 13.0139 12.6666 14.0154 12.6666 14.0154C12.6666 14.0154 13.0854 13.203 13.8692 12.309C14.8895 11.1452 16.5282 9.8433 18.6666 10.0154C24 10.4445 24 15.3487 24 15.3487ZM12.333 11.0275C12.4855 10.8521 12.6503 10.6731 12.8272 10.4944C14.0443 9.26463 16.0905 7.80162 18.827 8.02181C22.242 8.29658 24.1524 10.0865 25.107 11.9189C25.4389 12.5559 25.645 13.1745 25.774 13.6989C25.9743 13.7572 26.1852 13.825 26.3986 13.9033C26.9122 14.0915 27.5831 14.3908 28.1495 14.8675C28.733 15.3587 29.4242 16.2438 29.3274 17.5021C29.178 19.4449 27.6727 21.3487 25.3333 21.3487H6.66662C4.45749 21.3487 2.66663 19.5578 2.66663 17.3487C2.66663 16.4054 2.95372 15.385 3.69549 14.5796C4.46207 13.7472 5.52695 13.3487 6.66663 13.3487H7.25983C7.43538 12.5009 7.91136 11.4903 9.10553 10.8932C10.3817 10.2551 11.5414 10.5914 12.333 11.0275Z" fill="currentColor"/>
<path d="M9.99996 12.6821C8.66663 13.3487 9.33329 15.3487 9.33329 15.3487H6.66663C5.33329 15.3487 4.66663 16.2442 4.66663 17.3487C4.66663 18.4533 5.56206 19.3487 6.66663 19.3487H25.3333C26.4379 19.3487 27.2486 18.45 27.3333 17.3487C27.4497 15.8351 24 15.3487 24 15.3487C24 15.3487 24 10.4445 18.6666 10.0154C14.8855 9.71116 12.6666 14.0154 12.6666 14.0154C12.6666 14.0154 11.3333 12.0154 9.99996 12.6821Z" fill="currentColor"/>
<path d="M11.6302 1.62937C11.4045 1.24899 10.8094 1.31501 10.6726 1.73559L9.93391 4.00639C9.83985 4.29555 9.50225 4.44272 9.21489 4.31985L6.95814 3.35492C6.54016 3.1762 6.09572 3.5634 6.243 3.97794L7.03821 6.21614C7.13947 6.50114 6.95487 6.8089 6.64505 6.8716L4.21192 7.36403C3.76127 7.45524 3.63728 8.01571 4.0124 8.26588L6.03777 9.61656C6.29567 9.78855 6.33458 10.1393 6.12064 10.3637L4.4405 12.1254C4.12932 12.4516 4.37313 12.9713 4.83281 12.9616L7.31471 12.9088C7.33533 12.9084 7.35567 12.9091 7.37565 12.9108C7.54618 12.3864 7.84648 11.8388 8.36314 11.3875C8.0721 10.9161 7.87964 10.3786 7.81519 9.79755C7.57164 7.60187 9.24783 5.6141 11.5591 5.35774C13.6897 5.1214 15.6163 6.43898 16.0951 8.36649C16.7266 8.14973 17.4186 8.01286 18.1679 8.00059L19.5596 6.54135C19.8708 6.21506 19.627 5.69538 19.1673 5.70515L16.6854 5.75791C16.3694 5.76462 16.1218 5.5048 16.1581 5.20454L16.4435 2.84648C16.4964 2.40973 15.9779 2.12935 15.6092 2.39533L13.6188 3.83136C13.3654 4.01422 13.0037 3.9446 12.8486 3.68309L11.6302 1.62937Z" fill="currentColor"/>
<path d="M8.36322 11.3875C8.57308 11.2042 8.81862 11.0367 9.10566 10.8932C10.3818 10.2552 11.5415 10.5915 12.3331 11.0276C12.4856 10.8521 12.6504 10.6732 12.8273 10.4944C13.5969 9.7169 14.6978 8.84611 16.0952 8.36648C15.6163 6.43896 13.6898 5.12137 11.5591 5.35771C9.2479 5.61408 7.57171 7.60185 7.81526 9.79752C7.87972 10.3786 8.07218 10.916 8.36322 11.3875Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M18.5447 23.337C18.8153 22.7507 19.4544 22.5309 20.023 22.7496L20.0331 22.7535L20.043 22.758C20.6294 23.0287 20.8491 23.6678 20.6304 24.2364L20.625 24.2504L19.5067 26.8058C19.3199 27.2665 18.8978 27.49 18.4633 27.49C18.3124 27.49 18.1431 27.444 18.0379 27.4089L18.0204 27.4031L18.0036 27.3953C17.4173 27.1247 17.1975 26.4856 17.4162 25.917L17.4216 25.9029L18.5447 23.337Z" fill="currentColor"/>
<path d="M10.6666 29.2339C10.3478 29.0293 10.2385 28.576 10.4226 28.2216L10.8453 27.4078H9.99992C9.63173 27.4078 9.33325 27.076 9.33325 26.6667C9.33325 26.2574 9.63173 25.9256 9.99992 25.9256H10.8453L10.4226 25.1118C10.2385 24.7573 10.3478 24.3041 10.6666 24.0994C10.9855 23.8948 11.3932 24.0162 11.5773 24.3707L12 25.1845L12.4226 24.3707C12.6067 24.0162 13.0144 23.8948 13.3333 24.0994C13.6522 24.3041 13.7614 24.7573 13.5773 25.1118L13.1547 25.9256H13.9999C14.3681 25.9256 14.6666 26.2574 14.6666 26.6667C14.6666 27.076 14.3681 27.4078 13.9999 27.4078H13.1547L13.5773 28.2216C13.7614 28.576 13.6522 29.0293 13.3333 29.2339C13.0144 29.4386 12.6067 29.3171 12.4226 28.9627L12 28.1489L11.5773 28.9627C11.3932 29.3171 10.9855 29.4386 10.6666 29.2339Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M24 15.3487C24 15.3487 27.4497 15.8351 27.3333 17.3487C27.2486 18.45 26.4379 19.3487 25.3333 19.3487H6.66663C5.56206 19.3487 4.66663 18.4533 4.66663 17.3487C4.66663 16.2441 5.33329 15.3487 6.66663 15.3487H9.33329C9.33329 15.3487 8.95829 14.2237 9.33329 13.3799C9.45829 13.0987 9.66663 12.8487 9.99996 12.682C10.3898 12.4871 10.7796 12.5202 11.1362 12.6645C11.999 13.0139 12.6666 14.0154 12.6666 14.0154C12.6666 14.0154 13.0854 13.203 13.8692 12.309C14.8895 11.1452 16.5282 9.8433 18.6666 10.0154C24 10.4445 24 15.3487 24 15.3487ZM12.333 11.0275C12.4855 10.8521 12.6503 10.6731 12.8272 10.4944C14.0443 9.26463 16.0905 7.80162 18.827 8.02181C22.242 8.29658 24.1524 10.0865 25.107 11.9189C25.4389 12.5559 25.645 13.1745 25.774 13.6989C25.9743 13.7572 26.1852 13.825 26.3986 13.9033C26.9122 14.0915 27.5831 14.3908 28.1495 14.8675C28.733 15.3587 29.4242 16.2438 29.3274 17.5021C29.178 19.4449 27.6727 21.3487 25.3333 21.3487H6.66662C4.45749 21.3487 2.66663 19.5578 2.66663 17.3487C2.66663 16.4054 2.95372 15.385 3.69549 14.5796C4.46207 13.7472 5.52695 13.3487 6.66663 13.3487H7.25983C7.43538 12.5009 7.91136 11.4903 9.10553 10.8932C10.3817 10.2551 11.5414 10.5914 12.333 11.0275Z" style="fill: var(--data-weather-cloud-light-primary-color)"/>
<path d="M9.99996 12.6821C8.66663 13.3487 9.33329 15.3487 9.33329 15.3487H6.66663C5.33329 15.3487 4.66663 16.2442 4.66663 17.3487C4.66663 18.4533 5.56206 19.3487 6.66663 19.3487H25.3333C26.4379 19.3487 27.2486 18.45 27.3333 17.3487C27.4497 15.8351 24 15.3487 24 15.3487C24 15.3487 24 10.4445 18.6666 10.0154C14.8855 9.71116 12.6666 14.0154 12.6666 14.0154C12.6666 14.0154 11.3333 12.0154 9.99996 12.6821Z" style="fill: var(--data-weather-cloud-light-seconday-color)"/>
<path d="M11.6302 1.62937C11.4045 1.24899 10.8094 1.31501 10.6726 1.73559L9.93391 4.00639C9.83985 4.29555 9.50225 4.44272 9.21489 4.31985L6.95814 3.35492C6.54016 3.1762 6.09572 3.5634 6.243 3.97794L7.03821 6.21614C7.13947 6.50114 6.95487 6.8089 6.64505 6.8716L4.21192 7.36403C3.76127 7.45524 3.63728 8.01571 4.0124 8.26588L6.03777 9.61656C6.29567 9.78855 6.33458 10.1393 6.12064 10.3637L4.4405 12.1254C4.12932 12.4516 4.37313 12.9713 4.83281 12.9616L7.31471 12.9088C7.33533 12.9084 7.35567 12.9091 7.37565 12.9108C7.54618 12.3864 7.84648 11.8388 8.36314 11.3875C8.0721 10.9161 7.87964 10.3786 7.81519 9.79755C7.57164 7.60187 9.24783 5.6141 11.5591 5.35774C13.6897 5.1214 15.6163 6.43898 16.0951 8.36649C16.7266 8.14973 17.4186 8.01286 18.1679 8.00059L19.5596 6.54135C19.8708 6.21506 19.627 5.69538 19.1673 5.70515L16.6854 5.75791C16.3694 5.76462 16.1218 5.5048 16.1581 5.20454L16.4435 2.84648C16.4964 2.40973 15.9779 2.12935 15.6092 2.39533L13.6188 3.83136C13.3654 4.01422 13.0037 3.9446 12.8486 3.68309L11.6302 1.62937Z" style="fill: var(--data-weather-sun-primary-color)"/>
<path d="M8.36322 11.3875C8.57308 11.2042 8.81862 11.0367 9.10566 10.8932C10.3818 10.2552 11.5415 10.5915 12.3331 11.0276C12.4856 10.8521 12.6504 10.6732 12.8273 10.4944C13.5969 9.7169 14.6978 8.84611 16.0952 8.36648C15.6163 6.43896 13.6898 5.12137 11.5591 5.35771C9.2479 5.61408 7.57171 7.60185 7.81526 9.79752C7.87972 10.3786 8.07218 10.916 8.36322 11.3875Z" style="fill: var(--data-weather-sun-secondary-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M18.5447 23.337C18.8153 22.7507 19.4544 22.5309 20.023 22.7496L20.0331 22.7535L20.043 22.758C20.6294 23.0287 20.8491 23.6678 20.6304 24.2364L20.625 24.2504L19.5067 26.8058C19.3199 27.2665 18.8978 27.49 18.4633 27.49C18.3124 27.49 18.1431 27.444 18.0379 27.4089L18.0204 27.4031L18.0036 27.3953C17.4173 27.1247 17.1975 26.4856 17.4162 25.917L17.4216 25.9029L18.5447 23.337Z" style="fill: var(--data-weather-rain-primary-color)"/>
<path d="M10.6666 29.2339C10.3478 29.0293 10.2385 28.576 10.4226 28.2216L10.8453 27.4078H9.99992C9.63173 27.4078 9.33325 27.076 9.33325 26.6667C9.33325 26.2574 9.63173 25.9256 9.99992 25.9256H10.8453L10.4226 25.1118C10.2385 24.7573 10.3478 24.3041 10.6666 24.0994C10.9855 23.8948 11.3932 24.0162 11.5773 24.3707L12 25.1845L12.4226 24.3707C12.6067 24.0162 13.0144 23.8948 13.3333 24.0994C13.6522 24.3041 13.7614 24.7573 13.5773 25.1118L13.1547 25.9256H13.9999C14.3681 25.9256 14.6666 26.2574 14.6666 26.6667C14.6666 27.076 14.3681 27.4078 13.9999 27.4078H13.1547L13.5773 28.2216C13.7614 28.576 13.6522 29.0293 13.3333 29.2339C13.0144 29.4386 12.6067 29.3171 12.4226 28.9627L12 28.1489L11.5773 28.9627C11.3932 29.3171 10.9855 29.4386 10.6666 29.2339Z" style="fill: var(--data-weather-snow-primary-color)"/>
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
    'obi-light-sleet-showers-day-colour': ObiLightSleetShowersDayColour;
  }
}
