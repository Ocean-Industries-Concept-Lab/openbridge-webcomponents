import {LitElement, html, css, svg} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('obi-record-event-iec')
export class ObiRecordEventIec extends LitElement {
  @property({type: Boolean}) useCssColor = false;

  private icon = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M15.9575 1.9999H2V21.9999H21V7.26595L19.5 9.86403V14.2499H9.75V9.7499H11.483L12.349 8.2499H9.75V3.4999H15.0914L15.9575 1.9999ZM8.25 9.7499V14.2499H3.5V9.7499H8.25ZM8.25 15.7499H3.5V20.4999H8.25V15.7499ZM19.5 15.7499H9.75V20.4999H19.5V15.7499ZM8.25 8.2499V3.4999H3.5V8.2499H8.25Z" fill="currentColor"/>
<path d="M13.9305 12.6361L13.3805 10.5836L17.1282 4.0924L19.7308 5.595L15.9831 12.0862L13.9305 12.6361ZM20.2258 4.73768L17.6232 3.23508L18.1358 2.34714C18.2655 2.1226 18.4671 1.97367 18.7408 1.90034C19.0145 1.82701 19.2636 1.85516 19.4881 1.98479L20.3761 2.49745C20.6006 2.62708 20.7495 2.82874 20.8229 3.10242C20.8962 3.3761 20.8681 3.62521 20.7384 3.84974L20.2258 4.73768Z" fill="currentColor"/>
</svg>
`;

  private iconCss = svg`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M15.9575 1.9999H2V21.9999H21V7.26595L19.5 9.86403V14.2499H9.75V9.7499H11.483L12.349 8.2499H9.75V3.4999H15.0914L15.9575 1.9999ZM8.25 9.7499V14.2499H3.5V9.7499H8.25ZM8.25 15.7499H3.5V20.4999H8.25V15.7499ZM19.5 15.7499H9.75V20.4999H19.5V15.7499ZM8.25 8.2499V3.4999H3.5V8.2499H8.25Z" style="fill: var(--element-active-color)"/>
<path d="M13.9305 12.6361L13.3805 10.5836L17.1282 4.0924L19.7308 5.595L15.9831 12.0862L13.9305 12.6361ZM20.2258 4.73768L17.6232 3.23508L18.1358 2.34714C18.2655 2.1226 18.4671 1.97367 18.7408 1.90034C19.0145 1.82701 19.2636 1.85516 19.4881 1.98479L20.3761 2.49745C20.6006 2.62708 20.7495 2.82874 20.8229 3.10242C20.8962 3.3761 20.8681 3.62521 20.7384 3.84974L20.2258 4.73768Z" style="fill: var(--element-active-color)"/>
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
    'obi-record-event-iec': ObiRecordEventIec;
  }
}
