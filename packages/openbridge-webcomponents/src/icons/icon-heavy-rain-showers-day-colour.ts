import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-heavy-rain-showers-day-colour')
export class ObiHeavyRainShowersDayColour extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="32" height="32" viewBox="0 0 32 32" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M24 15.3487C24 15.3487 27.4497 15.8351 27.3333 17.3487C27.2486 18.45 26.4379 19.3487 25.3333 19.3487H6.66663C5.56206 19.3487 4.66663 18.4533 4.66663 17.3487C4.66663 16.2441 5.33329 15.3487 6.66663 15.3487H9.33329C9.33329 15.3487 8.95829 14.2237 9.33329 13.3799C9.45829 13.0987 9.66663 12.8487 9.99996 12.682C10.3898 12.4871 10.7796 12.5202 11.1362 12.6645C11.999 13.0139 12.6666 14.0154 12.6666 14.0154C12.6666 14.0154 13.0854 13.203 13.8692 12.309C14.8895 11.1452 16.5282 9.8433 18.6666 10.0154C24 10.4445 24 15.3487 24 15.3487ZM12.333 11.0275C12.4855 10.8521 12.6503 10.6731 12.8272 10.4944C14.0443 9.26463 16.0905 7.80162 18.827 8.02181C22.242 8.29658 24.1524 10.0865 25.107 11.9189C25.4389 12.5559 25.645 13.1745 25.774 13.6989C25.9743 13.7572 26.1852 13.825 26.3986 13.9033C26.9122 14.0915 27.5831 14.3908 28.1495 14.8675C28.733 15.3587 29.4242 16.2438 29.3274 17.5021C29.178 19.4449 27.6727 21.3487 25.3333 21.3487H6.66662C4.45749 21.3487 2.66663 19.5578 2.66663 17.3487C2.66663 16.4054 2.95372 15.385 3.69549 14.5796C4.46207 13.7472 5.52695 13.3487 6.66663 13.3487H7.25983C7.43538 12.5009 7.91136 11.4903 9.10553 10.8932C10.3817 10.2551 11.5414 10.5914 12.333 11.0275Z" fill="currentColor"/>
<path d="M9.99996 12.6821C8.66663 13.3487 9.33329 15.3487 9.33329 15.3487H6.66663C5.33329 15.3487 4.66663 16.2442 4.66663 17.3487C4.66663 18.4533 5.56206 19.3487 6.66663 19.3487H25.3333C26.4379 19.3487 27.2486 18.45 27.3333 17.3487C27.4497 15.8351 24 15.3487 24 15.3487C24 15.3487 24 10.4445 18.6666 10.0154C14.8855 9.71116 12.6666 14.0154 12.6666 14.0154C12.6666 14.0154 11.3333 12.0154 9.99996 12.6821Z" fill="currentColor"/>
<path d="M11.6302 1.62937C11.4045 1.24899 10.8094 1.31501 10.6726 1.73559L9.93391 4.00639C9.83985 4.29555 9.50225 4.44272 9.21489 4.31985L6.95814 3.35492C6.54016 3.1762 6.09572 3.5634 6.243 3.97794L7.03821 6.21614C7.13947 6.50114 6.95487 6.8089 6.64505 6.8716L4.21192 7.36403C3.76127 7.45524 3.63728 8.01571 4.0124 8.26588L6.03777 9.61656C6.29567 9.78855 6.33458 10.1393 6.12064 10.3637L4.4405 12.1254C4.12932 12.4516 4.37313 12.9713 4.83281 12.9616L7.31471 12.9088C7.33533 12.9084 7.35567 12.9091 7.37565 12.9108C7.54618 12.3864 7.84648 11.8388 8.36314 11.3875C8.0721 10.9161 7.87964 10.3786 7.81519 9.79755C7.57164 7.60187 9.24783 5.6141 11.5591 5.35774C13.6897 5.1214 15.6163 6.43898 16.0951 8.36649C16.7266 8.14973 17.4186 8.01286 18.1679 8.00059L19.5596 6.54135C19.8708 6.21506 19.627 5.69538 19.1673 5.70515L16.6854 5.75791C16.3694 5.76462 16.1218 5.5048 16.1581 5.20454L16.4435 2.84648C16.4964 2.40973 15.9779 2.12935 15.6092 2.39533L13.6188 3.83136C13.3654 4.01422 13.0037 3.9446 12.8486 3.68309L11.6302 1.62937Z" fill="currentColor"/>
<path d="M8.3631 11.3875C8.57295 11.2042 8.8185 11.0367 9.10554 10.8932C10.3817 10.2552 11.5414 10.5915 12.333 11.0276C12.4855 10.8521 12.6503 10.6732 12.8272 10.4944C13.5967 9.7169 14.6977 8.84611 16.0951 8.36648C15.6162 6.43896 13.6897 5.12137 11.559 5.35771C9.24778 5.61408 7.57159 7.60185 7.81514 9.79752C7.8796 10.3786 8.07206 10.916 8.3631 11.3875Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M5.21141 23.337C5.48204 22.7507 6.12118 22.5309 6.68973 22.7496L6.69988 22.7535L6.70975 22.758C7.29611 23.0287 7.51585 23.6678 7.29718 24.2364L7.29176 24.2504L6.17341 26.8058C5.9866 27.2665 5.56455 27.49 5.13007 27.49C4.97914 27.49 4.80989 27.444 4.70466 27.4089L4.68714 27.4031L4.67038 27.3953C4.08402 27.1247 3.86428 26.4856 4.08295 25.917L4.08837 25.9029L5.21141 23.337Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M14.5447 23.337C14.8154 22.7507 15.4545 22.5309 16.0231 22.7496L16.0332 22.7535L16.0431 22.758C16.6294 23.0287 16.8492 23.6678 16.6305 24.2364L16.6251 24.2504L15.5067 26.8058C15.3199 27.2665 14.8979 27.49 14.4634 27.49C14.3125 27.49 14.1432 27.444 14.038 27.4089L14.0205 27.4031L14.0037 27.3953C13.4174 27.1247 13.1976 26.4856 13.4163 25.917L13.4217 25.9029L14.5447 23.337Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M18.5447 23.337C18.8154 22.7507 19.4545 22.5309 20.0231 22.7496L20.0332 22.7535L20.0431 22.758C20.6294 23.0287 20.8492 23.6678 20.6305 24.2364L20.6251 24.2504L19.5067 26.8058C19.3199 27.2665 18.8979 27.49 18.4634 27.49C18.3125 27.49 18.1432 27.444 18.038 27.4089L18.0205 27.4031L18.0037 27.3953C17.4174 27.1247 17.1976 26.4856 17.4163 25.917L17.4217 25.9029L18.5447 23.337Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M23.8781 26.0037C24.1487 25.4173 24.7878 25.1976 25.3564 25.4162L25.3665 25.4201L25.3764 25.4247C25.9628 25.6953 26.1825 26.3345 25.9639 26.903L25.9584 26.9171L24.8401 29.4725C24.6533 29.9331 24.2312 30.1567 23.7967 30.1567C23.6458 30.1567 23.4766 30.1107 23.3713 30.0756L23.3538 30.0697L23.337 30.062C22.7507 29.7914 22.5309 29.1522 22.7496 28.5837L22.755 28.5696L23.8781 26.0037Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M9.21141 26.0037C9.48204 25.4173 10.1212 25.1976 10.6897 25.4162L10.6999 25.4201L10.7098 25.4247C11.2961 25.6953 11.5159 26.3345 11.2972 26.903L11.2918 26.9171L10.1734 29.4725C9.9866 29.9331 9.56455 30.1567 9.13007 30.1567C8.97914 30.1567 8.80989 30.1107 8.70466 30.0756L8.68714 30.0697L8.67038 30.062C8.08402 29.7914 7.86428 29.1522 8.08295 28.5837L8.08837 28.5696L9.21141 26.0037Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M24 15.3487C24 15.3487 27.4497 15.8351 27.3333 17.3487C27.2486 18.45 26.4379 19.3487 25.3333 19.3487H6.66663C5.56206 19.3487 4.66663 18.4533 4.66663 17.3487C4.66663 16.2441 5.33329 15.3487 6.66663 15.3487H9.33329C9.33329 15.3487 8.95829 14.2237 9.33329 13.3799C9.45829 13.0987 9.66663 12.8487 9.99996 12.682C10.3898 12.4871 10.7796 12.5202 11.1362 12.6645C11.999 13.0139 12.6666 14.0154 12.6666 14.0154C12.6666 14.0154 13.0854 13.203 13.8692 12.309C14.8895 11.1452 16.5282 9.8433 18.6666 10.0154C24 10.4445 24 15.3487 24 15.3487ZM12.333 11.0275C12.4855 10.8521 12.6503 10.6731 12.8272 10.4944C14.0443 9.26463 16.0905 7.80162 18.827 8.02181C22.242 8.29658 24.1524 10.0865 25.107 11.9189C25.4389 12.5559 25.645 13.1745 25.774 13.6989C25.9743 13.7572 26.1852 13.825 26.3986 13.9033C26.9122 14.0915 27.5831 14.3908 28.1495 14.8675C28.733 15.3587 29.4242 16.2438 29.3274 17.5021C29.178 19.4449 27.6727 21.3487 25.3333 21.3487H6.66662C4.45749 21.3487 2.66663 19.5578 2.66663 17.3487C2.66663 16.4054 2.95372 15.385 3.69549 14.5796C4.46207 13.7472 5.52695 13.3487 6.66663 13.3487H7.25983C7.43538 12.5009 7.91136 11.4903 9.10553 10.8932C10.3817 10.2551 11.5414 10.5914 12.333 11.0275Z" style="fill: var(--data-weather-cloud-heavy-secondary-color)"/>
<path d="M9.99996 12.6821C8.66663 13.3487 9.33329 15.3487 9.33329 15.3487H6.66663C5.33329 15.3487 4.66663 16.2442 4.66663 17.3487C4.66663 18.4533 5.56206 19.3487 6.66663 19.3487H25.3333C26.4379 19.3487 27.2486 18.45 27.3333 17.3487C27.4497 15.8351 24 15.3487 24 15.3487C24 15.3487 24 10.4445 18.6666 10.0154C14.8855 9.71116 12.6666 14.0154 12.6666 14.0154C12.6666 14.0154 11.3333 12.0154 9.99996 12.6821Z" style="fill: var(--data-weather-cloud-heavy-secondary-color)"/>
<path d="M11.6302 1.62937C11.4045 1.24899 10.8094 1.31501 10.6726 1.73559L9.93391 4.00639C9.83985 4.29555 9.50225 4.44272 9.21489 4.31985L6.95814 3.35492C6.54016 3.1762 6.09572 3.5634 6.243 3.97794L7.03821 6.21614C7.13947 6.50114 6.95487 6.8089 6.64505 6.8716L4.21192 7.36403C3.76127 7.45524 3.63728 8.01571 4.0124 8.26588L6.03777 9.61656C6.29567 9.78855 6.33458 10.1393 6.12064 10.3637L4.4405 12.1254C4.12932 12.4516 4.37313 12.9713 4.83281 12.9616L7.31471 12.9088C7.33533 12.9084 7.35567 12.9091 7.37565 12.9108C7.54618 12.3864 7.84648 11.8388 8.36314 11.3875C8.0721 10.9161 7.87964 10.3786 7.81519 9.79755C7.57164 7.60187 9.24783 5.6141 11.5591 5.35774C13.6897 5.1214 15.6163 6.43898 16.0951 8.36649C16.7266 8.14973 17.4186 8.01286 18.1679 8.00059L19.5596 6.54135C19.8708 6.21506 19.627 5.69538 19.1673 5.70515L16.6854 5.75791C16.3694 5.76462 16.1218 5.5048 16.1581 5.20454L16.4435 2.84648C16.4964 2.40973 15.9779 2.12935 15.6092 2.39533L13.6188 3.83136C13.3654 4.01422 13.0037 3.9446 12.8486 3.68309L11.6302 1.62937Z" style="fill: var(--data-weather-sun-primary-color)"/>
<path d="M8.3631 11.3875C8.57295 11.2042 8.8185 11.0367 9.10554 10.8932C10.3817 10.2552 11.5414 10.5915 12.333 11.0276C12.4855 10.8521 12.6503 10.6732 12.8272 10.4944C13.5967 9.7169 14.6977 8.84611 16.0951 8.36648C15.6162 6.43896 13.6897 5.12137 11.559 5.35771C9.24778 5.61408 7.57159 7.60185 7.81514 9.79752C7.8796 10.3786 8.07206 10.916 8.3631 11.3875Z" style="fill: var(--data-weather-sun-secondary-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M5.21141 23.337C5.48204 22.7507 6.12118 22.5309 6.68973 22.7496L6.69988 22.7535L6.70975 22.758C7.29611 23.0287 7.51585 23.6678 7.29718 24.2364L7.29176 24.2504L6.17341 26.8058C5.9866 27.2665 5.56455 27.49 5.13007 27.49C4.97914 27.49 4.80989 27.444 4.70466 27.4089L4.68714 27.4031L4.67038 27.3953C4.08402 27.1247 3.86428 26.4856 4.08295 25.917L4.08837 25.9029L5.21141 23.337Z" style="fill: var(--data-weather-rain-primary-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M14.5447 23.337C14.8154 22.7507 15.4545 22.5309 16.0231 22.7496L16.0332 22.7535L16.0431 22.758C16.6294 23.0287 16.8492 23.6678 16.6305 24.2364L16.6251 24.2504L15.5067 26.8058C15.3199 27.2665 14.8979 27.49 14.4634 27.49C14.3125 27.49 14.1432 27.444 14.038 27.4089L14.0205 27.4031L14.0037 27.3953C13.4174 27.1247 13.1976 26.4856 13.4163 25.917L13.4217 25.9029L14.5447 23.337Z" style="fill: var(--data-weather-rain-primary-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M18.5447 23.337C18.8154 22.7507 19.4545 22.5309 20.0231 22.7496L20.0332 22.7535L20.0431 22.758C20.6294 23.0287 20.8492 23.6678 20.6305 24.2364L20.6251 24.2504L19.5067 26.8058C19.3199 27.2665 18.8979 27.49 18.4634 27.49C18.3125 27.49 18.1432 27.444 18.038 27.4089L18.0205 27.4031L18.0037 27.3953C17.4174 27.1247 17.1976 26.4856 17.4163 25.917L17.4217 25.9029L18.5447 23.337Z" style="fill: var(--data-weather-rain-primary-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M23.8781 26.0037C24.1487 25.4173 24.7878 25.1976 25.3564 25.4162L25.3665 25.4201L25.3764 25.4247C25.9628 25.6953 26.1825 26.3345 25.9639 26.903L25.9584 26.9171L24.8401 29.4725C24.6533 29.9331 24.2312 30.1567 23.7967 30.1567C23.6458 30.1567 23.4766 30.1107 23.3713 30.0756L23.3538 30.0697L23.337 30.062C22.7507 29.7914 22.5309 29.1522 22.7496 28.5837L22.755 28.5696L23.8781 26.0037Z" style="fill: var(--data-weather-rain-primary-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M9.21141 26.0037C9.48204 25.4173 10.1212 25.1976 10.6897 25.4162L10.6999 25.4201L10.7098 25.4247C11.2961 25.6953 11.5159 26.3345 11.2972 26.903L11.2918 26.9171L10.1734 29.4725C9.9866 29.9331 9.56455 30.1567 9.13007 30.1567C8.97914 30.1567 8.80989 30.1107 8.70466 30.0756L8.68714 30.0697L8.67038 30.062C8.08402 29.7914 7.86428 29.1522 8.08295 28.5837L8.08837 28.5696L9.21141 26.0037Z" style="fill: var(--data-weather-rain-primary-color)"/>
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
    'obi-heavy-rain-showers-day-colour': ObiHeavyRainShowersDayColour;
  }
}
