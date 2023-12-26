import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-09-damper-horizontal-off')
export class Obi09DamperHorizontalOff extends LitElement {
  @property({type: Boolean, attribute: 'use-css-color'}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_21262_269559)">
<path d="M14.8549 9.19703L20.1602 6.13402C20.6385 5.85788 21.2501 6.02176 21.5262 6.50005C21.8024 6.97834 21.6385 7.58993 21.1602 7.86607L15.8549 10.9291C16.333 12.6452 15.6141 14.5322 14 15.4642C12.3858 16.3961 10.3922 16.0751 9.145 14.8031L3.83972 17.8661C3.36142 18.1422 2.74983 17.9783 2.47369 17.5C2.19755 17.0218 2.36142 16.4102 2.83972 16.134L8.145 13.071C7.66694 11.3549 8.38584 9.46787 9.99997 8.53595C11.6141 7.60403 13.6078 7.92496 14.8549 9.19703Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M13.732 11C14.2843 11.9566 13.9566 13.1798 13 13.7321C12.0434 14.2844 10.8202 13.9566 10.2679 13C9.71564 12.0435 10.0434 10.8203 11 10.268C11.9566 9.71571 13.1797 10.0435 13.732 11Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M19.6602 5.268L14.9695 7.97618C13.4186 6.83292 11.2764 6.64431 9.49997 7.66992C7.72356 8.69554 6.81577 10.6451 7.03043 12.5598L2.33972 15.268C1.38313 15.8203 1.05538 17.0435 1.60767 18C2.15995 18.9566 3.38313 19.2844 4.33972 18.7321L9.03043 16.0239C10.5813 17.1672 12.7236 17.3558 14.5 16.3302C16.2764 15.3046 17.1842 13.355 16.9695 11.4403L21.6602 8.7321C22.6168 8.17982 22.9446 6.95663 22.3923 6.00005C21.84 5.04346 20.6168 4.71571 19.6602 5.268ZM20.1602 6.13402L14.8549 9.19703C13.6078 7.92496 11.6141 7.60403 9.99997 8.53595C8.38584 9.46787 7.66694 11.3549 8.145 13.071L2.83972 16.134C2.36142 16.4102 2.19755 17.0218 2.47369 17.5C2.74983 17.9783 3.36142 18.1422 3.83972 17.8661L9.145 14.8031C10.3922 16.0751 12.3858 16.3961 14 15.4642C15.6141 14.5322 16.333 12.6452 15.8549 10.9291L21.1602 7.86607C21.6385 7.58993 21.8024 6.97834 21.5262 6.50005C21.2501 6.02176 20.6385 5.85788 20.1602 6.13402Z" fill="currentColor"/>
</g>
<defs>
<clipPath id="clip0_21262_269559">
<rect width="24" height="24" fill="currentColor"/>
</clipPath>
</defs>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_21262_269559)">
<path d="M14.8549 9.19703L20.1602 6.13402C20.6385 5.85788 21.2501 6.02176 21.5262 6.50005C21.8024 6.97834 21.6385 7.58993 21.1602 7.86607L15.8549 10.9291C16.333 12.6452 15.6141 14.5322 14 15.4642C12.3858 16.3961 10.3922 16.0751 9.145 14.8031L3.83972 17.8661C3.36142 18.1422 2.74983 17.9783 2.47369 17.5C2.19755 17.0218 2.36142 16.4102 2.83972 16.134L8.145 13.071C7.66694 11.3549 8.38584 9.46787 9.99997 8.53595C11.6141 7.60403 13.6078 7.92496 14.8549 9.19703Z" style="fill: var(--automation-device-primary-inverted-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M13.732 11C14.2843 11.9566 13.9566 13.1798 13 13.7321C12.0434 14.2844 10.8202 13.9566 10.2679 13C9.71564 12.0435 10.0434 10.8203 11 10.268C11.9566 9.71571 13.1797 10.0435 13.732 11Z" style="fill: var(--automation-device-tertiary-inverted-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M19.6602 5.268L14.9695 7.97618C13.4186 6.83292 11.2764 6.64431 9.49997 7.66992C7.72356 8.69554 6.81577 10.6451 7.03043 12.5598L2.33972 15.268C1.38313 15.8203 1.05538 17.0435 1.60767 18C2.15995 18.9566 3.38313 19.2844 4.33972 18.7321L9.03043 16.0239C10.5813 17.1672 12.7236 17.3558 14.5 16.3302C16.2764 15.3046 17.1842 13.355 16.9695 11.4403L21.6602 8.7321C22.6168 8.17982 22.9446 6.95663 22.3923 6.00005C21.84 5.04346 20.6168 4.71571 19.6602 5.268ZM20.1602 6.13402L14.8549 9.19703C13.6078 7.92496 11.6141 7.60403 9.99997 8.53595C8.38584 9.46787 7.66694 11.3549 8.145 13.071L2.83972 16.134C2.36142 16.4102 2.19755 17.0218 2.47369 17.5C2.74983 17.9783 3.36142 18.1422 3.83972 17.8661L9.145 14.8031C10.3922 16.0751 12.3858 16.3961 14 15.4642C15.6141 14.5322 16.333 12.6452 15.8549 10.9291L21.1602 7.86607C21.6385 7.58993 21.8024 6.97834 21.5262 6.50005C21.2501 6.02176 20.6385 5.85788 20.1602 6.13402Z" style="fill: var(--automation-device-tertiary-inverted-color)"/>
</g>
<defs>
<clipPath id="clip0_21262_269559">
<rect width="24" height="24" fill="none"/>
</clipPath>
</defs>
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
    }
    .wrapper > * {
      height: 100%;
      width: 100%;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    'obi-09-damper-horizontal-off': Obi09DamperHorizontalOff;
  }
}
