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
  /** Hide the alarm list, ensuring it doesn't take space (display: none). */
  @property({type: Boolean}) hideAlarmList = false;

  protected override render() {
    return html`
      <div
        class=${classMap({
          wrapper: true,
        })}
      >
        <div class="footer-container">
          <slot name="buttons" class="buttons-slot"></slot>
        </div>
        <div class="content-area">
          <slot name="content"></slot>
        </div>
        <div
          class=${classMap({
            'content-container': true,
            hidealarmlist: this.hideAlarmList,
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
