import {TemplateResult, html, unsafeCSS} from 'lit';
import {property} from 'lit/decorators.js';
import {customElement} from '../../decorator.js';
import compentStyle from './alert-menu-experimental.css?inline';
import {ObcAlertMenu, type AlertMenuTab} from '../alert-menu/alert-menu.js';
import '../../building-blocks/alert-list-experimental/alert-list-experimental.js';
import {
  ALERT_ACTION_ID_APPLIED_BY_ACK_VISIBLE_BUTTON,
  ownEntryOf,
} from '../../alert-system/alert-standard.js';
import {AlertStandardController} from '../../alert-system/alert-standard-registry.js';
import {msg} from '@lit/localize';
import '../../icons/icon-alerts.js';

/** The one tab of a menu whose standard declares no filter. */
const NAME_OF_TAB_LISTING_EVERY_ALERT = 'all';

export type ObcAlertMenuExperimentalAckAllVisibleClickEvent = CustomEvent<{
  visibleElements: {element: HTMLElement; index: number}[];
  tabName: string;
}>;

/**
 * `<obc-alert-menu-experimental>` – Tabbed alert summary panel whose tabs are
 * the filters of an alert standard.
 *
 * Works like `obc-alert-menu`, with the tabs and the filtering taken from the
 * standard (`alert-system/`).
 *
 * ### Features
 * - **Tabs:** one per filter the standard declares, in its order, opening on
 *   the second. IEC 62923 has Unacked and Active; ISA-18.2 adds Shelved,
 *   Suppressed and Out of service.
 * - **Filtering:** a tab shows the items whose state is included in its
 *   filter, and the items it leaves out get the `hidden` attribute.
 * - **Bulk actions:** "ACK visible" reports the items in view, and the tab
 *   name, in `ack-all-visible-click`. It shows only where the standard lets
 *   its `acknowledge` action apply to several alerts at once: not under
 *   IEC 62923, where MSC.302 9.9 asks for one at a time.
 * - **Silence and navigation:** as in `obc-alert-menu`.
 *
 * ### Usage Guidelines
 * - Place `<obc-alert-menu-item-experimental>` elements in the default slot.
 * - The menu owns the `hidden` attribute of its items; do not bind it.
 * - Set `canAckAll` when an item in view can still be acknowledged.
 * - `hasShelved` has no effect here: the standard decides the tabs.
 *
 * @property standard - The standard whose filters are the tabs; the default standard (`setDefaultAlertStandard`) when unset.
 * @slot - The alert items, as `obc-alert-menu-item-experimental` elements.
 * @slot empty-<filterId>-title - Custom empty-state title for the tab of a filter.
 * @slot empty-<filterId>-description - Custom empty-state description for the tab of a filter.
 * @slot empty-<filterId>-icon - Custom empty-state icon for the tab of a filter.
 * @fires {ObcAlertMenuExperimentalAckAllVisibleClickEvent} ack-all-visible-click - Fired when the "ACK visible" button is clicked, with the items in view and the id of the selected tab's filter.
 * @fires {CustomEvent} silence-click - Fired when the silence button is clicked
 * @fires {CustomEvent} go-to-alert-list-click - Fired when the go to alert list button is clicked
 * @fires {CustomEvent<void>} close - Fired when the menu closed on its own, from a click outside, `Escape`, or another menu opening. `open` is already `false` by the time it arrives.
 * @experimental
 */
@customElement('obc-alert-menu-experimental')
export class ObcAlertMenuExperimental extends ObcAlertMenu {
  @property({type: String}) standard?: string;

  private readonly standardController = new AlertStandardController(this);

  protected override get offersAckAll(): boolean {
    return (
      ownEntryOf(
        this.standardController.standard?.actions,
        ALERT_ACTION_ID_APPLIED_BY_ACK_VISIBLE_BUTTON
      )?.canBeAppliedToSeveralAlertsAtOnce === true
    );
  }

  protected override get tabs(): AlertMenuTab[] {
    const filters = this.standardController.standard?.filters ?? {};
    const tabsOfFilters = Object.entries(filters).map(([filterId, filter]) => ({
      name: filterId,
      title: filter.label(),
      emptyTitle: filter.titleWhenNoAlertIsIncluded(),
      emptyIcon: filter.iconWhenNoAlertIsIncluded,
    }));
    return tabsOfFilters.length > 0
      ? tabsOfFilters
      : [
          {
            name: NAME_OF_TAB_LISTING_EVERY_ALERT,
            title: msg('All'),
            emptyTitle: msg('No alerts'),
            emptyIcon: html`<obi-alerts></obi-alerts>`,
          },
        ];
  }

  protected override renderList(
    tab: AlertMenuTab,
    content: TemplateResult
  ): TemplateResult {
    return html`<obc-alert-list-experimental
      class="alert-list"
      .filterId=${
        tab.name === NAME_OF_TAB_LISTING_EVERY_ALERT ? undefined : tab.name
      }
      .standard=${this.standard}
      >${content}</obc-alert-list-experimental
    >`;
  }

  static override styles = [ObcAlertMenu.styles, unsafeCSS(compentStyle)];
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-alert-menu-experimental': ObcAlertMenuExperimental;
  }
}
