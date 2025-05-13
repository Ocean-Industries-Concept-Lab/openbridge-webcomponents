import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-alarm-aground')
export class ObiAlarmAground extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M4 20H20V22H4V20Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M9.00233 2H15.0023V5H18.0023C19.1023 5 20.0023 5.9 20.0023 7V11.62L21.2823 12.04C21.5423 12.12 21.7623 12.3 21.8823 12.54C22.0023 12.78 22.0223 13.06 21.9423 13.32L20.0523 19H3.95233L2.05233 13.32C1.96233 13.06 1.99233 12.78 2.11233 12.54C2.23233 12.3 2.45233 12.12 2.71233 12.04L4.00233 11.62V7C4.00233 5.9 4.90233 5 6.00233 5H9.00233V2ZM13.0023 5V4H11.0023V5H13.0023ZM17.3822 12.88L12.0022 11.11L6.62217 12.86L4.22217 13.65L5.26108 17H18.7382L19.7722 13.66L17.3822 12.88ZM6.0023 10.97V7H18.0023V10.97L12.0023 9L6.0023 10.97Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M4 20H20V22H4V20Z" style="fill: var(--element-active-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M9.00233 2H15.0023V5H18.0023C19.1023 5 20.0023 5.9 20.0023 7V11.62L21.2823 12.04C21.5423 12.12 21.7623 12.3 21.8823 12.54C22.0023 12.78 22.0223 13.06 21.9423 13.32L20.0523 19H3.95233L2.05233 13.32C1.96233 13.06 1.99233 12.78 2.11233 12.54C2.23233 12.3 2.45233 12.12 2.71233 12.04L4.00233 11.62V7C4.00233 5.9 4.90233 5 6.00233 5H9.00233V2ZM13.0023 5V4H11.0023V5H13.0023ZM17.3822 12.88L12.0022 11.11L6.62217 12.86L4.22217 13.65L5.26108 17H18.7382L19.7722 13.66L17.3822 12.88ZM6.0023 10.97V7H18.0023V10.97L12.0023 9L6.0023 10.97Z" style="fill: var(--element-active-color)"/>
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
    'obi-alarm-aground': ObiAlarmAground;
  }
}
