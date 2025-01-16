import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-lightning-light-sleet-showers-polartwilight-colour')
export class ObiLightningLightSleetShowersPolartwilightColour extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="32" height="32" viewBox="0 0 32 32" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M2.66675 5.33341C2.66675 4.96522 2.96522 4.66675 3.33341 4.66675H18.0001C18.3683 4.66675 18.6667 4.96522 18.6667 5.33341C18.6667 5.7016 18.3683 6.00008 18.0001 6.00008H3.33342C2.96523 6.00008 2.66675 5.7016 2.66675 5.33341Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M14.8771 6H6.45605C6.45605 8.20914 8.34117 10 10.6666 10C12.992 10 14.8771 8.20914 14.8771 6Z" fill="currentColor"/>
<path d="M4.70959 6.37584C4.82827 6.27615 4.88761 6.13808 4.88761 6H6.45622C6.45622 8.20914 8.34134 10 10.6667 10C12.9922 10 14.8773 8.20914 14.8773 6H16.4459C16.4459 6.13808 16.5052 6.27615 16.6239 6.37584L18.488 7.94157C18.5119 7.96166 18.5333 7.98296 18.5522 8.00522C15.9533 7.90023 14.0033 9.30621 12.8273 10.4944C12.6504 10.6732 12.4856 10.8521 12.3331 11.0276C11.5415 10.5915 10.3818 10.2551 9.10565 10.8932C8.88891 11.0016 8.69583 11.1236 8.5239 11.2558C8.49923 11.2652 8.47495 11.2766 8.45129 11.29L6.31467 12.4978C5.91894 12.7215 5.43452 12.3857 5.53521 11.9575L6.07882 9.64523C6.14804 9.35081 5.93064 9.06528 5.61579 9.03712L3.14321 8.81593C2.68525 8.77496 2.50022 8.23157 2.84548 7.94157L4.70959 6.37584Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M16.1632 19.4933L17.1791 13.3333L13.3333 21.1333L15.9092 22.3333L14.2403 29.3333L18.6666 20.6933L16.1632 19.4933Z" fill="currentColor"/>
<path d="M27.3334 17.3488C27.4498 15.8352 24.0001 15.3488 24.0001 15.3488C24.0001 15.3488 24.0001 10.4446 18.6667 10.0155C16.5283 9.84342 14.8896 11.1454 13.8693 12.3091C13.0855 13.2031 12.6667 14.0155 12.6667 14.0155C12.6667 14.0155 11.9991 13.014 11.1363 12.6646C10.7798 12.5203 10.3899 12.4872 10.0001 12.6822C9.66675 12.8488 9.45842 13.0988 9.33342 13.3801C8.95842 14.2238 9.33342 15.3488 9.33342 15.3488H6.66675C5.33341 15.3488 4.66675 16.2442 4.66675 17.3488C4.66675 18.4534 5.56218 19.3488 6.66675 19.3488H12.7267L12.1375 20.5438C12.0138 20.7948 11.973 21.0764 12.0176 21.3488H6.66675C4.45761 21.3488 2.66675 19.558 2.66675 17.3488C2.66675 16.4055 2.95384 15.3851 3.69561 14.5797C4.46219 13.7474 5.52707 13.3488 6.66675 13.3488H7.25995C7.4355 12.5011 7.91148 11.4904 9.10565 10.8933C10.3818 10.2552 11.5415 10.5915 12.3331 11.0276C12.4856 10.8522 12.6504 10.6732 12.8273 10.4945C14.0444 9.26475 16.0906 7.80174 18.8272 8.02193C22.2422 8.29671 24.1526 10.0867 25.1072 11.919C25.439 12.556 25.6452 13.1747 25.7742 13.699C25.9744 13.7574 26.1853 13.8252 26.3987 13.9034C26.9123 14.0917 27.5833 14.3909 28.1496 14.8677C28.7332 15.3588 29.4243 16.244 29.3275 17.5022C29.1781 19.445 27.6728 21.3488 25.3334 21.3488H19.8291L19.8534 21.3014C20.0174 20.9812 20.0451 20.6084 19.9302 20.2675C19.8153 19.9266 19.5675 19.6466 19.2431 19.4911L18.9462 19.3488H25.3334C26.438 19.3488 27.2487 18.4501 27.3334 17.3488Z" fill="currentColor"/>
<path d="M9.33342 15.3487C9.33342 15.3487 8.66675 13.3487 10.0001 12.6821C11.3334 12.0154 12.6667 14.0154 12.6667 14.0154C12.6667 14.0154 14.8856 9.71116 18.6667 10.0154C24.0001 10.4445 24.0001 15.3487 24.0001 15.3487C24.0001 15.3487 27.4498 15.8351 27.3334 17.3487C27.2487 18.45 26.438 19.3487 25.3334 19.3487H18.9462L17.6417 18.7234L18.4948 13.5503C18.6023 12.8983 18.2161 12.266 17.5869 12.0639C16.9578 11.8618 16.2756 12.1511 15.9833 12.7437L12.7267 19.3487H6.66675C5.56218 19.3487 4.66675 18.4533 4.66675 17.3487C4.66675 16.2442 5.33341 15.3487 6.66675 15.3487H9.33342Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M21.2114 24.0036C21.482 23.4173 22.1212 23.1975 22.6897 23.4162L22.6999 23.4201L22.7098 23.4247C23.2961 23.6953 23.5159 24.3344 23.2972 24.903L23.2918 24.9171L22.1734 27.4724C21.9866 27.9331 21.5646 28.1567 21.1301 28.1567C20.9791 28.1567 20.8099 28.1106 20.7047 28.0755L20.6871 28.0697L20.6704 28.062C20.084 27.7913 19.8643 27.1522 20.0829 26.5837L20.0884 26.5696L21.2114 24.0036Z" fill="currentColor"/>
<path d="M7.33337 29.2339C7.01451 29.0293 6.90526 28.576 7.08936 28.2216L7.51201 27.4078H6.66667C6.29848 27.4078 6 27.076 6 26.6667C6 26.2574 6.29848 25.9256 6.66667 25.9256H7.512L7.08936 25.1118C6.90526 24.7573 7.01451 24.3041 7.33337 24.0994C7.65223 23.8948 8.05996 24.0162 8.24406 24.3707L8.66671 25.1845L9.08936 24.3707C9.27345 24.0162 9.68118 23.8948 10 24.0994C10.3189 24.3041 10.4282 24.7573 10.2441 25.1118L9.82141 25.9256H10.6667C11.0349 25.9256 11.3333 26.2574 11.3333 26.6667C11.3333 27.076 11.0349 27.4078 10.6667 27.4078H9.8214L10.2441 28.2216C10.4282 28.576 10.3189 29.0293 10 29.2339C9.68118 29.4386 9.27345 29.3171 9.08936 28.9627L8.66671 28.1489L8.24406 28.9627C8.05996 29.3171 7.65223 29.4386 7.33337 29.2339Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M2.66675 5.33341C2.66675 4.96522 2.96522 4.66675 3.33341 4.66675H18.0001C18.3683 4.66675 18.6667 4.96522 18.6667 5.33341C18.6667 5.7016 18.3683 6.00008 18.0001 6.00008H3.33342C2.96523 6.00008 2.66675 5.7016 2.66675 5.33341Z" style="fill: var(--instrument-tick-mark-secondary-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M14.8771 6H6.45605C6.45605 8.20914 8.34117 10 10.6666 10C12.992 10 14.8771 8.20914 14.8771 6Z" style="fill: var(--data-weather-sun-secondary-color)"/>
<path d="M4.70959 6.37584C4.82827 6.27615 4.88761 6.13808 4.88761 6H6.45622C6.45622 8.20914 8.34134 10 10.6667 10C12.9922 10 14.8773 8.20914 14.8773 6H16.4459C16.4459 6.13808 16.5052 6.27615 16.6239 6.37584L18.488 7.94157C18.5119 7.96166 18.5333 7.98296 18.5522 8.00522C15.9533 7.90023 14.0033 9.30621 12.8273 10.4944C12.6504 10.6732 12.4856 10.8521 12.3331 11.0276C11.5415 10.5915 10.3818 10.2551 9.10565 10.8932C8.88891 11.0016 8.69583 11.1236 8.5239 11.2558C8.49923 11.2652 8.47495 11.2766 8.45129 11.29L6.31467 12.4978C5.91894 12.7215 5.43452 12.3857 5.53521 11.9575L6.07882 9.64523C6.14804 9.35081 5.93064 9.06528 5.61579 9.03712L3.14321 8.81593C2.68525 8.77496 2.50022 8.23157 2.84548 7.94157L4.70959 6.37584Z" style="fill: var(--data-weather-lightning-primary-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M16.1632 19.4933L17.1791 13.3333L13.3333 21.1333L15.9092 22.3333L14.2403 29.3333L18.6666 20.6933L16.1632 19.4933Z" style="fill: var(--data-weather-lightning-primary-color)"/>
<path d="M27.3334 17.3488C27.4498 15.8352 24.0001 15.3488 24.0001 15.3488C24.0001 15.3488 24.0001 10.4446 18.6667 10.0155C16.5283 9.84342 14.8896 11.1454 13.8693 12.3091C13.0855 13.2031 12.6667 14.0155 12.6667 14.0155C12.6667 14.0155 11.9991 13.014 11.1363 12.6646C10.7798 12.5203 10.3899 12.4872 10.0001 12.6822C9.66675 12.8488 9.45842 13.0988 9.33342 13.3801C8.95842 14.2238 9.33342 15.3488 9.33342 15.3488H6.66675C5.33341 15.3488 4.66675 16.2442 4.66675 17.3488C4.66675 18.4534 5.56218 19.3488 6.66675 19.3488H12.7267L12.1375 20.5438C12.0138 20.7948 11.973 21.0764 12.0176 21.3488H6.66675C4.45761 21.3488 2.66675 19.558 2.66675 17.3488C2.66675 16.4055 2.95384 15.3851 3.69561 14.5797C4.46219 13.7474 5.52707 13.3488 6.66675 13.3488H7.25995C7.4355 12.5011 7.91148 11.4904 9.10565 10.8933C10.3818 10.2552 11.5415 10.5915 12.3331 11.0276C12.4856 10.8522 12.6504 10.6732 12.8273 10.4945C14.0444 9.26475 16.0906 7.80174 18.8272 8.02193C22.2422 8.29671 24.1526 10.0867 25.1072 11.919C25.439 12.556 25.6452 13.1747 25.7742 13.699C25.9744 13.7574 26.1853 13.8252 26.3987 13.9034C26.9123 14.0917 27.5833 14.3909 28.1496 14.8677C28.7332 15.3588 29.4243 16.244 29.3275 17.5022C29.1781 19.445 27.6728 21.3488 25.3334 21.3488H19.8291L19.8534 21.3014C20.0174 20.9812 20.0451 20.6084 19.9302 20.2675C19.8153 19.9266 19.5675 19.6466 19.2431 19.4911L18.9462 19.3488H25.3334C26.438 19.3488 27.2487 18.4501 27.3334 17.3488Z" style="fill: var(--data-weather-cloud-light-primary-color)"/>
<path d="M9.33342 15.3487C9.33342 15.3487 8.66675 13.3487 10.0001 12.6821C11.3334 12.0154 12.6667 14.0154 12.6667 14.0154C12.6667 14.0154 14.8856 9.71116 18.6667 10.0154C24.0001 10.4445 24.0001 15.3487 24.0001 15.3487C24.0001 15.3487 27.4498 15.8351 27.3334 17.3487C27.2487 18.45 26.438 19.3487 25.3334 19.3487H18.9462L17.6417 18.7234L18.4948 13.5503C18.6023 12.8983 18.2161 12.266 17.5869 12.0639C16.9578 11.8618 16.2756 12.1511 15.9833 12.7437L12.7267 19.3487H6.66675C5.56218 19.3487 4.66675 18.4533 4.66675 17.3487C4.66675 16.2442 5.33341 15.3487 6.66675 15.3487H9.33342Z" style="fill: var(--data-weather-cloud-light-seconday-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M21.2114 24.0036C21.482 23.4173 22.1212 23.1975 22.6897 23.4162L22.6999 23.4201L22.7098 23.4247C23.2961 23.6953 23.5159 24.3344 23.2972 24.903L23.2918 24.9171L22.1734 27.4724C21.9866 27.9331 21.5646 28.1567 21.1301 28.1567C20.9791 28.1567 20.8099 28.1106 20.7047 28.0755L20.6871 28.0697L20.6704 28.062C20.084 27.7913 19.8643 27.1522 20.0829 26.5837L20.0884 26.5696L21.2114 24.0036Z" style="fill: var(--data-weather-rain-primary-color)"/>
<path d="M7.33337 29.2339C7.01451 29.0293 6.90526 28.576 7.08936 28.2216L7.51201 27.4078H6.66667C6.29848 27.4078 6 27.076 6 26.6667C6 26.2574 6.29848 25.9256 6.66667 25.9256H7.512L7.08936 25.1118C6.90526 24.7573 7.01451 24.3041 7.33337 24.0994C7.65223 23.8948 8.05996 24.0162 8.24406 24.3707L8.66671 25.1845L9.08936 24.3707C9.27345 24.0162 9.68118 23.8948 10 24.0994C10.3189 24.3041 10.4282 24.7573 10.2441 25.1118L9.82141 25.9256H10.6667C11.0349 25.9256 11.3333 26.2574 11.3333 26.6667C11.3333 27.076 11.0349 27.4078 10.6667 27.4078H9.8214L10.2441 28.2216C10.4282 28.576 10.3189 29.0293 10 29.2339C9.68118 29.4386 9.27345 29.3171 9.08936 28.9627L8.66671 28.1489L8.24406 28.9627C8.05996 29.3171 7.65223 29.4386 7.33337 29.2339Z" style="fill: var(--data-weather-snow-primary-color)"/>
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
    'obi-lightning-light-sleet-showers-polartwilight-colour': ObiLightningLightSleetShowersPolartwilightColour;
  }
}
