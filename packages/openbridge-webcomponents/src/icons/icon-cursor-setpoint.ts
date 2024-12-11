import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-cursor-setpoint')
export class ObiCursorSetpoint extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="32" height="32" viewBox="0 0 32 32" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<g filter="url(#filter0_d_3597_810)">
<path fill-rule="evenodd" clip-rule="evenodd" d="M17.9995 15.9996C17.9995 17.1042 17.1041 17.9996 15.9995 17.9996C14.8949 17.9996 13.9995 17.1042 13.9995 15.9996C13.9995 14.8951 14.8949 13.9996 15.9995 13.9996C17.1041 13.9996 17.9995 14.8951 17.9995 15.9996Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M19.9995 13.9996H23.2301C22.5307 11.4656 20.5336 9.46842 17.9995 8.76906V11.9996L13.9995 11.9996L13.9995 8.76906C11.4655 9.46842 9.46829 11.4656 8.76894 13.9996L11.9995 13.9996L11.9995 17.9996H8.76894C9.46829 20.5337 11.4655 22.5309 13.9995 23.2302V19.9996L17.9995 19.9996V23.2302C20.5336 22.5309 22.5307 20.5337 23.2301 17.9996H19.9995L19.9995 13.9996ZM26.9995 15.9996C26.9995 22.0748 22.0746 26.9996 15.9995 26.9996C9.92438 26.9996 4.99951 22.0748 4.99951 15.9996C4.99951 9.9245 9.92438 4.99963 15.9995 4.99963C22.0746 4.99963 26.9995 9.9245 26.9995 15.9996Z" fill="currentColor"/>
</g>
<path fill-rule="evenodd" clip-rule="evenodd" d="M25.9995 15.9996C25.9995 21.5225 21.5224 25.9996 15.9995 25.9996C10.4767 25.9996 5.99951 21.5225 5.99951 15.9996C5.99951 10.4768 10.4767 5.99963 15.9995 5.99963C21.5224 5.99963 25.9995 10.4768 25.9995 15.9996ZM20.9995 14.9996H24.4413C23.9848 11.1045 20.8947 8.01433 16.9995 7.55784V10.9996L14.9995 10.9996L14.9995 7.55784C11.1043 8.01433 8.0142 11.1045 7.55772 14.9996L10.9995 14.9996L10.9995 16.9996H7.55772C8.0142 20.8948 11.1043 23.9849 14.9995 24.4414V20.9996H16.9995V24.4414C20.8947 23.9849 23.9848 20.8948 24.4413 16.9996H20.9995V14.9996Z" fill="currentColor"/>
<path d="M16.9995 15.9996C16.9995 16.5519 16.5518 16.9996 15.9995 16.9996C15.4472 16.9996 14.9995 16.5519 14.9995 15.9996C14.9995 15.4474 15.4472 14.9996 15.9995 14.9996C16.5518 14.9996 16.9995 15.4474 16.9995 15.9996Z" fill="currentColor"/>
<defs>
<filter id="filter0_d_3597_810" x="3.99951" y="4.99963" width="24" height="24" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feOffset dy="1"/>
<feGaussianBlur stdDeviation="0.5"/>
<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0"/>
<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_3597_810"/>
<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_3597_810" result="shape"/>
</filter>
</defs>
</svg>
`;

  private iconCss = svg`<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
<g filter="url(#filter0_d_3597_810)">
<path fill-rule="evenodd" clip-rule="evenodd" d="M17.9995 15.9996C17.9995 17.1042 17.1041 17.9996 15.9995 17.9996C14.8949 17.9996 13.9995 17.1042 13.9995 15.9996C13.9995 14.8951 14.8949 13.9996 15.9995 13.9996C17.1041 13.9996 17.9995 14.8951 17.9995 15.9996Z" style="fill: var(--element-active-inverted-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M19.9995 13.9996H23.2301C22.5307 11.4656 20.5336 9.46842 17.9995 8.76906V11.9996L13.9995 11.9996L13.9995 8.76906C11.4655 9.46842 9.46829 11.4656 8.76894 13.9996L11.9995 13.9996L11.9995 17.9996H8.76894C9.46829 20.5337 11.4655 22.5309 13.9995 23.2302V19.9996L17.9995 19.9996V23.2302C20.5336 22.5309 22.5307 20.5337 23.2301 17.9996H19.9995L19.9995 13.9996ZM26.9995 15.9996C26.9995 22.0748 22.0746 26.9996 15.9995 26.9996C9.92438 26.9996 4.99951 22.0748 4.99951 15.9996C4.99951 9.9245 9.92438 4.99963 15.9995 4.99963C22.0746 4.99963 26.9995 9.9245 26.9995 15.9996Z" style="fill: var(--element-active-inverted-color)"/>
</g>
<path fill-rule="evenodd" clip-rule="evenodd" d="M25.9995 15.9996C25.9995 21.5225 21.5224 25.9996 15.9995 25.9996C10.4767 25.9996 5.99951 21.5225 5.99951 15.9996C5.99951 10.4768 10.4767 5.99963 15.9995 5.99963C21.5224 5.99963 25.9995 10.4768 25.9995 15.9996ZM20.9995 14.9996H24.4413C23.9848 11.1045 20.8947 8.01433 16.9995 7.55784V10.9996L14.9995 10.9996L14.9995 7.55784C11.1043 8.01433 8.0142 11.1045 7.55772 14.9996L10.9995 14.9996L10.9995 16.9996H7.55772C8.0142 20.8948 11.1043 23.9849 14.9995 24.4414V20.9996H16.9995V24.4414C20.8947 23.9849 23.9848 20.8948 24.4413 16.9996H20.9995V14.9996Z" style="fill: var(--element-active-color)"/>
<path d="M16.9995 15.9996C16.9995 16.5519 16.5518 16.9996 15.9995 16.9996C15.4472 16.9996 14.9995 16.5519 14.9995 15.9996C14.9995 15.4474 15.4472 14.9996 15.9995 14.9996C16.5518 14.9996 16.9995 15.4474 16.9995 15.9996Z" style="fill: var(--element-active-color)"/>
<defs>
<filter id="filter0_d_3597_810" x="3.99951" y="4.99963" width="24" height="24" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feOffset dy="1"/>
<feGaussianBlur stdDeviation="0.5"/>
<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0"/>
<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_3597_810"/>
<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_3597_810" result="shape"/>
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