import { LitElement, html, svg, unsafeCSS } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import compentStyle from "./valve-analoge-two-way-icon.css?inline";

@customElement('obc-valve-analoge-two-way-icon')
export class ObcValveAnalogeTwoWayIcon extends LitElement {
  @property({ type: Number }) value: number = 0;
  @property({ type: Boolean }) closed: boolean = false;

  override render() {
    if (this.closed) {
      return html`
      <div class="wrapper">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M3 16.8892L10 12.8059V10.4546L3 6.37127V16.8892ZM11 9.88024V13.3802L2.75194 18.1916C2.41861 18.386 2 18.1456 2 17.7597V5.50075C2 5.11486 2.41861 4.87442 2.75193 5.06886L11 9.88024ZM21 16.8892V6.37127L14 10.4546V12.8059L21 16.8892ZM13 13.3802L21.2481 18.1916C21.5814 18.386 22 18.1456 22 17.7597V5.50075C22 5.11486 21.5814 4.87442 21.2481 5.06886L13 9.88024V13.3802ZM12 22.6301C11.4477 22.6301 11 22.1824 11 21.6301V15.6301C11 15.0778 11.4477 14.6301 12 14.6301C12.5523 14.6301 13 15.0778 13 15.6301V21.6301C13 22.1824 12.5523 22.6301 12 22.6301Z" fill="var(--automation-device-secondary-color)"/>
          <path d="M10 12.8059L3 16.8892V6.37127L10 10.4546V12.8059Z" fill="var(--automation-device-tertiary-color)"/>
          <path d="M21 6.37127V16.8892L14 12.8059V10.4546L21 6.37127Z" fill="var(--automation-device-tertiary-color)"/>
        </svg>
      </div>`
    }

    const handleRotation = -(1 -this.value / 100) * 90;
    const handle = svg`
      <g transform="rotate(${handleRotation} 12 18.5)">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M9.49942 20.1303H14.4994C15.3278 20.1303 15.9994 19.4587 15.9994 18.6303C15.9994 17.8019 15.3278 17.1303 14.4994 17.1303H9.49942C8.67099 17.1303 7.99942 17.8019 7.99942 18.6303C7.99942 19.4587 8.67099 20.1303 9.49942 20.1303ZM9.49942 19.1303L14.4994 19.1303C14.7756 19.1303 14.9994 18.9064 14.9994 18.6303C14.9994 18.3542 14.7756 18.1303 14.4994 18.1303L9.49942 18.1303C9.22328 18.1303 8.99942 18.3542 8.99942 18.6303C8.99942 18.9064 9.22328 19.1303 9.49942 19.1303Z" fill="var(--automation-device-tertiary-color)"/>
        <path d="M14.4994 19.1303L9.49942 19.1303C9.22328 19.1303 8.99942 18.9064 8.99942 18.6303C8.99942 18.3542 9.22328 18.1303 9.49942 18.1303L14.4994 18.1303C14.7756 18.1303 14.9994 18.3542 14.9994 18.6303C14.9994 18.9064 14.7756 19.1303 14.4994 19.1303Z" fill="var(--automation-device-primary-color)"/>
      </g>
    `

    const xmin = 10;
    const xmax = 3;
    const x = xmin + (xmax - xmin) * this.value / 100;

    return html`
      <div class="wrapper">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M2 5.50075V17.7597C2 18.1456 2.41861 18.386 2.75194 18.1916L10.5714 13.6302H13.4286L21.2481 18.1916C21.5814 18.386 22 18.1456 22 17.7597V5.50075C22 5.11486 21.5814 4.87442 21.2481 5.06886L13.4286 9.63024H10.5714L2.75193 5.06886C2.41861 4.87442 2 5.11486 2 5.50075Z" fill="black"/>
        <path d="M3 6.3712V16.8891L10.3011 12.6302H13.6989L21 16.8891V6.3712L13.6989 10.6302H10.3011L3 6.3712Z" fill="var(--automation-device-primary-color)"/>
        ${handle}
        <g clip-path="url(#clip0)">
          <rect x=${xmax} y="0" width=${x - xmax} height="24" fill="var(--automation-device-secondary-color)"/>
          <line x1=${x} y1="0" x2=${x} y2="24" stroke="var(--automation-device-tertiary-color)" stroke-width="1"/>

          <line x1=${24-x} y1="0" x2=${24-x} y2="24" stroke="var(--automation-device-tertiary-color)" stroke-width="1"/>
          <rect x=${24-x} y="0" width=${x - xmax} height="24" fill="var(--automation-device-secondary-color)"/>
        </g>
        <defs>
          <clipPath id="clip0">
            <path d="M3 6.3712V16.8891L10.3011 12.6302H13.6989L21 16.8891V6.3712L13.6989 10.6302H10.3011L3 6.3712Z"/>
          </clipPath>
        </defs>
      </svg>
      </div>
      `
  }

static override styles = unsafeCSS(compentStyle);
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-valve-analoge-two-way-icon': ObcValveAnalogeTwoWayIcon
  }
}
