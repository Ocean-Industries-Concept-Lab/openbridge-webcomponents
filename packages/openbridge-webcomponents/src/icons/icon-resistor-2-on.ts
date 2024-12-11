import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-resistor-2-on')
export class ObiResistor2On extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_3597_2502)">
<path d="M5 9L19 9V15L5 15L5 9Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M16 2L13 2V0L11 0L11 2L8 2L12 8L4 8V11H1L1 13H4L4 16L20 16V13H23L23 11H20V8L12 8L16 2ZM5 15L5 9L19 9L19 15L5 15Z" fill="currentColor"/>
</g>
<defs>
<clipPath id="clip0_3597_2502">
<rect width="24" height="24" fill="currentColor"/>
</clipPath>
</defs>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_3597_2502)">
<path d="M5 9L19 9V15L5 15L5 9Z" style="fill: var(--automation-device-primary-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M16 2L13 2V0L11 0L11 2L8 2L12 8L4 8V11H1L1 13H4L4 16L20 16V13H23L23 11H20V8L12 8L16 2ZM5 15L5 9L19 9L19 15L5 15Z" style="fill: var(--automation-device-tertiary-color)"/>
</g>
<defs>
<clipPath id="clip0_3597_2502">
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
    'obi-resistor-2-on': ObiResistor2On;
  }
}
