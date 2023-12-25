import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-08-fire')
export class Obi08Fire extends LitElement {
  @property({type: Number}) size = 24;
  @property({type: Boolean, attribute: 'use-css-color'}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M11.0171 21.9785C11.2299 21.9927 11.448 22 11.6712 22C16.2522 22 20 19.263 20 15.1313C20.0011 13.9432 19.2625 11.345 18.6849 10.2828C18.6767 10.3029 18.6683 10.3238 18.6595 10.3454C18.2073 11.4583 16.9714 14.5 15.5 14.5C14 14.5 13.9385 13.4784 14 13C14.5041 8.81414 13.2712 4.0202 9.47945 2C10.7329 5.00378 8.76071 7.41294 6.84229 9.75644C5.40608 11.5109 4 13.2285 4 15.1313C4 16.7823 4.86104 18.9515 6.72122 20.4065C6.481 17.6016 6.9332 14.4508 8.45293 13.0633C7.97869 15.14 8.85858 16.7712 9.71449 18.358C10.3492 19.5348 10.9708 20.6871 11.0171 21.9785Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M11.0171 21.9785C11.2299 21.9927 11.448 22 11.6712 22C16.2522 22 20 19.263 20 15.1313C20.0011 13.9432 19.2625 11.345 18.6849 10.2828C18.6767 10.3029 18.6683 10.3238 18.6595 10.3454C18.2073 11.4583 16.9714 14.5 15.5 14.5C14 14.5 13.9385 13.4784 14 13C14.5041 8.81414 13.2712 4.0202 9.47945 2C10.7329 5.00378 8.76071 7.41294 6.84229 9.75644C5.40608 11.5109 4 13.2285 4 15.1313C4 16.7823 4.86104 18.9515 6.72122 20.4065C6.481 17.6016 6.9332 14.4508 8.45293 13.0633C7.97869 15.14 8.85858 16.7712 9.71449 18.358C10.3492 19.5348 10.9708 20.6871 11.0171 21.9785Z" style="fill: var(--element-active-color)"/>
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
    'obi-08-fire': Obi08Fire;
  }
}
