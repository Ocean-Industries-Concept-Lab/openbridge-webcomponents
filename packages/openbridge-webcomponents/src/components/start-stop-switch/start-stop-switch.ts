import {LitElement, html, unsafeCSS} from 'lit';
import {property, query, state} from 'lit/decorators.js';
import compentStyle from './start-stop-switch.css?inline';
import {classMap} from 'lit/directives/class-map.js';
import '../../icons/icon-arrow-right-google.js';
import {customElement} from '../../decorator.js';

export type ObcStartStopSwitchChangeEvent = CustomEvent<{checked: boolean}>;

/**
 * `<obc-start-stop-switch>` – A two-state toggle switch component for switching between "start" and "stop" (or similar) states.
 *
 * This switch provides a visually distinct, draggable toggle for binary actions such as activating/deactivating, enabling/disabling, or starting/stopping a process. It supports custom icons and labels for each state, and allows for both click and drag interactions to change state.
 *
 * Appears as a sliding button between two labeled states, with optional icons and customizable action labels for each side. The component is designed for scenarios where the distinction between the two states should be clear and visually reinforced, such as toggling between "On/Off", "Start/Stop", or "Enable/Disable".
 *
 * ### Features
 * - **Dual-state toggle:** Switches between checked (active) and unchecked (inactive) states.
 * - **Drag or click interaction:** Users can drag the button or click to toggle the state.
 * - **Customizable icons and labels:** Supports separate icons and labels for both checked and unchecked states via slots.
 * - **Action labels:** Provides slots for action labels that appear on the toggle button itself, depending on the direction of the toggle.
 * - **Configurable icon visibility:** Show or hide icons for each state using `hasCheckedStateIcon` and `hasUncheckedStateIcon` properties.
 * - **Animated transitions:** Smooth transitions for toggle movement and state changes.
 *
 * ### Usage Guidelines
 * Use `<obc-start-stop-switch>` when you need a clear, visually prominent control for toggling between two mutually exclusive states, especially when both states need to be explicitly labeled and/or iconified. Ideal for actions where the user should be aware of both the current and alternative state (e.g., "Start/Stop", "Enable/Disable", "Manual/Auto").
 *
 * Avoid using this component for generic on/off toggles where a standard switch or checkbox would suffice. This component is best suited for cases where the action and its consequences are significant and should be clearly communicated.
 *
 * **TODO(designer):** Confirm if there are recommended default icons or label lengths, and if there are any accessibility or focus guidelines specific to this component.
 *
 * ### Slots
 * | Slot Name                   | Renders When...                | Purpose                                                         |
 * |----------------------------|---------------------------------|-----------------------------------------------------------------|
 * | checked-state-icon         | Always (if `hasCheckedStateIcon`)| Icon representing the checked (active) state.                   |
 * | unchecked-state-icon       | Always (if `hasUncheckedStateIcon`)| Icon representing the unchecked (inactive) state.               |
 * | checked-state-label        | Always                          | Label for the checked (active) state.                           |
 * | unchecked-state-label      | Always                          | Label for the unchecked (inactive) state.                       |
 * | to-checked-action-label    | Always                          | Label for the action to switch to the checked state (on button).|
 * | to-unchecked-action-label  | Always                          | Label for the action to switch to the unchecked state (on button).|
 *
 * ### Properties and Attributes
 * - `checked` (boolean): Whether the switch is in the checked (active) state. Defaults to `false`.
 * - `hasCheckedStateIcon` (boolean): Controls visibility of the checked-state icon slot. Defaults to `true`.
 * - `hasUncheckedStateIcon` (boolean): Controls visibility of the unchecked-state icon slot. Defaults to `true`.
 *
 * ### Events
 * - `change` – Fired when the switch state changes, either by click or drag. Event detail: `{checked: boolean}`.
 *
 * ### Best Practices and Constraints
 * - Ensure both states are clearly labeled to avoid ambiguity.
 * - Use meaningful icons that reinforce the meaning of each state.
 * - Avoid overloading the switch with lengthy labels; keep text concise for clarity.
 * - For accessibility, ensure the labels and icons provide sufficient contrast and meaning.
 * - Only use this switch for binary, mutually exclusive actions where both states are important to communicate.
 *
 * ### Example:
 * ```
 * <obc-start-stop-switch checked>
 *   <div slot="checked-state-icon"><obi-placeholder></obi-placeholder></div>
 *   <div slot="unchecked-state-icon"><obi-placeholder></obi-placeholder></div>
 *   <div slot="checked-state-label">Active</div>
 *   <div slot="unchecked-state-label">Inactive</div>
 *   <div slot="to-checked-action-label">Start</div>
 *   <div slot="to-unchecked-action-label">Stop</div>
 * </obc-start-stop-switch>
 * ```
 *
 * @slot checked-state-icon - Icon to display when the switch is checked (active).
 * @slot unchecked-state-icon - Icon to display when the switch is unchecked (inactive).
 * @slot checked-state-label - Label for the checked (active) state.
 * @slot unchecked-state-label - Label for the unchecked (inactive) state.
 * @slot to-checked-action-label - Label for the action to switch to checked (on the button).
 * @slot to-unchecked-action-label - Label for the action to switch to unchecked (on the button).
 * @fires change {ObcStartStopSwitchChangeEvent} - Emitted when the switch is toggled.
 */
@customElement('obc-start-stop-switch')
export class ObcStartStopSwitch extends LitElement {
  /**
   * Whether the switch is currently in the checked (active) state.
   *
   * Set to `true` for the checked/active state, or `false` for unchecked/inactive.
   *
   * Defaults to `false`.
   */
  @property({type: Boolean}) checked = false;

  /**
   * Controls whether the checked-state icon slot is rendered.
   *
   * If `true`, the content of the `checked-state-icon` slot will be displayed when checked.
   *
   * Defaults to `true`.
   */
  @property({type: Boolean}) hasUncheckedStateIcon = true;

  /**
   * Controls whether the unchecked-state icon slot is rendered.
   *
   * If `true`, the content of the `unchecked-state-icon` slot will be displayed when unchecked.
   *
   * Defaults to `true`.
   */
  @property({type: Boolean}) hasCheckedStateIcon = true;

  @state() private dragging = false;
  @state() private tmpChecked = false;

  private dragStartX = 0;
  private dragCurrentX = 0;
  private dragOffset = 0;
  private trackWidth = 0;
  private buttonWidth = 0;

  @query('.button')
  private buttonRef?: HTMLElement;

  @query('.button-track')
  private trackRef?: HTMLElement;

  private onDragStart = (e: MouseEvent | TouchEvent) => {
    this.dragging = true;
    if (e instanceof MouseEvent) {
      this.dragStartX = e.clientX;
    } else {
      this.dragStartX = e.touches[0].clientX;
    }
    this.dragCurrentX = this.dragStartX;
    this.trackWidth = this.trackRef?.offsetWidth || 0;
    this.buttonWidth = this.buttonRef?.offsetWidth || 0;
    window.addEventListener('mousemove', this.onDragMove);
    window.addEventListener('touchmove', this.onDragMove, {passive: false});
    window.addEventListener('mouseup', this.onDragEnd);
    window.addEventListener('touchend', this.onDragEnd);
  };

  private onDragMove = (e: MouseEvent | TouchEvent) => {
    if (!this.dragging) return;
    let clientX = 0;
    if (e instanceof MouseEvent) {
      clientX = e.clientX;
    } else {
      clientX = e.touches[0].clientX;
      e.preventDefault();
    }
    this.dragCurrentX = clientX;
    this.dragOffset = this.dragCurrentX - this.dragStartX;
    const percent = Math.abs(
      this.dragOffset / (this.trackWidth - this.buttonWidth)
    );
    this.tmpChecked = this.checked ? percent < 0.5 : percent > 0.5;
    this.requestUpdate();
  };

  private onDragEnd = () => {
    if (!this.dragging) return;
    this.dragging = false;
    // Calculate drag percentage
    const maxOffset = this.trackWidth - this.buttonWidth;
    const startPosition = this.checked ? maxOffset : 0;
    const newPosition = startPosition + this.dragOffset;
    const percent = newPosition / maxOffset;
    if (!this.checked && percent > 0.9) {
      this.checked = true;
      this.dispatchEvent(
        new CustomEvent('change', {detail: {checked: this.checked}})
      );
    } else if (this.checked && percent < 0.1) {
      this.checked = false;
      this.dispatchEvent(
        new CustomEvent('change', {detail: {checked: this.checked}})
      );
    }
    this.tmpChecked = this.checked;
    this.dragOffset = 0;
    window.removeEventListener('mousemove', this.onDragMove);
    window.removeEventListener('touchmove', this.onDragMove);
    window.removeEventListener('mouseup', this.onDragEnd);
    window.removeEventListener('touchend', this.onDragEnd);
    this.requestUpdate();
  };

  private getButtonStyle() {
    if (!this.dragging) return '';

    // Calculate the button's left position
    const maxOffset = this.trackWidth - this.buttonWidth;
    let left = this.checked ? maxOffset : 0;
    left += this.dragOffset;
    left = Math.max(0, Math.min(left, maxOffset));

    return `left: ${left}px; right: auto;`;
  }

  override firstUpdated() {
    // Update track and button width on resize
    const resizeObserver = new ResizeObserver(() => {
      this.trackWidth = this.trackRef?.offsetWidth || 0;
      this.buttonWidth = this.buttonRef?.offsetWidth || 0;
    });
    if (this.trackRef) resizeObserver.observe(this.trackRef);
    if (this.buttonRef) resizeObserver.observe(this.buttonRef);
  }

  override render() {
    return html`
      <div
        class=${classMap({
          wrapper: true,
          checked: this.checked,
          unchecked: !this.checked,
          dragging: this.dragging,
          'tmp-checked': this.tmpChecked && this.dragging,
          'tmp-unchecked': !this.tmpChecked && this.dragging,
        })}
        aria-checked=${this.checked}
        role="switch"
      >
        <div class="button-track">
          <button
            class="button"
            style=${this.getButtonStyle()}
            @mousedown=${this.onDragStart}
            @touchstart=${this.onDragStart}
          >
            <obi-arrow-right-google
              class="button-icon"
            ></obi-arrow-right-google>
            <div class="button-label">
              <slot
                name=${this.checked
                  ? 'to-unchecked-action-label'
                  : 'to-checked-action-label'}
              ></slot>
            </div>
          </button>
          <div class="button-track-checked"></div>
          <div class="checked state">
            ${this.hasCheckedStateIcon
              ? html`<slot name="checked-state-icon"></slot>`
              : ''}
            <div class="state-label">
              <slot name="checked-state-label"></slot>
            </div>
          </div>
          <div class="unchecked state">
            ${this.hasUncheckedStateIcon
              ? html`<slot name="unchecked-state-icon"></slot>`
              : ''}
            <div class="state-label">
              <slot name="unchecked-state-label"></slot>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  static override styles = unsafeCSS(compentStyle);
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-start-stop-switch': ObcStartStopSwitch;
  }
}
