import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-on-iec')
export class ObiOnIec extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M12.0001 14C13.1047 14 14.0001 13.1046 14.0001 12C14.0001 10.8954 13.1047 10 12.0001 10C10.8956 10 10.0001 10.8954 10.0001 12C10.0001 13.1046 10.8956 14 12.0001 14Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M22.0001 12C22.0001 17.5228 17.523 22 12.0001 22C6.47727 22 2.00012 17.5228 2.00012 12C2.00012 6.47715 6.47727 2 12.0001 2C17.523 2 22.0001 6.47715 22.0001 12ZM20.0001 12C20.0001 16.4183 16.4184 20 12.0001 20C7.58184 20 4.00012 16.4183 4.00012 12C4.00012 7.58172 7.58184 4 12.0001 4C16.4184 4 20.0001 7.58172 20.0001 12Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12.0001 14C13.1047 14 14.0001 13.1046 14.0001 12C14.0001 10.8954 13.1047 10 12.0001 10C10.8956 10 10.0001 10.8954 10.0001 12C10.0001 13.1046 10.8956 14 12.0001 14Z" style="fill: var(--element-active-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M22.0001 12C22.0001 17.5228 17.523 22 12.0001 22C6.47727 22 2.00012 17.5228 2.00012 12C2.00012 6.47715 6.47727 2 12.0001 2C17.523 2 22.0001 6.47715 22.0001 12ZM20.0001 12C20.0001 16.4183 16.4184 20 12.0001 20C7.58184 20 4.00012 16.4183 4.00012 12C4.00012 7.58172 7.58184 4 12.0001 4C16.4184 4 20.0001 7.58172 20.0001 12Z" style="fill: var(--element-active-color)"/>
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
    'obi-on-iec': ObiOnIec;
  }
}
