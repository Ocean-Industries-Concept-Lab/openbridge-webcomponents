import {LitElement, html, nothing, unsafeCSS} from 'lit';
import {property} from 'lit/decorators.js';
import compentStyle from './navigation-item.css?inline';
import {classMap} from 'lit/directives/class-map.js';
import {ifDefined} from 'lit/directives/if-defined.js';
import '../../icons/icon-arrow-flyout-google.js';
import {ObcNavigationMenuVariant} from '../navigation-menu/navigation-menu.js';
import {customElement} from '../../decorator.js';

/**
 * `<obc-navigation-item>` – A navigation menu item component for use in navigation bars, side menus, or toolbars.
 *
 * Displays a selectable navigation option, optionally with an icon and support for different visual variants. Can be used as a link or as a button within navigation menus, supporting both single items and grouped menu structures.
 *
 * Appears as a horizontal or vertical item, with optional icon, label, and flyout indicator for nested or grouped navigation. Designed for use in navigation menus, toolbars, or any UI requiring a consistent, interactive navigation element.
 *
 * ## Features
 * - **Variants:**
 *   - `Full` (default): Standard navigation item with icon (optional), label, and optional flyout indicator for groups.
 *   - `IconOnly`: Displays only the icon, suitable for compact or icon-based navigation menus.
 *   - `IconOnlyLarge`: Larger icon-only variant for prominent navigation actions.
 *   - `Compact`: Smaller, vertically-stacked layout with icon and label, optimized for space-constrained menus.
 * - **Icon Support:**
 *   - Leading icon can be provided via the `icon` slot.
 *   - Icon presence is automatically detected and styled.
 * - **Label:**
 *   - Text label shown unless in icon-only variants.
 * - **Checked State:**
 *   - Indicates the currently selected or active navigation item.
 * - **Group Mode:**
 *   - When `group` is true, displays a flyout indicator (arrow) and supports group selection highlighting.
 * - **Link Support:**
 *   - Can be rendered as a link via the `href` property, or as a button if `href` is not set.
 * - **Accessibility:**
 *   - Uses semantic anchor element for navigation.
 *
 * ## Usage Guidelines
 * Use `obc-navigation-item` for interactive navigation options within menus, toolbars, or navigation drawers.
 * - Ideal for main or secondary navigation, especially where visual consistency and flexible layout are needed.
 * - Use the `Full` variant for standard navigation lists with both icon and label.
 * - Use `IconOnly` or `IconOnlyLarge` for toolbars or sidebars where space is limited or icon-only navigation is preferred.
 * - Use `Compact` for dense menus or when vertical stacking of icon and label is desired.
 * - Set `checked` to highlight the currently active or selected item.
 * - Use `group` and `groupSelected` to indicate grouped navigation and selection within groups.
 * - Provide an icon via the `icon` slot for visual context (e.g., `<obi-placeholder slot="icon"></obi-placeholder>).
 * - Use `href` to make the item a link; omit for button-like behavior.
 * - Use `::part(label)` CSS pseudo-element to style the label.
 *
 * **TODO(designer):** Clarify if there are recommended icon choices or label length constraints for each variant.
 *
 * ## Slots
 *
 * | Slot Name | Renders When... | Purpose |
 * |-----------|-----------------|---------|
 * | icon      | Always (optional) | Leading icon for the navigation item. Place an icon such as `<obi-placeholder slot="icon"></obi-placeholder>`. |
 *
 * ## Properties and Attributes
 * - `label` (string): The text label for the navigation item. Hidden in icon-only variants.
 * - `href` (string, optional): If set, the item is rendered as a link. If undefined, acts as a button.
 * - `checked` (boolean): Marks the item as selected/active.
 * - `variant` (string): Controls the visual style. One of `Full`, `IconOnly`, `IconOnlyLarge`, or `Compact`.
 * - `group` (boolean): Enables group mode, showing a flyout indicator and supporting group selection.
 * - `groupSelected` (boolean): Highlights the item as selected within a group.
 * - `hasIcon` (boolean): Whether the item has a leading icon.
 *
 * ## Events
 * - `click` – Fired when the navigation item is clicked (either as a link or button).
 *
 * ## Best Practices and Constraints
 * - Only use one navigation item as `checked` at a time within a menu to indicate the current location.
 * - For icon-only variants, ensure the icon clearly represents the navigation action.
 * - Use `group` for items that open submenus or represent grouped navigation.
 * - Avoid long labels in compact or icon-only variants to maintain layout integrity.
 * - For accessibility, provide meaningful labels and icons.
 *
 * ## Example:
 * ```
 * <obc-navigation-item
 *   label="Dashboard"
 *   href="/dashboard"
 *   checked
 *   variant="Full"
 * >
 *   <obi-placeholder slot="icon"></obi-placeholder>
 * </obc-navigation-item>
 * ```
 *
 * @slot icon - Leading icon slot (optional, shown if provided). Set `hasIcon` to `true` to show the icon.
 * @slot trailing-icon - Trailing icon slot (optional, shown if provided). Set `hasTrailingIcon` to `true` to show.
 * @fires click {CustomEvent<void>} Fired when the navigation item is clicked.
 */

@customElement('obc-navigation-item')
export class ObcNavigationItem extends LitElement {
  /**
   * The text label displayed for the navigation item.
   * Hidden in icon-only variants.
   */
  @property({type: String}) label = 'Label';

  /**
   * The URL to navigate to when the item is clicked.
   * If set, the item is rendered as a link (`<a href="..." />`).
   * If undefined, acts as a button.
   */
  @property({type: String}) href: string | undefined;

  /**
   * Whether the navigation item is currently selected/active.
   * Use to indicate the current location or selection.
   */
  @property({type: Boolean}) checked = false;

  /**
   * Visual variant of the navigation item.
   * One of `Full` (default), `IconOnly`, `IconOnlyLarge`, or `Compact`.
   * Controls layout and visibility of icon/label.
   */
  @property({type: String}) variant = ObcNavigationMenuVariant.Full;

  /**
   * Enables group mode for the item, displaying a flyout indicator and supporting group selection.
   * Use for items that open submenus or represent grouped navigation.
   */
  @property({type: Boolean}) group = false;

  /**
   * Highlights the item as selected within a group.
   * Only relevant when `group` is true.
   */
  @property({type: Boolean}) groupSelected = false;

  /**
   * Whether the item has a leading icon.
   */
  @property({type: Boolean, reflect: true}) hasIcon = false;

  @property({type: Boolean}) hasTrailingIcon = false;

  /**
   * Fired when the navigation item is clicked (either as a link or button).
   * @fires click {CustomEvent<void>}
   */
  onClick() {
    dispatchEvent(new CustomEvent('click'));
  }

  override render() {
    const showFlyout =
      this.group && this.variant !== ObcNavigationMenuVariant.IconOnly;
    const isCompact = this.variant === ObcNavigationMenuVariant.Compact;

    return html`
      <a
        class="${classMap({
          wrapper: true,
          checked: this.checked,
          'group-selected': this.groupSelected && this.group,
          'has-icon': this.hasIcon,
          [this.variant]: true,
        })}"
        href=${ifDefined(this.href)}
        @click=${this.onClick}
      >
        <div class="visible-wrapper">
          ${this.hasIcon
            ? html`<slot name="icon" class="icon leading"></slot>`
            : nothing}
          ${![
            ObcNavigationMenuVariant.IconOnly,
            ObcNavigationMenuVariant.IconOnlyLarge,
          ].includes(this.variant)
            ? html`
                <span
                  part="label"
                  class=${classMap({
                    label: true,
                    'label-flyout': showFlyout && !isCompact,
                  })}
                >
                  ${this.label}
                </span>
              `
            : nothing}
          ${showFlyout
            ? html`
                <div class="flyout-wrapper">
                  <obi-arrow-flyout-google
                    class="icon trailing"
                  ></obi-arrow-flyout-google>
                </div>
              `
            : nothing}
          ${this.hasTrailingIcon
            ? html`<slot name="trailing-icon" class="icon trailing"></slot>`
            : nothing}
        </div>
      </a>
    `;
  }

  static override styles = unsafeCSS(compentStyle);
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-navigation-item': ObcNavigationItem;
  }
}
