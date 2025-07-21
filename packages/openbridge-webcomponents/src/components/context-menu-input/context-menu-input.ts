import {LitElement, html, unsafeCSS, nothing, TemplateResult} from 'lit';
import {property} from 'lit/decorators.js';
import compentStyle from './context-menu-input.css?inline';
import '../../icons/icon-arrow-flyout-google.js';
import '../../icons/icon-close-google.js';
import '../radio/radio.js';
import '../checkbox/checkbox.js';
import '../navigation-item/navigation-item.js';
import {ObcNavigationMenuVariant} from '../navigation-menu/navigation-menu.js';
import {customElement} from '../../decorator.js';
import {classMap} from 'lit/directives/class-map.js';
import '../icon-button/icon-button.js';
import '../navigation-item-group/navigation-item-group.js';
import {ObcNavigationItemGroup} from '../navigation-item-group/navigation-item-group.js';

export type ObcContextMenuInputChangeEvent = CustomEvent<{
  selectedValues: string[];
  selectedOptions: Array<ContextMenuOption>;
}>;

export type ObcContextMenuInputItemClickEvent = CustomEvent<{
  value: string;
  option: ContextMenuOption;
}>;

export interface ContextMenuOption {
  value: string;
  label: string;
  level?: number;
  icon?: TemplateResult;
  children?: ContextMenuOption[];
}

export interface ColumnGroup {
  title: string;
  columns: number;
  options: ContextMenuOption[];
}

/**
 * `<obc-context-menu-input>` – A flexible, multi-variant context menu component for presenting selectable lists, actions, or navigation options.
 * Also known as: dropdown menu, action menu, flyout menu, or selection menu.
 *
 * Provides a configurable menu surface supporting single or multiple selection, nested groups, flyout submenus, and multi-column layouts. Designed for use as a context menu, dropdown, or quick action selector in toolbars, panels, or popovers.
 *
 * ### Features
 * - **Variants:**
 *   - `regular`: Standard menu with selectable items (single selection by default).
 *   - `radio`: Items rendered as radio buttons for mutually exclusive selection.
 *   - `checkboxes`: Items rendered as checkboxes for multi-selection.
 *   - `nested-checkboxes`: Supports hierarchical/nested checkboxes with indentation.
 *   - `flyout`: Menu groups with flyout submenus (supports both single and multi-select).
 *   - `multi`: Multi-column menu for large sets of options.
 *   - `multi-with-subtitles`: Multi-column menu with group subtitles/headers.
 * - **Selection Modes:**
 *   - Single-select, multi-select, or per-group single-select (via `multiSelect` and `selectPerGroup`).
 * - **Customizable Content:**
 *   - Each option can include an icon, label, and (for flyout/nested) children.
 *   - Optional title bar with close button.
 * - **Column Grouping:**
 *   - For `multi-with-subtitles`, options can be grouped into columns with headers.
 * - **Keyboard and Mouse Interaction:**
 *   - Items are accessible and support click/keyboard selection.
 * - **Responsive Layout:**
 *   - Adapts to content size and supports scrolling for long lists.
 *
 * ### Usage Guidelines
 * Use `obc-context-menu-input` to present a list of actions, options, or navigation targets that require selection from a menu surface.
 * - Ideal for context menus, dropdowns, or popover menus where users need to select one or more items.
 * - Use the `radio` variant for mutually exclusive choices, `checkboxes` for independent multi-selection, and `flyout` for hierarchical or grouped actions.
 * - For large sets of options, use `multi` or `multi-with-subtitles` to organize items into columns and groups.
 * - The `nested-checkboxes` variant is suitable for hierarchical option trees.
 * - Avoid using for persistent navigation; prefer a sidebar or persistent menu for always-visible navigation.
 * - For quick actions or short lists, use the `regular` variant.
 *
 * **TODO(designer):** Confirm recommended max number of items per column and best practices for deeply nested options.
 *
 * ### Properties
 * - `type`: Controls the menu variant (see Features above for details).
 * - `options`: Array of menu options (each with `value`, `label`, optional `icon`, `level`, and `children`).
 * - `selectedValues`: Array of currently selected option values.
 * - `hasTitleBar`: Shows a title bar with close button when true.
 * - `title`: Title text for the menu (shown if `hasTitleBar` is true).
 * - `multiSelect`: Enables multi-selection (overrides default for variant).
 * - `selectPerGroup`: Allows single selection per group (flyout only).
 * - `radioGroupName`: Sets the group name for radio button variants.
 * - `columnGroups`: For `multi-with-subtitles`, defines column groupings and headers.
 * - `itemsPerColumn`: Number of items per column in multi-column layouts.
 *
 * ### Events
 * - `change`: Fired when the selection changes.
 *   Detail: `{ selectedValues: string[], selectedOptions: ContextMenuOption[] }`
 * - `item-click`: Fired when an item is clicked (before selection changes).
 *   Detail: `{ value: string, option: ContextMenuOption }`
 * - `close`: Fired when the close button is clicked (if title bar is shown).
 *
 * ### Best Practices & Constraints
 * - Use icons to visually distinguish actions or option types.
 * - For accessibility, ensure each option has a clear label.
 * - Only use `multiSelect` or `checkboxes` for independent selections; use `radio` or `selectPerGroup` for exclusive choices.
 * - Avoid deeply nested options unless necessary for clarity.
 * - For menus with many options, group logically and use columns or subtitles for clarity.
 *
 * ### Example:
 * ```html
 * <obc-context-menu-input
 *   type="flyout"
 *   .options=${[
 *     {
 *       value: 'file',
 *       label: 'File',
 *       icon: html`<obi-placeholder></obi-placeholder>`,
 *       children: [
 *         { value: 'new', label: 'New' },
 *         { value: 'open', label: 'Open' }
 *       ]
 *     },
 *     { value: 'edit', label: 'Edit' }
 *   ]}
 *   .selectedValues=${['open']}
 *   hasTitleBar
 *   title="Menu"
 * ></obc-context-menu-input>
 * ```
 *
 * @slot - No named slots; icons are provided via the `icon` property on each option.
 * @fires change {CustomEvent<{selectedValues: string[], selectedOptions: ContextMenuOption[]}>} When the selection changes.
 * @fires item-click {CustomEvent<{value: string, option: ContextMenuOption}>} When an item is clicked.
 * @fires close {CustomEvent<void>} When the close button is clicked (if title bar is shown).
 */
@customElement('obc-context-menu-input')
export class ObcContextMenuInput extends LitElement {
  /**
   * The variant type of context menu to display.
   * - `regular`: Standard menu (single selection by default)
   * - `radio`: Items as radio buttons (mutually exclusive)
   * - `checkboxes`: Items as checkboxes (multi-select)
   * - `nested-checkboxes`: Hierarchical/nested checkboxes
   * - `flyout`: Menu groups with flyout submenus
   * - `multi`: Multi-column menu
   * - `multi-with-subtitles`: Multi-column with group subtitles
   *
   * @default 'regular'
   */
  @property({type: String})
  type:
    | 'regular'
    | 'radio'
    | 'checkboxes'
    | 'nested-checkboxes'
    | 'flyout'
    | 'multi'
    | 'multi-with-subtitles' = 'regular';

  /**
   * Array of menu options with value, label, and optional level, icon, and children.
   * Each option can represent a selectable item or a group (if it has children).
   */
  @property({type: Array}) options: ContextMenuOption[] = [];

  /**
   * Array of currently selected option values.
   * For single-select variants, contains one value; for multi-select, may contain multiple.
   */
  @property({type: Array}) selectedValues: string[] = [];

  /**
   * Whether to show a title bar with close button at the top of the menu.
   * When true, displays the `title` property and a close icon button.
   */
  @property({type: Boolean}) hasTitleBar = false;

  /**
   * Title text displayed in the title bar (if `hasTitleBar` is true).
   */
  @property({type: String}) override title = '';

  /**
   * Array of column groups for the `multi-with-subtitles` layout.
   * Each group defines a subtitle/header and its options.
   */
  @property({type: Array}) columnGroups: ColumnGroup[] = [];

  /**
   * Number of items per column in multi-column layouts (`multi`, `multi-with-subtitles`).
   * Used to determine column splitting.
   */
  @property({type: Number}) itemsPerColumn = 5;

  /**
   * Whether multiple selections are allowed.
   * Overrides the default selection mode for the chosen variant.
   */
  @property({type: Boolean}) multiSelect?: boolean;

  /**
   * Allows single selection per group (flyout only).
   * When true, only one item per group can be selected.
   */
  @property({type: Boolean, reflect: true}) selectPerGroup?: boolean;

  /**
   * Name attribute for radio button groups (used in `radio` variant).
   * If not set, a unique name is generated.
   */
  @property({type: String}) radioGroupName?: string;

  private _radioGroupName = `context-menu-${typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : this.generateFallbackId()}`;

  private generateFallbackId(): string {
    return Math.random().toString(36).slice(2, 11);
  }

  private get isMultiSelect(): boolean {
    if (this.multiSelect !== undefined) return this.multiSelect;
    return [
      'checkboxes',
      'nested-checkboxes',
      'multi',
      'multi-with-subtitles',
    ].includes(this.type);
  }

  private get isPerGroupSingleSelect(): boolean {
    if (this.isMultiSelect) return false;
    if (this.selectPerGroup !== undefined) return this.selectPerGroup;
    return this.type === 'flyout';
  }

  private get effectiveRadioGroupName() {
    return this.radioGroupName || this._radioGroupName;
  }

  private handleNavigationItemClick(option: ContextMenuOption, event: Event) {
    event.preventDefault();
    if (option.children?.length) return; // Ignore group labels

    /**
     * Fired when an item is clicked (before selection changes).
     *
     * @event item-click
     * @type {CustomEvent<{value: string, option: ContextMenuOption}>}
     */
    this.dispatchEvent(
      new CustomEvent<ObcContextMenuInputItemClickEvent['detail']>(
        'item-click',
        {
          detail: {value: option.value, option},
        }
      )
    );

    let newSelectedValues = this.selectedValues;

    if (this.isMultiSelect) {
      newSelectedValues = this.selectedValues.includes(option.value)
        ? this.selectedValues.filter((v) => v !== option.value)
        : [...this.selectedValues, option.value];
    } else if (this.isPerGroupSingleSelect) {
      const parent = this.findParentGroup(option.value);
      const groupValues = parent?.children?.map((c) => c.value) || [];
      newSelectedValues = [
        ...this.selectedValues.filter((v) => !groupValues.includes(v)),
        option.value,
      ];
    } else {
      newSelectedValues = [option.value];
    }

    if (!arraysEqual(this.selectedValues, newSelectedValues))
      this.updateSelection(newSelectedValues);
  }

  private findParentGroup(
    value: string,
    opts: ContextMenuOption[] = this.options
  ): ContextMenuOption | null {
    for (const o of opts) {
      if (o.children?.some((c) => c.value === value)) return o;
      if (o.children) {
        const res = this.findParentGroup(value, o.children);
        if (res) return res;
      }
    }
    return null;
  }

  private handleRadioChange(option: ContextMenuOption, e: Event) {
    const input = e.target as HTMLInputElement;
    if (input.checked) this.updateSelection([option.value]);
  }

  private handleCheckboxChange(option: ContextMenuOption, e: Event) {
    const {status} = (e as CustomEvent<{status: 'checked' | 'unchecked'}>)
      .detail;
    const next =
      status === 'checked'
        ? [...this.selectedValues, option.value]
        : this.selectedValues.filter((v) => v !== option.value);
    if (!arraysEqual(this.selectedValues, next)) this.updateSelection(next);
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
    /**
     * Fired when the selection changes.
     *
     * @event change
     * @type {CustomEvent<{selectedValues: string[], selectedOptions: ContextMenuOption[]}>}
     */
    this.dispatchEvent(
      new CustomEvent<ObcContextMenuInputChangeEvent['detail']>('change', {
        detail: {selectedValues: vals, selectedOptions},
      })
    );
  }

  private handleCloseClick(e: Event) {
    e.preventDefault();
    /**
     * Fired when the close button is clicked (if title bar is shown).
     *
     * @event close
     * @type {CustomEvent<void>}
     */
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
  private renderNavItem(o: ContextMenuOption) {
    const isSelected = this.isOptionSelected(o.value);
    const indent = o.level ? (o.level - 1) * 16 : 0;
    return html`<div
      class="menu-item navigation-item-wrapper"
      style=${indent ? `padding-left:${indent}px` : ''}
    >
      <obc-navigation-item
        .label=${o.label}
        .checked=${isSelected}
        .variant=${ObcNavigationMenuVariant.Full}
        @click=${(e: Event) => this.handleNavigationItemClick(o, e)}
        role="menuitem"
        aria-selected=${isSelected}
        ?hasIcon=${!!o.icon}
      >
        ${o.icon ?? nothing}
      </obc-navigation-item>
    </div>`;
  }

  private renderRegularItems() {
    return this.options.map((o) => this.renderNavItem(o));
  }

  private renderRadioItems() {
    return this.options.map((o) => {
      const isSelected = this.isOptionSelected(o.value);
      const indent = o.level ? (o.level - 1) * 16 : 0;
      const id = `${this.effectiveRadioGroupName}-${o.value}`;
      return html`<div
        class="menu-item radio-item-wrapper"
        style=${indent ? `padding-left:${indent}px` : ''}
      >
        <obc-radio
          .label=${o.label}
          .name=${this.effectiveRadioGroupName}
          .value=${o.value}
          .inputId=${id}
          .checked=${isSelected}
          @change=${(e: Event) => this.handleRadioChange(o, e)}
        ></obc-radio>
      </div>`;
    });
  }

  private renderCheckboxItems() {
    return this.options.map((o) => {
      const isSelected = this.isOptionSelected(o.value);
      const isNested =
        this.type === 'nested-checkboxes' && o.level && o.level > 1;
      const indent = isNested ? (o.level! - 1) * 16 : 0;
      return html`<div
        class="menu-item checkbox-item-wrapper"
        style=${indent ? `padding-left:${indent}px` : ''}
      >
        <obc-checkbox
          .label=${o.label}
          .status=${isSelected ? 'checked' : 'unchecked'}
          @change=${(e: Event) => this.handleCheckboxChange(o, e)}
        ></obc-checkbox>
      </div>`;
    });
  }

  private renderFlyoutChildren(children: ContextMenuOption[]) {
    return children.map((c) => {
      const isSelected = this.isOptionSelected(c.value);
      return html`<obc-navigation-item
        .label=${c.label}
        .checked=${isSelected}
        .variant=${ObcNavigationMenuVariant.Full}
        @click=${(e: Event) => this.handleNavigationItemClick(c, e)}
        role="menuitem"
        aria-selected=${isSelected}
        ?hasIcon=${!!c.icon}
      >
        ${c.icon ?? nothing}
      </obc-navigation-item>`;
    });
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
          @open=${() => {
            this.shadowRoot
              ?.querySelectorAll('obc-navigation-item-group')
              .forEach((g) => {
                const group = g as ObcNavigationItemGroup;
                if (group.label !== o.label) group.close();
              });
          }}
        >
          ${o.icon ?? nothing} ${this.renderFlyoutChildren(o.children)}
        </obc-navigation-item-group>`;
      }
      return this.renderNavItem(o);
    });
  }

  private renderMultiColumnItems() {
    const renderColumn = (columnOptions: ContextMenuOption[]) => {
      if (!columnOptions.length) return nothing;
      return columnOptions.map((opt) => this.renderNavItem(opt));
    };

    if (this.type === 'multi-with-subtitles') {
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
      case 'radio':
        return this.renderRadioItems();
      case 'checkboxes':
      case 'nested-checkboxes':
        return this.renderCheckboxItems();
      case 'flyout':
        return this.renderFlyoutItems();
      case 'multi':
      case 'multi-with-subtitles':
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
