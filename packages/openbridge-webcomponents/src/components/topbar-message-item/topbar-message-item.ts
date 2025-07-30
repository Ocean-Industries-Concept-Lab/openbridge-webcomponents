import {LitElement, html, nothing, unsafeCSS} from 'lit';
import {property} from 'lit/decorators.js';
import compentStyle from './topbar-message-item.css?inline';
import {classMap} from 'lit/directives/class-map.js';
import {customElement} from '../../decorator.js';

<<<<<<< HEAD
/**
 * Enum of action types for `<obc-topbar-message-item>`.
 *
 * - `text-button`: Shows a text button as the action.
 * - `icon-button`: Shows an icon button as the action.
 * - `icon-no-click`: Shows an icon as the action, but it is not clickable.
 * - `none`: No action is shown.
 */
=======
>>>>>>> ff0a1377 (Update storybook (#293))
export enum ObcTopbarMessageItemAction {
  TextButton = 'text-button',
  IconButton = 'icon-button',
  IconNoClick = 'icon-no-click',
  None = 'none',
}

/**
<<<<<<< HEAD
 * `<obc-topbar-message-item>` – A notification message item for top bar or header areas, supporting icons, titles, descriptions, timestamps, and optional actions.
 *
 * Displays a concise message with primary and optional secondary icons, a title, description, and time. An action button or icon can be included for quick user responses. Designed for use in notification trays, top bar message lists, or alert summaries.
 *
 * ---
 *
 * ### Features
 *
 * - **Action Variants:**  
 *   - `text-button`: Shows a clickable text action button (e.g., "View", "Acknowledge").
 *   - `icon-button`: Shows a clickable icon action button (e.g., <obi-placeholder></obi-placeholder>).
 *   - `icon-no-click`: Shows an icon for status or context, not interactive.
 *   - `none`: No action area is shown.
 * - **Size Options:**  
 *   - `large`: Increases height and adjusts layout for more prominent display (e.g., for grouped or detailed messages).
 *   - Default (not large): Compact layout for standard message lists.
 * - **Empty State:**  
 *   - `empty`: Shows a placeholder message when there are no active notifications.
 * - **Icons:**  
 *   - Supports both primary and secondary icons for richer context (e.g., alert type + source).
 * - **Flexible Content:**  
 *   - Slots for title, description, and time allow for dynamic message content.
 * - **Responsive Layout:**  
 *   - Adjusts arrangement of time and content based on `large` property.
 * - **Action Area:**  
 *   - Action area adapts to the selected action type, supporting both text and icon actions, or a non-interactive icon.
 *
 * ---
 *
 * ### Usage Guidelines
 *
 * Use `<obc-topbar-message-item>` to present brief notifications, alerts, or status updates in a top bar or notification tray. Ideal for summarizing events that require user awareness or quick action, such as system alerts, incoming messages, or status changes.  
 * The component is best suited for lists of notifications where each item may be acknowledged, dismissed, or acted upon.  
 * For persistent banners or inline alerts, consider using a dedicated alert/banner component instead.
 *
 * **TODO(designer):** Confirm if there are recommended limits for title/description length, and whether the action area should always be present if `action` is not `none`.
 *
 * ---
 *
 * ### Slots
 *
 * | Slot Name        | Renders When...                        | Purpose                                               |
 * |------------------|----------------------------------------|-------------------------------------------------------|
 * | `primary-icon`   | Always (unless `empty` is true)        | Main icon representing the message type or source.     |
 * | `secondary-icon` | If `hasSecondaryIcon` is true          | Additional icon for extra context (e.g., severity).    |
 * | `title`          | Always (unless `empty` is true)        | Title or heading of the message.                       |
 * | `description`    | Always (unless `empty` is true)        | Main message text or description.                      |
 * | `time`           | Always (unless `empty` is true)        | Timestamp or time label for the message.               |
 * | `action-text`    | If `action="text-button"`              | Label for the text action button.                      |
 * | `action-icon`    | If `action="icon-button"` or `icon-no-click` | Icon for the action area (clickable or not).     |
 * | `empty`          | If `empty` is true                     | Content to display when there are no messages.         |
 *
 * ---
 *
 * ### Properties and Attributes
 *
 * - `action` (`ObcTopbarMessageItemAction`):  
 *   Determines the action area type.  
 *   - `text-button` (default): Shows a text action button.  
 *   - `icon-button`: Shows a clickable icon action.  
 *   - `icon-no-click`: Shows a non-interactive icon.  
 *   - `none`: No action area.
 * - `large` (`boolean`):  
 *   If true, increases the component's height and adjusts layout for more prominent display. Default is false.
 * - `empty` (`boolean`):  
 *   If true, displays the empty state slot instead of a message. Default is false.
 * - `hasSecondaryIcon` (`boolean`):  
 *   If true, renders the `secondary-icon` slot. Default is false.
 *
 * ---
 *
 * ### Events
 *
 * - `message-click` – Fired when the main message area is clicked (e.g., to open details or acknowledge).
 * - `action-click` – Fired when the action button or icon is clicked (if interactive).
 *
 * ---
 *
 * ### Best Practices & Constraints
 *
 * - Use concise titles and descriptions to avoid truncation.
 * - Only one action should be present per message for clarity.
 * - Use the `empty` state to indicate when there are no notifications.
 * - For grouped or more detailed messages, use the `large` variant.
 * - If both icons are used, ensure they convey distinct and meaningful information.
 * - The `icon-no-click` action type is for status display only and should not be used for actionable items.
 *
 * ---
 *
 * ### Example
 *
 * ```html
 * <obc-topbar-message-item action="text-button">
 *   <obi-placeholder slot="primary-icon"></obi-placeholder>
 *   <obi-placeholder slot="secondary-icon"></obi-placeholder>
 *   <div slot="title">System Alert</div>
 *   <div slot="description">Temperature threshold exceeded.</div>
 *   <div slot="time">09:12:46</div>
 *   <div slot="action-text">View</div>
 * </obc-topbar-message-item>
 * ```
 *
 * In this example, the message displays two icons, a title, description, timestamp, and a text action button labeled "View".
 *
 * @slot primary-icon - Main icon representing the message type or source.
 * @slot secondary-icon - Additional icon for extra context (shown if `hasSecondaryIcon` is true).
 * @slot title - Title or heading of the message.
 * @slot description - Main message text or description.
 * @slot time - Timestamp or time label for the message.
 * @slot action-text - Label for the text action button (shown if `action="text-button"`).
 * @slot action-icon - Icon for the action area (shown if `action="icon-button"` or `icon-no-click"`).
 * @slot empty - Content to display when `empty` is true (no active messages).
 * @fires message-click - Fired when the main message area is clicked.
 * @fires action-click - Fired when the action button or icon is clicked (if interactive).
 */
@customElement('obc-topbar-message-item')
export class ObcTopbarMessageItem extends LitElement {
  /**
   * If true, increases the component's height and adjusts layout for a more prominent display.
   * Use for grouped or detailed messages. Default is false.
   */
  @property({type: Boolean}) large = false;

  /**
   * If true, displays the empty state slot instead of a message.
   * Use to indicate there are no active notifications. Default is false.
   */
  @property({type: Boolean}) empty = false;

  /**
   * If true, renders the `secondary-icon` slot for additional context.
   * Default is false.
   */
  @property({type: Boolean}) hasSecondaryIcon = false;

  /**
   * Determines the action area type.
   * - `text-button`: Shows a clickable text action button.
   * - `icon-button`: Shows a clickable icon action.
   * - `icon-no-click`: Shows a non-interactive icon.
   * - `none`: No action area.
   * Default is `none`.
   */
  @property({type: String}) action = ObcTopbarMessageItemAction.None;

  private onMessageClick() {
    /**
     * Fired when the main message area is clicked (e.g., to open details or acknowledge).
     *
     * @event message-click
     */
=======
 * Notification message component
 *
 * @fires message-click - Fired when the message is clicked
 * @fires action-click - Fired when the action is clicked
 */
@customElement('obc-topbar-message-item')
export class ObcTopbarMessageItem extends LitElement {
  @property({type: Boolean}) large = false;
  @property({type: Boolean}) empty = false;
  @property({type: Boolean}) hasSecondaryIcon = false;
  @property({type: String}) action = ObcTopbarMessageItemAction.None;

  private onMessageClick() {
>>>>>>> ff0a1377 (Update storybook (#293))
    this.dispatchEvent(new CustomEvent('message-click'));
  }

  private onActionClick() {
<<<<<<< HEAD
    /**
     * Fired when the action button or icon is clicked (if interactive).
     *
     * @event action-click
     */
=======
>>>>>>> ff0a1377 (Update storybook (#293))
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
