import {LitElement, html, unsafeCSS} from 'lit';
import {property} from 'lit/decorators.js';
import {classMap} from 'lit/directives/class-map.js';
import {customElement} from '../../decorator.js';
import componentStyle from './integration-vessel-menu.css?inline';

import '../../components/button/button.js';
import '../../components/icon-button/icon-button.js';
import '../../icons/icon-placeholder.js';
import '../../building-blocks/alert-list/alert-list.js';

/**
 * `<obc-integration-vessel-menu>` – A menu to be shown when selecting a obc-integration-button from a obc-integration-bar.
 *
 * @slot buttons - Buttons shown in the footer.
 * @slot content - Main content shown in the content area.
 * @slot alarms - Alarm items rendered inside the alert list.
 */

@customElement('obc-integration-vessel-menu')
export class ObcIntegrationVesselMenu extends LitElement {
  /** Show the action buttons footer. When false it is removed and takes no space. */
  @property({type: Boolean, attribute: false}) hasActions = true;

  /** Show the alert list. When false it is removed and takes no space. */
  @property({type: Boolean, attribute: false}) hasAlertList = true;

  /** Show the main content area. When false it is removed and takes no space. */
  @property({type: Boolean, attribute: false}) hasContent = true;

  protected override render() {
    return html`
      <div class="wrapper">
        <div
          class=${classMap({
            'footer-container': true,
            hidden: !this.hasActions,
          })}
        >
          <slot name="buttons" class="buttons-slot"></slot>
        </div>
        <div
          class=${classMap({
            'content-area': true,
            hidden: !this.hasContent,
          })}
        >
          <slot name="content"></slot>
        </div>
        <div
          class=${classMap({
            'content-container': true,
            hidden: !this.hasAlertList,
          })}
        >
          <obc-alert-list class="alertlist"
            ><slot name="alarms"></slot>
          </obc-alert-list>
        </div>
      </div>
    `;
  }

  static override styles = unsafeCSS(componentStyle);
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-integration-vessel-menu': ObcIntegrationVesselMenu;
  }
}
