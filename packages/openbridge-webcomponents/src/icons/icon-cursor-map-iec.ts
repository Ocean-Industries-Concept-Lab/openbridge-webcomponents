import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-cursor-map-iec')
export class ObiCursorMapIec extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="32" height="32" viewBox="0 0 32 32" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<g filter="url(#filter0_d_2002_523)">
<path fill-rule="evenodd" clip-rule="evenodd" d="M6.00013 14H14V6H18V14H14L14.0001 18H18V26H14L14.0001 18H5.99995L6.00013 14ZM18 18H26V14H18V18Z" fill="currentColor"/>
</g>
<path d="M7.00009 15H13.0001V17H7L7.00009 15Z" fill="currentColor"/>
<path d="M19 15H25V17H19V15Z" fill="currentColor"/>
<path d="M15 25V19H17V25H15Z" fill="currentColor"/>
<path d="M15 13V7H17V13H15Z" fill="currentColor"/>
<defs>
<filter id="filter0_d_2002_523" x="4.99995" y="6" width="22" height="22" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feOffset dy="1"/>
<feGaussianBlur stdDeviation="0.5"/>
<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0"/>
<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_2002_523"/>
<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_2002_523" result="shape"/>
</filter>
</defs>
</svg>
`;

  private iconCss = svg`<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
<g filter="url(#filter0_d_2002_523)">
<path fill-rule="evenodd" clip-rule="evenodd" d="M6.00013 14H14V6H18V14H14L14.0001 18H18V26H14L14.0001 18H5.99995L6.00013 14ZM18 18H26V14H18V18Z" style="fill: var(--element-active-inverted-color)"/>
</g>
<path d="M7.00009 15H13.0001V17H7L7.00009 15Z" style="fill: var(--element-active-color)"/>
<path d="M19 15H25V17H19V15Z" style="fill: var(--element-active-color)"/>
<path d="M15 25V19H17V25H15Z" style="fill: var(--element-active-color)"/>
<path d="M15 13V7H17V13H15Z" style="fill: var(--element-active-color)"/>
<defs>
<filter id="filter0_d_2002_523" x="4.99995" y="6" width="22" height="22" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feOffset dy="1"/>
<feGaussianBlur stdDeviation="0.5"/>
<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0"/>
<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_2002_523"/>
<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_2002_523" result="shape"/>
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
    'obi-cursor-map-iec': ObiCursorMapIec;
  }
}
