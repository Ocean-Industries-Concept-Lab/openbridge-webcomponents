import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-running-fill')
export class ObiRunningFill extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M22.0005 12C22.0005 17.5228 17.5233 22 12.0005 22C6.47764 22 2.00049 17.5228 2.00049 12C2.00049 6.47715 6.47764 2 12.0005 2C17.5233 2 22.0005 6.47715 22.0005 12ZM5.79297 12.2071L7.20718 10.7928L10.5001 14.0857L16.793 7.79285L18.2072 9.20706L10.5001 16.9142L5.79297 12.2071Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M22.0005 12C22.0005 17.5228 17.5233 22 12.0005 22C6.47764 22 2.00049 17.5228 2.00049 12C2.00049 6.47715 6.47764 2 12.0005 2C17.5233 2 22.0005 6.47715 22.0005 12ZM5.79297 12.2071L7.20718 10.7928L10.5001 14.0857L16.793 7.79285L18.2072 9.20706L10.5001 16.9142L5.79297 12.2071Z" style="fill: var(--element-active-color)"/>
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
    'obi-running-fill': ObiRunningFill;
  }
}