import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-09-pipe-cross')
export class Obi09PipeCross extends LitElement {
  @property({type: Boolean, attribute: 'use-css-color'}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_20141_405718)">
<path d="M11 11V0H13V11H24V13H13V24H11V13H0V11H11Z" fill="currentColor"/>
</g>
<defs>
<clipPath id="clip0_20141_405718">
<rect width="24" height="24" fill="currentColor"/>
</clipPath>
</defs>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_20141_405718)">
<path d="M11 11V0H13V11H24V13H13V24H11V13H0V11H11Z" style="fill: var(--element-active-color)"/>
</g>
<defs>
<clipPath id="clip0_20141_405718">
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
    'obi-09-pipe-cross': Obi09PipeCross;
  }
}
