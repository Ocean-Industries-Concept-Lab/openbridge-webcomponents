import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-snow-showers-night-colour')
export class ObiSnowShowersNightColour extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="32" height="32" viewBox="0 0 32 32" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M24 15.3488C24 15.3488 27.4497 15.8352 27.3333 17.3488C27.2486 18.4501 26.4379 19.3488 25.3333 19.3488H6.66663C5.56206 19.3488 4.66663 18.4534 4.66663 17.3488C4.66663 16.2442 5.33329 15.3488 6.66663 15.3488H9.33329C9.33329 15.3488 8.95829 14.2238 9.33329 13.3801C9.45829 13.0988 9.66663 12.8488 9.99996 12.6822C10.3898 12.4872 10.7796 12.5203 11.1362 12.6646C11.999 13.014 12.6666 14.0155 12.6666 14.0155C12.6666 14.0155 13.0854 13.2031 13.8692 12.3091C14.8895 11.1454 16.5282 9.84342 18.6666 10.0155C24 10.4446 24 15.3488 24 15.3488ZM12.333 11.0276C12.4855 10.8522 12.6503 10.6732 12.8272 10.4945C14.0443 9.26475 16.0905 7.80174 18.827 8.02193C22.242 8.29671 24.1524 10.0867 25.107 11.919C25.4389 12.556 25.645 13.1747 25.774 13.699C25.9743 13.7574 26.1852 13.8252 26.3986 13.9034C26.9122 14.0917 27.5831 14.3909 28.1495 14.8677C28.733 15.3588 29.4242 16.244 29.3274 17.5022C29.178 19.445 27.6727 21.3488 25.3333 21.3488H6.66662C4.45749 21.3488 2.66663 19.558 2.66663 17.3488C2.66663 16.4055 2.95372 15.3851 3.69549 14.5797C4.46207 13.7474 5.52695 13.3488 6.66663 13.3488H7.25983C7.43538 12.5011 7.91136 11.4904 9.10553 10.8933C10.3817 10.2552 11.5414 10.5915 12.333 11.0276Z" fill="currentColor"/>
<path d="M9.99996 12.6821C8.66663 13.3487 9.33329 15.3487 9.33329 15.3487H6.66663C5.33329 15.3487 4.66663 16.2442 4.66663 17.3487C4.66663 18.4533 5.56206 19.3487 6.66663 19.3487H25.3333C26.4379 19.3487 27.2486 18.45 27.3333 17.3487C27.4497 15.8351 24 15.3487 24 15.3487C24 15.3487 24 10.4445 18.6666 10.0154C14.8855 9.71116 12.6666 14.0154 12.6666 14.0154C12.6666 14.0154 11.3333 12.0154 9.99996 12.6821Z" fill="currentColor"/>
<path d="M12.1782 5.17262C11.1299 9.43869 6.74822 12.0291 2.3916 10.9585C1.85537 10.8267 1.31873 11.3122 1.54474 11.8242C2.02231 12.9059 2.73016 13.8771 3.62235 14.6614C3.64624 14.6339 3.67063 14.6066 3.69553 14.5796C4.46211 13.7472 5.52698 13.3487 6.66666 13.3487H7.25987C7.43541 12.5009 7.91139 11.4903 9.10557 10.8932C10.3817 10.2551 11.5414 10.5914 12.333 11.0275C12.4856 10.8521 12.6503 10.6731 12.8272 10.4944C13.7723 9.53953 15.2171 8.44404 17.0969 8.10506C16.9853 5.4163 15.5527 2.94814 13.2974 1.53125C12.8169 1.22937 12.2658 1.72975 12.3402 2.30184C12.4618 3.23613 12.4158 4.20591 12.1782 5.17262Z" fill="currentColor"/>
<path d="M8 27.9007C7.68114 27.696 7.57189 27.2428 7.75598 26.8883L8.17863 26.0745H7.33329C6.9651 26.0745 6.66663 25.7427 6.66663 25.3334C6.66663 24.9241 6.9651 24.5923 7.33329 24.5923H8.17863L7.75598 23.7785C7.57189 23.4241 7.68114 22.9708 8 22.7662C8.31886 22.5615 8.72659 22.683 8.91068 23.0374L9.33333 23.8512L9.75598 23.0374C9.94008 22.683 10.3478 22.5615 10.6667 22.7662C10.9855 22.9708 11.0948 23.4241 10.9107 23.7785L10.488 24.5923H11.3333C11.7015 24.5923 12 24.9241 12 25.3334C12 25.7427 11.7015 26.0745 11.3333 26.0745H10.488L10.9107 26.8883C11.0948 27.2428 10.9855 27.696 10.6667 27.9007C10.3478 28.1053 9.94008 27.9839 9.75598 27.6294L9.33333 26.8156L8.91068 27.6294C8.72659 27.9839 8.31886 28.1053 8 27.9007Z" fill="currentColor"/>
<path d="M14.6667 30.5673C14.3478 30.3627 14.2386 29.9094 14.4226 29.555L14.8453 28.7412H14C13.6318 28.7412 13.3333 28.4094 13.3333 28.0001C13.3333 27.5908 13.6318 27.259 14 27.259H14.8453L14.4226 26.4452C14.2386 26.0907 14.3478 25.6375 14.6667 25.4328C14.9855 25.2282 15.3933 25.3496 15.5773 25.7041L16 26.5179L16.4226 25.7041C16.6067 25.3496 17.0145 25.2282 17.3333 25.4328C17.6522 25.6375 17.7614 26.0907 17.5773 26.4452L17.1547 27.259H18C18.3681 27.259 18.6666 27.5908 18.6666 28.0001C18.6666 28.4094 18.3681 28.7412 18 28.7412H17.1547L17.5773 29.555C17.7614 29.9094 17.6522 30.3627 17.3333 30.5673C17.0145 30.772 16.6067 30.6505 16.4226 30.2961L16 29.4823L15.5773 30.2961C15.3933 30.6505 14.9855 30.772 14.6667 30.5673Z" fill="currentColor"/>
<path d="M21.3333 27.9007C21.0145 27.696 20.9052 27.2428 21.0893 26.8883L21.512 26.0745H20.6666C20.2984 26.0745 20 25.7427 20 25.3334C20 24.9241 20.2984 24.5923 20.6666 24.5923H21.512L21.0893 23.7785C20.9052 23.4241 21.0145 22.9708 21.3333 22.7662C21.6522 22.5615 22.0599 22.683 22.244 23.0374L22.6667 23.8512L23.0893 23.0374C23.2734 22.683 23.6811 22.5615 24 22.7662C24.3189 22.9708 24.4281 23.4241 24.244 23.7785L23.8214 24.5923H24.6666C25.0348 24.5923 25.3333 24.9241 25.3333 25.3334C25.3333 25.7427 25.0348 26.0745 24.6666 26.0745H23.8214L24.244 26.8883C24.4281 27.2428 24.3189 27.696 24 27.9007C23.6811 28.1053 23.2734 27.9839 23.0893 27.6294L22.6667 26.8156L22.244 27.6294C22.0599 27.9839 21.6522 28.1053 21.3333 27.9007Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M24 15.3488C24 15.3488 27.4497 15.8352 27.3333 17.3488C27.2486 18.4501 26.4379 19.3488 25.3333 19.3488H6.66663C5.56206 19.3488 4.66663 18.4534 4.66663 17.3488C4.66663 16.2442 5.33329 15.3488 6.66663 15.3488H9.33329C9.33329 15.3488 8.95829 14.2238 9.33329 13.3801C9.45829 13.0988 9.66663 12.8488 9.99996 12.6822C10.3898 12.4872 10.7796 12.5203 11.1362 12.6646C11.999 13.014 12.6666 14.0155 12.6666 14.0155C12.6666 14.0155 13.0854 13.2031 13.8692 12.3091C14.8895 11.1454 16.5282 9.84342 18.6666 10.0155C24 10.4446 24 15.3488 24 15.3488ZM12.333 11.0276C12.4855 10.8522 12.6503 10.6732 12.8272 10.4945C14.0443 9.26475 16.0905 7.80174 18.827 8.02193C22.242 8.29671 24.1524 10.0867 25.107 11.919C25.4389 12.556 25.645 13.1747 25.774 13.699C25.9743 13.7574 26.1852 13.8252 26.3986 13.9034C26.9122 14.0917 27.5831 14.3909 28.1495 14.8677C28.733 15.3588 29.4242 16.244 29.3274 17.5022C29.178 19.445 27.6727 21.3488 25.3333 21.3488H6.66662C4.45749 21.3488 2.66663 19.558 2.66663 17.3488C2.66663 16.4055 2.95372 15.3851 3.69549 14.5797C4.46207 13.7474 5.52695 13.3488 6.66663 13.3488H7.25983C7.43538 12.5011 7.91136 11.4904 9.10553 10.8933C10.3817 10.2552 11.5414 10.5915 12.333 11.0276Z" style="fill: var(--data-weather-cloud-rain-primary-color)"/>
<path d="M9.99996 12.6821C8.66663 13.3487 9.33329 15.3487 9.33329 15.3487H6.66663C5.33329 15.3487 4.66663 16.2442 4.66663 17.3487C4.66663 18.4533 5.56206 19.3487 6.66663 19.3487H25.3333C26.4379 19.3487 27.2486 18.45 27.3333 17.3487C27.4497 15.8351 24 15.3487 24 15.3487C24 15.3487 24 10.4445 18.6666 10.0154C14.8855 9.71116 12.6666 14.0154 12.6666 14.0154C12.6666 14.0154 11.3333 12.0154 9.99996 12.6821Z" style="fill: var(--data-weather-cloud-rain-secondary-color)"/>
<path d="M12.1782 5.17262C11.1299 9.43869 6.74822 12.0291 2.3916 10.9585C1.85537 10.8267 1.31873 11.3122 1.54474 11.8242C2.02231 12.9059 2.73016 13.8771 3.62235 14.6614C3.64624 14.6339 3.67063 14.6066 3.69553 14.5796C4.46211 13.7472 5.52698 13.3487 6.66666 13.3487H7.25987C7.43541 12.5009 7.91139 11.4903 9.10557 10.8932C10.3817 10.2551 11.5414 10.5914 12.333 11.0275C12.4856 10.8521 12.6503 10.6731 12.8272 10.4944C13.7723 9.53953 15.2171 8.44404 17.0969 8.10506C16.9853 5.4163 15.5527 2.94814 13.2974 1.53125C12.8169 1.22937 12.2658 1.72975 12.3402 2.30184C12.4618 3.23613 12.4158 4.20591 12.1782 5.17262Z" style="fill: var(--data-weather-sun-primary-color)"/>
<path d="M8 27.9007C7.68114 27.696 7.57189 27.2428 7.75598 26.8883L8.17863 26.0745H7.33329C6.9651 26.0745 6.66663 25.7427 6.66663 25.3334C6.66663 24.9241 6.9651 24.5923 7.33329 24.5923H8.17863L7.75598 23.7785C7.57189 23.4241 7.68114 22.9708 8 22.7662C8.31886 22.5615 8.72659 22.683 8.91068 23.0374L9.33333 23.8512L9.75598 23.0374C9.94008 22.683 10.3478 22.5615 10.6667 22.7662C10.9855 22.9708 11.0948 23.4241 10.9107 23.7785L10.488 24.5923H11.3333C11.7015 24.5923 12 24.9241 12 25.3334C12 25.7427 11.7015 26.0745 11.3333 26.0745H10.488L10.9107 26.8883C11.0948 27.2428 10.9855 27.696 10.6667 27.9007C10.3478 28.1053 9.94008 27.9839 9.75598 27.6294L9.33333 26.8156L8.91068 27.6294C8.72659 27.9839 8.31886 28.1053 8 27.9007Z" style="fill: var(--data-weather-snow-primary-color)"/>
<path d="M14.6667 30.5673C14.3478 30.3627 14.2386 29.9094 14.4226 29.555L14.8453 28.7412H14C13.6318 28.7412 13.3333 28.4094 13.3333 28.0001C13.3333 27.5908 13.6318 27.259 14 27.259H14.8453L14.4226 26.4452C14.2386 26.0907 14.3478 25.6375 14.6667 25.4328C14.9855 25.2282 15.3933 25.3496 15.5773 25.7041L16 26.5179L16.4226 25.7041C16.6067 25.3496 17.0145 25.2282 17.3333 25.4328C17.6522 25.6375 17.7614 26.0907 17.5773 26.4452L17.1547 27.259H18C18.3681 27.259 18.6666 27.5908 18.6666 28.0001C18.6666 28.4094 18.3681 28.7412 18 28.7412H17.1547L17.5773 29.555C17.7614 29.9094 17.6522 30.3627 17.3333 30.5673C17.0145 30.772 16.6067 30.6505 16.4226 30.2961L16 29.4823L15.5773 30.2961C15.3933 30.6505 14.9855 30.772 14.6667 30.5673Z" style="fill: var(--data-weather-snow-primary-color)"/>
<path d="M21.3333 27.9007C21.0145 27.696 20.9052 27.2428 21.0893 26.8883L21.512 26.0745H20.6666C20.2984 26.0745 20 25.7427 20 25.3334C20 24.9241 20.2984 24.5923 20.6666 24.5923H21.512L21.0893 23.7785C20.9052 23.4241 21.0145 22.9708 21.3333 22.7662C21.6522 22.5615 22.0599 22.683 22.244 23.0374L22.6667 23.8512L23.0893 23.0374C23.2734 22.683 23.6811 22.5615 24 22.7662C24.3189 22.9708 24.4281 23.4241 24.244 23.7785L23.8214 24.5923H24.6666C25.0348 24.5923 25.3333 24.9241 25.3333 25.3334C25.3333 25.7427 25.0348 26.0745 24.6666 26.0745H23.8214L24.244 26.8883C24.4281 27.2428 24.3189 27.696 24 27.9007C23.6811 28.1053 23.2734 27.9839 23.0893 27.6294L22.6667 26.8156L22.244 27.6294C22.0599 27.9839 21.6522 28.1053 21.3333 27.9007Z" style="fill: var(--data-weather-snow-primary-color)"/>
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
    'obi-snow-showers-night-colour': ObiSnowShowersNightColour;
  }
}
