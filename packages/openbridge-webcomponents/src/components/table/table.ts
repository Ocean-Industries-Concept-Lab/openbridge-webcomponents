import {HTMLTemplateResult, LitElement, html, nothing, unsafeCSS} from 'lit';
import {customElement} from '../../decorator.js';
import compentStyle from './table.css?inline';
import {property, state} from 'lit/decorators.js';
import '../table-header-item/table-header-item.js';
import {classMap} from 'lit/directives/class-map.js';

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

  override render() {
    return html`
      <div
        class="grid-container"
        part="grid"
        style="--grid-columns: ${this.columns.length}"
      >
        <div class="grid-header">
          ${this.columns.map((col, colIdx) => {
            const isNotLast =
              this.columns.indexOf(col) !== this.columns.length - 1;
            const icon = col.renderHeaderIcon
              ? html`<span slot="leading-icon">${col.renderHeaderIcon()}</span>`
              : nothing;

            const sorted = col.sortable && this._sortByColumnIdx === colIdx;
            const sortDirection = this._sortDirection;
            return html`<obc-table-header-item
              .showDivider=${isNotLast}
              ?hasLeadingIcon=${icon !== nothing}
              ?showSortArrow=${sorted}
              .sortDirection=${sortDirection}
              type=${this.narrowHeader ? 'narrow' : 'regular'}
              @click=${() => this._handleSortClick(col)}
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
            <div
              class=${classMap({
                'grid-row': true,
                selected: row.selected ?? false,
              })}
            >
              ${this.columns.map((col) => {
                const value = row[col.key];
                return html`
                  <div class="grid-cell">
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
            </div>
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
