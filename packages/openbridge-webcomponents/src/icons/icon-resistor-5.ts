import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-resistor-5')
export class ObiResistor5 extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_3597_2147)">
<path fill-rule="evenodd" clip-rule="evenodd" d="M6.58661 15.9999L3.1005 19.486L0 19.4999L0 21.4999L3.92893 21.486L9.41504 15.9999L20 15.9999L20 12.9999H23V10.9999H20V7.99991L17.415 7.99991L21.1924 4.22256L19.7782 2.80835L14.5866 7.99991L4 7.99991V10.9999H1L1 12.9999H4V15.9999L6.58661 15.9999ZM11.415 13.9999L18 13.9999L18 9.99991H15.415L11.415 13.9999ZM12.5866 9.99991L8.58661 13.9999H6L6 9.99991L12.5866 9.99991Z" fill="currentColor"/>
</g>
<defs>
<clipPath id="clip0_3597_2147">
<rect width="24" height="24" fill="currentColor"/>
</clipPath>
</defs>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_3597_2147)">
<path fill-rule="evenodd" clip-rule="evenodd" d="M6.58661 15.9999L3.1005 19.486L0 19.4999L0 21.4999L3.92893 21.486L9.41504 15.9999L20 15.9999L20 12.9999H23V10.9999H20V7.99991L17.415 7.99991L21.1924 4.22256L19.7782 2.80835L14.5866 7.99991L4 7.99991V10.9999H1L1 12.9999H4V15.9999L6.58661 15.9999ZM11.415 13.9999L18 13.9999L18 9.99991H15.415L11.415 13.9999ZM12.5866 9.99991L8.58661 13.9999H6L6 9.99991L12.5866 9.99991Z" style="fill: var(--automation-device-secondary-color)"/>
</g>
<defs>
<clipPath id="clip0_3597_2147">
<rect width="24" height="24" fill="none"/>
</clipPath>
</defs>
</svg>
`;

  override render() {
    return html`
      <div class="wrapper" >
        ${this.useCssColor? this.iconCss : this.icon}
      </div>
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