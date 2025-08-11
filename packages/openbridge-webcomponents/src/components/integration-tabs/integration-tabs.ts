import { LitElement, html, unsafeCSS } from 'lit'
import { customElement } from '../../decorator.js'
import compentStyle from "./integration-tabs.css?inline";

@customElement('obc-integration-tabs')
export class ObcIntegrationTabs extends LitElement {

  override render() {
    return html`
      <button class="wrapper">
        <div class="visible-wrapper">
          <div class="label"><slot></slot></div>
        </div>
      </button>
      `
  }

static override styles = unsafeCSS(compentStyle);
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-integration-tabs': ObcIntegrationTabs
  }
}
