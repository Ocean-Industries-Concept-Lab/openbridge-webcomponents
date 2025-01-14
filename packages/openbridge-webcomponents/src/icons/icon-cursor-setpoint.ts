import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-cursor-setpoint')
export class ObiCursorSetpoint extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="32" height="32" viewBox="0 0 32 32" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<g filter="url(#filter0_d_2002_519)">
<path fill-rule="evenodd" clip-rule="evenodd" d="M17.9996 15.9996C17.9996 17.1042 17.1041 17.9996 15.9996 17.9996C14.895 17.9996 13.9996 17.1042 13.9996 15.9996C13.9996 14.8951 14.895 13.9996 15.9996 13.9996C17.1041 13.9996 17.9996 14.8951 17.9996 15.9996Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M19.9996 13.9996H23.2301C22.5308 11.4656 20.5336 9.46842 17.9996 8.76906V11.9996H13.9996V8.76906C11.4655 9.46842 9.46834 11.4656 8.76898 13.9996H11.9996V17.9996H8.76898C9.46834 20.5337 11.4655 22.5309 13.9996 23.2302V19.9996H17.9996V23.2302C20.5336 22.5309 22.5308 20.5337 23.2301 17.9996H19.9996V13.9996ZM26.9996 15.9996C26.9996 22.0748 22.0747 26.9996 15.9996 26.9996C9.92443 26.9996 4.99956 22.0748 4.99956 15.9996C4.99956 9.9245 9.92443 4.99963 15.9996 4.99963C22.0747 4.99963 26.9996 9.9245 26.9996 15.9996Z" fill="currentColor"/>
</g>
<path fill-rule="evenodd" clip-rule="evenodd" d="M25.9996 15.9996C25.9996 21.5225 21.5224 25.9996 15.9996 25.9996C10.4767 25.9996 5.99956 21.5225 5.99956 15.9996C5.99956 10.4768 10.4767 5.99963 15.9996 5.99963C21.5224 5.99963 25.9996 10.4768 25.9996 15.9996ZM20.9996 14.9996H24.4414C23.9849 11.1045 20.8947 8.01433 16.9996 7.55784V10.9996H14.9996V7.55784C11.1044 8.01433 8.01425 11.1045 7.55776 14.9996H10.9996V16.9996H7.55776C8.01425 20.8948 11.1044 23.9849 14.9996 24.4414V20.9996H16.9996V24.4414C20.8947 23.9849 23.9849 20.8948 24.4414 16.9996H20.9996V14.9996Z" fill="currentColor"/>
<path d="M16.9996 15.9996C16.9996 16.5519 16.5518 16.9996 15.9996 16.9996C15.4473 16.9996 14.9996 16.5519 14.9996 15.9996C14.9996 15.4473 15.4473 14.9996 15.9996 14.9996C16.5518 14.9996 16.9996 15.4473 16.9996 15.9996Z" fill="currentColor"/>
<defs>
<filter id="filter0_d_2002_519" x="3.99956" y="4.99963" width="24" height="24" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feOffset dy="1"/>
<feGaussianBlur stdDeviation="0.5"/>
<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0"/>
<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_2002_519"/>
<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_2002_519" result="shape"/>
</filter>
</defs>
</svg>
`;

  private iconCss = svg`<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
<g filter="url(#filter0_d_2002_519)">
<path fill-rule="evenodd" clip-rule="evenodd" d="M17.9996 15.9996C17.9996 17.1042 17.1041 17.9996 15.9996 17.9996C14.895 17.9996 13.9996 17.1042 13.9996 15.9996C13.9996 14.8951 14.895 13.9996 15.9996 13.9996C17.1041 13.9996 17.9996 14.8951 17.9996 15.9996Z" style="fill: var(--element-active-inverted-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M19.9996 13.9996H23.2301C22.5308 11.4656 20.5336 9.46842 17.9996 8.76906V11.9996H13.9996V8.76906C11.4655 9.46842 9.46834 11.4656 8.76898 13.9996H11.9996V17.9996H8.76898C9.46834 20.5337 11.4655 22.5309 13.9996 23.2302V19.9996H17.9996V23.2302C20.5336 22.5309 22.5308 20.5337 23.2301 17.9996H19.9996V13.9996ZM26.9996 15.9996C26.9996 22.0748 22.0747 26.9996 15.9996 26.9996C9.92443 26.9996 4.99956 22.0748 4.99956 15.9996C4.99956 9.9245 9.92443 4.99963 15.9996 4.99963C22.0747 4.99963 26.9996 9.9245 26.9996 15.9996Z" style="fill: var(--element-active-inverted-color)"/>
</g>
<path fill-rule="evenodd" clip-rule="evenodd" d="M25.9996 15.9996C25.9996 21.5225 21.5224 25.9996 15.9996 25.9996C10.4767 25.9996 5.99956 21.5225 5.99956 15.9996C5.99956 10.4768 10.4767 5.99963 15.9996 5.99963C21.5224 5.99963 25.9996 10.4768 25.9996 15.9996ZM20.9996 14.9996H24.4414C23.9849 11.1045 20.8947 8.01433 16.9996 7.55784V10.9996H14.9996V7.55784C11.1044 8.01433 8.01425 11.1045 7.55776 14.9996H10.9996V16.9996H7.55776C8.01425 20.8948 11.1044 23.9849 14.9996 24.4414V20.9996H16.9996V24.4414C20.8947 23.9849 23.9849 20.8948 24.4414 16.9996H20.9996V14.9996Z" style="fill: var(--element-active-color)"/>
<path d="M16.9996 15.9996C16.9996 16.5519 16.5518 16.9996 15.9996 16.9996C15.4473 16.9996 14.9996 16.5519 14.9996 15.9996C14.9996 15.4473 15.4473 14.9996 15.9996 14.9996C16.5518 14.9996 16.9996 15.4473 16.9996 15.9996Z" style="fill: var(--element-active-color)"/>
<defs>
<filter id="filter0_d_2002_519" x="3.99956" y="4.99963" width="24" height="24" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feOffset dy="1"/>
<feGaussianBlur stdDeviation="0.5"/>
<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0"/>
<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_2002_519"/>
<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_2002_519" result="shape"/>
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
    'obi-cursor-setpoint': ObiCursorSetpoint;
  }
}