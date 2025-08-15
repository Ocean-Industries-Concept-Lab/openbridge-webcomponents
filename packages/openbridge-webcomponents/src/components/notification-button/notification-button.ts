import {LitElement, html, nothing, unsafeCSS} from 'lit';
import {property} from 'lit/decorators.js';
import {classMap} from 'lit/directives/class-map.js';
import componentStyle from './notification-button.css?inline';
import {customElement} from '../../decorator.js';
import '../../icons/icon-notification.js';
import '../../icons/icon-notification-filled.js';

/**
 * Defines the available visual styles for `<obc-notification-button>`.
 *
 * - `Flat`: Minimal, icon-only style. Counter is not shown, regardless of `count` or `showCount`.
 * - `Normal`: Standard notification button with optional counter badge. Requires `isActive` to be true to apply.
 * - `Enhanced`: Emphasized notification button with distinct background and counter styling. Requires `isActive` to be true to apply.
 *
 * The style affects both the button's appearance and whether the notification count is displayed.
 */
export enum NotificationButtonStyle {
  Flat = 'flat',
  Normal = 'normal',
  Enhanced = 'enhanced',
}

/**
 * Payload for the `obc-click` event dispatched by `<obc-notification-button>`.
 *
 * - `count`: The current notification count.
 * - `isActive`: The new active state after the button is clicked.
 */
export interface NotificationButtonClickEvent {
  count: number;
  isActive: boolean;
}

/**
 * `<obc-notification-button>` – Icon button for accessing notifications, optionally displaying a counter badge.
 *
 * This component provides a compact, interactive button for surfacing notification status and counts. It supports several visual styles to adapt to different UI contexts, and can display a badge with the number of unread notifications when appropriate.
 *
 * Appears as an icon-only button by default, with optional counter and active state styling. Designed for use in toolbars, headers, or anywhere a notification indicator is needed.
 *
 * ## Features
 * - **Visual Styles:**
 *   - **Flat:** Minimal icon-only button. Counter is never shown, regardless of `count` or `showCount`.
 *   - **Normal:** Standard notification button. Counter badge appears if `showCount` is true and `isActive` is true.
 *   - **Enhanced:** Emphasized style with background and accent color. Counter badge appears if `showCount` is true and `isActive` is true.
 * - **Active State:**
 *   - When `isActive` is true, the button uses the filled notification icon and applies the selected style (`Normal` or `Enhanced`).
 *   - When inactive, the button uses the outlined notification icon and always appears in `Flat` style.
 * - **Notification Counter:**
 *   - Shows a badge with the current `count` if `showCount` is true and style is `Normal` or `Enhanced` and `isActive` is true.
 *   - Counter is hidden in `Flat` style, even if `showCount` is true.
 * - **Custom Icon Support:**
 *   - Developers can supply a custom icon via the `icon` slot. Defaults to notification icons if slot is empty.
 * - **Accessibility:**
 *   - Uses `aria-label` for screen readers, including the count if visible.
 *   - `aria-pressed` reflects the active state.
 *
 * ## Usage Guidelines
 * Use `<obc-notification-button>` to provide a prominent, interactive entry point for notifications in an application. It is ideal for header bars, navigation panels, or any location where users need to be alerted to new activity or messages.
 *
 * - Use the `Flat` style for minimal, unobtrusive notification indicators.
 * - Use `Normal` or `Enhanced` styles when you want to emphasize the presence of new notifications, especially when the button is active.
 * - Show the counter badge only when it is important to indicate the number of unread notifications; otherwise, keep it hidden for a cleaner look.
 * - The button does not manage notification state internally; it is up to the parent application to update `count` and `isActive` as needed.
 *
 * **TODO(designer):** Clarify recommended scenarios for using `Normal` vs. `Enhanced` styles, and any design guidelines for when to show the counter.
 *
 * ## Slots
 *
 * | Slot Name | Renders When... | Purpose |
 * |-----------|----------------|---------|
 * | `icon`    | Always (optional) | Custom icon to display instead of the default notification icon. |
 *
 * ## Events
 * - `obc-click` – Fired when the button is clicked. Event detail includes the current `count` and the new `isActive` state.
 *
 * ## Example
 *
 * ```html
 * <obc-notification-button
 *   buttonStyle="normal"
 *   count="5"
 *   showCount
 *   isActive
 *   ariaLabel="Notifications"
 * ></obc-notification-button>
 * ```
 *
 * In this example, the button appears in the normal style, is active, and displays a counter badge with the value 5.
 *
 * @slot icon - Custom icon to display in place of the default notification icon.
 * @fires obc-click {CustomEvent<NotificationButtonClickEvent>} Fired when the button is clicked, with the current count and new active state.
 */
@customElement('obc-notification-button')
export class ObcNotificationButton extends LitElement {
  /**
   * Visual style of the notification button.
   *
   * - `flat`: Minimal icon-only style. Counter is never shown.
   * - `normal`: Standard notification button. Counter badge appears if `showCount` is true and `isActive` is true.
   * - `enhanced`: Emphasized style with background and accent color. Counter badge appears if `showCount` is true and `isActive` is true.
   *
   * Defaults to `flat`.
   */
  @property({type: String}) buttonStyle: NotificationButtonStyle =
    NotificationButtonStyle.Flat;

  /**
   * Number of notifications to display in the counter badge.
   *
   * Only shown if `showCount` is true, `isActive` is true, and `buttonStyle` is `normal` or `enhanced`.
   * Ignored in `flat` style.
   *
   * Defaults to 0.
   */
  @property({type: Number}) count = 0;

  /**
   * Whether to display the notification count badge.
   *
   * If true, and the style is `normal` or `enhanced` and `isActive` is true, the counter badge is shown.
   * Has no effect in `flat` style.
   *
   * Defaults to false.
   */
  @property({type: Boolean}) showCount = false;

  /**
   * Whether the button is in the active (selected) state.
   *
   * When true, the button uses the filled notification icon and applies the selected style (`normal` or `enhanced`).
   * When false, the button always appears in `flat` style with the outlined icon.
   *
   * Defaults to false.
   */
  @property({type: Boolean}) isActive = false;

  /**
   * Accessibility label for the button.
   *
   * Used as the `aria-label` attribute for screen readers. If the counter is visible, the label will include the count (e.g., "Notifications, 5 new").
   *
   * Defaults to "Notifications".
   */
  @property({type: String}) override ariaLabel = 'Notifications';

  override render() {
    const useNormal =
      this.isActive && this.buttonStyle === NotificationButtonStyle.Normal;
    const useEnhanced =
      this.isActive && this.buttonStyle === NotificationButtonStyle.Enhanced;
    const useFlat =
      this.buttonStyle === NotificationButtonStyle.Flat ||
      (!useNormal && !useEnhanced);

    const hasCounter = (useNormal || useEnhanced) && this.showCount;

    const wrapperClasses = {
      wrapper: true,
      'is-active': this.isActive,
      'has-counter': hasCounter,
      flat: useFlat,
      normal: useNormal,
      enhanced: useEnhanced,
    };

    const visibleWrapperClasses = {
      'visible-wrapper': true,
    };

    return html`
      <button
        class="${classMap(wrapperClasses)}"
        @click="${this.handleClick}"
        aria-label="${this.ariaLabel}${hasCounter ? `, ${this.count} new` : ''}"
        aria-pressed="${this.isActive}"
        role="button"
        type="button"
      >
        <div class="${classMap(visibleWrapperClasses)}">
          <div class="icon-container">
            <slot name="icon"> ${this.renderDefaultIcon()} </slot>
          </div>
          ${hasCounter
            ? html` <span class="count-label">${this.count}</span> `
            : nothing}
        </div>
      </button>
    `;
  }

  private renderDefaultIcon() {
    if (this.isActive) {
      return html`<obi-notification-filled></obi-notification-filled>`;
    }
    return html`<obi-notification></obi-notification>`;
  }

  /**
   * Handles click events on the button and dispatches the `obc-click` custom event.
   *
   * @fires obc-click {CustomEvent<NotificationButtonClickEvent>} Fired with the current count and new active state.
   */
  private handleClick() {
    const event = new CustomEvent<NotificationButtonClickEvent>('obc-click', {
      detail: {
        count: this.count,
        isActive: !this.isActive,
      },
      composed: true,
      bubbles: true,
    });

    this.dispatchEvent(event);
  }

  static override styles = unsafeCSS(componentStyle);
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-notification-button': ObcNotificationButton;
  }
}
