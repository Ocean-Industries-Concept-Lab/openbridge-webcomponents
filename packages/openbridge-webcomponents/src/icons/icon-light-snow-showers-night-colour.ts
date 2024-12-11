import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-light-snow-showers-night-colour')
export class ObiLightSnowShowersNightColour extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="32" height="32" viewBox="0 0 32 32" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M24 15.3488C24 15.3488 27.4497 15.8352 27.3333 17.3488C27.2486 18.4501 26.4379 19.3488 25.3333 19.3488H6.66663C5.56206 19.3488 4.66663 18.4534 4.66663 17.3488C4.66663 16.2442 5.33329 15.3488 6.66663 15.3488H9.33329C9.33329 15.3488 8.95829 14.2238 9.33329 13.3801C9.45829 13.0988 9.66663 12.8488 9.99996 12.6822C10.3898 12.4872 10.7796 12.5203 11.1362 12.6646C11.999 13.014 12.6666 14.0155 12.6666 14.0155C12.6666 14.0155 13.0854 13.2031 13.8692 12.3091C14.8895 11.1454 16.5282 9.84342 18.6666 10.0155C24 10.4446 24 15.3488 24 15.3488ZM12.333 11.0276C12.4855 10.8522 12.6503 10.6732 12.8272 10.4945C14.0443 9.26475 16.0905 7.80174 18.827 8.02193C22.242 8.29671 24.1524 10.0867 25.107 11.919C25.4389 12.556 25.645 13.1747 25.774 13.699C25.9743 13.7574 26.1852 13.8252 26.3986 13.9034C26.9122 14.0917 27.5831 14.3909 28.1495 14.8677C28.733 15.3588 29.4242 16.244 29.3274 17.5022C29.178 19.445 27.6727 21.3488 25.3333 21.3488H6.66662C4.45749 21.3488 2.66663 19.558 2.66663 17.3488C2.66663 16.4055 2.95372 15.3851 3.69549 14.5797C4.46207 13.7474 5.52695 13.3488 6.66663 13.3488H7.25983C7.43538 12.5011 7.91136 11.4904 9.10553 10.8933C10.3817 10.2552 11.5414 10.5915 12.333 11.0276Z" fill="currentColor"/>
<path d="M9.99996 12.6821C8.66663 13.3487 9.33329 15.3487 9.33329 15.3487H6.66663C5.33329 15.3487 4.66663 16.2442 4.66663 17.3487C4.66663 18.4533 5.56206 19.3487 6.66663 19.3487H25.3333C26.4379 19.3487 27.2486 18.45 27.3333 17.3487C27.4497 15.8351 24 15.3487 24 15.3487C24 15.3487 24 10.4445 18.6666 10.0154C14.8855 9.71116 12.6666 14.0154 12.6666 14.0154C12.6666 14.0154 11.3333 12.0154 9.99996 12.6821Z" fill="currentColor"/>
<path d="M12.1782 5.17262C11.1299 9.43869 6.74822 12.0291 2.3916 10.9585C1.85537 10.8267 1.31873 11.3122 1.54474 11.8242C2.02231 12.9059 2.73016 13.8771 3.62235 14.6614C3.64624 14.6339 3.67063 14.6066 3.69553 14.5796C4.46211 13.7472 5.52698 13.3487 6.66666 13.3487H7.25987C7.43541 12.5009 7.91139 11.4903 9.10557 10.8932C10.3817 10.2551 11.5414 10.5914 12.333 11.0275C12.4856 10.8521 12.6503 10.6731 12.8272 10.4944C13.7723 9.53953 15.2171 8.44404 17.0969 8.10506C16.9853 5.4163 15.5527 2.94814 13.2974 1.53125C12.8169 1.22937 12.2658 1.72975 12.3402 2.30184C12.4618 3.23613 12.4158 4.20591 12.1782 5.17262Z" fill="currentColor"/>
<path d="M9.33337 29.9007C9.01451 29.696 8.90526 29.2428 9.08936 28.8883L9.51201 28.0745H8.66667C8.29848 28.0745 8 27.7427 8 27.3334C8 26.9241 8.29848 26.5923 8.66667 26.5923H9.512L9.08936 25.7785C8.90526 25.4241 9.01451 24.9708 9.33337 24.7662C9.65223 24.5615 10.06 24.683 10.2441 25.0374L10.6667 25.8512L11.0894 25.0374C11.2735 24.683 11.6812 24.5615 12 24.7662C12.3189 24.9708 12.4282 25.4241 12.2441 25.7785L11.8214 26.5923H12.6667C13.0349 26.5923 13.3333 26.9241 13.3333 27.3334C13.3333 27.7427 13.0349 28.0745 12.6667 28.0745H11.8214L12.2441 28.8883C12.4282 29.2428 12.3189 29.696 12 29.9007C11.6812 30.1053 11.2735 29.9839 11.0894 29.6294L10.6667 28.8156L10.2441 29.6294C10.06 29.9839 9.65223 30.1053 9.33337 29.9007Z" fill="currentColor"/>
<path d="M19.3334 27.9007C19.0145 27.696 18.9053 27.2428 19.0894 26.8883L19.512 26.0745H18.6667C18.2985 26.0745 18 25.7427 18 25.3334C18 24.9241 18.2985 24.5923 18.6667 24.5923H19.512L19.0894 23.7785C18.9053 23.4241 19.0145 22.9708 19.3334 22.7662C19.6522 22.5615 20.06 22.683 20.2441 23.0374L20.6667 23.8512L21.0894 23.0374C21.2734 22.683 21.6812 22.5615 22 22.7662C22.3189 22.9708 22.4282 23.4241 22.2441 23.7785L21.8214 24.5923H22.6667C23.0349 24.5923 23.3333 24.9241 23.3333 25.3334C23.3333 25.7427 23.0349 26.0745 22.6667 26.0745H21.8214L22.2441 26.8883C22.4282 27.2428 22.3189 27.696 22 27.9007C21.6812 28.1053 21.2734 27.9839 21.0894 27.6294L20.6667 26.8156L20.2441 27.6294C20.06 27.9839 19.6522 28.1053 19.3334 27.9007Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M24 15.3488C24 15.3488 27.4497 15.8352 27.3333 17.3488C27.2486 18.4501 26.4379 19.3488 25.3333 19.3488H6.66663C5.56206 19.3488 4.66663 18.4534 4.66663 17.3488C4.66663 16.2442 5.33329 15.3488 6.66663 15.3488H9.33329C9.33329 15.3488 8.95829 14.2238 9.33329 13.3801C9.45829 13.0988 9.66663 12.8488 9.99996 12.6822C10.3898 12.4872 10.7796 12.5203 11.1362 12.6646C11.999 13.014 12.6666 14.0155 12.6666 14.0155C12.6666 14.0155 13.0854 13.2031 13.8692 12.3091C14.8895 11.1454 16.5282 9.84342 18.6666 10.0155C24 10.4446 24 15.3488 24 15.3488ZM12.333 11.0276C12.4855 10.8522 12.6503 10.6732 12.8272 10.4945C14.0443 9.26475 16.0905 7.80174 18.827 8.02193C22.242 8.29671 24.1524 10.0867 25.107 11.919C25.4389 12.556 25.645 13.1747 25.774 13.699C25.9743 13.7574 26.1852 13.8252 26.3986 13.9034C26.9122 14.0917 27.5831 14.3909 28.1495 14.8677C28.733 15.3588 29.4242 16.244 29.3274 17.5022C29.178 19.445 27.6727 21.3488 25.3333 21.3488H6.66662C4.45749 21.3488 2.66663 19.558 2.66663 17.3488C2.66663 16.4055 2.95372 15.3851 3.69549 14.5797C4.46207 13.7474 5.52695 13.3488 6.66663 13.3488H7.25983C7.43538 12.5011 7.91136 11.4904 9.10553 10.8933C10.3817 10.2552 11.5414 10.5915 12.333 11.0276Z" style="fill: var(--data-weather-cloud-light-primary-color)"/>
<path d="M9.99996 12.6821C8.66663 13.3487 9.33329 15.3487 9.33329 15.3487H6.66663C5.33329 15.3487 4.66663 16.2442 4.66663 17.3487C4.66663 18.4533 5.56206 19.3487 6.66663 19.3487H25.3333C26.4379 19.3487 27.2486 18.45 27.3333 17.3487C27.4497 15.8351 24 15.3487 24 15.3487C24 15.3487 24 10.4445 18.6666 10.0154C14.8855 9.71116 12.6666 14.0154 12.6666 14.0154C12.6666 14.0154 11.3333 12.0154 9.99996 12.6821Z" style="fill: var(--data-weather-cloud-light-seconday-color)"/>
<path d="M12.1782 5.17262C11.1299 9.43869 6.74822 12.0291 2.3916 10.9585C1.85537 10.8267 1.31873 11.3122 1.54474 11.8242C2.02231 12.9059 2.73016 13.8771 3.62235 14.6614C3.64624 14.6339 3.67063 14.6066 3.69553 14.5796C4.46211 13.7472 5.52698 13.3487 6.66666 13.3487H7.25987C7.43541 12.5009 7.91139 11.4903 9.10557 10.8932C10.3817 10.2551 11.5414 10.5914 12.333 11.0275C12.4856 10.8521 12.6503 10.6731 12.8272 10.4944C13.7723 9.53953 15.2171 8.44404 17.0969 8.10506C16.9853 5.4163 15.5527 2.94814 13.2974 1.53125C12.8169 1.22937 12.2658 1.72975 12.3402 2.30184C12.4618 3.23613 12.4158 4.20591 12.1782 5.17262Z" style="fill: var(--data-weather-sun-primary-color)"/>
<path d="M9.33337 29.9007C9.01451 29.696 8.90526 29.2428 9.08936 28.8883L9.51201 28.0745H8.66667C8.29848 28.0745 8 27.7427 8 27.3334C8 26.9241 8.29848 26.5923 8.66667 26.5923H9.512L9.08936 25.7785C8.90526 25.4241 9.01451 24.9708 9.33337 24.7662C9.65223 24.5615 10.06 24.683 10.2441 25.0374L10.6667 25.8512L11.0894 25.0374C11.2735 24.683 11.6812 24.5615 12 24.7662C12.3189 24.9708 12.4282 25.4241 12.2441 25.7785L11.8214 26.5923H12.6667C13.0349 26.5923 13.3333 26.9241 13.3333 27.3334C13.3333 27.7427 13.0349 28.0745 12.6667 28.0745H11.8214L12.2441 28.8883C12.4282 29.2428 12.3189 29.696 12 29.9007C11.6812 30.1053 11.2735 29.9839 11.0894 29.6294L10.6667 28.8156L10.2441 29.6294C10.06 29.9839 9.65223 30.1053 9.33337 29.9007Z" style="fill: var(--data-weather-snow-primary-color)"/>
<path d="M19.3334 27.9007C19.0145 27.696 18.9053 27.2428 19.0894 26.8883L19.512 26.0745H18.6667C18.2985 26.0745 18 25.7427 18 25.3334C18 24.9241 18.2985 24.5923 18.6667 24.5923H19.512L19.0894 23.7785C18.9053 23.4241 19.0145 22.9708 19.3334 22.7662C19.6522 22.5615 20.06 22.683 20.2441 23.0374L20.6667 23.8512L21.0894 23.0374C21.2734 22.683 21.6812 22.5615 22 22.7662C22.3189 22.9708 22.4282 23.4241 22.2441 23.7785L21.8214 24.5923H22.6667C23.0349 24.5923 23.3333 24.9241 23.3333 25.3334C23.3333 25.7427 23.0349 26.0745 22.6667 26.0745H21.8214L22.2441 26.8883C22.4282 27.2428 22.3189 27.696 22 27.9007C21.6812 28.1053 21.2734 27.9839 21.0894 27.6294L20.6667 26.8156L20.2441 27.6294C20.06 27.9839 19.6522 28.1053 19.3334 27.9007Z" style="fill: var(--data-weather-snow-primary-color)"/>
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
    'obi-light-snow-showers-night-colour': ObiLightSnowShowersNightColour;
  }
}
