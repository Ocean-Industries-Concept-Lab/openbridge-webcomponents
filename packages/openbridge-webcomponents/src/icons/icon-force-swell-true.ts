import {LitElement, html, css, svg} from 'lit';
import {property} from 'lit/decorators.js';
import {customElement} from '../decorator.js';

@customElement('obi-force-swell-true')
export class ObiForceSwellTrue extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M17.7995 13.0001C18.7059 13 19.2232 14.0347 18.6793 14.7598L12.8795 22.4932C12.4395 23.0797 11.5597 23.0798 11.1198 22.4932L5.31997 14.7598C4.77637 14.0347 5.29368 13.0003 6.19985 13.0001H17.7995Z" fill="currentColor"/>
<path d="M8 10.0002C8 9.44796 8.44771 9.00024 9 9.00024H15C15.5523 9.00024 16 9.44796 16 10.0002C16 10.5525 15.5523 11.0002 15 11.0002H9C8.44771 11.0002 8 10.5525 8 10.0002Z" fill="currentColor"/>
<path d="M9 6.00024C9 5.44796 9.44771 5.00024 10 5.00024H14C14.5523 5.00024 15 5.44796 15 6.00024C15 6.55253 14.5523 7.00024 14 7.00024H10C9.44771 7.00024 9 6.55253 9 6.00024Z" fill="currentColor"/>
<path d="M10 2.00024C10 1.44796 10.4477 1.00024 11 1.00024H13C13.5523 1.00024 14 1.44796 14 2.00024C14 2.55253 13.5523 3.00024 13 3.00024H11C10.4477 3.00024 10 2.55253 10 2.00024Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M17.7995 13.0001C18.7059 13 19.2232 14.0347 18.6793 14.7598L12.8795 22.4932C12.4395 23.0797 11.5597 23.0798 11.1198 22.4932L5.31997 14.7598C4.77637 14.0347 5.29368 13.0003 6.19985 13.0001H17.7995Z" style="fill: var(--element-active-color)"/>
<path d="M8 10.0002C8 9.44796 8.44771 9.00024 9 9.00024H15C15.5523 9.00024 16 9.44796 16 10.0002C16 10.5525 15.5523 11.0002 15 11.0002H9C8.44771 11.0002 8 10.5525 8 10.0002Z" style="fill: var(--element-active-color)"/>
<path d="M9 6.00024C9 5.44796 9.44771 5.00024 10 5.00024H14C14.5523 5.00024 15 5.44796 15 6.00024C15 6.55253 14.5523 7.00024 14 7.00024H10C9.44771 7.00024 9 6.55253 9 6.00024Z" style="fill: var(--element-active-color)"/>
<path d="M10 2.00024C10 1.44796 10.4477 1.00024 11 1.00024H13C13.5523 1.00024 14 1.44796 14 2.00024C14 2.55253 13.5523 3.00024 13 3.00024H11C10.4477 3.00024 10 2.55253 10 2.00024Z" style="fill: var(--element-active-color)"/>
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
    'obi-force-swell-true': ObiForceSwellTrue;
  }
}
