import {LitElement, html, unsafeCSS, nothing} from 'lit';
import {property} from 'lit/decorators.js';
import {customElement} from '../../decorator.js';
import componentStyle from './notification-message-item.css?inline';
import '../topbar-message-item/topbar-message-item.js';
import {ObcTopbarMessageItemAction} from '../topbar-message-item/topbar-message-item.js';
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
 *
 * ## Features
 *
 * - **Pre-configured for notifications**: Always uses the notification-fill icon
 * - **Simplified action types**: Maps to the underlying topbar-message-item actions
 * - **Custom styling**: Applies notification-specific visual adjustments
 * - **All topbar-message-item features**: Inherits large layout, empty state, etc.
 *
 * ## Example
 *
 * ```html
 * <obc-notification-message-item
 *   title="New message received"
 *   description="You have a new message from John Doe"
 *   time="09:12:46"
 *   actionType="button"
 *   actionLabel="View"
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
   * The timestamp to display
   */
  @property({type: String}) time = '';

  /**
   * The type of action to show: 'button', 'icon', 'none'
   * - 'button': Shows a text button with actionLabel
   * - 'icon': Shows a close icon button
   * - 'none': No action shown
   *
   * Default: 'none'
   */
  @property({type: String}) actionType: 'button' | 'icon' | 'none' = 'none';

  /**
   * The label for the action button (when actionType is 'button')
   *
   * Default: 'View'
   */
  @property({type: String}) actionLabel = 'View';

  /**
   * If true, uses the large/tall layout
   *
   * Default: false
   */
  @property({type: Boolean}) large = false;

  /**
   * If true, shows the empty state
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
      default:
        return ObcTopbarMessageItemAction.None;
    }
  }

  private handleMessageClick() {
    this.dispatchEvent(
      new CustomEvent('message-click', {
        detail: {
          title: this.title,
          description: this.description,
          time: this.time,
        },
      })
    );
  }

  private handleActionClick() {
    this.dispatchEvent(
      new CustomEvent('action-click', {
        detail: {
          title: this.title,
          description: this.description,
          time: this.time,
          actionType: this.actionType,
        },
      })
    );
  }

  override render() {
    return html`
      <obc-topbar-message-item
        .action=${this.mappedAction}
        .large=${this.large}
        .empty=${this.empty}
        @message-click=${this.handleMessageClick}
        @action-click=${this.handleActionClick}
      >
        <!-- Always use notification-fill icon -->
        <obi-notification-filled slot="primary-icon"></obi-notification-filled>

        <!-- Content slots -->
        ${this.title ? html`<span slot="title">${this.title}</span>` : nothing}
        ${this.description
          ? html`<span slot="description">${this.description}</span>`
          : nothing}
        ${this.time ? html`<span slot="time">${this.time}</span>` : nothing}

        <!-- Action slots based on type -->
        ${this.actionType === 'button'
          ? html`<span slot="action-text">${this.actionLabel}</span>`
          : this.actionType === 'icon'
            ? html`<obi-close-google slot="action-icon"></obi-close-google>`
            : nothing}

        <!-- Empty state -->
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
