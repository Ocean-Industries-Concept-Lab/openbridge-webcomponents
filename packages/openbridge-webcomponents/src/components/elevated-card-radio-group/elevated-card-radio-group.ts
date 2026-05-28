import {LitElement, html, unsafeCSS} from 'lit';
import {property} from 'lit/decorators.js';
import compentStyle from './elevated-card-radio-group.css?inline';
import {ObcElevatedCardPosition} from '../elevated-card/elevated-card.js';
import '../elevated-card-radio/elevated-card-radio.js';
import {customElement} from '../../decorator.js';
import {classMap} from 'lit/directives/class-map.js';

export type ObcElevatedCardRadioGroupChangeEvent = CustomEvent<{
  value: string;
}>;

export type ElevatedCardRadioGroupOption = {
  label: string;
  value: string;
};

/**
 * `<obc-elevated-card-radio-group>` – A group of radio buttons styled as elevated cards for single selection.
 *
 * Presents a set of mutually exclusive options, each displayed as an elevated card radio button. Only one option can be selected at a time, providing a visually distinct and touch-friendly alternative to standard radio groups.
 *
 * ---
 *
 * ### Features
 * - **Single Selection:** Only one card radio can be selected at a time; selecting a new option deselects the previous.
 * - **Elevated Card Style:** Each option is rendered as an elevated card, enhancing visual separation and affordance.
 * - **Configurable Options:** Options are provided as an array of `{label, value}` objects for flexible content.
 * - **Disabled State:** The entire group can be disabled, preventing interaction.
 * - **Required State:** Can be marked as required for form validation.
 * - **Pre-selection:** Supports setting an initial selected value.
 * - **Named Grouping:** All radios share a common `name` for proper form grouping and native browser support.
 * - **Top/Bottom Card Styling:** The first and last cards can be visually styled as "top" or "bottom" for rounded corners or other effects (controlled by the `top` property).
 *
 * ---
 *
 * ### Usage Guidelines
 * Use `obc-elevated-card-radio-group` when you want to present a set of mutually exclusive choices in a visually prominent, card-like format. Ideal for scenarios where options benefit from extra emphasis or need to be easily distinguishable (e.g., selecting a plan, mode, or configuration).
 *
 * - Prefer this component over standard radio groups when visual clarity or touch interaction is important.
 * - Each option should have a concise label; avoid overly long text to maintain card layout.
 * - Only use for single-choice scenarios. For multiple selections, use checkboxes or a different component.
 * - The `disabled` property disables all options in the group.
 * - The `required` property can be used for form validation, ensuring a selection is made before submission.
 *
 * **TODO(designer):** Confirm if there are recommended maximum numbers of options before switching to a different UI pattern, and if there are layout constraints for very long labels.
 *
 * ---
 *
 * ### Properties
 * - `options` (`{label: string; value: string}[]`): Array of options to display as card radios. Each object should have a `label` (displayed text) and a `value` (submitted value).
 * - `name` (`string`): Shared name for all radio inputs in the group. Ensures native radio group behavior. (Default: `'default'`)
 * - `value` (`string`): The currently selected value. Setting this will pre-select the corresponding card radio.
 * - `disabled` (`boolean`): Disables all options in the group when true.
 * - `required` (`boolean`): Marks the group as required for form validation.
 * - `top` (`boolean`): If true, applies "top" styling to the first card (e.g., rounded corners). The last card always receives "bottom" styling.
 *
 * ---
 *
 * ### Events
 * - `change` – Fired when the selected value changes. The event detail contains the new value: `{ value: string }`.
 *
 * ---
 *
 * ### Best Practices & Constraints
 * - Ensure all options have unique `value` fields to prevent selection conflicts.
 * - For accessibility, provide clear and descriptive labels for each option.
 * - Use the `name` property to group radios together for correct form submission and keyboard navigation.
 * - Avoid using this component for binary (yes/no) choices; use a single toggle or checkbox instead.
 *
 * ---
 *
 * ### Example
 * ```html
 * <obc-elevated-card-radio-group
 *   .options=${[
 *     {label: 'Option A', value: 'a'},
 *     {label: 'Option B', value: 'b'},
 *     {label: 'Option C', value: 'c'}
 *   ]}
 *   name="example"
 *   value="b"
 *   required
 * ></obc-elevated-card-radio-group>
 * ```
 * In this example, "Option B" is pre-selected, and the group is required.
 *
 * @slot - No named slots. All content is provided via the `options` property.
 * @fires change {ObcElevatedCardRadioGroupChangeEvent} - Dispatched when the value changes
 */
@customElement('obc-elevated-card-radio-group')
export class ObcElevatedCardRadioGroup extends LitElement {
  /**
   * Array of options to display as card radios. Each option should be an object with a `label` (displayed text) and a `value` (submitted value).
   *
   * Example: `[{label: 'Option 1', value: '1'}, {label: 'Option 2', value: '2'}]`
   */
  @property({type: Array}) options: ElevatedCardRadioGroupOption[] = [];

  /**
   * Shared name for all radio inputs in the group. Ensures native radio group behavior and correct form submission.
   *
   * Default: `'default'`
   */
  @property({type: String}) name: string = 'default';

  /**
   * The currently selected value. Setting this will pre-select the corresponding card radio.
   */
  @property({type: String}) value: string = '';

  /**
   * Disables all options in the group when true.
   */
  @property({type: Boolean}) disabled: boolean = false;

  /**
   * Marks the group as required for form validation.
   */
  @property({type: Boolean}) required: boolean = false;

  /**
   * If true, applies "top" styling to the first card (e.g., for rounded corners). The last card always receives "bottom" styling.
   */
  @property({type: Boolean}) top: boolean = false;

  private _handleValueChange(params: InputEvent) {
    const value = (params.target as HTMLInputElement).value;
    this.value = value;
    this.dispatchEvent(
      new CustomEvent('change', {
        detail: {value},
      }) satisfies ObcElevatedCardRadioGroupChangeEvent
    );
  }

  override render() {
    const wrapperClasses = {
      wrapper: true,
      disabled: this.disabled,
    };

    return html`<div class=${classMap(wrapperClasses)}>
      ${this.options.map((option, i) => {
        let position: ObcElevatedCardPosition = ObcElevatedCardPosition.Center;
        if (i === 0 && this.top) {
          position = ObcElevatedCardPosition.Top;
        }
        if (i === this.options.length - 1) {
          position = ObcElevatedCardPosition.Bottom;
        }
        return html` <obc-elevated-card-radio
          .name=${this.name}
          .value=${option.value}
          .label=${option.label}
          ?checked=${this.value === option.value}
          ?disabled=${this.disabled}
          ?required=${this.required}
          .position=${position}
          @change=${this._handleValueChange}
        ></obc-elevated-card-radio>`;
      })}
    </div>`;
  }

  static override styles = unsafeCSS(compentStyle);
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-elevated-card-radio-group': ObcElevatedCardRadioGroup;
  }
}
