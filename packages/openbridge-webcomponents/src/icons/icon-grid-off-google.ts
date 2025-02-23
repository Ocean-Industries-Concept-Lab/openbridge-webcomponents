import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-grid-off-google')
export class ObiGridOffGoogle extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M19 10.3251V13.6751H16.55L21 18.1251V5.0001C21 4.4501 20.8041 3.97926 20.4125 3.5876C20.0208 3.19593 19.55 3.0001 19 3.0001H5.87495L10.325 7.4501V5.0001H13.675V8.3251H11.2L15.675 12.8001V10.3251H19ZM19 5.0001V8.3251H15.675V5.0001H19Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M4.99995 21.0001C4.44995 21.0001 3.97912 20.8043 3.58745 20.4126C3.19578 20.0209 2.99995 19.5501 2.99995 19.0001V5.80301L0.699951 3.5001L2.09995 2.1001L21.9 21.9001L20.475 23.3001L18.1779 21.0001H4.99995ZM8.32495 15.6751V19.0001H4.99995V15.6751H8.32495ZM13.675 16.5001V19.0001H10.325V15.6751H12.85L13.675 16.5001ZM8.32495 11.1501V13.6751H4.99995V10.3251H7.49995L8.32495 11.1501Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M19 10.3251V13.6751H16.55L21 18.1251V5.0001C21 4.4501 20.8041 3.97926 20.4125 3.5876C20.0208 3.19593 19.55 3.0001 19 3.0001H5.87495L10.325 7.4501V5.0001H13.675V8.3251H11.2L15.675 12.8001V10.3251H19ZM19 5.0001V8.3251H15.675V5.0001H19Z" style="fill: var(--element-active-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M4.99995 21.0001C4.44995 21.0001 3.97912 20.8043 3.58745 20.4126C3.19578 20.0209 2.99995 19.5501 2.99995 19.0001V5.80301L0.699951 3.5001L2.09995 2.1001L21.9 21.9001L20.475 23.3001L18.1779 21.0001H4.99995ZM8.32495 15.6751V19.0001H4.99995V15.6751H8.32495ZM13.675 16.5001V19.0001H10.325V15.6751H12.85L13.675 16.5001ZM8.32495 11.1501V13.6751H4.99995V10.3251H7.49995L8.32495 11.1501Z" style="fill: var(--element-active-color)"/>
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
    'obi-grid-off-google': ObiGridOffGoogle;
  }
}
