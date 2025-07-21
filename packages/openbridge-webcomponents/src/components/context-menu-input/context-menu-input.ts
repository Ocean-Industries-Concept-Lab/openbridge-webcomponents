import {LitElement, html, unsafeCSS, nothing} from 'lit';
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

export type ObcContextMenuInputChangeEvent = CustomEvent<{
  selectedValues: string[];
  selectedOptions: Array<{value: string; label: string; level?: number}>;
}>;

export type ObcContextMenuInputItemClickEvent = CustomEvent<{
  value: string;
  option: {value: string; label: string; level?: number};
}>;

export interface ContextMenuOption {
  value: string;
  label: string;
  level?: number;
  children?: ContextMenuOption[];
}

export interface ColumnGroup {
  title: string;
  columns: number;
  options: ContextMenuOption[];
}

@customElement('obc-context-menu-input')
export class ObcContextMenuInput extends LitElement {
  @property({type: String})
  type:
    | 'regular'
    | 'radio'
    | 'checkboxes'
    | 'nested-checkboxes'
    | 'flyout'
    | 'multi'
    | 'multi-with-subtitles' = 'regular';

  @property({type: Array}) options: ContextMenuOption[] = [];
  @property({type: Array}) selectedValues: string[] = [];
  @property({type: Boolean}) hasTitleBar = false;
  @property({type: String}) override title = 'Menu';
  @property({type: Array}) columnGroups: ColumnGroup[] = [];
  @property({type: Number}) itemsPerColumn = 5;
  @property({type: Boolean}) multiSelect?: boolean;
  @property({type: Boolean, reflect: true}) selectPerGroup?: boolean;
  @property({type: String}) radioGroupName?: string;

  /* -------------------------------------------------- */
  private _radioGroupName = `context-menu-${Math.random().toString(36).slice(2, 11)}`;

  /* --------------------------------------------------
   *  Computed props
   * -------------------------------------------------- */
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

  /* --------------------------------------------------
   *  Event handlers
   * -------------------------------------------------- */
  private handleNavigationItemClick(option: ContextMenuOption, event: Event) {
    event.preventDefault();
    if (option.children?.length) return; // Ignore group labels

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

  /* --------------------------------------------------
   *  Render helpers
   * -------------------------------------------------- */
  private renderTitleBar() {
    if (!this.hasTitleBar) return nothing;
    return html`<div class="title-container">
      <div class="title-content">
        <div class="title-text">${this.title}</div>
      </div>
      <obc-icon-button
        variant="flat"
        @click=${this.handleCloseClick}
        aria-label="Close menu"
        ><obi-close-google></obi-close-google
      ></obc-icon-button>
    </div>`;
  }

  /* ---------- Single‑column item renderers ---------- */
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
      ></obc-navigation-item>
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

  /* ---------- Flyout helpers ---------- */
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
      ></obc-navigation-item>`;
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
                if ((g as unknown).label !== o.label) (g as unknown).close();
              });
          }}
          >${this.renderFlyoutChildren(o.children)}</obc-navigation-item-group
        >`;
      }
      return this.renderNavItem(o);
    });
  }

  /* ---------- Multi‑column helpers ---------- */
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

  /* ---------- Utilities ---------- */
  private chunkArray<T>(arr: T[], size: number, forcedColumns?: number): T[][] {
    if (forcedColumns) {
      const out: T[][] = Array.from({length: forcedColumns}, () => []);
      arr.forEach((item, idx) => out[Math.floor(idx / size)].push(item));
      return out;
    }
    const result: T[][] = [];
    for (let i = 0; i < arr.length; i += size)
      result.push(arr.slice(i, i + size));
    return result;
  }

  /* ---------- Render entry ---------- */
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
  return a.length === b.length && a.every((v) => b.includes(v));
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-context-menu-input': ObcContextMenuInput;
  }
}
