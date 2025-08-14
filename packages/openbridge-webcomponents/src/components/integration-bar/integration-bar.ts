import { LitElement, html, unsafeCSS } from 'lit'
import { customElement } from '../../decorator.js'
import compentStyle from "./integration-bar.css?inline";
import '../icon-button/icon-button.js';
import '../../icons/icon-home.js';
import '../../icons/icon-user.js';
import '../integration-tabs/integration-tabs.js';


/**
 * 
 * @fires fleet-button-click - Fired when the fleet button is clicked
 */
@customElement('obc-integration-bar')
export class ObcIntegrationBar extends LitElement {

  override render() {
    return html`
      <div class="wrapper">
        <div class="left-side">
          <obc-integration-tabs class="fleet-btn" @click=${this.dispatchEvent(new CustomEvent('fleet-button-click'))}>Fleet</obc-integration-tabs>
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
