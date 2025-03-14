import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-running')
export class ObiRunning extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M12.0005 20C16.4188 20 20.0005 16.4183 20.0005 12C20.0005 7.58172 16.4188 4 12.0005 4C7.58221 4 4.00049 7.58172 4.00049 12C4.00049 16.4183 7.58221 20 12.0005 20ZM12.0005 22C17.5233 22 22.0005 17.5228 22.0005 12C22.0005 6.47715 17.5233 2 12.0005 2C6.47764 2 2.00049 6.47715 2.00049 12C2.00049 17.5228 6.47764 22 12.0005 22Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M17.7072 9.70706L10.5001 16.9142L6.29297 12.7071L7.70718 11.2928L10.5001 14.0857L16.293 8.29285L17.7072 9.70706Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M12.0005 20C16.4188 20 20.0005 16.4183 20.0005 12C20.0005 7.58172 16.4188 4 12.0005 4C7.58221 4 4.00049 7.58172 4.00049 12C4.00049 16.4183 7.58221 20 12.0005 20ZM12.0005 22C17.5233 22 22.0005 17.5228 22.0005 12C22.0005 6.47715 17.5233 2 12.0005 2C6.47764 2 2.00049 6.47715 2.00049 12C2.00049 17.5228 6.47764 22 12.0005 22Z" style="fill: var(--on-warning-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M17.7072 9.70706L10.5001 16.9142L6.29297 12.7071L7.70718 11.2928L10.5001 14.0857L16.293 8.29285L17.7072 9.70706Z" style="fill: var(--on-warning-color)"/>
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
    'obi-running': ObiRunning;
  }
}
