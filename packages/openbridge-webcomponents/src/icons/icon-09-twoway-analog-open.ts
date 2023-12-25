import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-09-twoway-analog-open')
export class Obi09TwowayAnalogOpen extends LitElement {
  @property({type: Number}) size = 24;
  @property({type: Boolean, attribute: 'use-css-color'}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M2 5.50075V17.7597C2 18.1456 2.41861 18.386 2.75194 18.1916L10.5714 13.6302H13.4286L21.2481 18.1916C21.5814 18.386 22 18.1456 22 17.7597V5.50075C22 5.11486 21.5814 4.87442 21.2481 5.06886L13.4286 9.63024H10.5714L2.75193 5.06886C2.41861 4.87442 2 5.11486 2 5.50075Z" fill="currentColor"/>
<path d="M3 6.3712V16.8891L10.3011 12.6302H13.6989L21 16.8891V6.3712L13.6989 10.6302H10.3011L3 6.3712Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M9.49942 20.1303H14.4994C15.3278 20.1303 15.9994 19.4587 15.9994 18.6303C15.9994 17.8019 15.3278 17.1303 14.4994 17.1303H9.49942C8.67099 17.1303 7.99942 17.8019 7.99942 18.6303C7.99942 19.4587 8.67099 20.1303 9.49942 20.1303ZM9.49942 19.1303L14.4994 19.1303C14.7756 19.1303 14.9994 18.9064 14.9994 18.6303C14.9994 18.3542 14.7756 18.1303 14.4994 18.1303L9.49942 18.1303C9.22328 18.1303 8.99942 18.3542 8.99942 18.6303C8.99942 18.9064 9.22328 19.1303 9.49942 19.1303Z" fill="currentColor"/>
<path d="M14.4994 19.1303L9.49942 19.1303C9.22328 19.1303 8.99942 18.9064 8.99942 18.6303C8.99942 18.3542 9.22328 18.1303 9.49942 18.1303L14.4994 18.1303C14.7756 18.1303 14.9994 18.3542 14.9994 18.6303C14.9994 18.9064 14.7756 19.1303 14.4994 19.1303Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M2 5.50075V17.7597C2 18.1456 2.41861 18.386 2.75194 18.1916L10.5714 13.6302H13.4286L21.2481 18.1916C21.5814 18.386 22 18.1456 22 17.7597V5.50075C22 5.11486 21.5814 4.87442 21.2481 5.06886L13.4286 9.63024H10.5714L2.75193 5.06886C2.41861 4.87442 2 5.11486 2 5.50075Z" style="fill: var(--automation-device-tertiary-color)"/>
<path d="M3 6.3712V16.8891L10.3011 12.6302H13.6989L21 16.8891V6.3712L13.6989 10.6302H10.3011L3 6.3712Z" style="fill: var(--automation-device-primary-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M9.49942 20.1303H14.4994C15.3278 20.1303 15.9994 19.4587 15.9994 18.6303C15.9994 17.8019 15.3278 17.1303 14.4994 17.1303H9.49942C8.67099 17.1303 7.99942 17.8019 7.99942 18.6303C7.99942 19.4587 8.67099 20.1303 9.49942 20.1303ZM9.49942 19.1303L14.4994 19.1303C14.7756 19.1303 14.9994 18.9064 14.9994 18.6303C14.9994 18.3542 14.7756 18.1303 14.4994 18.1303L9.49942 18.1303C9.22328 18.1303 8.99942 18.3542 8.99942 18.6303C8.99942 18.9064 9.22328 19.1303 9.49942 19.1303Z" style="fill: var(--automation-device-tertiary-color)"/>
<path d="M14.4994 19.1303L9.49942 19.1303C9.22328 19.1303 8.99942 18.9064 8.99942 18.6303C8.99942 18.3542 9.22328 18.1303 9.49942 18.1303L14.4994 18.1303C14.7756 18.1303 14.9994 18.3542 14.9994 18.6303C14.9994 18.9064 14.7756 19.1303 14.4994 19.1303Z" style="fill: var(--automation-device-primary-color)"/>
</svg>
`;

  override render() {
    return html`
      <div class="wrapper" style="--size:${this.size}px">
        ${this.useCssColor ? this.iconCss : this.icon}
      </div>
    `;
  }

  static override styles = css`
    .wrapper {
      height: var(--size);
      width: var(--size);
    }
    .wrapper > * {
      height: 100%;
      width: 100%;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    'obi-09-twoway-analog-open': Obi09TwowayAnalogOpen;
  }
}
