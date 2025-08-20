import {LitElement, nothing, unsafeCSS} from 'lit';
import {property} from 'lit/decorators.js';
import {classMap} from 'lit/directives/class-map.js';
import compentStyle from './user-button.css?inline';
import '../../icons/icon-user.js';
import {html, literal} from 'lit/static-html.js';
import {customElement} from '../../decorator.js';

export enum StyleType {
  flat = 'flat',
  normal = 'normal',
  selected = 'selected',
}

/**
 * Defines the visual content of the user button.
 * - `icon`: Shows a user icon (default).
 * - `initials`: Shows up to two uppercase initials.
 */
export enum Variant {
  icon = 'icon',
  initials = 'initials',
}

/**
 * `obc-user-button` – A compact, circular button for representing a user via icon or initials.
 *
 * Displays either a user icon or user initials inside a circular button, with optional label text. Commonly used for user profile access, account switching, or avatar actions in toolbars and navigation. The button supports multiple visual styles and can be rendered as a static (non-interactive) element.
 *
 * Appears as a button by default, but switches to a non-interactive div when the `static` property is set.
 *
 * ## Features
 * - **Variants:**
 *   - `icon`: Shows a user icon (default, fallback if initials are invalid or missing).
 *   - `initials`: Shows up to two uppercase initials (falls back to icon if input is empty or longer than two characters).
 * - **Style Types:**
 *   - `flat`: Minimal, flat appearance (default).
 *   - `normal`: Outlined with background and border.
 *   - `selected`: Highlighted to indicate selection or active state.
 * - **Static Mode:**
 *   - Set `static` to render as a non-interactive element for use in read-only or decorative contexts.
 * - **Disabled State:**
 *   - Set `disabled` to visually and functionally disable the button.
 * - **Custom Icon Slot:**
 *   - Provide a custom icon via the `icon` slot when using the `icon` variant.
 * - **Label Support:**
 *   - Optional `label` property displays text next to the button (not shown in static mode).
 *
 * ## Usage Guidelines
 * Use `obc-user-button` to represent a user in navigation bars, toolbars, or menus where a compact, recognizable user indicator is needed. Ideal for profile menus, account switching, or user-related quick actions.
 * - Use the `icon` variant for generic user representation, or when no initials are available.
 * - Use the `initials` variant to personalize the button with user initials (max two characters).
 * - Use `styleType="selected"` to indicate the current user or active selection.
 * - Use `static` for non-interactive displays, such as in lists or summaries.
 * - Avoid using for critical actions or as a replacement for full user profile cards.
 *
 * **TODO(designer):** Confirm if there are recommended scenarios for when to use `flat`, `normal`, or `selected` style types, and if there are accessibility guidelines for initials fallback.
 *
 * ## Slots
 *
 * | Slot Name | Renders When... | Purpose |
 * |-----------|-----------------|---------|
 * | `icon`    | `variant="icon"` | Custom icon to display instead of the default user icon. |
 *
 * ## Best Practices & Constraints
 * - Initials longer than two characters are truncated and a warning is logged.
 * - If `initials` is empty or invalid, the button falls back to the user icon.
 * - The `label` is only visible when the button is interactive (not static).
 * - For accessibility, the button uses `aria-label` based on initials or a default.
 * - Only use the `static` property for non-interactive contexts; otherwise, the button is clickable.
 *
 * ## Example:
 * ```html
 * <obc-user-button variant="initials" initials="JD" styleType="normal" label="John Doe"></obc-user-button>
 * <obc-user-button variant="icon" styleType="flat">
 *   <obi-placeholder slot="icon"></obi-placeholder>
 * </obc-user-button>
 * ```
 *
 * @slot icon - Custom icon for the user button (used only in `icon` variant; defaults to <obi-user> if not provided)
 */
@customElement('obc-user-button')
export class ObcUserButton extends LitElement {
  /**
   * Controls whether the button displays a user icon (`icon`) or user initials (`initials`).
   * - `icon`: Shows a user icon (default, or if initials are invalid).
   * - `initials`: Shows up to two uppercase initials (falls back to icon if empty or longer than two characters).
   */
  @property({type: String}) variant: Variant = Variant.icon;

  /**
   * Sets the visual style of the button.
   * - `flat`: Minimal, flat appearance (default).
   * - `normal`: Outlined with background and border.
   * - `selected`: Highlighted to indicate selection or active state.
   */
  @property({type: String}) styleType: StyleType = StyleType.flat;

  /**
   * If true, renders the button as a static (non-interactive) element using a `<div>`.
   * Use for decorative or read-only contexts where user interaction is not required.
   */
  @property({type: Boolean}) static: boolean = false;

  /**
   * Disables the button, preventing user interaction and applying a disabled style.
   */
  @property({type: Boolean}) disabled: boolean = false;

  /**
   * The initials to display when `variant="initials"`.
   * - Only the first two non-whitespace characters are used and converted to uppercase.
   * - If empty or longer than two characters, falls back to the user icon.
   */
  @property({type: String}) initials: string = '';

  /**
   * Optional label text to display next to the button (not shown in static mode).
   */
  @property({type: String}) label?: string;

  private get formattedInitials() {
    if (!this.initials) return '';

    // Remove whitespace and convert to uppercase
    const clean = this.initials.replace(/\s+/g, '').toUpperCase();

    // If longer than 2 characters, truncate to first 2
    if (clean.length > 2) {
      console.warn(`Initials "${this.initials}" are longer than 2 characters.`);
      return clean.slice(0, 2);
    }

    return clean;
  }

  private get shouldShowIcon() {
    return this.variant === Variant.icon;
  }

  override render() {
    const wrapperClasses = {
      wrapper: true,
      'wrapper-static': this.static,
      'style-flat': this.styleType === StyleType.flat,
      'style-normal': this.styleType === StyleType.normal,
      'style-selected': this.styleType === StyleType.selected,
      'mode-icon': this.shouldShowIcon,
      'mode-initials': !this.shouldShowIcon,
      'state-static': this.static,
    };

    // Use button element when clickable, div when static
    const tag = this.static ? literal`div` : literal`button`;

    const label =
      this.label && !this.static
        ? html`<span class="user-label">${this.label}</span>`
        : nothing;

    return html`
        <${tag}
          class=${classMap(wrapperClasses)}
          ?disabled=${this.disabled}
          aria-label=${this.initials || 'User button'}
        >
        <div class="content-container">
          <div class="user-button-circle">
            ${
              this.shouldShowIcon
                ? html`
                    <div class="icon-container">
                      <slot name="icon">
                        <!-- Fallback to default icon if no slot content -->
                        <obi-user></obi-user>
                      </slot>
                    </div>
                  `
                : html`
                    <span class="user-initials">
                      ${this.formattedInitials}
                    </span>
                  `
            }
          </div>
          ${label}
        </div>
        </${tag}>
      `;
  }

  static override styles = unsafeCSS(compentStyle);
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-user-button': ObcUserButton;
  }
}
