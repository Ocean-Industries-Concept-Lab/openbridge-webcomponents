import {LitElement, html, nothing, unsafeCSS} from 'lit';
import {property} from 'lit/decorators.js';
import compentStyle from './topbar-message-item.css?inline';
import {classMap} from 'lit/directives/class-map.js';
import {customElement} from '../../decorator.js';

/**
 * Specifies the visual and interactive type of `<obc-topbar-message-item>`.
 *
 * - `simple`: Basic message with no action button.
 * - `with-button`: Message with a text-based action button.
 * - `with-icon-button`: Message with an icon-based action button.
 * - `inactive`: Inactive or empty state, typically used to indicate no active messages.
 *
 * The type controls which elements are shown and how the message item behaves.
 */
export enum ObcTopbarMessageItemType {
  Simple = 'simple',
  WithButton = 'with-button',
  WithIconButton = 'with-icon-button',
  Inactive = 'inactive',
}

/**
 * Sets the vertical size of `<obc-topbar-message-item>`.
 *
 * - `regular`: Standard height for compact display.
 * - `tall`: Increased height for additional content or emphasis.
 *
 * The size affects the component's vertical padding and layout.
 */
export enum ObcTopbarMessageItemSize {
  Regular = 'regular',
  Tall = 'tall',
}

/**
 * `<obc-topbar-message-item>` – A compact, horizontally-aligned message bar for displaying status updates, alerts, or actionable notifications in a top bar or summary area.
 *
 * This component presents a message with optional icons, title, description, timestamps, and action buttons. It is designed for quick scanning and interaction, supporting both text and icon actions. The layout adapts for regular or tall display, and can show an inactive/empty state when no messages are present.
 *
 * ---
 *
 * ### Features
 * - **Type Variants:**
 *   - `simple`: Displays only the message content (title, description, icons, timestamps) with no action button.
 *   - `with-button`: Adds a text-based action button for user interaction.
 *   - `with-icon-button`: Adds an icon-based action button for compact actions.
 *   - `inactive`: Shows an empty/inactive state, typically used when there are no messages to display.
 * - **Size Options:**
 *   - `regular`: Standard compact height.
 *   - `tall`: Expanded height for more content or emphasis.
 * - **Content Structure:**
 *   - Supports primary and secondary icons, title, description, and up to two timestamps.
 *   - Action area can be a text button, icon button, or omitted.
 * - **State Flags:**
 *   - Show/hide title, description, primary/secondary timestamps, and secondary icon via boolean properties.
 *   - Inactive/empty state can be triggered via the `type="inactive"` or `empty` property.
 * - **Responsive Layout:**
 *   - Adapts spacing and alignment for regular vs. tall size.
 *   - Truncates long titles/descriptions to fit available space.
 * - **Interactive Elements:**
 *   - Clickable message area (`message-click` event).
 *   - Action button (text or icon) triggers `action-click` event.
 *
 * ---
 *
 * ### Usage Guidelines
 * Use `<obc-topbar-message-item>` to display concise status updates, alerts, or actionable notifications in a top bar, summary list, or notification center. It is ideal for presenting information that may require quick acknowledgment or action, such as system alerts, status changes, or reminders.
 *
 * - Use the `with-button` or `with-icon-button` types when an immediate action is available (e.g., "Acknowledge", "Open", or a quick icon action).
 * - Use the `simple` type for informational messages that do not require user action.
 * - Use the `inactive` type (or set `empty=true`) to indicate there are no current messages.
 * - For longer messages or additional context, use the `tall` size to provide more space for content.
 * - Avoid overloading the message item with excessive text; keep titles and descriptions concise for quick scanning.
 * - For persistent or multi-line alerts, consider using a banner or dialog component instead.
 *
 * ---
 *
 * ### Slots
 * | Slot Name         | Renders When...                                | Purpose                                                      |
 * |-------------------|------------------------------------------------|--------------------------------------------------------------|
 * | primary-icon      | Always (except inactive)                       | Main icon representing the message type or status            |
 * | secondary-icon    | If `hasSecondaryIcon` is true                  | Additional icon for context or severity                      |
 * | title             | If `hasTitle` is true                          | Title or heading of the message                              |
 * | description       | If `hasDescription` is true                    | Detailed message text                                        |
 * | time              | If `hasTimestamp` is true                      | Primary timestamp (e.g., time of event)                      |
 * | time-secondary    | If `hasTimestamp2` is true                     | Secondary timestamp (e.g., duration, relative time)          |
 * | action-text       | If type is `with-button`                       | Label/content for the text action button                     |
 * | action-icon       | If type is `with-icon-button`                  | Icon for the icon action button                              |
 * | empty             | If type is `inactive` or `empty` is true       | Content for the empty/inactive state                         |
 *
 * ---
 *
 * ### Events
 * - `message-click` – Fired when the main message area is clicked.
 * - `action-click` – Fired when the action button (text or icon) is clicked.
 *
 * ---
 *
 * ### Best Practices & Constraints
 * - Only one action button (text or icon) should be used at a time to keep interactions simple.
 * - Use the `inactive` type or `empty=true` to clearly indicate when there are no messages.
 * - For accessibility, ensure that action buttons have clear labels or icons.
 * - Truncation is applied to long titles and descriptions; keep content concise for best results.
 * - Deprecated properties: Prefer using `type` and `size` over `large` and `empty`.
 *
 * ---
 *
 * **Example:**
 * ```html
 * <obc-topbar-message-item type="with-button" size="regular" hasTitle hasDescription hasTimestamp>
 *   <obi-placeholder slot="primary-icon"></obi-placeholder>
 *   <obi-placeholder slot="secondary-icon"></obi-placeholder>
 *   <span slot="title">System Update</span>
 *   <span slot="description">Update completed successfully.</span>
 *   <span slot="time">09:12:46</span>
 *   <span slot="action-text">View</span>
 * </obc-topbar-message-item>
 * ```
 *
 * @slot primary-icon - Main icon representing the message type or status.
 * @slot secondary-icon - Additional icon for context or severity (shown if `hasSecondaryIcon` is true).
 * @slot title - Title or heading of the message (shown if `hasTitle` is true).
 * @slot description - Detailed message text (shown if `hasDescription` is true).
 * @slot time - Primary timestamp (shown if `hasTimestamp` is true).
 * @slot time-secondary - Secondary timestamp (shown if `hasTimestamp2` is true).
 * @slot action-text - Content for the text action button (shown if type is `with-button`).
 * @slot action-icon - Icon for the icon action button (shown if type is `with-icon-button`).
 * @slot empty - Content for the empty/inactive state (shown if type is `inactive` or `empty` is true).
 * @fires message-click {CustomEvent<void>} Fired when the main message area is clicked.
 * @fires action-click {CustomEvent<void>} Fired when the action button (text or icon) is clicked.
 */
@customElement('obc-topbar-message-item')
export class ObcTopbarMessageItem extends LitElement {
  /**
   * Controls the visual and interactive type of the message item.
   *
   * - `simple`: No action button, just message content.
   * - `with-button`: Shows a text-based action button.
   * - `with-icon-button`: Shows an icon-based action button.
   * - `inactive`: Shows an empty/inactive state.
   *
   * Defaults to `with-button`.
   */
  @property({type: String}) type: ObcTopbarMessageItemType =
    ObcTopbarMessageItemType.WithButton;

  /**
   * Sets the vertical size of the message item.
   *
   * - `regular`: Standard compact height.
   * - `tall`: Expanded height for more content.
   *
   * Defaults to `regular`.
   */
  @property({type: String}) size: ObcTopbarMessageItemSize =
    ObcTopbarMessageItemSize.Regular;

  /**
   * Whether to show the title slot.
   */
  @property({type: Boolean, attribute: false}) showTitle: boolean = true;

  /**
   * Whether to show the description slot.
   */
  @property({type: Boolean, attribute: false}) showDescription: boolean = true;

  /**
   * Whether to show the primary timestamp slot.
   */
  @property({type: Boolean, attribute: false}) showTimestamp: boolean = true;

  /**
   * Whether to display the secondary timestamp slot.
   */
  @property({type: Boolean}) hasTimestamp2 = false;

  /**
   * Whether to display the secondary icon slot.
   */
  @property({type: Boolean}) hasSecondaryIcon = false;

  private onMessageClick() {
    /**
     * Fired when the main message area is clicked.
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
    const isInactive = this.type === ObcTopbarMessageItemType.Inactive;
    const isLarge = this.size === ObcTopbarMessageItemSize.Tall;

    return html`
      <div
        class=${classMap({
          wrapper: true,
          empty: isInactive,
          large: isLarge,
          [`type-${this.type}`]: true,
        })}
      >
        ${isInactive
          ? html`<div class="empty-message">
              <slot name="empty">No active messages</slot>
            </div>`
          : html`
              <button class="message-item-touch" @click=${this.onMessageClick}>
                <div class="message-item">
                  <div class="icon primary">
                    <slot name="primary-icon"></slot>
                  </div>
                  <div class="content-container">
                    ${this.hasSecondaryIcon
                      ? html`<div class="icon secondary">
                          <slot name="secondary-icon"></slot>
                        </div>`
                      : nothing}
                    <div class="message-container ${isLarge ? 'large' : ''}">
                      <div class="title-container">
                        ${this.showTitle
                          ? html`<div class="title">
                              <slot name="title"></slot>
                            </div>`
                          : nothing}
                        ${isLarge
                          ? html`
                              <div class="timestamp-container">
                                ${this.showTimestamp
                                  ? html`<div class="time">
                                      <slot name="time"></slot>
                                    </div>`
                                  : nothing}
                                ${this.hasTimestamp2
                                  ? html`<div class="time">
                                      <slot name="time-secondary"></slot>
                                    </div>`
                                  : nothing}
                              </div>
                            `
                          : nothing}
                      </div>
                      ${this.showDescription
                        ? html`<div class="description">
                            <slot name="description"></slot>
                          </div>`
                        : nothing}
                    </div>
                  </div>
                  ${!isLarge
                    ? html`
                        <div class="timestamp-container">
                          ${this.showTimestamp
                            ? html`<div class="time">
                                <slot name="time"></slot>
                              </div>`
                            : nothing}
                          ${this.hasTimestamp2
                            ? html`<div class="time secondary">
                                <slot name="time-secondary"></slot>
                              </div>`
                            : nothing}
                        </div>
                      `
                    : nothing}
                </div>
              </button>
              ${this.type === ObcTopbarMessageItemType.WithButton
                ? html`
                    <button
                      class="action-wrapper action-text-button"
                      @click=${this.onActionClick}
                    >
                      <div class="action">
                        <slot name="action-text"></slot>
                      </div>
                    </button>
                  `
                : this.type === ObcTopbarMessageItemType.WithIconButton
                  ? html`
                      <button
                        class="action-wrapper action-icon-button"
                        @click=${this.onActionClick}
                      >
                        <div class="action">
                          <slot name="action-icon"></slot>
                        </div>
                      </button>
                    `
                  : nothing}
            `}
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
