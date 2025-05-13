import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-backward-fast')
export class ObiBackwardFast extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M20.7133 19.4096C20.866 19.5165 21.0655 19.5296 21.2309 19.4435C21.3963 19.3574 21.5 19.1864 21.5 19V5C21.5 4.81356 21.3963 4.64261 21.2309 4.55651C21.0655 4.47041 20.866 4.48347 20.7133 4.59039L11.5 11.0397L11.5 5C11.5 4.81356 11.3963 4.64261 11.2309 4.55651C11.0655 4.47041 10.866 4.48347 10.7133 4.59039L0.713268 11.5904C0.579605 11.684 0.5 11.8368 0.5 12C0.5 12.1632 0.579605 12.3161 0.713268 12.4096L10.7133 19.4096C10.866 19.5165 11.0655 19.5296 11.2309 19.4435C11.3963 19.3574 11.5 19.1864 11.5 19L11.5 12.9603L20.7133 19.4096ZM10.5 5.96033L1.8719 12L10.5 18.0397L10.5 5.96033ZM11.8719 12L20.5 5.96033V18.0397L11.8719 12Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M10.4999 5.96069L1.87183 12.0004L10.4999 18.04L10.4999 5.96069ZM11.8718 12.0004L20.4999 5.96069V18.04L11.8718 12.0004Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M20.7133 19.4096C20.866 19.5165 21.0655 19.5296 21.2309 19.4435C21.3963 19.3574 21.5 19.1864 21.5 19V5C21.5 4.81356 21.3963 4.64261 21.2309 4.55651C21.0655 4.47041 20.866 4.48347 20.7133 4.59039L11.5 11.0397L11.5 5C11.5 4.81356 11.3963 4.64261 11.2309 4.55651C11.0655 4.47041 10.866 4.48347 10.7133 4.59039L0.713268 11.5904C0.579605 11.684 0.5 11.8368 0.5 12C0.5 12.1632 0.579605 12.3161 0.713268 12.4096L10.7133 19.4096C10.866 19.5165 11.0655 19.5296 11.2309 19.4435C11.3963 19.3574 11.5 19.1864 11.5 19L11.5 12.9603L20.7133 19.4096ZM10.5 5.96033L1.8719 12L10.5 18.0397L10.5 5.96033ZM11.8719 12L20.5 5.96033V18.0397L11.8719 12Z" style="fill: var(--automation-device-tertiary-color)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M10.4999 5.96069L1.87183 12.0004L10.4999 18.04L10.4999 5.96069ZM11.8718 12.0004L20.4999 5.96069V18.04L11.8718 12.0004Z" style="fill: var(--automation-device-primary-color)"/>
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
    'obi-backward-fast': ObiBackwardFast;
  }
}
