import {LitElement, html, unsafeCSS, nothing, PropertyValues} from 'lit';
import {property, state} from 'lit/decorators.js';
import compentStyle from './integration-dropdown-button.css?inline';
import '../../icons/icon-drop-down-google.js';
import '../../components/button/button.js';
import {customElement} from '../../decorator.js';
import {classMap} from 'lit/directives/class-map.js';
import type {HTMLTemplateResult} from 'lit';

export enum IntegrationDropdownButtonType {
  label = 'label',
  icon = 'icon',
  labelIcon = 'label-icon',
}

export type ObcIntegrationDropdownButtonChangeEvent = CustomEvent<{
  value: string;
  label: string;
}>;

/**
 * @slot icon - Icon displayed at the start of the button when `type` is `icon` or `label-icon`.
 * @fires dropdown-change {ObcIntegrationDropdownButtonChangeEvent} - Fires when the value of the select changes
 * @fires change {ObcIntegrationDropdownButtonChangeEvent} - Fires when the value of the select changes
 */
@customElement('obc-integration-dropdown-button')
export class ObcIntegrationDropdownButton extends LitElement {
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
    icon: HTMLTemplateResult;
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

  override render() {
    const selectedItem = this.selectedItem;
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
          <div class="icon-container">${selectedItem?.icon}</div>
          <div class="label">${selectedItem?.label}</div>
          <div class="icon">
            <obi-drop-down-google></obi-drop-down-google>
          </div>
        </div>
        <select @change=${this.changeHandler} ?disabled=${this.disabled}>
          <option value="fleet">
            <slot name="fleet"></slot>
          </option>
          ${this.options.map((item) => {
            return html`<option
              value=${item.value}
              ?selected=${item.value === this.value}
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
      new CustomEvent('dropdown-change', {
        detail: {value: this.value, label: this.selectedItem?.label},
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
