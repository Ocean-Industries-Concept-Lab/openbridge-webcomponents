import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-cursor-pointer')
export class ObiCursorPointer extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="33" height="33" viewBox="0 0 33 33" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<g filter="url(#filter0_d_2002_517)">
<path fill-rule="evenodd" clip-rule="evenodd" d="M15.4563 11.0282L10.1866 11.7874L12.8036 16.3202L9.2644 18.3635L6.64743 13.8308L3.35504 18.0149L1.02166 0L15.4563 11.0282Z" fill="currentColor"/>
</g>
<path d="M12.9038 10.3638L2.34983 2.30049L4.05588 15.4721L6.7777 12.0131L9.63836 16.9679L11.4079 15.9463L8.54728 10.9914L12.9038 10.3638Z" fill="currentColor"/>
<defs>
<filter id="filter0_d_2002_517" x="0" y="0" width="16.478" height="20.4069" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feOffset dy="1"/>
<feGaussianBlur stdDeviation="0.5"/>
<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0"/>
<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_2002_517"/>
<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_2002_517" result="shape"/>
</filter>
</defs>
</svg>
`;

  private iconCss = svg`<svg width="33" height="33" viewBox="0 0 33 33" fill="none" xmlns="http://www.w3.org/2000/svg">
<g filter="url(#filter0_d_2002_517)">
<path fill-rule="evenodd" clip-rule="evenodd" d="M15.4563 11.0282L10.1866 11.7874L12.8036 16.3202L9.2644 18.3635L6.64743 13.8308L3.35504 18.0149L1.02166 0L15.4563 11.0282Z" style="fill: var(--element-active-inverted-color)"/>
</g>
<path d="M12.9038 10.3638L2.34983 2.30049L4.05588 15.4721L6.7777 12.0131L9.63836 16.9679L11.4079 15.9463L8.54728 10.9914L12.9038 10.3638Z" style="fill: var(--element-active-color)"/>
<defs>
<filter id="filter0_d_2002_517" x="0" y="0" width="16.478" height="20.4069" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feOffset dy="1"/>
<feGaussianBlur stdDeviation="0.5"/>
<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0"/>
<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_2002_517"/>
<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_2002_517" result="shape"/>
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
    'obi-cursor-pointer': ObiCursorPointer;
  }
}
