import { LitElement, html, unsafeCSS } from 'lit'
import { customElement } from '../../decorator.js'
import compentStyle from "./alert-list-page-small.css?inline";

@customElement('obc-alert-list-page-small')
export class ObcAlertListPageSmall extends LitElement {

  override render() {
    return html`
      <div class="wrapper">
      </div>
      `
  }

static override styles = unsafeCSS(compentStyle);
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-alert-list-page-small': ObcAlertListPageSmall
  }
}
