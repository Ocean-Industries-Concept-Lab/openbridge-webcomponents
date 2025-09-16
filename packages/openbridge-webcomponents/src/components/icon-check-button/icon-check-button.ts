import {LitElement, html, unsafeCSS} from 'lit';
import {property} from 'lit/decorators.js';
import componentStyles from './icon-check-button.css?inline';
import {classMap} from 'lit/directives/class-map.js';
import {customElement} from '../../decorator.js';

/**
 * `<obc-icon-check-button>` – An icon-based toggle button for binary selection, similar to an icon checkbox or toggle chip.
 *
 * This component displays a clickable icon (with optional label) that toggles between checked and unchecked states. It is designed for use cases where a compact, visually prominent toggle is needed, such as toolbars, filter panels, or quick-access settings.
 *
 * Appears as a button with a customizable icon and, optionally, a label beneath. The checked state is visually indicated, and the component supports disabled and alert modes for additional feedback.
 *
 * ## Features
 * - **Toggleable State:** Click to switch between checked and unchecked. Visual styling updates to reflect the state.
 * - **Icon Slot:** Main icon is provided via the `icon` slot, allowing use of any OpenBridge icon (e.g., `<obi-placeholder>`).
 * - **Optional Label:** Set `hasLabel` to display a text label below the icon (controlled by the `label` property).
 * - **Disabled Mode:** Prevents interaction and applies disabled styling when `disabled` is true.
 * - **Alert State:** When `hasAlert` is true, adds alert styling (e.g., red border) to draw attention.
 * - **Accessible:** Uses `aria-pressed` and `aria-disabled` for assistive technologies.
 *
 * ## Variants
 * - **Icon Only:** Set `hasLabel` to false for a compact, icon-only toggle.
 * - **Icon with Label:** Set `hasLabel` to true and provide a `label` for a descriptive toggle.
 * - **Checked/Unchecked:** Visual state changes based on the `checked` property.
 * - **Alert:** Adds alert styling when `hasAlert` is true (e.g., for error or warning indication).
 * - **Disabled:** Prevents user interaction and dims appearance.
 *
 * ## Usage Guidelines
 * Use `obc-icon-check-button` for toggling settings, filters, or actions where a visual icon cue is helpful. Ideal for toolbars, filter chips, or quick-access toggles. Avoid using for mutually exclusive choices—use radio buttons or segmented controls for those scenarios.
 *
 * - Use the `checked` property to control the toggle state programmatically.
 * - Use `disabled` to prevent interaction when needed.
 * - Use `hasAlert` to visually highlight the button for urgent or attention-required states.
 * - For accessibility, ensure the icon meaning is clear and provide a label when possible.
 *
 * **TODO(designer):** Clarify if there are recommended icons or color conventions for alert state, and if there are best practices for label length.
 *
 * ## Slots
 * | Slot Name | Renders When... | Purpose |
 * |-----------|----------------|---------|
 * | icon      | Always         | Main icon representing the toggle action or state. |
 *
 * ## Events
 * - `icon-check-button-click` – Fired when the button is clicked and the checked state changes. Event detail: `{checked: boolean}`.
 *
 * ## Example
 * ```
 * <obc-icon-check-button checked hasLabel label="Settings">
 *   <obi-placeholder slot="icon"></obi-placeholder>
 * </obc-icon-check-button>
 * ```
 *
 * @slot icon - Main icon representing the toggle action or state.
 * @fires icon-check-button-click {CustomEvent<{checked: boolean}>} Fired when the button is clicked and the checked state changes.
 */
@customElement('obc-icon-check-button')
export class ObcIconCheckButton extends LitElement {
  /**
   * Whether the button is currently checked (selected).
   *
   * When true, the button displays its checked styling. Toggling this property updates the visual state.
   */
  @property({type: Boolean, reflect: true}) checked = false;

  /**
   * If true, prevents interaction and shows disabled styling.
   *
   * When disabled, the button cannot be toggled and appears dimmed.
   */
  @property({type: Boolean, reflect: true}) disabled = false;

  /**
   * If true, displays the label text below the icon.
   *
   * When false, only the icon is shown (icon-only mode).
   */
  @property({type: Boolean}) hasLabel = false;

  /**
   * Text to display below the icon (when `hasLabel` is true).
   *
   * Used to describe the toggle action or state for clarity and accessibility.
   */
  @property({type: String}) label = '';

  /**
   * If true, adds alert styling to the button.
   *
   * Use to visually indicate an alert, warning, or attention-required state.
   */
  @property({type: Boolean}) hasAlert = false;

  private handleClick() {
    if (this.disabled) {
      return;
    }

    this.checked = !this.checked;

    this.dispatchEvent(
      new CustomEvent('icon-check-button-click', {
        detail: {
          checked: this.checked,
        },
        bubbles: true,
        composed: true,
      })
    );
  }

  override render() {
    return html`
      <button
        class=${classMap({
          wrapper: true,
          'state-checked': this.checked,
          'state-unchecked': !this.checked,
          disabled: this.disabled,
          'has-alert': this.hasAlert,
        })}
        @click=${this.handleClick}
        ?disabled=${this.disabled}
        aria-pressed=${this.checked ? 'true' : 'false'}
        aria-disabled=${this.disabled ? 'true' : 'false'}
      >
        <div class="visible-wrapper">
          <div class="icon">
            <slot name="icon"></slot>
          </div>
        </div>
        ${this.hasLabel
          ? html`<div class="label-container">
              <div class="label">${this.label}</div>
            </div>`
          : ''}
      </button>
    `;
  }

  static override styles = unsafeCSS(componentStyles);
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-icon-check-button': ObcIconCheckButton;
  }
}
