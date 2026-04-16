import {LitElement, html, unsafeCSS, nothing, TemplateResult} from 'lit';
import {property} from 'lit/decorators.js';
import compentStyle from './context-menu-input.css?inline';
import '../../icons/icon-arrow-flyout-google.js';
import '../../icons/icon-close-google.js';
import '../checkbox-item/checkbox-item.js';
import '../navigation-item/navigation-item.js';
import {ObcNavigationMenuVariant} from '../navigation-menu/navigation-menu.js';
import {customElement} from '../../decorator.js';
import {classMap} from 'lit/directives/class-map.js';
import '../icon-button/icon-button.js';
import '../navigation-item-group/navigation-item-group.js';
import {ObcNavigationItemGroup} from '../navigation-item-group/navigation-item-group.js';

/**
 * Event fired when the selection changes in `<obc-context-menu-input>`.
 *
 * @event
 */
export type ObcContextMenuInputChangeEvent = CustomEvent<{
  selectedValues: string[];
  selectedOptions: Array<ContextMenuOption>;
}>;

/**
 * Event fired when a menu item is clicked in `<obc-context-menu-input>`.
 *
 * @event
 */
export type ObcContextMenuInputItemClickEvent = CustomEvent<{
  value: string;
  option: ContextMenuOption;
}>;

/**
 * Represents a single option in the context menu.
 */
export interface ContextMenuOption {
  /** Unique value for the option. */
  value: string;
  /** Display label for the option. */
  label: string;
  /** Optional secondary text shown under the label. */
  description?: string;
  /** Optional nesting level (for hierarchical/nested options). */
  level?: number;
  /** Optional icon (TemplateResult, e.g., `<obi-placeholder slot="icon"></obi-placeholder>`). */
  icon?: TemplateResult;
  /** Optional array of child options (for flyout/nested menus). */
  children?: ContextMenuOption[];
}

/**
 * Represents a group of columns for multi-with-subtitles variant.
 */
export interface ColumnGroup {
  /** Title for the group (displayed as subtitle/header). */
  title: string;
  /** Number of columns in this group. */
  columns: number;
  /** Array of options for this group. */
  options: ContextMenuOption[];
}

/**
 * Enum of available context menu variants for `<obc-context-menu-input>`.
 * - `Regular`: Single-select navigation menu.
 * - `Checkboxes`: Multi-select with checkboxes.
 * - `NestedCheckboxes`: Multi-select with nested/hierarchical checkboxes.
 * - `Flyout`: Menu with expandable/cascading groups.
 * - `Multi`: Multi-column menu.
 * - `MultiWithSubtitles`: Multi-column menu with group subtitles.
 */
export enum ContextMenuType {
  Regular = 'regular',
  Checkboxes = 'checkboxes',
  NestedCheckboxes = 'nested-checkboxes',
  Flyout = 'flyout',
  Multi = 'multi',
  MultiWithSubtitles = 'multi-with-subtitles',
}

/**
 * `<obc-context-menu-input>` – A flexible context menu component for presenting selectable lists, actions, or multi-column menus with support for single or multiple selection, checkboxes, flyout groups, and icons.
 *
 * This component provides a highly configurable menu surface for displaying options, actions, or grouped selections. It supports several variants including regular single-select menus, checkbox lists, nested checkboxes, flyout (cascading) groups, and multi-column layouts with or without group subtitles. Options can include icons and hierarchical nesting.
 *
 * Appears as a popover or dropdown menu, allowing users to select one or more items from a list, optionally organized into columns or groups. Suitable for use as a context menu, dropdown, action menu, or feature selector.
 *
 * ## Features
 *
 * - **Variants:**
 *   - **Regular:** Single-select menu with navigation items (optionally with icons).
 *   - **Checkboxes:** List of options with checkboxes for multi-selection.
 *   - **NestedCheckboxes:** Checkbox list supporting hierarchical/nested options (with indentation).
 *   - **Flyout:** Menu with expandable/cascading groups; supports both single and multi-select, and group/child icons.
 *   - **Multi:** Multi-column menu for large option sets; supports single or multi-select per column.
 *   - **MultiWithSubtitles:** Multi-column menu with group subtitles/headers; each group can have its own set of options and columns.
 *
 * - **Selection Modes:**
 *   - Single-select, multi-select, or per-group/column single-select (configurable via `multiSelect` and `selectPerGroup`).
 *   - Persistent selection (selected items remain highlighted after interaction).
 *
 * - **Icons:**
 *   - Options can display leading icons (e.g., `<obi-placeholder></obi-placeholder>`).
 *   - Group headers in flyout and multi-column modes can also include icons.
 *
 * - **Title Bar:**
 *   - Optional title bar with customizable text and a close button.
 *
 * - **Column Grouping:**
 *   - Multi-column layouts can be grouped with subtitles and custom column counts per group.
 *
 * - **Nested Options:**
 *   - Nested checkboxes and flyout groups support hierarchical option structures.
 *
 * - **Accessibility:**
 *   - Uses ARIA roles for menu and menuitem.
 *
 * ## Usage Guidelines
 *
 * Use `<obc-context-menu-input>` when you need to present a list of actions or options in a popover, dropdown, or context menu format, especially when:
 * - Options may require icons, grouping, or hierarchical structure.
 * - You need to support both single and multiple selection, including per-group or per-column selection.
 * - The menu may contain a large number of options, requiring multi-column or grouped layouts.
 * - You want to provide a familiar menu or action sheet experience with optional checkboxes or flyout groups.
 *
 * Common use cases include: context menus, dropdown selectors, feature pickers, action menus, filter menus, or any scenario where users need to choose from a structured list of options.
 *
 * **Do not use** for persistent navigation (use a sidebar or navigation menu instead), or for simple single-action buttons.
 *
 * **TODO(designer):** Confirm if there are recommended limits for the number of columns/groups, or best practices for deeply nested options.
 *
 * ## Features and Variants
 *
 * - **Regular:**
 *   - Single-select, navigation-style menu with optional icons.
 * - **Checkboxes:**
 *   - Multi-select list with checkboxes. Each option can be toggled independently.
 * - **NestedCheckboxes:**
 *   - Multi-select with hierarchical/nested options. Indentation reflects nesting level.
 * - **Flyout:**
 *   - Groups of options expand into submenus (flyouts). Supports both single and multi-select. Group and child options can have icons.
 * - **Multi:**
 *   - Options are distributed across multiple columns. Can be single or multi-select. Optionally restrict to one selection per column.
 * - **MultiWithSubtitles:**
 *   - Like Multi, but columns are grouped under subtitles/headers. Each group can have its own column count and options.
 *
 * ## Properties
 *
 * - `type` (`ContextMenuType`): Sets the menu variant. Defaults to `'regular'`.
 * - `options` (ContextMenuOption[]): Array of menu options. Each option can have `value`, `label`, optional `icon`, `level` (for nesting), and `children` (for flyout/nested).
 * - `selectedValues` (string[]): Array of currently selected option values.
 * - `hasTitleBar` (boolean): If true, displays a title bar with close button.
 * - `title` (string): Text for the title bar (shown if `hasTitleBar` is true).
 * - `columnGroups` (ColumnGroup[]): Used for `multi-with-subtitles` variant to define groupings and columns.
 * - `itemsPerColumn` (number): Number of options per column in multi-column layouts.
 * - `multiSelect` (boolean): If true, allows multiple selections. Defaults based on variant.
 * - `selectPerGroup` (boolean): If true, restricts selection to one per group/column (used in flyout and multi-column).
 * - `persistSelection` (boolean): If true, keeps selected items highlighted after interaction.
 *
 * ## Events
 *
 * - `change` – Fired when the selection changes.
 *   Detail: `{ selectedValues: string[], selectedOptions: ContextMenuOption[] }`
 * - `item-click` – Fired when a menu item is clicked (even if not changing selection).
 *   Detail: `{ value: string, option: ContextMenuOption }`
 * - `close` – Fired when the close button in the title bar is clicked.
 *
 * ## Best Practices and Constraints
 *
 * - Use icons to help users quickly identify options, especially in long or complex menus.
 * - For multi-column layouts, keep the number of columns manageable to avoid overwhelming users.
 * - Use the `multi-with-subtitles` variant for grouped feature selection or when options need to be categorized.
 * - For nested checkboxes, avoid excessive nesting for clarity.
 * - In flyout menus, use group icons to visually distinguish categories.
 * - Only use the close button if the menu is presented as a modal or overlay that requires explicit dismissal.
 * - For accessibility, ensure all options have clear labels.
 *
 * ## Example
 *
 * ```html
 * <obc-context-menu-input
 *   type="flyout"
 *   .options=${[
 *     {
 *       value: 'file',
 *       label: 'File',
 *       icon: html`<obi-placeholder slot="icon"></obi-placeholder>`,
 *       children: [
 *         { value: 'new', label: 'New' },
 *         { value: 'open', label: 'Open' },
 *         { value: 'save', label: 'Save' }
 *       ]
 *     },
 *     { value: 'edit', label: 'Edit' }
 *   ]}
 *   .selectedValues=${['save']}
 *   hasTitleBar
 *   title="Menu"
 * ></obc-context-menu-input>
 * ```
 *
 * In this example, a flyout menu is shown with a title bar, group icons, and a selected child option.
 *
 * @slot - Optionally used for custom icons in options (e.g., `<obi-placeholder slot="icon"></obi-placeholder>`)
 * @fires change {CustomEvent<{selectedValues: string[], selectedOptions: ContextMenuOption[]}>} When the selection changes.
 * @fires item-click {CustomEvent<{value: string, option: ContextMenuOption}>} When a menu item is clicked.
 * @fires close {CustomEvent<void>} When the close button is clicked.
 */
@customElement('obc-context-menu-input')
export class ObcContextMenuInput extends LitElement {
  /**
   * The variant type of context menu to display.
   *
   * - `'regular'`: Single-select navigation menu.
   * - `'checkboxes'`: Multi-select with checkboxes.
   * - `'nested-checkboxes'`: Multi-select with nested/hierarchical checkboxes.
   * - `'flyout'`: Menu with expandable/cascading groups.
   * - `'multi'`: Multi-column menu.
   * - `'multi-with-subtitles'`: Multi-column menu with group subtitles.
   *
   * Defaults to `'regular'`.
   */
  @property({type: String})
  type: ContextMenuType = ContextMenuType.Regular;

  /**
   * Array of menu options to display.
   *
   * Each option should have a unique `value`, a `label`, and can optionally include:
   * - `icon`: TemplateResult for a leading icon (e.g., `<obi-placeholder slot="icon"></obi-placeholder>`)
   * - `level`: For nested checkboxes, indicates nesting depth.
   * - `children`: For flyout/nested menus, an array of child options.
   */
  @property({type: Array}) options: ContextMenuOption[] = [];

  /**
   * Array of currently selected option values.
   *
   * For multi-select variants, can contain multiple values. For single-select, contains at most one value.
   */
  @property({type: Array}) selectedValues: string[] = [];

  /**
   * Whether to show a title bar with close button at the top of the menu.
   *
   * If true, displays the `title` property and a close icon button.
   */
  @property({type: Boolean}) hasTitleBar = false;

  /**
   * Title text displayed in the title bar (if `hasTitleBar` is true).
   */
  @property({type: String}) override title = '';

  /**
   * Array of column groups for the `multi-with-subtitles` layout.
   *
   * Each group defines a `title`, `columns` (number of columns in the group), and `options` (array of options for that group).
   */
  @property({type: Array}) columnGroups: ColumnGroup[] = [];

  /**
   * Number of items per column in multi-column layouts.
   *
   * Used in `multi` and `multi-with-subtitles` variants to control column splitting.
   */
  @property({type: Number}) itemsPerColumn = 5;

  /**
   * Whether multiple selections are allowed.
   *
   * If not set, defaults to true for checkbox/multi variants, false for regular/flyout.
   */
  @property({type: Boolean}) multiSelect?: boolean;

  /**
   * If true, restricts selection to one option per group or column (used in flyout and multi-column).
   *
   * When enabled, only one option can be selected in each group or column.
   */
  @property({type: Boolean, reflect: true}) selectPerGroup?: boolean;

  private get isMultiSelect(): boolean {
    if (this.multiSelect !== undefined) return this.multiSelect;
    return [
      ContextMenuType.Checkboxes,
      ContextMenuType.NestedCheckboxes,
      ContextMenuType.Multi,
      ContextMenuType.MultiWithSubtitles,
    ].includes(this.type);
  }

  private get isPerGroupSingleSelect(): boolean {
    if (this.isMultiSelect) return false;
    if (this.selectPerGroup !== undefined) return this.selectPerGroup;
    return this.type === ContextMenuType.Flyout;
  }

  /**
   * Returns a unique group-key for each option:
   * - In multi-with-subtitles: group title + subcolumn index (each subcolumn is a group)
   * - In multi: column index (each column is a group)
   */
  private getGroupForValue(value: string): string | undefined {
    if (
      this.type === ContextMenuType.MultiWithSubtitles &&
      this.columnGroups.length
    ) {
      for (const group of this.columnGroups) {
        const totalCols = Math.max(
          group.columns,
          Math.ceil(group.options.length / this.itemsPerColumn)
        );
        const distributed = this.chunkArray(
          group.options,
          this.itemsPerColumn,
          totalCols
        );
        for (let subColIdx = 0; subColIdx < distributed.length; ++subColIdx) {
          if (distributed[subColIdx].some((opt) => opt.value === value)) {
            return `${group.title}___${subColIdx}`;
          }
        }
      }
      return undefined;
    }
    if (this.type === ContextMenuType.Multi && this.itemsPerColumn > 0) {
      const columns = this.chunkArray(this.options, this.itemsPerColumn);
      for (let colIdx = 0; colIdx < columns.length; ++colIdx) {
        if (columns[colIdx].some((opt) => opt.value === value)) {
          return `column-${colIdx}`;
        }
      }
      return undefined;
    }
    if (this.type === ContextMenuType.Flyout && this.options.length) {
      for (const group of this.options) {
        if (group.children?.some((child) => child.value === value)) {
          return group.value;
        }
        if (group.value === value) return group.value;
      }
      return undefined;
    }
    return undefined;
  }

  private handleCheckboxChange(option: ContextMenuOption, e: Event) {
    const {status} = (e as CustomEvent<{status: 'checked' | 'unchecked'}>)
      .detail;
    let next: string[];

    // Enable "one per group/column" for multi-column layouts as well
    if (
      this.selectPerGroup &&
      (this.type === ContextMenuType.Multi ||
        this.type === ContextMenuType.MultiWithSubtitles)
    ) {
      const groupKey = this.getGroupForValue(option.value);
      next = [
        ...this.selectedValues.filter(
          (val) => this.getGroupForValue(val) !== groupKey
        ),
        ...(status === 'checked' ? [option.value] : []),
      ];
    } else {
      next =
        status === 'checked'
          ? [...this.selectedValues, option.value]
          : this.selectedValues.filter((v) => v !== option.value);
    }

    if (!arraysEqual(this.selectedValues, next)) this.updateSelection(next);
  }

  private handleMenuItemClick(option: ContextMenuOption, event: Event) {
    event.preventDefault();

    // Always fire item-click event, even for groups
    this.dispatchEvent(
      new CustomEvent<ObcContextMenuInputItemClickEvent['detail']>(
        'item-click',
        {
          detail: {value: option.value, option},
        }
      )
    );

    // Don't process selection for navigation groups in flyout menus or multi
    if (option.children?.length) return;

    let newSelectedValues: string[];

    if (this.isPerGroupSingleSelect) {
      // Get the group key for this value (column or group)
      const groupKey = this.getGroupForValue
        ? this.getGroupForValue(option.value)
        : undefined;

      // Find currently selected in this group
      const selectedInGroup = this.selectedValues.find(
        (val) => this.getGroupForValue(val) === groupKey
      );

      // If the clicked option is already selected in this group, unselect it
      if (selectedInGroup === option.value) {
        newSelectedValues = this.selectedValues.filter(
          (val) => val !== option.value
        );
      } else {
        // Otherwise, replace any existing selection in the group with this one
        newSelectedValues = [
          ...this.selectedValues.filter(
            (val) => this.getGroupForValue(val) !== groupKey
          ),
          option.value,
        ];
      }
    } else {
      // REGULAR (single select, non-grouped): toggle if already selected
      if (this.selectedValues.includes(option.value)) {
        newSelectedValues = [];
      } else {
        newSelectedValues = [option.value];
      }
    }

    if (!arraysEqual(this.selectedValues, newSelectedValues))
      this.updateSelection(newSelectedValues);
  }

  private updateSelection(vals: string[]) {
    this.selectedValues = vals;
    const selectedOptions: ContextMenuOption[] = [];
    const collect = (arr: ContextMenuOption[]) =>
      arr.forEach((o) => {
        if (vals.includes(o.value)) selectedOptions.push(o);
        if (o.children) collect(o.children);
      });
    collect(this.options);
    this.dispatchEvent(
      new CustomEvent<ObcContextMenuInputChangeEvent['detail']>('change', {
        detail: {selectedValues: vals, selectedOptions},
      })
    );
  }

  private handleCloseClick(e: Event) {
    e.preventDefault();
    this.dispatchEvent(new CustomEvent('close'));
  }

  private isOptionSelected(v: string) {
    return this.selectedValues.includes(v);
  }

  private renderTitleBar() {
    if (!this.hasTitleBar) return nothing;
    return html`
      <div class="title-container">
        <div class="title-content">
          <div class="title-text">${this.title}</div>
        </div>
        <obc-icon-button
          variant="flat"
          @click=${this.handleCloseClick}
          aria-label="Close menu"
        >
          <obi-close-google></obi-close-google>
        </obc-icon-button>
      </div>
    `;
  }

  private renderRegularItems() {
    return this.options.map((o) => this.renderNavItem(o));
  }

  private renderCheckboxItems() {
    return this.options.map((o) => {
      const isSelected = this.isOptionSelected(o.value);
      const isNested =
        this.type === ContextMenuType.NestedCheckboxes &&
        o.level &&
        o.level > 1;
      const indent = isNested ? (o.level! - 1) * 16 : 0;
      return html`<div
        class="menu-item checkbox-item-wrapper"
        style=${indent ? `padding-left:${indent}px` : ''}
      >
        <obc-checkbox-item
          .label=${o.label}
          .status=${isSelected ? 'checked' : 'unchecked'}
          @change=${(e: Event) => this.handleCheckboxChange(o, e)}
        ></obc-checkbox-item>
      </div>`;
    });
  }

  private renderNavItem(o: ContextMenuOption) {
    const isSelected = this.isOptionSelected(o.value);
    const indent = o.level ? (o.level - 1) * 16 : 0;
    return html`<div
      class="menu-item navigation-item-wrapper"
      style=${indent ? `padding-left:${indent}px` : ''}
    >
      <obc-navigation-item
        .label=${o.label}
        .description=${o.description ?? ''}
        .checked=${isSelected}
        .variant=${ObcNavigationMenuVariant.Full}
        @click=${(e: Event) => this.handleMenuItemClick(o, e)}
        role="menuitem"
        aria-selected=${isSelected}
        ?hasIcon=${!!o.icon}
      >
        ${o.icon ? html`<div slot="icon">${o.icon}</div>` : nothing}
      </obc-navigation-item>
    </div>`;
  }

  // Renders checkboxes for children if multi, otherwise navigation items
  private renderFlyoutChildren(children: ContextMenuOption[]) {
    if (this.isMultiSelect) {
      return children.map((c) => {
        const isSelected = this.isOptionSelected(c.value);
        return html`<div class="menu-item checkbox-item-wrapper">
          <obc-checkbox-item
            .label=${c.label}
            .status=${isSelected ? 'checked' : 'unchecked'}
            @change=${(e: Event) => this.handleCheckboxChange(c, e)}
          ></obc-checkbox-item>
        </div>`;
      });
    }
    return children.map((c) => {
      const isSelected = this.isOptionSelected(c.value);
      return html`<obc-navigation-item
        .label=${c.label}
        .description=${c.description ?? ''}
        .checked=${isSelected}
        .variant=${ObcNavigationMenuVariant.Full}
        @click=${(e: Event) => this.handleMenuItemClick(c, e)}
        role="menuitem"
        aria-selected=${isSelected}
        ?hasIcon=${!!c.icon}
      >
        ${c.icon ? html`<div slot="icon">${c.icon}</div>` : nothing}
      </obc-navigation-item>`;
    });
  }

  private handleFlyoutGroupClick(option: ContextMenuOption, event: Event) {
    event.preventDefault();
    this.dispatchEvent(
      new CustomEvent<ObcContextMenuInputItemClickEvent['detail']>(
        'item-click',
        {
          detail: {value: option.value, option},
        }
      )
    );
    // Don't fire a change event for navigation groups
  }

  private renderFlyoutItems() {
    return this.options.map((o) => {
      const isSelected = this.isOptionSelected(o.value);
      if (o.children?.length) {
        return html`<obc-navigation-item-group
          .label=${o.label}
          .checked=${isSelected}
          .variant=${ObcNavigationMenuVariant.Full}
          .hug=${true}
          .hasIcon=${!!o.icon}
          @click=${(e: Event) => this.handleFlyoutGroupClick(o, e)}
          @open=${() => {
            this.shadowRoot
              ?.querySelectorAll('obc-navigation-item-group')
              .forEach((g) => {
                const group = g as ObcNavigationItemGroup;
                if (group.label !== o.label) group.close();
              });
          }}
        >
          ${o.icon ? html`<div slot="icon">${o.icon}</div>` : nothing}
          ${this.renderFlyoutChildren(o.children)}
        </obc-navigation-item-group>`;
      }
      return this.renderNavItem(o);
    });
  }

  // --------- MULTI COLUMN ---------

  private renderMultiColumnItems() {
    const renderColumn = (columnOptions: ContextMenuOption[]) => {
      if (!columnOptions.length) return nothing;

      // True multi-select: checkboxes
      if (this.isMultiSelect && !this.selectPerGroup) {
        return columnOptions.map((o) => {
          const isSelected = this.isOptionSelected(o.value);
          return html`<div class="menu-item checkbox-item-wrapper">
            <obc-checkbox-item
              .label=${o.label}
              .status=${isSelected ? 'checked' : 'unchecked'}
              @change=${(e: Event) => this.handleCheckboxChange(o, e)}
            ></obc-checkbox-item>
          </div>`;
        });
      }
      // fallback: nav item
      return columnOptions.map((opt) => this.renderNavItem(opt));
    };

    if (this.type === ContextMenuType.MultiWithSubtitles) {
      if (!this.columnGroups.length) {
        // Fallback – evenly spread across columns
        const cols = this.chunkArray(this.options, this.itemsPerColumn);
        return html`<div class="multi-content">
          <div class="multi-columns">
            <div class="columns-container">
              ${cols.map(
                (col, idx) =>
                  html`<div
                    class="column-with-header ${idx ? 'column-divider' : ''}"
                  >
                    <div class="column-header">
                      <div class="subtitle-container">
                        <div class="subtitle-text">Group ${idx + 1}</div>
                      </div>
                    </div>
                    <div class="column-content">${renderColumn(col)}</div>
                  </div>`
              )}
            </div>
          </div>
        </div>`;
      }

      interface ColumnInfo {
        options: ContextMenuOption[];
        groupTitle: string;
        isFirstInGroup: boolean;
        isFirstGroup: boolean;
        colIdx: number;
      }

      const allCols: ColumnInfo[] = [];
      this.columnGroups.forEach((g, gIdx) => {
        const calculatedCols = Math.ceil(
          g.options.length / this.itemsPerColumn
        );
        const actualCols = Math.max(g.columns, calculatedCols);
        const distributed = this.chunkArray(
          g.options,
          this.itemsPerColumn,
          actualCols
        );
        distributed.forEach((opts, idx) => {
          allCols.push({
            options: opts,
            groupTitle: g.title,
            isFirstInGroup: idx === 0,
            isFirstGroup: gIdx === 0,
            colIdx: idx,
          });
        });
      });

      return html`<div class="multi-content">
        <div class="multi-columns">
          <div class="columns-container">
            ${allCols.map(
              (c) =>
                html`<div
                  class="column-with-header ${!c.isFirstGroup &&
                  c.isFirstInGroup
                    ? 'column-divider'
                    : ''}"
                >
                  ${c.isFirstInGroup
                    ? html`<div class="column-header">
                        <div class="subtitle-container">
                          <div class="subtitle-text">${c.groupTitle}</div>
                        </div>
                      </div>`
                    : html`<div class="column-header-spacer"></div>`}
                  <div class="column-content">${renderColumn(c.options)}</div>
                </div>`
            )}
          </div>
        </div>
      </div>`;
    }

    // Simple multi (no subtitles)
    const columns = this.chunkArray(this.options, this.itemsPerColumn);
    return html`<div class="multi-content">
      <div class="multi-columns">
        ${columns.map(
          (col, idx) =>
            html`<div class="column ${idx ? 'column-divider' : ''}">
              ${renderColumn(col)}
            </div>`
        )}
      </div>
    </div>`;
  }

  private chunkArray<T>(arr: T[], size: number, forcedColumns?: number): T[][] {
    if (forcedColumns) {
      const out: T[][] = Array.from({length: forcedColumns}, () => []);
      arr.forEach((item, idx) => out[Math.floor(idx / size)].push(item));
      return out;
    }
    const result: T[][] = [];
    for (let i = 0; i < arr.length; i += size)
      result.push(arr.slice(i + 0, i + size));
    return result;
  }

  private renderMenuContent() {
    switch (this.type) {
      case ContextMenuType.Checkboxes:
      case ContextMenuType.NestedCheckboxes:
        return this.renderCheckboxItems();
      case ContextMenuType.Flyout:
        return this.renderFlyoutItems();
      case ContextMenuType.Multi:
      case ContextMenuType.MultiWithSubtitles:
        return this.renderMultiColumnItems();
      default:
        return this.renderRegularItems();
    }
  }

  override render() {
    return html`<div
      class=${classMap({
        'context-menu': true,
        [`type-${this.type}`]: true,
        'has-title': this.hasTitleBar,
      })}
      role="menu"
      aria-label=${this.hasTitleBar ? this.title : 'Context menu'}
    >
      ${this.renderTitleBar()}
      <div class="menu-content">${this.renderMenuContent()}</div>
    </div>`;
  }

  static override styles = unsafeCSS(compentStyle);
}

function arraysEqual(a: string[], b: string[]) {
  if (a.length !== b.length) return false;
  const setA = new Set(a);
  return b.every((v) => setA.has(v));
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-context-menu-input': ObcContextMenuInput;
  }
}
