import {LitElement, html, nothing, unsafeCSS} from 'lit';
import {property} from 'lit/decorators.js';
import {choose} from 'lit/directives/choose.js';

import compentStyle from './alert-menu-item.css?inline';
import '../message-menu-item/message-menu-item.js';
import '../alert-icon/alert-icon.js';
import '../../icons/icon-alerts-shelf.js';
import '../../icons/icon-alarm-noack-iec.js';
import '../../icons/icon-warning-noack-iec.js';
import {ObcMessageMenuItemSize} from '../message-menu-item/message-menu-item.js';
import {customElement} from '../../decorator.js';

export enum ObcAlertMenuItemStatus {
  Unacknowledged = 'unacknowledged',
  Caution = 'caution',
  Acknowledged = 'acknowledged',
  NoAckAlarm = 'no-ack-alarm',
  NoAckWarning = 'no-ack-warning',
  Rectified = 'rectified',
}

/**
 * `<obc-alert-menu-item>` – A list item component for displaying alert or notification entries with status, icons, and action controls.
 *
 * Presents a concise summary of an alert or message, including status, title, description, and optional icons. Designed for use in alert menus, notification drawers, or similar lists where users need to review and acknowledge alerts efficiently.
 *
 * ### Features
 * - **Status Variants:** Supports multiple alert states via the `status` property:
 *   - **Unacknowledged:** Shows an action button (ACK) for user acknowledgment.
 *   - **Caution, Acknowledged, Rectified:** Display different visual cues for alert progression.
 *   - **NoAckAlarm / NoAckWarning:** Show special icons indicating unacknowledged alarms or warnings.
 * - **Icon Support:** Optional secondary icon (e.g., system or source) and a primary alert icon. Tertiary "shelved" icon appears if the alert is shelved.
 * - **Time and Day Display:** Optionally shows day and/or time for the alert occurrence.
 * - **Expandable:** Can be toggled open/closed for additional details (via click).
 * - **Action Button:** Displays an "ACK" button for unacknowledged alerts; triggers an event when clicked.
 * - **Animated Intro:** Optional animation when the item appears.
 * - **Size Options:** Supports single-line or multi-line layouts (see `size` property).
 *
 * ### Usage Guidelines
 * Use `obc-alert-menu-item` to represent individual alerts or notifications in a menu, list, or notification center. Ideal for scenarios where users need to quickly scan, identify, and acknowledge alerts. The component is best suited for transient or actionable notifications rather than persistent banners.
 *
 * - Use the `status` property to reflect the current state of the alert.
 * - Provide a relevant icon in the `alert-icon` slot to visually indicate the alert type.
 * - Use the `icon` slot for a source/system icon if needed.
 * - Only show the "ACK" action for alerts that require acknowledgment (`status="unacknowledged"`).
 * - Use the `shelved` property to indicate alerts that are temporarily deferred.
 *
 * **TODO(designer):** Clarify recommended usage for each status variant and when to use "shelved" vs. other states.
 *
 * ### Slots
 * | Slot Name     | Renders When...                | Purpose                                              |
 * |---------------|-------------------------------|------------------------------------------------------|
 * | alert-icon    | Always                        | Main alert icon representing the alert type.         |
 * | icon          | If `hasIcon` is true          | Secondary icon (e.g., system/source of alert).       |
 * | title         | Always                        | Title or summary of the alert.                       |
 * | description   | Always                        | Detailed description of the alert.                   |
 * | day           | If `hasDay` is true           | Day label for the alert occurrence.                  |
 * | time          | If `hasTime` is true          | Time label for the alert occurrence.                 |
 * | action-label  | If `status="unacknowledged"`  | Label for the action button ("ACK").                 |
 * | action-icon   | For "no-ack-alarm"/"warning"  | Special icon for unacknowledged alarm/warning.       |
 * | tertiary-icon | If `shelved` is true          | Shelved indicator icon.                              |
 *
 * ### Events
 * - **ack-click** – Fired when the ACK action button is clicked.
 * - **item-click** – Fired when the alert menu item is clicked (toggles open/closed).
 *
 * ### Best Practices
 * - Only display the ACK action for alerts that require acknowledgment.
 * - Use concise titles and descriptions for quick scanning.
 * - For grouped alerts, ensure each item has a unique status and icon as appropriate.
 * - Avoid overloading with too many icons; use secondary and tertiary icons only when necessary.
 * - Follow standard notification design guidelines: keep actionable items prominent, and use color/iconography to indicate severity or status.
 *
 * **Example:**
 * ```
 * <obc-alert-menu-item status="unacknowledged" hasTime hasIcon>
 *   <obc-alert-icon slot="alert-icon" name="alarm-unack"></obc-alert-icon>
 *   <obi-engine slot="icon"></obi-engine>
 *   <span slot="title">Engine Temperature High</span>
 *   <span slot="description">Port main engine temperature exceeds normal operating range</span>
 *   <span slot="time">14:30</span>
 * </obc-alert-menu-item>
 * ```
 *
 * @slot alert-icon - The main alert icon representing the alert type.
 * @slot icon - Optional secondary icon (e.g., source/system).
 * @slot title - The alert's title or summary.
 * @slot description - Detailed alert description.
 * @slot day - Day label (if `hasDay` is true).
 * @slot time - Time label (if `hasTime` is true).
 * @slot action-label - Label for the action button (shown for unacknowledged status).
 * @slot action-icon - Special icon for no-ack alarm/warning status.
 * @slot tertiary-icon - Shelved indicator icon (if `shelved` is true).
 *
 * @fires ack-click {CustomEvent<void>} Fired when the ACK action button is clicked.
 * @fires item-click {CustomEvent<void>} Fired when the alert menu item is clicked.
 */
@customElement('obc-alert-menu-item')
export class ObcAlertMenuItem extends LitElement {
  /**
   * Whether to display a secondary icon (e.g., system/source) in the item.
   * When true, the `icon` slot is rendered.
   */
  @property({type: Boolean}) hasIcon = false;

  /**
   * Indicates if the alert is shelved (temporarily deferred).
   * When true, a tertiary icon is shown to represent the shelved state.
   */
  @property({type: Boolean, reflect: true}) shelved = false;

  /**
   * Whether to display the day label for the alert.
   * When true, the `day` slot is rendered.
   */
  @property({type: Boolean}) hasDay = false;

  /**
   * Whether to display the time label for the alert.
   * When true, the `time` slot is rendered.
   */
  @property({type: Boolean}) hasTime = false;

  /**
   * The current status of the alert item.
   * Determines visual style, icon, and action button visibility.
   * Possible values: 'unacknowledged', 'caution', 'acknowledged', 'no-ack-alarm', 'no-ack-warning', 'rectified'.
   * Default is 'unacknowledged'.
   */
  @property({type: String, reflect: true}) status =
    ObcAlertMenuItemStatus.Unacknowledged;

  /**
   * Whether the item is expanded/open to show additional details.
   * Toggled by clicking the item.
   */
  @property({type: Boolean}) open = false;

  /**
   * Layout size of the menu item.
   * Controls whether content is single-line or multi-line.
   * Possible values: 'single-line', 'multi-line'.
   * Default is 'single-line'.
   */
  @property({type: String}) size: ObcMessageMenuItemSize =
    ObcMessageMenuItemSize.SingleLine;

  /**
   * Whether to animate the item's appearance (intro animation).
   */
  @property({type: Boolean}) animateIntro = false;

  private handleMessageClick() {
    this.dispatchEvent(new CustomEvent('item-click'));
    this.open = !this.open;
  }

  private handleActionClick() {
    this.dispatchEvent(new CustomEvent('ack-click'));
  }

  override render() {
    return html`
      <obc-message-menu-item
        .hasActionButton=${this.status ===
        ObcAlertMenuItemStatus.Unacknowledged}
        .size=${this.size}
        .open=${this.open}
        .hasSecondaryIcon=${this.hasIcon}
        .hasTertiaryIcon=${this.shelved}
        enhancedIcon
        @message-click=${this.handleMessageClick}
        @action-click=${this.handleActionClick}
        .animateIntro=${this.animateIntro}
        .hasDateOrTime=${this.hasDay || this.hasTime}
      >
        ${this.shelved
          ? html`<obi-alerts-shelf slot="tertiary-icon"></obi-alerts-shelf>`
          : nothing}
        <slot name="alert-icon" slot="primary-icon"></slot>
        ${this.hasIcon
          ? html`<slot name="icon" slot="secondary-icon"></slot>`
          : nothing}
        <slot name="title" slot="title"></slot>
        <slot name="description" slot="description"></slot>
        ${this.hasDay ? html`<slot name="day" slot="day"></slot>` : nothing}
        ${this.hasTime ? html`<slot name="time" slot="time"></slot>` : nothing}
        ${choose(this.status, [
          [
            ObcAlertMenuItemStatus.Unacknowledged,
            () =>
              html`<div
                slot="action-label"
                data-testid="ack-all-visible-button"
              >
                ACK
              </div>`,
          ],
          [
            ObcAlertMenuItemStatus.NoAckAlarm,
            () =>
              html`<div slot="action-icon">
                <obi-alarm-noack-iec useCssColor></obi-alarm-noack-iec>
              </div>`,
          ],
          [
            ObcAlertMenuItemStatus.NoAckWarning,
            () =>
              html`<div slot="action-icon">
                <obi-warning-noack-iec useCssColor></obi-warning-noack-iec>
              </div>`,
          ],
        ])}
      </obc-message-menu-item>
    `;
  }

  static override styles = unsafeCSS(compentStyle);
}

declare global {
  interface HTMLElementTagNameMap {
    'ob-alert-menu-item': ObcAlertMenuItem;
  }
}
