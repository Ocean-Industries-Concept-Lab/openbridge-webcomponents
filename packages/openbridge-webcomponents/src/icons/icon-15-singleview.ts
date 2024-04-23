import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-15-singleview')
export class Obi15Singleview extends LitElement {
  @property({type: Boolean, attribute: 'use-css-color'}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<mask id="mask0_29002_245344" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
<rect width="24" height="24" fill="currentColor"/>
</mask>
<g mask="url(#mask0_29002_245344)">
<path d="M2 7H6V17H2V7ZM7 5H17V19H7V5ZM18 7H22V17H18V7ZM9 7V17H15V7H9Z" fill="currentColor"/>
</g>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<mask id="mask0_29002_245344" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
<rect width="24" height="24" fill="currentColor"/>
</mask>
<g mask="url(#mask0_29002_245344)">
<path d="M2 7H6V17H2V7ZM7 5H17V19H7V5ZM18 7H22V17H18V7ZM9 7V17H15V7H9Z" style="fill: var(--element-active-color)"/>
</g>
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
    'obi-15-singleview': Obi15Singleview;
  }
}
