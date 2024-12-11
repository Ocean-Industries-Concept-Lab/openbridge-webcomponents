import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-clear-polartwilight')
export class ObiClearPolartwilight extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="32" height="32" viewBox="0 0 32 32" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M3.33329 11.3333C2.9651 11.3333 2.66663 11.6317 2.66663 11.9999C2.66663 12.3681 2.9651 12.6666 3.33329 12.6666H6.84966C6.84966 12.8967 6.7557 13.1268 6.56779 13.293L3.61628 15.9025C3.06962 16.3859 3.36258 17.2915 4.08768 17.3598L8.00261 17.7284C8.50112 17.7754 8.84534 18.2513 8.73574 18.742L7.87502 22.5957C7.7156 23.3094 8.4826 23.8692 9.10917 23.4963L12.4921 21.4832C12.9229 21.2269 13.4799 21.4087 13.6784 21.8704L15.2372 25.4962C15.5259 26.1678 16.474 26.1678 16.7627 25.4962L18.3215 21.8704C18.52 21.4087 19.077 21.2269 19.5078 21.4832L22.8907 23.4963C23.5173 23.8692 24.2843 23.3094 24.1249 22.5957L23.2642 18.742C23.1546 18.2513 23.4988 17.7754 23.9973 17.7284L27.9122 17.3598C28.6373 17.2915 28.9303 16.3859 28.3836 15.9025L25.4321 13.293C25.2442 13.1268 25.1503 12.8967 25.1503 12.6666H28.6666C29.0348 12.6666 29.3333 12.3681 29.3333 11.9999C29.3333 11.6317 29.0348 11.3333 28.6666 11.3333H3.33329ZM22.6666 12.6666H9.33329C9.33329 16.3485 12.3181 19.3333 16 19.3333C19.6819 19.3333 22.6666 16.3485 22.6666 12.6666Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M3.33329 11.3333C2.9651 11.3333 2.66663 11.6317 2.66663 11.9999C2.66663 12.3681 2.9651 12.6666 3.33329 12.6666H6.84966C6.84966 12.8967 6.7557 13.1268 6.56779 13.293L3.61628 15.9025C3.06962 16.3859 3.36258 17.2915 4.08768 17.3598L8.00261 17.7284C8.50112 17.7754 8.84534 18.2513 8.73574 18.742L7.87502 22.5957C7.7156 23.3094 8.4826 23.8692 9.10917 23.4963L12.4921 21.4832C12.9229 21.2269 13.4799 21.4087 13.6784 21.8704L15.2372 25.4962C15.5259 26.1678 16.474 26.1678 16.7627 25.4962L18.3215 21.8704C18.52 21.4087 19.077 21.2269 19.5078 21.4832L22.8907 23.4963C23.5173 23.8692 24.2843 23.3094 24.1249 22.5957L23.2642 18.742C23.1546 18.2513 23.4988 17.7754 23.9973 17.7284L27.9122 17.3598C28.6373 17.2915 28.9303 16.3859 28.3836 15.9025L25.4321 13.293C25.2442 13.1268 25.1503 12.8967 25.1503 12.6666H28.6666C29.0348 12.6666 29.3333 12.3681 29.3333 11.9999C29.3333 11.6317 29.0348 11.3333 28.6666 11.3333H3.33329ZM22.6666 12.6666H9.33329C9.33329 16.3485 12.3181 19.3333 16 19.3333C19.6819 19.3333 22.6666 16.3485 22.6666 12.6666Z" style="fill: var(--element-active-color)"/>
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
    'obi-clear-polartwilight': ObiClearPolartwilight;
  }
}
