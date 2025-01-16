import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-heavy-snow-showers-polartwilight-colour')
export class ObiHeavySnowShowersPolartwilightColour extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="32" height="32" viewBox="0 0 32 32" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M24.0001 15.3488C24.0001 15.3488 27.4498 15.8352 27.3334 17.3488C27.2487 18.4501 26.438 19.3488 25.3334 19.3488H6.66675C5.56218 19.3488 4.66675 18.4534 4.66675 17.3488C4.66675 16.2442 5.33341 15.3488 6.66675 15.3488H9.33342C9.33342 15.3488 8.95842 14.2238 9.33342 13.3801C9.45842 13.0988 9.66675 12.8488 10.0001 12.6822C10.3899 12.4872 10.7798 12.5203 11.1363 12.6646C11.9991 13.014 12.6667 14.0155 12.6667 14.0155C12.6667 14.0155 13.0855 13.2031 13.8693 12.3091C14.8896 11.1454 16.5283 9.84342 18.6667 10.0155C24.0001 10.4446 24.0001 15.3488 24.0001 15.3488ZM12.3331 11.0276C12.4856 10.8522 12.6504 10.6732 12.8273 10.4945C14.0444 9.26475 16.0906 7.80174 18.8272 8.02193C22.2422 8.29671 24.1526 10.0867 25.1072 11.919C25.439 12.556 25.6452 13.1747 25.7742 13.699C25.9744 13.7574 26.1853 13.8252 26.3987 13.9034C26.9123 14.0917 27.5833 14.3909 28.1496 14.8677C28.7332 15.3588 29.4243 16.244 29.3275 17.5022C29.1781 19.445 27.6728 21.3488 25.3334 21.3488H6.66675C4.45761 21.3488 2.66675 19.558 2.66675 17.3488C2.66675 16.4055 2.95384 15.3851 3.69561 14.5797C4.46219 13.7474 5.52707 13.3488 6.66675 13.3488H7.25995C7.4355 12.5011 7.91148 11.4904 9.10565 10.8933C10.3818 10.2552 11.5415 10.5915 12.3331 11.0276Z" fill="currentColor"/>
<path d="M10.0001 12.6821C8.66675 13.3487 9.33342 15.3487 9.33342 15.3487H6.66675C5.33341 15.3487 4.66675 16.2442 4.66675 17.3487C4.66675 18.4533 5.56218 19.3487 6.66675 19.3487H25.3334C26.438 19.3487 27.2487 18.45 27.3334 17.3487C27.4498 15.8351 24.0001 15.3487 24.0001 15.3487C24.0001 15.3487 24.0001 10.4445 18.6667 10.0154C14.8856 9.71116 12.6667 14.0154 12.6667 14.0154C12.6667 14.0154 11.3334 12.0154 10.0001 12.6821Z" fill="currentColor"/>
<path d="M2.66675 5.33341C2.66675 4.96522 2.96522 4.66675 3.33341 4.66675H18.0001C18.3683 4.66675 18.6667 4.96522 18.6667 5.33341C18.6667 5.7016 18.3683 6.00008 18.0001 6.00008H3.33342C2.96523 6.00008 2.66675 5.7016 2.66675 5.33341Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M14.8771 6H6.45605C6.45605 8.20914 8.34117 10 10.6666 10C12.992 10 14.8771 8.20914 14.8771 6Z" fill="currentColor"/>
<path d="M4.70959 6.37584C4.82827 6.27615 4.88761 6.13808 4.88761 6H6.45622C6.45622 8.20914 8.34134 10 10.6667 10C12.9922 10 14.8773 8.20914 14.8773 6H16.4459C16.4459 6.13808 16.5052 6.27615 16.6239 6.37584L18.488 7.94157C18.5119 7.96166 18.5333 7.98296 18.5522 8.00522C15.9533 7.90023 14.0033 9.30621 12.8273 10.4944C12.6504 10.6732 12.4856 10.8521 12.3331 11.0276C11.5415 10.5915 10.3818 10.2551 9.10565 10.8932C8.88891 11.0016 8.69583 11.1236 8.5239 11.2558C8.49923 11.2652 8.47495 11.2766 8.45129 11.29L6.31467 12.4978C5.91894 12.7215 5.43452 12.3857 5.53521 11.9575L6.07882 9.64523C6.14804 9.35081 5.93064 9.06528 5.61579 9.03712L3.14321 8.81593C2.68525 8.77496 2.50022 8.23157 2.84548 7.94157L4.70959 6.37584Z" fill="currentColor"/>
<path d="M2.66662 27.9007C2.34776 27.696 2.23851 27.2428 2.42261 26.8883L2.84526 26.0745H1.99992C1.63173 26.0745 1.33325 25.7427 1.33325 25.3334C1.33325 24.9241 1.63173 24.5923 1.99992 24.5923H2.84525L2.42261 23.7785C2.23851 23.4241 2.34776 22.9708 2.66662 22.7662C2.98549 22.5615 3.39321 22.683 3.57731 23.0374L3.99996 23.8512L4.42261 23.0374C4.6067 22.683 5.01443 22.5615 5.33329 22.7662C5.65215 22.9708 5.7614 23.4241 5.57731 23.7785L5.15466 24.5923H5.99992C6.36811 24.5923 6.66659 24.9241 6.66659 25.3334C6.66659 25.7427 6.36811 26.0745 5.99992 26.0745H5.15465L5.57731 26.8883C5.7614 27.2428 5.65215 27.696 5.33329 27.9007C5.01443 28.1053 4.6067 27.9839 4.42261 27.6294L3.99996 26.8156L3.57731 27.6294C3.39321 27.9839 2.98549 28.1053 2.66662 27.9007Z" fill="currentColor"/>
<path d="M15.3333 27.9007C15.0144 27.696 14.9052 27.2428 15.0893 26.8883L15.5119 26.0745H14.6666C14.2984 26.0745 13.9999 25.7427 13.9999 25.3334C13.9999 24.9241 14.2984 24.5923 14.6666 24.5923H15.5119L15.0893 23.7785C14.9052 23.4241 15.0144 22.9708 15.3333 22.7662C15.6522 22.5615 16.0599 22.683 16.244 23.0374L16.6666 23.8512L17.0893 23.0374C17.2734 22.683 17.6811 22.5615 18 22.7662C18.3188 22.9708 18.4281 23.4241 18.244 23.7785L17.8213 24.5923H18.6666C19.0348 24.5923 19.3333 24.9241 19.3333 25.3334C19.3333 25.7427 19.0348 26.0745 18.6666 26.0745H17.8213L18.244 26.8883C18.4281 27.2428 18.3188 27.696 18 27.9007C17.6811 28.1053 17.2734 27.9839 17.0893 27.6294L16.6666 26.8156L16.244 27.6294C16.0599 27.9839 15.6522 28.1053 15.3333 27.9007Z" fill="currentColor"/>
<path d="M26.6666 27.9007C26.3478 27.696 26.2385 27.2428 26.4226 26.8883L26.8453 26.0745H25.9999C25.6317 26.0745 25.3333 25.7427 25.3333 25.3334C25.3333 24.9241 25.6317 24.5923 25.9999 24.5923H26.8453L26.4226 23.7785C26.2385 23.4241 26.3478 22.9708 26.6666 22.7662C26.9855 22.5615 27.3932 22.683 27.5773 23.0374L28 23.8512L28.4226 23.0374C28.6067 22.683 29.0144 22.5615 29.3333 22.7662C29.6522 22.9708 29.7614 23.4241 29.5773 23.7785L29.1547 24.5923H29.9999C30.3681 24.5923 30.6666 24.9241 30.6666 25.3334C30.6666 25.7427 30.3681 26.0745 29.9999 26.0745H29.1547L29.5773 26.8883C29.7614 27.2428 29.6522 27.696 29.3333 27.9007C29.0144 28.1053 28.6067 27.9839 28.4226 27.6294L28 26.8156L27.5773 27.6294C27.3932 27.9839 26.9855 28.1053 26.6666 27.9007Z" fill="currentColor"/>
<path d="M21.3333 30.5673C21.0144 30.3627 20.9052 29.9094 21.0893 29.555L21.5119 28.7412H20.6666C20.2984 28.7412 19.9999 28.4094 19.9999 28.0001C19.9999 27.5908 20.2984 27.259 20.6666 27.259H21.5119L21.0893 26.4452C20.9052 26.0907 21.0144 25.6375 21.3333 25.4328C21.6522 25.2282 22.0599 25.3496 22.244 25.7041L22.6666 26.5179L23.0893 25.7041C23.2734 25.3496 23.6811 25.2282 24 25.4328C24.3188 25.6375 24.4281 26.0907 24.244 26.4452L23.8213 27.259H24.6666C25.0348 27.259 25.3333 27.5908 25.3333 28.0001C25.3333 28.4094 25.0348 28.7412 24.6666 28.7412H23.8213L24.244 29.555C24.4281 29.9094 24.3188 30.3627 24 30.5673C23.6811 30.772 23.2734 30.6505 23.0893 30.2961L22.6666 29.4823L22.244 30.2961C22.0599 30.6505 21.6522 30.772 21.3333 30.5673Z" fill="currentColor"/>
<path d="M9.33329 30.5673C9.01443 30.3627 8.90518 29.9094 9.08927 29.555L9.51193 28.7412H8.66659C8.2984 28.7412 7.99992 28.4094 7.99992 28.0001C7.99992 27.5908 8.2984 27.259 8.66659 27.259H9.51192L9.08927 26.4452C8.90518 26.0907 9.01443 25.6375 9.33329 25.4328C9.65215 25.2282 10.0599 25.3496 10.244 25.7041L10.6666 26.5179L11.0893 25.7041C11.2734 25.3496 11.6811 25.2282 12 25.4328C12.3188 25.6375 12.4281 26.0907 12.244 26.4452L11.8213 27.259H12.6666C13.0348 27.259 13.3333 27.5908 13.3333 28.0001C13.3333 28.4094 13.0348 28.7412 12.6666 28.7412H11.8213L12.244 29.555C12.4281 29.9094 12.3188 30.3627 12 30.5673C11.6811 30.772 11.2734 30.6505 11.0893 30.2961L10.6666 29.4823L10.244 30.2961C10.0599 30.6505 9.65215 30.772 9.33329 30.5673Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M24.0001 15.3488C24.0001 15.3488 27.4498 15.8352 27.3334 17.3488C27.2487 18.4501 26.438 19.3488 25.3334 19.3488H6.66675C5.56218 19.3488 4.66675 18.4534 4.66675 17.3488C4.66675 16.2442 5.33341 15.3488 6.66675 15.3488H9.33342C9.33342 15.3488 8.95842 14.2238 9.33342 13.3801C9.45842 13.0988 9.66675 12.8488 10.0001 12.6822C10.3899 12.4872 10.7798 12.5203 11.1363 12.6646C11.9991 13.014 12.6667 14.0155 12.6667 14.0155C12.6667 14.0155 13.0855 13.2031 13.8693 12.3091C14.8896 11.1454 16.5283 9.84342 18.6667 10.0155C24.0001 10.4446 24.0001 15.3488 24.0001 15.3488ZM12.3331 11.0276C12.4856 10.8522 12.6504 10.6732 12.8273 10.4945C14.0444 9.26475 16.0906 7.80174 18.8272 8.02193C22.2422 8.29671 24.1526 10.0867 25.1072 11.919C25.439 12.556 25.6452 13.1747 25.7742 13.699C25.9744 13.7574 26.1853 13.8252 26.3987 13.9034C26.9123 14.0917 27.5833 14.3909 28.1496 14.8677C28.7332 15.3588 29.4243 16.244 29.3275 17.5022C29.1781 19.445 27.6728 21.3488 25.3334 21.3488H6.66675C4.45761 21.3488 2.66675 19.558 2.66675 17.3488C2.66675 16.4055 2.95384 15.3851 3.69561 14.5797C4.46219 13.7474 5.52707 13.3488 6.66675 13.3488H7.25995C7.4355 12.5011 7.91148 11.4904 9.10565 10.8933C10.3818 10.2552 11.5415 10.5915 12.3331 11.0276Z" style="fill: var(--instrument-tick-mark-secondary-color)"/>
<path d="M10.0001 12.6821C8.66675 13.3487 9.33342 15.3487 9.33342 15.3487H6.66675C5.33341 15.3487 4.66675 16.2442 4.66675 17.3487C4.66675 18.4533 5.56218 19.3487 6.66675 19.3487H25.3334C26.438 19.3487 27.2487 18.45 27.3334 17.3487C27.4498 15.8351 24.0001 15.3487 24.0001 15.3487C24.0001 15.3487 24.0001 10.4445 18.6667 10.0154C14.8856 9.71116 12.6667 14.0154 12.6667 14.0154C12.6667 14.0154 11.3334 12.0154 10.0001 12.6821Z" style="fill: var(--instrument-tick-mark-secondary-color)"/>
<path d="M2.66675 5.33341C2.66675 4.96522 2.96522 4.66675 3.33341 4.66675H18.0001C18.3683 4.66675 18.6667 4.96522 18.6667 5.33341C18.6667 5.7016 18.3683 6.00008 18.0001 6.00008H3.33342C2.96523 6.00008 2.66675 5.7016 2.66675 5.33341Z" style="fill: var(--instrument-tick-mark-secondary-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M14.8771 6H6.45605C6.45605 8.20914 8.34117 10 10.6666 10C12.992 10 14.8771 8.20914 14.8771 6Z" style="fill: var(--data-weather-sun-secondary-color)"/>
<path d="M4.70959 6.37584C4.82827 6.27615 4.88761 6.13808 4.88761 6H6.45622C6.45622 8.20914 8.34134 10 10.6667 10C12.9922 10 14.8773 8.20914 14.8773 6H16.4459C16.4459 6.13808 16.5052 6.27615 16.6239 6.37584L18.488 7.94157C18.5119 7.96166 18.5333 7.98296 18.5522 8.00522C15.9533 7.90023 14.0033 9.30621 12.8273 10.4944C12.6504 10.6732 12.4856 10.8521 12.3331 11.0276C11.5415 10.5915 10.3818 10.2551 9.10565 10.8932C8.88891 11.0016 8.69583 11.1236 8.5239 11.2558C8.49923 11.2652 8.47495 11.2766 8.45129 11.29L6.31467 12.4978C5.91894 12.7215 5.43452 12.3857 5.53521 11.9575L6.07882 9.64523C6.14804 9.35081 5.93064 9.06528 5.61579 9.03712L3.14321 8.81593C2.68525 8.77496 2.50022 8.23157 2.84548 7.94157L4.70959 6.37584Z" style="fill: var(--data-weather-sun-primary-color)"/>
<path d="M2.66662 27.9007C2.34776 27.696 2.23851 27.2428 2.42261 26.8883L2.84526 26.0745H1.99992C1.63173 26.0745 1.33325 25.7427 1.33325 25.3334C1.33325 24.9241 1.63173 24.5923 1.99992 24.5923H2.84525L2.42261 23.7785C2.23851 23.4241 2.34776 22.9708 2.66662 22.7662C2.98549 22.5615 3.39321 22.683 3.57731 23.0374L3.99996 23.8512L4.42261 23.0374C4.6067 22.683 5.01443 22.5615 5.33329 22.7662C5.65215 22.9708 5.7614 23.4241 5.57731 23.7785L5.15466 24.5923H5.99992C6.36811 24.5923 6.66659 24.9241 6.66659 25.3334C6.66659 25.7427 6.36811 26.0745 5.99992 26.0745H5.15465L5.57731 26.8883C5.7614 27.2428 5.65215 27.696 5.33329 27.9007C5.01443 28.1053 4.6067 27.9839 4.42261 27.6294L3.99996 26.8156L3.57731 27.6294C3.39321 27.9839 2.98549 28.1053 2.66662 27.9007Z" style="fill: var(--data-weather-snow-primary-color)"/>
<path d="M15.3333 27.9007C15.0144 27.696 14.9052 27.2428 15.0893 26.8883L15.5119 26.0745H14.6666C14.2984 26.0745 13.9999 25.7427 13.9999 25.3334C13.9999 24.9241 14.2984 24.5923 14.6666 24.5923H15.5119L15.0893 23.7785C14.9052 23.4241 15.0144 22.9708 15.3333 22.7662C15.6522 22.5615 16.0599 22.683 16.244 23.0374L16.6666 23.8512L17.0893 23.0374C17.2734 22.683 17.6811 22.5615 18 22.7662C18.3188 22.9708 18.4281 23.4241 18.244 23.7785L17.8213 24.5923H18.6666C19.0348 24.5923 19.3333 24.9241 19.3333 25.3334C19.3333 25.7427 19.0348 26.0745 18.6666 26.0745H17.8213L18.244 26.8883C18.4281 27.2428 18.3188 27.696 18 27.9007C17.6811 28.1053 17.2734 27.9839 17.0893 27.6294L16.6666 26.8156L16.244 27.6294C16.0599 27.9839 15.6522 28.1053 15.3333 27.9007Z" style="fill: var(--data-weather-snow-primary-color)"/>
<path d="M26.6666 27.9007C26.3478 27.696 26.2385 27.2428 26.4226 26.8883L26.8453 26.0745H25.9999C25.6317 26.0745 25.3333 25.7427 25.3333 25.3334C25.3333 24.9241 25.6317 24.5923 25.9999 24.5923H26.8453L26.4226 23.7785C26.2385 23.4241 26.3478 22.9708 26.6666 22.7662C26.9855 22.5615 27.3932 22.683 27.5773 23.0374L28 23.8512L28.4226 23.0374C28.6067 22.683 29.0144 22.5615 29.3333 22.7662C29.6522 22.9708 29.7614 23.4241 29.5773 23.7785L29.1547 24.5923H29.9999C30.3681 24.5923 30.6666 24.9241 30.6666 25.3334C30.6666 25.7427 30.3681 26.0745 29.9999 26.0745H29.1547L29.5773 26.8883C29.7614 27.2428 29.6522 27.696 29.3333 27.9007C29.0144 28.1053 28.6067 27.9839 28.4226 27.6294L28 26.8156L27.5773 27.6294C27.3932 27.9839 26.9855 28.1053 26.6666 27.9007Z" style="fill: var(--data-weather-snow-primary-color)"/>
<path d="M21.3333 30.5673C21.0144 30.3627 20.9052 29.9094 21.0893 29.555L21.5119 28.7412H20.6666C20.2984 28.7412 19.9999 28.4094 19.9999 28.0001C19.9999 27.5908 20.2984 27.259 20.6666 27.259H21.5119L21.0893 26.4452C20.9052 26.0907 21.0144 25.6375 21.3333 25.4328C21.6522 25.2282 22.0599 25.3496 22.244 25.7041L22.6666 26.5179L23.0893 25.7041C23.2734 25.3496 23.6811 25.2282 24 25.4328C24.3188 25.6375 24.4281 26.0907 24.244 26.4452L23.8213 27.259H24.6666C25.0348 27.259 25.3333 27.5908 25.3333 28.0001C25.3333 28.4094 25.0348 28.7412 24.6666 28.7412H23.8213L24.244 29.555C24.4281 29.9094 24.3188 30.3627 24 30.5673C23.6811 30.772 23.2734 30.6505 23.0893 30.2961L22.6666 29.4823L22.244 30.2961C22.0599 30.6505 21.6522 30.772 21.3333 30.5673Z" style="fill: var(--data-weather-snow-primary-color)"/>
<path d="M9.33329 30.5673C9.01443 30.3627 8.90518 29.9094 9.08927 29.555L9.51193 28.7412H8.66659C8.2984 28.7412 7.99992 28.4094 7.99992 28.0001C7.99992 27.5908 8.2984 27.259 8.66659 27.259H9.51192L9.08927 26.4452C8.90518 26.0907 9.01443 25.6375 9.33329 25.4328C9.65215 25.2282 10.0599 25.3496 10.244 25.7041L10.6666 26.5179L11.0893 25.7041C11.2734 25.3496 11.6811 25.2282 12 25.4328C12.3188 25.6375 12.4281 26.0907 12.244 26.4452L11.8213 27.259H12.6666C13.0348 27.259 13.3333 27.5908 13.3333 28.0001C13.3333 28.4094 13.0348 28.7412 12.6666 28.7412H11.8213L12.244 29.555C12.4281 29.9094 12.3188 30.3627 12 30.5673C11.6811 30.772 11.2734 30.6505 11.0893 30.2961L10.6666 29.4823L10.244 30.2961C10.0599 30.6505 9.65215 30.772 9.33329 30.5673Z" style="fill: var(--data-weather-snow-primary-color)"/>
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
    'obi-heavy-snow-showers-polartwilight-colour': ObiHeavySnowShowersPolartwilightColour;
  }
}
