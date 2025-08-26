import {LitElement, html, unsafeCSS} from 'lit';
import {property} from 'lit/decorators.js';
import {customElement} from '../../decorator.js';
import componentStyle from './advice-floating-item.css?inline';

import '../floating-item/floating-item.js';
import '../../icons/icon-notification-advice-active.js';
import {
  ObcFloatingItemType,
  ObcFloatingItemDirection,
  ObcFloatingItemLineType,
} from '../floating-item/floating-item.js';

/**
 * `<obc-advice-floating-item>` – A floating advice notification component for transient, context-sensitive messages.
 *
 * Displays a brief advice or informational message that overlays the interface, typically used to provide non-blocking feedback, guidance, or status updates. This component is a specialized variant of a floating message (toast/snackbar) with a visual emphasis on advice or recommendations.
 *
 * Appears temporarily above the UI and can include icons, timestamps, actions, and multi-line content. Designed for scenarios where users need timely, non-intrusive advice or suggestions without interrupting their workflow.
 *
 * ## Features
 * - **Advice Notification Style:** Uses a distinct advice icon and color to visually differentiate advice messages from other notifications.
 * - **Variants (type):**
 *   - `regular` (default): Standard advice message with a single advice icon.
 *   - `application`: Enhanced advice message supporting an additional icon (e.g., to indicate application context or source).
 * - **Layout Directions:** Supports `horizontal` (side-by-side) or `vertical` (stacked) layouts to adapt to available space.
 * - **Line Type:** Choose between `singleLine` (compact, one-line message) or `multiLine` (for longer advice or descriptions).
 * - **Timestamp and Day Labels:** Optionally display a time and/or day label for context.
 * - **Action Buttons:** Supports up to two action buttons (primary and secondary) for user response or quick actions.
 * - **Slot-based Content:** Flexible content insertion for icons, title, description, time, day, and actions.
 * - **Automatic Icon Handling:** Advice icon is rendered automatically; developers can override or supplement with their own icons via slots.
 *
 * ## Usage Guidelines
 * Use `<obc-advice-floating-item>` to present brief, non-blocking advice, tips, or contextual guidance to users. Ideal for situations where you want to draw attention to a recommended action, best practice, or informational update without requiring immediate user intervention.
 *
 * - Suitable for transient feedback, inline help, or system-generated suggestions.
 * - Not intended for critical alerts or persistent warnings—use a dialog or alert banner for those cases.
 * - For advice that requires user action, enable one or both action buttons.
 * - If the advice is related to a specific time or event, use the timestamp and day labels for clarity.
 *
 * **TODO(designer):** Confirm if there are recommended durations for auto-dismiss, or if all advice messages require manual dismissal.
 *
 * ## Slots
 * | Slot Name      | Renders When...                      | Purpose                                                      |
 * | -------------- | ------------------------------------ | ------------------------------------------------------------ |
 * | primary-icon   | Always (unless overridden)           | Main advice icon (default: `<obi-notification-advice-active>`) or custom icon. |
 * | secondary-icon | Only when `type="application"`       | Additional icon for application-type advice messages.         |
 * | title          | Always                               | Title or heading of the advice message.                      |
 * | description    | Always                               | Detailed advice or message text.                             |
 * | time           | If `hasTimestamp` is true            | Timestamp label (e.g., "09:12:46").                          |
 * | day            | If `hasTimestamp` and `hasDay`       | Day label (e.g., "Yesterday").                               |
 * | action         | If `action` is true                  | Primary action button label/content.                         |
 * | action2        | If `action2` is true                 | Secondary action button label/content.                       |
 *
 * ## Events
 * - `action-click` – Fired when the primary action button is clicked.
 * - `action2-click` – Fired when the secondary action button is clicked.
 * - `dismiss-click` – Fired when the advice message is dismissed (e.g., close icon or auto-hide).
 *
 * ## Best Practices
 * - Use concise, actionable advice text to maximize clarity.
 * - Limit to one or two actions to avoid overwhelming the user.
 * - For longer advice, use the `multiLine` line type to improve readability.
 * - Only use the secondary action for supplementary or "undo" actions.
 * - Ensure advice messages do not overlap or stack excessively; only one should be visible at a time if possible.
 *
 * ## Example:
 * ```html
 * <obc-advice-floating-item type="application" direction="vertical" hasTimestamp action>
 *   <div slot="primary-icon"><obi-placeholder></obi-placeholder></div>
 *   <span slot="title">Advice title</span>
 *   <span slot="description">An advice message with meaningful content for the user.</span>
 *   <span slot="time">09:12:46</span>
 *   <span slot="action">Close</span>
 * </obc-advice-floating-item>
 * ```
 *
 * @slot primary-icon - Main advice icon (default: `<obi-notification-advice-active>`), or custom icon.
 * @slot secondary-icon - Additional icon for application-type advice messages.
 * @slot title - Title or heading of the advice message.
 * @slot description - Detailed advice or message text.
 * @slot time - Timestamp label (e.g., "09:12:46").
 * @slot day - Day label (e.g., "Yesterday").
 * @slot action - Primary action button label/content.
 * @slot action2 - Secondary action button label/content.
 * @fires action-click {CustomEvent<void>} When the primary action button is clicked.
 * @fires action2-click {CustomEvent<void>} When the secondary action button is clicked.
 * @fires dismiss-click {CustomEvent<void>} When the advice message is dismissed.
 */
@customElement('obc-advice-floating-item')
export class ObcAdviceFloatingItem extends LitElement {
  /**
   * Defines the visual and behavioral variant of the advice message.
   * - `regular`: Standard advice message with a single advice icon.
   * - `application`: Application-type advice message with an additional icon.
   * Default: `regular`.
   */
  @property({type: String}) type = ObcFloatingItemType.Regular;

  /**
   * Sets the layout direction of the advice message.
   * - `horizontal`: Content and icons are arranged side-by-side.
   * - `vertical`: Content and icons are stacked vertically.
   * Default: `horizontal`.
   */
  @property({type: String}) direction = ObcFloatingItemDirection.horizontal;

  /**
   * If true, displays a timestamp label (e.g., "09:12:46") in the advice message.
   * Default: false.
   */
  @property({type: Boolean}) hasTimestamp = false;

  /**
   * If true (and `hasTimestamp` is also true), displays a day label (e.g., "Yesterday") in addition to the timestamp.
   * Default: false.
   */
  @property({type: Boolean}) hasDay = false;

  /**
   * If true, renders a primary action button in the advice message.
   * Default: false.
   */
  @property({type: Boolean}) action = false;

  /**
   * If true, renders a secondary action button in the advice message.
   * Note: The secondary action is only shown if the primary action (`action`) is also enabled.
   * Default: false.
   */
  @property({type: Boolean}) action2 = false;

  /**
   * Sets the content line type for the advice message.
   * - `singleLine`: Compact, one-line message.
   * - `multiLine`: Allows for longer, multi-line advice text.
   * Default: `singleLine`.
   */
  @property({type: String}) lineType = ObcFloatingItemLineType.singleLine;

  protected override render() {
    const isApplication = this.type === ObcFloatingItemType.Application;

    return html`
      <obc-floating-item
        .type=${this.type}
        .direction=${this.direction}
        .hasTimestamp=${this.hasTimestamp}
        .hasDay=${this.hasDay}
        .action=${this.action}
        .action2=${this.action2}
        .lineType=${this.lineType}
        @action-click=${(e: CustomEvent) =>
          this.dispatchEvent(
            new CustomEvent('action-click', {detail: e.detail})
          )}
        @action2-click=${(e: CustomEvent) =>
          this.dispatchEvent(
            new CustomEvent('action2-click', {detail: e.detail})
          )}
        @dismiss-click=${(e: CustomEvent) =>
          this.dispatchEvent(
            new CustomEvent('dismiss-click', {detail: e.detail})
          )}
      >
        ${isApplication
          ? html`
              <slot name="primary-icon" slot="primary-icon"></slot>
              <obi-notification-advice-active
                slot="secondary-icon"
                style="color: var(--instrument-starboard-primary-color)"
              ></obi-notification-advice-active>
            `
          : html`
              <obi-notification-advice-active
                slot="primary-icon"
                style="color: var(--instrument-starboard-primary-color)"
              ></obi-notification-advice-active>
            `}
        <slot name="title" slot="title"></slot>
        <slot name="description" slot="description"></slot>
        <slot name="time" slot="time"></slot>
        <slot name="day" slot="day"></slot>
        <slot name="action" slot="action"></slot>
        <slot name="action2" slot="action2"></slot>
      </obc-floating-item>
    `;
  }

  static override styles = unsafeCSS(componentStyle);
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-advice-floating-item': ObcAdviceFloatingItem;
  }
}
