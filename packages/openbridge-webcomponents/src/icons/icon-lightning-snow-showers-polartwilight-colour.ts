import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-lightning-snow-showers-polartwilight-colour')
export class ObiLightningSnowShowersPolartwilightColour extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="32" height="32" viewBox="0 0 32 32" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M2.66663 5.33341C2.66663 4.96522 2.9651 4.66675 3.33329 4.66675H18C18.3681 4.66675 18.6666 4.96522 18.6666 5.33341C18.6666 5.7016 18.3681 6.00008 18 6.00008H3.33329C2.9651 6.00008 2.66663 5.7016 2.66663 5.33341Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M14.8772 6H6.45618C6.45618 8.20914 8.34129 10 10.6667 10C12.9921 10 14.8772 8.20914 14.8772 6Z" fill="currentColor"/>
<path d="M4.70947 6.37584C4.82815 6.27615 4.88749 6.13808 4.88749 6H6.4561C6.4561 8.20914 8.34122 10 10.6666 10C12.992 10 14.8772 8.20914 14.8772 6H16.4458C16.4458 6.13808 16.5051 6.27615 16.6238 6.37584L18.4879 7.94157C18.5118 7.96166 18.5332 7.98296 18.5521 8.00522C15.9532 7.90023 14.0032 9.30621 12.8272 10.4944C12.6503 10.6732 12.4855 10.8521 12.333 11.0276C11.5414 10.5915 10.3817 10.2551 9.10553 10.8932C8.88879 11.0016 8.6957 11.1236 8.52378 11.2558C8.49911 11.2652 8.47483 11.2766 8.45116 11.29L6.31455 12.4978C5.91882 12.7215 5.4344 12.3857 5.53509 11.9575L6.0787 9.64523C6.14792 9.35081 5.93051 9.06528 5.61567 9.03712L3.14308 8.81593C2.68513 8.77496 2.50009 8.23157 2.84536 7.94157L4.70947 6.37584Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M16.1633 19.4933L17.1792 13.3333L13.3334 21.1333L15.9093 22.3333L14.2404 29.3333L18.6667 20.6933L16.1633 19.4933Z" fill="currentColor"/>
<path d="M27.3333 17.3488C27.4497 15.8352 24 15.3488 24 15.3488C24 15.3488 24 10.4446 18.6666 10.0155C16.5282 9.84342 14.8895 11.1454 13.8692 12.3091C13.0854 13.2031 12.6666 14.0155 12.6666 14.0155C12.6666 14.0155 11.999 13.014 11.1362 12.6646C10.7796 12.5203 10.3898 12.4872 9.99996 12.6822C9.66663 12.8488 9.45829 13.0988 9.33329 13.3801C8.95829 14.2238 9.33329 15.3488 9.33329 15.3488H6.66663C5.33329 15.3488 4.66663 16.2442 4.66663 17.3488C4.66663 18.4534 5.56206 19.3488 6.66663 19.3488H12.7266L12.1374 20.5438C12.0137 20.7948 11.9729 21.0764 12.0175 21.3488H6.66662C4.45749 21.3488 2.66663 19.558 2.66663 17.3488C2.66663 16.4055 2.95372 15.3851 3.69549 14.5797C4.46207 13.7474 5.52695 13.3488 6.66663 13.3488H7.25983C7.43538 12.5011 7.91136 11.4904 9.10553 10.8933C10.3817 10.2552 11.5414 10.5915 12.333 11.0276C12.4855 10.8522 12.6503 10.6732 12.8272 10.4945C14.0443 9.26475 16.0905 7.80174 18.827 8.02193C22.242 8.29671 24.1524 10.0867 25.107 11.919C25.4389 12.556 25.645 13.1747 25.774 13.699C25.9743 13.7574 26.1852 13.8252 26.3986 13.9034C26.9122 14.0917 27.5831 14.3909 28.1495 14.8677C28.733 15.3588 29.4242 16.244 29.3274 17.5022C29.178 19.445 27.6727 21.3488 25.3333 21.3488H19.829L19.8533 21.3014C20.0173 20.9812 20.045 20.6084 19.9301 20.2675C19.8152 19.9266 19.5674 19.6466 19.243 19.4911L18.9461 19.3488H25.3333C26.4379 19.3488 27.2486 18.4501 27.3333 17.3488Z" fill="currentColor"/>
<path d="M9.33329 15.3487C9.33329 15.3487 8.66663 13.3487 9.99996 12.6821C11.3333 12.0154 12.6666 14.0154 12.6666 14.0154C12.6666 14.0154 14.8855 9.71116 18.6666 10.0154C24 10.4445 24 15.3487 24 15.3487C24 15.3487 27.4497 15.8351 27.3333 17.3487C27.2486 18.45 26.4379 19.3487 25.3333 19.3487H18.9461L17.6415 18.7234L18.4947 13.5503C18.6022 12.8983 18.2159 12.266 17.5868 12.0639C16.9577 11.8618 16.2754 12.1511 15.9832 12.7437L12.7266 19.3487H6.66663C5.56206 19.3487 4.66663 18.4533 4.66663 17.3487C4.66663 16.2442 5.33329 15.3487 6.66663 15.3487H9.33329Z" fill="currentColor"/>
<path d="M8 29.234C7.68114 29.0294 7.57189 28.5761 7.75598 28.2216L8.17863 27.4078H7.33329C6.9651 27.4078 6.66663 27.076 6.66663 26.6667C6.66663 26.2574 6.9651 25.9256 7.33329 25.9256H8.17863L7.75598 25.1119C7.57189 24.7574 7.68114 24.3041 8 24.0995C8.31886 23.8948 8.72659 24.0163 8.91068 24.3708L9.33333 25.1845L9.75598 24.3708C9.94008 24.0163 10.3478 23.8948 10.6667 24.0995C10.9855 24.3041 11.0948 24.7574 10.9107 25.1119L10.488 25.9256H11.3333C11.7015 25.9256 12 26.2574 12 26.6667C12 27.076 11.7015 27.4078 11.3333 27.4078H10.488L10.9107 28.2216C11.0948 28.5761 10.9855 29.0294 10.6667 29.234C10.3478 29.4387 9.94008 29.3172 9.75598 28.9627L9.33333 28.149L8.91068 28.9627C8.72659 29.3172 8.31886 29.4387 8 29.234Z" fill="currentColor"/>
<path d="M19.3333 29.9007C19.0145 29.696 18.9052 29.2428 19.0893 28.8883L19.512 28.0745H18.6666C18.2984 28.0745 18 27.7427 18 27.3334C18 26.9241 18.2984 26.5923 18.6666 26.5923H19.512L19.0893 25.7785C18.9052 25.4241 19.0145 24.9708 19.3333 24.7662C19.6522 24.5615 20.0599 24.683 20.244 25.0374L20.6667 25.8512L21.0893 25.0374C21.2734 24.683 21.6811 24.5615 22 24.7662C22.3189 24.9708 22.4281 25.4241 22.244 25.7785L21.8214 26.5923H22.6666C23.0348 26.5923 23.3333 26.9241 23.3333 27.3334C23.3333 27.7427 23.0348 28.0745 22.6666 28.0745H21.8214L22.244 28.8883C22.4281 29.2428 22.3189 29.696 22 29.9007C21.6811 30.1053 21.2734 29.9839 21.0893 29.6294L20.6667 28.8156L20.244 29.6294C20.0599 29.9839 19.6522 30.1053 19.3333 29.9007Z" fill="currentColor"/>
<path d="M26 27.9007C25.6811 27.696 25.5719 27.2428 25.756 26.8883L26.1786 26.0745H25.3333C24.9651 26.0745 24.6666 25.7427 24.6666 25.3334C24.6666 24.9241 24.9651 24.5923 25.3333 24.5923H26.1786L25.756 23.7785C25.5719 23.4241 25.6811 22.9708 26 22.7662C26.3189 22.5615 26.7266 22.683 26.9107 23.0374L27.3333 23.8512L27.756 23.0374C27.9401 22.683 28.3478 22.5615 28.6667 22.7662C28.9855 22.9708 29.0948 23.4241 28.9107 23.7785L28.488 24.5923H29.3333C29.7015 24.5923 30 24.9241 30 25.3334C30 25.7427 29.7015 26.0745 29.3333 26.0745H28.488L28.9107 26.8883C29.0948 27.2428 28.9855 27.696 28.6667 27.9007C28.3478 28.1053 27.9401 27.9839 27.756 27.6294L27.3333 26.8156L26.9107 27.6294C26.7266 27.9839 26.3189 28.1053 26 27.9007Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M2.66663 5.33341C2.66663 4.96522 2.9651 4.66675 3.33329 4.66675H18C18.3681 4.66675 18.6666 4.96522 18.6666 5.33341C18.6666 5.7016 18.3681 6.00008 18 6.00008H3.33329C2.9651 6.00008 2.66663 5.7016 2.66663 5.33341Z" style="fill: var(--data-weather-cloud-rain-primary-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M14.8772 6H6.45618C6.45618 8.20914 8.34129 10 10.6667 10C12.9921 10 14.8772 8.20914 14.8772 6Z" style="fill: var(--data-weather-sun-secondary-color)"/>
<path d="M4.70947 6.37584C4.82815 6.27615 4.88749 6.13808 4.88749 6H6.4561C6.4561 8.20914 8.34122 10 10.6666 10C12.992 10 14.8772 8.20914 14.8772 6H16.4458C16.4458 6.13808 16.5051 6.27615 16.6238 6.37584L18.4879 7.94157C18.5118 7.96166 18.5332 7.98296 18.5521 8.00522C15.9532 7.90023 14.0032 9.30621 12.8272 10.4944C12.6503 10.6732 12.4855 10.8521 12.333 11.0276C11.5414 10.5915 10.3817 10.2551 9.10553 10.8932C8.88879 11.0016 8.6957 11.1236 8.52378 11.2558C8.49911 11.2652 8.47483 11.2766 8.45116 11.29L6.31455 12.4978C5.91882 12.7215 5.4344 12.3857 5.53509 11.9575L6.0787 9.64523C6.14792 9.35081 5.93051 9.06528 5.61567 9.03712L3.14308 8.81593C2.68513 8.77496 2.50009 8.23157 2.84536 7.94157L4.70947 6.37584Z" style="fill: var(--data-weather-lightning-primary-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M16.1633 19.4933L17.1792 13.3333L13.3334 21.1333L15.9093 22.3333L14.2404 29.3333L18.6667 20.6933L16.1633 19.4933Z" style="fill: var(--data-weather-lightning-primary-color)"/>
<path d="M27.3333 17.3488C27.4497 15.8352 24 15.3488 24 15.3488C24 15.3488 24 10.4446 18.6666 10.0155C16.5282 9.84342 14.8895 11.1454 13.8692 12.3091C13.0854 13.2031 12.6666 14.0155 12.6666 14.0155C12.6666 14.0155 11.999 13.014 11.1362 12.6646C10.7796 12.5203 10.3898 12.4872 9.99996 12.6822C9.66663 12.8488 9.45829 13.0988 9.33329 13.3801C8.95829 14.2238 9.33329 15.3488 9.33329 15.3488H6.66663C5.33329 15.3488 4.66663 16.2442 4.66663 17.3488C4.66663 18.4534 5.56206 19.3488 6.66663 19.3488H12.7266L12.1374 20.5438C12.0137 20.7948 11.9729 21.0764 12.0175 21.3488H6.66662C4.45749 21.3488 2.66663 19.558 2.66663 17.3488C2.66663 16.4055 2.95372 15.3851 3.69549 14.5797C4.46207 13.7474 5.52695 13.3488 6.66663 13.3488H7.25983C7.43538 12.5011 7.91136 11.4904 9.10553 10.8933C10.3817 10.2552 11.5414 10.5915 12.333 11.0276C12.4855 10.8522 12.6503 10.6732 12.8272 10.4945C14.0443 9.26475 16.0905 7.80174 18.827 8.02193C22.242 8.29671 24.1524 10.0867 25.107 11.919C25.4389 12.556 25.645 13.1747 25.774 13.699C25.9743 13.7574 26.1852 13.8252 26.3986 13.9034C26.9122 14.0917 27.5831 14.3909 28.1495 14.8677C28.733 15.3588 29.4242 16.244 29.3274 17.5022C29.178 19.445 27.6727 21.3488 25.3333 21.3488H19.829L19.8533 21.3014C20.0173 20.9812 20.045 20.6084 19.9301 20.2675C19.8152 19.9266 19.5674 19.6466 19.243 19.4911L18.9461 19.3488H25.3333C26.4379 19.3488 27.2486 18.4501 27.3333 17.3488Z" style="fill: var(--data-weather-cloud-rain-primary-color)"/>
<path d="M9.33329 15.3487C9.33329 15.3487 8.66663 13.3487 9.99996 12.6821C11.3333 12.0154 12.6666 14.0154 12.6666 14.0154C12.6666 14.0154 14.8855 9.71116 18.6666 10.0154C24 10.4445 24 15.3487 24 15.3487C24 15.3487 27.4497 15.8351 27.3333 17.3487C27.2486 18.45 26.4379 19.3487 25.3333 19.3487H18.9461L17.6415 18.7234L18.4947 13.5503C18.6022 12.8983 18.2159 12.266 17.5868 12.0639C16.9577 11.8618 16.2754 12.1511 15.9832 12.7437L12.7266 19.3487H6.66663C5.56206 19.3487 4.66663 18.4533 4.66663 17.3487C4.66663 16.2442 5.33329 15.3487 6.66663 15.3487H9.33329Z" style="fill: var(--data-weather-cloud-rain-secondary-color)"/>
<path d="M8 29.234C7.68114 29.0294 7.57189 28.5761 7.75598 28.2216L8.17863 27.4078H7.33329C6.9651 27.4078 6.66663 27.076 6.66663 26.6667C6.66663 26.2574 6.9651 25.9256 7.33329 25.9256H8.17863L7.75598 25.1119C7.57189 24.7574 7.68114 24.3041 8 24.0995C8.31886 23.8948 8.72659 24.0163 8.91068 24.3708L9.33333 25.1845L9.75598 24.3708C9.94008 24.0163 10.3478 23.8948 10.6667 24.0995C10.9855 24.3041 11.0948 24.7574 10.9107 25.1119L10.488 25.9256H11.3333C11.7015 25.9256 12 26.2574 12 26.6667C12 27.076 11.7015 27.4078 11.3333 27.4078H10.488L10.9107 28.2216C11.0948 28.5761 10.9855 29.0294 10.6667 29.234C10.3478 29.4387 9.94008 29.3172 9.75598 28.9627L9.33333 28.149L8.91068 28.9627C8.72659 29.3172 8.31886 29.4387 8 29.234Z" style="fill: var(--data-weather-snow-primary-color)"/>
<path d="M19.3333 29.9007C19.0145 29.696 18.9052 29.2428 19.0893 28.8883L19.512 28.0745H18.6666C18.2984 28.0745 18 27.7427 18 27.3334C18 26.9241 18.2984 26.5923 18.6666 26.5923H19.512L19.0893 25.7785C18.9052 25.4241 19.0145 24.9708 19.3333 24.7662C19.6522 24.5615 20.0599 24.683 20.244 25.0374L20.6667 25.8512L21.0893 25.0374C21.2734 24.683 21.6811 24.5615 22 24.7662C22.3189 24.9708 22.4281 25.4241 22.244 25.7785L21.8214 26.5923H22.6666C23.0348 26.5923 23.3333 26.9241 23.3333 27.3334C23.3333 27.7427 23.0348 28.0745 22.6666 28.0745H21.8214L22.244 28.8883C22.4281 29.2428 22.3189 29.696 22 29.9007C21.6811 30.1053 21.2734 29.9839 21.0893 29.6294L20.6667 28.8156L20.244 29.6294C20.0599 29.9839 19.6522 30.1053 19.3333 29.9007Z" style="fill: var(--data-weather-snow-primary-color)"/>
<path d="M26 27.9007C25.6811 27.696 25.5719 27.2428 25.756 26.8883L26.1786 26.0745H25.3333C24.9651 26.0745 24.6666 25.7427 24.6666 25.3334C24.6666 24.9241 24.9651 24.5923 25.3333 24.5923H26.1786L25.756 23.7785C25.5719 23.4241 25.6811 22.9708 26 22.7662C26.3189 22.5615 26.7266 22.683 26.9107 23.0374L27.3333 23.8512L27.756 23.0374C27.9401 22.683 28.3478 22.5615 28.6667 22.7662C28.9855 22.9708 29.0948 23.4241 28.9107 23.7785L28.488 24.5923H29.3333C29.7015 24.5923 30 24.9241 30 25.3334C30 25.7427 29.7015 26.0745 29.3333 26.0745H28.488L28.9107 26.8883C29.0948 27.2428 28.9855 27.696 28.6667 27.9007C28.3478 28.1053 27.9401 27.9839 27.756 27.6294L27.3333 26.8156L26.9107 27.6294C26.7266 27.9839 26.3189 28.1053 26 27.9007Z" style="fill: var(--data-weather-snow-primary-color)"/>
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
    'obi-lightning-snow-showers-polartwilight-colour': ObiLightningSnowShowersPolartwilightColour;
  }
}
