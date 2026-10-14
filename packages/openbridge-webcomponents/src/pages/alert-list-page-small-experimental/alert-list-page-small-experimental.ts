import {PropertyValues, html} from 'lit';
import {property, query, state} from 'lit/decorators.js';
import {customElement} from '../../decorator.js';
import {
  ObcAlertListPageSmallBase,
  type AlertListPageMode,
} from '../alert-list-page-small/alert-list-page-small-base.js';
import '../../components/alert-list-details-experimental/alert-list-details-experimental.js';
import {
  ALERT_ACTION_ID_APPLIED_BY_ACK_VISIBLE_BUTTON,
  ownEntryOf,
} from '../../alert-system/alert-standard.js';
import {AlertStandardController} from '../../alert-system/alert-standard-registry.js';
import {
  isAlertActionOffered,
  isAlertIncludedInFilter,
} from '../../alert-system/read-standard-alert.js';
import type {StandardAlert} from '../../alert-system/standard-alert.js';
import {
  AlertListColumn,
  ObcAlertListCellClickEvent,
  ObcAlertListDetailsExperimental,
  actionColumn,
  statusColumn,
  timeColumn,
  type ObcRowClickEvent as ObcAlertListRowClickEvent,
} from '../../components/alert-list-details-experimental/alert-list-details-experimental.js';

export type ObcAlertListPageSmallExperimentalAckAllClickEvent = CustomEvent<{
  mode: string;
  alerts: StandardAlert[];
}>;

export type ObcAlertListPageSmallExperimentalActionClickEvent = CustomEvent<{
  alert: StandardAlert;
  actionId: string;
}>;

export type ObcAlertListPageSmallExperimentalRowClickEvent = CustomEvent<{
  alert: StandardAlert;
}>;

/**
 * `<obc-alert-list-page-small-experimental>` – Compact alert list page on the
 * experimental alert list: the alerts over a bar with a filter dropdown, a
 * silence button and "ACK visible".
 *
 * Works like `obc-alert-list-page-small`, with the filters and actions taken
 * from an alert standard (`alert-system/`).
 *
 * ### Features
 * - **Filters:** the dropdown offers the filters the standard declares, and
 *   opens on `filterId`, or on the standard's first filter when unset. A
 *   standard without filters lists every alert.
 * - **Action per row:** each row shows a button for the first action its
 *   state offers; a click fires `action-click` with the action's id.
 * - **ACK visible:** shows where the standard lets its `acknowledge` action
 *   apply to several alerts at once (not under IEC 62923, MSC.302 9.9), and
 *   is enabled while the chosen filter lists an alert that offers it; a click
 *   reports the alerts in view and the filter in `ack-all-visible-click`.
 *
 * ### Usage Guidelines
 * Set `alerts` and handle `action-click` and `ack-all-visible-click`; the
 * page shows whatever the alerts say once they are updated. The alerts carry
 * `text`, and `time` when `showTime` is set. For other columns or grouping,
 * use `obc-alert-list-details-experimental` directly. `hasShelved` has no
 * effect here: the standard decides the filters.
 *
 * @property filterId - The filter the dropdown shows when the page opens, and again whenever `filterId` is set; the standard's first filter when unset.
 * @property alerts - Alerts to list, each naming its own standard.
 * @property standard - The standard whose filters the dropdown offers and that decides whether "ACK visible" shows; the default standard (`setDefaultAlertStandard`) when unset.
 * @fires {ObcAlertListPageSmallExperimentalAckAllClickEvent} ack-all-visible-click - Fired when the user clicks the "ACK visible" button, with the alerts in view and the chosen filter as `mode`.
 * @fires {ObcAlertListPageSmallExperimentalActionClickEvent} action-click - Fired when the user clicks the action button of a row, with the id of the action.
 * @fires {ObcAlertListPageSmallExperimentalRowClickEvent} row-click - Fired when the user clicks a row.
 * @fires {CustomEvent<void>} silence-click - Fired when the user clicks the "Silence" button.
 * @experimental
 */
@customElement('obc-alert-list-page-small-experimental')
export class ObcAlertListPageSmallExperimental extends ObcAlertListPageSmallBase {
  @property({type: String}) filterId?: string;
  @property({type: Array}) alerts: StandardAlert[] = [];
  @property({type: String}) standard?: string;

  private readonly standardController = new AlertStandardController(this);

  @state() private filterIdChosenInDropdown?: string;

  @query('obc-alert-list-details-experimental')
  private alertList!: ObcAlertListDetailsExperimental;

  override willUpdate(changedProperties: PropertyValues): void {
    if (changedProperties.has('filterId')) {
      this.filterIdChosenInDropdown = this.filterId;
    }
  }

  private get filterIdsOfStandard(): string[] {
    return Object.keys(this.standardController.standard?.filters ?? {});
  }

  private get filterIdTheListShows(): string | undefined {
    return this.filterIdChosenInDropdown ?? this.filterIdsOfStandard[0];
  }

  protected override get modes(): AlertListPageMode[] {
    const filters = this.standardController.standard?.filters ?? {};
    return Object.entries(filters).map(([filterId, filter]) => ({
      value: filterId,
      label: filter.label(),
    }));
  }

  protected override get mode(): string {
    return this.filterIdTheListShows ?? '';
  }

  protected override selectMode(mode: string) {
    this.filterIdChosenInDropdown = mode;
  }

  protected override get offersAckAll(): boolean {
    return (
      ownEntryOf(
        this.standardController.standard?.actions,
        ALERT_ACTION_ID_APPLIED_BY_ACK_VISIBLE_BUTTON
      )?.canBeAppliedToSeveralAlertsAtOnce === true
    );
  }

  protected override get canAckAll(): boolean {
    return this.alerts.some(
      (alert) =>
        isAlertIncludedInFilter(alert, this.filterIdTheListShows) &&
        isAlertActionOffered(
          alert,
          ALERT_ACTION_ID_APPLIED_BY_ACK_VISIBLE_BUTTON
        )
    );
  }

  protected override visibleAlerts(): StandardAlert[] {
    return this.alertList.getVisibleAlerts();
  }

  private get columns(): AlertListColumn[] {
    return [
      statusColumn(),
      ...(this.showTime ? [timeColumn({formatter: this.timeFormatter})] : []),
      actionColumn({
        width:
          'var(--app-components-alert-table-row-ack-container-width-small)',
      }),
    ];
  }

  private onCellClick(e: ObcAlertListCellClickEvent) {
    const {alert, actionId} = e.detail;
    if (actionId === undefined) {
      return;
    }
    this.dispatchEvent(
      new CustomEvent('action-click', {
        detail: {alert, actionId},
      }) as ObcAlertListPageSmallExperimentalActionClickEvent
    );
  }

  private onRowClick(e: ObcAlertListRowClickEvent) {
    this.dispatchRowClick(e.detail.alert);
  }

  protected override renderList() {
    return html`<obc-alert-list-details-experimental
      class="alert-list"
      .alerts=${this.alerts}
      .filterId=${this.filterIdTheListShows}
      .standard=${this.standard}
      .columns=${this.columns}
      .showHeader=${false}
      @cell-click=${this.onCellClick}
      @row-click=${this.onRowClick}
    ></obc-alert-list-details-experimental>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-alert-list-page-small-experimental': ObcAlertListPageSmallExperimental;
  }
}
