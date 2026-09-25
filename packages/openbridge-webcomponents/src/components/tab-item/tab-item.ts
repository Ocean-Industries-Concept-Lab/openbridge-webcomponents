import {LitElement, html, nothing, unsafeCSS, type PropertyValues} from 'lit';
import {ifDefined} from 'lit/directives/if-defined.js';
import {customElement} from '../../decorator.js';
import {classMap} from 'lit/directives/class-map.js';
import compentStyle from './tab-item.css?inline';
import '../icon-button/icon-button.js';
import {property} from 'lit/decorators.js';
import '../../icons/icon-close-google.js';
import '../badge/badge.js';
import {BadgeSize, BadgeType} from '../badge/badge.js';

/**
 * Configuration for a single badge rendered by `<obc-tab-item>` via the `badges` property.
 */
export interface TabItemBadge {
  /** Visual style/type of the badge. See `BadgeType` for available options. */
  type: BadgeType;
  /** Size of the badge. See `BadgeSize` for available options. */
  size: BadgeSize;
  /** The numeric value to display in the badge. */
  count?: number;
  /** Whether to show an icon inside the badge. Default: false. */
  showIcon?: boolean;
  /**
   * When set, a `<slot>` with this name is rendered inside the badge so a custom
   * icon can be projected (used for badge types without a built-in icon).
   */
  iconSlotName?: string;
}

/**
 * `<obc-tab-item>` – A selectable tab component for navigation menus and tabbed interfaces.
 *
 * Represents a single tab within a tab bar or navigation group, supporting optional icons, subtitles, badges, close actions, and various layout modes. Designed for use in horizontal or vertical tab sets, allowing users to switch between different views or content panels.
 *
 * Appears as a button-like element that can display a leading icon, a title, an optional subtitle, a badge (for counts or status), and an optional close button. Supports both fixed-width and "hug" (fit-content) layouts, and can be styled as checked (active/selected) or disabled.
 *
 * ### Features
 * - **Selectable State:** Indicates active/selected tab via the `checked` property.
 * - **Leading Icon:** Optionally displays a leading icon via the `leading-icon` slot.
 * - **Title:** Supports a title label, either via property or slot.
 * - **Subtitle:** Optionally displays secondary contextual text below the title.
 * - **Badge Support:** Can show a badge (count/status) with configurable type, size, and icon.
 * - **Close Button:** Optional close action via a trailing icon button.
 * - **Layout Modes:**
 *   - **Hug:** Shrinks to fit content width (`hug` property).
 *   - **Center Content:** Centers content within the tab (`centerContent` property).
 * - **Divider:** Optional divider line for visual separation.
 * - **Disabled State:** Prevents interaction and visually indicates non-interactive state.
 * - **Keyboard Accessible:** `Enter` and `Space` activate the tab; `Delete` closes it when it has a close button.
 *
 * ### Variants and Configuration
 * - **Badge Types:** Supports all badge types from `obc-badge` (e.g., `alarm`, `warning`, `notification`, etc.).
 * - **Badge Sizes:** Regular and large badge sizes.
 * - **Badge Number Toggle:** Optionally hide the badge number via `badgeShowNumber` for status-only badges.
 * - **Show Leading Badge Icon:** Optionally display an icon within the badge.
 * - **Subtitle Toggle:** Optionally display a subtitle line using `showSubtitle`.
 *
 * ### Usage Guidelines
 * Use `obc-tab-item` within a tab bar or navigation group to represent a single selectable view or section. Ideal for switching between content panels, dashboards, or grouped settings. Use the `checked` property to indicate the active tab, and `disabled` to prevent selection. Use `subtitle` for short contextual information that helps distinguish similarly named tabs. The close button is suitable for user-removable tabs (e.g., in dynamic tab sets).
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
 * - `tab-close` – Fired when the close button is clicked, or `Delete` is pressed on the tab.
 *
 * ### Keyboard
 * One tab of the [APG Tabs pattern](https://www.w3.org/WAI/ARIA/apg/patterns/tabs/):
 * `Enter` and `Space` activate it, and `Delete` closes it when it has a close
 * button; the arrow keys, `Home` and `End` belong to the row. `aria-selected`
 * mirrors `checked`, and `panel` becomes the tab's `aria-controls`. The close
 * button stays out of the tab sequence so the row keeps one tab stop, and the
 * tab announces `Delete` as its shortcut instead.
 *
 * **TODO(designer):** Nothing on screen tells a sighted keyboard user that
 * `Delete` closes the focused tab; the shortcut is announced to screen readers
 * only. A visible cue needs a design.
 *
 * Left out: nothing the tab itself owns; the row lists what it leaves out.
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
 *   show-subtitle
 *   subtitle="Context"
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
 * @property hug - Shrinks the tab width to fit its content instead of using the default fixed width.
 *   When enabled, the tab will use `width: fit-content` and a minimum width.
 * @property centerContent - Centers the content (icon, title, badge) horizontally within the tab.
 *   When enabled, content is centered rather than left-aligned.
 * @property checked - Marks the tab as selected/active.
 *   Only one tab in a group should have `checked` set to true.
 * @property hasClose - Displays a close button at the end of the tab.
 *   Use for tabs that can be removed by the user.
 * @property hasLeadingIcon - Shows a leading icon at the start of the tab.
 *   Supply icon content via the `leading-icon` slot.
 * @property hasTitle - Displays the tab's title/label.
 *   Content can be provided via the `title` slot or the `title` property.
 * @property hasDivider - Shows a vertical divider on the left edge of the tab (except when checked).
 *   Useful for visually separating tabs.
 * @availableWhen hasDivider checked==false
 * @property icon - (Deprecated/Unused) Icon name for the tab.
 *   Icon content should be provided via the `leading-icon` slot.
 * @property title - The tab's title/label text.
 *   Can be overridden by slotting content into the `title` slot.
 * @property showSubtitle - Shows contextual text below the tab title.
 * @property subtitle - Contextual text shown below the tab title when `showSubtitle` is true.
 * @property disabled - Disables the tab, preventing user interaction and applying disabled styles.
 * @property panel - The panel this tab shows, announced as the tab's `aria-controls`. `obc-tab-row`
 *   sets it when it renders panels; the panel has to live in this tab's tree or one it sits inside.
 * @property focusable - Whether the tab is in the tab order. `obc-tab-row` manages this as a
 *   roving tabindex (one tab focusable at a time); a standalone tab stays tabbable.
 * @property badges - Badges shown on the tab. A non-empty array takes precedence over the
 *   deprecated single-badge properties (`hasBadge`, `badgeType`, `badgeSize`,
 *   `badgeCount`, `badgeShowNumber`, `showLeadingBadgeIcon`); an empty one
 *   falls back to them, gated by `hasBadge`.
 * @slot leading-icon - Slot for the leading icon (shown when `hasLeadingIcon` is true)
 * @slot title - Slot for the tab's label/title (shown when `hasTitle` is true)
 * @slot badge-icon - Slot for an icon inside the badge (shown when `hasBadge` and `showLeadingBadgeIcon` are true)
 * @fires {CustomEvent<{title: string}>} tab-click - When the tab is clicked or activated via keyboard
 * @fires {CustomEvent<{title: string}>} tab-close - When the close button is clicked
 * @stable
 */
@customElement('obc-tab-item')
export class ObcTabItem extends LitElement {
  @property({type: Boolean, reflect: true}) hug = false;

  @property({type: Boolean}) centerContent = false;

  @property({type: Boolean, reflect: true}) checked = false;

  @property({type: Boolean, attribute: 'has-close'}) hasClose = false;

  @property({type: Boolean, attribute: 'has-leading-icon'}) hasLeadingIcon =
    false;

  @property({type: Boolean, attribute: 'has-title'}) hasTitle = false;

  @property({type: Boolean, attribute: 'has-divider'}) hasDivider = false;

  @property({type: Array, attribute: false}) badges: TabItemBadge[] = [];

  /**
   * @deprecated Use the `badges` array instead.
   *
   * Displays a badge (count/status) on the tab.
   * Configure badge appearance via `badgeCount`, `badgeType`, `badgeSize`, etc.
   *
   * Default: false
   */
  @property({type: Boolean, attribute: 'has-badge'}) hasBadge = false;

  @property({type: String}) icon = 'placeholder';

  @property({type: String}) override title = 'Tab title';

  @property({type: Boolean, attribute: 'show-subtitle'}) showSubtitle = false;

  @property({type: String}) subtitle = '';

  @property({type: Boolean}) disabled = false;

  @property({type: Boolean, attribute: false}) focusable = true;

  @property({attribute: false}) panel: Element | null = null;

  /**
   * @deprecated Use the `badges` array instead.
   *
   * Type of badge to display (e.g., 'regular', 'alarm', 'warning', etc.).
   * See `BadgeType` enum for available options.
   *
   * Default: 'regular'
   * @availableWhen hasBadge==true
   */
  @property({type: String}) badgeType: string = BadgeType.regular;

  /**
   * @deprecated Use the `badges` array instead.
   *
   * Size of the badge ('regular' or 'large').
   * See `BadgeSize` enum for available options.
   *
   * Default: 'regular'
   * @availableWhen hasBadge==true
   */
  @property({type: String}) badgeSize: string = BadgeSize.regular;

  /**
   * @deprecated Use the `badges` array instead.
   *
   * Shows the badge's numeric value. When false, only the badge background is rendered (for status-only badges).
   *
   * Default: true
   * @availableWhen hasBadge==true
   */
  @property({type: Boolean, attribute: false}) badgeShowNumber: boolean = true;

  /**
   * @deprecated Use the `badges` array instead.
   *
   * The numeric value to display in the badge (e.g., count of notifications).
   *
   * Default: 0
   * @availableWhen hasBadge==true
   */
  @property({type: Number}) badgeCount = 0;

  /**
   * @deprecated Use the `badges` array instead.
   *
   * Shows an icon inside the badge.
   * Supply icon content via the `badge-icon` slot.
   *
   * Default: false
   * @availableWhen hasBadge==true
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

  /** Focus lands on the `role="tab"` control, not on the host. */
  public override focus(options?: FocusOptions): void {
    (this.shadowRoot?.querySelector('.wrapper') as HTMLElement | null)?.focus(
      options
    );
  }

  private handleKeyDown(event: KeyboardEvent) {
    // Keys on the close button are its own: Enter there closes the tab.
    const closeButton = this.shadowRoot?.querySelector('.close-button');
    if (closeButton && event.composedPath().includes(closeButton)) return;
    if (event.key === 'Delete') {
      if (this.hasClose && !this.disabled) {
        event.preventDefault();
        this.handleClose(event);
      }
      return;
    }
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.handleClick(event);
    }
  }

  override updated(changed: PropertyValues<this>) {
    if (changed.has('panel')) {
      const tab = this.shadowRoot?.querySelector<HTMLElement>('[role="tab"]');
      if (tab) tab.ariaControlsElements = this.panel ? [this.panel] : null;
    }
  }

  private get effectiveBadges(): TabItemBadge[] {
    if (this.badges.length > 0) {
      return this.badges;
    }
    if (!this.hasBadge) {
      return [];
    }
    return [
      {
        type: (this.badgeType as BadgeType) || BadgeType.regular,
        size: (this.badgeSize as BadgeSize) || BadgeSize.regular,
        count: this.badgeShowNumber ? this.badgeCount : undefined,
        showIcon: this.showLeadingBadgeIcon,
        iconSlotName: this.showLeadingBadgeIcon ? 'badge-icon' : undefined,
      },
    ];
  }

  private renderBadge(badge: TabItemBadge) {
    return html`
      <obc-badge
        class="badge"
        .number=${badge.count ?? 0}
        .type=${badge.type || BadgeType.regular}
        .size=${badge.size || BadgeSize.regular}
        .showNumber=${badge.count !== undefined}
        .showIcon=${badge.showIcon ?? false}
      >
        ${
          badge.iconSlotName
            ? html`<slot name=${badge.iconSlotName} slot="badge-icon"></slot>`
            : nothing
        }
      </obc-badge>
    `;
  }

  override render() {
    const badges = this.effectiveBadges;
    const hasBadge = badges.length > 0;
    const wrapperClasses = {
      wrapper: true,
      hug: this.hug,
      'has-close': this.hasClose,
      'has-leading-icon': this.hasLeadingIcon,
      'has-title': this.hasTitle,
      'has-divider': this.hasDivider && !this.checked,
      'has-badge': hasBadge,
      'has-subtitle': this.showSubtitle,
      disabled: this.disabled,
      'center-content': this.centerContent,
    };

    return html`
      <div
        class=${classMap(wrapperClasses)}
        role="tab"
        aria-selected=${this.checked}
        aria-disabled=${ifDefined(this.disabled ? 'true' : undefined)}
        aria-keyshortcuts=${ifDefined(
          this.hasClose && !this.disabled ? 'Delete' : undefined
        )}
        tabindex=${this.disabled ? -1 : this.focusable ? 0 : -1}
        @click=${this.handleClick}
        @keydown=${this.handleKeyDown}
      >
        <div class="content">
          ${
            this.hasLeadingIcon
              ? html`
                  <div class="leading-icon">
                    <slot name="leading-icon"></slot>
                  </div>
                `
              : nothing
          }
          ${
            this.hasTitle
              ? html`
                  <div class="text-content">
                    <div class="title">
                      <slot name="title">${this.title}</slot>
                    </div>
                    ${
                      this.showSubtitle && this.subtitle
                        ? html`<div class="subtitle">${this.subtitle}</div>`
                        : nothing
                    }
                  </div>
                `
              : nothing
          }
          ${
            this.centerContent && hasBadge
              ? html`<div class="badges">
                  ${badges.map((badge) => this.renderBadge(badge))}
                </div>`
              : nothing
          }
        </div>
        ${
          !this.centerContent && hasBadge
            ? html`<div class="badges">
                ${badges.map((badge) => this.renderBadge(badge))}
              </div>`
            : nothing
        }
        ${
          this.hasClose
            ? html`
                <obc-icon-button
                  class="close-button"
                  variant="flat"
                  @click=${this.handleClose}
                  aria-label="Close tab"
                  .focusable=${false}
                  .disabled=${this.disabled}
                  ><obi-close-google></obi-close-google
                ></obc-icon-button>
              `
            : nothing
        }
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
