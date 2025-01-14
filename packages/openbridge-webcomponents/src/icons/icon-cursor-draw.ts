import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-cursor-draw')
export class ObiCursorDraw extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="32" height="32" viewBox="0 0 32 32" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<g filter="url(#filter0_d_2862_744)">
<path fill-rule="evenodd" clip-rule="evenodd" d="M6.66477 0.999999L1 0.999999L1 6.66477L14.4679 20.1071C14.7587 20.398 15.0966 20.6257 15.4786 20.7785C15.8376 20.9221 16.2133 21 16.6 21C16.9952 21 17.3795 20.9252 17.7449 20.774C18.1192 20.6191 18.446 20.3884 18.7209 20.0933L20.0933 18.7209C20.3884 18.446 20.6191 18.1192 20.774 17.7449C20.9252 17.3795 21 16.9952 21 16.6C21 16.2133 20.9221 15.8376 20.7785 15.4786C20.6258 15.0969 20.3976 14.7586 20.1071 14.4679L6.66477 0.999999Z" fill="currentColor"/>
</g>
<path d="M2 2L6.25 2L19.4 15.175C19.6 15.375 19.75 15.6 19.85 15.85C19.95 16.1 20 16.35 20 16.6C20 16.8667 19.95 17.1208 19.85 17.3625C19.75 17.6042 19.6 17.8167 19.4 18L18 19.4C17.8167 19.6 17.6042 19.75 17.3625 19.85C17.1208 19.95 16.8667 20 16.6 20C16.35 20 16.1 19.95 15.85 19.85C15.6 19.75 15.375 19.6 15.175 19.4L2 6.25L2 2ZM4 4L4 5.4L8.9 10.3125L13.8 15.225L14.525 14.525L15.225 13.8L5.4 4L4 4ZM14.525 14.525L15.225 13.8L13.8 15.225L14.525 14.525Z" fill="currentColor"/>
<defs>
<filter id="filter0_d_2862_744" x="0" y="1" width="22" height="22" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feOffset dy="1"/>
<feGaussianBlur stdDeviation="0.5"/>
<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0"/>
<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_2862_744"/>
<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_2862_744" result="shape"/>
</filter>
</defs>
</svg>
`;

  private iconCss = svg`<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
<g filter="url(#filter0_d_2862_744)">
<path fill-rule="evenodd" clip-rule="evenodd" d="M6.66477 0.999999L1 0.999999L1 6.66477L14.4679 20.1071C14.7587 20.398 15.0966 20.6257 15.4786 20.7785C15.8376 20.9221 16.2133 21 16.6 21C16.9952 21 17.3795 20.9252 17.7449 20.774C18.1192 20.6191 18.446 20.3884 18.7209 20.0933L20.0933 18.7209C20.3884 18.446 20.6191 18.1192 20.774 17.7449C20.9252 17.3795 21 16.9952 21 16.6C21 16.2133 20.9221 15.8376 20.7785 15.4786C20.6258 15.0969 20.3976 14.7586 20.1071 14.4679L6.66477 0.999999Z" fill="none"/>
</g>
<path d="M2 2L6.25 2L19.4 15.175C19.6 15.375 19.75 15.6 19.85 15.85C19.95 16.1 20 16.35 20 16.6C20 16.8667 19.95 17.1208 19.85 17.3625C19.75 17.6042 19.6 17.8167 19.4 18L18 19.4C17.8167 19.6 17.6042 19.75 17.3625 19.85C17.1208 19.95 16.8667 20 16.6 20C16.35 20 16.1 19.95 15.85 19.85C15.6 19.75 15.375 19.6 15.175 19.4L2 6.25L2 2ZM4 4L4 5.4L8.9 10.3125L13.8 15.225L14.525 14.525L15.225 13.8L5.4 4L4 4ZM14.525 14.525L15.225 13.8L13.8 15.225L14.525 14.525Z" style="fill: var(--element-active-color)"/>
<defs>
<filter id="filter0_d_2862_744" x="0" y="1" width="22" height="22" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feOffset dy="1"/>
<feGaussianBlur stdDeviation="0.5"/>
<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0"/>
<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_2862_744"/>
<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_2862_744" result="shape"/>
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
    'obi-cursor-draw': ObiCursorDraw;
  }
}