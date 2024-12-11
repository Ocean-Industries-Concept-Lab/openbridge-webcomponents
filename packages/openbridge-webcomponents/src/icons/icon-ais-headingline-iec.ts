import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-ais-headingline-iec')
export class ObiAisHeadinglineIec extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_3597_3932)">
<path fill-rule="evenodd" clip-rule="evenodd" d="M11.5 6L11.5 0L12.5 4.37121e-08L12.5 6H11.5Z" fill="currentColor"/>
</g>
<defs>
<clipPath id="clip0_3597_3932">
<rect width="24" height="24" fill="currentColor"/>
</clipPath>
</defs>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_3597_3932)">
<path fill-rule="evenodd" clip-rule="evenodd" d="M11.5 6L11.5 0L12.5 4.37121e-08L12.5 6H11.5Z" fill="currentColor"/>
</g>
<defs>
<clipPath id="clip0_3597_3932">
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
    'obi-ais-headingline-iec': ObiAisHeadinglineIec;
  }
}