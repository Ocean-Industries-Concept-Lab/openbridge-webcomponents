import {LitElement, html, nothing, unsafeCSS} from 'lit';
import {property} from 'lit/decorators.js';

import compentStyle from './advice-menu-item.css?inline';
import '../message-menu-item/message-menu-item.js';
import '../../icons/icon-notification-advice-active.js';
import {ObcMessageMenuItemSize} from '../message-menu-item/message-menu-item.js';
import {customElement} from '../../decorator.js';

/**
 * `<obc-advice-menu-item>` – A list item component for displaying advice or recommendation entries with icons and action controls.
 *
 * Presents a concise summary of an advice or recommendation, including title, description, timestamp, and action buttons. Designed for use in advice menus, notification panels, or similar lists where users need to review and act on recommendations.
 *
 * ### Features
 * - **Icon:** Displays the advice icon (`obi-notification-advice-active`) with starboard green color.
 * - **Secondary Icon Support:** Optional secondary icon (e.g., system or source).
 * - **Time and Day Display:** Optionally shows day and/or time for the advice occurrence.
 * - **Expandable:** Can be toggled open/closed for additional details (via click).
 * - **Action Buttons:** Supports primary and secondary action buttons.
 * - **Animated Intro:** Optional animation when the item appears.
 * - **Size Options:** Supports single-line or multi-line layouts (see `size` property).
 *
 * ### Usage Guidelines
 * Use `obc-advice-menu-item` to represent individual advice or recommendation entries in a menu or list.
 *
 * - Provide action button labels via `primaryActionLabel` and `secondaryActionLabel` properties.
 * - Use the `icon` slot for a source/system icon if needed.
 *
 * ### Slots
 * | Slot Name | Renders When...        | Purpose                                        |
 * |-----------|------------------------|------------------------------------------------|
 * | icon      | If `hasIcon` is true   | Secondary icon (e.g., system/source of advice).|
 *
 * ### Events
 * - **primary-action-click** – Fired when the primary action button is clicked.
 * - **secondary-action-click** – Fired when the secondary action button is clicked.
 * - **item-click** – Fired when the advice menu item is clicked (toggles open/closed).
 *
 * ### Best Practices
 * - Use concise titles and descriptions for quick scanning.
 * - Provide meaningful action button labels.
 *
 * **Example:**
 * ```
 * <obc-advice-menu-item
 *   title="Route Optimization Available"
 *   description="A more efficient route has been calculated based on current conditions"
 *   time="14:30"
 *   primaryActionLabel="Apply"
 *   secondaryActionLabel="Dismiss"
 * >
 * </obc-advice-menu-item>
 * ```
 *
 * @slot icon - Optional secondary icon (e.g., source/system).
 *
 * @fires primary-action-click {CustomEvent<void>} Fired when the primary action button is clicked.
 * @fires secondary-action-click {CustomEvent<void>} Fired when the secondary action button is clicked.
 * @fires item-click {CustomEvent<void>} Fired when the advice menu item is clicked.
 */
@customElement('obc-advice-menu-item')
export class ObcAdviceMenuItem extends LitElement {
  /**
   * Whether to display a secondary icon (e.g., system/source) in the item.
   * When true, the `icon` slot is rendered.
   */
  @property({type: Boolean}) hasIcon = false;

  /**
   * The title of the advice.
   */
  @property({type: String}) override title = '';

  /**
   * The description of the advice.
   */
  @property({type: String}) description = '';

  /**
   * The day label for the advice (e.g., "Yesterday").
   */
  @property({type: String}) day = '';

  /**
   * The time label for the advice (e.g., "14:30").
   */
  @property({type: String}) time = '';

  /**
   * Whether the item is expanded/open to show additional details.
   * Toggled by clicking the item.
   */
  @property({type: Boolean}) open = false;

  /**
   * Layout size of the menu item.
   * Controls whether content is single-line or multi-line.
   * Possible values: 'single-line', 'double-line', 'multi-line'.
   * Default is 'single-line'.
   */
  @property({type: String}) size: ObcMessageMenuItemSize =
    ObcMessageMenuItemSize.SingleLine;

  /**
   * Whether to animate the item's appearance (intro animation).
   */
  @property({type: Boolean}) animateIntro = false;

  /**
   * Label for the primary action button.
   * If empty, the primary action button is not displayed.
   */
  @property({type: String}) primaryActionLabel = '';

  /**
   * Label for the secondary action button.
   * If empty, the secondary action button is not displayed.
   */
  @property({type: String}) secondaryActionLabel = '';

  private handleMessageClick() {
    this.dispatchEvent(new CustomEvent('item-click'));
    this.open = !this.open;
  }

  private handlePrimaryActionClick() {
    this.dispatchEvent(new CustomEvent('primary-action-click'));
  }

  private handleSecondaryActionClick() {
    this.dispatchEvent(new CustomEvent('secondary-action-click'));
  }

  override render() {
    return html`
      <obc-message-menu-item
        .title=${this.title}
        .description=${this.description}
        .day=${this.day}
        .time=${this.time}
        .primaryActionLabel=${this.primaryActionLabel}
        .secondaryActionLabel=${this.secondaryActionLabel}
        .size=${this.size}
        .open=${this.open}
        .hasSecondaryIcon=${this.hasIcon}
        hasPrimaryIcon
        @message-click=${this.handleMessageClick}
        @primary-action-click=${this.handlePrimaryActionClick}
        @secondary-action-click=${this.handleSecondaryActionClick}
      >
        <obi-notification-advice-active
          slot="primary-icon"
          style="color: var(--instrument-starboard-primary-color)"
        ></obi-notification-advice-active>
        ${this.hasIcon
          ? html`<slot name="icon" slot="secondary-icon"></slot>`
          : nothing}
      </obc-message-menu-item>
    `;
  }

  static override styles = unsafeCSS(compentStyle);
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-advice-menu-item': ObcAdviceMenuItem;
  }
}
