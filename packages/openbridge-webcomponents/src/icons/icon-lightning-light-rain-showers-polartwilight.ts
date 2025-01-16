import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-lightning-light-rain-showers-polartwilight')
export class ObiLightningLightRainShowersPolartwilight extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="32" height="32" viewBox="0 0 32 32" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M2.66675 5.33341C2.66675 4.96522 2.96522 4.66675 3.33341 4.66675H18.0001C18.3683 4.66675 18.6667 4.96522 18.6667 5.33341C18.6667 5.7016 18.3683 6.00008 18.0001 6.00008H16.4459C16.4459 6.13816 16.5052 6.27623 16.6239 6.37592L18.488 7.94166C18.5119 7.96174 18.5333 7.98304 18.5522 8.0053C18.6431 8.00897 18.7347 8.01449 18.8272 8.02193C22.2422 8.29671 24.1526 10.0867 25.1072 11.919C25.439 12.556 25.6452 13.1747 25.7742 13.699C25.9744 13.7574 26.1853 13.8252 26.3987 13.9034C26.9123 14.0917 27.5833 14.3909 28.1496 14.8677C28.7332 15.3588 29.4243 16.244 29.3275 17.5022C29.1781 19.445 27.6728 21.3488 25.3334 21.3488H19.8291L19.8534 21.3014C20.0174 20.9812 20.0451 20.6084 19.9302 20.2675C19.8153 19.9266 19.5675 19.6466 19.2431 19.4911L18.9462 19.3488H25.3334C26.438 19.3488 27.2487 18.4501 27.3334 17.3488C27.4498 15.8352 24.0001 15.3488 24.0001 15.3488C24.0001 15.3488 24.0001 10.4446 18.6667 10.0155C16.5283 9.84342 14.8896 11.1454 13.8693 12.3091C13.0855 13.2031 12.6667 14.0155 12.6667 14.0155C12.6667 14.0155 11.9991 13.014 11.1363 12.6646C10.7798 12.5203 10.3899 12.4872 10.0001 12.6822C9.66675 12.8488 9.45842 13.0988 9.33342 13.3801C8.95842 14.2238 9.33342 15.3488 9.33342 15.3488H6.66675C5.33341 15.3488 4.66675 16.2442 4.66675 17.3488C4.66675 18.4534 5.56218 19.3488 6.66675 19.3488H12.7267L12.1375 20.5438C12.0138 20.7948 11.973 21.0765 12.0176 21.3488H6.66675C4.45761 21.3488 2.66675 19.558 2.66675 17.3488C2.66675 16.4055 2.95384 15.3851 3.69561 14.5797C4.46219 13.7474 5.52707 13.3488 6.66675 13.3488H7.25995C7.40364 12.6549 7.74859 11.8519 8.5239 11.2558C8.49923 11.2653 8.47495 11.2767 8.45129 11.2901L6.31467 12.4979C5.91894 12.7216 5.43452 12.3858 5.53521 11.9575L6.07882 9.64532C6.14804 9.35089 5.93064 9.06536 5.61579 9.0372L3.14321 8.81601C2.68525 8.77504 2.50022 8.23165 2.84548 7.94165L4.70959 6.37592C4.82827 6.27623 4.88761 6.13816 4.88761 6.00008H3.33342C2.96523 6.00008 2.66675 5.7016 2.66675 5.33341ZM6.45622 6.00008H14.8773C14.8773 8.20922 12.9922 10.0001 10.6667 10.0001C8.34134 10.0001 6.45622 8.20922 6.45622 6.00008Z" fill="currentColor"/>
<path d="M17.1792 13.3334L16.1633 19.4934L18.6667 20.6934L14.2404 29.3334L15.9094 22.3334L13.3334 21.1334L17.1792 13.3334Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M9.21149 26.0038C9.48212 25.4174 10.1213 25.1977 10.6898 25.4164L10.7 25.4203L10.7098 25.4248C11.2962 25.6955 11.5159 26.3346 11.2973 26.9031L11.2918 26.9172L10.1735 29.4726C9.98668 29.9333 9.56464 30.1568 9.13015 30.1568C8.97922 30.1568 8.80997 30.1108 8.70474 30.0757L8.68722 30.0699L8.67046 30.0621C8.08411 29.7915 7.86436 29.1524 8.08303 28.5838L8.08845 28.5697L9.21149 26.0038Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M21.2115 24.0038C21.4821 23.4174 22.1213 23.1977 22.6898 23.4164L22.7 23.4203L22.7098 23.4248C23.2962 23.6955 23.5159 24.3346 23.2973 24.9031L23.2918 24.9172L22.1735 27.4726C21.9867 27.9333 21.5646 28.1568 21.1301 28.1568C20.9792 28.1568 20.81 28.1108 20.7047 28.0757L20.6872 28.0699L20.6705 28.0621C20.0841 27.7915 19.8644 27.1524 20.083 26.5838L20.0884 26.5697L21.2115 24.0038Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M2.66675 5.33341C2.66675 4.96522 2.96522 4.66675 3.33341 4.66675H18.0001C18.3683 4.66675 18.6667 4.96522 18.6667 5.33341C18.6667 5.7016 18.3683 6.00008 18.0001 6.00008H16.4459C16.4459 6.13816 16.5052 6.27623 16.6239 6.37592L18.488 7.94166C18.5119 7.96174 18.5333 7.98304 18.5522 8.0053C18.6431 8.00897 18.7347 8.01449 18.8272 8.02193C22.2422 8.29671 24.1526 10.0867 25.1072 11.919C25.439 12.556 25.6452 13.1747 25.7742 13.699C25.9744 13.7574 26.1853 13.8252 26.3987 13.9034C26.9123 14.0917 27.5833 14.3909 28.1496 14.8677C28.7332 15.3588 29.4243 16.244 29.3275 17.5022C29.1781 19.445 27.6728 21.3488 25.3334 21.3488H19.8291L19.8534 21.3014C20.0174 20.9812 20.0451 20.6084 19.9302 20.2675C19.8153 19.9266 19.5675 19.6466 19.2431 19.4911L18.9462 19.3488H25.3334C26.438 19.3488 27.2487 18.4501 27.3334 17.3488C27.4498 15.8352 24.0001 15.3488 24.0001 15.3488C24.0001 15.3488 24.0001 10.4446 18.6667 10.0155C16.5283 9.84342 14.8896 11.1454 13.8693 12.3091C13.0855 13.2031 12.6667 14.0155 12.6667 14.0155C12.6667 14.0155 11.9991 13.014 11.1363 12.6646C10.7798 12.5203 10.3899 12.4872 10.0001 12.6822C9.66675 12.8488 9.45842 13.0988 9.33342 13.3801C8.95842 14.2238 9.33342 15.3488 9.33342 15.3488H6.66675C5.33341 15.3488 4.66675 16.2442 4.66675 17.3488C4.66675 18.4534 5.56218 19.3488 6.66675 19.3488H12.7267L12.1375 20.5438C12.0138 20.7948 11.973 21.0765 12.0176 21.3488H6.66675C4.45761 21.3488 2.66675 19.558 2.66675 17.3488C2.66675 16.4055 2.95384 15.3851 3.69561 14.5797C4.46219 13.7474 5.52707 13.3488 6.66675 13.3488H7.25995C7.40364 12.6549 7.74859 11.8519 8.5239 11.2558C8.49923 11.2653 8.47495 11.2767 8.45129 11.2901L6.31467 12.4979C5.91894 12.7216 5.43452 12.3858 5.53521 11.9575L6.07882 9.64532C6.14804 9.35089 5.93064 9.06536 5.61579 9.0372L3.14321 8.81601C2.68525 8.77504 2.50022 8.23165 2.84548 7.94165L4.70959 6.37592C4.82827 6.27623 4.88761 6.13816 4.88761 6.00008H3.33342C2.96523 6.00008 2.66675 5.7016 2.66675 5.33341ZM6.45622 6.00008H14.8773C14.8773 8.20922 12.9922 10.0001 10.6667 10.0001C8.34134 10.0001 6.45622 8.20922 6.45622 6.00008Z" style="fill: var(--element-active-color)"/>
<path d="M17.1792 13.3334L16.1633 19.4934L18.6667 20.6934L14.2404 29.3334L15.9094 22.3334L13.3334 21.1334L17.1792 13.3334Z" style="fill: var(--element-active-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M9.21149 26.0038C9.48212 25.4174 10.1213 25.1977 10.6898 25.4164L10.7 25.4203L10.7098 25.4248C11.2962 25.6955 11.5159 26.3346 11.2973 26.9031L11.2918 26.9172L10.1735 29.4726C9.98668 29.9333 9.56464 30.1568 9.13015 30.1568C8.97922 30.1568 8.80997 30.1108 8.70474 30.0757L8.68722 30.0699L8.67046 30.0621C8.08411 29.7915 7.86436 29.1524 8.08303 28.5838L8.08845 28.5697L9.21149 26.0038Z" style="fill: var(--element-active-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M21.2115 24.0038C21.4821 23.4174 22.1213 23.1977 22.6898 23.4164L22.7 23.4203L22.7098 23.4248C23.2962 23.6955 23.5159 24.3346 23.2973 24.9031L23.2918 24.9172L22.1735 27.4726C21.9867 27.9333 21.5646 28.1568 21.1301 28.1568C20.9792 28.1568 20.81 28.1108 20.7047 28.0757L20.6872 28.0699L20.6705 28.0621C20.0841 27.7915 19.8644 27.1524 20.083 26.5838L20.0884 26.5697L21.2115 24.0038Z" style="fill: var(--element-active-color)"/>
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
    'obi-lightning-light-rain-showers-polartwilight': ObiLightningLightRainShowersPolartwilight;
  }
}
