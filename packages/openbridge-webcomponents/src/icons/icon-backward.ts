import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-backward')
export class ObiBackward extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M18.251 20.4325C18.0968 20.5219 17.9067 20.5226 17.7519 20.4341L3.75193 12.4341C3.59614 12.3451 3.5 12.1794 3.5 12C3.5 11.8206 3.59614 11.6549 3.75193 11.5659L17.7519 3.56588C17.9067 3.47745 18.0968 3.47808 18.251 3.56754C18.4051 3.657 18.5 3.82176 18.5 4L18.5 20C18.5 20.1782 18.4051 20.343 18.251 20.4325ZM17.5 19.1384L17.5 4.86159L5.00778 12L17.5 19.1384Z" fill="currentColor"/>
<path d="M17.5 19.1386L17.5 4.86182L5.00781 12.0002L17.5 19.1386Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M18.251 20.4325C18.0968 20.5219 17.9067 20.5226 17.7519 20.4341L3.75193 12.4341C3.59614 12.3451 3.5 12.1794 3.5 12C3.5 11.8206 3.59614 11.6549 3.75193 11.5659L17.7519 3.56588C17.9067 3.47745 18.0968 3.47808 18.251 3.56754C18.4051 3.657 18.5 3.82176 18.5 4L18.5 20C18.5 20.1782 18.4051 20.343 18.251 20.4325ZM17.5 19.1384L17.5 4.86159L5.00778 12L17.5 19.1384Z" style="fill: var(--automation-device-tertiary-color)"/>
<path d="M17.5 19.1386L17.5 4.86182L5.00781 12.0002L17.5 19.1386Z" style="fill: var(--automation-device-primary-color)"/>
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
    'obi-backward': ObiBackward;
  }
}
