import {LitElement, html, css, svg, unsafeCSS} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-19-limits-attention')
export class Obi19LimitsAttention extends LitElement {
  @property({type: Boolean, attribute: 'use-css-color'}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M4.5 2.5L4.5 4.5H2.5V2.5H4.5Z" fill="currentColor"/>
<path d="M6.16667 13.5L7.10667 14.44L10.8333 10.72V18.8333H12.1667L12.1667 10.72L15.8933 14.44L16.8333 13.5L11.5 8.16667L6.16667 13.5Z" fill="currentColor"/>
<path d="M20.5 4.5L18.5 4.5V2.5H20.5V4.5Z" fill="currentColor"/>
<path d="M16.5 4.5L14.5 4.5V2.5H16.5V4.5Z" fill="currentColor"/>
<path d="M12.5 4.5L10.5 4.5V2.5H12.5V4.5Z" fill="currentColor"/>
<path d="M8.5 2.5H6.5V4.5H8.5V2.5Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M4.5 2.5L4.5 4.5H2.5V2.5H4.5Z" style="fill: var(--element-active-color)"/>
<path d="M6.16667 13.5L7.10667 14.44L10.8333 10.72V18.8333H12.1667L12.1667 10.72L15.8933 14.44L16.8333 13.5L11.5 8.16667L6.16667 13.5Z" style="fill: var(--element-active-color)"/>
<path d="M20.5 4.5L18.5 4.5V2.5H20.5V4.5Z" style="fill: var(--element-active-color)"/>
<path d="M16.5 4.5L14.5 4.5V2.5H16.5V4.5Z" style="fill: var(--element-active-color)"/>
<path d="M12.5 4.5L10.5 4.5V2.5H12.5V4.5Z" style="fill: var(--element-active-color)"/>
<path d="M8.5 2.5H6.5V4.5H8.5V2.5Z" style="fill: var(--element-active-color)"/>
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
    'obi-19-limits-attention': Obi19LimitsAttention;
  }
}
