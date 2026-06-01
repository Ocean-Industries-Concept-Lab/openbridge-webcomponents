import {LitElement, html, css, svg} from 'lit';
import {property} from 'lit/decorators.js';
import {customElement} from '../decorator.js';

@customElement('obi-hydraulic-15-static')
export class ObiHydraulic15Static extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_8040_1472)">
<path fill-rule="evenodd" clip-rule="evenodd" d="M0 0V24H24V0H0ZM11 23H1L1 1H11V7H9V9H15V7H13V1L23 1V23H13V17H15V15H9V17H11V23Z" fill="currentColor"/>
</g>
<defs>
<clipPath id="clip0_8040_1472">
<rect width="24" height="24" fill="currentColor"/>
</clipPath>
</defs>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_8040_1472)">
<path fill-rule="evenodd" clip-rule="evenodd" d="M0 0V24H24V0H0ZM11 23H1L1 1H11V7H9V9H15V7H13V1L23 1V23H13V17H15V15H9V17H11V23Z" style="fill: var(--automation-device-secondary-color)"/>
</g>
<defs>
<clipPath id="clip0_8040_1472">
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
    'obi-hydraulic-15-static': ObiHydraulic15Static;
  }
}
