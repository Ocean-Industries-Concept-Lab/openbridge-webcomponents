import {LitElement, html, unsafeCSS} from 'lit';
import {property} from 'lit/decorators.js';
import {customElement} from '../../decorator.js';
import componentStyle from './notification-floating-item.css?inline';

import '../floating-item/floating-item.js';
import '../../icons/icon-notification-filled.js';
import {
  ObcFloatingItemType,
  ObcFloatingItemDirection,
  ObcFloatingItemLineType,
} from '../floating-item/floating-item.js';

/**
 * `<obc-notification-floating-item>` – A floating notification message component for transient feedback, alerts, or status updates.
 *
 * Displays a notification as an overlay above the main UI, typically used to inform users of events, actions, or system statuses without interrupting their workflow. This component is a specialized variant of a floating message (toast/snackbar) with notification-specific styling and iconography.
 *
 * ### Features
 * - **Variants (type):**
 *   - `regular` (default): Standard notification appearance for general messages.
 *   - `application`: Enhanced notification with an additional secondary icon, suitable for application-level or high-visibility messages.
 * - **Layout Direction (direction):**
 *   - `horizontal` (default): Content and actions are arranged side-by-side.
 *   - `vertical`: Content and actions are stacked for narrow spaces or longer messages.
 * - **Line Type (lineType):**
 *   - `singleLine` (default): Compact, single-line layout for brief messages.
 *   - `multiLine`: Supports longer, multi-line descriptions.
 * - **Timestamp and Day Labels:**
 *   - `hasTimestamp`: Displays a time label (e.g., "09:12:46") when enabled.
 *   - `hasDay`: Displays a day label (e.g., "Yesterday") when enabled (requires `hasTimestamp`).
 * - **Actions:**
 *   - `action`: Shows a primary action button (e.g., "Close").
 *   - `action2`: Shows a secondary action button (e.g., "Undo"). Only available if `action` is enabled.
 * - **Icon Slots:**
 *   - Customizable icons via slots, with a default notification icon provided.
 * - **Event Handling:**
 *   - Emits custom events for action and dismiss interactions.
 *
 * ### Usage Guidelines
 * Use `<obc-notification-floating-item>` for brief, transient notifications that inform users about non-critical events, confirmations, or status changes. Ideal for scenarios where feedback should be visible but not persistent, such as after completing an action or receiving a system update. Avoid using for critical or blocking alerts—use a dialog or alert banner for those cases.
 *
 * - Prefer the `application` type for notifications that require extra emphasis or represent application-wide events.
 * - Use the `multiLine` layout for longer messages to maintain readability.
 * - Only enable both actions if the secondary action is truly necessary (e.g., "Undo" alongside "Close").
 * - For accessibility and clarity, keep notification messages concise.
 * - By default, the notification does not auto-dismiss; manual dismissal or action is required.
 *   **TODO(designer):** Confirm if auto-dismissal is recommended or supported for this component.
 *
 * **Related keywords:** notification, toast, snackbar, floating message, alert, status update, transient feedback.
 *
 * ### Slots
 *
 * | Slot Name       | Renders When...               | Purpose                                                      |
 * |-----------------|------------------------------|--------------------------------------------------------------|
 * | primary-icon    | Always (all types)           | Main icon representing the notification category.            |
 * | secondary-icon  | type="application" only      | Additional icon for application-type notifications.          |
 * | title           | Always                       | Title or heading of the notification.                        |
 * | description     | Always                       | Detailed message text.                                       |
 * | time            | hasTimestamp is true         | Timestamp label (e.g., "09:12:46").                          |
 * | day             | hasTimestamp && hasDay       | Day label (e.g., "Yesterday").                               |
 * | action          | action is true               | Label/content for the primary action button.                 |
 * | action2         | action2 is true              | Label/content for the secondary action button.               |
 *
 * ### Events
 * - `action-click` – Fired when the primary action button is clicked.
 * - `action2-click` – Fired when the secondary action button is clicked.
 * - `dismiss-click` – Fired when the notification is dismissed (e.g., close icon or programmatically).
 *
 * ### Example
 * ```html
 * <obc-notification-floating-item
 *   type="regular"
 *   direction="horizontal"
 *   hasTimestamp
 *   action
 * >
 *   <obi-placeholder slot="primary-icon"></obi-placeholder>
 *   <span slot="title">Notification title</span>
 *   <span slot="description">A notification message with meaningful content for the user.</span>
 *   <span slot="time">09:12:46</span>
 *   <span slot="action">Close</span>
 * </obc-notification-floating-item>
 * ```
 *
 * @slot primary-icon - Main icon representing the notification category.
 * @slot secondary-icon - Additional icon for application-type notifications.
 * @slot title - Title or heading of the notification.
 * @slot description - Detailed message text.
 * @slot time - Timestamp label (e.g., "09:12:46").
 * @slot day - Day label (e.g., "Yesterday").
 * @slot action - Label/content for the primary action button.
 * @slot action2 - Label/content for the secondary action button.
 * @fires action-click {CustomEvent<void>} When the primary action button is clicked.
 * @fires action2-click {CustomEvent<void>} When the secondary action button is clicked.
 * @fires dismiss-click {CustomEvent<void>} When the notification is dismissed.
 */
@customElement('obc-notification-floating-item')
export class ObcNotificationFloatingItem extends LitElement {
  /**
   * Defines the notification type.
   * - `regular`: Standard notification appearance.
   * - `application`: Application-level notification with additional icon.
   * Default is `regular`.
   */
  @property({type: String}) type = ObcFloatingItemType.Regular;

  /**
   * Sets the layout direction of the notification.
   * - `horizontal`: Content and actions are arranged side-by-side.
   * - `vertical`: Content and actions are stacked.
   * Default is `horizontal`.
   */
  @property({type: String}) direction = ObcFloatingItemDirection.horizontal;

  /**
   * If true, displays a timestamp label (e.g., "09:12:46") in the notification.
   * Default is false.
   */
  @property({type: Boolean}) hasTimestamp = false;

  /**
   * If true (and `hasTimestamp` is also true), displays a day label (e.g., "Yesterday") in the notification.
   * Default is false.
   */
  @property({type: Boolean}) hasDay = false;

  /**
   * If true, displays a primary action button (e.g., "Close").
   * Default is false.
   */
  @property({type: Boolean}) action = false;

  /**
   * If true, displays a secondary action button (e.g., "Undo").
   * Only available if `action` is also true.
   * Default is false.
   */
  @property({type: Boolean}) action2 = false;

  /**
   * Sets the line type for the notification content.
   * - `singleLine`: Compact, single-line layout.
   * - `multiLine`: Supports longer, multi-line descriptions.
   * Default is `singleLine`.
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
              <obi-notification-filled
                slot="secondary-icon"
                style="color: var(--notification-enabled-background-color)"
              ></obi-notification-filled>
            `
          : html`
              <obi-notification-filled
                slot="primary-icon"
                style="color: var(--notification-enabled-background-color)"
              ></obi-notification-filled>
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
    'obc-notification-floating-item': ObcNotificationFloatingItem;
  }
}
