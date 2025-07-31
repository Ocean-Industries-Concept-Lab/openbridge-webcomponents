import {LitElement, html, nothing, unsafeCSS} from 'lit';
import {property} from 'lit/decorators.js';
import compentStyle from './badge.css?inline';
import {classMap} from 'lit/directives/class-map.js';
import {customElement} from '../../decorator.js';
import '../../icons/icon-alarm-badge.js';
import '../../icons/icon-warning-badge.js';
import '../../icons/icon-caution-badge.js';
import '../../icons/icon-running-color-iec.js';

/**
 * `BadgeSize` – Enum for badge size options.
 *
 * - `regular`: Standard badge size.
 * - `large`: Larger badge size for increased prominence.
 */
export enum BadgeSize {
  regular = 'regular',
  large = 'large',
}

/**
 * `BadgeType` – Enum for badge visual types.
 *
 * - `alarm`: Indicates a critical or urgent state.
 * - `warning`: Indicates a warning or cautionary state.
 * - `caution`: Indicates a less severe caution.
 * - `running`: Indicates an active or running state.
 * - `notification`: Used for general notifications.
 * - `enhance`: Used for enhanced or secondary notifications.
 * - `regular`: Default badge style.
 * - `empty`: Minimal badge with no icon or number.
 * - `automation`: Used for automation-related status.
 * - `outline`: Outline-only style for flat variant.
 */
export enum BadgeType {
  alarm = 'alarm',
  warning = 'warning',
  caution = 'caution',
  running = 'running',
  notification = 'notification',
  enhance = 'enhance',
  regular = 'regular',
  empty = 'empty',
  automation = 'automation',
  outline = 'outline',
}

/**
 * `BadgeVariant` – Enum for badge visual variants.
 *
 * - `default`: Standard filled badge.
 * - `flat`: Flat badge with minimal background and outline.
 */
export enum BadgeVariant {
  default = 'default',
  flat = 'flat',
}

/**
 * `<obc-badge>` – A compact visual indicator for status, alerts, or notifications, optionally displaying a number and/or icon.
 *
 * Badges are used to draw attention to status changes, counts, or important information in a concise format. They can represent alert states (such as alarm, warning, or running), notification counts, or other contextual statuses. The badge adapts its appearance based on type, size, and variant, and can display an icon, a number, or both.
 *
 * ---
 *
 * ### Features
 * - **Type options:** Supports multiple visual types:
 *   - `regular`: Default neutral badge.
 *   - `alarm`: Highlights critical or urgent states.
 *   - `warning`: Indicates caution or warning.
 *   - `caution`: Used for less severe caution.
 *   - `running`: Represents active or running states.
 *   - `notification`: For general notifications.
 *   - `enhance`: For secondary notifications or emphasis.
 *   - `automation`: For automation-related status.
 *   - `outline`: Outline-only style (flat variant only).
 *   - `empty`: Minimal badge with no icon or number.
 * - **Size options:** `regular` (default) and `large` for increased visibility.
 * - **Variants:**
 *   - `default`: Filled background and border.
 *   - `flat`: Minimal background, outline, and lighter appearance.
 * - **Icon support:** Can display a contextual icon (built-in for alarm, warning, caution, running; custom via slot for others).
 * - **Number display:** Optionally shows a number (e.g., count of notifications).
 * - **Hide number:** Can suppress the number for a purely symbolic badge.
 * - **Custom icon slot:** For types without a built-in icon, developers can provide a custom icon using the `badge-icon` slot.
 * - **Responsive layout:** Adjusts size and spacing based on the `size` property.
 *
 * ---
 *
 * ### Usage Guidelines
 * - Use `obc-badge` to highlight status, counts, or alerts in a compact form, such as notification indicators, unread message counts, or system status.
 * - Choose the `type` that matches the semantic meaning (e.g., `alarm` for critical, `warning` for caution, `running` for active).
 * - Use the `number` property to show counts; set `hideNumber` to true for symbolic-only badges.
 * - Use the `flat` variant for less prominent or secondary contexts.
 * - For custom icons, provide an icon element in the `badge-icon` slot.
 * - Avoid using badges for persistent or detailed information; they are intended for brief, glanceable status.
 * - **TODO(designer):** Confirm recommended use cases for `enhance`, `automation`, and `outline` types, and clarify when to use `empty` type versus hiding the badge entirely.
 *
 * ---
 *
 * ### Slots
 *
 * | Slot Name     | Renders When...                | Purpose                                             |
 * |---------------|-------------------------------|-----------------------------------------------------|
 * | `badge-icon`  | `showIcon` is true and `type` is not one of `alarm`, `warning`, `caution`, `running` | Custom icon for the badge (e.g., `<obi-placeholder>`). |
 *
 * ---
 *
 * ### Properties and Attributes
 * - `number` (number): The numeric value to display in the badge. Defaults to 0.
 * - `hideNumber` (boolean): If true, the number is hidden and only the icon (if any) is shown.
 * - `type` (string): Visual style of the badge. See **Type options** above for possible values. Defaults to `regular`.
 * - `size` (string): Badge size, either `regular` (default) or `large`.
 * - `variant` (string): Visual variant, either `default` (filled) or `flat` (minimal). Defaults to `default`.
 * - `showIcon` (boolean): If true, displays an icon appropriate to the badge type. For custom types, supply an icon in the `badge-icon` slot.
 *
 * ---
 *
 * ### Best Practices and Constraints
 * - Use badge types consistently to communicate status meaningfully.
 * - For accessibility, ensure the badge's meaning is also conveyed via text or ARIA attributes if used as a status indicator.
 * - Avoid overloading the badge with large numbers or excessive detail; keep content concise.
 * - The `empty` type is intended for minimal presence—use when a placeholder badge is needed without icon or number.
 * - For custom icons, use OpenBridge icon elements such as `<obi-placeholder>` in the `badge-icon` slot.
 * - The badge does not emit any custom events.
 *
 * ---
 *
 * ### Example
 *
 * ```html
 * <obc-badge type="alarm" number="3" showIcon>
 *   <!-- For custom types, provide an icon: -->
 *   <obi-placeholder slot="badge-icon"></obi-placeholder>
 * </obc-badge>
 * ```
 *
 * In this example, the badge displays an alarm icon and the number 3.
 *
 * @slot badge-icon - Custom icon slot for badge types that do not have a built-in icon (e.g., notification, enhance, automation, outline, or custom types).
 */
@customElement('obc-badge')
export class ObcBadge extends LitElement {
  /**
   * The number to display in the badge. Set to 0 for no count.
   *
   * If `hideNumber` is true, the number is not shown.
   */
  @property({type: Number}) number = 0;

  /**
   * Hides the number in the badge when true.
   *
   * Use this for symbolic or icon-only badges.
   */
  @property({type: Boolean}) hideNumber = false;

  /**
   * Visual style/type of the badge.
   *
   * Possible values: `regular`, `alarm`, `warning`, `caution`, `running`, `notification`, `enhance`, `automation`, `outline`, `empty`.
   *
   * Defaults to `regular`.
   */
  @property({type: String}) type: string = BadgeType.regular;

  /**
   * Badge size.
   *
   * Possible values: `regular` (default), `large`.
   */
  @property({type: String}) size: string = BadgeSize.regular;

  /**
   * Badge variant.
   *
   * - `default`: Filled background and border (default).
   * - `flat`: Minimal background and outline.
   */
  @property({type: String}) variant: BadgeVariant = BadgeVariant.default;

  /**
   * Whether to show an icon in the badge.
   *
   * For built-in types (`alarm`, `warning`, `caution`, `running`), a contextual icon is shown automatically.
   * For other types, provide a custom icon in the `badge-icon` slot.
   */
  @property({type: Boolean}) showIcon = false;

  private get effectiveType(): string {
    if (!this.showIcon && this.hideNumber) {
      return BadgeType.empty;
    }
    return this.type;
  }

  private renderIcon() {
    const isFlat = this.variant === BadgeVariant.flat;
    switch (this.type) {
      case BadgeType.alarm:
        return html`
          <svg width="100%" height="100%" viewBox="0 0 12 12" fill="none">
            <path
              d="M5.29694 1.72622L1.05702 9.32693C0.838739 9.71823 0.729598 9.91388 0.748108 10.0741C0.764257 10.2138 0.83853 10.3403 0.952704 10.4225C1.08357 10.5167 1.3076 10.5167 1.75567 10.5167H10.233C10.6809 10.5167 10.9049 10.5167 11.0357 10.4225C11.1499 10.3403 11.2242 10.2139 11.2404 10.0741C11.2589 9.914 11.1498 9.71837 10.9317 9.3271L6.69433 1.7264C6.46616 1.31712 6.35207 1.11247 6.20181 1.04447C6.07082 0.985194 5.92064 0.985175 5.78964 1.04442C5.63936 1.11238 5.52522 1.317 5.29694 1.72622Z"
              fill=${isFlat ? 'var(--alert-alarm-color)' : 'currentColor'}
            />
          </svg>
        `;
      case BadgeType.warning:
        return html`
          <svg width="100%" height="100%" viewBox="0 0 12 12" fill="none">
            <circle
              cx="6"
              cy="6"
              r="4.5"
              fill=${isFlat ? 'var(--alert-warning-color)' : 'currentColor'}
              stroke=${isFlat
                ? 'var(--alert-warning-outline-color)'
                : 'currentColor'}
            />
          </svg>
        `;
      case BadgeType.caution:
        return html`
          <svg width="100%" height="100%" viewBox="0 0 12 12" fill="none">
            <path
              d="M2.2998 2H9.7002C9.848 2 9.92907 2.00015 9.9873 2.00488C9.98955 2.00507 9.99213 2.0047 9.99414 2.00488C9.99436 2.0072 9.9949 2.01006 9.99512 2.0127C9.99985 2.07093 10 2.152 10 2.2998V9.7002C10 9.848 9.99985 9.92907 9.99512 9.9873C9.99493 9.98958 9.99433 9.9921 9.99414 9.99414C9.9921 9.99433 9.98958 9.99493 9.9873 9.99512C9.92907 9.99985 9.848 10 9.7002 10H2.2998C2.152 10 2.07093 9.99985 2.0127 9.99512C2.01006 9.9949 2.0072 9.99436 2.00488 9.99414C2.0047 9.99213 2.00507 9.98955 2.00488 9.9873C2.00015 9.92907 2 9.848 2 9.7002V2.2998L2.00488 2.0127C2.0051 2.01009 2.00467 2.00718 2.00488 2.00488C2.00718 2.00467 2.01009 2.0051 2.0127 2.00488L2.2998 2Z"
              fill=${isFlat ? 'var(--alert-caution-color)' : 'currentColor'}
              stroke=${isFlat
                ? 'var(--alert-caution-outline-color)'
                : 'currentColor'}
            />
          </svg>
        `;
      case BadgeType.running:
        return html`
          <svg width="100%" height="100%" viewBox="0 0 12 12" fill="none">
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M11 6C11 8.76142 8.76142 11 6 11C3.23858 11 1 8.76142 1 6C1 3.23858 3.23858 1 6 1C8.76142 1 11 3.23858 11 6ZM2.89624 6.10353L3.60335 5.39642L5.24979 7.04287L8.39624 3.89642L9.10335 4.60353L5.24979 8.45708L2.89624 6.10353Z"
              fill=${isFlat ? 'var(--alert-running-color)' : 'currentColor'}
            />
          </svg>
        `;
      default:
        return html`<slot class="badge-icon" name="badge-icon"></slot>`;
    }
  }

  override render() {
    const isFlat = this.variant === BadgeVariant.flat;
    return html`
      <div
        class=${classMap({
          wrapper: true,
          ['size-' + this.size]: true,
          ['type-' + this.effectiveType]: !isFlat,
          ['variant-flat']: isFlat,
          hideNumber: this.hideNumber,
        })}
      >
        ${this.effectiveType !== BadgeType.empty
          ? html`
              ${this.showIcon
                ? html`
                    <div
                      class=${classMap({
                        icon: true,
                        ['type-' + this.type]: isFlat,
                      })}
                    >
                      ${this.renderIcon()}
                    </div>
                  `
                : nothing}
              ${!this.hideNumber
                ? html`<div class="number">
                    <span class="number-text">${this.number}</span>
                  </div>`
                : ''}
            `
          : ''}
      </div>
    `;
  }

  static override styles = unsafeCSS(compentStyle);
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-badge': ObcBadge;
  }
}
