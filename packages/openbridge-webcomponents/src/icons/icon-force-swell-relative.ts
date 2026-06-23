import {LitElement, html, css, svg} from 'lit';
import {property} from 'lit/decorators.js';
import {customElement} from '../decorator.js';

@customElement('obi-force-swell-relative')
export class ObiForceSwellRelative extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M17.7998 13.0001C18.7062 13 19.2235 14.0347 18.6797 14.7598L12.8799 22.4932C12.4399 23.0799 11.5601 23.0799 11.1201 22.4932L5.32029 14.7598C4.77641 14.0346 5.29372 13 6.20017 13.0001H17.7998ZM12 20.3331L16 15.0001H7.99998L12 20.3331Z" fill="currentColor"/>
<path d="M7.99998 10.0002C7.99998 9.44796 8.44769 9.00024 8.99998 9.00024H15C15.5523 9.00024 16 9.44796 16 10.0002C16 10.5525 15.5523 11.0002 15 11.0002H8.99998C8.44769 11.0002 7.99998 10.5525 7.99998 10.0002Z" fill="currentColor"/>
<path d="M8.99998 6.00024C8.99998 5.44796 9.44769 5.00024 9.99998 5.00024H14C14.5523 5.00024 15 5.44796 15 6.00024C15 6.55253 14.5523 7.00024 14 7.00024H9.99998C9.44769 7.00024 8.99998 6.55253 8.99998 6.00024Z" fill="currentColor"/>
<path d="M9.99998 2.00024C9.99998 1.44796 10.4477 1.00024 11 1.00024H13C13.5523 1.00024 14 1.44796 14 2.00024C14 2.55253 13.5523 3.00024 13 3.00024H11C10.4477 3.00024 9.99998 2.55253 9.99998 2.00024Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M17.7998 13.0001C18.7062 13 19.2235 14.0347 18.6797 14.7598L12.8799 22.4932C12.4399 23.0799 11.5601 23.0799 11.1201 22.4932L5.32029 14.7598C4.77641 14.0346 5.29372 13 6.20017 13.0001H17.7998ZM12 20.3331L16 15.0001H7.99998L12 20.3331Z" style="fill: var(--element-active-color)"/>
<path d="M7.99998 10.0002C7.99998 9.44796 8.44769 9.00024 8.99998 9.00024H15C15.5523 9.00024 16 9.44796 16 10.0002C16 10.5525 15.5523 11.0002 15 11.0002H8.99998C8.44769 11.0002 7.99998 10.5525 7.99998 10.0002Z" style="fill: var(--element-active-color)"/>
<path d="M8.99998 6.00024C8.99998 5.44796 9.44769 5.00024 9.99998 5.00024H14C14.5523 5.00024 15 5.44796 15 6.00024C15 6.55253 14.5523 7.00024 14 7.00024H9.99998C9.44769 7.00024 8.99998 6.55253 8.99998 6.00024Z" style="fill: var(--element-active-color)"/>
<path d="M9.99998 2.00024C9.99998 1.44796 10.4477 1.00024 11 1.00024H13C13.5523 1.00024 14 1.44796 14 2.00024C14 2.55253 13.5523 3.00024 13 3.00024H11C10.4477 3.00024 9.99998 2.55253 9.99998 2.00024Z" style="fill: var(--element-active-color)"/>
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
    'obi-force-swell-relative': ObiForceSwellRelative;
  }
}
