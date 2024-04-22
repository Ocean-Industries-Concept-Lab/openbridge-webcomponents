import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-14-alarm-abandon')
export class Obi14AlarmAbandon extends LitElement {
  @property({type: Boolean, attribute: 'use-css-color'}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M3.50325 16.724C3.41896 17.0112 3.35212 17.2691 3.30127 17.4999H4.00256C5.2792 17.4999 6.57096 17.0679 7.71673 16.2696L8.0034 16.0699L8.28951 16.2704C10.5573 17.8597 13.4479 17.8597 15.7156 16.2704L16.0017 16.0699L16.2884 16.2696C17.2876 16.9658 18.3979 17.3834 19.5123 17.4788L21.6363 13.85C22.1252 13.0032 21.8324 11.9104 20.9856 11.4215L18.6762 10.0881L20.0095 7.77873L15.3907 5.11206L14.0574 7.42146L11.748 6.08813C10.9012 5.59924 9.8084 5.89206 9.31951 6.73884L7.26618 10.2953L6.08647 10.0453C5.85077 9.99133 5.60141 10.0321 5.40237 10.1635C5.20333 10.295 5.05579 10.4972 5.00951 10.7373L3.50325 16.724ZM20.0967 12.9611L10.8591 7.62773L9.09467 10.6838L14.589 11.834L18.3323 16.0172L20.0967 12.9611Z" fill="currentColor"/>
<path d="M16.0024 17.6799C17.2224 18.5299 18.6124 18.9999 20.0024 18.9999H22.0024V20.9999H20.0024C18.6224 20.9999 17.2624 20.6599 16.0024 20.0099C13.4824 21.2999 10.5224 21.2999 8.00244 20.0099C6.74244 20.6499 5.38244 20.9999 4.00244 20.9999H2.00244V18.9999H4.00244C5.39244 18.9999 6.78244 18.5299 8.00244 17.6799C10.4424 19.3899 13.5624 19.3899 16.0024 17.6799Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M3.50325 16.724C3.41896 17.0112 3.35212 17.2691 3.30127 17.4999H4.00256C5.2792 17.4999 6.57096 17.0679 7.71673 16.2696L8.0034 16.0699L8.28951 16.2704C10.5573 17.8597 13.4479 17.8597 15.7156 16.2704L16.0017 16.0699L16.2884 16.2696C17.2876 16.9658 18.3979 17.3834 19.5123 17.4788L21.6363 13.85C22.1252 13.0032 21.8324 11.9104 20.9856 11.4215L18.6762 10.0881L20.0095 7.77873L15.3907 5.11206L14.0574 7.42146L11.748 6.08813C10.9012 5.59924 9.8084 5.89206 9.31951 6.73884L7.26618 10.2953L6.08647 10.0453C5.85077 9.99133 5.60141 10.0321 5.40237 10.1635C5.20333 10.295 5.05579 10.4972 5.00951 10.7373L3.50325 16.724ZM20.0967 12.9611L10.8591 7.62773L9.09467 10.6838L14.589 11.834L18.3323 16.0172L20.0967 12.9611Z" style="fill: var(--element-active-color)"/>
<path d="M16.0024 17.6799C17.2224 18.5299 18.6124 18.9999 20.0024 18.9999H22.0024V20.9999H20.0024C18.6224 20.9999 17.2624 20.6599 16.0024 20.0099C13.4824 21.2999 10.5224 21.2999 8.00244 20.0099C6.74244 20.6499 5.38244 20.9999 4.00244 20.9999H2.00244V18.9999H4.00244C5.39244 18.9999 6.78244 18.5299 8.00244 17.6799C10.4424 19.3899 13.5624 19.3899 16.0024 17.6799Z" style="fill: var(--element-active-color)"/>
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
    'obi-14-alarm-abandon': Obi14AlarmAbandon;
  }
}