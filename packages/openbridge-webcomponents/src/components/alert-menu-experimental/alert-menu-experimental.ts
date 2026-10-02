import {TemplateResult, html, unsafeCSS} from 'lit';
import {property} from 'lit/decorators.js';
import {customElement} from '../../decorator.js';
import compentStyle from './alert-menu-experimental.css?inline';
import {ObcAlertMenu, type AlertMenuTab} from '../alert-menu/alert-menu.js';
import '../../building-blocks/alert-list-experimental/alert-list-experimental.js';
import {AlertFilterMode, alertFilterModeData} from '../../alert-filter.js';
import {AlertStandardController} from '../../alert-system/alert-systems.js';

export type ObcAlertMenuExperimentalAckAllVisibleClickEvent = CustomEvent<{
  visibleElements: {element: HTMLElement; index: number}[];
  tabName: AlertFilterMode;
}>;

/**
 * `<obc-alert-menu-experimental>` – Tabbed alert summary panel whose tabs
 * filter by alert state, with an optional Blocked tab.
 *
 * Works like `obc-alert-menu`, with the tabs and the filtering of the
 * experimental alert lists.
 *
 * ### Features
 * - **Tabs:** Unacked, Active, Shelved (with `hasShelved`) and Blocked (with
 *   `hasBlocked`), opening on Active. Each tab is an `AlertFilterMode` and
 *   lists what that mode lists in every experimental alert list: Active the
 *   alerts whose condition is still present, Unacked the ones waiting for
 *   acknowledgement, rectified or not; both leave shelved and blocked alerts
 *   out.
 * - **Filtering:** an item's state is read from its `status`, `shelved` and
 *   `blocked` properties, and the items the selected tab leaves out get the
 *   `hidden` attribute.
 * - **Bulk actions:** "ACK visible" reports the items in view, and the tab
 *   name, in `ack-all-visible-click`. It shows only where the alert standard
 *   lets several alerts be acknowledged at once: not under IEC 62923, where
 *   MSC.302 9.9 asks for one at a time.
 * - **Silence and navigation:** as in `obc-alert-menu`.
 *
 * ### Usage Guidelines
 * - Place `<obc-alert-menu-item>` elements in the default slot. For alerts
 *   held as `Alert` objects, `alertMenuItemStatus(alert)` gives each item's
 *   `status`; set `shelved` and `blocked` from the alert as well.
 * - The menu owns the `hidden` attribute of its items; do not bind it.
 * - Set `canAckAll` when an item in view can still be acknowledged.
 * - **TODO(designer):** The Blocked tab has no design of its own; it follows
 *   the Shelved tab.
 *
 * @property hasBlocked - If true, adds the "Blocked" tab, which lists the alerts another system has blocked.
 * @property standard - The alert standard that decides whether "ACK visible" shows; the default standard (`setDefaultAlertStandard`) when unset.
 * @slot - The alert items, as `obc-alert-menu-item` elements.
 * @slot empty-<tab>-title - Custom empty-state title for the selected tab (`<tab>` is one of `unacked`, `active`, `shelved`, `blocked`)
 * @slot empty-<tab>-description - Custom empty-state description for the selected tab (`<tab>` is one of `unacked`, `active`, `shelved`, `blocked`)
 * @slot empty-<tab>-icon - Custom empty-state icon for the selected tab (`<tab>` is one of `unacked`, `active`, `shelved`, `blocked`)
 * @fires {ObcAlertMenuExperimentalAckAllVisibleClickEvent} ack-all-visible-click - Fired when the "ACK visible" button is clicked, with the items in view and the selected tab's name.
 * @fires {CustomEvent} silence-click - Fired when the silence button is clicked
 * @fires {CustomEvent} go-to-alert-list-click - Fired when the go to alert list button is clicked
 * @fires {CustomEvent<void>} close - Fired when the menu closed on its own, from a click outside, `Escape`, or another menu opening. `open` is already `false` by the time it arrives.
 * @experimental
 */
@customElement('obc-alert-menu-experimental')
export class ObcAlertMenuExperimental extends ObcAlertMenu {
  @property({type: Boolean}) hasBlocked: boolean = false;
  @property({type: String}) standard?: string;

  private readonly standardController = new AlertStandardController(this);

  protected override get offersAckAll(): boolean {
    return this.standardController.system.allowsBulkAcknowledge;
  }

  protected override get tabs(): AlertMenuTab[] {
    const modes = [AlertFilterMode.Unacked, AlertFilterMode.Active];
    if (this.hasShelved) {
      modes.push(AlertFilterMode.Shelved);
    }
    if (this.hasBlocked) {
      modes.push(AlertFilterMode.Blocked);
    }
    return modes.map((mode) => {
      const {title, emptyTitle, emptyIcon} = alertFilterModeData(mode);
      return {name: mode, title, emptyTitle, emptyIcon};
    });
  }

  protected override renderList(
    tab: AlertMenuTab,
    content: TemplateResult
  ): TemplateResult {
    return html`<obc-alert-list-experimental
      class="alert-list"
      .filterMode=${tab.name as AlertFilterMode}
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
