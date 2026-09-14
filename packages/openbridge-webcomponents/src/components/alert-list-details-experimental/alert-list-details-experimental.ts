import {LitElement, html, unsafeCSS} from 'lit';
import {customElement} from '../../decorator.js';
import compentStyle from './alert-list-details-experimental.css?inline';
import {msg} from '@lit/localize';
import {property, query, state} from 'lit/decorators.js';
import {repeat} from 'lit/directives/repeat.js';
import '../icon-button/icon-button.js';
import '../button/button.js';
import '../../icons/icon-silence-iec.js';
import '../../icons/icon-alerts.js';
import '../../icons/icon-alerts-shelf.js';
import '../../icons/icon-alerts-active.js';
import '../../icons/icon-alarm-rectified-iec.js';
import '../../icons/icon-unacknowledged.js';
import '../../icons/icon-alarm-noack-iec.js';
import '../../icons/icon-warning-noack-iec.js';
import '../alert-icon/alert-icon.js';
import {
  Alert,
  comparePriorityAlerts,
  isActive,
  isAcknowledged,
  isBlocked,
  isShelved,
} from '../../types.js';
import {
  excludedFromUnackedFilter,
  requiresAcknowledgement,
  usesAlarmNoAckIcon,
} from '../../alert-severity.js';
import {
  ObcTable,
  ObcTableCellClickEvent,
  ObcTableCellData,
  ObcTableCellType,
  ObcTableExpandToggleEvent,
  ObcTableRowClickEvent,
  ObcTableRow,
  ObcTableColumn,
} from '../table/table.js';
import '../scrollbar/scrollbar.js';

export enum AlertListMode {
  UNACKED = 'unacked',
  ALL = 'all',
  SHELVED = 'shelved',
  BLOCKED = 'blocked',
  RECTIFIED = 'rectified',
}

export type ObcAlertListCellClickEvent = CustomEvent<{
  alert: Alert;
  columnKey: string;
  rowId: string;
}>;

export type ObcRowClickEvent = CustomEvent<{
  alert: Alert;
  rowId: string;
}>;

export interface AlertListColumnBase {
  /** Unique within the list; part of the cell slot name. */
  key: string;
  label: string;
  /** CSS grid track size. Defaults to `1fr` for the first column, `min-content` for the rest. */
  width?: string;
  dividerRight?: boolean;
}

/** A column whose cells the list renders from `cell(alert)`. */
export interface AlertListDataColumn extends AlertListColumnBase {
  cell: (alert: Alert) => ObcTableCellData | undefined;
  /** Makes the column sortable. */
  compare?: (a: Alert, b: Alert) => number;
  sortDirection?: 'asc' | 'desc';
}

/** A column whose cells the consumer supplies through `cell-<key>-<rowId>` slots. */
export interface AlertListSlotColumn extends AlertListColumnBase {
  slot: true;
}

export type AlertListColumn = AlertListDataColumn | AlertListSlotColumn;

export type AlertListColumnOptions = Partial<AlertListColumnBase>;

export interface AlertListRow {
  rowId: string;
  parentRowId?: string;
  alert: Alert;
  level: number;
  expandable: boolean;
}

export function getAlertListModeData(selectedMode: AlertListMode) {
  if (selectedMode === AlertListMode.ALL)
    return {
      name: AlertListMode.ALL,
      title: msg('All'),
      emptyTitle: msg('No active alerts'),
      emptyIcon: html`<obi-alerts></obi-alerts>`,
      filter: (alert: Alert) => !isShelved(alert) && isActive(alert),
    };
  else if (selectedMode === AlertListMode.UNACKED)
    return {
      name: AlertListMode.UNACKED,
      title: msg('Unacked'),
      emptyTitle: msg('No unacknowledged alerts'),
      emptyIcon: html`<obi-unacknowledged></obi-unacknowledged>`,
      filter: (alert: Alert) =>
        !isAcknowledged(alert) &&
        isActive(alert) &&
        !excludedFromUnackedFilter(alert.type) &&
        !isShelved(alert),
    };
  else if (selectedMode === AlertListMode.SHELVED)
    return {
      name: AlertListMode.SHELVED,
      title: msg('Shelved'),
      emptyTitle: msg('No shelved alerts'),
      emptyIcon: html`<obi-alerts-shelf></obi-alerts-shelf>`,
      filter: (alert: Alert) => isShelved(alert),
    };
  else if (selectedMode === AlertListMode.BLOCKED)
    return {
      name: AlertListMode.BLOCKED,
      title: msg('Blocked'),
      emptyTitle: msg('No blocked alerts'),
      emptyIcon: html`<obi-alerts-active></obi-alerts-active>`,
      filter: (alert: Alert) => isBlocked(alert),
    };
  else if (selectedMode === AlertListMode.RECTIFIED)
    return {
      name: AlertListMode.RECTIFIED,
      title: msg('Rectified'),
      emptyTitle: msg('No rectified alerts'),
      emptyIcon: html`<obi-alarm-rectified-iec></obi-alarm-rectified-iec>`,
      filter: (alert: Alert) => !isActive(alert),
    };
  else throw new Error('Invalid selected mode');
}

export function canAckFilter(filter: (alert: Alert) => boolean) {
  return (alert: Alert) =>
    !isAcknowledged(alert) &&
    !alert.noAck &&
    !excludedFromUnackedFilter(alert.type) &&
    filter(alert);
}

/** Name of the slot that fills the cell of a slot column in one row. */
export function alertListCellSlotName(columnKey: string, rowId: string) {
  return `cell-${columnKey}-${rowId}`;
}

/** Alert icon, text and source; sorted by priority. */
export function statusColumn(
  options: AlertListColumnOptions = {}
): AlertListDataColumn {
  return {
    key: 'status',
    label: 'Status',
    sortDirection: 'desc',
    compare: comparePriorityAlerts,
    cell: (alert) => ({
      type: ObcTableCellType.Regular,
      largeIcon: true,
      text: alert.text,
      title: alert.source,
      noWrap: true,
      icon: html`<obc-alert-icon
        .type=${alert.type}
        .acknowledged=${isAcknowledged(alert)}
        .active=${isActive(alert)}
      ></obc-alert-icon>`,
    }),
    ...options,
  };
}

/** ACK button, or the no-ack icon, for alerts that await acknowledgement. The button fires `cell-click`. */
export function ackColumn(
  options: AlertListColumnOptions = {}
): AlertListDataColumn {
  return {
    key: 'ack',
    label: 'ACK-status',
    cell: (alert) => {
      if (
        isAcknowledged(alert) ||
        !isActive(alert) ||
        !requiresAcknowledgement(alert.type)
      ) {
        return {type: ObcTableCellType.Regular};
      }
      if (alert.noAck) {
        const icon = usesAlarmNoAckIcon(alert.type)
          ? html`<obi-alarm-noack-iec usecsscolor></obi-alarm-noack-iec>`
          : html`<obi-warning-noack-iec usecsscolor></obi-warning-noack-iec>`;
        return {
          type: ObcTableCellType.Regular,
          largeIcon: true,
          icon,
          align: 'center',
        };
      }
      return {type: ObcTableCellType.Button, text: msg('ACK')};
    },
    ...options,
  };
}

/** Activation time; sorted by time. */
export function timeColumn({
  formatter = (time: Date) =>
    time.toLocaleTimeString(undefined, {hour12: false}),
  ...options
}: AlertListColumnOptions & {
  formatter?: (time: Date) => string;
} = {}): AlertListDataColumn {
  return {
    key: 'time',
    label: 'Activated',
    compare: (a, b) => new Date(a.time).getTime() - new Date(b.time).getTime(),
    cell: (alert) => ({
      type: ObcTableCellType.Regular,
      text: formatter(alert.time),
      align: 'center',
      neutral: true,
    }),
    ...options,
  };
}

/** Alert id prefixed with `#`; sorted alphabetically. */
export function tagIdColumn(
  options: AlertListColumnOptions = {}
): AlertListDataColumn {
  return {
    key: 'tagId',
    label: 'Tag ID',
    compare: (a, b) => a.id.localeCompare(b.id),
    cell: (alert) => ({
      type: ObcTableCellType.Regular,
      text: '#' + alert.id,
      align: 'right',
    }),
    ...options,
  };
}

function isSlotColumn(column: AlertListColumn): column is AlertListSlotColumn {
  return 'slot' in column && column.slot === true;
}

/** Keeps column keys clear of the row fields `obc-table` reserves (`id`, `level`, …). */
const TABLE_KEY_PREFIX = 'column-';

function walkAlertRows(
  alerts: Alert[],
  isExpanded: (rowId: string) => boolean
): AlertListRow[] {
  const alertIds = new Set(alerts.map((alert) => alert.id));
  const membersByGroupId = new Map<string, Alert[]>();
  const roots: Alert[] = [];
  for (const alert of alerts) {
    const groupIds = (alert.memberOf ?? []).filter(
      (groupId) => groupId !== alert.id && alertIds.has(groupId)
    );
    if (groupIds.length === 0) {
      roots.push(alert);
      continue;
    }
    for (const groupId of groupIds) {
      const members = membersByGroupId.get(groupId) ?? [];
      members.push(alert);
      membersByGroupId.set(groupId, members);
    }
  }

  const reachable = new Set<string>();
  const markReachable = (alert: Alert) => {
    if (reachable.has(alert.id)) {
      return;
    }
    reachable.add(alert.id);
    for (const member of membersByGroupId.get(alert.id) ?? []) {
      markReachable(member);
    }
  };
  roots.forEach(markReachable);
  for (const alert of alerts) {
    if (!reachable.has(alert.id)) {
      roots.push(alert);
      markReachable(alert);
    }
  }

  const rows: AlertListRow[] = [];
  const visit = (
    alert: Alert,
    level: number,
    parentRowId: string | undefined,
    ancestors: Set<string>
  ) => {
    const segment = encodeURIComponent(alert.id);
    const rowId =
      parentRowId === undefined ? segment : `${parentRowId}/${segment}`;
    const members = membersByGroupId.get(alert.id) ?? [];
    // A member can name a group that is also its own descendant.
    const expandableMembers = members.filter(
      (member) => !ancestors.has(member.id)
    );

    rows.push({
      rowId,
      parentRowId,
      alert,
      level,
      expandable: expandableMembers.length > 0,
    });

    if (!isExpanded(rowId)) {
      return;
    }
    const nextAncestors = new Set(ancestors).add(alert.id);
    for (const member of expandableMembers) {
      visit(member, level + 1, rowId, nextAncestors);
    }
  };

  for (const alert of roots) {
    visit(alert, 0, undefined, new Set());
  }
  return rows;
}

/**
 * Every row `obc-alert-list-details-experimental` can show for these alerts
 * and mode, rows inside collapsed groups included. An alert that is a member
 * of several groups gets one row, and one `rowId`, under each.
 */
export function getAlertRows(
  alerts: Alert[],
  selectedMode: AlertListMode
): AlertListRow[] {
  const {filter} = getAlertListModeData(selectedMode);
  return walkAlertRows(alerts.filter(filter), () => true);
}

/**
 * `<obc-alert-list-details-experimental>` lists alerts in a table with
 * consumer-defined columns, grouping alerts through `memberOf`.
 *
 * ## Features
 * - **Columns:** `columns` sets which columns show and in what order. A data
 *   column renders each cell from `cell(alert)`; a slot column renders
 *   whatever the consumer places in the cell's slot.
 * - **Column factories:** `statusColumn()`, `ackColumn()`, `timeColumn()` and
 *   `tagIdColumn()` build the standard data columns; each takes overrides
 *   such as `label`, `width` or `dividerRight`.
 * - **Modes:** `selectedMode` filters to unacknowledged, all, shelved,
 *   blocked or rectified alerts, with an empty state per mode.
 * - **Grouping:** an alert listing group ids in `memberOf` renders under each
 *   of those groups; groups nest and can be collapsed.
 *
 * ## Usage Guidelines
 * - Use a slot column when the cell content must be owned by the consumer,
 *   for example a button the application disables or removes later. Slotted
 *   content stays in the light DOM, so it can be looked up by id.
 * - Slot names are `cell-<key>-<rowId>`. Get the row ids from
 *   `getAlertRows(alerts, selectedMode)` and the names from
 *   `alertListCellSlotName(key, rowId)`. An alert in two groups has two rows,
 *   so it needs content in two slots.
 * - Clicks on buttons, links and inputs in a cell do not fire `row-click`.
 *
 * ## Example
 * ```html
 * <obc-alert-list-details-experimental>
 *   <obc-button slot="cell-ack-radar" id="ack-radar">ACK</obc-button>
 * </obc-alert-list-details-experimental>
 * ```
 * with `columns` set to `[statusColumn(), {key: 'ack', label: 'ACK-status', slot: true}]`.
 *
 * @property selectedMode - Which alerts to list.
 * @property alerts - Alerts to list.
 * @property columns - Columns in display order.
 * @property showHeader - Whether to show the column header row.
 * @property defaultExpanded - Whether groups start expanded. Set false to open the list collapsed.
 * @slot cell-<key>-<rowId> - Content of the cell in slot column `<key>` for row `<rowId>`.
 * @fires {ObcAlertListCellClickEvent} cell-click - Fired when the user clicks a button rendered by a data column, such as the one from `ackColumn()`.
 * @fires {ObcRowClickEvent} row-click - Fired when the user clicks a row.
 * @experimental
 */
@customElement('obc-alert-list-details-experimental')
export class ObcAlertListDetailsExperimental extends LitElement {
  @property({type: String}) selectedMode: AlertListMode = AlertListMode.ALL;
  @property({type: Array}) alerts: Alert[] = [];
  @property({type: Array, attribute: false}) columns: AlertListColumn[] = [
    statusColumn(),
    ackColumn({dividerRight: true}),
    tagIdColumn(),
  ];
  @property({type: Boolean, attribute: false}) showHeader: boolean = true;
  @property({type: Boolean, attribute: false}) defaultExpanded: boolean = true;

  @query('obc-table')
  private alertList!: ObcTable;

  @state() private expansionOverrides = new Map<string, boolean>();

  private alertByRowId = new Map<string, Alert>();

  public getVisibleAlerts(): Alert[] {
    const seen = new Set<string>();
    return this.alertList
      .getAllVisibleRows()
      .map((rowId) => this.alertByRowId.get(rowId))
      .filter((alert): alert is Alert => alert !== undefined)
      .filter((alert) => {
        if (seen.has(alert.id)) {
          return false;
        }
        seen.add(alert.id);
        return true;
      });
  }

  private onRowClick(e: ObcTableRowClickEvent) {
    const rowId = e.detail.row.id;
    const alert = this.alertByRowId.get(rowId);
    if (alert) {
      this.dispatchEvent(
        new CustomEvent('row-click', {
          detail: {alert, rowId},
        }) as ObcRowClickEvent
      );
    }
  }

  private onCellButtonClick(e: ObcTableCellClickEvent) {
    const {rowId, columnKey} = e.detail;
    const alert = this.alertByRowId.get(rowId);
    if (alert) {
      this.dispatchEvent(
        new CustomEvent('cell-click', {
          detail: {
            alert,
            columnKey: columnKey.slice(TABLE_KEY_PREFIX.length),
            rowId,
          },
          bubbles: false,
        }) as ObcAlertListCellClickEvent
      );
    }
  }

  private onExpandToggle(e: ObcTableExpandToggleEvent) {
    const overrides = new Map(this.expansionOverrides);
    overrides.set(e.detail.rowId, e.detail.expanded);
    this.expansionOverrides = overrides;
  }

  private isExpanded(rowId: string) {
    return this.expansionOverrides.get(rowId) ?? this.defaultExpanded;
  }

  private compareRows(
    compare: (a: Alert, b: Alert) => number,
    aRow: ObcTableRow,
    bRow: ObcTableRow
  ) {
    const aAlert = this.alertByRowId.get(aRow.id);
    const bAlert = this.alertByRowId.get(bRow.id);
    return aAlert && bAlert ? compare(aAlert, bAlert) : 0;
  }

  private get tableColumns(): ObcTableColumn[] {
    return this.columns.map((column): ObcTableColumn => {
      const base = {
        label: column.label,
        key: TABLE_KEY_PREFIX + column.key,
        dividerRight: column.dividerRight,
      };
      if (isSlotColumn(column)) {
        return {
          ...base,
          renderCell: (_value, row) =>
            html`<slot
              name=${alertListCellSlotName(column.key, row.id)}
            ></slot>`,
        };
      }
      const {compare} = column;
      if (compare) {
        return {
          ...base,
          sortable: true,
          sortDirection: column.sortDirection,
          compareFunction: (_a, _b, aRow, bRow) =>
            this.compareRows(compare, aRow, bRow),
        };
      }
      return base;
    });
  }

  private get gridColumns() {
    return this.columns
      .map(
        (column, index) => column.width ?? (index === 0 ? '1fr' : 'min-content')
      )
      .join(' ');
  }

  private get metadata() {
    return getAlertListModeData(this.selectedMode);
  }

  private buildVisibleRows(): ObcTableRow[] {
    const rows = walkAlertRows(
      this.alerts.filter(this.metadata.filter),
      (rowId) => this.isExpanded(rowId)
    );
    this.alertByRowId = new Map(rows.map((row) => [row.rowId, row.alert]));
    return rows.map((row) => ({
      ...this.buildRowCells(row.alert),
      id: row.rowId,
      parentId: row.parentRowId,
      level: row.level,
      expandable: row.expandable,
      expanded: this.isExpanded(row.rowId),
    }));
  }

  private buildRowCells(
    alert: Alert
  ): Record<string, ObcTableCellData | undefined> {
    const cells: Record<string, ObcTableCellData | undefined> = {};
    for (const column of this.columns) {
      cells[TABLE_KEY_PREFIX + column.key] = isSlotColumn(column)
        ? // obc-table skips renderCell for an undefined value.
          {type: ObcTableCellType.Regular}
        : column.cell(alert);
    }
    return cells;
  }

  private slotNames(rows: ObcTableRow[]) {
    const slotColumns = this.columns.filter(isSlotColumn);
    return rows.flatMap((row) =>
      slotColumns.map((column) => alertListCellSlotName(column.key, row.id))
    );
  }

  override render() {
    const selectedList = this.metadata;
    const data = this.buildVisibleRows();

    return html`
      <div class="wrapper">
        ${data.length > 0
          ? html` <obc-table
                class="alert-list"
                style="--alert-list-grid-columns: ${this.gridColumns}"
                .data=${data}
                .columns=${this.tableColumns}
                .striped=${true}
                .showHeader=${this.showHeader}
                @row-click=${this.onRowClick}
                @cell-button-click=${this.onCellButtonClick}
                @expand-toggle=${this.onExpandToggle}
              >
                ${repeat(
                  this.slotNames(data),
                  (name) => name,
                  // Forwards the host's slot into the one obc-table renders in the cell.
                  (name) => html`<slot name=${name} slot=${name}></slot>`
                )}
              </obc-table>
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
    'obc-alert-list-details-experimental': ObcAlertListDetailsExperimental;
  }
}
