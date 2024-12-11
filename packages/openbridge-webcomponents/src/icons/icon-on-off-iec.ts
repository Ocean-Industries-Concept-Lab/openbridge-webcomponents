import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-on-off-iec')
export class ObiOnOffIec extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M12.0001 20C16.4184 20 20.0001 16.4183 20.0001 12C20.0001 7.58172 16.4184 4 12.0001 4C7.58184 4 4.00012 7.58172 4.00012 12C4.00012 16.4183 7.58184 20 12.0001 20ZM12.0001 22C17.523 22 22.0001 17.5228 22.0001 12C22.0001 6.47715 17.523 2 12.0001 2C6.47727 2 2.00012 6.47715 2.00012 12C2.00012 17.5228 6.47727 22 12.0001 22Z" fill="currentColor"/>
<path d="M11.0001 6H13.0001V18H11.0001V6Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M12.0001 20C16.4184 20 20.0001 16.4183 20.0001 12C20.0001 7.58172 16.4184 4 12.0001 4C7.58184 4 4.00012 7.58172 4.00012 12C4.00012 16.4183 7.58184 20 12.0001 20ZM12.0001 22C17.523 22 22.0001 17.5228 22.0001 12C22.0001 6.47715 17.523 2 12.0001 2C6.47727 2 2.00012 6.47715 2.00012 12C2.00012 17.5228 6.47727 22 12.0001 22Z" style="fill: var(--element-active-color)"/>
<path d="M11.0001 6H13.0001V18H11.0001V6Z" style="fill: var(--element-active-color)"/>
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
    'obi-on-off-iec': ObiOnOffIec;
  }
}