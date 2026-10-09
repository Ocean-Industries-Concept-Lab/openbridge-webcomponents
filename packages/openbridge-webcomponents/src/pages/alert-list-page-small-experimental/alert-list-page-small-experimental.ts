import {PropertyValues, html} from 'lit';
import {property, query, state} from 'lit/decorators.js';
import {customElement} from '../../decorator.js';
import {
  ObcAlertListPageSmallBase,
  type AlertListPageMode,
} from '../alert-list-page-small/alert-list-page-small-base.js';
import '../../components/alert-list-details-experimental/alert-list-details-experimental.js';
import {AlertStandardController} from '../../alert-system/alert-systems.js';
import type {StandardAlert} from '../../alert-system/standard-alert.js';
import {
  AlertListColumn,
  ObcAlertListCellClickEvent,
  ObcAlertListDetailsExperimental,
  ackColumn,
  statusColumn,
  timeColumn,
  type ObcRowClickEvent as ObcAlertListRowClickEvent,
} from '../../components/alert-list-details-experimental/alert-list-details-experimental.js';
import {
  AlertFilterMode,
  alertFilter,
  alertFilterModeData,
  canAcknowledge,
} from '../../alert-filter.js';
export type ObcAlertListPageSmallExperimentalAckAllClickEvent = CustomEvent<{
  mode: AlertFilterMode;
  alerts: StandardAlert[];
}>;

export type ObcAlertListPageSmallExperimentalAckClickEvent = CustomEvent<{
  alert: StandardAlert;
}>;

export type ObcAlertListPageSmallExperimentalRowClickEvent = CustomEvent<{
  alert: StandardAlert;
}>;

/**
 * `<obc-alert-list-page-small-experimental>` – Compact alert list page on the
 * experimental alert list: the alerts over a bar with a mode dropdown, a
 * silence button and "ACK visible".
 *
 * Works like `obc-alert-list-page-small`, with the filter modes of the
 * experimental alert lists.
 *
 * ### Features
 * - **Modes:** the dropdown offers Active, Unacked, Shelved (with
 *   `hasShelved`) and Blocked (with `hasBlocked`), and opens on `filterMode`.
 *   Each lists what that `AlertFilterMode` lists in every experimental alert
 *   list: Unacked keeps a rectified alert until it is acked, and Active and
 *   Unacked leave shelved and blocked alerts out.
 * - **ACK visible:** shows where the alert standard lets
 *   several alerts be acknowledged at once (not under maritime, MSC.302 9.9),
 *   and is enabled while the chosen mode lists an alert that can still be
 *   acknowledged from here; a click reports the alerts in view and the mode
 *   in `ack-all-visible-click`.
 * - **ACK per row:** the ACK button of a row fires `ack-click`.
 *
 * ### Usage Guidelines
 * Set `alerts` and handle `ack-click` and `ack-all-visible-click`; the page
 * shows whatever the alerts say once they are updated. For other columns or
 * grouping, use `obc-alert-list-details-experimental` directly.
 *
 * @property filterMode - The mode the dropdown shows when the page opens, and again whenever `filterMode` is set.
 * @property hasBlocked - Whether the dropdown offers the blocked alerts.
 * @property alerts - Alerts to list, each in the terms of its own standard.
 * @property standard - The alert standard that decides whether "ACK visible" shows; the default standard (`setDefaultAlertStandard`) when unset.
 * @fires {ObcAlertListPageSmallExperimentalAckAllClickEvent} ack-all-visible-click - Fired when the user clicks the "ACK visible" button, with the alerts in view and the chosen mode.
 * @fires {ObcAlertListPageSmallExperimentalAckClickEvent} ack-click - Fired when the user clicks the "ACK" button of a row.
 * @fires {ObcAlertListPageSmallExperimentalRowClickEvent} row-click - Fired when the user clicks a row.
 * @fires {CustomEvent<void>} silence-click - Fired when the user clicks the "Silence" button.
 * @experimental
 */
@customElement('obc-alert-list-page-small-experimental')
export class ObcAlertListPageSmallExperimental extends ObcAlertListPageSmallBase {
  @property({type: String}) filterMode: AlertFilterMode =
    AlertFilterMode.Active;
  @property({type: Boolean}) hasBlocked: boolean = false;
  @property({type: Array}) alerts: StandardAlert[] = [];
  @property({type: String}) standard?: string;

  private readonly standardController = new AlertStandardController(this);

  @state() private _mode: AlertFilterMode = AlertFilterMode.Active;

  @query('obc-alert-list-details-experimental')
  private alertList!: ObcAlertListDetailsExperimental;

  override willUpdate(changedProperties: PropertyValues): void {
    if (changedProperties.has('filterMode') && this._mode !== this.filterMode) {
      this._mode = this.filterMode;
    }
  }

  protected override get modes(): AlertListPageMode[] {
    const modes = [AlertFilterMode.Active, AlertFilterMode.Unacked];
    if (this.hasShelved) {
      modes.push(AlertFilterMode.Shelved);
    }
    if (this.hasBlocked) {
      modes.push(AlertFilterMode.Blocked);
    }
    return modes.map((mode) => ({
      value: mode,
      label: alertFilterModeData(mode).title,
    }));
  }

  protected override get mode(): AlertFilterMode {
    return this._mode;
  }

  protected override selectMode(mode: string) {
    this._mode = mode as AlertFilterMode;
  }

  protected override get offersAckAll(): boolean {
    return this.standardController.system.allowsBulkAcknowledge;
  }

  protected override get canAckAll(): boolean {
    const listed = alertFilter(this._mode);
    return this.alerts.some((alert) => canAcknowledge(alert) && listed(alert));
  }

  protected override visibleAlerts(): StandardAlert[] {
    return this.alertList.getVisibleAlerts();
  }

  private get columns(): AlertListColumn[] {
    return [
      statusColumn(),
      ...(this.showTime ? [timeColumn({formatter: this.timeFormatter})] : []),
      ackColumn({
        width:
          'var(--app-components-alert-table-row-ack-container-width-small)',
      }),
    ];
  }

  private onCellClick(e: ObcAlertListCellClickEvent) {
    if (e.detail.columnKey === 'ack') {
      this.dispatchAckClick(e.detail.alert);
    }
  }

  private onRowClick(e: ObcAlertListRowClickEvent) {
    this.dispatchRowClick(e.detail.alert);
  }

  protected override renderList() {
    return html`<obc-alert-list-details-experimental
      class="alert-list"
      .alerts=${this.alerts}
      .filterMode=${this._mode}
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
