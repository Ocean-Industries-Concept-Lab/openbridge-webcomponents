import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-resistor-5')
export class ObiResistor5 extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_2228_2097)">
<path fill-rule="evenodd" clip-rule="evenodd" d="M6.58661 16L3.1005 19.4861L0 19.5V21.5L3.92893 21.4861L9.41504 16H20V13H23V11H20V8.00003H17.415L21.1924 4.22269L19.7782 2.80847L14.5866 8.00003H4V11H1V13H4V16H6.58661ZM11.415 14H18V10H15.415L11.415 14ZM12.5866 10L8.58661 14H6V10H12.5866Z" fill="currentColor"/>
</g>
<defs>
<clipPath id="clip0_2228_2097">
<rect width="24" height="24" fill="currentColor"/>
</clipPath>
</defs>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_2228_2097)">
<path fill-rule="evenodd" clip-rule="evenodd" d="M6.58661 16L3.1005 19.4861L0 19.5V21.5L3.92893 21.4861L9.41504 16H20V13H23V11H20V8.00003H17.415L21.1924 4.22269L19.7782 2.80847L14.5866 8.00003H4V11H1V13H4V16H6.58661ZM11.415 14H18V10H15.415L11.415 14ZM12.5866 10L8.58661 14H6V10H12.5866Z" style="fill: var(--automation-device-secondary-color)"/>
</g>
<defs>
<clipPath id="clip0_2228_2097">
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
    'obi-resistor-5': ObiResistor5;
  }
}
