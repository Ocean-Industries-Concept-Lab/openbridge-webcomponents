import {LitElement, html, unsafeCSS} from 'lit';
import {property} from 'lit/decorators.js';
import compentStyle from './command-button.css?inline';
import '../../icons/icon-command-no.js';
import '../../icons/icon-command-in.js';
import '../icon-button/icon-button.js';
import {classMap} from 'lit/directives/class-map.js';
import {customElement} from '../../decorator.js';

/**
 * `<obc-command-button>` – A toggleable icon button representing command activation state.
 *
 * This component displays an icon button that visually indicates whether a command is currently active or inactive. The icon changes based on the `inCommand` property, providing immediate feedback about the command state.
 *
 * ### Features
 * - **Stateful Icon:** Shows a distinct icon for active (`inCommand = true`) and inactive (`inCommand = false`) states.
 * - **Visual Feedback:** Button styling updates to reflect the current state, aiding quick recognition.
 * - **Accessible Touch Target:** Ensures minimum touch area for usability.
 *
 * ### Usage Guidelines
 * Use `obc-command-button` to represent a command or mode that can be toggled on or off, such as activating a tool, switching a mode, or indicating a system state. The button is ideal for toolbars, command menus, or control panels where a clear visual cue for active/inactive status is important.
 *
 * **TODO(designer):** Confirm if this button is intended to be used standalone or always as part of a command menu. Should it emit a custom event on click, or is it purely visual?
 *
 * ### Example
 * ```html
 * <!-- Active command -->
 * <obc-command-button inCommand></obc-command-button>
 *
 * <!-- Inactive command -->
 * <obc-command-button></obc-command-button>
 * ```
 *
 * ### Best Practices
 * - Use only for binary command states (active/inactive).
 * - Place in a consistent location within toolbars or menus for predictable user experience.
 * - Pair with a tooltip or label if the icon meaning is not self-evident.
 *
 * @slot - (none; icon is determined by state, no external slot)
 */
@customElement('obc-command-button')
export class ObcCommandButton extends LitElement {
  /**
   * Whether the command is currently active.
   *
   * When `true`, the button displays the "in command" icon and uses active styling.
   * When `false`, the button displays the "no command" icon and uses default styling.
   *
   * Default: `false`
   */
  @property({type: Boolean}) inCommand = false;

  override render() {
    return html`
      <button
        class=${classMap({
          wrapper: true,
          'in-command': this.inCommand,
        })}
      >
        <div class="visible-wrapper" part="visible-wrapper">
          <div class="icon" part="icon">
            ${this.inCommand
              ? html`<obi-command-in></obi-command-in>`
              : html`<obi-command-no></obi-command-no>`}
          </div>
        </div>
      </button>
    `;
  }

  static override styles = unsafeCSS(compentStyle);
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-command-button': ObcCommandButton;
  }
}
