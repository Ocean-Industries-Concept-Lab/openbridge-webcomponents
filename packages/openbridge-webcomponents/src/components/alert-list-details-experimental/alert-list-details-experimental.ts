import {LitElement, PropertyValues, html, unsafeCSS} from 'lit';
import {ifDefined} from 'lit/directives/if-defined.js';
import {customElement} from '../../decorator.js';
import compentStyle from './alert-list-details-experimental.css?inline';
import {localized, msg} from '@lit/localize';
import {property, query, state} from 'lit/decorators.js';
import {repeat} from 'lit/directives/repeat.js';
import '../icon-button/icon-button.js';
import '../button/button.js';
import '../../icons/icon-silence-iec.js';
import '../../icons/icon-alerts.js';
import '../alert-icon-experimental/alert-icon-experimental.js';
import {
  StyleType,
  Variant,
  initialsFromName,
} from '../user-button/user-button.js';
import type {StandardAlert} from '../../alert-system/standard-alert.js';
import {ownEntryOf} from '../../alert-system/alert-standard.js';
import {AlertStandardController} from '../../alert-system/alert-standard-registry.js';
import {
  alertActionLabel,
  compareAlertsBySortingRank,
  findAlertStateDefinition,
  isAlertIncludedInFilter,
  offeredAlertActionIds,
} from '../../alert-system/read-standard-alert.js';
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

export type ObcAlertListCellClickEvent = CustomEvent<{
  alert: StandardAlert;
  columnKey: string;
  rowId: string;
  /** The action of the clicked button, when its column says which. */
  actionId?: string;
}>;

/** The fields `statusColumn()` reads beside the standard, criticality and state. */
export interface AlertDescriptionFields {
  text: string;
  source?: string;
}

/** The field `timeColumn()` reads. */
export interface AlertTimeField {
  time: Date;
}

/** The field `tagIdColumn()` reads. */
export interface AlertTagIdField {
  tagId: string;
}

/** The field `actionColumn()` reads for an alert that offers no action. */
export interface AlertAcknowledgedByField {
  acknowledgedBy?: string;
}

/** An alert with every field the standard column factories read. */
export type StandardAlertWithColumnFields = StandardAlert &
  AlertDescriptionFields &
  AlertTimeField &
  AlertTagIdField &
  AlertAcknowledgedByField;

export type ObcRowClickEvent = CustomEvent<{
  alert: StandardAlert;
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

/**
 * A column whose cells the list renders from `cell(alert)`.
 *
 * `cell`, `compare` and `actionIdOfCellButton` are declared as methods so
 * that a column reading extra fields of the alert, such as
 * `AlertListDataColumn<StandardAlert & AlertTimeField>`, fits in `columns`.
 * The application then passes alerts that carry those fields.
 */
export interface AlertListDataColumn<
  Alert extends StandardAlert = StandardAlert,
> extends AlertListColumnBase {
  cell(alert: Alert): ObcTableCellData | undefined;
  /** Makes the column sortable. */
  compare?(a: Alert, b: Alert): number;
  sortDirection?: 'asc' | 'desc';
  /** The action a click on the cell's button stands for; reported in `cell-click`. */
  actionIdOfCellButton?(alert: Alert): string | undefined;
}

/** A column whose cells the consumer supplies through `cell-<key>:<rowId>` slots. */
export interface AlertListSlotColumn extends AlertListColumnBase {
  slot: true;
}

export type AlertListColumn = AlertListDataColumn | AlertListSlotColumn;

export type AlertListColumnOptions = Partial<AlertListColumnBase>;

/** One cell of a slot column, for every row including rows in collapsed groups. */
export interface AlertListCellSlot {
  name: string;
  alert: StandardAlert;
  rowId: string;
  columnKey: string;
}

export type ObcAlertListCellSlotsChangeEvent = CustomEvent<AlertListCellSlot[]>;

export interface AlertListRow {
  rowId: string;
  parentRowId?: string;
  alert: StandardAlert;
  level: number;
  expandable: boolean;
}

/** Name of the slot that fills the cell of a slot column in one row. */
export function alertListCellSlotName(columnKey: string, rowId: string) {
  // Row ids are URI-encoded too, so neither part can contain the `:` separator.
  return `cell-${encodeURIComponent(columnKey)}:${rowId}`;
}

/**
 * Alert icon, text and source. Sorts by the sorting rank each alert's
 * standard gives its state, the lowest rank on top.
 */
export function statusColumn(
  options: AlertListColumnOptions = {}
): AlertListDataColumn<StandardAlert & AlertDescriptionFields> {
  return {
    key: 'status',
    label: 'Status',
    sortDirection: 'desc',
    compare: (a, b) => compareAlertsBySortingRank(b, a),
    cell: (alert) => ({
      type: ObcTableCellType.Regular,
      largeIcon: true,
      text: alert.text,
      title: alert.source,
      noWrap: true,
      icon: html`<obc-alert-icon-experimental
        .standard=${alert.standard}
        .criticality=${alert.criticality}
        .state=${alert.state}
      ></obc-alert-icon-experimental>`,
    }),
    ...options,
  };
}

function firstOfferedActionId(alert: StandardAlert): string | undefined {
  return offeredAlertActionIds(alert)[0];
}

/**
 * A button for the first action the alert's state offers, which fires
 * `cell-click` with the action's id. A state that offers no action shows the
 * glyph its standard defines for that, else the initials of `acknowledgedBy`.
 */
export function actionColumn(
  options: AlertListColumnOptions = {}
): AlertListDataColumn<StandardAlert & AlertAcknowledgedByField> {
  return {
    key: 'action',
    label: 'Action',
    actionIdOfCellButton: firstOfferedActionId,
    cell: (alert) => {
      const actionId = firstOfferedActionId(alert);
      if (actionId !== undefined) {
        return {
          type: ObcTableCellType.Button,
          text: alertActionLabel(alert.standard, actionId),
        };
      }
      const glyphShownInsteadOfActions =
        findAlertStateDefinition(alert)?.glyphShownInsteadOfActions;
      if (glyphShownInsteadOfActions) {
        return {
          type: ObcTableCellType.Regular,
          largeIcon: true,
          icon: glyphShownInsteadOfActions,
          align: 'center',
        };
      }
      const acknowledgedBy = alert.acknowledgedBy?.trim();
      if (!acknowledgedBy) {
        return {type: ObcTableCellType.Regular};
      }
      return {
        type: ObcTableCellType.Regular,
        largeIcon: true,
        icon: html`<obc-user-button
          .variant=${Variant.initials}
          .initials=${initialsFromName(acknowledgedBy)}
          .static=${true}
          .styleType=${StyleType.normal}
        ></obc-user-button>`,
        align: 'center',
      };
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
} = {}): AlertListDataColumn<StandardAlert & AlertTimeField> {
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

/** Tag ID prefixed with `#`; sorted alphabetically. */
export function tagIdColumn(
  options: AlertListColumnOptions = {}
): AlertListDataColumn<StandardAlert & AlertTagIdField> {
  return {
    key: 'tagId',
    label: 'Tag ID',
    compare: (a, b) => a.tagId.localeCompare(b.tagId),
    cell: (alert) => ({
      type: ObcTableCellType.Regular,
      text: '#' + alert.tagId,
      align: 'right',
    }),
    ...options,
  };
}

function isSlotColumn(column: AlertListColumn): column is AlertListSlotColumn {
  return 'slot' in column && column.slot === true;
}

/** Row ids join URI-encoded alert ids with `/`, so the last `/` separates the parent. */
function parentRowIdOf(rowId: string): string | undefined {
  const separatorIndex = rowId.lastIndexOf('/');
  return separatorIndex === -1 ? undefined : rowId.slice(0, separatorIndex);
}

/** Keeps column keys clear of the row fields `obc-table` reserves (`id`, `level`, …). */
const TABLE_KEY_PREFIX = 'column-';

function walkAlertRows(
  alerts: StandardAlert[],
  isExpanded: (rowId: string) => boolean
): AlertListRow[] {
  const alertIds = new Set(alerts.map((alert) => alert.id));
  const membersByGroupId = new Map<string, StandardAlert[]>();
  const roots: StandardAlert[] = [];
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
  const markReachable = (alert: StandardAlert) => {
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
    alert: StandardAlert,
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

function alertsTheListShows(
  alerts: StandardAlert[],
  filterId: string | undefined,
  customFilter: ((alert: StandardAlert) => boolean) | undefined
): StandardAlert[] {
  return alerts.filter(
    (alert) =>
      isAlertIncludedInFilter(alert, filterId) &&
      (customFilter?.(alert) ?? true)
  );
}

/**
 * Every row `obc-alert-list-details-experimental` can show for these alerts
 * and filter, rows inside collapsed groups included. An alert that is a member
 * of several groups gets one row, and one `rowId`, under each.
 */
export function getAlertRows(
  alerts: StandardAlert[],
  filterId?: string,
  customFilter?: (alert: StandardAlert) => boolean
): AlertListRow[] {
  return walkAlertRows(
    alertsTheListShows(alerts, filterId, customFilter),
    () => true
  );
}

/**
 * `<obc-alert-list-details-experimental>` lists alerts in a table with
 * consumer-defined columns, grouping alerts through `memberOf`.
 *
 * ## Features
 * - **Columns:** `columns` sets which columns show and in what order. A data
 *   column renders each cell from `cell(alert)`; a slot column renders
 *   whatever the consumer places in the cell's slot.
 * - **Alerts:** an alert needs only `id`, `standard`, `criticality` and
 *   `state`; its alert standard (`alert-system/`) decides its icon, where it
 *   sorts, which filters include it and which actions it offers. Each column
 *   names the other fields it reads, and the application's own alert objects
 *   can carry any more.
 * - **Column factories:** `statusColumn()`, `actionColumn()`, `timeColumn()`
 *   and `tagIdColumn()` build the standard data columns; each takes overrides
 *   such as `label`, `width` or `dividerRight`.
 * - **Filter:** `filterId` names a filter of the alerts' standards, such as
 *   `active` or `unacked`, and the list shows the alerts whose state is
 *   included in it; every alert shows without one. `customFilter` narrows the
 *   list further. The empty state is the one `standard` gives the filter.
 * - **Grouping:** an alert listing group ids in `memberOf` renders under each
 *   of those groups; groups nest and can be collapsed.
 * - **Selection:** `selectedRowId` highlights one row. When a collapsed group
 *   hides it, the nearest visible group row is highlighted instead.
 *
 * ## Usage Guidelines
 * - Use a slot column when the cell content must be owned by the consumer,
 *   for example a button the application disables or removes later. Slotted
 *   content stays in the light DOM, so it can be looked up by id.
 * - Slot names are `cell-<key>:<rowId>`. `cellSlots` lists every one, with its
 *   alert, row id and column key, and `cell-slots-change` fires when the list
 *   changes. The Svelte wrapper renders its `cell` snippet once per entry. An
 *   alert in two groups has two rows, so it gets two entries.
 * - Without a wrapper, build the names from
 *   `getAlertRows(alerts, filterId, customFilter)` and
 *   `alertListCellSlotName(key, rowId)`, or read `cellSlots`.
 * - Clicks on buttons, links and inputs in a cell do not fire `row-click`.
 * - The consumer owns the selection: set `selectedRowId` from `row-click`, and
 *   set it to `undefined` on a second click to unselect. The list never changes
 *   it; clear it when the row is no longer in `getAlertRows()`.
 *
 * ## Example
 * ```html
 * <obc-alert-list-details-experimental>
 *   <obc-button slot="cell-ack:radar" id="ack-radar">ACK</obc-button>
 * </obc-alert-list-details-experimental>
 * ```
 * with `columns` set to `[statusColumn(), {key: 'ack', label: 'ACK-status', slot: true}]`.
 *
 * @property filterId - The filter whose alerts to list; every alert is listed when unset.
 * @property customFilter - Predicate an alert must also pass to be listed.
 * @property standard - The standard whose filter supplies the empty state; the default standard (`setDefaultAlertStandard`) when unset.
 * @property alerts - Alerts to list, each naming its own standard.
 * @property columns - Columns in display order.
 * @property showHeader - Whether to show the column header row.
 * @property defaultExpanded - Whether groups start expanded. Set false to open the list collapsed.
 * @property selectedRowId - Row id to highlight, as given by `row-click` or `getAlertRows()`. Nothing is highlighted when no row has this id.
 * @property ariaLabel - Accessible name of the list, mapped to the `aria-label` attribute and forwarded to its table. `aria-labelledby` is not supported: ID references cannot cross the shadow boundary.
 * @slot cell-<key>:<rowId> - Content of the cell in slot column `<key>` for row `<rowId>`.
 * @fires {ObcAlertListCellClickEvent} cell-click - Fired when the user clicks a button rendered by a data column, such as the one from `actionColumn()`, which adds the id of the action.
 * @fires {ObcRowClickEvent} row-click - Fired when the user clicks a row.
 * @fires {ObcAlertListCellSlotsChangeEvent} cell-slots-change - Fired when `cellSlots` changes; the detail is the new list.
 * @experimental
 */
@customElement('obc-alert-list-details-experimental')
@localized()
export class ObcAlertListDetailsExperimental extends LitElement {
  // Reactive so a consumer changing the name re-renders the table.
  @property({type: String, attribute: 'aria-label'})
  override ariaLabel: string | null = null;

  @property({type: String}) filterId?: string;
  @property({attribute: false}) customFilter?: (
    alert: StandardAlert
  ) => boolean;
  @property({type: String}) standard?: string;
  @property({type: Array}) alerts: StandardAlert[] = [];
  @property({type: Array, attribute: false}) columns: AlertListColumn[] = [
    statusColumn(),
    actionColumn({dividerRight: true}),
    tagIdColumn(),
  ];
  @property({type: Boolean, attribute: false}) showHeader: boolean = true;
  @property({type: Boolean, attribute: false}) defaultExpanded: boolean = true;
  @property({type: String}) selectedRowId?: string;

  private readonly standardController = new AlertStandardController(this);

  @query('obc-table')
  private alertList!: ObcTable;

  @state() private expansionOverrides = new Map<string, boolean>();

  private alertByRowId = new Map<string, StandardAlert>();
  private allRowIds = new Set<string>();

  private _cellSlots: AlertListCellSlot[] = [];
  private cellSlotsChanged = false;

  /** Slot of every cell in a slot column, rows in collapsed groups included. */
  get cellSlots(): AlertListCellSlot[] {
    return this._cellSlots;
  }

  override willUpdate(changed: PropertyValues<this>) {
    if (
      !changed.has('alerts') &&
      !changed.has('columns') &&
      !changed.has('filterId') &&
      !changed.has('customFilter')
    ) {
      return;
    }
    const rows = getAlertRows(this.alerts, this.filterId, this.customFilter);
    this.allRowIds = new Set(rows.map((row) => row.rowId));
    const slotColumns = this.columns.filter(isSlotColumn);
    const next = rows.flatMap((row) =>
      slotColumns.map((column) => ({
        name: alertListCellSlotName(column.key, row.rowId),
        alert: row.alert,
        rowId: row.rowId,
        columnKey: column.key,
      }))
    );
    const unchanged =
      next.length === this._cellSlots.length &&
      next.every(
        (slot, index) =>
          slot.name === this._cellSlots[index].name &&
          slot.alert === this._cellSlots[index].alert
      );
    if (!unchanged) {
      this._cellSlots = next;
      this.cellSlotsChanged = true;
    }
  }

  override updated() {
    if (this.cellSlotsChanged) {
      this.cellSlotsChanged = false;
      this.dispatchEvent(
        new CustomEvent('cell-slots-change', {
          detail: this._cellSlots,
        }) as ObcAlertListCellSlotsChangeEvent
      );
    }
  }

  public getVisibleAlerts(): StandardAlert[] {
    const seen = new Set<string>();
    return this.alertList
      .getAllVisibleRows()
      .map((rowId) => this.alertByRowId.get(rowId))
      .filter((alert): alert is StandardAlert => alert !== undefined)
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
    const {rowId} = e.detail;
    const columnKey = e.detail.columnKey.slice(TABLE_KEY_PREFIX.length);
    const alert = this.alertByRowId.get(rowId);
    if (alert) {
      const column = this.columns.find(
        (candidate) => candidate.key === columnKey
      );
      const actionId =
        column && !isSlotColumn(column)
          ? column.actionIdOfCellButton?.(alert)
          : undefined;
      this.dispatchEvent(
        new CustomEvent('cell-click', {
          detail: {alert, columnKey, rowId, actionId},
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
    compare: NonNullable<AlertListDataColumn['compare']>,
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
    const columnTracks = this.columns.map(
      (column, index) => column.width ?? (index === 0 ? '1fr' : 'min-content')
    );
    // The empty trailing track takes the table body's end padding and
    // scrollbar gutter, which obc-table's subgrids add to the last track.
    return [...columnTracks, 'min-content'].join(' ');
  }

  private buildVisibleRows(): ObcTableRow[] {
    const rows = walkAlertRows(
      alertsTheListShows(this.alerts, this.filterId, this.customFilter),
      (rowId) => this.isExpanded(rowId)
    );
    this.alertByRowId = new Map(rows.map((row) => [row.rowId, row.alert]));
    const highlightedRowId = this.highlightedRowId();
    return rows.map((row) => ({
      ...this.buildRowCells(row.alert),
      id: row.rowId,
      parentId: row.parentRowId,
      level: row.level,
      expandable: row.expandable,
      expanded: this.isExpanded(row.rowId),
      selected: row.rowId === highlightedRowId,
    }));
  }

  /** The selected row, or the nearest visible group row when a collapsed group hides it. */
  private highlightedRowId(): string | undefined {
    if (
      this.selectedRowId === undefined ||
      !this.allRowIds.has(this.selectedRowId)
    ) {
      return undefined;
    }
    let rowId: string | undefined = this.selectedRowId;
    while (rowId !== undefined && !this.alertByRowId.has(rowId)) {
      rowId = parentRowIdOf(rowId);
    }
    return rowId;
  }

  private buildRowCells(
    alert: StandardAlert
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

  private get emptyState(): {icon: unknown; title: string} {
    const filter = ownEntryOf(
      this.standardController.standard?.filters,
      this.filterId
    );
    return {
      icon:
        filter?.iconWhenNoAlertIsIncluded ?? html`<obi-alerts></obi-alerts>`,
      title: filter?.titleWhenNoAlertIsIncluded() ?? msg('No alerts'),
    };
  }

  override render() {
    const emptyState = this.emptyState;
    const data = this.buildVisibleRows();

    return html`
      <div class="wrapper">
        ${
          data.length > 0
            ? html` <obc-table
                  class="alert-list"
                  aria-label=${ifDefined(this.ariaLabel ?? undefined)}
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
                <div class="icon">${emptyState.icon}</div>
                <div class="empty-title">${emptyState.title}</div>
              </div>`
        }
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
