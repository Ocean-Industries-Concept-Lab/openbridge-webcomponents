import {LitElement, html, nothing, unsafeCSS} from 'lit';
import {property} from 'lit/decorators.js';
import compentStyle from './message-menu-item.css?inline';
import {classMap} from 'lit/directives/class-map.js';
import '../button/button.js';
import '../../icons/icon-chevron-down-google.js';
import '../../icons/icon-chevron-up-google.js';
import {customElement} from '../../decorator.js';
import '../../icons/icon-alerts-shelf.js';

export enum ObcMessageMenuItemSize {
  SingleLine = 'single-line',
  DoubleLine = 'double-line',
}

/**
 * `<obc-message-menu-item>` – An expandable message or notification item for use in message lists, notification panels, or alert menus.
 *
 * Displays a concise message row with optional icons, title, description, timestamp, and action buttons. Clicking the item expands it to reveal the full content. Designed for scannable lists where users may need to quickly review and act on individual messages.
 *
 * ## Features
 *
 * - **Size Variants:**
 *   - `single-line`: Compact layout with title and description on one line (default).
 *   - `double-line`: Two-line layout with title on top and description below.
 *   - When clicked, both variants expand to show full multi-line content.
 *
 * - **Stack Direction:**
 *   - `stackVertical=false` (default): Action buttons appear inline to the right of the content.
 *   - `stackVertical=true`: Action buttons appear below the content, spanning full width.
 *
 * - **Icon Options:**
 *   - Primary and secondary icon slots for visual context or status indicators.
 *   - Enhanced icon mode (`enhancedIcon`) increases icon size for emphasis.
 *   - Trailing icon slot (horizontal layout only) for additional actions.
 *   - Shelved state (`isShelved`) displays a shelf icon automatically.
 *
 * - **Actions:**
 *   - Supports up to two action buttons via `primaryActionLabel` and `secondaryActionLabel`.
 *   - In vertical layout, action buttons expand to full width.
 *
 * - **Timestamp:**
 *   - Optional day and time display via `day` and `time` properties.
 *
 * ## Usage Guidelines
 *
 * Use `obc-message-menu-item` to present individual notifications, alerts, or messages within a scrollable list. Ideal for scenarios where users need to quickly scan items, expand for details, or take immediate action.
 *
 * - Use `single-line` for high-density lists where space is limited.
 * - Use `double-line` when the description needs more visibility in the collapsed state.
 * - Keep `stackVertical=false` (default) when actions should be quickly accessible inline.
 * - Use `stackVertical=true` when actions need more prominence or when space is narrow.
 * - Enable `enhancedIcon` to highlight important or priority messages.
 * - Use `isShelved` to indicate messages that have been temporarily set aside.
 *
 * ## Slots
 *
 * | Slot Name        | Renders When...              | Purpose                                           |
 * |------------------|------------------------------|---------------------------------------------------|
 * | `primary-icon`   | `hasPrimaryIcon` is true     | Main icon representing message type or status.    |
 * | `secondary-icon` | `hasSecondaryIcon` is true   | Additional icon for secondary status or context.  |
 * | `trailing-icon`  | `hasTrailingIcon` is true (horizontal only) | Icon button after action buttons. |
 *
 * ## Events
 *
 * - `message-click` – Fired when the message item is clicked. Detail includes `{ open: boolean }`.
 * - `primary-action-click` – Fired when the primary action button is clicked.
 * - `secondary-action-click` – Fired when the secondary action button is clicked.
 *
 * ## Example
 *
 * ```html
 * <obc-message-menu-item
 *   size="double-line"
 *   title="System Update"
 *   description="A new update is available for installation."
 *   day="Yesterday"
 *   time="14:32"
 *   primaryActionLabel="Install"
 *   hasPrimaryIcon
 * >
 *   <obi-placeholder slot="primary-icon"></obi-placeholder>
 * </obc-message-menu-item>
 * ```
 *
 * @slot primary-icon - Main icon representing the message type or status (shown when `hasPrimaryIcon` is true).
 * @slot secondary-icon - Additional icon for secondary status/context (shown when `hasSecondaryIcon` is true).
 * @slot trailing-icon - Icon after action buttons, horizontal layout only (shown when `hasTrailingIcon` is true).
 * @fires message-click {CustomEvent<{open: boolean}>} Fired when the message item is clicked.
 * @fires primary-action-click {CustomEvent<void>} Fired when the primary action button is clicked.
 * @fires secondary-action-click {CustomEvent<void>} Fired when the secondary action button is clicked.
 */
@customElement('obc-message-menu-item')
export class ObcMessageMenuItem extends LitElement {
  // Layout properties
  @property({type: String}) size: ObcMessageMenuItemSize =
    ObcMessageMenuItemSize.SingleLine;
  @property({type: Boolean}) stackVertical = false;
  @property({type: Boolean}) enhancedIcon = false;
  @property({type: Boolean}) open = false;

  // Text content properties
  @property({type: String}) override title = '';
  @property({type: String}) description = '';
  @property({type: String}) day = '';
  @property({type: String}) time = '';
  @property({type: String}) primaryActionLabel = '';
  @property({type: String}) secondaryActionLabel = '';

  // Visibility properties for icons (slots)
  @property({type: Boolean}) hasPrimaryIcon = false;
  @property({type: Boolean}) hasSecondaryIcon = false;
  @property({type: Boolean}) hasTrailingIcon = false;
  @property({type: Boolean}) isShelved = false;

  private get activeSize() {
    if (this.open) {
      return 'multi-line';
    }
    return this.size;
  }

  private get hasTimestamp() {
    return this.time !== '';
  }

  private get hasDay() {
    return this.day !== '';
  }

  private get hasPrimaryAction() {
    return this.primaryActionLabel !== '';
  }

  private get hasSecondaryAction() {
    return this.secondaryActionLabel !== '';
  }

  private get isVertical() {
    return this.stackVertical;
  }

  private handleMessageClick() {
    this.open = !this.open;

    this.dispatchEvent(
      new CustomEvent('message-click', {
        detail: {
          open: this.open,
        },
        bubbles: true,
        composed: true,
      })
    );
  }

  private handlePrimaryActionClick(e: Event) {
    e.stopPropagation();

    this.dispatchEvent(
      new CustomEvent('primary-action-click', {
        bubbles: true,
        composed: true,
      })
    );
  }

  private handleSecondaryActionClick(e: Event) {
    e.stopPropagation();

    this.dispatchEvent(
      new CustomEvent('secondary-action-click', {
        bubbles: true,
        composed: true,
      })
    );
  }

  override render() {
    return html`
      <button
        class=${classMap({
          wrapper: true,
          ['active-size-' + this.activeSize]: true,
          ['size-' + this.size]: true,
          ['enhanced-icon']: this.enhancedIcon,
          ['has-date']: this.hasTimestamp,
          ['stack-vertical']: this.stackVertical,
          ['stack-horizontal']: !this.stackVertical,
        })}
        @click=${this.handleMessageClick}
      >
        <div class="content-container">
          <div class="icon-container">
            ${this.isShelved
              ? html`<div class="icon">
                  <obi-alerts-shelf></obi-alerts-shelf>
                </div>`
              : nothing}
            ${this.hasPrimaryIcon
              ? html`<div class="icon primary">
                  <slot name="primary-icon"></slot>
                </div>`
              : nothing}
            ${this.hasSecondaryIcon
              ? html`<div class="icon secondary">
                  <slot name="secondary-icon"></slot>
                </div>`
              : nothing}
          </div>
          <div class="text-container">
            <div class="title-container">${this.title}</div>
            <div class="description-container">${this.description}</div>
            ${this.hasTimestamp
              ? html`<div class="date-container">
                  ${this.hasDay ? html`<span>${this.day}</span>` : nothing}
                  <span>${this.time}</span>
                </div>`
              : nothing}
            <div class="chevron">
              ${this.open
                ? html`<obi-chevron-up-google></obi-chevron-up-google>`
                : html`<obi-chevron-down-google></obi-chevron-down-google>`}
            </div>
          </div>
        </div>
        ${this.hasPrimaryAction ||
        this.hasSecondaryAction ||
        (this.hasTrailingIcon && !this.isVertical)
          ? html`<div class="action-button-container" part="action-container">
              ${this.hasSecondaryAction
                ? html`<obc-button
                    variant="normal"
                    .fullWidth=${this.isVertical}
                    @click=${this.handleSecondaryActionClick}
                  >
                    ${this.secondaryActionLabel}
                  </obc-button>`
                : nothing}
              ${this.hasPrimaryAction
                ? html`<obc-button
                    variant="normal"
                    .fullWidth=${this.isVertical}
                    @click=${this.handlePrimaryActionClick}
                  >
                    ${this.primaryActionLabel}
                  </obc-button>`
                : nothing}
              ${this.hasTrailingIcon && !this.isVertical
                ? html`<div class="trailing-icon" part="trailing-icon">
                    <slot name="trailing-icon"></slot>
                  </div>`
                : nothing}
            </div>`
          : nothing}
      </button>
    `;
  }

  static override styles = unsafeCSS(compentStyle);
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-message-menu-item': ObcMessageMenuItem;
  }
}
