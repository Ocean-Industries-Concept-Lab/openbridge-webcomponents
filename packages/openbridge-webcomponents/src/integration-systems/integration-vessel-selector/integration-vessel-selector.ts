import {LitElement, html, nothing, unsafeCSS} from 'lit';
import {customElement} from '../../decorator.js';
import compentStyle from './integration-vessel-selector.css?inline';
import {property} from 'lit/decorators.js';

/**
 * `<obc-integration-vessel-selector>` – A component that allows the user to select a vessel from a fleet.
 *
 * @slot - The vessel to select.
 * @slot fleet - The fleet of vessels.
 */
@customElement('obc-integration-vessel-selector')
export class ObcIntegrationVesselSelector extends LitElement {
  @property({type: Boolean}) hasFleet = false;

  override render() {
    return html`
      <div class="wrapper">
        ${this.hasFleet
          ? html`<div class="fleet-wrapper">
              <slot name="fleet"></slot>
            </div>`
          : nothing}
        <slot class="vessel-wrapper"></slot>
      </div>
    `;
  }

  static override styles = unsafeCSS(compentStyle);
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-integration-vessel-selector': ObcIntegrationVesselSelector;
  }
}
