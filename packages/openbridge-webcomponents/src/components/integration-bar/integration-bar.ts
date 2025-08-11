import { LitElement, html, unsafeCSS } from 'lit'
import { customElement } from '../../decorator.js'
import compentStyle from "./integration-bar.css?inline";
import '../icon-button/icon-button.js';
import '../../icons/icon-home.js';
import '../../icons/icon-user.js';
import '../integration-tabs/integration-tabs.js';


@customElement('obc-integration-bar')
export class ObcIntegrationBar extends LitElement {

  override render() {
    return html`
      <div class="wrapper">
        <div class="left-side">
          <obc-icon-button variant="integration" @click=${this.dispatchEvent(new CustomEvent('home-button-click'))}><obi-home></obi-home></obc-icon-button>
          <obc-icon-button variant="integration" @click=${this.dispatchEvent(new CustomEvent('user-button-click'))}><obi-user></obi-user></obc-icon-button>
          <obc-integration-tabs class="fleet-btn">Fleet</obc-integration-tabs>
          <slot name="vessel-selector"></slot>
        </div>
      </div>
      `
  }

static override styles = unsafeCSS(compentStyle);
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-integration-bar': ObcIntegrationBar
  }
}
