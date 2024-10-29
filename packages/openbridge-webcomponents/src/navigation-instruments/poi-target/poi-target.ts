import { LitElement, html, unsafeCSS } from 'lit'
import { customElement } from 'lit/decorators.js'
import compentStyle from "./poi-target.css?inline";

@customElement('obc-poi-target')
export class ObcPoiTarget extends LitElement {

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
    'obc-poi-target': ObcPoiTarget
  }
}
