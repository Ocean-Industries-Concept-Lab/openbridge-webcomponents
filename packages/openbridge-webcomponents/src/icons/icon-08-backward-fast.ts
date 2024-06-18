import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-08-backward-fast')
export class Obi08BackwardFast extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_18893_326435)">
<path d="M9.44737 5.04375L9.44737 18.9562L0.797826 12L9.44737 5.04375ZM20.5 5.04375L20.5 18.9562L11.8505 12L20.5 5.04375Z" fill="currentColor" stroke="black"/>
</g>
<defs>
<clipPath id="clip0_18893_326435">
<rect width="24" height="24" fill="currentColor"/>
</clipPath>
</defs>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_18893_326435)">
<path d="M9.44737 5.04375L9.44737 18.9562L0.797826 12L9.44737 5.04375ZM20.5 5.04375L20.5 18.9562L11.8505 12L20.5 5.04375Z" style="fill: var(--automation-device-primary-color)" style="stroke: var(--automation-device-tertiary-color)"/>
</g>
<defs>
<clipPath id="clip0_18893_326435">
<rect width="24" height="24" style="fill: var(--automation-device-primary-color)"/>
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
    'obi-08-backward-fast': Obi08BackwardFast;
  }
}
