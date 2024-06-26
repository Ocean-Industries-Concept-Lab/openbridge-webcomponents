import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-07-route-planning')
export class Obi07RoutePlanning extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M12.5485 7.94998C12.3706 7.98283 12.1873 8 12 8C11.7951 8 11.595 7.97945 11.4016 7.94031L5 19.0282V15.0281L9.6868 6.91039C9.25778 6.39151 9 5.72586 9 5C9 3.34314 10.3431 2 12 2C13.6569 2 15 3.34314 15 5C15 5.74425 14.729 6.42519 14.2803 6.94954L19 15.1244V19.1244L12.5485 7.94998ZM13 5C13 5.55229 12.5523 6 12 6C11.4477 6 11 5.55229 11 5C11 4.44771 11.4477 4 12 4C12.5523 4 13 4.44771 13 5Z" fill="currentColor"/>
<path d="M2 20H6V22H2V20Z" fill="currentColor"/>
<path d="M11 20H8V22H11V20Z" fill="currentColor"/>
<path d="M13 20H16V22H13V20Z" fill="currentColor"/>
<path d="M22 20H18V22H22V20Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M12.5485 7.94998C12.3706 7.98283 12.1873 8 12 8C11.7951 8 11.595 7.97945 11.4016 7.94031L5 19.0282V15.0281L9.6868 6.91039C9.25778 6.39151 9 5.72586 9 5C9 3.34314 10.3431 2 12 2C13.6569 2 15 3.34314 15 5C15 5.74425 14.729 6.42519 14.2803 6.94954L19 15.1244V19.1244L12.5485 7.94998ZM13 5C13 5.55229 12.5523 6 12 6C11.4477 6 11 5.55229 11 5C11 4.44771 11.4477 4 12 4C12.5523 4 13 4.44771 13 5Z" style="fill: var(--element-active-color)"/>
<path d="M2 20H6V22H2V20Z" style="fill: var(--element-active-color)"/>
<path d="M11 20H8V22H11V20Z" style="fill: var(--element-active-color)"/>
<path d="M13 20H16V22H13V20Z" style="fill: var(--element-active-color)"/>
<path d="M22 20H18V22H22V20Z" style="fill: var(--element-active-color)"/>
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
    'obi-07-route-planning': Obi07RoutePlanning;
  }
}
