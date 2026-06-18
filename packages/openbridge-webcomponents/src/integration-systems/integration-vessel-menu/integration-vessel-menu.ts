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
 * ## Sizing
 *
 * The menu hugs its content and never reserves more space than its slotted
 * sections need; it deliberately does not impose a height of its own. Sizing is
 * owned by the consumer, since only the consumer knows how large the menu may
 * grow in a given layout.
 *
 * From a web components perspective, drive the size from the host element and
 * the slotted light-DOM nodes — not from component properties:
 *
 * - **Bound the whole menu** by giving the host element a definite `height`. The
 *   menu fills that height and the alert list scrolls within the remaining space
 *   while the footer and content keep their size. This is the recommended
 *   approach. (A `max-height` alone will not bound the list — the internal
 *   scroll needs a definite height to resolve against.)
 * - **Size sections independently** (advanced) by sizing the slotted nodes
 *   directly — e.g. a fixed-height `content` element, or a capped, scrollable
 *   wrapper around the `alarms` items.
 * - **Leave it unbounded** to let the menu grow with its content.
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
            <div slot="empty-icon">
              <obi-unacknowledged></obi-unacknowledged>
            </div>
            <div slot="empty-title">
              <span>No alerts</span>
            </div>
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
