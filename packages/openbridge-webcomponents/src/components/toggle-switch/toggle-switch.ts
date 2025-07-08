import {LitElement, html, nothing, unsafeCSS} from 'lit';
import {property} from 'lit/decorators.js';
import {classMap} from 'lit/directives/class-map.js';
import '../icon-button/icon-button.js';
import componentStyle from './toggle-switch.css?inline';
import {customElement} from '../../decorator.js';

/**
 * `<obc-toggle-switch>` – A toggle switch component for binary on/off selection.
 *
 * Provides a visual switch control for toggling between two states (checked/unchecked), commonly used for enabling or disabling a setting or feature. The component supports optional label, description, icon, and divider for flexible presentation in lists or forms.
 *
 * ---
 *
 * ### Features
 * - **Binary toggle:** Allows users to switch between checked (on) and unchecked (off) states.
 * - **Label and Description:** Displays a primary label and an optional secondary description for context.
 * - **Icon Support:** Can display a leading icon via the `icon` slot for visual emphasis.
 * - **Disabled State:** Can be set to disabled, preventing user interaction and visually indicating inactivity.
 * - **Bottom Divider:** Optional divider for use in lists or grouped settings.
 * - **Responsive Layout:** Adapts label/description layout based on content; long descriptions are truncated with ellipsis.
 *
 * ---
 *
 * ### Usage Guidelines
 * Use `obc-toggle-switch` for settings or preferences that require a simple on/off or enable/disable control. Ideal for scenarios where the user needs to quickly toggle a feature, such as activating notifications, enabling dark mode, or switching connectivity options. Avoid using for mutually exclusive choices—use radio buttons for those cases.
 *
 * - Place in forms, settings panels, or lists where binary choices are needed.
 * - Use the description property to clarify the effect of the toggle if the label alone is not sufficient.
 * - If an icon is relevant, provide it via the `icon` slot to reinforce the meaning.
 * - For accessibility, ensure the label clearly describes the toggle's function.
 *
 * ---
 *
 * ### Slots
 * | Slot Name | Renders When...      | Purpose                                   |
 * |-----------|---------------------|-------------------------------------------|
 * | icon      | `hasIcon` is true   | Leading icon to visually represent toggle |
 *
 * ---
 *
 * ### Properties and Attributes
 * - `label` (string): Main label for the toggle (required for clarity).
 * - `checked` (boolean): Whether the toggle is in the "on" state. Defaults to `false`.
 * - `disabled` (boolean): Disables interaction and applies a disabled style.
 * - `hasDescription` (boolean): If true, shows the description text below the label.
 * - `description` (string): Supplementary text shown when `hasDescription` is true.
 * - `hasBottomDividor` (boolean): If true, renders a divider below the toggle (useful in lists).
 * - `hasIcon` (boolean): If true, displays the `icon` slot before the label.
 *
 * ---
 *
 * ### Events
 * - `input` – Fired when the toggle state changes (checked/unchecked).
 *
 * ---
 *
 * ### Best Practices
 * - Use concise labels and keep descriptions brief; long descriptions are truncated.
 * - Only use the divider when presenting multiple toggles in a list for visual separation.
 * - For accessibility, ensure the label is descriptive and unique within the context.
 * - Avoid using toggle switches for actions that require confirmation or have destructive effects.
 * - For mutually exclusive options, use radio buttons instead.
 *
 * ---
 *
 * **Example:**
 * ```html
 * <obc-toggle-switch
 *   label="Enable notifications"
 *   ?checked=${true}
 *   ?hasDescription=${true}
 *   description="Receive updates and alerts"
 *   ?hasIcon=${true}
 * >
 *   <obi-placeholder slot="icon"></obi-placeholder>
 * </obc-toggle-switch>
 * ```
 *
 * In this example, the toggle switch displays a label, an icon, and a description, and is in the checked state.
 *
 * @slot icon - Leading icon slot (shown when `hasIcon` is true)
 * @fires input - Dispatched when the value of the input changes
 */
@customElement('obc-toggle-switch')
export class ObcToggleSwitch extends LitElement {
  /**
   * Main label for the toggle switch. Should clearly describe the setting being toggled.
   */
  @property({type: String}) label = 'Label';

  /**
   * Whether the toggle is in the "on" (checked) state.
   * Set to true to display as active/on.
   */
  @property({type: Boolean}) checked = false;

  /**
   * Disables the toggle, preventing user interaction and applying a disabled style.
   */
  @property({type: Boolean}) disabled = false;

  /**
   * If true, displays the description text below the label.
   */
  @property({type: Boolean}) hasDescription = false;

  /**
   * Supplementary description text shown when `hasDescription` is true.
   * Use to clarify the effect or details of the toggle.
   */
  @property({type: String}) description = '';

  /**
   * If true, renders a divider below the toggle switch.
   * Useful for visually separating items in a list.
   */
  @property({type: Boolean}) hasBottomDividor = false;

  /**
   * If true, displays a leading icon before the label.
   * Provide icon content via the `icon` slot.
   */
  @property({type: Boolean}) hasIcon = false;

  /**
   * Handles input events to change the toggle state.
   * Prevents changes if the toggle is disabled.
   */
  private _tryChange(e: InputEvent) {
    if (this.disabled) {
      e.preventDefault();
      return;
    }
    this.checked = (e.target as HTMLInputElement).checked;
  }

  override render() {
    return html`
      <label
        class=${classMap({
          checked: this.checked,
          disabled: this.disabled,
          'has-description': this.hasDescription,
        })}
      >
        <div class="icon-label-container">
          ${this.hasIcon
            ? html`<div class="icon-container"><slot name="icon"></slot>
                </slot>
              </div>`
            : nothing}
          <div class="label-container">
            <span class="label">${this.label}</span>
            ${this.hasDescription
              ? html`<span class="description">${this.description}</span>`
              : nothing}
          </div>
        </div>
        <div class="switch">
          <div class="presenter ${classMap({checked: this.checked})}">
            <div class="knob"></div>
            <input
              type="checkbox"
              ?checked=${this.checked}
              ?disabled=${this.disabled}
              @input=${this._tryChange}
            />
          </div>
        </div>
        ${this.hasBottomDividor
          ? html`<div class="bottom-divider"></div>`
          : nothing}
      </label>
    `;
  }

  static override styles = unsafeCSS(componentStyle);
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-toggle-switch': ObcToggleSwitch;
  }
}
