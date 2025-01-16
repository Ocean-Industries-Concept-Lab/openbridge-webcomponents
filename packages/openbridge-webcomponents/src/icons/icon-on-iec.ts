import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-on-iec')
export class ObiOnIec extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M12.0002 14C13.1048 14 14.0002 13.1046 14.0002 12C14.0002 10.8954 13.1048 10 12.0002 10C10.8957 10 10.0002 10.8954 10.0002 12C10.0002 13.1046 10.8957 14 12.0002 14Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M22.0002 12C22.0002 17.5228 17.5231 22 12.0002 22C6.4774 22 2.00024 17.5228 2.00024 12C2.00024 6.47715 6.4774 2 12.0002 2C17.5231 2 22.0002 6.47715 22.0002 12ZM20.0002 12C20.0002 16.4183 16.4185 20 12.0002 20C7.58197 20 4.00024 16.4183 4.00024 12C4.00024 7.58172 7.58197 4 12.0002 4C16.4185 4 20.0002 7.58172 20.0002 12Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12.0002 14C13.1048 14 14.0002 13.1046 14.0002 12C14.0002 10.8954 13.1048 10 12.0002 10C10.8957 10 10.0002 10.8954 10.0002 12C10.0002 13.1046 10.8957 14 12.0002 14Z" style="fill: var(--element-active-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M22.0002 12C22.0002 17.5228 17.5231 22 12.0002 22C6.4774 22 2.00024 17.5228 2.00024 12C2.00024 6.47715 6.4774 2 12.0002 2C17.5231 2 22.0002 6.47715 22.0002 12ZM20.0002 12C20.0002 16.4183 16.4185 20 12.0002 20C7.58197 20 4.00024 16.4183 4.00024 12C4.00024 7.58172 7.58197 4 12.0002 4C16.4185 4 20.0002 7.58172 20.0002 12Z" style="fill: var(--element-active-color)"/>
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
