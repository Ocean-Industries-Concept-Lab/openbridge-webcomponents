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

export type ObcContextMenuInputChangeEvent = CustomEvent<{
  selectedValues: string[];
  selectedOptions: Array<{value: string; label: string; level?: number}>;
}>;

export type ObcContextMenuInputItemClickEvent = CustomEvent<{
  value: string;
  option: {value: string; label: string; level?: number};
}>;

@customElement('obc-context-menu-input')
export class ObcContextMenuInput extends LitElement {
  @property({type: String}) type: 'regular' | 'radio' | 'checkboxes' | 'nested-checkboxes' | 'flyout' | 'multi' | 'multi-with-subtitles' = 'regular';
  @property({type: Array}) options: {
    value: string;
    label: string;
    level?: number;
  }[] = [];
  @property({type: Array}) selectedValues: string[] = [];
  @property({type: Boolean}) hasTitleBar = false;
  @property({type: String}) title = 'Menu';
  @property({type: String}) subtitle1 = 'Subtitle 1';
  @property({type: String}) subtitle2 = 'Subtitle 2';
  @property({type: Boolean}) multiSelect?: boolean;
  @property({type: String}) radioGroupName?: string;
  @property({type: Number}) width = 200;
  @property({type: Number}) maxHeight = 300;

  private _radioGroupName: string;

  constructor() {
    super();
    this._radioGroupName = `context-menu-${Math.random().toString(36).substr(2, 9)}`;
  }

  private get isMultiSelect(): boolean {
    if (this.multiSelect !== undefined) return this.multiSelect;
    return ['checkboxes', 'nested-checkboxes', 'multi', 'multi-with-subtitles'].includes(this.type);
  }

  private get effectiveRadioGroupName(): string {
    return this.radioGroupName || this._radioGroupName;
  }

  private handleNavigationItemClick(option: {value: string; label: string; level?: number}, event: Event) {
    event.preventDefault();
    event.stopPropagation();

    this.dispatchEvent(
      new CustomEvent('item-click', {
        detail: { value: option.value, option },
      })
    );

    let newSelectedValues: string[];

    if (this.isMultiSelect) {
      if (this.selectedValues.includes(option.value)) {
        newSelectedValues = this.selectedValues.filter(value => value !== option.value);
      } else {
        newSelectedValues = [...this.selectedValues, option.value];
      }
    } else {
      if (this.selectedValues.includes(option.value)) {
        newSelectedValues = [];
      } else {
        newSelectedValues = [option.value];
      }
    }

    this.updateSelection(newSelectedValues);
  }

  private handleRadioChange(option: {value: string; label: string; level?: number}, event: Event) {
    // Listen to native input change event since obc-radio renders in light DOM
    const input = event.target as HTMLInputElement;
    if (input.type === 'radio' && input.checked) {
      this.updateSelection([option.value]);
    }
  }

  private handleCheckboxChange(option: {value: string; label: string; level?: number}, event: Event) {
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

    const selectedOptions = this.options.filter(opt => 
      newSelectedValues.includes(opt.value)
    );

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
        <div class="close-button-container">
          <button class="close-button" @click=${this.handleCloseClick} aria-label="Close menu">
            <obi-close-google></obi-close-google>
          </button>
        </div>
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

  private renderFlyoutItems() {
    return this.options.map((option) => {
      const isSelected = this.isOptionSelected(option.value);
      const hasSubMenu = option.value.endsWith('-submenu');
      const indent = option.level ? (option.level - 1) * 16 : 0;

      return html`
        <div 
          class="menu-item navigation-item-wrapper"
          style=${indent > 0 ? `padding-left: ${indent}px;` : ''}
        >
          <obc-navigation-item
            .label=${option.label}
            .checked=${isSelected}
            .group=${hasSubMenu}
            .variant=${ObcNavigationMenuVariant.Full}
            @click=${(e: Event) => this.handleNavigationItemClick(option, e)}
            role="menuitem"
            aria-selected=${isSelected}
            aria-haspopup=${hasSubMenu}
          ></obc-navigation-item>
        </div>
      `;
    });
  }

  private renderMultiColumnItems() {
    const midpoint = Math.ceil(this.options.length / 2);
    const column1 = this.options.slice(0, midpoint);
    const column2 = this.options.slice(midpoint);

    const renderColumn = (columnOptions: typeof this.options) => {
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

    return html`
      <div class="multi-content">
        ${this.type === 'multi-with-subtitles' ? html`
          <div class="subtitle-bar">
            <div class="subtitle-text">${this.subtitle1}</div>
          </div>
        ` : nothing}
        <div class="multi-columns">
          <div class="column">${renderColumn(column1)}</div>
          <div class="column column-divider">${renderColumn(column2)}</div>
        </div>
        ${this.type === 'multi-with-subtitles' && column2.length > 0 ? html`
          <div class="subtitle-bar">
            <div class="subtitle-text">${this.subtitle2}</div>
          </div>
        ` : nothing}
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
    return html`
      <div 
        class=${classMap({
          'context-menu': true,
          [`type-${this.type}`]: true,
          'has-title': this.hasTitleBar
        })}
        style="width: ${this.width}px; max-height: ${this.maxHeight}px;"
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