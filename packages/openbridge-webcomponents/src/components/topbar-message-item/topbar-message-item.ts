import {LitElement, html, nothing, unsafeCSS} from 'lit';
import {property} from 'lit/decorators.js';
import compentStyle from './topbar-message-item.css?inline';
import {classMap} from 'lit/directives/class-map.js';
import {customElement} from '../../decorator.js';

/**
 * Enum for action types available in `<obc-topbar-message-item>`.
 *
 * - `TextButton`: Shows a clickable text button as the action.
 * - `IconButton`: Shows a clickable icon button as the action.
 * - `IconNoClick`: Shows an icon as the action, but it is not clickable.
 * - `None`: No action is displayed.
 */
export enum ObcTopbarMessageItemAction {
  TextButton = 'text-button',
  IconButton = 'icon-button',
  IconNoClick = 'icon-no-click',
  None = 'none',
}

/**
 * `<obc-topbar-message-item>` – A compact notification/message item for top bar or notification lists.
 *
 * Displays a brief status, alert, or informational message with optional icons, timestamp, and action button. Designed for use in notification trays, top bars, or message lists where space is limited and quick recognition is important.
 *
 * Appears as a single-line or two-line item with leading icon(s), title, description, time, and optional action (button or icon). Supports both regular and large layouts, and can show an empty state when no messages are present.
 *
 * ## Features
 *
 * - **Action Variants:**
 *   - `TextButton`: Shows a clickable text label as the action (e.g., "View", "Acknowledge").
 *   - `IconButton`: Shows a clickable icon as the action (e.g., <obi-placeholder></obi-placeholder>).
 *   - `IconNoClick`: Shows an icon for status/decoration only (not clickable).
 *   - `None`: No action area is displayed.
 * - **Layout Sizes:**
 *   - Regular (default): Compact, single-row layout.
 *   - Large: Taller layout with time shown beside the title.
 * - **Icon Support:**
 *   - Primary icon always shown (e.g., status or alert symbol).
 *   - Optional secondary icon for additional context.
 * - **Content Structure:**
 *   - Title (main message), description (secondary text), and time (timestamp).
 *   - All content provided via named slots for flexibility.
 * - **Empty State:**
 *   - When `empty` is true, displays a centered empty message (e.g., "No active messages").
 * - **Action Area:**
 *   - Action can be a button (text or icon) or a static icon, depending on the `action` property.
 *   - Action button emits a custom event when clicked.
 * - **Accessibility:**
 *   - Main message area is a button for keyboard and screen reader access.
 *
 * ## Usage Guidelines
 *
 * Use `<obc-topbar-message-item>` to present brief notifications, alerts, or status updates in a top bar or notification list. Ideal for scenarios where users need to quickly scan, acknowledge, or act on messages without leaving their current context.
 *
 * - Use the `large` property for layouts where more space is available or when you want to emphasize the message.
 * - Use `empty` to indicate there are no active messages (e.g., in a cleared notification tray).
 * - Choose the appropriate `action` variant based on whether the user should interact (button/icon) or just view status (icon only).
 * - For persistent or multi-line messages, consider using a different component (e.g., alert banner or card).
 *
 * **TODO(designer):** Confirm if there are recommended maximum lengths for title/description, and if the action icon should have a default meaning.
 *
 * ## Slots
 *
 * | Slot Name        | Renders When...                  | Purpose                                                    |
 * |------------------|----------------------------------|------------------------------------------------------------|
 * | `primary-icon`   | Always (unless `empty` is true)  | Main icon representing the message type or status.         |
 * | `secondary-icon` | If `hasSecondaryIcon` is true    | Optional secondary icon for additional context.            |
 * | `title`          | Always (unless `empty` is true)  | Title or main heading of the message.                      |
 * | `description`    | Always (unless `empty` is true)  | Secondary text or message details.                         |
 * | `time`           | Always (unless `empty` is true)  | Timestamp or time label for the message.                   |
 * | `action-text`    | If `action="text-button"`        | Label for the action text button.                          |
 * | `action-icon`    | If `action="icon-button"` or `action="icon-no-click"` | Icon for the action area (button or static).               |
 * | `empty`          | If `empty` is true               | Content for the empty state (e.g., "No active messages").  |
 *
 * ## Properties
 *
 * - `large` (boolean): Enables the large/tall layout with time beside the title. Default: `false`.
 * - `empty` (boolean): Shows the empty state message instead of a notification. Default: `false`.
 * - `hasSecondaryIcon` (boolean): Displays the secondary icon slot if true. Default: `false`.
 * - `action` (enum): Controls the action area type. One of `'text-button'`, `'icon-button'`, `'icon-no-click'`, `'none'`. Default: `'none'`.
 *
 * ## Events
 *
 * - `message-click` – Fired when the main message area is clicked (e.g., to open or focus the message).
 * - `action-click` – Fired when the action button (text or icon) is clicked.
 *
 * ## Best Practices
 *
 * - Only use one action per message item to keep interactions simple.
 * - Use icons that clearly represent the message type or action.
 * - For accessibility, ensure all actionable elements have clear labels or icons.
 * - Avoid using for long or multi-paragraph messages; keep content concise.
 *
 * ## Example
 *
 * ```html
 * <obc-topbar-message-item action="text-button" hasSecondaryIcon>
 *   <obi-placeholder slot="primary-icon"></obi-placeholder>
 *   <obi-placeholder slot="secondary-icon"></obi-placeholder>
 *   <div slot="title">Message title</div>
 *   <div slot="description">Message text goes here, something informative</div>
 *   <div slot="time">09:12:46</div>
 *   <div slot="action-text">View</div>
 *   <div slot="empty">No active messages</div>
 * </obc-topbar-message-item>
 * ```
 *
 * @slot primary-icon - Main icon representing the message type or status.
 * @slot secondary-icon - Optional secondary icon for additional context (shown if `hasSecondaryIcon` is true).
 * @slot title - Title or main heading of the message.
 * @slot description - Secondary text or message details.
 * @slot time - Timestamp or time label for the message.
 * @slot action-text - Label for the action text button (shown if `action="text-button"`).
 * @slot action-icon - Icon for the action area (shown if `action="icon-button"` or `action="icon-no-click"`).
 * @slot empty - Content for the empty state (shown if `empty` is true).
 * @fires message-click - Fired when the main message area is clicked.
 * @fires action-click - Fired when the action button (text or icon) is clicked.
 */
@customElement('obc-topbar-message-item')
export class ObcTopbarMessageItem extends LitElement {
  /**
   * If true, enables the large/tall layout with time shown beside the title.
   * Use for layouts where more space is available or to emphasize the message.
   *
   * Default: `false`
   */
  @property({type: Boolean}) large = false;

  /**
   * If true, displays the empty state message instead of a notification.
   * Use to indicate there are no active messages (e.g., in a cleared notification tray).
   *
   * Default: `false`
   */
  @property({type: Boolean}) empty = false;

  /**
   * If true, displays the secondary icon slot for additional context.
   *
   * Default: `false`
   */
  @property({type: Boolean}) hasSecondaryIcon = false;

  /**
   * Controls the action area type.
   * - `'text-button'`: Shows a clickable text label as the action.
   * - `'icon-button'`: Shows a clickable icon as the action.
   * - `'icon-no-click'`: Shows a static icon (not clickable).
   * - `'none'`: No action area is displayed.
   *
   * Default: `'none'`
   */
  @property({type: String}) action = ObcTopbarMessageItemAction.None;

  private onMessageClick() {
    /**
     * Fired when the main message area is clicked (e.g., to open or focus the message).
     *
     * @event message-click
     */
    this.dispatchEvent(new CustomEvent('message-click'));
  }

  private onActionClick() {
    /**
     * Fired when the action button (text or icon) is clicked.
     *
     * @event action-click
     */
    this.dispatchEvent(new CustomEvent('action-click'));
  }

  override render() {
    return html`
      <div
        class=${classMap({
          wrapper: true,
          empty: this.empty,
          large: this.large,
          ['action-' + this.action]: true,
        })}
      >
        ${this.empty
          ? html`<div class="empty-message"><slot name="empty"></slot></div>`
          : html` <button
                class="message-item-touch"
                @click=${this.onMessageClick}
              >
                <div class="message-item">
                  <div class="icon-container">
                    <div class="icon primary">
                      <slot name="primary-icon"></slot>
                    </div>
                    ${this.hasSecondaryIcon
                      ? html`<div class="icon secondary">
                          <slot name="secondary-icon"></slot>
                        </div>`
                      : nothing}
                  </div>
                  <div class="content-container">
                    <div class="title-container">
                      <div class="title">
                        <slot name="title"></slot>
                      </div>
                      ${this.large
                        ? html`<div class="time">
                            <slot name="time"></slot>
                          </div>`
                        : nothing}
                    </div>
                    <div class="description">
                      <slot name="description"></slot>
                    </div>
                    <div class="spacer"></div>
                    ${this.large
                      ? nothing
                      : html`<div class="time"><slot name="time"></slot></div>`}
                  </div>
                </div>
              </button>
              ${this.action === ObcTopbarMessageItemAction.None
                ? nothing
                : this.action === ObcTopbarMessageItemAction.IconNoClick
                  ? html`<div class="action-wrapper">
                      <div class="action">
                        <slot name="action-icon"></slot>
                      </div>
                    </div>`
                  : html`
                      <button
                        class="action-wrapper"
                        @click=${this.onActionClick}
                      >
                        <div class="action">
                          ${this.action ===
                          ObcTopbarMessageItemAction.IconButton
                            ? html`<slot name="action-icon"></slot>`
                            : html`<slot name="action-text"></slot>`}
                        </div>
                      </button>
                    `}`}
      </div>
    `;
  }

  static override styles = unsafeCSS(compentStyle);
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-topbar-message-item': ObcTopbarMessageItem;
  }
}
