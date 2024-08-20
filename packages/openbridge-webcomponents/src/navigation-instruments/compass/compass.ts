import { LitElement, html, unsafeCSS } from 'lit'
import { customElement } from 'lit/decorators.js'
import compentStyle from "./compass.css?inline";

@customElement('obc-compass')
export class ObcCompass extends LitElement {

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
    'obc-compass': ObcCompass
  }
}
