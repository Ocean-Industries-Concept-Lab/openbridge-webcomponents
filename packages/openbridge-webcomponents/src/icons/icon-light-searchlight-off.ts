import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-light-searchlight-off')
export class ObiLightSearchlightOff extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M5.54716 8.37471L1.39429 4.22183L2.8085 2.80762L21.1933 21.1924L19.7791 22.6066L12.9999 15.8275V20H15.9999C16.5522 20 16.9999 20.4477 16.9999 21V22H6.99991V21C6.99991 20.4477 7.44762 20 7.99991 20H9.99991V17.3509L8.30378 18.3302C7.82549 18.6063 7.2139 18.4424 6.93776 17.9641L2.93776 11.0359C2.66162 10.5577 2.82549 9.94606 3.30378 9.66992L5.54716 8.37471ZM11.4036 14.2311L8.16981 16.0981L5.16981 10.902L7.01126 9.83881L11.4036 14.2311Z" fill="currentColor"/>
<path d="M16.8191 11.1044L14.9897 12.1607L16.4538 13.6248L17.8302 12.8301L18.8303 14.5623L20.5624 13.5623L13.5624 1.43799L11.8303 2.43799L12.8302 4.16983L9.13327 6.30427L10.5974 7.76837L13.8191 5.90829L16.8191 11.1044Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M5.54716 8.37471L1.39429 4.22183L2.8085 2.80762L21.1933 21.1924L19.7791 22.6066L12.9999 15.8275V20H15.9999C16.5522 20 16.9999 20.4477 16.9999 21V22H6.99991V21C6.99991 20.4477 7.44762 20 7.99991 20H9.99991V17.3509L8.30378 18.3302C7.82549 18.6063 7.2139 18.4424 6.93776 17.9641L2.93776 11.0359C2.66162 10.5577 2.82549 9.94606 3.30378 9.66992L5.54716 8.37471ZM11.4036 14.2311L8.16981 16.0981L5.16981 10.902L7.01126 9.83881L11.4036 14.2311Z" style="fill: var(--element-active-color)"/>
<path d="M16.8191 11.1044L14.9897 12.1607L16.4538 13.6248L17.8302 12.8301L18.8303 14.5623L20.5624 13.5623L13.5624 1.43799L11.8303 2.43799L12.8302 4.16983L9.13327 6.30427L10.5974 7.76837L13.8191 5.90829L16.8191 11.1044Z" style="fill: var(--element-active-color)"/>
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
    'obi-light-searchlight-off': ObiLightSearchlightOff;
  }
}
