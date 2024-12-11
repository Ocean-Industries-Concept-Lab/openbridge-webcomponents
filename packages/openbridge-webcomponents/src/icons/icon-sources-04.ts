import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-sources-04')
export class ObiSources04 extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_3597_2490)">
<path fill-rule="evenodd" clip-rule="evenodd" d="M12.0001 24.0001L0 12L12 0L24.0001 12.0001L12.0001 24.0001ZM11 3.82843L2.82843 12L11 20.1716L11 3.82843ZM13 20.1717L21.1716 12.0001L13 3.82842L13 20.1717Z" fill="currentColor"/>
</g>
<defs>
<clipPath id="clip0_3597_2490">
<rect width="24" height="24" fill="currentColor"/>
</clipPath>
</defs>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_3597_2490)">
<path fill-rule="evenodd" clip-rule="evenodd" d="M12.0001 24.0001L0 12L12 0L24.0001 12.0001L12.0001 24.0001ZM11 3.82843L2.82843 12L11 20.1716L11 3.82843ZM13 20.1717L21.1716 12.0001L13 3.82842L13 20.1717Z" style="fill: var(--automation-device-secondary-color)"/>
</g>
<defs>
<clipPath id="clip0_3597_2490">
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
    'obi-sources-04': ObiSources04;
  }
}