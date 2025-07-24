import {LitElement, html, unsafeCSS, nothing, TemplateResult} from 'lit';
import {property} from 'lit/decorators.js';
import compentStyle from './context-menu-input.css?inline';
import '../../icons/icon-arrow-flyout-google.js';
import '../../icons/icon-close-google.js';
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

export enum ContextMenuType {
  Regular = 'regular',
  Checkboxes = 'checkboxes',
  NestedCheckboxes = 'nested-checkboxes',
  Flyout = 'flyout',
  Multi = 'multi',
  MultiWithSubtitles = 'multi-with-subtitles',
}

@customElement('obc-context-menu-input')
export class ObcContextMenuInput extends LitElement {
  @property({type: String})
  type: ContextMenuType = ContextMenuType.Regular;

  @property({type: Array}) options: ContextMenuOption[] = [];
  @property({type: Array}) selectedValues: string[] = [];
  @property({type: Boolean}) hasTitleBar = false;
  @property({type: String}) override title = '';
  @property({type: Array}) columnGroups: ColumnGroup[] = [];
  @property({type: Number}) itemsPerColumn = 5;
  @property({type: Boolean}) multiSelect?: boolean;
  @property({type: Boolean, reflect: true}) selectPerGroup?: boolean;
  @property({type: Boolean}) persistSelection = true;

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

    let newSelectedValues = this.selectedValues;

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
        <obc-checkbox
          .label=${o.label}
          .status=${isSelected ? 'checked' : 'unchecked'}
          @change=${(e: Event) => this.handleCheckboxChange(o, e)}
        ></obc-checkbox>
      </div>`;
    });
  }

  private renderNavItem(o: ContextMenuOption) {
    // Only show checked state if persistSelection is true, or in multi-select mode
    const showChecked = this.persistSelection || this.isMultiSelect;
    const isSelected = showChecked && this.isOptionSelected(o.value);
    const indent = o.level ? (o.level - 1) * 16 : 0;
    return html`<div
      class="menu-item navigation-item-wrapper"
      style=${indent ? `padding-left:${indent}px` : ''}
    >
      <obc-navigation-item
        .label=${o.label}
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
          <obc-checkbox
            .label=${c.label}
            .status=${isSelected ? 'checked' : 'unchecked'}
            @change=${(e: Event) => this.handleCheckboxChange(c, e)}
          ></obc-checkbox>
        </div>`;
      });
    }
    return children.map((c) => {
      const isSelected = this.isOptionSelected(c.value);
      return html`<obc-navigation-item
        .label=${c.label}
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
            <obc-checkbox
              .label=${o.label}
              .status=${isSelected ? 'checked' : 'unchecked'}
              @change=${(e: Event) => this.handleCheckboxChange(o, e)}
            ></obc-checkbox>
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
