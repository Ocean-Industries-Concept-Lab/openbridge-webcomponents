import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-resistor-2')
export class ObiResistor2 extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_2228_2088)">
<path fill-rule="evenodd" clip-rule="evenodd" d="M16 2H13V0H11V2H8L12 8H4V11H1V13H4V16H20V13H23V11H20V8H12L16 2ZM6 14V10H18V14H6Z" fill="currentColor"/>
</g>
<defs>
<clipPath id="clip0_2228_2088">
<rect width="24" height="24" fill="currentColor"/>
</clipPath>
</defs>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_2228_2088)">
<path fill-rule="evenodd" clip-rule="evenodd" d="M16 2H13V0H11V2H8L12 8H4V11H1V13H4V16H20V13H23V11H20V8H12L16 2ZM6 14V10H18V14H6Z" style="fill: var(--automation-device-secondary-color)"/>
</g>
<defs>
<clipPath id="clip0_2228_2088">
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
    'obi-resistor-2': ObiResistor2;
  }
}
