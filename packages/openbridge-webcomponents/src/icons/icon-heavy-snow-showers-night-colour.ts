import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-heavy-snow-showers-night-colour')
export class ObiHeavySnowShowersNightColour extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="32" height="32" viewBox="0 0 32 32" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M24 15.3488C24 15.3488 27.4497 15.8352 27.3333 17.3488C27.2486 18.4501 26.4379 19.3488 25.3333 19.3488H6.66663C5.56206 19.3488 4.66663 18.4534 4.66663 17.3488C4.66663 16.2442 5.33329 15.3488 6.66663 15.3488H9.33329C9.33329 15.3488 8.95829 14.2238 9.33329 13.3801C9.45829 13.0988 9.66663 12.8488 9.99996 12.6822C10.3898 12.4872 10.7796 12.5203 11.1362 12.6646C11.999 13.014 12.6666 14.0155 12.6666 14.0155C12.6666 14.0155 13.0854 13.2031 13.8692 12.3091C14.8895 11.1454 16.5282 9.84342 18.6666 10.0155C24 10.4446 24 15.3488 24 15.3488ZM12.333 11.0276C12.4855 10.8522 12.6503 10.6732 12.8272 10.4945C14.0443 9.26475 16.0905 7.80174 18.827 8.02193C22.242 8.29671 24.1524 10.0867 25.107 11.919C25.4389 12.556 25.645 13.1747 25.774 13.699C25.9743 13.7574 26.1852 13.8252 26.3986 13.9034C26.9122 14.0917 27.5831 14.3909 28.1495 14.8677C28.733 15.3588 29.4242 16.244 29.3274 17.5022C29.178 19.445 27.6727 21.3488 25.3333 21.3488H6.66662C4.45749 21.3488 2.66663 19.558 2.66663 17.3488C2.66663 16.4055 2.95372 15.3851 3.69549 14.5797C4.46207 13.7474 5.52695 13.3488 6.66663 13.3488H7.25983C7.43538 12.5011 7.91136 11.4904 9.10553 10.8933C10.3817 10.2552 11.5414 10.5915 12.333 11.0276Z" fill="currentColor"/>
<path d="M9.99996 12.6821C8.66663 13.3487 9.33329 15.3487 9.33329 15.3487H6.66663C5.33329 15.3487 4.66663 16.2442 4.66663 17.3487C4.66663 18.4533 5.56206 19.3487 6.66663 19.3487H25.3333C26.4379 19.3487 27.2486 18.45 27.3333 17.3487C27.4497 15.8351 24 15.3487 24 15.3487C24 15.3487 24 10.4445 18.6666 10.0154C14.8855 9.71116 12.6666 14.0154 12.6666 14.0154C12.6666 14.0154 11.3333 12.0154 9.99996 12.6821Z" fill="currentColor"/>
<path d="M12.1782 5.17262C11.1299 9.43869 6.74822 12.0291 2.3916 10.9585C1.85537 10.8267 1.31873 11.3122 1.54474 11.8242C2.02231 12.9059 2.73016 13.8771 3.62235 14.6614C3.64624 14.6339 3.67063 14.6066 3.69553 14.5796C4.46211 13.7472 5.52698 13.3487 6.66666 13.3487H7.25987C7.43541 12.5009 7.91139 11.4903 9.10557 10.8932C10.3817 10.2551 11.5414 10.5914 12.333 11.0275C12.4856 10.8521 12.6503 10.6731 12.8272 10.4944C13.7723 9.53953 15.2171 8.44404 17.0969 8.10506C16.9853 5.4163 15.5527 2.94814 13.2974 1.53125C12.8169 1.22937 12.2658 1.72975 12.3402 2.30184C12.4618 3.23613 12.4158 4.20591 12.1782 5.17262Z" fill="currentColor"/>
<path d="M2.66675 27.9007C2.34788 27.696 2.23863 27.2428 2.42273 26.8883L2.84538 26.0745H2.00004C1.63185 26.0745 1.33337 25.7427 1.33337 25.3334C1.33337 24.9241 1.63185 24.5923 2.00004 24.5923H2.84538L2.42273 23.7785C2.23863 23.4241 2.34788 22.9708 2.66675 22.7662C2.98561 22.5615 3.39333 22.683 3.57743 23.0374L4.00008 23.8512L4.42273 23.0374C4.60682 22.683 5.01455 22.5615 5.33341 22.7662C5.65228 22.9708 5.76153 23.4241 5.57743 23.7785L5.15478 24.5923H6.00004C6.36823 24.5923 6.66671 24.9241 6.66671 25.3334C6.66671 25.7427 6.36823 26.0745 6.00004 26.0745H5.15478L5.57743 26.8883C5.76153 27.2428 5.65228 27.696 5.33341 27.9007C5.01455 28.1053 4.60682 27.9839 4.42273 27.6294L4.00008 26.8156L3.57743 27.6294C3.39334 27.9839 2.98561 28.1053 2.66675 27.9007Z" fill="currentColor"/>
<path d="M15.3334 27.9007C15.0146 27.696 14.9053 27.2428 15.0894 26.8883L15.512 26.0745H14.6667C14.2985 26.0745 14 25.7427 14 25.3334C14 24.9241 14.2985 24.5923 14.6667 24.5923H15.512L15.0894 23.7785C14.9053 23.4241 15.0146 22.9708 15.3334 22.7662C15.6523 22.5615 16.06 22.683 16.2441 23.0374L16.6667 23.8512L17.0894 23.0374C17.2735 22.683 17.6812 22.5615 18.0001 22.7662C18.3189 22.9708 18.4282 23.4241 18.2441 23.7785L17.8215 24.5923H18.6667C19.0349 24.5923 19.3334 24.9241 19.3334 25.3334C19.3334 25.7427 19.0349 26.0745 18.6667 26.0745H17.8214L18.2441 26.8883C18.4282 27.2428 18.3189 27.696 18.0001 27.9007C17.6812 28.1053 17.2735 27.9839 17.0894 27.6294L16.6667 26.8156L16.2441 27.6294C16.06 27.9839 15.6523 28.1053 15.3334 27.9007Z" fill="currentColor"/>
<path d="M26.6667 27.9007C26.3479 27.696 26.2386 27.2428 26.4227 26.8883L26.8454 26.0745H26C25.6319 26.0745 25.3334 25.7427 25.3334 25.3334C25.3334 24.9241 25.6319 24.5923 26 24.5923H26.8454L26.4227 23.7785C26.2386 23.4241 26.3479 22.9708 26.6667 22.7662C26.9856 22.5615 27.3933 22.683 27.5774 23.0374L28.0001 23.8512L28.4227 23.0374C28.6068 22.683 29.0146 22.5615 29.3334 22.7662C29.6523 22.9708 29.7615 23.4241 29.5774 23.7785L29.1548 24.5923H30C30.3682 24.5923 30.6667 24.9241 30.6667 25.3334C30.6667 25.7427 30.3682 26.0745 30 26.0745H29.1548L29.5774 26.8883C29.7615 27.2428 29.6523 27.696 29.3334 27.9007C29.0146 28.1053 28.6068 27.9839 28.4227 27.6294L28.0001 26.8156L27.5774 27.6294C27.3933 27.9839 26.9856 28.1053 26.6667 27.9007Z" fill="currentColor"/>
<path d="M21.3334 30.5673C21.0146 30.3627 20.9053 29.9094 21.0894 29.555L21.5121 28.7412H20.6667C20.2985 28.7412 20 28.4094 20 28.0001C20 27.5908 20.2985 27.259 20.6667 27.259H21.512L21.0894 26.4452C20.9053 26.0907 21.0146 25.6375 21.3334 25.4328C21.6523 25.2282 22.06 25.3496 22.2441 25.7041L22.6667 26.5179L23.0894 25.7041C23.2735 25.3496 23.6812 25.2282 24.0001 25.4328C24.3189 25.6375 24.4282 26.0907 24.2441 26.4452L23.8215 27.259H24.6667C25.0349 27.259 25.3334 27.5908 25.3334 28.0001C25.3334 28.4094 25.0349 28.7412 24.6667 28.7412H23.8214L24.2441 29.555C24.4282 29.9094 24.3189 30.3627 24.0001 30.5673C23.6812 30.772 23.2735 30.6505 23.0894 30.2961L22.6667 29.4823L22.2441 30.2961C22.06 30.6505 21.6523 30.772 21.3334 30.5673Z" fill="currentColor"/>
<path d="M9.33341 30.5673C9.01455 30.3627 8.9053 29.9094 9.0894 29.555L9.51205 28.7412H8.66671C8.29852 28.7412 8.00004 28.4094 8.00004 28.0001C8.00004 27.5908 8.29852 27.259 8.66671 27.259H9.51204L9.0894 26.4452C8.9053 26.0907 9.01455 25.6375 9.33341 25.4328C9.65228 25.2282 10.06 25.3496 10.2441 25.7041L10.6667 26.5179L11.0894 25.7041C11.2735 25.3496 11.6812 25.2282 12.0001 25.4328C12.3189 25.6375 12.4282 26.0907 12.2441 26.4452L11.8215 27.259H12.6667C13.0349 27.259 13.3334 27.5908 13.3334 28.0001C13.3334 28.4094 13.0349 28.7412 12.6667 28.7412H11.8214L12.2441 29.555C12.4282 29.9094 12.3189 30.3627 12.0001 30.5673C11.6812 30.772 11.2735 30.6505 11.0894 30.2961L10.6667 29.4823L10.2441 30.2961C10.06 30.6505 9.65228 30.772 9.33341 30.5673Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M24 15.3488C24 15.3488 27.4497 15.8352 27.3333 17.3488C27.2486 18.4501 26.4379 19.3488 25.3333 19.3488H6.66663C5.56206 19.3488 4.66663 18.4534 4.66663 17.3488C4.66663 16.2442 5.33329 15.3488 6.66663 15.3488H9.33329C9.33329 15.3488 8.95829 14.2238 9.33329 13.3801C9.45829 13.0988 9.66663 12.8488 9.99996 12.6822C10.3898 12.4872 10.7796 12.5203 11.1362 12.6646C11.999 13.014 12.6666 14.0155 12.6666 14.0155C12.6666 14.0155 13.0854 13.2031 13.8692 12.3091C14.8895 11.1454 16.5282 9.84342 18.6666 10.0155C24 10.4446 24 15.3488 24 15.3488ZM12.333 11.0276C12.4855 10.8522 12.6503 10.6732 12.8272 10.4945C14.0443 9.26475 16.0905 7.80174 18.827 8.02193C22.242 8.29671 24.1524 10.0867 25.107 11.919C25.4389 12.556 25.645 13.1747 25.774 13.699C25.9743 13.7574 26.1852 13.8252 26.3986 13.9034C26.9122 14.0917 27.5831 14.3909 28.1495 14.8677C28.733 15.3588 29.4242 16.244 29.3274 17.5022C29.178 19.445 27.6727 21.3488 25.3333 21.3488H6.66662C4.45749 21.3488 2.66663 19.558 2.66663 17.3488C2.66663 16.4055 2.95372 15.3851 3.69549 14.5797C4.46207 13.7474 5.52695 13.3488 6.66663 13.3488H7.25983C7.43538 12.5011 7.91136 11.4904 9.10553 10.8933C10.3817 10.2552 11.5414 10.5915 12.333 11.0276Z" style="fill: var(--data-weather-cloud-heavy-secondary-color)"/>
<path d="M9.99996 12.6821C8.66663 13.3487 9.33329 15.3487 9.33329 15.3487H6.66663C5.33329 15.3487 4.66663 16.2442 4.66663 17.3487C4.66663 18.4533 5.56206 19.3487 6.66663 19.3487H25.3333C26.4379 19.3487 27.2486 18.45 27.3333 17.3487C27.4497 15.8351 24 15.3487 24 15.3487C24 15.3487 24 10.4445 18.6666 10.0154C14.8855 9.71116 12.6666 14.0154 12.6666 14.0154C12.6666 14.0154 11.3333 12.0154 9.99996 12.6821Z" style="fill: var(--data-weather-cloud-heavy-secondary-color)"/>
<path d="M12.1782 5.17262C11.1299 9.43869 6.74822 12.0291 2.3916 10.9585C1.85537 10.8267 1.31873 11.3122 1.54474 11.8242C2.02231 12.9059 2.73016 13.8771 3.62235 14.6614C3.64624 14.6339 3.67063 14.6066 3.69553 14.5796C4.46211 13.7472 5.52698 13.3487 6.66666 13.3487H7.25987C7.43541 12.5009 7.91139 11.4903 9.10557 10.8932C10.3817 10.2551 11.5414 10.5914 12.333 11.0275C12.4856 10.8521 12.6503 10.6731 12.8272 10.4944C13.7723 9.53953 15.2171 8.44404 17.0969 8.10506C16.9853 5.4163 15.5527 2.94814 13.2974 1.53125C12.8169 1.22937 12.2658 1.72975 12.3402 2.30184C12.4618 3.23613 12.4158 4.20591 12.1782 5.17262Z" style="fill: var(--data-weather-sun-primary-color)"/>
<path d="M2.66675 27.9007C2.34788 27.696 2.23863 27.2428 2.42273 26.8883L2.84538 26.0745H2.00004C1.63185 26.0745 1.33337 25.7427 1.33337 25.3334C1.33337 24.9241 1.63185 24.5923 2.00004 24.5923H2.84538L2.42273 23.7785C2.23863 23.4241 2.34788 22.9708 2.66675 22.7662C2.98561 22.5615 3.39333 22.683 3.57743 23.0374L4.00008 23.8512L4.42273 23.0374C4.60682 22.683 5.01455 22.5615 5.33341 22.7662C5.65228 22.9708 5.76153 23.4241 5.57743 23.7785L5.15478 24.5923H6.00004C6.36823 24.5923 6.66671 24.9241 6.66671 25.3334C6.66671 25.7427 6.36823 26.0745 6.00004 26.0745H5.15478L5.57743 26.8883C5.76153 27.2428 5.65228 27.696 5.33341 27.9007C5.01455 28.1053 4.60682 27.9839 4.42273 27.6294L4.00008 26.8156L3.57743 27.6294C3.39334 27.9839 2.98561 28.1053 2.66675 27.9007Z" style="fill: var(--data-weather-snow-primary-color)"/>
<path d="M15.3334 27.9007C15.0146 27.696 14.9053 27.2428 15.0894 26.8883L15.512 26.0745H14.6667C14.2985 26.0745 14 25.7427 14 25.3334C14 24.9241 14.2985 24.5923 14.6667 24.5923H15.512L15.0894 23.7785C14.9053 23.4241 15.0146 22.9708 15.3334 22.7662C15.6523 22.5615 16.06 22.683 16.2441 23.0374L16.6667 23.8512L17.0894 23.0374C17.2735 22.683 17.6812 22.5615 18.0001 22.7662C18.3189 22.9708 18.4282 23.4241 18.2441 23.7785L17.8215 24.5923H18.6667C19.0349 24.5923 19.3334 24.9241 19.3334 25.3334C19.3334 25.7427 19.0349 26.0745 18.6667 26.0745H17.8214L18.2441 26.8883C18.4282 27.2428 18.3189 27.696 18.0001 27.9007C17.6812 28.1053 17.2735 27.9839 17.0894 27.6294L16.6667 26.8156L16.2441 27.6294C16.06 27.9839 15.6523 28.1053 15.3334 27.9007Z" style="fill: var(--data-weather-snow-primary-color)"/>
<path d="M26.6667 27.9007C26.3479 27.696 26.2386 27.2428 26.4227 26.8883L26.8454 26.0745H26C25.6319 26.0745 25.3334 25.7427 25.3334 25.3334C25.3334 24.9241 25.6319 24.5923 26 24.5923H26.8454L26.4227 23.7785C26.2386 23.4241 26.3479 22.9708 26.6667 22.7662C26.9856 22.5615 27.3933 22.683 27.5774 23.0374L28.0001 23.8512L28.4227 23.0374C28.6068 22.683 29.0146 22.5615 29.3334 22.7662C29.6523 22.9708 29.7615 23.4241 29.5774 23.7785L29.1548 24.5923H30C30.3682 24.5923 30.6667 24.9241 30.6667 25.3334C30.6667 25.7427 30.3682 26.0745 30 26.0745H29.1548L29.5774 26.8883C29.7615 27.2428 29.6523 27.696 29.3334 27.9007C29.0146 28.1053 28.6068 27.9839 28.4227 27.6294L28.0001 26.8156L27.5774 27.6294C27.3933 27.9839 26.9856 28.1053 26.6667 27.9007Z" style="fill: var(--data-weather-snow-primary-color)"/>
<path d="M21.3334 30.5673C21.0146 30.3627 20.9053 29.9094 21.0894 29.555L21.5121 28.7412H20.6667C20.2985 28.7412 20 28.4094 20 28.0001C20 27.5908 20.2985 27.259 20.6667 27.259H21.512L21.0894 26.4452C20.9053 26.0907 21.0146 25.6375 21.3334 25.4328C21.6523 25.2282 22.06 25.3496 22.2441 25.7041L22.6667 26.5179L23.0894 25.7041C23.2735 25.3496 23.6812 25.2282 24.0001 25.4328C24.3189 25.6375 24.4282 26.0907 24.2441 26.4452L23.8215 27.259H24.6667C25.0349 27.259 25.3334 27.5908 25.3334 28.0001C25.3334 28.4094 25.0349 28.7412 24.6667 28.7412H23.8214L24.2441 29.555C24.4282 29.9094 24.3189 30.3627 24.0001 30.5673C23.6812 30.772 23.2735 30.6505 23.0894 30.2961L22.6667 29.4823L22.2441 30.2961C22.06 30.6505 21.6523 30.772 21.3334 30.5673Z" style="fill: var(--data-weather-snow-primary-color)"/>
<path d="M9.33341 30.5673C9.01455 30.3627 8.9053 29.9094 9.0894 29.555L9.51205 28.7412H8.66671C8.29852 28.7412 8.00004 28.4094 8.00004 28.0001C8.00004 27.5908 8.29852 27.259 8.66671 27.259H9.51204L9.0894 26.4452C8.9053 26.0907 9.01455 25.6375 9.33341 25.4328C9.65228 25.2282 10.06 25.3496 10.2441 25.7041L10.6667 26.5179L11.0894 25.7041C11.2735 25.3496 11.6812 25.2282 12.0001 25.4328C12.3189 25.6375 12.4282 26.0907 12.2441 26.4452L11.8215 27.259H12.6667C13.0349 27.259 13.3334 27.5908 13.3334 28.0001C13.3334 28.4094 13.0349 28.7412 12.6667 28.7412H11.8214L12.2441 29.555C12.4282 29.9094 12.3189 30.3627 12.0001 30.5673C11.6812 30.772 11.2735 30.6505 11.0894 30.2961L10.6667 29.4823L10.2441 30.2961C10.06 30.6505 9.65228 30.772 9.33341 30.5673Z" style="fill: var(--data-weather-snow-primary-color)"/>
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
    'obi-heavy-snow-showers-night-colour': ObiHeavySnowShowersNightColour;
  }
}
