import {LitElement, PropertyValues, html, unsafeCSS} from 'lit';
import {customElement} from '../../decorator.js';
import compentStyle from './alert-list-page-small.css?inline';
import {msg} from '@lit/localize';
import {property, query, state} from 'lit/decorators.js';
import '../../building-blocks/alert-list/alert-list.js';
import '../../components/icon-button/icon-button.js';
import '../../components/button/button.js';
import '../../icons/icon-silence-iec.js';
import '../../icons/icon-alerts.js';
import '../../icons/icon-alerts-shelf.js';
import '../../icons/icon-unacknowledged.js';
import '../../components/dropdown-button/dropdown-button.js';
import {ObcDropdownButtonChangeEvent} from '../../components/dropdown-button/dropdown-button.js';
import '../../icons/icon-alarm-noack-iec.js';
import '../../icons/icon-warning-noack-iec.js';
import {
  Alarm,
  AlarmStatus,
  AlertType,
  comparePriorityAlarms,
} from '../../types.js';
import {
  ObcTable,
  ObcTableCellClickEvent,
  ObcTableCellData,
  ObcTableCellType,
  ObcTableRowClickEvent,
  ObcTableRow,
  ObcTableColumn,
} from '../../components/table/table.js';
import '../../components/scrollbar/scrollbar.js';

export enum AlertListMode {
  UNACKED = 'unacked',
  ALL = 'all',
  SHELVED = 'shelved',
}

export type ObcAlertListPageAckAllClickEvent = CustomEvent<{
  mode: AlertListMode;
  alarms: Alarm[];
}>;

export type ObcAckClickEvent = CustomEvent<{
  alarm: Alarm;
}>;

/**
 * @fires ack-all-visible-click {ObcAlertListPageAckAllClickEvent} - Fired when the user clicks the "ACK visible" button.
 * @fires ack-click {ObcAckClickEvent} - Fired when the user clicks the "ACK" button.
 */
@customElement('obc-alert-list-page-small')
export class ObcAlertListPageSmall extends LitElement {
  @property({type: Boolean}) hasShelved: boolean = false;
  @property({type: String}) selectedMode: AlertListMode = AlertListMode.ALL;
  @property({type: Array}) alarms: Alarm[] = [];
  @property({type: Boolean}) showTime: boolean = false;
  @property({attribute: false}) timeFormatter: (time: string) => string = (
    time: string
  ) => new Date(time).toLocaleTimeString(undefined, {hour12: false});

  @state() private _mode: AlertListMode = AlertListMode.ALL;

  @query('obc-table')
  private alertList!: ObcTable;

  override connectedCallback(): void {
    super.connectedCallback();
    this._mode = this.selectedMode;
  }

  override willUpdate(changedProperties: PropertyValues): void {
    if (
      changedProperties.has('selectedMode') &&
      this._mode !== this.selectedMode
    ) {
      this._mode = this.selectedMode;
    }
  }

  private handleAckAllVisibleClick() {
    const tabName = this.selectedMode;
    const visibleElements = this.alertList
      .getAllVisibleRows()
      .map((id) => this.alarms.find((alarm) => alarm.id === id))
      .filter((alarm): alarm is Alarm => alarm !== undefined);
    this.dispatchEvent(
      new CustomEvent('ack-all-visible-click', {
        detail: {
          alarms: visibleElements,
          mode: tabName,
        },
      }) as ObcAlertListPageAckAllClickEvent
    );
  }

  private onRowClick(e: ObcTableRowClickEvent) {
    console.log(e);
  }

  private onCellButtonClick(e: ObcTableCellClickEvent) {
    const row = this.alarms.find((alarm) => alarm.id === e.detail.rowId);
    if (row) {
      this.dispatchEvent(
        new CustomEvent('ack-click', {detail: {alarm: row}}) as ObcAckClickEvent
      );
    }
  }

  private onModeSelect(e: ObcDropdownButtonChangeEvent) {
    this._mode = e.detail.value as AlertListMode;
  }

  private get columns() {
    const columns: ObcTableColumn<ObcTableCellData, ObcTableRow>[] = [
      {
        label: 'status',
        key: 'status',
        sortable: true,
      },
    ];
    if (this.showTime) {
      columns.push({
        label: 'time',
        key: 'time',
      });
    }
    columns.push({
      label: 'action',
      key: 'action',
    });
    return columns;
  }

  override render() {
    const lists = [
      {
        name: AlertListMode.ALL,
        title: msg('All'),
        emptyTitle: msg('No active alerts'),
        emptyIcon: html`<obi-alerts></obi-alerts>`,
        filter: (alert: Alarm) => !alert.shelved,
      },
      {
        name: AlertListMode.UNACKED,
        title: msg('Unacked'),
        emptyTitle: msg('No unacknowledged alerts'),
        emptyIcon: html`<obi-unacknowledged></obi-unacknowledged>`,
        filter: (alert: Alarm) =>
          alert.status === AlarmStatus.Unacknowledged &&
          alert.type !== AlertType.Caution &&
          !alert.shelved,
      },
    ];
    if (this.hasShelved) {
      lists.push({
        name: AlertListMode.SHELVED,
        title: msg('Shelved'),
        emptyTitle: msg('No shelved alerts'),
        emptyIcon: html`<obi-alerts-shelf></obi-alerts-shelf>`,
        filter: (alert: Alarm) => alert.shelved === true,
      });
    }

    const selectedList = lists.find((v) => v.name === this._mode)!;
    const filteredAlarms = this.alarms
      .filter(selectedList.filter)
      .sort(comparePriorityAlarms);

    const data = filteredAlarms.map((alarm) => {
      let action: ObcTableCellData = {
        type: ObcTableCellType.Regular,
      };
      if (
        alarm.status === AlarmStatus.Unacknowledged &&
        [AlertType.Alarm, AlertType.Warning].includes(alarm.type)
      ) {
        if (alarm.noAck) {
          const icon =
            alarm.type === AlertType.Alarm
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
        text: alarm.description,
        title: alarm.title,
        noWrap: true,
        icon: html`<obc-alert-icon
          .type=${alarm.type}
          .status=${alarm.status}
        ></obc-alert-icon>`,
      };

      const time = this.showTime
        ? {
            type: ObcTableCellType.Regular,
            text: this.timeFormatter(alarm.time),
          }
        : undefined;

      return {
        id: alarm.id,
        status,
        time,
        action,
      };
    });

    const canAckAll = filteredAlarms.some(
      (alarm) =>
        alarm.status === AlarmStatus.Unacknowledged &&
        !alarm.noAck &&
        alarm.type !== AlertType.Caution
    );

    return html`
      <div class="wrapper">
        ${data.length > 0
          ? html` <obc-table
                class="alert-list"
                .data=${data}
                .columns=${this.columns}
                .striped=${true}
                .noHeader=${true}
                @row-click=${this.onRowClick}
                @cell-button-click=${this.onCellButtonClick}
              ></obc-table>
              <div class="spacer"></div>`
          : html` <div class="empty-list">
              <div class="icon">${selectedList.emptyIcon}</div>
              <div class="empty-title">${selectedList.emptyTitle}</div>
            </div>`}
        <div class="action">
          <div class="btn-group">
            <obc-dropdown-button
              .value=${this._mode}
              @change=${this.onModeSelect}
              .options=${lists.map((v) => ({
                value: v.name,
                label: v.title,
              }))}
            >
            </obc-dropdown-button>
          </div>

          <div class="btn-group">
            <obc-icon-button
              variant="normal"
              @click=${() =>
                this.dispatchEvent(new CustomEvent('silence-click'))}
            >
              <obi-silence-iec></obi-silence-iec>
            </obc-icon-button>
            <obc-button
              variant="raised"
              .disabled=${!canAckAll}
              fullWidth
              class="btn"
              data-testid="ack-all-visible-button"
              @click=${() => this.handleAckAllVisibleClick()}
            >
              ${msg('ACK visible')}
            </obc-button>
          </div>
        </div>
      </div>
    `;
  }

  static override styles = unsafeCSS(compentStyle);
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-alert-list-page-small': ObcAlertListPageSmall;
  }
}
