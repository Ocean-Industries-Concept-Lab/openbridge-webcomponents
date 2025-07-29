import {customElement} from '../../decorator.js';
import {LitElement, html, unsafeCSS} from 'lit';
import compentStyle from './context-menu.css?inline';

/**
 * `<obc-context-menu>` – A contextual menu component for presenting a list of actions or navigation options.
 *
 * Displays a floating menu containing selectable items, typically invoked by right-clicking or interacting with a trigger element. The menu appears above other UI content, allowing users to choose from a set of related commands or destinations without navigating away from their current context.
 *
 * ### Features
 * - **Menu structure:** Renders its content as a vertical list of options using an ordered list (`<ol>`), with each item typically represented by a child component such as `<obc-navigation-item>`.
 * - **Customizable content:** Supports any number of menu items, each of which can include icons, labels, and additional metadata.
 * - **Icon support:** Menu items can display leading icons for visual identification (see example usage with `<obi-applications>` and `<obi-alerts>`).
 * - **Floating appearance:** Styled with background, border radius, and shadow to visually separate the menu from the underlying content.
 *
 * ### Usage Guidelines
 * Use `<obc-context-menu>` to present a set of context-specific actions or navigation links, typically in response to a user gesture such as right-clicking, long-pressing, or clicking a menu trigger. It is ideal for secondary actions that are relevant to a specific UI element or region. Avoid using it for primary navigation or persistent menus; for those scenarios, consider a sidebar or top navigation component.
 *
 * **TODO(designer):** Specify recommended trigger patterns (e.g., right-click, button click), keyboard accessibility expectations, and whether the menu should auto-close on selection or outside click.
 *
 * ### Slots
 *
 * | Slot Name | Renders When... | Purpose |
 * |-----------|-----------------|---------|
 * | (default) | Always          | Accepts one or more menu item components (e.g., `<obc-navigation-item>`) to display as selectable options. |
 *
 * ### Best Practices and Constraints
 * - Each child should be a valid menu item component (such as `<obc-navigation-item>`) for consistent styling and interaction.
 * - Ensure menu items are accessible via keyboard navigation (arrow keys, Enter/Escape for selection and dismissal).
 * - Keep the number of menu items manageable to avoid overwhelming users.
 * - For destructive or critical actions, consider visually distinguishing those items.
 *
 * ### Example:
 * ```
 * <obc-context-menu>
 *   <obc-navigation-item label="Apps" .hasIcon=${true}>
 *     <obi-applications slot="icon"></obi-applications>
 *   </obc-navigation-item>
 *   <obc-navigation-item label="Alerts" .hasIcon=${true}>
 *     <obi-alerts slot="icon"></obi-alerts>
 *   </obc-navigation-item>
 * </obc-context-menu>
 * ```
 * In this example, the context menu displays two navigation items, each with a leading icon.
 *
 * @slot - Default slot for menu items (e.g., `<obc-navigation-item>`)
 */
@customElement('obc-context-menu')
export class ObcContextMenu extends LitElement {
  override render() {
    return html` <ol>
      <slot></slot>
    </ol>`;
  }

  static override styles = unsafeCSS(compentStyle);
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-context-menu': ObcContextMenu;
  }
}
