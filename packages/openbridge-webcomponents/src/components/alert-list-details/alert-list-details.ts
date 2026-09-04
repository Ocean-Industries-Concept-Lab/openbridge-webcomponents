import {LitElement, html, unsafeCSS} from 'lit';
import {customElement} from '../../decorator.js';
import compentStyle from './alert-list-details.css?inline';
import {msg} from '@lit/localize';
import {property, query, state} from 'lit/decorators.js';
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

/**
 * Grouping
 * An alert listing `memberOf` is rendered as a child of every alert it names,
 * so an alert belonging to two groups appears under both. An alert that others
 * are members of becomes a group row: it is an ordinary alert row with a
 * chevron, and stays one whether its severity mirrors its members or it exists
 * only to head the group. An alert whose parents are all filtered out of the
 * current mode, or whose grouping is cyclic, is promoted to the top level
 * rather than hidden — the list never drops an alert because of where it sits
 * in the hierarchy.
 *
 * @availableWhen timeFormatter showTime==true
 * @availableWhen timeFormatter showTime==true

  /** Whether groups start expanded. Set false to open the list collapsed. */
  @property({type: Boolean, attribute: false}) defaultExpanded: boolean = true;
 * @fires {ObcAckClickEvent} ack-click - Fired when the user clicks the "ACK" button.
 * @fires {ObcRowClickEvent} row-click - Fired when the user clicks a row.
 * @stable
 */
@customElement('obc-alert-list-details')
export class ObcAlertListDetails extends LitElement {
  @property({type: String}) selectedMode: AlertListMode = AlertListMode.ALL;
  @property({type: Array}) alerts: Alert[] = [];
  @property({type: Boolean}) showTime: boolean = false;
  @property({attribute: false}) timeFormatter: (time: Date) => string = (
    time: Date
  ) => time.toLocaleTimeString(undefined, {hour12: false});
  @property({type: Boolean}) small: boolean = false;
  @property({type: Boolean, attribute: false}) defaultExpanded: boolean = true;

  @query('obc-table')
  private alertList!: ObcTable;

  @state() private expansionOverrides = new Map<string, boolean>();

  /**
   * The alert each rendered row stands for. A row id is a path, because one
   * alert can appear under several groups, so it is not an alert id.
   */
  private alertByRowId = new Map<string, Alert>();

  /** Deduplicated: an alert visible under two groups is still one alert. */
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
    const row = this.alertByRowId.get(e.detail.row.id);
    if (row) {
      this.dispatchEvent(
        new CustomEvent('row-click', {detail: {alert: row}}) as ObcRowClickEvent
      );
    }
  }

  private onCellButtonClick(e: ObcTableCellClickEvent) {
    const row = this.alertByRowId.get(e.detail.rowId);
    if (row) {
      this.dispatchEvent(
        new CustomEvent('ack-click', {
          detail: {alert: row},
          bubbles: false,
        }) as ObcAckClickEvent
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

  private get columns() {
    if (this.small) {
      const columns: ObcTableColumn<ObcTableCellData, ObcTableRow>[] = [
        {
          label: 'status',
          key: 'status',
          sortDirection: 'desc',
          sortable: true,
          compareFunction: (_a, _b, aRow, bRow) => {
            const aAlert = this.alertByRowId.get(aRow.id);
            const bAlert = this.alertByRowId.get(bRow.id);
            if (aAlert && bAlert) {
              return comparePriorityAlerts(aAlert, bAlert);
            }
            return 0;
          },
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
            const aAlert = this.alertByRowId.get(aRow.id);
            const bAlert = this.alertByRowId.get(bRow.id);
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
            const aAlert = this.alertByRowId.get(aRow.id);
            const bAlert = this.alertByRowId.get(bRow.id);
            if (aAlert && bAlert) {
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
          const aText =
            a?.type === ObcTableCellType.Regular ? String(a.text ?? '') : '';
          const bText =
            b?.type === ObcTableCellType.Regular ? String(b.text ?? '') : '';
          return aText.localeCompare(bText);
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

  /**
   * The rows to render, depth-first, with a collapsed group's descendants left
   * out. Fills {@link alertByRowId} on the way, so the row a click or a sort
   * lands on can be traced back to its alert.
   *
   * Every filtered alert reaches the list. An alert no group walk can descend
   * to — one whose `memberOf` chain only ever leads back into a cycle, and
   * anything grouped below it — becomes a root of its own, since an alert list
   * that quietly omits an active alarm is worse than one grouped oddly.
   * Reachability is computed before rendering, not after: a collapsed group's
   * members are unrendered but still reachable, and must not be promoted.
   */
  private buildVisibleRows(): ObcTableRow[] {
    const alerts = this.filteredAlerts;
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

    const rows: ObcTableRow[] = [];
    this.alertByRowId = new Map();
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
      const expanded = this.isExpanded(rowId);

      this.alertByRowId.set(rowId, alert);
      rows.push({
        ...this.buildRowCells(alert),
        id: rowId,
        parentId: parentRowId,
        level,
        expandable: expandableMembers.length > 0,
        expanded,
      });

      if (!expanded) {
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

  private buildRowCells(
    alert: Alert
  ): Record<string, ObcTableCellData | undefined> {
    let action: ObcTableCellData = {
      type: ObcTableCellType.Regular,
    };
    if (
      !isAcknowledged(alert) &&
      isActive(alert) &&
      requiresAcknowledgement(alert.type)
    ) {
      if (alert.noAck) {
        const icon = usesAlarmNoAckIcon(alert.type)
          ? html`<obi-alarm-noack-iec usecsscolor></obi-alarm-noack-iec>`
          : html`<obi-warning-noack-iec usecsscolor></obi-warning-noack-iec>`;
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

    const status: ObcTableCellData = {
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
    };

    const time: ObcTableCellData | undefined = this.showTime
      ? {
          type: ObcTableCellType.Regular,
          text: this.timeFormatter(alert.time),
          align: 'center',
          neutral: true,
        }
      : undefined;

    const tagId: ObcTableCellData | undefined = this.small
      ? undefined
      : {
          type: ObcTableCellType.Regular,
          text: '#' + alert.id,
          align: 'right',
        };
    return {
      status,
      time,
      action,
      tagId,
    };
  }

  override render() {
    const selectedList = this.metadata;
    const data = this.buildVisibleRows();

    return html`
      <div class="wrapper ${this.small ? 'small' : ''}">
        ${data.length > 0
          ? html` <obc-table
                class="alert-list"
                .data=${data}
                .columns=${this.columns}
                .striped=${true}
                .showHeader=${!this.small}
                @row-click=${this.onRowClick}
                @cell-button-click=${this.onCellButtonClick}
                @expand-toggle=${this.onExpandToggle}
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
