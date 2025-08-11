import {
  HTMLTemplateResult,
  LitElement,
  PropertyValues,
  html,
  nothing,
  unsafeCSS,
} from 'lit';
import {customElement} from '../../decorator.js';
import compentStyle from './table.css?inline';
import {property, state} from 'lit/decorators.js';
import '../table-header-item/table-header-item.js';
import {classMap} from 'lit/directives/class-map.js';
import {ObcTableHeaderItemType} from '../table-header-item/table-header-item.js';

export type ObcTableRow = {
  selected?: boolean;
  [key: string]: unknown;
};

export type ObcTableColumn<T, S extends ObcTableRow> = {
  label: string;
  key: string;
  sortable?: boolean;
  sortDirection?: 'asc' | 'desc';
  renderHeaderIcon?: () => HTMLTemplateResult;
  renderCell?: (value: T, row: S, rowIndex: number) => HTMLTemplateResult;
};

@customElement('obc-table')
export class ObcTable<T extends ObcTableRow> extends LitElement {
  @property({type: Array}) data: T[] = [];
  @property({type: Array}) columns: ObcTableColumn<unknown, T>[] = [];
  @property({type: Boolean}) columnDivider = false;
  @property({type: Boolean}) narrowHeader = false;

  @state()
  private _sortByColumnIdx: number | undefined = undefined;

  @state()
  private _sortDirection: 'asc' | 'desc' = 'asc';

  get sortedData() {
    if (this._sortByColumnIdx === undefined) {
      return this.data;
    }
    const sortByColumn = this.columns[this._sortByColumnIdx];
    const sortDirection = this._sortDirection;
    const sortedData = [...this.data.map((row, rowIdx) => ({...row, rowIdx}))];
    sortedData.sort((a, b) => {
      const aValue = a[sortByColumn.key];
      const bValue = b[sortByColumn.key];
      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
      } else if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortDirection === 'asc'
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }
      return 0;
    });
    return sortedData;
  }

  private _handleSortClick(column: ObcTableColumn<unknown, T>) {
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
        (col) => col.sortDirection !== undefined
      );
      this._sortDirection =
        this.columns[this._sortByColumnIdx]?.sortDirection ?? 'asc';
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

            const sorted = col.sortable && this._sortByColumnIdx === colIdx;
            const sortDirection = sorted ? this._sortDirection : 'none';
            return html`<obc-table-header-item
              role="columnheader"
              .showDivider=${isNotLast}
              ?hasLeadingIcon=${icon !== nothing}
              ?showSortArrow=${sorted}
              .sortDirection=${sortDirection}
              .sortable=${col.sortable}
              type=${this.narrowHeader
                ? ObcTableHeaderItemType.Narrow
                : ObcTableHeaderItemType.Regular}
              @click=${() => this._handleSortClick(col)}
              @keydown=${this._handleHeaderKeyDown}
              >${icon}${col.label}</obc-table-header-item
            >`;
          })}
        </div>
        <div class="grid-header-divider"></div>
        ${this.sortedData.map((row, rowIndex) => {
          const hasDivider =
            this.columnDivider &&
            this.columns.indexOf(this.columns[this.columns.length - 1]) !==
              rowIndex;
          return html`
            <button
              role="row"
              class=${classMap({
                'grid-row': true,
                selected: row.selected ?? false,
              })}
              @click=${() => this._handleRowClick(row)}
              @keydown=${this._handleRowKeyDown}
            >
              ${this.columns.map((col) => {
                const value = row[col.key];
                return html`
                  <div class="grid-cell" role="cell">
                    ${col.renderCell
                      ? col.renderCell(
                          value,
                          row,
                          (row.rowIdx as number | undefined) ?? rowIndex
                        )
                      : (value ?? nothing)}
                  </div>
                `;
              })}
            </button>
            ${hasDivider ? html`<div class="grid-row-divider"></div>` : nothing}
          `;
        })}
      </div>
    `;
  }

  static override styles = unsafeCSS(compentStyle);
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-table': ObcTable<ObcTableRow>;
  }
}
