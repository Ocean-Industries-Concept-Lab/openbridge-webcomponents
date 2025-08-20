import {customElement} from '../../decorator.js';
import {LitElement, html, css, unsafeCSS} from 'lit';
import tbodystyle from './tbody.css?inline';
import theadstyle from './thead.css?inline';

/**
 * `<obc-table-cell>` – Table cell component for displaying individual cell content within a table row.
 *
 * Represents a single cell in a table, suitable for both data and interactive content. Designed to be used inside `obc-table-row` within `obc-table-body` or `obc-table-header`.
 *
 * ### Features
 * - Flexible content: Accepts any HTML or component content via its default slot.
 * - Responsive padding: Adjusts left/right padding for first and last cells for visual alignment.
 * - Consistent styling: Ensures alignment, vertical centering, and border styling for table layouts.
 *
 * ### Usage Guidelines
 * Use `obc-table-cell` to display data, icons, buttons, or other elements within a table row. It can be used for both regular data cells and for cells containing controls (such as action buttons or status icons).
 *
 * For header cells, use `obc-table-head-cell` instead.
 *
 * ### Example:
 * ```
 * <obc-table-row>
 *   <obc-table-cell>Row data</obc-table-cell>
 *   <obc-table-cell><obi-placeholder></obi-placeholder> Icon</obc-table-cell>
 *   <obc-table-cell><obc-button>Action</obc-button></obc-table-cell>
 * </obc-table-row>
 * ```
 *
 * @slot - Default slot for cell content (text, icons, buttons, etc.)
 */
@customElement('obc-table-cell')
export class ObcTableCell extends LitElement {
  override render() {
    return html` <slot></slot> `;
  }

  static override styles = css`
    * {
      box-sizing: border-box;
    }

    :host {
      display: table-cell;
      padding-right: 16px;
      padding-left: 16px;
      white-space: nowrap;
      box-sizing: border-box;
      border-bottom: 1px solid var(--border-divider-color);
      vertical-align: middle;
      height: 48px;
      color: var(--element-active-color);
    }

    :host(:first-child) {
      padding-left: 24px;
    }

    :host(:last-child) {
      padding-right: 24px;
    }
  `;
}

/**
 * `<obc-table-head-cell>` – Table header cell component for displaying column titles.
 *
 * Used to define header cells within a table header row. Provides visual distinction and alignment for column labels or controls.
 *
 * ### Features
 * - Default slot for header label or content.
 * - Adds a right border (except for the last cell) to visually separate columns.
 * - Responsive padding for first and last header cells.
 *
 * ### Usage Guidelines
 * Use `obc-table-head-cell` inside an `obc-table-row` within `obc-table-header` to define column headers. Can contain plain text, icons, or other elements as needed for labeling columns.
 *
 * For data cells, use `obc-table-cell` instead.
 *
 * ### Example:
 * ```
 * <obc-table-header>
 *   <obc-table-row>
 *     <obc-table-head-cell>Status</obc-table-head-cell>
 *     <obc-table-head-cell>Source</obc-table-head-cell>
 *   </obc-table-row>
 * </obc-table-header>
 * ```
 *
 * @slot - Default slot for header label or content
 */
@customElement('obc-table-head-cell')
export class ObcTableHeadCell extends LitElement {
  override render() {
    return html` <slot></slot> `;
  }

  static override styles = css`
    :host {
      box-sizing: border-box;
      position: relative;
      display: table-cell;
      padding-right: 16px;
      padding-left: 16px;
      color: var(--element-active-color);
      border-bottom: 1px solid var(--border-divider-color);
      vertical-align: middle;
    }

    :host(:first-child) {
      padding-left: 24px;
    }

    :host(:last-child) {
      padding-right: 24px;
    }

    :host(:not(:last-child))::after {
      content: '';
      display: block;
      position: absolute;
      top: 4px;
      bottom: 4px;
      right: -0.5px;
      width: 1px;
      background-color: var(--border-divider-color);
      border-radius: 1px;
    }
  `;
}

/**
 * `<obc-table-row>` – Table row component for grouping table cells horizontally.
 *
 * Represents a single row in a table, containing one or more `obc-table-cell` or `obc-table-head-cell` elements. Used within `obc-table-body` or `obc-table-header`.
 *
 * ### Features
 * - Groups multiple cells into a horizontal row.
 * - Applies consistent row styling and vertical alignment.
 * - Supports both header and data rows.
 *
 * ### Usage Guidelines
 * Use `obc-table-row` to organize cells into rows within a table. Place inside `obc-table-body` for data rows or `obc-table-header` for header rows.
 *
 * ### Example:
 * ```
 * <obc-table-row>
 *   <obc-table-cell>Data 1</obc-table-cell>
 *   <obc-table-cell>Data 2</obc-table-cell>
 * </obc-table-row>
 * ```
 *
 * @slot - Default slot for table cells (obc-table-cell or obc-table-head-cell)
 */
@customElement('obc-table-row')
export class ObcTableRow extends LitElement {
  override render() {
    return html` <slot></slot> `;
  }

  static override styles = css`
    :host {
      display: table-row;
      vertical-align: middle;
      border-bottom: 1px solid var(--border-divider-color);
    }
  `;
}

/**
 * `<obc-table-header>` – Table header group container for column headers.
 *
 * Groups one or more header rows at the top of a table. Used to define the table's header section, typically containing column labels.
 *
 * ### Features
 * - Sticky positioning: Remains visible at the top of the table when scrolling (if parent allows).
 * - Organizes header rows and cells for accessibility and structure.
 *
 * ### Usage Guidelines
 * Use `obc-table-header` as the first child of `obc-table` to define the header section. Place one or more `obc-table-row` elements inside, each containing `obc-table-head-cell` elements.
 *
 * ### Example:
 * ```
 * <obc-table-header>
 *   <obc-table-row>
 *     <obc-table-head-cell>Column 1</obc-table-head-cell>
 *     <obc-table-head-cell>Column 2</obc-table-head-cell>
 *   </obc-table-row>
 * </obc-table-header>
 * ```
 *
 * @slot - Default slot for header rows (obc-table-row)
 */
@customElement('obc-table-header')
export class ObcTableHeader extends LitElement {
  override render() {
    return html` <slot></slot> `;
  }

  static override styles = [
    unsafeCSS(theadstyle),
    css`
      :host {
        display: table-header-group;
        position: sticky;
        top: 0;
      }
    `,
  ];
}

/**
 * `<obc-table-body>` – Table body group container for data rows.
 *
 * Groups one or more data rows within a table. Used to define the main content area of the table, typically containing multiple `obc-table-row` elements.
 *
 * ### Features
 * - Organizes data rows for accessibility and structure.
 * - Applies consistent body styling.
 *
 * ### Usage Guidelines
 * Use `obc-table-body` as a child of `obc-table` to contain all data rows. Place one or more `obc-table-row` elements inside, each containing `obc-table-cell` elements.
 *
 * ### Example:
 * ```
 * <obc-table-body>
 *   <obc-table-row>
 *     <obc-table-cell>Row 1, Cell 1</obc-table-cell>
 *     <obc-table-cell>Row 1, Cell 2</obc-table-cell>
 *   </obc-table-row>
 * </obc-table-body>
 * ```
 *
 * @slot - Default slot for data rows (obc-table-row)
 */
@customElement('obc-table-body')
export class ObcTableBody extends LitElement {
  override render() {
    return html` <slot></slot> `;
  }

  static override styles = unsafeCSS(tbodystyle);
}

/**
 * `<obc-table>` – Table container component for displaying structured tabular data.
 *
 * Provides the main container for table layouts, supporting header and body grouping, row and cell organization, and flexible content. Designed for displaying lists, records, or any structured data in a grid format.
 *
 * ### Features
 * - Composable: Use with `obc-table-header`, `obc-table-body`, `obc-table-row`, `obc-table-cell`, and `obc-table-head-cell` for full table structure.
 * - Responsive width: Expands to fill available horizontal space.
 * - Scrollable: Supports vertical scrolling when content overflows (when wrapped in a scrollable container).
 * - Native table semantics: Uses CSS table display for accessibility and layout consistency.
 *
 * ### Usage Guidelines
 * Use `obc-table` as the root element for any tabular data display. Compose with header, body, row, and cell components to build complex tables. Suitable for lists, logs, status tables, or any data grid.
 *
 * **TODO(designer):** Add guidance on best practices for large data sets, sticky headers, and accessibility considerations.
 *
 * ### Example:
 * ```
 * <obc-table>
 *   <obc-table-header>
 *     <obc-table-row>
 *       <obc-table-head-cell>Header</obc-table-head-cell>
 *     </obc-table-row>
 *   </obc-table-header>
 *   <obc-table-body>
 *     <obc-table-row>
 *       <obc-table-cell>Data</obc-table-cell>
 *     </obc-table-row>
 *   </obc-table-body>
 * </obc-table>
 * ```
 *
 * @slot - Default slot for table sections (obc-table-header, obc-table-body)
 */
@customElement('obc-table')
export class ObcTable extends LitElement {
  override render() {
    return html` <slot></slot> `;
  }

  static override styles = css`
    :host {
      display: table;
      width: 100%;
      overflow-y: auto;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-table': ObcTable;
    'obc-table-row': ObcTableRow;
    'obc-table-header': ObcTableHeader;
  }
}
