import {LitElement, html, unsafeCSS, nothing, PropertyValues} from 'lit';
import {property, state} from 'lit/decorators.js';
import compentStyle from './dropdown-button.css?inline';
import '../../icons/icon-drop-down-google.js';
import '../button/button.js';
import {customElement} from '../../decorator.js';
import {classMap} from 'lit/directives/class-map.js';

export enum DropdownButtonType {
  label = 'label',
  icon = 'icon',
  labelIcon = 'label-icon',
}

export type ObcDropdownButtonChangeEvent = CustomEvent<{
  value: string;
  label: string;
}>;

/**
 * `<obc-dropdown-button>` – A dropdown select component for choosing a single option from a list.
 *
 * Presents a styled dropdown menu with a visible label and icon, allowing users to select one value from a set of options. The component displays the currently selected label and provides a native select element for accessibility and keyboard navigation.
 *
 * ### Features
 * - **Single selection:** Allows users to pick one option from a provided list.
 * - **Customizable options:** Accepts an array of `{value, label, level?}` objects for flexible option content and optional indentation (via `level`).
 * - **Visual label and icon:** Shows the selected label and a dropdown arrow icon (`<obi-drop-down-google>`).
 * - **Full width mode:** Can expand to fill the width of its container using the `fullWidth` property.
 * - **Accessible:** Uses a native `<select>` element under the hood for keyboard and screen reader support.
 * - **Focus styling:** Highlights the visible wrapper when the select is focused.
 *
 * ### Variants
 * - **Default:** Renders at intrinsic width, sized to content.
 * - **Full Width:** When `fullWidth` is true, stretches to fill the parent container.
 *
 * ### Usage Guidelines
 * Use `<obc-dropdown-button>` when you need a compact, accessible dropdown for single-choice selection. Ideal for forms, filters, and settings where users must pick one value from a list. Options can be grouped visually by providing a `level` property for indentation.
 *
 * **TODO(designer):** Confirm if there are recommended use cases or constraints for the `level` property (e.g., maximum nesting, visual grouping intent).
 *
 * ### Properties
 * - `options` (Array): List of selectable options, each with a `value` (string), `label` (string), and optional `level` (number) for indentation.
 * - `value` (string): The currently selected option's value. If not set, defaults to the first option.
 * - `fullWidth` (boolean): Expands the component to fill its container when true. Default is false.
 *
 * ### Events
 * - `dropdown-change` – Fired when the user selects a different option. The event detail includes `{ value, label }` of the selected option.
 * - `change` – Fired when the user selects a different option. The event detail includes `{ value, label }` of the selected option.
 *
 * ### Best Practices
 * - Always provide a non-empty `options` array; if empty, the select will show no label or options.
 * - Use unique `value` strings for each option to ensure correct selection and event detail.
 * - For grouped or indented options, set the `level` property (e.g., `level: 2` for sub-options).
 * - Avoid using for multi-select scenarios; use a dedicated multi-select component if multiple selections are needed.
 *
 * ### Example:
 * ```html
 * <obc-dropdown-button
 *   .options=${[
 *     { value: 'volvo', label: 'Volvo' },
 *     { value: 'xc90', label: 'XC 90', level: 2 },
 *     { value: 'mercedes', label: 'Mercedes' },
 *     { value: 'audi', label: 'Audi' }
 *   ]}
 *   value="volvo"
 * ></obc-dropdown-button>
 * ```
 *
 * @slot - (No named slots; all content is provided via properties)
 * @slot icon - Icon displayed at the start of the button when `type` is `icon` or `label-icon`.
 * @fires dropdown-change {ObcDropdownButtonChangeEvent} - Fires when the value of the select changes
 * @fires change {ObcDropdownButtonChangeEvent} - Fires when the value of the select changes
 */
@customElement('obc-dropdown-button')
export class ObcDropdownButton extends LitElement {
  /**
   * List of selectable options. Each option is an object with a `value` (string), `label` (string), and optional `level` (number) for indentation/grouping.
   *
   * Example:
   * [
   *   { value: 'volvo', label: 'Volvo' },
   *   { value: 'xc90', label: 'XC 90', level: 2 }
   * ]
   */
  @property({type: Array}) options: {
    value: string;
    label: string;
    level?: number;
  }[] = [];

  /**
   * The value of the currently selected option. If not set, defaults to the first option in the list.
   */
  @property({type: String}) value: string | undefined;
  @property({type: Boolean}) disabled: boolean = false;

  /**
   * If true, the select expands to fill the width of its container. Default is false.
   */
  @property({type: Boolean}) fullWidth = false;

  /**
   * Controls the button's display type.
   * - `label`: Text label only (default)
   * - `icon`: Icon only, no label
   * - `label-icon`: Icon before the label
   */
  @property({type: String}) type: DropdownButtonType = DropdownButtonType.label;

  /**
   * If true, the dropdown menu opens above the button.
   */
  @property({type: Boolean}) openTop = false;

  /**
   * If true, the select is integration style. Default is false, only for integration bar.
   */
  @property({type: Boolean}) integration = false;

  @property({type: Boolean}) flat = false;

  @state() private selectedValue = '';
  @state() private selectedLabel = '';

  override connectedCallback(): void {
    super.connectedCallback();
    this.updateSelectedValues();
  }

  override willUpdate(changedProperties: PropertyValues): void {
    if (changedProperties.has('value') || changedProperties.has('options')) {
      this.updateSelectedValues();
    }
  }

  private updateSelectedValues(): void {
    if (this.options.length === 0) {
      this.selectedValue = '';
      this.selectedLabel = '';
      return;
    }
    this.selectedValue = this.value || this.options[0].value;
    this.selectedLabel = this.value
      ? this.options.find((item) => item.value === this.value)?.label || ''
      : this.options[0].label;
  }

  override render() {
    return html`
      <div
        class=${classMap({
          wrapper: true,
          'full-width': this.fullWidth,
          'open-top': this.openTop,
          integration: this.integration,
          flat: this.flat,
          disabled: this.disabled,
        })}
      >
        <div class="visible-wrapper">
          ${this.type !== DropdownButtonType.label
            ? html`<div class="icon-container"><slot name="icon"></slot></div>`
            : nothing}
          ${this.type !== DropdownButtonType.icon
            ? html`<div class="label">${this.selectedLabel}</div>`
            : nothing}
          <div class="icon">
            <obi-drop-down-google></obi-drop-down-google>
          </div>
        </div>
        <select @change=${this.changeHandler} ?disabled=${this.disabled}>
          ${this.options.map((item) => {
            const indent = item.level ? (item.level - 1) * 2 : 0;
            const indentText = [];
            for (let i = 0; i < indent; i++) {
              indentText.push(html`&nbsp;`);
            }

            return html`<option
              value=${item.value}
              ?selected=${item.value === this.selectedValue}
            >
              ${indentText}${item.label}
            </option>`;
          })}
        </select>
      </div>
    `;
  }

  /**
   * Handles the dropdown-change and change event when a new option is selected. Updates the selected value and label, and dispatches a `dropdown-change` and 'change' event with the new selection.
   *
   * @fires dropdown-change {ObcDropdownButtonChangeEvent} - Fired when the user selects a different option.
   * @fires change {ObcDropdownButtonChangeEvent} - Fired when the user selects a different option.
   */
  private changeHandler(event: Event) {
    const target = event.target as HTMLSelectElement;
    this.selectedValue = target.value;
    this.selectedLabel = this.options
      .find((item) => item.value === this.selectedValue)!
      .label.trim();
    this.dispatchEvent(
      new CustomEvent('dropdown-change', {
        detail: {value: this.selectedValue, label: this.selectedLabel},
      })
    );
    this.dispatchEvent(
      new CustomEvent('change', {
        detail: {value: this.selectedValue, label: this.selectedLabel},
      })
    );
  }

  static override styles = unsafeCSS(compentStyle);
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-dropdown-button': ObcDropdownButton;
  }
}
