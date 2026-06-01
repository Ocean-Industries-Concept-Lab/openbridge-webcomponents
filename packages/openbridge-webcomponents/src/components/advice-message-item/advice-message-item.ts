import {LitElement, html, unsafeCSS, nothing} from 'lit';
import {property} from 'lit/decorators.js';
import {customElement} from '../../decorator.js';
import componentStyle from './advice-message-item.css?inline';
import '../topbar-message-item/topbar-message-item.js';
import {ObcTopbarMessageItemType} from '../topbar-message-item/topbar-message-item.js';
import '../../icons/icon-notification-advice-active.js';
import '../../icons/icon-close-google.js';

export enum ObcAdviceMessageItemType {
  Simple = 'simple',
  WithButton = 'with-button',
  WithIconButton = 'with-icon-button',
  Inactive = 'inactive',
}

export enum ObcAdviceMessageItemSize {
  Regular = 'regular',
  Tall = 'tall',
}

/**
 * `<obc-advice-message-item>` – A compact, actionable message component for displaying system advice, recommendations, or notifications.
 *
 * This component presents a brief advice or recommendation message, optionally with a title, description, timestamp(s), and action(s). It is designed for use in notification panels, topbars, or summary lists where users need to quickly review and act on advice items. The component supports several display variants, including simple messages, messages with action buttons, and inactive/empty states.
 *
 * ---
 *
 * ### Features
 * - **Display Types:**
 *   - `simple`: Standard advice message with optional title, description, and timestamp.
 *   - `with-button`: Includes a text action button (label set via `actionLabel`).
 *   - `with-icon-button`: Shows an icon button for quick actions (e.g., dismiss or close).
 *   - `inactive`: Indicates an empty or inactive state, typically used when there are no active advice messages.
 * - **Size Variants:**
 *   - `regular`: Default compact layout.
 *   - `tall`: Provides a larger, more spacious layout for increased content or emphasis.
 * - **Content Options:**
 *   - Title and description can be shown or hidden independently.
 *   - Supports one or two timestamps (primary and secondary) for time or duration display.
 *   - Optional secondary icon overlay for additional status or categorization.
 *   - Customizable empty state text for when no advice is present.
 * - **Actions:**
 *   - Text action button (with customizable label) or icon button, depending on type.
 *   - Clickable message area for additional interactions.
 * - **Accessibility & Responsiveness:**
 *   - Truncates long titles/descriptions with ellipsis for readability.
 *   - Layout adapts to size variant and content presence.
 *
 * ---
 *
 * ### Usage Guidelines
 * Use `<obc-advice-message-item>` to present actionable advice, recommendations, or notifications that require user attention or review. Ideal for notification panels, summary lists, or topbars where users may need to quickly scan and act on advice items. Choose the `with-button` or `with-icon-button` types when an immediate action (such as "View", "Acknowledge", or "Dismiss") is needed. Use the `inactive` type (or set `empty` to true) to indicate that there are currently no active advice messages.
 *
 * - For persistent or critical alerts, consider using a dedicated alert/banner component.
 * - For simple, informational messages without actions, use the `simple` type.
 * - Use the `tall` size for layouts where more space is available or when emphasizing the advice.
 * - The secondary icon slot can be used to indicate priority, category, or additional status.
 *
 * **TODO(designer):** Confirm if there are recommended icon choices or color conventions for different advice types, and if there are character limits for title/description.
 *
 * ---
 *
 * ### Slots
 * | Slot Name         | Renders When...                                 | Purpose                                                      |
 * |-------------------|------------------------------------------------|--------------------------------------------------------------|
 * | `primary-icon`    | Always                                          | Main icon representing the advice (default: advice icon).    |
 * | `secondary-icon`  | `hasSecondaryIcon` is true                     | Optional overlay icon for additional status or category.      |
 * | `title`           | `hasTitle` is true and `title` is set          | Title or heading of the advice message.                      |
 * | `description`     | `hasDescription` is true and `description` set | Detailed message text.                                       |
 * | `time`            | `hasTimestamp` is true and `time` is set       | Primary timestamp (e.g., time of advice).                    |
 * | `time-secondary`  | `hasTimestamp2` is true and `timeSecondary` set| Secondary timestamp (e.g., duration, relative time).         |
 * | `action-text`     | `type="with-button"`                           | Label for the primary action button.                         |
 * | `action-icon`     | `type="with-icon-button"`                      | Icon for the action button (default: close icon).            |
 * | `empty`           | `type="inactive"` or `empty` is true           | Text to display in the empty/inactive state.                 |
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
 * - Only one action (text or icon) is shown at a time, depending on the `type`.
 * - Use concise titles and descriptions for optimal readability; long content will be truncated.
 * - The `large` and `empty` properties are deprecated; use `size="tall"` and `type="inactive"` instead.
 * - For accessibility, ensure action labels are descriptive and icons have appropriate meaning.
 *
 * ---
 *
 * **Example:**
 * ```html
 * <obc-advice-message-item
 *   title="System Recommendation"
 *   description="Your system performance can be improved"
 *   time="10:30:15"
 *   type="with-button"
 *   actionLabel="View"
 * >
 * </obc-advice-message-item>
 * ```
 *
 * In this example, the advice message displays a title, description, timestamp, and a "View" action button.
 *
 * @slot primary-icon - Main icon representing the advice (always present)
 * @slot secondary-icon - Optional overlay icon for additional status/category (shown when `hasSecondaryIcon` is true)
 * @slot title - Title or heading of the advice (shown when `hasTitle` is true)
 * @slot description - Detailed message text (shown when `hasDescription` is true)
 * @slot time - Primary timestamp (shown when `hasTimestamp` is true)
 * @slot time-secondary - Secondary timestamp (shown when `hasTimestamp2` is true)
 * @slot action-text - Label for the action button (when `type="with-button"`)
 * @slot action-icon - Icon for the action button (when `type="with-icon-button"`)
 * @slot empty - Text to display in the empty/inactive state (when `type="inactive"` or `empty` is true)
 * @fires message-click {CustomEvent<void>} When the main message area is clicked
 * @fires action-click {CustomEvent<void>} When the action button (text or icon) is clicked
 */
@customElement('obc-advice-message-item')
export class ObcAdviceMessageItem extends LitElement {
  /**
   * Title or heading of the advice message.
   * Shown in the `title` slot if `hasTitle` is true.
   */
  @property({type: String}) override title = '';

  /**
   * Detailed message text for the advice.
   * Shown in the `description` slot if `hasDescription` is true.
   */
  @property({type: String}) description = '';

  /**
   * Primary timestamp to display (e.g., time of advice).
   * Shown in the `time` slot if `hasTimestamp` is true.
   */
  @property({type: String}) time = '';

  /**
   * Secondary timestamp (e.g., duration, relative time).
   * Shown in the `time-secondary` slot if `hasTimestamp2` is true.
   */
  @property({type: String}) timeSecondary = '';

  /**
   * Label for the action button (when `type` is "with-button").
   * Shown in the `action-text` slot.
   */
  @property({type: String}) actionLabel = 'View';

  /**
   * Display type of the advice message.
   * - `simple`: Standard message with optional title, description, and timestamp.
   * - `with-button`: Includes a text action button.
   * - `with-icon-button`: Includes an icon action button.
   * - `inactive`: Shows the empty/inactive state.
   *
   * Default: `simple`
   */
  @property({type: String}) type: ObcAdviceMessageItemType =
    ObcAdviceMessageItemType.Simple;

  /**
   * Size variant of the advice message.
   * - `regular`: Default compact layout.
   * - `tall`: Larger, more spacious layout.
   *
   * Default: `regular`
   */
  @property({type: String}) size: ObcAdviceMessageItemSize =
    ObcAdviceMessageItemSize.Regular;

  /**
   * Whether to show the title.
   * If false, the title is hidden even if set.
   */
  @property({type: Boolean, attribute: false}) showTitle: boolean = true;

  /**
   * Whether to show the description.
   * If false, the description is hidden even if set.
   */
  @property({type: Boolean, attribute: false}) showDescription: boolean = true;

  /**
   * Whether to show the primary timestamp.
   * If false, the `time` slot is not rendered.
   */
  @property({type: Boolean, attribute: false}) showTimestamp: boolean = true;

  /**
   * Whether to show the secondary timestamp.
   * If true, the `time-secondary` slot is rendered.
   */
  @property({type: Boolean}) hasTimestamp2 = false;

  /**
   * Whether to show the secondary icon overlay.
   * If true, the `secondary-icon` slot is rendered.
   */
  @property({type: Boolean}) hasSecondaryIcon = false;

  /**
   * Text to display in the empty/inactive state.
   * Shown in the `empty` slot when `type="inactive"` or `empty` is true.
   */
  @property({type: String}) emptyText = 'No active advice';

  private get mappedType(): ObcTopbarMessageItemType {
    if (this.type === ObcAdviceMessageItemType.Inactive) {
      return ObcTopbarMessageItemType.Inactive;
    }

    switch (this.type) {
      case ObcAdviceMessageItemType.WithButton:
        return ObcTopbarMessageItemType.WithButton;
      case ObcAdviceMessageItemType.WithIconButton:
        return ObcTopbarMessageItemType.WithIconButton;
      case ObcAdviceMessageItemType.Simple:
        return ObcTopbarMessageItemType.Simple;
      default:
        return ObcTopbarMessageItemType.Simple;
    }
  }

  /**
   * Fired when the main message area is clicked.
   * @fires message-click {CustomEvent<void>}
   */
  private handleMessageClick() {
    this.dispatchEvent(new CustomEvent('message-click'));
  }

  /**
   * Fired when the action button (text or icon) is clicked.
   * @fires action-click {CustomEvent<void>}
   */
  private handleActionClick() {
    this.dispatchEvent(new CustomEvent('action-click'));
  }

  override render() {
    return html`
      <obc-topbar-message-item
        .type=${this.mappedType}
        .size=${this.size}
        .showTitle=${this.showTitle}
        .showDescription=${this.showDescription}
        .showTimestamp=${this.showTimestamp}
        .hasTimestamp2=${this.hasTimestamp2}
        .hasSecondaryIcon=${this.hasSecondaryIcon}
        @message-click=${this.handleMessageClick}
        @action-click=${this.handleActionClick}
      >
        <obi-notification-advice-active
          slot="primary-icon"
        ></obi-notification-advice-active>

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
        ${this.type === ObcAdviceMessageItemType.WithButton
          ? html`<span slot="action-text">${this.actionLabel}</span>`
          : this.type === ObcAdviceMessageItemType.WithIconButton
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
    'obc-advice-message-item': ObcAdviceMessageItem;
  }
}
