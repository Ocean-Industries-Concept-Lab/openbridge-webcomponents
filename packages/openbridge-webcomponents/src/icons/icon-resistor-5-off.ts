import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-resistor-5-off')
export class ObiResistor5Off extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_3597_2338)">
<path d="M5 9L19 9V15L5 15L5 9Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M6.58632 16L3.10104 19.4853H0L0 21.4853H3.92946L9.41475 16L20 16L20 13H23V11H20V8L17.4148 8L21.1929 4.22183L19.7787 2.80762L14.5863 8L4 8V11H1L1 13H4V16L6.58632 16ZM10.4147 15L19 15L19 9H16.4148L10.4147 15ZM13.5863 9L7.58632 15L5 15L5 9L13.5863 9Z" fill="currentColor"/>
</g>
<defs>
<clipPath id="clip0_3597_2338">
<rect width="24" height="24" fill="currentColor"/>
</clipPath>
</defs>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_3597_2338)">
<path d="M5 9L19 9V15L5 15L5 9Z" style="fill: var(--automation-device-primary-inverted-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M6.58632 16L3.10104 19.4853H0L0 21.4853H3.92946L9.41475 16L20 16L20 13H23V11H20V8L17.4148 8L21.1929 4.22183L19.7787 2.80762L14.5863 8L4 8V11H1L1 13H4V16L6.58632 16ZM10.4147 15L19 15L19 9H16.4148L10.4147 15ZM13.5863 9L7.58632 15L5 15L5 9L13.5863 9Z" style="fill: var(--automation-device-tertiary-inverted-color)"/>
</g>
<defs>
<clipPath id="clip0_3597_2338">
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