import {LitElement, html, css, svg} from 'lit';
import {property} from 'lit/decorators.js';
import {customElement} from '../decorator.js';

@customElement('obi-cursor-not-allowed')
export class ObiCursorNotAllowed extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="38" height="38" viewBox="0 0 38 38" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<g filter="url(#filter0_dd_5158_4397)">
<path d="M9.68792 19.9634L4.04458 3.03343L20.9746 8.67677L12.5096 11.4984L9.68792 19.9634Z" fill-rule="evenodd" clip-rule="evenodd" fill="currentColor"/>
<path d="M29.9108 21.8216C29.9108 17.9126 26.7419 14.7436 22.8328 14.7436C21.6129 14.7436 20.4664 15.0516 19.4653 15.5942L29.0602 25.1891C29.6029 24.188 29.9108 23.0416 29.9108 21.8216ZM29.802 25.9309C30.5136 24.7266 30.9219 23.3218 30.9219 21.8216C30.9219 17.3541 27.3003 13.7325 22.8328 13.7325C21.3326 13.7325 19.9279 14.1409 18.7236 14.8525C18.4272 15.0276 18.143 15.2211 17.8725 15.4314L29.2231 26.782C29.4334 26.5115 29.6269 26.2272 29.802 25.9309ZM15.7548 21.8216C15.7548 25.7307 18.9237 28.8997 22.8328 28.8997C24.0527 28.8997 25.1992 28.5917 26.2003 28.0491L16.6054 18.4542C16.0627 19.4553 15.7548 20.6017 15.7548 21.8216ZM15.8636 17.7124C16.0387 17.4161 16.2322 17.1318 16.4425 16.8613L27.7931 28.2119C27.5226 28.4222 27.2384 28.6157 26.942 28.7908C25.7377 29.5024 24.3329 29.9108 22.8328 29.9108C18.3653 29.9108 14.7436 26.2892 14.7436 21.8216C14.7436 20.3215 15.152 18.9167 15.8636 17.7124ZM33.9554 21.8216C33.9554 27.9645 28.9756 32.9442 22.8328 32.9442C16.69 32.9442 11.7102 27.9645 11.7102 21.8216C11.7102 15.6788 16.69 10.6991 22.8328 10.6991C28.9756 10.6991 33.9554 15.6788 33.9554 21.8216ZM32.9442 21.8216C32.9442 27.406 28.4172 31.9331 22.8328 31.9331C17.2484 31.9331 12.7213 27.406 12.7213 21.8216C12.7213 16.2373 17.2484 11.7102 22.8328 11.7102C28.4172 11.7102 32.9442 16.2373 32.9442 21.8216Z" fill-rule="evenodd" clip-rule="evenodd" fill="currentColor"/>
</g>
<path d="M9.68792 16.766L5.64334 4.63223L17.7771 8.67681L11.7102 10.6991L9.68792 16.766Z" fill="currentColor"/>
<path d="M22.8328 31.9331C28.4172 31.9331 32.9442 27.4061 32.9442 21.8217C32.9442 16.2373 28.4172 11.7102 22.8328 11.7102C17.2484 11.7102 12.7213 16.2373 12.7213 21.8217C12.7213 27.4061 17.2484 31.9331 22.8328 31.9331ZM22.8328 29.9108C18.3653 29.9108 14.7436 26.2892 14.7436 21.8217C14.7436 19.9524 15.3777 18.2312 16.4425 16.8614L27.7931 28.212C26.4233 29.2768 24.7021 29.9108 22.8328 29.9108ZM30.9219 21.8217C30.9219 17.3542 27.3003 13.7325 22.8328 13.7325C20.9635 13.7325 19.2423 14.3666 17.8725 15.4314L29.2231 26.782C30.2879 25.4122 30.9219 23.691 30.9219 21.8217Z" fill-rule="evenodd" clip-rule="evenodd" fill="currentColor"/>
<defs>
<filter id="filter0_dd_5158_4397" x="0" y="0" width="38" height="38" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feOffset dy="1"/>
<feGaussianBlur stdDeviation="1"/>
<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.23 0"/>
<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_5158_4397"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feOffset dy="1"/>
<feGaussianBlur stdDeviation="2"/>
<feComposite in2="hardAlpha" operator="out"/>
<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"/>
<feBlend mode="normal" in2="effect1_dropShadow_5158_4397" result="effect2_dropShadow_5158_4397"/>
<feBlend mode="normal" in="SourceGraphic" in2="effect2_dropShadow_5158_4397" result="shape"/>
</filter>
</defs>
</svg>
`;

  private iconCss = svg`<svg width="38" height="38" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
<g filter="url(#filter0_dd_5158_4397)">
<path d="M9.68792 19.9634L4.04458 3.03343L20.9746 8.67677L12.5096 11.4984L9.68792 19.9634Z" fill-rule="evenodd" clip-rule="evenodd" style="fill: var(--element-active-inverted-color)"/>
<path d="M29.9108 21.8216C29.9108 17.9126 26.7419 14.7436 22.8328 14.7436C21.6129 14.7436 20.4664 15.0516 19.4653 15.5942L29.0602 25.1891C29.6029 24.188 29.9108 23.0416 29.9108 21.8216ZM29.802 25.9309C30.5136 24.7266 30.9219 23.3218 30.9219 21.8216C30.9219 17.3541 27.3003 13.7325 22.8328 13.7325C21.3326 13.7325 19.9279 14.1409 18.7236 14.8525C18.4272 15.0276 18.143 15.2211 17.8725 15.4314L29.2231 26.782C29.4334 26.5115 29.6269 26.2272 29.802 25.9309ZM15.7548 21.8216C15.7548 25.7307 18.9237 28.8997 22.8328 28.8997C24.0527 28.8997 25.1992 28.5917 26.2003 28.0491L16.6054 18.4542C16.0627 19.4553 15.7548 20.6017 15.7548 21.8216ZM15.8636 17.7124C16.0387 17.4161 16.2322 17.1318 16.4425 16.8613L27.7931 28.2119C27.5226 28.4222 27.2384 28.6157 26.942 28.7908C25.7377 29.5024 24.3329 29.9108 22.8328 29.9108C18.3653 29.9108 14.7436 26.2892 14.7436 21.8216C14.7436 20.3215 15.152 18.9167 15.8636 17.7124ZM33.9554 21.8216C33.9554 27.9645 28.9756 32.9442 22.8328 32.9442C16.69 32.9442 11.7102 27.9645 11.7102 21.8216C11.7102 15.6788 16.69 10.6991 22.8328 10.6991C28.9756 10.6991 33.9554 15.6788 33.9554 21.8216ZM32.9442 21.8216C32.9442 27.406 28.4172 31.9331 22.8328 31.9331C17.2484 31.9331 12.7213 27.406 12.7213 21.8216C12.7213 16.2373 17.2484 11.7102 22.8328 11.7102C28.4172 11.7102 32.9442 16.2373 32.9442 21.8216Z" fill-rule="evenodd" clip-rule="evenodd" style="fill: var(--element-active-inverted-color)"/>
</g>
<path d="M9.68792 16.766L5.64334 4.63223L17.7771 8.67681L11.7102 10.6991L9.68792 16.766Z" style="fill: var(--element-active-color)"/>
<path d="M22.8328 31.9331C28.4172 31.9331 32.9442 27.4061 32.9442 21.8217C32.9442 16.2373 28.4172 11.7102 22.8328 11.7102C17.2484 11.7102 12.7213 16.2373 12.7213 21.8217C12.7213 27.4061 17.2484 31.9331 22.8328 31.9331ZM22.8328 29.9108C18.3653 29.9108 14.7436 26.2892 14.7436 21.8217C14.7436 19.9524 15.3777 18.2312 16.4425 16.8614L27.7931 28.212C26.4233 29.2768 24.7021 29.9108 22.8328 29.9108ZM30.9219 21.8217C30.9219 17.3542 27.3003 13.7325 22.8328 13.7325C20.9635 13.7325 19.2423 14.3666 17.8725 15.4314L29.2231 26.782C30.2879 25.4122 30.9219 23.691 30.9219 21.8217Z" fill-rule="evenodd" clip-rule="evenodd" style="fill: var(--element-active-color)"/>
<defs>
<filter id="filter0_dd_5158_4397" x="0" y="0" width="38" height="38" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feOffset dy="1"/>
<feGaussianBlur stdDeviation="1"/>
<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.23 0"/>
<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_5158_4397"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feOffset dy="1"/>
<feGaussianBlur stdDeviation="2"/>
<feComposite in2="hardAlpha" operator="out"/>
<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"/>
<feBlend mode="normal" in2="effect1_dropShadow_5158_4397" result="effect2_dropShadow_5158_4397"/>
<feBlend mode="normal" in="SourceGraphic" in2="effect2_dropShadow_5158_4397" result="shape"/>
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
    'obi-cursor-not-allowed': ObiCursorNotAllowed;
  }
}
