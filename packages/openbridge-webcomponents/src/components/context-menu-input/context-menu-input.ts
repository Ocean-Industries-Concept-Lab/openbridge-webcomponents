import {LitElement, html, unsafeCSS, nothing} from 'lit';
import {property, state} from 'lit/decorators.js';
import compentStyle from './context-menu-input.css?inline';
import '../../icons/icon-arrow-flyout-google.js';
import '../../icons/icon-close-google.js';
import '../radio/radio.js';
import '../checkbox/checkbox.js';
import '../navigation-item/navigation-item.js';
import {ObcNavigationMenuVariant} from '../navigation-menu/navigation-menu.js';
import {customElement} from '../../decorator.js';
import {classMap} from 'lit/directives/class-map.js';
import "../icon-button/icon-button";
import '../navigation-item-group/navigation-item-group.js';

export type ObcContextMenuInputChangeEvent = CustomEvent<{
  selectedValues: string[];
  selectedOptions: Array<{value: string; label: string; level?: number}>;
}>;

export type ObcContextMenuInputItemClickEvent = CustomEvent<{
  value: string;
  option: {value: string; label: string; level?: number};
}>;

// Updated option type to support flyout structure
export interface ContextMenuOption {
  value: string;
  label: string;
  level?: number;
  children?: ContextMenuOption[]; // Add children for flyout items
}

export interface ColumnGroup {
  title: string;
  columns: number; // How many columns this group should span
  options: ContextMenuOption[];
}

@customElement('obc-context-menu-input')
export class ObcContextMenuInput extends LitElement {
  @property({type: String}) type: 'regular' | 'radio' | 'checkboxes' | 'nested-checkboxes' | 'flyout' | 'multi' | 'multi-with-subtitles' = 'regular';
  @property({type: Array}) options: ContextMenuOption[] = [];
  @property({type: Array}) selectedValues: string[] = [];
  @property({type: Boolean}) hasTitleBar = false;
  @property({type: String}) override title = 'Menu';
  @property({type: Array}) columnGroups: ColumnGroup[] = [];
  @property({type: Number}) itemsPerColumn = 5;
  @property({type: Boolean}) multiSelect?: boolean;
  @property({type: Boolean}) selectPerGroup = false; // New property for group-based selection
  @property({type: String}) radioGroupName?: string;


  private _radioGroupName: string;

  constructor() {
    super();
    this._radioGroupName = `context-menu-${Math.random().toString(36).substr(2, 9)}`;
  }

  private get isMultiSelect(): boolean {
    // If multiSelect is explicitly set, use that value
    if (this.multiSelect !== undefined) return this.multiSelect;
    // Otherwise, default based on type
    return ['checkboxes', 'nested-checkboxes', 'multi', 'multi-with-subtitles'].includes(this.type);
  }

  /**
   * Determines whether the component is in selection mode.
   * Selection mode is active if multiSelect is explicitly true,
   * or if there are initial selections and multiSelect is not explicitly false.
   */
  private get isSelectionMode(): boolean {
    if (this.multiSelect === true) return true;
    if (this.multiSelect === false) return false;
    // If multiSelect is undefined, determine based on initial selectedValues
    return this.selectedValues.length > 0;
  }

  private get effectiveRadioGroupName(): string {
    return this.radioGroupName || this._radioGroupName;
  }

  private handleNavigationItemClick(option: ContextMenuOption, event: Event) {
    event.preventDefault();
    event.stopPropagation();

    // If this item has children, the navigation-item-group handles the flyout
    // We only need to handle selection for leaf items
    if (option.children && option.children.length > 0) {
      return;
    }

    this.dispatchEvent(
      new CustomEvent('item-click', {
        detail: { value: option.value, option },
      })
    );

    // Check if we're in action-only mode (no selection state)
    const isActionOnly = this.type === 'flyout' && this.multiSelect === false && this.selectedValues.length === 0;
    
    if (isActionOnly) {
      // In action-only mode, don't update selection state
      // The item-click event is dispatched above for handling the action
      return;
    }

    let newSelectedValues: string[];

    if (this.isMultiSelect) {
      // Multi-select: toggle the item
      if (this.selectedValues.includes(option.value)) {
        newSelectedValues = this.selectedValues.filter(value => value !== option.value);
      } else {
        newSelectedValues = [...this.selectedValues, option.value];
      }
    } else if (this.selectPerGroup && this.type === 'flyout') {
      // Single select per group: find the parent group and replace selection within that group
      const parentGroup = this.findParentGroup(option.value);
      if (parentGroup) {
        // Remove any existing selections from this group
        const groupChildValues = parentGroup.children?.map(child => child.value) || [];
        newSelectedValues = this.selectedValues.filter(value => !groupChildValues.includes(value));
        // Add the new selection if it's not already selected
        if (!this.selectedValues.includes(option.value)) {
          newSelectedValues = [...newSelectedValues, option.value];
        }
      } else {
        // For top-level items without groups, use normal single selection
        newSelectedValues = this.selectedValues.includes(option.value) ? [] : [option.value];
      }
    } else {
      // Single select global: only one item can be selected across entire menu
      if (this.selectedValues.includes(option.value)) {
        newSelectedValues = [];
      } else {
        newSelectedValues = [option.value];
      }
    }

    this.updateSelection(newSelectedValues);
  }

  private findParentGroup(childValue: string): ContextMenuOption | null {
    for (const option of this.options) {
      if (option.children) {
        for (const child of option.children) {
          if (child.value === childValue) {
            return option;
          }
        }
      }
    }
    return null;
  }

  private handleRadioChange(option: ContextMenuOption, event: Event) {
    // Listen to native input change event since obc-radio renders in light DOM
    const input = event.target as HTMLInputElement;
    if (input.type === 'radio' && input.checked) {
      this.updateSelection([option.value]);
    }
  }

  private handleCheckboxChange(option: ContextMenuOption, event: Event) {
    const checkboxEvent = event as CustomEvent;
    const isChecked = checkboxEvent.detail.status === 'checked';
    
    let newSelectedValues: string[];
    
    if (isChecked) {
      newSelectedValues = [...this.selectedValues, option.value];
    } else {
      newSelectedValues = this.selectedValues.filter(value => value !== option.value);
    }

    this.updateSelection(newSelectedValues);
  }

  private updateSelection(newSelectedValues: string[]) {
    this.selectedValues = newSelectedValues;

    // Find all selected options (including from nested children)
    const selectedOptions: ContextMenuOption[] = [];
    
    // Add top-level selected options
    this.options.forEach(option => {
      if (newSelectedValues.includes(option.value)) {
        selectedOptions.push(option);
      }
      // Add child options that are selected
      if (option.children) {
        option.children.forEach(child => {
          if (newSelectedValues.includes(child.value)) {
            selectedOptions.push(child);
          }
        });
      }
    });

    this.dispatchEvent(
      new CustomEvent('change', {
        detail: { selectedValues: newSelectedValues, selectedOptions },
      })
    );
  }

  private handleCloseClick(event: Event) {
    event.preventDefault();
    event.stopPropagation();
    this.dispatchEvent(new CustomEvent('close'));
  }

  private isOptionSelected(value: string): boolean {
    return this.selectedValues.includes(value);
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
          aria-label="Close menu">
          <obi-close-google></obi-close-google>
        </obc-icon-button>
      </div>
    `;
  }

  private renderRegularItems() {
    return this.options.map((option) => {
      const isSelected = this.isOptionSelected(option.value);
      const indent = option.level ? (option.level - 1) * 16 : 0;

      return html`
        <div 
          class="menu-item navigation-item-wrapper"
          style=${indent > 0 ? `padding-left: ${indent}px;` : ''}
        >
          <obc-navigation-item
            .label=${option.label}
            .checked=${isSelected}
            .variant=${ObcNavigationMenuVariant.Full}
            @click=${(e: Event) => this.handleNavigationItemClick(option, e)}
            role="menuitem"
            aria-selected=${isSelected}
          ></obc-navigation-item>
        </div>
      `;
    });
  }

  private renderRadioItems() {
    return this.options.map((option) => {
      const isSelected = this.isOptionSelected(option.value);
      const indent = option.level ? (option.level - 1) * 16 : 0;
      const radioId = `${this.effectiveRadioGroupName}-${option.value}`;

      return html`
        <div 
          class="menu-item radio-item-wrapper"
          style=${indent > 0 ? `padding-left: ${indent}px;` : ''}
          role="menuitemradio"
          aria-checked=${isSelected}
          @change=${(e: Event) => this.handleRadioChange(option, e)}
        >
          <obc-radio
            .label=${option.label}
            .name=${this.effectiveRadioGroupName}
            .value=${option.value}
            .inputId=${radioId}
            .checked=${isSelected}
          ></obc-radio>
        </div>
      `;
    });
  }

  private renderCheckboxItems() {
    return this.options.map((option) => {
      const isSelected = this.isOptionSelected(option.value);
      const isNested = this.type === 'nested-checkboxes' && option.level && option.level > 1;
      const indent = isNested ? (option.level! - 1) * 16 : 0;

      return html`
        <div 
          class="menu-item checkbox-item-wrapper"
          style=${indent > 0 ? `padding-left: ${indent}px;` : ''}
          role="menuitemcheckbox"
          aria-checked=${isSelected}
        >
          <obc-checkbox
            .label=${option.label}
            .status=${isSelected ? 'checked' : 'unchecked'}
            @change=${(e: Event) => this.handleCheckboxChange(option, e)}
          ></obc-checkbox>
        </div>
      `;
    });
  }

  // New method to render child items for navigation groups
  private renderFlyoutChildren(children: ContextMenuOption[]) {
    return children.map((child) => {
      const isSelected = this.isOptionSelected(child.value);
      
      return html`
        <obc-navigation-item
          .label=${child.label}
          .checked=${isSelected}
          .variant=${ObcNavigationMenuVariant.Full}
          @click=${(e: Event) => this.handleNavigationItemClick(child, e)}
          role="menuitem"
          aria-selected=${isSelected}
        ></obc-navigation-item>
      `;
    });
  }

  // Updated flyout rendering using navigation-item-group
  private renderFlyoutItems() {
    return this.options.map((option) => {
      const isSelected = this.isOptionSelected(option.value);
      const hasChildren = option.children && option.children.length > 0;

      // If the option has children, use navigation-item-group
      if (hasChildren) {
        return html`
          <obc-navigation-item-group
            .label=${option.label}
            .checked=${isSelected}
            .variant=${ObcNavigationMenuVariant.Full}
            .hug=${true}
            @open=${() => {
              // Close other groups when one opens
              const groups = this.shadowRoot?.querySelectorAll('obc-navigation-item-group');
              groups?.forEach(group => {
                if (group.label !== option.label) {
                  (group as any).close();
                }
              });
            }}
          >
            ${this.renderFlyoutChildren(option.children!)}
          </obc-navigation-item-group>
        `;
      }

      // Regular navigation item for items without children
      return html`
        <div class="menu-item navigation-item-wrapper">
          <obc-navigation-item
            .label=${option.label}
            .checked=${isSelected}
            .variant=${ObcNavigationMenuVariant.Full}
            @click=${(e: Event) => this.handleNavigationItemClick(option, e)}
            role="menuitem"
            aria-selected=${isSelected}
          ></obc-navigation-item>
        </div>
      `;
    });
  }

  private renderMultiColumnItems() {
    const renderColumn = (columnOptions: ContextMenuOption[]) => {
      if (columnOptions.length === 0) return nothing;
      
      return columnOptions.map((option) => {
        const isSelected = this.isOptionSelected(option.value);

        return html`
          <div class="menu-item navigation-item-wrapper">
            <obc-navigation-item
              .label=${option.label}
              .checked=${isSelected}
              .variant=${ObcNavigationMenuVariant.Full}
              @click=${(e: Event) => this.handleNavigationItemClick(option, e)}
              role="menuitem"
              aria-selected=${isSelected}
            ></obc-navigation-item>
          </div>
        `;
      });
    };

    if (this.type === 'multi-with-subtitles') {
      if (this.columnGroups.length === 0) {
        // Fallback: if no columnGroups defined, distribute options evenly
        const totalItems = this.options.length;
        const numberOfColumns = Math.ceil(totalItems / this.itemsPerColumn);
        
        const columns: ContextMenuOption[][] = Array(numberOfColumns).fill(null).map(() => []);
        this.options.forEach((item, index) => {
          const columnIndex = Math.floor(index / this.itemsPerColumn);
          columns[columnIndex].push(item);
        });

        return html`
          <div class="multi-content">
            <div class="multi-columns">
              <div class="columns-container">
                ${columns.map((columnOptions, index) => {
                  if (columnOptions.length === 0) return nothing;
                  
                  return html`
                    <div class="column-with-header ${index > 0 ? 'column-divider' : ''}">
                      <div class="column-header">
                        <div class="subtitle-container">
                          <div class="subtitle-text">Group ${index + 1}</div>
                        </div>
                      </div>
                      <div class="column-content">
                        ${renderColumn(columnOptions)}
                      </div>
                    </div>
                  `;
                })}
              </div>
            </div>
          </div>
        `;
      }

      // Build a flat array of all columns with their group information
      interface ColumnInfo {
        options: ContextMenuOption[];
        groupTitle: string;
        isFirstInGroup: boolean;
        isFirstGroup: boolean;
        groupIndex: number;
        columnInGroup: number;
      }

      const allColumns: ColumnInfo[] = [];
      
      this.columnGroups.forEach((group, groupIndex) => {
        if (group.options.length === 0) return;
        
        // Calculate how many columns this group actually needs
        // Use the larger of: specified columns OR auto-calculated based on itemsPerColumn
        const calculatedColumns = Math.ceil(group.options.length / this.itemsPerColumn);
        const actualColumns = Math.max(group.columns, calculatedColumns);
        
        // Distribute group options across the actual number of columns needed
        const groupColumns: ContextMenuOption[][] = Array(actualColumns).fill(null).map(() => []);
        
        group.options.forEach((item, index) => {
          const columnIndex = Math.floor(index / this.itemsPerColumn);
          if (columnIndex < actualColumns) {
            groupColumns[columnIndex].push(item);
          }
        });

        // Add each column to our flat array
        groupColumns.forEach((columnOptions, columnIndex) => {
          if (columnOptions.length > 0) {
            allColumns.push({
              options: columnOptions,
              groupTitle: group.title,
              isFirstInGroup: columnIndex === 0,
              isFirstGroup: groupIndex === 0,
              groupIndex,
              columnInGroup: columnIndex
            });
          }
        });
      });

      return html`
        <div class="multi-content">
          <div class="multi-columns">
            <div class="columns-container">
              ${allColumns.map((columnInfo, index) => {
                // Show divider if this is the first column of a non-first group
                const needsDivider = !columnInfo.isFirstGroup && columnInfo.isFirstInGroup;
                
                return html`
                  <div class="column-with-header ${needsDivider ? 'column-divider' : ''}">
                    ${columnInfo.isFirstInGroup ? html`
                      <div class="column-header">
                        <div class="subtitle-container">
                          <div class="subtitle-text">${columnInfo.groupTitle}</div>
                        </div>
                      </div>
                    ` : html`
                      <div class="column-header-spacer"></div>
                    `}
                    <div class="column-content">
                      ${renderColumn(columnInfo.options)}
                    </div>
                  </div>
                `;
              })}
            </div>
          </div>
        </div>
      `;
    }

    const totalItems = this.options.length;
    const numberOfColumns = Math.ceil(totalItems / this.itemsPerColumn);
    
    const columns: ContextMenuOption[][] = Array(numberOfColumns).fill(null).map(() => []);
    this.options.forEach((item, index) => {
      const columnIndex = Math.floor(index / this.itemsPerColumn);
      columns[columnIndex].push(item);
    });

    return html`
      <div class="multi-content">
        <div class="multi-columns">
          ${columns.map((columnOptions, index) => {
            if (columnOptions.length === 0) return nothing;
            
            return html`
              <div class="column ${index > 0 ? 'column-divider' : ''}">
                ${renderColumn(columnOptions)}
              </div>
            `;
          })}
        </div>
      </div>
    `;
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
    const isMultiColumn = this.type === 'multi' || this.type === 'multi-with-subtitles';
    
    return html`
      <div 
        class=${classMap({
          'context-menu': true,
          [`type-${this.type}`]: true,
          'has-title': this.hasTitleBar
        })}
        role="menu"
        aria-label=${this.hasTitleBar ? this.title : 'Context menu'}
      >
        ${this.renderTitleBar()}
        <div class="menu-content">
          ${this.renderMenuContent()}
        </div>
      </div>
    `;
  }

  static override styles = unsafeCSS(compentStyle);
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-context-menu-input': ObcContextMenuInput;
  }
}