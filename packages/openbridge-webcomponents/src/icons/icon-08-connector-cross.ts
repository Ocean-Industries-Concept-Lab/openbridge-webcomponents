import {LitElement, html, css, svg, unsafeCSS} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-08-connector-cross')
export class Obi08ConnectorCross extends LitElement {
  @property({type: Boolean, attribute: 'use-css-color'}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_20146_393636)">
<path d="M11.5 1.83333V0H12.5V1.83333H11.5Z" fill="currentColor"/>
<path d="M11.5 7.33333V3.66667H12.5V7.33333H11.5Z" fill="currentColor"/>
<path d="M11.5 11V9.16667H12.5V11H11.5Z" fill="currentColor"/>
<path d="M0 12.5H2V11.5H0V12.5Z" fill="currentColor"/>
<path d="M4 12.5H8V11.5H4V12.5Z" fill="currentColor"/>
<path d="M10 12.5H14V11.5H10V12.5Z" fill="currentColor"/>
<path d="M16 12.5H20V11.5H16V12.5Z" fill="currentColor"/>
<path d="M22 12.5H24V11.5H22V12.5Z" fill="currentColor"/>
<path d="M11.5 13V14.8333H12.5V13H11.5Z" fill="currentColor"/>
<path d="M11.5 16.6667V20.3333H12.5V16.6667H11.5Z" fill="currentColor"/>
<path d="M11.5 22.1667V24H12.5V22.1667H11.5Z" fill="currentColor"/>
</g>
<defs>
<clipPath id="clip0_20146_393636">
<rect width="24" height="24" fill="currentColor"/>
</clipPath>
</defs>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_20146_393636)">
<path d="M11.5 1.83333V0H12.5V1.83333H11.5Z" style="fill: var(--element-active-color)"/>
<path d="M11.5 7.33333V3.66667H12.5V7.33333H11.5Z" style="fill: var(--element-active-color)"/>
<path d="M11.5 11V9.16667H12.5V11H11.5Z" style="fill: var(--element-active-color)"/>
<path d="M0 12.5H2V11.5H0V12.5Z" style="fill: var(--element-active-color)"/>
<path d="M4 12.5H8V11.5H4V12.5Z" style="fill: var(--element-active-color)"/>
<path d="M10 12.5H14V11.5H10V12.5Z" style="fill: var(--element-active-color)"/>
<path d="M16 12.5H20V11.5H16V12.5Z" style="fill: var(--element-active-color)"/>
<path d="M22 12.5H24V11.5H22V12.5Z" style="fill: var(--element-active-color)"/>
<path d="M11.5 13V14.8333H12.5V13H11.5Z" style="fill: var(--element-active-color)"/>
<path d="M11.5 16.6667V20.3333H12.5V16.6667H11.5Z" style="fill: var(--element-active-color)"/>
<path d="M11.5 22.1667V24H12.5V22.1667H11.5Z" style="fill: var(--element-active-color)"/>
</g>
<defs>
<clipPath id="clip0_20146_393636">
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
    'obi-08-connector-cross': Obi08ConnectorCross;
  }
}
