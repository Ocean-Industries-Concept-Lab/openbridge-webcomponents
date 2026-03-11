import {LitElement, html, unsafeCSS, nothing, PropertyValues} from 'lit';
import {property, queryAssignedElements} from 'lit/decorators.js';
import compentStyle from './integration-dropdown-button.css?inline';
import '../../icons/icon-drop-down-google.js';
import '../../components/button/button.js';
import {customElement} from '../../decorator.js';
import {classMap} from 'lit/directives/class-map.js';
import type {HTMLTemplateResult} from 'lit';
import {ObcIntegrationButton} from '../integration-button/integration-button.js';

export type ObcIntegrationDropdownButtonChangeEvent = CustomEvent<{
  value: string;
  label: string;
}>;

/**
 * @slot fleet - Fleet button displayed when `hasFleet` is true.
 * @fires change {ObcIntegrationDropdownButtonChangeEvent} - Fires when the value of the select changes
 */
@customElement('obc-integration-dropdown-button')
export class ObcIntegrationDropdownButton extends LitElement {
  /**
   * List of selectable options. Each option is an object with a `value` (string), `label` (string), and optional `level` (number) for indentation/grouping.
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
                <option value="fleet" class="fleet-option">
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
              <div class="label">${item.label}</div>
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
