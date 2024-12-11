import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-forward-stopped')
export class ObiForwardStopped extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M5.74904 3.56754C5.90319 3.47808 6.09332 3.47745 6.24807 3.56588L20.2481 11.5659C20.4039 11.6549 20.5 11.8206 20.5 12C20.5 12.1794 20.4039 12.3451 20.2481 12.4341L6.24807 20.4341C6.09332 20.5226 5.90319 20.5219 5.74904 20.4325C5.59488 20.343 5.5 20.1782 5.5 20V4C5.5 3.82176 5.59488 3.65701 5.74904 3.56754ZM6.5 4.86159V19.1384L18.9922 12L6.5 4.86159Z" fill="currentColor"/>
<path d="M6.5 4.86182V19.1386L18.9922 12.0002L6.5 4.86182Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M5.74904 3.56754C5.90319 3.47808 6.09332 3.47745 6.24807 3.56588L20.2481 11.5659C20.4039 11.6549 20.5 11.8206 20.5 12C20.5 12.1794 20.4039 12.3451 20.2481 12.4341L6.24807 20.4341C6.09332 20.5226 5.90319 20.5219 5.74904 20.4325C5.59488 20.343 5.5 20.1782 5.5 20V4C5.5 3.82176 5.59488 3.65701 5.74904 3.56754ZM6.5 4.86159V19.1384L18.9922 12L6.5 4.86159Z" style="fill: var(--automation-device-secondary-color)"/>
<path d="M6.5 4.86182V19.1386L18.9922 12.0002L6.5 4.86182Z" style="fill: var(--automation-device-tertiary-color)"/>
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
    'obi-forward-stopped': ObiForwardStopped;
  }
}
