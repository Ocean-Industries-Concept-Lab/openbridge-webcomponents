import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-wifi2-off-google')
export class ObiWifi2OffGoogle extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M2 4.22L3.41 2.81L20.38 19.78L18.97 21.19L11.89 14.11C10.11 14.13 8.35 14.82 7 16.17L5 14.17C6.27 12.91 7.79 12.06 9.41 11.63L7.17 9.39C5.65 10.01 4.23 10.94 3 12.17L1 10.17C2.22 8.96 3.59 8 5.05 7.27L2 4.22ZM23 10.17L21 12.17C18.49 9.66 15.18 8.42 11.88 8.44L9.3 5.86C14.13 5.02 19.27 6.44 23 10.17ZM15.28 11.84C16.64 12.32 17.92 13.09 19 14.17L18.3 14.86L15.28 11.84ZM9 18.17L12 21.17L15 18.17C13.35 16.51 10.66 16.51 9 18.17Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M2 4.22L3.41 2.81L20.38 19.78L18.97 21.19L11.89 14.11C10.11 14.13 8.35 14.82 7 16.17L5 14.17C6.27 12.91 7.79 12.06 9.41 11.63L7.17 9.39C5.65 10.01 4.23 10.94 3 12.17L1 10.17C2.22 8.96 3.59 8 5.05 7.27L2 4.22ZM23 10.17L21 12.17C18.49 9.66 15.18 8.42 11.88 8.44L9.3 5.86C14.13 5.02 19.27 6.44 23 10.17ZM15.28 11.84C16.64 12.32 17.92 13.09 19 14.17L18.3 14.86L15.28 11.84ZM9 18.17L12 21.17L15 18.17C13.35 16.51 10.66 16.51 9 18.17Z" style="fill: var(--element-active-color)"/>
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
    'obi-wifi2-off-google': ObiWifi2OffGoogle;
  }
}