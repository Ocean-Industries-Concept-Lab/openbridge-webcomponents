import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-cursor-map')
export class ObiCursorMap extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="32" height="32" viewBox="0 0 32 32" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<g filter="url(#filter0_d_3597_851)">
<path fill-rule="evenodd" clip-rule="evenodd" d="M14 10H18V13.9999L22 14V17.9999H18L18 22H14V17.9999H10V14L14 13.9999V10Z" fill="currentColor"/>
</g>
<path fill-rule="evenodd" clip-rule="evenodd" d="M17 11H15V14.9999L11 15V16.9999H15V21H17L17 16.9999H21V15L17 14.9999V11Z" fill="currentColor"/>
<defs>
<filter id="filter0_d_3597_851" x="9" y="10" width="14" height="14" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feOffset dy="1"/>
<feGaussianBlur stdDeviation="0.5"/>
<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0"/>
<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_3597_851"/>
<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_3597_851" result="shape"/>
</filter>
</defs>
</svg>
`;

  private iconCss = svg`<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
<g filter="url(#filter0_d_3597_851)">
<path fill-rule="evenodd" clip-rule="evenodd" d="M14 10H18V13.9999L22 14V17.9999H18L18 22H14V17.9999H10V14L14 13.9999V10Z" style="fill: var(--element-active-inverted-color)"/>
</g>
<path fill-rule="evenodd" clip-rule="evenodd" d="M17 11H15V14.9999L11 15V16.9999H15V21H17L17 16.9999H21V15L17 14.9999V11Z" style="fill: var(--element-active-color)"/>
<defs>
<filter id="filter0_d_3597_851" x="9" y="10" width="14" height="14" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feOffset dy="1"/>
<feGaussianBlur stdDeviation="0.5"/>
<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0"/>
<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_3597_851"/>
<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_3597_851" result="shape"/>
</filter>
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
    'obi-cursor-map': ObiCursorMap;
  }
}
