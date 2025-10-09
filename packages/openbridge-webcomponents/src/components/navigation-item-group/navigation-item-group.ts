import {LitElement, html, nothing, unsafeCSS} from 'lit';
import {property, state} from 'lit/decorators.js';
import compentStyle from './navigation-item-group.css?inline';
import {ObcNavigationMenuVariant} from '../navigation-menu/navigation-menu.js';
import {classMap} from 'lit/directives/class-map.js';
import {customElement} from '../../decorator.js';

/**
 * `<obc-navigation-item-group>` – A collapsible navigation group component for organizing related navigation items under a single expandable label.
 *
 * Appears as a navigation item that, when clicked, reveals a flyout panel containing additional navigation content. Used to group related links or actions in a navigation menu, improving organization and reducing clutter in complex navigation structures.
 *
 * ### Features
 * - **Expandable Group:** Clicking the group label toggles a flyout panel containing child navigation items or custom content.
 * - **Custom Icon Support:** Accepts a custom icon via the `icon` slot, displayed next to the group label.
 * - **Variants:** Supports multiple visual styles via the `variant` property (see `ObcNavigationMenuVariant`), such as full or compact menu modes.
 * - **Checked State:** The group can be marked as checked/selected for highlighting the current section.
 * - **Hug Mode:** When `hug` is true, the flyout panel appears anchored closely to the group label, with compact styling.
 * - **Flyout Panel:** The flyout is positioned adjacent to the group label and adapts its layout based on the `hug` and `variant` settings.
 * - **Keyboard and Mouse Interaction:** The group can be opened or closed by clicking the label; emits an `open` event when expanded.
 *
 * ### Usage Guidelines
 * Use `obc-navigation-item-group` to organize related navigation links or actions under a single expandable section within a navigation menu. Ideal for menus with many items or hierarchical structures, where grouping improves clarity and reduces visual noise. Place `obc-navigation-item` or other navigation-related components inside the group to form the flyout content.
 *
 * - Use the `icon` slot to visually distinguish the group.
 * - Use the `checked` property to indicate the currently active or selected group.
 * - Use the `hug` property for context menus or compact flyouts that should appear tightly anchored to the group label.
 * - Avoid nesting too many groups for better usability.
 *
 * **TODO(designer):** Clarify if there are recommended maximum numbers of items per group, and if keyboard navigation/focus management has specific requirements.
 *
 * ### Slots
 * | Slot Name | Renders When... | Purpose |
 * |-----------|-----------------|---------|
 * | icon      | Always (optional) | Custom icon displayed next to the group label. |
 * | (default) | Always           | Content of the flyout panel (typically navigation items or custom content). |
 *
 * ### Events
 * - `open` – Fired when the group is expanded and the flyout panel is shown.
 *
 * ### Best Practices and Constraints
 * - Only one navigation group should be open at a time in a given navigation menu for clarity.
 * - Place only navigation-related items in the flyout for consistency.
 * - For accessibility, ensure the group label clearly describes the grouped content.
 *
 * ### Example:
 * ```html
 * <obc-navigation-item-group label="Settings">
 *   <obi-settings slot="icon"></obi-settings>
 *   <obc-navigation-item label="Profile"></obc-navigation-item>
 *   <obc-navigation-item label="Security"></obc-navigation-item>
 * </obc-navigation-item-group>
 * ```
 *
 * @slot icon - Custom icon displayed next to the group label.
 * @slot - Default slot for flyout content (typically navigation items).
 * @fires open {CustomEvent<void>} When the group is expanded and the flyout is shown.
 */
@customElement('obc-navigation-item-group')
export class ObcNavigationItemGroup extends LitElement {
  /**
   * The label text displayed for the navigation group.
   */
  @property({type: String}) label = 'Label';

  /**
   * Optional URL to navigate to when the group label is clicked.
   * If set, clicking the group label will navigate to this URL.
   */
  @property({type: String}) href: string | undefined;

  /**
   * Whether the group is currently checked/selected.
   * Use to highlight the group as active.
   */
  @property({type: Boolean}) checked = false;

  /**
   * Visual variant of the navigation group.
   * Accepts values from `ObcNavigationMenuVariant` (e.g., 'full', 'compact').
   * Controls the styling and layout of the group and its flyout.
   */
  @property({type: String}) variant: ObcNavigationMenuVariant =
    ObcNavigationMenuVariant.Full;

  /**
   * If true, the flyout panel appears tightly anchored to the group label with compact styling.
   */
  @property({type: Boolean}) hug = false;

  @property({type: Boolean}) hasIcon = false;

  @state() private openContainer = false;

  private onClickGroup() {
    if (this.openContainer) {
      this.close();
    } else {
      this.open();
    }
  }

  /**
   * Opens the flyout panel and emits the `open` event.
   * @fires open
   */
  open() {
    this.openContainer = true;
    this.dispatchEvent(new CustomEvent('open'));
  }

  close() {
    this.openContainer = false;
    this.querySelectorAll('obc-navigation-item-group').forEach((item) => {
      item.close();
    });
  }

  override render() {
    return html`
      <obc-navigation-item
        @click=${this.onClickGroup}
        .checked=${this.checked}
        .groupSelected=${this.openContainer}
        .href=${this.href}
        .label=${this.label}
        .variant=${this.variant}
        group
        id="group-item"
        ?hasIcon=${this.hasIcon}
      >
        ${this.hasIcon ? html`<slot name="icon" slot="icon"></slot>` : nothing}
      </obc-navigation-item>
      <div
        part="flyout"
        id="flyout-wrapper"
        class=${classMap({
          hug: this.hug,
          [this.variant]: true,
          open: this.openContainer,
        })}
      >
        <div class="content">
          <slot></slot>
        </div>
      </div>
      <div
        class=${classMap({
          shadow: true,
          open: this.openContainer,
          hug: this.hug,
        })}
      ></div>
    `;
  }

  static override styles = unsafeCSS(compentStyle);
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-navigation-item-group': ObcNavigationItemGroup;
  }
}
