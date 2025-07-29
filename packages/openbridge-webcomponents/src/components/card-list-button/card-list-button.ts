import {LitElement, html, unsafeCSS} from 'lit';
import {property} from 'lit/decorators.js';
import iconStyle from './card-list-button.css?inline';
import {classMap} from 'lit/directives/class-map.js';
import {customElement} from '../../decorator.js';

/**
 * `<obc-card-list-button>` – A horizontally-aligned button component designed for use within card lists or item collections.
 *
 * This button presents a label with optional leading and trailing icons, making it suitable for list actions, navigation, or item selection. Its layout ensures consistent alignment and spacing within card-based or list-based UIs.
 *
 * ### Features
 * - **Leading and Trailing Icons:** Supports optional icons before and after the label for enhanced visual cues or actions.
 * - **Flexible Content:** The label is provided via the default slot, allowing for dynamic or localized text.
 * - **Full-width Layout:** Expands to fill the width of its container, aligning with card or list item boundaries.
 * - **Variants:** The `variant` property allows for different visual styles (default is `'normal'`).  
 *   **TODO(designer):** Document available variants and their intended use.
 * - **Accessible Structure:** Uses a native `<button>` element for keyboard and screen reader support.
 *
 * ### Usage Guidelines
 * Use `obc-card-list-button` for actions associated with items in a card or list, such as "Edit", "Open", or "More options". It is ideal for scenarios where you want a button to visually align with list content and optionally display icons for context or quick actions.
 *
 * **TODO(designer):** Clarify when to use this component versus a standard button, and provide guidance on variant usage.
 *
 * ### Slots
 *
 * | Slot Name      | Renders When...            | Purpose                                      |
 * | -------------- | ------------------------- | --------------------------------------------- |
 * | `leading-icon` | `hasLeadingIcon` is true  | Icon displayed before the label.              |
 * | (default)      | Always                    | The button's label text.                      |
 * | `trailing-icon`| `hasTrailingIcon` is true | Icon displayed after the label.               |
 *
 * ### Properties
 * - `icon`: Sets the icon name (default: `'placeholder'`).  
 *   **TODO(designer):** Confirm if this is used for a default icon or for another purpose.
 * - `variant`: Visual style of the button (`'normal'` by default).  
 *   **TODO(designer):** List and describe all supported variants.
 * - `hasLeadingIcon`: If true, displays the leading icon slot.
 * - `hasTrailingIcon`: If true, displays the trailing icon slot.
 *
 * ### Best Practices
 * - Keep button labels concise for optimal alignment within lists.
 * - Use icons to clarify the button's purpose, but avoid overloading with too many visual elements.
 * - For actions that affect the entire card or list item, place this button at the start or end of the item for clear association.
 *
 * ### Example
 * ```html
 * <obc-card-list-button hasLeadingIcon hasTrailingIcon>
 *   <obi-placeholder slot="leading-icon"></obi-placeholder>
 *   Edit Item
 *   <obi-arrow slot="trailing-icon"></obi-arrow>
 * </obc-card-list-button>
 * ```
 *
 * @slot leading-icon - Icon displayed before the label when `hasLeadingIcon` is true.
 * @slot - The button's label text.
 * @slot trailing-icon - Icon displayed after the label when `hasTrailingIcon` is true.
 */
@customElement('obc-card-list-button')
export class ObcCardListButton extends LitElement {
  /**
   * Name of the icon to display.  
   * **TODO(designer):** Confirm how this property is used (default icon, or for another purpose?).
   */
  @property({type: String}) icon = 'placeholder';

  /**
   * Visual style variant of the button.  
   * Default is `'normal'`.  
   * **TODO(designer):** List and describe all supported variants and their intended use.
   */
  @property({type: String}) variant = 'normal';

  /**
   * If true, displays the leading icon slot before the label.
   */
  @property({type: Boolean}) hasLeadingIcon = false;

  /**
   * If true, displays the trailing icon slot after the label.
   */
  @property({type: Boolean}) hasTrailingIcon = false;

  override render() {
    return html`
      <button
        class=${classMap({
          wrapper: true,
          hasIconLeading: this.hasLeadingIcon,
          hasIconTrailing: this.hasTrailingIcon,
        })}
      >
        <span class="icon leading"><slot name="leading-icon"></slot></span>
        <span class="label"><slot></slot></span>
        <span class="icon trailing"><slot name="trailing-icon"></slot></span>
      </button>
    `;
  }

  static override styles = unsafeCSS(iconStyle);
}

declare global {
  interface HTMLElementTagNameMap {
    'obc-card-list-button': ObcCardListButton;
  }
}
