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
 * `<obc-notification-message-item>` – A notification item component that extends the topbar message item
 * with notification-specific styling and behavior.
 *
 * This component wraps the `obc-topbar-message-item` and provides:
 * - Default notification-fill icon
 * - Notification-specific styling
 * - Simplified API for common notification use cases
 * - Full access to all topbar-message-item features
 *
 * ## Features
 *
 * - **Pre-configured for notifications**: Always uses the notification-fill icon
 * - **Simplified action types**: Maps to the underlying topbar-message-item actions
 * - **Custom styling**: Applies notification-specific visual adjustments
 * - **All topbar-message-item features**: Inherits all layout options, timestamps, icons, etc.
 *
 * ## Example
 *
 * ```html
 * <obc-notification-message-item
 *   title="New message received"
 *   description="You have a new message from John Doe"
 *   time="09:12:46"
 *   timeSecondary="2m ago"
 *   actionType="button"
 *   actionLabel="View"
 *   hasSecondaryIcon
 *   @action-click="${this.handleActionClick}"
 * ></obc-notification-message-item>
 * ```
 *
 * @fires action-click - Fired when the action button is clicked
 * @fires message-click - Fired when the message area is clicked
 */
@customElement('obc-notification-message-item')
export class ObcNotificationMessageItem extends LitElement {
  /**
   * The notification title/heading
   */
  @property({type: String}) override title = '';

  /**
   * The notification description/body text
   */
  @property({type: String}) description = '';

  /**
   * The primary timestamp to display
   */
  @property({type: String}) time = '';

  /**
   * The secondary timestamp to display (e.g., duration, relative time)
   */
  @property({type: String}) timeSecondary = '';

  /**
   * The type of action to show: 'button', 'icon', 'icon-no-click', 'none'
   * - 'button': Shows a text button with actionLabel
   * - 'icon': Shows a close icon button (clickable)
   * - 'icon-no-click': Shows a close icon (non-clickable)
   * - 'none': No action shown
   *
   * Default: 'none'
   */
  @property({type: String}) actionType:
    | 'button'
    | 'icon'
    | 'icon-no-click'
    | 'none' = 'none';

  /**
   * The label for the action button (when actionType is 'button')
   *
   * Default: 'View'
   */
  @property({type: String}) actionLabel = 'View';

  /**
   * The display type of the notification
   * Maps to ObcTopbarMessageItemType
   */
  @property({type: String}) type:
    | 'simple'
    | 'with-button'
    | 'with-icon-button'
    | 'inactive' = 'simple';

  /**
   * The size variant of the notification
   * Maps to ObcTopbarMessageItemSize
   */
  @property({type: String}) size: 'regular' | 'tall' = 'regular';

  /**
   * Whether to show the title
   *
   * Default: true
   */
  @property({type: Boolean}) hasTitle = true;

  /**
   * Whether to show the description
   *
   * Default: true
   */
  @property({type: Boolean}) hasDescription = true;

  /**
   * Whether to show the primary timestamp
   *
   * Default: true
   */
  @property({type: Boolean}) hasTimestamp = true;

  /**
   * Whether to show the secondary timestamp
   *
   * Default: false
   */
  @property({type: Boolean}) hasTimestamp2 = false;

  /**
   * Whether to show the secondary icon overlay
   *
   * Default: false
   */
  @property({type: Boolean}) hasSecondaryIcon = false;

  /**
   * If true, uses the large/tall layout (deprecated - use size="tall" instead)
   *
   * Default: false
   */
  @property({type: Boolean}) large = false;

  /**
   * If true, shows the empty state (deprecated - use type="inactive" instead)
   *
   * Default: false
   */
  @property({type: Boolean}) empty = false;

  /**
   * Text to show in empty state
   *
   * Default: 'No active notification'
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

  private handleMessageClick() {
    this.dispatchEvent(new CustomEvent('message-click'));
  }

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
