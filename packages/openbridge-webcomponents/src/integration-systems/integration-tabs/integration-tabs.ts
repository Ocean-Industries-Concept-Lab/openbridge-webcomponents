import {LitElement, html, unsafeCSS} from 'lit';
import {customElement} from '../../decorator.js';
import compentStyle from './integration-tabs.css?inline';
import {property} from 'lit/decorators.js';

/**
 * @slot - Tab label content
 * @fires click - Fired when the tab is clicked. The event carries no payload identifying the tab; read the `selected` property of the clicked element, or attach the handler per tab.
 * @experimental
 */
@customElement('obc-integration-tabs')
export class ObcIntegrationTabs extends LitElement {
  @property({type: Boolean}) selected = false;
  override render() {
    return html`
      <button class="wrapper ${this.selected ? 'selected' : ''}">
        <div class="visible-wrapper">
          <div class="label"><slot></slot></div>
        </div>
      </button>
    `;
  }

  static override styles = unsafeCSS(compentStyle);
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-integration-tabs': ObcIntegrationTabs;
  }
}
