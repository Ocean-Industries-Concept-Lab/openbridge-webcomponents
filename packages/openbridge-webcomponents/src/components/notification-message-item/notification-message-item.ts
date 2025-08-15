import {LitElement, html, unsafeCSS, nothing} from 'lit';
import {property} from 'lit/decorators.js';
import {customElement} from '../../decorator.js';
import componentStyle from './notification-message-item.css?inline';
import '../topbar-message-item/topbar-message-item.js';
import {
  ObcTopbarMessageItemAction,
  ObcTopbarMessageItemType,
  ObcTopbarMessageItemSize,
} from '../topbar-message-item/topbar-message-item.js';
import '../../icons/icon-notification-filled.js';
import '../../icons/icon-close-google.js';

/**
 * `<obc-notification-message-item>` – A notification message component for displaying alerts, messages, and status updates in topbars or notification panels.
 *
 * This component presents concise notification items with optional actions, timestamps, and icons. It is designed for use in notification trays, panels, or topbars, providing a consistent and scannable format for system or application messages.
 *
 * Appears as a single notification row, supporting primary and secondary icons, title, description, timestamps, and action buttons or icons. Can also display an empty/inactive state when no notifications are present.
 *
 * ## Features
 * - **Variants (type):**
 *   - `simple` (default): Basic notification with icon, title, description, and timestamp.
 *   - `with-button`: Includes a text action button (e.g., "View", "Acknowledge").
 *   - `with-icon-button`: Shows an icon action (e.g., close or dismiss).
 *   - `inactive`: Displays an empty or inactive state message (e.g., "No active notifications").
 * - **Action Types (actionType):**
 *   - `none` (default): No action element.
 *   - `button`: Shows a text button (label set via `actionLabel`).
 *   - `icon`: Shows an interactive icon button (e.g., close).
 *   - `icon-no-click`: Shows a non-interactive icon (for status or decoration).
 * - **Size Options (size):**
 *   - `regular` (default): Standard compact layout.
 *   - `tall`: Expanded layout for longer content or increased prominence.
 * - **Content Controls:**
 *   - Show/hide title, description, primary timestamp, secondary timestamp, and secondary icon via boolean properties.
 *   - Customizable empty state text.
 * - **Icon Support:**
 *   - Always displays a primary notification icon.
 *   - Optional secondary icon slot for additional status or priority indicators.
 * - **Action and Interaction:**
 *   - Supports both text and icon actions.
 *   - Emits events for message and action clicks.
 * - **Empty/Inactive State:**
 *   - Can display a placeholder message when no notifications are present.
 *
 * ## Usage Guidelines
 * Use `obc-notification-message-item` to display individual notification entries in a notification panel, topbar, or similar UI area. Ideal for presenting system alerts, status updates, or actionable messages that require user attention or acknowledgment.
 *
 * - Use the `simple` type for informational messages without actions.
 * - Use `with-button` or `with-icon-button` when the notification requires a user action (e.g., "View", "Dismiss").
 * - Use the `inactive` type (or set `empty` to true) to indicate that there are no active notifications.
 * - Prefer concise titles and descriptions for readability. Truncation is handled automatically for long content.
 * - For persistent or multi-line notifications, consider using the `tall` size.
 * - Only use one primary action per notification to avoid overwhelming the user.
 *
 * **TODO(designer):** Confirm if there are recommended character limits for title/description, and if there are specific icon/color conventions for different notification types.
 *
 * ## Slots
 * | Slot Name         | Renders When...                        | Purpose                                                      |
 * |-------------------|----------------------------------------|--------------------------------------------------------------|
 * | `primary-icon`    | Always                                 | Main icon representing the notification category.            |
 * | `secondary-icon`  | `hasSecondaryIcon` is true             | Additional icon for status/priority (e.g., warning, info).   |
 * | `title`           | `hasTitle` is true and `title` is set  | Title or heading of the notification.                        |
 * | `description`     | `hasDescription` is true and set       | Detailed message text.                                       |
 * | `time`            | `hasTimestamp` is true and set         | Primary timestamp label (e.g., "09:12:46").                  |
 * | `time-secondary`  | `hasTimestamp2` is true and set        | Secondary timestamp (e.g., "2m ago", relative time).         |
 * | `action-text`     | `actionType="button"`                  | Label for the primary action button.                         |
 * | `action-icon`     | `actionType="icon"` or `"icon-no-click"` | Icon for the action (e.g., close/dismiss).                   |
 * | `empty`           | `type="inactive"` or `empty` is true   | Placeholder text for empty/inactive state.                   |
 *
 * ## Events
 * - `message-click` – Fired when the notification item is clicked (excluding action area).
 * - `action-click` – Fired when the action button or icon is clicked.
 *
 * ## Best Practices and Constraints
 * - Only one primary action (button or icon) should be used per notification.
 * - Use the `inactive` type (or `empty=true`) for empty states; avoid mixing both.
 * - The `large` and `empty` properties are deprecated; use `size="tall"` and `type="inactive"` instead.
 * - For accessibility, ensure action labels are descriptive and icons have appropriate context.
 *
 * ## Example
 * ```html
 * <obc-notification-message-item
 *   title="System Update"
 *   description="Your system has been updated successfully"
 *   time="10:30:15"
 *   actionType="button"
 *   actionLabel="View"
 * >
 * </obc-notification-message-item>
 * ```
 *
 * @slot primary-icon - Main icon representing the notification category.
 * @slot secondary-icon - Additional icon for status/priority (shown when `hasSecondaryIcon` is true).
 * @slot title - Title or heading of the notification (shown when `hasTitle` is true).
 * @slot description - Detailed message text (shown when `hasDescription` is true).
 * @slot time - Primary timestamp label (shown when `hasTimestamp` is true).
 * @slot time-secondary - Secondary timestamp (shown when `hasTimestamp2` is true).
 * @slot action-text - Label for the primary action button (shown when `actionType="button"`).
 * @slot action-icon - Icon for the action (shown when `actionType="icon"` or `"icon-no-click"`).
 * @slot empty - Placeholder text for empty/inactive state (shown when `type="inactive"` or `empty` is true).
 * @fires message-click {CustomEvent<void>} Fired when the notification item is clicked.
 * @fires action-click {CustomEvent<void>} Fired when the action button or icon is clicked.
 */
@customElement('obc-notification-message-item')
export class ObcNotificationMessageItem extends LitElement {
  /**
   * Title or heading for the notification.
   * Shown in the title slot if `hasTitle` is true.
   */
  @property({type: String}) override title = '';

  /**
   * Detailed message text for the notification.
   * Shown in the description slot if `hasDescription` is true.
   */
  @property({type: String}) description = '';

  /**
   * Primary timestamp to display (e.g., "09:12:46").
   * Shown in the time slot if `hasTimestamp` is true.
   */
  @property({type: String}) time = '';

  /**
   * Secondary timestamp (e.g., relative time like "2m ago").
   * Shown in the time-secondary slot if `hasTimestamp2` is true.
   */
  @property({type: String}) timeSecondary = '';

  /**
   * Type of action to display for the notification.
   * - `none`: No action.
   * - `button`: Shows a text button (label set via `actionLabel`).
   * - `icon`: Shows an interactive icon button.
   * - `icon-no-click`: Shows a non-interactive icon.
   */
  @property({type: String}) actionType:
    | 'button'
    | 'icon'
    | 'icon-no-click'
    | 'none' = 'none';

  /**
   * Label for the action button (used when `actionType` is "button").
   */
  @property({type: String}) actionLabel = 'View';

  /**
   * Display type of the notification.
   * - `simple`: Basic notification (default).
   * - `with-button`: Includes a text action button.
   * - `with-icon-button`: Includes an icon action.
   * - `inactive`: Shows empty/inactive state.
   */
  @property({type: String}) type:
    | 'simple'
    | 'with-button'
    | 'with-icon-button'
    | 'inactive' = 'simple';

  /**
   * Size variant of the notification.
   * - `regular`: Standard compact layout (default).
   * - `tall`: Expanded layout for longer content.
   */
  @property({type: String}) size: 'regular' | 'tall' = 'regular';

  /**
   * Whether to show the title.
   * If false, the title slot is omitted.
   */
  @property({type: Boolean}) hasTitle = true;

  /**
   * Whether to show the description.
   * If false, the description slot is omitted.
   */
  @property({type: Boolean}) hasDescription = true;

  /**
   * Whether to show the primary timestamp.
   * If false, the time slot is omitted.
   */
  @property({type: Boolean}) hasTimestamp = true;

  /**
   * Whether to show the secondary timestamp.
   * If false, the time-secondary slot is omitted.
   */
  @property({type: Boolean}) hasTimestamp2 = false;

  /**
   * Whether to show the secondary icon overlay.
   * If true, renders the `secondary-icon` slot.
   */
  @property({type: Boolean}) hasSecondaryIcon = false;

  /**
   * **DEPRECATED** – Use `size="tall"` instead.
   * If true, uses the tall layout.
   */
  @property({type: Boolean}) large = false;

  /**
   * **DEPRECATED** – Use `type="inactive"` instead.
   * If true, shows the empty/inactive state.
   */
  @property({type: Boolean}) empty = false;

  /**
   * Text to show in the empty/inactive state.
   * Used in the `empty` slot when `type="inactive"` or `empty` is true.
   */
  @property({type: String}) emptyText = 'No active notification';

  private get mappedAction(): ObcTopbarMessageItemAction {
    switch (this.actionType) {
      case 'button':
        return ObcTopbarMessageItemAction.TextButton;
      case 'icon':
        return ObcTopbarMessageItemAction.IconButton;
      case 'icon-no-click':
        return ObcTopbarMessageItemAction.IconNoClick;
      default:
        return ObcTopbarMessageItemAction.None;
    }
  }

  private get mappedType(): ObcTopbarMessageItemType {
    if (this.empty || this.type === 'inactive') {
      return ObcTopbarMessageItemType.Inactive;
    }

    if (this.actionType !== 'none') {
      switch (this.actionType) {
        case 'button':
          return ObcTopbarMessageItemType.WithButton;
        case 'icon':
        case 'icon-no-click':
          return ObcTopbarMessageItemType.WithIconButton;
        default:
          return ObcTopbarMessageItemType.Simple;
      }
    }

    // Otherwise use the specified type
    switch (this.type) {
      case 'with-button':
        return ObcTopbarMessageItemType.WithButton;
      case 'with-icon-button':
        return ObcTopbarMessageItemType.WithIconButton;
      case 'simple':
        return ObcTopbarMessageItemType.Simple;
      default:
        return ObcTopbarMessageItemType.Simple;
    }
  }

  private get mappedSize(): ObcTopbarMessageItemSize {
    if (this.large) {
      return ObcTopbarMessageItemSize.Tall;
    }
    return this.size === 'tall'
      ? ObcTopbarMessageItemSize.Tall
      : ObcTopbarMessageItemSize.Regular;
  }

  /**
   * Fired when the notification item is clicked (excluding the action area).
   * @event message-click
   */
  private handleMessageClick() {
    this.dispatchEvent(new CustomEvent('message-click'));
  }

  /**
   * Fired when the action button or icon is clicked.
   * @event action-click
   */
  private handleActionClick() {
    this.dispatchEvent(new CustomEvent('action-click'));
  }

  override render() {
    return html`
      <obc-topbar-message-item
        .type=${this.mappedType}
        .size=${this.mappedSize}
        .action=${this.mappedAction}
        .hasTitle=${this.hasTitle}
        .hasDescription=${this.hasDescription}
        .hasTimestamp=${this.hasTimestamp}
        .hasTimestamp2=${this.hasTimestamp2}
        .hasSecondaryIcon=${this.hasSecondaryIcon}
        .large=${this.large}
        .empty=${this.empty}
        @message-click=${this.handleMessageClick}
        @action-click=${this.handleActionClick}
      >
        <obi-notification-filled slot="primary-icon"></obi-notification-filled>

        ${this.hasSecondaryIcon
          ? html`<slot name="secondary-icon" slot="secondary-icon"></slot>`
          : nothing}
        ${this.title && this.hasTitle
          ? html`<span slot="title">${this.title}</span>`
          : nothing}
        ${this.description && this.hasDescription
          ? html`<span slot="description">${this.description}</span>`
          : nothing}
        ${this.time && this.hasTimestamp
          ? html`<span slot="time">${this.time}</span>`
          : nothing}
        ${this.timeSecondary && this.hasTimestamp2
          ? html`<span slot="time-secondary">${this.timeSecondary}</span>`
          : nothing}
        ${this.actionType === 'button'
          ? html`<span slot="action-text">${this.actionLabel}</span>`
          : this.actionType === 'icon' || this.actionType === 'icon-no-click'
            ? html`<obi-close-google slot="action-icon"></obi-close-google>`
            : nothing}

        <span slot="empty">${this.emptyText}</span>
      </obc-topbar-message-item>
    `;
  }

  static override styles = unsafeCSS(componentStyle);
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-notification-message-item': ObcNotificationMessageItem;
  }
}
