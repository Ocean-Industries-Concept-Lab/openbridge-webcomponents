import {LitElement, html, nothing, unsafeCSS} from 'lit';
import {customElement} from '../../decorator.js';
import {classMap} from 'lit/directives/class-map.js';
import compentStyle from './tab-item.css?inline';
import '../icon-button/icon-button.js';
import {property} from 'lit/decorators.js';
import '../../icons/icon-close-google.js';
import '../badge/badge.js';
import {BadgeSize, BadgeType} from '../badge/badge.js';

/**
 * `<obc-tab-item>` – A selectable tab component for navigation menus and tabbed interfaces.
 *
 * Represents a single tab within a tab bar or navigation group, supporting optional icons, badges, close actions, and various layout modes. Designed for use in horizontal or vertical tab sets, allowing users to switch between different views or content panels.
 *
 * Appears as a button-like element that can display a leading icon, a title, a badge (for counts or status), and an optional close button. Supports both fixed-width and "hug" (fit-content) layouts, and can be styled as checked (active/selected) or disabled.
 *
 * ### Features
 * - **Selectable State:** Indicates active/selected tab via the `checked` property.
 * - **Leading Icon:** Optionally displays a leading icon via the `leading-icon` slot.
 * - **Title:** Supports a title label, either via property or slot.
 * - **Badge Support:** Can show a badge (count/status) with configurable type, size, and icon.
 * - **Close Button:** Optional close action via a trailing icon button.
 * - **Layout Modes:**
 *   - **Hug:** Shrinks to fit content width (`hug` property).
 *   - **Center Content:** Centers content within the tab (`centerContent` property).
 * - **Divider:** Optional divider line for visual separation.
 * - **Disabled State:** Prevents interaction and visually indicates non-interactive state.
 * - **Keyboard Accessible:** Supports activation via Enter/Space keys.
 *
 * ### Variants and Configuration
 * - **Badge Types:** Supports all badge types from `obc-badge` (e.g., `alarm`, `warning`, `notification`, etc.).
 * - **Badge Sizes:** Regular and large badge sizes.
 * - **Hide Badge Number:** Optionally hide the badge number for status-only badges.
 * - **Show Leading Badge Icon:** Optionally display an icon within the badge.
 *
 * ### Usage Guidelines
 * Use `obc-tab-item` within a tab bar or navigation group to represent a single selectable view or section. Ideal for switching between content panels, dashboards, or grouped settings. Use the `checked` property to indicate the active tab, and `disabled` to prevent selection. The close button is suitable for user-removable tabs (e.g., in dynamic tab sets).
 *
 * - Use the badge for counts (e.g., notifications, alarms) or status indicators.
 * - Use the leading icon for visual context or to reinforce the tab's purpose.
 * - Avoid using the close button on non-removable tabs.
 * - For best accessibility, ensure each tab has a unique label/title.
 *
 * **TODO(designer):** Confirm if there are recommended maximum title lengths or truncation guidelines for tab labels.
 *
 * ### Slots
 *
 * | Slot Name      | Renders When...         | Purpose                                                  |
 * | -------------- | ---------------------- | -------------------------------------------------------- |
 * | leading-icon   | `hasLeadingIcon` true  | Leading icon representing the tab's category or purpose. |
 * | title          | `hasTitle` true        | Tab label or heading text.                               |
 * | badge-icon     | `hasBadge` & `showLeadingBadgeIcon` true | Icon inside the badge (e.g., status symbol).             |
 *
 * ### Events
 * - `tab-click` – Fired when the tab is clicked or activated via keyboard.
 * - `tab-close` – Fired when the close button is clicked.
 *
 * ### Best Practices
 * - Only one tab in a group should have `checked` set to true.
 * - Use the badge for concise status/counts; avoid long text in badges.
 * - The close button should only be used for tabs that users can remove.
 * - For accessibility, ensure tabs are focusable and have clear labels.
 *
 * **Example:**
 * ```
 * <obc-tab-item
 *   checked
 *   has-leading-icon
 *   has-title
 *   has-badge
 *   badgeCount="3"
 *   badgeType="alarm"
 *   has-close
 *   title="Alarms"
 * >
 *   <obi-placeholder slot="leading-icon"></obi-placeholder>
 *   <obi-placeholder slot="badge-icon"></obi-placeholder>
 * </obc-tab-item>
 * ```
 *
 * @slot leading-icon - Slot for the leading icon (shown when `hasLeadingIcon` is true)
 * @slot title - Slot for the tab's label/title (shown when `hasTitle` is true)
 * @slot badge-icon - Slot for an icon inside the badge (shown when `hasBadge` and `showLeadingBadgeIcon` are true)
 * @fires tab-click {CustomEvent<{title: string}>} When the tab is clicked or activated via keyboard
 * @fires tab-close {CustomEvent<{title: string}>} When the close button is clicked
 */
@customElement('obc-tab-item')
export class ObcTabItem extends LitElement {
  /**
   * Shrinks the tab width to fit its content instead of using the default fixed width.
   * When enabled, the tab will use `width: fit-content` and a minimum width.
   *
   * Default: false
   */
  @property({type: Boolean}) hug = false;

  /**
   * Centers the content (icon, title, badge) horizontally within the tab.
   * When enabled, content is centered rather than left-aligned.
   *
   * Default: false
   */
  @property({type: Boolean}) centerContent = false;

  /**
   * Marks the tab as selected/active.
   * Only one tab in a group should have `checked` set to true.
   *
   * Default: false
   */
  @property({type: Boolean, reflect: true}) checked = false;

  /**
   * Displays a close button at the end of the tab.
   * Use for tabs that can be removed by the user.
   *
   * Default: false
   */
  @property({type: Boolean, attribute: 'has-close'}) hasClose = false;

  /**
   * Shows a leading icon at the start of the tab.
   * Supply icon content via the `leading-icon` slot.
   *
   * Default: false
   */
  @property({type: Boolean, attribute: 'has-leading-icon'}) hasLeadingIcon =
    false;

  /**
   * Displays the tab's title/label.
   * Content can be provided via the `title` slot or the `title` property.
   *
   * Default: false
   */
  @property({type: Boolean, attribute: 'has-title'}) hasTitle = false;

  /**
   * Shows a vertical divider on the left edge of the tab (except when checked).
   * Useful for visually separating tabs.
   *
   * Default: false
   */
  @property({type: Boolean, attribute: 'has-divider'}) hasDivider = false;

  /**
   * Displays a badge (count/status) on the tab.
   * Configure badge appearance via `badgeCount`, `badgeType`, `badgeSize`, etc.
   *
   * Default: false
   */
  @property({type: Boolean, attribute: 'has-badge'}) hasBadge = false;

  /**
   * (Deprecated/Unused) Icon name for the tab.
   * Icon content should be provided via the `leading-icon` slot.
   *
   * Default: 'placeholder'
   */
  @property({type: String}) icon = 'placeholder';

  /**
   * The tab's title/label text.
   * Can be overridden by slotting content into the `title` slot.
   *
   * Default: 'Tab title'
   */
  @property({type: String}) override title = 'Tab title';

  /**
   * Disables the tab, preventing user interaction and applying disabled styles.
   *
   * Default: false
   */
  @property({type: Boolean}) disabled = false;

  /**
   * Type of badge to display (e.g., 'regular', 'alarm', 'warning', etc.).
   * See `BadgeType` enum for available options.
   *
   * Default: 'regular'
   */
  @property({type: String}) badgeType: string = BadgeType.regular;

  /**
   * Size of the badge ('regular' or 'large').
   * See `BadgeSize` enum for available options.
   *
   * Default: 'regular'
   */
  @property({type: String}) badgeSize: string = BadgeSize.regular;

  /**
   * Hides the badge's numeric value, showing only the badge background (for status-only badges).
   *
   * Default: false
   */
  @property({type: Boolean}) badgeHideNumber = false;

  /**
   * The numeric value to display in the badge (e.g., count of notifications).
   *
   * Default: 0
   */
  @property({type: Number}) badgeCount = 0;

  /**
   * Shows an icon inside the badge.
   * Supply icon content via the `badge-icon` slot.
   *
   * Default: false
   */
  @property({type: Boolean}) showLeadingBadgeIcon = false;

  private handleClick(event: Event) {
    if (this.disabled) {
      event.preventDefault();
      return;
    }
    const clickEvent = new CustomEvent('tab-click', {
      detail: {title: this.title},
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(clickEvent);
  }

  private handleClose(event: Event) {
    event.stopPropagation();
    const closeEvent = new CustomEvent('tab-close', {
      detail: {title: this.title},
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(closeEvent);
  }

  private handleKeyDown(event: KeyboardEvent) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.handleClick(event);
    }
  }

  override render() {
    const wrapperClasses = {
      wrapper: true,
      hug: this.hug,
      'has-close': this.hasClose,
      'has-leading-icon': this.hasLeadingIcon,
      'has-title': this.hasTitle,
      'has-divider': this.hasDivider && !this.checked,
      'has-badge': this.hasBadge,
      disabled: this.disabled,
      'center-content': this.centerContent,
    };

    return html`
      <div
        class=${classMap(wrapperClasses)}
        role="tab"
        tabindex=${this.disabled ? '-1' : '0'}
        @click=${this.handleClick}
        @keydown=${this.handleKeyDown}
      >
        <div class="content">
          ${this.hasLeadingIcon
            ? html`
                <div class="leading-icon">
                  <slot name="leading-icon"></slot>
                </div>
              `
            : nothing}
          ${this.hasTitle
            ? html`
                <div class="title">
                  <slot name="title">${this.title}</slot>
                </div>
              `
            : nothing}
          ${this.centerContent && this.hasBadge
            ? html`
                <obc-badge
                  class="badge"
                  .number=${this.badgeCount}
                  .type=${this.badgeType || BadgeType.regular}
                  .size=${this.badgeSize || BadgeSize.regular}
                  .hideNumber=${this.badgeHideNumber}
                  .showIcon=${this.showLeadingBadgeIcon}
                >
                  ${this.showLeadingBadgeIcon
                    ? html`<slot name="badge-icon" slot="badge-icon"></slot>`
                    : nothing}
                </obc-badge>
              `
            : nothing}
        </div>
        ${!this.centerContent && this.hasBadge
          ? html`
              <obc-badge
                class="badge"
                .number=${this.badgeCount}
                .type=${this.badgeType || BadgeType.regular}
                .size=${this.badgeSize || BadgeSize.regular}
                .hideNumber=${this.badgeHideNumber}
                .showIcon=${this.showLeadingBadgeIcon}
              >
                ${this.showLeadingBadgeIcon
                  ? html`<slot name="badge-icon" slot="badge-icon"></slot>`
                  : nothing}
              </obc-badge>
            `
          : nothing}
        ${this.hasClose
          ? html`
              <obc-icon-button
                class="close-button"
                variant="flat"
                @click=${this.handleClose}
                aria-label="Close tab"
                .disabled=${this.disabled}
                ><obi-close-google></obi-close-google
              ></obc-icon-button>
            `
          : nothing}
      </div>
    `;
  }

  static override styles = unsafeCSS(compentStyle);
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-tab-item': ObcTabItem;
  }
}
