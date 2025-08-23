import {LitElement, html, unsafeCSS} from 'lit';
import {property} from 'lit/decorators.js';
import componentStyle from './notification-badge-button.css?inline';
import {classMap} from 'lit/directives/class-map.js';
import {customElement} from '../../decorator.js';

/**
 * `<obc-notification-badge-button>` – A compact action button for notification-related commands or acknowledgments.
 *
 * This component provides a visually distinct button, often used for quick actions such as acknowledging alerts, muting notifications, or similar context-specific responses. It supports both text and icon content, and can be styled to fit seamlessly into notification bars, toolbars, or grouped button sets.
 *
 * ### Features
 * - **Icon or Text Content:** Supports either a text label (e.g., "ACK") or an icon via the default slot.
 * - **Visual Variants:**
 *   - **icon:** Applies icon-specific styling for icon-only buttons.
 *   - **openRight / openLeft:** Removes the border on the right or left, allowing the button to visually connect with adjacent elements (e.g., for grouped buttons).
 *   - **cornerLeft / cornerRight:** Rounds the left or right corners for placement at the start or end of a button group.
 *   - **indent:** Applies an indented background style for emphasis or grouping.
 * - **Disabled State:** Prevents interaction and applies a muted visual style.
 * - **Customizable Width:** Fixed width (64px) ensures consistency in toolbars or notification rows.
 *
 * ### Usage Guidelines
 * Use `obc-notification-badge-button` for actions directly related to notifications, alerts, or quick status changes. It is ideal for scenarios where space is limited and a compact, easily recognizable action is needed—such as in notification trays, alert banners, or grouped with other quick-action buttons.
 *
 * - For icon-only actions (like mute), set the `icon` property and supply an icon in the slot.
 * - For text actions (like "ACK"), provide the label as slot content.
 * - Use `openRight`/`openLeft` and `cornerLeft`/`cornerRight` to visually group multiple buttons or align them to the edges of a container.
 * - Use the `disabled` property to indicate unavailable actions.
 *
 * **TODO(designer):** Clarify if there are recommended icon choices or color guidelines for specific notification types, and if there are accessibility requirements (e.g., minimum contrast, focus ring).
 *
 * ### Slots
 *
 * | Slot Name | Renders When... | Purpose |
 * |-----------|-----------------|---------|
 * | (default) | Always          | Main content of the button (icon or text label). |
 *
 * ### Best Practices
 * - Keep button content concise—use a single icon or a short label.
 * - When grouping multiple notification buttons, use the `openRight`/`openLeft` and `cornerLeft`/`cornerRight` properties for seamless visual integration.
 * - For accessibility, ensure that icon-only buttons have an appropriate `aria-label` or accessible text.
 *
 * ### Example:
 * ```
 * <obc-notification-badge-button icon>
 *   <obi-sound-muted-fill></obi-sound-muted-fill>
 * </obc-notification-badge-button>
 *
 * <obc-notification-badge-button>ACK</obc-notification-badge-button>
 * ```
 *
 * @slot - Main content slot for icon or text label.
 */
@customElement('obc-notification-badge-button')
export class ObcNotificationBadgeButton extends LitElement {
  /**
   * Removes the right border for seamless grouping with adjacent buttons.
   * Use when this button is not the last in a horizontal group.
   */
  @property({type: Boolean}) openRight = false;

  /**
   * Removes the left border for seamless grouping with adjacent buttons.
   * Use when this button is not the first in a horizontal group.
   */
  @property({type: Boolean}) openLeft = false;

  /**
   * Applies rounded corners to the left side of the button.
   * Use for the first button in a group or when aligning to a container's left edge.
   */
  @property({type: Boolean}) cornerLeft = false;

  /**
   * Applies rounded corners to the right side of the button.
   * Use for the last button in a group or when aligning to a container's right edge.
   */
  @property({type: Boolean}) cornerRight = false;

  /**
   * Applies icon-specific styling for icon-only buttons.
   * When true, supply an icon in the default slot.
   */
  @property({type: Boolean}) icon = false;

  /**
   * Disables the button, preventing user interaction and applying a muted style.
   */
  @property({type: Boolean}) disabled = false;

  /**
   * Applies an indented background style for emphasis or grouping.
   * Useful for visually separating the button from others or indicating a secondary action.
   */
  @property({type: Boolean}) indent = false;

  override render() {
    return html`
      <button
        class=${classMap({
          wrapper: true,
          'open-right': this.openRight,
          'open-left': this.openLeft,
          'corner-left': this.cornerLeft,
          'corner-right': this.cornerRight,
          icon: this.icon,
          indent: this.indent,
        })}
        ?disabled=${this.disabled}
      >
        <div class="visible-wrapper">
          <slot></slot>
        </div>
      </button>
    `;
  }

  static override styles = unsafeCSS(componentStyle);
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-notification-badge-button': ObcNotificationBadgeButton;
  }
}
