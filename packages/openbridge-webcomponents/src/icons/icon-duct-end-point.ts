import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-duct-end-point')
export class ObiDuctEndPoint extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M6 6L6 1L18 1L18 23H6L6 18L0 18L5.24537e-07 6L6 6Z" fill="currentColor"/>
<path d="M7 22H17L17 2L7 2V7L4.80825e-07 7L5.24537e-07 6L6 6L6 1L18 1V23H6L6 18L0 18L4.37112e-08 17L7 17L7 22Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M6 6L6 1L18 1L18 23H6L6 18L0 18L5.24537e-07 6L6 6Z" style="fill: var(--automation-pipes-primary-color)"/>
<path d="M7 22H17L17 2L7 2V7L4.80825e-07 7L5.24537e-07 6L6 6L6 1L18 1V23H6L6 18L0 18L4.37112e-08 17L7 17L7 22Z" style="fill: var(--automation-pipes-tertiary-color)"/>
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
    'obi-duct-end-point': ObiDuctEndPoint;
  }
}