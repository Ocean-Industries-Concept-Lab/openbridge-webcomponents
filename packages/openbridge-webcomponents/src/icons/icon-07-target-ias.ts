import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-07-target-ias')
export class Obi07TargetIas extends LitElement {
  @property({type: Number}) size = 24;
  @property({type: Boolean, attribute: 'use-css-color'}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_20330_314304)">
<path fill-rule="evenodd" clip-rule="evenodd" d="M1.49995 11.1421L13.3631 23.0053L21.2615 2.6194L1.49995 11.1421ZM6.74684 12.1464L12.229 17.6286L15.879 8.20787L6.74684 12.1464Z" fill="currentColor"/>
</g>
<defs>
<clipPath id="clip0_20330_314304">
<rect width="24" height="24" fill="currentColor"/>
</clipPath>
</defs>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_20330_314304)">
<path fill-rule="evenodd" clip-rule="evenodd" d="M1.49995 11.1421L13.3631 23.0053L21.2615 2.6194L1.49995 11.1421ZM6.74684 12.1464L12.229 17.6286L15.879 8.20787L6.74684 12.1464Z" style="fill: var(--element-active-color)"/>
</g>
<defs>
<clipPath id="clip0_20330_314304">
<rect width="24" height="24" fill="none"/>
</clipPath>
</defs>
</svg>
`;

  override render() {
    return html`
      <div class="wrapper" style="--size:${this.size}px">
        ${this.useCssColor ? this.iconCss : this.icon}
      </div>
    `;
  }

  static override styles = css`
    .wrapper {
      height: var(--size);
      width: var(--size);
    }
    .wrapper > * {
      height: 100%;
      width: 100%;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    'obi-07-target-ias': Obi07TargetIas;
  }
}
