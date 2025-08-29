import {LitElement, html, unsafeCSS} from 'lit';
import {customElement} from '../../decorator.js';
import compentStyle from './alert-list-details.css?inline';
import {msg} from '@lit/localize';
import {property, query} from 'lit/decorators.js';
import '../icon-button/icon-button.js';
import '../button/button.js';
import '../../icons/icon-silence-iec.js';
import '../../icons/icon-alerts.js';
import '../../icons/icon-alerts-shelf.js';
import '../../icons/icon-unacknowledged.js';
import '../../icons/icon-alarm-noack-iec.js';
import '../../icons/icon-warning-noack-iec.js';
import '../alert-icon/alert-icon.js';
import {
  Alert,
  AlertType,
  AlertStatus,
  comparePriorityAlerts,
} from '../../types.js';
import {
  ObcTable,
  ObcTableCellClickEvent,
  ObcTableCellData,
  ObcTableCellType,
  ObcTableRowClickEvent,
  ObcTableRow,
  ObcTableColumn,
} from '../table/table.js';
import '../scrollbar/scrollbar.js';

export enum AlertListMode {
  UNACKED = 'unacked',
  ALL = 'all',
  SHELVED = 'shelved',
}

export type ObcAckClickEvent = CustomEvent<{
  alert: Alert;
}>;

export type ObcRowClickEvent = CustomEvent<{
  alert: Alert;
}>;

export function getAlertListModeData(selectedMode: AlertListMode) {
  if (selectedMode === AlertListMode.ALL)
    return {
      name: AlertListMode.ALL,
      title: msg('All'),
      emptyTitle: msg('No active alerts'),
      emptyIcon: html`<obi-alerts></obi-alerts>`,
      filter: (alert: Alert) => !alert.shelved,
    };
  else if (selectedMode === AlertListMode.UNACKED)
    return {
      name: AlertListMode.UNACKED,
      title: msg('Unacked'),
      emptyTitle: msg('No unacknowledged alerts'),
      emptyIcon: html`<obi-unacknowledged></obi-unacknowledged>`,
      filter: (alert: Alert) =>
        alert.status === AlertStatus.Unacknowledged &&
        alert.type !== AlertType.Caution &&
        !alert.shelved,
    };
  else if (selectedMode === AlertListMode.SHELVED)
    return {
      name: AlertListMode.SHELVED,
      title: msg('Shelved'),
      emptyTitle: msg('No shelved alerts'),
      emptyIcon: html`<obi-alerts-shelf></obi-alerts-shelf>`,
      filter: (alert: Alert) => alert.shelved === true,
    };
  else throw new Error('Invalid selected mode');
}

export function canAckFilter(filter: (alert: Alert) => boolean) {
  return (alert: Alert) =>
    alert.status === AlertStatus.Unacknowledged &&
    !alert.noAck &&
    alert.type !== AlertType.Caution &&
    filter(alert);
}

/**
 * @fires ack-click {ObcAckClickEvent} - Fired when the user clicks the "ACK" button.
 */
@customElement('obc-alert-list-details')
export class ObcAlertListDetails extends LitElement {
  @property({type: String}) selectedMode: AlertListMode = AlertListMode.ALL;
  @property({type: Array}) alerts: Alert[] = [];
  @property({type: Boolean}) showTime: boolean = false;
  @property({attribute: false}) timeFormatter: (time: string) => string = (
    time: string
  ) => new Date(time).toLocaleTimeString(undefined, {hour12: false});
  @property({type: Boolean}) small: boolean = false;

  @query('obc-table')
  private alertList!: ObcTable;

  public getVisibleAlerts(): Alert[] {
    const visibleElements = this.alertList
      .getAllVisibleRows()
      .map((id) => this.alerts.find((alert) => alert.id === id))
      .filter((alert): alert is Alert => alert !== undefined);
    return visibleElements;
  }

  private onRowClick(e: ObcTableRowClickEvent) {
    const row = this.alerts.find((alert) => alert.id === e.detail.row.id);
    if (row) {
      this.dispatchEvent(
        new CustomEvent('row-click', {detail: {alert: row}}) as ObcRowClickEvent
      );
    }
  }

  private onCellButtonClick(e: ObcTableCellClickEvent) {
    const row = this.alerts.find((alert) => alert.id === e.detail.rowId);
    if (row) {
      this.dispatchEvent(
        new CustomEvent('ack-click', {
          detail: {alert: row},
          bubbles: false,
        }) as ObcAckClickEvent
      );
    }
  }

  private get columns() {
    if (this.small) {
      const columns: ObcTableColumn<ObcTableCellData, ObcTableRow>[] = [
        {
          label: 'status',
          key: 'status',
          sortable: true,
        },
      ];
      if (this.showTime) {
        columns.push({
          label: 'Activated',
          key: 'time',
        });
      }
      columns.push({
        label: 'ACK-status',
        key: 'action',
      });
      return columns;
    } else {
      const columns: ObcTableColumn<ObcTableCellData, ObcTableRow>[] = [
        {
          label: 'status',
          key: 'status',
          sortDirection: 'desc',
          sortable: true,
          compareFunction: (_a, _b, aRow, bRow) => {
            const aAlert = this.alerts.find((alert) => alert.id === aRow.id);
            const bAlert = this.alerts.find((alert) => alert.id === bRow.id);
            if (aAlert && bAlert) {
              return comparePriorityAlerts(aAlert, bAlert);
            }
            return 0;
          },
        },
        {
          label: 'ACK-status',
          key: 'action',
          dividerRight: true,
        },
      ];
      if (this.showTime) {
        columns.push({
          label: 'Activated',
          key: 'time',
          sortable: true,
          compareFunction: (_a, _b, aRow, bRow) => {
            const aAlert = this.alerts.find((alert) => alert.id === aRow.id);
            const bAlert = this.alerts.find((alert) => alert.id === bRow.id);
            if (aAlert && bAlert) {
              console.log(aAlert.time, bAlert.time);
              const aTime = new Date(aAlert.time);
              const bTime = new Date(bAlert.time);
              return aTime.getTime() - bTime.getTime();
            }
            return 0;
          },
        });
      }
      columns.push({
        label: 'Tag ID',
        key: 'tagId',
        sortable: true,
        compareFunction: (a, b) => {
          return a.text!.localeCompare(b.text!);
        },
      });
      return columns;
    }
  }

  private get metadata() {
    return getAlertListModeData(this.selectedMode);
  }

  private get filteredAlerts() {
    return this.alerts.filter(this.metadata.filter);
  }

  override render() {
    const selectedList = this.metadata;

    const data = this.filteredAlerts.map((alert) => {
      let action: ObcTableCellData = {
        type: ObcTableCellType.Regular,
      };
      if (
        alert.status === AlertStatus.Unacknowledged &&
        [AlertType.Alarm, AlertType.Warning].includes(alert.type)
      ) {
        if (alert.noAck) {
          const icon =
            alert.type === AlertType.Alarm
              ? html`<obi-alarm-noack-iec usecsscolor></obi-alarm-noack-iec>`
              : html`<obi-warning-noack-iec
                  usecsscolor
                ></obi-warning-noack-iec>`;
          action = {
            type: ObcTableCellType.Regular,
            largeIcon: true,
            icon,
            align: 'center',
          };
        } else {
          action = {
            type: ObcTableCellType.Button,
            text: msg('ACK'),
          };
        }
      }

      const status = {
        type: ObcTableCellType.Regular,
        largeIcon: true,
        text: alert.description,
        title: alert.title,
        noWrap: true,
        icon: html`<obc-alert-icon
          .type=${alert.type}
          .status=${alert.status}
        ></obc-alert-icon>`,
      };

      const time = this.showTime
        ? {
            type: ObcTableCellType.Regular,
            text: this.timeFormatter(alert.time),
            align: 'center',
            neutral: true,
          }
        : undefined;

      const tagId = this.small
        ? undefined
        : {
            type: ObcTableCellType.Regular,
            text: '#' + alert.id,
            align: 'right',
          };
      return {
        id: alert.id,
        status,
        time,
        action,
        tagId,
      };
    });

    return html`
      <div class="wrapper">
        ${data.length > 0
          ? html` <obc-table
                class="alert-list"
                .data=${data}
                .columns=${this.columns}
                .striped=${true}
                .noHeader=${this.small}
                @row-click=${this.onRowClick}
                @cell-button-click=${this.onCellButtonClick}
              ></obc-table>
              <div class="spacer"></div>`
          : html` <div class="empty-list">
              <div class="icon">${selectedList.emptyIcon}</div>
              <div class="empty-title">${selectedList.emptyTitle}</div>
            </div>`}
      </div>
    `;
  }

  static override styles = unsafeCSS(compentStyle);
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-alert-list-details': ObcAlertListDetails;
  }
}
