import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-heavy-sleet-showers-polartwilight')
export class ObiHeavySleetShowersPolartwilight extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="32" height="32" viewBox="0 0 32 32" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M3.33341 4.66675C2.96522 4.66675 2.66675 4.96522 2.66675 5.33341C2.66675 5.7016 2.96523 6.00008 3.33342 6.00008H4.88761C4.88761 6.13816 4.82827 6.27623 4.70959 6.37592L2.84548 7.94165C2.50022 8.23165 2.68525 8.77504 3.14321 8.81601L5.61579 9.0372C5.93064 9.06536 6.14804 9.35089 6.07882 9.64532L5.53521 11.9575C5.43452 12.3858 5.91894 12.7216 6.31467 12.4979L8.45129 11.2901C8.47495 11.2767 8.49923 11.2653 8.5239 11.2558C7.74859 11.8519 7.40364 12.6549 7.25995 13.3488H6.66675C5.52707 13.3488 4.46219 13.7474 3.69561 14.5797C2.95384 15.3851 2.66675 16.4055 2.66675 17.3488C2.66675 19.558 4.45761 21.3488 6.66675 21.3488H25.3334C27.6728 21.3488 29.1781 19.445 29.3275 17.5022C29.4243 16.244 28.7332 15.3588 28.1496 14.8677C27.5833 14.3909 26.9123 14.0917 26.3987 13.9034C26.1853 13.8252 25.9744 13.7574 25.7742 13.699C25.6452 13.1747 25.439 12.556 25.1072 11.919C24.1526 10.0867 22.2422 8.29671 18.8272 8.02193C18.7347 8.01449 18.6431 8.00897 18.5522 8.0053C18.5333 7.98304 18.5119 7.96174 18.488 7.94166L16.6239 6.37592C16.5052 6.27623 16.4459 6.13816 16.4459 6.00008H18.0001C18.3683 6.00008 18.6667 5.7016 18.6667 5.33341C18.6667 4.96522 18.3683 4.66675 18.0001 4.66675H3.33341ZM14.8773 6.00008H6.45622C6.45622 8.20922 8.34134 10.0001 10.6667 10.0001C12.9922 10.0001 14.8773 8.20922 14.8773 6.00008ZM24.0001 15.3488C24.0001 15.3488 27.4498 15.8352 27.3334 17.3488C27.2487 18.4501 26.438 19.3488 25.3334 19.3488H6.66675C5.56218 19.3488 4.66675 18.4534 4.66675 17.3488C4.66675 16.2442 5.33341 15.3488 6.66675 15.3488H9.33342C9.33342 15.3488 8.95842 14.2238 9.33342 13.3801C9.45842 13.0988 9.66675 12.8488 10.0001 12.6822C10.3899 12.4872 10.7798 12.5203 11.1363 12.6646C11.9991 13.014 12.6667 14.0155 12.6667 14.0155C12.6667 14.0155 13.0855 13.2031 13.8693 12.3091C14.8896 11.1454 16.5283 9.84342 18.6667 10.0155C24.0001 10.4446 24.0001 15.3488 24.0001 15.3488Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M25.8782 23.3371C26.1488 22.7508 26.7879 22.531 27.3565 22.7497L27.3666 22.7536L27.3765 22.7582C27.9629 23.0288 28.1826 23.6679 27.9639 24.2365L27.9585 24.2506L26.8402 26.8059C26.6534 27.2666 26.2313 27.4901 25.7968 27.4901C25.6459 27.4901 25.4766 27.4441 25.3714 27.409L25.3539 27.4032L25.3371 27.3955C24.7508 27.1248 24.531 26.4857 24.7497 25.9172L24.7551 25.9031L25.8782 23.3371Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M15.2115 23.3371C15.4821 22.7508 16.1213 22.531 16.6898 22.7497L16.7 22.7536L16.7098 22.7582C17.2962 23.0288 17.5159 23.6679 17.2973 24.2365L17.2918 24.2506L16.1735 26.8059C15.9867 27.2666 15.5646 27.4901 15.1301 27.4901C14.9792 27.4901 14.81 27.4441 14.7047 27.409L14.6872 27.4032L14.6705 27.3955C14.0841 27.1248 13.8644 26.4857 14.083 25.9172L14.0884 25.9031L15.2115 23.3371Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M9.87816 26.0038C10.1488 25.4174 10.7879 25.1977 11.3565 25.4164L11.3666 25.4203L11.3765 25.4248C11.9629 25.6955 12.1826 26.3346 11.9639 26.9031L11.9585 26.9172L10.8402 29.4726C10.6534 29.9333 10.2313 30.1568 9.79681 30.1568C9.64588 30.1568 9.47664 30.1108 9.3714 30.0757L9.35389 30.0699L9.33713 30.0621C8.75077 29.7915 8.53103 29.1524 8.7497 28.5838L8.75511 28.5697L9.87816 26.0038Z" fill="currentColor"/>
<path d="M4.00012 27.9007C3.68126 27.696 3.57201 27.2428 3.7561 26.8883L4.17876 26.0745H3.33341C2.96522 26.0745 2.66675 25.7427 2.66675 25.3334C2.66675 24.9241 2.96522 24.5923 3.33341 24.5923H4.17875L3.7561 23.7785C3.57201 23.4241 3.68126 22.9708 4.00012 22.7662C4.31898 22.5615 4.72671 22.683 4.9108 23.0374L5.33345 23.8512L5.7561 23.0374C5.9402 22.683 6.34792 22.5615 6.66679 22.7662C6.98565 22.9708 7.0949 23.4241 6.9108 23.7785L6.48816 24.5923H7.33341C7.7016 24.5923 8.00008 24.9241 8.00008 25.3334C8.00008 25.7427 7.7016 26.0745 7.33341 26.0745H6.48815L6.9108 26.8883C7.0949 27.2428 6.98565 27.696 6.66679 27.9007C6.34793 28.1053 5.9402 27.9839 5.7561 27.6294L5.33345 26.8156L4.9108 27.6294C4.72671 27.9839 4.31898 28.1053 4.00012 27.9007Z" fill="currentColor"/>
<path d="M19.3335 30.5673C19.0146 30.3627 18.9053 29.9094 19.0894 29.555L19.5121 28.7412H18.6667C18.2986 28.7412 18.0001 28.4094 18.0001 28.0001C18.0001 27.5908 18.2986 27.259 18.6667 27.259H19.5121L19.0894 26.4452C18.9053 26.0907 19.0146 25.6375 19.3335 25.4328C19.6523 25.2282 20.06 25.3496 20.2441 25.7041L20.6668 26.5179L21.0894 25.7041C21.2735 25.3496 21.6813 25.2282 22.0001 25.4328C22.319 25.6375 22.4282 26.0907 22.2441 26.4452L21.8215 27.259H22.6667C23.0349 27.259 23.3334 27.5908 23.3334 28.0001C23.3334 28.4094 23.0349 28.7412 22.6667 28.7412H21.8215L22.2441 29.555C22.4282 29.9094 22.319 30.3627 22.0001 30.5673C21.6813 30.772 21.2735 30.6505 21.0894 30.2961L20.6668 29.4823L20.2441 30.2961C20.06 30.6505 19.6523 30.772 19.3335 30.5673Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M3.33341 4.66675C2.96522 4.66675 2.66675 4.96522 2.66675 5.33341C2.66675 5.7016 2.96523 6.00008 3.33342 6.00008H4.88761C4.88761 6.13816 4.82827 6.27623 4.70959 6.37592L2.84548 7.94165C2.50022 8.23165 2.68525 8.77504 3.14321 8.81601L5.61579 9.0372C5.93064 9.06536 6.14804 9.35089 6.07882 9.64532L5.53521 11.9575C5.43452 12.3858 5.91894 12.7216 6.31467 12.4979L8.45129 11.2901C8.47495 11.2767 8.49923 11.2653 8.5239 11.2558C7.74859 11.8519 7.40364 12.6549 7.25995 13.3488H6.66675C5.52707 13.3488 4.46219 13.7474 3.69561 14.5797C2.95384 15.3851 2.66675 16.4055 2.66675 17.3488C2.66675 19.558 4.45761 21.3488 6.66675 21.3488H25.3334C27.6728 21.3488 29.1781 19.445 29.3275 17.5022C29.4243 16.244 28.7332 15.3588 28.1496 14.8677C27.5833 14.3909 26.9123 14.0917 26.3987 13.9034C26.1853 13.8252 25.9744 13.7574 25.7742 13.699C25.6452 13.1747 25.439 12.556 25.1072 11.919C24.1526 10.0867 22.2422 8.29671 18.8272 8.02193C18.7347 8.01449 18.6431 8.00897 18.5522 8.0053C18.5333 7.98304 18.5119 7.96174 18.488 7.94166L16.6239 6.37592C16.5052 6.27623 16.4459 6.13816 16.4459 6.00008H18.0001C18.3683 6.00008 18.6667 5.7016 18.6667 5.33341C18.6667 4.96522 18.3683 4.66675 18.0001 4.66675H3.33341ZM14.8773 6.00008H6.45622C6.45622 8.20922 8.34134 10.0001 10.6667 10.0001C12.9922 10.0001 14.8773 8.20922 14.8773 6.00008ZM24.0001 15.3488C24.0001 15.3488 27.4498 15.8352 27.3334 17.3488C27.2487 18.4501 26.438 19.3488 25.3334 19.3488H6.66675C5.56218 19.3488 4.66675 18.4534 4.66675 17.3488C4.66675 16.2442 5.33341 15.3488 6.66675 15.3488H9.33342C9.33342 15.3488 8.95842 14.2238 9.33342 13.3801C9.45842 13.0988 9.66675 12.8488 10.0001 12.6822C10.3899 12.4872 10.7798 12.5203 11.1363 12.6646C11.9991 13.014 12.6667 14.0155 12.6667 14.0155C12.6667 14.0155 13.0855 13.2031 13.8693 12.3091C14.8896 11.1454 16.5283 9.84342 18.6667 10.0155C24.0001 10.4446 24.0001 15.3488 24.0001 15.3488Z" style="fill: var(--element-active-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M25.8782 23.3371C26.1488 22.7508 26.7879 22.531 27.3565 22.7497L27.3666 22.7536L27.3765 22.7582C27.9629 23.0288 28.1826 23.6679 27.9639 24.2365L27.9585 24.2506L26.8402 26.8059C26.6534 27.2666 26.2313 27.4901 25.7968 27.4901C25.6459 27.4901 25.4766 27.4441 25.3714 27.409L25.3539 27.4032L25.3371 27.3955C24.7508 27.1248 24.531 26.4857 24.7497 25.9172L24.7551 25.9031L25.8782 23.3371Z" style="fill: var(--element-active-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M15.2115 23.3371C15.4821 22.7508 16.1213 22.531 16.6898 22.7497L16.7 22.7536L16.7098 22.7582C17.2962 23.0288 17.5159 23.6679 17.2973 24.2365L17.2918 24.2506L16.1735 26.8059C15.9867 27.2666 15.5646 27.4901 15.1301 27.4901C14.9792 27.4901 14.81 27.4441 14.7047 27.409L14.6872 27.4032L14.6705 27.3955C14.0841 27.1248 13.8644 26.4857 14.083 25.9172L14.0884 25.9031L15.2115 23.3371Z" style="fill: var(--element-active-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M9.87816 26.0038C10.1488 25.4174 10.7879 25.1977 11.3565 25.4164L11.3666 25.4203L11.3765 25.4248C11.9629 25.6955 12.1826 26.3346 11.9639 26.9031L11.9585 26.9172L10.8402 29.4726C10.6534 29.9333 10.2313 30.1568 9.79681 30.1568C9.64588 30.1568 9.47664 30.1108 9.3714 30.0757L9.35389 30.0699L9.33713 30.0621C8.75077 29.7915 8.53103 29.1524 8.7497 28.5838L8.75511 28.5697L9.87816 26.0038Z" style="fill: var(--element-active-color)"/>
<path d="M4.00012 27.9007C3.68126 27.696 3.57201 27.2428 3.7561 26.8883L4.17876 26.0745H3.33341C2.96522 26.0745 2.66675 25.7427 2.66675 25.3334C2.66675 24.9241 2.96522 24.5923 3.33341 24.5923H4.17875L3.7561 23.7785C3.57201 23.4241 3.68126 22.9708 4.00012 22.7662C4.31898 22.5615 4.72671 22.683 4.9108 23.0374L5.33345 23.8512L5.7561 23.0374C5.9402 22.683 6.34792 22.5615 6.66679 22.7662C6.98565 22.9708 7.0949 23.4241 6.9108 23.7785L6.48816 24.5923H7.33341C7.7016 24.5923 8.00008 24.9241 8.00008 25.3334C8.00008 25.7427 7.7016 26.0745 7.33341 26.0745H6.48815L6.9108 26.8883C7.0949 27.2428 6.98565 27.696 6.66679 27.9007C6.34793 28.1053 5.9402 27.9839 5.7561 27.6294L5.33345 26.8156L4.9108 27.6294C4.72671 27.9839 4.31898 28.1053 4.00012 27.9007Z" style="fill: var(--element-active-color)"/>
<path d="M19.3335 30.5673C19.0146 30.3627 18.9053 29.9094 19.0894 29.555L19.5121 28.7412H18.6667C18.2986 28.7412 18.0001 28.4094 18.0001 28.0001C18.0001 27.5908 18.2986 27.259 18.6667 27.259H19.5121L19.0894 26.4452C18.9053 26.0907 19.0146 25.6375 19.3335 25.4328C19.6523 25.2282 20.06 25.3496 20.2441 25.7041L20.6668 26.5179L21.0894 25.7041C21.2735 25.3496 21.6813 25.2282 22.0001 25.4328C22.319 25.6375 22.4282 26.0907 22.2441 26.4452L21.8215 27.259H22.6667C23.0349 27.259 23.3334 27.5908 23.3334 28.0001C23.3334 28.4094 23.0349 28.7412 22.6667 28.7412H21.8215L22.2441 29.555C22.4282 29.9094 22.319 30.3627 22.0001 30.5673C21.6813 30.772 21.2735 30.6505 21.0894 30.2961L20.6668 29.4823L20.2441 30.2961C20.06 30.6505 19.6523 30.772 19.3335 30.5673Z" style="fill: var(--element-active-color)"/>
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
    'obi-heavy-sleet-showers-polartwilight': ObiHeavySleetShowersPolartwilight;
  }
}
