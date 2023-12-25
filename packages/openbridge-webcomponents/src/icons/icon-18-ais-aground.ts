import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-18-ais-aground')
export class Obi18AisAground extends LitElement {
  @property({type: Number}) size = 24;
  @property({type: Boolean, attribute: 'use-css-color'}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M4 20H20V22H4V20Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M9.00233 1H15.0023V4H18.0023C19.1023 4 20.0023 4.9 20.0023 6V10.62L21.2823 11.04C21.5423 11.12 21.7623 11.3 21.8823 11.54C22.0023 11.78 22.0223 12.06 21.9423 12.32L20.0523 19H3.95233L2.05233 12.32C1.96233 12.06 1.99233 11.78 2.11233 11.54C2.23233 11.3 2.45233 11.12 2.71233 11.04L4.00233 10.62V6C4.00233 4.9 4.90233 4 6.00233 4H9.00233V1ZM13.0023 4V3H11.0023V4H13.0023ZM17.3822 11.88L12.0022 10.11L6.62217 11.86L4.22217 12.65L5.26108 17H18.7382L19.7722 12.66L17.3822 11.88ZM6.0023 9.97V6H18.0023V9.97L12.0023 8L6.0023 9.97Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M4 20H20V22H4V20Z" style="fill: var(--element-active-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M9.00233 1H15.0023V4H18.0023C19.1023 4 20.0023 4.9 20.0023 6V10.62L21.2823 11.04C21.5423 11.12 21.7623 11.3 21.8823 11.54C22.0023 11.78 22.0223 12.06 21.9423 12.32L20.0523 19H3.95233L2.05233 12.32C1.96233 12.06 1.99233 11.78 2.11233 11.54C2.23233 11.3 2.45233 11.12 2.71233 11.04L4.00233 10.62V6C4.00233 4.9 4.90233 4 6.00233 4H9.00233V1ZM13.0023 4V3H11.0023V4H13.0023ZM17.3822 11.88L12.0022 10.11L6.62217 11.86L4.22217 12.65L5.26108 17H18.7382L19.7722 12.66L17.3822 11.88ZM6.0023 9.97V6H18.0023V9.97L12.0023 8L6.0023 9.97Z" style="fill: var(--element-active-color)"/>
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
    'obi-18-ais-aground': Obi18AisAground;
  }
}
