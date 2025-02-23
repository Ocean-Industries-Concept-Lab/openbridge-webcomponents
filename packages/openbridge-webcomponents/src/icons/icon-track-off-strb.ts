import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-track-off-strb')
export class ObiTrackOffStrb extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M20.5608 12.0075C19.6204 12.0659 18.6991 12.455 17.9825 13.1716L13.8284 17.3257L15.2426 18.7399L19.3967 14.5858C20.1133 13.8692 20.5024 12.9479 20.5608 12.0075ZM22.3647 10.2036C20.363 9.66907 18.1387 10.187 16.5683 11.7574L11 17.3257L15.2426 21.5683L20.8109 16C22.3813 14.4296 22.8992 12.2053 22.3647 10.2036Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M16.4572 8.95719L14.9572 10.4572L13.543 9.04298L15.043 7.54298L16.4572 8.95719ZM19.4572 5.95719L17.9572 7.45719L16.543 6.04298L18.043 4.54297L19.4572 5.95719ZM22.4572 2.95718L20.9572 4.45718L19.543 3.04297L21.043 1.54297L22.4572 2.95718Z" fill="currentColor"/>
<path d="M1.54297 21.043L2.95718 22.4572L13.4572 11.9572L12.043 10.543L1.54297 21.043Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M20.5608 12.0075C19.6204 12.0659 18.6991 12.455 17.9825 13.1716L13.8284 17.3257L15.2426 18.7399L19.3967 14.5858C20.1133 13.8692 20.5024 12.9479 20.5608 12.0075ZM22.3647 10.2036C20.363 9.66907 18.1387 10.187 16.5683 11.7574L11 17.3257L15.2426 21.5683L20.8109 16C22.3813 14.4296 22.8992 12.2053 22.3647 10.2036Z" style="fill: var(--element-active-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M16.4572 8.95719L14.9572 10.4572L13.543 9.04298L15.043 7.54298L16.4572 8.95719ZM19.4572 5.95719L17.9572 7.45719L16.543 6.04298L18.043 4.54297L19.4572 5.95719ZM22.4572 2.95718L20.9572 4.45718L19.543 3.04297L21.043 1.54297L22.4572 2.95718Z" style="fill: var(--element-active-color)"/>
<path d="M1.54297 21.043L2.95718 22.4572L13.4572 11.9572L12.043 10.543L1.54297 21.043Z" style="fill: var(--element-active-color)"/>
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
    'obi-track-off-strb': ObiTrackOffStrb;
  }
}
