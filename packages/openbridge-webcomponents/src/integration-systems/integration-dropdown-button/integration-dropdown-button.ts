import {LitElement, html, unsafeCSS, nothing, PropertyValues} from 'lit';
import {property, queryAssignedElements} from 'lit/decorators.js';
import compentStyle from './integration-dropdown-button.css?inline';
import '../../icons/icon-drop-down-google.js';
import {customElement} from '../../decorator.js';
import {classMap} from 'lit/directives/class-map.js';
import type {HTMLTemplateResult} from 'lit';
import {ObcIntegrationButton} from '../integration-button/integration-button.js';

export type ObcIntegrationDropdownButtonChangeEvent = CustomEvent<{
  value: string;
  label: string;
}>;

/**
 * `obc-integration-dropdown-button` – A composite integration button with an attached select dropdown for choosing a single integration target or a dedicated fleet option.
 *
 * ### Overview
 * This component renders a button-like control paired with a native `<select>` element, allowing the user to choose between predefined integration options or an optional fleet-wide action.
 * It surfaces the currently selected option (or fleet state) in the visible button area while delegating the actual selection logic to the hidden select element.
 *
 * ### Features and variants
 * - **Selectable options list**: Accepts a list of options via the `options` property, each providing a `value`, `label`, and icon template for the visible button content.
 * - **Fleet mode**: When `hasFleet` is true, the dropdown prepends a special `fleet` option whose label and selection state are driven by `fleetLabel` and the fleet slot content.
 * - **Layout controls**: Supports `fullWidth` to stretch to the container width and `openTop` to render the dropdown above the button when space below is constrained.
 * - **Disabled state**: The `disabled` property disables user interaction and visually indicates that the control is not currently actionable.
 * - **Placeholder label**: When no value is selected, the component can display a placeholder text via the `placeholder` property.
 *
 * ### Slots and content
 * - **`fleet` slot**: Used when `hasFleet` is true to render the content for the fleet option inside the dropdown.
 *   The assigned element is treated as an `ObcIntegrationButton` instance and its `selected` state is synchronized with the component's fleet selection.
 *
 * ### Events
 * - **`change`** (`ObcIntegrationDropdownButtonChangeEvent`): Fired when the user selects a new value from the dropdown.
 *   The event detail contains the `value` and the resolved `label` (either the fleet label or the label of the selected option).
 *
 * ### Example
 * ```html
 * <obc-integration-dropdown-button
 *   .options=${[
 *     { value: 'integration-a', label: 'Integration A', icon: html`<obi-placeholder></obi-placeholder>` },
 *     { value: 'integration-b', label: 'Integration B', icon: html`<obi-placeholder></obi-placeholder>` },
 *   ]}
 *   placeholder="Select integration"
 *   hasFleet
 *   fleetLabel="All vessels"
 * >
 *   <obc-integration-button slot="fleet" label="Fleet"></obc-integration-button>
 * </obc-integration-dropdown-button>
 * ```
 *
 * @slot fleet - Fleet button displayed when `hasFleet` is true.
 * @fires change {ObcIntegrationDropdownButtonChangeEvent} - Fires when the value of the select changes
 */
@customElement('obc-integration-dropdown-button')
export class ObcIntegrationDropdownButton extends LitElement {
  /**
   * List of selectable options. Each option is an object with a `value` (string), `label` (string), `icon` (HTMLTemplateResult), and optional `disabled` (boolean).
   *
   * Example:
   * [
   *   { value: 'volvo', label: 'Volvo', icon: html`<obi-ship></obi-ship>` },
   *   { value: 'xc90', label: 'XC 90', icon: html`<obi-ship></obi-ship>` }
   * ]
   */
  @property({type: Array}) options: {
    value: string;
    label: string;
    status?: string;
    icon: HTMLTemplateResult;
    disabled?: boolean;
  }[] = [];

  @property({type: Boolean}) hasFleet: boolean = false;
  @property({type: String}) fleetLabel: string = '';

  /**
   * The value of the currently selected option.
   */
  @property({type: String}) value: string | undefined;
  @property({type: String}) placeholder: string = '';
  @property({type: Boolean}) disabled: boolean = false;

  /**
   * If true, the select expands to fill the width of its container. Default is false.
   */
  @property({type: Boolean}) fullWidth = false;

  /**
   * If true, the dropdown menu opens above the button.
   */
  @property({type: Boolean}) openTop = false;

  private get selectedItem():
    | {value: string; label: string; icon: HTMLTemplateResult}
    | undefined {
    if (this.options.length === 0) {
      return undefined;
    }
    return this.options.find((item) => item.value === this.value);
  }

  private get fleetSelected(): boolean {
    return this.value === 'fleet';
  }

  @queryAssignedElements({slot: 'fleet'})
  fleetItems!: Array<HTMLElement>;

  private updateSelectedFleetStatus(): void {
    this.fleetItems.forEach((item) => {
      const button = item as ObcIntegrationButton;
      button.selected = this.fleetSelected;
    });
  }

  protected override updated(_changedProperties: PropertyValues): void {
    super.updated(_changedProperties);
    this.updateSelectedFleetStatus();
  }

  private get renderButtonLabel(): HTMLTemplateResult {
    if (this.fleetSelected) {
      return html`<div class="label">${this.fleetLabel}</div>`;
    }
    if (this.selectedItem) {
      return html`<div class="icon-container">${this.selectedItem.icon}</div>
        <div class="label">${this.selectedItem.label}</div>`;
    }
    return html`<div class="label placeholder">${this.placeholder}</div>`;
  }

  override render() {
    return html`
      <div
        class=${classMap({
          wrapper: true,
          'full-width': this.fullWidth,
          'open-top': this.openTop,
          disabled: this.disabled,
        })}
      >
        <div class="visible-wrapper">
          ${this.renderButtonLabel}
          <div class="icon">
            <obi-drop-down-google></obi-drop-down-google>
          </div>
        </div>
        <select @change=${this.changeHandler} ?disabled=${this.disabled}>
          ${this.hasFleet
            ? html`
                <option
                  value="fleet"
                  class="fleet-option"
                  ?selected=${this.fleetSelected}
                >
                  <slot name="fleet"></slot>
                </option>
              `
            : nothing}
          ${this.options.map((item) => {
            return html`<option
              value=${item.value}
              ?selected=${item.value === this.value}
              ?disabled=${item.disabled}
            >
              <div class="icon">${item.icon}</div>
              <div class="text-container">
                <div class="label">${item.label}</div>
                ${item.status
                  ? html`<div class="status">${item.status}</div>`
                  : nothing}
              </div>
            </option>`;
          })}
        </select>
      </div>
    `;
  }

  /**
   * Handles the dropdown-change and change event when a new option is selected. Updates the selected value and label, and dispatches a `dropdown-change` and 'change' event with the new selection.
   *
   * @fires dropdown-change {ObcIntegrationDropdownButtonChangeEvent} - Fired when the user selects a different option.
   * @fires change {ObcIntegrationDropdownButtonChangeEvent} - Fired when the user selects a different option.
   */
  private changeHandler(event: Event) {
    const target = event.target as HTMLSelectElement;
    this.value = target.value;
    this.dispatchEvent(
      new CustomEvent('change', {
        detail: {
          value: this.value,
          label:
            this.value === 'fleet' ? this.fleetLabel : this.selectedItem?.label,
        },
      })
    );
  }

  static override styles = unsafeCSS(compentStyle);
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-integration-dropdown-button': ObcIntegrationDropdownButton;
  }
}
