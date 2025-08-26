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

export enum ObcTableCellType {
  Regular = 'regular',
  LargeIcon = 'large-icon',
  Button = 'button',
}

export interface ObcTableCellDataRegular {
  type: ObcTableCellType.Regular;
  text?: string;
  title?: string;
  icon?: HTMLTemplateResult;
  icon2?: HTMLTemplateResult;
  icon3?: HTMLTemplateResult;
}

export interface ObcTableCellDataLargeIcon {
  type: ObcTableCellType.LargeIcon;
  icon: HTMLTemplateResult;
  icon2?: HTMLTemplateResult;
  icon3?: HTMLTemplateResult;
}

export interface ObcTableCellDataButton {
  type: ObcTableCellType.Button;
  text: string;
  icon: HTMLTemplateResult;
}

export type ObcTableCellData =
  | ObcTableCellDataRegular
  | ObcTableCellDataLargeIcon
  | ObcTableCellDataButton;

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
  renderHeaderIcon?: () => HTMLTemplateResult;
  renderCell?: (value: T, row: S, rowId: string) => HTMLTemplateResult;
}

export interface ObcTableColumnSortable<
  T extends ObcTableCellData,
  S extends ObcTableRow,
> extends ObcTableColumnUnsortable<T, S> {
  sortable: true;
  sortDirection?: 'asc' | 'desc';
  compareFunction: (a: T, b: T) => number;
}

export type ObcTableColumn<T extends ObcTableCellData, S extends ObcTableRow> =
  | ObcTableColumnUnsortable<T, S>
  | ObcTableColumnSortable<T, S>;

export type ObcTableCellClickEvent = CustomEvent<{
  rowId: string;
  columnKey: string;
}>;

/**
 * @fires cell-button-click {ObcTableCellClickEvent} - Fired when a cell button is clicked.
 */
@customElement('obc-table')
export class ObcTable<T extends ObcTableRow> extends LitElement {
  @property({type: Array}) data: T[] = [];
  @property({type: Array}) columns: ObcTableColumn<ObcTableCellData, T>[] = [];
  @property({type: Boolean}) rowDivider = false;
  @property({type: Boolean}) narrowHeader = false;
  @property({type: Boolean}) striped = false;

  @state()
  private _sortByColumnIdx: number | undefined = undefined;

  @state()
  private _sortDirection: 'asc' | 'desc' = 'asc';

  get sortedData() {
    if (this._sortByColumnIdx === undefined) {
      return this.data;
    }
    const sortByColumn = this.columns[
      this._sortByColumnIdx
    ] as ObcTableColumnSortable<ObcTableCellData, T>;
    const sortDirection = this._sortDirection;
    const sortedData = [...this.data];
    sortedData.sort((a, b) => {
      const aValue = a[sortByColumn.key];
      const bValue = b[sortByColumn.key];
      if (sortDirection === 'asc') {
        return sortByColumn.compareFunction(
          aValue as ObcTableCellData,
          bValue as ObcTableCellData
        );
      } else {
        return sortByColumn.compareFunction(
          bValue as ObcTableCellData,
          aValue as ObcTableCellData
        );
      }
    });
    return sortedData;
  }

  private _handleSortClick(
    column: ObcTableColumnSortable<ObcTableCellData, T>
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

  private _handleRowClick(row: T) {
    this.dispatchEvent(new CustomEvent('row-click', {detail: row}));
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
        '.grid-header obc-table-header-item'
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
        '.grid-header obc-table-header-item'
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

  override updated(changedProperties: PropertyValues) {
    if (changedProperties.has('columns')) {
      this._sortByColumnIdx = this.columns.findIndex(
        (col) => 'sortDirection' in col && col.sortDirection !== undefined
      );
      this._sortDirection =
        (
          this.columns[this._sortByColumnIdx] as ObcTableColumnSortable<
            ObcTableCellData,
            T
          >
        )?.sortDirection ?? 'asc';
    }
  }

  override render() {
    return html`
      <div
        class="grid-container"
        part="grid"
        style="--grid-columns: ${this.columns.length}"
        role="table"
      >
        <div class="grid-header" role="row">
          ${this.columns.map((col, colIdx) => {
            const isNotLast =
              this.columns.indexOf(col) !== this.columns.length - 1;
            const icon = col.renderHeaderIcon
              ? html`<span slot="leading-icon">${col.renderHeaderIcon()}</span>`
              : nothing;

            const sorted =
              'sortable' in col &&
              col.sortable &&
              this._sortByColumnIdx === colIdx;
            const sortDirection = sorted ? this._sortDirection : 'none';
            if ('sortable' in col && col.sortable) {
              return html`<obc-table-header-item
                role="columnheader"
                .showDivider=${isNotLast}
                ?hasLeadingIcon=${icon !== nothing}
                .sortDirection=${sortDirection}
                .sortable=${true}
                type=${this.narrowHeader
                  ? ObcTableHeaderItemType.Narrow
                  : ObcTableHeaderItemType.Regular}
                @click=${() =>
                  this._handleSortClick(
                    col as ObcTableColumnSortable<ObcTableCellData, T>
                  )}
                @keydown=${this._handleHeaderKeyDown}
                >${icon}${col.label}</obc-table-header-item
              > `;
            } else {
              return html`<obc-table-header-item
                role="columnheader"
                .showDivider=${isNotLast}
                ?hasLeadingIcon=${icon !== nothing}
                type=${this.narrowHeader
                  ? ObcTableHeaderItemType.Narrow
                  : ObcTableHeaderItemType.Regular}
                >${icon}${col.label}</obc-table-header-item
              >`;
            }
          })}
        </div>
        <div class="grid-header-divider"></div>
        ${this.sortedData.map((row, rowIndex) => {
          const hasDivider =
            this.rowDivider && this.data.length - 1 !== rowIndex;
          const isStriped = this.striped && rowIndex % 2 === 1;
          return html`
            <button
              role="row"
              class=${classMap({
                'grid-row': true,
                selected: row.selected ?? false,
                striped: isStriped,
              })}
              @click=${() => this._handleRowClick(row)}
              @keydown=${this._handleRowKeyDown}
              data-row-index=${rowIndex}
            >
              ${this.columns.map((col) => {
                const value = row[col.key];
                if (col.renderCell) {
                  return html`<div class="grid-cell" role="cell">
                    ${col.renderCell(value as ObcTableCellData, row, row.id)}
                  </div>`;
                } else {
                  return this._renderCell(
                    value as ObcTableCellData,
                    row,
                    col.key
                  );
                }
              })}
            </button>
            ${hasDivider ? html`<div class="grid-row-divider"></div>` : nothing}
          `;
        })}
      </div>
    `;
  }

  public getAllVisibleRows(): number[] {
    const rows = Array.from(
      this.renderRoot.querySelectorAll<HTMLButtonElement>(
        'button[role="row"].grid-row'
      )
    );
    return rows
      .filter((el) => el.checkVisibility())
      .map((row) => parseInt(row.getAttribute('data-row-index') || ''));
  }

  private _handleCellButtonClick(event: MouseEvent, row: T, columnKey: string) {
    event.preventDefault();
    event.stopPropagation();
    const e: ObcTableCellClickEvent = new CustomEvent('cell-button-click', {
      detail: {rowId: row.id, columnKey},
    });
    this.dispatchEvent(e);
  }

  private _renderCell(value: ObcTableCellData, row: T, columnKey: string) {
    if (value.type === ObcTableCellType.Regular) {
      return html`<div class="grid-cell regular" role="cell">
        ${value.icon3
          ? html`<span class="icon">${value.icon3}</span>`
          : nothing}
        ${value.icon2
          ? html`<span class="icon">${value.icon2}</span>`
          : nothing}
        ${value.icon ? html`<span class="icon">${value.icon}</span>` : nothing}
        ${value.title
          ? html`<span class="title">${value.title}</span>`
          : nothing}
        ${value.text ? html`<span>${value.text}</span>` : nothing}
      </div>`;
    } else if (value.type === ObcTableCellType.LargeIcon) {
      return html`<div class="grid-cell icon-large" role="cell">
        ${value.icon3
          ? html`<span class="icon">${value.icon3}</span>`
          : nothing}
        ${value.icon2
          ? html`<span class="icon">${value.icon2}</span>`
          : nothing}
        ${value.icon ? html`<span class="icon">${value.icon}</span>` : nothing}
      </div>`;
    } else if (value.type === ObcTableCellType.Button) {
      return html`<div class="grid-cell button" role="cell">
        <obc-button
          variant="normal"
          fullWidth
          ?showLeadingIcon=${value.icon !== undefined}
          @click=${(event: MouseEvent) =>
            this._handleCellButtonClick(event, row, columnKey)}
        >
          ${value.icon
            ? html`<span slot="leading-icon">${value.icon}</span>`
            : nothing}
          ${value.text ? html`<span>${value.text}</span>` : nothing}
        </obc-button>
      </div>`;
    } else {
      return nothing;
    }
  }

  static override styles = unsafeCSS(compentStyle);
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-table': ObcTable<ObcTableRow>;
  }
}
