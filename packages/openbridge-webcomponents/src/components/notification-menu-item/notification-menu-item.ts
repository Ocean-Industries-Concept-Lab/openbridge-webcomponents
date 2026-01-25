import {LitElement, html, nothing, unsafeCSS} from 'lit';
import {property} from 'lit/decorators.js';

import compentStyle from './notification-menu-item.css?inline';
import '../message-menu-item/message-menu-item.js';
import '../../icons/icon-notification-filled.js';
import {ObcMessageMenuItemSize} from '../message-menu-item/message-menu-item.js';
import {customElement} from '../../decorator.js';

/**
 * `<obc-notification-menu-item>` – A notification list item with a distinctive notification icon.
 *
 * Wraps `<obc-message-menu-item>` with a pre-configured notification icon (`obi-notification-filled`).
 * Displays a concise summary including title, description, timestamp, and action buttons.
 *
 * ## Features
 *
 * - **Notification Icon:** Displays the notification icon with alert color.
 * - **Secondary Icon Support:** Optional secondary icon via the `icon` slot.
 * - **Expandable:** Toggles open/closed on click to show additional details.
 * - **Action Buttons:** Supports primary and secondary action buttons.
 * - **Size Options:** Supports `single-line` or `double-line` layouts.
 *
 * ## Usage Guidelines
 *
 * Use `obc-notification-menu-item` for notification entries in a list.
 *
 * - Use the `icon` slot for a secondary source/system icon if needed.
 *
 * ## Slots
 *
 * | Slot Name | Renders When...      | Purpose                              |
 * |-----------|----------------------|--------------------------------------|
 * | icon      | `hasIcon` is true    | Secondary icon (e.g., source/system) |
 *
 * ## Events
 *
 * - `primary-action-click` – Fired when the primary action button is clicked.
 * - `secondary-action-click` – Fired when the secondary action button is clicked.
 * - `item-click` – Fired when the item is clicked. Detail includes `{ open: boolean }`.
 *
 * ## Example
 *
 * ```html
 * <obc-notification-menu-item
 *   title="System Alert"
 *   description="A new system update is available."
 *   time="14:30"
 *   primaryActionLabel="View"
 *   secondaryActionLabel="Dismiss"
 *   hasIcon
 * >
 *   <obi-placeholder slot="icon"></obi-placeholder>
 * </obc-notification-menu-item>
 * ```
 *
 * @slot icon - Secondary icon (shown when `hasIcon` is true).
 * @fires primary-action-click {CustomEvent<void>} Fired when the primary action button is clicked.
 * @fires secondary-action-click {CustomEvent<void>} Fired when the secondary action button is clicked.
 * @fires item-click {CustomEvent<{open: boolean}>} Fired when the item is clicked.
 */
@customElement('obc-notification-menu-item')
export class ObcNotificationMenuItem extends LitElement {
  /** When true, renders the `icon` slot for a secondary icon. */
  @property({type: Boolean}) hasIcon = false;

  @property({type: String}) override title = '';
  @property({type: String}) description = '';
  @property({type: String}) day = '';
  @property({type: String}) time = '';
  @property({type: Boolean}) open = false;
  /** Layout size: `single-line` (default) or `double-line`. */
  @property({type: String}) size: ObcMessageMenuItemSize =
    ObcMessageMenuItemSize.SingleLine;
  @property({type: String}) primaryActionLabel = '';
  @property({type: String}) secondaryActionLabel = '';

  private handleMessageClick() {
    this.open = !this.open;
    this.dispatchEvent(
      new CustomEvent('item-click', {
        detail: {open: this.open},
        bubbles: true,
        composed: true,
      })
    );
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
      >
        <obi-notification-filled
          slot="primary-icon"
          style="color: var(--notification-enabled-background-color)"
        ></obi-notification-filled>
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
    'obc-notification-menu-item': ObcNotificationMenuItem;
  }
}
