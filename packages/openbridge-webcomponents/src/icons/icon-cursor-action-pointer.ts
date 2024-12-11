import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-cursor-action-pointer')
export class ObiCursorActionPointer extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="33" height="32" viewBox="0 0 33 32" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<g filter="url(#filter0_d_3597_848)">
<path fill-rule="evenodd" clip-rule="evenodd" d="M6.58114 17.1622L1 0.418823L17.7434 5.99996L9.37171 8.79053L6.58114 17.1622Z" fill="currentColor"/>
</g>
<path d="M6.58118 14L2.58118 2L14.5812 6L8.58118 8L6.58118 14Z" fill="currentColor"/>
<defs>
<filter id="filter0_d_3597_848" x="0" y="0.418823" width="18.7434" height="18.7434" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feOffset dy="1"/>
<feGaussianBlur stdDeviation="0.5"/>
<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0"/>
<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_3597_848"/>
<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_3597_848" result="shape"/>
</filter>
</defs>
</svg>
`;

  private iconCss = svg`<svg width="33" height="32" viewBox="0 0 33 32" fill="none" xmlns="http://www.w3.org/2000/svg">
<g filter="url(#filter0_d_3597_848)">
<path fill-rule="evenodd" clip-rule="evenodd" d="M6.58114 17.1622L1 0.418823L17.7434 5.99996L9.37171 8.79053L6.58114 17.1622Z" style="fill: var(--element-active-inverted-color)"/>
</g>
<path d="M6.58118 14L2.58118 2L14.5812 6L8.58118 8L6.58118 14Z" style="fill: var(--element-active-color)"/>
<defs>
<filter id="filter0_d_3597_848" x="0" y="0.418823" width="18.7434" height="18.7434" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feOffset dy="1"/>
<feGaussianBlur stdDeviation="0.5"/>
<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0"/>
<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_3597_848"/>
<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_3597_848" result="shape"/>
</filter>
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
    'obi-cursor-action-pointer': ObiCursorActionPointer;
  }
}