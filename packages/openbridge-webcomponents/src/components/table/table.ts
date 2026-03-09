import {
  html,
  HTMLTemplateResult,
  LitElement,
  nothing,
  PropertyValues,
  unsafeCSS,
} from 'lit';
import {customElement} from '../../decorator.js';
import compentStyle from './table.css?inline';
import {property, state} from 'lit/decorators.js';
import '../table-header-item/table-header-item.js';
import {ObcTableHeaderItemType} from '../table-header-item/table-header-item.js';
import {classMap} from 'lit/directives/class-map.js';
import '../button/button.js';
import {CheckboxStatus, ObcCheckboxChangeEvent} from '../checkbox/checkbox.js';
import {TagColor} from '../tag/tag.js';
import '../../building-blocks/bar-horizontal/bar-horizontal.js';
import {repeat} from 'lit/directives/repeat.js';
import {map} from 'lit/directives/map.js';
import {ifDefined} from 'lit/directives/if-defined.js';
import {
  ExternalScaleSide,
  FillMode,
  FrameStyle,
  InstrumentState,
  Priority,
  ScaleType,
} from '../../building-blocks/bar-horizontal/bar-horizontal.js';

export enum ObcTableCellType {
  Regular = 'regular',
  Button = 'button',
  Checkbox = 'checkbox',
  Tag = 'tag',
  HorizontalBar = 'horizontal-bar',
}

export interface ObcTableCellDataRegular {
  type: ObcTableCellType.Regular;
  cssPart?: string;
  neutral?: boolean; // If true, the text will be neutral color
  largeIcon?: boolean;
  noWrap?: boolean; // If true, the text will not wrap
  vertical?: boolean; // If true, the text will be displayed vertically
  align?: 'left' | 'center' | 'right';
  text?: string | HTMLTemplateResult;
  title?: string | HTMLTemplateResult;
  icon?: HTMLTemplateResult;
  icon2?: HTMLTemplateResult;
  icon3?: HTMLTemplateResult;
}

export interface ObcTableCellDataButton {
  type: ObcTableCellType.Button;
  cssPart?: string;
  text?: string;
  icon?: HTMLTemplateResult;
}

export interface ObcTableCellDataCheckbox {
  type: ObcTableCellType.Checkbox;
  cssPart?: string;
  label?: string;
  text?: string;
  status?: CheckboxStatus;
  disabled?: boolean;
  ariaDescribedBy?: string;
  align?: 'left' | 'center' | 'right';
}

export interface ObcTableTagData {
  id: string;
  label: string;
  color?: TagColor;
  hasIcon?: boolean;
  icon?: HTMLTemplateResult;
  cssPart?: string;
}

export interface ObcTableCellDataTag {
  type: ObcTableCellType.Tag;
  cssPart?: string;
  align?: 'left' | 'center' | 'right';
  label?: string;
  text?: string;
  color?: TagColor;
  hasIcon?: boolean;
  icon?: HTMLTemplateResult;
  tagId?: string;
  tag?: ObcTableTagData;
  tags?: ObcTableTagData[];
  wrap?: boolean;
  maxTags?: number;
  overflowLabel?: string;
}

export interface ObcTableCellDataHorizontalBar {
  type: ObcTableCellType.HorizontalBar;
  cssPart?: string;
  align?: 'left' | 'center' | 'right';
  minValue?: number;
  maxValue?: number;
  value?: number;
  setpoint?: number;
  hasBar?: boolean;
  hasScale?: boolean;
  hideLabels?: boolean;
  priority?: Priority;
  fillMode?: FillMode;
  fillMin?: number;
  fillMax?: number;
  barThickness?: number;
  scaleType?: ScaleType;
  frameStyle?: FrameStyle;
  side?: ExternalScaleSide;
  state?: InstrumentState;
  fixedAspectRatio?: boolean;
  scaleReferenceSize?: number;
}

export type ObcTableCellData =
  | ObcTableCellDataRegular
  | ObcTableCellDataButton
  | ObcTableCellDataCheckbox
  | ObcTableCellDataTag
  | ObcTableCellDataHorizontalBar;

export interface ObcTableRow {
  selected?: boolean;
  id: string;
  [key: string]: ObcTableCellData | boolean | undefined | string;
}

export interface ObcTableColumnUnsortable<
  T extends ObcTableCellData,
  S extends ObcTableRow,
> {
  label: string;
  key: string;
  headerType?: ObcTableHeaderItemType;
  renderHeaderIcon?: () => HTMLTemplateResult;
  renderCell?: (value: T, row: S, rowId: string) => HTMLTemplateResult;
  dividerRight?: boolean;
}

export interface ObcTableColumnSortable<
  T extends ObcTableCellData,
  S extends ObcTableRow,
> extends ObcTableColumnUnsortable<T, S> {
  sortable: true;
  sortDirection?: 'asc' | 'desc';
  compareFunction: (a: T, b: T, aRow: S, bRow: S) => number;
}

export type ObcTableColumn<
  T extends ObcTableCellData = ObcTableCellData,
  S extends ObcTableRow = ObcTableRow,
> = ObcTableColumnUnsortable<T, S> | ObcTableColumnSortable<T, S>;

export type ObcTableCellClickEvent = CustomEvent<{
  rowId: string;
  columnKey: string;
}>;

export type ObcTableCellCheckboxChangeEvent = CustomEvent<{
  rowId: string;
  columnKey: string;
  status: CheckboxStatus;
  disabled: boolean;
}>;

export type ObcTableCellTagClickEvent = CustomEvent<{
  rowId: string;
  columnKey: string;
  tagId: string;
}>;

export type ObcTableSelectionChangeEvent = CustomEvent<{
  selectedRowIds: string[];
  selectedRows: ObcTableRow[];
  source: 'row' | 'header';
}>;

export type ObcTableRowClickEvent = CustomEvent<{
  row: ObcTableRow;
}>;

function cssPart(value: ObcTableCellData, subpart: string): string | undefined {
  if (value.cssPart) {
    return `${value.cssPart} ${subpart}`;
  }
  return undefined;
}

/**
 * `<obc-table>` renders tabular data with configurable columns and cell types.
 *
 * Overview
 * Use this component to display structured datasets with optional selection, sorting, and rich cell
 * rendering. It accepts `data` and `columns` and renders rows based on column configuration.
 *
 * Features/Variants
 * - Selectable rows with header “select all” checkbox via `selectable=true`.
 * - Cell rendering variants: `checkbox`, `tag`, `horizontal-bar`, and `button` cell types.
 * - Visual variants: `rowDivider`, `striped`, `narrowHeader`, and `noHeader`.
 * - Sorting support for sortable columns via column definitions.
 *
 * Usage Guidelines
 * - Controlled selection: pass `selectedRowIds` and update it on `selection-change`.
 * - Uncontrolled selection: pass `defaultSelectedRowIds` and listen to `selection-change`.
 * - Use `selectAllAriaLabel` to customize the header checkbox accessibility label.
 *
 * Slots/Content
 * - This component does not expose public slots. Provide content via `data` and `columns`.
 *
 * Events
 * - `row-click` fires when a row is clicked.
 * - `cell-button-click` fires when a button cell is clicked.
 * - `cell-checkbox-change` fires when a checkbox cell changes.
 * - `cell-tag-click` fires when a tag inside a cell is clicked.
 * - `selection-change` fires when row selection changes (source: `row` or `header`).
 *
 * Best Practices
 * - Keep column `key` values stable across renders to avoid selection or sorting resets.
 * - Prefer `selectedRowIds` for deterministic state in apps with external stores.
 * - For dense tables, combine `narrowHeader` and `rowDivider` for visual clarity.
 *
 * Example (keywords: table, data grid, grid, tabular, datatable)
 * ```ts
 * html`<obc-table
 *   .data=${rows}
 *   .columns=${columns}
 *   selectable
 *   striped
 *   @selection-change=${onSelectionChange}
 * ></obc-table>`;
 * ```
 *
 * @fires row-click {ObcTableRowClickEvent} - Fired when a row is clicked.
 * @fires cell-button-click {ObcTableCellClickEvent} - Fired when a cell button is clicked.
 * @fires cell-checkbox-change {ObcTableCellCheckboxChangeEvent} - Fired when a cell checkbox is changed.
 * @fires cell-tag-click {ObcTableCellTagClickEvent} - Fired when a tag inside a cell is clicked.
 * @fires selection-change {ObcTableSelectionChangeEvent} - Fired when row selection changes.
 */
@customElement('obc-table')
export class ObcTable extends LitElement {
  @property({type: Array}) data: ObcTableRow[] = [];
  @property({type: Array}) columns: ObcTableColumn[] = [];
  @property({type: Boolean}) rowDivider = false;
  @property({type: Boolean}) narrowHeader = false;
  @property({type: Boolean}) noHeader = false;
  @property({type: Boolean}) striped = false;
  @property({type: Boolean}) selectable = false;
  @property({type: Array}) selectedRowIds?: string[];
  @property({type: Array}) defaultSelectedRowIds?: string[];
  @property({type: String}) selectAllAriaLabel = 'Select all rows';

  @state()
  private _sortByColumnIdx: number | undefined = undefined;

  @state()
  private _sortDirection: 'asc' | 'desc' = 'asc';

  @state()
  private _selectedRowIds: Set<string> = new Set();

  private _previousPositions: {top: number; index: string}[] = [];

  get sortedData() {
    if (this._sortByColumnIdx === undefined) {
      return this.data;
    }
    const sortByColumn = this.columns[this._sortByColumnIdx] as
      | ObcTableColumnSortable<ObcTableCellData, ObcTableRow>
      | undefined;
    if (sortByColumn === undefined) {
      console.warn('Sort by column is undefined');
      return this.data;
    }
    const sortDirection = this._sortDirection;
    const sortedData = [...this.data];
    sortedData.sort((a, b) => {
      const aValue = a[sortByColumn.key];
      const bValue = b[sortByColumn.key];
      if (sortDirection === 'asc') {
        return sortByColumn.compareFunction(
          aValue as ObcTableCellData,
          bValue as ObcTableCellData,
          a,
          b
        );
      } else {
        return sortByColumn.compareFunction(
          bValue as ObcTableCellData,
          aValue as ObcTableCellData,
          b,
          a
        );
      }
    });
    return sortedData;
  }

  private _handleSortClick(
    column: ObcTableColumnSortable<ObcTableCellData, ObcTableRow>
  ) {
    if (!column.sortable) {
      return;
    }
    const newSortColumnIdx = this.columns.indexOf(column);
    if (newSortColumnIdx === this._sortByColumnIdx) {
      this._sortDirection = this._sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this._sortByColumnIdx = newSortColumnIdx;
      this._sortDirection = 'asc';
    }
  }

  private _handleRowClick(row: ObcTableRow) {
    this.dispatchEvent(
      new CustomEvent('row-click', {detail: {row}}) as ObcTableRowClickEvent
    );
  }

  private _focusFirstRow() {
    const firstRow = this.renderRoot.querySelector<HTMLButtonElement>(
      'button[role="row"].grid-row'
    );
    firstRow?.focus();
  }

  private _focusLeftHeaderItem() {
    this._focusHeaderByIndex(0);
  }

  private _focusHeaderByIndex(index: number) {
    const headers = Array.from(
      this.renderRoot.querySelectorAll<HTMLElement>(
        '.grid-header [role="columnheader"]'
      )
    );
    if (headers.length === 0) return;
    const clampedIndex = Math.max(0, Math.min(index, headers.length - 1));
    const headerItem = headers[clampedIndex];
    const innerButton = (headerItem.shadowRoot?.querySelector('button') ??
      null) as HTMLButtonElement | null;
    (innerButton ?? headerItem).focus();
  }

  private _handleHeaderKeyDown(event: KeyboardEvent) {
    const key = event.key;
    if (key === 'ArrowDown') {
      this._focusFirstRow();
      event.preventDefault();
      event.stopPropagation();
      return;
    }
    if (key !== 'ArrowLeft' && key !== 'ArrowRight') {
      return;
    }

    const headers = Array.from(
      this.renderRoot.querySelectorAll<HTMLElement>(
        '.grid-header [role="columnheader"]'
      )
    );
    if (headers.length === 0) return;

    const currentHeaderEl = event.currentTarget as HTMLElement | null;
    const currentIndex = currentHeaderEl
      ? headers.indexOf(currentHeaderEl)
      : -1;
    if (currentIndex === -1) return;

    const nextIndex =
      key === 'ArrowRight'
        ? Math.min(currentIndex + 1, headers.length - 1)
        : Math.max(currentIndex - 1, 0);

    if (nextIndex !== currentIndex) {
      this._focusHeaderByIndex(nextIndex);
      event.preventDefault();
      event.stopPropagation();
    }
  }

  private _handleRowKeyDown(event: KeyboardEvent) {
    const key = event.key;
    if (
      key !== 'ArrowDown' &&
      key !== 'ArrowUp' &&
      key !== 'Home' &&
      key !== 'End'
    ) {
      return;
    }

    const target = event.currentTarget as HTMLButtonElement | null;
    if (!target) return;

    const rows = Array.from(
      this.renderRoot.querySelectorAll<HTMLButtonElement>(
        'button[role="row"].grid-row'
      )
    );

    const currentIndex = rows.indexOf(target);
    if (currentIndex === -1) return;

    let nextIndex = currentIndex;
    switch (key) {
      case 'ArrowDown':
        nextIndex = Math.min(currentIndex + 1, rows.length - 1);
        break;
      case 'ArrowUp':
        if (currentIndex === 0) {
          this._focusLeftHeaderItem();
          event.preventDefault();
          event.stopPropagation();
          return;
        }
        nextIndex = Math.max(currentIndex - 1, 0);
        break;
      case 'Home':
        nextIndex = 0;
        break;
      case 'End':
        nextIndex = rows.length - 1;
        break;
    }

    if (nextIndex !== currentIndex) {
      rows[nextIndex]?.focus();
      event.preventDefault();
      event.stopPropagation();
    } else if (key === 'Home' || key === 'End') {
      // Even if already at boundary, prevent page scroll for Home/End
      event.preventDefault();
      event.stopPropagation();
    }
  }

  private _getAllPositions(): {
    top: number;
    height: number;
    index: string;
    element: HTMLButtonElement;
  }[] {
    const rows = Array.from(
      this.renderRoot.querySelectorAll<HTMLButtonElement>(
        'button[role="row"].grid-row'
      )
    );

    // Calculate the zoom factor for the first row
    const firstRow = rows[0];
    if (!firstRow) {
      return [];
    }
    const firstRowRect = firstRow.getBoundingClientRect();
    const firstRowHeight = firstRowRect.height;
    const computedStyle = getComputedStyle(firstRow);
    const computedHeight = parseFloat(computedStyle.height);
    const zoomFactor = computedHeight / firstRowHeight;

    return rows.map((row) => {
      const rect = row.getBoundingClientRect();
      return {
        top: rect.top * zoomFactor,
        height: rect.height * zoomFactor,
        index: row.getAttribute('data-row-id') ?? '',
        element: row,
      };
    });
  }

  private _animateRowChanges() {
    const previousPositions = this._previousPositions;
    const currentPositions = this._getAllPositions();
    currentPositions.forEach((el) => {
      const previousPosition = previousPositions.find(
        (p) => p.index === el.index
      );
      if (!previousPosition) {
        el.element.style.transform = `translateY(-${el.height}px)`;
        el.element.style.opacity = '0';
      } else {
        el.element.style.transform = `translateY(${previousPosition.top - el.top}px)`;
      }
      el.element.style.transition = 'none';
      // Force a reflow to ensure the animation is applied
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      el.element.offsetHeight;
      el.element.style.transition =
        'transform 100ms ease-in-out, opacity 100ms ease-in-out';
      el.element.style.transform = 'translateY(0px)';
      el.element.style.opacity = '1';
    });

    this._previousPositions = currentPositions;
  }

  private _hasRenderedRows = false;

  override willUpdate(changedProperties: PropertyValues) {
    if (changedProperties.has('defaultSelectedRowIds')) {
      if (
        this.selectedRowIds === undefined &&
        this._selectedRowIds.size === 0
      ) {
        this._selectedRowIds = new Set(this.defaultSelectedRowIds ?? []);
      }
    }

    if (changedProperties.has('selectedRowIds')) {
      if (this.selectedRowIds !== undefined) {
        this._selectedRowIds = new Set(this.selectedRowIds);
      }
    }

    if (changedProperties.has('data')) {
      const availableIds = new Set(this.data.map((row) => row.id));
      this._selectedRowIds.forEach((id) => {
        if (!availableIds.has(id)) {
          this._selectedRowIds.delete(id);
        }
      });
    }

    if (changedProperties.has('data')) {
      if (this._hasRenderedRows) {
        this._updatePositions();
      } else {
        this.updateComplete.then(() => {
          this._hasRenderedRows = true;
        });
      }
    }
  }

  override updated(changedProperties: PropertyValues) {
    if (changedProperties.has('columns')) {
      this._sortByColumnIdx = this.columns.findIndex(
        (col) => 'sortDirection' in col && col.sortDirection !== undefined
      );
      if (this._sortByColumnIdx === -1) {
        this._sortByColumnIdx = undefined;
        this._sortDirection = 'asc';
      } else {
        this._sortDirection =
          (
            this.columns[this._sortByColumnIdx] as ObcTableColumnSortable<
              ObcTableCellData,
              ObcTableRow
            >
          )?.sortDirection ?? 'asc';
      }
    }

    if (changedProperties.has('data')) {
      if (this._hasRenderedRows) {
        this._animateRowChanges();
      }
    }
  }

  private _updatePositions() {
    const positions = this._getAllPositions();
    this._previousPositions = positions;
  }

  override render() {
    const effectiveColumns = this.selectable
      ? ([
          {
            label: '',
            key: '__selection__',
          } as ObcTableColumn,
          ...this.columns,
        ] as ObcTableColumn[])
      : this.columns;
    const selectionColumnCount = this.selectable
      ? Math.max(0, effectiveColumns.length - 1)
      : effectiveColumns.length;
    return html`
      <div
        class=${classMap({
          'grid-container': true,
          'has-selection-column': this.selectable,
        })}
        part="grid"
        style="
          --grid-columns: ${effectiveColumns.length};
          --grid-columns-rest: ${selectionColumnCount};
          --selection-column-width: var(--menu-navigation-components-table-item-touch-target-size);
        "
        role="table"
      >
        ${this.noHeader
          ? nothing
          : html`
              <div class="grid-header" role="row">
                ${effectiveColumns.map((col) => {
                  const isSelectionColumn =
                    this.selectable && col.key === '__selection__';
                  const isNotLast =
                    effectiveColumns.indexOf(col) !==
                    effectiveColumns.length - 1;
                  const icon = col.renderHeaderIcon
                    ? html`<span slot="leading-icon"
                        >${col.renderHeaderIcon()}</span
                      >`
                    : nothing;

                  const columnIndex = this.columns.findIndex(
                    (column) => column.key === col.key
                  );
                  const sorted =
                    'sortable' in col &&
                    col.sortable &&
                    this._sortByColumnIdx === columnIndex;
                  const sortDirection = sorted ? this._sortDirection : 'none';
                  const headerType =
                    col.headerType ??
                    (this.narrowHeader
                      ? ObcTableHeaderItemType.Narrow
                      : ObcTableHeaderItemType.Regular);
                  if ('sortable' in col && col.sortable && !isSelectionColumn) {
                    return html`<obc-table-header-item
                      role="columnheader"
                      class=${isSelectionColumn ? 'selection-header' : ''}
                      .showDivider=${isNotLast}
                      ?hasLeadingIcon=${icon !== nothing}
                      .sortDirection=${sortDirection}
                      .sortable=${true}
                      type=${headerType}
                      @click=${() =>
                        this._handleSortClick(
                          col as ObcTableColumnSortable<
                            ObcTableCellData,
                            ObcTableRow
                          >
                        )}
                      @keydown=${this._handleHeaderKeyDown}
                      >${icon}${col.label}</obc-table-header-item
                    > `;
                  } else {
                    if (isSelectionColumn) {
                      return html`<div
                        role="columnheader"
                        class=${classMap({
                          'selection-header': true,
                        })}
                        tabindex="0"
                        @keydown=${this._handleHeaderKeyDown}
                      >
                        <obc-checkbox
                          .status=${this._getSelectionStatus()}
                          .disabled=${false}
                          aria-label=${this.selectAllAriaLabel}
                          @click=${(event: MouseEvent) => {
                            event.preventDefault();
                            event.stopPropagation();
                          }}
                          @change=${() => this._toggleAllSelection()}
                        ></obc-checkbox>
                      </div>`;
                    }
                    return html`<obc-table-header-item
                      role="columnheader"
                      class=${isSelectionColumn ? 'selection-header' : ''}
                      .showDivider=${isNotLast}
                      ?hasLeadingIcon=${icon !== nothing}
                      type=${headerType}
                      >${icon}${col.label}</obc-table-header-item
                    >`;
                  }
                })}
              </div>
              <div class="grid-header-divider"></div>
            `}
        <div
          class="grid-body"
          style="grid-template-rows: repeat(${this.sortedData
            .length}, min-content)"
        >
          ${repeat(
            this.sortedData,
            (row) => row.id,
            (row, rowIndex) => {
              const hasDivider =
                this.rowDivider && this.data.length - 1 !== rowIndex;
              const isStriped = this.striped && rowIndex % 2 === 1;
              const isRowSelected =
                (row.selected ?? false) ||
                (this.selectable && this._selectedRowIds.has(row.id));
              const previousRow =
                rowIndex > 0 ? this.sortedData[rowIndex - 1] : undefined;
              const nextRow =
                rowIndex < this.sortedData.length - 1
                  ? this.sortedData[rowIndex + 1]
                  : undefined;
              const hasSelectedPreviousRow =
                previousRow !== undefined &&
                ((previousRow.selected ?? false) ||
                  (this.selectable &&
                    this._selectedRowIds.has(previousRow.id)));
              const hasSelectedNextRow =
                nextRow !== undefined &&
                ((nextRow.selected ?? false) ||
                  (this.selectable && this._selectedRowIds.has(nextRow.id)));
              return html`
                <button
                  role="row"
                  class=${classMap({
                    'grid-row': true,
                    selected: isRowSelected,
                    'selected-with-prev':
                      isRowSelected && hasSelectedPreviousRow,
                    'selected-with-next': isRowSelected && hasSelectedNextRow,
                    striped: isStriped,
                  })}
                  @click=${() => this._handleRowClick(row)}
                  @keydown=${this._handleRowKeyDown}
                  data-row-id=${row.id}
                  style="grid-row: ${rowIndex + 1}"
                  part="row"
                >
                  ${map(effectiveColumns, (col) => {
                    if (this.selectable && col.key === '__selection__') {
                      const checked = this._selectedRowIds.has(row.id);
                      return html`<div
                        class="grid-cell checkbox align-center selection"
                        role="cell"
                      >
                        <obc-checkbox
                          .status=${checked
                            ? CheckboxStatus.checked
                            : CheckboxStatus.unchecked}
                          .disabled=${false}
                          aria-label=${`Select row ${row.id}`}
                          @click=${(event: MouseEvent) => {
                            event.preventDefault();
                            event.stopPropagation();
                          }}
                          @change=${() => this._toggleRowSelection(row.id)}
                        ></obc-checkbox>
                      </div>`;
                    }
                    const value = row[col.key];
                    if (value === undefined) {
                      return html`<div class="grid-cell" role="cell"></div>`;
                    }
                    if (col.renderCell) {
                      return html`<div
                        class="grid-cell ${col.dividerRight
                          ? 'divider-right'
                          : ''}"
                        role="cell"
                        part=${ifDefined((value as ObcTableCellData).cssPart)}
                      >
                        ${col.renderCell(
                          value as ObcTableCellData,
                          row,
                          row.id
                        )}
                      </div>`;
                    } else {
                      return this._renderCell(
                        value as ObcTableCellData,
                        row,
                        col
                      );
                    }
                  })}
                  ${hasDivider
                    ? html`<div class="grid-row-divider"></div>`
                    : nothing}
                </button>
              `;
            }
          )}
          ${repeat(
            effectiveColumns,
            (col) => col.key,
            (col, colIndex) =>
              col.dividerRight
                ? html`<div
                    class="grid-column-divider"
                    style="grid-column: ${colIndex + 1}; grid-row: 1/${this
                      .sortedData.length + 1}"
                  ></div>`
                : nothing
          )}
        </div>
      </div>
    `;
  }

  public getAllVisibleRows(): string[] {
    const rows = Array.from(
      this.renderRoot.querySelectorAll<HTMLButtonElement>(
        'button[role="row"].grid-row'
      )
    );
    const bodyRect = this.renderRoot
      .querySelector('.grid-body')
      ?.getBoundingClientRect();
    if (!bodyRect) {
      return [];
    }
    const scrollTop = bodyRect.top;
    const scrollHeight = bodyRect.height;
    const scrollBottom = scrollTop + scrollHeight;
    return rows
      .filter((el) => el.checkVisibility())
      .filter(
        (el) =>
          el.getBoundingClientRect().top >= scrollTop &&
          el.getBoundingClientRect().bottom <= scrollBottom
      )
      .map((row) => row.getAttribute('data-row-id'))
      .filter((id): id is string => id !== null);
  }

  private _handleCellButtonClick(
    event: MouseEvent,
    row: ObcTableRow,
    columnKey: string
  ) {
    event.preventDefault();
    event.stopPropagation();
    const e: ObcTableCellClickEvent = new CustomEvent('cell-button-click', {
      detail: {rowId: row.id, columnKey},
    });
    this.dispatchEvent(e);
  }

  private _handleCellTagClick(
    event: MouseEvent,
    row: ObcTableRow,
    columnKey: string,
    tagId: string
  ) {
    event.preventDefault();
    event.stopPropagation();
    const e: ObcTableCellTagClickEvent = new CustomEvent('cell-tag-click', {
      detail: {rowId: row.id, columnKey, tagId},
    });
    this.dispatchEvent(e);
  }

  private _handleCellCheckboxChange(
    event: ObcCheckboxChangeEvent,
    row: ObcTableRow,
    columnKey: string
  ) {
    event.preventDefault();
    event.stopPropagation();
    const e: ObcTableCellCheckboxChangeEvent = new CustomEvent(
      'cell-checkbox-change',
      {
        detail: {
          rowId: row.id,
          columnKey,
          status: event.detail.status,
          disabled: event.detail.disabled,
        },
      }
    );
    this.dispatchEvent(e);
  }

  private _getSelectableRowIds(): string[] {
    return this.data.map((row) => row.id);
  }

  private _getSelectionStatus(): CheckboxStatus {
    const rowIds = this._getSelectableRowIds();
    if (rowIds.length === 0) return CheckboxStatus.unchecked;
    const selectedCount = rowIds.filter((id) =>
      this._selectedRowIds.has(id)
    ).length;
    if (selectedCount === 0) return CheckboxStatus.unchecked;
    if (selectedCount === rowIds.length) return CheckboxStatus.checked;
    return CheckboxStatus.mixed;
  }

  private _emitSelectionChange(
    selectedRowIds: string[],
    source: 'row' | 'header'
  ) {
    const selectedRows = this.data.filter((row) =>
      selectedRowIds.includes(row.id)
    );
    const e: ObcTableSelectionChangeEvent = new CustomEvent(
      'selection-change',
      {
        detail: {selectedRowIds, selectedRows, source},
      }
    );
    this.dispatchEvent(e);
  }

  private _applySelectionChange(
    nextSelection: Set<string>,
    source: 'row' | 'header'
  ) {
    const selectedRowIds = Array.from(nextSelection);
    this._emitSelectionChange(selectedRowIds, source);
    if (this.selectedRowIds === undefined) {
      this._selectedRowIds = nextSelection;
      this.requestUpdate();
    }
  }

  private _toggleRowSelection(rowId: string) {
    const nextSelection = new Set(this._selectedRowIds);
    if (nextSelection.has(rowId)) {
      nextSelection.delete(rowId);
    } else {
      nextSelection.add(rowId);
    }
    this._applySelectionChange(nextSelection, 'row');
  }

  private _toggleAllSelection() {
    const rowIds = this._getSelectableRowIds();
    const status = this._getSelectionStatus();
    const nextSelection =
      status === CheckboxStatus.checked ? new Set<string>() : new Set(rowIds);
    this._applySelectionChange(nextSelection, 'header');
  }

  private _renderCell(
    value: ObcTableCellData,
    row: ObcTableRow,
    column: ObcTableColumn<ObcTableCellData, ObcTableRow>
  ) {
    if (value.type === ObcTableCellType.Regular) {
      return html`<div
        class=${classMap({
          'grid-cell': true,
          regular: true,
          neutral: value.neutral ?? false,
          'large-icon': value.largeIcon ?? false,
          'no-wrap': value.noWrap ?? false,
          [`align-${value.align ?? 'left'}`]: true,
          'divider-right': column.dividerRight ?? false,
          vertical: value.vertical ?? false,
        })}
        role="cell"
        part=${ifDefined(cssPart(value, 'cell'))}
      >
        ${value.icon3
          ? html`<span class="icon" part=${ifDefined(cssPart(value, 'icon3'))}
              >${value.icon3}</span
            >`
          : nothing}
        ${value.icon2
          ? html`<span class="icon" part=${ifDefined(cssPart(value, 'icon2'))}
              >${value.icon2}</span
            >`
          : nothing}
        ${value.icon
          ? html`<span class="icon" part=${ifDefined(cssPart(value, 'icon'))}
              >${value.icon}</span
            >`
          : nothing}
        ${value.title
          ? html`<span class="title" part=${ifDefined(cssPart(value, 'title'))}
              >${value.title}</span
            >`
          : nothing}
        ${value.text
          ? html`<span part=${ifDefined(cssPart(value, 'text'))}
              >${value.text}</span
            >`
          : nothing}
      </div>`;
    } else if (value.type === ObcTableCellType.Button) {
      return html`<div
        class="grid-cell button ${column.dividerRight ? 'divider-right' : ''}"
        role="cell"
      >
        <obc-button
          variant="normal"
          fullWidth
          ?showLeadingIcon=${value.icon !== undefined}
          part=${ifDefined(cssPart(value, 'button'))}
          @click=${(event: MouseEvent) =>
            this._handleCellButtonClick(event, row, column.key)}
        >
          ${value.icon
            ? html`<span
                slot="leading-icon"
                part=${ifDefined(cssPart(value, 'icon'))}
                >${value.icon}</span
              >`
            : nothing}
          ${value.text
            ? html`<span part=${ifDefined(cssPart(value, 'text'))}
                >${value.text}</span
              >`
            : nothing}
        </obc-button>
      </div>`;
    } else if (value.type === ObcTableCellType.Checkbox) {
      const checkboxLabel = value.label ?? value.text ?? '';
      const ariaLabel =
        checkboxLabel.trim() || column.label?.trim() || 'Checkbox';
      return html`<div
        class=${classMap({
          'grid-cell': true,
          checkbox: true,
          [`align-${value.align ?? 'center'}`]: true,
          'divider-right': column.dividerRight ?? false,
        })}
        role="cell"
        part=${ifDefined(cssPart(value, 'cell'))}
      >
        <obc-checkbox
          .status=${value.status ?? CheckboxStatus.unchecked}
          .disabled=${value.disabled ?? false}
          aria-describedby=${ifDefined(value.ariaDescribedBy)}
          aria-label=${ariaLabel}
          part=${ifDefined(cssPart(value, 'checkbox'))}
          @click=${(event: MouseEvent) => {
            event.preventDefault();
            event.stopPropagation();
          }}
          @change=${(event: ObcCheckboxChangeEvent) =>
            this._handleCellCheckboxChange(event, row, column.key)}
        ></obc-checkbox>
      </div>`;
    } else if (value.type === ObcTableCellType.Tag) {
      const tags: ObcTableTagData[] = value.tags ??
        (value.tag ? [value.tag] : undefined) ?? [
          {
            id: value.tagId ?? 'tag',
            label: value.label ?? value.text ?? 'Label',
            color: value.color,
            hasIcon: value.hasIcon,
            icon: value.icon,
          },
        ];
      const wrap = value.wrap ?? value.tags !== undefined;
      const defaultMaxTags = value.tags ? 2 : undefined;
      const maxTags =
        (value.maxTags ?? defaultMaxTags) !== undefined
          ? Math.max(0, Math.floor(value.maxTags ?? defaultMaxTags ?? 0))
          : undefined;
      const visibleTags = maxTags !== undefined ? tags.slice(0, maxTags) : tags;
      const overflowCount =
        maxTags !== undefined ? Math.max(0, tags.length - maxTags) : 0;
      const overflowLabel =
        value.overflowLabel ?? `+${overflowCount.toString()}`;
      return html`<div
        class=${classMap({
          'grid-cell': true,
          tags: tags.length > 1,
          wrap,
          [`align-${value.align ?? 'left'}`]: true,
          'divider-right': column.dividerRight ?? false,
        })}
        role="cell"
        part=${ifDefined(cssPart(value, 'cell'))}
      >
        ${visibleTags.map((tag) => {
          const hasIcon = tag.hasIcon ?? tag.icon !== undefined;
          return html`<obc-tag
            .label=${tag.label}
            color=${tag.color ?? TagColor.gray}
            ?hasIcon=${hasIcon}
            part=${ifDefined(
              [cssPart(value, 'tag'), tag.cssPart].filter(Boolean).join(' ') ||
                undefined
            )}
            @click=${(event: MouseEvent) =>
              this._handleCellTagClick(event, row, column.key, tag.id)}
          >
            ${hasIcon && tag.icon ? tag.icon : nothing}
          </obc-tag>`;
        })}
        ${overflowCount > 0
          ? html`<span
              class="tag-overflow"
              part=${ifDefined(cssPart(value, 'tag-overflow'))}
              >${overflowLabel}</span
            >`
          : nothing}
      </div>`;
    } else if (value.type === ObcTableCellType.HorizontalBar) {
      const hasBar = value.hasBar ?? true;
      const hasScale = value.hasScale ?? false;
      const hideLabels = value.hideLabels ?? true;
      const fixedAspectRatio = value.fixedAspectRatio ?? true;
      return html`<div
        class=${classMap({
          'grid-cell': true,
          'horizontal-bar': true,
          [`align-${value.align ?? 'left'}`]: true,
          'divider-right': column.dividerRight ?? false,
        })}
        role="cell"
        part=${ifDefined(cssPart(value, 'cell'))}
      >
        <obc-bar-horizontal
          .minValue=${value.minValue ?? 0}
          .maxValue=${value.maxValue ?? 100}
          .value=${value.value}
          .setpoint=${value.setpoint}
          .hasBar=${hasBar}
          .hasScale=${hasScale}
          .hideLabels=${hideLabels}
          .priority=${value.priority ?? Priority.regular}
          .fillMode=${value.fillMode ?? FillMode.fill}
          .fillMin=${value.fillMin}
          .fillMax=${value.fillMax}
          .barThickness=${value.barThickness ?? 24}
          .scaleType=${value.scaleType ?? ScaleType.regular}
          .frameStyle=${value.frameStyle ?? FrameStyle.regular}
          .side=${value.side ?? ExternalScaleSide.bottom}
          .state=${value.state ?? InstrumentState.active}
          .fixedAspectRatio=${fixedAspectRatio}
          .scaleReferenceSize=${value.scaleReferenceSize ?? 384}
          part=${ifDefined(cssPart(value, 'bar'))}
        ></obc-bar-horizontal>
      </div>`;
    } else {
      return nothing;
    }
  }

  static override styles = unsafeCSS(compentStyle);
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-table': ObcTable;
  }
}
