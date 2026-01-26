import {LitElement, html, nothing, unsafeCSS} from 'lit';
import {property} from 'lit/decorators.js';

import compentStyle from './advice-menu-item.css?inline';
import '../message-menu-item/message-menu-item.js';
import '../../icons/icon-notification-advice-active.js';
import {ObcMessageMenuItemSize} from '../message-menu-item/message-menu-item.js';
import {customElement} from '../../decorator.js';

/**
 * `<obc-advice-menu-item>` – An advice or recommendation list item with a distinctive green icon.
 *
 * Wraps `<obc-message-menu-item>` with a pre-configured advice icon (`obi-notification-advice-active`).
 * Displays a concise summary including title, description, timestamp, and action buttons.
 *
 * ## Features
 *
 * - **Advice Icon:** Displays the advice icon with starboard green color.
 * - **Secondary Icon Support:** Optional secondary icon via the `icon` slot.
 * - **Expandable:** Toggles open/closed on click to show additional details.
 * - **Action Buttons:** Supports primary and secondary action buttons.
 * - **Size Options:** Supports `single-line` or `double-line` layouts.
 *
 * ## Usage Guidelines
 *
 * Use `obc-advice-menu-item` for advice or recommendation entries in a list.
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
 * <obc-advice-menu-item
 *   title="Route Optimization Available"
 *   description="A more efficient route has been calculated."
 *   time="14:30"
 *   primaryActionLabel="Apply"
 *   secondaryActionLabel="Dismiss"
 *   hasIcon
 * >
 *   <obi-placeholder slot="icon"></obi-placeholder>
 * </obc-advice-menu-item>
 * ```
 *
 * @slot icon - Secondary icon (shown when `hasIcon` is true).
 * @fires primary-action-click {CustomEvent<void>} Fired when the primary action button is clicked.
 * @fires secondary-action-click {CustomEvent<void>} Fired when the secondary action button is clicked.
 * @fires item-click {CustomEvent<{open: boolean}>} Fired when the item is clicked.
 */
@customElement('obc-advice-menu-item')
export class ObcAdviceMenuItem extends LitElement {
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
