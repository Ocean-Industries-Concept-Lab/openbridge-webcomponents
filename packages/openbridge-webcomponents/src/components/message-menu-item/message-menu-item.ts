import {LitElement, html, nothing, unsafeCSS} from 'lit';
import {property} from 'lit/decorators.js';
import compentStyle from './message-menu-item.css?inline';
import {classMap} from 'lit/directives/class-map.js';
import '../button/button.js';
import '../../icons/icon-chevron-down-google.js';
import '../../icons/icon-chevron-up-google.js';
import {customElement} from '../../decorator.js';

export enum ObcMessageMenuItemSize {
  SingleLine = 'single-line',
  DoubleLine = 'double-line',
  MultiLine = 'multi-line',
}

/**
 * `<obc-message-menu-item>` – A flexible, interactive message or notification item for use in message menus, notification lists, or alert panels.
 *
 * Displays a concise message with optional icons, title, description, date/time, and action controls. Designed for use in lists or menus where users may need to scan, expand, or act on individual messages or alerts.
 *
 * Appears as a button-like row with configurable layout (single-line, double-line, or multi-line), supporting both brief and extended content. Can show primary, secondary, and tertiary icons, and optionally includes an action button for quick responses.
 *
 * ---
 *
 * ### Features
 * - **Size Variants:**  
 *   - `single-line` (default): Compact, one-line layout for short messages.
 *   - `double-line`: Allows a second line for longer descriptions.
 *   - `multi-line`: Expands to fit extended content and reveals additional details when open.
 * - **Expandable:**  
 *   - Can toggle between collapsed and expanded (multi-line) states via the chevron icon or programmatically (`open` property).
 * - **Icon Support:**  
 *   - Primary, secondary, and tertiary icon slots for visual context or status.
 *   - Enhanced icon mode increases icon size for emphasis.
 * - **Content Structure:**  
 *   - Title and description slots for clear message hierarchy.
 *   - Optional date and/or time display.
 * - **Action Controls:**  
 *   - Optional action button (e.g., "Acknowledge", "Reply") with customizable label and icon.
 * - **Responsiveness:**  
 *   - Adapts layout for smaller containers, hiding or collapsing elements as needed.
 * - **Animated Intro:**  
 *   - Optional entry animation for smooth appearance.
 *
 * ---
 *
 * ### Usage Guidelines
 * Use `obc-message-menu-item` to present individual notifications, alerts, or actionable messages within a list or menu. Ideal for scenarios where users need to quickly scan, expand for more details, or take immediate action on a message.
 *
 * - Use `single-line` for short, high-density lists.
 * - Use `double-line` or `multi-line` when longer descriptions or additional details are needed.
 * - Enable the action button for messages that require user response (e.g., "Acknowledge", "Undo").
 * - Use icons to visually differentiate message types or statuses.
 *
 * **TODO(designer):** Clarify best practices for when to use each size variant and when to enable enhanced icon mode.
 *
 * ---
 *
 * ### Slots
 * | Slot Name         | Renders When...                  | Purpose                                                      |
 * |-------------------|----------------------------------|--------------------------------------------------------------|
 * | `primary-icon`    | Always                           | Main icon representing the message type or status.           |
 * | `secondary-icon`  | If `hasSecondaryIcon` is true    | Additional icon for secondary status/context.                |
 * | `tertiary-icon`   | If `hasTertiaryIcon` is true     | Tertiary icon for extra context or status.                   |
 * | `title`           | Always                           | Title or heading of the message.                             |
 * | `description`     | Always                           | Main message text or description.                            |
 * | `day`             | If `hasDateOrTime` is true       | Day label (e.g., "Yesterday").                               |
 * | `time`            | If `hasDateOrTime` is true       | Time label (e.g., "12:00:00").                               |
 * | `action-label`    | If `hasActionButton` is true     | Label for the action button.                                 |
 * | `action-icon`     | Always                           | Icon for the action area (optional, for custom actions).     |
 *
 * ---
 *
 * ### Events
 * - `message-click` – Fired when the message item is clicked (toggles open/closed state).
 * - `action-click` – Fired when the action button is clicked.
 *
 * ---
 *
 * ### Best Practices & Constraints
 * - Only use the action button for messages that require immediate user action; avoid cluttering the UI with unnecessary actions.
 * - For accessibility, ensure that title and description slots contain meaningful, concise text.
 * - Use enhanced icon mode sparingly to highlight particularly important messages.
 * - The component is intended for use in lists or menus; avoid using it as a standalone alert or persistent banner.
 *
 * ---
 *
 * ### Example
 * ```html
 * <obc-message-menu-item size="double-line" hasActionButton hasDateOrTime hasSecondaryIcon>
 *   <obi-placeholder slot="primary-icon"></obi-placeholder>
 *   <obi-placeholder slot="secondary-icon"></obi-placeholder>
 *   <span slot="title">System Update</span>
 *   <span slot="description">A new update is available for installation.</span>
 *   <span slot="action-label">Install</span>
 *   <span slot="day">Today</span>
 *   <span slot="time">14:32</span>
 * </obc-message-menu-item>
 * ```
 *
 * @slot primary-icon - Main icon representing the message type or status.
 * @slot secondary-icon - Additional icon for secondary status/context (shown if `hasSecondaryIcon` is true).
 * @slot tertiary-icon - Tertiary icon for extra context (shown if `hasTertiaryIcon` is true).
 * @slot title - Title or heading of the message.
 * @slot description - Main message text or description.
 * @slot day - Day label (shown if `hasDateOrTime` is true).
 * @slot time - Time label (shown if `hasDateOrTime` is true).
 * @slot action-label - Label for the action button (shown if `hasActionButton` is true).
 * @slot action-icon - Icon for the action area (optional).
 * @fires message-click {CustomEvent<void>} Fired when the message item is clicked (toggles open/closed state).
 * @fires action-click {CustomEvent<void>} Fired when the action button is clicked.
 */
@customElement('obc-message-menu-item')
export class ObcMessageMenuItem extends LitElement {
  /**
   * Controls the layout size of the message item.
   * - `single-line`: Compact, one-line layout (default).
   * - `double-line`: Two-line layout for longer descriptions.
   * - `multi-line`: Expands to fit extended content and reveals additional details when open.
   */
  @property({type: String}) size: ObcMessageMenuItemSize =
    ObcMessageMenuItemSize.SingleLine;

  /**
   * If true, displays icons in an enhanced (larger) style for emphasis.
   * Use to highlight important messages or statuses.
   */
  @property({type: Boolean}) enhancedIcon: boolean = false;

  /**
   * If true, the item is expanded to show multi-line content and additional details.
   * Toggled by clicking the item or programmatically.
   */
  @property({type: Boolean}) open: boolean = false;

  /**
   * If true, displays an action button (e.g., "Acknowledge", "Reply") below the message item.
   * The button label is provided via the `action-label` slot.
   */
  @property({type: Boolean}) hasActionButton: boolean = false;

  /**
   * If true, displays a secondary icon in the `secondary-icon` slot.
   */
  @property({type: Boolean}) hasSecondaryIcon: boolean = false;

  /**
   * If true, displays a tertiary icon in the `tertiary-icon` slot.
   */
  @property({type: Boolean}) hasTertiaryIcon: boolean = false;

  /**
   * If true, displays date and/or time information in the `day` and `time` slots.
   */
  @property({type: Boolean}) hasDateOrTime: boolean = false;

  /**
   * If true, animates the component's entry with a slide-in effect.
   */
  @property({type: Boolean, reflect: true})
  animateIntro: boolean = false;

  override render() {
    return html`
      <button
        class=${classMap({
          wrapper: true,
          ['active-size-' + this.ActiveSize]: true,
          ['size-' + this.size]: true,
          ['enhanced-icon']: this.enhancedIcon,
          ['has-date']: this.hasDateOrTime,
        })}
        @click=${this.onMessageClick}
      >
        <div class="content-container">
          <div class="icon-container">
            ${this.hasTertiaryIcon
              ? html`<div class="icon tertiary">
                  <slot name="tertiary-icon"></slot>
                </div>`
              : nothing}
            <div class="icon primary">
              <slot name="primary-icon"></slot>
            </div>
            ${this.hasSecondaryIcon
              ? html`<div class="icon secondary">
                  <slot name="secondary-icon"></slot>
                </div>`
              : nothing}
          </div>
          <div class="text-container">
            <div class="title-container">
              <slot name="title"></slot>
            </div>
            <div class="description-container">
              <slot name="description"></slot>
            </div>
            ${this.hasDateOrTime
              ? html`<div class="date-container">
                  <slot name="day"></slot>
                  <slot name="time"></slot>
                </div>`
              : nothing}
            ${this.size === ObcMessageMenuItemSize.MultiLine
              ? nothing
              : html`<div class="chevron">
                  ${this.open
                    ? html`<obi-chevron-up-google></obi-chevron-up-google>`
                    : html`<obi-chevron-down-google></obi-chevron-down-google>`}
                </div>`}
          </div>
        </div>
        <div class="action-container">
          <div class="action icon">
            <slot name="action-icon"></slot>
          </div>
        </div>
      </button>
      ${this.hasActionButton
        ? html`<div class="action-button-container">
            <obc-button variant="normal" @click=${this.onActionClick}>
              <slot name="action-label"></slot>
            </obc-button>
          </div>`
        : nothing}
    `;
  }

  private onMessageClick() {
    /**
     * Fired when the message item is clicked (toggles open/closed state).
     * @fires message-click
     */
    this.dispatchEvent(new CustomEvent('message-click'));
    this.open = !this.open;
  }

  private onActionClick() {
    /**
     * Fired when the action button is clicked.
     * @fires action-click
     */
    this.dispatchEvent(new CustomEvent('action-click'));
  }

  get ActiveSize() {
    if (this.size === ObcMessageMenuItemSize.MultiLine || this.open) {
      return ObcMessageMenuItemSize.MultiLine;
    }
    return this.size;
  }

  static override styles = unsafeCSS(compentStyle);
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-message-menu-item': ObcMessageMenuItem;
  }
}
