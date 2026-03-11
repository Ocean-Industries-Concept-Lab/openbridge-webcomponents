import {LitElement, html, unsafeCSS, nothing} from 'lit';
import {property} from 'lit/decorators.js';
import {customElement} from '../../decorator.js';
import componentStyle from './notification-message-item.css?inline';
import '../topbar-message-item/topbar-message-item.js';
import {
  ObcTopbarMessageItemType,
  ObcTopbarMessageItemSize,
} from '../topbar-message-item/topbar-message-item.js';
import '../../icons/icon-notification-filled.js';
import '../../icons/icon-close-google.js';

export enum ObcNotificationMessageItemType {
  Simple = 'simple',
  WithButton = 'with-button',
  WithIconButton = 'with-icon-button',
  Inactive = 'inactive',
}

export enum ObcNotificationMessageItemSize {
  Regular = 'regular',
  Tall = 'tall',
}

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
 *   - Supports both text and icon actions based on type.
 *   - Emits events for message and action clicks.
 * - **Empty/Inactive State:**
 *   - Can display a placeholder message when no notifications are present.
 *
 * ## Usage Guidelines
 * Use `obc-notification-message-item` to display individual notification entries in a notification panel, topbar, or similar UI area. Ideal for presenting system alerts, status updates, or actionable messages that require user attention or acknowledgment.
 *
 * - Use the `simple` type for informational messages without actions.
 * - Use `with-button` when the notification requires a text button action (e.g., "View", "Dismiss").
 * - Use `with-icon-button` when the notification requires an icon button action (e.g., close).
 * - Use the `inactive` type (or set `empty` to true) to indicate that there are no active notifications.
 * - Prefer concise titles and descriptions for readability. Truncation is handled automatically for long content.
 * - For persistent or multi-line notifications, consider using the `tall` size.
 * - Only use one primary action per notification to avoid overwhelming the user.
 *
 * ## Slots
 * | Slot Name         | Renders When...                        | Purpose                                                      |
 * |-------------------|----------------------------------------|--------------------------------------------------------------|
 * | `secondary-icon`  | `hasSecondaryIcon` is true             | Additional icon for status/priority (e.g., warning, info).   |
 *
 * ## Events
 * - `message-click` – Fired when the notification item is clicked (excluding action area).
 * - `action-click` – Fired when the action button or icon is clicked.
 *
 * ## Best Practices and Constraints
 * - Only one action (button or icon) should be used per notification based on the type.
 * - Use the `inactive` type (or `empty=true`) for empty states; avoid mixing both.
 * - The `large` and `empty` properties are deprecated; use `size="tall"` and `type="inactive"` instead.
 * - For accessibility, ensure action labels are descriptive and icons have appropriate context.
 *
 * ## Example
 * ```html
 * <obc-notification-message-item
 *   type="with-button"
 *   title="System Update"
 *   description="Your system has been updated successfully"
 *   time="10:30:15"
 *   actionLabel="View"
 * >
 *   <obi-warning-icon slot="secondary-icon"></obi-warning-icon>
 * </obc-notification-message-item>
 * ```
 *
 * @slot secondary-icon - Additional icon for status/priority (shown when `hasSecondaryIcon` is true).
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
  @property({type: String}) type: ObcNotificationMessageItemType =
    ObcNotificationMessageItemType.Simple;

  /**
   * Size variant of the notification.
   * - `regular`: Standard compact layout (default).
   * - `tall`: Expanded layout for longer content.
   */
  @property({type: String}) size: ObcNotificationMessageItemSize =
    ObcNotificationMessageItemSize.Regular;

  /**
   * Whether to show the title.
   */
  @property({type: Boolean, attribute: false}) showTitle: boolean = true;

  /**
   * Whether to show the description.
   * If false, the description slot is omitted.
   */
  @property({type: Boolean, attribute: false}) showDescription: boolean = true;

  /**
   * Whether to show the primary timestamp.
   */
  @property({type: Boolean, attribute: false}) showTimestamp: boolean = true;

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

  private get mappedType(): ObcTopbarMessageItemType {
    // Handle empty/inactive state
    if (this.empty || this.type === ObcNotificationMessageItemType.Inactive) {
      return ObcTopbarMessageItemType.Inactive;
    }

    // Use the specified type
    switch (this.type) {
      case ObcNotificationMessageItemType.WithButton:
        return ObcTopbarMessageItemType.WithButton;
      case ObcNotificationMessageItemType.WithIconButton:
        return ObcTopbarMessageItemType.WithIconButton;
      case ObcNotificationMessageItemType.Simple:
        return ObcTopbarMessageItemType.Simple;
      default:
        return ObcTopbarMessageItemType.Simple;
    }
  }

  private get mappedSize(): ObcTopbarMessageItemSize {
    // Handle deprecated 'large' property
    if (this.large) {
      return ObcTopbarMessageItemSize.Tall;
    }
    return this.size === ObcNotificationMessageItemSize.Tall
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
        .showTitle=${this.showTitle}
        .showDescription=${this.showDescription}
        .showTimestamp=${this.showTimestamp}
        .hasTimestamp2=${this.hasTimestamp2}
        .hasSecondaryIcon=${this.hasSecondaryIcon}
        @message-click=${this.handleMessageClick}
        @action-click=${this.handleActionClick}
      >
        <obi-notification-filled slot="primary-icon"></obi-notification-filled>

        ${this.hasSecondaryIcon
          ? html`<slot name="secondary-icon" slot="secondary-icon"></slot>`
          : nothing}
        ${this.title && this.showTitle
          ? html`<span slot="title">${this.title}</span>`
          : nothing}
        ${this.description && this.showDescription
          ? html`<span slot="description">${this.description}</span>`
          : nothing}
        ${this.time && this.showTimestamp
          ? html`<span slot="time">${this.time}</span>`
          : nothing}
        ${this.timeSecondary && this.hasTimestamp2
          ? html`<span slot="time-secondary">${this.timeSecondary}</span>`
          : nothing}
        ${this.type === ObcNotificationMessageItemType.WithButton
          ? html`<span slot="action-text">${this.actionLabel}</span>`
          : this.type === ObcNotificationMessageItemType.WithIconButton
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
