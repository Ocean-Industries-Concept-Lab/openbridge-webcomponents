import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-lightning-light-sleet-showers-night-colour')
export class ObiLightningLightSleetShowersNightColour extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="32" height="32" viewBox="0 0 32 32" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M12.1782 5.17262C11.1299 9.43869 6.74822 12.0291 2.3916 10.9585C1.85537 10.8267 1.31873 11.3122 1.54474 11.8242C2.02231 12.9059 2.73016 13.8771 3.62235 14.6614C3.64624 14.6339 3.67063 14.6066 3.69553 14.5796C4.46211 13.7472 5.52698 13.3487 6.66666 13.3487H7.25987C7.43541 12.5009 7.91139 11.4903 9.10557 10.8932C10.3817 10.2551 11.5414 10.5914 12.333 11.0275C12.4856 10.8521 12.6503 10.6731 12.8272 10.4944C13.7723 9.53953 15.2171 8.44404 17.0969 8.10506C16.9853 5.4163 15.5527 2.94814 13.2974 1.53125C12.8169 1.22937 12.2658 1.72975 12.3402 2.30184C12.4618 3.23613 12.4158 4.20591 12.1782 5.17262Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M16.1632 19.4933L17.1791 13.3333L13.3333 21.1333L15.9092 22.3333L14.2403 29.3333L18.6666 20.6933L16.1632 19.4933Z" fill="currentColor"/>
<path d="M27.3334 17.3488C27.4498 15.8352 24.0001 15.3488 24.0001 15.3488C24.0001 15.3488 24.0001 10.4446 18.6667 10.0155C16.5283 9.84342 14.8896 11.1454 13.8693 12.3091C13.0855 13.2031 12.6667 14.0155 12.6667 14.0155C12.6667 14.0155 11.9991 13.014 11.1363 12.6646C10.7798 12.5203 10.3899 12.4872 10.0001 12.6822C9.66675 12.8488 9.45842 13.0988 9.33342 13.3801C8.95842 14.2238 9.33342 15.3488 9.33342 15.3488H6.66675C5.33341 15.3488 4.66675 16.2442 4.66675 17.3488C4.66675 18.4534 5.56218 19.3488 6.66675 19.3488H12.7267L12.1375 20.5438C12.0138 20.7948 11.973 21.0764 12.0176 21.3488H6.66675C4.45761 21.3488 2.66675 19.558 2.66675 17.3488C2.66675 16.4055 2.95384 15.3851 3.69561 14.5797C4.46219 13.7474 5.52707 13.3488 6.66675 13.3488H7.25995C7.4355 12.5011 7.91148 11.4904 9.10565 10.8933C10.3818 10.2552 11.5415 10.5915 12.3331 11.0276C12.4856 10.8522 12.6504 10.6732 12.8273 10.4945C14.0444 9.26475 16.0906 7.80174 18.8272 8.02193C22.2422 8.29671 24.1526 10.0867 25.1072 11.919C25.439 12.556 25.6452 13.1747 25.7742 13.699C25.9744 13.7574 26.1853 13.8252 26.3987 13.9034C26.9123 14.0917 27.5833 14.3909 28.1496 14.8677C28.7332 15.3588 29.4243 16.244 29.3275 17.5022C29.1781 19.445 27.6728 21.3488 25.3334 21.3488H19.8291L19.8534 21.3014C20.0174 20.9812 20.0451 20.6084 19.9302 20.2675C19.8153 19.9266 19.5675 19.6466 19.2431 19.4911L18.9462 19.3488H25.3334C26.438 19.3488 27.2487 18.4501 27.3334 17.3488Z" fill="currentColor"/>
<path d="M9.33342 15.3487C9.33342 15.3487 8.66675 13.3487 10.0001 12.6821C11.3334 12.0154 12.6667 14.0154 12.6667 14.0154C12.6667 14.0154 14.8856 9.71116 18.6667 10.0154C24.0001 10.4445 24.0001 15.3487 24.0001 15.3487C24.0001 15.3487 27.4498 15.8351 27.3334 17.3487C27.2487 18.45 26.438 19.3487 25.3334 19.3487H18.9462L17.6417 18.7234L18.4948 13.5503C18.6023 12.8983 18.2161 12.266 17.5869 12.0639C16.9578 11.8618 16.2756 12.1511 15.9833 12.7437L12.7267 19.3487H6.66675C5.56218 19.3487 4.66675 18.4533 4.66675 17.3487C4.66675 16.2442 5.33341 15.3487 6.66675 15.3487H9.33342Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M21.8782 24.0036C22.1488 23.4173 22.7879 23.1975 23.3565 23.4162L23.3666 23.4201L23.3765 23.4247C23.9629 23.6953 24.1826 24.3344 23.9639 24.903L23.9585 24.9171L22.8402 27.4724C22.6534 27.9331 22.2313 28.1567 21.7968 28.1567C21.6459 28.1567 21.4766 28.1106 21.3714 28.0755L21.3539 28.0697L21.3371 28.062C20.7508 27.7913 20.531 27.1522 20.7497 26.5837L20.7551 26.5696L21.8782 24.0036Z" fill="currentColor"/>
<path d="M8.00012 29.2339C7.68126 29.0293 7.57201 28.576 7.7561 28.2216L8.17876 27.4078H7.33341C6.96522 27.4078 6.66675 27.076 6.66675 26.6667C6.66675 26.2574 6.96522 25.9256 7.33341 25.9256H8.17875L7.7561 25.1118C7.57201 24.7573 7.68126 24.3041 8.00012 24.0994C8.31898 23.8948 8.72671 24.0162 8.9108 24.3707L9.33345 25.1845L9.7561 24.3707C9.9402 24.0162 10.3479 23.8948 10.6668 24.0994C10.9856 24.3041 11.0949 24.7573 10.9108 25.1118L10.4882 25.9256H11.3334C11.7016 25.9256 12.0001 26.2574 12.0001 26.6667C12.0001 27.076 11.7016 27.4078 11.3334 27.4078H10.4882L10.9108 28.2216C11.0949 28.576 10.9856 29.0293 10.6668 29.2339C10.3479 29.4386 9.9402 29.3171 9.7561 28.9627L9.33345 28.1489L8.9108 28.9627C8.72671 29.3171 8.31898 29.4386 8.00012 29.2339Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12.1782 5.17262C11.1299 9.43869 6.74822 12.0291 2.3916 10.9585C1.85537 10.8267 1.31873 11.3122 1.54474 11.8242C2.02231 12.9059 2.73016 13.8771 3.62235 14.6614C3.64624 14.6339 3.67063 14.6066 3.69553 14.5796C4.46211 13.7472 5.52698 13.3487 6.66666 13.3487H7.25987C7.43541 12.5009 7.91139 11.4903 9.10557 10.8932C10.3817 10.2551 11.5414 10.5914 12.333 11.0275C12.4856 10.8521 12.6503 10.6731 12.8272 10.4944C13.7723 9.53953 15.2171 8.44404 17.0969 8.10506C16.9853 5.4163 15.5527 2.94814 13.2974 1.53125C12.8169 1.22937 12.2658 1.72975 12.3402 2.30184C12.4618 3.23613 12.4158 4.20591 12.1782 5.17262Z" style="fill: var(--data-weather-lightning-primary-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M16.1632 19.4933L17.1791 13.3333L13.3333 21.1333L15.9092 22.3333L14.2403 29.3333L18.6666 20.6933L16.1632 19.4933Z" style="fill: var(--data-weather-lightning-primary-color)"/>
<path d="M27.3334 17.3488C27.4498 15.8352 24.0001 15.3488 24.0001 15.3488C24.0001 15.3488 24.0001 10.4446 18.6667 10.0155C16.5283 9.84342 14.8896 11.1454 13.8693 12.3091C13.0855 13.2031 12.6667 14.0155 12.6667 14.0155C12.6667 14.0155 11.9991 13.014 11.1363 12.6646C10.7798 12.5203 10.3899 12.4872 10.0001 12.6822C9.66675 12.8488 9.45842 13.0988 9.33342 13.3801C8.95842 14.2238 9.33342 15.3488 9.33342 15.3488H6.66675C5.33341 15.3488 4.66675 16.2442 4.66675 17.3488C4.66675 18.4534 5.56218 19.3488 6.66675 19.3488H12.7267L12.1375 20.5438C12.0138 20.7948 11.973 21.0764 12.0176 21.3488H6.66675C4.45761 21.3488 2.66675 19.558 2.66675 17.3488C2.66675 16.4055 2.95384 15.3851 3.69561 14.5797C4.46219 13.7474 5.52707 13.3488 6.66675 13.3488H7.25995C7.4355 12.5011 7.91148 11.4904 9.10565 10.8933C10.3818 10.2552 11.5415 10.5915 12.3331 11.0276C12.4856 10.8522 12.6504 10.6732 12.8273 10.4945C14.0444 9.26475 16.0906 7.80174 18.8272 8.02193C22.2422 8.29671 24.1526 10.0867 25.1072 11.919C25.439 12.556 25.6452 13.1747 25.7742 13.699C25.9744 13.7574 26.1853 13.8252 26.3987 13.9034C26.9123 14.0917 27.5833 14.3909 28.1496 14.8677C28.7332 15.3588 29.4243 16.244 29.3275 17.5022C29.1781 19.445 27.6728 21.3488 25.3334 21.3488H19.8291L19.8534 21.3014C20.0174 20.9812 20.0451 20.6084 19.9302 20.2675C19.8153 19.9266 19.5675 19.6466 19.2431 19.4911L18.9462 19.3488H25.3334C26.438 19.3488 27.2487 18.4501 27.3334 17.3488Z" style="fill: var(--data-weather-cloud-light-primary-color)"/>
<path d="M9.33342 15.3487C9.33342 15.3487 8.66675 13.3487 10.0001 12.6821C11.3334 12.0154 12.6667 14.0154 12.6667 14.0154C12.6667 14.0154 14.8856 9.71116 18.6667 10.0154C24.0001 10.4445 24.0001 15.3487 24.0001 15.3487C24.0001 15.3487 27.4498 15.8351 27.3334 17.3487C27.2487 18.45 26.438 19.3487 25.3334 19.3487H18.9462L17.6417 18.7234L18.4948 13.5503C18.6023 12.8983 18.2161 12.266 17.5869 12.0639C16.9578 11.8618 16.2756 12.1511 15.9833 12.7437L12.7267 19.3487H6.66675C5.56218 19.3487 4.66675 18.4533 4.66675 17.3487C4.66675 16.2442 5.33341 15.3487 6.66675 15.3487H9.33342Z" style="fill: var(--data-weather-cloud-light-seconday-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M21.8782 24.0036C22.1488 23.4173 22.7879 23.1975 23.3565 23.4162L23.3666 23.4201L23.3765 23.4247C23.9629 23.6953 24.1826 24.3344 23.9639 24.903L23.9585 24.9171L22.8402 27.4724C22.6534 27.9331 22.2313 28.1567 21.7968 28.1567C21.6459 28.1567 21.4766 28.1106 21.3714 28.0755L21.3539 28.0697L21.3371 28.062C20.7508 27.7913 20.531 27.1522 20.7497 26.5837L20.7551 26.5696L21.8782 24.0036Z" style="fill: var(--data-weather-rain-primary-color)"/>
<path d="M8.00012 29.2339C7.68126 29.0293 7.57201 28.576 7.7561 28.2216L8.17876 27.4078H7.33341C6.96522 27.4078 6.66675 27.076 6.66675 26.6667C6.66675 26.2574 6.96522 25.9256 7.33341 25.9256H8.17875L7.7561 25.1118C7.57201 24.7573 7.68126 24.3041 8.00012 24.0994C8.31898 23.8948 8.72671 24.0162 8.9108 24.3707L9.33345 25.1845L9.7561 24.3707C9.9402 24.0162 10.3479 23.8948 10.6668 24.0994C10.9856 24.3041 11.0949 24.7573 10.9108 25.1118L10.4882 25.9256H11.3334C11.7016 25.9256 12.0001 26.2574 12.0001 26.6667C12.0001 27.076 11.7016 27.4078 11.3334 27.4078H10.4882L10.9108 28.2216C11.0949 28.576 10.9856 29.0293 10.6668 29.2339C10.3479 29.4386 9.9402 29.3171 9.7561 28.9627L9.33345 28.1489L8.9108 28.9627C8.72671 29.3171 8.31898 29.4386 8.00012 29.2339Z" style="fill: var(--data-weather-snow-primary-color)"/>
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
    'obi-lightning-light-sleet-showers-night-colour': ObiLightningLightSleetShowersNightColour;
  }
}