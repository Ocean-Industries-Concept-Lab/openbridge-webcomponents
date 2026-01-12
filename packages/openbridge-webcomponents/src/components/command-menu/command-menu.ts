import {LitElement, html, unsafeCSS, nothing} from 'lit';
import {property} from 'lit/decorators.js';
import compentStyle from './command-menu.css?inline';
import '../start-stop-switch/start-stop-switch.js';
import '../../icons/icon-command-in.js';
import {classMap} from 'lit/directives/class-map.js';
import {ObcStartStopSwitchChangeEvent} from '../start-stop-switch/start-stop-switch.js';
import {customElement} from '../../decorator.js';

export type ObcCommandMenuChangeEvent = CustomEvent<{inCommand: boolean}>;

/**
 * `<obc-command-menu>` – A toggleable command status menu for switching between "in command" and "no command" states.
 *
 * Displays the current command status, description, and (optionally) location, along with a prominent toggle control for taking or releasing command. The component is designed for scenarios where a user needs to view and change the active command state for a system or station.
 *
 * ---
 *
 * ### Features
 * - **Command State Toggle:** Switch between "in command" and "no command" states using an integrated toggle (based on `obc-start-stop-switch`).
 * - **Status Display:** Shows a customizable status label, description, and optional location for the current command.
 * - **Icon Support:** Accepts custom icons for command state via slots.
 * - **Customizable Labels:** All action and state labels for the toggle can be customized via slots.
 * - **Visual Feedback:** The component visually distinguishes between "in command" and "no command" states, including color and icon changes.
 * - **Location Support:** Optionally displays the location of the command if `hasLocation` is true.
 *
 * ---
 *
 * ### Usage Guidelines
 * Use `<obc-command-menu>` to present and manage the active command state for a system, device, or station. It is ideal when users need to clearly see the current command status and quickly toggle control. The component is suitable for dashboards, control panels, or any interface where command handover is required.
 *
 * **TODO(designer):** Confirm if there are recommended icons, color schemes, or text length limits for status/description. Clarify if there are any constraints on when to use this component versus other status/toggle components.
 *
 * ---
 *
 * ### Slots
 * | Slot Name                             | Renders When...                | Purpose                                                         |
 * |---------------------------------------|-------------------------------|-----------------------------------------------------------------|
 * | `command-icon`                        | Always                        | Main icon representing the current command state.               |
 * | `command-status`                      | Always                        | Status label (e.g., "Joystick", "NO CMD").                      |
 * | `command-description`                 | Always                        | Description of the command state (e.g., "DP", "CMD at DP").     |
 * | `command-location`                    | `hasLocation` is true         | Location label for the command (e.g., "Aft Bridge").            |
 * | `toogle-action-to-in-command-label`   | Always                        | Label for the action to take command (toggle to "in command").  |
 * | `toogle-action-to-no-command-label`   | Always                        | Label for the action to release command (toggle to "no command").|
 * | `toogle-state-in-command-label`       | Always                        | Status label when in "in command" state.                        |
 * | `toogle-state-no-command-label`       | Always                        | Status label when in "no command" state.                        |
 * | `toogle-state-in-command-icon`        | Always                        | Icon for the "in command" state (defaults to `<obi-command-in>`).|
 *
 * ---
 *
 * ### Properties and Attributes
 * - **`inCommand`** (`boolean`): Whether the menu is in the "in command" state. Controls the toggle and visual state. (Default: `false`)
 * - **`hasLocation`** (`boolean`): Whether to display the location slot. If `false`, the location is omitted. (Default: `true`)
 *
 * ---
 *
 * ### Events
 * - **`change`** – Fired when the command state is toggled. The event detail contains `{inCommand: boolean}` indicating the new state.
 *
 * ---
 *
 * ### Best Practices & Constraints
 * - Use clear, concise labels for status and actions to ensure quick recognition.
 * - Only display the location if it is relevant to the command context.
 * - Ensure that only one command menu is active for a given system at a time to avoid conflicting states.
 * - For accessibility, provide meaningful icons and text in all slots.
 * - **TODO(designer):** Specify if there are any timing, animation, or accessibility requirements for the toggle interaction.
 *
 * ---
 *
 * ### Example
 * ```html
 * <obc-command-menu .inCommand=${true}>
 *   <div slot="command-icon"><obi-joystick></obi-joystick></div>
 *   <div slot="command-status">Joystick</div>
 *   <div slot="command-description">DP</div>
 *   <div slot="command-location">Aft Bridge</div>
 *   <div slot="toogle-action-to-in-command-label">Take</div>
 *   <div slot="toogle-action-to-no-command-label">Release</div>
 *   <div slot="toogle-state-in-command-label">In CMD</div>
 *   <div slot="toogle-state-no-command-label">DP Aft Bridge</div>
 * </obc-command-menu>
 * ```
 *
 * @slot command-icon - Main icon representing the current command state.
 * @slot command-status - Status label (e.g., "Joystick", "NO CMD").
 * @slot command-description - Description of the command state.
 * @slot command-location - Location label for the command (shown if `hasLocation` is true).
 * @slot toogle-action-to-in-command-label - Label for the action to take command.
 * @slot toogle-action-to-no-command-label - Label for the action to release command.
 * @slot toogle-state-in-command-label - Status label when in "in command" state.
 * @slot toogle-state-no-command-label - Status label when in "no command" state.
 * @slot toogle-state-in-command-icon - Icon for the "in command" state (defaults to `<obi-command-in>`).
 * @fires change {CustomEvent<{inCommand: boolean}>} Fired when the command state is toggled.
 */
@customElement('obc-command-menu')
export class ObcCommandMenu extends LitElement {
  /**
   * Whether the menu is in the "in command" state.
   * Controls the toggle and visual state.
   *
   * @default false
   */
  @property({type: Boolean}) inCommand = false;

  /**
   * Whether to display the location slot.
   * If true, the location is omitted from the menu.
   */
  @property({type: Boolean}) hideLocation = false;

  override render() {
    return html`
      <div
        class=${classMap({
          card: true,
          'in-command': this.inCommand,
          'no-command': !this.inCommand,
          'has-location': !this.hideLocation,
        })}
      >
        <div class="title-container">Command</div>
        <div class="command-container">
          <div class="value-container">
            <div class="icon command">
              <slot name="command-icon"></slot>
            </div>
            <div class="value">
              <div class="status">
                <slot name="command-status"></slot>
              </div>
              <div class="description">
                <div class="command-description">
                  <slot name="command-description"></slot>
                </div>
                ${!this.hideLocation
                  ? html` <div class="divider"></div>
                      <div class="command-location">
                        <slot name="command-location"></slot>
                      </div>`
                  : nothing}
              </div>
            </div>
          </div>
          <div class="action-container">
            <obc-start-stop-switch
              @change=${this.onChange}
              .checked=${this.inCommand}
              showCheckedStateIcon
              .size=${'large'}
            >
              <div slot="to-checked-action-label">
                <slot name="toogle-action-to-in-command-label"></slot>
              </div>
              <div slot="to-unchecked-action-label">
                <slot name="toogle-action-to-no-command-label"></slot>
              </div>
              <div slot="checked-state-label">
                <slot name="toogle-state-in-command-label"></slot>
              </div>
              <div slot="checked-state-icon">
                <slot name="toogle-state-in-command-icon">
                  <obi-command-in></obi-command-in>
                </slot>
              </div>
              <div slot="unchecked-state-label">
                <slot name="toogle-state-no-command-label"></slot>
              </div>
            </obc-start-stop-switch>
          </div>
        </div>
      </div>
    `;
  }

  /**
   * Handles the toggle change event from the start-stop switch and emits a `change` event with the new command state.
   *
   * @fires change {CustomEvent<{inCommand: boolean}>} Fired when the command state is toggled.
   */
  private onChange(event: ObcStartStopSwitchChangeEvent) {
    this.dispatchEvent(
      new CustomEvent<{inCommand: boolean}>('change', {
        detail: {inCommand: event.detail.checked},
      })
    );
  }

  static override styles = unsafeCSS(compentStyle);
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-command-menu': ObcCommandMenu;
  }
}
