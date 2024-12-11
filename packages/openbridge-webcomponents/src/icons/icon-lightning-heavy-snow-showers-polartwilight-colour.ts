import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-lightning-heavy-snow-showers-polartwilight-colour')
export class ObiLightningHeavySnowShowersPolartwilightColour extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="32" height="32" viewBox="0 0 32 32" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M2.66663 5.33341C2.66663 4.96522 2.9651 4.66675 3.33329 4.66675H18C18.3681 4.66675 18.6666 4.96522 18.6666 5.33341C18.6666 5.7016 18.3681 6.00008 18 6.00008H3.33329C2.9651 6.00008 2.66663 5.7016 2.66663 5.33341Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M14.8772 6H6.45618C6.45618 8.20914 8.34129 10 10.6667 10C12.9921 10 14.8772 8.20914 14.8772 6Z" fill="currentColor"/>
<path d="M4.70947 6.37584C4.82815 6.27615 4.88749 6.13808 4.88749 6H6.4561C6.4561 8.20914 8.34122 10 10.6666 10C12.992 10 14.8772 8.20914 14.8772 6H16.4458C16.4458 6.13808 16.5051 6.27615 16.6238 6.37584L18.4879 7.94157C18.5118 7.96166 18.5332 7.98296 18.5521 8.00522C15.9532 7.90023 14.0032 9.30621 12.8272 10.4944C12.6503 10.6732 12.4855 10.8521 12.333 11.0276C11.5414 10.5915 10.3817 10.2551 9.10553 10.8932C8.88879 11.0016 8.6957 11.1236 8.52378 11.2558C8.49911 11.2652 8.47483 11.2766 8.45116 11.29L6.31455 12.4978C5.91882 12.7215 5.4344 12.3857 5.53509 11.9575L6.0787 9.64523C6.14792 9.35081 5.93051 9.06528 5.61567 9.03712L3.14308 8.81593C2.68513 8.77496 2.50009 8.23157 2.84536 7.94157L4.70947 6.37584Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M16.1633 19.4933L17.1792 13.3333L13.3334 21.1333L15.9093 22.3333L14.2404 29.3333L18.6667 20.6933L16.1633 19.4933Z" fill="currentColor"/>
<path d="M27.3333 17.3488C27.4497 15.8352 24 15.3488 24 15.3488C24 15.3488 24 10.4446 18.6666 10.0155C16.5282 9.84342 14.8895 11.1454 13.8692 12.3091C13.0854 13.2031 12.6666 14.0155 12.6666 14.0155C12.6666 14.0155 11.999 13.014 11.1362 12.6646C10.7796 12.5203 10.3898 12.4872 9.99996 12.6822C9.66663 12.8488 9.45829 13.0988 9.33329 13.3801C8.95829 14.2238 9.33329 15.3488 9.33329 15.3488H6.66663C5.33329 15.3488 4.66663 16.2442 4.66663 17.3488C4.66663 18.4534 5.56206 19.3488 6.66663 19.3488H12.7266L12.1374 20.5438C12.0137 20.7948 11.9729 21.0764 12.0175 21.3488H6.66662C4.45749 21.3488 2.66663 19.558 2.66663 17.3488C2.66663 16.4055 2.95372 15.3851 3.69549 14.5797C4.46207 13.7474 5.52695 13.3488 6.66663 13.3488H7.25983C7.43538 12.5011 7.91136 11.4904 9.10553 10.8933C10.3817 10.2552 11.5414 10.5915 12.333 11.0276C12.4855 10.8522 12.6503 10.6732 12.8272 10.4945C14.0443 9.26475 16.0905 7.80174 18.827 8.02193C22.242 8.29671 24.1524 10.0867 25.107 11.919C25.4389 12.556 25.645 13.1747 25.774 13.699C25.9743 13.7574 26.1852 13.8252 26.3986 13.9034C26.9122 14.0917 27.5831 14.3909 28.1495 14.8677C28.733 15.3588 29.4242 16.244 29.3274 17.5022C29.178 19.445 27.6727 21.3488 25.3333 21.3488H19.829L19.8533 21.3014C20.0173 20.9812 20.045 20.6084 19.9301 20.2675C19.8152 19.9266 19.5674 19.6466 19.243 19.4911L18.9461 19.3488H25.3333C26.4379 19.3488 27.2486 18.4501 27.3333 17.3488Z" fill="currentColor"/>
<path d="M9.33329 15.3487C9.33329 15.3487 8.66663 13.3487 9.99996 12.6821C11.3333 12.0154 12.6666 14.0154 12.6666 14.0154C12.6666 14.0154 14.8855 9.71116 18.6666 10.0154C24 10.4445 24 15.3487 24 15.3487C24 15.3487 27.4497 15.8351 27.3333 17.3487C27.2486 18.45 26.4379 19.3487 25.3333 19.3487H18.9461L17.6415 18.7234L18.4947 13.5503C18.6022 12.8983 18.2159 12.266 17.5868 12.0639C16.9577 11.8618 16.2754 12.1511 15.9832 12.7437L12.7266 19.3487H6.66663C5.56206 19.3487 4.66663 18.4533 4.66663 17.3487C4.66663 16.2442 5.33329 15.3487 6.66663 15.3487H9.33329Z" fill="currentColor"/>
<path d="M3.33337 27.2339C3.01451 27.0293 2.90526 26.576 3.08936 26.2216L3.51201 25.4078H2.66667C2.29848 25.4078 2 25.076 2 24.6667C2 24.2574 2.29848 23.9256 2.66667 23.9256H3.512L3.08936 23.1118C2.90526 22.7573 3.01451 22.3041 3.33337 22.0994C3.65223 21.8948 4.05996 22.0162 4.24406 22.3707L4.66671 23.1845L5.08936 22.3707C5.27345 22.0162 5.68118 21.8948 6.00004 22.0994C6.3189 22.3041 6.42815 22.7573 6.24406 23.1118L5.82141 23.9256H6.66667C7.03486 23.9256 7.33333 24.2574 7.33333 24.6667C7.33333 25.076 7.03486 25.4078 6.66667 25.4078H5.8214L6.24406 26.2216C6.42815 26.576 6.3189 27.0293 6.00004 27.2339C5.68118 27.4386 5.27345 27.3171 5.08936 26.9627L4.66671 26.1489L4.24406 26.9627C4.05996 27.3171 3.65223 27.4386 3.33337 27.2339Z" fill="currentColor"/>
<path d="M8.66671 30.5673C8.34784 30.3626 8.23859 29.9094 8.42269 29.5549L8.84534 28.7411H8C7.63181 28.7411 7.33333 28.4093 7.33333 28C7.33333 27.5907 7.63181 27.2589 8 27.2589H8.84533L8.42269 26.4451C8.23859 26.0906 8.34784 25.6374 8.66671 25.4327C8.98557 25.2281 9.39329 25.3495 9.57739 25.704L10 26.5178L10.4227 25.704C10.6068 25.3495 11.0145 25.2281 11.3334 25.4327C11.6522 25.6374 11.7615 26.0906 11.5774 26.4451L11.1547 27.2589H12C12.3682 27.2589 12.6667 27.5907 12.6667 28C12.6667 28.4093 12.3682 28.7411 12 28.7411H11.1547L11.5774 29.5549C11.7615 29.9094 11.6522 30.3626 11.3334 30.5673C11.0145 30.7719 10.6068 30.6505 10.4227 30.296L10 29.4822L9.57739 30.296C9.39329 30.6505 8.98557 30.7719 8.66671 30.5673Z" fill="currentColor"/>
<path d="M20 27.9006C19.6812 27.6959 19.5719 27.2427 19.756 26.8882L20.1787 26.0744H19.3333C18.9651 26.0744 18.6667 25.7426 18.6667 25.3333C18.6667 24.924 18.9651 24.5922 19.3333 24.5922H20.1787L19.756 23.7784C19.5719 23.424 19.6812 22.9707 20 22.7661C20.3189 22.5614 20.7266 22.6829 20.9107 23.0373L21.3334 23.8511L21.756 23.0373C21.9401 22.6829 22.3478 22.5614 22.6667 22.7661C22.9856 22.9707 23.0948 23.424 22.9107 23.7784L22.4881 24.5922H23.3333C23.7015 24.5922 24 24.924 24 25.3333C24 25.7426 23.7015 26.0744 23.3333 26.0744H22.4881L22.9107 26.8882C23.0948 27.2427 22.9856 27.6959 22.6667 27.9006C22.3478 28.1052 21.9401 27.9838 21.756 27.6293L21.3334 26.8155L20.9107 27.6293C20.7266 27.9838 20.3189 28.1052 20 27.9006Z" fill="currentColor"/>
<path d="M26.6667 30.5673C26.3478 30.3626 26.2386 29.9094 26.4227 29.5549L26.8453 28.7411H26C25.6318 28.7411 25.3333 28.4093 25.3333 28C25.3333 27.5907 25.6318 27.2589 26 27.2589H26.8453L26.4227 26.4451C26.2386 26.0906 26.3478 25.6374 26.6667 25.4327C26.9856 25.2281 27.3933 25.3495 27.5774 25.704L28 26.5178L28.4227 25.704C28.6068 25.3495 29.0145 25.2281 29.3334 25.4327C29.6522 25.6374 29.7615 26.0906 29.5774 26.4451L29.1547 27.2589H30C30.3682 27.2589 30.6667 27.5907 30.6667 28C30.6667 28.4093 30.3682 28.7411 30 28.7411H29.1547L29.5774 29.5549C29.7615 29.9094 29.6522 30.3626 29.3334 30.5673C29.0145 30.7719 28.6068 30.6505 28.4227 30.296L28 29.4822L27.5774 30.296C27.3933 30.6505 26.9856 30.7719 26.6667 30.5673Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M2.66663 5.33341C2.66663 4.96522 2.9651 4.66675 3.33329 4.66675H18C18.3681 4.66675 18.6666 4.96522 18.6666 5.33341C18.6666 5.7016 18.3681 6.00008 18 6.00008H3.33329C2.9651 6.00008 2.66663 5.7016 2.66663 5.33341Z" style="fill: var(--data-weather-cloud-heavy-secondary-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M14.8772 6H6.45618C6.45618 8.20914 8.34129 10 10.6667 10C12.9921 10 14.8772 8.20914 14.8772 6Z" style="fill: var(--data-weather-sun-secondary-color)"/>
<path d="M4.70947 6.37584C4.82815 6.27615 4.88749 6.13808 4.88749 6H6.4561C6.4561 8.20914 8.34122 10 10.6666 10C12.992 10 14.8772 8.20914 14.8772 6H16.4458C16.4458 6.13808 16.5051 6.27615 16.6238 6.37584L18.4879 7.94157C18.5118 7.96166 18.5332 7.98296 18.5521 8.00522C15.9532 7.90023 14.0032 9.30621 12.8272 10.4944C12.6503 10.6732 12.4855 10.8521 12.333 11.0276C11.5414 10.5915 10.3817 10.2551 9.10553 10.8932C8.88879 11.0016 8.6957 11.1236 8.52378 11.2558C8.49911 11.2652 8.47483 11.2766 8.45116 11.29L6.31455 12.4978C5.91882 12.7215 5.4344 12.3857 5.53509 11.9575L6.0787 9.64523C6.14792 9.35081 5.93051 9.06528 5.61567 9.03712L3.14308 8.81593C2.68513 8.77496 2.50009 8.23157 2.84536 7.94157L4.70947 6.37584Z" style="fill: var(--data-weather-lightning-primary-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M16.1633 19.4933L17.1792 13.3333L13.3334 21.1333L15.9093 22.3333L14.2404 29.3333L18.6667 20.6933L16.1633 19.4933Z" style="fill: var(--data-weather-lightning-primary-color)"/>
<path d="M27.3333 17.3488C27.4497 15.8352 24 15.3488 24 15.3488C24 15.3488 24 10.4446 18.6666 10.0155C16.5282 9.84342 14.8895 11.1454 13.8692 12.3091C13.0854 13.2031 12.6666 14.0155 12.6666 14.0155C12.6666 14.0155 11.999 13.014 11.1362 12.6646C10.7796 12.5203 10.3898 12.4872 9.99996 12.6822C9.66663 12.8488 9.45829 13.0988 9.33329 13.3801C8.95829 14.2238 9.33329 15.3488 9.33329 15.3488H6.66663C5.33329 15.3488 4.66663 16.2442 4.66663 17.3488C4.66663 18.4534 5.56206 19.3488 6.66663 19.3488H12.7266L12.1374 20.5438C12.0137 20.7948 11.9729 21.0764 12.0175 21.3488H6.66662C4.45749 21.3488 2.66663 19.558 2.66663 17.3488C2.66663 16.4055 2.95372 15.3851 3.69549 14.5797C4.46207 13.7474 5.52695 13.3488 6.66663 13.3488H7.25983C7.43538 12.5011 7.91136 11.4904 9.10553 10.8933C10.3817 10.2552 11.5414 10.5915 12.333 11.0276C12.4855 10.8522 12.6503 10.6732 12.8272 10.4945C14.0443 9.26475 16.0905 7.80174 18.827 8.02193C22.242 8.29671 24.1524 10.0867 25.107 11.919C25.4389 12.556 25.645 13.1747 25.774 13.699C25.9743 13.7574 26.1852 13.8252 26.3986 13.9034C26.9122 14.0917 27.5831 14.3909 28.1495 14.8677C28.733 15.3588 29.4242 16.244 29.3274 17.5022C29.178 19.445 27.6727 21.3488 25.3333 21.3488H19.829L19.8533 21.3014C20.0173 20.9812 20.045 20.6084 19.9301 20.2675C19.8152 19.9266 19.5674 19.6466 19.243 19.4911L18.9461 19.3488H25.3333C26.4379 19.3488 27.2486 18.4501 27.3333 17.3488Z" style="fill: var(--data-weather-cloud-heavy-secondary-color)"/>
<path d="M9.33329 15.3487C9.33329 15.3487 8.66663 13.3487 9.99996 12.6821C11.3333 12.0154 12.6666 14.0154 12.6666 14.0154C12.6666 14.0154 14.8855 9.71116 18.6666 10.0154C24 10.4445 24 15.3487 24 15.3487C24 15.3487 27.4497 15.8351 27.3333 17.3487C27.2486 18.45 26.4379 19.3487 25.3333 19.3487H18.9461L17.6415 18.7234L18.4947 13.5503C18.6022 12.8983 18.2159 12.266 17.5868 12.0639C16.9577 11.8618 16.2754 12.1511 15.9832 12.7437L12.7266 19.3487H6.66663C5.56206 19.3487 4.66663 18.4533 4.66663 17.3487C4.66663 16.2442 5.33329 15.3487 6.66663 15.3487H9.33329Z" style="fill: var(--data-weather-cloud-heavy-secondary-color)"/>
<path d="M3.33337 27.2339C3.01451 27.0293 2.90526 26.576 3.08936 26.2216L3.51201 25.4078H2.66667C2.29848 25.4078 2 25.076 2 24.6667C2 24.2574 2.29848 23.9256 2.66667 23.9256H3.512L3.08936 23.1118C2.90526 22.7573 3.01451 22.3041 3.33337 22.0994C3.65223 21.8948 4.05996 22.0162 4.24406 22.3707L4.66671 23.1845L5.08936 22.3707C5.27345 22.0162 5.68118 21.8948 6.00004 22.0994C6.3189 22.3041 6.42815 22.7573 6.24406 23.1118L5.82141 23.9256H6.66667C7.03486 23.9256 7.33333 24.2574 7.33333 24.6667C7.33333 25.076 7.03486 25.4078 6.66667 25.4078H5.8214L6.24406 26.2216C6.42815 26.576 6.3189 27.0293 6.00004 27.2339C5.68118 27.4386 5.27345 27.3171 5.08936 26.9627L4.66671 26.1489L4.24406 26.9627C4.05996 27.3171 3.65223 27.4386 3.33337 27.2339Z" style="fill: var(--data-weather-snow-primary-color)"/>
<path d="M8.66671 30.5673C8.34784 30.3626 8.23859 29.9094 8.42269 29.5549L8.84534 28.7411H8C7.63181 28.7411 7.33333 28.4093 7.33333 28C7.33333 27.5907 7.63181 27.2589 8 27.2589H8.84533L8.42269 26.4451C8.23859 26.0906 8.34784 25.6374 8.66671 25.4327C8.98557 25.2281 9.39329 25.3495 9.57739 25.704L10 26.5178L10.4227 25.704C10.6068 25.3495 11.0145 25.2281 11.3334 25.4327C11.6522 25.6374 11.7615 26.0906 11.5774 26.4451L11.1547 27.2589H12C12.3682 27.2589 12.6667 27.5907 12.6667 28C12.6667 28.4093 12.3682 28.7411 12 28.7411H11.1547L11.5774 29.5549C11.7615 29.9094 11.6522 30.3626 11.3334 30.5673C11.0145 30.7719 10.6068 30.6505 10.4227 30.296L10 29.4822L9.57739 30.296C9.39329 30.6505 8.98557 30.7719 8.66671 30.5673Z" style="fill: var(--data-weather-snow-primary-color)"/>
<path d="M20 27.9006C19.6812 27.6959 19.5719 27.2427 19.756 26.8882L20.1787 26.0744H19.3333C18.9651 26.0744 18.6667 25.7426 18.6667 25.3333C18.6667 24.924 18.9651 24.5922 19.3333 24.5922H20.1787L19.756 23.7784C19.5719 23.424 19.6812 22.9707 20 22.7661C20.3189 22.5614 20.7266 22.6829 20.9107 23.0373L21.3334 23.8511L21.756 23.0373C21.9401 22.6829 22.3478 22.5614 22.6667 22.7661C22.9856 22.9707 23.0948 23.424 22.9107 23.7784L22.4881 24.5922H23.3333C23.7015 24.5922 24 24.924 24 25.3333C24 25.7426 23.7015 26.0744 23.3333 26.0744H22.4881L22.9107 26.8882C23.0948 27.2427 22.9856 27.6959 22.6667 27.9006C22.3478 28.1052 21.9401 27.9838 21.756 27.6293L21.3334 26.8155L20.9107 27.6293C20.7266 27.9838 20.3189 28.1052 20 27.9006Z" style="fill: var(--data-weather-snow-primary-color)"/>
<path d="M26.6667 30.5673C26.3478 30.3626 26.2386 29.9094 26.4227 29.5549L26.8453 28.7411H26C25.6318 28.7411 25.3333 28.4093 25.3333 28C25.3333 27.5907 25.6318 27.2589 26 27.2589H26.8453L26.4227 26.4451C26.2386 26.0906 26.3478 25.6374 26.6667 25.4327C26.9856 25.2281 27.3933 25.3495 27.5774 25.704L28 26.5178L28.4227 25.704C28.6068 25.3495 29.0145 25.2281 29.3334 25.4327C29.6522 25.6374 29.7615 26.0906 29.5774 26.4451L29.1547 27.2589H30C30.3682 27.2589 30.6667 27.5907 30.6667 28C30.6667 28.4093 30.3682 28.7411 30 28.7411H29.1547L29.5774 29.5549C29.7615 29.9094 29.6522 30.3626 29.3334 30.5673C29.0145 30.7719 28.6068 30.6505 28.4227 30.296L28 29.4822L27.5774 30.296C27.3933 30.6505 26.9856 30.7719 26.6667 30.5673Z" style="fill: var(--data-weather-snow-primary-color)"/>
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
    'obi-lightning-heavy-snow-showers-polartwilight-colour': ObiLightningHeavySnowShowersPolartwilightColour;
  }
}
