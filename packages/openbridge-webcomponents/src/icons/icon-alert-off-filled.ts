import {LitElement, html, css, svg} from 'lit';
import {property} from 'lit/decorators.js';
import {customElement} from '../decorator.js';

@customElement('obi-alert-off-filled')
export class ObiAlertOffFilled extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M10.5875 21.4125C10.9792 21.8042 11.45 22 12 22C12.55 22 13.0209 21.8042 13.4125 21.4125C13.8042 21.0208 14 20.55 14 20H10C10 20.55 10.1959 21.0208 10.5875 21.4125Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M18 15.15V10C18 8.61667 17.5834 7.3875 16.75 6.3125C15.9167 5.2375 14.8334 4.53333 13.5 4.2V3.5C13.5 3.08333 13.3542 2.72917 13.0625 2.4375C12.7709 2.14583 12.4167 2 12 2C11.5834 2 11.2292 2.14583 10.9375 2.4375C10.6459 2.72917 10.5 3.08333 10.5 3.5V4.2C10.0667 4.3 9.65836 4.45 9.27502 4.65C8.89169 4.85 8.53336 5.08333 8.20003 5.35L18 15.15Z" fill="currentColor"/>
<path d="M1.40002 4.2L6.09697 8.89694C6.03234 9.26083 6.00002 9.62851 6.00002 10V17H4.00002V19H16.15L19.8 22.6L21.2 21.2L2.80002 2.8L1.40002 4.2Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M10.5875 21.4125C10.9792 21.8042 11.45 22 12 22C12.55 22 13.0209 21.8042 13.4125 21.4125C13.8042 21.0208 14 20.55 14 20H10C10 20.55 10.1959 21.0208 10.5875 21.4125Z" style="fill: var(--element-active-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M18 15.15V10C18 8.61667 17.5834 7.3875 16.75 6.3125C15.9167 5.2375 14.8334 4.53333 13.5 4.2V3.5C13.5 3.08333 13.3542 2.72917 13.0625 2.4375C12.7709 2.14583 12.4167 2 12 2C11.5834 2 11.2292 2.14583 10.9375 2.4375C10.6459 2.72917 10.5 3.08333 10.5 3.5V4.2C10.0667 4.3 9.65836 4.45 9.27502 4.65C8.89169 4.85 8.53336 5.08333 8.20003 5.35L18 15.15Z" style="fill: var(--element-active-color)"/>
<path d="M1.40002 4.2L6.09697 8.89694C6.03234 9.26083 6.00002 9.62851 6.00002 10V17H4.00002V19H16.15L19.8 22.6L21.2 21.2L2.80002 2.8L1.40002 4.2Z" style="fill: var(--element-active-color)"/>
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
