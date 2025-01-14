import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-resistor-5-off')
export class ObiResistor5Off extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_2228_2099)">
<path d="M5 9H19V15H5V9Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M6.58632 16L3.10104 19.4853H0V21.4853H3.92946L9.41475 16H20V13H23V11H20V8H17.4148L21.1929 4.22183L19.7787 2.80762L14.5863 8H4V11H1V13H4V16H6.58632ZM10.4147 15H19V9H16.4148L10.4147 15ZM13.5863 9L7.58632 15H5V9H13.5863Z" fill="currentColor"/>
</g>
<defs>
<clipPath id="clip0_2228_2099">
<rect width="24" height="24" fill="currentColor"/>
</clipPath>
</defs>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_2228_2099)">
<path d="M5 9H19V15H5V9Z" style="fill: var(--automation-device-primary-inverted-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M6.58632 16L3.10104 19.4853H0V21.4853H3.92946L9.41475 16H20V13H23V11H20V8H17.4148L21.1929 4.22183L19.7787 2.80762L14.5863 8H4V11H1V13H4V16H6.58632ZM10.4147 15H19V9H16.4148L10.4147 15ZM13.5863 9L7.58632 15H5V9H13.5863Z" style="fill: var(--undefined)"/>
</g>
<defs>
<clipPath id="clip0_2228_2099">
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
    'obi-resistor-5-off': ObiResistor5Off;
  }
}