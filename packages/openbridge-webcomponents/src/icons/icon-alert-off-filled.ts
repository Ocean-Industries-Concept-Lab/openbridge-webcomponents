import {LitElement, html, css, svg} from 'lit';
import {property} from 'lit/decorators.js';
import {customElement} from '../decorator.js';

@customElement('obi-alert-off-filled')
export class ObiAlertOffFilled extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M10.5874 21.4125C10.9791 21.8042 11.4499 22 11.9999 22C12.5499 22 13.0207 21.8042 13.4124 21.4125C13.8041 21.0208 13.9999 20.55 13.9999 20H9.9999C9.9999 20.55 10.1957 21.0208 10.5874 21.4125Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M17.9999 15.15V10C17.9999 8.61667 17.5832 7.3875 16.7499 6.3125C15.9166 5.2375 14.8332 4.53333 13.4999 4.2V3.5C13.4999 3.08333 13.3541 2.72917 13.0624 2.4375C12.7707 2.14583 12.4166 2 11.9999 2C11.5832 2 11.2291 2.14583 10.9374 2.4375C10.6457 2.72917 10.4999 3.08333 10.4999 3.5V4.2C10.0666 4.3 9.65824 4.45 9.2749 4.65C8.89157 4.85 8.53324 5.08333 8.1999 5.35L17.9999 15.15Z" fill="currentColor"/>
<path d="M1.3999 4.2L6.09685 8.89694C6.03222 9.26083 5.9999 9.62851 5.9999 10V17H3.9999V19H16.1499L19.7999 22.6L21.1999 21.2L2.7999 2.8L1.3999 4.2Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M10.5874 21.4125C10.9791 21.8042 11.4499 22 11.9999 22C12.5499 22 13.0207 21.8042 13.4124 21.4125C13.8041 21.0208 13.9999 20.55 13.9999 20H9.9999C9.9999 20.55 10.1957 21.0208 10.5874 21.4125Z" style="fill: var(--element-active-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M17.9999 15.15V10C17.9999 8.61667 17.5832 7.3875 16.7499 6.3125C15.9166 5.2375 14.8332 4.53333 13.4999 4.2V3.5C13.4999 3.08333 13.3541 2.72917 13.0624 2.4375C12.7707 2.14583 12.4166 2 11.9999 2C11.5832 2 11.2291 2.14583 10.9374 2.4375C10.6457 2.72917 10.4999 3.08333 10.4999 3.5V4.2C10.0666 4.3 9.65824 4.45 9.2749 4.65C8.89157 4.85 8.53324 5.08333 8.1999 5.35L17.9999 15.15Z" style="fill: var(--element-active-color)"/>
<path d="M1.3999 4.2L6.09685 8.89694C6.03222 9.26083 5.9999 9.62851 5.9999 10V17H3.9999V19H16.1499L19.7999 22.6L21.1999 21.2L2.7999 2.8L1.3999 4.2Z" style="fill: var(--element-active-color)"/>
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
    'obi-alert-off-filled': ObiAlertOffFilled;
  }
}
